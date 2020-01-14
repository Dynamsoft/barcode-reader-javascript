let Dynamsoft = require('../../dist/dbr.js');
// Please visit https://www.dynamsoft.com/CustomerPortal/Portal/TrialLicense.aspx to get trial license.
Dynamsoft.BarcodeReader.productKeys = 'PRODUCT-KEYS';

(async()=>{
    console.log("============== create reader ==============");
    let reader = await Dynamsoft.BarcodeReader.createInstance();
    console.log("============== decode buffer ==============");
    let fs = require('fs');
    let buffer = fs.readFileSync(__dirname + '/../sample.png');
    for(let result of await reader.decode(buffer)){
        console.log(result.barcodeText);
    }
    console.log("============== decode base64 ==============");
    let strBase64 = buffer.toString('base64');
    for(let result of await reader.decodeBase64String(strBase64)){
        console.log(result.barcodeText);
    }
    console.log("============== decode file ==============");
    for(let result of await reader.decode(__dirname + '/../sample.png')){
        console.log(result.barcodeText);
    }
    console.log("============== decode url ==============");
    for(let result of await reader.decode('https://demo.dynamsoft.com/dbr/img/AllSupportedBarcodeTypes.png')){
        console.log(result.barcodeText);
    }
    console.log("============== destroy reader ==============");
    reader.destroy();
    process.exit();
})();
