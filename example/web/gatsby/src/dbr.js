import DBR from "dynamsoft-javascript-barcode/dist/dbr.browser.mjs";
DBR.BarcodeReader.engineResourcePath = "https://cdn.jsdelivr.net/npm/dynamsoft-javascript-barcode@8.2.3/dist/";
// Please visit https://www.dynamsoft.com/customer/license/trialLicense/?product=dbr&utm_source=github&package=js to get a trial license
DBR.BarcodeReader.productKeys = "PRODUCT-KEYS";
// DBR.BarcodeReader._bUseFullFeature = true; // Control of loading min wasm or full wasm.
export default DBR;
