var dbr = require('../../dist/dbr.min');
// Please visit https://www.dynamsoft.com/CustomerPortal/Portal/TrialLicense.aspx to get trial license.
dbr.BarcodeReader.productKeys = 't0068MgAAAHlndUYSpB+Y7ZCO9+UgVclFHIMhGxLfSzAObE6EZS4bUPogB/w8AmBM3lIw94h+joK5NmjSJWH/8286uzcbmhE=';
var reader;
dbr.BarcodeReader.createInstance().then(r => 
    (reader = r) && r.decode('https://demo.dynamsoft.com/dbr/img/AllSupportedBarcodeTypes.png')
).then(results => {
    for(var i = 0; i < results.length; ++i){
        console.log(results[i].BarcodeText);
    }
    reader.destroy();
});