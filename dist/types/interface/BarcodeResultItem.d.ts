import { CapturedResultItem, Quadrilateral } from "dynamsoft-core";
import { BarcodeDetails } from "./BarcodeDetails";
import { EnumBarcodeFormat } from "../enum/EnumBarcodeFormat";
export interface BarcodeResultItem extends CapturedResultItem {
    format: EnumBarcodeFormat;
    formatString: string;
    text: string;
    bytes: Array<number>;
    location: Quadrilateral;
    confidence: number;
    angle: number;
    moduleSize: number;
    details: BarcodeDetails;
    isMirrored: boolean;
    isDPM: boolean;
}
