import BarcodeReader from "./class/barcodereader";
import BarcodeScanner from "./class/barcodescanner";
import CameraEnhancer from "dynamsoft-camera-enhancer";
import { EnumBarcodeColourMode } from "./enum/enumbarcodecolourmode";
import { EnumBarcodeComplementMode } from "./enum/enumbarcodecomplementmode";
import { EnumBarcodeFormat } from "./enum/enumbarcodeformat";
import { EnumBarcodeFormat_2 } from "./enum/enumbarcodeformat_2";
import { EnumBinarizationMode } from "./enum/enumbinarizationmode";
import { EnumClarityCalculationMethod } from "./enum/enumclaritycalculationmethod";
import { EnumClarityFilterMode } from "./enum/enumclarityfiltermode";
import { EnumColourClusteringMode } from "./enum/enumcolourclusteringmode";
import { EnumColourConversionMode } from "./enum/enumcolourconversionmode";
import { EnumConflictMode } from "./enum/enumconflictmode";
import { EnumDeblurMode } from "./enum/enumdeblurmode";
import { EnumDeformationResistingMode } from "./enum/enumdeformationresistingmode";
import { EnumDPMCodeReadingMode } from "./enum/enumdpmcodereadingmode";
import { EnumErrorCode } from "./enum/enumerrorcode";
import { EnumGrayscaleTransformationMode } from "./enum/enumgrayscaletransformationmode";
import { EnumImagePixelFormat } from "./enum/enumimagepixelformat";
import { EnumImagePreprocessingMode } from "./enum/enumimagepreprocessingmode";
import { EnumIMResultDataType } from "./enum/enumimresultdatatype";
import { EnumIntermediateResultSavingMode } from "./enum/enumintermediateresultsavingmode";
import { EnumIntermediateResultType } from "./enum/enumintermediateresulttype";
import { EnumLocalizationMode } from "./enum/enumlocalizationmode";
import { EnumPDFReadingMode } from "./enum/enumpdfreadingmode";
import { EnumQRCodeErrorCorrectionLevel } from "./enum/enumqrcodeerrorcorrectionlevel";
import { EnumRegionPredetectionMode } from "./enum/enumregionpredetectionmode";
import { EnumResultCoordinateType } from "./enum/enumresultcoordinatetype";
import { EnumResultType } from "./enum/enumresulttype";
import { EnumScaleUpMode } from "./enum/enumscaleupmode";
import { EnumTerminatePhase } from "./enum/enumterminatephase";
import { EnumTextFilterMode } from "./enum/enumtextfiltermode";
import { EnumTextResultOrderMode } from "./enum/enumtextresultordermode";
import { EnumTextureDetectionMode } from "./enum/enumtexturedetectionmode";
import { TextResult } from "./interface/textresult";
declare class DBR {
    static DBR: typeof DBR;
    /**
     * The `BarcodeReader` class is used for image decoding
     * Comparing to `BarcodeScanner`, the default decoding settings are more accurate but slower.
     * ```js
     * let pReader = null;
     * (async()=>{
     *     let reader = await (pReader = pReader || Dynamsoft.DBR.BarcodeReader.createInstance());
     *     let results = await reader.decode(imageSource);
     *     for(let result of results){
     *         console.log(result.barcodeText);
     *     }
     * })();
     * ```
     */
    static BarcodeReader: typeof BarcodeReader;
    /**
     * The `BarcodeScanner` class is used for video decoding.
     * ```js
     * let pScanner = null;
     * (async()=>{
     *     let scanner = await (pScanner = pScanner || Dynamsoft.DBR.BarcodeScanner.createInstance());
     *     scanner.onUnduplicatedRead = txt => console.log(txt);
     *     await scanner.show();
     * })();
     * ```
     */
    static BarcodeScanner: typeof BarcodeScanner;
    static CameraEnhancer: typeof CameraEnhancer;
    static EnumBarcodeColourMode: typeof EnumBarcodeColourMode;
    static EnumBarcodeComplementMode: typeof EnumBarcodeComplementMode;
    static EnumBarcodeFormat: typeof EnumBarcodeFormat;
    static EnumBarcodeFormat_2: typeof EnumBarcodeFormat_2;
    static EnumBinarizationMode: typeof EnumBinarizationMode;
    static EnumClarityCalculationMethod: typeof EnumClarityCalculationMethod;
    static EnumClarityFilterMode: typeof EnumClarityFilterMode;
    static EnumColourClusteringMode: typeof EnumColourClusteringMode;
    static EnumColourConversionMode: typeof EnumColourConversionMode;
    static EnumConflictMode: typeof EnumConflictMode;
    static EnumDeblurMode: typeof EnumDeblurMode;
    static EnumDeformationResistingMode: typeof EnumDeformationResistingMode;
    static EnumDPMCodeReadingMode: typeof EnumDPMCodeReadingMode;
    static EnumErrorCode: typeof EnumErrorCode;
    static EnumGrayscaleTransformationMode: typeof EnumGrayscaleTransformationMode;
    static EnumImagePixelFormat: typeof EnumImagePixelFormat;
    static EnumImagePreprocessingMode: typeof EnumImagePreprocessingMode;
    static EnumIMResultDataType: typeof EnumIMResultDataType;
    static EnumIntermediateResultSavingMode: typeof EnumIntermediateResultSavingMode;
    static EnumIntermediateResultType: typeof EnumIntermediateResultType;
    static EnumLocalizationMode: typeof EnumLocalizationMode;
    static EnumPDFReadingMode: typeof EnumPDFReadingMode;
    static EnumQRCodeErrorCorrectionLevel: typeof EnumQRCodeErrorCorrectionLevel;
    static EnumRegionPredetectionMode: typeof EnumRegionPredetectionMode;
    static EnumResultCoordinateType: typeof EnumResultCoordinateType;
    static EnumResultType: typeof EnumResultType;
    static EnumScaleUpMode: typeof EnumScaleUpMode;
    static EnumTerminatePhase: typeof EnumTerminatePhase;
    static EnumTextFilterMode: typeof EnumTextFilterMode;
    static EnumTextResultOrderMode: typeof EnumTextResultOrderMode;
    static EnumTextureDetectionMode: typeof EnumTextureDetectionMode;
    /**
     * Get the current version.
    */
    static get version(): string;
    static get productKeys(): string;
    /**
     * Get or set the Dynamsoft Barcode Reader SDK product keys.
     * ```js
     * Dynamsoft.DBR.productKeys = "PRODUCT-KEYS";
     * ```
     * For convenience, you can set `productKeys` in `script` tag instead.
     * ```html
     * <script src="https://cdn.jsdelivr.net/npm/dynamsoft-javascript-barcode@8.8.7/dist/dbr.js" data-productKeys="PRODUCT-KEYS"></script>
     * ```
     */
    static set productKeys(keys: string);
    /** @ignore */
    static get handshakeCode(): string;
    /** @ignore */
    static set handshakeCode(keys: string);
    /** @ignore */
    static get organizationID(): string;
    /** @ignore */
    static set organizationID(keys: string);
    static get sessionPassword(): string;
    /**
     * Specify a password to protect the `Handshake Code` from abuse.
     * ```js
     * Dynamsoft.DBR.handshakeCode = "123****-mytest";
     * Dynamsoft.DBR.sessionPassword = "@#$%****";
     * ```
     * Since js in the browser is plaintext, it is not safe to set a password. It is recommended that you bind the `domain` as `Validation field` in the [handshake settings in dynamsoft website](https://www.dynamsoft.com/lts/index.html#/handshakeCodes) or your self-hosted license server.
     *
     * In nodejs, password is meaningful.
     * @see [[productKeys]]
     */
    static set sessionPassword(keys: string);
    /** @ignore */
    static get browserInfo(): any;
    /**
     * Detect environment and get a report.
     * ```js
     * console.log(Dynamsoft.DBR.detectEnvironment());
     * // {"wasm":true, "worker":true, "getUserMedia":true, "camera":true, "browser":"Chrome", "version":90, "OS":"Windows"}
     * ```
     */
    static detectEnvironment(): Promise<any>;
    /** @ignore */
    static get _workerName(): string;
    /** @ignore */
    static set _workerName(name: string);
    static get engineResourcePath(): string;
    /**
     * Specify the Barcode Reader SDK engine (WASM) url. The SDK tries to automatically explore the engine location.
     * If the auto-explored engine location is incorrect, you can manually specify the engine location.
     * The property needs to be set before [[loadWasm]].
     * ```js
     * Dynamsoft.DBR.engineResourcePath = "https://cdn.jsdelivr.net/npm/dynamsoft-javascript-barcode@8.8.7/dist/";
     * await Dynamsoft.DBR.loadWasm();
     * ```
    */
    static set engineResourcePath(value: string);
    static get licenseServer(): string[] | string;
    /**
     * Specify the license server URL.
    */
    static set licenseServer(value: string[] | string);
    /** @ignore */
    static get deviceFriendlyName(): string;
    /** @ignore */
    static set deviceFriendlyName(value: string);
    /** @ignore */
    static get _onLog(): (message: any) => void;
    /** @ignore */
    static set _onLog(value: (message: any) => void);
    /** @ignore */
    static get _bWasmDebug(): boolean;
    /** @ignore */
    static set _bWasmDebug(value: boolean);
    /** @ignore */
    static get _bUseFullFeature(): boolean;
    /** @ignore */
    static set _bUseFullFeature(value: boolean);
    /** @ignore */
    static get _dbrWorker(): Worker;
    /** @ignore */
    static isLoaded(): boolean;
    /**
     * Check if the decoding module is loaded.
     */
    static isWasmLoaded(): boolean;
    /**
     * Before most operations, `loadWasm` needs to be excuted firstly.
     * Most time, you do not need excute `loadWasm` manually. Because when you excute [[createInstance]], `loadWasm` will be excuted implicitly.
     * Some properties can't be changed after `loadWasm`.
     * Calling `loadWasm` in advance can avoid the long wait when `createInstance`.
     * ```js
     * window.addEventListener('DOMContentLoaded', (event) => {
     *   DBR.loadWasm();
     * });
     * ```
     */
    static loadWasm(): Promise<void>;
}
export { DBR, BarcodeReader, BarcodeScanner, CameraEnhancer, EnumBarcodeColourMode, EnumBarcodeComplementMode, EnumBarcodeFormat, EnumBarcodeFormat_2, EnumBinarizationMode, EnumClarityCalculationMethod, EnumClarityFilterMode, EnumColourClusteringMode, EnumColourConversionMode, EnumConflictMode, EnumDeblurMode, EnumDeformationResistingMode, EnumDPMCodeReadingMode, EnumErrorCode, EnumGrayscaleTransformationMode, EnumImagePixelFormat, EnumImagePreprocessingMode, EnumIMResultDataType, EnumIntermediateResultSavingMode, EnumIntermediateResultType, EnumLocalizationMode, EnumPDFReadingMode, EnumQRCodeErrorCorrectionLevel, EnumRegionPredetectionMode, EnumResultCoordinateType, EnumResultType, EnumScaleUpMode, EnumTerminatePhase, EnumTextFilterMode, EnumTextResultOrderMode, EnumTextureDetectionMode, TextResult, };
export default DBR;
//# sourceMappingURL=dbr.d.ts.map