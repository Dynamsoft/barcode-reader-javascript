import { EngineResourcePaths, DSImageData } from 'dynamsoft-core';
import * as dynamsoftCore from 'dynamsoft-core';
export { dynamsoftCore as Core };
import { CapturedResult } from 'dynamsoft-capture-vision-router';
import * as dynamsoftCaptureVisionRouter from 'dynamsoft-capture-vision-router';
export { dynamsoftCaptureVisionRouter as CVR };
import { EnumBarcodeFormat, BarcodeResultItem } from 'dynamsoft-barcode-reader';
import * as dynamsoftBarcodeReader from 'dynamsoft-barcode-reader';
export { dynamsoftBarcodeReader as DBR };
import * as dynamsoftLicense from 'dynamsoft-license';
export { dynamsoftLicense as License };
import * as dynamsoftCameraEnhancer from 'dynamsoft-camera-enhancer';
export { dynamsoftCameraEnhancer as DCE };
import * as dynamsoftUtility from 'dynamsoft-utility';
export { dynamsoftUtility as Utility };

declare enum EnumScanMode {
    SM_SINGLE = 0,
    SM_MULTI_UNIQUE = 1
}
declare enum EnumOptimizationMode {
    OM_NONE = 0,
    OM_SPEED = 1,
    OM_COVERAGE = 2,
    OM_BALANCE = 3,
    OM_DPM = 4,
    OM_DENSE = 5
}
declare enum EnumResultStatus {
    RS_SUCCESS = 0,
    RS_CANCELLED = 1,
    RS_FAILED = 2
}

interface BarcodeScannerConfig {
    license?: string;
    scanMode?: EnumScanMode;
    templateFilePath?: string;
    utilizedTemplateNames?: UtilizedTemplateNames;
    engineResourcePaths?: EngineResourcePaths;
    barcodeFormats?: Array<EnumBarcodeFormat> | EnumBarcodeFormat;
    duplicateForgetTime?: number;
    container?: HTMLElement | string | undefined;
    onUniqueBarcodeScanned?: (result: BarcodeResultItem) => void | Promise<void>;
    showResultView?: boolean;
    showUploadImageButton?: boolean;
    removePoweredByMessage?: boolean;
    scannerViewConfig?: ScannerViewConfig;
    resultViewConfig?: ResultViewConfig;
    uiPath?: string;
}
interface ScannerViewConfig {
    container?: HTMLElement | string | undefined;
    showCloseButton?: boolean;
}
interface BarcodeResultViewToolbarButtonsConfig {
    clear?: ToolbarButtonConfig;
    done?: ToolbarButtonConfig;
}
interface ResultViewConfig {
    container?: HTMLElement | string | undefined;
    toolbarButtonsConfig?: BarcodeResultViewToolbarButtonsConfig;
}

type ResultStatus = {
    code: EnumResultStatus;
    message: string;
};
interface ToolbarButtonConfig {
    label?: string;
    className?: string;
    isHidden?: boolean;
}
interface BarcodeScanResult {
    status: ResultStatus;
    barcodeResults: Array<BarcodeResultItem>;
    originalImageResult?: DSImageData;
    barcodeImage?: DSImageData;
}
interface UtilizedTemplateNames {
    single?: string;
    multi_unique?: string;
    image?: string;
}

declare class BarcodeScanner {
    #private;
    private _cameraEnhancer;
    private _cameraView;
    private _cvRouter;
    config: BarcodeScannerConfig;
    constructor(config?: BarcodeScannerConfig);
    launch(): Promise<BarcodeScanResult>;
    decode(imageOrFile: Blob | string | DSImageData | HTMLImageElement | HTMLVideoElement | HTMLCanvasElement, templateName?: string): Promise<CapturedResult>;
    dispose(): void;
}

export { BarcodeScanner, EnumOptimizationMode, EnumResultStatus, EnumScanMode };
export type { BarcodeResultViewToolbarButtonsConfig, BarcodeScanResult, BarcodeScannerConfig, ResultStatus, ResultViewConfig, ScannerViewConfig, ToolbarButtonConfig, UtilizedTemplateNames };
