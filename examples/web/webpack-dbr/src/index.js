const dbr = require('dynamsoft-javascript-barcode');

dbr.BarcodeReader.productKeys = 'PRODUCT-KEYS';
dbr.BarcodeScanner.createInstance({
    onFrameRead: results => { console.log(results); },
    onNewCodeRead: (txt, result) => { alert(txt); }
}).then(scanner => {
    scanner.open();
});
