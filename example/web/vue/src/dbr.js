import DBR from "dynamsoft-javascript-barcode";
DBR.BarcodeReader.engineResourcePath = "https://cdn.jsdelivr.net/npm/dynamsoft-javascript-barcode@8.0.0/dist/";
// Please visit https://www.dynamsoft.com/CustomerPortal/Portal/TrialLicense.aspx to get a trial license
DBR.BarcodeReader.productKeys = "PRODUCT-KEYS";
// DBR.BarcodeReader._bUseFullFeature = true; // Control of loading min wasm or full wasm.
export default DBR;
