import { DSImageData, Quadrilateral } from "dynamsoft-core";
import { EnumBarcodeFormat } from "../enum/EnumBarcodeFormat";
/**
 * The `DeformationResistedBarcode` interface represents a deformation-resisted barcode image.
 */
export interface DeformationResistedBarcode {
    /** Format of the barcode, as defined by `EnumBarcodeFormat`. */
    format: EnumBarcodeFormat;
    /** Image data of the deformation-resisted barcode image. */
    imageData: DSImageData;
    /** Location of the deformation-resisted barcode within the image. */
    location: Quadrilateral;
}
