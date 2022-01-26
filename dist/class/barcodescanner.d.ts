import { ScanSettings } from '../interface/scanSettings';
import { TextResult } from '../interface/textresult';
import { VideoDeviceInfo } from '../interface/videodeviceinfo';
import { ScannerPlayCallbackInfo } from '../interface/scannerplaycallbackinfo';
import BarcodeReader from './barcodereader';
import { RuntimeSettings } from '../interface/runtimesettings';
import { EnumImagePixelFormat } from "../enum/enumimagepixelformat";
import { Region } from '../interface/region';
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
    private static _defaultUIElementURL;
    static get defaultUIElementURL(): string;
    /**
     * The url of the default scanner UI.
     * Can only be changed before `createInstance`.
     * ```js
     * Dynamsoft.DBR.BarcodeScanner.defaultUIElementURL = "https://cdn.jsdelivr.net/npm/dynamsoft-javascript-barcode@8.8.7/dist/dbr.scanner.html";
     * let pScanner = null;
     * (async()=>{
     *     let scanner = await (pScanner = pScanner || Dynamsoft.DBR.BarcodeScanner.createInstance());
     *     await scanner.show();
     * })();
     * ```
     */
    static set defaultUIElementURL(value: string);
    /** @ignore */
    /**
     * Get HTML element containing the `BarcodeScanner` instance.
     * @category UI
     */
    getUIElement(): HTMLElement;
    /**
     * Set html element containing the `BarcodeScanner` instance.
     * ```html
     * <video class="dce-video" playsinline="true"></video>
     * <script>
     *     let pScanner = null;
     *     (async()=>{
     *         let scanner = await (pScanner = pScanner || Dynamsoft.DBR.BarcodeScanner.createInstance());
     *         await scanner.setUIElement(document.getElementsByClassName("dce-video")[0]);
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
    private _clickIptSingleFrameMode;
    /** @ignore */
    intervalTime: number;
    bSaveOriCanvas: boolean;
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
    private _intervalGetVideoFrame;
    private _loopReadVideoTimeoutId;
    /** @ignore */
    private array_getFrameTimeCost;
    /** @ignore */
    private array_decodeFrameTimeCost;
    /** @ignore */
    private _indexCurrentDecodingFrame;
    private _assertOpen;
    private _bPauseScan;
    private _intervalDetectVideoPause;
    /** @ignore */
    _cvsDrawArea: HTMLCanvasElement;
    /** @ignore */
    _divScanArea: any;
    /** @ignore */
    _divScanLight: any;
    /** @ignore */
    _selCam: any;
    /** @ignore */
    _selRsl: any;
    /** @ignore */
    _btnClose: any;
    /** @ignore */
    private _soundOnSuccessfullRead;
    /**
     * The sound to play when the scanner get successfull read.
     */
    get soundOnSuccessfullRead(): HTMLAudioElement;
    /**
     * The sound to play when the scanner get successfull read.
     * ```js
     * scanner.soundOnSuccessfullRead = new Audio("./pi.mp3");
     * ```
     */
    set soundOnSuccessfullRead(value: HTMLAudioElement);
    /**
     * Whether to play sound when the scanner reads a barcode successfully.
     * Default value is `false`, which does not play sound.
     * Use `frame` or `true` to play a sound when any barcode is found within a frame.
     * Use `unduplicated` to play a sound only when any unique/unduplicated barcode is found within a frame.
     * ```js
     * // A user gesture required. https://developers.google.com/web/updates/2017/09/autoplay-policy-changes#chrome_enterprise_policies
     * startPlayButton.addEventListener('click', function() {
     *   scanner.bPlaySoundOnSuccessfulRead = true;
     * });
     * ```
     * refer: `favicon bug` https://bugs.chromium.org/p/chromium/issues/detail?id=1069731&q=favicon&can=2
     * @ignore
     */
    bPlaySoundOnSuccessfulRead: (boolean | string);
    get whenToPlaySoundforSuccessfulRead(): string;
    /**
     * Whether to play sound when the scanner reads a barcode successfully.
     * Default value is `never`, which does not play sound.
     * Use `frame` to play a sound when any barcode is found within a frame.
     * Use `unduplicated` to play a sound only when any unique/unduplicated barcode is found within a frame.
     * ```js
     * // A user gesture required. https://developers.google.com/web/updates/2017/09/autoplay-policy-changes#chrome_enterprise_policies
     * startPlayButton.addEventListener('click', function() {
     *   scanner.whenToPlaySoundforSuccessfulRead = 'frame';
     * });
     * ```
     * refer: `favicon bug` https://bugs.chromium.org/p/chromium/issues/detail?id=1069731&q=favicon&can=2
     */
    set whenToPlaySoundforSuccessfulRead(value: string);
    /**
     * Whether to vibrate when the scanner reads a barcode successfully.
     * Default value is `false`, which does not vibrate.
     * Use `frame` or `true` to vibrate when any barcode is found within a frame.
     * Use `unduplicated` to vibrate only when any unique/unduplicated barcode is found within a frame.
     * ```js
     * // Can I use? https://caniuse.com/?search=vibrate
     * // A user gesture required. https://developers.google.com/web/updates/2017/09/autoplay-policy-changes#chrome_enterprise_policies
     * startVibrateButton.addEventListener('click', function() {
     *   scanner.bVibrateOnSuccessfulRead = true;
     * });
     * ```
     * @ignore
     */
    bVibrateOnSuccessfulRead: (boolean | string);
    /**
     * Get or set how long (ms) the vibration lasts.
     * @see [[whenToVibrateforSuccessfulRead]]
     */
    vibrateDuration: number;
    get whenToVibrateforSuccessfulRead(): string;
    /**
     * Whether to vibrate when the scanner reads a barcode successfully.
     * Default value is `never`, which does not vibrate.
     * Use `frame` to vibrate when any barcode is found within a frame.
     * Use `unduplicated` to vibrate only when any unique/unduplicated barcode is found within a frame.
     * ```js
     * // Can I use? https://caniuse.com/?search=vibrate
     * // A user gesture required. https://developers.google.com/web/updates/2017/09/autoplay-policy-changes#chrome_enterprise_policies
     * startPlayButton.addEventListener('click', function() {
     *   scanner.whenToVibrateforSuccessfulRead = 'frame';
     * });
     * ```
     */
    set whenToVibrateforSuccessfulRead(value: string);
    /**
     * Set the style used when filling the mask beyond the region.
     * @category UI
     */
    regionMaskFillStyle: string;
    /**
     * Set the style of the region border.
     * @category UI
     */
    regionMaskStrokeStyle: string;
    /**
     * Set the width of the region border.
     * @category UI
     */
    regionMaskLineWidth: number;
    /**
     * Set the style used when filling in located barcode.
     * @category UI
     */
    barcodeFillStyle: string;
    /**
     * Set the style of the located barcode border.
     * @category UI
     */
    barcodeStrokeStyle: string;
    /**
     * Set the width of the located barcode border.
     * @category UI
     */
    barcodeLineWidth: number;
    protected beingLazyDrawRegionsults: boolean;
    protected set region(value: null | Region | Region[]);
    protected get region(): null | Region | Region[];
    private dce;
    private createDCEInstance;
    /** @ignore */
    constructor();
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
    /** @ignore */
    decode(source: Blob | ArrayBuffer | Uint8Array | Uint8ClampedArray | HTMLImageElement | HTMLCanvasElement | HTMLVideoElement | string): Promise<TextResult[]>;
    /** @ignore */
    decodeBase64String(source: string): Promise<TextResult[]>;
    /** @ignore */
    decodeUrl(source: string): Promise<TextResult[]>;
    /** @ignore */
    decodeBuffer(buffer: Uint8Array | Uint8ClampedArray | ArrayBuffer | Blob, width: number, height: number, stride: number, format: EnumImagePixelFormat, config?: any): Promise<any>;
    /**
     * Decode barcodes from the current frame of the video.
     * ```js
     * await scanner.showVideo();
     * console.log(await scanner.decodeCurrentFrame());
     * ```
     * @category Decode
     */
    decodeCurrentFrame(config?: any): Promise<TextResult[]>;
    private clearMapDecodeRecord;
    private static readonly singlePresetRegion;
    private static isRegionSinglePreset;
    private static isRegionNormalPreset;
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
    /** @ignore */
    get onUnduplicatedRead(): (txt: string, result: TextResult) => void;
    /** @ignore */
    set onUnduplicatedRead(value: (txt: string, result: TextResult) => void);
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
    /** @ignore */
    _show(): void;
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
    pauseScan(): void;
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
     * Get the camera capabilities. Chrome only.
     * Only available when the scanner is open.
     * ```console
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
     * Set the camera capabilities. Chrome only.
     * Only available when the scanner is open.
     * It's a low-level API, usually you can use the wrapped APIs instead.
     * ```js
     * await scanner.applyConstraints({ frameRate: { ideal:5 } });
     * ```
     */
    applyConstraints(constraints: MediaTrackConstraints): Promise<void>;
    /**
     * Turn on the torch/flashlight. Chrome only.
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
     * Turn off the torch. Chrome only.
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
     * Adjusts the color temperature. Chrome only.
     * Only available when the scanner is open.
     * Will reject if not support.
     * ```js
     * await scanner.setColorTemperature(5000);
     * ```
     * @see [[getCapabilities]]
     * @category Camera Settings
     */
    setColorTemperature(value: number): Promise<void>;
    /**
     * Adjusts the exposure level. Chrome only.
     * Only available when the scanner is open.
     * Will reject if not support.
     * ```js
     * await scanner.setExposureCompensation(-0.7);
     * ```
     * @see [[getCapabilities]]
     * @category Camera Settings
     */
    setExposureCompensation(value: number): Promise<void>;
    /**
     * Adjusts the zoom ratio. Chrome only.
     * Only available when the scanner is open.
     * Will reject if not support.
     * ```js
     * await scanner.setZoom(400);
     * ```
     * @see [[getCapabilities]]
     * @category Camera Settings
     */
    setZoom(value: number): Promise<void>;
    /**
     * Adjusts the frame rate. Chrome only.
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
    /** @ignore */
    _cloneDecodeResults(results: any): any;
    private _loopReadVideo;
    /**
     * start dce fetching frame loop, and get frame from frame queue
     * @ignore
     */
    private _getVideoFrame;
    /** @ignore */
    _drawRegionsults(results?: TextResult[]): void;
    /** @ignore */
    _clearRegionsults(): void;
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
    open(): Promise<ScannerPlayCallbackInfo>;
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
    openVideo(): Promise<ScannerPlayCallbackInfo>;
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
    close(): Promise<void>;
    /**
     * Bind UI, open the camera, start decoding, and remove the UIElement `display` style if the original style is `display:none;`.
     * ```js
     * await scanner.setUIElement("https://cdn.jsdelivr.net/npm/dynamsoft-javascript-barcode@8.8.7/dist/dbr.scanner.html");
     * scanner.onUniqueRead = (txt, result) => { alert(txt); console.log(result); };
     * await scanner.show();
     * // await scanner.hide();
     * ```
     * @fires [[onPlayed]],[[onUniqueRead]],[[onFrameRead]]
     * @category Open and Close
     */
    show(): Promise<ScannerPlayCallbackInfo>;
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
    showVideo(): Promise<ScannerPlayCallbackInfo>;
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
    hide(): Promise<void>;
    /** @ignore */
    destroy(): Promise<any>;
    /**
     * Destroy the `BarcodeScanner` instance. If your page needs to create new instances from time to time, don't forget to destroy unused old instances, otherwise it will cause memory leaks.
     * @category Initialize and Destroy
     */
    destroyContext(): Promise<any>;
}
//# sourceMappingURL=barcodescanner.d.ts.map