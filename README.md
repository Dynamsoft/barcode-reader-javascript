# Dynamsoft JavaScript Barcode SDK for Web

![version](https://img.shields.io/npm/v/dynamsoft-javascript-barcode.svg)
![downloads](https://img.shields.io/npm/dm/dynamsoft-javascript-barcode.svg) 
![jsdelivr](https://img.shields.io/jsdelivr/npm/hm/dynamsoft-javascript-barcode.svg)
![](https://img.shields.io/snyk/vulnerabilities/npm/dynamsoft-javascript-barcode.svg)

![Dynamsoft JavaScript Barcode SDK](https://www.dynamsoft.com/blog/wp-content/uploads/2018/12/blog_dbr6.4.1db06493aba126f0c7f177687cf56a9038dd655a1fd2d4374ab571ce738111858.png)

[Dynamsoft JavaScript Barcode SDK](https://www.dynamsoft.com/barcode-reader/sdk-javascript/?utm_source=github&package=js) is a JavaScript library for barcode scanning based on the **WebAssembly** technology. It supports real-time localization and decoding of various barcode types. The library is capable of scanning barcodes from static images as well as directly from live video streams. It also supports reading multiple barcodes at once.

> Also see [Dynamsoft JavaScript Barcode SDK for Node](https://github.com/Dynamsoft/javascript-barcode/blob/master/README.NODE.md).

## Install

yarn
```
$ yarn add dynamsoft-javascript-barcode
```

npm
```
$ npm install dynamsoft-javascript-barcode --save
```

cdn
```html
<script src="https://cdn.jsdelivr.net/npm/dynamsoft-javascript-barcode@8.4.0/dist/dbr.js" data-productKeys="PRODUCT-KEYS"></script>
<!-- or -->
<script src="https://unpkg.com/dynamsoft-javascript-barcode@8.4.0/dist/dbr.js" data-productKeys="PRODUCT-KEYS"></script>
```

[Download zip](https://www.dynamsoft.com/barcode-reader/downloads/?utm_source=github&package=js)

## License Key
Please visit https://www.dynamsoft.com/customer/license/trialLicense/?product=dbr&utm_source=github&package=js to get a valid license and update `PRODUCT-KEYS`:

```html
<script src="https://cdn.jsdelivr.net/npm/dynamsoft-javascript-barcode@8.4.0/dist/dbr.js" data-productKeys="PRODUCT-KEYS"></script>
```

## Quick Usage

```html
<!DOCTYPE html>
<html>
<body>
    <script src="https://cdn.jsdelivr.net/npm/dynamsoft-javascript-barcode@8.4.0/dist/dbr.js" data-productKeys="PRODUCT-KEYS"></script>
    <script>
        let scanner = null;
        (async()=>{
            scanner = await Dynamsoft.DBR.BarcodeScanner.createInstance();
            scanner.onFrameRead = results => {console.log(results);};
            scanner.onUnduplicatedRead = (txt, result) => {alert(txt);};
            await scanner.show();
        })();
    </script>
</body>
</html>
```

[Vue example](https://github.com/dynamsoft-dbr/javascript-barcode/tree/master/example/web/vue)

[React example](https://github.com/dynamsoft-dbr/javascript-barcode/tree/master/example/web/react)

[Angular example](https://github.com/dynamsoft-dbr/javascript-barcode/tree/master/example/web/angular)

<!--
### Node

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
    process.exit();
})();
```
-->

## Table of Contents
- [Install](#install)
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
- [Self-hosted | Offline | Intranet Deployment](#self-hosted--offline--intranet-deployment)
- [Known Issues](#known-issues)
- [Changelog](#changelog)
- [How to Upgrade](#how-to-upgrade)
- [API Documentation](#api-documentation)
- [License Activation](#license-activation)
- [License Agreement](#license-agreement)
- [Contact Us](#contact-us)

## Features

#### Supported Symbologies: 

  1D barcode: **`Code 39`**, **`Code 128`**, **`Code 93`**,  **`Codabar`**, **`Interleaved 2 of 5 (ITF)`**, **`EAN-13`**, **`EAN-8`**, **`UPC-A`**, **`UPC-E`**, **`Industrial 2 of 5`** (Code 2 of 5 Industry, Standard 2 of 5, Code 2 of 5), **`Code 39 Extended`**, **`MSI Code`**.

  2D barcode: **`PDF417`**, **`QR`**, **`DataMatrix`**, **`Aztec`**, **`MaxiCode`**, **`Dot Code`**.

  GS1 Databar: **`Omnidirectional`**, **`Truncated`**, **`Stacked`**, **`Stacked Omnidirectional`**, **`Expanded`**, **`Expanded Stacked`**, **`Limited`**.

  Patch Code

  GS1 Composite Code

  Postal Code: **`USPS Intelligent Mail`**, **`PostNet`**, **`Planet`**, **`Australian Post`**, **`UK Royal Mail (RM4SCC)`**.

* Supported Data Sources: **`Blob`**, **`HTMLImageElement`**, **`HTMLVideoElement`**, and **`URL`**, etc.

#### Browser Compatibility:

  * Unlike typical server-based applications, this library requires some advanced features which fortunately are supported by all mainstream modern browsers. These advanced features are listed below:
    * [MediaDevices/getUserMedia](https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia) 
      * Required only for in-browser video streaming. If a browser doesn't have this API the [Single Frame Mode](https://www.dynamsoft.com/barcode-reader/programming/javascript/api-reference/BarcodeScanner/accessors.html?ver=latest&utm_source=github&package=js#singleframemode) is used automatically. If the API exists but doesn't work correctly, [Single Frame Mode](https://www.dynamsoft.com/barcode-reader/programming/javascript/api-reference/BarcodeScanner/accessors.html?ver=latest&utm_source=github&package=js#singleframemode) can be used as an alternative.
    * [WebAssembly](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_objects/WebAssembly), [Blob](https://developer.mozilla.org/en-US/docs/Web/API/Blob),  [URL/createObjectURL](https://developer.mozilla.org/en-US/docs/Web/API/URL/createObjectURL), [Web Workers](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API)
      * These four features are required for the library to work.
    
  * Combining the requirements above results in the following table of supported browsers.

    > **NOTE**: Apart from the browsers, the operating systems running on the target devices may also impose some limitations of their own that could restrict the use of the library. Therefore, the following table serves as a rough estimation instead of an accurate guideline. Browser compatibility ultimately depends on whether the browser on that particular operating system supports the features listed above.

  | Browser Name | Version |
  |:-:|:-:|
  | Chrome | v57+ (v59+ on Android/iOS<sup>1</sup>) |
  | Firefox | v52+ (v55+ on Android/iOS<sup>1</sup>) |
  | Edge<sup>2</sup> | v16+ |
  | Safari<sup>3</sup> | v11+ |

  <sup>1</sup> Video streaming is not supported in Chrome/Firefox on iOS.

  <sup>2</sup> On Edge, due to strict Same-origin policy, you must host the library in the same domain as your web page.

  <sup>3</sup> Safari 11.2.2 ~ 11.2.6 are not supported.

  >  

#### Compact and Full Editions

  As more features are being added to the library, the supporting `wasm` file is getting larger. For flexibility, we provide two editions. The compact edition has fewer features but downloads and compiles faster; on the other hand, the full edition has all features built-in.

  | Features | Compact edition | Full edition |
  |:-:|:-:|:-:|
  | `wasm` size<sup>1</sup>\(gzip\) | 810KB | 1.1 MB |
  | 1D | &#10003; | &#10003; |
  | QR | &#10003; | &#10003; |
  | Mirco QR | - | &#10003; |
  | PDF417 | &#10003; | &#10003; |
  | Mirco PDF417 | - | &#10003; |
  | DataMatrix | &#10003; | &#10003; |
  | Aztec | - | &#10003; |
  | MaxiCode | - | &#10003; |
  | Patch Code | - | &#10003; |
  | GS1 Composite Code | - | &#10003; |
  | GS1 DataBar | - | &#10003; |
  | Dot Code | - | &#10003; |
  | Postal Code | - | &#10003; |
  | DPM | - | &#10003; |
  | getRuntimeSettings | &#10003; | &#10003; |
  | updateRuntimeSettings | &#10003; | &#10003; |
  | getIntermediateResults | - | &#10003; |
  | initRuntimeSettingsWithString | - | &#10003; |
  | outputSettingsToString | - | &#10003; |
  | **recommended scenario<sup>2</sup>** | Customer Facing Application | Enterprise Solution  |

  <sup>1</sup> The `wasm` file size is based on version 7.2.2. In later versions, the size may differ.

  <sup>2</sup> The compact edition downloads and compiles faster, which makes it more suitable for the scenario where a customer only needs to scan a barcode once. In comparison, scenarios where an employee needs to scan lots of barcodes continuously or where uncommon barcodes or advanced features are required, use the full edition by simply setting the following before you call `loadWasm` or `createInstance`.

  `Dynamsoft.DBR.BarcodeReader._bUseFullFeature = true;`

## Live Demo

The following is a screenshot of the live demo. Try it [here](https://demo.dynamsoft.com/barcode-reader-js/).

<img src="https://raw.githubusercontent.com/dynamsoft-dbr/javascript-barcode/dac614f8033661901d85381dfaff8d612115862a/img/dbr-wasm-demo-scaning.jpg">



## Getting Started: HelloWorld

This section will help you use the library to build a simple web application to decode barcodes from a video stream. 

**Basic Requirements**

* Internet connection
* Supported Browser
* Camera access

### Step One: Write code in one minute!

Create an HTML file with the following content. Deploy this to your web server and run the application over **HTTPS**.

* You will need to replace <code>PRODUCT-KEYS</code> with a trial key for the sample code to work correctly. You can acquire a trial key [here](https://www.dynamsoft.com/customer/license/trialLicense/?product=dbr&utm_source=github&package=js).
* If you don't have a ready-to-use web server and you happen to have a package manager like `npm` or `yarn`, you can set up a simple http server in minutes. Check out http-server on [npm](https://www.npmjs.com/package/http-server) or [yarn](https://yarnpkg.com/en/package/http-server).

```html
<!DOCTYPE html>
<html>
<body>
    <!-- Please visit https://www.dynamsoft.com/customer/license/trialLicense/?product=dbr&utm_source=github&package=js to get a trial license. -->
    <script src="https://cdn.jsdelivr.net/npm/dynamsoft-javascript-barcode@8.4.0/dist/dbr.js" data-productKeys="PRODUCT-KEYS"></script>
    <script>
        let scanner = null;
        (async()=>{
            scanner = await Dynamsoft.DBR.BarcodeScanner.createInstance();
            scanner.onFrameRead = results => {console.log(results);};
            scanner.onUnduplicatedRead = (txt, result) => {alert(txt);};
            await scanner.show();
        })();
    </script>
</body>
</html>
```
[Try in JSFiddle](https://jsfiddle.net/DynamsoftTeam/3gtaycm0/)

### Step Two: Tackle a few issues.

Open the file in your browser and there will be a pop-up asking for permission to access the camera. Once the access is granted, you will see the video stream in the default UI of the **BarcodeScanner**. 

> **Note**: If you don't see the pop-up, wait a few seconds for the initialization to finish.

##### **Possible Scenario 1**

If you open the HTML file as `file:///` or `http://`, the following error may appear in the browser console:

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

##### **Possible Scenario 2**

For testing purposes, a self-signed certificate can be used when configuring HTTPS. When accessing the site, the browser might say "`the site is not secure`". In this case, go to the certificate settings and trust this certificate. 

> In a production environment, you will need a valid HTTPS certificate that does not have this issue. If you don't have one yet, you can get a free one from [Let’s Encrypt](https://letsencrypt.org/). We recommend obtaining a paid certificate from companies such as Verisign, GeoTrust, etc.

### Step Three: Time to scan!

Put something with a barcode in front of the camera and you'll see it located and decoded right in the UI.

### Step Four: Dive into the code

Now, take a look at the sample code. You can find that there is nothing but two scripts inside the `<body>`

* The following script includes the core library in the application via a [jsDelivr](https://www.jsdelivr.com/) CDN
  
  ```javascript
  <script src="https://cdn.jsdelivr.net/npm/dynamsoft-javascript-barcode@8.4.0/dist/dbr.js" data-productKeys="PRODUCT-KEYS"></script>
  ```
  
  The same can be done with other CDNs like `unpkg`
  
  ```javascript
  <script src="https://unpkg.com/dynamsoft-javascript-barcode@8.4.0/dist/dbr.js" data-productKeys="PRODUCT-KEYS"></script>
  ```

  > **NOTE**: : Since we do change the library a bit in each release, to make sure your application doesn't get interrupted by automatic updates, use a specific version in your production environment, as shown above. Using a general major version like `@7` is not recommended.

* The following script initializes and uses the library
  
  ```javascript
  <script>
    let scanner = null;
    (async()=>{
        scanner = await Dynamsoft.DBR.BarcodeScanner.createInstance();
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

The library is based on the `WebAssembly` standard; therefore, **on first use**, it needs some time to download and compile the `wasm` files. After the first use, the browser may cache the file so that the next time no 'downloading' is required.

`Dynamsoft.DBR.BarcodeReader.loadWasm` is the API to start the initialization. 

```js
try{
    await Dynamsoft.DBR.BarcodeReader.loadWasm();
}catch(ex){
    console.error(ex);
}
```

That said, as shown in the sample above, you don't necessarily need to call the above API because other APIs like `Dynamsoft.DBR.BarcodeReader.createInstance` and `Dynamsoft.DBR.BarcodeScanner.createInstance` will call `loadWasm` themselves.

```js
let reader = null;
let scanner = null;
try{
    reader = await Dynamsoft.DBR.BarcodeReader.createInstance();
    scanner = await Dynamsoft.DBR.BarcodeScanner.createInstance();
}catch(ex){
    console.error(ex);
}
```

> **NOTE**: Including the library with a script tag doesn't automatically initialize the library. For better performance, you may want to call `loadWasm` to download and compile the `wasm` file in advance and create a reader or scanner instance later.

The detailed initialization includes the following steps:

#### 1. Download

Download the necessary resources. Usually, we deploy the resources on CDN and set a long cache duration. If your web server is faster, you should put the resources on your own server instead of the CDN.

#### 2. Compile

The `wasm` files are automatically compiled once downloaded. The compilation time varies among different devices & browsers. While it takes less than a second on latest phones or PCs, it may take seconds or longer on some older devices. 

#### 3. Initialize

The library needs to initialize every time the page loads. The initialization means creating an `BarcodeReader`or `BarcodeScanner` instance with specified settings.


### Configuring Scanner Settings

When creating an instance of the `BarcodeScanner` object, there are several configuration options. The following code shows some of the most useful ones:

```js
// set which camera and what resolution to use
await scanner.updateVideoSettings({ video: { width: 1280, height: 720, facingMode: "environment" } });

// use one of three built-in RuntimeSetting templates, 'single' is recommended for decoding from a video stream
await scanner.updateRuntimeSettings("single");

// make changes to the template. The code snippet below demonstrates how to specify which symbologies are enabled
let runtimeSettings = await scanner.getRuntimeSettings();
runtimeSettings.barcodeFormatIds = Dynamsoft.DBR.EnumBarcodeFormat.BF_ONED | Dynamsoft.DBR.EnumBarcodeFormat.BF_QR_CODE;
await scanner.updateRuntimeSettings(runtimeSettings);

// set up the scanner behavior
let scanSettings = await scanner.getScanSettings();
  // disregard duplicated results found in a specified time period
scanSettings.duplicateForgetTime = 20000;
  // set a scan interval so the library may release the CPU from time to time
scanSettings.intervalTime = 300;
await scanner.updateScanSettings(scanSettings);
```

[Try in JSFiddle](https://jsfiddle.net/DynamsoftTeam/pa7g85wh/)

As you can see in the code, there are three categories of configurations.

* `get/updateVideoSettings`: Configures the data source, i.e., the video stream. These settings include which camera to use, the resolution, etc.. Learn more [here](https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia#Syntax).
* `get/updateRuntimeSettings`: Configures the decode engine. Find a full list of these settings and their corresponding descriptions [here](https://www.dynamsoft.com/barcode-reader/programming/c-cplusplus/struct/PublicRuntimeSettings.html?ver=latest&utm_source=github&package=js). 
[Try in JSFiddle](https://jsfiddle.net/DynamsoftTeam/h3o4kfau/)
  
  e.g.
  ```js
  await scanner.updateRuntimeSettings("single");
  ```
  ```js
  await scanner.updateRuntimeSettings("speed");
  ```
  ```js
  await scanner.updateRuntimeSettings("balance");
  ```
  ```js
  await scanner.updateRuntimeSettings("coverage");
  ```
  ```js
  let settings = await scanner.getRuntimeSettings();
  settings.localizationModes = [
        Dynamsoft.DBR.EnumLocalizationMode.LM_CONNECTED_BLOCKS,
        Dynamsoft.DBR.EnumLocalizationMode.LM_SCAN_DIRECTLY,
        Dynamsoft.DBR.EnumLocalizationMode.LM_LINES, 0, 0, 0, 0, 0];
  settings.deblurLevel = 2;
  await scanner.updateRuntimeSettings(settings);
  ```

  See [Barcode reading settings Guide](https://www.dynamsoft.com/barcode-reader/programming/cplusplus/user-guide.html?ver=latest&utm_source=github&package=js#use-publicruntimesettings-struct-to-change-settings) for basic usage.

  See [C++ API RuntimeSettings](https://www.dynamsoft.com/barcode-reader/programming/c-cplusplus/struct/PublicRuntimeSettings.html?utm_source=github&package=js) for more details.

  To find out which settings best suit your usage scenario, visit [DBR Main Online Demo](https://demo.dynamsoft.com/barcode-reader/?utm_source=github&package=js).

  Any questions, please contact [Dynamsoft support](https://www.dynamsoft.com/Company/Contact.aspx?utm_source=github&package=js).

* `get/updateScanSettings`: Configures the behavior of the scanner which includes `duplicateForgetTime`, `intervalTime`, etc.

### Customizing the UI

While the library provides a built-in `BarcodeScanner` which has its own UI, feel free to customize it. 

The default scanner UI is defined in the file `dist/dbr.scanner.html`. There are 3 ways to customize it:

1. Modify the file `dist/dbr.scanner.html` directly (only possible when you deploy these files yourself instead of using the CDN).
2. Copy the file `dist/dbr.scanner.html`, modify it and specify the new file as the default UI by its URL `Dynamsoft.DBR.BarcodeScanner.defaultUIElementURL = url`. Note that you must set `defaultUIElementURL` before you call `createInstance`.
3. Build the UI into your own web page and call `scanner.setUIElement(HTMLElement)` to specify that element.

The following introduces the 3rd way. Check out the following code on how it's done.

```html
<!DOCTYPE html>
<html>
<body>
    <div id="div-video-container">
        <video class="dbrScanner-video" playsinline="true"></video>
    </div>
    <!-- Please visit https://www.dynamsoft.com/customer/license/trialLicense/?product=dbr&utm_source=github&package=js to get a trial license. -->
    <script src="https://cdn.jsdelivr.net/npm/dynamsoft-javascript-barcode@8.4.0/dist/dbr.js" data-productKeys="PRODUCT-KEYS"></script>
    <script>
        let scanner = null;
        (async()=>{
            scanner = await Dynamsoft.DBR.BarcodeScanner.createInstance();
            await scanner.setUIElement(document.getElementById('div-video-container'));
            scanner.onFrameRead = results => {console.log(results);};
            scanner.onUnduplicatedRead = (txt, result) => {alert(txt);};
            await scanner.show();
        })();
    </script>
</body>
</html>
```
[Try in JSFiddle](https://jsfiddle.net/DynamsoftTeam/21chb5pd/)

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
[Try in JSFiddle](https://jsfiddle.net/DynamsoftTeam/4uwhngms/)

```html
<select class="dbrScanner-sel-resolution"></select>
```

> 8 default resolutions will automatically show up.

[Try in JSFiddle](https://jsfiddle.net/DynamsoftTeam/ygx0mvL7/)

Too many resolutions may be overwhelming for end users. Check out the following code on how to offer your own resolution options.

```html
<select class="dbrScanner-sel-resolution">
    <option class="dbrScanner-opt-gotResolution" value="got"></option>
    <option data-width="1920" data-height="1080">1920 x 1080</option>
    <option data-width="1280" data-height="720">1280 x 720</option>
    <option data-width="640" data-height="480">640 x 480</option>
</select>
```

> **Possible Issue**: : Generally you need to provide a resolution that the camera supports. However, in case a camera does not support a specified resolution, it usually will just use the nearest supported resolution. As a result, the selected resolution may not be the actual resolution. 
>
> **Solution**: To take care of this issue, you can add an option with the class name `dbrScanner-opt-gotResolution` (as shown above) which the library will then use to show the actual resolution being used.

[Try in JSFiddle](https://jsfiddle.net/DynamsoftTeam/9r8bucof/)

## Advanced Usage

### **Print out log for better debugging**
Include the following in your code to print internal logs in the console.

```javascript
Dynamsoft.DBR.BarcodeReader._onLog = console.log;
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
    scanner = await Dynamsoft.DBR.BarcodeScanner.createInstance();
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
[Try in JSFiddle](https://jsfiddle.net/DynamsoftTeam/9d6uxe15/)

###	Read a specific area/region

To speed up the scanning process, you can choose to scan only a specific area/region.

```javascript
let settings = await scanner.getRuntimeSettings();
/*
 * 1 means true
 * Using a percentage is easier
 * The following code shrinks the decoding region by 25% on all sides
 */
settings.region.regionMeasuredByPercentage = 1;
settings.region.regionLeft = 25;
settings.region.regionTop = 25;
settings.region.regionRight = 75;
settings.region.regionBottom = 75;
await scanner.updateRuntimeSettings(settings);
```
[Try in JSFiddle](https://jsfiddle.net/DynamsoftTeam/ju0c64ow/)

## Self-hosted | Offline | Intranet Deployment

For commercial usage, we highly recommend self-hosted deployment and use reliable commercial CDN to accelerate. The following steps guide you through how to deploy the library on your own server.

* **Step one**: Place the files
  

Locate the following files and place them in the same directory on your server. You can get them in `dist/`.

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
  
  Make sure that your webserver serves the `*.wasm` file with `Content-Type: application/wasm`. Otherwise, the browser won't be able to recognize it.
  
  All you need to do is set the MIME type for `.wasm`  to `application/wasm`.
  
  > Different servers are configured differently, below lists a few popular ones
  >
  > * NGINX: [mime.types](https://www.nginx.com/resources/wiki/start/topics/examples/full/#mime-types)
  > * IIS: [Web.config](https://github.com/dynamsoft-dbr/javascript-barcode/blob/dac614f8033661901d85381dfaff8d612115862a/documents/conf/Web.config)
  > * Java&trade; EE web app: [web.xml](https://github.com/dynamsoft-dbr/javascript-barcode/blob/dac614f8033661901d85381dfaff8d612115862a/documents/conf/web.xml)
  > * Node.js: [npm mime](https://github.com/broofa/node-mime)

* **Step three**: [Optional] Configure the `engineResourcePath`

If the resource files like the `wasm` files are not placed in the same directory as the file `dbr.js`.  Then you will need to specify the path with the API `engineResourcePath`. Note that it must be set before `loadWasm` or `createInstance` is called.
```js
Dynamsoft.DBR.BarcodeReader.engineResourcePath = "url/to/the/dir/";
```

## Known Issues

* <del>We use `webgl` in `BarcodeScannner` by default. If you need a specific resolution like `800 * 600` and find the barcode area is wrong, you can turn `webgl` off by setting `scanner._bUseWebgl = false;`.</del> Fixed in 8.1.2.

## Changelog

[Changelog](https://www.dynamsoft.com/barcode-reader/programming/javascript/release-notes/?utm_source=github&package=js)

## How to Upgrade

[From v7x to v8x](https://www.dynamsoft.com/barcode-reader/programming/javascript/user-guide/upgrade.html?ver=latest#from-v7x-to-v8x&utm_source=github&package=js)

## API Documentation

[Online Document](https://www.dynamsoft.com/barcode-reader/programming/javascript/?ver=latest&utm_source=github&package=js)

<!-- https://dynamsoft.github.io/javascript-barcode/doc/api%20reference/index.html -->

## License Activation

[License Activation](https://www.dynamsoft.com/barcode-reader/license-activation/set-full-license.html?ver=latest&utm_source=github&package=js)

## License Agreement

[License Agreement](https://www.dynamsoft.com/Products/barcode-reader-license-agreement.aspx?utm_source=github&package=js#javascript)

## Contact Us
If there are any questions, please feel free to contact <support@dynamsoft.com>.

