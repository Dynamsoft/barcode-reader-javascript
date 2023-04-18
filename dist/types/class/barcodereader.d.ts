/// <reference types="node" />
import { TextResult } from "../interface/textresult";
import { RuntimeSettings } from "../interface/runtimesettings";
import { EnumImagePixelFormat } from "../enum/enumimagepixelformat";
import { BarcodeReaderException } from "../interface/barcodereaderexception";
import { Region } from "../interface/region";
import { CameraEnhancer, DCEFrame } from 'dynamsoft-camera-enhancer';
import { Howl } from 'dm-howler';
import { ImageSource } from '../interface/imagesource';
import { DSImage } from '../interface/dsimage';
import { ScanSettings } from '../interface/scanSettings';
import { ScannerPlayCallbackInfo } from '../interface/scannerplaycallbackinfo';
import { Warning } from '../interface/warning';
export default class BarcodeReader {
    private static _jsVersion;
    private static _jsEditVersion;
    protected static _version: string;
    /**
     * Get the current version.
     */
    static get version(): string;
    protected static _license: string;
    static get license(): string;
    /**
     * Get or set the Dynamsoft Barcode Reader SDK product keys.
     * ```js
     * Dynamsoft.DBR.BarcodeReader.license = "PRODUCT-KEYS";
     * ```
     * For convenience, you can set `license` in `script` tag instead.
     * ```html
     * <script src="https://cdn.jsdelivr.net/npm/dynamsoft-javascript-barcode/dist/dbr.js" data-license="PRODUCT-KEYS"></script>
     * ```
     */
    static set license(license: string);
    /** @ignore */
    static get productKeys(): string;
    /** @ignore */
    static set productKeys(keys: string);
    /** @ignore */
    static get handshakeCode(): string;
    /** @ignore */
    static set handshakeCode(keys: string);
    /** @ignore */
    static get organizationID(): string;
    /** @ignore */
    static set organizationID(keys: string);
    protected static _sessionPassword: string;
    /**
     * Specify a password to protect the `online key` from abuse.
     * ```js
     * Dynamsoft.DBR.BarcodeReader.license = "123****-mytest";
     * Dynamsoft.DBR.BarcodeReader.sessionPassword = "@#$%****";
     * ```
     * Since js in the browser is plaintext, it is not safe to set a password. It is recommended that you bind the `domain` as `Validation field` in the [handshake settings in dynamsoft website](https://www.dynamsoft.com/lts/index.html#/handshakeCodes) or your self-hosted license server.
     *
     * In nodejs, password is meaningful.
     * @see [[license]]
     */
    static set sessionPassword(value: string);
    static get sessionPassword(): string;
    /**
     * @ignore
     */
    static browserInfo: {
        browser: string;
        version: number;
        OS: string;
    };
    /**
     * Detect environment and get a report.
     * ```js
     * console.log(await Dynamsoft.DBR.BarcodeReader.detectEnvironment());
     * // {"wasm":true, "worker":true, "getUserMedia":true, "camera":true, "browser":"Chrome", "version":90, "OS":"Windows"}
     * ```
     */
    static detectEnvironment(): Promise<any>;
    /** @ignore */
    static _workerName: string;
    protected static _engineResourcePath?: string;
    static get engineResourcePath(): string;
    /**
     * Specify the Barcode Reader SDK engine (WASM) url. The SDK tries to automatically explore the engine location.
     * If the auto-explored engine location is incorrect, you can manually specify the engine location.
     * The property needs to be set before [[loadWasm]].
     * ```js
     * Dynamsoft.DBR.BarcodeReader.engineResourcePath = "https://cdn.jsdelivr.net/npm/dynamsoft-javascript-barcode/dist/";
     * await Dynamsoft.DBR.BarcodeReader.loadWasm();
     * ```
    */
    static set engineResourcePath(value: string);
    /** @ignore */
    protected static _licenseServer?: string[];
    static get licenseServer(): string[] | string;
    /**
     * Specify the license server URL.
    */
    static set licenseServer(value: string[] | string);
    private static _deviceFriendlyName;
    /** @ignore */
    static get deviceFriendlyName(): string;
    /** @ignore */
    static set deviceFriendlyName(value: string);
    static authCacheVersion: string;
    /** @ignore */
    static _isShowRelDecodeTimeInResults: boolean;
    /** @ignore */
    static _onLog: any;
    /** @ignore */
    static _bWasmDebug: boolean;
    /** @ignore */
    static _bNeverShowDialog: boolean;
    /**
     * Whether to use full feature wasm. The api may change in later version.
     * For web, `_bUseFullFeature` is false as default.
     * For Node.js, `_bUseFullFeature` will not work, and BarcodeReader will always work on full feature.
     * The property needs to be set before `loadWasm`.
     * <pre>
     * Compact wasm:
     * oned + qr + pdf417 + datamatrix.
     * ===
     * Full wasm:
     * all supported barcode format +
     * high level deblur available (lv8, 9) +
     * DPM +
     * template API +
     * intermediate results API
     * ===
     * e.g.:
     * Use compact in video deocode (small, download and initialization fast).
     * Use full in file decode (need high level deblur).
     * </pre>
     *
     * ```js
     * DBR.BarcodeReader._bUseFullFeature = true;
     * await DBR.BarcodeReader.loadWasm();
     * ```
     */
    protected static __bUseFullFeature: boolean;
    static get _bUseFullFeature(): boolean;
    static set _bUseFullFeature(value: boolean);
    /** @ignore */
    static _dbrWorker: Worker;
    protected static _nextTaskID: number;
    protected static _taskCallbackMap: Map<number, (body: any) => void>;
    private static _pLoad;
    /** @ignore */
    static isImageSource(value: any): boolean;
    /** @ignore */
    static isDSImage(value: any): boolean;
    /** @ignore */
    static isDCEFrame(value: any): boolean;
    /** @ignore */
    _instanceID: number;
    protected _ifSaveOriginalImageInACanvas: boolean;
    /**
     * Whether to save the original image into canvas.
     * ```js
     * reader.ifSaveOriginalImageInACanvas = true;
     * let results = await reader.decode(source);
     * document.body.append(reader.getOriginalImageInACanvas());
     * ```
     */
    get ifSaveOriginalImageInACanvas(): boolean;
    set ifSaveOriginalImageInACanvas(value: boolean);
    /** @ignore */
    protected oriCanvas?: HTMLCanvasElement;
    /** @ignore */
    protected oriCanvasData?: any;
    /**
     * Return a reference of the original canvas.
     * ```js
     * reader.ifSaveOriginalImageInACanvas = true;
     * let results = await reader.decode(source);
     * document.body.append(reader.getOriginalImageInACanvas());
     * ```
     */
    getOriginalImageInACanvas(): any;
    /** @ignore  */
    private canvas;
    protected bFilterRegionInJs: boolean;
    protected userDefinedRegion: any;
    protected _region?: Region | Region[];
    protected set region(value: null | Region | Region[]);
    protected get region(): null | Region | Region[];
    /** @ignore */
    _timeStartDecode: any;
    /** @ignore */
    _timeEnterInnerDBR: any;
    /** @ignore */
    _timeGetMessage: any;
    /** @ignore */
    decodeRecords: any;
    /**
     * @ignore A callback when wasm download success in browser environment.
     */
    static _onWasmDownloaded: () => void;
    /**
     * Check if the decoding module is loaded.
     * @category Initialize and Destroy
     */
    static isWasmLoaded(): boolean;
    /**
     * Indicates whether the instance has been destroyed.
     */
    protected bDestroyed: boolean;
    isContextDestroyed(): boolean;
    /** @ignore */
    protected static _lastErrorCode: number;
    /** @ignore */
    static get lastErrorCode(): number;
    /** @ignore */
    protected static _lastErrorString: string;
    /** @ignore */
    static get lastErrorString(): string;
    /** @ignore */
    protected static _setWarnnedEx: Set<string>;
    /** @ignore */
    protected _lastErrorCode: number;
    /** @ignore */
    get lastErrorCode(): number;
    /** @ignore */
    protected _lastErrorString: string;
    /** @ignore */
    get lastErrorString(): string;
    /** @ignore */
    _lastInnerDecodeDuration: number;
    private static _defaultUIElementURL;
    static get defaultUIElementURL(): string;
    /**
     * The url of the default scanner UI.
     * Can only be changed before `createInstance`.
     * ```js
     * Dynamsoft.DBR.BarcodeScanner.defaultUIElementURL = "https://cdn.jsdelivr.net/npm/dynamsoft-javascript-barcode/dist/dbr.ui.html";
     * let pScanner = null;
     * (async()=>{
     *     let scanner = await (pScanner = pScanner || Dynamsoft.DBR.BarcodeScanner.createInstance());
     *     await scanner.show();
     * })();
     * ```
     */
    static set defaultUIElementURL(value: string);
    static onWarning: (warning: Warning) => void;
    protected static _fireHTTPSWarnning(): void;
    /** @ignore */
    intervalTime: number;
    /** @ignore */
    protected _intervalGetVideoFrame: number;
    protected _loopReadVideoTimeoutId: any;
    /** @ignore */
    protected array_getFrameTimeCost: any[];
    /** @ignore */
    protected array_decodeFrameTimeCost: any[];
    /** @ignore */
    protected _indexCurrentDecodingFrame: number;
    protected _dbrDrawingLayer: any;
    protected _arrPolygons: any;
    protected _bPauseScan: boolean;
    protected _intervalDetectVideoPause: number;
    /** @ignore */
    beepSound: Howl;
    private _soundSource;
    private get soundSource();
    private set soundSource(value);
    /**
     * Whether to play sound when the scanner reads a barcode successfully.
     * Default value is `false`, which does not play sound.
     * Use `frame` or `true` to play a sound when any barcode is found within a frame.
     * Use `unique` to play a sound only when any unique/unduplicated barcode is found within a frame.
     * ```js
     * // A user gesture required. https://developers.google.com/web/updates/2017/09/autoplay-policy-changes#chrome_enterprise_policies
     * startPlayButton.addEventListener('click', function() {
     *   scanner.bPlaySoundOnSuccessfulRead = true;
     * });
     * ```
     * refer: `favicon bug` https://bugs.chromium.org/p/chromium/issues/detail?id=1069731&q=favicon&can=2
     * @ignore
     */
    protected bPlaySoundOnSuccessfulRead: (boolean | string);
    private get whenToPlaySoundforSuccessfulRead();
    /**
     * Whether to play sound when the scanner reads a barcode successfully.
     * Default value is `never`, which does not play sound.
     * Use `frame` to play a sound when any barcode is found within a frame.
     * Use `unique` to play a sound only when any unique/unduplicated barcode is found within a frame.
     * ```js
     * // A user gesture required. https://developers.google.com/web/updates/2017/09/autoplay-policy-changes#chrome_enterprise_policies
     * startPlayButton.addEventListener('click', function() {
     *   scanner.whenToPlaySoundforSuccessfulRead = 'frame';
     * });
     * ```
     * refer: `favicon bug` https://bugs.chromium.org/p/chromium/issues/detail?id=1069731&q=favicon&can=2
     * @ignore
     */
    private set whenToPlaySoundforSuccessfulRead(value);
    /**
     * Whether to vibrate when the scanner reads a barcode successfully.
     * Default value is `false`, which does not vibrate.
     * Use `frame` or `true` to vibrate when any barcode is found within a frame.
     * Use `unique` to vibrate only when any unique/unduplicated barcode is found within a frame.
     * ```js
     * // Can I use? https://caniuse.com/?search=vibrate
     * // A user gesture required. https://developers.google.com/web/updates/2017/09/autoplay-policy-changes#chrome_enterprise_policies
     * startVibrateButton.addEventListener('click', function() {
     *   scanner.bVibrateOnSuccessfulRead = true;
     * });
     * ```
     * @ignore
     */
    protected bVibrateOnSuccessfulRead: (boolean | string);
    /**
     * Get or set how long (ms) the vibration lasts.
     * @see [[whenToVibrateforSuccessfulRead]]
     * @ignore
     */
    protected vibrateDuration: number;
    private get whenToVibrateforSuccessfulRead();
    /**
     * Whether to vibrate when the scanner reads a barcode successfully.
     * Default value is `never`, which does not vibrate.
     * Use `frame` to vibrate when any barcode is found within a frame.
     * Use `unique` to vibrate only when any unique/unduplicated barcode is found within a frame.
     * ```js
     * // Can I use? https://caniuse.com/?search=vibrate
     * // A user gesture required. https://developers.google.com/web/updates/2017/09/autoplay-policy-changes#chrome_enterprise_policies
     * startPlayButton.addEventListener('click', function() {
     *   scanner.whenToVibrateforSuccessfulRead = 'frame';
     * });
     * ```
     * @ignore
     */
    private set whenToVibrateforSuccessfulRead(value);
    protected captureAndDecodeInParallel: boolean;
    protected autoSuggestTip: boolean;
    protected suggestTipFrameArray: Array<boolean>;
    protected suggestTipFrameLimit: number[];
    protected noIntermediateResultsCount: number;
    protected noIntermediateResultsTipLimit: number;
    protected tinyBarcodeTipModuleSizeLimit: number;
    protected hugeBarcodeTipLimit: number;
    protected autoZoomInFrameArray: Array<boolean>;
    protected autoZoomInFrameLimit: number[];
    protected autoZoomInStepRate: number;
    protected autoZoomInMaxStep: number;
    protected autoZoomInMaxTimes: number;
    protected autoZoomInMinStep: number;
    protected autoZoomInIdealModuleSize: number;
    protected autoZoomOutFrameCount: number;
    protected autoZoomOutFrameLimit: number;
    protected autoZoomOutStepRate: number;
    protected autoZoomOutMinValue: number;
    protected autoZoomOutMinStep: number;
    protected autoZoomOutStepRate_2: number;
    protected autoZoomOutMinValue_2: number;
    protected frameArrayInIdealZoom: Array<boolean>;
    protected frameLimitInIdealZoom: number[];
    protected enableZoomOutInIdealZoom: boolean;
    protected nextActionInIdealZoom: string;
    protected autoFocusFrameArray: Array<boolean>;
    protected autoFocusFrameLimit: number[];
    protected autoZoomIdealArea: number[];
    protected autoZoomTargetBorder: number;
    protected autoZoomDetectionArea: number;
    protected autoZoom: boolean;
    protected autoFocus: boolean;
    protected _clearResultsCanvasTimeoutId: any;
    _resultHighlightingDuration: number;
    private _dce;
    protected set dce(value: CameraEnhancer);
    protected get dce(): CameraEnhancer;
    protected _drawingItemNamespace: any;
    protected _styleIdBeforeVerification: number;
    private _dceControler;
    private _imgSource;
    private callbackCameraChange?;
    private callbackResolutionChange?;
    private callbackCameraClose?;
    private callbackSingleFrameAcquired?;
    protected _maxCvsSideLength: number;
    /** @ignore */
    set maxCvsSideLength(value: number);
    get maxCvsSideLength(): number;
    private _registerDCEControler;
    private _logoutDCEControler;
    setImageSource(imgSource: ImageSource | CameraEnhancer, options?: any): Promise<void>;
    /**
     * Before most operations, `loadWasm` needs to be excuted firstly.
     * Most time, you do not need excute `loadWasm` manually. Because when you excute [[createInstance]], `loadWasm` will be excuted implicitly.
     * Some properties can't be changed after `loadWasm`.
     * Calling `loadWasm` in advance can avoid the long wait when `createInstance`.
     * ```js
     * window.addEventListener('DOMContentLoaded', (event) => {
     *   DBR.BarcodeReader.loadWasm();
     * });
     * ```
     * @category Initialize and Destroy
     */
    static loadWasm(): Promise<void>;
    /**
     * @param type "warn" or "error"
     * @param content
     * @returns
     */
    protected static showDialog(type: string, content: string): Promise<void>;
    protected static createInstanceInWorker(bScanner?: boolean): Promise<number>;
    protected constructor();
    /**
     * Create a `BarcodeReader` instance.
     * ```
     * let pReader = null;
     * (async()=>{
     *     let reader = await (pReader = pReader || Dynamsoft.DBR.BarcodeReader.createInstance());
     * })();
     * ```
      * @category Initialize and Destroy
     */
    static createInstance(): Promise<BarcodeReader>;
    protected clearMapDecodeRecord(): Promise<void>;
    /**
     * Decode barcodes from a image.
     *
     * The main decoding method can accept a variety of data types, including binary data, images, base64 (with mime), urls, etc.
     *
     * The image format can be `png`, `jpeg`, `bmp`, `gif` and a few other (some browsers support `webp`, `tif`).
     *
     * The image, whose width or height larger than 2048 pixels in iPhone/Android or 4096 pixels in other OS, will be scaled down.
     *
     * ```js
     * let results = await reader.decode(blob);
     * for(let result of results){
     *     console.log(result.barcodeText);
     * }
     *
     * let results2 = await reader.decode(htmlImageElement);
     * let results2 = await reader.decode(url);
     *
     * // like `data:image/png;base64,iV************`
     * let results3 = await reader.decode(base64WithMime);
     * ```
     *
     * And you can get a frame to decode from the `HTMLVideoElement`.
     *
     * ```js
     * // The frame currently played will be decode.
     * let results;
     * try{
     *   results = await reader.decode(htmlVideoElement);
     * }catch(ex){
     *   // If no frame in the video, will throw an exception.
     * }
     * ```
     * If you need to continuously decode a video, you can use [BarcodeScanner](../BarcodeScanner/index.md) instead.
     * @param source
     * @category Decode
     */
    decode(source: Blob | Buffer | ArrayBuffer | Uint8Array | Uint8ClampedArray | HTMLImageElement | HTMLCanvasElement | HTMLVideoElement | string | DCEFrame | DSImage): Promise<TextResult[]>;
    /**
     * The decoding method can accept base64 with or without mime.
     * e.g. `data:image/jpg;base64,Xfjshekk....` or `Xfjshekk...`.
     * ```js
     * let results = await reader.decodeBase64String(strBase64);
     * for(let result of results){
     *     console.log(result.barcodeText);
     * }
     * ```
     * @param base64
     * @category Decode
     */
    decodeBase64String(base64: string): Promise<TextResult[]>;
    /**
     * The decoding method can accept url. The url source need to be in the same domain or allowed cors.
     * ```js
     * let results = await reader.decodeUrl("./1.png");
     * for(let result of results){
     *     console.log(result.barcodeText);
     * }
     * ```
     * @param url
     * @category Decode
     */
    decodeUrl(url: string): Promise<TextResult[]>;
    /**
     * Decodes barcodes from the memory buffer containing image pixels in defined format.
     * @ignore
     */
    _decodeBuffer_Uint8Array(buffer: Uint8Array | Uint8ClampedArray, width: number, height: number, stride: number, format: EnumImagePixelFormat, orientation?: number, config?: any): Promise<TextResult[]>;
    /**
     *
     * @param buffer
     * @param width
     * @param height
     * @param stride
     * @param format
     * @param config
     * @ignore
     */
    _decodeBuffer_Blob(buffer: Blob, width: number, height: number, stride: number, format: EnumImagePixelFormat, orientation?: number, config?: any): Promise<any>;
    /**
     * Decode barcodes from raw image data.
     * @param buffer
     * @param width
     * @param height
     * @param stride
     * @param format
     * @param config
     * @category Decode
     */
    decodeBuffer(buffer: Uint8Array | Uint8ClampedArray | ArrayBuffer | Blob | Buffer, width: number, height: number, stride: number, format: EnumImagePixelFormat, orientation?: number, config?: any): Promise<TextResult[]>;
    /** @ignore */
    _decodeFileInMemory_Uint8Array(bytes: Uint8Array): Promise<any>;
    /**
     * Gets current runtime settings.
     * ```js
     * let settings = await reader.getRuntimeSettings();
     * settings.deblurLevel = 5;
     * await reader.updateRuntimeSettings(settings);
     * ```
     * @see [RuntimeSettings](https://www.dynamsoft.com/barcode-reader/programming/c-cplusplus/struct/PublicRuntimeSettings.html?ver=latest&utm_source=github&package=js)
     * @category Runtime Settings
     */
    getRuntimeSettings(): Promise<RuntimeSettings>;
    /**
     * Update runtime settings with a given struct, or a string of `speed`, `balance` or `coverage` to use preset settings for BarcodeReader.
     * The default settings for BarcodeReader is `coverage`.
     * ```js
     * await reader.updateRuntimeSettings('balance');
     * let settings = await reader.getRuntimeSettings();
     * settings.barcodeFormatIds = Dynamsoft.DBR.EnumBarcodeFormat.BF_ONED;
     * await reader.updateRuntimeSettings(settings);
     * ```
     * @see [RuntimeSettings](https://www.dynamsoft.com/barcode-reader/programming/c-cplusplus/struct/PublicRuntimeSettings.html?ver=latest&utm_source=github&package=js)
     * @category Runtime Settings
     */
    updateRuntimeSettings(settings: RuntimeSettings | string): Promise<void>;
    /**
     * Resets all parameters to default values.
     * ```js
     * await reader.resetRuntimeSettings();
     * ```
     * @category Runtime Settings
     */
    resetRuntimeSettings(): Promise<void>;
    _resetRuntimeSettingsToCppDefault(): Promise<void>;
    /**
     * Output runtime settings to a string.
     * ```js
     * let strSettings = await reader.outputRuntimeSettingsToString();
     * ```
     * The method is only supported in the full feature edition.
     * @ignore
     * @category Runtime Settings
     */
    outputRuntimeSettingsToString(): Promise<string>;
    /**
     * Initialize runtime settings with the settings in given JSON string.
     * ```js
     * await reader.initRuntimeSettingsWithString("{\"Version\":\"3.0\", \"ImageParameter\":{\"Name\":\"IP1\", \"BarcodeFormatIds\":[\"BF_QR_CODE\"], \"ExpectedBarcodesCount\":10}}");
     * ```
     * The method is only supported in the full feature edition.
     * @ignore
     * @category Runtime Settings
     */
    initRuntimeSettingsWithString(settings: any): Promise<void>;
    private _decode_Blob;
    /**
     *
     * @param arrayBuffer
     * @param config
     * @ignore
     */
    private _decode_ArrayBuffer;
    /**
     *
     * @param uint8Array
     * @param config
     * @ignore
     */
    private _decode_Uint8Array;
    /**
     *
     * @param image
     * @param config
     * @ignore
     */
    private _decode_Image;
    private _decode_Canvas;
    /**
     * decode video is not multi call safe in an instance, we reuse many thing for speed, so make sure wait util one finish then call next
     * @param video
     * @param config
     * @ignore
     */
    _decode_Video(video: HTMLVideoElement, config?: any): Promise<TextResult[]>;
    /**@ignore */
    _decode_DCEFrame(dceFrame: DCEFrame, config?: any): Promise<TextResult[]>;
    /**@ignore */
    _decode_DSImage(dsImage: DSImage, config?: any): Promise<TextResult[]>;
    private _decode_Base64;
    private _decode_Url;
    private _decode_FilePath;
    /**
     * The coordinates of results are related to the cropping image gotten from DCE JS. Transform it to the coordinates related to the whole video/image.
     * @ignore
     */
    static recalculateResultLocation(results: Array<{
        localizationResult: any;
    }>, sx: number, sy: number, sWidth: number, sHeight: number, dWidth: number, dHeight: number): void;
    /** @ignore */
    static BarcodeReaderException(ag0: any, ag1: any): BarcodeReaderException;
    protected _handleRetJsonString(objRet: any): any;
    /**
     * Set argument value for the specified mode parameter.
     * ```js
     * await reader.setModeArgument("BinarizationModes", 0, "EnableFillBinaryVacancy", "1");
     * ```
     * @param modeName
     * @param index
     * @param argumentName
     * @param argumentValue
     * @category Runtime Settings
     */
    setModeArgument(modeName: string, index: number, argumentName: string, argumentValue: string): Promise<void>;
    /**
     * Get argument value for the specified mode parameter.
     * ```js
     * let argumentValue = await reader.getModeArgument("BinarizationModes", 0, "EnableFillBinaryVacancy");
     * ```
     * @param modeName
     * @param index
     * @param argumentName
     * @category Runtime Settings
     */
    getModeArgument(modeName: string, index: number, argumentName: string): Promise<string>;
    /**
     * The method is only supported in the full feature edition.
     * Returns intermediate results containing the original image, the colour clustered image, the binarized Image, contours, Lines, TextBlocks, etc.
     * ```js
     * let imResults = await reader.getIntermediateResults();
     * ```
     * @ignore
     */
    getIntermediateResults(): Promise<any>;
    /** @ignore */
    getIntermediateCanvas(): Promise<HTMLCanvasElement[]>;
    /**
     * The event is triggered after a frame has been scanned.
     * The results object contains all the barcode results in this frame.
     * ```js
     * scanner.onImageRead = results => {
     *     for(let result of results){
     *         console.log(result.barcodeText);
     *     }
     * };
     * scanner.show(); // or open(), to start decoding video stream
     * ```
     * @event onImageRead
     */
    onImageRead?: (results: TextResult[]) => void;
    /**
     * This event is triggered when a new, unduplicated barcode is found.
     * `txt` holds the barcode text result. `result` contains more info.
     * Old barcodes will be remembered for `duplicateForgetTime`.
     * ```js
     * scanner.onUniqueRead = (txt, result) => {
     *     alert(txt);
     *     console.log(result);
     * };
     * scanner.show(); // or open(), to start decoding video stream
     * ```
     * @event onUniqueRead
     */
    onUniqueRead?: (txt: string, result: TextResult) => void;
    /**
     * Get current scan settings.
     * ```js
     * let scanSettings = await scanner.getScanSettings();
     * scanSettings.intervalTime = 50;
     * scanSettings.duplicateForgetTime = 1000;
     * await scanner.updateScanSettings(scanSettings);
     * ```
     */
    getScanSettings(): Promise<ScanSettings>;
    /**
     * Modify and update scan settings.
     * ```js
     * let scanSettings = await scanner.getScanSettings();
     * scanSettings.intervalTime = 50;
     * scanSettings.duplicateForgetTime = 1000;
     * await scanner.updateScanSettings(scanSettings);
     * ```
     * @param settings
     */
    updateScanSettings(settings: ScanSettings): Promise<void>;
    /** @ignore */
    _cloneDecodeResults(results: any): any;
    protected _loopReadVideo(): Promise<void>;
    /**
     * start dce fetching frame loop, and get frame from frame queue
     * @ignore
     */
    protected _getVideoFrame(): DCEFrame;
    /**
     * Add drawing items according to results, and add notes to drawing items.
     * @param results
     * @param notes
     * @returns
     * @ignore
     */
    protected _drawResults(results: Array<{
        localizationResult: any;
        resultState?: number;
    }>, notes?: Array<TextResult>): void;
    /**
     * _promiseStartScan.status == "pending"; // camera is openning.
     * _promiseStartScan.status == "fulfilled"; // camera is opened.
     * _promiseStartScan == null; // camera is closed.
     * @ignore
     */
    private _promiseStartScan;
    /**
     * Bind UI, open the camera, start recognizing.
     * ```js
     * await scanner.startScanning(); // Don not modify DOM. Usually used in framework like React, Vue, Angular.
     * ```
     * Bind UI, open the camera, start recognizing, and remove the UIElement `display` style if the original style is `display:none;`.
     * ```js
     * await scanner.startScanning(true); // Modify Dom and show UI. Useful when you don't use framework.
     * ```
     * @category Open and Close
     */
    startScanning(bShowUI?: boolean): Promise<ScannerPlayCallbackInfo>;
    /**
     * Stop decoding, release camera, unbind UI.
     * @category Open and Close
     */
    stopScanning(bHideUI?: boolean): void;
    /**
     * Pause the recognizing process.
     * @category Pause and Resume
     */
    pauseScanning(options?: any): void;
    /**
     * Resume the recognizing process.
     * @category Pause and Resume
     */
    resumeScanning(): void;
    /**
     * Destroy the `BarcodeReader` instance. If your page needs to create new instances from time to time, don't forget to destroy unused old instances, otherwise it will cause memory leaks.
     * @category Initialize and Destroy
     */
    destroyContext(): void;
}
//# sourceMappingURL=barcodereader.d.ts.map