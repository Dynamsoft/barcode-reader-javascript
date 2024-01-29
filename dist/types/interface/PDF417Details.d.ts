import { BarcodeDetails } from "./BarcodeDetails";
export interface PDF417Details extends BarcodeDetails {
    rows: number;
    columns: number;
    errorCorrectionLevel: number;
    hasLeftRowIndicator: boolean;
    hasRightRowIndicator: boolean;
}
