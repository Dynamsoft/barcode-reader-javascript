import { ImageTag } from "dynamsoft-core";
import { BarcodeResultItem } from "./BarcodeResultItem";
export interface DecodedBarcodesResult {
    readonly originalImageHashId: string;
    readonly originalImageTag: ImageTag;
    readonly barcodeResultItems: Array<BarcodeResultItem>;
    readonly errorCode: number;
    readonly errorString: string;
}
declare module "dynamsoft-capture-vision-router" {
    interface CapturedResultReceiver {
        onDecodedBarcodesReceived?: (result: DecodedBarcodesResult) => void;
    }
    interface CapturedResultFilter {
        onDecodedBarcodesReceived?: (result: DecodedBarcodesResult) => void;
    }
}
