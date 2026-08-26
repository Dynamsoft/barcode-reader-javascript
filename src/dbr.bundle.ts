import BarcodeScanner from "./class/BarcodeScanner";
import { CoreModule, handleEngineResourcePaths } from "dynamsoft-core";
import { CaptureVisionRouter } from "@dynamsoft/dynamsoft-capture-vision-router";
import { curScriptDir } from "@scannerproxy/curscript-path";
import { CameraEnhancer } from "@dynamsoft/dm-camera/dist/dce";
import { LicenseManager } from "@dynamsoft/dynamsoft-license";

CoreModule._bundleEnv = "DBR";
CaptureVisionRouter._defaultTemplate = "ReadSingleBarcode";

CoreModule.engineResourcePaths.dbrBundle = { version: process.env.npm_package_version, path: curScriptDir, isInternal: true };
(CameraEnhancer as any).CoreModule = CoreModule;
(CameraEnhancer as any).handleEngineResourcePaths = handleEngineResourcePaths;

(LicenseManager as any)._onAuthMessage = (message: string) =>
  message.replace(
    "(https://www.dynamsoft.com/customer/license/trialLicense?product=unknown&deploymenttype=unknown)",
    "(https://www.dynamsoft.com/customer/license/trialLicense?product=dbr&deploymenttype=web)"
  );

export * as Core from "dynamsoft-core";
export * as License from "@dynamsoft/dynamsoft-license";
export * as CVR from "@dynamsoft/dynamsoft-capture-vision-router";
export * as DCE from "@dynamsoft/dm-camera/dist/dce";
export * as DBR from "@dynamsoft/dynamsoft-barcode-reader";
export * as DCP from "@dynamsoft/dynamsoft-code-parser";
export * as DIP from "@dynamsoft/dynamsoft-image-processing";
export * as Utility from "@dynamsoft/dynamsoft-utility";

export * from "./enum/";
export * from "./interface";

export {
  BarcodeScanner,
}