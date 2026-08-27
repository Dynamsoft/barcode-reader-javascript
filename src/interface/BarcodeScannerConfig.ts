import { ToolbarButtonConfig, UtilizedTemplateNames } from "./index";
import { EnumScanMode } from "../enum";
import { EngineResourcePaths } from "dynamsoft-core";
import { BarcodeResultItem, EnumBarcodeFormat } from "@dynamsoft/dynamsoft-barcode-reader";
import { CameraEnhancer, CameraView, QuadDrawingItem } from "@dynamsoft/dm-camera/dist/dce";
import { CaptureVisionRouter } from "@dynamsoft/dynamsoft-capture-vision-router";

export type CacheKeys = "dceUI" | "dbsUI" | "presetTemplates" | "templateFile";
type CameraSwitchControlMode = "hidden" | "listAll" | "toggleFrontBack";
type PathConfig = { path: string; reloadResource?: boolean };

export function isPathConfig(obj: any): obj is PathConfig {
  return obj && typeof obj === "object" && typeof obj.path === "string";
}

interface ScannerViewConfig {
  container?: HTMLElement | string;
  showCloseButton?: boolean;
  mirrorFrontCamera?: boolean;
  cameraSwitchControl?: CameraSwitchControlMode;
  showFlashButton?: boolean;
  customHighlightForBarcode?: (result: BarcodeResultItem) => QuadDrawingItem
}

interface BarcodeResultViewToolbarButtonsConfig {
  clear?: ToolbarButtonConfig;
  done?: ToolbarButtonConfig;
}

interface ResultViewConfig {
  container?: HTMLElement | string;
  toolbarButtonsConfig?: BarcodeResultViewToolbarButtonsConfig;
}

export interface BarcodeScannerConfig {
  license?: string;
  scanMode?: EnumScanMode;
  templateFilePath?: string | PathConfig;
  utilizedTemplateNames?: UtilizedTemplateNames;
  engineResourcePaths?: EngineResourcePaths;
  barcodeFormats?: Array<EnumBarcodeFormat> | EnumBarcodeFormat;
  duplicateForgetTime?: number;
  container?: HTMLElement | string;
  showResultView?: boolean;
  showUploadImageButton?: boolean;
  showPoweredByDynamsoft?: boolean;
  autoStartCapturing?: boolean;
  scannerViewConfig?: ScannerViewConfig;
  resultViewConfig?: ResultViewConfig;
  uiPath?: string | PathConfig;
  onUniqueBarcodeScanned?: (result: BarcodeResultItem) => void | Promise<void>;
  onInitPrepare?: () => void;
  onInitReady?: (components: { cameraView: CameraView, cameraEnhancer: CameraEnhancer, cvRouter: CaptureVisionRouter }) => void;
  onCameraOpen?: (components: { cameraView: CameraView, cameraEnhancer: CameraEnhancer, cvRouter: CaptureVisionRouter }) => void;
  onCaptureStart?: (components: { cameraView: CameraView, cameraEnhancer: CameraEnhancer, cvRouter: CaptureVisionRouter }) => void;
  onCameraOpenFailed?: (ex: Error) => void;
}