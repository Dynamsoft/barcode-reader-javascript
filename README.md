# Dynamsoft JavaScript Barcode SDK for Web

![version](https://img.shields.io/npm/v/dynamsoft-javascript-barcode.svg)
![downloads](https://img.shields.io/npm/dm/dynamsoft-javascript-barcode.svg) 
![jsdelivr](https://img.shields.io/jsdelivr/npm/hm/dynamsoft-javascript-barcode.svg)
![](https://img.shields.io/snyk/vulnerabilities/npm/dynamsoft-javascript-barcode.svg)

![Dynamsoft JavaScript Barcode SDK](https://www.dynamsoft.com/blog/wp-content/uploads/2018/12/blog_dbr6.4.1db06493aba126f0c7f177687cf56a9038dd655a1fd2d4374ab571ce738111858.png)

[Dynamsoft BarcodeReader SDK for Web](https://www.dynamsoft.com/Products/barcode-recognition-javascript.aspx) is a JavaScript API for barcode scanning based on the **WebAssembly** technology. It supports real-time localization and decoding of various barcode types. The library is capable of scanning barcodes from static images as well as directly from live video streams. It also supports reading multiple barcodes at once.

> Also see [Dynamsoft JavaScript Barcode SDK for Node](https://github.com/dynamsoft-dbr/node-javascript-barcode).

## Quick Usage

### Web

```html
<!DOCTYPE html>
<html>
<body>
    <script src="https://cdn.jsdelivr.net/npm/dynamsoft-javascript-barcode@7.3.0-v2/dist/dbr.js" data-productKeys="PRODUCT-KEYS"></script>
    <script>
        let scanner = null;
        (async()=>{
            scanner = await Dynamsoft.BarcodeScanner.createInstance();
            scanner.onFrameRead = results => {console.log(results);};
            scanner.onUnduplicatedRead = (txt, result) => {alert(txt);};
            await scanner.show();
        })();
    </script>
</body>
</html>
```

<!--
### Node

```js
let Dynamsoft = require('dynamsoft-node-barcode');
// Please visit https://www.dynamsoft.com/CustomerPortal/Portal/TrialLicense.aspx to get a trial license
Dynamsoft.BarcodeReader.productKeys = 'PRODUCT-KEYS';

(async()=>{
    let reader = await Dynamsoft.BarcodeReader.createInstance();
    for(let result of await reader.decode('https://demo.dynamsoft.com/dbr/img/AllSupportedBarcodeTypes.png')){
        console.log(result.barcodeText);
    }
    reader.destroy();
    process.exit();
})();
```
-->

## Table of Contents
- [Quick Usage](#quick-usage)
- [Features](#features)
- [Live Demo](#live-demo)
- [Getting Started: HelloWorld](#getting-started-helloworld)
- [Taking a closer look](#taking-a-closer-look)
  - [Initializing](#initializing)
  - [Configuring Scanner Settings](#configuring-scanner-settings)
  - [Customizing the UI](#customizing-the-ui)
- [Advanced Usage](#advanced-usage)
  - [Print out log for better debugging](#print-out-log-for-better-debugging)
  - [Show found barcodes](#show-found-barcodes)
  - [Read a specific area/region](#read-a-specific-arearegion)
- [Self-hosted Deployment](#self-hosted-deployment)
- [Changelog](#changelog)
- [How to Upgrade](#how-to-upgrade)
- [API Documentation](#api-documentation)
- [License Activation](#license-activation)
- [License Agreement](#license-agreement)
- [Contact Us](#contact-us)

## Features

* Supported Symbologies: 

  1D barcode: **`Code 39`**, **`Code 128`**, **`Code 93`**,  **`Codabar`**, **`Interleaved 2 of 5 (ITF)`**, **`EAN-13`**, **`EAN-8`**, **`UPC-A`**, **`UPC-E`**, **`Industrial 2 of 5`** (Code 2 of 5 Industry, Standard 2 of 5, Code 2 of 5), **`Code 39 Extended`**.

  2D barcode: **`PDF417`**, **`QR`**, **`DataMatrix`**, **`Aztec`**, and **`MaxiCode`**.

  GS1 Databar: **`Omnidirectional`**, **`Truncated`**, **`Stacked`**, **`Stacked Omnidirectional`**, **`Expanded`**, **`Expanded Stacked`** and **`Limited`**.

  Patch Code

  GS1 Composite Code

  Postal Code: **`USPS Intelligent Mail`**, **`PostNet`**, **`Planet`**, **`Australian Post`**, **`UK Royal Mail (RM4SCC)`**.

* Supported Data Sources: **`Blob`**, **`HTMLImageElement`**, **`HTMLVideoElement`**, and **`URL`**, etc.

* Browser Compatibility:

  * Unlike normal server-based applications, this library requires some advanced features which fortunately are supported by all mainstream modern browsers. These advanced features are listed below:
    * [MediaDevices/getUserMedia](https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia) 
      * Required only for in-browser video streaming. If a browser doesn't have this API the [Single Frame Mode](https://www.dynamsoft.com/help/Barcode-Reader-wasm/classes/barcodescanner.html#singleframemode) is used automatically. If the API exists but doesn't work correctly, [Single Frame Mode](https://www.dynamsoft.com/help/Barcode-Reader-wasm/classes/barcodescanner.html#singleframemode) can be used as an alternative.
    * [WebAssembly](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_objects/WebAssembly), [Blob](https://developer.mozilla.org/en-US/docs/Web/API/Blob),  [URL/createObjectURL](https://developer.mozilla.org/en-US/docs/Web/API/URL/createObjectURL), [Web Workers](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API)
      * These four features are required for the library to work.
    
  * Combining the requirements above results in the following table of supported browsers.

    > **NOTE**:  Apart from the browsers, the operating systems running on the target devices may also impose some limitations of their own that could restrict the use of the library. Therefore, the following table serves as a rough estimation instead of an accurate guideline. Browser compatibility ultimately depends on whether the browser on that particular operating system supports the features listed above.

  | Browser Name | Version |
  |:-:|:-:|
  | Chrome | v57+ (v59+ on Android/iOS<sup>1</sup>) |
  | Firefox | v52+ (v55+ on Android/iOS<sup>1</sup>) |
  | Edge<sup>2</sup> | v16+ |
  | Safari<sup>3</sup> | v11+ |

  <sup>1</sup> On iOS, camera video streaming only works in Safari.

  <sup>2</sup> On Edge, due to strict Same-origin policy, you must host the library in the same domain as your web page.

  <sup>3</sup> Safari 11.2.2 ~ 11.2.6 are not supported.

  >  

* Compact and Full Editions

  As more and more features are being added to the library, the supporting `wasm` file is getting bigger and bigger. For flexibility, we provide two editions. The compact edition has less features but downloads and compiles faster, on the other hand, the full edition has all features built-in. 

  | Features | Compact edition | Full edition |
  |:-:|:-:|:-:|
  | `wasm` size<sup>1</sup>\(gzip\) | 810KB | 1.1 MB |
  | 1D | &radic; | &radic; |
  | QR | &radic; | &radic; |
  | Mirco QR | **X** | &radic; |
  | PDF417 | &radic; | &radic; |
  | Mirco PDF417 | **X** | &radic; |
  | DataMatrix | &radic; | &radic; |
  | Aztec | **X** | &radic; |
  | MaxiCode | **X** | &radic; |
  | Patch Code | **X** | &radic; |
  | GS1 Composite Code | **X** | &radic; |
  | GS1 DataBar | **X** | &radic; |
  | Postal Code | **X** | &radic; |
  | DPM | **X** | &radic; |
  | getRuntimeSettings | &radic; | &radic; |
  | updateRuntimeSettings | &radic; | &radic; |
  | getIntermediateResults | **X** | &radic; |
  | initRuntimeSettingsWithString | **X** | &radic; |
  | outputSettingsToString | **X** | &radic; |
  | **recommended scenario<sup>2</sup>** | To C | To B  |

  <sup>1</sup> The `wasm` file size is based on version 7.2.2. In later versions, the size may differ.

  <sup>2</sup> The compact edition downloads and compiles faster which makes it more suitable for the scenario where a customer only needs to scan a barcode once. On the contrary, in scenarios where an employee needs to continuously scan lots of barcodes or where specific uncommon barcodes or advanced features are required, use the full edition by simply setting the following before you call `loadWasm` or `CreateInstance`.

  `Dynamsoft.BarcodeReader._bUseFullFeature = true;`

## Live Demo

The following is a screenshot of the live demo. Try it [here](https://demo.dynamsoft.com/dbr_wasm/barcode_reader_javascript.html).

<img src="https://raw.githubusercontent.com/dynamsoft-dbr/javascript-barcode/dac614f8033661901d85381dfaff8d612115862a/img/dbr-wasm-demo-scaning.jpg">



## Getting Started: HelloWorld

This section will help you use the library to build a simple web application to decode barcodes from a video stream. 

**Basic Requirements**

* Internet connection
* Supported Browser
* Camera access

### Step One: Write the code in one minute!

Create an HTML file with the following content. Deploy it to your web server if you have it already. 

* The sample is missing one piece of information to work correctly which is the field `PRODUCT-KEYS`, you can acquire a trial key [here](https://www.dynamsoft.com/CustomerPortal/Portal/TrialLicense.aspx) to replace it.
* If you don't have a ready-to-use web server and you happen to have a package manager like `npm` or `yarn`, you can set up a simple http server in minutes. Check out http-server on [npm](https://www.npmjs.com/package/http-server) or [yarn](https://yarnpkg.com/en/package/http-server).

```html
<!DOCTYPE html>
<html>
<body>
    <!-- Please visit https://www.dynamsoft.com/CustomerPortal/Portal/TrialLicense.aspx to get a trial license. -->
    <script src="https://cdn.jsdelivr.net/npm/dynamsoft-javascript-barcode@7.3.0-v2/dist/dbr.js" data-productKeys="PRODUCT-KEYS"></script>
    <script>
        let scanner = null;
        (async()=>{
            scanner = await Dynamsoft.BarcodeScanner.createInstance();
            scanner.onFrameRead = results => {console.log(results);};
            scanner.onUnduplicatedRead = (txt, result) => {alert(txt);};
            await scanner.show();
        })();
    </script>
</body>
</html>
```
[Try in JSFiddle](https://jsfiddle.net/DynamsoftTeam/pL4e7yrd/)

### Step Two: Tackle a few issues.

Open the file in your browser and there will be a pop-up asking for permission to access the camera. Once the access is granted, you will see the video stream in the default UI of the **BarcodeScanner**. 

> **Note**: If you don't see the pop-up, wait a few seconds for the initialization to finish.

##### **General Issue one**

If you open the HTML file as `file:///` or `http://`, the following error may appear in the browser console

> [Deprecation] getUserMedia() no longer works on insecure origins. To use this feature, you should consider switching your application to a secure origin, such as HTTPS. See https://goo.gl/rStTGz for more details.

In Safari 12 the error is

> Trying to call getUserMedia from an insecure document.

As the error states, to access the camera with the API [getUserMedia](https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia), a secure channel (`https://`) is required.

> **Note**: If you use Chrome or Firefox, you might not get the error because these two browsers allow camera access via `file:///` and `http://localhost`.

To make sure your web application can access the camera, try to configure your web server to support HTTPS. The following links may help.

- NGINX: [Configuring HTTPS servers](https://nginx.org/en/docs/http/configuring_https_servers.html)
- IIS: [Create a Self Signed Certificate in IIS](https://aboutssl.org/how-to-create-a-self-signed-certificate-in-iis/)
- Tomcat: [Setting Up SSL on Tomcat in 5 minutes](https://dzone.com/articles/setting-ssl-tomcat-5-minutes)
- Node.js: [npm tls](https://nodejs.org/docs/v0.4.1/api/tls.html)

##### **General Issue Two**

For testing purposes, a self-signed certificate can be used when configuring HTTPS. When accessing the site, the browser might say "`the site is not secure`". In this case, go to the certificate settings and trust this certificate. 

> In a production environment, you will need a valid HTTPS certificate that does not have this issue. If you don't have one yet, you can get a free one from [Let’s Encrypt](https://letsencrypt.org/). Of course, you are advised to apply for a paid certificate from companies such as Verisign, GeoTrust, etc.

### Step Three: Time to scan!

Put something with a barcode in front of the camera and you'll see it located and decoded right in the UI.

### Step Four: Dive into the code

Now, take a look at the sample code. You can find that there is nothing but two scripts inside the `<body>`

* The following script includes the core library in the application via a [jsDelivr](https://www.jsdelivr.com/) CDN
  
  ```javascript
  <script src="https://cdn.jsdelivr.net/npm/dynamsoft-javascript-barcode@7.3.0-v2/dist/dbr.js" data-productKeys="PRODUCT-KEYS"></script>
  ```
  
  The same can be done with other CDNs like `unpkg`
  
  ```javascript
  <script src="https://unpkg.com/dynamsoft-javascript-barcode@7.3.0-v2/dist/dbr.js" data-productKeys="PRODUCT-KEYS"></script>
  ```

  > **NOTE**: Since we do change the library a bit in each release, to make sure your application doesn't get interrupted by automatic updates, use a specific version in your production environment as shown above. Using a general major version like `@7` is not recommended.

* The following script initializes and uses the library
  
  ```javascript
  <script>
    let scanner = null;
    (async()=>{
        scanner = await Dynamsoft.BarcodeScanner.createInstance();
        scanner.onFrameRead = results => {console.log(results);};
        scanner.onUnduplicatedRead = (txt, result) => {alert(txt);};
        await scanner.show();
    })();
  </script>
  ```
  For now, pay attention to the following two events.

    * `onFrameRead`
      This event is triggered after each single frame is scanned. The `results` object contains all the barcode results that the library found on this frame.
    * `onUnduplicatedRead`
      This event is triggered when a new barcode (not a duplicate) is found. `txt` holds the barcode text value while `result` is an object that holds details of the found barcode.

In the following sections, you'll find more detailed information on how the library works and how you can customize it to your needs.

## Taking a closer look

### Initializing

The library is based on the `WebAssembly` standard, therefore, **on first use**, it needs some time to download and compile the `wasm` files. After the first use, the browser may cache the file so that the next time no 'downloading' is required.

`Dynamsoft.BarcodeReader.loadWasm` is the API to start the initialization. 

```js
try{
    await Dynamsoft.BarcodeReader.loadWasm();
}catch(ex){
    console.error(ex);
}
```

That said, as shown in the sample above, you don't necessarily need to call the above API because other APIs like `Dynamsoft.BarcodeReader.createInstance` and `Dynamsoft.BarcodeScanner.createInstance` will call `loadWasm` themselves.

```js
let reader = null;
let scanner = null;
try{
    reader = await Dynamsoft.BarcodeReader.createInstance();
    scanner = await Dynamsoft.BarcodeScanner.createInstance();
}catch(ex){
    console.error(ex);
}
```

> **NOTE**: Including the library with a script tag doesn't automatically initialize the library. For better performance, you may want to call `loadWasm` to download and compile the `wasm` file in advance and create a reader or scanner instance later.

The detailed initialization includes the following steps:

#### 1. Download

Download the necessary resources. Usually we deploy the resources on CDN and set a long cache duration.  If your web server is faster, you should put the resources on your own server instead of the CDN.

#### 2. Compile

The `wasm` files are automatically compiled once downloaded. The compilation time varies among different devices & browsers. While it takes less than a second on latest phones or PCs, it may take seconds or longer on some older devices. 

#### 3. Initialize

The library needs to initialize every time the page loads. The initialization basically means creating an `BarcodeReader`or `BarcodeScanner` instance with specified settings.


### Configuring Scanner Settings

When creating an instance of the `BarcodeScanner` object, there are a number of configuration options. The following code shows some of the most useful ones:

```js
// set which camera and what resolution to use
await scanner.updateVideoSettings({ video: { width: 1280, height: 720, facingMode: "environment" } });

// use one of three built-in RuntimeSetting templates, 'speed' is recommended for decoding from a video stream
await scanner.updateRuntimeSettings("speed");

// make changes to the template, below it just specifies which symbologies are enabled
let runtimeSettings = await scanner.getRuntimeSettings();
runtimeSettings.barcodeFormatIds = Dynamsoft.EnumBarcodeFormat.BF_ONED | Dynamsoft.EnumBarcodeFormat.BF_QR_CODE;
await scanner.updateRuntimeSettings(runtimeSettings);

// set up the scanner behavior
let scanSettings = await scanner.getScanSettings();
  // disregard duplicated results found in a specified time period
scanSettings.duplicateForgetTime = 20000;
  // set a scan interval so that the library may release the CPU from time to time
scanSettings.intervalTime = 300;
await scanner.updateScanSettings(scanSettings);
```

[Try in JSFiddle](https://jsfiddle.net/DynamsoftTeam/yfkcajxz/)

As you can see in the code, there are basically three categories of configurations.

* `get/updateVideoSettings`: Configures the data source, I.E., the video stream. These settings include which camera to use , the resolution, etc.. Check out more information [here](https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia#Syntax).
* `get/updateRuntimeSettings`: Configures the decode engine. Find a full list of these settings and their corresponding descriptions [here](https://www.dynamsoft.com/help/Barcode-Reader/struct_dynamsoft_1_1_barcode_1_1_public_runtime_settings.html). 
[Try in JSFiddle](https://jsfiddle.net/DynamsoftTeam/f24h8c1m/)
  
  e.g.
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
  let settings = await barcodeScanner.getRuntimeSettings();
  settings.localizationModes = [
        Dynamsoft.EnumLocalizationMode.LM_CONNECTED_BLOCKS,
        Dynamsoft.EnumLocalizationMode.LM_SCAN_DIRECTLY,
        Dynamsoft.EnumLocalizationMode.LM_LINES, 0, 0, 0, 0, 0];
  settings.deblurLevel = 2;
  await barcodeScanner.updateRuntimeSettings(settings);
  ```
* `get/updateScanSettings`: Configures the behavior of the scanner which includes `duplicateForgetTime`, `intervalTime` and `filter`, etc.

### Customizing the UI

While the library provides a built-in `BarcodeScanner` which has its own UI, feel free to customize it. 

The default scanner UI is defined in the file `dist/dbr.scanner.html`. There are 3 ways to customize it:

1. Modify the file `dist/dbr.scanner.html` directly (only possible when you deploy these files yourself instead of using the CDN).
2. Copy the file `dist/dbr.scanner.html`, modify it and specify the new file as the default UI by its URL `Dynamsoft.BarcodeScanner.defaultUIElementURL = url`. Note that you must set `defaultUIElementURL` before you call the API `createInstance`.
3. Build the UI into your own web page and call `scanner.setUIElement(HTMLElement)` to specify that element.

The following introduces the 3rd way. Check out the following code on how it's done.

```html
<!DOCTYPE html>
<html>
<body>
    <div id="div-video-container">
        <video class="dbrScanner-video" playsinline="true"></video>
    </div>
    <!-- Please visit https://www.dynamsoft.com/CustomerPortal/Portal/TrialLicense.aspx to get a trial license. -->
    <script src="https://cdn.jsdelivr.net/npm/dynamsoft-javascript-barcode@7.3.0-v2/dist/dbr.js" data-productKeys="PRODUCT-KEYS"></script>
    <script>
        let scanner = null;
        (async()=>{
            scanner = await Dynamsoft.BarcodeScanner.createInstance();
            await scanner.setUIElement(document.getElementById('div-video-container'));
            scanner.onFrameRead = results => {console.log(results);};
            scanner.onUnduplicatedRead = (txt, result) => {alert(txt);};
            await scanner.show();
        })();
    </script>
</body>
</html>
```
[Try in JSFiddle](https://jsfiddle.net/DynamsoftTeam/2jzeq1r6/)

The code has set the element `div-video-container` as the UI and inside it there is a video element for showing the video stream.

> **NOTE**: The class name of the video element must be set to `dbrScanner-video`.
>
> ```html
> <video class="dbrScanner-video" playsinline="true"></video>
> ```

Next, you can add the camera list and resolution list.

> If the class names match the default ones which are `dbrScanner-sel-camera` and `dbrScanner-sel-resolution`, the library will automatically populate the lists and handle the camera/resolution switching automatically.

```html
<select class="dbrScanner-sel-camera"></select>
```
[Try in JSFiddle](https://jsfiddle.net/DynamsoftTeam/nbj75vxu/)

```html
<select class="dbrScanner-sel-resolution"></select>
```

> 8 default resolutions will automatically show up.

[Try in JSFiddle](https://jsfiddle.net/DynamsoftTeam/25v08paf/)

Too many resolutions may be overwhelming for end users. Check out the following code on how to offer your own resolution options.

```html
<select class="dbrScanner-sel-resolution">
    <option class="dbrScanner-opt-gotResolution" value="got"></option>
    <option data-width="1920" data-height="1080">1920 x 1080</option>
    <option data-width="1280" data-height="720">1280 x 720</option>
    <option data-width="640" data-height="480">640 x 480</option>
</select>
```

> **Possible Issue**: Generally you need to provide a resolution that the camera supports. However, in case a camera does not support a specified resolution, it usually will just use the nearest supported resolution. As a result, the selected resolution may not be the actual resolution. 
>
> **How to tackle it**: To take care of this issue, you can add an option with the class name `dbrScanner-opt-gotResolution` (as shown above) which the library will then use to show the actual resolution being used.

[Try in JSFiddle](https://jsfiddle.net/DynamsoftTeam/tnfjks4q/)

<!--
#### Customizing Further

You may not want to use elements with the default class names to show the camera list or resolution list. In this case, you need to populate the two lists yourself.

For camera list, you can use the API `getAllCameras()` to get all available cameras and then populate them on the page.

```HTML
<select id="custom-camera-list"></select>
```

```javascript
let cameraList = document.getElementById("custom-camera-list");
let allCameras = await scanner.getAllCameras();
let currentCamera = await scanner.getCurrentCamera();
cameraList.options.length = 0;
for (let camera of allCameras) {
    cameraList.options.add(new Option(camera.label, camera.deviceId));
    if (camera.deviceId == currentCamera.deviceId){
        cameraList.selectedIndex = i;
    }
}
```

Switch to the selected camera.

```js
cameraList.onchange = async() => {
    await scanner.setCurrentCamera(cameraList.options[cameraList.selectedIndex].value);
};
```

[Try in JSFiddle](https://jsfiddle.net/DynamsoftTeam/2L9ta7mj/)

If you have more than one camera and would like to use a certain one of them. Try out the code below.

```js
await barcodeScanner.show();
let allCameras = await barcodeScanner.getAllCameras();
for (let camera of allCameras) {
    if (camera.label == 'Your-Camera-Name') {
        await barcodeScanner.setCurrentCamera(camera.deviceId);
        break;
    }
}
```

[Try in JSFiddle](https://jsfiddle.net/DynamsoftTeam/kLvgt3w2/)

For resolution list, you can show your preferred resolutions and use the API `setResolution` to set the selected option.

```html
<select id="custom-camera-resolution">
    <option data-width="1920" data-height="1080">1920 x 1080</option>
    <option data-width="1280" data-height="720">1280 x 720</option>
    <option data-width="640" data-height="480">640 x 480</option>
</select>
```

```javascript
let resolutionList = document.getElementById("custom-camera-resolution");
resolutionList.onchange = async() => {
    await barcodeScanner.setResolution(
        resolutionList.options[resolutionList.selectedIndex].getAttribute("data-width"),
        resolutionList.options[resolutionList.selectedIndex].getAttribute("data-height")
    );
};
```

[Try in JSFiddle](https://jsfiddle.net/DynamsoftTeam/djhvno5b/)
-->

## Advanced Usage

### **Print out log for better debugging**
Include the following in your code to print internal logs in the console.

```javascript
Dynamsoft.BarcodeReader._onLog = console.log;
```

### Show found barcodes

Try the following code to show found barcodes in `input` elements on the page
```html
<input id="ipt-0">
<input id="ipt-1">
<input id="ipt-2">
```

```js
let iptIndex = 0;
let scanner = null;
(async()=>{
    scanner = await Dynamsoft.BarcodeScanner.createInstance();
    await scanner.setUIElement(document.getElementById('div-video-container'));
    scanner.onFrameRead = results => {console.log(results);};
    scanner.onUnduplicatedRead = (txt)=>{
        document.getElementById('ipt-' + iptIndex).value = txt;
        if(3 == ++iptIndex){
            scanner.onUnduplicatedRead = undefined;
            // Hide the scanner if you only need to read these three barcodes
            scanner.hide();
        }
    };
    await scanner.show();
})();
```
[Try in JSFiddle](https://jsfiddle.net/DynamsoftTeam/tz9ngm2a/)

###	Read a specific area/region

To speed up the scanning process, you can choose to scan only a specific area/region.

```javascript
let settings = await scanner.getRuntimeSettings();
/*
 * 1 means true
 * Using a percentage is easier
 * The following code ignores 25% to each side of the video stream
 */
settings.region.regionMeasuredByPercentage = 1;
settings.region.regionLeft = 25;
settings.region.regionTop = 25;
settings.region.regionRight = 75;
settings.region.regionBottom = 75;
await scanner.updateRuntimeSettings(settings);
```
[Try in JSFiddle](https://jsfiddle.net/DynamsoftTeam/taykq592/)

## Self-hosted Deployment

For commercial usage, we highly recommend self-hosted deployment. The following steps guide you through how to deploy the library on your own server.

* **Step one**: Place the files
  

On your server put the following files in the same directory.

> [Download zip](https://www.dynamsoft.com/Downloads/Dynamic-Barcode-Reader-Download.aspx?edition=js) to get these files.

  ```
  dbr.js // For <script>
  dbr.browser.mjs // For <script type="module">
  dbr.scanner.html // Scanner default UI
  dbr-<version>.worker.js // A worker thread for decoding
  dbr-<version>.wasm.js // Compact Editions
  dbr-<version>.wasm // Compact Editions
  dbr-<version>.full.wasm.js // Full Editions
  dbr-<version>.full.wasm // Full Editions
  ```

* **Step two**: Configure the server
  
  Make sure that your webserver serves the `*.wasm` file with `Content-Type: application/wasm` . Otherwise the browser won't be able to recognize it.
  
  Basically, all you need to do is set the MIME type for `.wasm`  to `application/wasm`.
  
  > Different servers are configured differently, below lists a few popular ones
  >
  > * NGINX: [mime.types](https://www.nginx.com/resources/wiki/start/topics/examples/full/#mime-types)
  > * IIS: [Web.config](https://github.com/dynamsoft-dbr/javascript-barcode/blob/dac614f8033661901d85381dfaff8d612115862a/documents/conf/Web.config)
  > * Java&trade; EE web app: [web.xml](https://github.com/dynamsoft-dbr/javascript-barcode/blob/dac614f8033661901d85381dfaff8d612115862a/documents/conf/web.xml)
  > * Node.js: [npm mime](https://github.com/broofa/node-mime)

* **Step three**: [Optional] Configure the `engineResourcePath`

If the resource files like the `wasm` files are not placed in the same directory as the file `dbr.min.js`.  Then you will need to specify the path with the API `engineResourcePath`. Note that it must be set before `loadWasm` or `createInstance`.
```js
Dynamsoft.BarcodeReader.engineResourcePath = "url/to/the/dir/";
```

## Changelog

https://www.dynamsoft.com/Products/Dynamic-Barcode-Reader-News.aspx#javascript

## How to Upgrade

#### From version `7.2.2-v2` to `7.3.0-v0`

* If you are using a CDN, just make sure to change the version number in the URL like this

```javascript
<script src="https://cdn.jsdelivr.net/npm/dynamsoft-javascript-barcode@7.3.0-v2/dist/dbr.js" data-productKeys="PRODUCT-KEYS"></script>
```

* If you have deployed the library files on your own server, you'll need to replace the old files with the ones from the new version. Download the latest version [here](https://www.dynamsoft.com/Downloads/Dynamic-Barcode-Reader-Download.aspx).

#### From versions prior to`7.2.2-v2` to `7.3.0-v0`

Dynamsoft made quite some changes in the version `7.2.2-v2`, therefore it may take a bit more effort to upgrade the library from an older version to the version `7.2.2-v2` or a later version including the latest `7.3.0-v0` (as of January, 2020). Apart from changing the code to include the correct version of the library, you'll also need to make changes to your code related to the APIs of the library. Check out [this post](https://blog.dynamsoft.com/insights/dynamsoft-barcode-reader-sdk-for-javascript-upgrade-from-v7-1-3-to-v7-2-2/) for more information. If you need more help with the upgrade, please feel free to contact [Dynamsoft Support](#contact-us).



## API Documentation

<!--for github: link need use online-->

[Online Document](https://www.dynamsoft.com/help/Barcode-Reader-wasm/)

<!-- Decoding Images: [BarcodeReader](https://www.dynamsoft.com/help/Barcode-Reader-wasm/classes/barcodereader.html)

Decoding Video Stream: [BarcodeScanner](https://www.dynamsoft.com/help/Barcode-Reader-wasm/classes/barcodescanner.html) -->

## License Activation

It takes several steps to activate a purchased license, the following steps assume you have already acquired a commercial license from Dynamsoft. If you haven't done so, you can purchase [here](https://www.dynamsoft.com/Secure/Barcode-Reader-BuyIt.aspx).

* **Step One** : Create a Dynamsoft account 

  If you don't have an account yet, sign up [here](https://www.dynamsoft.com/CustomerPortal/Account/Registration.aspx), make sure to use the same email that was registered for the purchase.

* **Step Two** : Log into Dynamsoft Customer Portal 

  Once logged in, click **Barcode Reader SDK** on the menu bar on the left under **License Center** and you should be able to see your purchased key on the right pane.

* **Step Three** : Activate the License

  Under **Status**, click the link **Activate Now** to input a domain which your license key will be bound to. The domain binding is a security feature to protect your license, although it's optional, it's highly recommended.

  > A few examples of the domain
  >
  > www.dynamsoft.com
  >
  > demo.dynamsoft.com
  >
  > \*.dynamsoft.com
  >
  > \*.dynamsoft.com;\*.yoursite.com

* **Step Four** : Use the License

  You may have noticed that in all the samples above, we have the following line of code

  ```html
  <!-- Please visit https://www.dynamsoft.com/CustomerPortal/Portal/TrialLicense.aspx to get a trial license. -->
  <script src="https://cdn.jsdelivr.net/npm/dynamsoft-javascript-barcode@7.3.0-v2/dist/dbr.js" data-productKeys="PRODUCT-KEYS"></script>
  ```

  To use your license, you simply need to replace `PRODUCT-KEYS` with it.

## License Agreement

https://www.dynamsoft.com/Products/barcode-reader-license-agreement.aspx#javascript

## Contact Us
If there are any questions, please feel free to contact <support@dynamsoft.com>.

