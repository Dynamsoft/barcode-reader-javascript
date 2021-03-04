let DBR = require('../../dist/dbr.js');
// Please visit https://www.dynamsoft.com/customer/license/trialLicense to get trial license.
DBR.BarcodeReader.productKeys = 'PRODUCT-KEYS';

(async()=>{
    console.log("============== create reader ==============");
    let reader = await DBR.BarcodeReader.createInstance();
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
    for(let result of await reader.decode('https://demo.dynamsoft.com/barcode-reader/img/AllSupportedBarcodeTypes.png')){
        console.log(result.barcodeText);
    }
    console.log("============== destroy reader ==============");
    await reader.destroy();
    
    // Since the worker keep alive, you can call
    await DBR.BarcodeReader._dbrWorker.terminate();
    // when you need to exit this process.
    // Or call
    process.exit();
    // directly.
})();
