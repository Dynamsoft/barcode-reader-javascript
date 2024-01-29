import { IntermediateResultExtraInfo, IntermediateResultUnit } from "dynamsoft-core";
import { LocalizedBarcodeElement } from "./LocalizedBarcodeElement";
export interface LocalizedBarcodesUnit extends IntermediateResultUnit {
    localizedBarcodes: Array<LocalizedBarcodeElement>;
}
declare module "dynamsoft-capture-vision-router" {
    interface IntermediateResultReceiver {
        onLocalizedBarcodesReceived?: (result: LocalizedBarcodesUnit, info: IntermediateResultExtraInfo) => void;
    }
}
