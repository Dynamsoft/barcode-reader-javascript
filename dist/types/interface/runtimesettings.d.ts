import { Region } from "./region";
import { EnumIntermediateResultType } from "../enum/enumintermediateresulttype";
import { EnumTerminatePhase } from "../enum/enumterminatephase";
import { EnumTextResultOrderMode } from "../enum/enumtextresultordermode";
import { EnumBinarizationMode } from "../enum/enumbinarizationmode";
import { EnumPDFReadingMode } from "../enum/enumpdfreadingmode";
import { EnumScaleUpMode } from "../enum/enumscaleupmode";
import { EnumLocalizationMode } from "../enum/enumlocalizationmode";
import { EnumBarcodeFormat } from "../enum/enumbarcodeformat";
import { EnumBarcodeFormat_2 } from "../enum/enumbarcodeformat_2";
import { EnumResultCoordinateType } from "../enum/enumresultcoordinatetype";
/**
 * @see [C++ RuntimeSettings](https://www.dynamsoft.com/barcode-reader/programming/c-cplusplus/struct/PublicRuntimeSettings.html?src=cpp&&ver=latest)
 */
export interface RuntimeSettings {
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
     * Not available in JS. Sets the way to detect barcodes from a PDF file when using the DecodeFile method.
     */
    PDFReadingMode: EnumPDFReadingMode;
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
//# sourceMappingURL=runtimesettings.d.ts.map