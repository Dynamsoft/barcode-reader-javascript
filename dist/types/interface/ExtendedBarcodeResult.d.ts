import { DSImageData } from "dynamsoft-core";
import { EnumExtendedBarcodeResultType } from "../enum/EnumExtendedBarcodeResultType";
import { DecodedBarcodeElement } from "./DecodedBarcodeElement";
export interface ExtendedBarcodeResult extends DecodedBarcodeElement {
    extendedBarcodeResultType: EnumExtendedBarcodeResultType;
    deformation: number;
    clarity: number;
    samplingImage: DSImageData;
}
