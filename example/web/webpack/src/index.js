/* eslint-disable no-console */
import { DBR, BarcodeReader, BarcodeScanner } from "dynamsoft-javascript-barcode";
DBR.engineResourcePath = "https://cdn.jsdelivr.net/npm/dynamsoft-javascript-barcode@8.4.0/dist/";
// Please visit https://www.dynamsoft.com/customer/license/trialLicense/?product=dbr&utm_source=github&package=js to get a trial license
DBR.productKeys = "PRODUCT-KEYS";

// Dynamsoft.DBR.BarcodeReader._bUseFullFeature = true; // Control of loading min wasm or full wasm.

// reader for decoding picture
let pReader = null;
// scanner for decoding video
let pScanner = null;

// decode input picture
document.getElementById('ipt-file').addEventListener('change', async function(){
    try{
        let reader = await (pReader = pReader || BarcodeReader.createInstance());
        let resultsToAlert = [];
        for(let i = 0; i < this.files.length; ++i){
            let file = this.files[i];
            resultsToAlert.push(i + '. ' + file.name + ":");
            let results = await reader.decode(file);
            console.log(results);
            for(let result of results){
                resultsToAlert.push(result.barcodeText);
            }
        }
        alert(resultsToAlert.join('\n'));
    }catch(ex){
        alert(ex.message);
        throw ex;
    }
    this.value = '';
});

// decode video from camera
document.getElementById('btn-show-scanner').addEventListener('click', async () => {
    try{
        let scanner = await (pScanner = pScanner || BarcodeScanner.createInstance());
        scanner.onFrameRead = results => {
            if(results.length){
                console.log(results);
            }
        };
        scanner.onUnduplicatedRead = (txt, result) => {
            alert(result.barcodeFormatString + ': ' + txt);
        };
        await scanner.show();
    }catch(ex){
        alert(ex.message);
        throw ex;
    }
});
