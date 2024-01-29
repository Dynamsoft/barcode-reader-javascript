import { IntermediateResultExtraInfo, IntermediateResultUnit, Quadrilateral } from "dynamsoft-core";
export interface CandidateBarcodeZonesUnit extends IntermediateResultUnit {
    candidateBarcodeZones: Array<Quadrilateral>;
}
declare module "dynamsoft-capture-vision-router" {
    interface IntermediateResultReceiver {
        onCandidateBarcodeZonesUnitReceived?: (result: CandidateBarcodeZonesUnit, info: IntermediateResultExtraInfo) => void;
    }
}
