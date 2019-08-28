const dbr = require('dynamsoft-javascript-barcode');

dbr.BarcodeReader.licenseKey = 'LICENSE-KEY';
dbr.BarcodeScanner.createInstance({
    onFrameRead: results => { console.log(results); },
    onNewCodeRead: (txt, result) => { alert(txt); }
}).then(scanner => {
    scanner.open();
})
