import defaultConfig from "../util/defaultConfig";
import MutablePromise from "mutable-promise";
import { _toCanvas, CoreModule, DSImageData, EnumCapturedResultItemType, EnumImagePixelFormat, getNextTaskID, handleEngineResourcePaths, mapTaskCallBack, OriginalImageResultItem, requestResource, worker } from "dynamsoft-core";
import { CapturedResult, CapturedResultReceiver, CaptureVisionRouter } from "@dynamsoft/dynamsoft-capture-vision-router";
import { BarcodeScanResult, CacheKeys, isPathConfig } from "../interface";
import { BarcodeScannerConfig } from "../interface/BarcodeScannerConfig";
import { CameraEnhancer, CameraView, DrawingLayer, QuadDrawingItem } from "@dynamsoft/dm-camera/dist/dce";
import { LicenseManager } from "@dynamsoft/dynamsoft-license";
import { EnumResultStatus, EnumScanMode } from "../enum";
import { createDocumentFragment, deepClone, deepMerge, isFrontCameraLabel, isLandscape, isSupportedImageFile } from "../util";
import { BarcodeResultItem, EnumBarcodeFormat } from "@dynamsoft/dynamsoft-barcode-reader";
import { getAbsoluteDir } from "@scannerproxy/curscript-path";
import { MultiFrameResultCrossFilter } from "@dynamsoft/dynamsoft-utility";

export interface VideoDeviceInfo {
  /** The unique identifier for the camera. */
  deviceId: string;
  /** The label or name of the camera. */
  label: string;
  /** @ignore */
  _checked?: boolean;
}

export default class BarcodeScanner {
  static #launchPromise: MutablePromise<BarcodeScanResult> = null; // There can only exist one BarcodeScanner instance.
  static #resourcesCache: Map<CacheKeys, string> = new Map();
  private _cameraEnhancer: CameraEnhancer;
  private _cameraView: CameraView;
  private _cvRouter: CaptureVisionRouter;
  #isDisposed = false;
  #resultItemNode: HTMLDivElement;
  #currentTemplate: string;
  #customDrawingLayer: DrawingLayer;
  #filter: MultiFrameResultCrossFilter;
  #windowEventMap = new Map<string, any[]>();
  #styleTags: Node[] = [];
  #userConfig: BarcodeScannerConfig;
  #initPromise: MutablePromise<void> = new MutablePromise();
  #uniqueBarcodesList: BarcodeScanResult = {
    status: {
      code: EnumResultStatus.RS_SUCCESS,
      message: "Success."
    },
    barcodeResults: []
  }

  config: BarcodeScannerConfig = deepClone(defaultConfig);
  constructor(config?: BarcodeScannerConfig) {
    if (config && typeof config !== "object" || Array.isArray(config)) {
      throw new Error("Invalid config.");
    }
    this.#userConfig = config;
    deepMerge(this.config, config);
  }

  get disposed() {
    return this.#isDisposed;
  }

  public async launch(): Promise<BarcodeScanResult> {
    if (this.#isDisposed) throw new Error("The BarcodeScanner instance has been destroyed.");
    if (BarcodeScanner.#launchPromise && !BarcodeScanner.#launchPromise.isFulfilled && !BarcodeScanner.#launchPromise.isRejected) {
      throw new Error("Cannot call `launch()` while a previous task is still running.");
    };

    BarcodeScanner.#launchPromise = new MutablePromise<BarcodeScanResult>();

    // Pass the identifier indicating the RTU currently in use via `setDeviceFriendlyName`
    if (!LicenseManager.getDeviceFriendlyName()) {
      try { LicenseManager.setDeviceFriendlyName("dbr_rtu") } catch { }
    }

    this.#init();

    return BarcodeScanner.#launchPromise;
  }

  public async decode(imageOrFile: Blob | string | DSImageData | HTMLImageElement | HTMLVideoElement | HTMLCanvasElement, templateName?: string) {
    if (this.disposed) {
      return Promise.reject(new Error("Cannot call decode on a disposed instance. This instance was disposed after launch completed."));
    }
    const resultReceiver = new CapturedResultReceiver();
    try {
      await this.#initDCVResources(true);
      
      // In the DBR RTU, as each decode operation applies the filter logic of the video streaming scenario, 
      // special handling is implemented here to ensure that the billing for each decode is processed correctly and remains unaffected by the filtering results.
      if (!this.#filter) this.#filter = new MultiFrameResultCrossFilter();
      this.#filter.enableResultCrossVerification(2, false);
      await this._cvRouter.addResultFilter(this.#filter);
      resultReceiver.onCapturedResultReceived = () => { };
      this._cvRouter.addResultReceiver(resultReceiver);
      
      if (!templateName) {
        templateName = this.config.utilizedTemplateNames.image;
      }
      const result = await this._cvRouter.capture(imageOrFile, templateName);
      return result;
    } catch (ex) {
      throw ex;
    } finally {
      if (this.#filter) {
        this.#filter.enableResultCrossVerification(2, true);
        await this._cvRouter.addResultFilter(this.#filter);
      }
      this._cvRouter?.removeResultReceiver(resultReceiver);
    }
  }

  public dispose(): void {
    this.#isDisposed = true;
    BarcodeScanner.#launchPromise && BarcodeScanner.#launchPromise.isPending && BarcodeScanner.#launchPromise.resolve(this.#uniqueBarcodesList);
    this._cameraEnhancer?.dispose();
    this._cameraView?.dispose();
    this._cvRouter?.dispose();
    this._cameraEnhancer = null;
    this._cameraView = null;
    this._cvRouter = null;
    document.querySelector(".scanner-view-container")?.remove();
    document.querySelector(".result-view-container")?.remove();
    document.querySelector(".barcode-scanner-container")?.remove();
    document.querySelector(".loading-page")?.remove();
    for (let [key, events] of this.#windowEventMap) {
      for (let event of events) {
        window.removeEventListener(key, event);
      }
    }
    this.#windowEventMap.clear();
    for (let styleTag of this.#styleTags) {
      document.head.removeChild(styleTag);
    }
    this.#styleTags = [];
  }

  async #init() {
    try {
      this.config.onInitPrepare && this.config.onInitPrepare();
      if (this.disposed) return;
      await this.#initDCVResources();
      this.config.onInitReady && this.config.onInitReady({ cameraView: this._cameraView, cameraEnhancer: this._cameraEnhancer, cvRouter: this._cvRouter });
      if (this.disposed) return;
      let isOpenFailed = false;
      try {
        const loadingTextSpan = document.querySelector(".loading-page span") as HTMLElement;
        loadingTextSpan.innerText = "Accessing Camera...";
        await this._cameraEnhancer.open();
        if (isFrontCameraLabel(this._cameraEnhancer.getSelectedCamera()) && this.config.scannerViewConfig.mirrorFrontCamera) {
          this._cameraEnhancer.isMirrored = true;
        }
        this.config.onCameraOpen && this.config.onCameraOpen({ cameraView: this._cameraView, cameraEnhancer: this._cameraEnhancer, cvRouter: this._cvRouter });
        if (this.disposed) return;
      } catch (ex: any) {
        this.#handleFlashBtnsVisibility({ auto: false, open: false, close: false, notSupport: false });
        const cameraControl = document.querySelector<HTMLElement>(".camera-control");
        if (cameraControl) {
          cameraControl.style.display = "none";
        }
        const noCameraView = document.querySelector<HTMLElement>(".no-camera-view");
        if (noCameraView) {
          noCameraView.style.display = "flex";
        }
        this.config.onCameraOpenFailed && this.config.onCameraOpenFailed(ex);
        isOpenFailed = true;
        if (this.disposed) return;
      }
      if (this.config.autoStartCapturing && !isOpenFailed) {
        await this._cvRouter.startCapturing(this.#currentTemplate);
        this.config.onCaptureStart && this.config.onCaptureStart({ cameraView: this._cameraView, cameraEnhancer: this._cameraEnhancer, cvRouter: this._cvRouter });
        if (this.disposed) return;
      }
    } catch (ex) {
      this.#uniqueBarcodesList.status = {
        code: EnumResultStatus.RS_FAILED,
        message: ex.message || ex
      }
      BarcodeScanner.#launchPromise.reject(new Error(this.#uniqueBarcodesList.status.message));
      this.dispose();
    } finally {
      this.#showOrHiddenLoadingPage("Loading...", false);
    }
  }

  async #initDCVResources(isDecode: boolean = false) {
    CoreModule.engineResourcePaths = this.config.engineResourcePaths;
    const _engineResourcePaths = handleEngineResourcePaths(CoreModule.engineResourcePaths);
    if (!isDecode) {
      let htmlText = BarcodeScanner.#resourcesCache.get("dceUI");
      if (!htmlText) {
        htmlText = await requestResource(_engineResourcePaths.dbrBundle + "ui/dce.rtu.ui.xml", "text");
        BarcodeScanner.#resourcesCache.set("dceUI", htmlText);
      }
      //fragment = createDocumentFragment(htmlText);
      if (this.disposed) return;

      // const element = document.createElement("div");
      // Object.assign(element.style, { width: '100%', height: '100%' });
      // element.attachShadow({ mode: "open" }).appendChild(fragment.cloneNode(true) as DocumentFragment);

      this._cameraView = await CameraView.createInstance(htmlText);
      if (this.disposed) return;

      // Pre-create the DBR result drawing layer to avoid page lag on the first frame of decoding.
      // 2 === DBR result drawing layer ID
      // this._cameraView._createDrawingLayer(2);

      if (this.config.scanMode === EnumScanMode.SM_SINGLE || this.config.scannerViewConfig.customHighlightForBarcode) {
        const dbrDrawingLayer = this._cameraView.getDrawingLayer(2);
        dbrDrawingLayer.setVisible(false);
      }

      this._cameraEnhancer = await CameraEnhancer.createInstance(this._cameraView);
      if (this.disposed) return;

      await this.#bindUI();
      if (this.disposed) return;

      if (this.config.scannerViewConfig.customHighlightForBarcode) {
        this.#customDrawingLayer = this._cameraEnhancer.getCameraView().createDrawingLayer();
      }
    }

    if (![null, undefined].includes(this.config.license)) {
      (LicenseManager as any)._onAuthMessage = (message: string) =>
        message.replace(
          "(https://www.dynamsoft.com/customer/license/trialLicense?product=unknown&deploymenttype=unknown)",
          "(https://www.dynamsoft.com/customer/license/trialLicense?product=dbr&deploymenttype=web)"
        );
      await LicenseManager.initLicense(this.config.license, { executeNow: true });
    }
    if (this.disposed) return;

    this._cvRouter = this._cvRouter || await CaptureVisionRouter.createInstance(false);
    // _s = isScanner
    (this._cvRouter as any)._s = true;
    if (this.disposed) return;

    let presetTemplates = BarcodeScanner.#resourcesCache.get("presetTemplates");
    if (!presetTemplates) {
      presetTemplates = await requestResource(_engineResourcePaths.dbrBundle + "templates/DBR-PresetTemplates.json", "text");
      BarcodeScanner.#resourcesCache.set("presetTemplates", presetTemplates);
    }

    if (this.#initPromise.isPending) {
      await this._cvRouter.initSettings(presetTemplates);
      await this.#initDCVSettings(isDecode);
      if (this.disposed) return;
    }

    if (!isDecode) {
      this._cvRouter.setInput(this._cameraEnhancer as any);
      this.#handleResultReceiver();
      await this.#handleResultFilter();
      if (this.disposed) return;

      this._cvRouter.onCaptureError = (ex) => {
        BarcodeScanner.#launchPromise.reject(new Error(ex.message));
        this.dispose();
      }
      // This variable is used to control whether direct consumption operations are required after successful code redemption.
      (this._cvRouter as any)._dynamsoft = !(this.config.scanMode === EnumScanMode.SM_SINGLE);
    }

    this.#initPromise.resolve();
  }

  async #initDCVSettings(isDecode: boolean = false) {
    let filePath = this.config.templateFilePath;
    if (filePath) {
      let needReload = false;
      if (isPathConfig(filePath)) {
        needReload = filePath.reloadResource;
        filePath = filePath.path;
      }
      let templateText;
      if (needReload) {
        templateText = await requestResource(filePath, "text");
        BarcodeScanner.#resourcesCache.delete("templateFile");
      } else {
        templateText = BarcodeScanner.#resourcesCache.get("templateFile");
        if (!templateText) {
          templateText = await requestResource(filePath, "text");
          BarcodeScanner.#resourcesCache.set("templateFile", templateText);
        }
        templateText = JSON.parse(templateText);
        const firstTemplateName = templateText.CaptureVisionTemplates[0].Name;
        if (!this.#userConfig.utilizedTemplateNames) {
          this.config.utilizedTemplateNames = {
            image: firstTemplateName,
            multi_unique: firstTemplateName,
            single: firstTemplateName
          }
        } else {
          if (!this.#userConfig.utilizedTemplateNames.image) {
            this.config.utilizedTemplateNames.image = firstTemplateName;
          }
          if (!this.#userConfig.utilizedTemplateNames.multi_unique) {
            this.config.utilizedTemplateNames.multi_unique = firstTemplateName;
          }
          if (!this.#userConfig.utilizedTemplateNames.single) {
            this.config.utilizedTemplateNames.single = firstTemplateName;
          }
        }
      }
      if (this.disposed) return;
      await this._cvRouter.initSettings(templateText);
      if (this.disposed) return;
    }

    const settings = await this._cvRouter.outputSettings("*", true);
    if (this.disposed) return;
    let isOutputOriginalImage = !isDecode && this.config.scanMode === EnumScanMode.SM_SINGLE;
    if (isOutputOriginalImage) {
      for (let template of settings.CaptureVisionTemplates) {
        template.OutputOriginalImage = 1;
      }
    }
    let barcodeFormats = this.config.barcodeFormats;
    if (barcodeFormats) {
      if (!Array.isArray(barcodeFormats)) {
        barcodeFormats = [barcodeFormats];
      }

      const hasFormat = (userFormat: bigint, targetFormat: bigint) => {
        return targetFormat !== BigInt(0) && (userFormat & targetFormat) === targetFormat;
      }

      for (let taskSetting of settings.BarcodeReaderTaskSettingOptions) {
        taskSetting.BarcodeFormatIds = [];
        for (let format in EnumBarcodeFormat) {
          for (let configFormat in barcodeFormats) {
            if (hasFormat(barcodeFormats[configFormat], (EnumBarcodeFormat as any)[format])) {
              taskSetting.BarcodeFormatIds.push(format);
            }
          }
        }
      }
    }
    await this._cvRouter.initSettings(settings);
    if (this.disposed) return;

    if (!isDecode) {
      if (this.config.scanMode === EnumScanMode.SM_SINGLE) {
        this.#currentTemplate = this.config.utilizedTemplateNames.single;
      } else if (this.config.scanMode === EnumScanMode.SM_MULTI_UNIQUE) {
        this.#currentTemplate = this.config.utilizedTemplateNames.multi_unique;
      }
    }
  }

  async #bindUI() {
    let uiPath = this.config.uiPath || handleEngineResourcePaths(this.config.engineResourcePaths).dbrBundle as string;
    let needReload = false;
    if (isPathConfig(uiPath)) {
      needReload = uiPath.reloadResource;
      uiPath = uiPath.path;
    }
    let htmlText;
    let fragment;
    let absoluteUrl = !uiPath.endsWith("/") ? getAbsoluteDir(uiPath).slice(0, -1) : getAbsoluteDir(uiPath) + "ui/barcode-scanner.ui.xml";
    if (needReload) {
      htmlText = await requestResource(absoluteUrl, "text");
      BarcodeScanner.#resourcesCache.delete("dbsUI");
    } else {
      htmlText = BarcodeScanner.#resourcesCache.get("dbsUI");
      if (!htmlText) {
        htmlText = await requestResource(absoluteUrl, "text");
        BarcodeScanner.#resourcesCache.set("dbsUI", htmlText);
      }
    }
    fragment = createDocumentFragment(htmlText);
    if (this.disposed) return;

    const styleTags = fragment.querySelectorAll("style");
    styleTags.forEach(styleTag => {
      const cloneStyleTag = styleTag.cloneNode(true);
      this.#styleTags.push(cloneStyleTag);
      document.head.appendChild(cloneStyleTag);
    });

    if (this.config.scanMode === EnumScanMode.SM_SINGLE) {
      const dceShadowRootStyle = document.createElement("style");
      dceShadowRootStyle.innerText = `
        @keyframes result-option-flash {
          from {transform: translate(-50%, -50%) scale(1);}
          to {transform: translate(-50%, -50%) scale(0.8);}
        }
      `.trim();
      const shadowRoot = this._cameraView.getUIElement().shadowRoot;
      shadowRoot.append(dceShadowRootStyle);
    }

    this.#resultItemNode = fragment.querySelector(".result-item");

    this.#handleClearBtn(fragment);

    this.#handleDoneBtn(fragment);

    this.#handleCloseBtn(fragment);

    this.#handleFlashBtn(fragment);

    await this.#handleCameraSwitchControl(fragment);

    this.#handleUploadImageBtn(fragment);

    this.#handleResumeBtn(fragment);

    this.#handleUIContainer(fragment);
  }

  #handleClearBtn(fragment: DocumentFragment) {
    const btnClear = fragment.querySelector<HTMLElement>(".btn-clear");
    if (btnClear) {
      btnClear.addEventListener("click", () => {
        this.#uniqueBarcodesList.barcodeResults = [];
        this.#renderUniqueResultsList();
      })
      if (this.config?.resultViewConfig?.toolbarButtonsConfig?.clear) {
        const btnClearConfig = this.config.resultViewConfig.toolbarButtonsConfig.clear;
        btnClear.style.display = btnClearConfig.isHidden ? "none" : "flex";
        btnClear.className = btnClearConfig.className;
        btnClear.innerText = btnClearConfig.label;
        if (btnClearConfig.isHidden) {
          fragment.querySelector<HTMLElement>(".toolbar-btns").style.justifyContent = "center";
        }
      }
    }
  }

  #handleDoneBtn(fragment: DocumentFragment) {
    const btnDone = fragment.querySelector<HTMLElement>(".btn-done");
    if (btnDone) {
      btnDone.addEventListener("click", () => {
        const loadingPage = document.querySelector(".loading-page");
        if (!loadingPage || getComputedStyle(loadingPage).display !== "none") return;
        this.dispose();
      });
      if (this.config?.resultViewConfig?.toolbarButtonsConfig?.done) {
        const btnDoneConfig = this.config.resultViewConfig.toolbarButtonsConfig.done;
        btnDone.style.display = btnDoneConfig.isHidden ? "none" : "flex";
        btnDone.className = btnDoneConfig.className;
        btnDone.innerText = btnDoneConfig.label;
        if (btnDoneConfig.isHidden) {
          fragment.querySelector<HTMLElement>(".toolbar-btns").style.justifyContent = "center";
        }
      }
    }
  }

  #handleCloseBtn(fragment: DocumentFragment) {
    const isShowCloseBtn = this.config?.scannerViewConfig?.showCloseButton;
    if (isShowCloseBtn) {
      const btnClose = fragment.querySelector<HTMLElement>(".btn-close");
      if (btnClose) {
        btnClose.style.display = "inline";
        btnClose.addEventListener("click", () => {
          this.#uniqueBarcodesList.barcodeResults = [];
          this.#uniqueBarcodesList.status = {
            code: EnumResultStatus.RS_CANCELLED,
            message: "Cancelled."
          }
          this.dispose();
        });
      }
    }
  }

  #handleFlashBtn(fragment: DocumentFragment) {
    const isShowFlashBtn = this.config?.scannerViewConfig.showFlashButton;
    if (isShowFlashBtn) {
      const btnFlashAuto = fragment.querySelector<HTMLElement>(".btn-flash-auto");
      const btnFlashOpen = fragment.querySelector<HTMLElement>(".btn-flash-open");
      const btnFlashClose = fragment.querySelector<HTMLElement>(".btn-flash-close");
      if (btnFlashAuto) {
        btnFlashAuto.style.display = "inline";
        this._cameraEnhancer.addEventListener("opened", async () => {
          if (!this._cameraEnhancer.currentCamera) {
            this.#handleFlashBtnsVisibility({ auto: false, open: false, close: false, notSupport: false });
            return;
          };
          const isSupportTorch = this._cameraEnhancer.isSupportTorch;
          if (this.config.scannerViewConfig.showFlashButton) {
            if (!isSupportTorch) {
              this.#handleFlashBtnsVisibility({ auto: false, open: false, close: false, notSupport: true });
            } else {
              this.#handleFlashBtnsVisibility({ auto: true, open: false, close: false, notSupport: false });
            }
          }

          await new Promise(rs => setTimeout(rs, 1000));
          while (this._cameraEnhancer?._isOpenBeforeHide) {
            await new Promise(rs => setTimeout(rs, 1000));
          }
          if (this.disposed) return;
          if (this._cameraEnhancer.isOpen() && isSupportTorch) {
            this._cameraEnhancer.turnAutoTorch();
          }
        })

        btnFlashAuto.addEventListener("click", async () => {
          await this._cameraEnhancer.turnOnTorch();
          btnFlashAuto.style.display = "none";
          btnFlashOpen.style.display = "inline";
          btnFlashClose.style.display = "none";
        });
        btnFlashOpen.addEventListener("click", async () => {
          await this._cameraEnhancer.turnOffTorch();
          btnFlashAuto.style.display = "none";
          btnFlashOpen.style.display = "none";
          btnFlashClose.style.display = "inline";
        });
        btnFlashClose.addEventListener("click", async () => {
          this._cameraEnhancer.turnAutoTorch();
          btnFlashAuto.style.display = "inline";
          btnFlashOpen.style.display = "none";
          btnFlashClose.style.display = "none";
        });
      }
    }
  }

  async #handleCameraSwitchControl(fragment: DocumentFragment) {
    let cameraSwitchControl = this.config.scannerViewConfig.cameraSwitchControl;
    // If the provided configuration is not one of the three specified options, it defaults to "hidden".
    if (!["toggleFrontBack", "listAll", "hidden"].includes(cameraSwitchControl)) {
      this.config.scannerViewConfig.cameraSwitchControl = "hidden";
    }
    const isShowCameraSwitchBtn = this.config.scannerViewConfig.cameraSwitchControl !== "hidden";
    if (isShowCameraSwitchBtn) {
      const btnCameraSwitch = fragment.querySelector<HTMLElement>(".camera-control");
      if (btnCameraSwitch) {
        btnCameraSwitch.style.display = "block";
        const cameraList = await this._cameraEnhancer.getAllCameras();
        const controlType = this.config.scannerViewConfig.cameraSwitchControl;
        const createCameraItem = (cameraInfo: VideoDeviceInfo) => {
          const cameraItem = document.createElement("div");
          (cameraItem as any).label = cameraInfo.label;
          (cameraItem as any).deviceId = cameraInfo.deviceId;
          (cameraItem as any)._checked = cameraInfo._checked;
          cameraItem.innerText = cameraInfo.label ? cameraInfo.label : `Camera ${cameraInfo.deviceId.substring(0, 7)}`;
          Object.assign(cameraItem.style, {
            height: "40px",
            backgroundColor: "#2E2E2E",
            overflow: "hidden",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
            fontSize: "14px",
            lineHeight: "40px",
            padding: "0 14px",
            cursor: "pointer",
          })
          return cameraItem;
        }

        const controlTypeFunc = () => {
          if (cameraList.length === 0) return null;
          if (controlType === "listAll") {
            const cameraListDiv = fragment.querySelector<HTMLDivElement>(".camera-list");
            for (let cameraInfo of cameraList) {
              const cameraItem = createCameraItem(cameraInfo);
              cameraListDiv.append(cameraItem);
            }

            const clickEvent = () => {
              const cameraListDiv = document.querySelector<HTMLDivElement>(".camera-list");
              if (cameraListDiv) {
                cameraListDiv.style.display = "none";
              }
            }
            const clickEvents = this.#windowEventMap.get("click") || [];
            this.#windowEventMap.set("click", [...clickEvents, clickEvent]);
            window.addEventListener("click", clickEvent);

            const switchCameraItemColor = (currentCamera: VideoDeviceInfo) => {
              for (let camera of cameraItems) {
                if ((camera as any).deviceId === currentCamera.deviceId) {
                  camera.style.color = "#FE8E14";
                } else {
                  camera.style.color = "#FFFFFF";
                }
              }
            }

            cameraListDiv.addEventListener("click", async (e) => {
              e.stopPropagation();
              const target: any = e.target;
              this.#showOrHiddenLoadingPage("Accessing Camera...", true);
              this._cvRouter.stopCapturing();
              await this._cameraEnhancer.selectCamera({
                deviceId: target.deviceId,
                label: target.label
              });
              const currentCamera = this._cameraEnhancer.getSelectedCamera();
              if (isFrontCameraLabel(currentCamera) && this.config.scannerViewConfig.mirrorFrontCamera) {
                this._cameraEnhancer.isMirrored = true;
              } else {
                this._cameraEnhancer.isMirrored = false;
              }
              switchCameraItemColor(currentCamera);
              this.config.onCameraOpen && this.config.onCameraOpen({ cameraView: this._cameraView, cameraEnhancer: this._cameraEnhancer, cvRouter: this._cvRouter });
              if (this.config.autoStartCapturing) {
                await this._cvRouter.startCapturing(this.#currentTemplate);
                this.config.onCaptureStart && this.config.onCaptureStart({ cameraView: this._cameraView, cameraEnhancer: this._cameraEnhancer, cvRouter: this._cvRouter });
              }
              this.#showOrHiddenLoadingPage("Loading...", false);
              cameraListDiv.style.display = "none";
            })
            const cameraItems = fragment.querySelectorAll<HTMLDivElement>(".camera-list div");
            return async () => {
              const currentCamera = this._cameraEnhancer.getSelectedCamera();
              switchCameraItemColor(currentCamera);
              const cameraListDiv = document.querySelector<HTMLDivElement>(".camera-list");
              if (getComputedStyle(cameraListDiv).display === "none") {
                cameraListDiv.style.display = "block";
              } else {
                cameraListDiv.style.display = "none";
              }
            }
          } else if (controlType === "toggleFrontBack") {
            return async () => {
              this.#showOrHiddenLoadingPage("Accessing Camera...", true);
              const currentCameraBeforeToggle = this._cameraEnhancer.getSelectedCamera();
              const isFrontBeforeToggle = isFrontCameraLabel(currentCameraBeforeToggle);
              console.log(isFrontBeforeToggle);
              await this._cameraEnhancer.requestCamera(isFrontBeforeToggle ? "back" : "front");
              const currentCamera = this._cameraEnhancer.getSelectedCamera();
              const isFront = isFrontCameraLabel(currentCamera);
              if (isFront) {
                if (this.config.scannerViewConfig.mirrorFrontCamera) {
                  this._cameraEnhancer.isMirrored = true;
                }
                if (this.config.scannerViewConfig.showFlashButton) {
                  this.#handleFlashBtnsVisibility({ auto: false, open: false, close: false, notSupport: true });
                }
              } else {
                this._cameraEnhancer.isMirrored = false;
                if (this.config.scannerViewConfig.showFlashButton) {
                  this.#handleFlashBtnsVisibility({ auto: true, open: false, close: false, notSupport: false });
                }
              }
              this.#showOrHiddenLoadingPage("Loading...", false);
            }
          }
        }

        const cameraSwitcher = controlTypeFunc();
        btnCameraSwitch.addEventListener("click", async (e) => {
          e.stopPropagation();
          if (cameraSwitcher) await cameraSwitcher();
        })
      }
    }
  }

  #handleUIContainer(fragment: DocumentFragment) {
    const _uiElement = this._cameraView.getUIElement();
    // _uiElement.querySelector(".dce-sel-camera").remove();
    // _uiElement.querySelector(".dce-sel-resolution").remove();
    this._cameraView.setVideoFit("cover");

    const mainContainer: HTMLElement = fragment.querySelector(".barcode-scanner-container");
    mainContainer.style.display = isLandscape() ? "flex" : "block";

    // By default, the result view is shown in SM_MULTI_UNIQUE mode unless showResultView is explicitly set to false. In SM_SINGLE mode, the result view remains hidden by default, even if showResultView is explicitly set to true.
    if (this.config.scanMode === EnumScanMode.SM_MULTI_UNIQUE && this.config.showResultView !== false) {
      this.config.showResultView = true;
    } else if (this.config.scanMode === EnumScanMode.SM_SINGLE) {
      this.config.showResultView = false;
    }
    const isShowResultView = this.config.showResultView;

    let container;
    if (this.config.container) {
      mainContainer.style.position = "relative";
      container = this.config.container;
    } else {
      container = document.body;
    }
    if (typeof container === "string") {
      container = document.querySelector<HTMLElement>(container);
      if (container === null) {
        throw new Error("Failed to get the container");
      }
    }

    let scannerViewContainer = this.config.scannerViewConfig.container;
    if (typeof scannerViewContainer === "string") {
      scannerViewContainer = document.querySelector<HTMLElement>(scannerViewContainer);
      if (scannerViewContainer === null) {
        throw new Error("Failed to get the container of the scanner view.");
      }
    }

    let resultViewContainer = this.config.resultViewConfig.container;
    if (typeof resultViewContainer === "string") {
      resultViewContainer = document.querySelector<HTMLElement>(resultViewContainer);
      if (resultViewContainer === null) {
        throw new Error("Failed to get the container of the result view.");
      }
    }

    const scannerViewDefault = fragment.querySelector<HTMLElement>(".scanner-view-container");
    const resultViewDefault = fragment.querySelector<HTMLElement>(".result-view-container");

    const loadingPage = fragment.querySelector(".loading-page");
    scannerViewDefault.append(loadingPage);

    if (scannerViewContainer) {
      scannerViewDefault.append(_uiElement);
      scannerViewContainer.append(scannerViewDefault);
    }
    if (resultViewContainer) {
      resultViewContainer.append(resultViewDefault);
    }

    if (!scannerViewContainer && !resultViewContainer) {
      scannerViewContainer = scannerViewDefault;
      resultViewContainer = resultViewDefault
      if (isShowResultView) {
        Object.assign(scannerViewDefault.style, {
          width: isLandscape() ? "50%" : "100%",
          height: isLandscape() ? "100%" : "50%"
        });
        Object.assign(resultViewDefault.style, {
          width: isLandscape() ? "50%" : "100%",
          height: isLandscape() ? "100%" : "50%",
        });
      }
      scannerViewDefault.append(_uiElement);
      container.append(mainContainer);
    } else if (scannerViewContainer && !resultViewContainer) {
      if (!this.config.container) {
        resultViewDefault.style.position = "absolute";
      }
      resultViewContainer = resultViewDefault
      container.append(resultViewDefault);
    } else if (!scannerViewContainer && resultViewContainer) {
      if (!this.config.container) {
        scannerViewDefault.style.position = "absolute";
      }
      scannerViewContainer = scannerViewDefault;
      scannerViewDefault.append(_uiElement);
      container.append(scannerViewDefault);
    }

    if (isShowResultView) {
      document.querySelector<HTMLElement>(".result-view-container").style.display = "block";
    } else {
      document.querySelector<HTMLElement>(".result-view-container").style.display = "none";
    }

    if (!this.config.showPoweredByDynamsoft) {
      this._cameraEnhancer.setPowerByMessageVisible(false);
      document.querySelector<HTMLElement>(".no-result-svg").style.display = "none";
    }

    const resizeEvent = () => {
      Object.assign(mainContainer.style, {
        display: isLandscape() ? "flex" : "block"
      });
      if (isShowResultView && !this.config.scannerViewConfig.container && !this.config.resultViewConfig.container) {
        Object.assign((scannerViewContainer as HTMLElement).style, {
          width: isLandscape() ? "50%" : "100%",
          height: isLandscape() ? "100%" : "50%"
        });
        Object.assign((resultViewContainer as HTMLElement).style, {
          width: isLandscape() ? "50%" : "100%",
          height: isLandscape() ? "100%" : "50%"
        });
      }
    }
    const resizeEvents = this.#windowEventMap.get("resize") || [];
    this.#windowEventMap.set("resize", [...resizeEvents, resizeEvent]);
    window.addEventListener("resize", resizeEvent);
  }

  #handleResumeBtn(fragment: DocumentFragment) {
    fragment.querySelector(".resume")?.addEventListener("click", async () => {
      if (this.config?.scannerViewConfig?.showCloseButton) {
        document.querySelector<HTMLElement>(".btn-close").style.display = "block";
      }
      document.querySelector<HTMLElement>(".features-group").style.display = "flex";
      document.querySelector<HTMLElement>(".resume").style.display = "none";
      this._cameraView.getUIElement().shadowRoot.querySelector<HTMLElement>(".single-mode-mask")?.remove();
      this._cameraView.getUIElement().shadowRoot.querySelectorAll<HTMLElement>(".single-barcode-result-option")?.forEach(option => option?.remove());
      await this._cameraEnhancer.resume();
      // Since resuming from the paused state causes the video to start playback from the frame where it was paused, 
      // in order to avoid unexpected results from decoding that paused frame after resuming, 
      // we intentionally wait 100ms before starting the video decoding process.
      await new Promise((rs) => { setTimeout(rs, 100) });
      this._cvRouter.startCapturing(this.#currentTemplate);
    })
  }

  #handleResultReceiver() {
    const crr = new CapturedResultReceiver();
    crr.onCapturedResultReceived = async (result) => {
      if (this.#customDrawingLayer) this.#customDrawingLayer.clearDrawingItems();
      if (!result.decodedBarcodesResult) return;
      if (this.config.scannerViewConfig.customHighlightForBarcode) {
        let customHighlightItems: QuadDrawingItem[] = [];
        for (let barcodeResultItem of result.decodedBarcodesResult.barcodeResultItems) {
          customHighlightItems.push(this.config.scannerViewConfig.customHighlightForBarcode(barcodeResultItem));
        }
        this.#customDrawingLayer.addDrawingItems(customHighlightItems);
      }
      if (this.config.scanMode === EnumScanMode.SM_SINGLE) {
        this.#handleSingleModeLogic(result);
      } else {
        this.#handleContinousModeLogic(result);
      }
    }
    this._cvRouter.addResultReceiver(crr);
  }

  async #handleResultFilter() {
    if (!this.#filter) this.#filter = new MultiFrameResultCrossFilter();
    this.#filter.enableResultCrossVerification(2, true);
    this.#filter.enableResultDeduplication(2, true);
    this.#filter.setDuplicateForgetTime(2, this.config.duplicateForgetTime);
    await this._cvRouter.addResultFilter(this.#filter);

    // To ensure that the deduction logic follows the checksum-25 deduplication rule, while still being able to retrieve the filtered results.
    this.#filter.isResultCrossVerificationEnabled = () => false;
    this.#filter.isResultDeduplicationEnabled = () => false;
  }

  #handleSingleModeLogic(result: CapturedResult) {
    const shadowRoot = this._cameraView.getUIElement().shadowRoot;
    let pChooseResult = new Promise<BarcodeResultItem>(rs => {
      if (result.decodedBarcodesResult.barcodeResultItems.length > 1) {
        this.#showSingleModeMask();
        let options = [];
        for (let item of result.decodedBarcodesResult.barcodeResultItems) {
          let xSum = 0, ySum = 0;
          for (let i = 0; i < 4; ++i) {
            let p = item.location.points[i];
            xSum += p.x;
            ySum += p.y;
          }
          let visibleArea = this._cameraEnhancer.getVisibleAreaInVideoXY({ isConsiderRegionBox: true, rounded: true });
          let center = this._cameraEnhancer.videoXY2FixedLT([{ x: visibleArea.x + xSum / 4, y: visibleArea.y + ySum / 4 }]);
          let option = document.createElement('div');
          option.className = 'single-barcode-result-option';
          Object.assign(option.style, {
            position: "fixed",
            width: "25px",
            height: "25px",
            border: "#fff solid 4px",
            transform: "translate(-50%, -50%)",
            animation: "1s infinite alternate result-option-flash",
            "box-sizing": "border-box",
            "border-radius": "16px",
            "background": "#080",
            "cursor": "pointer"
          })
          option.style.left = center[0].left + 'px';
          option.style.top = center[0].top + 'px';
          option.addEventListener('click', () => {
            rs(item);
          });
          options.push(option);
        }
        shadowRoot.append(...options);
      } else {
        rs(result.decodedBarcodesResult.barcodeResultItems[0]);
      }
    });

    pChooseResult.then(async (item) => {
      const oriImgItem = (result.items.filter(item => item.type === EnumCapturedResultItemType.CRIT_ORIGINAL_IMAGE)[0] as OriginalImageResultItem);
      const originalImageResult = oriImgItem.imageData;
      const getBarcodeImage = (): DSImageData => {
        const originalImageCanvas = _toCanvas(originalImageResult);
        const points = item.location.points;
        const minX = Math.min(...points.map((p) => p.x));
        const minY = Math.min(...points.map((p) => p.y));
        const maxX = Math.max(...points.map((p) => p.x));
        const maxY = Math.max(...points.map((p) => p.y));
        const width = maxX - minX;
        const height = maxY - minY;

        const barcodeImageCanvas = document.createElement("canvas");
        barcodeImageCanvas.width = width;
        barcodeImageCanvas.height = height;
        const barcodeImageCanvasCtx = barcodeImageCanvas.getContext("2d");
        if (!barcodeImageCanvasCtx) {
          console.warn("Failed to create canvas context.");
          return null;
        }

        barcodeImageCanvasCtx.beginPath();
        barcodeImageCanvasCtx.moveTo(points[0].x - minX, points[0].y - minY);
        for (let i = 1; i < points.length; i++) {
          barcodeImageCanvasCtx.lineTo(points[i].x - minX, points[i].y - minY);
        }
        barcodeImageCanvasCtx.closePath();
        barcodeImageCanvasCtx.clip();

        barcodeImageCanvasCtx.drawImage(originalImageCanvas, -minX, -minY);
        const imageData = barcodeImageCanvasCtx.getImageData(0, 0, barcodeImageCanvas.width, barcodeImageCanvas.height);

        const _DSImageData: DSImageData = {
          bytes: new Uint8Array(imageData.data),
          width: imageData.width,
          height: imageData.height,
          stride: imageData.width * 4,
          format: EnumImagePixelFormat.IPF_ABGR_8888
        }

        return _DSImageData;
      }
      const _singleBarcodeScanResult: BarcodeScanResult = {
        status: {
          code: EnumResultStatus.RS_SUCCESS,
          message: "Success."
        },
        originalImageResult,
        barcodeImage: getBarcodeImage(),
        barcodeResults: [item]
      }

      this.#consume(item);

      BarcodeScanner.#launchPromise.resolve(_singleBarcodeScanResult);
      this.dispose();
    });
  }

  #handleContinousModeLogic(result: CapturedResult) {
    for (let item of result.decodedBarcodesResult.barcodeResultItems) {
      if ((item as any).duplicate !== false) continue; //TODO
      const duplicateResultIndex = this.#uniqueBarcodesList.barcodeResults.findIndex((result) => {
        return `${result.formatString}_${result.text}` === `${item.formatString}_${item.text}`;
      })
      if (duplicateResultIndex === -1) {
        (item as any).count = 1;
        this.#uniqueBarcodesList.barcodeResults.unshift(item);
        this.#renderUniqueResultsList(item);
      } else {
        (this.#uniqueBarcodesList.barcodeResults[duplicateResultIndex] as any).count++;
        this.#renderResultCount(duplicateResultIndex);
      }
      this.config.onUniqueBarcodeScanned && this.config.onUniqueBarcodeScanned(item);
    }
  }

  #showSingleModeMask() {
    const shadowRoot = this._cameraView.getUIElement().shadowRoot;
    if (shadowRoot.querySelector(".single-mode-mask")) return;
    const maskDiv = document.createElement("div");
    maskDiv.className = "single-mode-mask";
    Object.assign(maskDiv.style, {
      width: "100%",
      height: "100%",
      position: "absolute",
      top: "0",
      left: "0",
      right: "0",
      bottom: "0",
      opacity: "0.5",
      "background-color": "#4C4C4C",
    })
    shadowRoot.append(maskDiv);
    document.querySelector<HTMLElement>(".features-group").style.display = "none";
    document.querySelector<HTMLElement>(".btn-close").style.display = "none";
    document.querySelector<HTMLElement>(".resume").style.display = "block";
    this._cameraEnhancer.pause();
    this._cvRouter.stopCapturing();
  }

  #renderUniqueResultsList(item?: BarcodeResultItem) {
    if (!this.config.showResultView) return;
    const noResultSvg = document.querySelector<HTMLElement>(".no-result-svg");
    const isShowResultView = this.config.showResultView && this.config.scanMode !== EnumScanMode.SM_SINGLE;
    if (!isShowResultView) return;
    const mainList = document.querySelector(".main-list");
    if (!item) {
      mainList.textContent = "";
      if (this.config.showPoweredByDynamsoft) {
        noResultSvg.style.display = "inline";
      }
      return;
    }
    noResultSvg.style.display = "none";

    const createResultItemNode = (item: BarcodeResultItem): HTMLDivElement => {
      const reusltItemNode = this.#resultItemNode.cloneNode(true) as HTMLDivElement;

      const formatStringDiv = reusltItemNode.querySelector<HTMLDivElement>(".format-string");
      formatStringDiv.innerText = item.formatString;

      const textDiv = reusltItemNode.querySelector<HTMLDivElement>(".text-string");
      textDiv.innerText = item.text.replace(/\n|\r/g, "");

      reusltItemNode.id = `${item.formatString}_${item.text}`;

      const deleteIconDiv = reusltItemNode.querySelector<HTMLDivElement>(".delete-icon");
      deleteIconDiv.addEventListener("click", () => {
        const resultNodeList = [...document.querySelectorAll<HTMLDivElement>(".main-list .result-item")];
        const targetIndex = resultNodeList.findIndex((node) => {
          return node.id === `${item.formatString}_${item.text}`;
        })
        this.#uniqueBarcodesList.barcodeResults.splice(targetIndex, 1);
        resultNodeList[targetIndex].remove();
        if (this.#uniqueBarcodesList.barcodeResults.length === 0 && this.config.showPoweredByDynamsoft) {
          document.querySelector<HTMLElement>(".no-result-svg").style.display = "inline";
        }
      })

      return reusltItemNode;
    }

    const reusltItemDiv = createResultItemNode(item);
    mainList.insertBefore(reusltItemDiv, document.querySelector(".result-item"));
  }

  #renderResultCount(index: number) {
    if (!this.config.showResultView) return;
    const resultNodeList = document.querySelectorAll(".main-list .result-item");
    const resultCountDiv = resultNodeList[index].querySelector(".result-count");
    let currentCount = parseInt(resultCountDiv.textContent.replace("x", ""));
    resultNodeList[index].querySelector(".result-count").textContent = `x${++currentCount}`
  }

  #handleUploadImageBtn(fragment: DocumentFragment) {
    if (this.config.showUploadImageButton) {
      const btnUploadImage = fragment.querySelector<HTMLLabelElement>(".btn-upload-image");
      btnUploadImage.style.display = "flex";
      btnUploadImage.addEventListener("change", async (e: InputEvent & { target: HTMLInputElement }) => {
        const files = e.target.files;
        if (!files) return;
        const launchResult: BarcodeScanResult = {
          status: {
            code: EnumResultStatus.RS_SUCCESS,
            message: "Success."
          },
          barcodeResults: []
        }
        let decodedCount = 0;
        this.#showOrHiddenLoadingPage(`Capturing... [${decodedCount}/${files.length}]`, true);
        let hasUnSupportedFile = false;
        for (let i = 0; i < files.length; i++) {
          if (!isSupportedImageFile(files[i])) {
            hasUnSupportedFile = true;
            break;
          }
        }
        if (hasUnSupportedFile) {
          BarcodeScanner.#launchPromise.reject(new Error("Upload failed: one or more files are in unsupported formats. Please make sure all files are .jpg,.jpeg,.ico,.gif,.svg,.webp,.png,.bmp."));
          this.dispose();
          return;
        }
        for (let file of files) {
          try {
            this._cvRouter.stopCapturing();
            const result = await this.decode(file, this.config.utilizedTemplateNames.image);
            if (result.decodedBarcodesResult) {
              if (this.config.scanMode === EnumScanMode.SM_MULTI_UNIQUE) {
                for (let item of result.decodedBarcodesResult.barcodeResultItems) {
                  const duplicateResultIndex = this.#uniqueBarcodesList.barcodeResults.findIndex((result) => {
                    return `${result.formatString}_${result.text}` === `${item.formatString}_${item.text}`;
                  })
                  if (duplicateResultIndex === -1) {
                    (item as any).count = 1;
                    this.#uniqueBarcodesList.barcodeResults.unshift(item);
                    this.#renderUniqueResultsList(item);
                  } else {
                    (this.#uniqueBarcodesList.barcodeResults[duplicateResultIndex] as any).count++;
                    this.#renderResultCount(duplicateResultIndex);
                  }
                  this.config.onUniqueBarcodeScanned && this.config.onUniqueBarcodeScanned(item);
                }
              } else {
                if (result.decodedBarcodesResult.barcodeResultItems) {
                  for (let item of result.decodedBarcodesResult.barcodeResultItems) {
                    const findItem = launchResult.barcodeResults.find((result) => {
                      return `${result.text}_${result.formatString}` === `${item.text}_${item.formatString}`
                    });
                    if (!findItem) {
                      (item as any).count = 1;
                      launchResult.barcodeResults.push(item);
                    } else {
                      (findItem as any).count++;
                    }
                  }
                }
              }
            }
            this.#showOrHiddenLoadingPage(`Capturing... [${++decodedCount}/${files.length}]`, true);
          } catch (ex: any) {
            launchResult.status = {
              code: EnumResultStatus.RS_FAILED,
              message: ex.message || ex
            }
            BarcodeScanner.#launchPromise.reject(new Error(launchResult.status.message));
            this.dispose();
            return;
          }
        }
        this.#showOrHiddenLoadingPage("Loading...", false);
        if (this.config.scanMode === EnumScanMode.SM_SINGLE) {
          BarcodeScanner.#launchPromise.resolve(launchResult);
          this.dispose();
        } else {
          this._cvRouter.startCapturing(this.#currentTemplate);
        }
        e.target.value = "";
      });
    }
  }

  #handleFlashBtnsVisibility(option: { auto: boolean; open: boolean; close: boolean; notSupport: boolean }) {
    document.querySelector<HTMLElement>(".btn-flash-not-support").style.display = option.notSupport ? "inline" : "none";
    document.querySelector<HTMLElement>(".btn-flash-auto").style.display = option.auto ? "inline" : "none";
    document.querySelector<HTMLElement>(".btn-flash-open").style.display = option.open ? "inline" : "none";
    document.querySelector<HTMLElement>(".btn-flash-close").style.display = option.close ? "inline" : "none";
  }

  #showOrHiddenLoadingPage(content: string, isShow: boolean) {
    const loadingPage = document.querySelector<HTMLElement>(".loading-page");
    const loadingTextSpan = document.querySelector(".loading-page span") as HTMLElement;
    loadingTextSpan && (loadingTextSpan.innerText = content);
    loadingPage && (loadingPage.style.display = isShow ? "flex" : "none");
  }

  #consume(item: BarcodeResultItem) {
    let taskID = getNextTaskID();
    mapTaskCallBack[taskID] = () => { };

    worker.postMessage({
      type: "cvr_cc",
      id: taskID,
      instanceID: this._cvRouter._instanceID,
      body: {
        text: item.text,
        strFormat: item.format.toString(),
        isDPM: item.isDPM
      }
    });
  }
}