/**
 * Dynamsoft JavaScript Library
 * @product Dynamsoft Barcode Reader JS Edition
 * @website http://www.dynamsoft.com
 * @preserve Copyright 2019, Dynamsoft Corporation
 * @author Dynamsoft
 * @version 7.1.3
 * @fileoverview Dynamsoft JavaScript Library for Barcode Reader
 * More info on DBR JS: https://www.dynamsoft.com/Products/barcode-recognition-javascript.aspx
 */
//https://github.com/TypeStrong/typedoc to build doc

/**
 * Buffer for Node. Used to avoid compile error in web.
 */
//declare class Buffer{}

/**
 * 
 */
declare namespace Dynamsoft{
    /**
     * Basic use:
     * ```html
     * <!--
     *      Warning: Use a specific version in production. (e.g. https://cdn.jsdelivr.net/npm/dynamsoft-javascript-barcode@x.x.x/dist/dbr.min.js)
     *      Please visit https://www.dynamsoft.com/CustomerPortal/Portal/TrialLicense.aspx to get trial license.
     *  -->
     * <script src='dbr-<version>.min.js' data-productKeys="PRODUCT-KEYS"></script>
     * <script>
     *   Dynamsoft.BarcodeReader.createInstance().then(reader => reader.decode('./TestSmall.jpg')).then(r=>{console.log(r)});
     * </script>
     * ```
     */
    class BarcodeReader{
        /** 
         * Set the global licenseKey. If you do not specify a new licenseKey when creating a `BarcodeReader` object, the global licenseKey will be used.
         * Please visit https://www.dynamsoft.com/CustomerPortal/Portal/TrialLicense.aspx to get trial license.
         * ```js
         * Dynamsoft.BarcodeReader.productKeys = 't******';
         * ```
         */
        static productKeys?: string;
        /** 
         * Manually load and compile the decoding module. Used for preloading to avoid taking too long for lazy loading.
         * Whether you have not started loading, loading, success, or failure, you can safely call `loadWasm` repeatedly. 
         * If it has already been loaded, it will return to success immediately.
         * ```js
         * Dynamsoft.BarcodeReader.loadWasm().then(() => { console.log('success'); }, ex => { console.error(ex); });
         * ```
         */
        static loadWasm(): Promise<void>;
        /**
         * A callback when wasm download success in browser environment.
         * ```js
         * Dynamsoft.BarcodeReader._onWasmDownloaded = () => { console.log('downloaded'); };
         * ```
         */
        static _onWasmDownloaded: () => void;
        /**
         * Determine if the decoding module has been loaded successfully.
         * ```js
         * console.log('Is the loading completed? ' + Dynamsoft.BarcodeReader.isLoaded());
         * ```
         */
        static isLoaded(): boolean;
        /**
         * Create a BarcodeReader object. Can be used only after loading the decoding module.
         * @param licenseKey 
         * Set the instance licenseKey. If you do not specify a new licenseKey when creating a `BarcodeReader` instance, the global licenseKey will be used.
         * Refer to https://www.dynamsoft.com/CustomerPortal/Portal/TrialLicense.aspx to get a try licenseKey.
         */
        //constructor(licenseKey?: string);
        /**
         * Create a BarcodeReader object. If the decoding module is not loaded, it will be loaded automatically.
         * ```js
         * let reader = undefined;
         * Dynamsoft.BarcodeReader.createInstance().then(r => { reader = r; }, ex => { console.error(ex); });
         * ```
         * @param licenseKey 
         * Set the instance licenseKey. If you do not specify a new licenseKey when creating a `BarcodeReader` object, the global licenseKey will be used.
         * Refer to https://www.dynamsoft.com/CustomerPortal/Portal/TrialLicense.aspx to get a try licenseKey.
         */
        static createInstance(licenseKey?: string): Promise<BarcodeReader>;
        /**
         * Destructor the `BarcodeReader` object.
         * When the `BarcodeReader` object is created, it will open up a space in memory that cannot be automatically reclaimed by js garbage collection.
         * You can manually call this method to destruct the `BarcodeReader` object to release this memory.
         * Equivalent to the previous method `deleteInstance()`.
         * ```js
         * // delete the instance when you don't need it any more.
         * reader.destroy();
         * ```
         */
        destroy(): void;
        /**
         * The main decoding method can accept a variety of data types, including binary data, images, base64, urls, etc.<br>
         * * In the nodejs environment:<br>
         * &nbsp;&nbsp;The method can accept Buffer, Uint8Array,<br>
         * &nbsp;&nbsp;base64 with mimetype, disk relative paths, disk pair paths, and absolute URLs.<br>
         * &nbsp;&nbsp;All data should be encoded as either jpg, png, bmp or gif.<br>
         * * In the browser environment:<br>
         * &nbsp;&nbsp;The method can accept Blob, ArrayBuffer,<br>
         * &nbsp;&nbsp;Uint8Array, Uint8ClampedArray, HTMLImageElement, HTMLCanvasElement, HTMLVideoElement,<br>
         * &nbsp;&nbsp;base64 with mimetype, relative URLs, and absolute URLs.<br>
         * &nbsp;&nbsp;For URLs you need to handle cross-domain issues yourself, otherwise the promise will fail.<br>
         * &nbsp;&nbsp;Except HTMLCanvasElement and HTMLVideoElement, which have their own format,<br>
         * &nbsp;&nbsp;the other Data should be encoded as either jpg, png, bmp or gif.(chrome support webp)<br>
         * ```js
         * // decode file in nodejs, or decode url in web
         * reader.decode('./TestSmall.jpg')).then(r=>{console.log(r)});
         * // decode blob from input[type="file"] in web
         * reader.decode(inputEl.files[0]).then(r=>{console.log(r)});
         * ```
         * @param source 
         */
        decode(source: Blob | Buffer | ArrayBuffer | Uint8Array | 
            Uint8ClampedArray | HTMLImageElement | HTMLCanvasElement |
            HTMLVideoElement | string): Promise<TextResult[]>;
        /**
         * Decode base64 type image data with or without minetype.
         * ```js
         * // base64 with mime
         * reader.decodeBase64String('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACoAAAAqCAYAAA******')).then(r=>{console.log(r)});
         * // base64 without mime
         * reader.decodeBase64String('iVBORw0KGgoAAAANSUhEUgAAACoAAAAqCAYAAA******')).then(r=>{console.log(r)});
         * ```
         * @param base64Str 
         */
        decodeBase64String(base64Str: string): Promise<TextResult[]>;
        /**
         * Decode the raw data from the image acquisition device / the image conversion.
         * Such as binary, binaryinverted, grayscaled, NV21, RGB555, RGB565, RGB888, ARGB888.
         * ```js
         * reader.decodeBuffer(rawImgData, rawImgWidth, rawImgHeight, rawImgWidth * 4, Dynamsoft.EnumImagePixelFormat.IPF_ARGB_8888).then(r=>{console.log(r)});
         * ```
         * @param source 
         * @param width 
         * @param height 
         * @param stride 
         * @param enumImagePixelFormat 
         */
        decodeBuffer(source: Blob | ArrayBuffer | Uint8Array | Uint8ClampedArray,
            width: number, height: number, stride: number,
            enumImagePixelFormat: EnumImagePixelFormat): Promise<TextResult[]>;
        /**
         * Get current settings and saves it into a struct.
         * ```js
         * let settings = reader.getRuntimeSettings();
         * ```
         */
        getRuntimeSettings(): RuntimeSettings;
        /**
         * Update runtime settings with a given struct.
         * ```js
         * settings.localizationModes = [2,16,4,8,0,0,0,0];
         * settings.deblurLevel = 9;
         * reader.updateRuntimeSettings(settings);
         * ```
         * @param settings 
         */
        updateRuntimeSettings(settings: RuntimeSettings): Promise<void>;
        /**
         * Reset all parameters to default values.
         * ```js
         * reader.resetRuntimeSettings();
         * ```
         */
        resetRuntimeSettings(): void;
    }

    enum EnumBarcodeFormat{
        All = 0x1e0003ff,
        OneD = 0x3FF,
        CODE_39 = 0x1,
        CODE_128 = 0x2,
        CODE_93 = 0x4,
        CODABAR = 0x8,
        ITF = 0x10,
        EAN_13 = 0x20,
        EAN_8 = 0x40,
        UPC_A = 0x80,
        UPC_E = 0x100,
        INDUSTRIAL_25 = 0x200,
        PDF417 = 0x2000000,
        QR_CODE = 0x4000000,
        DATAMATRIX = 0x8000000,
        AZTEC = 0x10000000
    }
    enum EnumErrorCode{
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
        DBR_DBRERR_AZTEC_LICENSE_INVALID = -10041
    }
    enum EnumImagePixelFormat{
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
    // enum EnumResultType{
    //     EDT_StandardText = 0,
    //     EDT_RawText = 1,
    //     EDT_CandidateText = 2,
    //     EDT_PartialText = 3
    // }
    enum EnumTerminatePhase{
        TP_REGION_PREDETECTED = 0x00000001,
        TP_IMAGE_PREPROCESSED = 0x00000002,
        TP_IMAGE_BINARIZED = 0x00000004,
        TP_BARCODE_LOCALIZED = 0x00000008,
        TP_BARCODE_TYPE_DETERMINED = 0x00000010,
        TP_BARCODE_RECOGNIZED = 0x00000020
    }
    // enum EnumConflictMode{
    //     ECM_Ignore = 1,
    //     ECM_Overwrite = 2
    // }
    enum EnumLocalizationMode{
        /** 
         * Skip the localization. 
        */
        LM_SKIP = 0,
        /** 
         * Not supported yet. 
        */
        LM_AUTO = 1,
        /**
         * Localizes barcodes by searching connected blocks. This algorithm usually gives best result and it is recommended to set ConnectedBlocks to the highest priority. 
         */
        LM_CONNECTED_BLOCKS = 2,
        /**
         * Localizes barcodes by groups of contiguous black-white regions. This is optimized for QRCode and DataMatrix.
         */
        LM_STATISTICS = 4,
        /**
         * Localizes barcodes by searching for groups of lines. This is optimized for 1D and PDF417 barcodes.
         */
        LM_LINES = 8,
        /**
         * Localizes barcodes quickly. This mode is recommended in interactive scenario. Not supported in JS edition yet.
         */
        LM_SCAN_DIRECTLY = 0x10, 
        /**
         * Localizes barcodes by groups of marks.This is optimized for DPM codes. Not supported yet.
         */
        LM_STATISTICS_MARKS = 0x20
    }
    interface BarcodeReaderException extends Error{
        code?: EnumErrorCode;
    }
    interface TextResult{
        /**
         * The barcode text.
         */
        BarcodeText: string;
        /**
         * The barcode format.
         */
        BarcodeFormat: number | EnumBarcodeFormat;
        /**
         * Barcode type in string.
         */
        BarcodeFormatString: string;
        /**
         * The barcode content in a byte array.
         */
        BarcodeBytes: number[];
        /**
         * The corresponding localization result.
         */
        LocalizationResult: LocalizationResult;
        /**
         * The barcode module size (the minimum bar width in pixel).
         */
        ModuleSize: number;
        /**
         * The page number the barcode located in. The index is 0-based.
         */
        PageNumber: number;
        /**
         * The region name the barcode located in.
         */
        RegionName?: string;
        /**
         * The document name the barcode located in.
         */
        DocumentName?: string;
        AccompanyingTextBytes?: number[];
        /**
         * The original video canvas, existed when using a instance of class `BarcodeScanner` and set `bAddOriVideoCanvasToResult` as true.
         */
        //oriVideoCanvas?: HTMLCanvasElement;
    }

    interface LocalizationResult{
        /**
         * The angle of a barcode. Values range from 0 to 360.
         */
        Angle: number;
        /**
         * The stage when the results are returned.
         */
        TerminateStage: EnumTerminatePhase;
        /**
         * The array which stores the coordinates of four result points. e.g. ["60, 82", "60, 88", "51, 88", "51, 82"]
         */
        ResultPoints: string[];
    }

    /**
     * 
     */
    interface RuntimeSettings{
        /**
         * Sets the formats of the barcode to be read. Barcode formats can be combined.  
         */
        barcodeFormatIds: number;
        /**
         * Sets the mode and priority for binarization.
         */
        binarizationModes:number[];
        /**
         * Sets the degree of blurriness of the barcode
         */
        deblurLevel:number;
        /**
         * Sets the number of barcodes expected to be detected for each image
         */
        expectedBarcodesCount:number;
        /**
         */
        //furtherModes:FurtherModesDefinition;
        /**
         * Sets which types of intermediate result to be kept for further reference. Intermediate result types can be combined.
         */
        //intermediateResultTypes:number;
        /**
         * Sets the mode and priority for localization algorithms.
         */
        localizationModes: number[];
        /**
         * Sets the number of threads the image processing algorithm will use to decode barcodes
         */
        //maxAlgorithmThreadCount:number;
        /**
         * Sets the range of barcode text length for barcodes search
         */
        minBarcodeTextLength:number;
        /**
         * The minimum confidence of the result
         */
        minResultConfidence:number;
        /**
         * Sets the output image resolution
         */
        //pdfRasterDPI:number;
        /**
         * 
         */
        region: RegionDefinition;
        /**
         * Specifies the format for the coordinates returned
         */
        resultCoordinateType:number;
        /**
         * Sets the threshold for the image shrinking
         */
        scaleDownThreshold:number;
        /**
         * Sets the phase where the algorithm stops
         */
        //terminatePhase:number;
        /**
         * Sets the mode and priority for the order of the text results returned.
         */
        textResultOrderModes:number[];
        /**
         * Sets the maximum amount of time (in milliseconds) that should be spent searching for a barcode per page. 
         * It does not include the time taken to load/decode an image (Tiff, PNG, etc) from disk into memory.
         */
        timeout:number;
        
    }
    interface RegionDefinition{
        /**
         * The top-most coordinate or percentage of the region
         */
        regionTop: number;
        /**
         * The right-most coordinate or percentage of the region
         */
        regionRight: number;
        /**
         * The bottom-most coordinate or percentage of the region
         */
        regionBottom: number;
        /**
         * The left-most coordinate or percentage of the region
         */
        regionLeft: number;
        /**
         * Sets whether or not to use percentages to measure the Region size
         */
        regionMeasuredByPercentage: number;
    }
    // interface FurtherModesDefinition{
    //     /**
    //      * Sets the mode and priority for the barcode colour mode used to process the barcode zone.
    //      */
    //     barcodeColourModes:number[];
    //     /**
    //      * Sets the mode and priority to complement the missing parts in the barcode.
    //      */
    //     barcodeComplementModes:number[];
    //     /**
    //      * Sets the mode and priority for colour categorization. Not supported yet.
    //      */
    //     colourClusteringModes:number[];
    //     /**
    //      * Sets the mode and priority for converting a colour image to a grayscale image.
    //      */
    //     colourConversionModes:number[];
    //     /**
    //      * Sets the mode and priority for DPM code reading. 
    //      */
    //     dpmCodeReadingModes:number[];
    //     /**
    //      * Sets the mode and priority for deformation resisting.
    //         Not support yet.
    //      */
    //     deformationResistingModes:number[];
    //     /**
    //      * Sets the mode and priority for the grayscale image conversion.
    //      */
    //     grayscaleTransformationModes:number[];
    //     /**
    //      * Sets the mode and priority for image preprocessing algorithms.
    //      */
    //     imagePreprocessingModes:number[];
    //     /**
    //      * Sets the region pre-detection mode for barcodes search
    //      */
    //     regionPredetectionModes:number[];
    //     /**
    //      * Sets the mode of text assisted correction for barcode decoding. 
    //      */
    //     textAssistedCorrectionMode:number;
    //     /**
    //      * Sets the mode and priority for text filter.
    //      */
    //     textFilterModes:number[];
    //     /**
    //      * Sets the mode and priority for texture detection
    //      */
    //     textureDetectionModes:number[]; 
    // }
    /**
     * Basic use:
     * ```js
     * var scanner = null;
     * Dynamsoft.BarcodeScanner.createInstance({
     *    videoSettings: { video: { width: { ideal: 1280 }, height: {ideal: 720 }, facingMode: { ideal: 'environment' } } },
     * }).then((instance)=>{
     *    scanner = instance;
     *    scanner.onFrameRead = txt => { console.log(txt);};
     *    scanner.onUnduplicatedRead = (txt, result) => { alert(txt); console.log(result)};
     *    return scanner.show();
     *})
     * ```
     */
    class BarcodeScanner{
        /** 
         * Manually load and compile the decoding module. Used for preloading to avoid taking too long for lazy loading.
         * Whether you have not started loading, loading, success, or failure, you can safely call `loadWasm` repeatedly. 
         * If it has already been loaded, it will return to success immediately.
         * ```js
         * Dynamsoft.BarcodeScanner.loadWasm().then(() => { console.log('success'); }, ex => { console.error(ex); });
         * ```
         */
        static loadWasm(): Promise<void>;
        /**
         * Determine if the decoding module has been loaded successfully.
         * ```js
         * console.log('Is the loading completed? ' + Dynamsoft.BarcodeScanner.isLoaded());
         * ```
         */
        static isLoaded(): boolean;
        /**
         * Create a `BarcodeScanner` object. 
         * ```js
         * var scanner = null;
         * Dynamsoft.BarcodeScanner.createInstance(
         *    onFrameRead: txt=>{console.log(txt);}
         *    videoSettings: { video: { width: { ideal: 1280 }, height: {ideal: 720 }, facingMode: { ideal: 'environment' } } },
         *    onUnduplicatedRead: (txt, result) => { alert(txt); }
         * ).then((instance)=>{
         *   scanner = instance;
         *   return scanner.show();
         * })
         * ```
         * @param config 
         * Optional `config` can be added when creating a `BarcodeScanner` instance.
         */
        static createInstance(config?: ScannerConfig): Promise<BarcodeScanner>;
        /**
         * Destructor the `BarcodeScanner` object.
         * When the `BarcodeScanner` object is created, it will open up a space in memory that cannot be automatically reclaimed by js garbage collection.
         * You can manually call this method to destruct the `BarcodeScanner` object to release this memory.
         * Equivalent to the previous method `deleteInstance()`.
         * ```js
         * // delete the instance when you don't need it any more.
         * scanner.destroy();
         * ```
         */
        destroy(): void;
        /**
         * Check if the scanner is open.
         * ```js
         * console.log(scanner.isOpen());
         * ```
         */
        isOpen(): boolean;
        /**
         * The HTML element that will contain the scanner object should you choose to customize the UI. It will have a simple default UI if you keep `UIElement` undefined in initialization config.
         * ```js
         * scanner.UIElement.appendChild(aDiv);
         * // Warning: Avoid changing the binding if the scanner is already open.
         * scanner.UIElement = aVideoContainer;
         * ```
         */
        //UIElement: HTMLElement;
        /**
         * Get the HTML element that contains your scanner object.
         * The HTML element that will contain the scanner object should you choose to customize the UI. It will have a simple default UI if you keep `UIElement` undefined in initialization config.
         * ```js
         * Dynamsoft.BarcodeScanner.createInstance().then((instance)=>{
         *    scanner = instance;
         *    var defaultUI = scanner.getUIElement();      //Get the initial UI
         *    //append a new div after the initial UIElement:
         *    var node = document.createElement("div");
         *    var textNode = document.createTextNode("set new UI by adding a new div");
         *    node.appendChild(textNode);
         *    var newUI = defaultUI.appendChild(node);
         *    scanner.setUIElement(newUI);
         * }).then(()=>scanner.show());
         * //Warning: Avoid changing the binding if the scanner is already open.
         * ```
         * @see [[setUIElement]]
         */
        getUIElement(): HTMLElement;
        /**
         * set the HTML element that contains your scanner object.
         * The HTML element that will contain the scanner object should you choose to customize the UI. It will have a simple default UI if you keep `UIElement` undefined in initialization config.
         * ```js
         * Dynamsoft.BarcodeScanner.createInstance().then((instance)=>{
         *    scanner = instance;
         *    var defaultUI = scanner.getUIElement();      //Get the initial UI
         *    //append a new div after the initial UIElement:
         *    var node = document.createElement("div");
         *    var textNode = document.createTextNode("set new UI by adding a new div");
         *    node.appendChild(textNode);
         *    var newUI = defaultUI.appendChild(node);
         *    scanner.setUIElement(newUI);
         * }).then(()=>scanner.show());
         * //Warning: Avoid changing the binding if the scanner is already open.
         * ```
         * @see [[getUIElement]]
         * @param element 
         */
        setUIElement(element:any): void;
        /**
         * Get current video settings of the `BarcodeScanner` object and saves it into a struct.
         * ```js
         * scanner.updateVideoSettings({ video: { width: 1280, height: 720, facingMode: "environment" } });
         * let videoSettings = scanner.getVideoSettings();
         * console.log(videoSettings);  //return an object contains facingMode, height and width
         * ```
         * @see [[updateVideoSettings]]
         */
        getVideoSettings(): MediaStreamConstraints;
        /**
         * Video play settings.
         * Refer [MediaStreamConstraints](https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia#Syntax).
         * If during reading, need play again to make it effective.
         * ```js
         * scanner.updateVideoSettings({ video: { width: 1280, height: 720, facingMode: "environment" } });
         * let videoSettings = scanner.getVideoSettings();
         * console.log(videoSettings);  
         * ```
         * @see [[getVideoSettings]]
         */
        updateVideoSettings(MediaStreamConstraints): Promise<ScannerPlayCallbackInfo | void>;
        /**
         * Get current scan settings of the `BarcodeScanner` object and saves it into a struct.
         * ```js
         * Dynamsoft.BarcodeScanner.createInstance().then((instance)=>{
         *    scanner = instance;
         *    var scanSettings = scanner.getScanSettings();     //Initial Scan Settings:{duplicateForgetTime: 3000, intervalTime: 100}
         *    scanSettings.duplicateForgetTime = 4000;          //Change the values of parameters 
         *    scanSettings.intervalTime = 150;
         *    scanner.updateScanSettings(scanSettings);        //Updated Settings: {duplicateForgetTime: 4000, intervalTime: 150}
         * }).then(()=>scanner.show());
         * ```
         * @see [[updateScanSettings]]
         * 
         */
        getScanSettings(): ScannerConfig;
        /**
         * Update ScanSettings by specify parameter values.
         * ```js
         * Dynamsoft.BarcodeScanner.createInstance().then((instance)=>{
         *    scanner = instance;
         *    var scanSettings = scanner.getScanSettings();     //Initial Scan Settings:{duplicateForgetTime: 3000, intervalTime: 100}
         *    scanSettings.duplicateForgetTime = 4000;          //Change the values of parameters 
         *    scanSettings.intervalTime = 150;
         *    scanner.updateScanSettings(scanSettings);        //Updated Settings: {duplicateForgetTime: 4000, intervalTime: 150}
         * }).then(()=>scanner.show());
         * ```
         * @see [[getScanSettings]]
         * @param settings
         */
        updateScanSettings(settings:any): Promise<void>;
        /**
         * Get current runtime settings of the `BarcodeScanner` object and saves it into a struct.
         * ```js
         * //update RuntimeSettings
         * scanner.updateRuntimeSettings({
         *    localizationModes: [16,0,0,0,0,0,0,0],
         *    deblurLevel: 9
         *    //other settings……
         * });
         * let settingsAfterUpdate = scanner.getRuntimeSettings();
         * console.log(settingsAfterUpdate);
         * //reset RuntimeSettings
         * scanner.resetRuntimeSettings();
         * let settingsDefault = scanner.getRuntimeSettings();
         * console.log(settingsDefault);
         * ```
         * @see [[updateRuntimeSettings]]
         * @see [[resetRuntimeSettings]]
         * 
         */
        getRuntimeSettings(): RuntimeSettings;
        /**
         * Update RuntimeSettings by specify parameter values.
         * ```js
         * settings.barcodeFormaIds = 503317503;
         * settings.localizationModes = [16,0,0,0,0,0,0,0];
         * settings.deblurLevel = 9;
         * scanner.updateRuntimeSettings(settings);
         * ```
         * @see [[getRuntimeSettings]]
         * @see [[resetRuntimeSettings]]
         * @param settings
         */
        updateRuntimeSettings(settings:any): Promise<void>;
        /**
         * Reset all parameters to default values.
         * ```js
         * scanner.resetRuntimeSettings();
         * let settingsDefault = scanner.getRuntimeSettings();
         * console.log(settingsDefault);
         * ```
         * @see [[getRuntimeSettings]]
         * @see [[updateRuntimeSettings]]
         */
        resetRuntimeSettings(): void;
        /**
         * Whether show oriVideoCanvas in result.
         * ```js
         * scanner.bAddOriVideoCanvasToResult = true;
         * ```
         */
        //bAddOriVideoCanvasToResult: boolean;
        /**
         * The event that is triggered once a single frame has been scanned. The results object contains all the barcode results that the reader was able to decode.
         * ```js
         * // Draw the barcodes area.
         * scanner.onFrameRead = results => {
         *   // Reset the width and height and empty the canvas
         *   canvas.width = video.videoWidth;
         *   canvas.height = video.videoHeight;
         *   let ctx = canvas.getContext('2d');
         *   // Set color
         *   ctx.fillStyle = 'rgba(254,180,32,0.3)';
         *   for(var result of results){
         *     // Get localization
         *     let x1 = result.LocalizationResult.X1;
         *     let x2 = result.LocalizationResult.X2;
         *     let x3 = result.LocalizationResult.X3;
         *     let x4 = result.LocalizationResult.X4;
         *     let y1 = result.LocalizationResult.Y1;
         *     let y2 = result.LocalizationResult.Y2;
         *     let y3 = result.LocalizationResult.Y3;
         *     let y4 = result.LocalizationResult.Y4;
         *     // Draw
         *     ctx.beginPath();
         *     ctx.moveTo(x1, y1);
         *     ctx.lineTo(x2, y2);
         *     ctx.lineTo(x3, y3);
         *     ctx.lineTo(x4, y4);
         *     ctx.fill();
         *   }
         * };
         * ```
         */
        onFrameRead?: (results: TextResult[]) => void;
        /**
         * This event is triggered when a not duplicated new barcode is found. `txt` holds the barcode text result. `result` contains the actual barcode result, including the text result. Old barcode will remember for `duplicateForgetTime`.
         * ```js
         * scanner.onUnduplicatedRead = txt => { alert(txt); }    //the barcode text result
         * scanner.onUnduplicatedRead = (txt, result) => { console.log(result); }   //the actual barcode result including the text result
         * ```
         */
        onUnduplicatedRead?: (txt: string, result: TextResult) => void;
        /**
         * Show and start the video, then read barcodes.
         * ```js
         * scanner.show().then(info => {
         *   console.log(info.width + 'x' + info.height);
         *   console.log(info.current);
         *   console.log(info.all);
         * });
         * ```
         */
        show(): Promise<ScannerOpenCallbackInfo>;
        /**
         * Change video settings during reading.
         * ```js
         * scanner.play(undefined, 1280, 720).then(info => {
         *   console.log(info.width + 'x' + info.height);
         * });
         * //Also,it can be used like:
         * scanner.pause();     //Pause the camera.Notice that the camera is still playing   
         * scanner.stop();      //Stop playing the camera. The camera is off now.
         * scanner.play();      //The camera is on now.
         * ```
         * @see [[pause]]
         * @see [[stop]]
         * @param deviceId 
         * @param width 
         * @param height 
         */
        play(deviceId?: string, width?: number, height?: number): Promise<ScannerPlayCallbackInfo>;
        /**
         * Stop playing the current camera.
         * ```js
         * scanner.pause();     //Pause the camera. Notice that the camera is still playing.   
         * scanner.stop();      //Stop playing the camera. The camera is off now.
         * scanner.play();      //The camera is on now.
         * ```
         * @see [[pause]]
         * @see [[play]]
         */
        stop(): void;
        /**
         * Pause the video.
         * ```js
         * scanner.pause();     //Pause the camera.Notice that the camera is still playing.   
         * scanner.stop();      //Stop playing the camera. The camera is off now.
         * scanner.play();      //The camera is on now.
         * ```
         * @see [[stop]]
         * @see [[play]]
         */
        pause(): void;
        /**
         * Hide the video. Equivalent to previous method `close()`.
         * ```js
         * scanner.hide();      
         * ```
         */
        hide(): void;
        /**
         * Get infomation of the currently used camera .
         * ```js
         * scanner.show().then(() => getCurrentCamera());
         *  /* {deviceId: "e0d82ecf55888058f4d6a836c56ebfa04e25d46b9e3c45218fbb8d81b30c0fdc", label: "e2eSoft VCam"} * / 
         * ```
         * @see [[getAllCameras]]
         * @see [[setCurrentCamera]]
         */
        getCurrentCamera(): Promise<VideoDeviceInfo>;
        /**
         * Get infomation of all available cameras on your device.
         * ```js
         * scanner.show().then(() => getAllCameras());
         * /* return an array of objects:(e.g.)
         * [
         *    {deviceId: "4c1c6f8539f6fb3d1da380322aba832f2776b741a7ecb48ac8f567e6415dad06", label: "USB2.0 PC CAMERA (18ec:3399)"},
         *    {deviceId: "e0d82ecf55888058f4d6a836c56ebfa04e25d46b9e3c45218fbb8d81b30c0fdc", label: "e2eSoft VCam"} 
         * ]
         * * /        
         * ```
         * @see [[getCurrentCamera]]
         * @see [[setCurrentCamera]]
         */
        getAllCameras(): Promise<VideoDeviceInfo[]>;
        /**
         * Choose the camera and play it by its information or devide id . 
         *  ```js
         * scanner.show().then(() => getAllCameras());  //Here you can get your camera infomation that contains device ids, e.g."e0d82ecf55888058f4d6a836c56ebfa04e25d46b9e3c45218fbb8d81b30c0fdc"
         * scanner.setCurrentCamera("e0d82ecf55888058f4d6a836c56ebfa04e25d46b9e3c45218fbb8d81b30c0fdc");
         * //Or
         * let cameraInfo = {deviceId:"e0d82ecf55888058f4d6a836c56ebfa04e25d46b9e3c45218fbb8d81b30c0fdc",label:"e2eSoft VCam"};
         * scanner.setCurrentCamera(cameraInfo);
         * //here should be the actual infomation or id of your camera 
         * ```
         * @see [[getCurrentCamera]]
         * @see [[getAllCameras]]
         * @param cameraInfoOrDeviceId
         */
        setCurrentCamera(cameraInfoOrDeviceId: any): Promise<ScannerPlayCallbackInfo>;
        /**
         * Get current video resolution.
         * ```js
         * updateDevice.show().then(info => {
         *   console.log(info.current);
         *   console.log(info.all);
         *   console.log(updateDevice.getResolution())   //current video resolution, e.g. [1280, 720]
         * });
         * ```
         */
        //updateDevice(): Promise<ScannerUpdateDeviceCallbackInfo>;
        getResolution(): number[];
        /**
         * Set the camera resolution.
         * ```js
         * scanner.setResolution(800,600).then(res=>console.log(res));    //Object { width: 800, height: 600 }
         * ```
         * @param resolution 
         */
        setResolution(width: number, height: number): Promise<ScannerPlayCallbackInfo>;
        /**
         * Set the camera resolution.
         * ```js
         * scanner.setResolution([800,600]).then(res=>console.log(res));    //Object { width: 800, height: 600 }
         * ```
         * @param resolution 
         */
        setResolution(resolution: number[]): Promise<ScannerPlayCallbackInfo>;
        /**
         * Check browser compatibility, whether it supports torch and actively call the camera to focus.
         * 
         * ```js
         * console.log(scanner.getCompatibility());     //e.g. {torch: false, focus: false}
         * ```
         * Only work on browsers that support [ImageCapture](https://developer.mozilla.org/en-US/docs/Web/API/ImageCapture).
         * Even if it returns `torch:true`, sometimes torch doesn't work.
         */
        getCompatibility(): CompatibilityInfo;
        /**
         * Turn on the torch. Return `Promise.reject("not support")` if your brower does not support torch.
         * ```js
         * scanner.turnOnTorch();
         * ```
         */
        turnOnTorch(): Promise<void>;
        /**
         * Turn off the torch. Return `Promise.reject("not support")` if your brower does not support torch.
         * ```js
         * scanner.turnOffTorch();
         * ```
         */
        turnOffTorch(): Promise<void>;
    }

    /**
     * @see [[BarcodeScanner]]
     */
    interface ScannerConfig{
        /**
         * The HTML element that will contain the scanner object should you choose to customize the UI. It will have a simple default UI if you keep `UIElement` undefined in initialization config.
         * ```js
         * scanner.UIElement.appendChild(aDiv);
         * // Warning: Avoid changing the binding if the scanner is already open.
         * scanner.UIElement = aVideoContainer;
         * ```
         */
        UIElement?: HTMLElement;
        /**
         * Video play settings.
         * Refer [MediaStreamConstraints](https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia#Syntax).
         * If during reading, need play again to make it effective.
         * ```js
         * scanner.videoSettings = { video: { width: 1280, height: 720, facingMode: "environment" } };
         * ```
         */
        videoSettings?: MediaStreamConstraints;
        /**
         * The time interval after the result is found in once reading and before the decoding begins in next reading. Default 100(ms).
         * ```js
         * scanner.intervalTime = 100;  // 100ms
         * ```
         */
        intervalTime?: number;
        /**
         * Whether show oriVideoCanvas in result.
         * ```js
         * scanner.bAddOriVideoCanvasToResult = true;
         * ```
         */
        //bAddOriVideoCanvasToResult?: boolean;
        /**
         * The event that is triggered once a single frame has been scanned. The results object contains all the barcode results that the reader was able to decode.
         * ```js
         * // Draw the barcodes area.
         * scanner.onFrameRead = results => {
         *   // Reset the width and height and empty the canvas
         *   canvas.width = video.videoWidth;
         *   canvas.height = video.videoHeight;
         *   let ctx = canvas.getContext('2d');
         *   // Set color
         *   ctx.fillStyle = 'rgba(254,180,32,0.3)';
         *   for(var result of results){
         *     // Get localization
         *     let x1 = result.LocalizationResult.X1;
         *     let x2 = result.LocalizationResult.X2;
         *     let x3 = result.LocalizationResult.X3;
         *     let x4 = result.LocalizationResult.X4;
         *     let y1 = result.LocalizationResult.Y1;
         *     let y2 = result.LocalizationResult.Y2;
         *     let y3 = result.LocalizationResult.Y3;
         *     let y4 = result.LocalizationResult.Y4;
         *     // Draw
         *     ctx.beginPath();
         *     ctx.moveTo(x1, y1);
         *     ctx.lineTo(x2, y2);
         *     ctx.lineTo(x3, y3);
         *     ctx.lineTo(x4, y4);
         *     ctx.fill();
         *   }
         * };
         * ```
         */
        onFrameRead?: (results: TextResult[]) => void;
        /**
         * The amount of time the reader "remembers" a barcode result once a single frame is read. Once the barcode result is obtained, the scanner will not trigger `onNewCodeRead` for the specific barcode again until forgetTime is up.
         * ```js
         * scanner.duplicateForgetTime = 3000; // 3s
         * ```
         */
        duplicateForgetTime?: number;
        /**
         * This event is triggered when a not duplicated new barcode is found. `txt` holds the barcode text result. `result` contains the actual barcode result, including the text result. Old barcode will remember for `duplicateForgetTime`.
         * ```js
         * scanner.onUnduplicatedRead = txt => { alert(txt); }    //the barcode text result
         * scanner.onUnduplicatedRead = (txt, result) => { console.log(result); }   //the actual barcode result including the text result
         * ```
         */
        onUnduplicatedRead?: (txt: string, result: TextResult) => void;
    }

    interface VideoDeviceInfo{
        deviceId: string;
        label: string;
    }

    interface ScannerPlayCallbackInfo{
        width: number,
        height: number
    }
    interface ScannerUpdateDeviceCallbackInfo{
        current?: VideoDeviceInfo,
        all: VideoDeviceInfo[]
    }
        
    interface ScannerOpenCallbackInfo extends ScannerPlayCallbackInfo, ScannerUpdateDeviceCallbackInfo {
    }

    interface CompatibilityInfo{
        torch: boolean,
        focus: boolean
    }
}

export = Dynamsoft;
