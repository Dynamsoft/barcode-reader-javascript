import { LocalizationResult } from './localizationresult';
import { EnumBarcodeFormat } from "../enum/enumbarcodeformat";
/**
 * @see [C++ TextResult](https://www.dynamsoft.com/barcode-reader/programming/c-cplusplus/struct/TextResult.html?src=cpp&&ver=latest)
*/
export interface TextResult {
    /**
     * The barcode text.
     */
    barcodeText: string;
    /**
     * The barcode format.
     */
    barcodeFormat: number | EnumBarcodeFormat;
    /**
     * Barcode type in string.
     */
    barcodeFormatString: string;
    /**
     * The barcode content in a byte array.
     */
    barcodeBytes: number[];
    /**
     * The corresponding localization result.
     */
    localizationResult: LocalizationResult;
}
//# sourceMappingURL=textresult.d.ts.map