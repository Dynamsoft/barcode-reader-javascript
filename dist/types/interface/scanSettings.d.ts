/**
 * let scanSettings = await scanner.getScanSettings();
 * scanSettings.intervalTime = 100; // 100ms
 * scanSettings.duplicateForgetTime = 3000; // 3s
 * await scanner.updateScanSettings(scanSettings);
 */
export interface ScanSettings {
    intervalTime?: number;
    duplicateForgetTime?: number;
    oneDRememberFrameCount?: number;
    oneDTrustFrameCount?: number;
    /**
     * Whether to play sound when the scanner reads a barcode successfully.
     * Default value is `never`, which does not play sound.
     * Use `frame` to play a sound when any barcode is found within a frame.
     * Use `unique` to play a sound only when any unique/unduplicated barcode is found within a frame.
     * ```js
     * // A user gesture required. https://developers.google.com/web/updates/2017/09/autoplay-policy-changes#chrome_enterprise_policies
     * startPlayButton.addEventListener('click', function() {
     *   scanner.whenToPlaySoundforSuccessfulRead = 'frame';
     * });
     * ```
     * refer: `favicon bug` https://bugs.chromium.org/p/chromium/issues/detail?id=1069731&q=favicon&can=2
     */
    whenToPlaySoundforSuccessfulRead?: string;
    /**
     * The sound to play when the scanner get successfull read.
     * ```js
     * scanner.soundOnSuccessfullRead = new Audio("./pi.mp3");
     * ```
     */
    soundOnSuccessfullRead?: string;
    /**
     * Whether to vibrate when the scanner reads a barcode successfully.
     * Default value is `never`, which does not vibrate.
     * Use `frame` to vibrate when any barcode is found within a frame.
     * Use `unique` to vibrate only when any unique/unduplicated barcode is found within a frame.
     * ```js
     * // Can I use? https://caniuse.com/?search=vibrate
     * // A user gesture required. https://developers.google.com/web/updates/2017/09/autoplay-policy-changes#chrome_enterprise_policies
     * startPlayButton.addEventListener('click', function() {
     *   scanner.whenToVibrateforSuccessfulRead = 'frame';
     * });
     * ```
     */
    whenToVibrateforSuccessfulRead?: string;
    /**
     * Get or set how long (ms) the vibration lasts.
     * @see [[whenToVibrateforSuccessfulRead]]
     */
    vibrateDuration?: number;
    captureAndDecodeInParallel?: boolean;
    autoZoom?: boolean;
    autoFocus?: boolean;
    autoSuggestTip?: boolean;
}
//# sourceMappingURL=scanSettings.d.ts.map