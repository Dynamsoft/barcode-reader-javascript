postMessage("I'm worker");

importScripts('https://demo.dynamsoft.com/dbr_wasm/js/dbr-6.3.0.stable.min.js');

var reader;
var dynamsoft = self.dynamsoft || {};
dynamsoft.dbrEnv = dynamsoft.dbrEnv || {};
dynamsoft.dbrEnv.resourcesPath = 'https://demo.dynamsoft.com/dbr_wasm/js/';

dynamsoft.dbrEnv.onAutoLoadWasmSuccess = function () {
    reader = new dynamsoft.BarcodeReader();
    postMessage({
        event: "onload",
        body: "Successfully loaded wasm."
    });
};
dynamsoft.dbrEnv.onAutoLoadWasmError = function (status) {
    postMessage({
        event: "onerror",
        body: "Failed to load wasm."
    });
};
//https://www.dynamsoft.com/CustomerPortal/Portal/TrialLicense.aspx
dynamsoft.dbrEnv.licenseKey = "t0068MgAAAD2IrA1WJjiVx78RfaZ46qMyCY8DaqpvAD57z5QWkwVQkVwZEf7lE+M2QYbnPx9Fu/aFvCL1mz0Kh2YK0milUng=";

onmessage = function (e) {
    e = e.data;
    switch (e.type) {
        case "decodeBuffer":
            {
                self.reader.decodeBuffer(e.body, e.width, e.height, e.width * 4, dynamsoft.BarcodeReader.EnumImagePixelFormat.IPF_ARGB_8888).then(results => {
                    postMessage({
                        event: 'onresult',
                        body: results
                    });
                }).catch(ex => {
                    postMessage({
                        event: 'onresult',
                        body: 'No barcode detected'
                    });
                });
                break;
            }
        default:
            break;
    }
};