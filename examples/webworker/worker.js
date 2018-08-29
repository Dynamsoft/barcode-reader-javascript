// check devices
function browserRedirect() {
    var deviceType;
    var sUserAgent = navigator.userAgent.toLowerCase();
    var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
    var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
    var bIsMidp = sUserAgent.match(/midp/i) == "midp";
    var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
    var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
    var bIsAndroid = sUserAgent.match(/android/i) == "android";
    var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
    var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";
    if (bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) {
      deviceType = 'phone';
    } else {
      deviceType = 'pc';
    }
    return deviceType;
}

if (browserRedirect() === 'pc') {
    importScripts('https://demo.dynamsoft.com/dbr_wasm/js/dbr-6.3.0.stable.min.js');
}
else {
    importScripts('https://demo.dynamsoft.com/dbr_wasm/js/dbr-6.3.0.min.js');
}

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