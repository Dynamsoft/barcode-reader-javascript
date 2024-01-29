import { RegionObjectElement } from "dynamsoft-core";
import { EnumBarcodeFormat } from "../enum/EnumBarcodeFormat";
export interface LocalizedBarcodeElement extends RegionObjectElement {
    possibleFormats: EnumBarcodeFormat;
    possibleFormatsString: string;
    angle: number;
    moduleSize: number;
    confidence: number;
}
