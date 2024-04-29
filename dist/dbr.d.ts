import { CameraEnhancer, DCEFrame } from 'dynamsoft-camera-enhancer';
import { Howl } from 'dm-howler';

declare enum EnumResultCoordinateType {
    RCT_PIXEL = 1,
    RCT_PERCENTAGE = 2
}

interface LocalizationResult {
    /**
     * The angle of a barcode. Values range from 0 to 360.
     */
    angle: number;
    /**
     * The X coordinate of the left-most point.
     */
    x1: number;
    /**
     * The X coordinate of the second point in a clockwise direction.
     */
    x2: number;
    /**
     * The X coordinate of the third point in a clockwise direction.
     */
    x3: number;
    /**
     * The X coordinate of the fourth point in a clockwise direction.
     */
    x4: number;
    /**
     * The Y coordinate of the left-most point.
     */
    y1: number;
    /**
     * The Y coordinate of the second point in a clockwise direction.
     */
    y2: number;
    /**
     * The Y coordinate of the third point in a clockwise direction.
     */
    y3: number;
    /**
     * The Y coordinate of the fourth point in a clockwise direction.
     */
    y4: number;
    resultCoordinateType: EnumResultCoordinateType;
    transformationMatrix: Array<number>;
}

declare enum EnumBarcodeFormat {
    BF_ALL = -29360129,
    BF_ONED = 3147775,
    BF_GS1_DATABAR = 260096,
    BF_CODE_39 = 1,
    BF_CODE_128 = 2,
    BF_CODE_93 = 4,
    BF_CODABAR = 8,
    BF_ITF = 16,
    BF_EAN_13 = 32,
    BF_EAN_8 = 64,
    BF_UPC_A = 128,
    BF_UPC_E = 256,
    BF_INDUSTRIAL_25 = 512,
    BF_CODE_39_EXTENDED = 1024,
    BF_GS1_DATABAR_OMNIDIRECTIONAL = 2048,
    BF_GS1_DATABAR_TRUNCATED = 4096,
    BF_GS1_DATABAR_STACKED = 8192,
    BF_GS1_DATABAR_STACKED_OMNIDIRECTIONAL = 16384,
    BF_GS1_DATABAR_EXPANDED = 32768,
    BF_GS1_DATABAR_EXPANDED_STACKED = 65536,
    BF_GS1_DATABAR_LIMITED = 131072,
    BF_PATCHCODE = 262144,
    BF_PDF417 = 33554432,
    BF_QR_CODE = 67108864,
    BF_DATAMATRIX = 134217728,
    BF_AZTEC = 268435456,
    BF_MAXICODE = 536870912,
    BF_MICRO_QR = 1073741824,
    BF_MICRO_PDF417 = 524288,
    BF_GS1_COMPOSITE = -2147483648,
    BF_MSI_CODE = 1048576,
    BF_CODE_11 = 2097152,
    BF_NULL = 0
}

/**
 * @see [C++ TextResult](https://www.dynamsoft.com/barcode-reader/programming/c-cplusplus/struct/TextResult.html?src=cpp&&ver=latest)
*/
interface TextResult {
    /**
     * The barcode text.
     */
    barcodeText: string;
    /**
     * The barcode format.
     */
    barcodeFormat: number | EnumBarcodeFormat;
    /**
     * Barcode type in string.
     */
    barcodeFormatString: string;
    /**
     * The barcode content in a byte array.
     */
    barcodeBytes: number[];
    /**
     * The corresponding localization result.
     */
    localizationResult: LocalizationResult;
}

interface Region {
    regionBottom: number;
    regionRight: number;
    regionLeft: number;
    regionTop: number;
    regionMeasuredByPercentage: number | boolean;
}

declare enum EnumIntermediateResultType {
    IRT_NO_RESULT = 0,
    IRT_ORIGINAL_IMAGE = 1,
    IRT_COLOUR_CLUSTERED_IMAGE = 2,
    IRT_COLOUR_CONVERTED_GRAYSCALE_IMAGE = 4,
    IRT_TRANSFORMED_GRAYSCALE_IMAGE = 8,
    IRT_PREDETECTED_REGION = 16,
    IRT_PREPROCESSED_IMAGE = 32,
    IRT_BINARIZED_IMAGE = 64,
    IRT_TEXT_ZONE = 128,
    IRT_CONTOUR = 256,
    IRT_LINE_SEGMENT = 512,
    IRT_FORM = 1024,
    IRT_SEGMENTATION_BLOCK = 2048,
    IRT_TYPED_BARCODE_ZONE = 4096,
    IRT_PREDETECTED_QUADRILATERAL = 8192
}

declare enum EnumTerminatePhase {
    TP_REGION_PREDETECTED = 1,
    TP_IMAGE_PREPROCESSED = 2,
    TP_IMAGE_BINARIZED = 4,
    TP_BARCODE_LOCALIZED = 8,
    TP_BARCODE_TYPE_DETERMINED = 16,
    TP_BARCODE_RECOGNIZED = 32
}

declare enum EnumTextResultOrderMode {
    TROM_CONFIDENCE = 1,
    TROM_POSITION = 2,
    TROM_FORMAT = 4,
    TROM_SKIP = 0,
    TROM_REV = 2147483648
}

declare enum EnumBinarizationMode {
    BM_AUTO = 1,
    BM_LOCAL_BLOCK = 2,
    BM_SKIP = 0,
    BM_THRESHOLD = 4,
    BM_REV = 2147483648
}

declare enum EnumScaleUpMode {
    SUM_AUTO = 1,
    SUM_LINEAR_INTERPOLATION = 2,
    SUM_NEAREST_NEIGHBOUR_INTERPOLATION = 4,
    SUM_SKIP = 0,
    SUM_REV = 2147483648
}

declare enum EnumLocalizationMode {
    LM_SKIP = 0,
    LM_AUTO = 1,
    LM_CONNECTED_BLOCKS = 2,
    LM_LINES = 8,
    LM_STATISTICS = 4,
    LM_SCAN_DIRECTLY = 16,
    LM_STATISTICS_MARKS = 32,
    LM_STATISTICS_POSTAL_CODE = 64,
    LM_CENTRE = 128,
    LM_ONED_FAST_SCAN = 256,
    LM_REV = 2147483648
}

declare enum EnumBarcodeFormat_2 {
    BF2_NULL = 0,
    BF2_POSTALCODE = 32505856,
    BF2_NONSTANDARD_BARCODE = 1,
    BF2_USPSINTELLIGENTMAIL = 1048576,
    BF2_POSTNET = 2097152,
    BF2_PLANET = 4194304,
    BF2_AUSTRALIANPOST = 8388608,
    BF2_RM4SCC = 16777216,
    BF2_DOTCODE = 2,
    BF2_PHARMACODE_ONE_TRACK = 4,
    BF2_PHARMACODE_TWO_TRACK = 8,
    BF2_PHARMACODE = 12,
    BF2_ALL = -1
}

/**
 * @see [C++ RuntimeSettings](https://www.dynamsoft.com/barcode-reader/programming/c-cplusplus/struct/PublicRuntimeSettings.html?src=cpp&&ver=latest)
 */
interface RuntimeSettings {
    /**
     * Sets the formats of the barcode in BarcodeFormat group 1 to be read. Barcode formats in BarcodeFormat group 1 can be combined.
     * ```js
     * let runtimeSettings = await reader.getRuntimeSettings();
     * runtimeSettings.barcodeFormatIds = Dynamsoft.DBR.EnumBarcodeFormat.BF_ONED | Dynamsoft.DBR.EnumBarcodeFormat.BF_QR_CODE;
     * await reader.updateRuntimeSettings(runtimeSettings);
     * ```
     */
    barcodeFormatIds: number | EnumBarcodeFormat;
    /**
     * Sets the formats of the barcode in BarcodeFormat group 2 to be read. Barcode formats in BarcodeFormat group 1 can be combined.
     */
    barcodeFormatIds_2: number | EnumBarcodeFormat_2;
    /**
     * Sets the mode and priority for binarization.
     */
    binarizationModes: EnumBinarizationMode[];
    /**
     * Sets the degree of blurriness of the barcode.
     */
    deblurLevel: number;
    /**
     * Sets the number of barcodes expected to be detected for each image.
     */
    expectedBarcodesCount: number;
    /**
     * Sets the further modes.
     */
    furtherModes: any;
    /**
     * Sets which types of intermediate result to be kept for further reference. Intermediate result types can be combined.
     */
    intermediateResultTypes: EnumIntermediateResultType;
    /**
     * Sets the mode and priority for localization algorithms.
     */
    localizationModes: number[] | EnumLocalizationMode[];
    /**
     * Sets the range of barcode text length for barcodes search
     */
    minBarcodeTextLength: number;
    /**
     * The minimum confidence of the result
     */
    minResultConfidence: number;
    /**
     * Sets the region definition including the regionTop, regionLeft, regionRight, regionBottom and regionMeasuredByPercentage.
     *
     * Experimental feature:
     *
     * In [BarcodeScanner](../BarcodeScanner.md), `region` can be an array. For example `region = [r0, r1, r2]`, 0th frame use `r0`, 1st use `r1`, 2nd use `r2`, 3rd use `r0`, and then loop like this.
     */
    region: Region;
    /**
     * Specifies the format for the coordinates returned
     */
    resultCoordinateType: number | EnumResultCoordinateType;
    /**
     * Sets whether or not to return the clarity of the barcode zone.
     */
    returnBarcodeZoneClarity: number;
    /**
     * Sets the threshold for the image shrinking
     */
    scaleDownThreshold: number;
    /**
     * Sets the mode and priority to control the sampling methods of scale-up for linear barcode with small module sizes.
     */
    scaleUpModes: EnumScaleUpMode[];
    /**
     * Sets the phase where the algorithm stops.
     */
    terminatePhase: EnumTerminatePhase;
    /**
     * Sets the mode and priority for the order of the text results returned.
     */
    textResultOrderModes: EnumTextResultOrderMode[];
    /**
     * Sets the maximum amount of time (in milliseconds) that should be spent searching for a barcode per page.
     * It does not include the time taken to load/decode an image (Tiff, PNG, etc) from disk into memory.
     */
    timeout: number;
}

declare enum EnumImagePixelFormat {
    IPF_Binary = 0,
    IPF_BinaryInverted = 1,
    IPF_GrayScaled = 2,
    IPF_NV21 = 3,
    IPF_RGB_565 = 4,
    IPF_RGB_555 = 5,
    IPF_RGB_888 = 6,
    IPF_ARGB_8888 = 7,
    IPF_RGB_161616 = 8,
    IPF_ARGB_16161616 = 9,
    IPF_ABGR_8888 = 10,
    IPF_ABGR_16161616 = 11,
    IPF_BGR_888 = 12
}

declare enum EnumErrorCode {
    DBR_SYSTEM_EXCEPTION = 1,
    DBR_SUCCESS = 0,
    DBR_UNKNOWN = -10000,
    DBR_NO_MEMORY = -10001,
    DBR_NULL_REFERENCE = -10002,
    DBR_LICENSE_INVALID = -10003,
    DBR_LICENSE_EXPIRED = -10004,
    DBR_FILE_NOT_FOUND = -10005,
    DBR_FILETYPE_NOT_SUPPORTED = -10006,
    DBR_BPP_NOT_SUPPORTED = -10007,
    DBR_INDEX_INVALID = -10008,
    DBR_BARCODE_FORMAT_INVALID = -10009,
    DBR_CUSTOM_REGION_INVALID = -10010,
    DBR_MAX_BARCODE_NUMBER_INVALID = -10011,
    DBR_IMAGE_READ_FAILED = -10012,
    DBR_TIFF_READ_FAILED = -10013,
    DBR_QR_LICENSE_INVALID = -10016,
    DBR_1D_LICENSE_INVALID = -10017,
    DBR_DIB_BUFFER_INVALID = -10018,
    DBR_PDF417_LICENSE_INVALID = -10019,
    DBR_DATAMATRIX_LICENSE_INVALID = -10020,
    DBR_PDF_READ_FAILED = -10021,
    DBR_PDF_DLL_MISSING = -10022,
    DBR_PAGE_NUMBER_INVALID = -10023,
    DBR_CUSTOM_SIZE_INVALID = -10024,
    DBR_CUSTOM_MODULESIZE_INVALID = -10025,
    DBR_RECOGNITION_TIMEOUT = -10026,
    DBR_JSON_PARSE_FAILED = -10030,
    DBR_JSON_TYPE_INVALID = -10031,
    DBR_JSON_KEY_INVALID = -10032,
    DBR_JSON_VALUE_INVALID = -10033,
    DBR_JSON_NAME_KEY_MISSING = -10034,
    DBR_JSON_NAME_VALUE_DUPLICATED = -10035,
    DBR_TEMPLATE_NAME_INVALID = -10036,
    DBR_JSON_NAME_REFERENCE_INVALID = -10037,
    DBR_PARAMETER_VALUE_INVALID = -10038,
    DBR_DOMAIN_NOT_MATCHED = -10039,
    DBR_RESERVEDINFO_NOT_MATCHED = -10040,
    DBR_AZTEC_LICENSE_INVALID = -10041,
    DBR_LICENSE_DLL_MISSING = -10042,
    DBR_LICENSEKEY_NOT_MATCHED = -10043,
    DBR_REQUESTED_FAILED = -10044,
    DBR_LICENSE_INIT_FAILED = -10045,
    DBR_PATCHCODE_LICENSE_INVALID = -10046,
    DBR_POSTALCODE_LICENSE_INVALID = -10047,
    DBR_DPM_LICENSE_INVALID = -10048,
    DBR_FRAME_DECODING_THREAD_EXISTS = -10049,
    DBR_STOP_DECODING_THREAD_FAILED = -10050,
    DBR_SET_MODE_ARGUMENT_ERROR = -10051,
    DBR_LICENSE_CONTENT_INVALID = -10052,
    DBR_LICENSE_KEY_INVALID = -10053,
    DBR_LICENSE_DEVICE_RUNS_OUT = -10054,
    DBR_GET_MODE_ARGUMENT_ERROR = -10055,
    DBR_IRT_LICENSE_INVALID = -10056,
    DBR_MAXICODE_LICENSE_INVALID = -10057,
    DBR_GS1_DATABAR_LICENSE_INVALID = -10058,
    DBR_GS1_COMPOSITE_LICENSE_INVALID = -10059,
    DBR_PANORAMA_LICENSE_INVALID = -10060,
    DBR_DOTCODE_LICENSE_INVALID = -10061,
    DBR_PHARMACODE_LICENSE_INVALID = -10062,
    DBR_IMAGE_ORIENTATION_INVALID = -10063,
    DMERR_NO_LICENSE = -20000,
    DMERR_LICENSE_SYNC_FAILED = -20003,
    DMERR_TRIAL_LICENSE = -20010,
    DMERR_FAILED_TO_REACH_LTS = -20200
}

interface BarcodeReaderException extends Error {
    code?: EnumErrorCode;
}

interface DSImage {
    data: Uint8Array;
    width: number;
    height: number;
    pixelFormat: string;
}

interface ImageSource {
    getImage(): Promise<DSImage> | DSImage;
}

/**
 * let scanSettings = await scanner.getScanSettings();
 * scanSettings.intervalTime = 100; // 100ms
 * scanSettings.duplicateForgetTime = 3000; // 3s
 * await scanner.updateScanSettings(scanSettings);
 */
interface ScanSettings {
    intervalTime?: number;
    duplicateForgetTime?: number;
    oneDRememberFrameCount?: number;
    oneDTrustFrameCount?: number;
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
     */
    whenToPlaySoundforSuccessfulRead?: string;
    /**
     * The sound to play when the scanner get successfull read.
     * ```js
     * scanner.soundOnSuccessfullRead = new Audio("./pi.mp3");
     * ```
     */
    soundOnSuccessfullRead?: string;
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
     */
    whenToVibrateforSuccessfulRead?: string;
    /**
     * Get or set how long (ms) the vibration lasts.
     * @see [[whenToVibrateforSuccessfulRead]]
     */
    vibrateDuration?: number;
    captureAndDecodeInParallel?: boolean;
    autoZoom?: boolean;
    autoFocus?: boolean;
    autoSuggestTip?: boolean;
}

interface ScannerPlayCallbackInfo {
    height: number;
    width: number;
    deviceId: string;
}

interface Warning {
    id: number;
    message: string;
}

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
declare class BarcodeReader {
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
    decode(source: Blob | ArrayBuffer | Uint8Array | Uint8ClampedArray | HTMLImageElement | HTMLCanvasElement | HTMLVideoElement | string | DCEFrame | DSImage): Promise<TextResult[]>;
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
     * @param buffer Specifies the raw image represented by a `Uint8Array` , `Uint8ClampedArray` , `ArrayBuffer` or `Blob` object.
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
    decodeBuffer(buffer: Uint8Array | Uint8ClampedArray | ArrayBuffer | Blob, width: number, height: number, stride: number, format: EnumImagePixelFormat, orientation?: number, config?: any): Promise<TextResult[]>;
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

interface VideoDeviceInfo {
    deviceId: string;
    label: string;
    /** @ignore */
    _checked: boolean;
}

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
declare class BarcodeScanner extends BarcodeReader {
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
     * Sets or returns the the maximum time allowed for opening a selected camera.
     * @defaultValue `4000`
     */
    set cameraOpenTimeout(value: number);
    get cameraOpenTimeout(): number;
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

declare enum EnumBarcodeColourMode {
    BICM_DARK_ON_LIGHT = 1,
    BICM_LIGHT_ON_DARK = 2,
    BICM_DARK_ON_DARK = 4,
    BICM_LIGHT_ON_LIGHT = 8,
    BICM_DARK_LIGHT_MIXED = 16,
    BICM_DARK_ON_LIGHT_DARK_SURROUNDING = 32,
    BICM_SKIP = 0,
    BICM_REV = 2147483648
}

declare enum EnumBarcodeComplementMode {
    BCM_AUTO = 1,
    BCM_GENERAL = 2,
    BCM_SKIP = 0,
    BCM_REV = 2147483648
}

declare enum EnumClarityCalculationMethod {
    ECCM_CONTRAST = 1
}

declare enum EnumClarityFilterMode {
    CFM_GENERAL = 1
}

declare enum EnumColourClusteringMode {
    CCM_AUTO = 1,
    CCM_GENERAL_HSV = 2,
    CCM_SKIP = 0,
    CCM_REV = 2147483648
}

declare enum EnumColourConversionMode {
    CICM_GENERAL = 1,
    CICM_SKIP = 0,
    CICM_REV = 2147483648
}

declare enum EnumConflictMode {
    CM_IGNORE = 1,
    CM_OVERWRITE = 2
}

declare enum EnumDeblurMode {
    DM_SKIP = 0,
    DM_DIRECT_BINARIZATION = 1,
    DM_THRESHOLD_BINARIZATION = 2,
    DM_GRAY_EQUALIZATION = 4,
    DM_SMOOTHING = 8,
    DM_MORPHING = 16,
    DM_DEEP_ANALYSIS = 32,
    DM_SHARPENING = 64,
    DM_BASED_ON_LOC_BIN = 128,
    DM_SHARPENING_SMOOTHING = 256
}

declare enum EnumDeformationResistingMode {
    DRM_AUTO = 1,
    DRM_GENERAL = 2,
    DRM_BROAD_WARP = 4,
    DRM_LOCAL_REFERENCE = 8,
    DRM_DEWRINKLE = 16,
    DRM_SKIP = 0,
    DRM_REV = 2147483648
}

declare enum EnumDPMCodeReadingMode {
    DPMCRM_AUTO = 1,
    DPMCRM_GENERAL = 2,
    DPMCRM_SKIP = 0,
    DPMCRM_REV = 2147483648
}

declare enum EnumGrayscaleTransformationMode {
    GTM_INVERTED = 1,
    GTM_ORIGINAL = 2,
    GTM_SKIP = 0,
    GTM_REV = 2147483648
}

declare enum EnumImagePreprocessingMode {
    IPM_AUTO = 1,
    IPM_GENERAL = 2,
    IPM_GRAY_EQUALIZE = 4,
    IPM_GRAY_SMOOTH = 8,
    IPM_SHARPEN_SMOOTH = 16,
    IPM_MORPHOLOGY = 32,
    IPM_SKIP = 0,
    IPM_REV = 2147483648
}

declare enum EnumIMResultDataType {
    IMRDT_IMAGE = 1,
    IMRDT_CONTOUR = 2,
    IMRDT_LINESEGMENT = 4,
    IMRDT_LOCALIZATIONRESULT = 8,
    IMRDT_REGIONOFINTEREST = 16,
    IMRDT_QUADRILATERAL = 32
}

declare enum EnumIntermediateResultSavingMode {
    IRSM_MEMORY = 1,
    IRSM_FILESYSTEM = 2,
    IRSM_BOTH = 4
}

declare enum EnumQRCodeErrorCorrectionLevel {
    QRECL_ERROR_CORRECTION_H = 0,
    QRECL_ERROR_CORRECTION_L = 1,
    QRECL_ERROR_CORRECTION_M = 2,
    QRECL_ERROR_CORRECTION_Q = 3
}

declare enum EnumRegionPredetectionMode {
    RPM_AUTO = 1,
    RPM_GENERAL = 2,
    RPM_GENERAL_RGB_CONTRAST = 4,
    RPM_GENERAL_GRAY_CONTRAST = 8,
    RPM_GENERAL_HSV_CONTRAST = 16,
    RPM_SKIP = 0,
    RPM_REV = 2147483648
}

declare enum EnumResultType {
    RT_STANDARD_TEXT = 0,
    RT_RAW_TEXT = 1,
    RT_CANDIDATE_TEXT = 2,
    RT_PARTIAL_TEXT = 3
}

declare enum EnumTextFilterMode {
    TFM_AUTO = 1,
    TFM_GENERAL_CONTOUR = 2,
    TFM_SKIP = 0,
    TFM_REV = 2147483648
}

declare enum EnumTextureDetectionMode {
    TDM_AUTO = 1,
    TDM_GENERAL_WIDTH_CONCENTRATION = 2,
    TDM_SKIP = 0,
    TDM_REV = 2147483648
}

export { BarcodeReader, BarcodeScanner, DSImage, EnumBarcodeColourMode, EnumBarcodeComplementMode, EnumBarcodeFormat, EnumBarcodeFormat_2, EnumBinarizationMode, EnumClarityCalculationMethod, EnumClarityFilterMode, EnumColourClusteringMode, EnumColourConversionMode, EnumConflictMode, EnumDPMCodeReadingMode, EnumDeblurMode, EnumDeformationResistingMode, EnumErrorCode, EnumGrayscaleTransformationMode, EnumIMResultDataType, EnumImagePixelFormat, EnumImagePreprocessingMode, EnumIntermediateResultSavingMode, EnumIntermediateResultType, EnumLocalizationMode, EnumQRCodeErrorCorrectionLevel, EnumRegionPredetectionMode, EnumResultCoordinateType, EnumResultType, EnumScaleUpMode, EnumTerminatePhase, EnumTextFilterMode, EnumTextResultOrderMode, EnumTextureDetectionMode, ImageSource, Region, RuntimeSettings, ScanSettings, TextResult };
