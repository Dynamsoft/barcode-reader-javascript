declare enum EnumBufferOverflowProtectionMode {
    /** New images are blocked when the buffer is full.*/
    BOPM_BLOCK = 0,
    /** New images are appended at the end, and oldest images are pushed out from the beginning if the buffer is full.*/
    BOPM_UPDATE = 1
}

declare enum EnumCapturedResultItemType {
    CRIT_ORIGINAL_IMAGE = 1,
    CRIT_BARCODE = 2,
    CRIT_TEXT_LINE = 4,
    CRIT_DETECTED_QUAD = 8,
    CRIT_DESKEWED_IMAGE = 16,
    CRIT_PARSED_RESULT = 32,
    CRIT_ENHANCED_IMAGE = 64
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
    /** The license key does not match the license content. */
    EC_LICENSE_KEY_NOT_MATCH = -10043,
    /** Error setting the mode's argument, indicating invalid or incompatible arguments. */
    EC_SET_MODE_ARGUMENT_ERROR = -10051,
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
    EC_MULTI_PAGES_NOT_SUPPORTED = -10066,
    /** Indicates an attempt to write to a file that already exists, with overwriting explicitly disabled. This error suggests the need for either enabling overwriting or ensuring unique file names to avoid conflicts. */
    EC_FILE_ALREADY_EXISTS = -10067,
    /** The specified file path does not exist and could not be created. This error could be due to insufficient permissions, a read-only filesystem, or other environmental constraints preventing file creation. */
    EC_CREATE_FILE_FAILED = -10068,
    /** The input ImageData object contains invalid parameters. This could be due to incorrect data types, out-of-range values, or improperly formatted data being passed to a function expecting ImageData. */
    EC_IMAGE_DATA_INVALID = -10069,
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
    EC_UNSUPPORTED_JSON_KEY_WARNING = -10077,
    /**Model file is not found*/
    EC_MODEL_FILE_NOT_FOUND = -10078,
    /**[PDF] No license found.*/
    EC_PDF_LICENSE_NOT_FOUND = -10079,
    /**The rectangle is invalid.*/
    EC_RECT_INVALID = -10080,
    EC_TEMPLATE_VERSION_INCOMPATIBLE = -10081,
    /** The portrait zone could not be located on the identity document.*/
    EC_PORTRAIT_ZONE_NOT_FOUND = -10082,
    /** Indicates no license is available or the license is not set. */
    EC_NO_LICENSE = -20000,
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
    /** Indicates the license in use is a trial version with limited functionality or usage time. */
    EC_TRIAL_LICENSE = -20010,
    /**The license is not valid for current version*/
    EC_LICENSE_VERSION_NOT_MATCH = -20011,
    /**Online license validation failed due to network issues.Using cached license information for validation.*/
    EC_LICENSE_CACHE_USED = -20012,
    EC_LICENSE_AUTH_QUOTA_EXCEEDED = -20013,
    /**License restriction: the number of results has exceeded the allowed limit.*/
    EC_LICENSE_RESULTS_LIMIT_EXCEEDED = -20014,
    /** The specified barcode format is invalid or unsupported. */
    EC_BARCODE_FORMAT_INVALID = -30009,
    /** The specified custom module size for barcode generation is invalid or outside acceptable limits. */
    EC_CUSTOM_MODULESIZE_INVALID = -30025,
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
    /**
     * Disables any grayscale image preprocessing. Selecting this mode skips the preprocessing step, passing the image through to subsequent operations without modification.
     */
    GEM_SKIP = 0,
    /**
     * Automatic selection of grayscale enhancement mode. Currently, not supported. Future implementations may automatically choose the most suitable enhancement based on image analysis.
     */
    GEM_AUTO = 1,
    /**
     * Uses the original, unprocessed image for subsequent operations. This mode is selected when no specific grayscale enhancement is required, maintaining the image in its natural state.
     */
    GEM_GENERAL = 2,
    /**
     * Applies a grayscale equalization algorithm to the image, enhancing contrast and detail in gray level.
     * Suitable for images with poor contrast. Refer to Image Processing Mode (IPM) documentation for argument settings.
     */
    GEM_GRAY_EQUALIZE = 4,
    /**
     * Implements a grayscale smoothing algorithm to reduce noise and smooth the image.
     * This can be beneficial for images with high levels of grain or noise. Check IPM documentation for configuration options.
     */
    GEM_GRAY_SMOOTH = 8,
    /**
     * Enhances the image by applying both sharpening and smoothing algorithms. This mode aims to increase clarity and detail while reducing noise, offering a balanced approach to image preprocessing.
     * Refer to the IPM section for available argument settings.
     */
    GEM_SHARPEN_SMOOTH = 16,
    /**
     * Reserved for future use. This setting is part of the grayscale enhancement mode but is currently not defined for public use. It's reserved for internal development or future enhancements.
     */
    GEM_REV = -2147483648,
    /**
     * Placeholder value with no functional meaning.
     */
    GEM_END = -1
}

declare enum EnumGrayscaleTransformationMode {
    /**
     * Bypasses grayscale transformation, leaving the image in its current state without any modification to its grayscale values.
     * This mode is selected when no alteration of the grayscale data is desired, passing the image through to subsequent operations without modification.
     */
    GTM_SKIP = 0,
    /**
     * Applies an inversion to the grayscale values of the image, effectively transforming light elements to dark and vice versa.
     * This mode is particularly useful for images with light text on dark backgrounds, enhancing visibility for further processing.
     */
    GTM_INVERTED = 1,
    /**
     * Maintains the original grayscale values of the image without any transformation. This mode is suited for images with dark elements on light backgrounds, ensuring the natural contrast and detail are preserved for subsequent analysis.
     */
    GTM_ORIGINAL = 2,
    /**
     * Delegates the choice of grayscale transformation to the library's algorithm, which automatically determines the most suitable transformation based on the image's characteristics. This mode is beneficial when the optimal transformation is not known in advance or varies across different images.
     */
    GTM_AUTO = 4,
    /**
     * Reserved for future expansion or internal use. This placeholder indicates a grayscale transformation mode that is not currently defined for public use but may be utilized for upcoming features or reserved for specific, undocumented adjustments.
     */
    GTM_REV = -2147483648,
    /**
     * Placeholder value with no functional meaning.
     */
    GTM_END = -1
}

declare enum EnumImagePixelFormat {
    /** Binary format representing images with two colors: 0 for black and 1 for white. */
    IPF_BINARY = 0,
    /** Inverted binary format with 0 for white and 1 for black. */
    IPF_BINARYINVERTED = 1,
    /** Grayscale format with 8 bits per pixel, allowing for 256 shades of gray. */
    IPF_GRAYSCALED = 2,
    /** NV21 format, a YUV planar format used commonly in camera preview and video encoding, with 8-bit Y followed by interleaved V/U values. */
    IPF_NV21 = 3,
    /** RGB format with 5 bits for red and blue, and 6 bits for green, stored in a 16-bit structure. */
    IPF_RGB_565 = 4,
    /** Similar to RGB_565 but with 5 bits for each color channel, providing uniform color depth across channels in a 16-bit structure. */
    IPF_RGB_555 = 5,
    /** Standard 24-bit RGB format with 8 bits per channel. */
    IPF_RGB_888 = 6,
    /** 32-bit ARGB format with 8 bits per channel, including an alpha channel for transparency. */
    IPF_ARGB_8888 = 7,
    /** High-depth 48-bit RGB format with 16 bits per channel. */
    IPF_RGB_161616 = 8,
    /** 64-bit ARGB format with 16 bits per channel, including an alpha channel. */
    IPF_ARGB_16161616 = 9,
    /** 32-bit ABGR format with 8 bits per channel, storing color information in reverse order of ARGB_8888. */
    IPF_ABGR_8888 = 10,
    /** 64-bit ABGR format with 16 bits per channel, providing high color depth and transparency in the reverse order of ARGB_16161616. */
    IPF_ABGR_16161616 = 11,
    /** 24-bit BGR format with 8 bits per channel, where the blue channel is stored first. */
    IPF_BGR_888 = 12,
    /** Binary format with 8 bits per pixel, enabling more detailed binary images by allowing for antialiasing or other binary representations. */
    IPF_BINARY_8 = 13,
    /** NV12 format, similar to NV21 but with the U and V color components swapped. */
    IPF_NV12 = 14,
    /** Inverted binary format with 8 bits per pixel. */
    IPF_BINARY_8_INVERTED = 15
}

declare enum EnumImageTagType {
    /** Represents an image that has been sourced from a static file. */
    ITT_FILE_IMAGE = 0,
    /** Indicates that the image is a frame extracted from a video stream. */
    ITT_VIDEO_FRAME = 1
}

declare enum EnumPDFReadingMode {
    /**
     * Deprecated. Covered by PDFRM_MULTIMODAL.
     */
    PDFRM_VECTOR = 1,
    /**
     * Renders the entire page as a bitmap regardless of object type.
     */
    PDFRM_RASTER = 2,
    /**
     * Extracts multimodal information from a PDF, including vector graphics,
     * text content, and embedded images, which can be used for subsequent
     * tasks such as barcode reading, text recognition, and document analysis.
     */
    PDFRM_MULTIMODAL = 3
}

declare enum EnumRasterDataSource {
    /** Specifies the target type for reading a PDF, where the SDK rasterizes the pages of the PDF into images. */
    RDS_RASTERIZED_PAGES = 0,
    /** Specifies the target type for reading a PDF, where the SDK extracts images from the PDF pages. */
    RDS_EXTRACTED_IMAGES = 1
}

declare enum EnumColourChannelUsageType {
    /**
     * Automatically determines how color channels are used.
     * This option allows the SDK to choose the most appropriate channel usage mode dynamically.
     */
    CCUT_AUTO = 0,
    /**
     * Utilizes all available color channels in the image for processing.
     * This mode is ideal for scenarios where full color information is necessary for accurate analysis or processing.
     */
    CCUT_FULL_CHANNEL = 1,
    /**
     * Processes images using only the Y (luminance) channel, specifically in NV21 format images.
     * This mode is useful for operations that require analyzing the brightness or intensity of the image while ignoring color information.
     */
    CCUT_Y_CHANNEL_ONLY = 2,
    /**
     * Uses only the red color channel for processing in RGB images.
     * This mode is useful for tasks that require analysis or manipulation based on the red component of the image.
     */
    CCUT_RGB_R_CHANNEL_ONLY = 3,
    /**
     * Uses only the green color channel for processing in RGB images.
     * This mode is useful for tasks where the green component is most relevant.
     */
    CCUT_RGB_G_CHANNEL_ONLY = 4,
    /**
     * Uses only the blue color channel for processing in RGB images.
     * This mode is useful for tasks where the blue component is of particular interest.
     */
    CCUT_RGB_B_CHANNEL_ONLY = 5
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
    IRUT_SCALED_COLOUR_IMAGE: bigint;
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
    IRUT_SCALED_BARCODE_IMAGE: bigint;
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
    IRUT_DESKEWED_IMAGE: bigint;
    /** Successfully detected short lines. */
    IRUT_SHORT_LINES: bigint;
    IRUT_RAW_TEXT_LINES: bigint;
    /** Detected logic lines. */
    IRUT_LOGIC_LINES: bigint;
    IRUT_ENHANCED_IMAGE: bigint;
    /** A mask to select all types of intermediate results. */
    IRUT_ALL: bigint;
};
type EnumIntermediateResultUnitType = bigint;

declare enum EnumRegionObjectElementType {
    /** Corresponds to the `PredetectedRegionElement` subclass, representing areas within the image identified as potentially significant for further analysis before detailed processing. */
    ROET_PREDETECTED_REGION = 0,
    /** Corresponds to the `LocalizedBarcodeElement` subclass, indicating areas where barcodes have been localized within the image.*/
    ROET_LOCALIZED_BARCODE = 1,
    /** Corresponds to the `DecodedBarcodeElement` subclass, signifying barcodes that have not only been localized but also successfully decoded. */
    ROET_DECODED_BARCODE = 2,
    /** Corresponds to the `LocalizedTextLineElement` subclass, indicating lines of text that have been localized within the image. */
    ROET_LOCALIZED_TEXT_LINE = 3,
    /** Corresponds to the `RecognizedTextLineElement` subclass, referring to text lines that have been recognized. */
    ROET_RECOGNIZED_TEXT_LINE = 4,
    /** Corresponds to the `DetectedQuadElement` subclass, representing quadrilateral shapes detected within the image. */
    ROET_DETECTED_QUAD = 5,
    /** Corresponds to the `DeskewedImageElement` subclass, referring to images that have been deskewed. */
    ROET_DESKEWED_IMAGE = 6,
    /** Corresponds to the `SourceImageElement` subclass. */
    ROET_SOURCE_IMAGE = 7,
    /** Corresponds to the `TargetROIElement` subclass. */
    ROET_TARGET_ROI = 8,
    /** Corresponds to the `EnhancedImageElement` subclass, indicating images that have undergone enhancement for better clarity or detail, specifically in the context of enhanced image processing. */
    ROET_ENHANCED_IMAGE = 9,
    /** Corresponds to the `AuxiliaryRegionElement` subclass, representing auxiliary regions detected within the image. */
    ROET_AUXILIARY_REGION = 10
}

declare enum EnumSectionType {
    /** Indicates that no specific section type has been specified. */
    ST_NULL = 0,
    /** Corresponds to results generated in the "region prediction" section. */
    ST_REGION_PREDETECTION = 1,
    /** Corresponds to results generated in the "barcode localization" section. */
    ST_BARCODE_LOCALIZATION = 2,
    /** Corresponds to results generated in the "barcode decoding" section. */
    ST_BARCODE_DECODING = 3,
    /** Corresponds to results generated in the "text line localization" section. */
    ST_TEXT_LINE_LOCALIZATION = 4,
    /** Corresponds to results generated in the "text line recognition" section. */
    ST_TEXT_LINE_RECOGNITION = 5,
    /** Corresponds to results generated in the "document detection" section. */
    ST_DOCUMENT_DETECTION = 6,
    /** Corresponds to results generated in the "document deskewing" section. */
    ST_DOCUMENT_DESKEWING = 7,
    /** Corresponds to results generated in the "document enhancement" section. */
    ST_IMAGE_ENHANCEMENT = 8
}

declare enum EnumImageFileFormat {
    /** JPEG image format. */
    IFF_JPEG = 0,
    /** PNG image format. */
    IFF_PNG = 1,
    /** BMP (Bitmap) image format. */
    IFF_BMP = 2,
    /** PDF (Portable Document Format) format. */
    IFF_PDF = 3
}

declare enum EnumImageCaptureDistanceMode {
    ICDM_NEAR = 0,
    ICDM_FAR = 1
}

declare enum EnumModuleName {
    MN_DYNAMSOFT_CAPTURE_VISION_ROUTER = "cvr",
    MN_DYNAMSOFT_CORE = "core",
    MN_DYNAMSOFT_LICENSE = "license",
    MN_DYNAMSOFT_IMAGE_PROCESSING = "dip",
    MN_DYNAMSOFT_UTILITY = "utility",
    MN_DYNAMSOFT_BARCODE_READER = "dbr",
    MN_DYNAMSOFT_DOCUMENT_NORMALIZER = "ddn",
    MN_DYNAMSOFT_LABEL_RECOGNIZER = "dlr",
    MN_DYNAMSOFT_CAPTURE_VISION_DATA = "dcvData",
    MN_DYNAMSOFT_NEURAL_NETWORK = "dnn",
    MN_DYNAMSOFT_CODE_PARSER = "dcp",
    MN_DYNAMSOFT_CAMERA_ENHANCER = "dce",
    MN_DYNAMSOFT_CAPTURE_VISION_STD = "std"
}

/**
 * Specifies how a numeric value should be interpreted relative to a reference dimension.
 * * Used wherever a numeric parameter (e.g. spacing, ROI coordinates) can be expressed
 * either as an absolute pixel count or as a proportion of a reference size.
 */
declare enum EnumMeasureUnit {
    MU_PIXEL = 0,// The value is an absolute pixel count.
    MU_PERCENTAGE = 1
}

declare enum EnumWasmType {
    BASELINE = "baseline",
    ML = "ml",
    ML_SIMD = "ml-simd",
    ML_SIMD_PTHREAD = "ml-simd-pthread",
    ML_SIMD_WITH_PDF = "ml-simd-with-pdf",
    ML_SIMD_PTHREAD_WITH_PDF = "ml-simd-pthread-with-pdf",
    AUTO = "auto"
}

type WorkerAutoResources = {
    [key in EnumModuleName]?: {
        js?: boolean;
        wasm?: boolean;
        deps?: EnumModuleName[];
    };
};
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
    wasmLoadOptions: WasmLoadOptions;
    _bundleEnv?: "DCV" | "DBR";
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
    "dcvData"?: string | PathInfo;
    "identityutility"?: string | PathInfo;
    "ddv"?: string | PathInfo;
    "dwt"?: string | DwtInfo;
    "dbrBundle"?: string | PathInfo;
    "dcvBundle"?: string | PathInfo;
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
interface WasmLoadOptions {
    wasmType?: EnumWasmType;
    pthreadPoolSize?: number;
}
type MimeType = "image/png" | "image/jpeg" | "image/bmp";

interface CapturedResultItem {
    /** The type of the captured result item, indicating what kind of data it represents. */
    readonly type: EnumCapturedResultItemType;
    /** A property of type `CapturedResultItem` that represents a reference to another captured result item. */
    readonly referenceItem: CapturedResultItem | null;
    /** The name of the target ROI definition which includes a task that generated the result. */
    readonly targetROIDefName: string;
    /** The name of the task that generated the result. */
    readonly taskName: string;
}

interface ImageTag {
    /** The unique identifier of the image. */
    imageId: number;
    /** The type of the image. */
    type: EnumImageTagType;
}

interface DSImageData {
    /** The raw bytes of the image as a Uint8Array. */
    bytes: Uint8Array;
    /** The width of the image in pixels. */
    width: number;
    /** The height of the image in pixels. */
    height: number;
    /** The stride (or row width) of the image in bytes. */
    stride: number;
    /** The pixel format of the image. */
    format: EnumImagePixelFormat;
    /** An optional tag associated with the image data. */
    imageTag?: ImageTag;
}

interface OriginalImageResultItem extends CapturedResultItem {
    /** The image data associated with this result item. */
    imageData: DSImageData;
    /** Converts the image data into an HTMLCanvasElement for display or further manipulation in web applications. */
    toCanvas: () => HTMLCanvasElement;
    /** Converts the image data into an HTMLImageElement of a specified MIME type ('image/png' or 'image/jpeg'). */
    toImage: (MIMEType: "image/png" | "image/jpeg") => HTMLImageElement;
    /** Converts the image data into a Blob object of a specified MIME type ('image/png' or 'image/jpeg'). */
    toBlob: (MIMEType: "image/png" | "image/jpeg") => Promise<Blob>;
}

interface Point {
    /** The x-coordinate of the point. */
    x: number;
    /** The y-coordinate of the point. */
    y: number;
}

interface Contour {
    /** An array of `Point` objects defining the vertices of the contour. */
    points: Array<Point>;
}

interface LineSegment {
    /** The starting point of the line segment. */
    startPoint: Point;
    /** The ending point of the line segment. */
    endPoint: Point;
}

interface Corner {
    /** The type of the corner, represented by the enumeration EnumCornerType. */
    type: EnumCornerType;
    /** The point of intersection of the two lines forming the corner. */
    intersection: Point;
    /** The first line segment forming the corner. */
    line1: LineSegment;
    /** The second line segment forming the corner. */
    line2: LineSegment;
}

interface Rect {
    /** The x-coordinate of the rectangle's top-left corner. */
    x: number;
    /** The y-coordinate of the rectangle's top-left corner. */
    y: number;
    /** The width of the rectangle. */
    width: number;
    /** The height of the rectangle. */
    height: number;
    /** [Optional] Indicates if the rectangle's measurements are in percentages. */
    isMeasuredInPercentage?: boolean;
}

interface Arc {
    /** The x-coordinate of the arc's center. */
    x: number;
    /** The y-coordinate of the arc's center. */
    y: number;
    /** The radius of the arc. */
    radius: number;
    /** The starting angle of the arc, in radians. */
    startAngle: number;
    /** The ending angle of the arc, in radians. */
    endAngle: number;
}

interface Polygon {
    /** An array of `Point` objects defining the vertices of the polygon. */
    points: Array<Point>;
}

interface DSRect {
    /** The left coordinate of the rectangle. */
    left: number;
    /** The right coordinate of the rectangle. */
    right: number;
    /** The top coordinate of the rectangle. */
    top: number;
    /** The bottom coordinate of the rectangle. */
    bottom: number;
    /** Indicates if the rectangle's measurements are in percentages. */
    isMeasuredInPercentage?: boolean;
}

interface Edge {
    /** The starting corner of the edge. */
    startCorner: Corner;
    /** The ending corner of the edge. */
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
    mode?: EnumPDFReadingMode;
    dpi?: number;
    rasterDataSource?: EnumRasterDataSource;
}

interface Quadrilateral {
    /** An array of four `Point` objects defining the vertices of the quadrilateral. */
    points: [Point, Point, Point, Point];
    /** The bounding rectangle of the quadrilateral, represented by a `DSRect` object. */
    boundingRect?: DSRect;
    /** The area of the quadrilateral. */
    area?: number;
}

interface DSFile extends File {
    /** Downloads the file in memory to the local drive via the browser. */
    download: () => void;
}

interface Warning {
    /** A unique identifier for the warning message. */
    id: number;
    /** The textual description of the warning. */
    message: string;
}

interface IntermediateResultUnit {
    /** A unique identifier for the intermediate result unit. */
    hashId: string;
    /** The hash ID of the original image associated with this unit. */
    originalImageHashId: string;
    /** The tag associated with the original image. */
    originalImageTag: ImageTag;
    /** The type of the intermediate result unit, defined by the enumeration `EnumIntermediateResultUnitType`. */
    unitType: EnumIntermediateResultUnitType;
}

interface BinaryImageUnit extends IntermediateResultUnit {
    /** The image data for the binary image. */
    imageData: DSImageData;
}

interface ColourImageUnit extends IntermediateResultUnit {
    /** The image data for the colour image. */
    imageData: DSImageData;
}

interface ContoursUnit extends IntermediateResultUnit {
    /** An array of `Contour` objects, each representing a series of points that outline a shape within the image. */
    contours: Array<Contour>;
}

interface EnhancedGrayscaleImageUnit extends IntermediateResultUnit {
    /** The image data for the enhanced grayscale image. */
    imageData: DSImageData;
}

interface GrayscaleImageUnit extends IntermediateResultUnit {
    /** The image data for the grayscale image. */
    imageData: DSImageData;
}

interface IntermediateResult {
    /** An array of `IntermediateResultUnit` objects, each representing a different type of intermediate result. */
    intermediateResultUnits: Array<IntermediateResultUnit>;
}

interface IntermediateResultExtraInfo {
    /** The property indicates the name of the `TargetROIDef` object that generates the intermediate result. */
    targetROIDefName: string;
    /** The name of the processing task to which this result belongs. */
    taskName: string;
    /** Indicates whether the result is at the section level. */
    isSectionLevelResult: boolean;
    /** The type of section, if applicable, as defined by the enumeration `EnumSectionType`. */
    sectionType: EnumSectionType;
}

interface LineSegmentsUnit extends IntermediateResultUnit {
    /** An array of `LineSegment` objects, each representing a segment of a line detected within the image. */
    lineSegments: Array<LineSegment>;
}

interface RegionObjectElement {
    /** The location of the region object, represented as a quadrilateral. */
    location: Quadrilateral;
    /** A reference to another `RegionObjectElement`. */
    referencedElement: RegionObjectElement;
    /** The type of the region object element, defined by the enumeration EnumRegionObjectElementType. */
    elementType: EnumRegionObjectElementType;
}

interface PredetectedRegionElement extends RegionObjectElement {
    /** The name of the detection mode used to detect this region element. */
    modeName: string;
    /** The ID of the label associated with this region element. */
    labelID: number;
    /** The name of the label associated with this region element. */
    labelName: string;
}

interface PredetectedRegionsUnit extends IntermediateResultUnit {
    /** An array of `PredetectedRegionElement` objects, each representing a pre-detected region detected within the image. */
    predetectedRegions: Array<PredetectedRegionElement>;
}

interface ScaledColourImageUnit extends IntermediateResultUnit {
    /** The image data for the scaled colour image. */
    imageData: DSImageData;
}

interface ShortLinesUnit extends IntermediateResultUnit {
    /** An array of `LineSegment` objects, each representing a short line detected within the image. */
    shortLines: Array<LineSegment>;
}

interface TextRemovedBinaryImageUnit extends IntermediateResultUnit {
    /** The image data for the text-removed binary image. */
    imageData: DSImageData;
}

interface TextureDetectionResultUnit extends IntermediateResultUnit {
    /** This value represents the detected horizontal distance in pixels between consecutive texture patterns, providing an indication of the texture's density and orientation within the image. */
    xSpacing: number;
    /**
     * The spacing between texture stripes in the y-direction. Similar to `xSpacing`, this value measures the vertical distance between texture patterns.
     * It offers insights into the vertical density and alignment of the texture within the image, contributing to the understanding of the texture's characteristics and spatial distribution.
     */
    ySpacing: number;
}

interface TextureRemovedBinaryImageUnit extends IntermediateResultUnit {
    /** The image data for the texture-removed binary image. */
    imageData: DSImageData;
}

interface TextureRemovedGrayscaleImageUnit extends IntermediateResultUnit {
    /** The image data for the texture-removed grayscale image. */
    imageData: DSImageData;
}

interface TextZone {
    /** The location of the text zone. */
    location: Quadrilateral;
    /** The indices of the character contours. */
    charContoursIndices: Array<number>;
}

interface TextZonesUnit extends IntermediateResultUnit {
    /** An array of `TextZone` objects, each representing the geometric boundaries of a detected text zone within the image. */
    textZones: Array<TextZone>;
}

interface TransformedGrayscaleImageUnit extends IntermediateResultUnit {
    /** The image data for the transformed grayscale image. */
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

interface CapturedResultBase {
    /** Error code associated with the capture result. */
    readonly errorCode: number;
    /** Error string providing details about the error. */
    readonly errorString: string;
    /** The hash ID of the original image. */
    readonly originalImageHashId: string;
    /** The tag associated with the original image. */
    readonly originalImageTag: ImageTag;
}

interface ErrorInfo {
    errorCode: EnumErrorCode;
    errorString: string;
}

interface AuxiliaryRegionElement extends RegionObjectElement {
    /** The name of this auxiliary region(e.g., "PortraitZone", "SignatureArea"). */
    name: string;
    /** The confidence level of this auxiliary region detection, typically in the range [0, 100] */
    confidence: number;
}

declare const imagePtrToUint8Array: (data: {
    ptr: number;
    length: number;
}) => Promise<Uint8Array<ArrayBufferLike>>;
declare const resolveDsImageData: (point: number) => Promise<DSImageData>;
declare let worker: Worker;
declare const getNextTaskID: () => number;
declare const mapTaskCallBack: {
    [key: string]: (body: any) => void;
};
declare let bDebug: boolean;
declare const setBDebug: (value: boolean) => void;
declare const innerVersions: InnerVersions;
declare const mapPackageRegister: {
    [key: string]: any;
};
declare class CoreModule {
    static get engineResourcePaths(): EngineResourcePaths;
    static set engineResourcePaths(value: EngineResourcePaths);
    private static _bSupportDce4Module;
    static get bSupportDce4Module(): number;
    private static _bSupportIRTModule;
    static get bSupportIRTModule(): number;
    private static _versions;
    static get versions(): any;
    static _onLog: (message: string) => void;
    static get _bDebug(): boolean;
    static set _bDebug(value: boolean);
    static _bundleEnv: "DCV" | "DBR";
    static get _workerName(): string;
    private static _wasmLoadOptions;
    static get wasmLoadOptions(): WasmLoadOptions;
    static set wasmLoadOptions(options: WasmLoadOptions);
    static loadedWasmType: Exclude<EnumWasmType, "auto">;
    /**
     * Initiates the loading process for the .wasm file(s) corresponding to the specified module(s).
     * If a module relies on other modules, the other modules will be loaded as well.
     *
     * @returns A promise that resolves when the resources have been successfully released. It does not provide any value upon resolution.
     */
    static isModuleLoaded(): boolean;
    static loadWasm(): Promise<void>;
    /**
     * An event that fires during the loading of a WebAssembly module (.wasm).
     *
     * @param filePath The path of the wasm file.
     * @param tag Indicates the ongoing status of the file download ("starting", "in progress", "completed").
     * @param progress An object indicating the progress of the download, with `loaded` and `total` bytes.
     */
    static onWasmLoadProgressChanged: (filePath: string, tag: "starting" | "in progress" | "completed", progress: {
        loaded: number;
        total: number;
    }) => void;
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
declare const isDsImageKeyValue: (k: any, v: any) => boolean;
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

declare const requestResource: (url: string, type: "text" | "blob" | "arraybuffer", callbacks?: {
    loadstartCallback?: (xhr: XMLHttpRequest) => any;
    progressCallback?: (pe: any, xhr: XMLHttpRequest) => any;
    loadendCallback?: (xhr: XMLHttpRequest) => any;
}) => Promise<any>;
declare const checkIsLink: (str: string) => boolean;
declare const compareVersion: (strV1: string, strV2: string) => number;
declare const handleEngineResourcePaths: (engineResourcePaths: EngineResourcePaths) => EngineResourcePaths;
declare const _saveToFile: (imageData: ImageData, name: string, download?: boolean) => Promise<File>;
declare const _toCanvas: (imageData: ImageData | DSImageData) => HTMLCanvasElement;
declare const _toImage: (MIMEType: MimeType, imageData: ImageData | DSImageData) => HTMLImageElement;
declare const _toBlob: (MIMEType: MimeType, imageData: ImageData | DSImageData) => Promise<Blob>;
declare const encodeBMP: (imageData: ImageData) => ArrayBuffer;
declare const createImageData: (dsImageData: DSImageData) => ImageData;
declare const isSimdSupported: () => boolean;
declare const blobToDsImage: (blob: Blob) => Promise<DSImageData>;
declare const e: (d: any, s: any) => Promise<string>;
declare const d: (d: any, s: any) => Promise<string>;
declare const productNameMap: {
    readonly std: "dynamsoft-capture-vision-std";
    readonly dip: "dynamsoft-image-processing";
    readonly core: "dynamsoft-core";
    readonly dnn: "dynamsoft-capture-vision-dnn";
    readonly license: "dynamsoft-license";
    readonly utility: "dynamsoft-utility";
    readonly cvr: "dynamsoft-capture-vision-router";
    readonly dbr: "dynamsoft-barcode-reader";
    readonly dlr: "dynamsoft-label-recognizer";
    readonly ddn: "dynamsoft-document-normalizer";
    readonly dcp: "dynamsoft-code-parser";
    readonly dcvData: "dynamsoft-capture-vision-data";
    readonly dce: "dynamsoft-camera-enhancer";
    readonly identityutility: "dynamsoft-identity-utility";
    readonly ddv: "dynamsoft-document-viewer";
    readonly dwt: "dwt";
    readonly dbrBundle: "dynamsoft-barcode-reader-bundle";
    readonly dcvBundle: "dynamsoft-capture-vision-bundle";
};

export { CoreModule, EnumBufferOverflowProtectionMode, EnumCapturedResultItemType, EnumColourChannelUsageType, EnumCornerType, EnumCrossVerificationStatus, EnumErrorCode, EnumGrayscaleEnhancementMode, EnumGrayscaleTransformationMode, EnumImageCaptureDistanceMode, EnumImageFileFormat, EnumImagePixelFormat, EnumImageTagType, EnumIntermediateResultUnitType, EnumMeasureUnit, EnumModuleName, EnumPDFReadingMode, EnumRasterDataSource, EnumRegionObjectElementType, EnumSectionType, EnumWasmType, ImageSourceAdapter, _saveToFile, _toBlob, _toCanvas, _toImage, bDebug, blobToDsImage, checkIsLink, compareVersion, createImageData, d, e, encodeBMP, getNextTaskID, handleEngineResourcePaths, imagePtrToUint8Array, innerVersions, isArc, isContour, isDSImageData, isDSRect, isDsImageKeyValue, isImageTag, isLineSegment, isObject, isOriginalDsImageData, isPoint, isPolygon, isQuad, isRect, isSimdSupported, mapPackageRegister, mapTaskCallBack, productNameMap, requestResource, resolveDsImageData, setBDebug, worker };
export type { Arc, AuxiliaryRegionElement, BinaryImageUnit, CapturedResultBase, CapturedResultItem, ColourImageUnit, Contour, ContoursUnit, Corner, DSFile, DSImageData, DSRect, DwtInfo, Edge, EngineResourcePaths, EnhancedGrayscaleImageUnit, ErrorInfo, FileImageTag, GrayscaleImageUnit, ImageSourceErrorListener, ImageTag, InnerVersions, IntermediateResult, IntermediateResultExtraInfo, IntermediateResultUnit, LineSegment, LineSegmentsUnit, MapController, MimeType, ObservationParameters, OriginalImageResultItem, PDFReadingParameter, PathInfo, Point, Polygon, PostMessageBody, PredetectedRegionElement, PredetectedRegionsUnit, Quadrilateral, Rect, RegionObjectElement, ScaledColourImageUnit, ShortLinesUnit, TextRemovedBinaryImageUnit, TextZone, TextZonesUnit, TextureDetectionResultUnit, TextureRemovedBinaryImageUnit, TextureRemovedGrayscaleImageUnit, TransformedGrayscaleImageUnit, Warning, WasmLoadOptions, WasmVersions, WorkerAutoResources };






interface CapturedResult extends CapturedResultBase {
    /** An array of `CapturedResultItem` objects representing the captured result items. */
    items: Array<CapturedResultItem>;
    /** The decoded barcode results within the original image. */
    decodedBarcodesResult?: DecodedBarcodesResult;
    /** The recognized textLine results within the original image. */
    recognizedTextLinesResult?: RecognizedTextLinesResult;
    /** The processed document results within the original image. */
    processedDocumentResult?: ProcessedDocumentResult;
    /** The parsed results within the original image. */
    parsedResult?: ParsedResult;
}

declare class CapturedResultReceiver {
    /**
     * Event triggered when a generic captured result is available, occurring each time an image finishes its processing.
     * This event can be used for any result that does not fit into the specific categories of the other callback events.
     * @param result The captured result, an instance of `CapturedResult`.
     */
    onCapturedResultReceived?: (result: CapturedResult) => void;
    /**
     * Event triggered when the original image result is available.
     * This event is used to handle the original image captured by an image source such as Dynamsoft Camera Enhancer.
     * @param result The original image result, an instance of `OriginalImageResultItem`.
     */
    onOriginalImageResultReceived?: (result: OriginalImageResultItem) => void;
    onDecodedBarcodesReceived?: (result: DecodedBarcodesResult) => void;
    onRecognizedTextLinesReceived?: (result: RecognizedTextLinesResult) => void;
    onProcessedDocumentResultReceived?: (result: ProcessedDocumentResult) => void;
    onParsedResultsReceived?: (result: ParsedResult) => void;
}

declare class BufferedItemsManager {
    private _cvr;
    constructor(cvr: any);
    /**
     * Gets the maximum number of buffered items.
     * @returns Returns the maximum number of buffered items.
     */
    getMaxBufferedItems(): Promise<number>;
    /**
     * Sets the maximum number of buffered items.
     * @param count the maximum number of buffered items
     */
    setMaxBufferedItems(count: number): Promise<void>;
    /**
     * Gets the buffered character items.
     * @return the buffered character items
     */
    getBufferedCharacterItemSet(): Promise<BufferedCharacterItemSet>;
}

declare class IntermediateResultReceiver {
    private _observedResultUnitTypes;
    private _observedTaskMap;
    private _parameters;
    /**
     * Gets the observed parameters of the intermediate result receiver. Allowing for configuration of intermediate result observation.
     * @return The observed parameters, of type ObservationParameters. The default parameters are to observe all intermediate result unit types and all tasks.
     */
    getObservationParameters(): ObservationParameters;
    onTaskResultsReceived?: (result: IntermediateResult, info: IntermediateResultExtraInfo) => void;
    onPredetectedRegionsReceived?: (result: PredetectedRegionsUnit, info: IntermediateResultExtraInfo) => void;
    onTargetROIResultsReceived?: (result: IntermediateResultUnit, info: IntermediateResultExtraInfo) => void;
    onColourImageUnitReceived?: (result: ColourImageUnit, info: IntermediateResultExtraInfo) => void;
    onScaledColourImageUnitReceived?: (result: ScaledColourImageUnit, info: IntermediateResultExtraInfo) => void;
    onGrayscaleImageUnitReceived?: (result: GrayscaleImageUnit, info: IntermediateResultExtraInfo) => void;
    onTransformedGrayscaleImageUnitReceived?: (result: TransformedGrayscaleImageUnit, info: IntermediateResultExtraInfo) => void;
    onEnhancedGrayscaleImageUnitReceived?: (result: EnhancedGrayscaleImageUnit, info: IntermediateResultExtraInfo) => void;
    onBinaryImageUnitReceived?: (result: BinaryImageUnit, info: IntermediateResultExtraInfo) => void;
    onTextureDetectionResultUnitReceived?: (result: TextureDetectionResultUnit, info: IntermediateResultExtraInfo) => void;
    onTextureRemovedGrayscaleImageUnitReceived?: (result: TextureRemovedGrayscaleImageUnit, info: IntermediateResultExtraInfo) => void;
    onTextureRemovedBinaryImageUnitReceived?: (result: TextureRemovedBinaryImageUnit, info: IntermediateResultExtraInfo) => void;
    onContoursUnitReceived?: (result: ContoursUnit, info: IntermediateResultExtraInfo) => void;
    onLineSegmentsUnitReceived?: (result: LineSegmentsUnit, info: IntermediateResultExtraInfo) => void;
    onTextZonesUnitReceived?: (result: TextZonesUnit, info: IntermediateResultExtraInfo) => void;
    onTextRemovedBinaryImageUnitReceived?: (result: TextRemovedBinaryImageUnit, info: IntermediateResultExtraInfo) => void;
    onShortLinesUnitReceived?: (result: ShortLinesUnit, info: IntermediateResultExtraInfo) => void;
    onCandidateBarcodeZonesUnitReceived?: (result: CandidateBarcodeZonesUnit, info: IntermediateResultExtraInfo) => void;
    onComplementedBarcodeImageUnitReceived?: (result: ComplementedBarcodeImageUnit, info: IntermediateResultExtraInfo) => void;
    onDecodedBarcodesReceived?: (result: DecodedBarcodesUnit, info: IntermediateResultExtraInfo) => void;
    onDeformationResistedBarcodeImageUnitReceived?: (result: DeformationResistedBarcodeImageUnit, info: IntermediateResultExtraInfo) => void;
    onLocalizedBarcodesReceived?: (result: LocalizedBarcodesUnit, info: IntermediateResultExtraInfo) => void;
    onScaledBarcodeImageUnitReceived?: (result: ScaledBarcodeImageUnit, info: IntermediateResultExtraInfo) => void;
    onLocalizedTextLinesReceived?: (result: LocalizedTextLinesUnit, info: IntermediateResultExtraInfo) => void;
    onRawTextLinesUnitReceived?: (result: RawTextLinesUnit, info: IntermediateResultExtraInfo) => void;
    onRecognizedTextLinesReceived?: (result: RecognizedTextLinesUnit, info: IntermediateResultExtraInfo) => void;
    onCandidateQuadEdgesUnitReceived?: (result: CandidateQuadEdgesUnit, info: IntermediateResultExtraInfo) => void;
    onCornersUnitReceived?: (result: CornersUnit, info: IntermediateResultExtraInfo) => void;
    onDeskewedImageReceived?: (result: DeskewedImageUnit, info: IntermediateResultExtraInfo) => void;
    onDetectedQuadsReceived?: (result: DetectedQuadsUnit, info: IntermediateResultExtraInfo) => void;
    onEnhancedImageReceived?: (result: EnhancedImageUnit, info: IntermediateResultExtraInfo) => void;
    onLogicLinesUnitReceived?: (result: LogicLinesUnit, info: IntermediateResultExtraInfo) => void;
    onLongLinesUnitReceived?: (result: LongLinesUnit, info: IntermediateResultExtraInfo) => void;
}

declare class IntermediateResultManager {
    private _cvr;
    private _irrRegistryState;
    _intermediateResultReceiverSet: Set<IntermediateResultReceiver>;
    constructor(cvr: any);
    /**
     * Adds a `IntermediateResultReceiver` object as the receiver of intermediate results.
     * @param receiver The receiver object, of type `IntermediateResultReceiver`.
     */
    addResultReceiver(receiver: IntermediateResultReceiver): Promise<void>;
    /**
     * Removes the specified `IntermediateResultReceiver` object.
     * @param receiver The receiver object, of type `IntermediateResultReceiver`.
     */
    removeResultReceiver(receiver: IntermediateResultReceiver): Promise<void>;
    removeAllResultReceivers(): Promise<void>;
    /**
     * Retrieves the original image data.
     *
     * @returns A promise that resolves when the operation has successfully completed. It provides the original image upon resolution.
     */
    getOriginalImage(): DSImageData;
}

declare enum EnumImageSourceState {
    /**
     * Indicates that the buffer of the image source is currently empty.
     */
    ISS_BUFFER_EMPTY = 0,
    /**
    * Signifies that the source for the image source has been depleted.
    */
    ISS_EXHAUSTED = 1
}

interface ImageSourceStateListener {
    /**
     * Event triggered whenever there is a change in the image source's state.
     * @param status This parameter indicates the current status of the image source, using the `EnumImageSourceState` type.
     * This enumeration defines various possible states of an image source.
     */
    onImageSourceStateReceived?: (status: EnumImageSourceState) => void;
}

interface SimplifiedCaptureVisionSettings {
    /**
     * Specifies weather to output the original image.
     */
    outputOriginalImage: boolean;
    /**
     * Designates the region of interest (ROI) within an image, limiting the image processing activities exclusively to this specified area. It is of type `Quadrilateral`.
     */
    roi: Quadrilateral;
    /**
     * Determines if the coordinates for the region of interest (ROI) are expressed in percentage terms (true) or as exact pixel measurements (false).
     */
    roiMeasuredInPercentage: boolean;
    /**
     * Specifies the timeout duration for processing an image, in milliseconds.
     */
    timeout: number;
    /**
     * Specifies the maximum number of parallel tasks that can be used for image capture and recognition.
     */
    maxParallelTasks: number;
    /**
     * Specifies the shortest time span, in milliseconds, that must elapse between two successive image captures. Opting for a higher interval decreases capture frequency, which can lower the system's processing load and conserve energy. On the other hand, a smaller interval value increases the frequency of image captures, enhancing the system's responsiveness.
     * @remarks Handling of Special Values:
     * 0 (The default setting): Adopting this value means the image source queues up the next image for immediate availability once processing of the current image is finished, facilitating continuous, uninterrupted image processing.
     */
    minImageCaptureInterval: number;
    /**
     * Specifies the basic settings for the barcode reader module. It is of type `SimplifiedBarcodeReaderSettings`.
     */
    barcodeSettings: SimplifiedBarcodeReaderSettings;
}

interface CapturedResultFilter {
    onOriginalImageResultReceived?: (result: OriginalImageResultItem) => void;
    onDecodedBarcodesReceived?: (result: DecodedBarcodesResult) => void;
    onRecognizedTextLinesReceived?: (result: RecognizedTextLinesResult) => void;
    onProcessedDocumentResultReceived?: (result: ProcessedDocumentResult) => void;
    onParsedResultsReceived?: (result: ParsedResult) => void;
    getFilteredResultItemTypes(): number;
}

type PDFOptions = {
    pages?: number[];
    dpi?: number;
};

declare class CaptureVisionRouter {
    #private;
    static _onLog: (message: string) => void;
    static _defaultTemplate: string;
    private static _isNoOnnx;
    /**
     * The maximum length of the longer side of the image to be processed. The default value is 2048 pixels in mobile devices and 4096 pixels in desktop browser.
     */
    maxImageSideLength: number;
    /**
    * An event that fires during the loading of a recognition data file (.data).
    * @param filePath The path of the recognition data file.
    * @param tag Indicates the ongoing status of the file download ("starting", "in progress", "completed").
    * @param progress An object indicating the progress of the download, with `loaded` and `total` bytes.
    */
    static onDataLoadProgressChanged: (filePath: string, tag: "starting" | "in progress" | "completed", progress: {
        loaded: number;
        total: number;
    }) => void;
    /**
     * An event that fires when an error occurs from the start of capturing process.
     * @param error The error object that contains the error code and error string.
     */
    onCaptureError: (error: Error) => void;
    provideDsImage: DSImageData;
    _instanceID: number;
    private _loopReadVideoTimeoutId;
    private _isOutputOriginalImage;
    private _isOpenDetectVerify;
    private _isOpenNormalizeVerify;
    private _isOpenBarcodeVerify;
    private _isOpenLabelVerify;
    private _minImageCaptureInterval;
    private _averageProcessintTimeArray;
    private _averageFetchImageTimeArray;
    private _averageTime;
    private _dynamsoft;
    private _enhancedFeaturesIrr;
    private _templateName;
    private _isCapturing;
    private _s;
    /**
     * Returns whether the `CaptureVisionRouter` instance has been disposed of.
     *
     * @returns Boolean indicating whether the `CaptureVisionRouter` instance has been disposed of.
     */
    get disposed(): boolean;
    get isCapturing(): boolean;
    /**
     * Initializes a new instance of the `CaptureVisionRouter` class.
     *
     * @returns A promise that resolves with the initialized `CaptureVisionRouter` instance.
     */
    static createInstance(loadPresetTemplates?: boolean): Promise<CaptureVisionRouter>;
    /**
     * Appends a deep learning model to the memory buffer.
     * @param dataName Specifies the name of the model.
     * @param dataPath [Optional] Specifies the path to find the model file. If not specified, the default path points to the package "dynamsoft-capture-vision-data".
     *
     * @returns A promise that resolves once the model file is successfully loaded. It does not provide any value upon resolution.
     */
    static appendDLModelBuffer(modelName: string | Array<string>, dataPath?: string): Promise<ErrorInfo>;
    /**
     * Clears all deep learning models from buffer to free up memory
     */
    static clearDLModelBuffers(): Promise<void>;
    private _singleFrameModeCallback;
    private _singleFrameModeCallbackBind;
    /**
     * Sets up an image source to provide images for continuous processing.
     * @param imageSource The image source which is compliant with the `ImageSourceAdapter` interface.
     */
    setInput(imageSource: ImageSourceAdapter | any): void;
    /**
     * Returns the image source object.
     */
    getInput(): ImageSourceAdapter;
    /**
     * Adds listeners for image source state change.
     */
    addImageSourceStateListener(listener: ImageSourceStateListener): void;
    /**
     * Removes listeners for image source state change.
     */
    removeImageSourceStateListener(listener: ImageSourceStateListener): boolean;
    /**
     * Adds a `CapturedResultReceiver` object as the receiver of captured results.
     * @param receiver The receiver object, of type `CapturedResultReceiver`.
     */
    addResultReceiver(receiver: CapturedResultReceiver): Promise<void>;
    /**
     * Removes the specified `CapturedResultReceiver` object.
     * @param receiver The receiver object, of type `CapturedResultReceiver`.
     */
    removeResultReceiver(receiver: CapturedResultReceiver): Promise<void>;
    removeAllResultReceivers(): Promise<void>;
    private _setCrrRegistry;
    /**
     * Adds a `MultiFrameResultCrossFilter` object to filter non-essential results.
     * @param filter The filter object, of type `MultiFrameResultCrossFilter`.
     *
     * @returns A promise that resolves when the operation has successfully completed. It does not provide any value upon resolution.
     */
    addResultFilter(filter: CapturedResultFilter): Promise<void>;
    /**
     * Removes the specified `MultiFrameResultCrossFilter` object.
     * @param filter The filter object, of type `MultiFrameResultCrossFilter`.
     *
     * @returns A promise that resolves when the operation has successfully completed. It does not provide any value upon resolution.
     */
    removeResultFilter(filter: CapturedResultFilter): Promise<void>;
    removeAllResultFilters(): Promise<void>;
    private _handleFilterUpdate;
    /**
     * Initiates a capturing process based on a specified template. This process is repeated for each image fetched from the source.
     * @param templateName [Optional] Specifies a "CaptureVisionTemplate" to use.
     *
     * @returns A promise that resolves when the capturing process has successfully started. It does not provide any value upon resolution.
     */
    startCapturing(templateName: string): Promise<void>;
    /**
     * Stops the capturing process.
     */
    stopCapturing(): void;
    containsTask(templateName: string): Promise<any>;
    /**
     * Switches the currently active capturing template during the image processing workflow. This allows dynamic reconfiguration of the capture process without restarting or reinitializing the system, enabling different settings or rules to be applied on the fly.
     *
     * @param templateName The name of the new capturing template to apply.
     *
     * @return A promise with an ErrorInfo object that resolves when the operation has completed, containing the result of the operation.
     *
     */
    switchCapturingTemplate(templateName: string): Promise<void>;
    /**
     * Video stream capture, recursive call, loop frame capture
     */
    private barcodeScanLoop;
    private continueLoop;
    getClarity(dsimage: DSImageData, bitcount: number, wr: number, hr: number, grayThreshold: number): Promise<number>;
    /**
     * Processes a single image or a file containing a single image to derive important information.
     * @param imageOrFile Specifies the image or file to be processed. The following data types are accepted: `Blob`, `HTMLImageElement`, `HTMLCanvasElement`, `HTMLVideoElement`, `DSImageData`, `string`.
     * @param templateName [Optional] Specifies a "CaptureVisionTemplate" to use.
     *
     * @returns A promise that resolves with a `CapturedResult` object which contains the derived information from the image processed.
     */
    capture(imageOrFile: Blob | string | DSImageData | HTMLImageElement | HTMLVideoElement | HTMLCanvasElement, templateName?: string): Promise<CapturedResult>;
    /**
     * Captures multiple pages from a PDF file and returns the extracted content for each specified page.
     *
     * This method processes a PDF document and extracts data from one or more pages using the
     * PDFRM_MULTIMODAL capture mode. The extracted content is returned as an array of results,
     * one per requested page.
     *
     * @param file - The PDF file to process. Can be provided as a Blob object or a file path string.
     * @param templateName - The name of the template to use for extraction.
     * @param options - Optional configuration parameters for the capture operation.
     * @param options.pages - An array of page numbers (0-indexed) to extract. If empty or omitted,
     *                        all pages in the document will be processed.
     * @param options.dpi - The DPI (dots per inch) resolution for rendering. Defaults to 300.
     *
     * @returns A Promise that resolves to an array of CapturedResult objects, where each object
     *          corresponds to the extracted data from a single page in the order specified.
    */
    captureMultiPages(file: Blob | string, templateName?: string, options?: PDFOptions): Promise<CapturedResult[]>;
    private _captureDsimage;
    private _captureUrl;
    private _captureBase64;
    private _captureBlob;
    private _captureImage;
    private _captureCanvas;
    private _captureVideo;
    private _captureInWorker;
    /**
     * Configures runtime settings using a provided JSON string, an object, or a URL pointing to an object, which contains settings for one or more `CaptureVisionTemplates`.
     * @param settings A JSON string, an object, or a URL pointing to an object that contains settings for one or more `CaptureVisionTemplates`.
     *
     * @returns A promise that resolves when the operation has completed. It provides an object that describes the result.
     */
    initSettings(settings: string | object): Promise<ErrorInfo>;
    /**
     * Returns an object that contains settings for the specified `CaptureVisionTemplate`.
     * @param templateName Specifies a `CaptureVisionTemplate` by its name. If passed "*", the returned object will contain all templates.
     *
     * @returns A promise that resolves with the object that contains settings for the specified template or all templates.
     */
    outputSettings(templateName: string, includeDefaultValues?: boolean): Promise<any>;
    /**
     * Generates a Blob object or initiates a JSON file download containing the settings for the specified `CaptureVisionTemplate`.
     * @param templateName Specifies a `CaptureVisionTemplate` by its name. If passed "*", the returned object will contain all templates.
     * @param fileName Specifies the name of the file.
     * @param download Boolean that specifies whether to initiates a file download.
     *
     * @returns A promise that resolves with the Blob object that contains settings for the specified template or all templates.
     */
    outputSettingsToFile(templateName: string, fileName: string, download?: boolean, includeDefaultValues?: boolean): Promise<Blob>;
    /** Get all parameter template names.
     *
     * @returns A promise that resolves with an array of template names.
     */
    getTemplateNames(): Promise<Array<string>>;
    /**
     * Retrieves a JSON object that contains simplified settings for the specified `CaptureVisionTemplate`.
     * @param templateName Specifies a `CaptureVisionTemplate` by its name.
     *
     * @returns A promise that resolves with a JSON object, of type `SimplifiedCaptureVisionSettings`, which represents the simplified settings for the specified template.
     * @remarks If the settings of the specified template are too complex, we cannot create a SimplifiedCaptureVisionSettings, and as a result, it will return an error.
     */
    getSimplifiedSettings(templateName: string): Promise<SimplifiedCaptureVisionSettings>;
    /**
     * Updates the specified `CaptureVisionTemplate` with an updated `SimplifiedCaptureVisionSettings` object.
     * @param templateName Specifies a `CaptureVisionTemplate` by its name.
     * @param settings The `SimplifiedCaptureVisionSettings` object that contains updated settings.
     *
     * @returns A promise that resolves when the operation has completed. It provides an object that describes the result.
     */
    updateSettings(templateName: string, settings: SimplifiedCaptureVisionSettings): Promise<ErrorInfo>;
    /**
     * Restores all runtime settings to their original default values.
     *
     * @returns A promise that resolves when the operation has completed. It provides an object that describes the result.
     */
    resetSettings(): Promise<ErrorInfo>;
    /**
     * Returns an object, of type `BufferedItemsManager`, that manages buffered items.
     * @returns The `BufferedItemsManager` object.
     */
    getBufferedItemsManager(): BufferedItemsManager;
    /**
     * Returns an object, of type `IntermediateResultManager`, that manages intermediate results.
     *
     * @returns The `IntermediateResultManager` object.
     */
    getIntermediateResultManager(): IntermediateResultManager;
    /**
     * Sets the global number of threads used internally for model execution.
     * @param intraOpNumThreads Number of threads used internally for model execution.
     */
    static setGlobalIntraOpNumThreads(intraOpNumThreads?: number): Promise<void>;
    checkTemplateNameValidity(templateName: string): Promise<boolean>;
    parseRequiredResources(templateName: string): Promise<{
        models: string[];
        specss: string[];
    }>;
    static disposeCvrWasm(instanceID: number): void;
    static _fr4DisposeCvrWasm: FinalizationRegistry<number>;
    /**
     * Releases all resources used by the `CaptureVisionRouter` instance.
     *
     * @returns A promise that resolves when the resources have been successfully released. It does not provide any value upon resolution.
     */
    dispose(): void;
    /**
    * For Debug
    */
    private _getInternalData;
    private _getWasmFilterState;
}

declare class CaptureVisionRouterModule {
    private static _version;
    /**
     * Returns the version of the CaptureVisionRouter module.
     */
    static getVersion(): string;
}

interface RawImageResultItem extends CapturedResultItem {
    imageData: DSImageData;
}

declare enum EnumPresetTemplate {
    /**
     * @brief Versatile function for barcode reading, document detection, or text recognition.
     */
    PT_DEFAULT = "Default",
    /**
     * @brief Scans a single barcode.
     */
    PT_READ_BARCODES = "ReadBarcodes_Default",
    /**
     * @brief Identifies and reads any text present.
     */
    PT_RECOGNIZE_TEXT_LINES = "RecognizeTextLines_Default",
    /**
     * @brief Identifies the edges of a document.
     */
    PT_DETECT_DOCUMENT_BOUNDARIES = "DetectDocumentBoundaries_Default",
    /**
     * @brief Detects document edges and standardizes its format.
     */
    PT_DETECT_AND_NORMALIZE_DOCUMENT = "DetectAndNormalizeDocument_Default",
    /**
     * @brief Adjusts a document to a standard format using detected borders.
     */
    PT_NORMALIZE_DOCUMENT = "NormalizeDocument_Default",
    /**
     * @brief Represents a barcode reading mode where speed is prioritized.
     *
     * In this mode, the barcode reader will optimize for faster barcode detection
     * and decoding, sacrificing some level of accuracy and read rate. It is suitable
     * for situations where a quick response time is more important than perfect
     * barcode recognition.
     */
    PT_READ_BARCODES_SPEED_FIRST = "ReadBarcodes_SpeedFirst",
    /**
     * @brief Represents a barcode reading mode where barcode read rate is prioritized.
     *
     * In this mode, the barcode reader will optimize for higher barcode read rates,
     * even if it may sometimes result in reduced accuracy and speed. It is suitable for
     * scenarios where maximizing the number of successfully read barcodes is critical.
     */
    PT_READ_BARCODES_READ_RATE_FIRST = "ReadBarcodes_ReadRateFirst",
    /**
     * @brief Represents a balanced barcode reading mode.
     *
     * This mode aims for a reasonable balance between speed and read rate in barcode
     * recognition. It is suitable for most common use cases where a compromise between
     * speed and read rate is acceptable.
     */
    PT_READ_BARCODES_BALANCE = "ReadBarcodes_Balance",
    /**
    * @brief Represents a barcode reading mode for single barcode code detection.
    *
    * In this mode, the barcode reader will focus on detecting and decoding a single
    * barcode code, ignoring any additional codes in the same image. It is efficient
    * when the target image has only one barcode.
    */
    PT_READ_SINGLE_BARCODE = "ReadSingleBarcode",
    /**
     * @brief Represents a barcode reading mode optimized for dense barcode codes.
     *
     * This mode is designed to handle dense or closely packed barcode codes where
     * accuracy is paramount. It may operate slower than other modes but is suitable
     * for challenging scenarios where code density is high.
     */
    PT_READ_DENSE_BARCODES = "ReadDenseBarcodes",
    /**
     * @brief Represents a barcode reading mode optimized for distant barcode codes.
     *
     * This mode is designed to scanning a barcode that is placed far from the device.
     */
    PT_READ_DISTANT_BARCODES = "ReadDistantBarcodes",
    /**
    * @brief Represents a text recognition mode focused on recognizing numbers.
    */
    PT_RECOGNIZE_NUMBERS = "RecognizeNumbers",
    /**
     * @brief Represents a text recognition mode focused on recognizing alphabetic characters (letters).
     *
     */
    PT_RECOGNIZE_LETTERS = "RecognizeLetters",
    /**
     * @brief Represents a text recognition mode that combines numbers and alphabetic characters (letters) recognition.
     */
    PT_RECOGNIZE_NUMBERS_AND_LETTERS = "RecognizeNumbersAndLetters",
    /**
     * @brief Represents a text recognition mode that combines numbers and uppercase letters recognition.
     */
    PT_RECOGNIZE_NUMBERS_AND_UPPERCASE_LETTERS = "RecognizeNumbersAndUppercaseLetters",
    /**
     * @brief Represents a text recognition mode focused on recognizing uppercase letters.
     */
    PT_RECOGNIZE_UPPERCASE_LETTERS = "RecognizeUppercaseLetters"
}

export { CaptureVisionRouter, CaptureVisionRouterModule, CapturedResultReceiver, EnumImageSourceState, EnumPresetTemplate, IntermediateResultReceiver };
export type { CapturedResult, CapturedResultFilter, ImageSourceStateListener, RawImageResultItem, SimplifiedCaptureVisionSettings };


declare class BarcodeReaderModule {
    /**
     * Returns the version of the BarcodeReader module.
     */
    static getVersion(): string;
}

declare const EnumBarcodeFormat: {
    /**No barcode format in BarcodeFormat*/
    BF_NULL: bigint;
    /**All supported formats in BarcodeFormat*/
    BF_ALL: bigint;
    /**Use the default barcode format settings*/
    BF_DEFAULT: bigint;
    /**Combined value of BF_CODABAR, BF_CODE_128, BF_CODE_39, BF_CODE_39_Extended, BF_CODE_93, BF_EAN_13, BF_EAN_8, INDUSTRIAL_25, BF_ITF, BF_UPC_A, BF_UPC_E, BF_MSI_CODE;  */
    BF_ONED: bigint;
    /**Combined value of BF_GS1_DATABAR_OMNIDIRECTIONAL, BF_GS1_DATABAR_TRUNCATED, BF_GS1_DATABAR_STACKED, BF_GS1_DATABAR_STACKED_OMNIDIRECTIONAL, BF_GS1_DATABAR_EXPANDED, BF_GS1_DATABAR_EXPANDED_STACKED, BF_GS1_DATABAR_LIMITED*/
    BF_GS1_DATABAR: bigint;
    /**Code 39 */
    BF_CODE_39: bigint;
    /**Code 128 */
    BF_CODE_128: bigint;
    /**Code 93 */
    BF_CODE_93: bigint;
    /**Codabar */
    BF_CODABAR: bigint;
    /**Interleaved 2 of 5 */
    BF_ITF: bigint;
    /**EAN-13 */
    BF_EAN_13: bigint;
    /**EAN-8 */
    BF_EAN_8: bigint;
    /**UPC-A */
    BF_UPC_A: bigint;
    /**UPC-E */
    BF_UPC_E: bigint;
    /**Industrial 2 of 5 */
    BF_INDUSTRIAL_25: bigint;
    /**CODE39 Extended */
    BF_CODE_39_EXTENDED: bigint;
    /**GS1 Databar Omnidirectional*/
    BF_GS1_DATABAR_OMNIDIRECTIONAL: bigint;
    /**GS1 Databar Truncated*/
    BF_GS1_DATABAR_TRUNCATED: bigint;
    /**GS1 Databar Stacked*/
    BF_GS1_DATABAR_STACKED: bigint;
    /**GS1 Databar Stacked Omnidirectional*/
    BF_GS1_DATABAR_STACKED_OMNIDIRECTIONAL: bigint;
    /**GS1 Databar Expanded*/
    BF_GS1_DATABAR_EXPANDED: bigint;
    /**GS1 Databar Expaned Stacked*/
    BF_GS1_DATABAR_EXPANDED_STACKED: bigint;
    /**GS1 Databar Limited*/
    BF_GS1_DATABAR_LIMITED: bigint;
    /**Patch code. */
    BF_PATCHCODE: bigint;
    /**Code 32 */
    BF_CODE_32: bigint;
    /**PDF417 */
    BF_PDF417: bigint;
    /**QRCode */
    BF_QR_CODE: bigint;
    /**DataMatrix */
    BF_DATAMATRIX: bigint;
    /**AZTEC */
    BF_AZTEC: bigint;
    /**MAXICODE */
    BF_MAXICODE: bigint;
    /**Micro QR Code*/
    BF_MICRO_QR: bigint;
    /**Micro PDF417*/
    BF_MICRO_PDF417: bigint;
    /**GS1 Composite Code*/
    BF_GS1_COMPOSITE: bigint;
    /**MSI Code*/
    BF_MSI_CODE: bigint;
    BF_CODE_11: bigint;
    BF_TWO_DIGIT_ADD_ON: bigint;
    BF_FIVE_DIGIT_ADD_ON: bigint;
    BF_MATRIX_25: bigint;
    /**Combined value of BF2_USPSINTELLIGENTMAIL, BF2_POSTNET, BF2_PLANET, BF2_AUSTRALIANPOST, BF2_RM4SCC.*/
    BF_POSTALCODE: bigint;
    /**Nonstandard barcode */
    BF_NONSTANDARD_BARCODE: bigint;
    /**USPS Intelligent Mail.*/
    BF_USPSINTELLIGENTMAIL: bigint;
    /**Postnet.*/
    BF_POSTNET: bigint;
    /**Planet.*/
    BF_PLANET: bigint;
    /**Australian Post.*/
    BF_AUSTRALIANPOST: bigint;
    /**Royal Mail 4-State Customer Barcode.*/
    BF_RM4SCC: bigint;
    /**KIX.*/
    BF_KIX: bigint;
    /**DotCode.*/
    BF_DOTCODE: bigint;
    /**_PHARMACODE_ONE_TRACK.*/
    BF_PHARMACODE_ONE_TRACK: bigint;
    /**PHARMACODE_TWO_TRACK.*/
    BF_PHARMACODE_TWO_TRACK: bigint;
    /**PHARMACODE.*/
    BF_PHARMACODE: bigint;
    /**Telepen*/
    BF_TELEPEN: bigint;
    /**Telepen Numeric. A variation of the Telepen format optimized for encoding numeric data only.*/
    BF_TELEPEN_NUMERIC: bigint;
};
type EnumBarcodeFormat = bigint;

declare enum EnumExtendedBarcodeResultType {
    /**Specifies the standard text. This means the barcode value. */
    EBRT_STANDARD_RESULT = 0,
    /**Specifies all the candidate text. This means all the standard text results decoded from the barcode. */
    EBRT_CANDIDATE_RESULT = 1,
    /**Specifies the partial text. This means part of the text result decoded from the barcode. */
    EBRT_PARTIAL_RESULT = 2
}

declare enum EnumQRCodeErrorCorrectionLevel {
    /** High error correction level, allowing for up to 30% data recovery. Suitable for environments where QR codes might be subject to significant damage. */
    QRECL_ERROR_CORRECTION_H = 0,
    /** Low error correction level, allowing for up to 7% data recovery. Optimal for scenarios where QR code integrity is less likely to be compromised. */
    QRECL_ERROR_CORRECTION_L = 1,
    /** Medium-low error correction level, allowing for up to 15% data recovery. Balances the need for data integrity with the desire to maximize data capacity. */
    QRECL_ERROR_CORRECTION_M = 2,
    /** Medium-high error correction level, allowing for up to 25% data recovery. Designed for situations where some QR code damage might be expected. */
    QRECL_ERROR_CORRECTION_Q = 3
}

declare enum EnumLocalizationMode {
    /** Automatic localization mode selection; not yet implemented. */
    LM_AUTO = 1,
    /** Identifies barcodes by finding connected blocks, offering optimal results, especially recommended for highest priority in most scenarios. */
    LM_CONNECTED_BLOCKS = 2,
    /** Detects barcodes through analysis of patterns of contiguous black and white regions, tailored for QR Codes and DataMatrix codes. */
    LM_STATISTICS = 4,
    /** Locates barcodes by identifying linear patterns, designed primarily for 1D barcodes and PDF417 codes. */
    LM_LINES = 8,
    /** Provides rapid barcode localization, suited for interactive applications where speed is crucial. */
    LM_SCAN_DIRECTLY = 16,
    /** Targets barcode localization through detection of specific mark groups, optimized for Direct Part Marking (DPM) codes. */
    LM_STATISTICS_MARKS = 32,
    /** Combines methods of locating connected blocks and linear patterns to efficiently localize postal codes. */
    LM_STATISTICS_POSTAL_CODE = 64,
    /** Initiates barcode localization from the image center, facilitating faster detection in certain layouts. */
    LM_CENTRE = 128,
    /** Specialized for quick localization of 1D barcodes, enhancing performance in fast-scan scenarios. */
    LM_ONED_FAST_SCAN = 256,
    /**Localizes barcodes by utilizing a neural network model. */
    LM_NEURAL_NETWORK = 512,
    /** Reserved for future use in localization mode settings. */
    LM_REV = -2147483648,
    /** Omits the localization process entirely. */
    LM_SKIP = 0,
    /** Placeholder value with no functional meaning. */
    LM_END = -1
}

declare enum EnumDeblurMode {
    /** Applies a direct binarization algorithm for generating the binary image. */
    DM_DIRECT_BINARIZATION = 1,
    /** Utilizes a threshold binarization algorithm for generating the binary image, dynamically determining the threshold based on the image content. */
    DM_THRESHOLD_BINARIZATION = 2,
    /** Employs a gray equalization algorithm to adjust the contrast and brightness, improving the clarity of the gray-scale image before binarization. */
    DM_GRAY_EQUALIZATION = 4,
    /** Implements a smoothing algorithm to reduce noise and artifacts, smoothing out the gray-scale image before binarization. */
    DM_SMOOTHING = 8,
    /** Uses a morphing algorithm to enhance the gray-scale image before binarization. */
    DM_MORPHING = 16,
    /** Engages in a deep analysis of the grayscale image based on the barcode format to intelligently generate the optimized binary image, tailored to complex or severely blurred images. */
    DM_DEEP_ANALYSIS = 32,
    /** Applies a sharpening algorithm to enhance the edges and details of the barcode, making it more distinguishable on the gray-scale image before binarization. */
    DM_SHARPENING = 64,
    /** Decodes the barcodes based on the binary image obtained during the localization process. */
    DM_BASED_ON_LOC_BIN = 128,
    /** Combines sharpening and smoothing algorithms for a comprehensive deblurring effect, targeting both clarity and smoothness of the gray-scale image before binarization. */
    DM_SHARPENING_SMOOTHING = 256,
    /** Performs deblur process by utilizing a neural network model. */
    DM_NEURAL_NETWORK = 512,
    /** Reserved for future use. */
    DM_REV = -2147483648,
    /** Skips the process, no deblurring is applied. */
    DM_SKIP = 0,
    /** Placeholder value with no functional meaning. */
    DM_END = -1
}

interface BarcodeDetails {
}

interface AztecDetails extends BarcodeDetails {
    /** Number of rows in the Aztec barcode. */
    rows: number;
    /** Number of columns in the Aztec barcode. */
    columns: number;
    /**
     * Indicates the layer number of the Aztec barcode. Negative values represent compact codes,
     * while positive values represent full-range codes.
     */
    layerNumber: number;
}

/**
 * Represents the Extended Channel Interpretation (ECI) information within a barcode.
 *
 * Each ECI segment specifies the character encoding used for a portion of the decoded bytes.
 * The charset names follow the IANA character set registry (e.g. "UTF-8", "ISO-8859-1").
 */
interface ECISegment {
    /** The ECI assignment number as defined by ISO/IEC 15424. */
    eciValue: number;
    /** The charset encoding name defined by IANA (e.g. "UTF-8", "ISO-8859-1"). */
    charsetEncoding: string;
    /** The start index of this ECI segment in the decoded barcode bytes. */
    startIndex: number;
    /** The length (in bytes) of this segment within the decoded barcode bytes. */
    length: number;
}

interface BarcodeResultItem extends CapturedResultItem {
    /** The format of the decoded barcode, as defined by `EnumBarcodeFormat`. */
    format: EnumBarcodeFormat;
    /** A string representation of the barcode format. */
    formatString: string;
    /** The decoded text from the barcode. */
    text: string;
    /** The raw byte data of the decoded barcode. */
    bytes: Uint8Array;
    /** The location of the barcode in the image, represented as a quadrilateral. */
    location: Quadrilateral;
    /** A confidence score for the barcode detection. */
    confidence: number;
    /** The rotation angle of the barcode in the image. */
    angle: number;
    /** The size of a single module in the barcode. */
    moduleSize: number;
    /** Additional details specific to the type of barcode detected. */
    details: BarcodeDetails;
    /** Indicates if the barcode is mirrored. */
    isMirrored: boolean;
    /** Indicates if the barcode is detected using Direct Part Marking (DPM) method. */
    isDPM: boolean;
    /** An array of ECI segments present in the barcode, if any. Each segment is represented by a `ECISegment` object. */
    eciSegments: Array<ECISegment>;
}

interface DataMatrixDetails extends BarcodeDetails {
    /** Number of rows in the Data Matrix barcode. */
    rows: number;
    /** Number of columns in the Data Matrix barcode. */
    columns: number;
    /** Number of rows in the data region of the barcode. Data regions are subdivisions of the barcode where data is stored. */
    dataRegionRows: number;
    /** Number of columns in the data region of the barcode. Data regions are subdivisions of the barcode where data is stored. */
    dataRegionColumns: number;
    /** Number of data regions in the barcode. */
    dataRegionNumber: number;
}

interface DecodedBarcodesResult extends CapturedResultBase {
    /**
     * An array of `BarcodeResultItem` objects, each representing a decoded barcode within the original image.
     */
    barcodeResultItems: Array<BarcodeResultItem>;
}

interface DecodedBarcodeElement extends RegionObjectElement {
    /** The format of the decoded barcode, as defined by `EnumBarcodeFormat`. */
    format: EnumBarcodeFormat;
    /** A string representation of the barcode format. */
    formatString: string;
    /** The decoded text from the barcode. */
    text: string;
    /** The raw byte data of the decoded barcode. */
    bytes: Uint8Array;
    /** Additional details specific to the type of barcode detected. */
    details: BarcodeDetails;
    /** Indicates if the barcode is detected using Direct Part Marking (DPM) method. */
    isDPM: boolean;
    /** Indicates if the barcode is mirrored. */
    isMirrored: boolean;
    /** The rotation angle of the barcode in the image. */
    angle: number;
    /** The size of a single module in the barcode. */
    moduleSize: number;
    /** A confidence score for the barcode detection. */
    confidence: number;
    /** Array of extended barcode results if available. */
    extendedBarcodeResults: Array<ExtendedBarcodeResult>;
    /** An array of ECI segments present in the barcode, if any. Each segment is represented by a `ECISegment` object. */
    eciSegments: Array<ECISegment>;
}

interface ExtendedBarcodeResult extends DecodedBarcodeElement {
    /** Type of the extended barcode result. */
    extendedBarcodeResultType: EnumExtendedBarcodeResultType;
    /** Deformation level of the barcode. */
    deformation: number;
    /** Clarity score of the barcode. */
    clarity: number;
    /** Image data sampled from the barcode. */
    samplingImage: DSImageData;
}

interface OneDCodeDetails extends BarcodeDetails {
    /** Start characters of the barcode in a byte array, used to identify the beginning of the barcode. */
    startCharsBytes: Array<number>;
    /** Stop characters of the barcode in a byte array, used to identify the end of the barcode.*/
    stopCharsBytes: Array<number>;
    /** Check digit characters of the barcode in a byte array, used for error detection and correction in some 1D barcodes.*/
    checkDigitBytes: Array<number>;
    /** Position range of the start pattern relative to the barcode's location. */
    startPatternRange: number;
    /** Position range of the middle pattern relative to the barcode's location. */
    middlePatternRange: number;
    /** Position range of the end pattern relative to the barcode's location. */
    endPatternRange: number;
}

interface PDF417Details extends BarcodeDetails {
    /** Number of rows in the PDF417 barcode. */
    rows: number;
    /** Number of columns in the PDF417 barcode. */
    columns: number;
    /** The error correction level of the PDF417 barcode. */
    errorCorrectionLevel: number;
    /** Indicates whether the left row indicator of the PDF417 code exists (1 means yes, 0 means no). The left row indicator is used to denote the start of a new row in the barcode. */
    hasLeftRowIndicator: boolean;
    /** Indicates whether the right row indicator of the PDF417 code exists (1 means yes, 0 means no). The right row indicator is used to denote the end of a row in the barcode. */
    hasRightRowIndicator: boolean;
    /** The codewords array of the PDF417 Code. */
    codewords: Array<number>;
}

interface QRCodeDetails extends BarcodeDetails {
    /** Number of rows in the QR Code. */
    rows: number;
    /** Number of columns in the QR Code. */
    columns: number;
    /** The error correction level of the QR Code. */
    errorCorrectionLevel: number;
    /** The version of the QR Code. */
    version: number;
    /** Number of models of the QR Code. */
    model: number;
    /** First data encoding mode used in the QR Code. */
    mode: number;
    /** Position of the particular symbol in the Structured Append format of the QR Code. */
    page: number;
    /** Total number of symbols to be concatenated in the Structured Append format. */
    totalPage: number;
    /** Parity data obtained by XORing byte by byte the ASCII/JIS values of all the original input data before division into symbol blocks. It's used for error checking and correction. */
    parityData: number;
    /** The data mask pattern of the QR Code, 0-7 for regular QR; 0-3 for micro-QR.  */
    dataMaskPattern: number;
    /** The codewords array of the QR Code. */
    codewords: Array<string>;
}

interface SimplifiedBarcodeReaderSettings {
    /** Specifies the barcode formats to be detected. */
    barcodeFormatIds: EnumBarcodeFormat;
    /** Expected number of barcodes to detect. */
    expectedBarcodesCount: number;
    /** Grayscale transformation modes to apply, enhancing detection capability. */
    grayscaleTransformationModes: Array<EnumGrayscaleTransformationMode>;
    /** Grayscale enhancement modes to apply for improving detection in challenging conditions. */
    grayscaleEnhancementModes: Array<EnumGrayscaleEnhancementMode>;
    /** Localization modes to use for detecting barcodes in various orientations or positions. */
    localizationModes: Array<number>;
    /** Deblur modes to apply for improving detection of barcodes. */
    deblurModes: Array<number>;
    /** Minimum confidence level required for a barcode to be considered successfully detected. */
    minResultConfidence: number;
    /** Minimum length of barcode text to be considered valid. */
    minBarcodeTextLength: number;
    /** Regular expression pattern that the detected barcode text must match. */
    barcodeTextRegExPattern: string;
    /** Threshold for reducing the size of large images to speed up processing. If the size of the image's shorter edge exceeds this threshold, the image may be downscaled to decrease processing time. The standard setting is 2300. */
    scaleDownThreshold: number;
}

/**
 * The `CandidateBarcodeZone` interface represents a candidate barcode zone.
 */
interface CandidateBarcodeZone {
    /** Location of the candidate barcode zone within the image. */
    location: Quadrilateral;
    /** Possible formats of the localized barcode. */
    possibleFormats: EnumBarcodeFormat;
}

/**
 * The `CandidateBarcodeZonesUnit` interface extends the `IntermediateResultUnit` interface and represents a unit of candidate barcode zones.
 */
interface CandidateBarcodeZonesUnit extends IntermediateResultUnit {
    /** Array of candidate barcode zones represented as quadrilaterals. */
    candidateBarcodeZones: Array<CandidateBarcodeZone>;
}

interface ComplementedBarcodeImageUnit extends IntermediateResultUnit {
    imageData: DSImageData;
    location: Quadrilateral;
}

interface DecodedBarcodesUnit extends IntermediateResultUnit {
    decodedBarcodes: Array<DecodedBarcodeElement>;
}

/**
 * The `DeformationResistedBarcode` interface represents a deformation-resisted barcode image.
 */
interface DeformationResistedBarcode {
    /** Image data of the deformation-resisted barcode image. */
    imageData: DSImageData;
    /** Format of the barcode, as defined by `EnumBarcodeFormat`. */
    format: EnumBarcodeFormat;
    /** Location of the deformation-resisted barcode within the image. */
    location: Quadrilateral;
}

/**
 * The `DeformationResistedBarcodeImageUnit` interface extends the `IntermediateResultUnit` interface and represents a unit that holds the deformation-resisted barcode which includes the corresponding image data, its location, and the barcode format.
 */
interface DeformationResistedBarcodeImageUnit extends IntermediateResultUnit {
    /** The deformation-resisted barcode. */
    deformationResistedBarcode: DeformationResistedBarcode;
}

interface LocalizedBarcodeElement extends RegionObjectElement {
    /** Possible formats of the localized barcode. */
    possibleFormats: EnumBarcodeFormat;
    /** String representation of the possible formats. */
    possibleFormatsString: string;
    /** The rotation angle of the localized barcode in the image. */
    angle: number;
    /** The size of a single module in the localized barcode. */
    moduleSize: number;
    /** A confidence score for the localized barcode detection. */
    confidence: number;
}

interface LocalizedBarcodesUnit extends IntermediateResultUnit {
    /** An array of `LocalizedBarcodeElement` objects, each representing a localized barcode. */
    localizedBarcodes: Array<LocalizedBarcodeElement>;
}

interface ScaledBarcodeImageUnit extends IntermediateResultUnit {
    /** Image data of the scaled barcode. */
    imageData: DSImageData;
}

export { BarcodeReaderModule, EnumBarcodeFormat, EnumDeblurMode, EnumExtendedBarcodeResultType, EnumLocalizationMode, EnumQRCodeErrorCorrectionLevel };
export type { AztecDetails, BarcodeDetails, BarcodeResultItem, CandidateBarcodeZone, CandidateBarcodeZonesUnit, ComplementedBarcodeImageUnit, DataMatrixDetails, DecodedBarcodeElement, DecodedBarcodesResult, DecodedBarcodesUnit, DeformationResistedBarcode, DeformationResistedBarcodeImageUnit, ExtendedBarcodeResult, LocalizedBarcodeElement, LocalizedBarcodesUnit, OneDCodeDetails, PDF417Details, QRCodeDetails, ScaledBarcodeImageUnit, SimplifiedBarcodeReaderSettings };


interface ParsedResultItem extends CapturedResultItem {
    /**
     * The code type of the parsed result.
     */
    codeType: string;
    /**
     * The parsed result represented as a JSON-formatted string.
     */
    jsonString: string;
    /**
     * Retrieves a list of all field names present in the parsed result.
     *  @returns An array of strings, where each string is a field name from the parsed result.
     * This method allows for dynamic access to the fields in the parsed result, enabling users to iterate through all available fields without needing to know their names in advance.
     * [NOTE]: If the field is nested, the name includes all parent fields, separated by a dot (.). The format follows this pattern: [.[....]].
     */
    getAllFieldNames(): Array<string>;
    /**
     * Retrieves the value of a specified field.
     * @param fieldName The name of the field whose value is being requested.
     *
     * @returns The value of the field.
     */
    getFieldValue(fieldName: string): string;
    /**
     * Retrieves the value of a specified field from the parsed result, without mapping process.
     * @param fieldName The name of the field whose raw value is being requested.
     *
     * @returns The raw value of the field.
     */
    getFieldRawValue(fieldName: string): string;
    /**
     * Retrieves the mapping status for a specified field name.
     * @param fieldName The name of the field whose mapping status is being queried.
     *
     * @returns The mapping status of the specified field as an EnumMappingStatus value.
     */
    getFieldMappingStatus: (fieldName: string) => EnumMappingStatus;
    /**
     * Retrieves the validation status for a specified field name.
     * @param fieldName The name of the field whose validation status is being queried.
     *
     * @returns The validation status of the specified field as an EnumValidationStatus value.
     */
    getFieldValidationStatus: (fieldName: string) => EnumValidationStatus;
}

declare class CodeParser {
    private _instanceID;
    /**
     * Initializes a new instance of the `CodeParser` class.
     *
     * @returns A promise that resolves with the initialized `CodeParser` instance.
     */
    static createInstance(): Promise<CodeParser>;
    /**
     * Releases all resources used by the `CodeParser` instance.
     *
     * @returns A promise that resolves when the resources have been successfully released. It does not provide any value upon resolution.
     */
    dispose(): Promise<void>;
    /**
     * Returns whether the `CodeParser` instance has been disposed of.
     *
     * @returns Boolean indicating whether the `CodeParser` instance has been disposed of.
     */
    protected bDestroyed: boolean;
    get disposed(): boolean;
    /**
     * Configures runtime settings using a provided JSON string.
     * @param settings A JSON string that represents the content of the settings which contain at least one `CodeParserTaskSetting` object.
     *
     * @returns A promise that resolves when the operation has completed. It does not provide any value upon resolution.
     */
    initSettings(settings: string): Promise<ErrorInfo>;
    /**
     * Restores all runtime settings to their original default values.
     *
     * @returns A promise that resolves when the operation has completed. It does not provide any value upon resolution.
     */
    resetSettings(): Promise<void>;
    /**
     * Parses a single string or a `Uint8Array` object to be human-readable.
     * @param source Specifies the string or the `Uint8Array` object.
     * @param taskSettingName [Optional] Specifies a `CodeParserTaskSetting` to use.
     *
     * @returns A promise that resolves with a `ParsedResultItem` object which contains the parsed result.
     */
    parse(source: Uint8Array | string | Array<number>, taskSettingName?: string): Promise<ParsedResultItem>;
}

declare class CodeParserModule {
    /**
     * Returns the version of the CodeParser module.
     */
    static getVersion(): string;
    /**
     * Loads the specification for a certain type of code strings.
     * @param specificationName Specifies the specification by its name.
     * @param specificationPath [Optional] Specifies the path to find the specification file. If not specified, the method will try to load the file from the path specified in `Dynamsoft.Core.CoreModule.engineResourcePaths`. For example, if the path for the "dcp" module is "https://cdn.jsdelivr.net/npm/dynamsoft-code-parser@2.0.20/dist/", then calling `Dynamsoft.DCP.CodeParserModule.loadSpec("AADHAAR")` will load the file "AADHAAR.data" from "https://cdn.jsdelivr.net/npm/dynamsoft-code-parser@2.0.20/dist/specification/AADHAAR.data".
     *
     * @returns A promise that resolves when the specification is loaded. It does not provide any value upon resolution.
     */
    static loadSpec(specificationName: string | Array<string>, specificationPath?: string): Promise<ErrorInfo>;
    /**
    * An event that repeatedly fires during the loading of specification files.
    * @param filePath Returns the path of the specification file.
    * @param tag Indicates the ongoing status of the file download. Available values are "starting", "in progress", "completed".
    * @param progress Shows the numerical progress of the download.
    */
    static onSpecLoadProgressChanged: (filePath: string, tag: "starting" | "in progress" | "completed", progress: {
        loaded: number;
        total: number;
    }) => void;
}

declare enum EnumMappingStatus {
    /**
     * Indicates that no mapping operation has been initiated.
     */
    MS_NONE = 0,
    /**
     * Indicates that the mapping operation was successfully completed.
     */
    MS_SUCCEEDED = 1,
    /**
     * Indicates that the mapping operation failed to complete.
     */
    MS_FAILED = 2
}

declare enum EnumValidationStatus {
    /**
     * Indicates that no validation has been performed.
     */
    VS_NONE = 0,
    /**
     * Indicates that the validation process was completed successfully.
     */
    VS_SUCCEEDED = 1,
    /**
     * Indicates that the validation process failed.
     */
    VS_FAILED = 2
}

declare enum EnumCodeType {
    CT_MRTD_TD1_ID = "MRTD_TD1_ID",
    CT_MRTD_TD2_ID = "MRTD_TD2_ID",
    CT_MRTD_TD2_VISA = "MRTD_TD2_VISA",
    CT_MRTD_TD3_PASSPORT = "MRTD_TD3_PASSPORT",
    CT_MRTD_TD3_VISA = "MRTD_TD3_VISA",
    CT_MRTD_TD2_FRENCH_ID = "MRTD_TD2_FRENCH_ID",
    CT_AAMVA_DL_ID = "AAMVA_DL_ID",
    CT_AAMVA_DL_ID_WITH_MAG_STRIPE = "AAMVA_DL_ID_WITH_MAG_STRIPE",
    CT_SOUTH_AFRICA_DL = "SOUTH_AFRICA_DL",
    CT_AADHAAR = "AADHAAR",
    CT_VIN = "VIN",
    CT_GS1_AI = "GS1_AI"
}

interface ParsedResult extends CapturedResultBase {
    /**
     * An array of `ParsedResultItem` objects.
     */
    parsedResultItems: Array<ParsedResultItem>;
}

export { CodeParser, CodeParserModule, EnumCodeType, EnumMappingStatus, EnumValidationStatus };
export type { ParsedResult, ParsedResultItem };


declare class DocumentNormalizerModule {
    /**
     * Returns the version of the DocumentNormalizer module.
     */
    static getVersion(): string;
}

/**
 * `EnumImageColourMode` determines the output colour mode of the normalized image.
 */
declare enum EnumImageColourMode {
    /** Output image in color mode. */
    ICM_COLOUR = 0,
    /** Output image in grayscale mode. */
    ICM_GRAYSCALE = 1,
    /** Output image in binary mode. */
    ICM_BINARY = 2
}

interface DetectedQuadResultItem extends CapturedResultItem {
    /** The location of the detected quadrilateral within the original image, represented as a quadrilateral shape. */
    location: Quadrilateral;
    /** A confidence score related to the detected quadrilateral's accuracy as a document boundary. */
    confidenceAsDocumentBoundary: number;
    /** Indicates whether the DetectedQuadResultItem has passed cross verification. */
    crossVerificationStatus: EnumCrossVerificationStatus;
}

interface DeskewedImageResultItem extends CapturedResultItem {
    /** The image data for the deskewed image result. */
    imageData: DSImageData;
    /** The location where the deskewed image was extracted from within the input image image of the deskew section, represented as a quadrilateral. */
    sourceLocation: Quadrilateral;
    /** Indicates whether the DeskewedImageResultItem has passed cross verification. */
    crossVerificationStatus: EnumCrossVerificationStatus;
    toCanvas: () => HTMLCanvasElement;
    toImage: (MIMEType: "image/png" | "image/jpeg") => HTMLImageElement;
    toBlob: (MIMEType: "image/png" | "image/jpeg") => Promise<Blob>;
}

interface EnhancedImageElement extends RegionObjectElement {
    imageData: DSImageData;
}

interface EnhancedImageResultItem extends CapturedResultItem {
    /** The image data for the enhanced image result. */
    imageData: DSImageData;
    /** Converts the enhanced image data into an HTMLCanvasElement for display or further manipulation in web applications. */
    toCanvas: () => HTMLCanvasElement;
    /** Converts the enhanced image data into an HTMLImageElement of a specified MIME type ('image/png' or 'image/jpeg'). */
    toImage: (MIMEType: "image/png" | "image/jpeg") => HTMLImageElement;
    /** Converts the enhanced image data into a Blob object of a specified MIME type ('image/png' or 'image/jpeg'). */
    toBlob: (MIMEType: "image/png" | "image/jpeg") => Promise<Blob>;
}

interface EnhancedImageUnit extends IntermediateResultUnit {
    /** An array of `EnhancedImageElement` objects, each representing a piece of the original image after enhancement. */
    enhancedImage: EnhancedImageElement;
}

interface CandidateQuadEdgesUnit extends IntermediateResultUnit {
    /** An array of candidate edges that may form quadrilaterals, identified during image processing. */
    candidateQuadEdges: Array<Edge>;
}

interface CornersUnit extends IntermediateResultUnit {
    /** An array of detected corners within the image, identified during image processing. */
    corners: Array<Corner>;
}

interface DetectedQuadElement extends RegionObjectElement {
    /** A confidence score measuring the certainty that the detected quadrilateral represents the boundary of a document. */
    confidenceAsDocumentBoundary: number;
}

interface DetectedQuadsUnit extends IntermediateResultUnit {
    /** An array of `DetectedQuadElement` objects, each representing a potential document or area of interest within the image. */
    detectedQuads: Array<DetectedQuadElement>;
}

interface LongLinesUnit extends IntermediateResultUnit {
    /** An array of long line segments detected within the image. */
    longLines: Array<LineSegment>;
}

interface LogicLinesUnit extends IntermediateResultUnit {
    /** An array of logic line segments detected within the image. */
    logicLines: Array<LineSegment>;
}

interface DeskewedImageElement extends RegionObjectElement {
    /** A quadrilateral representing the four corners of the quadrilateral used to deskew the image. */
    sourceLocation: Quadrilateral;
    imageData: DSImageData;
}

interface DeskewedImageUnit extends IntermediateResultUnit {
    /** The `DeskewedImageElement` objects representing a piece of the original image after deskewing. */
    deskewedImage: DeskewedImageElement;
}

interface ProcessedDocumentResult extends CapturedResultBase {
    /** An array of `DetectedQuadResultItem` objects, each representing a quadrilateral after document detection. */
    detectedQuadResultItems: Array<DetectedQuadResultItem>;
    /** An array of `DeskewedImageResultItem` objects, each representing a piece of the original image after deskewing. */
    deskewedImageResultItems: Array<DeskewedImageResultItem>;
    /** An array of `EnhancedImageResultItem` objects, each representing a piece of the original image after enhancement. */
    enhancedImageResultItems: Array<EnhancedImageResultItem>;
}

/**
 * The `SimplifiedDocumentNormalizerSettings` interface defines simplified settings for document detection and normalization.
 */
interface SimplifiedDocumentNormalizerSettings {
    /** Grayscale enhancement modes to apply for improving detection in challenging conditions. */
    grayscaleEnhancementModes: Array<EnumGrayscaleEnhancementMode>;
    /** Grayscale transformation modes to apply, enhancing detection capability. */
    grayscaleTransformationModes: Array<EnumGrayscaleTransformationMode>;
    /** Color mode of the anticipated normalized page */
    colourMode: EnumImageColourMode;
    /** Width and height of the anticipated normalized page. */
    pageSize: [number, number];
    /** Anticipated brightness level of the normalized image. */
    brightness: number;
    /** Anticipated contrast level of the normalized image. */
    contrast: number;
    /**
     * Threshold for reducing the size of large images to speed up processing.
     * If the size of the image's shorter edge exceeds this threshold, the image may be downscaled to decrease processing time. The standard setting is 2300.
     */
    scaleDownThreshold: number;
    /** The minimum ratio between the target document area and the total image area. Only those exceedingthis value will be output (measured in percentages).*/
    minQuadrilateralAreaRatio: number;
    /** The number of documents expected to be detected.*/
    expectedDocumentsCount: number;
}

export { DocumentNormalizerModule, EnumImageColourMode };
export type { CandidateQuadEdgesUnit, CornersUnit, DeskewedImageElement, DeskewedImageResultItem, DeskewedImageUnit, DetectedQuadElement, DetectedQuadResultItem, DetectedQuadsUnit, EnhancedImageElement, EnhancedImageResultItem, EnhancedImageUnit, LogicLinesUnit, LongLinesUnit, ProcessedDocumentResult, SimplifiedDocumentNormalizerSettings };

declare class ImageProcessingModule {
    /**
     * Returns the version of the image processing module.
     */
    static getVersion(): string;
}

export { ImageProcessingModule };


declare class LabelRecognizerModule {
    #private;
    /**
     * An event that repeatedly fires during the loading of a recognition data file (.data).
     * @param filePath Returns the path of the recognition data file.
     * @param tag Indicates the ongoing status of the file download. Available values are "starting", "in progress", "completed".
     * @param progress Shows the numerical progress of the download.
     */
    static onDataLoadProgressChanged: (filePath: string, tag: "starting" | "in progress" | "completed", progress: {
        loaded: number;
        total: number;
    }) => void;
    /**
     * Returns the version of the LabelRecognizer module.
     */
    static getVersion(): string;
    /**
     * Loads a specific data file containing confusable characters information.
     * @param dataName The name of the recognition data to load.
     * @param dataPath specifies the path to find the data file. If not specified, the default path points to the package “dynamsoft-capture-vision-data”.
     */
    static loadConfusableCharsData(dataName: string, dataPath?: string): Promise<ErrorInfo>;
    /**
     * Loads a specific data file containing overlapping characters information.
     * @param dataName The name of the recognition data to load.
     * @param dataPath specifies the path to find the data file. If not specified, the default path points to the package “dynamsoft-capture-vision-data”.
     */
    static loadOverlappingCharsData(dataName: string, dataPath?: string): Promise<ErrorInfo>;
}

interface CharacterResult {
    /** The highest confidence character recognized. */
    characterH: string;
    /** The medium confidence character recognized. */
    characterM: string;
    /** The lowest confidence character recognized. */
    characterL: string;
    /** Confidence score for the highest confidence character. */
    characterHConfidence: number;
    /** Confidence score for the medium confidence character. */
    characterMConfidence: number;
    /** Confidence score for the lowest confidence character. */
    characterLConfidence: number;
    /** The location of the recognized character within the image. */
    location: Quadrilateral;
}

interface TextLineResultItem extends CapturedResultItem {
    /** The recognized text of the line. */
    text: string;
    /** The location of the text line within the image. */
    location: Quadrilateral;
    /** Confidence score for the recognized text line. */
    confidence: number;
    /** Results for individual characters within the text line. */
    characterResults: Array<CharacterResult>;
    /** The name of the TextLineSpecification object that generated this TextLineResultItem. */
    specificationName: string;
    /** The recognized raw text of the line. */
    rawText: string;
}

declare function filterVINResult(vinItem: TextLineResultItem): string;
/**
 * check if the vin code is valid
 * @ignore
 */
declare function checkValidVIN(code: string): boolean;
/**
 * check if the second row of passport mrz code is valid.
 * check digit only exits in second row in passport mrz.
 * @ignore
 */
declare function checkValidMRP(code: string): boolean;
/**
 * check if the second row of visa mrz code is valid.
 * check digit only exits in second row in visa mrz.
 * @ignore
 */
declare function checkValidMRV(code: string): boolean;
/**
 * check if the two row or third row of id card mrz code is valid.
 * check digit only exits in two row or third row in id card mrz.
 * @ignore
 */
declare function checkValidIDCard(code: string, codeUpperLine?: string): boolean;
declare const utilsFuncs: {
    filterVINResult: typeof filterVINResult;
    checkValidVIN: typeof checkValidVIN;
    checkValidMRP: typeof checkValidMRP;
    checkValidMRV: typeof checkValidMRV;
    checkValidIDCard: typeof checkValidIDCard;
};

/**
 * Enumerates the status of a raw text line.
 */
declare enum EnumRawTextLineStatus {
    /** Localized but recognition not performed. */
    RTLS_LOCALIZED = 0,
    /** Recognition failed. */
    RTLS_RECOGNITION_FAILED = 1,
    /** Successfully recognized. */
    RTLS_RECOGNITION_SUCCEEDED = 2
}

interface LocalizedTextLineElement extends RegionObjectElement {
    /** Quadrilaterals for each character in the text line. */
    characterQuads: Array<Quadrilateral>;
    /** The row number of the text line, starting from 1. */
    rowNumber: number;
}

interface LocalizedTextLinesUnit extends IntermediateResultUnit {
    /** An array of `LocalizedTextLineElement` objects, each representing a localized text line. */
    localizedTextLines: Array<LocalizedTextLineElement>;
    /** An array of `AuxiliaryRegionElement` objects, each representing an auxiliary region. */
    auxiliaryRegionElements: Array<AuxiliaryRegionElement>;
}

interface RecognizedTextLineElement extends RegionObjectElement {
    /** The recognized text of the line. */
    text: string;
    /** Confidence score for the recognized text line. */
    confidence: number;
    /** Results for individual characters within the text line. */
    characterResults: Array<CharacterResult>;
    /** The row number of the text line, starting from 1. */
    rowNumber: number;
    /** The name of the TextLineSpecification object that generated this RecognizedTextLineElement. */
    specificationName: string;
    /** The recognized raw text of the line. */
    rawText: string;
}

interface RecognizedTextLinesResult extends CapturedResultBase {
    /**
     * An array of `TextLineResultItem` objects, each representing a recognized text line within the original image.
     */
    textLineResultItems: Array<TextLineResultItem>;
}

interface SimplifiedLabelRecognizerSettings {
    /** Name of the character model used for recognition. */
    characterModelName: string;
    /** Regular expression pattern for validating recognized line strings. */
    lineStringRegExPattern: string;
    /** Grayscale transformation modes to apply, enhancing detection capability. */
    grayscaleTransformationModes: Array<EnumGrayscaleTransformationMode>;
    /** Grayscale enhancement modes to apply for improving detection in challenging conditions. */
    grayscaleEnhancementModes: Array<EnumGrayscaleEnhancementMode>;
    /**
     * Threshold for reducing the size of large images to speed up processing. If the size of the image's shorter edge exceeds this threshold, the image may be downscaled to decrease processing time. The standard setting is 2300. */
    scaleDownThreshold: number;
}

interface BufferedCharacterItem {
    /** The buffered character value. */
    character: string;
    /** The image data of the buffered character. */
    imageData: DSImageData;
    /**  An array of features, each feature object contains feature id and value of the buffered character.*/
    features: Array<{
        id: number;
        value: number;
    }>;
}

interface CharacterCluster {
    /** The character value of the cluster. */
    character: string;
    /** The mean of the cluster. */
    mean: BufferedCharacterItem;
}

interface BufferedCharacterItemSet {
    /** An array of BufferedCharacterItem. */
    items: Array<BufferedCharacterItem>;
    /** An array of CharacterCluster. */
    characterClusters: Array<CharacterCluster>;
}

/**
 * The `RawTextLine` represents a text line in an image. It can be in one of the following states:
 * - `TLS_LOCALIZED`: Localized but recognition not performed.
 * - `TLS_RECOGNITION_FAILED`: Recognition failed.
 * - `TLS_RECOGNIZED_SUCCESSFULLY`: Successfully recognized.
 */
interface RawTextLine {
    /** The recognized text of the line. */
    text: string;
    /** Confidence score for the recognized text line. */
    confidence: number;
    /** Results for individual characters within the text line. */
    characterResults: Array<CharacterResult>;
    /** The row number of the text line, starting from 1. */
    rowNumber: number;
    /** The predefined specification name of this text line*/
    specificationName: string;
    /** The location of the text line */
    location: Quadrilateral;
    /** The status of a raw text line.*/
    status: EnumRawTextLineStatus;
}

interface RawTextLinesUnit extends IntermediateResultUnit {
    /** An array of RawTextLine. */
    rawTextlines: Array<RawTextLine>;
}

interface RecognizedTextLinesUnit extends IntermediateResultUnit {
    recognizedTextLines: Array<RecognizedTextLineElement>;
}

export { EnumRawTextLineStatus, LabelRecognizerModule, utilsFuncs };
export type { BufferedCharacterItem, BufferedCharacterItemSet, CharacterCluster, CharacterResult, LocalizedTextLineElement, LocalizedTextLinesUnit, RawTextLine, RawTextLinesUnit, RecognizedTextLineElement, RecognizedTextLinesResult, RecognizedTextLinesUnit, SimplifiedLabelRecognizerSettings, TextLineResultItem };

declare class LicenseModule {
    /**
     * Returns the version of the License module.
     */
    static getVersion(): string;
}

declare class LicenseManager {
    private static setLicenseServer;
    static _pLoad: any;
    static bPassValidation: boolean;
    static bCallInitLicense: boolean;
    private static _license;
    static get license(): string;
    static set license(license: string);
    /**
     * Specify the license server URL.
    */
    private static _licenseServer?;
    static get licenseServer(): string[] | string;
    static set licenseServer(value: string[] | string);
    private static _deviceFriendlyName;
    static get deviceFriendlyName(): string;
    static set deviceFriendlyName(value: string);
    /**
     * License the components.
     * @param license the license key to be used.
     * @remarks - for an online license, LicenseManager asks DLS for the license associated with the 'license' key and gets all usable modules
                - for an offline license, LicenseManager parses it to get a list of usable modules
     * @returns a promise resolving to true or false to indicate whether the license was initialized successfully.
    */
    static initLicense(license: string, options?: {
        executeNow: boolean;
    } | boolean): Promise<void>;
    /**
     * The following methods should be called before `initLicense`.
     */
    static setDeviceFriendlyName(name: string): void;
    static getDeviceFriendlyName(): string;
    /**
     * Returns the unique identifier of the device.
     *
     * @returns A promise which, upon resolution, yields a string corresponding to the device's UUID.
     */
    static getDeviceUUID(): Promise<string>;
    static _e: boolean;
}

interface InitConfig {
    pk: string;
    dm: string;
    bd?: boolean;
    trial?: boolean;
    msg?: string;
    mli?: any;
    om?: any;
    ic?: any;
    mlo?: any;
    pv?: any;
}

export { LicenseManager, LicenseModule };
export type { InitConfig };




declare class UtilityModule {
    /**
     * Returns the version of the Utility module.
     */
    static getVersion(): string;
}

type CEdge = [Point, Point];
type CQuadrilateral = Quadrilateral & {
    area: number;
};
type CBarcodeResultItem = BarcodeResultItem & {
    location: CQuadrilateral;
};
interface CDecodedBarcodeElement extends DecodedBarcodeElement {
    location: CQuadrilateral;
}
interface CLocalizedBarcodeElement extends LocalizedBarcodeElement {
    location: CQuadrilateral;
}
type resultItemTypeString = "barcode" | "text_line" | "detected_quad" | "deskewed_image";
type CrossVerificationCriteria = {
    frameWindow: number;
    minConsistentFrames: number;
};
type CapturedResultMap<T> = {
    [K in EnumCapturedResultItemType]?: T;
};

declare class MultiFrameResultCrossFilter implements CapturedResultFilter {
    #private;
    constructor();
    verificationEnabled: CapturedResultMap<boolean>;
    duplicateFilterEnabled: CapturedResultMap<boolean>;
    duplicateForgetTime: CapturedResultMap<number>;
    crossVerificationCriteria: CapturedResultMap<CrossVerificationCriteria>;
    private _dynamsoft;
    /**
     * Enables or disables the verification of one or multiple specific result item types.
     * @param resultItemType Specifies one or multiple specific result item types, which can be defined using EnumCapturedResultItemType or a string. If using a string, only one type can be specified, and valid values include "barcode", "text_line", "detected_quad", and "deskewed_image".
     * @param enabled Boolean to toggle verification on or off.
     */
    enableResultCrossVerification(resultItemType: EnumCapturedResultItemType | resultItemTypeString, enabled?: boolean): void;
    /**
     * Checks if verification is active for a given result item type.
     * @param resultItemType Specifies the result item type, either with EnumCapturedResultItemType or a string. When using a string, the valid values include "barcode", "text_line", "detected_quad", and "deskewed_image".
     * @returns Boolean indicating the status of verification for the specified type.
     */
    isResultCrossVerificationEnabled(resultItemType: EnumCapturedResultItemType | resultItemTypeString): boolean;
    /**
     * Enables or disables the deduplication process for one or multiple specific result item types.
     * @param resultItemType Specifies one or multiple specific result item types, which can be defined using EnumCapturedResultItemType or a string. If using a string, only one type can be specified, and valid values include "barcode", "text_line", "detected_quad", and "deskewed_image".
     * @param enabled Boolean to toggle deduplication on or off.
     */
    enableResultDeduplication(resultItemType: EnumCapturedResultItemType | resultItemTypeString, enabled?: boolean): void;
    /**
     * Checks if deduplication is active for a given result item type.
     * @param resultItemType Specifies the result item type, either with EnumCapturedResultItemType or a string. When using a string, the valid values include "barcode", "text_line", "detected_quad", and "deskewed_image".
     * @returns Boolean indicating the deduplication status for the specified type.
     */
    isResultDeduplicationEnabled(resultItemType: EnumCapturedResultItemType | resultItemTypeString): boolean;
    /**
     * Sets the interval during which duplicates are disregarded for specific result item types.
     * @param resultItemType Specifies one or multiple specific result item types, which can be defined using EnumCapturedResultItemType or a string. If using a string, only one type can be specified, and valid values include "barcode", "text_line", "detected_quad", and "deskewed_image".
     * @param time Time in milliseconds during which duplicates are disregarded.
     */
    setDuplicateForgetTime(resultItemType: EnumCapturedResultItemType | resultItemTypeString, time: number): void;
    /**
     * Retrieves the interval during which duplicates are disregarded for a given result item type.
     * @param resultItemType Specifies the result item type, either with EnumCapturedResultItemType or a string. When using a string, the valid values include "barcode", "text_line", "detected_quad", and "deskewed_image".
     * @returns The set interval for the specified item type.
     */
    getDuplicateForgetTime(resultItemType: EnumCapturedResultItemType | resultItemTypeString): number;
    getFilteredResultItemTypes(): number;
    /**
     * Sets the cross-verification criteria for one or more result item types.
     * This configuration determines how many frames are considered
     * and the minimum number of consistent frames required before a result is accepted.
     *
     * @param resultItemType Specifies one or multiple specific result item types.
     * It can be defined using `EnumCapturedResultItemType` or a string.
     * When using a string, only one type can be specified, and valid values include:
     * `"barcode"`, `"text_line"`, `"detected_quad"`, and `"deskewed_image"`.
     *
     * @param frameWindow The number of consecutive frames considered for verification.
     * @param minConsistentFrames The minimum number of consistent frames required
     * for a result to be considered valid.
     */
    setResultCrossVerificationCriteria(resultItemType: EnumCapturedResultItemType | resultItemTypeString, frameWindow: number, minConsistentFrames: number): void;
    /**
     * Retrieves the cross-verification criteria for a specified result item type.
     * Returns the configured frame window and consistency requirement.
     *
     * @param resultItemType Specifies the result item type,
     * either with `EnumCapturedResultItemType` or a string.
     * When using a string, valid values include:
     * `"barcode"`, `"text_line"`, `"detected_quad"`, and `"deskewed_image"`.
     *
     * @returns An object containing:
     * - `frameWindow`: number — the number of consecutive frames considered.
     * - `minConsistentFrames`: number — the minimum consistent frames required.
     */
    getResultCrossVerificationCriteria(resultItemType: EnumCapturedResultItemType | resultItemTypeString): CrossVerificationCriteria;
    private overlapSet;
    private stabilityCount;
    private crossVerificationFrames;
    private latestOverlappingEnabled;
    private maxOverlappingFrames;
    /**
     * Enables or disables the deduplication process for one or multiple specific result item types.
     * @param resultItemType Specifies one or multiple specific result item types, which can be defined using EnumCapturedResultItemType or a string. If using a string, only one type can be specified, and valid values include "barcode", "text_line", "detected_quad", and "deskewed_image".
     * @param enabled Boolean to toggle deduplication on or off.
     */
    enableLatestOverlapping(resultItemType: EnumCapturedResultItemType | resultItemTypeString, enabled?: boolean): void;
    /**
     * Checks if deduplication is active for a given result item type.
     * @param resultItemType Specifies the result item type, either with EnumCapturedResultItemType or a string. When using a string, the valid values include "barcode", "text_line", "detected_quad", and "deskewed_image".
     *
     * @returns Boolean indicating the deduplication status for the specified type.
     */
    isLatestOverlappingEnabled(resultItemType: EnumCapturedResultItemType | resultItemTypeString): boolean;
    /**
     * Set the max referencing frames count for the to-the-latest overlapping feature.
     *
     * @param resultItemType Specifies the result item type, either with EnumCapturedResultItemType or a string. When using a string, the valid values include "barcode", "text_line", "detected_quad", and "deskewed_image".
     * @param maxOverlappingFrames The max referencing frames count for the to-the-latest overlapping feature.
     */
    setMaxOverlappingFrames(resultItemType: EnumCapturedResultItemType | resultItemTypeString, maxOverlappingFrames: number): void;
    /**
     * Get the max referencing frames count for the to-the-latest overlapping feature.
     * @param resultItemType Specifies the result item type, either with EnumCapturedResultItemType or a string. When using a string, the valid values include "barcode", "text_line", "detected_quad", and "deskewed_image".
     * @return Returns the max referencing frames count for the to-the-latest overlapping feature.
     */
    getMaxOverlappingFrames(resultItemType: EnumCapturedResultItemType): number;
    latestOverlappingFilter(result: any): void;
}

declare class ImageIO {
    #private;
    /**
     * This method reads an image from a file. The file format is automatically detected based on the file extensioor content.
     *
     * @param file The file to read, as a Blob object.
     *
     * @returns A promise that resolves with the loaded image of type `DSImageData`.
     */
    static readFromFile(file: Blob | string): Promise<DSImageData>;
    /**
     * This method saves an image in either PNG or JPG format. The desired file format is inferred from the filextension provided in the 'name' parameter. Should the specified file format be omitted or unsupported, thdata will default to being exported in PNG format.
     *
     * @param image The image to be saved, of type `DSImageData`.
     * @param name The name of the file, as a string, under which the image will be saved.
     * @param download An optional boolean flag that, when set to true, triggers the download of the file.
     *
     * @returns A promise that resolves with the saved File object.
     */
    static saveToFile(image: DSImageData, name: string, download?: boolean): Promise<File>;
    /**
     * Reads image data from memory using the specified ID.
     *
     * @param id - The memory ID referencing a previously stored image.
     *
     * @returns A Promise that resolves to the `DSImageData` object.
     */
    static readFromMemory(id: number): Promise<DSImageData>;
    /**
     * This method saves an image to memory. The desired file format is inferred from the 'format' parameter. Should the specified file format be omitted or unsupported, the data will default to being exported in PNG format.
     *
     * @param image The image to be saved, of type `DSImageData`.
     * @param format The desired image format.
     *
     * @returns A promise that resolves with an object containing the image data as a Uint8Array and the file format.
     */
    static saveToMemory(image: Blob, fileFormat?: string): Promise<number>;
    /**
     * This method reads an image from a Base64-encoded string. The image format is automatically detected based on the content of the string.
     *
     * @param base64String The Base64-encoded string representing the image.
     *
     * @returns A promise that resolves with the loaded image of type `DSImageData`.
     */
    static readFromBase64String(base64String: string): Promise<DSImageData>;
    /**
     * This method saves an image to a Base64-encoded string. The desired file format is inferred from the 'format' parameter. Should the specified file format be omitted or unsupported, the data will default to being exported in PNG format.
     *
     * @param image The image to be saved, of type `Blob`.
     * @param format The desired image format.
     *
     * @returns A promise that resolves with a Base64-encoded string representing the image.
     */
    static saveToBase64String(image: Blob | DSImageData, fileFormat?: string): Promise<string>;
}

declare class ImageDrawer {
    /**
     * This method draws various shapes on an image, and save it in PNG format.
     *
     * @param image The image to be saved.
     * @param drawingItem An array of different shapes to draw on the image.
     * @param type The type of drawing shapes.
     * @param color The color to use for drawing. Defaults to 0xFFFF0000 (red).
     * @param thickness The thickness of the lines to draw. Defaults to 1.
     * @param download An optional boolean flag that, when set to true, triggers the download of the file.
     *
     * @returns A promise that resolves with the saved File object.
     */
    static drawOnImage(image: Blob | string | DSImageData, drawingItem: Array<Quadrilateral> | Quadrilateral | Array<LineSegment> | LineSegment | Array<Contour> | Contour | Array<Corner> | Corner | Array<Edge> | Edge, type: "quads" | "lines" | "contours" | "corners" | "edges", color?: number, thickness?: number, name?: string, download?: boolean): Promise<DSImageData>;
}

declare enum EnumFilterType {
    /**High-pass filter: Enhances edges and fine details by attenuating low-frequency components.*/
    FT_HIGH_PASS = 0,
    /**Sharpen filter: Increases contrast along edges to make the image appear more defined.*/
    FT_SHARPEN = 1,
    /**Smooth (blur) filter: Reduces noise and detail by averaging pixel values, creating a softening effect.*/
    FT_SMOOTH = 2
}

declare class ImageProcessor {
    /**
     * Crops an image using a rectangle or quadrilateral.
     * @param image The image data to be cropped.
     * @param roi The rectangle or quadrilateral to be cropped.
     *
     * @returns A promise that resolves with the cropped image data.
     */
    static cropImage(image: Blob | DSImageData, roi: DSRect): Promise<DSImageData>;
    /**
     * Adjusts the brightness of the image.
     * @param image The image data to be adjusted.
     * @param brightness Brightness adjustment value (range: [-100, 100]).
     *
     * @returns A promise that resolves with the adjusted image data.
     */
    static adjustBrightness(image: Blob | DSImageData, brightness: number): Promise<DSImageData>;
    /**
     * Adjusts the contrast of the image.
     * @param image The image data to be adjusted.
     * @param contrast Contrast adjustment value (range: [-100, 100]).
     *
     * @returns A promise that resolves with the adjusted image data.
     */
    static adjustContrast(image: Blob | DSImageData, contrast: number): Promise<DSImageData>;
    /**
     * Applies a specified image filter to an input image.
     * @param image The image data to be filtered.
     * @param filterType The type of filter to apply.
     * @returns A promise that resolves with the filtered image data.
     */
    static filterImage(image: Blob | DSImageData, filterType: EnumFilterType): Promise<DSImageData>;
    /**
     * Converts a colour image to grayscale.
     * @param image The image data to be converted.
     * @param R [R=0.3] - Weight for the red channel.
     * @param G [G=0.59] - Weight for the green channel.
     * @param B [B=0.11] - Weight for the blue channel.
     * @returns A promise that resolves with the grayscale image data.
     */
    static convertToGray(image: Blob | DSImageData, R?: number, G?: number, B?: number): Promise<DSImageData>;
    /**
     * Converts an image to a binary image using a global threshold.
     * @param image The image data (grayscale, color, or binary).
     * @param threshold [threshold=-1] Global threshold for binarization (-1 for automatic calculation).
     * @param invert [invert=false] Whether to invert the binary image.
     * @returns A promise that resolves with the binary image data.
     */
    static convertToBinaryGlobal(image: Blob | DSImageData, threshold?: number, invert?: boolean): Promise<DSImageData>;
    /**
     * Converts a grayscale image to a binary image using local (adaptive) binarization.
     * @param image The grayscale image data.
     * @param blockSize [blockSize=0] Size of the block for local binarization.
     * @param compensation [compensation=10] Adjustment value to modify the threshold.
     * @param invert [invert=false] Whether to invert the binary image.
     * @returns A promise that resolves with the binary image data.
     */
    static convertToBinaryLocal(image: Blob | DSImageData, blockSize?: number, compensation?: number, invert?: boolean): Promise<DSImageData>;
    /**
     * Crops and deskews an image using a quadrilateral.
     * @param image The image data to be cropped and deskewed.
     * @param roi The quadrilateral defining the region of interest to be cropped and deskewed.
     *
     * @returns A promise that resolves with the cropped and deskewed image data.
     */
    static cropAndDeskewImage(image: Blob | DSImageData, roi: Quadrilateral, dstWidth?: number, dstHeight?: number, padding?: number): Promise<DSImageData>;
}

/**
 * Strategy for the layout engine to organize quadrilaterals.
 */
declare enum EnumLayoutPattern {
    LP_UNKNOWN = 0,// Algorithm automatically detects the best layout pattern.
    LP_LINES = 1,// Elements are organized into sequential lines (rows or columns).
    LP_MATRIX = 2
}

/**
 * Configuration for a specific orientation axis.
 * Axis 0 is primary, axis 1 is secondary.
 */
interface LayoutAxis {
    /** Expected number of elements along this axis. -1 means auto-detect. */
    elementCount: number;
    /** Whether the layout uses an offset / staggered pattern. */
    isStaggered: boolean;
    /** Target angle in [0, 180]. -1 means auto-detect. */
    angle: number;
    /** Whether equal spacing is enforced along this axis. */
    isEqualSpacing: boolean;
    /**
     * Spacing between elements along this axis.
     * -1 means auto-detect.
     */
    spacing: number;
    /** Interpretation of the spacing value. */
    spacingUnit: EnumMeasureUnit;
}

/**
 * Input parameters to guide layout analysis.
 */
interface LayoutAnalysisParameter {
    /** Desired layout pattern. LP_UNKNOWN means auto-detect. */
    pattern: EnumLayoutPattern;
    /** Configuration for primary and secondary axes. */
    axes: [LayoutAxis, LayoutAxis];
    /**
     * Width of the source image in pixels.
     * 0 means no boundary check.
     */
    inputImageWidth: number;
    /**
     * Height of the source image in pixels.
     * 0 means no boundary check.
     */
    inputImageHeight: number;
}

/**
 * Origin of the element.
 */
declare enum EnumLayoutElementSource {
    LES_NONE = 0,// No element exists at this logical grid position (used for alignment in non-uniform rows).
    LES_INPUT = 1,// Element is provided from the original input array.
    LES_INFERRED = 2
}

/**
 * Represents an element in the analyzed layout.
 */
interface LayoutElement {
    /** Geometric coordinates of the element. */
    quad: Quadrilateral;
    /** Origin of this element. */
    source: EnumLayoutElementSource;
}

/**
 * Comprehensive results of layout analysis.
 */
interface LayoutAnalysisResult {
    /** Newly generated quadrilaterals. */
    inferredQuads: Array<Quadrilateral>;
    /** Number of rows in the logical grid. */
    rowCount: number;
    /** Maximum number of columns across all rows. */
    colCount: number;
    /**
     * 2D layout grid.
     * In line mode, shorter rows can be padded with LES_NONE elements.
     */
    elements: Array<Array<LayoutElement>>;
    /** Actual layout pattern detected by the engine. */
    detectedPattern: EnumLayoutPattern;
    /**
      * Error information.
      * errorCode indicates the execution result.
      * errorString provides a human-readable description.
      * For successful execution, errorCode should be 0 and
      * errorString may be empty.
      */
    errorInfo: ErrorInfo;
}

/**
 * High-performance layout analysis engine.
 */
declare class LayoutAnalyzer {
    /**
     * Performs layout analysis on the input quadrilaterals.
     *
     * @param inputQuads Input quadrilaterals.
     * @param parameter Optional analysis constraints.
     * @returns A promise that resolves with the analysis result.
     */
    static analyze(inputQuads: Array<Quadrilateral>, parameter?: LayoutAnalysisParameter): Promise<LayoutAnalysisResult>;
}

export { EnumFilterType, EnumLayoutElementSource, EnumLayoutPattern, ImageDrawer, ImageIO, ImageProcessor, LayoutAnalyzer, MultiFrameResultCrossFilter, UtilityModule };
export type { CBarcodeResultItem, CDecodedBarcodeElement, CEdge, CLocalizedBarcodeElement, CQuadrilateral, CapturedResultMap, CrossVerificationCriteria, LayoutAnalysisParameter, LayoutAnalysisResult, LayoutAxis, LayoutElement, resultItemTypeString };





















declare enum EnumScanMode {
    SM_SINGLE = 0,
    SM_MULTI_UNIQUE = 1
}
declare enum EnumResultStatus {
    RS_SUCCESS = 0,
    RS_CANCELLED = 1,
    RS_FAILED = 2
}

type CacheKeys = "dceUI" | "dbsUI" | "presetTemplates" | "templateFile";
type CameraSwitchControlMode = "hidden" | "listAll" | "toggleFrontBack";
type PathConfig = {
    path: string;
    reloadResource?: boolean;
};
declare function isPathConfig(obj: any): obj is PathConfig;
interface ScannerViewConfig {
    container?: HTMLElement | string;
    showCloseButton?: boolean;
    mirrorFrontCamera?: boolean;
    cameraSwitchControl?: CameraSwitchControlMode;
    showFlashButton?: boolean;
    customHighlightForBarcode?: (result: BarcodeResultItem) => QuadDrawingItem;
}
interface BarcodeResultViewToolbarButtonsConfig {
    clear?: ToolbarButtonConfig;
    done?: ToolbarButtonConfig;
}
interface ResultViewConfig {
    container?: HTMLElement | string;
    toolbarButtonsConfig?: BarcodeResultViewToolbarButtonsConfig;
}
interface BarcodeScannerConfig {
    license?: string;
    scanMode?: EnumScanMode;
    templateFilePath?: string | PathConfig;
    utilizedTemplateNames?: UtilizedTemplateNames;
    engineResourcePaths?: EngineResourcePaths;
    barcodeFormats?: Array<EnumBarcodeFormat> | EnumBarcodeFormat;
    duplicateForgetTime?: number;
    container?: HTMLElement | string;
    showResultView?: boolean;
    showUploadImageButton?: boolean;
    showPoweredByDynamsoft?: boolean;
    autoStartCapturing?: boolean;
    scannerViewConfig?: ScannerViewConfig;
    resultViewConfig?: ResultViewConfig;
    uiPath?: string | PathConfig;
    onUniqueBarcodeScanned?: (result: BarcodeResultItem) => void | Promise<void>;
    onInitPrepare?: () => void;
    onInitReady?: (components: {
        cameraView: CameraView;
        cameraEnhancer: CameraEnhancer;
        cvRouter: CaptureVisionRouter;
    }) => void;
    onCameraOpen?: (components: {
        cameraView: CameraView;
        cameraEnhancer: CameraEnhancer;
        cvRouter: CaptureVisionRouter;
    }) => void;
    onCaptureStart?: (components: {
        cameraView: CameraView;
        cameraEnhancer: CameraEnhancer;
        cvRouter: CaptureVisionRouter;
    }) => void;
    onCameraOpenFailed?: (ex: Error) => void;
}

type ResultStatus = {
    code: EnumResultStatus;
    message: string;
};
interface ToolbarButtonConfig {
    label?: string;
    className?: string;
    isHidden?: boolean;
}
interface BarcodeScanResult {
    status: ResultStatus;
    barcodeResults: Array<BarcodeResultItem>;
    originalImageResult?: DSImageData;
    barcodeImage?: DSImageData;
}
interface UtilizedTemplateNames {
    single?: string;
    multi_unique?: string;
    image?: string;
}

declare class BarcodeScanner {
    #private;
    private _cameraEnhancer;
    private _cameraView;
    private _cvRouter;
    config: BarcodeScannerConfig;
    constructor(config?: BarcodeScannerConfig);
    get disposed(): boolean;
    launch(): Promise<BarcodeScanResult>;
    decode(imageOrFile: Blob | string | DSImageData | HTMLImageElement | HTMLVideoElement | HTMLCanvasElement, templateName?: string): Promise<CapturedResult>;
    dispose(): void;
}

export { BarcodeScanner, EnumResultStatus, EnumScanMode, isPathConfig };
export type { BarcodeScanResult, BarcodeScannerConfig, CacheKeys, ResultStatus, ToolbarButtonConfig, UtilizedTemplateNames };
interface CameraInfo extends InputDeviceInfo {
    trackLabel: string;
    capabilities: DMMoreMediaTrackCapabilities;
    isFront: boolean;
}
interface DMMoreMediaTrackCapabilities extends MediaTrackCapabilities {
    focusMode?: ('continuous' | 'single-shot' | 'manual')[];
    focusDistance?: {
        max?: number;
        min: number;
    };
    zoom?: {
        max: number;
        min: number;
    };
    torch?: true;
}
type CameraZsFunc = (this: Camera, ...argArray: any[]) => void | any;
interface Camera {
    /**
     * The `opened` event is triggered when the camera `open()` from the `paused`/`closed`
     * or when call `requestResolution()` and camera is `opened`.
     */
    addEventListener(type: 'opened', listener: (this: Camera) => void | any): void;
    removeEventListener(type: 'opened', listener: (this: Camera) => void | any): void;
    /** The `closed` event is triggered when camera is `closed`. */
    addEventListener(type: 'closed', listener: (this: Camera) => void | any): void;
    removeEventListener(type: 'closed', listener: (this: Camera) => void | any): void;
}
declare class Camera {
    static _cameraNameMatcher: string[][];
    static _currentOpenedCamera: Camera | null;
    static _mapDeviceInfo: {
        [deviceId: string]: CameraInfo;
    };
    _coreShell: HTMLElement;
    _video: HTMLVideoElement;
    _coreInnerLayer: HTMLElement;
    _coreOuterLayer: HTMLElement;
    _regionBoxWrapper?: HTMLElement | null;
    _regionBoxMask?: HTMLElement | null;
    _regionBoxBorder?: HTMLElement | null;
    _objectFit: 'contain' | 'cover' | 'fill';
    _uiInlineScript2Blob: boolean;
    _uiInternalCss2Blob: boolean;
    _uiInternalCss2ExistedSheet: boolean;
    _ui?: HTMLElement;
    _pOpen?: (Promise<void> & {
        isPending: boolean;
        resolve: () => void;
        reject: () => void;
    }) | null;
    _getUserMediaTimeout: number;
    _paused: boolean;
    _shouldClose: boolean;
    _cameraChangedWhenPaused: boolean;
    _requestedCamera: CameraPreset | MediaTrackConstraints | null;
    _requestedResolution: MediaTrackConstraints | null;
    _regionBox: {
        width?: number;
        height?: number;
        unit: 'view-size' | 'view-min';
        center: {
            x: number;
            y: number;
        };
        maskStyle?: Partial<CSSStyleDeclaration>;
        borderStyle?: Partial<CSSStyleDeclaration>;
        innerUi?: Node | NodeList;
    };
    _eventListeners: {
        [key: string]: Set<Function>;
    };
    static _delayBeforeEnumerateDevices: number;
    static _delayBeforeGetUserMedia: number;
    static _delayBeforeApplyConstraints: number;
    static _countEnsureResolution: number;
    static _videoPlayTimeout: number;
    static _bReopenWhenChangeResolution: boolean;
    _bTryAnotherCameraWhenFailToOpen: boolean;
    _constraints4Fallback: MediaTrackConstraints | true;
    static _arrConstructors: CameraZsFunc[];
    static _arrOnOpen: CameraZsFunc[];
    static _arrBeforeClose: CameraZsFunc[];
    static _arrOnClose: CameraZsFunc[];
    constructor();
    _taskIdIOSResizeProblem: any;
    _updateObjectFit(): void;
    get video(): HTMLVideoElement;
    get track(): MediaStreamTrack;
    get objectFit(): "contain" | "cover" | "fill";
    set objectFit(value: "contain" | "cover" | "fill");
    /**
     * While `ui` can accept various types during assignment, its value will always be an `HTMLElement` upon retrieval.
     */
    get ui(): HTMLElement;
    /**
     * Generally, the `value` can be an `HTMLElement`, `DocumentFragment` or a string of serialized html.
     * This `ui` or one of its descendants, must have class `dm-camera-core-container`.
     * If the `value` already contains the `coreShell`, `coreShell` does not move.
     * Otherwise the `coreShell` of `DMCamera` is appended to the first element that has the class `dm-camera-core-container`.
     *
     * If `value` is a falsy value, `coreShell` is used as `ui`.
     **/
    set ui(value: HTMLElement | DocumentFragment | string | undefined);
    /**
     * "closed" | "opening" | "opened" | "paused" | "closing"
     */
    get status(): CameraStatus;
    get requestedCamera(): "back" | "front" | "macro-back" | "quick-back" | "customized-video" | MediaTrackConstraints;
    get requestedResolution(): {
        width: number;
        height: number;
    };
    get currentCamera(): CameraInfo;
    get currentResolution(): {
        width: number;
        height: number;
    };
    /** width 0 ~ 1, height 0 ~ 1, center.x -0.5 ~ 0.5, center.y -0.5 ~ 0.5 */
    get regionBox(): {
        width?: number;
        height?: number;
        unit: "view-size" | "view-min";
        center: {
            x: number;
            y: number;
        };
        maskStyle?: Partial<CSSStyleDeclaration>;
        borderStyle?: Partial<CSSStyleDeclaration>;
        innerUi?: Node | NodeList;
    };
    onOpened?: (camera: Camera) => void | any;
    static hasCamera(): Promise<boolean>;
    static hasMacroCamera(): Promise<boolean>;
    static hasFrontCamera(): Promise<boolean>;
    /**
     * tips:
     * Call getDeviceInfos() will ask for camera permission, then open camera and close internally.
     * 2nd time open camera will be a lot faster.
     **/
    static getDeviceInfos(): Promise<Readonly<CameraInfo>[]>;
    static _setCapabilities(deviceInfos: CameraInfo[]): Promise<void>;
    /** `pause()` is an idempotent operation, you can call it repeatedly without error. */
    pause(): Promise<void>;
    /** `close()` is an idempotent operation, you can call it repeatedly without error. */
    close(): Promise<void>;
    /** If call `requestCamera()` when the camera is `opened`, it will call `close()` then re`open()` Internally. */
    requestCamera(cameraPreset: CameraPreset): Promise<void>;
    /** If call `requestCamera()` when the camera is `opened`, it will call `close()` then re`open()` Internally. */
    requestCamera(deviceId: string): Promise<void>;
    /** If call `requestCamera()` when the camera is `opened`, it will call `close()` then re`open()` Internally. */
    requestCamera(deviceInfo: CameraInfo): Promise<void>;
    /** If call `requestCamera()` when the camera is `opened`, it will call `close()` then re`open()` Internally. */
    requestCamera(constraints: MediaTrackConstraints): Promise<void>;
    /**
     * If call `requestCamera()` when the camera is `opened`, it will call `close()` then re`open()` Internally.
     * @param notRequired Let browser choose use what camera.
     * */
    requestCamera(notRequired: null): Promise<void>;
    /**
     * If call `requestCamera()` when the camera is `opened`, it will call `close()` then re`open()` Internally.
     * @param resetToDefault Use SDK's dafault logic.
     * */
    requestCamera(resetToDefault: undefined): Promise<void>;
    /** If call `requestCamera()` when the camera is `opened`, it will call `close()` then re`open()` Internally. */
    requestCamera(camera: string | CameraInfo | MediaTrackConstraints | null | undefined): Promise<void>;
    requestResolution(width: number, height?: number): Promise<void>;
    requestResolution(widthHeightPair: [number, number] | number[]): Promise<void>;
    requestResolution(constraints: {
        width?: ConstrainULong;
        height?: ConstrainULong;
        aspectRatio?: ConstrainDouble;
    }): Promise<void>;
    requestResolution(notRequired: null): Promise<void>;
    requestResolution(resetToDefault: undefined): Promise<void>;
    requestResolution(arg1: any, arg2?: any): Promise<void>;
    /**
     * Similar to `camera.track.applyConstraints`,
     * but auto add constraints of original camera and original resolution.
     * Primarily used for advanced camera settings like focusDistance, zoom, colorTemperature.
     * Don't directly change camera or resolution by this API,
     * use `requestCamera` and `requestResolution` instead.
     * Set camera or resolution using `applyConstraints` will result in undefined behavior.
    */
    applyConstraints(constraints?: MediaTrackConstraints): Promise<void>;
    /**
     * @param config
     * `x`/`y`/`width`/`height` is normally `0 ~ video.videoWidth` or `0 ~ video.videoHeight`,
     * same as [drawImage](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/drawImage).
     * If values contain decimals, it will be rounded.
     * Note that the round method takes the effect of `x` into account when rounding `width` to minimize the cumulative error.
     * The same logic applies to `height`.
     */
    getFrame(config?: {
        x?: number;
        y?: number;
        width?: number;
        height?: number;
        reusedContext?: CanvasRenderingContext2D;
    }): HTMLCanvasElement;
    /**
     * @param regionBox width 0 ~ 1, height 0 ~ 1, center.x -0.5 ~ 0.5, center.y -0.5 ~ 0.5
     * TODO: support unit pixel
     */
    setRegionBox(regionBox: {
        width?: number;
        height?: number;
        unit?: 'view-size' | 'view-min';
        center?: {
            x: number;
            y: number;
        };
        maskStyle?: Partial<CSSStyleDeclaration>;
        borderStyle?: Partial<CSSStyleDeclaration>;
        innerUi?: Node | NodeList | DocumentFragment | Node[] | string;
    }): void;
    /**
     * Add a canvas dynamically keep with the same size of the video resolution, as a overlay.
     * You can remove it by `camera.video.parentElement.removeChild(thatCanvas)` or `thatCanvas.remove()`.
     * When you add multiple canvases, you can also use `camera.video.parentElement` to control stack order.
     */
    addCanvas(): HTMLCanvasElement;
    _updateCanvasSize(): void;
    _callOpenedListeners(): void;
    /**
     * Convert video x/y to absolute left/top in `document.body`.
     * So you can easily add a overlay with absolute position.
     * Processing multiple points at once has higher performance than calling multiple times.
     */
    videoXY2AbsoluteLT(points: {
        x: number;
        y: number;
    }[]): {
        left: number;
        top: number;
    }[];
    /**
     * Convert video x/y to fixed left/top in `document.body`.
     * So you can easily add a overlay with fixed position.
     * Processing multiple points at once has higher performance than calling multiple times.
     */
    videoXY2FixedLT(points: {
        x: number;
        y: number;
    }[]): {
        left: number;
        top: number;
    }[];
    /**
     * @param isConsiderRegionBox Default is `false`. Only consider the visible area in the region box.
     * @param rounded Default is `false`. Controls whether the result should be rounded.
     * Note that the round method takes the effect of `x` into account when rounding `width` to minimize the cumulative error.
     * The same logic applies to `height`.
     * @returns
     * `x`/`width` is `0 ~ video.videoWidth`, `y`/`height` is `0 ~ video.videoHeight`.
     */
    getVisibleAreaInVideoXY(config?: {
        isConsiderRegionBox?: boolean;
        rounded?: boolean;
    }): {
        x: number;
        y: number;
        width: number;
        height: number;
    };
}
type CameraStatus = 'closed' | 'opening' | 'opened' | 'paused' | 'closing';
declare const ArrCameraPreset: readonly ["back", "front", "macro-back", "quick-back", "customized-video"];
type CameraPreset = typeof ArrCameraPreset[number];


    interface Camera {
        correctAdvancedConstraint(constraints?: MediaTrackConstraints): MediaTrackConstraints;
    }


    interface Camera {
        _softZoom: {
            zoom: number;
            center: {
                x: number;
                y: number;
            };
        };
        get softZoom(): {
            zoom: number;
            center: {
                x: number;
                y: number;
            };
        };
        _isMirrored: boolean;
        get isMirrored(): boolean;
        set isMirrored(value: boolean);
        maxZoom4GestureWheel: number;
        _lastZoomTime: number;
        _mapZoomTouchs: Map<number, {
            x: number;
            y: number;
        }>;
        _gestureZoomListener: ((this: HTMLElement, ev: TouchEvent) => any) | null;
        get enableGestureZoom(): boolean;
        set enableGestureZoom(value: boolean);
        _wheelZoomListener: ((this: HTMLElement, ev: WheelEvent) => any) | null;
        get enableWheelZoom(): boolean;
        set enableWheelZoom(value: boolean);
        getZoomRange(): {
            min: number;
            max: number;
        } | undefined;
        setZoom(zoom: number): Promise<void>;
        /**
         * Js software-level zoom.
         * It does not rely on camera device and camera driver support for zoom.
         * @param center
         * zoomed camera center in orignal frame.
         * `x`: -0.5 ~ 0.5, `y`: -0.5 ~ 0.5.
         * @param limit
         * limit `zoom` >= 1.
         * limit the center point position according to `zoom`,
         * so zoomed frame is inside video boundary;
         */
        setSoftZoom(zoom: number, config?: {
            center?: {
                x: number;
                y: number;
            };
            limit?: boolean;
        }): void;
        _changeZoomByWheel(ev: WheelEvent): void;
        _changeZoomByTouch(ev: TouchEvent): void;
        /** The `zoom` event is triggered when zoom updated via a touch gesture or mouse wheel. */
        addEventListener(type: 'zoom', listener: (this: Camera, softZoom: {
            zoom: number;
            center: {
                x: number;
                y: number;
            };
        }) => void | any): void;
        removeEventListener(type: 'zoom', listener: (this: Camera, softZoom: {
            zoom: number;
            center: {
                x: number;
                y: number;
            };
        }) => void | any): void;
    }

interface AdvancedFocusParameters {
    minFocusDistanceLimit: number;
    maxFocusDistanceLimit: number;
    firstStepWaitDuration: number;
    coarseStepWaitDuration: number;
    switchStepWaitDuration: number;
    fineStepWaitDuration: number;
    maxStepCount: number;
    /** value < 0 means no never */
    backToContinousDuration: number;
    /** The focus width and height, 0 ~ 1, represents the ratio of the length to the `Math.min(video.videoWidth, video.videoHeight)` */
    focusWH: number;
    /** From far to near, 0 ~ 1. The closer to 1, the more sensitive but more slow. */
    coarseTuneRate: number;
    /**
     * 0 ~ 1.
     * When the correct focus is closer, the far focus contrast data is unreliable
     * and requires a certain degree of error tolerance.
     * When closer to 1, it will be more sensitive to contrast changes and may also cause the focus to be too far.
     * When closer to 0, there will be more error tolerance,
     * and it may also cause the focus to be too close and the process to be too slow.
     **/
    coarseTuneTolerance: number;
    /** From near to far, 1 ~ 1.xx. The closer to 1, the more sensitive but more slow. */
    fineTuneRate: number;
}
declare namespace Camera {
        function _getImageContrast(data: Uint8Array | Uint8ClampedArray, width: number, height: number): number;
    }
    interface Camera {
        _enableTapToFocus: false | 'simple' | 'experimental-advanced';
        _isFocusing: boolean;
        _tapToFocusListner: ((this: HTMLElement, ev: PointerEvent) => any) | null;
        _simpleFocus(): Promise<void>;
        _advancedFocusParameters: AdvancedFocusParameters;
        _advancedFocusTaskId: number;
        _advancedFocus(center?: {
            x: number;
            y: number;
        }, width?: number, height?: number): Promise<void>;
        get enableTapToFocus(): false | "simple" | "experimental-advanced";
        set enableTapToFocus(value: false | 'simple' | 'experimental-advanced');
    }

interface AutoTorchParameters {
    shortDelay: number;
    longDelay: number;
    shortLongDelaySwitchCount: number;
    /** 0 ~ 255 */
    grayThreshold: number;
    maxDarkCount: number;
}

    interface Camera {
        get isSupportTorch(): boolean;
        _isTorchOn: boolean | undefined;
        /** `undefined` means in auto torch mode */
        get isTorchOn(): boolean | undefined;
        turnOnTorch(): Promise<void>;
        turnOffTorch(): Promise<void>;
        _autoTorchParameters: AutoTorchParameters;
        /**
         * Detect how dark the picture and turn on torch automatically.
         * After camera open, it may take a few seconds for picture to be ready.
         * So it's suggested not to `turnAutoTorch()` immediately.
         * Waiting for 3 seconds may bring a better user experience.
         **/
        turnAutoTorch(): void;
        /** The auto torch logic detected that the image was too dark and turn on the torch. */
        addEventListener(type: 'torchAutoOn', listener: (this: Camera) => void | any): void;
        removeEventListener(type: 'torchAutoOn', listener: (this: Camera) => void | any): void;
    }


    interface Camera {
        _shouldCloseWhenHide: boolean;
        _isDuringCloseWhenHide: boolean;
        _isOpenBeforeHide: boolean;
        _maxReopenTry4CloseWhenHide: number;
        get shouldCloseWhenHide(): boolean;
        set shouldCloseWhenHide(value: boolean);
        _closeWhenHide(): Promise<void>;
        _closeWhenHideListener: EventListener | null;
        _bindCloseWhenHide(): void;
        _unbindCloseWhenHide(): void;
    }
declare namespace Camera {
        let _id4CloseWhenNotInDOM: number;
        let _stMSBNotInDOMCamera: Set<Camera>;
    }
    interface Camera {
        _id4CloseWhenNotInDOM: number;
        _shouldCloseWhenNotInDOM: boolean;
        _bClosedBecauseOfNotInDOM: boolean;
        /**
         * After turn on `shouldCloseWhenNotInDOM`:
         * 1. Once a camera insert into DOM, if the camera leave DOM, it auto close.
         * 2. Once a mediaStream-binded camera insert into DOM, or a already in DOM camera is opened,
         *    we call this camera as A,
         *    Other cameras who is not in DOM and created before A, will be closed.
         */
        get shouldCloseWhenNotInDOM(): boolean;
        set shouldCloseWhenNotInDOM(value: boolean);
        _updateMo4CloseWhenNotInDOM(): void;
        _mo4CloseWhenNotInDOM: MutationObserver | null;
    }
declare namespace Camera {
        function showFilePicker(inputOptions?: {
            accept?: string;
            multiple: boolean;
            capture?: 'user' | 'environment' | '';
            onchange?: (this: HTMLInputElement, ev: Event) => any;
        }): Promise<File[]>;
        function showFilePicker(inputOptions?: any): Promise<File[]>;
        let filePicker2CanvasMaxWH: number;
        function showFilePicker2Canvas(inputOptions?: {
            accept?: string;
            multiple: boolean;
            capture?: 'user' | 'environment' | '';
            onchange?: (this: HTMLInputElement, ev: Event) => any;
            canvasMaxWH?: number;
        }): Promise<HTMLCanvasElement[]>;
        function showFilePicker2Canvas(inputOptions?: any): Promise<HTMLCanvasElement[]>;
    }

/**
 * Return `Element` if possible, otherwise return `DocumentFragment`.
 */
declare const stringToHtml: (str: string, config?: {
    inlineScript2Blob?: boolean;
    internalCss2Blob: boolean;
    insertInternalCss2ExistedSheet?: boolean;
}) => Node;

declare class FramePipeline {
    camera?: Camera;
    _ctx: CanvasRenderingContext2D;
    _data?: Uint8Array<ArrayBuffer> | null;
    _dataTime: number;
    _x?: number;
    _y?: number;
    _w?: number;
    _h?: number;
    _type?: 'rgba' | 'gray' | 'r' | 'g' | 'b';
    maxTimeout: number;
    _pipeTaskId: any;
    isSaveOriginalRgba: boolean;
    /**
     * The `originalRgba` share `ArrayBuffer` with the `data` returned by `getData(..., type: 'rgba')`.
     * So you should be careful when transferring `data` to other thread.
     */
    originalRgba?: Uint8ClampedArray<ArrayBuffer> | null;
    constructor(camera?: Camera);
    _getData(): Uint8Array<ArrayBuffer>;
    /**
     * @param config
     * Each parameter should be kept as stable as possible.
     * If you need to switch between multiple parameters frequently, please create multiple `FramePipeline` instances.
     *
     * `x`, `y`, `width`, `height` will be rounded.
     * Note that the round method takes the effect of `x` into account when rounding `width` to minimize the cumulative error.
     * The same logic applies to `height`.
     */
    getData(config?: {
        x?: number;
        y?: number;
        width?: number;
        height?: number;
        type?: 'rgba' | 'gray' | 'r' | 'g' | 'b';
    }): Uint8Array | null;
}

declare class Beep {
    _stAudioFree: Set<HTMLAudioElement>;
    _stAudioPlaying: Set<HTMLAudioElement>;
    _timeLastPlay: number;
    _bWarnedMaxTrack: boolean;
    maxPlayingBeep: number;
    beepSoundSource: string;
    beep(): void;
}
/**
 * The function will play the default beep sound.
 * To play different beep sound, you need create another `Beep` instance.
 **/
declare const beep: () => void;
declare const vibrate: (duration?: number) => void;

declare const CameraEnhancerModule: {
    getVersion(): string;
};
declare const CameraEnhancer: typeof Camera;
type CameraEnhancer = Camera;
declare const CameraView: typeof Camera;
type CameraView = Camera;
declare namespace Camera {
        function createInstance(_?: any): Promise<CameraEnhancer>;
        function testCameraAccess(): Promise<{
            ok: boolean;
            message?: string;
        }>;
        let defaultUIElementURL: string;
        let onWarning: any;
    }
    interface Camera {
        isCameraEnhancer: true;
        disposed: boolean;
        dispose(): void;
        _cameraEnhancer: CameraEnhancer;
        _cameraView: CameraView;
        _dceLastDeviceId: any;
        _dceLastResolution: any;
        cameraOpenTimeout: any;
        _bAutoSingleFrameModeWhenIosPwaFail: boolean;
        _oriOpen(): Promise<void>;
        open(): Promise<void | {
            deviceId: string;
            width: number;
            height: number;
        }>;
        _oriUpdateCanvasSize(): void;
        _oriAddCanvas(): HTMLCanvasElement;
        getAllCameras(): Promise<{
            deviceId: string;
            label: string;
        }[]>;
        getAvailableResolutions(): Promise<{
            width: number;
            height: number;
        }[]>;
        getCameraState(): 'opening' | 'open' | 'closed';
        getResolution(): {
            width: number;
            height: number;
        };
        getSelectedCamera(): {
            deviceId: string;
            label: string;
        };
        getVideoSettings(): MediaStreamConstraints;
        _ifSaveLastUsedCamera: boolean;
        get ifSaveLastUsedCamera(): boolean;
        set ifSaveLastUsedCamera(value: boolean);
        get ifSkipCameraInspection(): boolean;
        set ifSkipCameraInspection(value: boolean);
        isOpen(): boolean;
        isPaused(): boolean;
        resume(): Promise<void>;
        selectCamera(device: string | {
            deviceId: string;
            label: string;
        }): Promise<{
            deviceId: string;
            width: number;
            height: number;
        }>;
        setResolution(resolution: {
            width: number;
            height: number;
        }): Promise<{
            deviceId: string;
            width: number;
            height: number;
        }>;
        updateVideoSettings(constraints: MediaStreamConstraints): Promise<void>;
        _dceVideoSrc: string;
        get videoSrc(): string;
        set videoSrc(value: string | null);
        _dceEnhancedFeatures: any;
        _dceAutoZoomRange: {
            min: number;
            max: number;
        };
        disableEnhancedFeatures(feature: any): void;
        enableEnhancedFeatures(feature: any): void;
        getCameraSettings(): MediaTrackSettings;
        getCapabilities(): MediaTrackCapabilities;
        getColorTemperature(): number;
        getExposureCompensation(): number;
        getFrameRate(): number;
        setColorTemperature(value: number): Promise<void>;
        setExposureCompensation(value: number): Promise<void>;
        setFrameRate(value: number): Promise<void>;
        getZoomSettings(): {
            factor: number;
        };
        _oriSetZoom(zoom: number): Promise<void>;
        _dceZoom: number;
        setZoom(settings: {
            factor: number;
        }): Promise<void>;
        resetZoom(): void;
        _dceFocusSettings: any;
        getFocusSettings(): {
            mode: string;
        } | {
            mode: 'manual';
            distance: number;
        } | {
            mode: 'manual';
            area: {
                centerPoint: {
                    x: string;
                    y: string;
                };
                width?: string;
                height?: string;
            };
        };
        setFocus(settings: {
            mode: string;
        } | {
            mode: 'manual';
            distance: number;
        } | {
            mode: 'manual';
            area: {
                centerPoint: {
                    x: string;
                    y: string;
                };
                width?: string;
                height?: string;
            };
        }): Promise<void>;
        setAutoZoomRange(value: {
            min: number;
            max: number;
        }): void;
        getAutoZoomRange(): {
            min: number;
            max: number;
        };
        toggleMirroring(enable: boolean): void;
        _framePipeline: FramePipeline;
        fetchImage(): {
            bytes: Uint8Array;
            width: number;
            height: number;
            stride: number;
            format: any;
            toCanvas(): HTMLCanvasElement;
        };
        getImage(): {
            bytes: Uint8Array;
            width: number;
            height: number;
            stride: number;
            format: any;
            toCanvas(): HTMLCanvasElement;
        };
        _dceScanRegion: {
            x: number;
            y: number;
            width: number;
            height: number;
            isMeasuredInPercentage?: boolean;
        } | {
            left: number;
            top: number;
            right: number;
            bottom: number;
            isMeasuredInPercentage?: boolean;
        };
        getScanRegion(): {
            x: number;
            y: number;
            width: number;
            height: number;
            isMeasuredInPercentage?: boolean;
        } | {
            left: number;
            top: number;
            right: number;
            bottom: number;
            isMeasuredInPercentage?: boolean;
        };
        hasNextImageToFetch(): boolean;
        isBufferEmpty(): boolean;
        startFetching(): void;
        _pixelFormat: number;
        getPixelFormat(): number;
        setPixelFormat(format: number): void;
        _colourChannelUsageType: number;
        setColourChannelUsageType(format: number): void;
        getColourChannelUsageType(): number;
        setScanRegion(region?: {
            x: number;
            y: number;
            width: number;
            height: number;
            isMeasuredInPercentage?: boolean;
        } | {
            left: number;
            top: number;
            right: number;
            bottom: number;
            isMeasuredInPercentage?: boolean;
        }): void;
        stopFetching(): void;
        takePhoto(listener: (dceFrame: {
            bytes: Uint8Array;
            width: number;
            height: number;
            stride: number;
            format: any;
            toCanvas(): HTMLCanvasElement;
        }) => void): Promise<{
            bytes: Uint8Array;
            width: number;
            height: number;
            stride: number;
            format: any;
            toCanvas(): HTMLCanvasElement;
        }>;
        addImageToBuffer: any;
        clearBuffer: any;
        getBufferOverflowProtectionMode: any;
        getImageCount: any;
        getImageFetchInterval: any;
        getMaxImageCount: any;
        hasImage: any;
        setBufferOverflowProtectionMode: any;
        setErrorListener: any;
        setImageFetchInterval: any;
        setMaxImageCount: any;
        setNextImageToReturn: any;
        _dceSettingsBeforeSingleFrameMode: any;
        _singleFrameMode: "disabled" | "camera" | "image";
        _singleFrameModeClickCallback: any;
        _singleFrameModeResultForDcv: DCEFrame | null;
        _singleFrameModeCvs: HTMLCanvasElement | null;
        _singleFrameModeUIAutoFitRO: ResizeObserver | undefined;
        get singleFrameMode(): "disabled" | "camera" | "image";
        set singleFrameMode(value: "disabled" | "camera" | "image");
        _singleFrameModeObjectFit: 'contain' | 'cover' | 'fill';
        _singleFrameModeUpdateObjectFit(): void;
        setCameraView(view: CameraView): void;
        getCameraView(): CameraView;
        getVideoEl(): HTMLVideoElement;
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
        convertToScanRegionCoordinates(point: {
            x: number;
            y: number;
        }): {
            x: number;
            y: number;
        };
        convertToContainCoordinates(point: {
            x: number;
            y: number;
        }): {
            x: number;
            y: number;
        };
        _dceEventListeners: {
            [key: string]: Set<Function>;
        };
        on(eventName: string, listener: Function): void;
        off(eventName: string, listener: Function): void;
        _dceMNIsBeepBarcode: boolean;
        _dceMNIsVibrateBarcode: boolean;
        getUIElement(): HTMLElement;
        setUIElement(ui: HTMLDivElement | string): Promise<void>;
        getVideoElement(): HTMLVideoElement;
        setVideoFit(fit: 'contain' | 'cover' | 'fill'): void;
        getVideoFit(): 'contain' | 'cover' | 'fill';
        getVisibleRegionOfVideo(options?: {
            inPixels?: boolean;
        }): {
            x: number;
            y: number;
            width: number;
            height: number;
            isMeasuredInPercentage?: boolean;
        };
        _dceRegionMaskStyle: {
            lineWidth: number;
            strokeStyle: string;
            fillStyle: string;
        };
        setScanRegionMaskStyle(style: {
            lineWidth: number;
            strokeStyle: string;
            fillStyle: string;
        }): void;
        getScanRegionMaskStyle(): {
            lineWidth: number;
            strokeStyle: string;
            fillStyle: string;
        };
        _dceRegionMaskVisible: boolean;
        setScanRegionMaskVisible(visible: boolean): void;
        isScanRegionMaskVisible(): boolean;
        setScanLaserVisible(visible: boolean): void;
        isScanLaserVisible(): boolean;
        setPowerByMessageVisible(visible: boolean): void;
        isPowerByMessageVisible(): boolean;
        _dceTipDuration: number;
        _dceTipMessage: string;
        getTipConfig(): TipConfig;
        setTipConfig(tipConfig: TipConfig): void;
        setTipVisible(visible: boolean): void;
        isTipVisible(): boolean;
        updateTipMessage(message: string): void;
        _drawingLayers: DrawingLayer[];
        createDrawingLayer(): DrawingLayer;
        getDrawingLayer(id: number): DrawingLayer;
        getAllDrawingLayers(): DrawingLayer[];
        clearUserDefinedDrawingLayers(): void;
        deleteUserDefinedDrawingLayer(id: number): void;
        clearAllInnerDrawingItems(_?: boolean): void;
        _capturedResultReceiver: any;
    }
declare function _bufferToCanvas(uint8Array: Uint8Array, width: number, height: number, format: number): HTMLCanvasElement;
declare class Feedback {
    static _beepInstance: Beep;
    static beep(): void;
    static get beepSoundSource(): string;
    static set beepSoundSource(value: string);
    static vibrate(): void;
    static vibrateDuration: number;
}
declare const DrawingStyleManager: {
    STYLE_BLUE_STROKE: any;
    STYLE_GREEN_STROKE: any;
    STYLE_ORANGE_STROKE: any;
    STYLE_YELLOW_STROKE: any;
    STYLE_BLUE_STROKE_FILL: any;
    STYLE_GREEN_STROKE_FILL: any;
    STYLE_ORANGE_STROKE_FILL: any;
    STYLE_YELLOW_STROKE_FILL: any;
    STYLE_BLUE_STROKE_TRANSPARENT: any;
    STYLE_GREEN_STROKE_TRANSPARENT: any;
    STYLE_ORANGE_STROKE_TRANSPARENT: any;
    STYLE_YELLOW_STROKE_TRANSPARENT: any;
    createDrawingStyle(style: any): any;
    getDrawingStyle(id: any): any;
    getAllDrawingStyles(): any[];
    updateDrawingStyle(id: any, style: any): void;
};
declare class DrawingLayer {
    _visible: boolean;
    _dce: CameraView;
    _ctx: CanvasRenderingContext2D;
    _defaultStyle: any;
    _drawingItems: DrawingItem[];
    _mode: 'editor' | 'viewer';
    _editorView: any;
    _extraEditorView: any;
    _renderTask: any;
    _newSelectedDrawingItems: DrawingItem[];
    _newDeselectedDrawingItems: DrawingItem[];
    _selectionChangedTask: any;
    _onSelectionChanged?: (newSelectedDrawingItems: DrawingItem[], newDeselectedDrawingItems: DrawingItem[]) => void;
    getId(): this;
    isVisible(): boolean;
    setVisible(value: boolean): void;
    setDefaultStyle(drawingStyleId: any, _1?: any, _2?: any): void;
    addDrawingItems(drawingItems: DrawingItem[]): void;
    removeDrawingItems(drawingItems: DrawingItem[]): void;
    setDrawingItems(drawingItems: DrawingItem[]): void;
    getDrawingItems(filter?: (drawingItem: DrawingItem) => boolean): DrawingItem[];
    hasDrawingItem(drawingItem: DrawingItem): boolean;
    getSelectedDrawingItems(): any;
    clearDrawingItems(): void;
    _delayRenderAll(): void;
    renderAll(): void;
    getMode(): "editor" | "viewer";
    setMode(mode: 'editor' | 'viewer'): Promise<void>;
    _delaySelectionChanged(): void;
    get onSelectionChanged(): ((newSelectedDrawingItems: DrawingItem[], newDeselectedDrawingItems: DrawingItem[]) => void) | undefined;
    set onSelectionChanged(value: ((newSelectedDrawingItems: DrawingItem[], newDeselectedDrawingItems: DrawingItem[]) => void) | undefined);
}
/**
 * Determines if a point is inside a quadrilateral.
 * @param {number[]} point - [x, y] coordinates of the point.
 * @param {number[][]} polygon - Array of points [[x0, y0], [x1, y1], [x2, y2], [x3, y3]].
 * @returns {boolean} - True if the point is inside.
 */
declare function _isPointInPolygon(point: number[], polygon: number[][]): boolean;
/**
 * Calculates the shortest distance from a point to a line segment.
 * @param {number[]} p - The point [x, y]
 * @param {number[][]} segment - The segment [[x1, y1], [x2, y2]]
 * @returns {number} The shortest distance
 */
declare function _distToSegment(p: number[], segment: number[][]): number;
declare class DrawingItem {
    coordinateBase: string;
    drawingLayerId: any;
    drawingStyleId: any;
    mediaType: EnumDrawingItemMediaType;
    _notes: Note[];
    _bSelected: boolean;
    _dceEventListeners: {
        [key: string]: Set<Function>;
    };
    get _ps(): {
        x: number;
        y: number;
    }[];
    getState(): EnumDrawingItemState;
    addNote(note: Note, replace?: boolean): void;
    getNote(name: string): Note | null;
    getNotes(): Note[];
    hasNote(name: string): boolean;
    updateNote(name: string, content: any, isMergeContent?: boolean): void;
    deleteNote(name: string): void;
    clearNotes(): void;
    _delayRenderAll(): void;
    _setSelected(value: boolean): void;
    on(type: string, listener: Function): void;
    off(type: string, listener: Function): void;
}
declare class LineDrawingItem extends DrawingItem {
    line: {
        startPoint: {
            x: number;
            y: number;
        };
        endPoint: {
            x: number;
            y: number;
        };
    };
    get _ps(): {
        x: number;
        y: number;
    }[];
    constructor(line: {
        startPoint: {
            x: number;
            y: number;
        };
        endPoint: {
            x: number;
            y: number;
        };
    }, drawingStyleId?: any);
    getLine(): {
        startPoint: {
            x: number;
            y: number;
        };
        endPoint: {
            x: number;
            y: number;
        };
    };
    setLine(value: {
        startPoint: {
            x: number;
            y: number;
        };
        endPoint: {
            x: number;
            y: number;
        };
    }): void;
}
declare class QuadDrawingItem extends DrawingItem {
    quad: {
        points: {
            x: number;
            y: number;
        }[];
    };
    get _ps(): {
        x: number;
        y: number;
    }[];
    constructor(quad: {
        points: {
            x: number;
            y: number;
        }[];
    }, drawingStyleId?: any);
    getQuad(): {
        points: {
            x: number;
            y: number;
        }[];
    };
    setQuad(value: {
        points: {
            x: number;
            y: number;
        }[];
    }): void;
}
declare class RectDrawingItem extends DrawingItem {
    rect: {
        x: number;
        y: number;
        width: number;
        height: number;
    };
    get _ps(): {
        x: number;
        y: number;
    }[];
    constructor(rect: {
        x: number;
        y: number;
        width: number;
        height: number;
    }, drawingStyleId?: any);
    getRect(): {
        x: number;
        y: number;
        width: number;
        height: number;
    };
    setRect(value: {
        x: number;
        y: number;
        width: number;
        height: number;
    }): void;
}
declare class TextDrawingItem extends DrawingItem {
    text: string;
    rect: {
        x: number;
        y: number;
        width: number;
        height: number;
    };
    get _ps(): {
        x: number;
        y: number;
    }[];
    constructor(text: string, rect: {
        x: number;
        y: number;
        width: number;
        height: number;
    }, drawingStyleId?: any);
    getText(): string;
    setText(value: string): void;
    getTextRect(): {
        x: number;
        y: number;
        width: number;
        height: number;
    };
    setTextRect(value: {
        x: number;
        y: number;
        width: number;
        height: number;
    }): void;
}
declare class ImageDrawingItem extends DrawingItem {
    image: HTMLImageElement | HTMLCanvasElement | HTMLVideoElement;
    rect: {
        x: number;
        y: number;
        width: number;
        height: number;
    };
    maintainAspectRatio: boolean;
    get _ps(): {
        x: number;
        y: number;
    }[];
    constructor(image: {
        bytes: Uint8Array;
        width: number;
        height: number;
        stride: number;
        format: any;
    } | HTMLImageElement | HTMLCanvasElement | HTMLVideoElement, rect: {
        x: number;
        y: number;
        width: number;
        height: number;
    }, maintainAspectRatio: boolean, drawingStyleId?: any);
    getImage(): HTMLVideoElement | HTMLCanvasElement | HTMLImageElement;
    setImage(image: {
        bytes: Uint8Array;
        width: number;
        height: number;
        stride: number;
        format: any;
    } | HTMLImageElement | HTMLCanvasElement | HTMLVideoElement): void;
    getImageRect(): {
        x: number;
        y: number;
        width: number;
        height: number;
    };
    setImageRect(value: {
        x: number;
        y: number;
        width: number;
        height: number;
    }): void;
}

declare enum EnumDrawingItemMediaType {
    /**
     * Represents a rectangle, a basic geometric shape with four sides where opposite sides are equal in length and it has four right angles.
     */
    DIMT_RECTANGLE = 1,
    /**
     * Represents any four-sided figure. This includes squares, rectangles, rhombuses, and more general forms that do not necessarily have right angles or equal sides.
     */
    DIMT_QUADRILATERAL = 2,
    /**
     * Represents a text element. This allows for the inclusion of textual content as a distinct drawing item within the graphic representation.
     */
    DIMT_TEXT = 4,
    /**
     * Represents an image. This enables embedding bitmap images within the drawing context.
     */
    DIMT_IMAGE = 16,
    /**
     * Represents a line segment. This is the simplest form of a drawing item, defined by two endpoints and the straight path connecting them.
     */
    DIMT_LINE = 64
}
declare enum EnumDrawingItemState {
    /**
     * DIS_DEFAULT: The default state of a drawing item. This state indicates that the drawing item is in its normal, unselected state.
     */
    DIS_DEFAULT = 1,
    /**
     * DIS_SELECTED: Indicates that the drawing item is currently selected. This state can trigger different behaviors or visual styles, such as highlighting the item to show it is active or the focus of user interaction.
     */
    DIS_SELECTED = 2
}
declare enum EnumEnhancedFeatures {
    /**
     * Enables auto-focus on areas likely to contain barcodes, assisting in their identification and interpretation.
     */
    EF_ENHANCED_FOCUS = 4,
    /**
     * Facilitates automatic zooming in on areas likely to contain barcodes, aiding in their detection and decoding.
     */
    EF_AUTO_ZOOM = 16,
    /**
     * Allows users to tap on a specific item or area in the video feed to focus on, simplifying the interaction for selecting or highlighting important elements.
     */
    EF_TAP_TO_FOCUS = 64
}
declare enum EnumPixelFormat {
    GREY = "grey",
    GREY32 = "grey32",
    RGBA = "rgba",
    RBGA = "rbga",
    GRBA = "grba",
    GBRA = "gbra",
    BRGA = "brga",
    BGRA = "bgra"
}
interface Resolution {
    width: number;
    height: number;
}
interface DCEFrame {
    bytes: Uint8Array;
    width: number;
    height: number;
    stride: number;
    format: any;
    toCanvas(): HTMLCanvasElement;
}
interface DrawingStyle {
    fillStyle?: string;
    lineWidth?: number;
    paintMode?: string;
    strokeStyle?: string;
}
interface PlayCallbackInfo {
    deviceId: string;
    width: number;
    height: number;
}
interface VideoDeviceInfo {
    deviceId: string;
    label: string;
}
interface VideoFrameTag {
    /** The unique identifier of the image. */
    imageId: number;
    /** The type of the image. */
    type: any;
    /** Indicates whether the video frame is cropped. */
    isCropped: boolean;
    /** The region based on which the original frame was cropped. If `isCropped` is false, the region covers the entire original image. */
    cropRegion: any;
    /** The original width of the video frame before any cropping. */
    originalWidth: number;
    /** The original height of the video frame before any cropping. */
    originalHeight: number;
    /** The current width of the video frame after cropping. */
    currentWidth: number;
    /** The current height of the video frame after cropping. */
    currentHeight: number;
    /** The time spent acquiring the frame, in milliseconds. */
    timeSpent: number;
    /** The timestamp marking the completion of the frame acquisition. */
    timeStamp: number;
}
interface TipConfig {
    /** The top left point of the tip message box. */
    topLeftPoint?: any;
    /** The width of the tip message box. */
    width?: number;
    /** The display duration of the tip in milliseconds. */
    duration: number;
    /** The base coordinate system used (e.g., "view" or "image"). */
    coordinateBase?: "view" | "image";
}
interface Note {
    /** The name of the note. */
    name: string;
    /** The content of the note, can be of any type. */
    content: any;
}

export { Beep, Camera, CameraEnhancer, CameraEnhancerModule, CameraView, DrawingItem, DrawingLayer, DrawingStyleManager, EnumDrawingItemMediaType, EnumDrawingItemState, EnumEnhancedFeatures, EnumPixelFormat, Feedback, FramePipeline, ImageDrawingItem, LineDrawingItem, QuadDrawingItem, RectDrawingItem, TextDrawingItem, _bufferToCanvas, _distToSegment, _isPointInPolygon, beep, stringToHtml, vibrate };
export type { CameraInfo, CameraPreset, CameraStatus, CameraZsFunc, DCEFrame, DMMoreMediaTrackCapabilities, DrawingStyle, Note, PlayCallbackInfo, Resolution, TipConfig, VideoDeviceInfo, VideoFrameTag };

