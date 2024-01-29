import { EnumGrayscaleEnhancementMode, EnumGrayscaleTransformationMode } from "dynamsoft-core";
import { EnumBarcodeFormat } from "../enum/EnumBarcodeFormat";
export interface SimplifiedBarcodeReaderSettings {
    barcodeFormatIds: EnumBarcodeFormat;
    expectedBarcodesCount: number;
    grayscaleTransformationModes: Array<EnumGrayscaleTransformationMode>;
    grayscaleEnhancementModes: Array<EnumGrayscaleEnhancementMode>;
    localizationModes: Array<number>;
    deblurModes: Array<number>;
    minResultConfidence: number;
    minBarcodeTextLength: number;
    barcodeTextRegExPattern: string;
}
