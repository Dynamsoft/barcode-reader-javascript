# Barcode Reader for Your Website - User Guide

[Dynamsoft Barcode Reader JavaScript Edition](https://www.dynamsoft.com/barcode-reader/sdk-javascript/){:target="_blank"} (DBR-JS) is equipped with industry-leading algorithms for exceptional speed, accuracy and read rates in barcode reading. Using its well-designed API, you can turn your web page into a barcode scanner with just a few lines of code.

![version](https://img.shields.io/npm/v/dynamsoft-barcode-reader.svg)
![downloads](https://img.shields.io/npm/dm/dynamsoft-barcode-reader.svg)
![jsdelivr](https://img.shields.io/jsdelivr/npm/hm/dynamsoft-barcode-reader.svg)
![vulnerabilities](https://img.shields.io/snyk/vulnerabilities/npm/dynamsoft-barcode-reader.svg)

Once the DBR-JS SDK gets integrated into your web page, your users can access a camera via the browser and read barcodes directly from its video input.

In this guide, you will learn step by step on how to integrate the DBR-JS SDK into your website.

<span style="font-size:20px">Table of Contents</span>

- [Barcode Reader for Your Website - User Guide](#barcode-reader-for-your-website---user-guide)
  - [Hello World - Simplest Implementation](#hello-world---simplest-implementation)
    - [Understand the code](#understand-the-code)
      - [About the code](#about-the-code)
    - [Run the example](#run-the-example)
  - [Building your own page](#building-your-own-page)
    - [Include the SDK](#include-the-sdk)
      - [Use a public CDN](#use-a-public-cdn)
      - [Host the SDK yourself](#host-the-sdk-yourself)
    - [Prepare the SDK](#prepare-the-sdk)
      - [Specify the license](#specify-the-license)
      - [Specify the location of the "engine" files (optional)](#specify-the-location-of-the-engine-files-optional)
    - [Set up and start image processing](#set-up-and-start-image-processing)
      - [Preload the module](#preload-the-module)
      - [Create a CaptureVisionRouter object](#create-a-capturevisionrouter-object)
      - [Connect an image source](#connect-an-image-source)
      - [Register a result receiver](#register-a-result-receiver)
      - [Start the process](#start-the-process)
    - [Customize the process](#customize-the-process)
      - [Adjust the preset template settings](#adjust-the-preset-template-settings)
        - [Change barcode settings](#change-barcode-settings)
        - [Retrieve the original image](#retrieve-the-original-image)
        - [Change reading frequency to save power](#change-reading-frequency-to-save-power)
        - [Specify a scan region](#specify-a-scan-region)
      - [Edit the preset templates directly](#edit-the-preset-templates-directly)
      - [Filter the results (Important)](#filter-the-results-important)
        - [Option 1: Verify results across multiple frames](#option-1-verify-results-across-multiple-frames)
        - [Option 2: Eliminate redundant results detected within a short time frame](#option-2-eliminate-redundant-results-detected-within-a-short-time-frame)
      - [Add feedback](#add-feedback)
    - [Customize the UI](#customize-the-ui)
  - [API Documentation](#api-documentation)
  - [System Requirements](#system-requirements)
  - [How to Upgrade](#how-to-upgrade)
  - [Release Notes](#release-notes)
  - [Next Steps](#next-steps)

**Popular Examples**

<!--TODO: update the sample links-->
- Hello World - [Github](https://github.com/Dynamsoft/barcode-reader-javascript-samples/blob/v10.0.20/hello-world/hello-world.html) \| [Run](https://demo.dynamsoft.com/Samples/DBR/JS/hello-world/hello-world.html?ver=10.0.20&utm_source=github)
- Angular App - [Github](https://github.com/Dynamsoft/barcode-reader-javascript-samples/blob/v10.0.20/hello-world/angular) \| [Run](https://demo.dynamsoft.com/Samples/DBR/JS/hello-world/angular/dist/hello-world/?ver=10.0.20&utm_source=github)
- React App - [Github](https://github.com/Dynamsoft/barcode-reader-javascript-samples/blob/v10.0.20/hello-world/react) \| [Run](https://demo.dynamsoft.com/Samples/DBR/JS/hello-world/react/build/?ver=10.0.20&utm_source=github)
- Vue App - [Github](https://github.com/Dynamsoft/barcode-reader-javascript-samples/blob/v10.0.20/hello-world/vue) \| [Run](https://demo.dynamsoft.com/Samples/DBR/JS/hello-world/vue/dist/?ver=10.0.20&utm_source=github)
- PWA App - [Github](https://github.com/Dynamsoft/barcode-reader-javascript-samples/blob/v10.0.20/hello-world/pwa) \| [Run](https://demo.dynamsoft.com/Samples/DBR/JS/hello-world/pwa/helloworld-pwa.html?ver=10.0.20&utm_source=github)
- WebView in Android and iOS - [Github](https://github.com/Dynamsoft/barcode-reader-javascript-samples/tree/v10.0.20/hello-world/webview)
- Read Driver Licenses - [Github](https://github.com/Dynamsoft/barcode-reader-javascript-samples/blob/v10.0.20/use-case/read-a-drivers-license.html) \| [Run](https://demo.dynamsoft.com/samples/dbr/js/use-case/read-a-drivers-license.html?ver=10.0.20&utm_source=github)
- Fill A Form - [Github](https://github.com/Dynamsoft/barcode-reader-javascript-samples/blob/v10.0.20/use-case/fill-a-form-with-barcode-reading.html) \| [Run](https://demo.dynamsoft.com/samples/dbr/js/use-case/fill-a-form-with-barcode-reading.html?ver=10.0.20&utm_source=github)
- Show result information on the video - [Github](https://github.com/Dynamsoft/barcode-reader-javascript-samples/blob/v10.0.20/use-case/show-result-texts-on-the-video.html) \| [Run](https://demo.dynamsoft.com/Samples/DBR/JS/use-case/show-result-texts-on-the-video.html?ver=10.0.20&utm_source=github)
- Debug Camera and Collect Video Frame - [Github](https://github.com/Dynamsoft/barcode-reader-javascript-samples/blob/v10.0.20/others/debug)

You can also:

- Try the Official Demo - [Run](https://demo.dynamsoft.com/barcode-reader-js/?ver=10.0.20&utm_source=github) \| [Github](https://github.com/Dynamsoft/barcode-reader-javascript-demo/)
- Try Online Examples - [Run](https://demo.dynamsoft.com/Samples/DBR/JS/index.html?ver=10.0.20&utm_source=github) \| [Github](https://github.com/Dynamsoft/barcode-reader-javascript-samples/tree/v10.0.20/)

## Hello World - Simplest Implementation

Let's start with the "Hello World" example of the DBR-JS SDK which demonstrates how to use the minimum code to enable a web page to read barcodes from a live video stream.  

**Basic Requirements**
  - Internet connection
  - [A supported browser](#system-requirements)
  - Camera access

### Understand the code

The complete code of the "Hello World" example is shown below

```html
<!DOCTYPE html>
<html>
<body>
<script src="https://cdn.jsdelivr.net/npm/dynamsoft-core@3.0.32/dist/core.js"></script>
<script src="https://cdn.jsdelivr.net/npm/dynamsoft-license@3.0.20/dist/license.js"></script>
<script src="https://cdn.jsdelivr.net/npm/dynamsoft-utility@1.0.21/dist/utility.js"></script>
<script src="https://cdn.jsdelivr.net/npm/dynamsoft-barcode-reader@10.0.20/dist/dbr.js"></script>
<script src="https://cdn.jsdelivr.net/npm/dynamsoft-capture-vision-router@2.0.31/dist/cvr.js"></script>
<script src="https://cdn.jsdelivr.net/npm/dynamsoft-camera-enhancer@4.0.1/dist/dce.js"></script>
<div id="cameraViewContainer" style="width: 100%; height: 60vh"></div>
<textarea id="results" style="width: 100%; min-height: 10vh; font-size: 3vmin; overflow: auto" disabled></textarea>
<script>
  Dynamsoft.License.LicenseManager.initLicense("DLS2eyJvcmdhbml6YXRpb25JRCI6IjIwMDAwMSJ9");
  (async () => {
    let router = await Dynamsoft.CVR.CaptureVisionRouter.createInstance();

    let view = await Dynamsoft.DCE.CameraView.createInstance();
    let cameraEnhancer = await Dynamsoft.DCE.CameraEnhancer.createInstance(view);
    document.querySelector("#cameraViewContainer").append(view.getUIElement());
    router.setInput(cameraEnhancer);

    const resultsContainer = document.querySelector("#results");
    router.addResultReceiver({ onDecodedBarcodesReceived: (result) => {
      if (result.barcodeResultItems.length > 0) {
        resultsContainer.textContent = '';
        for (let item of result.barcodeResultItems) {
          resultsContainer.textContent += `${item.formatString}: ${item.text}\n\n`;
        }
      }
    }});

    let filter = new Dynamsoft.Utility.MultiFrameResultCrossFilter();
    filter.enableResultCrossVerification(
      Dynamsoft.Core.EnumCapturedResultItemType.CRIT_BARCODE, true
    );
    filter.enableResultDeduplication(
      Dynamsoft.Core.EnumCapturedResultItemType.CRIT_BARCODE, true
    );
    await router.addResultFilter(filter);

    await cameraEnhancer.open();
    await router.startCapturing("ReadSingleBarcode");
  })();
</script>
</body>
</html>
```

<!--TOM: Update the code links-->

<p align="center" style="text-align:center; white-space: normal; ">
  <a target="_blank" href="https://github.com/Dynamsoft/barcode-reader-javascript-samples/blob/v10.0.20/hello-world/hello-world.html" title="Code in Github" style="text-decoration:none;">
    <img src="https://cdn.jsdelivr.net/npm/simple-icons@3.0.1/icons/github.svg" alt="Code in Github" width="20" height="20" style="width:20px;height:20px;">
  </a>
  &nbsp;
  <a target="_blank" href="https://jsfiddle.net/DynamsoftTeam/csm2f9wb/" title="Run via JSFiddle" style="text-decoration:none;">
    <img src="https://cdn.jsdelivr.net/npm/simple-icons@3.0.1/icons/jsfiddle.svg" alt="Run via JSFiddle" width="20" height="20" style="width:20px;height:20px;" >
  </a>
  &nbsp;
  <a target="_blank" href="https://demo.dynamsoft.com/Samples/DBR/JS/hello-world/hello-world.html?ver=10.0.20&utm_source=github" title="Run in Dynamsoft" style="text-decoration:none;">
    <img src="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.0.0/svgs/solid/circle-play.svg" alt="Run in Dynamsoft" width="20" height="20" style="width:20px;height:20px;">
  </a>
</p>

-----

#### About the code

- `Dynamsoft.License.LicenseManager.initLicense()`: This method initializes the license for using the SDK in the application. Note that the string "**DLS2eyJvcmdhbml6YXRpb25JRCI6IjIwMDAwMSJ9**" used in this example points to an online license that requires a network connection to work. Read more on [Specify the license](#specify-the-license).

- `Dynamsoft.CVR.CaptureVisionRouter.createInstance()`: This method creates a `CaptureVisionRouter` object `router` which controls the entire process in three steps:
  - **Retrieve Images from the Image Source**
    - `router` connects to the image source through the [ImageSourceAdapter](https://www.dynamsoft.com/capture-vision/docs/core/architecture/input.html#image-source-adapter?lang=js){:target="_blank"} interface with the method `setInput()`.
      ```js
      router.setInput(cameraEnhancer);
      ```
    > The image source in our case is a [CameraEnhancer](https://www.dynamsoft.com/camera-enhancer/docs/web/programming/javascript/user-guide/index.html) object created with `Dynamsoft.DCE.CameraEnhancer.createInstance(view)`
  - **Coordinate Image-Processing Tasks**
    - The coordination happens behind the scenes. `router` starts the process by specifying a preset template "ReadSingleBarcode" in the method `startCapturing()`.
      ```js
      router.startCapturing("ReadSingleBarcode");
      ```
  - **Dispatch Results to Listening Objects**
    - The processing results are returned through the [CapturedResultReceiver](https://www.dynamsoft.com/capture-vision/docs/core/architecture/output.html#captured-result-receiver?lang=js){:target="_blank"} interface. The `CapturedResultReceiver` object `resultReceiver` is registered to `router` via the method `addResultReceiver()`.
      ```js
      router.addResultReceiver(resultReceiver);
      ```
    - Also note that reading from video is extremely fast and there could be many duplicate results. We can use a [filter](#filter-the-results-important) with result deduplication enabled to filter out the duplicate results. The object is registered to `router` via the method `addResultFilter()`.
      ```js
      router.addResultFilter(filter);
      ```

> Read more on [Capture Vision Router](https://www.dynamsoft.com/capture-vision/docs/core/architecture/#capture-vision-router){:target="_blank"}.

### Run the example

<!--TODO: change links-->

You can run the example deployed to [the Dynamsoft Demo Server](https://demo.dynamsoft.com/Samples/DBR/JS/hello-world/hello-world.html?ver=10.0.20&utm_source=github) or test it with [JSFiddle code editor](https://jsfiddle.net/DynamsoftTeam/pL4e7yrd/){:target="_blank"}. 
{:target="_blank"} 
You will be asked to allow access to your camera, after which the video will be displayed on the page. After that, you can point the camera at a barcode to read it.

When a barcode is decoded, you will see the result text pop up and the barcode location will be highlighted in the video feed.

Alternatively, you can test locally by copying and pasting the code shown above into a local file (e.g. "hello-world.html") and opening it in your browser.

*Note*:

If you open the web page as `file:///` or `http://` , the camera may not work correctly because the [MediaDevices: getUserMedia()](https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia){:target="_blank"} method only works in secure contexts (HTTPS), in some or all supporting browsers.

To make sure your web application can access the camera, please configure your web server to support HTTPS. The following links may help.

1. NGINX: [Configuring HTTPS servers](https://nginx.org/en/docs/http/configuring_https_servers.html){:target="_blank"}
2. IIS: [How to create a Self Signed Certificate in IIS](https://aboutssl.org/how-to-create-a-self-signed-certificate-in-iis/){:target="_blank"}
3. Tomcat: [Setting Up SSL on Tomcat in 5 minutes](https://dzone.com/articles/setting-ssl-tomcat-5-minutes){:target="_blank"}
4. Node.js: [npm tls](https://nodejs.org/docs/v0.4.1/api/tls.html){:target="_blank"}

If the test doesn't go as expected, you can [contact us](https://www.dynamsoft.com/company/contact/?ver=10.0.20&utm_source=github&product=dbr&package=js){:target="_blank"}.

## Building your own page

### Include the SDK

To utilize the SDK, the initial step involves including the corresponding resource files:

* `core.js` encompasses common classes, interfaces, and enumerations that are shared across all Dynamsoft SDKs.
* `license.js` introduces the `LicenseManager` class, which manages the licensing for all Dynamsoft SDKs.
* `utility.js` encompasses auxiliary classes that are shared among all Dynamsoft SDKs.
* `dbr.js` defines interfaces and enumerations specifically tailored to the barcode reader module.
* `cvr.js` introduces the `CaptureVisionRouter` class, which governs the entire image processing workflow.
* `dce.js` comprises classes that offer camera support and basic user interface functionalities.

#### Use a public CDN

The simplest way to include the SDK is to use either the [jsDelivr](https://jsdelivr.com/) or [UNPKG](https://unpkg.com/) CDN. The "hello world" example above uses **jsDelivr**.

- jsDelivr

  ```html
  <script src="https://cdn.jsdelivr.net/npm/dynamsoft-core@3.0.32/dist/core.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/dynamsoft-license@3.0.20/dist/license.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/dynamsoft-utility@1.0.21/dist/utility.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/dynamsoft-barcode-reader@10.0.20/dist/dbr.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/dynamsoft-capture-vision-router@2.0.31/dist/cvr.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/dynamsoft-camera-enhancer@4.0.1/dist/dce.js"></script>
  ```

- UNPKG  

  ```html
  <script src="https://unpkg.com/dynamsoft-core@3.0.32/dist/core.js"></script>
  <script src="https://unpkg.com/dynamsoft-license@3.0.20/dist/license.js"></script>
  <script src="https://unpkg.com/dynamsoft-utility@1.0.21/dist/utility.js"></script>
  <script src="https://unpkg.com/dynamsoft-barcode-reader@10.0.20/dist/dbr.js"></script>
  <script src="https://unpkg.com/dynamsoft-capture-vision-router@2.0.31/dist/cvr.js"></script>
  <script src="https://unpkg.com/dynamsoft-camera-enhancer@4.0.1/dist/dce.js"></script>
  ```

In some rare cases (such as some restricted areas), you might not be able to access the CDN. If this happens, you can use the following files for the test.

- https://download2.dynamsoft.com/packages/dynamsoft-core@3.0.32/dist/core.js
- https://download2.dynamsoft.com/packages/dynamsoft-license@3.0.20/dist/license.js
- https://download2.dynamsoft.com/packages/dynamsoft-utility@1.0.21/dist/utility.js
- https://download2.dynamsoft.com/packages/dynamsoft-barcode-reader@10.0.20/dist/dbr.js
- https://download2.dynamsoft.com/packages/dynamsoft-capture-vision-router@2.0.31/dist/cvr.js
- https://download2.dynamsoft.com/packages/dynamsoft-camera-enhancer@4.0.1/dist/dce.js

However, please **DO NOT** use `download2.dynamsoft.com` resources in a production application as they are for temporary testing purposes only. Instead, you can try hosting the SDK yourself.

#### Host the SDK yourself

Besides using the public CDN, you can also download the SDK and host its files on your own server or a commercial CDN before including it in your application.

Options to download the SDK:

- From the website

  [Download Dynamsoft Barcode Reader JavaScript Package](https://www.dynamsoft.com/barcode-reader/downloads/?ver=10.0.20&utm_source=github&product=dbr&package=js){:target="_blank"}

- yarn

  ```cmd
  yarn add dynamsoft-core@3.0.32 --save
  yarn add dynamsoft-license@3.0.20 --save
  yarn add dynamsoft-utility@1.0.21 --save
  yarn add dynamsoft-barcode-reader@10.0.20 --save
  yarn add dynamsoft-capture-vision-router@2.0.31 --save
  yarn add dynamsoft-camera-enhancer@4.0.1 --save
  yarn add dynamsoft-capture-vision-std@1.0.0 --save
  yarn add dynamsoft-image-processing@2.0.30 --save
  ```

- npm

  ```cmd
  npm install dynamsoft-core@3.0.32 --save
  npm install dynamsoft-license@3.0.20 --save
  npm install dynamsoft-utility@1.0.21 --save
  npm install dynamsoft-barcode-reader@10.0.20 --save
  npm install dynamsoft-capture-vision-router@2.0.31 --save
  npm install dynamsoft-camera-enhancer@4.0.1 --save
  npm install dynamsoft-capture-vision-std@1.0.0 --save
  npm install dynamsoft-image-processing@2.0.30 --save
  ```

Depending on how you downloaded the SDK and how you intend to use it, you can typically include it like this:

```html
<script src="./dynamsoft/distributables/dynamsoft-core@3.0.32/dist/core.js"></script>
<script src="./dynamsoft/distributables/dynamsoft-license@3.0.20/dist/license.js"></script>
<script src="./dynamsoft/distributables/dynamsoft-utility@1.0.21/dist/utility.js"></script>
<script src="./dynamsoft/distributables/dynamsoft-barcode-reader@10.0.20/dist/dbr.js"></script>
<script src="./dynamsoft/distributables/dynamsoft-capture-vision-router@2.0.31/dist/cvr.js"></script>
<script src="./dynamsoft/distributables/dynamsoft-camera-enhancer@4.0.1/dist/dce.js"></script>
```

or

```html
<script src="/node_modules/dynamsoft-core/dist/core.js"></script>
<script src="/node_modules/dynamsoft-license/dist/license.js"></script>
<script src="/node_modules/dynamsoft-utility/dist/utility.js"></script>
<script src="/node_modules/dynamsoft-barcode-reader/dist/dbr.js"></script>
<script src="/node_modules/dynamsoft-capture-vision-router/dist/cvr.js"></script>
<script src="/node_modules/dynamsoft-camera-enhancer/dist/dce.js"></script>
```

or

```typescript
import { EnumCapturedResultItemType, type DSImageData } from "dynamsoft-core";
import { LicenseManager } from "dynamsoft-license";
import { type BarcodeResultItem } from "dynamsoft-barcode-reader";
import { CapturedResultReceiver, CaptureVisionRouter, type SimplifiedCaptureVisionSettings } from "dynamsoft-capture-vision-router";
import { CameraEnhancer, CameraView } from "dynamsoft-camera-enhancer";
```

*Note*:

* Certain legacy web application servers may lack support for the `application/wasm` mimetype for .wasm files. To address this, you have two options:
  1. Upgrade your web application server to one that supports the `application/wasm` mimetype.
  2. Manually define the mimetype on your server. You can refer to the following resources for guidance:
     1. [Apache](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Apache_Configuration_htaccess#media_types_and_character_encodings){:target="_blank"}
     2. [IIS](https://docs.microsoft.com/en-us/iis/configuration/system.webserver/staticcontent/mimemap){:target="_blank"}
     3. [Nginx](https://www.nginx.com/resources/wiki/start/topics/examples/full/#mime-types){:target="_blank"}

* To work properly, the SDK requires a few engine files, which are relatively large and may take quite a few seconds to download. We recommend that you set a longer cache time for these engine files, to maximize the performance of your web application.

  ```cmd
  Cache-Control: max-age=31536000
  ```

  Reference: [Cache-Control](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control){:target="_blank"}.

### Prepare the SDK

Before using the SDK, you need to configure a few things.

#### Specify the license

To enable the SDK's functionality, you must provide a valid license. Utilize the API function initLicense to set your license key.

```javascript
Dynamsoft.License.LicenseManager.initLicense("DLS2eyJvcmdhbml6YXRpb25JRCI6IjIwMDAwMSJ9");
```

As previously stated, the key "DLS2eyJvcmdhbml6YXRpb25JRCI6IjIwMDAwMSJ9" serves as a test license valid for 24 hours, applicable to any newly authorized browser. To test the SDK further, you can request a 30-day free trial license via the [customer portal](https://www.dynamsoft.com/customer/license/trialLicense?ver=10.0.20&utm_source=github&product=dbr&package=js).

> Upon registering a Dynamsoft account and obtaining the SDK package from the official website, Dynamsoft will automatically create a 30-day free trial license and embed the corresponding license key into all the provided SDK samples.

#### Specify the location of the "engine" files (optional)

This is usually only required with frameworks like Angular or React, etc. where the referenced JavaScript files such as `cvr.js`, `dbr.js` are compiled into another file.

The purpose is to tell the SDK where to find the engine files (\*.worker.js, \*.wasm.js and \*.wasm, etc.). The API is called `Dynamsoft.Core.CoreModule.engineResourcePaths`:

```javascript
//The following code uses the jsDelivr CDN, feel free to change it to your own location of these files
Dynamsoft.Core.CoreModule.engineResourcePaths.core = "https://cdn.jsdelivr.net/npm/dynamsoft-core@3.0.32/dist/";
Dynamsoft.Core.CoreModule.engineResourcePaths.license = "https://cdn.jsdelivr.net/npm/dynamsoft-license@3.0.20/dist/";
Dynamsoft.Core.CoreModule.engineResourcePaths.dbr = "https://cdn.jsdelivr.net/npm/dynamsoft-barcode-reader@10.0.20/dist/";
Dynamsoft.Core.CoreModule.engineResourcePaths.cvr = "https://cdn.jsdelivr.net/npm/dynamsoft-capture-vision-router@2.0.31/dist/";
Dynamsoft.Core.CoreModule.engineResourcePaths.dce = "https://cdn.jsdelivr.net/npm/dynamsoft-camera-enhancer@4.0.1/dist/";
Dynamsoft.Core.CoreModule.engineResourcePaths.std = "https://cdn.jsdelivr.net/npm/dynamsoft-capture-vision-std@1.0.0/dist/";
Dynamsoft.Core.CoreModule.engineResourcePaths.dip = "https://cdn.jsdelivr.net/npm/dynamsoft-image-processing@2.0.30/dist/";
Dynamsoft.Core.CoreModule.engineResourcePaths.utility = "https://cdn.jsdelivr.net/npm/dynamsoft-utility@1.0.21/dist/";
```

### Set up and start image processing

#### Preload the module

The image processing logic is encapsulated within .wasm library files, and these files may require some time for downloading. To enhance the speed, we advise utilizing the following method to preload the libraries.

```js
// Preload the .wasm files
await Dynamsoft.Core.CoreModule.loadWasm(["cvr", "dbr"]);
```

#### Create a CaptureVisionRouter object

To use the SDK, we first create a `CaptureVisionRouter` object.

```javascript
Dynamsoft.License.LicenseManager.initLicense("DLS2eyJvcmdhbml6YXRpb25JRCI6IjIwMDAwMSJ9");

let router = null;
try {
    router = await Dynamsoft.CVR.CaptureVisionRouter.createInstance();
} catch (ex) {
    console.error(ex);
}
```

*Tip*:

When creating a `CaptureVisionRouter` object within a function which may be called more than once, it's best to use a "helper" variable to avoid double creation such as `hRouter` in the following code

```javascript
Dynamsoft.License.LicenseManager.initLicense("DLS2eyJvcmdhbml6YXRpb25JRCI6IjIwMDAwMSJ9");

let hRouter = null;
let router = null;

document.getElementById('btn-scan').addEventListener('click', async () => {
    try {
        router = await (hRouter = hRouter || Dynamsoft.CVR.CaptureVisionRouter.createInstance());
    } catch (ex) {
        console.error(ex);
    }
});
```

#### Connect an image source

The `CaptureVisionRouter` object, denoted as `router`, is responsible for handling images provided by an image source. In our scenario, we aim to detect barcodes directly from a live video stream. To facilitate this, we initialize a `CameraEnhancer` object, identified as `cameraEnhancer`, which is specifically designed to capture image frames from the video feed and subsequently forward them to `router`.

To enable video streaming on the webpage, we create a `CameraView` object referred to as `view`, which is then passed to `cameraEnhancer`, and its content is displayed on the webpage.

```html
<div id="cameraViewContainer" style="width: 100%; height: 100vh"></div>
```

```javascript
let view = await Dynamsoft.DCE.CameraView.createInstance();
let cameraEnhancer = await Dynamsoft.DCE.CameraEnhancer.createInstance(view);
document.querySelector("#cameraViewContainer").append(view.getUIElement());
router.setInput(cameraEnhancer);
```

#### Register a result receiver

Once the image processing is complete, the results are sent to all the registered `CapturedResultReceiver` objects. Each `CapturedResultReceiver` object may encompass one or multiple callback functions associated with various result types. In our particular case, our focus is on identifying barcodes within the images, so it's sufficient to define the callback function `onDecodedBarcodesReceived`:

```javascript
const resultsContainer = document.querySelector("#results");
const resultReceiver = new Dynamsoft.CVR.CapturedResultReceiver();
resultReceiver.onDecodedBarcodesReceived = (result) => {
  if (result.barcodeResultItems.length > 0) {
    resultsContainer.textContent = '';
    for (let item of result.barcodeResultItems) {
        // In this example, the barcode result is shown on the page beneath the video
      resultsContainer.textContent += `${item.formatString}: ${item.text}\n\n`;
    }
  }
};
router.addResultReceiver(resultReceiver);
```

You can also write code like this. It is the same.

```javascript
const resultsContainer = document.querySelector("#results");
router.addResultReceiver({ onDecodedBarcodesReceived: (result) => {
  if (result.barcodeResultItems.length > 0) {
    resultsContainer.textContent = '';
    for (let item of result.barcodeResultItems) {
        // In this example, the barcode result is shown on the page beneath the video
      resultsContainer.textContent += `${item.formatString}: ${item.text}\n\n`;
    }
  }
}});
```

Check out [CapturedResultReceiver](https://www.dynamsoft.com/capture-vision/docs/web/programming/javascript/api-reference/core/basic-structures/captured-result-receiver.html) for more information.

#### Start the process

With the setup now complete, we can proceed to process the images in two straightforward steps:

1. Initiate the image source to commence image acquisition. In our scenario, we invoke the `open()` method on `cameraEnhancer` to initiate video streaming and simultaneously initiate the collection of images. These collected images will be dispatched to `router` as per its request.
2. Define a preset template to commence image processing. In our case, we utilize the "ReadSingleBarcode" template, specifically tailored for processing images containing a single barcode.

```javascript
await cameraEnhancer.open();
await router.startCapturing("ReadSingleBarcode");
```

*Note*:

* `router` is engineered to consistently request images from the image source.
* Various preset templates are at your disposal for barcode reading:

| Template Name                  | Function Description                                           |
| ------------------------------ | -------------------------------------------------------------- |
| **ReadBarcodes_Default**       | Scans a single barcode.                                        |
| **ReadSingleBarcode**          | Quickly scans a single barcode.                                |
| **ReadBarcodes_SpeedFirst**    | Prioritizes speed in scanning multiple barcodes.               |
| **ReadBarcodes_ReadRateFirst** | Maximizes the number of barcodes read.                         |
| **ReadBarcodes_Balance**       | Balances speed and quantity in reading multiple barcodes.      |
| **ReadDenseBarcodes**          | Specialized in reading barcodes with high information density. |
| **ReadDistantBarcodes**        | Capable of reading barcodes from extended distances.           |

### Customize the process

#### Adjust the preset template settings

When making adjustments to some basic tasks, we often only need to modify [SimplifiedCaptureVisionSettings](https://www.dynamsoft.com/capture-vision/docs/web/programming/javascript/api-reference/capture-vision-router/interfaces/simplified-capture-vision-settings.html).

##### Change barcode settings

The preset templates can be updated to meet different requirements. For example, the following code limits the barcode format to QR code.

```javascript
let settings = await router.getSimplifiedSettings("ReadSingleBarcode");
settings.barcodeSettings.barcodeFormatIds =
  Dynamsoft.DBR.EnumBarcodeFormat.BF_QR_CODE;
await router.updateSettings("ReadSingleBarcode", settings);
await router.startCapturing("ReadSingleBarcode");
```

For a list of adjustable barcode settings, check out [SimplifiedBarcodeReaderSettings](https://www.dynamsoft.com/barcode-reader/docs/web/programming/javascript/api-reference/interfaces/simplified-barcode-reader-settings.html){:target="_blank"}.

##### Retrieve the original image

Additionally, we have the option to modify the template to retrieve the original image containing the barcode.

```javascript
let settings = await router.getSimplifiedSettings("ReadSingleBarcode");
settings.capturedResultItemTypes |= 
  Dynamsoft.Core.EnumCapturedResultItemType.CRIT_ORIGINAL_IMAGE;
await router.updateSettings("ReadSingleBarcode", settings);
await router.startCapturing("ReadSingleBarcode");
```

Limit the barcode format to QR code, and retrieve the original image containing the barcode, at the same time.

```javascript
let settings = await router.getSimplifiedSettings("ReadSingleBarcode");
settings.capturedResultItemTypes = 
  Dynamsoft.DBR.EnumBarcodeFormat.BF_QR_CODE |
  Dynamsoft.Core.EnumCapturedResultItemType.CRIT_ORIGINAL_IMAGE;
await router.updateSettings("ReadSingleBarcode", settings);
await router.startCapturing("ReadSingleBarcode");
```

Please be aware that it is necessary to update the `CapturedResultReceiver` object to obtain the original image. For instance:

```javascript
resultReceiver.onCapturedResultReceived = (result) => {
  let barcodes = result.items.filter(
    (item) =>
      item.type === Dynamsoft.Core.EnumCapturedResultItemType.CRIT_BARCODE
  );
  if (barcodes.length > 0) {
    let image = result.items.filter(
      (item) =>
        item.type ===
        Dynamsoft.Core.EnumCapturedResultItemType.CRIT_ORIGINAL_IMAGE
    )[0].imageData;
    // The image that we found the barcode(s) on.
  }
};
```

##### Change reading frequency to save power

The SDK is initially configured to process images sequentially without any breaks. Although this setup maximizes performance, it can lead to elevated power consumption, potentially causing the device to overheat. In many cases, it's possible to reduce the reading speed while still satisfying business requirements. The following code snippet illustrates how to adjust the SDK to process an image every 500 milliseconds:

> Please bear in mind that in the following code, if an image's processing time is shorter than 500 milliseconds, the SDK will wait for the full 500 milliseconds before proceeding to process the next image. Conversely, if an image's processing time exceeds 500 milliseconds, the subsequent image will be processed immediately upon completion.

```javascript
let settings = await router.getSimplifiedSettings("ReadSingleBarcode");
settings.minImageCaptureInterval = 500;
await router.updateSettings("ReadSingleBarcode", settings);
await router.startCapturing("ReadSingleBarcode");
```

##### Specify a scan region

You can use the parameter `roi` (region of interest) together with the parameter `roiMeasuredInPercentage` to configure the SDK to only read a specific region on the image frames. For example, the following code limits the reading in the center 25%( = 50% * 50%) of the image frames:

```javascript
let settings = await router.getSimplifiedSettings("ReadSingleBarcode");
settings.roiMeasuredInPercentage = true;
settings.roi.points = [
  { x: 25, y: 25 },
  { x: 75, y: 25 },
  { x: 75, y: 75 },
  { x: 25, y: 75 },
];
await router.updateSettings("ReadSingleBarcode", settings);
await router.startCapturing("ReadSingleBarcode");
```

While the code above accomplishes the task, a more effective approach is to restrict the scan region directly at the image source, as demonstrated in the following code snippet.

> * With the region configured at the image source, the images are cropped right before they are gathered for processing, eliminating the necessity to modify the processing settings further.
> * `cameraEnhancer` elevates interactivity by overlaying a mask on the video, providing a clear delineation of the scanning region.
> * See also: [CameraEnhancer::setScanRegion](https://www.dynamsoft.com/camera-enhancer/docs/web/programming/javascript/api-reference/acquisition.html#setscanregion)

```javascript
cameraEnhancer = await Dynamsoft.DCE.CameraEnhancer.createInstance(view);
cameraEnhancer.setScanRegion({
  x: 25,
  y: 25,
  width: 50,
  height: 50,
  isMeasuredInPercentage: true,
});
```

<!--
* Specify the maximum time allowed for processing each image

You can set the maximum time allowed for processing a single image with the property `timeout`.

> Please be aware that the SDK will cease processing an image if its processing time exceeds the duration specified by the `timeout` parameter. It should not be confused with the previously discussed parameter, `minImageCaptureInterval`.

```javascript
let settings = await router.getSimplifiedSettings("ReadSingleBarcode");
settings.timeout = 500;
await router.updateSettings("ReadSingleBarcode", settings);
await router.startCapturing("ReadSingleBarcode");
```
-->

#### Edit the preset templates directly

The preset templates have a lot more settings that can be customized to best suit your use case. If you [download the SDK from Dynamsoft website](https://www.dynamsoft.com/barcode-reader/downloads/1000003-confirmation/), you can find the templates under

* "/dynamsoft-barcode-reader-js-10.0.20/dynamsoft/resources/barcode-reader/templates/"

Upon completing the template editing, you can invoke the `initSettings` method and provide it with the template path as an argument.

```javascript
await router.initSettings("PATH-TO-THE-FILE"); //e.g. "https://your-website/ReadSingleBarcode.json")
await router.startCapturing("ReadSingleBarcode"); // Make sure the name matches one of the CaptureVisionTemplates in the
```

#### Filter the results (Important)

While processing video frames, it's common for the same barcode to be detected multiple times. To enhance the user experience, we can use [MultiFrameResultCrossFilter](https://www.dynamsoft.com/capture-vision/docs/web/programming/javascript/api-reference/utility/multi-frame-result-cross-filter.html) object, having two options currently at our disposal:

##### Option 1: Verify results across multiple frames

```js
let filter = new Dynamsoft.Utility.MultiFrameResultCrossFilter();
filter.enableResultCrossVerification(
  Dynamsoft.Core.EnumCapturedResultItemType.CRIT_BARCODE, true
);
await router.addResultFilter(filter);
```

*Note*:

* `enableResultCrossVerification` was designed to cross-validate the outcomes across various frames in a video streaming scenario, enhancing the reliability of the final results. This validation is particularly crucial for barcodes with limited error correction capabilities, such as 1D codes.

##### Option 2: Eliminate redundant results detected within a short time frame

```js
let filter = new Dynamsoft.Utility.MultiFrameResultCrossFilter();
filter.enableResultDeduplication(
  Dynamsoft.Core.EnumCapturedResultItemType.CRIT_BARCODE, true
);
await router.addResultFilter(filter);
```

*Note*:

* `enableResultDeduplication` was designed to prevent high usage in video streaming scenarios, addressing the repetitive processing of the same code within a short period of time.

Initially, the filter is set to forget a result 3 seconds after it is first received. During this time frame, if an identical result appears, it is ignored.

> It's important to know that in version 9.x or earlier, the occurrence of an identical result would reset the timer, thus reinitiating the 3-second count at that point. However, in version 10.0.20 and later, an identical result no longer resets the timer but is instead disregarded, and the duration count continues uninterrupted.

Under certain circumstances, this duration can be extended with the method `setDuplicateForgetTime()`.

```js
let filter = new Dynamsoft.Utility.MultiFrameResultCrossFilter();
filter.setDuplicateForgetTime(5000); // Extend the duration to 5 seconds.
await router.addResultFilter(filter);
```

You can also enable both options at the same time:

```js
let filter = new Dynamsoft.Utility.MultiFrameResultCrossFilter();
filter.enableResultCrossVerification(
  Dynamsoft.Core.EnumCapturedResultItemType.CRIT_BARCODE, true
);
filter.enableResultDeduplication(
  Dynamsoft.Core.EnumCapturedResultItemType.CRIT_BARCODE, true
);
filter.setDuplicateForgetTime(5000);
await router.addResultFilter(filter);
```

#### Add feedback

When a barcode is detected within the video stream, its position is immediately displayed within the video. Furthermore, utilizing the "Dynamsoft Camera Enhancer" SDK, we can introduce feedback mechanisms, such as emitting a "beep" sound or triggering a "vibration".

The following code snippet adds a "beep" sound for when a barcode is found:

```js
const resultReceiver = new Dynamsoft.CVR.CapturedResultReceiver();
resultReceiver.onDecodedBarcodesReceived = (result) => {
  if (result.barcodeResultItems.length > 0) {
    Dynamsoft.DCE.Feedback.beep();
  }
};
router.addResultReceiver(resultReceiver);
```

### Customize the UI

The UI is part of the auxiliary SDK "Dynamsoft Camera Enhancer", read more on how to [customize the UI](https://www.dynamsoft.com/camera-enhancer/docs/web/programming/javascript/user-guide/index.html#customize-the-ui).

## API Documentation

You can check out the detailed documentation about the APIs of the SDK at
[https://www.dynamsoft.com/barcode-reader/docs/web/programming/javascript/api-reference/?ver=10.0.20](https://www.dynamsoft.com/barcode-reader/docs/web/programming/javascript/api-reference/?ver=10.0.20).

## System Requirements

DBR requires the following features to work:

- Secure context (HTTPS deployment)

  When deploying your application / website for production, make sure to serve it via a secure HTTPS connection. This is required for two reasons
  
  - Access to the camera video stream is only granted in a security context. Most browsers impose this restriction.
  > Some browsers like Chrome may grant the access for `http://127.0.0.1` and `http://localhost` or even for pages opened directly from the local disk (`file:///...`). This can be helpful for temporary development and test.
  
  - Dynamsoft License requires a secure context to work.

- `WebAssembly`, `Blob`, `URL`/`createObjectURL`, `Web Workers`

  The above four features are required for the SDK to work.

- `MediaDevices`/`getUserMedia`

  This API is required for in-browser video streaming.

- `getSettings`

  This API inspects the video input which is a `MediaStreamTrack` object about its constrainable properties.

The following table is a list of supported browsers based on the above requirements:

  | Browser Name |     Version      |
  | :----------: | :--------------: |
  |    Chrome    | v78+<sup>1</sup> |
  |   Firefox    | v62+<sup>1</sup> |
  |     Edge     |       v79+       |
  |    Safari    |       v14+       |

  <sup>1</sup> devices running iOS needs to be on iOS 14.3+ for camera video streaming to work in Chrome, Firefox or other Apps using webviews.

Apart from the browsers, the operating systems may impose some limitations of their own that could restrict the use of the SDK. Browser compatibility ultimately depends on whether the browser on that particular operating system supports the features listed above.

## How to Upgrade

If you want to upgrade the SDK from an old version to a newer one, please see [how to upgrade](https://www.dynamsoft.com/barcode-reader/docs/web/programming/javascript/upgrade-guide/index.html?ver=10.0.20&utm_source=github).

## Release Notes

Learn about what are included in each release at [https://www.dynamsoft.com/barcode-reader/docs/web/programming/javascript/release-notes/index.html](https://www.dynamsoft.com/barcode-reader/docs/web/programming/javascript/release-notes/index.html?ver=10.0.20&utm_source=github).

## Next Steps

Now that you have got the SDK integrated, you can choose to move forward in the following directions

1. Check out the [Official Samples and Demo](https://www.dynamsoft.com/barcode-reader/docs/web/programming/javascript/samples-demos/index.html?ver=10.0.20)
2. Learn about the [APIs of the SDK](https://www.dynamsoft.com/barcode-reader/docs/web/programming/javascript/api-reference/index.html?ver=10.0.20)
