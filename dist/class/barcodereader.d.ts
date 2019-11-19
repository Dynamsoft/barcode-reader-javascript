import TextResult from "../interface/textresult";
import RuntimeSettings from "../interface/runtimesettings";
import { EnumImagePixelFormat } from "../enum/enumimagepixelformat";
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
    bSaveOriCanvas: boolean;
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
     */
    static createInstance(): Promise<BarcodeReader>;
    /**
     * The main decoding method can accept a variety of data types, including binary data, images, base64(with mime), urls, etc.
     */
    decode(source: Blob | ArrayBuffer | Uint8Array | Uint8ClampedArray | HTMLImageElement | HTMLCanvasElement | HTMLVideoElement | string): Promise<TextResult[]>;
    /**
     * The decoding method can accept base64 with or without mime.
     * e.g. `data:image/jpg;base64,Xfjshekk....` or `Xfjshekk...`.
     */
    decodeBase64String(source: string): Promise<TextResult[]>;
    /**
     * The decoding method can accept url. The url source need to be in the same domain or allowed cors.
     */
    decodeUrl(source: string): Promise<TextResult[]>;
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
     */
    getRuntimeSettings(): Promise<RuntimeSettings>;
    /**
     * Update runtime settings with a given struct.
     */
    updateRuntimeSettings(settings: RuntimeSettings): Promise<void>;
    /**
     * Resets all parameters to default values.
     */
    resetRuntimeSettings(): Promise<void>;
    /**
     * The method is only supported in the full feature edition.
     */
    outputSettingsToString(): Promise<string>;
    /**
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
     */
    getIntermediateResults(): Promise<any>;
    setModeArgument(modeName: string, index: number, argumentName: string, argumentValue: string): Promise<void>;
    /**
     * @ignore
     */
    getIntermediateCanvas(): Promise<HTMLCanvasElement | null>;
}
