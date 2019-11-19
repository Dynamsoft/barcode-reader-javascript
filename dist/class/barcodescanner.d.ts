import ScannerConfig from 'interface/scannerconfig';
import TextResult from 'interface/textresult';
import VideoDeviceInfo from 'interface/videodeviceinfo';
import CompatibilityInfo from 'interface/compatibilityinfo';
import ScannerPlayCallbackInfo from 'interface/scannerplaycallbackinfo';
import BarcodeReader from './barcodereader';
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
    constructor();
    /**
     * Create a `BarcodeScanner` object.
     * @param config
     */
    static createInstance(config?: any): Promise<BarcodeScanner>;
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
     */
    onFrameRead?: (results: TextResult[]) => void;
    /**
     * This event is triggered when a not duplicated new barcode is found.
     * txt holds the barcode text result. result contains the actual barcode result, including the text result.
     * Old barcode will remember for duplicateForgetTime.
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
     */
    getAllCameras(): Promise<VideoDeviceInfo[]>;
    /**
     * Get infomation of the currently used camera.
     */
    getCurrentCamera(): Promise<VideoDeviceInfo | null>;
    /**
     * Choose the camera and play it by its information or devide id .
     * @param cameraInfoOrDeviceId
     */
    setCurrentCamera(cameraInfoOrDeviceId: any): Promise<ScannerPlayCallbackInfo>;
    /**
     * Get current video resolution.
     */
    getResolution(): number[];
    /**
     * Set the camera resolution.
     * @param width
     * @param height
     */
    setResolution(width: number | number[], height: number): Promise<ScannerPlayCallbackInfo>;
    /**
     * Get current scan settings of the BarcodeScanner object and saves it into a struct.
     */
    getScanSettings(): Promise<ScannerConfig>;
    /**
     * Update ScanSettings by specify parameter values.
     * @param settings
     */
    updateScanSettings(settings: ScannerConfig): Promise<void>;
    /**
     * Get the HTML element that contains your scanner object.
     */
    getUIElement(): HTMLElement;
    /**
     * set the HTML element that contains your scanner object.
     * @param element
     */
    setUIElement(element: HTMLElement): void;
    /**
     * Get current video settings of the BarcodeScanner object and saves it into a struct.
     */
    getVideoSettings(): MediaStreamConstraints;
    /**
     * Video play settings.
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
     * Stop playing the current camera.
     */
    stop(): void;
    /**
     * Pause the video.
     */
    pause(): void;
    /**
     * Change video settings during reading.
     */
    play(deviceId?: string, width?: number, height?: number): Promise<ScannerPlayCallbackInfo>;
    /**
     * Turn off the torch.
     * Return Promise.reject("not support") if your brower does not support torch.
     */
    turnOffTorch(): Promise<void>;
    /**
     * Turn on the torch.
     * Return Promise.reject("not support") if your brower does not support torch.
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
    open(): Promise<ScannerPlayCallbackInfo>;
    close(): void;
    show(): Promise<ScannerPlayCallbackInfo>;
    hide(): void;
}
