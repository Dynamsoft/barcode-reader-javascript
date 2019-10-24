# Dynamsoft JavaScript Barcode SDK for Node and Web

**Version**: 7.1.3

![Dynamsoft JavaScript Barcode SDK](https://www.dynamsoft.com/blog/wp-content/uploads/2018/12/blog_dbr6.4.1db06493aba126f0c7f177687cf56a9038dd655a1fd2d4374ab571ce738111858.png)

[Dynamsoft BarcodeReader SDK for Javascript](https://www.dynamsoft.com/Products/barcode-recognition-javascript.aspx) is a JavaScript API for barcode scanning based on the **WebAssembly** technology. It supports real-time localization and decoding of various barcode types. The library is capable of scanning barcodes from static images as well as directly from live video streams. It also supports reading multiple barcodes at once.

## Features

* Supported Symbologies: 

  1D barcode: **`Code 39`**, **`Code 93`**, **`Code 128`**, **`Codabar`**, **`EAN-8`**, **`EAN-13`**, **`UPC-A`**, **`UPC-E`**, **`Interleaved 2 of 5`** (ITF), **`Industrial 2 of 5`** (Code 2 of 5 Industry, Standard 2 of 5, Code 2 of 5), **`ITF-14`**.
  
  2D barcode: **`PDF417`**, **`QR`**, **`DataMatrix`**, and **`Aztec`**.

* Supported Data Sources: **`Blob`**, **`HTMLImageElement`**, **`HTMLVideoElement`**, and **`URL`**, etc.

* Browser Compatibility:

  | Browser Name | Version |
  |:-:|:-:|
  | Chrome | v57+ (v59+ on Android/iOS<sup>1</sup>) |
  | Firefox | v52+ (v55+ on Android/iOS<sup>1</sup>) |
  | Edge | v16+ |
  | Safari<sup>2</sup> | v11+ |

  <sup>1</sup> On iOS, camera video streaming only works in Safari.

  <sup>2</sup> Safari 11.2.2 ~ 11.2.6 are not supported.

> **Node.js** v8+ is also supported. However, it can only use `BarcodeReader` to read barcode from still-images. The video stream reader object `BarcodeScanner` is not supported.

## Quick Usage
### Node

```js
var dbr = require('dynamsoft-javascript-barcode');
dbr.BarcodeReader.productKeys = 'LICENSE-KEY';
dbr.BarcodeReader.createInstance().then(reader => {
    reader.decode('sample.png').then(results => {
        for(var i = 0; i < results.length; ++i){
            console.log(results[i].BarcodeText);
        }
        reader.destroy();
    });
});
```

### Web

```html
<!DOCTYPE html>
<html>
<body>
    <script src="node_modules/dynamsoft-javascript-barcode/dist/dbr.min.js" data-productKeys="LICENSE-KEY"></script>
    <script>
        let barcodeScanner = null;
        Dynamsoft.BarcodeScanner.createInstance({
            onFrameRead: results => {console.log(results);},
            onUnduplicatedRead: (txt, result) => {alert(txt);}
        }).then(scanner => {
            barcodeScanner = scanner;
            barcodeScanner.show();
        });
    </script>
</body>
</html>
```

## Table of Contents

- [Live Demo](#live-demo)
- [Getting Started: HelloWorld](#getting-started-helloworld)
- [Getting Started: Take a closer look](#getting-started-take-a-closer-look)
  - [Initializing](#initializing)
  - [Configuring Scanner Settings](#configuring-scanner-settings)
  - [Customizing the UI](#customizing-the-ui)
- [Advanced Usage](#advanced-usage)
  - [Print out log for better debugging](#print-out-log-for-better-debugging)
  - [Show found barcodes](#show-found-barcodes)
  - [Read a specific area/region](#read-a-specific-area-region)
  - [Custom Deployment](#custom-deployment)
- [Changelog](#changelog)
- [API Documentation](#api-documentation)
- [License Agreement](#license-agreement)
- [License Activation](#license-activation)
- [Contact Us](#contact-us)

## Live Demo

The following is a screenshot of the live demo. Try it [here](https://demo.dynamsoft.com/dbr_wasm/barcode_reader_javascript.html).

<img src="https://github.com/dynamsoft-dbr/javascript-barcode/raw/master/img/dbr-wasm-demo-scaning.jpg">



## Getting Started: HelloWorld

This section will help you use the library to build a simple web application to decode barcodes from a video stream. 

**Basic Requirements**:

* Internet connection

* Camera Access

### Step One: Write the code in minutes!

Create an HTML file with the following content. Deploy it to your web server if you have it already. 

* The sample is missing one piece of information to actually work which is the field `LICENSE-KEY`, you can acquire a trial key [here](https://www.dynamsoft.com/CustomerPortal/Portal/TrialLicense.aspx) and replace the field with your key.
* If you don't have a ready-to-use web server and you happen to have a package manager like `npm` or `yarn`, you can set up a simple http server in minutes. Check out http-server on [npm](https://www.npmjs.com/package/http-server) or [yarn](https://yarnpkg.com/en/package/http-server).

```html
<!DOCTYPE html>
<html>
<body>
    <!--
        Warning: Use a specific version in production. (e.g. https://cdn.jsdelivr.net/npm/dynamsoft-javascript-barcode@x.x.x/dist/dbr.min.js)
        Please visit https://www.dynamsoft.com/CustomerPortal/Portal/TrialLicense.aspx to get trial license.
    -->
    <script src="https://cdn.jsdelivr.net/npm/dynamsoft-javascript-barcode@7/dist/dbr.min.js" data-productKeys="LICENSE-KEY"></script>
    <script>
        let barcodeScanner = null;
        Dynamsoft.BarcodeScanner.createInstance({
            onFrameRead: results => {console.log(results);},
            onUnduplicatedRead: (txt, result) => {alert(txt);}
        }).then(scanner => {
            barcodeScanner = scanner;
            barcodeScanner.show();
        });
    </script>
</body>
</html>
```
[Try in JSFiddle](https://jsfiddle.net/DynamsoftTeam/pL4e7yrd/)

### Step Two: Tackle a few issues

Open the file in your browser (must be one that is supported) and there will be a pop-up asking for permission to access the camera. Once the access is granted, you will see the video stream in the default UI of the **BarcodeScanner**. 

##### **General Issue one**

If you open the HTML file as `file:///` or `http://`, the following error may appear in the browser console

> [Deprecation] getUserMedia() no longer works on insecure origins. To use this feature, you should consider switching your application to a secure origin, such as HTTPS. See https://goo.gl/rStTGz for more details.

In Safari 12 the error is

> Trying to call getUserMedia from an insecure document.

As the error states, to access the camera with the API [getUserMedia](https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia), a secure channel (`https://`) is required.

> If you use Chrome or Firefox, you might not get the error because these two browsers allow camera access via `file:///` and `http://localhost`.

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
  <script src="https://cdn.jsdelivr.net/npm/dynamsoft-javascript-barcode@7/dist/dbr.min.js" data-productKeys="LICENSE-KEY"></script>
  ```
  
  The same can be done with other CDNs like unpkg as well
  
  ```javascript
  <script src="https://unpkg.com/dynamsoft-javascript-barcode@7/dist/dbr.min.js" data-productKeys="LICENSE-KEY"></script>
  ```

* The following script initializes and uses the library:
  
  ```javascript
  <script>
      let barcodeScanner = null;
      Dynamsoft.BarcodeScanner.createInstance({
          onFrameRead: results => {console.log(results);},
          onUnduplicatedRead: (txt, result) => {alert(txt);}
      }).then(scanner => {
          barcodeScanner = scanner;
          barcodeScanner.show();
      });
  </script>
  ```
  For now, pay attention to the following two events.

    * `onFrameRead`
      This event is triggered after a single frame is scanned. The `results` object contains all the barcode results that the library found on this frame.
  * `onUnduplicatedRead`
      This event is triggered when a new barcode (not a duplicate) is found. `txt` holds the barcode text value while `result` is an object that holds details of the found barcode.

In the following sections, you'll find more detailed information on how the library works and how you can customize it to your needs.

## Getting Started: Take a closer look

### Initializing

The library is based on the WebAssembly standard, therefore, **on first use**, it needs some time to download  and compile the WebAssembly files. After the first use, the program will cache the wasm file in the `IndexedDB` so that the next time you can just open and play. 

`Dynamsoft.BarcodeReader.loadWasm` is the API used to start the initialization. However, other APIs like `Dynamsoft.BarcodeReader.createInstance`, `Dynamsoft.BarcodeScanner.createInstance` will call `loadWasm` internally so it is not necessary to explicitly call `loadWasm` when using these APIs. 

> Including the library with a script tag doesn't automatically initializes the library.

The initialization includes the following steps:

1. Download

`Dynamsoft.BarcodeReader._onWasmDownloaded` is a built-in callback that gets triggered when the WebAssembly files are downloaded. As the downloading only happens on the first use, this callback will only be triggered once as well (assume that the user doesn't clear the old cached files).

2. Compile

The WebAssembly files are automatically compiled once downloaded. The compilation time varies among different devices & browsers. While it takes less than tenth of a seconds on latest phones or PCs, it may take seconds on some older devices. 

3. Initialize

The library needs to initialize every time the page loads. Use the following code to listen to the initialization process:

```javascript
Dynamsoft.BarcodeReader.loadWasm()
    .then(()=>{ /* success */ }, ex=>{console.error(ex.message||ex);})
```

> You can use `Dynamsoft.BarcodeReader.createInstance` or `Dynamsoft.BarcodeScanner.createInstance` as well, to listen to the initialization process during `createInstance`.


### Configuring Scanner Settings

When creating an instance of the `BarcodeScanner` object, there are a number of configuration options. The following code shows some of the most useful ones:

```js
let barcodeScanner = null;
Dynamsoft.BarcodeScanner.createInstance({
    // The following two callbacks are explained in previous context
    onFrameRead: results => {console.log(results);},
    onUnduplicatedRead: (txt, result) => {alert(txt);}
}).then(scanner => {
    barcodeScanner = scanner;
    // updateVideoSettings sets which camera and what resolution to use
    barcodeScanner.updateVideoSettings({ video: { width: 1280, height: 720, facingMode: "environment" } });

    let runtimeSettings = barcodeScanner.getRuntimeSettings();
    // Specify which symbologies are to enabled
    runtimeSettings.BarcodeFormatIds = Dynamsoft.EnumBarcodeFormat.OneD | Dynamsoft.EnumBarcodeFormat.QR_CODE;
    // By default, the library assumes accurate focus and good lighting. The settings below are for more complex environments. Check out according API descriptions for more info.
    runtimeSettings.localizationModes = [2,16,4,8,0,0,0,0];
    // Discard results which have a low confidence score.
    runtimeSettings.minResultConfidence = 30;
    barcodeScanner.updateRuntimeSettings(runtimeSettings);

    let scanSettings = barcodeScanner.getScanSettings();
    // Disregard duplicated results found in a specified time period
    scanSettings.duplicateForgetTime = 20000;
    // Set a interval so that the CPU can relax
    scanSettings.intervalTime = 300;
    barcodeScanner.updateScanSettings(scanSettings);
    barcodeScanner.show();
})
```

[Try in JSFiddle](https://jsfiddle.net/DynamsoftTeam/yfkcajxz/)

As you can see in the code, there are basically three categories of configurations.

* `get/updateVideoSettings`: Configures the data source, I.E., the video stream. These settings include which camera to use , the resolution, etc.. Check out more information [here](https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia#Syntax).
* `get/updateRuntimeSettings`: Configures the decode engine. Find a full list of these settings and their corresponding descriptions [here](https://www.dynamsoft.com/help/Barcode-Reader/struct_dynamsoft_1_1_barcode_1_1_public_runtime_settings.html). Below lists the recommended settings for specific usage.
[Try in JSFiddle](https://jsfiddle.net/DynamsoftTeam/f24h8c1m/)
  
  **fast**
  
  ```javascript
  let settings = barcodeScanner.getRuntimeSettings();
  settings.localizationModes = [2, 0, 0, 0, 0, 0, 0, 0];
  settings.deblurLevel = 0;
  barcodeScanner.updateRuntimeSettings(settings);
  ```
  **1D**
  ```javascript
  let settings = barcodeScanner.getRuntimeSettings();
  settings.localizationModes = [2, 4, 8, 0, 0, 0, 0, 0];
  settings.deblurLevel = 0;
  barcodeScanner.updateRuntimeSettings(settings);
  ```
  **2D**
  
  ```javascript
  let settings = barcodeScanner.getRuntimeSettings();
  settings.localizationModes = [2, 4, 8, 0, 0, 0, 0, 0];
  settings.deblurLevel = 2;
  barcodeScanner.updateRuntimeSettings(settings);
  ```
* `get/updateScanSettings`: Configures the scanner. For v7.0, the configurations for the scanner are limited to `duplicateForgetTime` and `intervalTime`.

### Customizing the UI

While the library provides a built-in `BarcodeScanner` which has its own UI, you are free to use your own UI. Check out the following code on how it's done.

```html
<!DOCTYPE html>
<html>
<body>
    <div id="div-video-container">
        <video class="dbrScanner-video" playsinline="true"></video>
    </div>
    <!--
        Warning: Use a specific version in production. (e.g. https://cdn.jsdelivr.net/npm/dynamsoft-javascript-barcode@x.x.x/dist/dbr.min.js)
        Please visit https://www.dynamsoft.com/CustomerPortal/Portal/TrialLicense.aspx to get trial license.
    -->
    <script src="https://cdn.jsdelivr.net/npm/dynamsoft-javascript-barcode@7/dist/dbr.min.js" data-productKeys="LICENSE-KEY"></script>
    <script>
        let barcodeScanner = null;
        Dynamsoft.BarcodeScanner.createInstance({
            UIElement: document.getElementById('div-video-container'),
            onFrameRead: results => {console.log(results);},
            onUnduplicatedRead: (txt, result) => {alert(txt);}
        }).then(scanner => {
            barcodeScanner = scanner;
            barcodeScanner.show();
        });
    </script>
</body>
</html>
```
[Try in JSFiddle](https://jsfiddle.net/DynamsoftTeam/2jzeq1r6/)

The code has specified the `UIElement` with the ID `div-video-container`  as the data source element and has put a video element inside to show the camera video stream.

> **Important**: The class name of the video element must be `dbrScanner-video`.
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
> **Resolution**: To take care of this issue, you can add a option with the class name `dbrScanner-opt-gotResolution` (as shown above) which the library will then use to show the actual resolution being used.

[Try in JSFiddle](https://jsfiddle.net/DynamsoftTeam/tnfjks4q/)

#### Customizing Further

You may not want to use elements with the default class names to show the camera list or resolution list. In this case, you need to populate the two lists yourself.

For camera list, you can use the API `getAllCameras()` to get all available cameras and then populate them on the page.

```HTML
<select id="custom-camera-list"></select>
```

```javascript
let currentCamera = "";
let cameraList = document.getElementById("custom-camera-list");
barcodeScanner.show()
    .then(() => barcodeScanner.getCurrentCamera())
    .then(camera => {
        currentCamera = camera;
    })
    .then(() => barcodeScanner.getAllCameras())
    .then(allCameras => {
        cameraList.options.length = 0;
        for (let i = 0; i < allCameras.length; i++) {
            let camera = allCameras[i];
            cameraList.options.add(new Option(camera.label, camera.deviceId));
            if (camera.deviceId == currentCamera.deviceId)
                cameraList.selectedIndex = i;
        }
    });
```

Switch to the selected camera.

```js
cameraList.onchange = () => {
    barcodeScanner.setCurrentCamera(cameraList.options[cameraList.selectedIndex].value);
};
```

[Try in JSFiddle](https://jsfiddle.net/DynamsoftTeam/2L9ta7mj/)

If you have more than one camera and would like to use a certain one of them. Try out the code below.

```js
barcodeScanner.show()
    .then(() => barcodeScanner.getAllCameras())
    .then(allCameras => {
        for (let camera of allCameras) {
            if (camera.label == 'Your-Camera-Name') {
                barcodeScanner.setCurrentCamera(camera.deviceId);
                break;
            }
        }
    });
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
resolutionList.onchange = () => {
    barcodeScanner.setResolution(
        resolutionList.options[resolutionList.selectedIndex].getAttribute("data-width"),
        resolutionList.options[resolutionList.selectedIndex].getAttribute("data-height")
    );
};
```

[Try in JSFiddle](https://jsfiddle.net/DynamsoftTeam/djhvno5b/)

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
let barcodeScanner = null;
Dynamsoft.BarcodeScanner.createInstance({
    UIElement: document.getElementById('div-video-container'),
    onFrameRead: results => {console.log(results);},
    onUnduplicatedRead: (txt)=>{
        document.getElementById('ipt-' + iptIndex).value = txt;
        if(3 == ++iptIndex){
            barcodeScanner.onUnduplicatedRead = undefined;
            // Hide the scanner if you only need to read these three barcodes
            barcodeScanner.stop();
            barcodeScanner.hide();
        }
    }
}).then(scanner => {
    barcodeScanner = scanner;
    barcodeScanner.show();
});
```
[Try in JSFiddle](https://jsfiddle.net/DynamsoftTeam/tz9ngm2a/)

###	Read a specific area/region

To speed up the scanning process, you can choose to scan only a specific area/region.

```javascript
let settings = barcodeScanner.getRuntimeSettings();
/*
 * 1 means true
 * Using a percentage is easier
 * The following code ignores 25% to each side of the video stream
 */
settings.region.measuredByPercentage = 1;
settings.region.left = 25;
settings.region.top = 25;
settings.region.right = 75;
settings.region.bottom = 75;
barcodeScanner.updateRuntimeSettings(settings);
```
[Try in JSFiddle](https://jsfiddle.net/DynamsoftTeam/taykq592/)

### Custom Deployment

The library consists of several files. In the sample code above, we used it via a CDN which hosts all the necessary files. Most of the time using the CDN is enough. However, you may prefer to deploy the library on your own server in some cases. For example, in an environment without internet access. The following shows how it's done.

* **Step one**: Place the files
  

Create a directory called `dist` on your server and put the following files in there.

> [Download zip](https://www.dynamsoft.com/Downloads/Dynamic-Barcode-Reader-Download.aspx?edition=js) to get these files.

  ```
  dbr-<version>.min.js
  dbr-<version>.wasm.min.js
  dbr-<version>.wasm
  dbr-<version>.wasm.withio.min.js
  dbr-<version>.withio.wasm
  dbr-<version>.esm.min.js
  ```
It's recommended to place all the files. If you want to place only the necessary ones, check out the following instructions.

  > * web + document + UMD:
  >```
  > dbr-<version>.min.js
  > dbr-<version>.wasm.min.js
  > dbr-<version>.wasm
  > ```
  > 
  > * web + worker + UMD:
  >```
  > dbr-<version>.min.js
  > dbr-<version>.wasm.withio.min.js
  > dbr-<version>.withio.wasm
  > ```
  > 
  > * web + document + es6 module:
  >```
  > dbr-<version>.min.esm.js
  > dbr-<version>.wasm.min.js
  > dbr-<version>.wasm
  > ```
  > 
  > * web + worker + es6 module:
  >```
  > dbr-<version>.min.esm.js
  > dbr-<version>.wasm.withio.min.js
  > dbr-<version>.withio.wasm
  > ```
  > 
  > * nodejs + UMD:
  >```
  > dbr-<version>.min.js
  > dbr-<version>.wasm.withio.min.js
  > dbr-<version>.withio.wasm
> ```

* **Step two**: Configure the server
  
  Make sure that your webserver serves the `*.wasm` file with `Content-Type: application/wasm` . Otherwise the browser won't be able to recognize it.
  
  Basically, all you need to do is set the MIME type for `.wasm`  to `application/wasm`.
  
  > Different servers are configured differently, below lists a few popular ones
  >
  > * NGINX: [mime.types](https://www.nginx.com/resources/wiki/start/topics/examples/full/#mime-types)
  > * IIS: [Web.config](https://github.com/dynamsoft-dbr/javascript-barcode/blob/master/documents/conf/Web.config)
  > * Java&trade; EE web app: [web.xml](https://github.com/dynamsoft-dbr/javascript-barcode/blob/master/documents/conf/web.xml)
  > * Node.js: [npm mime](https://github.com/broofa/node-mime)



## Changelog

### 7.1.3

Add a more advanced react example.

### 7.1.1

Fix bug about torch. Torch (flashlight) is supported in chrome with the supported cameras.

### 7.1.0

Updated algorithm to 7.1. 

Improved the speed to download, build and initialize the library.

Improved the readability of barcode result text by using UTF-8 encoding.

Improved developer’s guide to be clearer and more precise.

Renamed setScanSettings for updateScanSettings for naming consistence.

### 7.0.0

Built Dynamsoft Barcode Reader 7.0 to JS(WebAssembly) version.

Added the capability to enable/disable the torch/flashlight of a mobile device (when available, only Chrome on Android).

Added APIs for finer video control. These APIs are getAllCameras, getCurrentCamera, setCurrentCamera, getResolution, setResolution.

### 6.5.2.1

Improve video decoding capabilities.

### 6.5.2

Built Dynamsoft Barcode Reader 6.5.2 to JS(WebAssembly) version.

Walkaround for certain scenarios of [Content Security Policy (CSP)](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP).

Add a setting can turn off the feature of using IndexedDB.

### 6.5.1
Added video view for barcode scan. Compatible with Node.js.

### 6.4.1.3

The `dbr-6.4.1.3.wasm` size is now reduced to 3.41M.

### 6.4.1.1

Fixed a memory leak related to `mTimeout` in `RuntimeSettings`.

### 6.4.1.0

Built Dynamsoft Barcode Reader 6.4.1 to JS(WebAssembly) version.

Combined the normal and the mobile version into one.

### 6.3.0.2

Added built-in Worker support.

### 6.3.0.1

Set `dbr-<version>.js`(stable) as the main branch.

Added `dbr-<version>.mobile.js`(smaller, compiles quicker, requires less memory, but not as stable) for mobile Safari.

### 6.3.0

Dynamsoft Barcode Reader JS/WebAssembly version released.

## API Documentation

<!--for github: link need use online-->

Decoding Images:

[BarcodeReader](https://www.dynamsoft.com/help/Barcode-Reader-wasm/classes/_dbr_wasm_d_.dynamsoft.barcodereader.html)

Decoding Video Stream: 

[BarcodeScanner](https://www.dynamsoft.com/help/Barcode-Reader-wasm/classes/_dbr_wasm_d_.dynamsoft.barcodescanner.html)

## License Activation

It takes several steps to activate a purchased license, the following steps assume you have already acquired a commercial license from Dynamsoft. If you haven't done so, you can purchase [here](https://www.dynamsoft.com/Secure/Barcode-Reader-BuyIt.aspx).

* **Step One** : Create a Dynamsoft Account 

  If you don't have a Dynamsoft Account yet, sign up [here](https://www.dynamsoft.com/CustomerPortal/Account/Registration.aspx).

* **Step Two** : Log into Dynamsoft Customer Portal 

  Once logged in, click **Barcode Reader SDK** on the menu bar on the left under **License Center** and you should be able to see your purchased key on the right pane.

* **Step Three** : Activate the License

  Under **Status**, click the link **Activate Now** where you will be asked to input a domain which your license key will be bound to. The domain binding is a security feature to protect your license, although it's optional, it's highly recommended.

  > A few examples of the domain
  >
  > www.dynamsoft.com
  >
  > demo.dynamsoft.com
  >
  > *.dynamsoft.com
  >
  > *.dynamsoft.com;\*.yoursite.com

* **Step Four** : Use the License

  You may have noticed that in all the samples above, we have the following line of code

  ```javascript
  <script src="https://cdn.jsdelivr.net/npm/dynamsoft-javascript-barcode@7/dist/dbr.min.js" data-productKeys="LICENSE-KEY"></script>
  ```

  To use your license, you simply need to replace `LICENSE-KEY` with it.

## License Agreement

https://www.dynamsoft.com/Products/barcode-reader-license-agreement.aspx#javascript

## Contact Us
If there are any questions, please feel free to contact <support@dynamsoft.com>.

