import { DSImageData, IntermediateResultExtraInfo, IntermediateResultUnit, Quadrilateral } from "dynamsoft-core";
export interface ComplementedBarcodeImageUnit extends IntermediateResultUnit {
    imageData: DSImageData;
    location: Quadrilateral;
}
declare module "dynamsoft-capture-vision-router" {
    interface IntermediateResultReceiver {
        onComplementedBarcodeImageUnitReceived?: (result: ComplementedBarcodeImageUnit, info: IntermediateResultExtraInfo) => void;
    }
}
