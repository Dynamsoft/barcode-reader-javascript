/// <reference types="node" />
import { TextResult } from "../interface/textresult";
import { RuntimeSettings } from "../interface/runtimesettings";
import { EnumImagePixelFormat } from "../enum/enumimagepixelformat";
import { BarcodeReaderException } from "../interface/barcodereaderexception";
import { Region } from "../interface/region";
/**
 * The `BarcodeReader` class is used for image decoding
 * Comparing to `BarcodeScanner`, the default decoding settings are more accurate but slower.
 * ```js
 * let pReader = null;
 * (async()=>{
 *     let reader = await (pReader = pReader || Dynamsoft.DBR.BarcodeReader.createInstance());
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
     * <script src="https://cdn.jsdelivr.net/npm/dynamsoft-javascript-barcode@8.8.7/dist/dbr.js" data-license="PRODUCT-KEYS"></script>
     * ```
     */
    static set license(keys: string);
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
     * modify from https://gist.github.com/2107/5529665
     * @ignore
     */
    static browserInfo: any;
    /**
     * Detect environment and get a report.
     * ```js
     * console.log(Dynamsoft.DBR.BarcodeReader.detectEnvironment());
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
     * Dynamsoft.DBR.BarcodeReader.engineResourcePath = "https://cdn.jsdelivr.net/npm/dynamsoft-javascript-barcode@8.8.7/dist/";
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
    /** @ignore */
    static _isShowRelDecodeTimeInResults: boolean;
    /** @ignore */
    _canvasMaxWH: number;
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
    private static _loadWasmStatus;
    private static _loadWasmCallbackArr;
    /** @ignore */
    _instanceID: number;
    /** @ignore */
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
    oriCanvas?: HTMLCanvasElement | OffscreenCanvas;
    /**
     * Return a reference of the original canvas.
     * ```js
     * reader.ifSaveOriginalImageInACanvas = true;
     * let results = await reader.decode(source);
     * document.body.append(reader.getOriginalImageInACanvas());
     * ```
     */
    getOriginalImageInACanvas(): OffscreenCanvas | HTMLCanvasElement;
    /** @ignore  */
    /** @ignore */
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
    _bUseWebgl: boolean;
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
    static isLoaded(): boolean;
    /**
     * Indicates whether the instance has been destroyed.
     */
    bDestroyed: boolean;
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
    private static _loadWasmErr;
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
    decode(source: Blob | Buffer | ArrayBuffer | Uint8Array | Uint8ClampedArray | HTMLImageElement | HTMLCanvasElement | HTMLVideoElement | string): Promise<TextResult[]>;
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
    _decodeBuffer_Uint8Array(buffer: Uint8Array | Uint8ClampedArray, width: number, height: number, stride: number, format: EnumImagePixelFormat, config?: any): Promise<TextResult[]>;
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
    _decodeBuffer_Blob(buffer: Blob, width: number, height: number, stride: number, format: EnumImagePixelFormat, config?: any): Promise<any>;
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
    decodeBuffer(buffer: Uint8Array | Uint8ClampedArray | ArrayBuffer | Blob | Buffer, width: number, height: number, stride: number, format: EnumImagePixelFormat, config?: any): Promise<TextResult[]>;
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
    /**
     * Output runtime settings to a string.
     * ```js
     * let strSettings = await reader.outputSettingsToString();
     * ```
     * The method is only supported in the full feature edition.
     * @ignore
     * @category Runtime Settings
     */
    outputSettingsToString(): Promise<string>;
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
    private _decode_Base64;
    private _decode_Url;
    private _decode_FilePath;
    /** @ignore */
    static fixResultLocationWhenFilterRegionInJs(region: any, results: TextResult[], sx: number, sy: number, sWidth: number, sHeight: number, dWidth: number, dHeight: number): void;
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
    /** @ignore */
    destroy(): Promise<void>;
    /**
     * Destroy the `BarcodeReader` instance. If your page needs to create new instances from time to time, don't forget to destroy unused old instances, otherwise it will cause memory leaks.
     * @category Initialize and Destroy
     */
    destroyContext(): Promise<void>;
}
//# sourceMappingURL=barcodereader.d.ts.map