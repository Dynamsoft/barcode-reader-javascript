import { DSImageData, IntermediateResultExtraInfo, IntermediateResultUnit } from "dynamsoft-core";
export interface ScaledUpBarcodeImageUnit extends IntermediateResultUnit {
    imageData: DSImageData;
}
declare module "dynamsoft-capture-vision-router" {
    interface IntermediateResultReceiver {
        onScaledUpBarcodeImageUnitReceived?: (result: ScaledUpBarcodeImageUnit, info: IntermediateResultExtraInfo) => void;
    }
}
