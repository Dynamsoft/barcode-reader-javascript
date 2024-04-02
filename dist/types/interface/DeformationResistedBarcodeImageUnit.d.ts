import { IntermediateResultExtraInfo, IntermediateResultUnit } from "dynamsoft-core";
import { DeformationResistedBarcode } from "./DeformationResistedBarcode";
/**
 * The `DeformationResistedBarcodeImageUnit` interface extends the `IntermediateResultUnit` interface and represents a unit that holds the deformation-resisted barcode which includes the corresponding image data, its location, and the barcode format.
 */
export interface DeformationResistedBarcodeImageUnit extends IntermediateResultUnit {
    /** The deformation-resisted barcode. */
    deformationResistedBarcode: DeformationResistedBarcode;
}
declare module "dynamsoft-capture-vision-router" {
    interface IntermediateResultReceiver {
        onDeformationResistedBarcodeImageUnitReceived?: (result: DeformationResistedBarcodeImageUnit, info: IntermediateResultExtraInfo) => void;
    }
}
