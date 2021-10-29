import { Region } from "./region";
export interface FrameFilter {
    /**
     * The region definition of the frame to calculate the internal indicator.
     * Default Value: { regionLeft = 0, regionRight = 100, regionTop = 0, regionBottom = 100, regionMeasuredByPercentage = true }
    */
    region?: Region | any;
    /**
     * The threshold used for filtering frames.
     * Value range: [0, 1].
     * Default value: 0.1.
     * The SDK will calculate an inner indicator for each frame from AppendFrame(), if the change rate of the indicators between the current frame and the history frames is larger than the given threshold, the current frame will not be added to the inner frame queue waiting for decoding.
     */
    threshold?: number;
}
//# sourceMappingURL=framefilter.d.ts.map