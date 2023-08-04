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
/**
 * The `BarcodeReader` class is used for image decoding
 * Comparing to `BarcodeScanner`, the default decoding settings are more accurate but slower.
 * @example
 * ```js
 * (async()=>{
 *     let reader = await Dynamsoft.DBR.BarcodeReader.createInstance();
 *     let results = await reader.decode(imageSource);
 *     for(let result of results){
 *         console.log(result.barcodeText);
 *     }
 * })();
 * ```
 */
export default class BarcodeReader {
    private static _jsVersion;
    private static _jsEditVersion;
    protected static _version: string;
    /**
     * Returns the version of the library including the detailed version numbers of the engine and the main JavaScript code.
     *
     * The engine version is only valid after {@link loadWasm} has been called.
     * @readonly
     */
    static get version(): string;
    protected static _license: string;
    /**
     * Specify an online license or an offline license. Dynamsoft usually provides an online license.
     *
     * `license` needs to be set before {@link createInstance} or {@link loadWasm}.
     *
     * Besides, it is also recommended to set license in `data-license` attribute of `script` tag, instead of in `Javascript` code.
     * @example
     * ```html
     * <script src="https://cdn.jsdelivr.net/npm/dynamsoft-javascript-barcode/dist/dbr.js" data-license="YOUR-LICENSE-KEY"></script>
     * ```
     * or
     * ```js
     * Dynamsoft.DBR.BarcodeReader.license = "YOUR-LICENSE-KEY";
     * ```
     */
    static get license(): string;
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
    /** @ignore */
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
     * Detects the current running environment and returns a report.
     * @returns A promise resolving to an object which contains some information of the current running environment.
     * @example
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
    /**
     * Sets a human-readable name that identifies the device.
     * This name will appear in the device details table when you check the statistics of the according license.
     * @defaultValue `""`
     */
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
     * Whether to save the original image into a `HTMLCanvasElement` element. The original image refers to the actual image the library tried to read barcodes from. It can be returned by {@link getOriginalImageInACanvas}.
     * @defaultValue `false`
     * @example
     * ```js
     * reader.ifSaveOriginalImageInACanvas = true;
     * let results = await reader.decode(source);
     * document.body.append(reader.getOriginalImageInACanvas());
     * ```
     * @see {@link getOriginalImageInACanvas}
     */
    get ifSaveOriginalImageInACanvas(): boolean;
    set ifSaveOriginalImageInACanvas(value: boolean);
    /** @ignore */
    protected oriCanvas?: HTMLCanvasElement;
    /** @ignore */
    protected oriCanvasData?: any;
    /**
     * An `HTMLCanvasElement` that holds the original image.
     * The original image refers to the actual image the library tried to read barcodes from.
     * ```js
     * reader.ifSaveOriginalImageInACanvas = true;
     * let results = await reader.decode(source);
     * document.body.append(reader.getOriginalImageInACanvas());
     * ```
     * @see {@link ifSaveOriginalImageInACanvas}
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
    protected bDestroyed: boolean;
    /**
     * Returns whether the instance has been destroyed.
     * @see {@link destroyContext}
     */
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
    /**
     * Returns or sets the URL of the *.html* file that defines the default UI Element.
     * The URL can only be set before the {@link createInstance} is called.
     */
    static get defaultUIElementURL(): string;
    static set defaultUIElementURL(value: string);
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
    /**
     * Sets an image source for continous scanning.
     * @param imgSource Specifies the image source.
     * @param options Options to help with the usage of the `ImageSource` object. At present, it only contains one property `resultsHighlightBaseShapes` that accepts `Dynamsoft.DCE.DrawingItem` as its value to help with the highlighting of barcode regions as shown in the code snippet below. More properties will be added as needed in the future.
     * @returns A promise that resolves when the operation succeeds.
     * @example
     * ```js
     * let reader = await Dynamsoft.DBR.BarcodeReader.createInstance();
     * let enhancer = await Dynamsoft.DCE.CameraEnhancer.createInstance();
     * let options = { resultsHighlightBaseShapes: Dynamsoft.DCE.DrawingItem };
     * await reader.setImageSource(enhancer, options);
     * reader.onUniqueRead = (txt, result) => {
     *   console.log(txt);
     * };
     * await reader.startScanning(true);
     * ```
     * @see {@link ImageSource}
     */
    setImageSource(imgSource: ImageSource | CameraEnhancer, options?: any): Promise<void>;
    /**
     * Downloads and compiles the engine to get it loaded/ready for a `BarcodeReader` or `BarcodeScanner` instance to be created.
     * You can call this API to silently set the operating environment of the library as soon as the page is loaded, avoiding unnecessary waiting time when using the library later.
     *
     * If this API is not called beforehand, it will be called automatically when creating an instance of `BarcodeReader` or `BarcodeScanner`.
     * @returns A promise that resolves when the operation succeeds.
     * @example
     * ```js
     * window.addEventListener('DOMContentLoaded', (event) => {
     *   Dynamsoft.DBR.BarcodeReader.loadWasm();
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
     * Creates a `BarcodeReader` instance.
     * @returns A promise resolving to the created `BarcodeReader` object.
     * @example
     * ```
     * let reader = await Dynamsoft.DBR.BarcodeReader.createInstance();
     * ```
     * @see {@link destroyContext}
     * @category Initialize and Destroy
     */
    static createInstance(): Promise<BarcodeReader>;
    protected clearMapDecodeRecord(): Promise<void>;
    /**
     * Decode barcodes from a image.
     * If the content in the binary data is raw img data, such as `RGBA` , use {@link decodeBuffer} instead.
     *
     * Note: To speed up the reading, the image will be scaled down when it exceeds a size limit either horizontally or vertically.
     * The limit is 2048 pixels on mobile devices and 4096 on other devices.
     * If the template "dense" or "distance" is used, the limit is 4096 regardless of which device is used.
     * @param source specifies the image to decode. The supported image formats include `png` , `jpeg` , `bmp` , `gif` and a few others (some browsers support `webp` , `tif` ).
     * Also note that the image can be specified in a lot of ways including binary data, base64 string (with MIME), URL, etc.
     * @returns A promise resolving to an array of `TextResult` that contains all the barcode results found in this image.
     * @example
     * ```js
     * let results1 = await reader.decode(blob);
     * let results2 = await reader.decode(htmlImageElement);
     * let results3 = await reader.decode(url);
     * let results4 = await reader.decode(base64WithMime); // like `data:image/png;base64,iV************`
     * ```
     *
     * You can even use an `HTMLVideoElement` as the source. If the video is playing, the current frame will be decoded.
     *
     * ```js
     * let results;
     * try{
     *   // The current frame will be decoded.
     *   results = await reader.decode(htmlVideoElement);
     * }catch(ex){
     *   // If no frame in the video, will throw an exception.
     * }
     * ```
     * @see {@link TextResult}
     * @see {@link decodeBuffer}
     * @category Decode
     */
    decode(source: Blob | Buffer | ArrayBuffer | Uint8Array | Uint8ClampedArray | HTMLImageElement | HTMLCanvasElement | HTMLVideoElement | string | DCEFrame | DSImage): Promise<TextResult[]>;
    /**
     * Decodes barcodes from a base64-encoded image (with or without MIME).
     * @param base64 Specifies the image represented by a string.
     * @returns A promise resolving to an array of {@link TextResult} object that contains the barcode results found in this image.
     * @example
     * ```js
     * let results = await reader.decodeBase64String(strBase64); //e.g. `data:image/jpg;base64,Xfjshekk....` or `Xfjshekk...`.
     * for(let result of results){
     *     console.log(result.barcodeText);
     * }
     * ```
     * @see {@link TextResult}
     * @category Decode
     */
    decodeBase64String(base64: string): Promise<TextResult[]>;
    /**
     * Decodes barcodes from an image specified by its URL.
     *
     * Note that the image should either be from the same domain or has the 'Access-Control-Allow-Origin' header set to allow access from your current domain.
     * @param url Specifies the image by its URL.
     * @returns A promise resolving to an array of {@link TextResult} object that contains the barcode results found in this image.
     * @example
     * ```js
     * let results = await reader.decodeUrl("https://www.yourdomain.com/imageWithBarcodes.png");
     * for(let result of results){
     *     console.log(result.barcodeText);
     * }
     * ```
     * @see {@link TextResult}
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
     * Decodes barcodes from raw image data. It is an advanced API, if you don't know what you are doing, use [decode](#decode) instead.
     * @param buffer Specifies the raw image represented by a `Uint8Array` , `Uint8ClampedArray` , `ArrayBuffer` , `Blob` or `Buffer` object.
     * @param width Image width.
     * @param height Image height.
     * @param stride `image-width * pixel-byte-length`.
     * @param format Pixel format.
     * @param config Specifies the oritation of the image data.
     * @returns A promise resolving to an array of {@link TextResult} object that contains the barcode results found in this image.
     * @example
     * ```js
     * let results = await reader.decodeBuffer(u8RawImage, 1280, 720, 1280 * 4, Dynamsoft.DBR.EnumImagePixelFormat.IPF_ABGR_8888);
     * for (let result of results) {
     *   console.log(result.barcodeText);
     * }
     * ```
     * @see {@link TextResult}
     * @see {@link EnumImagePixelFormat}
     * @category Decode
     */
    decodeBuffer(buffer: Uint8Array | Uint8ClampedArray | ArrayBuffer | Blob | Buffer, width: number, height: number, stride: number, format: EnumImagePixelFormat, orientation?: number, config?: any): Promise<TextResult[]>;
    /** @ignore */
    _decodeFileInMemory_Uint8Array(bytes: Uint8Array): Promise<any>;
    /**
     * Returns the current runtime settings.
     * @returns A promise resolving to a {@link RuntimeSettings} object that contains the settings for barcode reading.
     * @example
     * ```js
     * let settings = await reader.getRuntimeSettings();
     * settings.deblurLevel = 5;
     * await reader.updateRuntimeSettings(settings);
     * ```
     * @see {@link RuntimeSettings}
     * @see {@link updateRuntimeSettings}
     * @see {@link resetRuntimeSettings}
     * @category Runtime Settings
     */
    getRuntimeSettings(): Promise<RuntimeSettings>;
    /**
     * Updates runtime settings.
     * @param settings a {@link RuntimeSettings} object, or a string represent one of preset templates:
     *
     * `speed`: fast but may miss a few codes;
     *
     * `coverage`: slow but try to find all codes, this is the default setting for a `BarcodeReader` instance;
     *
     * `balance`: between `speed` and `coverage`;
     *
     * `dense`: optimized for scanning dense barcodes such as the PDF417 on driver's license;
     *
     * `distance`: optimized for scanning a barcode that is placed far from the device and appear small in the video stream.
     *
     * Note: If the settings `barcodeFormatIds` , `barcodeFormatIds_2` and `region` have been changed by the customer, changing the template will preserve the previous settings.
     * @returns A promise that resolves when the operation succeeds.
     * @example
     * ```js
     * await reader.updateRuntimeSettings('balance');
     * let settings = await reader.getRuntimeSettings();
     * settings.barcodeFormatIds = Dynamsoft.DBR.EnumBarcodeFormat.BF_ONED;
     * await reader.updateRuntimeSettings(settings);
     * ```
     * @see {@link RuntimeSettings}
     * @see {@link getRuntimeSettings}
     * @see {@link resetRuntimeSettings}
     * @category Runtime Settings
     */
    updateRuntimeSettings(settings: RuntimeSettings | string): Promise<void>;
    /**
     * Resets all parameters to default values.
     *
     * For a `BarcodeReader` instance, it is equivalent to setting the `coverage` template.
     *
     * For a `BarcodeScanner` instance, it is equivalent to setting the `single` template.
     * @returns A promise that resolves when the operation succeeds.
     * @example
     * ```js
     * await reader.resetRuntimeSettings();
     * ```
     * @category Runtime Settings
     */
    resetRuntimeSettings(): Promise<void>;
    /**
     *
     * @returns
     * @ignore
     */
    _resetRuntimeSettingsToCppDefault(): Promise<void>;
    /**
     * Return the current `RuntimeSettings` in the form of a string.
     * @returns A promise resolving to a string which represents the current `RuntimeSettings`.
     * @example
     * ```js
     * let strSettings = await reader.outputRuntimeSettingsToString();
     * ```
     * @see {@link RuntimeSettings}
     * @see {@link getRuntimeSettings}
     * @category Runtime Settings
     */
    outputRuntimeSettingsToString(): Promise<string>;
    /**
     * Initialize runtime settings with the settings in given JSON string.
     * @param settings A string representing the template.
     * @returns A promise that resolves when the operation succeeds.
     * @example
     * ```js
     * await reader.initRuntimeSettingsWithString("{\"Version\":\"3.0\", \"ImageParameter\":{\"Name\":\"IP1\", \"BarcodeFormatIds\":[\"BF_QR_CODE\"], \"ExpectedBarcodesCount\":10}}");
     * ```
     * @see {@link RuntimeSettings}
     * @see {@link updateRuntimeSettings}
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
     * Sets the argument value for the specified mode parameter.
     * @param modeName Specifies the mode which contains one or multiple elements.
     * @param index Specifies an element of the mode by its index.
     * @param argumentName Specifies the argument.
     * @param argumentValue Specifies the value.
     * @returns A promise that resolves when the operation succeeds.
     * @example
     * ```js
     * await reader.setModeArgument("BinarizationModes", 0, "EnableFillBinaryVacancy", "1");
     * ```
     * @see {@link getModeArgument}
     * @category Runtime Settings
     */
    setModeArgument(modeName: string, index: number, argumentName: string, argumentValue: string): Promise<void>;
    /**
     * Returns the argument value for the specified mode parameter.
     * @param modeName Specifies the mode which contains one or multiple elements.
     * @param index Specifies an element of the mode by its index.
     * @param argumentName Specifies the argument.
     * @returns A promise resolving to a string which represents the value of the argument.
     * @example
     * ```js
     * let argumentValue = await reader.getModeArgument("BinarizationModes", 0, "EnableFillBinaryVacancy");
     * ```
     * @see {@link setModeArgument}
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
     * This event is triggered after the library finishes scanning a image.
     * @event onImageRead
     * @defaultValue `undefined`
     * @param results An array of `TextResult` object that contains the barcode results in this frame.
     * @example
     * ```js
     * let reader = await Dynamsoft.DBR.BarcodeReader.createInstance();
     * let enhancer = await Dynamsoft.DCE.CameraEnhancer.createInstance();
     * let options = {
     *   resultsHighlightBaseShapes: Dynamsoft.DCE.DrawingItem
     * };
     * await reader.setImageSource(enhancer, options);
     * reader.onImageRead = (results) => {
     *   if (results.length > 0) {
     *     results.forEach(result => {
     *       console.log(result.barcodeText);
     *     });
     *   }
     * };
     * await reader.startScanning(true);
     * ```
     * @see {@link TextResult}
     * @see {@link onUniqueRead}
     */
    onImageRead?: (results: TextResult[]) => void;
    /**
     * This event is triggered when a new, unduplicated label is found.
     * @event onUniqueRead
     * @defaultValue `undefined`
     * @param txt A string that holds the barcode text.
     * @param txt A {@link TextResult} object that contains more detailed info.
     * @example
     * ```js
     * let reader = await Dynamsoft.DBR.BarcodeReader.createInstance();
     * let enhancer = await Dynamsoft.DCE.CameraEnhancer.createInstance();
     * let options = {
     *   resultsHighlightBaseShapes: Dynamsoft.DCE.DrawingItem
     * };
     * await reader.setImageSource(enhancer, options);
     * reader.onUniqueRead = (txt, result) => {
     *   console.log(txt);
     * };
     * await reader.startScanning(true);
     * ```
     * @see {@link TextResult}
     * @see {@link onImageRead}
     */
    onUniqueRead?: (txt: string, result: TextResult) => void;
    /**
     * Get current scan settings.
     * @returns A promise resolving to a {@link ScanSettings}.
     * @example
     * ```js
     * let scanSettings = await scanner.getScanSettings();
     * scanSettings.intervalTime = 50;
     * scanSettings.duplicateForgetTime = 1000;
     * await scanner.updateScanSettings(scanSettings);
     * ```
     * @see {@link ScanSettings}
     * @see {@link updateScanSettings}
     */
    getScanSettings(): Promise<ScanSettings>;
    /**
     * Changes scan settings with the object passed in.
     * @param settings Specifies the new scan settings.
     * @returns A promise that resolves when the operation succeeds.
     * @example
     * ```js
     * let scanSettings = await scanner.getScanSettings();
     * scanSettings.intervalTime = 50;
     * scanSettings.duplicateForgetTime = 1000;
     * await scanner.updateScanSettings(scanSettings);
     * ```
     * @see {@link ScanSettings}
     * @see {@link getScanSettings}
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
     * Open the camera and starts continuous scanning of incoming images.
     * @param appendOrShowUI this parameter specifies how to handle the UI that comes with the bound CameraEnhancer instance.
     * When set to true, if the UI doesn't exist in the DOM tree, the `CameraEnhancer` instance will append it in the DOM and show it; if the UI already exists in the DOM tree but is hidden, it'll be displayed.
     * When not set or set to false, it means not to change the original state of that UI: if it doesn't exist in the DOM tree, nothing shows up on the page; if it exists in the DOM tree, it may or may not show up depending on its original state.
     * @returns A promise resolving to a {@link ScannerPlayCallbackInfo} object which contains the resolution of the video.
     * @example
     * ```js
     * let reader = await Dynamsoft.DBR.BarcodeReader.createInstance();
     * let enhancer = await Dynamsoft.DCE.CameraEnhancer.createInstance();
     * let options = {
     *   resultsHighlightBaseShapes: Dynamsoft.DCE.DrawingItem
     * };
     * await reader.setImageSource(enhancer, options);
     * reader.onUniqueRead = (txt, result) => {
     *   console.log(txt);
     * };
     * await reader.startScanning(true);
     * ```
     * @see {@link ScannerPlayCallbackInfo}
     * @see {@link stopScanning}
     * @see {@link pauseScanning}
     * @see {@link resumeScanning}
     * @category Open and Close
     */
    startScanning(bShowUI?: boolean): Promise<ScannerPlayCallbackInfo>;
    /**
     * Stops continuous scanning and closes the video stream.
     * @param hideUI this parameter specifies how to handle the UI that comes with the bound `CameraEnhancer` instance.
     * When set to true, if the UI doesn't exist in the DOM tree or it exists but is hidden, nothing is done; if the UI already exists in the DOM tree and is shown, it'll be hidden.
     * When not set or set to false, it means not to change the original state of that UI: if it doesn't exist in the DOM tree, nothing happens; if it exists in the DOM tree, it may or may not be hidden depending on its original state.
     * @example
     * ```js
     * let reader = await Dynamsoft.DBR.BarcodeReader.createInstance();
     * let enhancer = await Dynamsoft.DCE.CameraEnhancer.createInstance();
     * let options = {
     *   resultsHighlightBaseShapes: Dynamsoft.DCE.DrawingItem
     * };
     * await reader.setImageSource(enhancer, options);
     * reader.onUniqueRead = (txt, result) => {
     *   console.log(txt);
     *   reader.stopScanning(true);
     * };
     * await reader.startScanning(true);
     * ```
     * @see {@link startScanning}
     * @see {@link pauseScanning}
     * @see {@link resumeScanning}
     * @category Open and Close
     */
    stopScanning(bHideUI?: boolean): void;
    /**
     * Pause continuous scanning but keep the video stream.
     * @param options Options to configure how the pause works.
     * At present, it only contains one property `keepResultsHighlighted` which, when set to `true`, will keep the barcodes found on the frame (at the time of the pause) highlighted.
     * @see {@link resumeScanning}
     * @category Pause and Resume
     */
    pauseScanning(options?: any): void;
    /**
     * Resumes continuous scanning.
     * @see {@link pauseScanning}
     * @category Pause and Resume
     */
    resumeScanning(): void;
    /**
     * Destroy the `BarcodeReader` instance.
     * If your page needs to create new instances from time to time, don't forget to destroy unused old instances.
     * @see {@link isContextDestroyed}
     * @category Initialize and Destroy
     */
    destroyContext(): void;
}
//# sourceMappingURL=barcodereader.d.ts.map