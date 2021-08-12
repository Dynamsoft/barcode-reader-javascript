# Dynamsoft Barcode Reader for Your Website

![version](https://img.shields.io/npm/v/dynamsoft-javascript-barcode.svg)
![downloads](https://img.shields.io/npm/dm/dynamsoft-javascript-barcode.svg) 
![jsdelivr](https://img.shields.io/jsdelivr/npm/hm/dynamsoft-javascript-barcode.svg)
![](https://img.shields.io/snyk/vulnerabilities/npm/dynamsoft-javascript-barcode.svg)

Turn your web page into a barcode scanner with just a few lines of code.

Once integrated, your users can open your website in a browser, access their cameras and read barcodes directly from the video input.

In this guide, you will learn step by step on how to integrate this library into your website.

> Also see [Dynamsoft Barcode Reader for Node](https://github.com/Dynamsoft/javascript-barcode/blob/master/README.NODE.md).

Table of Contents:

* [Hello World - Simplest Implementation](#hello-world---simplest-implementation)
* [Building your own page](#building-your-own-page)
  - [Include the library](#include-the-library)
  - [Configure the library](#configure-the-library)
  - [Interact with the library](#interact-with-the-library)
* [Requesting A Trial](#requesting-a-trial)
* [System Requirements](#system-requirements)
* [Hosting the Library](#hosting-the-library)
* [Advanced Usage](#advanced-usage)
* [How to Upgrade](#how-to-upgrade)
* [FAQ](#faq)

Example Code:

* [Use the library in Angular](https://github.com/Dynamsoft/dbr-browser-samples/tree/master/1.hello-world/3.read-video-angular)
* [Use the library in React](https://github.com/Dynamsoft/dbr-browser-samples/tree/master/1.hello-world/4.read-video-react)
* [Use the library in Vue](https://github.com/Dynamsoft/dbr-browser-samples/tree/master/1.hello-world/5.read-video-vue)

You can also:

* [Try All Online Examples](https://dynamsoft.github.io/dbr-browser-samples/index.html)
* [Try the Official Demo](https://demo.dynamsoft.com/barcode-reader-js/)

* [Learn more through API Reference](https://www.dynamsoft.com/barcode-reader/programming/javascript/api-reference/?ver=latest)



## Hello World - Simplest Implementation

Let's start by testing the "Hello World" example of the library which demonstrates how to use the minimum code to enable a web page to read barcodes from a live video stream.  

* Basic Requirements
  + Internet connection  
  + [A supported browser](#system-requirements)
  + Camera access  

### Step One: Check the code of the example

The complete code of the "Hello World" example is shown below

``` html
<!DOCTYPE html>
<html>

<body>
    <script src="https://cdn.jsdelivr.net/npm/dynamsoft-javascript-barcode@8.4.0/dist/dbr.js"></script>
    <script>
        // initializes and uses the library
        let scanner = null;
        (async () => {
            scanner = await Dynamsoft.DBR.BarcodeScanner.createInstance();
            scanner.onFrameRead = results => {
                if (results.length > 0) console.log(results);
            };
            scanner.onUnduplicatedRead = (txt, result) => {
                alert(txt);
            };
            await scanner.show();
        })();
    </script>
</body>

</html>
```

> You can also find the code (with more comments) [on GitHub](https://github.com/Dynamsoft/dbr-browser-samples/blob/master/1.hello-world/1.minimum-code.html).

*About the code*

  + `createInstance()`: This method creates a `BarcodeScanner` object. This object can read barcodes directly from a video input with the help of its interactive UI (hidden by default) and the [MediaDevices interface](https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices).

  + `onFrameRead`: This event is triggered every time the library finishes scanning a video frame. The `results` object contains all the barcode results that the library have found on this frame. In this example, we print the results to the browser console.

  + `onUnduplicatedRead`: This event is triggered when the library finds a new barcode, which is not a duplicate among multiple frames. `txt` holds the barcode text value while `result` is an object that holds details of the barcode. In this example, an alert will be displayed for this new barcode.

  + `show()`: This method brings up the built-in UI of the `BarcodeScanner` object.

### Step Two: Test the example

You can choose one of three ways to test the example:

* [Hello World example via GitHub Pages](https://dynamsoft.github.io/dbr-browser-samples/1.hello-world/1.minimum-code.html) 
* [Hello World example via JSFiddle](https://jsfiddle.net/DynamsoftTeam/pL4e7yrd/)
* [Download a copy](https://tst.dynamsoft.com/public/download/dbr/browser/code/helloworld.zip) of the example code and set it up locally

Either way, you open the example page in a browser, allow the page to access your camera and the video will show up on the page. After that, you can point the camera at something with a barcode to read it.

If the barcode is decoded, an alert will pop up with the result text. At the same time, the barcode location will be highlighted in the video feed. 

  > For first use, you may need to wait a few seconds for the library to initialize.

*Note*:

  + The library only scans a new frame when it has finished scanning the previous frame. The interval between two consecutive frames might not be enough time for the library to process the 1st frame (for 30 FPS, the interval is about 33 ms), therefore, not all frames are scanned.

  + The library requires a license to work. However, when no license is specified in the code, Dynamsoft allows a 7-day free trial period during which you can make initial evaluation of the library to decide whether or not you want to evaluate it further. If you do, you can [request a trial](#requesting-a-trial).

    > Network connection is required for the 7-day trial to work.

If the test doesn't go as expected, you can check out the [FAQ](#faq) or [contact us](https://www.dynamsoft.com/company/contact/).

## Building your own page

### Include the library

#### 2.1.1 Use a CDN

The simplest way to include the library is to use either the [jsDelivr](https://jsdelivr.com/) or [UNPKG](https://unpkg.com/) CDN. The "hello world" example above uses **jsDelivr**.

* jsDelivr

  ``` html
  <script src="https://cdn.jsdelivr.net/npm/dynamsoft-javascript-barcode@8.4.0/dist/dbr.js"></script>
  ```

* UNPKG  

  ``` html
  <script src="https://unpkg.com/dynamsoft-javascript-barcode@8.4.0/dist/dbr.js"></script>
  ```

#### 2.1.2 Host the library yourself (recommended)

Besides using the CDN, you can also download the library and host its files on your own website / server before including it in your application.

The following shows a few ways to download the library.

* From the website

  [Download the JavaScript Package](https://www.dynamsoft.com/barcode-reader/downloads/)

* yarn

  ```cmd
  $ yarn add dynamsoft-javascript-barcode
  ```

* npm

  ``` 
  $ npm install dynamsoft-javascript-barcode --save
  ```

Depending on how you downloaded the library and where you put it. You can typically include it like this:

``` html
<script src="/DBR-JS-8.4.0/dist/dbr.js"></script>
```

or

``` html
<script src="/node_modules/dynamsoft-javascript-barcode/dist/dbr.js"></script>
```

Read more on [how to host the library](#hosting-the-library).

### Configure the library

Before using the library, you need to configure a few things.

#### 2.2.1 Specify the license

  The library requires a license to work, use the APIs `organizationID` and `handshakeCode` to specify how to acquire the license.

  ``` javascript
  Dynamsoft.DBR.BarcodeScanner.organizationID = "YOUR-ORGANIZATION-ID"; // Required.
  Dynamsoft.DBR.BarcodeScanner.handshakeCode = "A-SPECIFIC-HANDSHAKECODE"; // Optional, if not specified, the default handshake code is used.
  Dynamsoft.DBR.BarcodeScanner.sessionPassword = "PASSWORD-TO-PROTECT-YOUR-LICENSE"; // Optional but recomended, use it to protect your license.
  Dynamsoft.DBR.BarcodeScanner.licenseServer = ["YOUR-OWN-MAIN-LTS", "YOUR-OWN-STANDBY-LTS"]; //Optional, ignore this line if you are using Dynamsoft-hosting LTS.
  ```

  *Note*:

  + Network connection is required for the license to work.
  + If nothing is specified, a 7-day (public) trial will be used by default which is the case in the above "hello world" example.
  + The license is actually fetched during the creation of an `BarcodeScanner` or `BarcodeReader` object.
  + If a public network connection is not available, you can choose to host a license server in your private network or even get an offline license that does not require any network connection. [Contact us](https://www.dynamsoft.com/company/contact/) for more information.

#### 2.2.2 Specify the location of the "engine" files

  The "engine" files refer to *.worker.js, *.wasm.js and *.wasm, etc. which are loaded by the main library at runtime. This configuration option uses the API `engineResourcePath` and is often not required as these files usually are in the same location with the main library file (dbr.js). However, in cases where the engine files are not in the same location as the main library file (for example, with frameworks like Angular or React, dbr.js is compiled into another file), this configuration will be required.

  The following code uses the jsDelivr CDN, feel free to change it to your own location of these files.
  
  ``` javascript
  import DBR from "dynamsoft-javascript-barcode";
  DBR.BarcodeScanner.engineResourcePath = "https://cdn.jsdelivr.net/npm/dynamsoft-javascript-barcode@8.2.3/dist/";
  export default DBR;
  ```

#### 2.2.3 Specify which engine to use

  The library comes with two engines: "compact" and "full". They may be merged into one in the future, but right now you can choose one to use.

  By default, the compact engine is used. The following line changes it to the full engine.

  ``` javascript
  Dynamsoft.DBR.BarcodeScanner._bUseFullFeature = true;
  ```

  The following table compares the features between the two engines:

  | Features | Compact edition | Full edition |
  |:-:|:-:|:-:|
  | *.wasm* size<sup>*</sup>\(gzip\) | 897 KB | 1.2 MB |
  | 1D | &#10003; | &#10003; |
  | QR | &#10003; | &#10003; |
  | Micro QR | - | &#10003; |
  | PDF417 | &#10003; | &#10003; |
  | Micro PDF417 | - | &#10003; |
  | DataMatrix | &#10003; | &#10003; |
  | Aztec | - | &#10003; |
  | MaxiCode | - | &#10003; |
  | Patch Code | - | &#10003; |
  | GS1 Composite Code | - | &#10003; |
  | GS1 DataBar | - | &#10003; |
  | DotCode | - | &#10003; |
  | Postal Code | - | &#10003; |
  | DPM | - | &#10003; |
  | getRuntimeSettings | &#10003; | &#10003; |
  | updateRuntimeSettings | &#10003; | &#10003; |
  | getIntermediateResults | - | &#10003; |
  | initRuntimeSettingsWithString | - | &#10003; |
  | outputSettingsToString | - | &#10003; |

  <sup>*</sup> The file size is version 8.2.5. In other versions, the size may be different.

### Interact with the library

#### 2.3.1 Create a `BarcodeScanner` object

You can use one of two classes ( `BarcodeScanner` and `BarcodeReader` ) to interact with the library. `BarcodeReader` is a low-level class that processes images directly. `BarcodeScanner` , on the other hand, inherits from `BarcodeReader` and provides high-level APIs and a built-in UI to allow barcode scanning via cameras. We'll focus on `BarcodeScanner` in this guide.

To use the library, we first create a `BarcodeScanner` object.

``` javascript
try {
    await Dynamsoft.DBR.BarcodeScanner.createInstance();
} catch (ex) {
    console.error(ex);
}
```

*Note*:

* The creation of an object consists of two parallel tasks: one is to download and compile the "engine", the other is to fetch a license from the License Tracking Server (assuming an online license is used).

#### 2.3.2 Configure the `BarcodeScanner` object

Let's take a look at the following code snippets first:

``` javascript
// set which camera and what resolution to use
await scanner.updateVideoSettings({
    video: {
        width: 1280,
        height: 720,
        facingMode: "environment"
    }
});
```

``` javascript
// set up the scanner behavior
let scanSettings = await scanner.getScanSettings();
// disregard duplicated results found in a specified time period
scanSettings.duplicateForgetTime = 20000;
// set a scan interval so the library may release the CPU from time to time
scanSettings.intervalTime = 300;
await scanner.updateScanSettings(scanSettings);
```

``` javascript
// use one of the built-in RuntimeSetting templates: "single" (decode a single barcode, default mode), "speed", "balance", "coverage". "speed" is recommended for decoding from a video stream
await scanner.updateRuntimeSettings("speed");

// make changes to the template. The code below demonstrates how to specify which symbologies are enabled
let runtimeSettings = await scanner.getRuntimeSettings();
runtimeSettings.barcodeFormatIds = Dynamsoft.DBR.EnumBarcodeFormat.BF_ONED | Dynamsoft.DBR.EnumBarcodeFormat.BF_QR_CODE;
await scanner.updateRuntimeSettings(runtimeSettings);
```

[Try in JSFiddle](https://jsfiddle.net/DynamsoftTeam/yfkcajxz/)

As you can see from the above code snippets, there are three types of configurations:

* `get/updateVideoSettings`: Configures the data source, i.e., the camera. These settings include which camera to use, the resolution, etc. Learn more [here](https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia#Syntax).

* `get/updateScanSettings`: Configures the behavior of the scanner which includes `duplicateForgetTime`,  `intervalTime` and `filter`, etc.

* `get/updateRuntimeSettings`: Configures the decode engine. Find a full list of these settings and their corresponding descriptions [here](https://www.dynamsoft.com/barcode-reader/programming/javascript/api-reference/global-interfaces.html#runtimesettings). For example, the following uses the built-in "speed" settings with updated `localizationModes`.

  ``` javascript
  await barcodeScanner.updateRuntimeSettings("speed");
  //await barcodeScanner.updateRuntimeSettings("balance"); //alternative
  //await barcodeScanner.updateRuntimeSettings("coverage"); //alternative
  let settings = await barcodeScanner.getRuntimeSettings();
  settings.localizationModes = [
      Dynamsoft.DBR.EnumLocalizationMode.LM_CONNECTED_BLOCKS,
      Dynamsoft.DBR.EnumLocalizationMode.LM_SCAN_DIRECTLY,
      Dynamsoft.DBR.EnumLocalizationMode.LM_LINES, 0, 0, 0, 0, 0
  ];
  await barcodeScanner.updateRuntimeSettings(settings);
  ```

  Try in [JSFiddle](https://jsfiddle.net/DynamsoftTeam/f24h8c1m/).

  See also [settings samples on GitHub](https://dynamsoft.github.io/dbr-browser-samples/3.settings/index.html).

#### 2.3.3 Customize the UI

The built-in UI of the `BarcodeScanner` object is defined in the file `dist/dbr.scanner.html` . There are a few ways to customize it:

* Modify the file `dist/dbr.scanner.html` directly. 

  This option is only possible when you host this file on your own web server instead of using a CDN.

* Copy the file `dist/dbr.scanner.html` to your application, modify it and use the the API `defaultUIElementURL` to set it as the default UI.

  ``` javascript
  Dynamsoft.DBR.BarcodeScanner.defaultUIElementURL = "THE-URL-TO-THE-FILE";
  ```
  
  > You must set `defaultUIElementURL` before you call `createInstance()` .

* Append the default UI element to your page, customize it before showing it.

  ``` html
  <div id="scannerUI"></div>
  ```

  ``` javascript
  document.getElementById('scannerUI').appendChild(scanner.getUIElement());
  document.getElementsByClassName('dbrScanner-btn-close')[0].hidden = true; // Hide the close button
  ```

* Build the UI element into your own web page and specify it with the API `setUIElement(HTMLElement)`.

  - Embed the video

    ``` html
    <div id="div-video-container">
        <video class="dbrScanner-video" playsinline="true" style="width:100%;height:100%;position:absolute;left:0;top:0;"></video>
    </div>
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
    ```

    > The video element must have the class `dbrScanner-video` .

    [Try in JSFiddle](https://jsfiddle.net/DynamsoftTeam/2jzeq1r6/)

  - Add the camera list and resolution list
  
    If the class names for these lists match the default ones, `dbrScanner-sel-camera` and `dbrScanner-sel-resolution` , the library will automatically populate the lists and handle the camera/resolution switching.

    ``` html
    <select class="dbrScanner-sel-camera"></select>
    ```

    [Try in JSFiddle](https://jsfiddle.net/DynamsoftTeam/nbj75vxu/)

    ``` html
    <select class="dbrScanner-sel-resolution"></select>
    ```

    [Try in JSFiddle](https://jsfiddle.net/DynamsoftTeam/25v08paf/)

    > By default, 8 hard-coded resolutions are populated as options. You can show only a custom set of options by hardcoding them.

    ``` html
    <select class="dbrScanner-sel-resolution">
        <option class="dbrScanner-opt-gotResolution" value="got"></option>
        <option data-width="1920" data-height="1080">1920 x 1080</option>
        <option data-width="1280" data-height="720">1280 x 720</option>
        <option data-width="640" data-height="480">640 x 480</option>
    </select>
    ```

    [Try in JSFiddle](https://jsfiddle.net/DynamsoftTeam/tnfjks4q/)

    > Generally, you need to provide a resolution that the camera supports. However, in case a camera does not support the specified resolution, it usually uses the nearest supported resolution. As a result, the selected resolution may not be the actual resolution used. In this case, add an option with the class name `dbrScanner-opt-gotResolution` (as shown above) and the library will then use it to show the actual resolution.

See also [UI customization samples on GitHub](https://dynamsoft.github.io/dbr-browser-samples/2.ui-tweaking/index.html).

Interested to test it further? Read on to learn how to request a 30-day free trial.

## Requesting A Trial

From version 8.2.5 of the library, if no license is specified, a 7-day trial will be used by default. 

> Network connection is required for the 7-day trial to work.

After that, if you want to evaluate the library further, you can [register for a Dynamsoft account](https://www.dynamsoft.com/api-common/Regist/Regist) (if you haven't already done so) and request a 30-day trial in the [customer portal](https://www.dynamsoft.com/CustomerPortal/Portal/TrialLicense.aspx).

* If you like, you can also [contact our support team](https://www.dynamsoft.com/company/contact/) to get a trial extension.

## System Requirements

This library requires the following features which are supported by all modern mainstream browsers:

* `WebAssembly`, `Blob`, `URL`/`createObjectURL`, `Web Workers`  
    
  These four features are required for the library to work.

* `MediaDevices`/`getUserMedia` 
    
  This API is only required for in-browser video streaming. If a browser does not support this API, the [Single Frame Mode](https://www.dynamsoft.com/barcode-reader/programming/javascript/api-reference/BarcodeScanner/properties.html?ver=latest#singleframemode) will be used automatically. If the API exists but doesn't work correctly,  the Single Frame Mode can be used as an alternative way to access the camera.

The following table is a list of supported browsers based on the above requirements:

Browser Name | Version
:-: | :-:
Chrome | v57+ (v59+ on Android/iOS<sup>1</sup>)
Firefox | v52+ (v55+ on Android/iOS<sup>1</sup>)
Edge<sup>2</sup> | v16+
Safari<sup>3</sup> | v11+

<sup>1</sup> iOS 14.3+ is required for camera video streaming in Chrome and Firefox or Apps using webviews.

<sup>2</sup> On Edge, due to strict Same-origin policy, you must host the library files on the same domain as your web page. 

<sup>3</sup> Safari 11.2.2 ~ 11.2.6 are not supported.
     
Apart from the browsers, the operating systems may impose some limitations of their own that could restrict the use of the library. Browser compatibility ultimately depends on whether the browser on that particular operating system supports the features listed above.

## Hosting the library

### Step One: Deploy the dist folder

Once you have downloaded the library, you can locate the "dist" directory and copy it to your server (usually as part of your website / web application). The following shows some of the files in this directory:

* `dbr.js` // The main library file
* `dbr.browser.mjs` // For using the library as a module (`<script type="module">`)
* `dbr.scanner.html` // Defines the default scanner UI
* `dbr-<version>.worker.js` // Defines the worker thread for barcode reading
* `dbr-<version>.wasm.js` // Compact edition of the library (.js)
* `dbr-<version>.wasm` // Compact edition of the library (.wasm)
* `dbr-<version>.full.wasm.js` // Full edition of the library (.js)
* `dbr-<version>.full.wasm` // Full edition of the library (.wasm)

### Step Two: Configure the Server

* Set the MIME type for `.wasm` to `application/wasm`.

  Different servers are configured differently. Here are some popular ones:

  + NGINX: <a href="https://www.nginx.com/resources/wiki/start/topics/examples/full/#mime-types" target="_blank">mime.types</a>
  + IIS: <a href="https://github.com/dynamsoft-dbr/javascript-barcode/blob/dac614f8033661901d85381dfaff8d612115862a/documents/conf/Web.config" target="_blank">Web.config</a>
  + Java™ EE web app: <a href="https://github.com/dynamsoft-dbr/javascript-barcode/blob/dac614f8033661901d85381dfaff8d612115862a/documents/conf/web.xml" target="_blank">web.xml</a>
  + Node.js: <a href="https://github.com/broofa/node-mime" target="_blank">npm mime</a>

* Enable HTTPS

  To use the library, you must access your website / web application via a secure HTTPS connection. This is due to browser security restrictions which only grant camera video streaming access to a [secure context](https://developer.mozilla.org/en-US/docs/Web/Security/Secure_Contexts).

  > For convenience, self-signed certificates are allowed during development and testing.

## Advanced Usage

In addition to the content mentioned above, the library has many other settings and options that you can adjust to best suit your usage. To read more, please see [advanced usage](https://www.dynamsoft.com/barcode-reader/programming/javascript/user-guide/advanced-usage.html?ver=latest).

## How to Upgrade

If you are using an older version of the library and want to upgrade it to the latest version, please read more on [how to upgrade](https://www.dynamsoft.com/barcode-reader/programming/javascript/user-guide/upgrade.html?ver=latest).

## FAQ

### Can I open the web page directly from the hard drive?

Yes, for simple testing purposes, it's perfectly fine to open the file directly from the hard drive. However, you might encounter some issues in doing so (like unable to access the camera, etc.). The recommendation is to deploy this page to your web server and run it over **HTTPS**. If you don't have a ready-to-use web server but have a package manager like *npm* or *yarn*, you can set up a simple HTTP server in minutes. Check out [`http-server` on npm](https://www.npmjs.com/package/http-server) or [yarn](https://yarnpkg.com/package/http-server). 

### Why can't I use my camera?

If you open the web page as `file:///` or `http://`, the camera may not work and you see the following error in the browser console:

> [Deprecation] getUserMedia() no longer works on insecure origins. To use this feature, you should consider switching your application to a secure origin, such as HTTPS. See https://goo.gl/rStTGz for more details.

* In Safari 12 the equivalent error is:

> Trying to call getUserMedia from an insecure document.

You get this error because the API [getUserMedia](https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia) requires HTTPS to access the camera.

* If you use Chrome or Firefox, you might not get the error because these two browsers allow camera access via file:/// and http://localhost.

To make sure your web application can access the camera, please configure your web server to support HTTPS. The following links may help.

  - NGINX: [Configuring HTTPS servers](https://nginx.org/en/docs/http/configuring_https_servers.html)
  - IIS: [Create a Self Signed Certificate in IIS](https://aboutssl.org/how-to-create-a-self-signed-certificate-in-iis/)
  - Tomcat: [Setting Up SSL on Tomcat in 5 minutes](https://dzone.com/articles/setting-ssl-tomcat-5-minutes)
  - Node.js: [npm tls](https://nodejs.org/docs/v0.4.1/api/tls.html)
