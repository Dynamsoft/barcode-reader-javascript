import { DSImageData } from "dynamsoft-core";
import { BarcodeResultItem } from "@dynamsoft/dynamsoft-barcode-reader";
import { EnumResultStatus } from "../enum";

export * from "./BarcodeScannerConfig";

export type ResultStatus = {
  code: EnumResultStatus;
  message: string;
}

export interface ToolbarButtonConfig {
  label?: string;
  className?: string;
  isHidden?: boolean;
}

export interface BarcodeScanResult {
  status: ResultStatus;
  barcodeResults: Array<BarcodeResultItem>;
  originalImageResult?: DSImageData;
  barcodeImage?: DSImageData;
}

export interface UtilizedTemplateNames {
  single?: string;
  multi_unique?: string;
  image?: string;
}