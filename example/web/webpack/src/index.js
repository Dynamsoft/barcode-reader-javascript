/* eslint-disable no-console */
import Dynamsoft from "dynamsoft-javascript-barcode";
Dynamsoft.BarcodeReader.engineResourcePath = "https://cdn.jsdelivr.net/npm/dynamsoft-javascript-barcode@7.2.3-v2/dist/";
// Please visit https://www.dynamsoft.com/CustomerPortal/Portal/TrialLicense.aspx to get a trial license
Dynamsoft.BarcodeReader.productKeys = "PRODUCT-KEYS";
// Dynamsoft.BarcodeReader._bUseFullFeature = true; // Control of loading min wasm or full wasm.

// reader for decoding picture
let reader = null;
// scanner for decoding video
let scanner = null;

// decode sample image
(async()=>{
    try{
        reader = reader || await Dynamsoft.BarcodeReader.createInstance();
        let res = await fetch("https://demo.dynamsoft.com/dbr/img/AllSupportedBarcodeTypes.png");
        if(!res.ok){
            throw new Error("Network Error, can't get sample image. You can still use other functions.");
        }
        let blob = await res.blob();
        console.log("============== decode blob ==============");
        let resultsToAlert = ['Sample image:\n'];
        for(let result of await reader.decode(blob)){
            console.log(result.barcodeText);
            resultsToAlert.push(result.barcodeText);
        }
        alert(resultsToAlert.join('\n'));
        console.log("============== decode Url ==============");
        for(let result of await reader.decode("https://demo.dynamsoft.com/dbr/img/AllSupportedBarcodeTypes.png")){
            console.log(result.barcodeText);
        }
        console.log("============== decode base64 (with mime) ==============");
        let strBase64 = await new Promise((resolve,reject)=>{
            let fileReader = new FileReader();
            fileReader.onload = () => {
                resolve(fileReader.result)
            };
            fileReader.onerror = () => {
                reject(fileReader.error);
            }
            fileReader.readAsDataURL(blob);
        });
        for(let result of await reader.decodeBase64String(strBase64)){
            console.log(result.barcodeText);
        }
        console.log("============== decode base64 (without mime) ==============");
        for(let result of await reader.decodeBase64String(strBase64.split(',')[1])){
            console.log(result.barcodeText);
        }
        console.log("============== decode image ==============");
        let image = await new Promise((resolve,reject) => {
            let image = document.createElement('img');
            image.onload = () => {
                resolve(image);
            };
            image.onerror = () => {
                reject("load image failed.")
            };
            image.crossOrigin = '';
            image.src = "https://demo.dynamsoft.com/dbr/img/AllSupportedBarcodeTypes.png";
        });
        for(let result of await reader.decode(image)){
            console.log(result.barcodeText);
        }
        console.log("============== decode canvas ==============");
        let cvs = document.createElement('canvas');
        cvs.width = image.naturalWidth;
        cvs.height = image.naturalHeight;
        let ctx = cvs.getContext('2d');
        ctx.drawImage(image,0,0);
        for(let result of await reader.decode(cvs)){
            console.log(result.barcodeText);
        }
    }catch(ex){
        alert(ex.message);
        throw ex;
    }
    document.getElementById('p-status-decode-sample').style.display = "none";
})();

// decode input picture
document.getElementById('ipt-file').addEventListener('change', async function(){
    try{
        reader = reader || await Dynamsoft.BarcodeReader.createInstance();
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
        scanner = scanner || await Dynamsoft.BarcodeScanner.createInstance();
        scanner.onFrameRead = results => {
            if(results.length){
                console.log(results);
            }
        };
        scanner.onUnduplicatedRead = (txt, result) => {
            alert(result.barcodeFormatString + ': ' + txt);
        };
        scanner.show();
    }catch(ex){
        alert(ex.message);
        throw ex;
    }
});