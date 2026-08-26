import { EnumScanMode } from "../enum";
import { BarcodeScannerConfig } from "../interface/BarcodeScannerConfig";
import { CoreModule } from "dynamsoft-core";

export default {
  license: "",
  scanMode: EnumScanMode.SM_SINGLE,
  templateFilePath: undefined,
  utilizedTemplateNames: {
    single: "ReadBarcodes_SpeedFirst",
    multi_unique: "ReadBarcodes_SpeedFirst",
    image: "ReadBarcodes_ReadRateFirst"
  },
  engineResourcePaths: CoreModule.engineResourcePaths,
  barcodeFormats: undefined,
  duplicateForgetTime: 3000,
  container: undefined,
  onUniqueBarcodeScanned: undefined,
  showResultView: undefined,
  showUploadImageButton: false,
  showPoweredByDynamsoft: true,
  autoStartCapturing: true,
  uiPath: undefined,
  onInitPrepare: undefined,
  onInitReady: undefined,
  onCameraOpen: undefined,
  onCameraOpenFailed: undefined,
  onCaptureStart: undefined,
  scannerViewConfig: {
    container: undefined,
    showCloseButton: true,
    mirrorFrontCamera: true,
    cameraSwitchControl: "hidden",
    showFlashButton: false
  },
  resultViewConfig: {
    container: undefined,
    toolbarButtonsConfig: {
      clear: {
        label: "Clear",
        className: "btn-clear",
        isHidden: false
      },
      done: {
        label: "Done",
        className: "btn-done",
        isHidden: false
      }
    }
  }
} as BarcodeScannerConfig