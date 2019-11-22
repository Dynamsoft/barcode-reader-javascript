import TextResult from "../interface/textresult";
import RuntimeSettings from "../interface/runtimesettings";
import { EnumImagePixelFormat } from "../enum/enumimagepixelformat";
/**
 * A class dedicated to image decoding.
 * ```js
 * let reader = await Dynamsoft.BarcodeReader.createInstance();
 * let results = await reader.decode(imageSource);
 * for(let result in results){
 *     console.log(result.barcodeText);
 * }
 * ```
 */
export default class BarcodeReader {
    /**
     * @ignore
     */
    static _jsVersion: any;
    /**
     * @ignore
     */
    static _jsEditVersion: any;
    protected static _version: string;
    static readonly version: string;
    protected static _productKeys: string;
    static productKeys: string;
    /**
     * @ignore
     */
    static _workerName: string;
    /**
     * @ignore
     */
    static _bUseIndexDB: boolean;
    protected static _engineResourcePath?: string;
    /**
     * The SDK will try to automatically explore the engine location.
     * If the auto-explored engine location is not accurate, manually specify the engine location.
     * ```js
     * Dynamsoft.BarcodeReader.engineResourcePath = "https://cdn.jsdelivr.net/npm/dynamsoft-javascript-barcode@7.2.2/dist/";
     * await Dynamsoft.BarcodeReader.loadWasm();
     * ```
    */
    static engineResourcePath: string;
    protected static _licenseServer?: string;
    /**
     * @ignore
     */
    /**
    * @ignore
    */
    static licenseServer: string;
    /**
     * @ignore
     */
    static _isShowRelDecodeTimeInResults: boolean;
    /**
     * @ignore
     */
    static _canvasMaxWH: number;
    /**
     * @ignore
     */
    static _onLog: (message: any) => void;
    /**
     * @ignore
     */
    static _bWasmDebug: boolean;
    /**
     * @ignore
     */
    static _bSendSmallRecordsForDebug: boolean;
    /**
     * Whether to use full feature wasm.
     * The api may change in later version.
     * ```txt
     * Min wasm:
     * oned + qr + pdf417 + datamatrix.
     *
     * Full wasm:
     * all supported barcode format +
     * high level deblur available (lv8, 9) +
     * DPM +
     * template API +
     * intermediate results API
     *
     * e.g.:
     * Use min in video deocode (small, download and initialization fast).
     * Use full in file decode (need high level deblur).
     * ```
     * Need to be set before loadWasm.
     * ```js
     * reader._bUseFullFeature = true;
     * await reader.loadWasm();
     * ```
     */
    static _bUseFullFeature: boolean;
    protected static _dbrWorker: Worker;
    protected static _nextTaskID: number;
    protected static _taskCallbackMap: Map<number, (body: any) => void>;
    private static _loadWasmStatus;
    private static _loadWasmCallbackArr;
    /**
     * @ignore
     */
    _instanceID: number;
    /**
     * Whether to save the original image into canvas.
     * ```js
     * reader.bSaveOriCanvas = true;
     * let results = await reader.decode(source);
     * document.body.append(reader.oriCanvas);
     * ```
     */
    bSaveOriCanvas: boolean;
    /**
     * The original canvas.
     * ```js
     * reader.bSaveOriCanvas = true;
     * let results = await reader.decode(source);
     * document.body.append(reader.oriCanvas);
     * ```
     */
    oriCanvas?: HTMLCanvasElement;
    /**
     * @ignore A callback when wasm download success in browser environment.
     */
    static _onWasmDownloaded: () => void;
    /**
     * Determine if the decoding module has been loaded successfully.
     */
    static isLoaded(): boolean;
    /**
     * Manually load and compile the decoding module. Used for preloading to avoid taking too long for lazy loading.
     */
    static loadWasm(): Promise<void>;
    protected static createInstanceInWorker(bScanner?: boolean): Promise<number>;
    /**
     * Create a `BarcodeReader` object.
     * ```
     * let reader = await Dynamsoft.BarcodeReader.createInstance();
     * ```
     */
    static createInstance(): Promise<BarcodeReader>;
    /**
     * The main decoding method can accept a variety of data types, including binary data, images, base64(with mime), urls, etc.
     * ```js
     * let results = await reader.decode(blob);
     * ```
     * @param source
     */
    decode(source: Blob | ArrayBuffer | Uint8Array | Uint8ClampedArray | HTMLImageElement | HTMLCanvasElement | HTMLVideoElement | string): Promise<TextResult[]>;
    /**
     * The decoding method can accept base64 with or without mime.
     * e.g. `data:image/jpg;base64,Xfjshekk....` or `Xfjshekk...`.
     * ```js
     * let results = await reader.decode(strBase64);
     * ```
     * @param base64
     */
    decodeBase64String(base64: string): Promise<TextResult[]>;
    /**
     * The decoding method can accept url. The url source need to be in the same domain or allowed cors.
     * ```js
     * let results = await reader.decode("./1.png");
     * ```
     * @param url
     */
    decodeUrl(url: string): Promise<TextResult[]>;
    /**
     * Decodes barcodes from the memory buffer containing image pixels in defined format.
     * @ignore
     */
    _decodeBuffer_Uint8Array(buffer: Uint8Array | Uint8ClampedArray, width: number, height: number, stride: number, format: EnumImagePixelFormat, config?: any): Promise<any>;
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
    decodeBuffer(buffer: Uint8Array | Uint8ClampedArray | ArrayBuffer | Blob, width: number, height: number, stride: number, format: EnumImagePixelFormat, config?: any): Promise<any>;
    /**
     * Gets current settings and save it into a struct.
     * ```js
     * let settings = await reader.getRuntimeSettings();
     * settings.deblurLevel = 5;
     * await reader.updateRuntimeSettings();
     * ```
     */
    getRuntimeSettings(): Promise<RuntimeSettings>;
    /**
     * Update runtime settings with a given struct.
     * ```js
     * let settings = await reader.getRuntimeSettings();
     * settings.deblurLevel = 5;
     * await reader.updateRuntimeSettings();
     * ```
     */
    updateRuntimeSettings(settings: RuntimeSettings): Promise<void>;
    /**
     * Resets all parameters to default values.
     * ```js
     * await reader.resetRuntimeSettings();
     * ```
     */
    resetRuntimeSettings(): Promise<void>;
    /**
     * Outputs the license content as an encrypted string from the license server to be used for offline license verification.
     * ```js
     * let strSettings = await reader.outputSettingsToString();
     * ```
     * The method is only supported in the full feature edition.
     */
    outputSettingsToString(): Promise<string>;
    /**
     * Initialize runtime settings with the settings in given JSON string.
     * ```js
     * await reader.initRuntimeSettingsWithString("{\"Version\":\"3.0\", \"ImageParameter\":{\"Name\":\"IP1\", \"BarcodeFormatIds\":[\"BF_QR_CODE\"], \"ExpectedBarcodesCount\":10}}");
     * ```
     * The method is only supported in the full feature edition.
     */
    initRuntimeSettingsWithString(settings: any): Promise<void>;
    /**
     * Destructor the `BarcodeReader` object.
     * Equivalent to the previous method `deleteInstance()`.
     */
    destroy(): Promise<any>;
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
     *
     * @param video
     * @param config
     * @ignore
     */
    _decode_Video(video: HTMLVideoElement, config?: any): Promise<TextResult[]>;
    private _decode_Base64;
    private _decode_Url;
    /**
     * @ignore
     */
    static BarcodeReaderException(ag0: any, ag1: any): Error;
    private _handleRetJsonString;
    /**
     * The method is only supported in the full feature edition.
     * Returns intermediate results containing the original image, the colour clustered image, the binarized Image, contours, Lines, TextBlocks, etc.
     * ```js
     * let imResults = await getIntermediateResults();
     * ```
     */
    getIntermediateResults(): Promise<any>;
    /**
     * Sets the optional argument for a specified mode in Modes parameters.
     * ```js
     * await reader.setModeArgument("BinarizationModes", 0, "EnableFillBinaryVacancy", "1");
     * ```
     * @param modeName
     * @param index
     * @param argumentName
     * @param argumentValue
     */
    setModeArgument(modeName: string, index: number, argumentName: string, argumentValue: string): Promise<void>;
    /**
     * @ignore
     */
    getIntermediateCanvas(): Promise<HTMLCanvasElement | null>;
}
