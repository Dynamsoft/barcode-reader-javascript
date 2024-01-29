import { IntermediateResultExtraInfo, IntermediateResultUnit } from "dynamsoft-core";
import { DecodedBarcodeElement } from "./DecodedBarcodeElement";
export interface DecodedBarcodesUnit extends IntermediateResultUnit {
    decodedBarcodes: Array<DecodedBarcodeElement>;
}
declare module "dynamsoft-capture-vision-router" {
    interface IntermediateResultReceiver {
        onDecodedBarcodesReceived?: (result: DecodedBarcodesUnit, info: IntermediateResultExtraInfo) => void;
    }
}
