/** Label: DBRJS10.0.10-Check
 * @enum EnumLocalizationMode
 *
 * Describes the localization mode.
 */
export declare enum EnumLocalizationMode {
    /**Not supported yet. */
    LM_AUTO = 1,
    /**Localizes barcodes by searching for connected blocks. This algorithm usually gives best result and it is recommended to set ConnectedBlocks to the highest priority. */
    LM_CONNECTED_BLOCKS = 2,
    /**Localizes barcodes by groups of contiguous black-white regions. This is optimized for QRCode and DataMatrix. */
    LM_STATISTICS = 4,
    /**Localizes barcodes by searching for groups of lines. This is optimized for 1D and PDF417 barcodes. */
    LM_LINES = 8,
    /**Localizes barcodes quickly. This mode is recommended in interactive scenario. Check @ref LM for available argument settings.*/
    LM_SCAN_DIRECTLY = 16,
    /**Localizes barcodes by groups of marks.This is optimized for DPM codes. */
    LM_STATISTICS_MARKS = 32,
    /**Localizes barcodes by groups of connected blocks and lines.This is optimized for postal codes. */
    LM_STATISTICS_POSTAL_CODE = 64,
    /**Localizes barcodes from the centre of the image. Check @ref LM for available argument settings. */
    LM_CENTRE = 128,
    /**Localizes 1D barcodes fast. Check @ref LM for available argument settings. */
    LM_ONED_FAST_SCAN = 256,
    LM_REV = -2147483648,
    /**Skips localization. */
    LM_SKIP = 0
}
