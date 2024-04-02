import { Quadrilateral } from "dynamsoft-core";
import { EnumBarcodeFormat } from "../enum/EnumBarcodeFormat";
/**
 * The `CandidateBarcodeZone` interface represents a candidate barcode zone.
 */
export interface CandidateBarcodeZone {
    /** Location of the candidate barcode zone within the image. */
    location: Quadrilateral;
    /** Possible formats of the localized barcode. */
    possibleFormats: EnumBarcodeFormat;
}
