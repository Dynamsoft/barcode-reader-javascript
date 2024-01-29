import { BarcodeDetails } from "./BarcodeDetails";
export interface OneDCodeDetails extends BarcodeDetails {
    startCharsBytes: Array<number>;
    stopCharsBytes: Array<number>;
    checkDigitBytes: Array<number>;
    startPatternRange: number;
    middlePatternRange: number;
    endPatternRange: number;
}
