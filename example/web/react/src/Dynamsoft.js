import Dynamsoft from "keillion-dynamsoft-javascript-barcode";
Dynamsoft.BarcodeReader.engineResourcePath = "https://cdn.jsdelivr.net/npm/keillion-dynamsoft-javascript-barcode@0.20200204.9/dist/";
// Please visit https://www.dynamsoft.com/CustomerPortal/Portal/TrialLicense.aspx to get a trial license
Dynamsoft.BarcodeReader.productKeys = "PRODUCT-KEYS";
// Dynamsoft.BarcodeReader._bUseFullFeature = true; // Control of loading min wasm or full wasm.
export default Dynamsoft;
