# Dynamsoft JavaScript Barcode SDK for Node

>  This library is the Node.js edition of Dynamsoft Barcode Reader. If you are looking to implement barcode reading feature in a web page, please check out the other library [Dynamsoft JavaScript Barcode SDK for Web](https://github.com/dynamsoft-dbr/javascript-barcode/?utm_source=github&package=js).

Both 1D and 2D barcode symbiology are supported including the popular `Code 39`, `EAN-13`, `QR`, `PDF417`, etc.+  Find the full list [here](https://www.dynamsoft.com/barcode-reader/overview/?utm_source=github&package=js).

The library is based on `webassembly` which has been an official feature of Node.js since `LTS 8`. If you are using Node.js LTS 8 and have no plan to upgrade it, check out [how to use the library in Node.js LTS 8](#how-to-use-the-library-in-nodejs-lts-8). That said, Node.js version >= LTS 12 is recommended because the library will try to use `worker_threads` when decoding. 

> Also see [Dynamsoft JavaScript Barcode SDK for Web](https://github.com/Dynamsoft/javascript-barcode/blob/master/README.md).

## Get Started

* Check your Node.js version

```shell
> node -v
v12.13.1
```

* Installs the library from npm

```shell
> npm install dynamsoft-javascript-barcode --save
```
* Create a `js` file and include the library

```js
let DBR = require("dynamsoft-javascript-barcode");
```

The following also works
```js
let DBR = require("path/to/dist/dbr.js");
```

> **Note**
> The library uses `Promise` a lot, so it's recommended to write the related code in a `async` function so that later you can use `await`
>
> ```js
> (async()=>{
> // many work will done here
> })();
> ```

* Create an instance of the reader

```js
let reader = await DBR.BarcodeReader.createInstance();
```

* Decode a file by its path

```js
let results = await reader.decode('path/to/sample.png');
```

Or just decode a file by its URL

```js
let results = await reader.decode('https://demo.dynamsoft.com/barcode-reader/img/AllSupportedBarcodeTypes.png');
```
> **NOTE**  
> The following image formats are supported by default: `png`, `jpg`, `bmp`, `gif`. 
>
> If you want to decode other files like `pdf`'s, you need to convert them to images first. Contact [Dynamsoft Support](https://www.dynamsoft.com/company/contact/?utm_source=github&package=js) to find out more.
>
> If you want to decode raw image data (`RGBA`) from sources like a camera. You can use the API `deocdeBuffer`. Check out [C++ API decodeBuffer](https://www.dynamsoft.com/barcode-reader/programming/cplusplus/api-reference/cbarcodereader-methods/decode.html?ver=latest&utm_source=github&package=js#decodebuffer) for more details.

* Print out the results

```js
for(let result of results){
    console.log(result.barcodeText);
}
```

* Run your code.

```shell
> node your-code.js
```

Last not but least, don't forget to set a `productKey`! If you don't have a key yet, click [here](https://www.dynamsoft.com/customer/license/trialLicense/?product=dbr&utm_source=github&package=js) to get one.

```js
DBR.BarcodeReader.productKeys = 'PRODUCT-KEYS';
```

**Full code**

```js
let DBR = require('dynamsoft-node-barcode');
// Please visit https://www.dynamsoft.com/customer/license/trialLicense/?product=dbr&utm_source=github&package=js to get a trial license
DBR.BarcodeReader.productKeys = 'PRODUCT-KEYS';

(async()=>{
    let reader = await DBR.BarcodeReader.createInstance();
    for(let result of await reader.decode('https://demo.dynamsoft.com/barcode-reader/img/AllSupportedBarcodeTypes.png')){
        console.log(result.barcodeText);
    }
    reader.destroy();
    
    // Since the worker keep alive, you can call
    await DBR.BarcodeReader._dbrWorker.terminate();
    // when you need to exit this process.
    // Or call
    process.exit();
    // directly.
})();

```

## Change Decoding Settings

To set up the library for decoding, use the APIs `getRuntimeSettings` & `updateRuntimeSettings`.

```js
await barcodeScanner.updateRuntimeSettings("speed");
```
```js
await barcodeScanner.updateRuntimeSettings("balance");
```
```js
await barcodeScanner.updateRuntimeSettings("coverage");
```
```js
let settings = await reader.getRuntimeSettings();
settings.localizationModes = [
    Dynamsoft.DBR.EnumLocalizationMode.LM_CONNECTED_BLOCKS,
    Dynamsoft.DBR.EnumLocalizationMode.LM_SCAN_DIRECTLY,
    Dynamsoft.DBR.EnumLocalizationMode.LM_LINES, 0, 0, 0, 0, 0];
settings.deblurLevel = 2;
await reader.updateRuntimeSettings(settings);
```

See [Barcode reading settings Guide](https://www.dynamsoft.com/barcode-reader/programming/cplusplus/user-guide.html?ver=latest#use-publicruntimesettings-struct-to-change-settings?utm_source=github&package=js) for basic usage.

See [C++ API RuntimeSettings](https://www.dynamsoft.com/barcode-reader/programming/c-cplusplus/struct/PublicRuntimeSettings.html?utm_source=github&package=js) for more details.

To find out which settings best suit your usage scenario, visit [DBR Main Online Demo](https://demo.dynamsoft.com/barcode-reader/?utm_source=github&package=js).

Any questions, please contact [Dynamsoft support](https://www.dynamsoft.com/company/contact/?utm_source=github&package=js).



## How to use the library in Node.js LTS 8

Node.js LTS 8 doesn't support `worker_threads`, so the decoding will happen in the same main thread which means it's a blocking operation. The following code snippets demonstrate the basic usage.

**Decode**

```js
var dbr = require('path/to/dist/dbr-<version>.node.wasm.js');
dbr.onRuntimeInitialized = ()=>{
    dbr.BarcodeReaderWasm.init('{"productKeys":"PRODUCT-KEYS"}');
    var reader = new dbr.BarcodeReaderWasm(false,-1);
    var fs = require('fs');
    var img = fs.readFileSync('./sample.png');
    var resultsInfo = JSON.parse(reader.decodeFileInMemory(new Uint8Array(img)));
    console.log(resultsInfo);
};
```

**Change settings**

```js
var settings = JSON.parse(reader.getRuntimeSettings());
settings.expectedBarcodesCount = 999;
reader.updateRuntimeSettings(JSON.stringify(settings));
```





