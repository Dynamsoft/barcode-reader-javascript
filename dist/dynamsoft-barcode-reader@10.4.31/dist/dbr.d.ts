import { CapturedResultItem, Quadrilateral, ImageTag, RegionObjectElement, DSImageData, EnumGrayscaleTransformationMode, EnumGrayscaleEnhancementMode, IntermediateResultExtraInfo, IntermediateResultUnit } from 'dynamsoft-core';

declare class BarcodeReaderModule {
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
    /**PDF417 */
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
};
type EnumBarcodeFormat = bigint;

declare enum EnumExtendedBarcodeResultType {
    EBRT_STANDARD_RESULT = 0,
    EBRT_CANDIDATE_RESULT = 1,
    EBRT_PARTIAL_RESULT = 2
}

declare enum EnumQRCodeErrorCorrectionLevel {
    QRECL_ERROR_CORRECTION_H = 0,
    QRECL_ERROR_CORRECTION_L = 1,
    QRECL_ERROR_CORRECTION_M = 2,
    QRECL_ERROR_CORRECTION_Q = 3
}

/** Label: DBRJS10.0.10-Check
 * @enum EnumLocalizationMode
 *
 * Describes the localization mode.
 */
declare enum EnumLocalizationMode {
    /**Not supported yet. */
    LM_AUTO = 1,
    /**Localizes barcodes by searching for connected blocks. This algorithm usually gives best result and it is recommended to set ConnectedBlocks to the highest priority. */
    LM_CONNECTED_BLOCKS = 2,
    /**Localizes barcodes by groups of contiguous black-white regions. This is optimized for QRCode and DataMatrix. */
    LM_STATISTICS = 4,
    /**Localizes barcodes by searching for groups of lines. This is optimized for 1D and PDF417 barcodes. */
    LM_LINES = 8,
    /**Localizes barcodes quickly. This mode is recommended in interactive scenario. Check @ref LM for available argument settings.*/
    LM_SCAN_DIRECTLY = 16,
    /**Localizes barcodes by groups of marks.This is optimized for DPM codes. */
    LM_STATISTICS_MARKS = 32,
    /**Localizes barcodes by groups of connected blocks and lines.This is optimized for postal codes. */
    LM_STATISTICS_POSTAL_CODE = 64,
    /**Localizes barcodes from the centre of the image. Check @ref LM for available argument settings. */
    LM_CENTRE = 128,
    /**Localizes 1D barcodes fast. Check @ref LM for available argument settings. */
    LM_ONED_FAST_SCAN = 256,
    LM_REV = -2147483648,
    /**Skips localization. */
    LM_SKIP = 0
}

/** Label: DBRJS10.0.10-Check
 * @enum EnumDeblurMode
 *
 * Describes the deblur mode.
 */
declare enum EnumDeblurMode {
    /**Performs deblur process using the direct binarization algorithm.*/
    DM_DIRECT_BINARIZATION = 1,
    /**Performs deblur process using the threshold binarization algorithm.*/
    DM_THRESHOLD_BINARIZATION = 2,
    /**Performs deblur process using the gray equalization algorithm.*/
    DM_GRAY_EQUALIZATION = 4,
    /**Performs deblur process using the smoothing algorithm.*/
    DM_SMOOTHING = 8,
    /**Performs deblur process using the morphing algorithm.*/
    DM_MORPHING = 16,
    /**Performs deblur process using the deep analysis algorithm.*/
    DM_DEEP_ANALYSIS = 32,
    /**Performs deblur process using the sharpening algorithm.*/
    DM_SHARPENING = 64,
    /**Performs deblur process based on the binary image from the localization process.*/
    DM_BASED_ON_LOC_BIN = 128,
    /**Performs deblur process using the sharpening and smoothing algorithm.*/
    DM_SHARPENING_SMOOTHING = 256,
    /**Reserved setting for deblur mode.*/
    DM_REV = -2147483648,
    /**Skips the deblur process.*/
    DM_SKIP = 0
}

interface BarcodeDetails {
}

interface AztecDetails extends BarcodeDetails {
    rows: number;
    columns: number;
    layerNumber: number;
}

interface BarcodeResultItem extends CapturedResultItem {
    format: EnumBarcodeFormat;
    formatString: string;
    text: string;
    bytes: Uint8Array;
    location: Quadrilateral;
    confidence: number;
    angle: number;
    moduleSize: number;
    details: BarcodeDetails;
    isMirrored: boolean;
    isDPM: boolean;
}

interface DataMatrixDetails extends BarcodeDetails {
    rows: number;
    columns: number;
    dataRegionRows: number;
    dataRegionColumns: number;
    dataRegionNumber: number;
}

interface DecodedBarcodesResult {
    readonly originalImageHashId: string;
    readonly originalImageTag: ImageTag;
    readonly barcodeResultItems: Array<BarcodeResultItem>;
    readonly errorCode: number;
    readonly errorString: string;
}
declare module "dynamsoft-capture-vision-router" {
    interface CapturedResultReceiver {
        onDecodedBarcodesReceived?: (result: DecodedBarcodesResult) => void;
    }
    interface CapturedResultFilter {
        onDecodedBarcodesReceived?: (result: DecodedBarcodesResult) => void;
    }
}

interface DecodedBarcodeElement extends RegionObjectElement {
    format: EnumBarcodeFormat;
    formatString: string;
    text: string;
    bytes: Uint8Array;
    details: BarcodeDetails;
    isDPM: boolean;
    isMirrored: boolean;
    angle: number;
    moduleSize: number;
    confidence: number;
    extendedBarcodeResults: Array<ExtendedBarcodeResult>;
}

interface ExtendedBarcodeResult extends DecodedBarcodeElement {
    extendedBarcodeResultType: EnumExtendedBarcodeResultType;
    deformation: number;
    clarity: number;
    samplingImage: DSImageData;
}

interface OneDCodeDetails extends BarcodeDetails {
    startCharsBytes: Array<number>;
    stopCharsBytes: Array<number>;
    checkDigitBytes: Array<number>;
    startPatternRange: number;
    middlePatternRange: number;
    endPatternRange: number;
}

interface PDF417Details extends BarcodeDetails {
    rows: number;
    columns: number;
    errorCorrectionLevel: number;
    hasLeftRowIndicator: boolean;
    hasRightRowIndicator: boolean;
}

interface QRCodeDetails extends BarcodeDetails {
    rows: number;
    columns: number;
    errorCorrectionLevel: number;
    version: number;
    model: number;
    mode: number;
    page: number;
    totalPage: number;
    parityData: number;
    dataMaskPattern: number;
    codewords: Array<String>;
}

interface SimplifiedBarcodeReaderSettings {
    barcodeFormatIds: EnumBarcodeFormat;
    expectedBarcodesCount: number;
    grayscaleTransformationModes: Array<EnumGrayscaleTransformationMode>;
    grayscaleEnhancementModes: Array<EnumGrayscaleEnhancementMode>;
    localizationModes: Array<number>;
    deblurModes: Array<number>;
    minResultConfidence: number;
    minBarcodeTextLength: number;
    barcodeTextRegExPattern: string;
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
declare module "dynamsoft-capture-vision-router" {
    interface IntermediateResultReceiver {
        onCandidateBarcodeZonesUnitReceived?: (result: CandidateBarcodeZonesUnit, info: IntermediateResultExtraInfo) => void;
    }
}

interface ComplementedBarcodeImageUnit extends IntermediateResultUnit {
    imageData: DSImageData;
    location: Quadrilateral;
}
declare module "dynamsoft-capture-vision-router" {
    interface IntermediateResultReceiver {
        onComplementedBarcodeImageUnitReceived?: (result: ComplementedBarcodeImageUnit, info: IntermediateResultExtraInfo) => void;
    }
}

interface DecodedBarcodesUnit extends IntermediateResultUnit {
    decodedBarcodes: Array<DecodedBarcodeElement>;
}
declare module "dynamsoft-capture-vision-router" {
    interface IntermediateResultReceiver {
        onDecodedBarcodesReceived?: (result: DecodedBarcodesUnit, info: IntermediateResultExtraInfo) => void;
    }
}

/**
 * The `DeformationResistedBarcode` interface represents a deformation-resisted barcode image.
 */
interface DeformationResistedBarcode {
    /** Format of the barcode, as defined by `EnumBarcodeFormat`. */
    format: EnumBarcodeFormat;
    /** Image data of the deformation-resisted barcode image. */
    imageData: DSImageData;
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
declare module "dynamsoft-capture-vision-router" {
    interface IntermediateResultReceiver {
        onDeformationResistedBarcodeImageUnitReceived?: (result: DeformationResistedBarcodeImageUnit, info: IntermediateResultExtraInfo) => void;
    }
}

interface LocalizedBarcodeElement extends RegionObjectElement {
    possibleFormats: EnumBarcodeFormat;
    possibleFormatsString: string;
    angle: number;
    moduleSize: number;
    confidence: number;
}

interface LocalizedBarcodesUnit extends IntermediateResultUnit {
    localizedBarcodes: Array<LocalizedBarcodeElement>;
}
declare module "dynamsoft-capture-vision-router" {
    interface IntermediateResultReceiver {
        onLocalizedBarcodesReceived?: (result: LocalizedBarcodesUnit, info: IntermediateResultExtraInfo) => void;
    }
}

interface ScaledUpBarcodeImageUnit extends IntermediateResultUnit {
    imageData: DSImageData;
}
declare module "dynamsoft-capture-vision-router" {
    interface IntermediateResultReceiver {
        onScaledUpBarcodeImageUnitReceived?: (result: ScaledUpBarcodeImageUnit, info: IntermediateResultExtraInfo) => void;
    }
}

export { AztecDetails, BarcodeDetails, BarcodeReaderModule, BarcodeResultItem, CandidateBarcodeZone, CandidateBarcodeZonesUnit, ComplementedBarcodeImageUnit, DataMatrixDetails, DecodedBarcodeElement, DecodedBarcodesResult, DecodedBarcodesUnit, DeformationResistedBarcode, DeformationResistedBarcodeImageUnit, EnumBarcodeFormat, EnumDeblurMode, EnumExtendedBarcodeResultType, EnumLocalizationMode, EnumQRCodeErrorCorrectionLevel, ExtendedBarcodeResult, LocalizedBarcodeElement, LocalizedBarcodesUnit, OneDCodeDetails, PDF417Details, QRCodeDetails, ScaledUpBarcodeImageUnit, SimplifiedBarcodeReaderSettings };
