import { BarcodeDetails } from "./BarcodeDetails";
export interface QRCodeDetails extends BarcodeDetails {
    rows: number;
    columns: number;
    errorCorrectionLevel: number;
    version: number;
    model: number;
    mode: number;
    page: number;
    totalPage: number;
    parityData: number;
}
