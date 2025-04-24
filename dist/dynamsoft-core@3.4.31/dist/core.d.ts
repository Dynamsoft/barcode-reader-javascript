interface WorkerAutoResources {
    [key: string]: {
        js?: string[] | boolean;
        wasm?: string[] | boolean;
        deps?: string[];
    };
}
interface PostMessageBody {
    needLoadCore?: boolean;
    bLog?: boolean;
    bd?: boolean;
    dm?: string;
    value?: boolean;
    count?: number;
    engineResourcePaths?: EngineResourcePaths;
    autoResources?: WorkerAutoResources;
    names?: string[];
}
type PathInfo = {
    version: string;
    path: string;
    isInternal?: boolean;
};
type DwtInfo = {
    resourcesPath?: string;
    serviceInstallerLocation?: string;
};
interface EngineResourcePaths {
    "rootDirectory"?: string;
    "std"?: string | PathInfo;
    "dip"?: string | PathInfo;
    "dnn"?: string | PathInfo;
    "core"?: string | PathInfo;
    "license"?: string | PathInfo;
    "cvr"?: string | PathInfo;
    "utility"?: string | PathInfo;
    "dbr"?: string | PathInfo;
    "dlr"?: string | PathInfo;
    "ddn"?: string | PathInfo;
    "dcp"?: string | PathInfo;
    "dce"?: string | PathInfo;
    "dlrData"?: string | PathInfo;
    "ddv"?: string | PathInfo;
    "dwt"?: string | DwtInfo;
}
interface InnerVersions {
    [key: string]: {
        worker?: string;
        wasm?: string;
    };
}
interface WasmVersions {
    "DIP"?: string;
    "DNN"?: string;
    "CORE"?: string;
    "LICENSE"?: string;
    "CVR"?: string;
    "UTILITY"?: string;
    "DBR"?: string;
    "DLR"?: string;
    "DDN"?: string;
    "DCP"?: string;
}
interface MapController {
    [key: string]: ((body: any, taskID: number, instanceID?: number) => void);
}
type MimeType = "image/png" | "image/jpeg";

declare const mapAsyncDependency: {
    [key: string]: any;
};
declare const waitAsyncDependency: (depName: string | string[]) => Promise<void>;
declare const doOrWaitAsyncDependency: (depName: string | string[], asyncFunc: () => Promise<void>) => Promise<void>;
declare let worker: Worker;
declare const getNextTaskID: () => number;
declare const mapTaskCallBack: {
    [key: string]: Function;
};
declare let onLog: (message: string) => void | undefined;
declare const setOnLog: (value: typeof onLog) => void;
declare let bDebug: boolean;
declare const setBDebug: (value: boolean) => void;
declare const innerVersions: InnerVersions;
declare const mapPackageRegister: {
    [key: string]: any;
};
declare const workerAutoResources: WorkerAutoResources;
declare const loadWasm: (names?: string[] | string) => Promise<void>;
declare class CoreModule {
    static get engineResourcePaths(): EngineResourcePaths;
    static set engineResourcePaths(value: EngineResourcePaths);
    private static _bSupportDce4Module;
    static get bSupportDce4Module(): number;
    private static _bSupportIRTModule;
    static get bSupportIRTModule(): number;
    private static _versions;
    static get versions(): any;
    static get _onLog(): (message: string) => void;
    static set _onLog(value: (message: string) => void);
    static get _bDebug(): boolean;
    static set _bDebug(value: boolean);
    static _workerName: string;
    /**
     * Determine if the decoding module has been loaded successfully.
     * @category Initialize and Destroy
     */
    static isModuleLoaded(name?: string): boolean;
    static loadWasm(names?: string[] | string): Promise<void>;
    /**
     * Detect environment and get a report.
     */
    static detectEnvironment(): Promise<any>;
    /**
     * modify from https://gist.github.com/2107/5529665
     * @ignore
     */
    static browserInfo: any;
    static getModuleVersion(): Promise<WasmVersions>;
    static getVersion(): string;
    static enableLogging(): void;
    static disableLogging(): void;
    static cfd(count: number): Promise<void>;
}

declare enum EnumImageTagType {
    ITT_FILE_IMAGE = 0,
    ITT_VIDEO_FRAME = 1
}

interface ImageTag {
    imageId: number;
    type: EnumImageTagType;
}

declare enum EnumImagePixelFormat {
    IPF_BINARY = 0,
    IPF_BINARYINVERTED = 1,
    IPF_GRAYSCALED = 2,
    IPF_NV21 = 3,
    IPF_RGB_565 = 4,
    IPF_RGB_555 = 5,
    IPF_RGB_888 = 6,
    IPF_ARGB_8888 = 7,
    IPF_RGB_161616 = 8,
    IPF_ARGB_16161616 = 9,
    IPF_ABGR_8888 = 10,
    IPF_ABGR_16161616 = 11,
    IPF_BGR_888 = 12,
    IPF_BINARY_8 = 13,
    IPF_NV12 = 14,
    IPF_BINARY_8_INVERTED = 15
}

interface DSImageData {
    bytes: Uint8Array;
    width: number;
    height: number;
    stride: number;
    format: EnumImagePixelFormat;
    tag?: ImageTag;
}

declare enum EnumBufferOverflowProtectionMode {
    /** New images are blocked when the buffer is full.*/
    BOPM_BLOCK = 0,
    /** New images are appended at the end, and oldest images are pushed out from the beginning if the buffer is full.*/
    BOPM_UPDATE = 1
}

declare enum EnumColourChannelUsageType {
    CCUT_AUTO = 0,
    CCUT_FULL_CHANNEL = 1,
    CCUT_Y_CHANNEL_ONLY = 2,
    CCUT_RGB_R_CHANNEL_ONLY = 3,
    CCUT_RGB_G_CHANNEL_ONLY = 4,
    CCUT_RGB_B_CHANNEL_ONLY = 5
}

declare enum EnumCapturedResultItemType {
    CRIT_ORIGINAL_IMAGE = 1,
    CRIT_BARCODE = 2,
    CRIT_TEXT_LINE = 4,
    CRIT_DETECTED_QUAD = 8,
    CRIT_NORMALIZED_IMAGE = 16,
    CRIT_PARSED_RESULT = 32
}

interface CapturedResultItem {
    readonly type: EnumCapturedResultItemType;
    readonly referenceItem: CapturedResultItem | null;
    readonly targetROIDefName: string;
    readonly taskName: string;
}

interface OriginalImageResultItem extends CapturedResultItem {
    readonly imageData: DSImageData;
}

interface Point {
    x: number;
    y: number;
}

interface Contour {
    points: Array<Point>;
}

declare enum EnumCornerType {
    CT_NORMAL_INTERSECTED = 0,
    CT_T_INTERSECTED = 1,
    CT_CROSS_INTERSECTED = 2,
    CT_NOT_INTERSECTED = 3
}

/**
 * `ErrorCode` enumerates the specific error codes that the SDK may return, providing a systematic way to identify and handle errors encountered during its operation.
 */
declare enum EnumErrorCode {
    /** Operation completed successfully. */
    EC_OK = 0,
    /** An unspecified error occurred. */
    EC_UNKNOWN = -10000,
    /** The system does not have enough memory to perform the requested operation. */
    EC_NO_MEMORY = -10001,
    /** A null pointer was encountered where a valid pointer was required. */
    EC_NULL_POINTER = -10002,
    /** The provided license is not valid. */
    EC_LICENSE_INVALID = -10003,
    /** The provided license has expired. */
    EC_LICENSE_EXPIRED = -10004,
    /** The specified file could not be found. */
    EC_FILE_NOT_FOUND = -10005,
    /** The file type is not supported for processing. */
    EC_FILE_TYPE_NOT_SUPPORTED = -10006,
    /** The image's bits per pixel (BPP) is not supported. */
    EC_BPP_NOT_SUPPORTED = -10007,
    /** The specified index is out of the valid range. */
    EC_INDEX_INVALID = -10008,
    /** The specified custom region value is invalid or out of range. */
    EC_CUSTOM_REGION_INVALID = -10010,
    /** Failed to read the image due to an error in accessing or interpreting the image data. */
    EC_IMAGE_READ_FAILED = -10012,
    /** Failed to read a TIFF image, possibly due to corruption or unsupported format. */
    EC_TIFF_READ_FAILED = -10013,
    /** The provided DIB (Device-Independent Bitmaps) buffer is invalid or corrupted. */
    EC_DIB_BUFFER_INVALID = -10018,
    /** Failed to read a PDF image, possibly due to corruption or unsupported format. */
    EC_PDF_READ_FAILED = -10021,
    /** Required PDF processing DLL is missing. */
    EC_PDF_DLL_MISSING = -10022,
    /** The specified page number is invalid or out of bounds for the document. */
    EC_PAGE_NUMBER_INVALID = -10023,
    /** The specified custom size is invalid or not supported. */
    EC_CUSTOM_SIZE_INVALID = -10024,
    /** The operation timed out. */
    EC_TIMEOUT = -10026,
    /** Failed to parse JSON input. */
    EC_JSON_PARSE_FAILED = -10030,
    /** The JSON type is invalid for the expected context. */
    EC_JSON_TYPE_INVALID = -10031,
    /** The JSON key is invalid or unrecognized in the current context. */
    EC_JSON_KEY_INVALID = -10032,
    /** The JSON value is invalid for the specified key. */
    EC_JSON_VALUE_INVALID = -10033,
    /** The required "Name" key is missing in the JSON data. */
    EC_JSON_NAME_KEY_MISSING = -10034,
    /** The value of the "Name" key is duplicated and conflicts with existing data. */
    EC_JSON_NAME_VALUE_DUPLICATED = -10035,
    /** The template name is invalid or does not match any known template. */
    EC_TEMPLATE_NAME_INVALID = -10036,
    /** The reference made by the "Name" key is invalid or points to nonexistent data. */
    EC_JSON_NAME_REFERENCE_INVALID = -10037,
    /** The parameter value provided is invalid or out of the expected range. */
    EC_PARAMETER_VALUE_INVALID = -10038,
    /** The domain of the current site does not match the domain bound to the current product key. */
    EC_DOMAIN_NOT_MATCH = -10039,
    /** The reserved information does not match the reserved info bound to the current product key. */
    EC_RESERVED_INFO_NOT_MATCH = -10040,
    /** The license key does not match the license content. */
    EC_LICENSE_KEY_NOT_MATCH = -10043,
    /** Failed to request the license content from the server. */
    EC_REQUEST_FAILED = -10044,
    /** Failed to initialize the license. */
    EC_LICENSE_INIT_FAILED = -10045,
    /** Error setting the mode's argument, indicating invalid or incompatible arguments. */
    EC_SET_MODE_ARGUMENT_ERROR = -10051,
    /** The license content is invalid or corrupted. */
    EC_LICENSE_CONTENT_INVALID = -10052,
    /** The license key is invalid or does not match any known valid keys. */
    EC_LICENSE_KEY_INVALID = -10053,
    /** The license key has reached its maximum allowed usage and has no remaining quota. */
    EC_LICENSE_DEVICE_RUNS_OUT = -10054,
    /** Failed to retrieve the mode's argument, possibly due to invalid state or configuration. */
    EC_GET_MODE_ARGUMENT_ERROR = -10055,
    /** The Intermediate Result Types (IRT) license is invalid or not present. */
    EC_IRT_LICENSE_INVALID = -10056,
    /** Failed to save the file, possibly due to permissions, space, or an invalid path. */
    EC_FILE_SAVE_FAILED = -10058,
    /** The specified stage type is invalid or not supported in the current context. */
    EC_STAGE_TYPE_INVALID = -10059,
    /** The specified image orientation is invalid or not supported. */
    EC_IMAGE_ORIENTATION_INVALID = -10060,
    /** Failed to convert complex template to simplified settings, indicating a configuration or compatibility issue. */
    EC_CONVERT_COMPLEX_TEMPLATE_ERROR = -10061,
    /** Rejecting function call while capturing is in progress, to prevent conflicts or data corruption. */
    EC_CALL_REJECTED_WHEN_CAPTURING = -10062,
    /** The specified image source was not found, indicating a missing or inaccessible input source. */
    EC_NO_IMAGE_SOURCE = -10063,
    /** Failed to read the directory, possibly due to permissions, non-existence, or other access issues. */
    EC_READ_DIRECTORY_FAILED = -10064,
    /** A required module (e.g., DynamsoftBarcodeReader, DynamsoftLabelRecognizer) was not found. */
    EC_MODULE_NOT_FOUND = -10065,
    /** The operation does not support multi-page files; use FileFetcher for processing such files. */
    EC_MULTI_PAGES_NOT_SUPPORTED = -10066,
    /** Indicates an attempt to write to a file that already exists, with overwriting explicitly disabled. This error suggests the need for either enabling overwriting or ensuring unique file names to avoid conflicts. */
    EC_FILE_ALREADY_EXISTS = -10067,
    /** The specified file path does not exist and could not be created. This error could be due to insufficient permissions, a read-only filesystem, or other environmental constraints preventing file creation. */
    EC_CREATE_FILE_FAILED = -10068,
    /** The input ImageData object contains invalid parameters. This could be due to incorrect data types, out-of-range values, or improperly formatted data being passed to a function expecting ImageData. */
    EC_IMGAE_DATA_INVALID = -10069,
    /** The size of the input image does not meet the requirements. */
    EC_IMAGE_SIZE_NOT_MATCH = -10070,
    /** The pixel format of the input image does not meet the requirements. */
    EC_IMAGE_PIXEL_FORMAT_NOT_MATCH = -10071,
    /** The section level result is irreplaceable. */
    EC_SECTION_LEVEL_RESULT_IRREPLACEABLE = -10072,
    /** Incorrect axis definition. */
    EC_AXIS_DEFINITION_INCORRECT = -10073,
    /**The result is not replaceable due to type mismatch*/
    EC_RESULT_TYPE_MISMATCH_IRREPLACEABLE = -10074,
    /**Failed to load the PDF library.*/
    EC_PDF_LIBRARY_LOAD_FAILED = -10075,
    /** Indicates no license is available or the license is not set. */
    EC_NO_LICENSE = -20000,
    /** The provided Handshake Code is invalid or does not match expected format. */
    EC_HANDSHAKE_CODE_INVALID = -20001,
    /** Encountered failures while attempting to read or write to the license buffer. */
    EC_LICENSE_BUFFER_FAILED = -20002,
    /** Synchronization with the license server failed, possibly due to network issues or server unavailability. */
    EC_LICENSE_SYNC_FAILED = -20003,
    /** The device attempting to use the license does not match the device specified in the license buffer. */
    EC_DEVICE_NOT_MATCH = -20004,
    /** Binding the device to the license failed, indicating possible issues with the license or device identifier. */
    EC_BIND_DEVICE_FAILED = -20005,
    /** The number of instances using the license exceeds the limit allowed by the license terms. */
    EC_INSTANCE_COUNT_OVER_LIMIT = -20008,
    /** InitLicenseFromDLS must be called before any SDK objects are created to ensure proper license initialization. */
    EC_LICENSE_INIT_SEQUENCE_FAILED = -20009,
    /** Indicates the license in use is a trial version with limited functionality or usage time. */
    EC_TRIAL_LICENSE = -20010,
    /** The system failed to reach the License Server, likely due to network connectivity issues. */
    EC_FAILED_TO_REACH_DLS = -20200,
    /** Online license validation failed due to network issues. Using cached license information for validation.*/
    EC_LICENSE_CACHE_USED = -20012,
    /** The specified barcode format is invalid or unsupported. */
    EC_BARCODE_FORMAT_INVALID = -30009,
    /** The license for decoding QR Codes is invalid or not present. */
    EC_QR_LICENSE_INVALID = -30016,
    /** The license for decoding 1D barcodes is invalid or not present. */
    EC_1D_LICENSE_INVALID = -30017,
    /** The license for decoding PDF417 barcodes is invalid or not present. */
    EC_PDF417_LICENSE_INVALID = -30019,
    /** The license for decoding DataMatrix barcodes is invalid or not present. */
    EC_DATAMATRIX_LICENSE_INVALID = -30020,
    /** The specified custom module size for barcode generation is invalid or outside acceptable limits. */
    EC_CUSTOM_MODULESIZE_INVALID = -30025,
    /** The license for decoding Aztec barcodes is invalid or not present. */
    EC_AZTEC_LICENSE_INVALID = -30041,
    /** The license for decoding Patchcode barcodes is invalid or not present. */
    EC_PATCHCODE_LICENSE_INVALID = -30046,
    /** The license for decoding postal code formats is invalid or not present. */
    EC_POSTALCODE_LICENSE_INVALID = -30047,
    /** The license for Direct Part Marking (DPM) decoding is invalid or not present. */
    EC_DPM_LICENSE_INVALID = -30048,
    /** A frame decoding thread is already running, indicating a concurrent operation conflict. */
    EC_FRAME_DECODING_THREAD_EXISTS = -30049,
    /** Stopping the frame decoding thread failed, indicating potential issues with thread management. */
    EC_STOP_DECODING_THREAD_FAILED = -30050,
    /** The license for decoding MaxiCode barcodes is invalid or not present. */
    EC_MAXICODE_LICENSE_INVALID = -30057,
    /** The license for decoding GS1 DataBar barcodes is invalid or not present. */
    EC_GS1_DATABAR_LICENSE_INVALID = -30058,
    /** The license for decoding GS1 Composite codes is invalid or not present. */
    EC_GS1_COMPOSITE_LICENSE_INVALID = -30059,
    /** The license for decoding DotCode barcodes is invalid or not present. */
    EC_DOTCODE_LICENSE_INVALID = -30061,
    /** The license for decoding Pharmacode barcodes is invalid or not present. */
    EC_PHARMACODE_LICENSE_INVALID = -30062,
    /** Indicates that the required character model file was not found, possibly due to incorrect paths or missing files. */
    EC_CHARACTER_MODEL_FILE_NOT_FOUND = -40100,
    /**There is a conflict in the layout of TextLineGroup. */
    EC_TEXT_LINE_GROUP_LAYOUT_CONFLICT = -40101,
    /**There is a conflict in the regex of TextLineGroup. */
    EC_TEXT_LINE_GROUP_REGEX_CONFLICT = -40102,
    /** The specified quadrilateral is invalid, potentially due to incorrect points or an unprocessable shape. */
    EC_QUADRILATERAL_INVALID = -50057,
    /** The license for generating or processing panoramas is invalid or missing. */
    EC_PANORAMA_LICENSE_INVALID = -70060,
    /** The specified resource path does not exist, indicating a missing directory or incorrect path specification. */
    EC_RESOURCE_PATH_NOT_EXIST = -90001,
    /** Failed to load the specified resource, which might be due to missing files, access rights, or other issues preventing loading. */
    EC_RESOURCE_LOAD_FAILED = -90002,
    /** The code specification required for processing was not found, indicating a missing or incorrect specification. */
    EC_CODE_SPECIFICATION_NOT_FOUND = -90003,
    /** The full code string provided is empty, indicating no data was provided for processing. */
    EC_FULL_CODE_EMPTY = -90004,
    /** Preprocessing the full code string failed, possibly due to invalid format, corruption, or unsupported features. */
    EC_FULL_CODE_PREPROCESS_FAILED = -90005,
    /** The license required for parsing South Africa Driver License data is invalid or not present. */
    EC_ZA_DL_LICENSE_INVALID = -90006,
    /** The license required for parsing North America DL/ID (AAMVA) data is invalid or not present. */
    EC_AAMVA_DL_ID_LICENSE_INVALID = -90007,
    /** The license required for parsing Aadhaar data is invalid or not present. */
    EC_AADHAAR_LICENSE_INVALID = -90008,
    /** The license required for parsing Machine Readable Travel Documents (MRTD) is invalid or not present. */
    EC_MRTD_LICENSE_INVALID = -90009,
    /** The license required for parsing Vehicle Identification Number (VIN) data is invalid or not present. */
    EC_VIN_LICENSE_INVALID = -90010,
    /** The license required for parsing customized code types is invalid or not present. */
    EC_CUSTOMIZED_CODE_TYPE_LICENSE_INVALID = -90011,
    /**The license is initialized successfully but detected invalid content in your key.*/
    EC_LICENSE_WARNING = -10076,
    /** [Barcode Reader] No license found.*/
    EC_BARCODE_READER_LICENSE_NOT_FOUND = -30063,
    /**[Label Recognizer] No license found.*/
    EC_LABEL_RECOGNIZER_LICENSE_NOT_FOUND = -40103,
    /**[Document Normalizer] No license found.*/
    EC_DOCUMENT_NORMALIZER_LICENSE_NOT_FOUND = -50058,
    /**[Code Parser] No license found.*/
    EC_CODE_PARSER_LICENSE_NOT_FOUND = -90012
}

declare enum EnumGrayscaleEnhancementMode {
    /**Skips grayscale transformation. */
    GEM_SKIP = 0,
    /**Not supported yet. */
    GEM_AUTO = 1,
    /**Takes the unpreprocessed image for following operations. */
    GEM_GENERAL = 2,
    /**Preprocesses the image using the gray equalization algorithm. Check @ref IPM for available argument settings.*/
    GEM_GRAY_EQUALIZE = 4,
    /**Preprocesses the image using the gray smoothing algorithm. Check @ref IPM for available argument settings.*/
    GEM_GRAY_SMOOTH = 8,
    /**Preprocesses the image using the sharpening and smoothing algorithm. Check @ref IPM for available argument settings.*/
    GEM_SHARPEN_SMOOTH = 16,
    /**Skips image preprocessing. */
    GEM_REV = -2147483648
}

declare enum EnumGrayscaleTransformationMode {
    /**Skips grayscale transformation. */
    GTM_SKIP = 0,
    /**Transforms to inverted grayscale. Recommended for light on dark images. */
    GTM_INVERTED = 1,
    /**Keeps the original grayscale. Recommended for dark on light images. */
    GTM_ORIGINAL = 2,
    /**Lets the library choose an algorithm automatically for grayscale transformation.*/
    GTM_AUTO = 4,
    /**Reserved setting for grayscale transformation mode.*/
    GTM_REV = -2147483648
}

declare enum EnumPDFReadingMode {
    /** Outputs vector data found in the PDFs.*/
    PDFRM_VECTOR = 1,
    /** The default value.
     * Outputs raster data found in the PDFs.
     * Depending on the argument Resolution,
     * the SDK may rasterize the PDF pages.
     * Check the template for available argument settings.*/
    PDFRM_RASTER = 2,
    PDFRM_REV = -2147483648
}

declare enum EnumRasterDataSource {
    /** Specifies the target type for reading a PDF. */
    RDS_RASTERIZED_PAGES = 0,
    RDS_EXTRACTED_IMAGES = 1
}

declare enum EnumCrossVerificationStatus {
    /** The cross verification has not been performed yet. */
    CVS_NOT_VERIFIED = 0,
    /** The cross verification has been passed successfully. */
    CVS_PASSED = 1,
    /** The cross verification has failed. */
    CVS_FAILED = 2
}

declare const EnumIntermediateResultUnitType: {
    /** No intermediate result. */
    IRUT_NULL: bigint;
    /** A full-color image. */
    IRUT_COLOUR_IMAGE: bigint;
    /** A color image that has been scaled down for efficiency. */
    IRUT_SCALED_DOWN_COLOUR_IMAGE: bigint;
    /** A grayscale image derived from the original input. */
    IRUT_GRAYSCALE_IMAGE: bigint;
    /** A grayscale image that has undergone transformation. */
    IRUT_TRANSOFORMED_GRAYSCALE_IMAGE: bigint;
    /** A grayscale image enhanced for further processing. */
    IRUT_ENHANCED_GRAYSCALE_IMAGE: bigint;
    /** Regions pre-detected as potentially relevant for further analysis. */
    IRUT_PREDETECTED_REGIONS: bigint;
    /** A binary (black and white) image. */
    IRUT_BINARY_IMAGE: bigint;
    /** Results from detecting textures within the image. */
    IRUT_TEXTURE_DETECTION_RESULT: bigint;
    /** A grayscale image with textures removed to enhance subject details like text or barcodes. */
    IRUT_TEXTURE_REMOVED_GRAYSCALE_IMAGE: bigint;
    /** A binary image with textures removed), useful for clear detection of subjects without background noise. */
    IRUT_TEXTURE_REMOVED_BINARY_IMAGE: bigint;
    /** Detected contours within the image), which can help in identifying shapes and objects. */
    IRUT_CONTOURS: bigint;
    /** Detected line segments), useful in structural analysis of the image content. */
    IRUT_LINE_SEGMENTS: bigint;
    /** Identified text zones), indicating areas with potential textual content. */
    IRUT_TEXT_ZONES: bigint;
    /** A binary image with text regions removed. */
    IRUT_TEXT_REMOVED_BINARY_IMAGE: bigint;
    /** Zones identified as potential barcode areas), aiding in focused barcode detection. */
    IRUT_CANDIDATE_BARCODE_ZONES: bigint;
    /** Barcodes that have been localized but not yet decoded. */
    IRUT_LOCALIZED_BARCODES: bigint;
    /** Barcode images scaled up for improved readability or decoding accuracy. */
    IRUT_SCALED_UP_BARCODE_IMAGE: bigint;
    /** Images of barcodes processed to resist deformation and improve decoding success. */
    IRUT_DEFORMATION_RESISTED_BARCODE_IMAGE: bigint;
    /** Barcode images that have been complemented. */
    IRUT_COMPLEMENTED_BARCODE_IMAGE: bigint;
    /** Successfully decoded barcodes. */
    IRUT_DECODED_BARCODES: bigint;
    /** Detected long lines. */
    IRUT_LONG_LINES: bigint;
    /** Detected corners within the image. */
    IRUT_CORNERS: bigint;
    /** Candidate edges identified as potential components of quadrilaterals. */
    IRUT_CANDIDATE_QUAD_EDGES: bigint;
    /** Successfully detected quadrilaterals. */
    IRUT_DETECTED_QUADS: bigint;
    /** Text lines that have been localized in preparation for recognition. */
    IRUT_LOCALIZED_TEXT_LINES: bigint;
    /** Successfully recognized text lines. */
    IRUT_RECOGNIZED_TEXT_LINES: bigint;
    /** Successfully normalized images. */
    IRUT_NORMALIZED_IMAGES: bigint;
    /** Successfully detected short lines. */
    IRUT_SHORT_LINES: bigint;
    IRUT_RAW_TEXT_LINES: bigint;
    /** Detected logic lines. */
    IRUT_LOGIC_LINES: bigint;
    /** A mask to select all types of intermediate results. */
    IRUT_ALL: bigint;
};
type EnumIntermediateResultUnitType = bigint;

declare enum EnumRegionObjectElementType {
    ROET_PREDETECTED_REGION = 0,
    ROET_LOCALIZED_BARCODE = 1,
    ROET_DECODED_BARCODE = 2,
    ROET_LOCALIZED_TEXT_LINE = 3,
    ROET_RECOGNIZED_TEXT_LINE = 4,
    ROET_DETECTED_QUAD = 5,
    ROET_NORMALIZED_IMAGE = 6,
    ROET_SOURCE_IMAGE = 7,
    ROET_TARGET_ROI = 8
}

declare enum EnumSectionType {
    ST_NULL = 0,
    ST_REGION_PREDETECTION = 1,
    ST_BARCODE_LOCALIZATION = 2,
    ST_BARCODE_DECODING = 3,
    ST_TEXT_LINE_LOCALIZATION = 4,
    ST_TEXT_LINE_RECOGNITION = 5,
    ST_DOCUMENT_DETECTION = 6,
    ST_DOCUMENT_NORMALIZATION = 7
}

interface LineSegment {
    startPoint: Point;
    endPoint: Point;
}

interface Corner {
    type: EnumCornerType;
    intersection: Point;
    line1: LineSegment;
    line2: LineSegment;
}

interface Rect {
    x: number;
    y: number;
    width: number;
    height: number;
    isMeasuredInPercentage?: boolean;
}

interface Arc {
    x: number;
    y: number;
    radius: number;
    startAngle: number;
    endAngle: number;
}

interface Polygon {
    points: Array<Point>;
}

interface DSRect {
    left: number;
    right: number;
    top: number;
    bottom: number;
    isMeasuredInPercentage: boolean;
}

interface Edge {
    startCorner: Corner;
    endCorner: Corner;
}

interface FileImageTag extends ImageTag {
    filePath: string;
    pageNumber: number;
    totalPages: number;
}

interface ImageSourceErrorListener {
    /**
     * Called when an error is received from the image source.
     *
     * @param errorCode An enumeration value of type "EnumErrorCode" indicating the type of error.
     * @param errorMessage A C-style string containing the error message providing
     *                     additional information about the error.
     */
    onErrorReceived: (errorCode: EnumErrorCode, errorMessage: string) => void;
}

interface PDFReadingParameter {
    mode: EnumPDFReadingMode;
    dpi: number;
    rasterDataSource: EnumRasterDataSource;
}

interface Quadrilateral {
    points: [Point, Point, Point, Point];
    area?: number;
}

interface DSFile extends File {
    download: () => void;
}

interface Warning {
    id: number;
    message: string;
}

declare enum EnumTransformMatrixType {
    TMT_LOCAL_TO_ORIGINAL_IMAGE = 0,
    TMT_ORIGINAL_TO_LOCAL_IMAGE = 1
}

interface IntermediateResultUnit {
    hashId: string;
    originalImageHashId: string;
    originalImageTag: ImageTag;
    unitType: EnumIntermediateResultUnitType;
    /**
     * For the two types TMT_LOCAL_TO_ORIGINAL_IMAGE & TMT_ORIGINAL_TO_LOCAL_IMAGE, we can get both from C++ and then keep the
     * information in JS. Only return the information when customer calls getTransformMatrix with a specified type.
     */
    getTransformMatrix: (matrixType: EnumTransformMatrixType) => Array<number>;
}

interface BinaryImageUnit extends IntermediateResultUnit {
    imageData: DSImageData;
}

interface ColourImageUnit extends IntermediateResultUnit {
    imageData: DSImageData;
}

interface ContoursUnit extends IntermediateResultUnit {
    contours: Array<Contour>;
}

interface EnhancedGrayscaleImageUnit extends IntermediateResultUnit {
    imageData: DSImageData;
}

interface GrayscaleImageUnit extends IntermediateResultUnit {
    imageData: DSImageData;
}

interface IntermediateResult {
    intermediateResultUnits: Array<IntermediateResultUnit>;
}

interface IntermediateResultExtraInfo {
    targetROIDefName: string;
    taskName: string;
    isSectionLevelResult: boolean;
    sectionType: EnumSectionType;
}

interface LineSegmentsUnit extends IntermediateResultUnit {
    lineSegments: Array<LineSegment>;
}

interface RegionObjectElement {
    /**
     * location was readonly before v3.2.0
     * In 3.2.0 onwards, it can be set as well
     * When setting, specify the location as well as
     * the matrixToOriginalImage
     */
    location: Quadrilateral;
    referencedElement: RegionObjectElement;
    elementType: EnumRegionObjectElementType;
}

interface PredetectedRegionElement extends RegionObjectElement {
    modeName: string;
}

interface PredetectedRegionsUnit extends IntermediateResultUnit {
    predetectedRegions: Array<PredetectedRegionElement>;
}

interface ScaledDownColourImageUnit extends IntermediateResultUnit {
    imageData: DSImageData;
}

interface ShortLinesUnit extends IntermediateResultUnit {
    shortLines: Array<LineSegment>;
}

interface TextRemovedBinaryImageUnit extends IntermediateResultUnit {
    imageData: DSImageData;
}

interface TextureDetectionResultUnit extends IntermediateResultUnit {
    xSpacing: number;
    ySpacing: number;
}

interface TextureRemovedBinaryImageUnit extends IntermediateResultUnit {
    imageData: DSImageData;
}

interface TextureRemovedGrayscaleImageUnit extends IntermediateResultUnit {
    imageData: DSImageData;
}

interface TextZone {
    location: Quadrilateral;
    charContoursIndices: Array<number>;
}

interface TextZonesUnit extends IntermediateResultUnit {
    textZones: Array<TextZone>;
}

interface TransformedGrayscaleImageUnit extends IntermediateResultUnit {
    imageData: DSImageData;
}

/**
 * The `ObservationParameters` interface represents an object used to configure intermediate result observation.
 */
interface ObservationParameters {
    /**
     * Sets the types of intermediate result units that are observed.
     * @param types The types of intermediate result units to observe.
     * @returns A promise that resolves when the types have been successfully set. It does not provide any value upon resolution.
     */
    setObservedResultUnitTypes: (types: bigint) => void;
    /**
     * Retrieves the types of intermediate result units that are observed.
     * @returns A promise that resolves with a number that represents the types that are observed.
     */
    getObservedResultUnitTypes: () => bigint;
    /**
     * Determines whether the specified result unit type is observed.
     * @param type The result unit type to check.
     * @returns Boolean indicating whether the result unit type is observed.
     */
    isResultUnitTypeObserved: (type: EnumIntermediateResultUnitType) => boolean;
    /**
     * Adds an observed task by its name.
     * @param taskName The name of the task.
     */
    addObservedTask: (taskName: string) => void;
    /**
     * Removes an observed task by its name.
     * @param taskName The name of the task.
     */
    removeObservedTask: (taskName: string) => void;
    /**
     * Determines whether the specified task is observed.
     * @param taskName The name of the task.
     * @returns Boolean indicating whether the task is observed.
     */
    isTaskObserved: (taskName: string) => boolean;
}

declare abstract class ImageSourceAdapter {
    #private;
    /**
     * @ignore
     */
    static _onLog: (message: any) => void;
    /**
     * @ignore
     */
    get _isFetchingStarted(): boolean;
    constructor();
    abstract hasNextImageToFetch(): boolean;
    /**
     * @brief Sets the error listener for the image source.
     *
     * This function allows you to set an error listener object that will receive
     * notifications when errors occur during image source operations.
     * If an error occurs, the error information will be passed to the listener's
     * OnErrorReceived method.
     *
     * @param listener An instance of ImageSourceErrorListener or its
     *                 derived class, which will handle error notifications.
     */
    setErrorListener(listener: ImageSourceErrorListener): void;
    /**
     * Adds an image to the internal buffer.
     *
     * @param image An instance of `DSImageData` containing the image to buffer.
     */
    addImageToBuffer(image: DSImageData): void;
    /**
     * Retrieves a buffered image, of type `DSImageData`.
     *
     * This function retrieves the latest image added to the buffer, and removes it from the buffer in the process.
     *
     * @returns A `DSImageData` object retrieved from the buffer which contains the image data of the frame and related information.
     */
    getImage(): DSImageData;
    /**
     * Sets the processing priority of a specific image. This can affect the order in which images are returned by getImage.
     *
     * @param imageId The ID of the image to prioritize.
     * @param keepInBuffer [Optional] Boolean indicating whether to keep the image in the buffer after it has been returned.
     */
    setNextImageToReturn(imageId: number, keepInBuffer?: boolean): void;
    /**
     * @ignore
     */
    _resetNextReturnedImage(): void;
    /**
     * Checks if an image with the specified ID is present in the buffer.
     *
     * @param imageId The ID of the image to check.
     *
     * @returns Boolean indicating whether the image is present in the buffer.
     */
    hasImage(imageId: number): boolean;
    /**
     * Starts the process of fetching images.
     */
    startFetching(): void;
    /**
     * Stops the process of fetching images.
     * to false, indicating that image fetching has been halted.
     */
    stopFetching(): void;
    /**
     * Sets the maximum number of images that can be buffered at any time. Implementing classes should attempt to keep the buffer within this limit.
     *
     * @param count The maximum number of images the buffer can hold.
     */
    setMaxImageCount(count: number): void;
    /**
     * Retrieves the maximum number of images that can be buffered.
     *
     * @returns The maximum image count for the buffer.
     */
    getMaxImageCount(): number;
    /**
     * Retrieves the current number of images in the buffer.
     *
     * @returns The current image count in the buffer.
     */
    getImageCount(): number;
    /**
     * Clears all images from the buffer, resetting the state for new image fetching.
     */
    clearBuffer(): void;
    /**
     * Determines whether the buffer is currently empty.
     *
     * @returns Boolean indicating whether the buffer is empty.
     */
    isBufferEmpty(): boolean;
    /**
     * Sets the behavior for handling new incoming images when the buffer is full. Implementations should adhere to the specified mode to manage buffer overflow.
     *
     * @param mode One of the modes defined in EnumBufferOverflowProtectionMode, specifying how to handle buffer overflow.
     */
    setBufferOverflowProtectionMode(mode: EnumBufferOverflowProtectionMode): void;
    /**
     * Retrieves the current mode for handling buffer overflow.
     *
     * @returns The current buffer overflow protection mode.
     */
    getBufferOverflowProtectionMode(): EnumBufferOverflowProtectionMode;
    /**
     * Sets the usage type for color channels in images.
     *
     * @param type One of the types defined in EnumColourChannelUsageType, specifying how color channels should be used.
     */
    setColourChannelUsageType(type: EnumColourChannelUsageType): void;
    /**
     * Retrieves the current mode for handling buffer overflow.
     *
     * @returns The current buffer overflow protection mode.
     */
    getColourChannelUsageType(): EnumColourChannelUsageType;
}

/**
 * Judge if the input is an object(exclude array and function). If `null` or `undefined`, return `false`.
 * @param value
 * @returns
 */
declare const isObject: (value: any) => value is Object;
/**
 * Judge is the input is a {@link Arc} object.
 * @param value
 * @returns
 * @ignore
 */
declare const isArc: (value: any) => value is Arc;
/**
 * Judge is the input is a {@link Contour} object.
 * @param value
 * @returns
 * @ignore
 */
declare const isContour: (value: any) => value is Contour;
declare const isOriginalDsImageData: (value: any) => boolean;
/**
 * Judge is the input is a {@link DSImageData} object.
 * @param value
 * @returns
 * @ignore
 */
declare const isDSImageData: (value: any) => value is DSImageData;
/**
 * Judge is the input is a {@link DSRect} object.
 * @param value
 * @returns
 * @ignore
 */
declare const isDSRect: (value: any) => value is DSRect;
/**
 * Judge is the input is a {@link ImageTag} object.
 * @param value
 * @returns
 * @ignore
 */
declare const isImageTag: (value: any) => value is ImageTag;
/**
 * Judge is the input is a {@link LineSegment} object.
 * @param value
 * @returns
 * @ignore
 */
declare const isLineSegment: (value: any) => value is LineSegment;
/**
 * Judge is the input is a {@link Point} object.
 * @param value
 * @returns
 * @ignore
 */
declare const isPoint: (value: any) => value is Point;
/**
 * Judge is the input is a {@link Polygon} object.
 * @param value
 * @returns
 * @ignore
 */
declare const isPolygon: (value: any) => value is Polygon;
/**
 * Judge is the input is a {@link Quadrilateral} object.
 * @param value
 * @returns
 * @ignore
 */
declare const isQuad: (value: any) => value is Quadrilateral;
/**
 * Judge is the input is a {@link Rect} object.
 * @param value
 * @returns
 * @ignore
 */
declare const isRect: (value: any) => value is Rect;

declare const requestResource: (url: string, type: "text" | "blob" | "arraybuffer") => Promise<any>;
declare const checkIsLink: (str: string) => boolean;
declare const compareVersion: (strV1: string, strV2: string) => number;
declare const handleEngineResourcePaths: (engineResourcePaths: EngineResourcePaths) => EngineResourcePaths;
declare const _saveToFile: (imageData: ImageData, name: string, download?: boolean) => Promise<File>;
declare const _toCanvas: (imageData: ImageData | DSImageData) => HTMLCanvasElement;
declare const _toImage: (MIMEType: MimeType, imageData: ImageData | DSImageData) => HTMLImageElement;
declare const _toBlob: (MIMEType: MimeType, imageData: ImageData | DSImageData) => Promise<Blob>;
declare const _getNorImageData: (dsImageData: DSImageData) => ImageData;

export { Arc, BinaryImageUnit, CapturedResultItem, ColourImageUnit, Contour, ContoursUnit, CoreModule, Corner, DSFile, DSImageData, DSRect, DwtInfo, Edge, EngineResourcePaths, EnhancedGrayscaleImageUnit, EnumBufferOverflowProtectionMode, EnumCapturedResultItemType, EnumColourChannelUsageType, EnumCornerType, EnumCrossVerificationStatus, EnumErrorCode, EnumGrayscaleEnhancementMode, EnumGrayscaleTransformationMode, EnumImagePixelFormat, EnumImageTagType, EnumIntermediateResultUnitType, EnumPDFReadingMode, EnumRasterDataSource, EnumRegionObjectElementType, EnumSectionType, FileImageTag, GrayscaleImageUnit, ImageSourceAdapter, ImageSourceErrorListener, ImageTag, InnerVersions, IntermediateResult, IntermediateResultExtraInfo, IntermediateResultUnit, LineSegment, LineSegmentsUnit, MapController, MimeType, ObservationParameters, OriginalImageResultItem, PDFReadingParameter, PathInfo, Point, Polygon, PostMessageBody, PredetectedRegionElement, PredetectedRegionsUnit, Quadrilateral, Rect, RegionObjectElement, ScaledDownColourImageUnit, ShortLinesUnit, TextRemovedBinaryImageUnit, TextZonesUnit, TextureDetectionResultUnit, TextureRemovedBinaryImageUnit, TextureRemovedGrayscaleImageUnit, TransformedGrayscaleImageUnit, Warning, WasmVersions, WorkerAutoResources, _getNorImageData, _saveToFile, _toBlob, _toCanvas, _toImage, bDebug, checkIsLink, compareVersion, doOrWaitAsyncDependency, getNextTaskID, handleEngineResourcePaths, innerVersions, isArc, isContour, isDSImageData, isDSRect, isImageTag, isLineSegment, isObject, isOriginalDsImageData, isPoint, isPolygon, isQuad, isRect, loadWasm, mapAsyncDependency, mapPackageRegister, mapTaskCallBack, onLog, requestResource, setBDebug, setOnLog, waitAsyncDependency, worker, workerAutoResources };
