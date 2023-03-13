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
 * ```js
 * let pScanner = null;
 * (async()=>{
 *     let scanner = await (pScanner = pScanner || Dynamsoft.DBR.BarcodeScanner.createInstance());
 *     scanner.onUniqueRead = txt => console.log(txt);
 *     await scanner.show();
 * })();
 * ```
 */
export default class BarcodeScanner extends BarcodeReader {
    /**
     * Get the current version.
     */
    static get version(): string;
    static onWarning: (warning: Warning) => void;
    protected static _fireHTTPSWarnning(): void;
    static testCameraAccess(): Promise<{
        ok: boolean;
        message: string;
    }>;
    onWarning: (warning: Warning) => void;
    private _fireResolutionWarning;
    /** @ignore */
    /**
     * Get HTML element containing the `BarcodeScanner` instance.
     * @category UI
     */
    getUIElement(): HTMLElement;
    /**
     * Set html element containing the `BarcodeScanner` instance.
     * ```html
     * <div class="dce-video-container" style="postion:relative;width:100%;height:500px;"></div>
     * <script>
     *     let pScanner = null;
     *     (async()=>{
     *         let scanner = await (pScanner = pScanner || Dynamsoft.DBR.BarcodeScanner.createInstance());
     *         await scanner.setUIElement(document.getElementsByClassName("dce-video-container")[0]);
     *         await scanner.open();
     *     })();
     * </script>
     * ```
     * @param elementOrUrl
     * @category UI
     */
    setUIElement(elementOrUrl: HTMLElement | string): Promise<void>;
    /** @ignore */
    /**
     * A mode not use video, get a frame from OS camera instead.
     * ```js
     * let pScanner = null;
     * (async()=>{
     *     let scanner = await (pScanner = pScanner || Dynamsoft.DBR.BarcodeScanner.createInstance());
     *     if(scanner.singleFrameMode){
     *         // the browser does not provide webrtc API, dbrjs automatically use singleFrameMode instead
     *         scanner.show();
     *     }
     * })();
     * ```
     */
    get singleFrameMode(): boolean;
    /**
     * A mode not use video, get a frame from OS camera instead.
     * ```js
     * let pScanner = null;
     * (async()=>{
     *     let scanner = await (pScanner = pScanner || Dynamsoft.DBR.BarcodeScanner.createInstance());
     *     scanner.singleFrameMode = true; // use singleFrameMode anyway
     *     scanner.show();
     * })();
     * ```
     */
    set singleFrameMode(value: boolean);
    /**
     * The event is triggered after a frame has been scanned.
     * The results object contains all the barcode results in this frame.
     * ```js
     * scanner.onFrameRead = results => {
     *     for(let result of results){
     *         console.log(result.barcodeText);
     *     }
     * };
     * scanner.show(); // or open(), to start decoding video stream
     * ```
     * @event onFrameRead
     */
    onFrameRead?: (results: TextResult[]) => void;
    get onUnduplicatedRead(): (txt: string, result: TextResult) => void;
    set onUnduplicatedRead(value: (txt: string, result: TextResult) => void);
    get video(): HTMLVideoElement;
    set videoSrc(source: string | MediaStream | MediaSource | Blob);
    get videoSrc(): string | MediaStream | MediaSource | Blob;
    set onTipSuggested(value: (occasion: string, message: string) => void);
    get onTipSuggested(): (occasion: string, message: string) => void;
    private _assertOpen;
    private _barcodeFillStyle;
    /**
     * Set the style used when filling in located barcode.
     * @category UI
     */
    set barcodeFillStyle(style: string);
    get barcodeFillStyle(): string;
    private _barcodeStrokeStyle;
    /**
     * Set the style of the located barcode border.
     * @category UI
     */
    set barcodeStrokeStyle(style: string);
    get barcodeStrokeStyle(): string;
    private _barcodeLineWidth;
    /**
     * Set the width of the located barcode border.
     * @category UI
     */
    set barcodeLineWidth(width: number);
    get barcodeLineWidth(): number;
    private _barcodeFillStyleBeforeVerification;
    /**
     * Set the style used when filling in located barcode.
     * @category UI
     */
    set barcodeFillStyleBeforeVerification(style: string);
    get barcodeFillStyleBeforeVerification(): string;
    private _barcodeStrokeStyleBeforeVerification;
    /**
     * Set the style of the located barcode border.
     * @category UI
     */
    set barcodeStrokeStyleBeforeVerification(style: string);
    get barcodeStrokeStyleBeforeVerification(): string;
    private _barcodeLineWidthBeforeVerification;
    /**
     * Set the width of the located barcode border.
     * @category UI
     */
    set barcodeLineWidthBeforeVerification(width: number);
    get barcodeLineWidthBeforeVerification(): number;
    /**
     * Set the style used when filling the mask beyond the region.
     * @category UI
     */
    set regionMaskFillStyle(value: string);
    get regionMaskFillStyle(): string;
    /**
     * Set the style of the region border.
     * @category UI
     */
    set regionMaskStrokeStyle(value: string);
    get regionMaskStrokeStyle(): string;
    /**
     * Set the width of the region border.
     * @category UI
     */
    set regionMaskLineWidth(value: string);
    get regionMaskLineWidth(): string;
    protected bFilterRegionInJs: boolean;
    protected set region(value: null | Region | Region[]);
    protected get region(): null | Region | Region[];
    /**
     * Whether to save the original image into canvas.
     * ```js
     * scanner.ifSaveOriginalImageInACanvas = true;
     * let results = await scanner.decode(source);
     * document.body.append(scanner.getOriginalImageInACanvas());
     * ```
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
    * ```
    * let pScanner = null;
    * (async()=>{
    *     let scanner = await (pScanner = pScanner || Dynamsoft.DBR.BarcodeScanner.createInstance());
    * })();
    * ```
     * @param config
     * @category Initialize and Destroy
     */
    static createInstance(config?: any): Promise<BarcodeScanner>;
    /**
     * Decode barcodes from the current frame of the video.
     * ```js
     * await scanner.showVideo();
     * console.log(await scanner.decodeCurrentFrame());
     * ```
     * @category Decode
     */
    decodeCurrentFrame(config?: any): Promise<TextResult[]>;
    /**
     * Update runtime settings with a given struct, or a string of `speed`, `balance`, `coverage` or `single` to use preset settings for BarcodeScanner.
     * We recommend using the speed-optimized `single` preset if scanning only one barcode at a time. The `single` is only available in `BarcodeScanner`.
     * The default settings for BarcodeScanner is `single`.
     * ```js
     * await scanner.updateRuntimeSettings('balance');
     * let settings = await scanner.getRuntimeSettings();
     * settings.barcodeFormatIds = Dynamsoft.DBR.EnumBarcodeFormat.BF_ONED;
     * await scanner.updateRuntimeSettings(settings);
     * ```
     * @see [RuntimeSettings](https://www.dynamsoft.com/barcode-reader/programming/c-cplusplus/struct/PublicRuntimeSettings.html?ver=latest&utm_source=github&package=js)
     * @category Runtime Settings
     */
    updateRuntimeSettings(settings: RuntimeSettings | string): Promise<void>;
    /** @ignore */
    _onCameraSelChange: () => void;
    /** @ignore */
    _onResolutionSelChange: () => void;
    /** @ignore */
    _onCloseBtnClick: () => void;
    /** @ignore */
    _bindUI(): void;
    /** @ignore */
    _unbindUI(): void;
    private _onPlayed;
    /**
     * Triggered when the camera video stream is played.
     * ```js
     * scanner.onPlayed = rsl=>{ console.log(rsl.width+'x'+rsl.height) };
     * await scanner.show(); // or open, play, setCurrentCamera, like these.
     * ```
     * @event onPlayed
     */
    set onPlayed(value: (info: ScannerPlayCallbackInfo) => void);
    get onPlayed(): (info: ScannerPlayCallbackInfo) => void;
    /**
     * Get infomation of all available cameras on the device.
     * ```js
     * let cameras = await scanner.getAllCameras();
     * if(cameras.length){
     *     await scanner.setCurrentCamera(cameras[0]);
     * }
     * ```
     * @category Camera Settings
     */
    getAllCameras(): Promise<VideoDeviceInfo[]>;
    /**
     * Get information about the currently used camera.
     * ```js
     * let camera = await scanner.getCurrentCamera();
     * ```
     * @category Camera Settings
     */
    getCurrentCamera(): Promise<VideoDeviceInfo | null>;
    /**
     * Choose the camera and play it by its information or devide id.
     * ```js
     * let cameras = await scanner.getAllCameras();
     * if(cameras.length){
     *     await scanner.setCurrentCamera(cameras[0]);
     * }
     * ```
     * @param cameraInfoOrDeviceId
     * @fires [[onPlayed]]
     * @category Camera Settings
     */
    setCurrentCamera(cameraInfoOrDeviceId: any): Promise<ScannerPlayCallbackInfo>;
    /**
     * Get current camera resolution.
     * ```js
     * let rsl = await scanner.getResolution();
     * console.log(rsl[0] + " x " + rsl[1]);
     * ```
     * @category Camera Settings
     */
    getResolution(): number[];
    /**
     * Set current camera resolution.
     * ```js
     * await scanner.setResolution(width, height);
     * ```
     * @param width
     * @param height
     * @fires [[onPlayed]]
     * @category Camera Settings
     */
    setResolution(width: number | number[], height: number): Promise<ScannerPlayCallbackInfo>;
    /**
     * Get current video settings.
     * @category Camera Settings
     */
    getVideoSettings(): MediaStreamConstraints;
    /**
     * Modify and update video settings.
     * ```js
     * await scanner.updateVideoSettings({ video: {width: {ideal: 1280}, height: {ideal: 720}, facingMode: {ideal: 'environment'}} });
     * ```
     * @param MediaStreamConstraints
     * @category Camera Settings
     */
    updateVideoSettings(MediaStreamConstraints: any): Promise<ScannerPlayCallbackInfo | void>;
    /**
     * Check if the scanner is open.
     * ```js
     * await scanner.show(); // or open(), showVideo(), openVideo();
     * console.assert(scanner.isOpen(), "scanner should be opened.");
     * await scanner.hide(); // or close();
     * console.assert(!scanner.isOpen(), "scanner should be closed.");
     * ```
     * @category Open and Close
     */
    isOpen(): boolean;
    setVideoFit(value: string): void;
    getVideoFit(): string;
    /**
     * Whether to show scan region mask.
     */
    set ifShowScanRegionMask(value: boolean);
    get ifShowScanRegionMask(): boolean;
    set ifSaveLastUsedCamera(value: boolean);
    get ifSaveLastUsedCamera(): boolean;
    set ifSkipCameraInspection(value: boolean);
    get ifSkipCameraInspection(): boolean;
    /**
     * Stop the video, and release the camera.
     * ```js
     * scanner.stop()
     * \\*** a lot of work ***
     * await scanner.play();
     * ```
     * @category Play and Pause
     */
    stop(): void;
    /**
     * Pause the video. Do not release the camera.
     * ```js
     * scanner.pause();
     * \\*** a lot of work ***
     * await scanner.play();
     * ```
     * @category Play and Pause
     */
    pause(): void;
    /**
     * Continue the video.
     * ```js
     * scanner.pause(); // or scanner.stop()
     * \\*** a lot of work ***
     * await scanner.play();
     * ```
     * @fires [[onPlayed]]
     * @category Play and Pause
     */
    play(deviceId?: string, width?: number, height?: number): Promise<ScannerPlayCallbackInfo>;
    /**
     * Pause the decoding process.
     * ```js
     * pauseScan();
     * \\*** a lot of work ***
     * resumeScan();
     * ```
     * @category Play and Pause
     */
    pauseScan(options?: any): void;
    /**
     * Resume the decoding process.
     * ```js
     * pauseScan();
     * \\*** a lot of work ***
     * resumeScan();
     * ```
     * @category Play and Pause
     */
    resumeScan(): void;
    /**
     * Get the camera capabilities. Unavailable in Firefox.
     * Only available when the scanner is open.
     * ```
     * > scanner.getCapabilities()
     * < {
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
     * @see [[turnOnTorch]],[[turnOffTorch]],[[setExposureCompensation]],[[setZoom]]
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
     * Turn on the torch/flashlight. Only available in Chrome and Edge.
     * Only available when the scanner is open.
     * Will reject if not support.
     * ```js
     * await scanner.turnOnTorch();
     * ```
     * @see [[turnOffTorch]],[[getCapabilities]]
     * @category Camera Settings
     */
    turnOnTorch(): Promise<void>;
    /**
     * Turn off the torch. Only available in Chrome and Edge.
     * Only available when the scanner is open.
     * Will reject if not support.
     * ```js
     * await scanner.turnOffTorch();
     * ```
     * @see [[turnOnTorch]],[[getCapabilities]]
     * @category Camera Settings
     */
    turnOffTorch(): Promise<void>;
    /**
     * Adjusts the color temperature. Only available in Chrome and Edge.
     * Only available when the scanner is open.
     * Will reject if not support.
     * ```js
     * await scanner.setColorTemperature(5000);
     * ```
     * @see [[getCapabilities]]
     * @category Camera Settings
     */
    setColorTemperature(value: number): Promise<void>;
    getColorTemperature(): number;
    /**
     * Adjusts the exposure level. Only available in Chrome and Edge.
     * Only available when the scanner is open.
     * Will reject if not support.
     * ```js
     * await scanner.setExposureCompensation(-0.7);
     * ```
     * @see [[getCapabilities]]
     * @category Camera Settings
     */
    setExposureCompensation(value: number): Promise<void>;
    getExposureCompensation(): number;
    /**
     * Adjusts the zoom ratio. Only available in Chrome and Edge.
     * Only available when the scanner is open.
     * Will reject if not support.
     * ```js
     * await scanner.setZoom(400);
     * ```
     * @see [[getCapabilities]]
     * @category Camera Settings
     */
    setZoom(settings: number | {
        factor: number;
        centerPoint?: {
            x: string;
            y: string;
        };
    }): Promise<void>;
    getZoomSettings(): {
        factor: number;
    };
    resetZoom(): Promise<void>;
    /**
     * Adjusts the frame rate. Only available in Chrome, Edge and Safari.
     * Only available when the scanner is open.
     * Will reject if not support.
     * ```js
     * await scanner.setFrameRate(10);
     * ```
     * @see [[getCapabilities]]
     * @category Camera Settings
     */
    setFrameRate(value: number): Promise<void>;
    /**
     * Get the real-time frame rate.
     * Only available when the scanner is open.
     * ```js
     * scanner.getFrameRate();
     * ```
     * @see [[getCapabilities]]
     * @category Camera Settings
     */
    getFrameRate(): number;
    /**
    * Adjusts the focus distance. Only available in Chrome and Edge.
    * Only available when the camera is open.
    * Will reject if not support.
    * ```js
    * await scanner.setFocus(5);
    * ```
    * @see [[getFocus]],[[getCapabilities]]
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
     * Get the focus distance.
     * Only available when the camera is open.
     * ```js
     * scanner.getFocus();
     * ```
     * @see [[setFocus]],[[getCapabilities]]
     * @category Camera Settings
     * @deprecated
     */
    getFocus(): Object;
    getFocusSettings(): Object;
    protected _loopReadVideo(): Promise<void>;
    /**
     * start dce fetching frame loop, and get frame from frame queue
     * @ignore
     */
    protected _getVideoFrame(): DCEFrame;
    /**
     * Bind UI, open the camera, start decoding.
     * ```js
     * await scanner.setUIElement(document.getElementById("my-barcode-scanner"));
     * scanner.onUniqueRead = (txt, result) => { alert(txt); console.log(result); };
     * await scanner.open();
     * // await scanner.close();
     * ```
     * @fires [[onPlayed]],[[onUniqueRead]],[[onFrameRead]]
     * @category Open and Close
     */
    open(): Promise<import("dynamsoft-camera-enhancer").PlayCallbackInfo>;
    /**
     * Bind UI, open the camera, but not decode.
     * ```js
     * await scanner.setUIElement(document.getElementById("my-barcode-scanner"));
     * await scanner.openVideo();
     * console.log(await scanner.decodeCurrentFrame());
     * // await scanner.close();
     * ```
     * @fires [[onPlayed]],[[onUniqueRead]],[[onFrameRead]]
     * @category Open and Close
     */
    openVideo(): Promise<import("dynamsoft-camera-enhancer").PlayCallbackInfo>;
    /**
     * Stop decoding, release camera, unbind UI.
     * ```js
     * await scanner.open();
     * await scanner.close();
     * ```
     * ```js
     * await scanner.openVideo();
     * await scanner.close();
     * ```
     * @category Open and Close
     */
    close(): void;
    /**
     * Bind UI, open the camera, start decoding, and remove the UIElement `display` style if the original style is `display:none;`.
     * ```js
     * await scanner.setUIElement("https://cdn.jsdelivr.net/npm/dynamsoft-javascript-barcode/dist/dbr.ui.html");
     * scanner.onUniqueRead = (txt, result) => { alert(txt); console.log(result); };
     * await scanner.show();
     * // await scanner.hide();
     * ```
     * @fires [[onPlayed]],[[onUniqueRead]],[[onFrameRead]]
     * @category Open and Close
     */
    show(): Promise<import("dynamsoft-camera-enhancer").PlayCallbackInfo>;
    /**
     * Bind UI, open the camera, but not decode, and remove the UIElement `display` style if the original style is `display:none;`.
     * ```js
     * await scanner.showVideo()
     * console.log(await scanner.decodeCurrentFrame());
     * // await scanner.hide();
     * ```
     * @fires [[onPlayed]],[[onUniqueRead]],[[onFrameRead]]
     * @category Open and Close
     */
    showVideo(): Promise<import("dynamsoft-camera-enhancer").PlayCallbackInfo>;
    /**
     * Stop decoding, release camera, unbind UI, and set the Element as `display:none;`.
     * ```js
     * await scanner.show();
     * await scanner.hidee();
     * ```
     * ```js
     * await scanner.showVideo();
     * await scanner.hide();
     * ```
     * @category Open and Close
     */
    hide(): void;
    showTip(x: number, y: number, width: number, initialMessage?: string, duration?: number, autoShowSuggestedTip?: boolean): void;
    hideTip(): void;
    updateTipMessage(message: string): void;
    enableTapToFocus(): Promise<void>;
    disableTapToFocus(): void;
    isTapToFocusEnabled(): boolean;
    /**
     * Transform the coordinates from related to the video to related to the viewport and document.
     * @param coord
     * @returns
     * @private
     */
    private transformCoord;
    convertToPageCoordinates(point: {
        x: number;
        y: number;
    }): {
        x: number;
        y: number;
    };
    convertToClientCoordinates(point: {
        x: number;
        y: number;
    }): {
        x: number;
        y: number;
    };
    /**
     * Destroy the `BarcodeScanner` instance. If your page needs to create new instances from time to time, don't forget to destroy unused old instances, otherwise it will cause memory leaks.
     * @category Initialize and Destroy
     */
    destroyContext(): void;
}
//# sourceMappingURL=barcodescanner.d.ts.map