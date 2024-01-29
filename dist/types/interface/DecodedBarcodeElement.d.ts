import { RegionObjectElement } from "dynamsoft-core";
import { BarcodeDetails } from "./BarcodeDetails";
import { ExtendedBarcodeResult } from "./ExtendedBarcodeResult";
import { EnumBarcodeFormat } from "../enum/EnumBarcodeFormat";
export interface DecodedBarcodeElement extends RegionObjectElement {
    format: EnumBarcodeFormat;
    formatString: string;
    text: string;
    bytes: Array<number>;
    details: BarcodeDetails;
    isDPM: boolean;
    isMirrored: boolean;
    angle: number;
    moduleSize: number;
    confidence: number;
    extendedBarcodeResults: Array<ExtendedBarcodeResult>;
}
