import { BarcodeDetails } from "./BarcodeDetails";
export interface DataMatrixDetails extends BarcodeDetails {
    rows: number;
    columns: number;
    dataRegionRows: number;
    dataRegionColumns: number;
    dataRegionNumber: number;
}
