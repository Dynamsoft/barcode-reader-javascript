import { DSImageData, IntermediateResultExtraInfo, IntermediateResultUnit } from "dynamsoft-core";
export interface DeformationResistedBarcodeImageUnit extends IntermediateResultUnit {
    imageData: DSImageData;
}
declare module "dynamsoft-capture-vision-router" {
    interface IntermediateResultReceiver {
        onDeformationResistedBarcodeImageUnitReceived?: (result: DeformationResistedBarcodeImageUnit, info: IntermediateResultExtraInfo) => void;
    }
}
