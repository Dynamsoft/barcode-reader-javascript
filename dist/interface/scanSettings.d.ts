import { FrameFilter } from './framefilter';
/**
 * let scanSettings = await scanner.getScanSettings();
 * scanSettings.intervalTime = 100; // 100ms
 * scanSettings.duplicateForgetTime = 3000; // 3s
 * await scanner.updateScanSettings(scanSettings);
 */
export interface ScanSettings {
    intervalTime?: number;
    duplicateForgetTime?: number;
    /**
     * Filter frame during focusing.
     * `region` define the detecting area.
     * `threshold` is (0,1).
     * ```js
     * scanSettings.frameFilter = {
     *      region: {
     *          regionLeft: 0,
     *          regionTop: 47,
     *          regionRight: 100,
     *          regionBottom: 53,
     *          regionMeasuredByPercentage: true
     *      },
     *      threshold: 0.01
     * };
     * ```
     */
    frameFilter?: FrameFilter;
}
//# sourceMappingURL=scanSettings.d.ts.map