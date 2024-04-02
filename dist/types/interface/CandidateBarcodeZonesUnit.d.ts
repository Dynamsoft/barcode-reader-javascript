import { IntermediateResultExtraInfo, IntermediateResultUnit } from "dynamsoft-core";
import { CandidateBarcodeZone } from "./CandidateBarcodeZone";
/**
 * The `CandidateBarcodeZonesUnit` interface extends the `IntermediateResultUnit` interface and represents a unit of candidate barcode zones.
 */
export interface CandidateBarcodeZonesUnit extends IntermediateResultUnit {
    /** Array of candidate barcode zones represented as quadrilaterals. */
    candidateBarcodeZones: Array<CandidateBarcodeZone>;
}
declare module "dynamsoft-capture-vision-router" {
    interface IntermediateResultReceiver {
        onCandidateBarcodeZonesUnitReceived?: (result: CandidateBarcodeZonesUnit, info: IntermediateResultExtraInfo) => void;
    }
}
