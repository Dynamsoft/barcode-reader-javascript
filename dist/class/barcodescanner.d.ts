import ScannerConfig from 'interface/scannerconfig';
import TextResult from 'interface/textresult';
import VideoDeviceInfo from 'interface/videodeviceinfo';
import CompatibilityInfo from 'interface/compatibilityinfo';
import ScannerPlayCallbackInfo from 'interface/scannerplaycallbackinfo';
import BarcodeReader from './barcodereader';
import { EnumImagePixelFormat } from "../enum/enumimagepixelformat";
/**
 * A class dedicated to video decoding.
 * ```js
 * let scanner = await Dynamsoft.BarcodeScanner.createInstance();
 * scanner.onUnduplicatedRead = txt => console.log(txt);
 * await scanner.show();
 * ```
 */
export default class BarcodeScanner extends BarcodeReader {
    /**
     * @ignore
     */
    UIElement: HTMLElement;
    /**
     * @ignore
     */
    videoSettings: MediaStreamConstraints;
    /**
     * @ignore
     */
    intervalTime: number;
    private _isOpen;
    /**
     * @ignore
     */
    _lastDeviceId: string;
    private _intervalDetectVideoPause;
    /**
     * @ignore
     */
    _video: any;
    /**
     * @ignore
     */
    _cvsDrawArea: any;
    /**
     * @ignore
     */
    _selCam: any;
    /**
     * @ignore
     */
    _selRsl: any;
    /**
     * @ignore
     */
    _optGotRsl: any;
    /**
     * @ignore
     */
    _btnClose: any;
    /**
     * @ignore
     */
    _allCameras: VideoDeviceInfo[];
    /**
     * @ignore
     */
    _currentCamera?: VideoDeviceInfo;
    /**
     * @ignore
     */
    _videoTrack: MediaStreamTrack;
    /**
     * @ignore
     */
    _videoCapabilities: MediaTrackCapabilities;
    /**
     * @ignore
     */
    constructor();
    /**
     * Create a `BarcodeScanner` object.
    * ```
    * let scanner = await Dynamsoft.BarcodeScanner.createInstance();
    * ```
     * @param config
     */
    static createInstance(config?: any): Promise<BarcodeScanner>;
    /**
     * @ignore
     */
    decode(source: Blob | ArrayBuffer | Uint8Array | Uint8ClampedArray | HTMLImageElement | HTMLCanvasElement | HTMLVideoElement | string): Promise<TextResult[]>;
    /**
     * @ignore
     */
    decodeBase64String(source: string): Promise<TextResult[]>;
    /**
     * @ignore
     */
    decodeUrl(source: string): Promise<TextResult[]>;
    /**
     * @ignore
     */
    decodeBuffer(buffer: Uint8Array | Uint8ClampedArray | ArrayBuffer | Blob, width: number, height: number, stride: number, format: EnumImagePixelFormat, config?: any): Promise<any>;
    /**
     * @ignore
     */
    _onCameraSelChange: () => void;
    /**
     * @ignore
     */
    _onResolutionSelChange: () => void;
    /**
     * @ignore
     */
    _bindUI(): void;
    /**
     * @ignore
     */
    _unbindUI(): void;
    /**
     * The event that is triggered once a single frame has been scanned.
     * The results object contains all the barcode results that the reader was able to decode.
     * ```js
     * scanner.onFrameRead = results => {
     *     for(let result in results){
     *         console.log(result.barcodeText);
     *     }
     * };
     * ```
     */
    onFrameRead?: (results: TextResult[]) => void;
    /**
     * This event is triggered when a not duplicated new barcode is found.
     * txt holds the barcode text result. result contains the actual barcode result, including the text result.
     * Old barcode will remember for duplicateForgetTime.
     * ```js
     * scanner.onUnduplicatedRead = (txt, result) => {
     *     alert(txt);
     *     console.log(result);
     * };
     * ```
     */
    onUnduplicatedRead?: (txt: string, result: TextResult) => void;
    /**
     * @ignore
     */
    private _renderSelCameraInfo;
    /**
     * Check browser compatibility, whether it supports torch and actively call the camera to focus.
     */
    getCompatibility(): CompatibilityInfo;
    /**
     * Get infomation of all available cameras on your device.
     * ```js
     * let cameras = await scanner.getAllCameras();
     * if(cameras.length){
     *     await scanner.setCurrentCamera(cameras[0]);
     * }
     * ```
     */
    getAllCameras(): Promise<VideoDeviceInfo[]>;
    /**
     * Get infomation of the currently used camera.
     * ```js
     * let camera = await scanner.getCurrentCamera();
     * ```
     */
    getCurrentCamera(): Promise<VideoDeviceInfo | null>;
    /**
     * Choose the camera and play it by its information or devide id.
     * ```js
     * let cameras = await scanner.getAllCameras();
     * if(cameras.length){
     *     await scanner.setCurrentCamera(cameras[0]);
     * }
     * ```
     * @param cameraInfoOrDeviceId
     */
    setCurrentCamera(cameraInfoOrDeviceId: any): Promise<ScannerPlayCallbackInfo>;
    /**
     * Get current video resolution.
     * ```js
     * let rsl = await scanner.getResolution();
     * console.log(rsl.width + " x " + rsl.height);
     * ```
     */
    getResolution(): number[];
    /**
     * Set the camera resolution.
     * ```js
     * await scanner.setResolution(width, height);
     * ```
     * @param width
     * @param height
     */
    setResolution(width: number | number[], height: number): Promise<ScannerPlayCallbackInfo>;
    /**
     * Get current scan settings of the BarcodeScanner object and saves it into a struct.
     * ```js
     * let scanSettings = await scanner.getScanSettings();
     * scanSettings.intervalTime = 50;
     * scanSettings.duplicateForgetTime = 1000;
     * await scanner.updateScanSettings(scanSettings);
     * ```
     */
    getScanSettings(): Promise<ScannerConfig>;
    /**
     * Update ScanSettings by specify parameter values.
     * ```js
     * let scanSettings = await scanner.getScanSettings();
     * scanSettings.intervalTime = 50;
     * scanSettings.duplicateForgetTime = 1000;
     * await scanner.updateScanSettings(scanSettings);
     * ```
     * @param settings
     */
    updateScanSettings(settings: ScannerConfig): Promise<void>;
    /**
     * Get the HTML element that contains your scanner object.
     */
    getUIElement(): HTMLElement;
    /**
     * set the HTML element that contains your scanner object.
     * ```html
     * <video class="dbrScanner-video" playsinline="true"></video>
     * <script>
     *     let scanner = await Dynamsoft.BarcodeScanner.createInstance();
     *     scanner.setUIElement(document.getElementByClass("dbrScanner-video")[0]);
     *     await scanner.show();
     * </script>
     * ```
     * @param element
     */
    setUIElement(element: HTMLElement): void;
    /**
     * Get current video settings of the BarcodeScanner object and saves it into a struct.
     */
    getVideoSettings(): MediaStreamConstraints;
    /**
     * Video play settings.
     * ```js
     * await scanner.updateVideoSettings({ video: {width: {ideal: 1280}, height: {ideal: 720}, facingMode: {ideal: 'environment'}} });
     * ```
     * @param MediaStreamConstraints
     */
    updateVideoSettings(MediaStreamConstraints: any): Promise<ScannerPlayCallbackInfo | void>;
    /**
     * Check if the scanner is open.
     */
    isOpen(): boolean;
    /**
     * Show and start the video, then read barcodes.
     * @ignore
     */
    _show(): void;
    /**
     * Hide the video. Equivalent to previous method close().
     * @ignore
     */
    _hide(): void;
    /**
     * Stop the video, stop the decoding, and release the camera.
     */
    stop(): void;
    /**
     * Pause the video and decoding. Will not release the camera.
     */
    pause(): void;
    /**
     * Continue the video and decoding.
     * ```js
     * scanner.pause();
     * \\*** a lot of work ***
     * await scanner.play();
     * ```
     */
    play(deviceId?: string, width?: number, height?: number): Promise<ScannerPlayCallbackInfo>;
    /**
     * Turn off the torch.
     * Will reject if your brower does not support torch.
     * ```js
     * // scanner is open.
     * await scanner.turnOffTorch();
     * ```
     */
    turnOffTorch(): Promise<void>;
    /**
     * Turn on the torch.
     * Will reject if your brower does not support torch.
     * ```js
     * // scanner is open.
     * await scanner.turnOnTorch();
     * ```
     */
    turnOnTorch(): Promise<void>;
    /**
     * @ignore
     */
    _cloneDecodeResults(results: any): any;
    /**
     * @ignore
     */
    private _loopReadVideo;
    /**
     * Open the camera and start decoding.
     * ```js
     * await scanner.open()
     * ```
     */
    open(): Promise<ScannerPlayCallbackInfo>;
    /**
     * Release camera, stop decoding.
     */
    close(): void;
    /**
     * Open the camera, start decoding, and remove the UIElement `display` style if the original style is `display:none;`.
     * ```js
     * await scanner.show()
     * ```
     */
    show(): Promise<ScannerPlayCallbackInfo>;
    /**
     * Release camera, stop decoding, and set the Element as `display:none;`.
     */
    hide(): void;
}
