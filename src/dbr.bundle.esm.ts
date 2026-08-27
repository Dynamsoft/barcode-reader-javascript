import BarcodeScanner from "./class/BarcodeScanner";
import { CoreModule, handleEngineResourcePaths, mapPackageRegister } from "dynamsoft-core";
import { CaptureVisionRouter } from "@dynamsoft/dynamsoft-capture-vision-router";
import { curScriptDir, getAbsoluteDir } from "@scannerproxy/curscript-path";
import { CameraEnhancer } from "@dynamsoft/dm-camera/dist/dce";
import { LicenseManager } from "@dynamsoft/dynamsoft-license";

CoreModule._bundleEnv = "DBR";
CaptureVisionRouter._defaultTemplate = "ReadSingleBarcode";

CoreModule.engineResourcePaths.rootDirectory = getAbsoluteDir(curScriptDir + "../../");
CoreModule.engineResourcePaths.dbrBundle = { version: process.env.npm_package_version, path: curScriptDir, isInternal: true };

if (!(window as any)?.Dynamsoft?.Core) {
  (window as any).Dynamsoft ??= {};
  (window as any).Dynamsoft.Core ??= {};
  (window as any).Dynamsoft.Core.CoreModule ??= CoreModule;
  (window as any).Dynamsoft.Core.mapPackageRegister ??= mapPackageRegister;
}

(LicenseManager as any)._onAuthMessage = (message: string) =>
  message.replace(
    "(https://www.dynamsoft.com/customer/license/trialLicense?product=unknown&deploymenttype=unknown)",
    "(https://www.dynamsoft.com/customer/license/trialLicense?product=dbr&deploymenttype=web)"
  );

(CameraEnhancer as any).CoreModule = CoreModule;
(CameraEnhancer as any).handleEngineResourcePaths = handleEngineResourcePaths;

export * from "dynamsoft-core";
export * from "@dynamsoft/dynamsoft-license";
export * from "@dynamsoft/dynamsoft-capture-vision-router";
export * from "@dynamsoft/dm-camera/dist/dce";
export * from "@dynamsoft/dynamsoft-barcode-reader";
export * from "@dynamsoft/dynamsoft-code-parser";
export * from "@dynamsoft/dynamsoft-utility";
export * from "@dynamsoft/dynamsoft-image-processing";

export * from "./enum/";
export * from "./interface";

export {
  BarcodeScanner
}