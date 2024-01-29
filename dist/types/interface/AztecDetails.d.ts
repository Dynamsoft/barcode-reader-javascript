import { BarcodeDetails } from "./BarcodeDetails";
export interface AztecDetails extends BarcodeDetails {
    rows: number;
    columns: number;
    layerNumber: number;
}
