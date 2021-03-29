/// <reference path="./node_modules/dynamsoft-javascript-barcode/dist/dbr.reference.d.ts" />

Dynamsoft.DBR.BarcodeReader.engineResourcePath = "https://cdn.jsdelivr.net/npm/dynamsoft-javascript-barcode@8.2.1/dist/";
// Please visit https://www.dynamsoft.com/customer/license/trialLicense/?product=dbr&utm_source=github&package=js to get a trial license
Dynamsoft.DBR.BarcodeReader.productKeys = "PRODUCT-KEYS";
// Dynamsoft.DBR.BarcodeReader._bUseFullFeature = true; // Control of loading min wasm or full wasm.

// reader for decoding picture
let reader:BarcodeReader = null;
// scanner for decoding video
let scanner:BarcodeScanner = null;

// decode input picture
(document.getElementById('ipt-file') as HTMLInputElement).addEventListener('change', async function(){
    try{
        reader = reader || await Dynamsoft.DBR.BarcodeReader.createInstance();
        let resultsToAlert:string[] = [];
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
(document.getElementById('btn-show-scanner') as HTMLButtonElement).addEventListener('click', async () => {
    try{
        scanner = scanner || await Dynamsoft.DBR.BarcodeScanner.createInstance();
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