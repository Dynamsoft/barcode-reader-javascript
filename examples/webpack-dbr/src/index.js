const BarcodeReader = require('dynamsoft-javascript-barcode')

BarcodeReader.licenseKey = 'LICENSE-KEY';
let scanner = new BarcodeReader.Scanner({
    onFrameRead: results => { console.log(results); },
    onNewCodeRead: (txt, result) => { alert(txt); }
});
scanner.open();
