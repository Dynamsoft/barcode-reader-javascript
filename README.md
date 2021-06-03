# Dynamsoft Barcode Reader for Your Website

![version](https://img.shields.io/npm/v/dynamsoft-javascript-barcode.svg)
![downloads](https://img.shields.io/npm/dm/dynamsoft-javascript-barcode.svg) 
![jsdelivr](https://img.shields.io/jsdelivr/npm/hm/dynamsoft-javascript-barcode.svg)
![](https://img.shields.io/snyk/vulnerabilities/npm/dynamsoft-javascript-barcode.svg)

[Dynamsoft Barcode Reader SDK for Web](https://www.dynamsoft.com/Products/barcode-recognition-javascript.aspx) allows robust barcode scanning from a web page using any camera-equipped device, including mobile, laptop, or tablet. Built using JavaScript and **WebAssembly**, the SDK offers real-time single or multiple barcode localization, decoding of various [barcode types](https://www.dynamsoft.com/barcode-reader/features/#Supported-Barcode-Types), and short compilation times. In addition to live video stream decoding, the library can also read barcodes from static images.

> Also see [Dynamsoft Barcode Reader for Node](https://github.com/Dynamsoft/javascript-barcode/blob/master/README.NODE.md) if you are interested in using the library for your Node.js application.

In this guide, we help you step through the process of integrating the Dynamsoft Barcode Reader into your web application. Please find the table of contents below:

- [System Requirements](#system-requirements)
- [Getting Started](#getting-started)
    - [Import the Library](#import-the-library)
    - [Assigning a License](#assigning-a-license)
    - [Specify the Engine to Use (Optional)](#specify-the-engine-to-use-optional)
    - [Hello World](#hello-world-the-code)
    - [Test It Out](#test-it-out)
    - [Barcode Reader vs Barcode Scanner](#barcode-reader-vs-barcode-scanner)
- [Configuration and Customization](#configuration-and-customization)
    - [Capture Settings](#capture-settings)
        - [Video Settings](#video-settings)
        - [Scan Settings](#scan-settings)
    - [Runtime Settings](#runtime-settings)
    - [Customizing the UI](#customizing-the-ui)
- [Upgrading to the Latest Version](#upgrading-to-the-latest-version)
- [FAQ](#faq)

Example Code:

* [Use the library in Angular](https://github.com/Dynamsoft/dbr-browser-samples/tree/master/1.hello-world/3.read-video-angular)
* [Use the library in React](https://github.com/Dynamsoft/dbr-browser-samples/tree/master/1.hello-world/4.read-video-react)
* [Use the library in Vue](https://github.com/Dynamsoft/dbr-browser-samples/tree/master/1.hello-world/5.read-video-vue)

You can also:

* [Try All Online Examples](https://dynamsoft.github.io/dbr-browser-samples/index.html)
* [Try the Official Demo](https://demo.dynamsoft.com/barcode-reader-js/)

## System Requirements

- Camera-equipped device
- Internet connection
- Supported Browser(s)
    Browser Name | Version
    :-: | :-:
    Chrome | v57+ (v59+ on Android/iOS<sup>1</sup>)
    Firefox | v52+ (v55+ on Android/iOS<sup>1</sup>)
    Edge<sup>2</sup> | v16+
    Safari<sup>3</sup> | v11+

<sup>1</sup> iOS 14.3+ is required for camera video streaming in Chrome and Firefox or Apps using webviews.

<sup>2</sup> On Edge, due to strict Same-origin policy, you must host the library files on the same domain as your web page. 

<sup>3</sup> Safari 11.2.2 ~ 11.2.6 are not supported.

The browsers listed above support the `WebAssembly`, `Blob`, `URL`/`createObjectURL`, and `Web Workers` features, which the library requires to work.

`MediaDevices`/`getUserMedia` are required for in-browser video streaming. If a browser does not support this API (e.g. Chrome/Firefox in iOS 13.x or earlier), [`singleFrameMode`](https://www.dynamsoft.com/barcode-reader/programming/javascript/api-reference/BarcodeScanner/properties.html?ver=latest#singleframemode) will be activated. `singleFrameMode` allows the user to capture singluar frames since the browser does not support a continuous video stream.

## Getting Started

Let's start by creating a simple web page that imports the library and uses the default UI.

### Import the Library

There are several ways through which you can include the library in your own application. The most popular method is to import it directly via a CDN such as `jsDelivr` or `UNPKG`. However, you can also use `npm` or `yarn` to import the library which works better in certain scenarios. Finally, you can also download the library and host it yourself should you have concerns regarding the usage of a CDN or the `npm` package.

#### Importing via CDN

First, create a `HTML` page that follows the template of any simple `HTML` file. Afterwards, import the SDK using the [jsDelivr](https://www.jsdelivr.com/) or [UNPKG](https://unpkg.com/) CDN:

```html
<script src="https://cdn.jsdelivr.net/npm/dynamsoft-javascript-barcode@8.2.5/dist/dbr.js"></script>

<!-- or -->

<script src="https://unpkg.com/dynamsoft-javascript-barcode@8.2.5/dist/dbr.js"></script>
```

#### Importing via npm or yarn

This import method is mostly used when using a framework such as React, Angular, or Vue. In order to include the library in your application using this method:
```bash
$ npm install dynamsoft-javascript-barcode

OR

$ yarn add dynamsoft-javascript-barcode
```
#### Importing the library manually and hosting it yourself
You can also choose to download the library and host the library yourself. To download the library, please use the following [link](https://www.dynamsoft.com/barcode-reader/downloads/). Hosting the library yourself involves a few more configuration steps that the other options do.

##### Step One: Deploy the dist folder
Once you have downloaded the library, copy `dist` folder from the library directory into your server (usually as part of your website / web application). Here is a quick breakdown of the files inside the `dist` folder:

- `dbr.js` // For referencing the library with a <script> tag
- `dbr.browser.mjs` // For using the library as a module (<script type="module">)
- `dbr.scanner.html` // Defines the default scanner UI
- `dbr-<version>.worker.js` // Defines the worker thread for barcode reading
- `dbr-<version>.wasm.js` // Compact edition of the library (.js)
- `dbr-<version>.wasm` // Compact edition of the library (.wasm)
- `dbr-<version>.full.wasm.js` // Full edition of the library (.js)
- `dbr-<version>.full.wasm` // Full edition of the library (.wasm)

##### Step Two: Configure the Server
Now that the `dist` folder is in the application directory on the server, it's time to configure the server to be able to host and serve the library. This involves two small steps:
1. Set the MIME type to include `application/wasm` so that `.wasm` files are supported. Different servers are configured differently, so here are some of the most popular frameworks
    - NGINX: [mime.types](https://www.nginx.com/resources/wiki/start/topics/examples/full/#mime-types)
    - IIS: [Web.config](https://github.com/dynamsoft-dbr/javascript-barcode/blob/dac614f8033661901d85381dfaff8d612115862a/documents/conf/Web.config)
    - Java™ EE web app: [web.xml](https://github.com/dynamsoft-dbr/javascript-barcode/blob/dac614f8033661901d85381dfaff8d612115862a/documents/conf/web.xml)
    - Node.js: [npm mime](https://github.com/broofa/node-mime)
2. Enable `HTTPS`: To use the library, you must access the web application via a secure `HTTPS` connection. This is due to browser security restrictions which only grant camera video streaming access to a [secure context](https://developer.mozilla.org/en-US/docs/Web/Security/Secure_Contexts). Here is how to enable HTTPS on some of the most popular server frameworks:

    - NGINX: [Configuring HTTPS servers](https://nginx.org/en/docs/http/configuring_https_servers.html)
    - IIS: [Create a Self Signed Certificate in IIS](https://aboutssl.org/how-to-create-a-self-signed-certificate-in-iis/)
    - Tomcat: [Setting Up SSL on Tomcat in 5 minutes](https://dzone.com/articles/setting-ssl-tomcat-5-minutes)
    - Node.js: [npm tls](https://nodejs.org/docs/v0.4.1/api/tls.html)

##### Step Three: Now to include the library

Finally, all you need to do is include a reference to `dbr.js` from the library directory on your server.Depending on how you downloaded the library and where you put it, the reference can look something like this:
```html
<script src="/DBR-JS-8.2.5/dist/dbr.js"></script>

OR

<script src="/node_modules/dynamsoft-javascript-barcode/dist/dbr.js"></script>
```

### Assigning a License

The library requires a license to work, so one of the first things that must be done when the page loads is to assign the license. The license is specified mainly using the properties [`organizationID`](https://www.dynamsoft.com/barcode-reader/programming/javascript/api-reference/BarcodeReader/properties.html#organizationid) and [`handshakeCode`](https://www.dynamsoft.com/barcode-reader/programming/javascript/api-reference/BarcodeReader/properties.html#handshakeCode).

#### Trial License

Starting from **v8.2.5** of the JavaScript edition, the `organizationID` can be used to specify the **trial license**. As a developer, this is what you need to do to obtain and use a trial license:
1. Log into the [customer portal trial license page](https://www.dynamsoft.com/customer/license/trialLicense). Please note your organization ID, printed at the top of the page.
2. Request a new trial license for the Dynamsoft Barcode Reader (v8.x - JavaScript edition). Afterwards you will find a new license under 'Requested Licenses'.
3. Now that a new trial license has been attached to your organization ID, all you need to do is simply specify the organization ID before creating the `BarcodeReader` or a `BarcodeScanner` instance as such:
    ```javascript
    Dynamsoft.DBR.BarcodeReader.organizationID = "123456"; // replace the number 123456 with YOUR-ORGANIZATION-ID
    ```
4. If you are experiencing any issues generating your trial license, please [contact our support team](https://www.dynamsoft.com/company/contact/) to get a trial extension.
> Note: Should the organization ID not be specified in the code, a 7-day public trial license will be used by default.

> Note: In versions earlier than v8.2.5, the trial and full licenses are both specified by the [`productKeys`](https://www.dynamsoft.com/barcode-reader/programming/javascript/api-reference/BarcodeReader/properties.html#productkeys) property insted.

#### Full License

If you have acquired a full license, please refer to this [article](https://www.dynamsoft.com/barcode-reader/license-activation/set-full-license.html?ver=latest) on how to use it.

*Note*:

  + *Network connection is required for the license to work.*
  + *If nothing is specified, a 7-day (public) trial will be used by default which is the case in the above "hello world" example.*
  + *The license is actually fetched during the creation of an `BarcodeScanner` or `BarcodeReader` object.*
  + *If a public network connection is not available, you can choose to host a license server in your private network or even get an offline license that does not require any network connection. [Contact us](https://www.dynamsoft.com/company/contact/) for more information.*

### Specify the Engine to Use (Optional)

The **engine** refers to the directory containing the library's resource files (e.g. `*.wasm`, `*.worker.js`, `*.wasm`, etc.).

The SDK comes with two engine types, `compact` and `full`. The `compact` engine is smaller and takes less time to load and compile than the `full` engine, but offers a shorter range of features than its counterpart. These features include certain advanced barcode formats and API methods. The full breakdown is here:

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

  *Note: The current file size is for version 8.2.5. The size may differ in older versions.*

**By default, the SDK uses the `compact` engine as it is sufficient for most cases**. A change in the engine is not required unless you need to include one or more of the `full` engine features listed above, making this step entirely optional. 

To control which engine the SDK uses, please define the `_bUseFullFeature` property before `createInstance` is called or the library is loaded in.
```javascript
Dynamsoft.DBR.BarcodeScanner._bUseFullFeature = true; // use the full engine
```
When using certain frameworks such as Angular or React that use the library's `npm` package, it is recommended to use our library as a component. In those cases, the engine files would not be in the same location as the main library file, `dbr.js`.

**In most cases this configuration is not required as most developers opt to use the CDN link or reference the `dbr.js` file directly**

However, if you do encounter those situations, the engine path must be explicitly defined using the [`engineResourcePath`](https://www.dynamsoft.com/barcode-reader/programming/javascript/api-reference/BarcodeReader.html#engineresourcepath) property before the library is loaded in. The following code shows how to use the jsDelivr CDN as the engine path or alternatively, the library's directory in `node_modules`.

```js
import DBR from "dynamsoft-javascript-barcode";
DBR.BarcodeScanner.engineResourcePath = "https://cdn.jsdelivr.net/npm/dynamsoft-javascript-barcode@8.2.5/dist/"; // use the jsDelivr CDN
DBR.BarcodeScanner.engineResourcePath = "/node_modules/dynamsoft-javascript-barcode/dist/"; // use the npm package in node_modules
export default DBR;
```


### Hello World - The Code

Please find the minimum code needed to get the library up and running in your web page below:

```html
<!DOCTYPE html>
<html>
<body>
    <!-- Please visit https://www.dynamsoft.com/customer/license/trialLicense to get a trial license. -->
    <script src="https://cdn.jsdelivr.net/npm/dynamsoft-javascript-barcode@8.2.5/dist/dbr.js" ></script>
    <script>
        // initializes and uses the library
        let scanner = null;
        (async()=>{
            Dynamsoft.DBR.BarcodeReader.organizationID = "123456"; // replace the number 123456 with YOUR-ORGANIZATION-ID
            scanner = await Dynamsoft.DBR.BarcodeScanner.createInstance();
            scanner.onFrameRead = results => {console.log(results);};
            scanner.onUnduplicatedRead = (txt, result) => {alert(txt);};
            await scanner.show();
        })();
    </script>
</body>
</html>
```

[Test in JSFiddle](https://jsfiddle.net/DynamsoftTeam/pL4e7yrd/)

[Test in Github Pages](https://dynamsoft.github.io/dbr-browser-samples/1.hello-world/1.minimum-code.html)

`createInstance`: This method instantiates a `BarcodeReader` object or a `BarcodeScanner` object, depending on the scenario. For details on the difference between the two classes, please refer to the [BarcodeReader vs BarcodeScanner section](#barcode-reader-vs-barcode-scanner)

`onFrameRead`: This event is triggered after each single frame is scanned. The `results` object contains all the barcode results that the library found on this frame. In the above code, the results found in every frame are printed to the console. 

`onUnduplicatedRead`: This event is triggered when a new barcode (not a duplicate) is found. `txt` holds the barcode text value while `result` is an object that holds details of the found barcode. In this example, an alert will be displayed for each unique barcode found.

`show`: Displays the UI of the `BarcodeScanner` object and starts the scanning process.

### Test It Out

Open the HTML page in your browser and you should see a pop-up asking for permission to access the camera. Once camera access is granted, the video stream will start in the default UI of the **BarcodeScanner** object.

**Note**: If you don't see the pop-up, wait a few seconds for the library to finish compiling.   

Place a barcode in front of the camera once it opens up. Once the barcode is detected, you will see an alert with the text result. In addition, the located barcode will be highlighted via the default UI of the scanner.

Please be aware of the [potential issues](#faq) you might encounter when you open the web page you just created for the first time.

### Barcode Reader vs Barcode Scanner

DBR JavaScript comes with two main classes:
1. [`BarcodeReader`](https://www.dynamsoft.com/barcode-reader/programming/javascript/api-reference/BarcodeReader/) is used when image decoding. If your typical use case does not involve an interactive video scenario (decoding barcodes directly from a video stream) but rather, just images, then going with the `BarcodeReader` class is recommended.
    ```
    reader = await Dynamsoft.DBR.BarcodeReader.createInstance();
    ```
2. [`BarcodeScanner`](https://www.dynamsoft.com/barcode-reader/programming/javascript/api-reference/BarcodeScanner/) is the opposite, and should be used in the aforementioned interactive video scenarios. Therefore, this class comes with API addressing camera control and video settings which are not available in the other class.
    ```
    scanner = await Dynamsoft.DBR.BarcodeScanner.createInstance();
    ```

## Configuration and Customization 
The SDK comes with a variety of settings to help optimize the performance of the `BarcodeReader` or the `BarcodeScanner`, depending on your use. The settings are divided into two main categories, Capture Settings and Runtime Settings, with the latter being its own class `RuntimeSettings`.  The capture settings will mainly deal with two classes, `VideoSettings` and `ScanSettings`. The following section will break down each of these settings and how to use them.

### Capture Settings

This first section will look into the capture settings of the `BarcodeScanner` class. These settings are used to control the video media constraints and some of the more niche video scanner settings. Please note that these settings are not applicable to the `BarcodeReader` class.

#### Video Settings
The video settings are directly inherited from the [MediaStreamConstraints](https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia) dictionary used by `getUserMedia`. Please note that we will only use the `video` track constraint when it comes to DBR JavaScript.

To update these `MediaStreamConstraints` settings such as video width, video height, frame rate, or choosing which camera to use (in case a device is equipped with multiple cameras), the [updateVideoSettings](https://www.dynamsoft.com/barcode-reader/programming/javascript/api-reference/BarcodeScanner/methods/capture-settings.html?ver=latest#updatevideosettings) method can be used.

To retrieve the current video settings, you can use the [getVideoSettings](https://www.dynamsoft.com/barcode-reader/programming/javascript/api-reference/BarcodeScanner/methods/capture-settings.html?ver=latest#getvideosettings) method. Please note that `updateVideoSettings` and `getVideoSettings` are only applicable to the `BarcodeScanner` class.

The library offers several methods that allow you to set some of the video settings directly rather than through the `updateVideoSettings` method. Here is a quick breakdown:
- `setResolution`: Sets the current video resolution
- `setFrameRate`: Sets the current video frame rate
- `setColorTemperature`: Adjusts the video color temperature
- `setExposureCompensation`: Adjusts the exposure level of the video
- `setZoom`: Zoom in or out of the video stream
- `turnOnTorch`/`turnOffTorch`: Some cameras come equipped with a flash, like most phone cameras nowadays. These two methods allow the user to control the flash/torch camera feature from within the browser.

#### Scan Settings
The capture settings also include settings related to the video scanner behaviour, called the `ScanSettings`. To retrieve the current scan settings, you can use the [getScanSettings](https://www.dynamsoft.com/barcode-reader/programming/javascript/api-reference/BarcodeScanner/methods/capture-settings.html#getscansettings).

The `ScanSettings` class lets the users control more niche things related to the scanner specifically. For instance, `duplicateForgetTime` specifies the time that the library remembers a found barcode, therefore allowing the library to ignore any duplicate results within the specified time period. This setting is very handy in situations where the user is scanning multiple barcodes on the same video frame.

The other members of `ScanSettings` are:
- `frameFilter`: Filters and discards video frames that are out of focus
- `intervalTime`: The duration of the scan interval to allow the library to release the CPU periodically.

### Runtime Settings
The `RuntimeSettings` interface is common to both the `BarcodeReader` and the `BarcodeScanner` classes. These settings are concerned more with the operation of the barcode decoding process itself, whether it has to do with localization, binarization, or any of the other various steps involved.

DBR JavScript comes with a few pre-built runtime settings templates that you can use depending on the scenario. There are currently 4 pre-built templates: `single`, `speed`, `balance`, and `coverage`.

- `single`: The **default** template used. This mode has been optimized to read a single barcode at a time very quickly.
- `speed`: This mode prioritizes speed over coverage when scanning a frame or image, and is recommended when decoding from a video stream. However, please note that this mode is slower than `single` if scanning a single barcode at a time.
- `coverage`: Vice-versa of the `speed` mode. This mode is recommended when there are multiple barcodes per frame or image and you want to ensure that the library consistently locates them all, despite taking a longer time to do so.
- `balance`: As the name suggests, this mode finds a balance between the two extremes of `speed` and `coverage`. If you find that the `speed` mode is missing barcodes, but the `coverage` mode is able to locate them all but the time cost is too high, then `balance` mode can find a good point in the middle.

The `RuntimeSettings` interface controls a lot of aspects of the library, such as choosing which barcode formats to detect or defining a specific region of an image or video stream to read barcodes from, among many others.

In fact, to best learn about all of the runtime settings and which scenarios call for which settings, it is best to refer to our [RuntimeSettings Parameters](https://www.dynamsoft.com/barcode-reader/parameters/) page. 

However, please note that not all of the parameters of `RuntimeSettings` are applicable to both core classes of DBR JavaScript. To learn which specifically apply to the JavaScript edition, please refer to this [page](https://www.dynamsoft.com/barcode-reader/programming/javascript/api-reference/global-interfaces.html#runtimesettings).

### Customizing the UI
The `BarcodeScanner` class of the JavaScript edition comes with its own default UI. This default UI, defined in `dbr.scanner.html` of the library files, comes with 3 core components:
- **Video Viewer**: This is the main component of the UI that displays the video stream from the camera, mobile or desktop. This viewer also comes with a canvas component that highlights any detected barcodes by default. This viewer, 
- **Source Select Dropdown**: This second component is used to select which camera to use should there be mutiple cameras available. By default, this dropdown auto-populates with all the available cameras to choose from.
- **Resolution Select Dropdown**: The last component is used to select the video resolution. Please note that your camera may not support all of the resolutions listed in the dropdown, especially the higher ones. To learn about your camera's capabilities and whether a certain resolution is supported, you can use the `getCapabilities` method after selecting the camera in question.

The SDK does, however, give you the ability to customize the UI to fit your application. In fact, there are 3 ways in which you can do this:

1. Modifying the `dbr.scanner.html` file directly can allow you to customize the default UI elements for any scanner instance that is created.

2. If you do not feel comfortable modifying the `dbr.scanner.html` file directly, you can copy it and modify the duplicate instead. Then, specify the modified file as the main UI file using the `defaultUIElementURL` property of the `BarcodeScanner` class as such: `Dynamsoft.DBR.BarcodeScanner.defaultUIElementURL = url` where `url` is the URL/path to the new file.

3. Build the UI as its own HTML element in the webpage. In order to do this, the HTML Element must either (1) be a `video` element with the `dbrScanner-video` class or (2) contain a `video` element with the `dbrScanner-video` class. Then, once the element is created, tell the SDK to use it via the `setUIElement` method as such:
    ```html
    <body>
        <div id="div-video-container">
            <video class="dbrScanner-video" playsinline="true"></video>
        </div>
        <script src="https://cdn.jsdelivr.net/npm/dynamsoft-javascript-barcode@8.2.5/dist/dbr.js"></script>
        <script>
            let scanner = null;
            (async()=>{
                Dynamsoft.DBR.BarcodeReader.organizationID = "123456"; // replace the number 123456 with YOUR-ORGANIZATION-ID
                scanner = await Dynamsoft.DBR.BarcodeScanner.createInstance();
                await scanner.setUIElement(document.getElementById('div-video-container'));
                scanner.onFrameRead = results => {console.log(results);};
                scanner.onUnduplicatedRead = (txt, result) => {alert(txt);};
                await scanner.show();
            })();
        </script>
    </body>
    ```
    > Please note that if the element does not exist once the `setUIElement` method is called, an error will be thrown. Therefore, the element must be declared manually in the HTML code, or created programatically via JavaScript. 

In the above example, we only included the video viewer component in the custom UI element `div-video-container`. What if we also wanted to include the source select dropdown or the resolution select dropdown elements? In that case, you would need to manually include the `select` elements and assign each the appropriate class:
```html
<video class="dbrScanner-video" playsinline="true"></video> <!-- Video Viewer component -->
<select class="dbrScanner-sel-camera"></select> <!-- Source/Camera Select component -->
<select class="dbrScanner-sel-resolution"></select> <!-- Resolution Select component -->
```

It is necessary to assign the correct class to the `select` dropdown elements so that the SDK will know to automatically populate them with the available options. 

The `dbrScanner-sel-camera` dropdown populates with the available camera sources.

The `dbrScanner-sel-resolution` dropdown populates with 8 resolution options by default. However, not all cameras out there support all of the resolution options, so you must check if the selected camera supports the resolution that you are trying to set it to. In case a camera does not support a certain resolution, the SDK will automatically choose the closest supported resolution less than the desired resolution.

You can also limit the number of resolution options if you believe that having all 8 options could be a little overwhelming and unnecessary for your users. To do so, manually define the options that you want to include. The currently used resolution can be displayed as a separate option, as long as it has the class `dbrScanner-opt-gotResolution`.

The following demonstrates putting all of these elements together, including limiting the number of resolution options:
```html
<body>
    <div id="div-video-container">
        <select class="dbrScanner-sel-camera"></select>
        <select class="dbrScanner-sel-resolution">
            <option class="dbrScanner-opt-gotResolution" value="got"></option>
            <option data-width="1920" data-height="1080">1920 x 1080</option>
            <option data-width="1280" data-height="720">1280 x 720</option>
            <option data-width="640" data-height="480">640 x 480</option>
        </select><br>
        <video class="dbrScanner-video" playsinline="true"></video>
    </div>
    <script src="https://cdn.jsdelivr.net/npm/dynamsoft-javascript-barcode@8.2.5/dist/dbr.js"></script>
    <script>
        let scanner = null;
        (async()=>{
            Dynamsoft.DBR.BarcodeReader.organizationID = "123456"; // replace the number 123456 with YOUR-ORGANIZATION-ID
            scanner = await Dynamsoft.DBR.BarcodeScanner.createInstance();
            await scanner.setUIElement(document.getElementById('div-video-container'));
            scanner.onFrameRead = results => {console.log(results);};
            scanner.onUnduplicatedRead = (txt, result) => {alert(txt);};
            await scanner.show();
        })();
    </script>
</body>
```

## Upgrading to the Latest Version

If you are using an older version of the library and want to upgrade to the latest version, please refer to the [upgrade article](https://www.dynamsoft.com/barcode-reader/programming/javascript/user-guide/upgrade.html?ver=latest).

## FAQ

#### Why can't I use my camera when I open the web page?

If you open the HTML file as `file:///` or `http://`, the following error may appear in the browser console:

> [Deprecation] getUserMedia() no longer works on insecure origins. To use this feature, you should consider switching your application to a secure origin, such as HTTPS. See https://goo.gl/rStTGz for more details.

In Safari 12 the equivalent error is:

> Trying to call getUserMedia from an insecure document.

To access the camera with the API [getUserMedia](https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia), HTTPS is required.

**Note**: If you use Chrome or Firefox, you might not get the error because these two browsers allow camera access via `file:///` and `http://localhost`.

To make sure your web application can access the camera and resolve this error, please deploy the page to a web server configure your web server to support HTTPS. The following links may help depending on the server framework:

- NGINX: [Configuring HTTPS servers](https://nginx.org/en/docs/http/configuring_https_servers.html)
- IIS: [Create a Self Signed Certificate in IIS](https://aboutssl.org/how-to-create-a-self-signed-certificate-in-iis/)
- Tomcat: [Setting Up SSL on Tomcat in 5 minutes](https://dzone.com/articles/setting-ssl-tomcat-5-minutes)
- Node.js: [npm tls](https://nodejs.org/docs/v0.4.1/api/tls.html)


#### Can I use a self-signed cerificate when configuring HTTPS for my server?

For testing purposes, a self-signed certificate can be used when configuring HTTPS. When accessing the site using this certificate, the browser might say "the site is not secure". In this case, go to the certificate settings and set to trust this certificate.

In a production environment, you will need a valid HTTPS certificate.

#### What are the exact differences between the different built-in modes?

In the customization and configuration section of the guide, we introduced the runtime settings and the corresponding built-in templates, `single`, `speed`, `coverage`, and `balance`.

We went over the different scenarios that each mode correspond to, without going into specific details on how each mode affects the individual runtime settings. If you are wondering what those exact differences are, here is a breakdown:

|        Runtime Setting       |            speed           |           balance          |           coverage          |          single          |
|:----------------------------:|:--------------------------:|:--------------------------:|:---------------------------:|:-------------------------:|
|          deblurLevel         |               3            |               5            |               9             |             9             |
|      barcodeFormatIds      |           32505858         |           32505858         |            32505858         |             0             |
|     expectedBarcodesCount    |              512           |              512           |              512            |             0             |
| grayscaleTransformationModes |  [2, 0, 0, 0, 0, 0, 0, 0]  |  [2, 0, 0, 0, 0, 0, 0, 0]  |   [2, 1, 0, 0, 0, 0, 0, 0]  |  [2, 0, 0, 0, 0, 0, 0, 0] |
|        textFilterModes       |  [0, 0, 0, 0, 0, 0, 0, 0]  |  [2, 0, 0, 0, 0, 0, 0, 0]  |   [2, 0, 0, 0, 0, 0, 0, 0]  |  [2, 0, 0, 0, 0, 0, 0, 0] |
|       localizationModes      | [2, 32, 64, 0, 0, 0, 0, 0] | [2, 4, 32, 64, 0, 0, 0, 0] | [2, 16, 4, 8, 32, 64, 0, 0] | [2, 16, 4, 8, 0, 0, 0, 0] |
|      scaleDownThreshold      |            2300            |            2300            |          214748347          |            2300           |

## Support

If you encounter any issues or have any issues regarding the library, please feel free to [contact us](https://www.dynamsoft.com/company/contact/).