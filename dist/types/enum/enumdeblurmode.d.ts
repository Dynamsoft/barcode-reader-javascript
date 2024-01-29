/** Label: DBRJS10.0.10-Check
 * @enum EnumDeblurMode
 *
 * Describes the deblur mode.
 */
export declare enum EnumDeblurMode {
    /**Performs deblur process using the direct binarization algorithm.*/
    DM_DIRECT_BINARIZATION = 1,
    /**Performs deblur process using the threshold binarization algorithm.*/
    DM_THRESHOLD_BINARIZATION = 2,
    /**Performs deblur process using the gray equalization algorithm.*/
    DM_GRAY_EQUALIZATION = 4,
    /**Performs deblur process using the smoothing algorithm.*/
    DM_SMOOTHING = 8,
    /**Performs deblur process using the morphing algorithm.*/
    DM_MORPHING = 16,
    /**Performs deblur process using the deep analysis algorithm.*/
    DM_DEEP_ANALYSIS = 32,
    /**Performs deblur process using the sharpening algorithm.*/
    DM_SHARPENING = 64,
    /**Performs deblur process based on the binary image from the localization process.*/
    DM_BASED_ON_LOC_BIN = 128,
    /**Performs deblur process using the sharpening and smoothing algorithm.*/
    DM_SHARPENING_SMOOTHING = 256,
    /**Reserved setting for deblur mode.*/
    DM_REV = -2147483648,
    /**Skips the deblur process.*/
    DM_SKIP = 0
}
