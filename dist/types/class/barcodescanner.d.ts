import { TextResult } from '../interface/textresult';
import { VideoDeviceInfo } from '../interface/videodeviceinfo';
import { ScannerPlayCallbackInfo } from '../interface/scannerplaycallbackinfo';
import BarcodeReader from './barcodereader';
import { RuntimeSettings } from '../interface/runtimesettings';
import { Region } from '../interface/region';
import { DCEFrame } from 'dynamsoft-camera-enhancer';
import { Warning } from '../interface/warning';
/**
 * The `BarcodeScanner` class is used for video decoding.
 * Its instance gets access to a camera via the 'MediaDevices' interface, then uses its built-in UI to show the camera input and perform continuous barcode scanning on the incoming frames.
 * @example
 * ```js
 * let scanner;
 * (async()=>{
 *     scanner = await Dynamsoft.DBR.BarcodeScanner.createInstance();
 *     scanner.onUniqueRead = txt => console.log(txt);
 *     await scanner.show();
 * })();
 * ```
 * @extends BarcodeReader
 */
export default class BarcodeScanner extends BarcodeReader {
    #private;
    /** @ignore */
    static set _onLog(value: (message: any) => void);
    static get _onLog(): (message: any) => void;
    /**
     * Returns the version of the library including the detailed version numbers of the engine and the main JavaScript code.
     *
     * The engine version is only valid after {@link loadWasm} has been called.
     * @readonly
     */
    static get version(): string;
    /**
     * A callback which is triggered when the running environment is not ideal. In this version, it may get triggered in two scenarios:
     *
     * 1. If the page is opened from the disk
     * 2. The page is hosted in a HTTP site without SSL
     *
     * In both cases, the following warning is returned:
     * ```js
     * {
     *   id: 2,
     *   message: "Not connected via SSL (HTTPS), the SDK may not work correctly."
     * }
     * ```
     * @defaultValue `undefined`
     * @see {@link Warning}
     */
    static onWarning: (warning: Warning) => void;
    protected static _fireHTTPSWarnning(): void;
    /**
     * Test whether there is an available camera. It is also a trick to speed up the opening of the camera.
     * @returns A promise resolving to a object contains the message.
     */
    static testCameraAccess(): Promise<{
        ok: boolean;
        message: string;
    }>;
    /**
     * A callback which is triggered when the resolution is not ideal (< 720P).
     * @defaultValue `undefined`
     * @see {@link Warning}
     */
    onWarning: (warning: Warning) => void;
    private _fireResolutionWarning;
    /**
     * Returns the HTML element that is used by the `BarcodeScanner` instance.
     * @returns The HTML element that is used by the `BarcodeScanner` instance.
     * @see {@link setUIElement}
     * @category UI
     */
    getUIElement(): HTMLElement;
    /**
     * Specifies an HTML element for the `BarcodeScanner` instance to use as its UI. The structure inside the element determines the appearance of the UI.
     * @param elementOrUrl specifies the element or the element url.
     * @returns A promise that resolves when the operation succeeds.
     * @example
     * ```html
     * <div class="dce-video-container" style="postion:relative;width:100%;height:500px;"></div>
     * <script>
     *     let scanner;
     *     (async()=>{
     *         scanner = await Dynamsoft.DBR.BarcodeScanner.createInstance();
     *         await scanner.setUIElement(document.getElementsByClassName("dce-video-container")[0]);
     *         await scanner.open();
     *     })();
     * </script>
     * ```
     * @see {@link getUIElement}
     * @category UI
     */
    setUIElement(elementOrUrl: HTMLElement | string): Promise<void>;
    /**
     * Returns or sets the status of single frame mode.
     * If enabled, the video input will not be played and the user can choose to take a picture with the system camera (mobile only) or select an existing image from the photo library for barcode reading.
     *
     * Because the system camera of a mobile device can provide pictures with better quality, the API is useful when facing complex scenarios such as reading the dense PDF417 code on a driver license.
     *
     * The single-frame mode can only be enabled or disabled before the video input starts playing (before `scanner.show()` is called).
     * @defaultValue In general, the default value is `false`. But if the browser does not support the `MediaDevices`/`getUserMedia`, it will be set as `true` automatically when {@link createInstance} is called.
     * @example
     * ```js
     * let scanner;
     * (async()=>{
     *     scanner = await Dynamsoft.DBR.BarcodeScanner.createInstance();
     *     scanner.singleFrameMode = true;
     *     await scanner.show();
     * })();
     * ```
     */
    get singleFrameMode(): boolean | "image" | "camera";
    set singleFrameMode(value: boolean | "image" | "camera");
    /**
     * Specifies an event handler which fires after the library finishes scanning a frame.
     * @event onFrameRead
     * @defaultValue `undefined`
     * @param results An array of {@link TextResult} object that contains the barcode results in this frame.
     * @example
     * ```js
     * scanner.onFrameRead = results => {
     *     for(let result of results){
     *         console.log(result.barcodeText);
     *     }
     * };
     * ```
     * @see {@link TextResult}
     * @see {@link onUniqueRead}
     */
    onFrameRead?: (results: TextResult[]) => void;
    /**
     * @deprecated Use {@link onUniqueRead} instead.
     */
    get onUnduplicatedRead(): (txt: string, result: TextResult) => void;
    set onUnduplicatedRead(value: (txt: string, result: TextResult) => void);
    /**
     * Returns `HTMLVideoElement` element that the `BarcodeScanner` instance used.
     * @readonly
     */
    get video(): HTMLVideoElement;
    /**
     * Sets or returns the source of the video.
     * You can use this property to specify an existing video as the source to play which will be processed the same way as the video feed from a live camera.
     * @defaultValue `null`
     */
    set videoSrc(source: string | MediaStream | MediaSource | Blob);
    get videoSrc(): string | MediaStream | MediaSource | Blob;
    /**
     * An event that gets triggered whenever a 'Tip' is suggested.
     * @event onTipSuggested
     * @defaultValue `undefined`
     * @param occasion Specifies the occasion for the Tip.
     * @param message The 'Tip' message for the occasion.
     * @see {@link showTip}
     */
    set onTipSuggested(value: (occasion: string, message: string) => void);
    get onTipSuggested(): (occasion: string, message: string) => void;
    private _assertOpen;
    private _barcodeFillStyle;
    /**
     * Specifies the color used inside the shape which highlights a found barcode.
     * @defaultValue `"rgba(254,180,32,0.3)"`
     * @see {@link barcodeStrokeStyle}
     * @see {@link barcodeLineWidth}
     * @see {@link barcodeFillStyleBeforeVerification}
     * @see {@link barcodeStrokeStyleBeforeVerification}
     * @see {@link barcodeLineWidthBeforeVerification}
     * @category UI
     */
    set barcodeFillStyle(style: string);
    get barcodeFillStyle(): string;
    private _barcodeStrokeStyle;
    /**
     * Specifies the color used to paint the outline of the shape which highlights a found barcode.
     * @defaultValue `"rgba(254,180,32,0.9)"`
     * @see {@link barcodeFillStyle}
     * @see {@link barcodeLineWidth}
     * @see {@link barcodeFillStyleBeforeVerification}
     * @see {@link barcodeStrokeStyleBeforeVerification}
     * @see {@link barcodeLineWidthBeforeVerification}
     * @category UI
     */
    set barcodeStrokeStyle(style: string);
    get barcodeStrokeStyle(): string;
    private _barcodeLineWidth;
    /**
     * Specifies the line width of the outline of the shape which highlights a found barcode.
     * @defaultValue `1`
     * @see {@link barcodeFillStyle}
     * @see {@link barcodeStrokeStyle}
     * @see {@link barcodeFillStyleBeforeVerification}
     * @see {@link barcodeStrokeStyleBeforeVerification}
     * @see {@link barcodeLineWidthBeforeVerification}
     * @category UI
     */
    set barcodeLineWidth(width: number);
    get barcodeLineWidth(): number;
    private _barcodeFillStyleBeforeVerification;
    /**
     * Specifies the color used inside the shape which highlights a found linear barcode which has not been verified.
     * @defaultValue `"rgba(248,252,0,0.2)"`
     * @see {@link barcodeStrokeStyleBeforeVerification}
     * @see {@link barcodeLineWidthBeforeVerification}
     * @see {@link barcodeFillStyle}
     * @see {@link barcodeStrokeStyle}
     * @see {@link barcodeLineWidth}
     * @category UI
     */
    set barcodeFillStyleBeforeVerification(style: string);
    get barcodeFillStyleBeforeVerification(): string;
    private _barcodeStrokeStyleBeforeVerification;
    /**
     * Specifies the color used to paint the outline of the shape which highlights a found linear barcode which has not been verified.
     * @defaultValue `"transparent"`
     * @see {@link barcodeFillStyleBeforeVerification}
     * @see {@link barcodeLineWidthBeforeVerification}
     * @see {@link barcodeFillStyle}
     * @see {@link barcodeStrokeStyle}
     * @see {@link barcodeLineWidth}
     * @category UI
     */
    set barcodeStrokeStyleBeforeVerification(style: string);
    get barcodeStrokeStyleBeforeVerification(): string;
    private _barcodeLineWidthBeforeVerification;
    /**
     * Specifies the line width of the outline of the shape which highlights a found linear barcode which has not been verified.
     * @defaultValue `2`
     * @see {@link barcodeFillStyleBeforeVerification}
     * @see {@link barcodeStrokeStyleBeforeVerification}
     * @see {@link barcodeFillStyle}
     * @see {@link barcodeStrokeStyle}
     * @see {@link barcodeLineWidth}
     * @category UI
     */
    set barcodeLineWidthBeforeVerification(width: number);
    get barcodeLineWidthBeforeVerification(): number;
    /**
     * Specifies the color used in the square-loop shape between the actual scanning area and the boundary of the video input. This shape only appears when the barcode scanning is limited to a specified region.
     * @defaultValue `"rgba(0, 0, 0, 0.5)"`
     * @see {@link regionMaskStrokeStyle}
     * @see {@link regionMaskLineWidth}
     * @category UI
     */
    set regionMaskFillStyle(value: string);
    get regionMaskFillStyle(): string;
    /**
     * Specifies the color used to paint the outline of the scanning region. This outline only appears when the barcode scanning is limited to a specified region.
     * @defaultValue `"rgb(254, 142, 20)"`
     * @see {@link regionMaskFillStyle}
     * @see {@link regionMaskLineWidth}
     * @category UI
     */
    set regionMaskStrokeStyle(value: string);
    get regionMaskStrokeStyle(): string;
    /**
     * Specifies the width of the outline of the scanning region. This outline only appears when the barcode scanning is limited to a specified region.
     * @defaultValue `2`
     * @see {@link regionMaskFillStyle}
     * @see {@link regionMaskStrokeStyle}
     * @category UI
     */
    set regionMaskLineWidth(value: string);
    get regionMaskLineWidth(): string;
    protected bFilterRegionInJs: boolean;
    protected set region(value: null | Region | Region[]);
    protected get region(): null | Region | Region[];
    /**
     * Whether to save the original image into a `HTMLCanvasElement` element. The original image refers to the actual image the library tried to read barcodes from. It can be returned by {@link getOriginalImageInACanvas}.
     * @defaultValue `false`
     * @example
     * ```js
     * scanner.ifSaveOriginalImageInACanvas = true;
     * let results = await scanner.decode(source);
     * document.body.append(scanner.getOriginalImageInACanvas());
     * ```
     * @see {@link getOriginalImageInACanvas}
     */
    set ifSaveOriginalImageInACanvas(value: boolean);
    get ifSaveOriginalImageInACanvas(): boolean;
    private createDCEInstance;
    /** @ignore */
    set maxCvsSideLength(value: number);
    get maxCvsSideLength(): number;
    private constructor();
    /**
     * Create a `BarcodeScanner` object.
     * @returns A promise resolving to the created `BarcodeScanner` object.
     * @example
     * ```js
     * let scanner = await Dynamsoft.DBR.BarcodeScanner.createInstance();
     * ```
     * @see {@link destroyContext}
     * @category Initialize and Destroy
     */
    static createInstance(config?: any): Promise<BarcodeScanner>;
    /**
     * Decode barcodes from the current frame of the video.
     * @returns A promise resolving to an array of {@link TextResult} that contains all the barcode results.
     * @example
     * ```js
     * await scanner.showVideo();
     * console.log(await scanner.decodeCurrentFrame());
     * ```
     * @see {@link TextResult}
     * @category Decode
     */
    decodeCurrentFrame(config?: any): Promise<TextResult[]>;
    /**
     * Update runtime settings.
     * @param settings a `RuntimeSettings` object, or a string represent one of preset templates:
     *
     * `speed`: fast but may miss a few codes;
     *
     * `coverage`: slow but try to find all codes, this is the default setting for a `BarcodeReader` instance;
     *
     * `balance`: between `speed` and `coverage`;
     *
     * `single`: optimized for scanning one single barcode from a video input, this is the default setting for a `BarcodeScanner` instance;
     *
     * `dense`: optimized for scanning dense barcodes such as the PDF417 on driver's license;
     *
     * `distance`: optimized for scanning a barcode that is placed far from the device and appear small in the video stream.
     * @returns A promise that resolves when the operation succeeds.
     * @example
     * ```js
     * await scanner.updateRuntimeSettings('balance');
     * let settings = await scanner.getRuntimeSettings();
     * settings.barcodeFormatIds = Dynamsoft.DBR.EnumBarcodeFormat.BF_ONED;
     * await scanner.updateRuntimeSettings(settings);
     * ```
     * @see {@link RuntimeSettings}
     * @see {@link getRuntimeSettings}
     * @see {@link resetRuntimeSettings}
     * @category Runtime Settings
     */
    updateRuntimeSettings(settings: RuntimeSettings | string): Promise<void>;
    /** @ignore */
    _bindUI(): void;
    /** @ignore */
    _unbindUI(): void;
    private _onPlayed;
    /**
     * This event is triggered when the video stream starts playing.
     * @event
     * @defaultValue `null`
     * @example
     * ```js
     * scanner.onPlayed = rsl=>{ console.log(rsl.width+'x'+rsl.height) };
     * await scanner.show(); // or open, play, setCurrentCamera, like these.
     * ```
     */
    set onPlayed(value: (info: ScannerPlayCallbackInfo) => void);
    get onPlayed(): (info: ScannerPlayCallbackInfo) => void;
    /**
     * Returns infomation of all available cameras on the device.
     * @returns A promise resolving to an array of {@link VideoDeviceInfo} objects.
     * @example
     * ```js
     * let cameras = await scanner.getAllCameras();
     * if(cameras.length){
     *     await scanner.setCurrentCamera(cameras[0]);
     * }
     * ```
     * @see {@link VideoDeviceInfo}
     * @see {@link getCurrentCamera}
     * @category Camera Settings
     */
    getAllCameras(): Promise<VideoDeviceInfo[]>;
    /**
     * Returns information about the current camera.
     * @returns A promise resolving to a {@link VideoDeviceInfo} object.
     * @example
     * ```js
     * let camera = await scanner.getCurrentCamera();
     * ```
     * @see {@link VideoDeviceInfo}
     * @see {@link getAllCameras}
     * @see {@link setCurrentCamera}
     * @category Camera Settings
     */
    getCurrentCamera(): Promise<VideoDeviceInfo>;
    /**
     * Chooses a camera as the video source.
     * @param cameraInfoOrDeviceId Specifies the camera.
     * @returns A promise resolving to a {@link ScannerPlayCallbackInfo} object.
     * @example
     * ```js
     * let cameras = await scanner.getAllCameras();
     * if(cameras.length){
     *     await scanner.setCurrentCamera(cameras[0]);
     * }
     * ```
     * @fires {@link onPlayed}
     * @see {@link ScannerPlayCallbackInfo}
     * @see {@link getCurrentCamera}
     * @category Camera Settings
     */
    setCurrentCamera(cameraInfoOrDeviceId: any): Promise<ScannerPlayCallbackInfo>;
    /**
     * Returns the resolution of the current video input.
     * @returns An array of two numbers representing the resolution.
     * @example
     * ```js
     * let rsl = await scanner.getResolution();
     * console.log(rsl[0] + " x " + rsl[1]);
     * ```
     * @see {@link setResolution}
     * @category Camera Settings
     */
    getResolution(): number[];
    /**
     * Sets the resolution of the current video input. If the specified resolution is not exactly supported, the closest resolution will be applied.
     *
     * If called before `open()` or `show()`, the camera will use the set resolution when it opens. Otherwise, the default resolution is used, which is 1280 x 720 on mobile devices or 1920 x 1080 on desktop.
     * @param width Specifies the horizontal resolution.
     * @param height Specifies the vertical resolution.
     * @returns A promise resolving to a {@link ScannerPlayCallbackInfo} object.
     * @example
     * ```js
     * await scanner.setResolution(width, height);
     * ```
     * @fires {@link onPlayed}
     * @see {@link ScannerPlayCallbackInfo}
     * @see {@link getResolution}
     * @category Camera Settings
     */
    setResolution(width: number | number[], height: number): Promise<ScannerPlayCallbackInfo>;
    /**
     * Returns the current video settings.
     * @returns A `MediaStreamConstraints` object.
     * @see {@link updateVideoSettings}
     * @category Camera Settings
     */
    getVideoSettings(): MediaStreamConstraints;
    /**
     * Modify and update video settings.
     * @param mediaStreamConstraints Specifies the new video settings.
     * @returns A promise resolving to a {@link ScannerPlayCallbackInfo} object.
     * @example
     * ```js
     * await scanner.updateVideoSettings({ video: {width: {ideal: 1280}, height: {ideal: 720}, facingMode: {ideal: 'environment'}} });
     * ```
     * @see {@link ScannerPlayCallbackInfo}
     * @see {@link getVideoSettings}
     * @category Camera Settings
     */
    updateVideoSettings(mediaStreamConstraints: any): Promise<ScannerPlayCallbackInfo | void>;
    /**
     * Indicates whether the camera is turned on.
     * @returns A boolean indicates whether the camera is turned on.
     * @example
     * ```js
     * await scanner.show(); // or open(), showVideo(), openVideo();
     * console.assert(scanner.isOpen(), "scanner should be opened.");
     * await scanner.hide(); // or close();
     * console.assert(!scanner.isOpen(), "scanner should be closed.");
     * ```
     * @category Open and Close
     */
    isOpen(): boolean;
    /**
     * Sets the `object-fit` CSS property of the video element.
     * @param value Specify the new fit type. At present, only "cover" and "contain" are allowed.
     * @see {@link getVideoFit}
     */
    setVideoFit(value: string): void;
    /**
     * Returns the value of the object-fit CSS property of the video element.
     * @returns The value of the object-fit CSS property.
     * @see {@link setVideoFit}
     */
    getVideoFit(): string;
    /**
     * Whether to show the scan region mask.
     * @defaultValue `true`
     */
    set ifShowScanRegionMask(value: boolean);
    get ifShowScanRegionMask(): boolean;
    /**
     * Returns or sets whether to save the last used camera and resolution.
     * This feature makes use of the `localStorage` of the browser.
     *
     * Note: This feature only works on mainstream browsers like Chrome, Firefox and Safari. Other browsers may change the device IDs dynamically thus making it impossible to track the camera.
     * @defaultValue `false`
     */
    set ifSaveLastUsedCamera(value: boolean);
    get ifSaveLastUsedCamera(): boolean;
    /**
     * Returns or sets whether to skip camera inspection at initialization to save time.
     * Note that if a previously used camera is already available in the `localStorage`, the inspection is skipped automatically. Read more on {@link ifSaveLastUsedCamera}.
     * @defaultValue `false`
     */
    set ifSkipCameraInspection(value: boolean);
    get ifSkipCameraInspection(): boolean;
    /**
     * Stops the video and releases the camera.
     * @example
     * ```js
     * scanner.stop()
     * // *** a lot of work ***
     * await scanner.play();
     * ```
     * @see {@link play}
     * @category Play and Pause
     */
    stop(): void;
    /**
     * Pauses the video without releasing the camera.
     * @example
     * ```js
     * scanner.pause();
     * // *** a lot of work ***
     * await scanner.play();
     * ```
     * @see {@link play}
     * @category Play and Pause
     */
    pause(): void;
    /**
     * Play the video if it is already open but paused or stopped. If the video is already playing, it will start again.
     * @returns A promise resolving to a {@link ScannerPlayCallbackInfo} object.
     * @fires [[onPlayed]]
     * @example
     * ```js
     * scanner.pause(); // or scanner.stop()
     * // *** a lot of work ***
     * await scanner.play();
     * ```
     * @see {@link ScannerPlayCallbackInfo}
     * @see {@link stop}
     * @see {@link pause}
     * @category Play and Pause
     */
    play(deviceId?: string, width?: number, height?: number): Promise<ScannerPlayCallbackInfo>;
    /**
     * Pause continuous scanning but keep the video stream.
     * @param options Options to configure how the pause works. At present, it only contains one property `keepResultsHighlighted` which, when set to `true`, will keep the barcodes found on the frame (at the time of the pause) highlighted.
     * @see {@link resumeScan}
     * @category Play and Pause
     */
    pauseScan(options?: any): void;
    /**
     * Resumes the decoding process.
     * @see {@link pauseScan}
     * @category Play and Pause
     */
    resumeScan(): void;
    /**
     * Inspects and returns the capabilities of the current camera.
     *
     * Note: At present, this method only works in Edge, Safari, Chrome and other Chromium-based browsers (Firefox is not supported).
     * Also, it should be called when a camera is open.
     * @returns A `MediaTrackCapabilities` object which specifies the values or range of values for each constrainable property of the current camera.
     * @example
     * ```
     * scanner.getCapabilities()
     * // Result sample
     * {
     *   "aspectRatio":{"max":3840,"min":0.000462962962962963},
     *   "colorTemperature":{max: 7000, min: 2850, step: 50},
     *   "deviceId":"1e...3af7",
     *   "exposureCompensation": {max: 2.0000040531158447, min: -2.0000040531158447, step: 0.16666699945926666},
     *   "exposureMode":["continuous","manual"],
     *   "facingMode":["environment"],
     *   "focusMode":["continuous","single-shot","manual"],
     *   "frameRate":{"max":30,"min":0},
     *   "groupId":"71...a935",
     *   "height":{"max":2160,"min":1},
     *   "resizeMode":["none","crop-and-scale"],
     *   "torch":true,
     *   "whiteBalanceMode":["continuous","manual"],
     *   "width":{"max":3840,"min":1},
     *   "zoom":{max: 606, min: 100, step: 2}
     * }
     * ```
     * @category Camera Settings
     */
    getCapabilities(): MediaTrackCapabilities;
    /** @ignore */
    getCameraSettings(): MediaTrackSettings;
    /** @ignore */
    getConstraints(): MediaTrackConstraints;
    /**
     * @ignore
     * Set the camera capabilities.
     * Only available when the scanner is open.
     * It's a low-level API, usually you can use the wrapped APIs instead.
     * ```js
     * await scanner.applyConstraints({ frameRate: { ideal:5 } });
     * ```
     */
    applyConstraints(constraints: MediaTrackConstraints): Promise<void>;
    /**
     * Turns on the torch/flashlight if the current camera supports it. This method should be called when the camera is turned on.
     *
     * Note that it only works with Chromium-based browsers such as Edge and Chrome on Windows or Android. Other browsers such as Firefox or Safari are not supported. Note that all browsers on iOS (including Chrome) use WebKit as the rendering engine and are not supported.
     * @returns A promise that resolves when the operation succeeds.
     * @see {@link turnOffTorch}
     * @see {@link getCapabilities}
     * @category Camera Settings
     */
    turnOnTorch(): Promise<void>;
    /**
     * Turns off the torch/flashlight.
     *
     * Note: At present, this method only works in Edge, Chrome and other Chromium-based browsers (Firefox is not supported). Also, it should be called when a camera is open.
     * @see {@link turnOnTorch}
     * @category Camera Settings
     */
    turnOffTorch(): Promise<void>;
    /**
     * Adjusts the color temperature.
     *
     * Note: At present, this method only works in Edge, Chrome and other Chromium-based browsers (Firefox is not supported). Also, it should be called when a camera is open.
     * @param value Specifies the new color temperature.
     * @returns A promise that resolves when the operation succeeds.
     * @example
     * ```js
     * await scanner.setColorTemperature(5000);
     * ```
     * @see {@link getColorTemperature}
     * @see {@link getCapabilities}
     * @category Camera Settings
     */
    setColorTemperature(value: number): Promise<void>;
    /**
     * Returns the color temperature of the selected camera. This method should be called when the camera is turned on.
     *
     * Note that it only works with Chromium-based browsers such as Edge and Chrome on Windows or Android. Other browsers such as Firefox or Safari are not supported. Note that all browsers on iOS (including Chrome) use WebKit as the rendering engine and are not supported.
     * @returns Color temperature of the selected camera.
     * @see {@link setColorTemperature}
     * @category Camera Settings
     */
    getColorTemperature(): number;
    /**
     * Sets the exposure compensation index.
     *
     * Note: At present, this method only works in Edge, Chrome and other Chromium-based browsers (Firefox is not supported). Also, it should be called when a camera is open.
     * @param value Specifies the new exposure compensation index.
     * @returns A promise that resolves when the operation succeeds.
     * @example
     * ```js
     * await scanner.setExposureCompensation(-0.7);
     * ```
     * @see {@link getExposureCompensation}
     * @see {@link getCapabilities}
     * @category Camera Settings
     */
    setExposureCompensation(value: number): Promise<void>;
    /**
     * Returns the exposure compensation index of the selected camera. This method should be called when the camera is turned on.
     *
     * Note that it only works with Chromium-based browsers such as Edge and Chrome on Windows or Android. Other browsers such as Firefox or Safari are not supported. Note that all browsers on iOS (including Chrome) use WebKit as the rendering engine and are not supported.
     * @returns Exposure compensation index of the selected camera.
     * @see {@link setExposureCompensation}
     * @category Camera Settings
     */
    getExposureCompensation(): number;
    /**
     * Sets current zoom value.
     *
     * At present, this method only works in Edge, Chrome and other Chromium-based browsers (Firefox is not supported). Also, it should be called when a camera is open.
     * @param settings Specifies the new zoom value.
     * @returns A promise that resolves when the operation succeeds.
     * @example
     * ```js
     * await scanner.setZoom(2);
     * ```
     * @see {@link getZoomSettings}
     * @see {@link resetZoom}
     * @see {@link getCapabilities}
     * @category Camera Settings
     */
    setZoom(settings: number | {
        factor: number;
        centerPoint?: {
            x: string;
            y: string;
        };
    }): Promise<void>;
    /**
     * Returns the zoom settings.
     * @returns An object that describes the zoom settings. As of version 3.2, it contains only the zoom factor.
     * @see {@link setZoom}
     * @category Camera Settings
     */
    getZoomSettings(): {
        factor: number;
    };
    /**
     * Resets the zoom level of the video.
     * @returns A promise that resolves when the operation succeeds.
     * @see {@link setZoom}
     * @category Camera Settings
     */
    resetZoom(): Promise<void>;
    /**
     * Adjusts the frame rate.
     *
     * At present, this method only works in Edge, Safari, Chrome and other Chromium-based browsers (Firefox is not supported). Also, it should be called when a camera is open.
     * @param value Specifies the new frame rate.
     * @returns A promise that resolves when the operation succeeds.
     * @example
     * ```js
     * await scanner.setFrameRate(10);
     * ```
     * @see {@link getFrameRate}
     * @see {@link getCapabilities}
     * @category Camera Settings
     */
    setFrameRate(value: number): Promise<void>;
    /**
     * Returns the real-time frame rate.
     * @returns The calculated real-time frame rate.
     * @see {@link setFrameRate}
     * @category Camera Settings
     */
    getFrameRate(): number;
    /**
    * Sets the focus mode and focus distance of the camera.
    *
    * At present, this method only works in Edge, Chrome and other Chromium-based browsers (Firefox is not supported). Also, it should be called when a camera is open.
    * @param settings Specifies the focus mode, the available values include `continuous` and `manual`.
    * @param distance Specifies the focus distance, only required when the `mode` is set to `manual`.
    * @returns A promise that resolves when the operation succeeds.
    * @example
    * ```js
    * await scanner.setFocus("manual", 5);
    * ```
    * @see {@link getFocusSettings}
    * @see {@link getCapabilities}
    * @category Camera Settings
    */
    setFocus(settings: string | {
        mode: string;
    } | {
        mode: "manual";
        distance: number;
    } | {
        mode: "manual";
        area: {
            centerPoint: {
                x: string;
                y: string;
            };
            width?: string;
            height?: string;
        };
    }, distance?: number): Promise<void>;
    /**
     * @deprecated Use {@link getFocusSettings} instead.
     */
    getFocus(): Object;
    /**
     * Returns the focus settings.
     * @returns The current focus settings.
     * @see {@link setFocus}
     * @category Camera Settings
     */
    getFocusSettings(): Object;
    protected _loopReadVideo(): Promise<void>;
    /**
     * start dce fetching frame loop, and get frame from frame queue
     * @ignore
     */
    protected _getVideoFrame(): DCEFrame;
    /**
     * Binds UI, turns on the camera and starts decoding.
     *
     * This method does not change the original state of the UI: if it doesn't exist in the DOM tree, nothing shows up on the page; if it exists in the DOM tree, it may or may not show up depending on its original state.
     * @returns A promise resolving to a {@link ScannerPlayCallbackInfo} object.
     * @fires {@link onPlayed}
     * @example
     * ```js
     * await scanner.setUIElement(document.getElementById("my-barcode-scanner"));
     * scanner.onUniqueRead = (txt, result) => { alert(txt); console.log(result); };
     * await scanner.open();
     * // await scanner.close();
     * ```
     * @see {@link close}
     * @see {@link hide}
     * @see {@link ScannerPlayCallbackInfo}
     * @category Open and Close
     */
    open(): Promise<ScannerPlayCallbackInfo>;
    /**
     * Bind UI, open the camera, but not decode.
     * @returns A promise resolving to a {@link ScannerPlayCallbackInfo} object.
     * @fires {@link onPlayed}
     * @example
     * ```js
     * await scanner.setUIElement(document.getElementById("my-barcode-scanner"));
     * await scanner.openVideo();
     * console.log(await scanner.decodeCurrentFrame());
     * // await scanner.close();
     * ```
     * @see {@link close}
     * @see {@link hide}
     * @see {@link ScannerPlayCallbackInfo}
     * @category Open and Close
     */
    openVideo(): Promise<ScannerPlayCallbackInfo>;
    /**
     * Stops decoding, releases camera, unbinds and hides UI.
     * @example
     * ```js
     * await scanner.open();
     * await scanner.close();
     * ```
     * @example
     * ```js
     * await scanner.openVideo();
     * await scanner.close();
     * ```
     * @see {@link hide}
     * @category Open and Close
     */
    close(): void;
    /**
     * Binds and shows UI, opens the camera and starts decoding.
     * @returns A promise resolving to a {@link ScannerPlayCallbackInfo} object.
     * @fires {@link onPlayed}
     * @example
     * ```js
     * await scanner.setUIElement("https://cdn.jsdelivr.net/npm/dynamsoft-javascript-barcode/dist/dbr.ui.html");
     * scanner.onUniqueRead = (txt, result) => { alert(txt); console.log(result); };
     * await scanner.show();
     * // await scanner.hide();
     * ```
     * @see {@link close}
     * @see {@link hide}
     * @see {@link ScannerPlayCallbackInfo}
     * @category Open and Close
     */
    show(): Promise<ScannerPlayCallbackInfo>;
    /**
     * Bind UI, open the camera, but not decode, and remove the UIElement `display` style if the original style is `display:none;`.
     * @returns A promise resolving to a {@link ScannerPlayCallbackInfo} object.
     * @fires {@link onPlayed}
     * @example
     * ```js
     * await scanner.showVideo()
     * console.log(await scanner.decodeCurrentFrame());
     * // await scanner.hide();
     * ```
     * @see {@link close}
     * @see {@link hide}
     * @see {@link ScannerPlayCallbackInfo}
     * @category Open and Close
     */
    showVideo(): Promise<ScannerPlayCallbackInfo>;
    /**
     * Stops decoding, releases camera and unbinds and hides UI.
     * @example
     * ```js
     * await scanner.show();
     * await scanner.hidee();
     * ```
     * @example
     * ```js
     * await scanner.showVideo();
     * await scanner.hide();
     * ```
     * @see {@link close}
     * @see {@link ScannerPlayCallbackInfo}
     * @category Open and Close
     */
    hide(): void;
    /**
     * Shows a Tip message.
     * @param x Specifies the x coordinate of the Tip message.
     * @param y Specifies the y coordinate of the Tip message.
     * @param width Specifies the width of the Tip message, wrapping if the message is too long.
     * @param initialMessage Optional. The initial message.
     * @param duration Optional. The time during which a Tip message is displayed. The duration is reset each time the message is updated. Default value is `3000`.
     * @param autoShowSuggestedTip Optional. Whether or not the Tip box is updated automatically when a tip is suggested. A tip is usually suggested by another SDK such as Dynamsoft Barcode Reader.
     * @example
     * ```js
     * scanner.showTip(500, 200, 500, "The camera is too far away, please move closer!", 3000, true);
     * ```
     * @see {@link hideTip}
     */
    showTip(x: number, y: number, width: number, initialMessage?: string, duration?: number, autoShowSuggestedTip?: boolean): void;
    /**
     * Hides the Tip message.
     * @see {@link showTip}
     */
    hideTip(): void;
    /**
     * Changes the Tip message.
     * @param message Specifies a new message as the Tip.
     */
    updateTipMessage(message: string): void;
    /**
     * Enables manual camera focus when clicking/tapping on the video.
     *
     * At present, this method only works in Edge, Chrome and other Chromium-based browsers (Firefox is not supported).
     * @see {@link disableTapToFocus}
     * @see {@link isTapToFocusEnabled}
     */
    enableTapToFocus(): Promise<void>;
    /**
     * Disables manual camera focus when clicking/tapping on the video.
     * @see {@link enableTapToFocus}
     * @see {@link isTapToFocusEnabled}
     */
    disableTapToFocus(): void;
    /**
     * Returns whether clicking/tapping on the video invokes the camera to focus.
     * @returns `true` means clicking/tapping on the video will invoke the camera to focus. `false` means clicking/tapping on the video does nothing.
     * @see {@link enableTapToFocus}
     * @see {@link disableTapToFocus}
     */
    isTapToFocusEnabled(): boolean;
    /**
     * Converts coordinates of a barcode location to the coordinates relative to the top left point of the entire document.
     *
     * Note: Call this method only after `scanner` is open.
     * @param point The coordinates to convert.
     * @returns The converted coordinates.
     * @see {@link convertToClientCoordinates}
     */
    convertToPageCoordinates(point: {
        x: number;
        y: number;
    }): {
        x: number;
        y: number;
    };
    /**
     * Converts coordinates of a barcode location to the coordinates within the application's viewport at which the event occurred (as opposed to the coordinate within the page).
     *
     * Note: Call this method only after `scanner` is open.
     * @param point The coordinates to convert.
     * @returns The converted coordinates.
     * @see {@link convertToClientCoordinates}
     */
    convertToClientCoordinates(point: {
        x: number;
        y: number;
    }): {
        x: number;
        y: number;
    };
    /**
     * Destroys the `BarcodeScanner` instance. If your page needs to create a new instance from time to time, don't forget to destroy unused old instances.
     * @see {@link isContextDestroyed}
     * @category Initialize and Destroy
     */
    destroyContext(): void;
}
//# sourceMappingURL=barcodescanner.d.ts.map