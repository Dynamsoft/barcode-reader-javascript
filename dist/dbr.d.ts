/**
* Dynamsoft JavaScript Library
* @product Dynamsoft Barcode Reader JS Edition
* @website http://www.dynamsoft.com
* @preserve Copyright 2020, Dynamsoft Corporation
* @author Dynamsoft
* @version 7.3.0.2 (js 20200214)
* @fileoverview Dynamsoft JavaScript Library for Barcode Reader
* More info on DBR JS: https://www.dynamsoft.com/Products/barcode-recognition-javascript.aspx
*/
/// <reference types="node" />

export interface LocalizationResult {
	/**
	 * The angle of a barcode. Values range from 0 to 360.
	 */
	angle: number;
	/**
	 * The stage when the results are returned.
	 */
	/**
	 * The array which stores the coordinates of four result points. e.g. ["60, 82", "60, 88", "51, 88", "51, 82"]
	 */
	/**
	 * The X coordinate of the left-most point.
	 */
	x1: number;
	/**
	 * The X coordinate of the second point in a clockwise direction.
	 */
	x2: number;
	/**
	 * The X coordinate of the third point in a clockwise direction.
	 */
	x3: number;
	/**
	 * The X coordinate of the fourth point in a clockwise direction.
	 */
	x4: number;
	/**
	 * The Y coordinate of the left-most point.
	 */
	y1: number;
	/**
	 * The Y coordinate of the second point in a clockwise direction.
	 */
	y2: number;
	/**
	 * The Y coordinate of the third point in a clockwise direction.
	 */
	y3: number;
	/**
	 * The Y coordinate of the fourth point in a clockwise direction.
	 */
	y4: number;
}
export declare enum EnumBarcodeFormat {
	BF_ALL = -32505857,
	BF_ONED = 2047,
	BF_GS1_DATABAR = 260096,
	BF_POSTALCODE = 32505856,
	BF_CODE_39 = 1,
	BF_CODE_128 = 2,
	BF_CODE_93 = 4,
	BF_CODABAR = 8,
	BF_ITF = 16,
	BF_EAN_13 = 32,
	BF_EAN_8 = 64,
	BF_UPC_A = 128,
	BF_UPC_E = 256,
	BF_INDUSTRIAL_25 = 512,
	BF_CODE_39_EXTENDED = 1024,
	BF_GS1_DATABAR_OMNIDIRECTIONAL = 2048,
	BF_GS1_DATABAR_TRUNCATED = 4096,
	BF_GS1_DATABAR_STACKED = 8192,
	BF_GS1_DATABAR_STACKED_OMNIDIRECTIONAL = 16384,
	BF_GS1_DATABAR_EXPANDED = 32768,
	BF_GS1_DATABAR_EXPANDED_STACKED = 65536,
	BF_GS1_DATABAR_LIMITED = 131072,
	BF_PATCHCODE = 262144,
	BF_USPSINTELLIGENTMAIL = 1048576,
	BF_POSTNET = 2097152,
	BF_PLANET = 4194304,
	BF_AUSTRALIANPOST = 8388608,
	BF_UKROYALMAIL = 16777216,
	BF_PDF417 = 33554432,
	BF_QR_CODE = 67108864,
	BF_DATAMATRIX = 134217728,
	BF_AZTEC = 268435456,
	BF_MAXICODE = 536870912,
	BF_MICRO_QR = 1073741824,
	BF_MICRO_PDF417 = 524288,
	BF_GS1_COMPOSITE = -2147483648,
	BF_NULL = 0
}
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
export interface RegionDefinition {
	regionBottom: number;
	regionRight: number;
	regionLeft: number;
	regionTop: number;
	regionMeasuredByPercentage: number | boolean;
}
export declare enum EnumScaleUpMode {
	SUM_AUTO = 1,
	SUM_LINEAR_INTERPOLATION = 2,
	SUM_NEAREST_NEIGHBOUR_INTERPOLATION = 4,
	SUM_SKIP = 0
}
/**
 * @see [RuntimeSettings](https://www.dynamsoft.com/help/Barcode-Reader/struct_dynamsoft_1_1_barcode_1_1_public_runtime_settings.html)
 */
export interface RuntimeSettings {
	/**
	 * Sets the formats of the barcode in BarcodeFormat group 1 to be read. Barcode formats in BarcodeFormat group 1 can be combined.
	 */
	barcodeFormatIds: number;
	/**
	 * Sets the formats of the barcode in BarcodeFormat group 2 to be read. Barcode formats in BarcodeFormat group 1 can be combined.
	 */
	barcodeFormatIds_2: number;
	/**
	 * Sets the mode and priority for binarization.
	 */
	binarizationModes: EnumBinarizationMode[];
	/**
	 * Sets the degree of blurriness of the barcode.
	 */
	deblurLevel: number;
	/**
	 * Sets the number of barcodes expected to be detected for each image.
	 */
	expectedBarcodesCount: number;
	/**
	 * Sets the further modes.
	 */
	furtherModes: any;
	/**
	 * Sets which types of intermediate result to be kept for further reference. Intermediate result types can be combined.
	 */
	intermediateResultTypes: EnumIntermediateResultType;
	/**
	 * Sets the mode and priority for localization algorithms.
	 */
	localizationModes: number[];
	/**
	 * Sets the range of barcode text length for barcodes search
	 */
	minBarcodeTextLength: number;
	/**
	 * The minimum confidence of the result
	 */
	minResultConfidence: number;
	/**
	 * Sets the region definition including the regionTop, regionLeft, regionRight, regionBottom and regionMeasuredByPercentage.
	 */
	region: RegionDefinition;
	/**
	 * Specifies the format for the coordinates returned
	 */
	resultCoordinateType: number;
	/**
	 * Sets whether or not to return the clarity of the barcode zone.
	 */
	returnBarcodeZoneClarity: number;
	/**
	 * Sets the threshold for the image shrinking
	 */
	scaleDownThreshold: number;
	/**
	 * Sets the mode and priority to control the sampling methods of scale-up for linear barcode with small module sizes.
	 */
	scaleUpModes: EnumScaleUpMode[];
	/**
	 * Sets the phase where the algorithm stops.
	 */
	terminatePhase: EnumTerminatePhase;
	/**
	 * Sets the mode and priority for the order of the text results returned.
	 */
	textResultOrderModes: EnumTextResultOrderMode[];
	/**
	 * Sets the maximum amount of time (in milliseconds) that should be spent searching for a barcode per page.
	 * It does not include the time taken to load/decode an image (Tiff, PNG, etc) from disk into memory.
	 */
	timeout: number;
}
export declare enum EnumImagePixelFormat {
	IPF_Binary = 0,
	IPF_BinaryInverted = 1,
	IPF_GrayScaled = 2,
	IPF_NV21 = 3,
	IPF_RGB_565 = 4,
	IPF_RGB_555 = 5,
	IPF_RGB_888 = 6,
	IPF_ARGB_8888 = 7,
	IPF_RGB_161616 = 8,
	IPF_ARGB_16161616 = 9
}
/**
 * A class dedicated to image decoding.
 * ```js
 * let reader = await Dynamsoft.BarcodeReader.createInstance();
 * let results = await reader.decode(imageSource);
 * for(let result of results){
 *     console.log(result.barcodeText);
 * }
 * ```
 */
export declare class BarcodeReader {
	protected static bNode: boolean;
	private static _jsVersion;
	private static _jsEditVersion;
	protected static _version: string;
	static readonly version: string;
	protected static _productKeys: string;
	static productKeys: string;
	/**
	 * modify from https://gist.github.com/2107/5529665
	 * @ignore
	 */
	static browserInfo: any;
	/**
	 * Detect environment and get a report.
	 */
	static detectEnvironment(): Promise<any>;
	/**
	 * @ignore
	 */
	static _workerName: string;
	/**
	 * @ignore
	 */
	static _bUseIndexDB: boolean;
	protected static _engineResourcePath?: string;
	/**
	 * The SDK will try to automatically explore the engine location.
	 * If the auto-explored engine location is not accurate, manually specify the engine location.
	 * ```js
	 * Dynamsoft.BarcodeReader.engineResourcePath = "https://cdn.jsdelivr.net/npm/dynamsoft-javascript-barcode@7.2.2/dist/";
	 * await Dynamsoft.BarcodeReader.loadWasm();
	 * ```
	*/
	static engineResourcePath: string;
	protected static _licenseServer?: string;
	/**
	 * @ignore
	 */
	/**
	* @ignore
	*/
	static licenseServer: string;
	private static _deviceFriendlyName;
	/**
	 * @ignore
	 */
	/**
	* @ignore
	*/
	static deviceFriendlyName: string;
	/**
	 * @ignore
	 */
	static _isShowRelDecodeTimeInResults: boolean;
	/**
	 * @ignore
	 */
	_canvasMaxWH: number;
	/**
	 * @ignore
	 */
	static _onLog: (message: any) => void;
	/**
	 * @ignore
	 */
	static _bWasmDebug: boolean;
	/**
	 * @ignore
	 */
	static _bSendSmallRecordsForDebug: boolean;
	/**
	 * Whether to use full feature wasm.
	 * The api may change in later version.
	 * <pre>
	 * Min wasm:
	 * oned + qr + pdf417 + datamatrix.
	 * ===
	 * Full wasm:
	 * all supported barcode format +
	 * high level deblur available (lv8, 9) +
	 * DPM +
	 * template API +
	 * intermediate results API
	 * ===
	 * e.g.:
	 * Use min in video deocode (small, download and initialization fast).
	 * Use full in file decode (need high level deblur).
	 * </pre>
	 *
	 * Need to be set before loadWasm.
	 * ```js
	 * Dynamsoft.BarcodeReader._bUseFullFeature = true;
	 * await Dynamsoft.BarcodeReader.loadWasm();
	 * ```
	 * For web, `_bUseFullFeature` is false as default.
	 * For Node.js, `_bUseFullFeature` will not work, and BarcodeReader will always work on full feature.
	 */
	static _bUseFullFeature: boolean;
	protected static _dbrWorker: Worker;
	protected static _nextTaskID: number;
	protected static _taskCallbackMap: Map<number, (body: any) => void>;
	private static _loadWasmStatus;
	private static _loadWasmCallbackArr;
	/**
	 * @ignore
	 */
	_instanceID: number;
	/**
	 * Whether to save the original image into canvas.
	 * ```js
	 * reader.bSaveOriCanvas = true;
	 * let results = await reader.decode(source);
	 * document.body.append(reader.oriCanvas);
	 * ```
	 */
	bSaveOriCanvas: boolean;
	/**
	 * The original canvas.
	 * ```js
	 * reader.bSaveOriCanvas = true;
	 * let results = await reader.decode(source);
	 * document.body.append(reader.oriCanvas);
	 * ```
	 */
	oriCanvas?: HTMLCanvasElement;
	protected decodeRecords: string[];
	/**
	 * @ignore A callback when wasm download success in browser environment.
	 */
	static _onWasmDownloaded: () => void;
	/**
	 * Determine if the decoding module has been loaded successfully.
	 */
	static isLoaded(): boolean;
	/**
	 * Indicates whether the instance has been destroyed.
	 */
	bDestroyed: boolean;
	/**
	 * Manually load and compile the decoding module. Used for preloading to avoid taking too long for lazy loading.
	 */
	static loadWasm(): Promise<void>;
	protected static createInstanceInWorker(bScanner?: boolean): Promise<number>;
	/**
	 * Create a `BarcodeReader` object.
	 * ```
	 * let reader = await Dynamsoft.BarcodeReader.createInstance();
	 * ```
	 */
	static createInstance(): Promise<BarcodeReader>;
	/**
	 * The main decoding method can accept a variety of data types, including binary data, images, base64(with mime), urls, etc.
	 * ```js
	 * let results = await reader.decode(blob);
	 * for(let result of results){
	 *     console.log(result.barcodeText);
	 * }
	 * ```
	 * @param source
	 */
	decode(source: Blob | Buffer | ArrayBuffer | Uint8Array | Uint8ClampedArray | HTMLImageElement | HTMLCanvasElement | HTMLVideoElement | string): Promise<TextResult[]>;
	/**
	 * The decoding method can accept base64 with or without mime.
	 * e.g. `data:image/jpg;base64,Xfjshekk....` or `Xfjshekk...`.
	 * ```js
	 * let results = await reader.decodeBase64String(strBase64);
	 * for(let result of results){
	 *     console.log(result.barcodeText);
	 * }
	 * ```
	 * @param base64
	 */
	decodeBase64String(base64: string): Promise<TextResult[]>;
	/**
	 * The decoding method can accept url. The url source need to be in the same domain or allowed cors.
	 * ```js
	 * let results = await reader.decodeUrl("./1.png");
	 * for(let result of results){
	 *     console.log(result.barcodeText);
	 * }
	 * ```
	 * @param url
	 */
	decodeUrl(url: string): Promise<TextResult[]>;
	/**
	 * Decodes barcodes from the memory buffer containing image pixels in defined format.
	 * @ignore
	 */
	_decodeBuffer_Uint8Array(buffer: Uint8Array | Uint8ClampedArray, width: number, height: number, stride: number, format: EnumImagePixelFormat, config?: any): Promise<any>;
	/**
	 *
	 * @param buffer
	 * @param width
	 * @param height
	 * @param stride
	 * @param format
	 * @param config
	 * @ignore
	 */
	_decodeBuffer_Blob(buffer: Blob, width: number, height: number, stride: number, format: EnumImagePixelFormat, config?: any): Promise<any>;
	decodeBuffer(buffer: Uint8Array | Uint8ClampedArray | ArrayBuffer | Blob | Buffer, width: number, height: number, stride: number, format: EnumImagePixelFormat, config?: any): Promise<any>;
	/**
	 * @ignore
	 */
	_decodeFileInMemory_Uint8Array(bytes: Uint8Array): Promise<any>;
	/**
	 * Gets current settings and save it into a struct.
	 * ```js
	 * let settings = await reader.getRuntimeSettings();
	 * settings.deblurLevel = 5;
	 * await reader.updateRuntimeSettings(settings);
	 * ```
	 * @see [RuntimeSettings](https://www.dynamsoft.com/help/Barcode-Reader/struct_dynamsoft_1_1_barcode_1_1_public_runtime_settings.html)
	 */
	getRuntimeSettings(): Promise<RuntimeSettings>;
	/**
	 * Update runtime settings with a given struct or a string of `speed`, `balance` or `coverage`.
	 * Use `speed`, `balance` and `coverage` to use preset settings for BarcodeReader.
	 * The default settings for BarcodeReader is `coverage`.
	 * ```js
	 * await reader.updateRuntimeSettings('balance');
	 * let settings = await reader.getRuntimeSettings();
	 * settings.barcodeFormatIds = Dynamsoft.EnumBarcodeFormat.BF_ONED;
	 * await reader.updateRuntimeSettings(settings);
	 * ```
	 * @see [RuntimeSettings](https://www.dynamsoft.com/help/Barcode-Reader/struct_dynamsoft_1_1_barcode_1_1_public_runtime_settings.html)
	 */
	updateRuntimeSettings(settings: RuntimeSettings | string): Promise<void>;
	/**
	 * Resets all parameters to default values.
	 * ```js
	 * await reader.resetRuntimeSettings();
	 * ```
	 */
	resetRuntimeSettings(): Promise<void>;
	/**
	 * Outputs the license content as an encrypted string from the license server to be used for offline license verification.
	 * ```js
	 * let strSettings = await reader.outputSettingsToString();
	 * ```
	 * The method is only supported in the full feature edition.
	 * @ignore
	 */
	outputSettingsToString(): Promise<string>;
	/**
	 * Initialize runtime settings with the settings in given JSON string.
	 * ```js
	 * await reader.initRuntimeSettingsWithString("{\"Version\":\"3.0\", \"ImageParameter\":{\"Name\":\"IP1\", \"BarcodeFormatIds\":[\"BF_QR_CODE\"], \"ExpectedBarcodesCount\":10}}");
	 * ```
	 * The method is only supported in the full feature edition.
	 * @ignore
	 */
	initRuntimeSettingsWithString(settings: any): Promise<void>;
	private _decode_Blob;
	/**
	 *
	 * @param arrayBuffer
	 * @param config
	 * @ignore
	 */
	private _decode_ArrayBuffer;
	/**
	 *
	 * @param uint8Array
	 * @param config
	 * @ignore
	 */
	private _decode_Uint8Array;
	/**
	 *
	 * @param image
	 * @param config
	 * @ignore
	 */
	private _decode_Image;
	private _decode_Canvas;
	/**
	 *
	 * @param video
	 * @param config
	 * @ignore
	 */
	_decode_Video(video: HTMLVideoElement, config?: any): Promise<TextResult[]>;
	private _decode_Base64;
	private _decode_Url;
	private _decode_FilePath;
	/**
	 * @ignore
	 */
	static BarcodeReaderException(ag0: any, ag1: any): Error;
	private _handleRetJsonString;
	/**
	 * Sets the optional argument for a specified mode in Modes parameters.
	 * ```js
	 * await reader.setModeArgument("BinarizationModes", 0, "EnableFillBinaryVacancy", "1");
	 * ```
	 * @param modeName
	 * @param index
	 * @param argumentName
	 * @param argumentValue
	 */
	setModeArgument(modeName: string, index: number, argumentName: string, argumentValue: string): Promise<void>;
	/**
	 * Gets the optional argument for a specified mode in Modes parameters.
	 * ```js
	 * let argumentValue = await reader.getModeArgument("BinarizationModes", 0, "EnableFillBinaryVacancy");
	 * ```
	 * @param modeName
	 * @param index
	 * @param argumentName
	 */
	getModeArgument(modeName: string, index: number, argumentName: string): Promise<string>;
	/**
	 * The method is only supported in the full feature edition.
	 * Returns intermediate results containing the original image, the colour clustered image, the binarized Image, contours, Lines, TextBlocks, etc.
	 * ```js
	 * let imResults = await reader.getIntermediateResults();
	 * ```
	 * @ignore
	 */
	getIntermediateResults(): Promise<any>;
	/**
	 * @ignore
	 */
	getIntermediateCanvas(): Promise<HTMLCanvasElement[]>;
	/**
	 * Destructor the `BarcodeReader` object.
	 * Equivalent to the previous method `deleteInstance()`.
	 */
	destroy(): Promise<any>;
}
export interface FrameFilter {
	/**
	 * The region definition of the frame to calculate the internal indicator.
	 * Default Value: { regionLeft = 0, regionRight = 100, regionTop = 0, regionBottom = 100, regionMeasuredByPercentage = true }
	*/
	region?: RegionDefinition | any;
	/**
	 * The threshold used for filtering frames.
	 * Value range: [0, 1].
	 * Default value: 0.1.
	 * The SDK will calculate an inner indicator for each frame from AppendFrame(), if the change rate of the indicators between the current frame and the history frames is larger than the given threshold, the current frame will not be added to the inner frame queue waiting for decoding.
	 */
	threshold?: number;
}
export interface ScannerConfig {
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
export interface VideoDeviceInfo {
	deviceId: string;
	label: string;
}
export interface ScannerPlayCallbackInfo {
	height: number;
	width: number;
}
/**
 * A class dedicated to video decoding.
 * ```js
 * let scanner = await Dynamsoft.BarcodeScanner.createInstance();
 * scanner.onUnduplicatedRead = txt => console.log(txt);
 * await scanner.show();
 * ```
 */
export declare class BarcodeScanner extends BarcodeReader {
	private static _defaultUIElementURL;
	static defaultUIElementURL: string;
	/**
	 * @ignore
	 */
	/**
	 * @ignore
	 */
	UIElement: HTMLElement;
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
	setUIElement(elementOrUrl: HTMLElement | string): Promise<void>;
	/**
	 * @ignore
	 */
	private styleEls;
	/**
	 * @ignore
	 */
	videoSettings: MediaStreamConstraints;
	private _singleFrameMode;
	/**
	 * A mode not use video, get a frame from OS camera instead.
	 * ```js
	 * let scanner = await Dynamsoft.BarcodeReader.createInstance();
	 * if(scanner.singleFrameMode){
	 *     // the browser does not provide webrtc API, dbrjs automatically use singleFrameMode instead
	 *     scanner.show();
	 * }
	 * ```
	 */
	/**
	* A mode not use video, get a frame from OS camera instead.
	* ```js
	* let scanner = await Dynamsoft.BarcodeReader.createInstance();
	* scanner.singleFrameMode = true; // use singleFrameMode anyway
	* scanner.show();
	* ```
	*/
	singleFrameMode: boolean;
	private _singleFrameModeIpt;
	private _clickIptSingleFrameMode;
	/**
	 * @ignore
	 */
	intervalTime: number;
	private _isOpen;
	private _assertOpen;
	private _bPauseScan;
	/**
	 * @ignore
	 */
	_lastDeviceId: string;
	private _intervalDetectVideoPause;
	/**
	 * @ignore
	 */
	_video: HTMLVideoElement;
	/**
	 * @ignore
	 */
	_cvsDrawArea: HTMLCanvasElement;
	/**
	 * @ignore
	 */
	_divScanArea: any;
	/**
	 * @ignore
	 */
	_divScanLight: any;
	/**
	 * @ignore
	 */
	_bgLoading: any;
	/**
	 * @ignore
	 */
	_bgCamera: any;
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
	private _soundOnSuccessfullRead;
	/**
	 * The sound to play when the scanner get successfull read.
	 */
	/**
	* The sound to play when the scanner get successfull read.
	* ```js
	* scanner.soundOnSuccessfullRead = new Audio("./pi.mp3");
	* ```
	*/
	soundOnSuccessfullRead: HTMLAudioElement;
	/**
	 * Whether to play sound when the scanner get successfull read.
	 * ```js
	 * scanner.bPlaySoundOnSuccessfulRead = true;
	 * scanner.show();
	 * ```
	 */
	bPlaySoundOnSuccessfulRead: boolean;
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
	regionMaskFillStyle: string;
	regionMaskStrokeStyle: string;
	regionMaskLineWidth: number;
	barcodeFillStyle: string;
	barcodeStrokeStyle: string;
	barcodeLineWidth: number;
	private _region;
	private region;
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
	private clearMapDecodeRecord;
	/**
	 * Update runtime settings with a given struct or a string of `speed`, `balance` or `coverage`.
	 * Use `speed`, `balance` and `coverage` to use preset settings for BarcodeScanner.
	 * The default settings for BarcodeScanner is `speed`.
	 * ```js
	 * await scanner.updateRuntimeSettings('balance');
	 * let settings = await scanner.getRuntimeSettings();
	 * settings.barcodeFormatIds = Dynamsoft.EnumBarcodeFormat.BF_ONED;
	 * await scanner.updateRuntimeSettings(settings);
	 * ```
	 * @see [RuntimeSettings](https://www.dynamsoft.com/help/Barcode-Reader/struct_dynamsoft_1_1_barcode_1_1_public_runtime_settings.html)
	 */
	updateRuntimeSettings(settings: RuntimeSettings | string): Promise<void>;
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
	_onCloseBtnClick: () => void;
	/**
	 * @ignore
	 */
	_bindUI(): void;
	/**
	 * @ignore
	 */
	_unbindUI(): void;
	/**
	 * scanner.played = rsl=>{ console.log(rsl.width+'x'+rsl.height) };
	 */
	onPlayed?: (info: ScannerPlayCallbackInfo) => void;
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
	 * @ignore
	 */
	_show(): void;
	/**
	 * Stop the video, and release the camera.
	 */
	stop(): void;
	/**
	 * Pause the video. Will not release the camera.
	 */
	pause(): void;
	/**
	 * Continue the video.
	 * ```js
	 * scanner.pause();
	 * \\*** a lot of work ***
	 * await scanner.play();
	 * ```
	 */
	play(deviceId?: string, width?: number, height?: number): Promise<ScannerPlayCallbackInfo>;
	/**
	 * Pause the decoding process.
	 */
	pauseScan(): void;
	/**
	 * Resume the decoding process.
	 */
	resumeScan(): void;
	/**
	 * Get the camera capabilities. Chrome only.
	 * Only available when the scanner is open.
	 * ```console
	 * > scanner.getCapabilities()
	 * < {
	 *   "aspectRatio":{"max":3840,"min":0.000462962962962963},
	 *   "colorTemperature": {max: 7000, min: 2850, step: 50},
	 *   "deviceId":"1e...3af7",
	 *   "exposureCompensation": {max: 2.0000040531158447, min: -2.0000040531158447, step: 0.16666699945926666},
	 *   "exposureMode":["continuous","manual"],
	 *   "facingMode":["environment"],
	 *   "focusMode":["continuous","single-shot","manual"],
	 *   "frameRate":{"max":30,"min":0},
	 *   "groupId":"71...a935",
	 *   "height":{"max":2160,"min":1},
	 *   "resizeMode":["none","crop-and-scale"],
	 *   "torch":true,
	 *   "whiteBalanceMode":["continuous","manual"],
	 *   "width":{"max":3840,"min":1},
	 *   "zoom":{max: 606, min: 100, step: 2}
	 *   }
	 * ```
	 * @see [[turnOnTorch]][[turnOffTorch]][[setExposureCompensation]][[setZoom]]
	 */
	getCapabilities(): MediaTrackCapabilities;
	/**
	 * @ignore
	 */
	getCameraSettings(): MediaTrackSettings;
	/**
	 * @ignore
	 */
	getConstraints(): MediaTrackConstraints;
	/**
	 * @ignore
	 * Set the camera capabilities. Chrome only.
	 * Only available when the scanner is open.
	 * It's a low-level API, usually you can use the wrapped APIs instead.
	 * ```js
	 * await scanner.applyConstraints({ frameRate: { ideal:5 } });
	 * ```
	 */
	applyConstraints(constraints: MediaTrackConstraints): Promise<void>;
	/**
	 * Turn on the torch. Chrome only.
	 * Only available when the scanner is open.
	 * Will reject if not support.
	 * ```js
	 * await scanner.turnOnTorch();
	 * ```
	 * @see [[turnOffTorch]][[getCapabilities]]
	 */
	turnOnTorch(): Promise<void>;
	/**
	 * Turn off the torch. Chrome only.
	 * Only available when the scanner is open.
	 * Will reject if not support.
	 * ```js
	 * await scanner.turnOffTorch();
	 * ```
	 * @see [[turnOnTorch]][[getCapabilities]]
	 */
	turnOffTorch(): Promise<void>;
	/**
	 * Adjusts the color temperature. Chrome only.
	 * Only available when the scanner is open.
	 * Will reject if not support.
	 * ```js
	 * await scanner.setColorTemperature(5000);
	 * ```
	 * @see [[getCapabilities]]
	 */
	setColorTemperature(value: number): Promise<void>;
	/**
	 * Adjusts the exposure level. Chrome only.
	 * Only available when the scanner is open.
	 * Will reject if not support.
	 * ```js
	 * await scanner.setExposureCompensation(-0.7);
	 * ```
	 * @see [[getCapabilities]]
	 */
	setExposureCompensation(value: number): Promise<void>;
	/**
	 * Adjusts the zoom ratio. Chrome only.
	 * Only available when the scanner is open.
	 * Will reject if not support.
	 * ```js
	 * await scanner.setZoom(400);
	 * ```
	 * @see [[getCapabilities]]
	 */
	setZoom(value: number): Promise<void>;
	/**
	 * Adjusts the frame rate. Chrome only.
	 * Only available when the scanner is open.
	 * Will reject if not support.
	 * ```js
	 * await scanner.setFrameRate(10);
	 * ```
	 * @see [[getCapabilities]]
	 */
	setFrameRate(value: number): Promise<void>;
	/**
	 * @ignore
	 */
	_cloneDecodeResults(results: any): any;
	/**
	 * @ignore
	 */
	private _loopReadVideo;
	/**
	 * @ignore
	 */
	_drawRegionsults(results?: TextResult[]): void;
	/**
	 * @ignore
	 */
	_clearRegionsults(): void;
	/**
	 * Bind UI, open the camera, start decoding.
	 * ```js
	 * await scanner.open()
	 * ```
	 */
	open(): Promise<ScannerPlayCallbackInfo>;
	/**
	 * Stop decoding, release camera, unbind UI.
	 */
	close(): void;
	/**
	 * Bind UI, open the camera, start decoding, and remove the UIElement `display` style if the original style is `display:none;`.
	 * ```js
	 * await scanner.show()
	 * ```
	 */
	show(): Promise<ScannerPlayCallbackInfo>;
	/**
	 * Stop decoding, release camera, unbind UI, and set the Element as `display:none;`.
	 */
	hide(): void;
	/**
	 * Destructor the `BarcodeScanner` object.
	 * Equivalent to the previous method `deleteInstance()`.
	 */
	destroy(): Promise<any>;
}
export declare enum EnumAccompanyingTextRecognitionMode {
	ATRM_GENERAL = 1,
	ATRM_SKIP = 0
}
export declare enum EnumBarcodeColourMode {
	BICM_DARK_ON_LIGHT = 1,
	BICM_LIGHT_ON_DARK = 2,
	BICM_DARK_ON_DARK = 4,
	BICM_LIGHT_ON_LIGHT = 8,
	BICM_DARK_LIGHT_MIXED = 16,
	BICM_DARK_ON_LIGHT_DARK_SURROUNDING = 32,
	BICM_SKIP = 0
}
export declare enum EnumBarcodeComplementMode {
	BCM_AUTO = 1,
	BCM_GENERAL = 2,
	BCM_SKIP = 0
}
export declare enum EnumBarcodeFormat_2 {
	BF2_NULL = 0,
	BF2_POSTALCODE = 32505856,
	BF2_NONSTANDARD_BARCODE = 1,
	BF2_USPSINTELLIGENTMAIL = 1048576,
	BF2_POSTNET = 2097152,
	BF2_PLANET = 4194304,
	BF2_AUSTRALIANPOST = 8388608,
	BF2_RM4SCC = 16777216
}
export declare enum EnumBinarizationMode {
	BM_AUTO = 1,
	BM_LOCAL_BLOCK = 2,
	BM_SKIP = 0
}
export declare enum EnumColourClusteringMode {
	CCM_AUTO = 1,
	CCM_GENERAL_HSV = 2,
	CCM_SKIP = 0
}
export declare enum EnumColourConversionMode {
	CICM_GENERAL = 1,
	CICM_SKIP = 0
}
export declare enum EnumConflictMode {
	CM_IGNORE = 1,
	CM_OVERWRITE = 2
}
export declare enum EnumDeformationResistingMode {
	DRM_AUTO = 1,
	DRM_GENERAL = 2,
	DRM_SKIP = 0
}
export declare enum EnumDPMCodeReadingMode {
	DPMCRM_AUTO = 1,
	DPMCRM_GENERAL = 2,
	DPMCRM_SKIP = 0
}
export declare enum EnumErrorCode {
	DBR_SYSTEM_EXCEPTION = 1,
	DBR_SUCCESS = 0,
	DBR_UNKNOWN = -10000,
	DBR_NO_MEMORY = -10001,
	DBR_NULL_REFERENCE = -10002,
	DBR_LICENSE_INVALID = -10003,
	DBR_LICENSE_EXPIRED = -10004,
	DBR_FILE_NOT_FOUND = -10005,
	DBR_FILETYPE_NOT_SUPPORTED = -10006,
	DBR_BPP_NOT_SUPPORTED = -10007,
	DBR_INDEX_INVALID = -10008,
	DBR_BARCODE_FORMAT_INVALID = -10009,
	DBR_CUSTOM_REGION_INVALID = -10010,
	DBR_MAX_BARCODE_NUMBER_INVALID = -10011,
	DBR_IMAGE_READ_FAILED = -10012,
	DBR_TIFF_READ_FAILED = -10013,
	DBR_QR_LICENSE_INVALID = -10016,
	DBR_1D_LICENSE_INVALID = -10017,
	DBR_DIB_BUFFER_INVALID = -10018,
	DBR_PDF417_LICENSE_INVALID = -10019,
	DBR_DATAMATRIX_LICENSE_INVALID = -10020,
	DBR_PDF_READ_FAILED = -10021,
	DBR_PDF_DLL_MISSING = -10022,
	DBR_PAGE_NUMBER_INVALID = -10023,
	DBR_CUSTOM_SIZE_INVALID = -10024,
	DBR_CUSTOM_MODULESIZE_INVALID = -10025,
	DBR_RECOGNITION_TIMEOUT = -10026,
	DBR_JSON_PARSE_FAILED = -10030,
	DBR_JSON_TYPE_INVALID = -10031,
	DBR_JSON_KEY_INVALID = -10032,
	DBR_JSON_VALUE_INVALID = -10033,
	DBR_JSON_NAME_KEY_MISSING = -10034,
	DBR_JSON_NAME_VALUE_DUPLICATED = -10035,
	DBR_TEMPLATE_NAME_INVALID = -10036,
	DBR_JSON_NAME_REFERENCE_INVALID = -10037,
	DBR_PARAMETER_VALUE_INVALID = -10038,
	DBR_DOMAIN_NOT_MATCHED = -10039,
	DBR_RESERVEDINFO_NOT_MATCHED = -10040,
	DBR_AZTEC_LICENSE_INVALID = -10041,
	DBR_LICENSE_DLL_MISSING = -10042,
	DBR_LICENSEKEY_NOT_MATCHED = -10043,
	DBR_REQUESTED_FAILED = -10044,
	DBR_LICENSE_INIT_FAILED = -10045,
	DBR_PATCHCODE_LICENSE_INVALID = -10046,
	DBR_POSTALCODE_LICENSE_INVALID = -10047,
	DBR_DPM_LICENSE_INVALID = -10048,
	DBR_FRAME_DECODING_THREAD_EXISTS = -10049,
	DBR_STOP_DECODING_THREAD_FAILED = -10050,
	DBR_SET_MODE_ARGUMENT_ERROR = -10051,
	DBR_LICENSE_CONTENT_INVALID = -10052,
	DBR_LICENSE_KEY_INVALID = -10053,
	DBR_LICENSE_DEVICE_RUNS_OUT = -10054,
	DBR_GET_MODE_ARGUMENT_ERROR = -10055,
	DBR_IRT_LICENSE_INVALID = -10056,
	DBR_MAXICODE_LICENSE_INVALID = -10057,
	DBR_GS1_DATABAR_LICENSE_INVALID = -10058,
	DBR_GS1_COMPOSITE_LICENSE_INVALID = -10059
}
export declare enum EnumGrayscaleTransformationMode {
	GTM_INVERTED = 1,
	GTM_ORIGINAL = 2,
	GTM_SKIP = 0
}
export declare enum EnumImagePreprocessingMode {
	IPM_AUTO = 1,
	IPM_GENERAL = 2,
	IPM_GRAY_EQUALIZE = 4,
	IPM_GRAY_SMOOTH = 8,
	IPM_SHARPEN_SMOOTH = 16,
	IPM_SKIP = 0
}
export declare enum EnumIMResultDataType {
	IMRDT_IMAGE = 1,
	IMRDT_CONTOUR = 2,
	IMRDT_LINESEGMENT = 4,
	IMRDT_LOCALIZATIONRESULT = 8,
	IMRDT_REGIONOFINTEREST = 16
}
export declare enum EnumIntermediateResultSavingMode {
	IRSM_MEMORY = 1,
	IRSM_FILESYSTEM = 2,
	IRSM_BOTH = 4
}
export declare enum EnumIntermediateResultType {
	IRT_NO_RESULT = 0,
	IRT_ORIGINAL_IMAGE = 1,
	IRT_COLOUR_CLUSTERED_IMAGE = 2,
	IRT_COLOUR_CONVERTED_GRAYSCALE_IMAGE = 4,
	IRT_TRANSFORMED_GRAYSCALE_IMAGE = 8,
	IRT_PREDETECTED_REGION = 16,
	IRT_PREPROCESSED_IMAGE = 32,
	IRT_BINARIZED_IMAGE = 64,
	IRT_TEXT_ZONE = 128,
	IRT_CONTOUR = 256,
	IRT_LINE_SEGMENT = 512,
	IRT_FORM = 1024,
	IRT_SEGMENTATION_BLOCK = 2048,
	IRT_TYPED_BARCODE_ZONE = 4096
}
export declare enum EnumLocalizationMode {
	LM_SKIP = 0,
	LM_AUTO = 1,
	LM_CONNECTED_BLOCKS = 2,
	LM_LINES = 8,
	LM_STATISTICS = 4,
	LM_SCAN_DIRECTLY = 16,
	LM_STATISTICS_MARKS = 32,
	LM_STATISTICS_POSTAL_CODE = 64
}
export declare enum EnumQRCodeErrorCorrectionLevel {
	QRECL_ERROR_CORRECTION_H = 0,
	QRECL_ERROR_CORRECTION_L = 1,
	QRECL_ERROR_CORRECTION_M = 2,
	QRECL_ERROR_CORRECTION_Q = 3
}
export declare enum EnumRegionPredetectionMode {
	RPM_AUTO = 1,
	RPM_GENERAL = 2,
	RPM_GENERAL_RGB_CONTRAST = 4,
	RPM_GENERAL_GRAY_CONTRAST = 8,
	RPM_GENERAL_HSV_CONTRAST = 16,
	RPM_SKIP = 0
}
export declare enum EnumResultCoordinateType {
	RCT_PIXEL = 1,
	RCT_PERCENTAGE = 2
}
export declare enum EnumResultType {
	RT_STANDARD_TEXT = 0,
	RT_RAW_TEXT = 1,
	RT_CANDIDATE_TEXT = 2,
	RT_PARTIAL_TEXT = 3
}
export declare enum EnumTerminatePhase {
	TP_REGION_PREDETECTED = 1,
	TP_IMAGE_PREPROCESSED = 2,
	TP_IMAGE_BINARIZED = 4,
	TP_BARCODE_LOCALIZED = 8,
	TP_BARCODE_TYPE_DETERMINED = 16,
	TP_BARCODE_RECOGNIZED = 32
}
export declare enum EnumTextAssistedCorrectionMode {
	TACM_AUTO = 1,
	TACM_VERIFYING = 2,
	TACM_VERIFYING_PATCHING = 4,
	TACM_SKIP = 0
}
export declare enum EnumTextFilterMode {
	TFM_AUTO = 1,
	TFM_GENERAL_CONTOUR = 2,
	TFM_SKIP = 0
}
export declare enum EnumTextResultOrderMode {
	TROM_CONFIDENCE = 1,
	TROM_POSITION = 2,
	TROM_FORMAT = 4,
	TROM_SKIP = 0
}
export declare enum EnumTextureDetectionMode {
	TDM_AUTO = 1,
	TDM_GENERAL_WIDTH_CONCENTRATION = 2,
	TDM_SKIP = 0
}
export declare const Dynamsoft: {
	BarcodeReader: typeof BarcodeReader;
	BarcodeScanner: typeof BarcodeScanner;
	EnumAccompanyingTextRecognitionMode: typeof EnumAccompanyingTextRecognitionMode;
	EnumBarcodeColourMode: typeof EnumBarcodeColourMode;
	EnumBarcodeComplementMode: typeof EnumBarcodeComplementMode;
	EnumBarcodeFormat: typeof EnumBarcodeFormat;
	EnumBarcodeFormat_2: typeof EnumBarcodeFormat_2;
	EnumBinarizationMode: typeof EnumBinarizationMode;
	EnumColourClusteringMode: typeof EnumColourClusteringMode;
	EnumColourConversionMode: typeof EnumColourConversionMode;
	EnumConflictMode: typeof EnumConflictMode;
	EnumDeformationResistingMode: typeof EnumDeformationResistingMode;
	EnumDPMCodeReadingMode: typeof EnumDPMCodeReadingMode;
	EnumErrorCode: typeof EnumErrorCode;
	EnumGrayscaleTransformationMode: typeof EnumGrayscaleTransformationMode;
	EnumImagePixelFormat: typeof EnumImagePixelFormat;
	EnumImagePreprocessingMode: typeof EnumImagePreprocessingMode;
	EnumIMResultDataType: typeof EnumIMResultDataType;
	EnumIntermediateResultSavingMode: typeof EnumIntermediateResultSavingMode;
	EnumIntermediateResultType: typeof EnumIntermediateResultType;
	EnumLocalizationMode: typeof EnumLocalizationMode;
	EnumQRCodeErrorCorrectionLevel: typeof EnumQRCodeErrorCorrectionLevel;
	EnumRegionPredetectionMode: typeof EnumRegionPredetectionMode;
	EnumResultCoordinateType: typeof EnumResultCoordinateType;
	EnumResultType: typeof EnumResultType;
	EnumScaleUpMode: typeof EnumScaleUpMode;
	EnumTerminatePhase: typeof EnumTerminatePhase;
	EnumTextAssistedCorrectionMode: typeof EnumTextAssistedCorrectionMode;
	EnumTextFilterMode: typeof EnumTextFilterMode;
	EnumTextResultOrderMode: typeof EnumTextResultOrderMode;
	EnumTextureDetectionMode: typeof EnumTextureDetectionMode;
};
export default Dynamsoft;