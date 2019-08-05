<!--main branch is tfs $/DBR/DBR_WASM/documents/guide.md-->

# Dynamsoft JavaScript Barcode SDK

Version 7.0.0

The repository aims to help developers get familiar with [Dynamsoft JavaScript Barcode SDK](https://www.dynamsoft.com/Products/barcode-recognition-javascript.aspx).

This SDK supports decoding **1D**, **PDF417**, **QR**, **DataMatrix**, and **Aztec** barcodes.

The supported data sources include `Blob`, `HTMLImageElement`, `HTMLVideoElement`, URL and more.

You can create a web application or a Node.js application to decode the static images and the video stream within 3 minutes.

<br>

<!-- ## TODO

Some places need to link to the API and need to make up.

<br> -->

<!-- TOC -->

- [Dynamsoft JavaScript Barcode SDK](#dynamsoft-javascript-barcode-sdk)
    - [Online Demo](#online-demo)
    - [Browser Compatibility](#browser-compatibility)
    - [API Documentation](#api-documentation)
    - [Preface](#preface)
    - [HelloWorld](#helloworld)
    - [Initialization](#initialization)
        - [Debug Info](#debug-info)
    - [Configuring Scanner Settings](#configuring-scanner-settings)
    - [Configuring RuntimeSettings](#configuring-runtimesettings)
    - [Customize the UI](#customize-the-ui)
    - [How to complete a form using the Barcode Reader](#how-to-complete-a-form-using-the-barcode-reader)
    - [Decode Part of Video](#decode-part-of-video)
    - [Self Deployment](#self-deployment)
    - [Changelog](#changelog)
        - [6.5.2.1](#6521)
        - [6.5.2](#652)
        - [6.5.1](#651)
        - [6.4.1.3](#6413)
        - [6.4.1.1](#6411)
        - [6.4.1.0](#6410)
        - [6.3.0.2](#6302)
        - [6.3.0.1](#6301)
        - [6.3.0](#630)
    - [Contact Us](#contact-us)
    - [License Agreement](#license-agreement)

<!-- /TOC -->

## Online Demo

<img src="https://github.com/dynamsoft-dbr/javascript-barcode/raw/master/img/dbr-wasm-demo-scaning.jpg">

[Online Demo in Dynamsoft](https://demo.dynamsoft.com/dbr_wasm/barcode_reader_javascript.html)

<br>

## Browser Compatibility

| Browser | Version |
|:-:|:-:|
| Chrome | v57+ |
| Firefox | v52+ |
| Edge | v16+ |
| Safari* | v11+ |
| Internet Explorer | not supported |

> Safari 11.2.2 ~ 11.2.6 are not supported.

<br>

## API Documentation

<!--todo: link need use online-->
[API Documentation](./modules/_dbr_wasm_d_.dynamsoft.html)

<br>

## Preface

In the followng section, we will introduce the basic functions of the SDK and how you can use it in a web application to decode barcodes off a video stream. 

For those who are interested in creating a nodejs app, or decoding static images, please refer to the samples and api documents. This guide tackles decoding from a video, and we will make up for other usages soon.

<br>

## HelloWorld

Before testing the HelloWorld sample, please note that you will require a connected camera that is not occupied by another application, as well as an internet connection.

Now just copy the following code into an html file and run it directly from the browser:

```html
<!DOCTYPE html>
<html>
<body>
    <!--
        Warning: Use a specific version in production. (e.g. https://cdn.jsdelivr.net/npm/dynamsoft-javascript-barcode@x.x.x/dist/dbr.min.js)
        Please visit https://www.dynamsoft.com/CustomerPortal/Portal/TrialLicense.aspx to get trial license.
    -->
    <script src="https://www.keillion.site/dbr.wasm.cdn/dbr.min.js" data-productKeys="LICENSE-KEY"></script>
    <script>
        let scanner = null;
        Dynamsoft.BarcodeScanner.createInstance({
            onFrameRead: results => {console.log(results);},
            onUnduplicatedRead: (txt, result) => {alert(txt);}
        }).then(s => {
            scanner = s;
            scanner.show();
        });
    </script>
</body>
</html>
```
[Try in JSFiddle](https://jsfiddle.net/Keillion/16gqLoe3/)

<br>

If you open the html as `file:///` or `http://` You might see the following error after opening the browser console:

> [Deprecation] getUserMedia() no longer works on insecure origins. To use this feature, you should consider switching your application to a secure origin, such as HTTPS. See https://goo.gl/rStTGz for more details.

In Safari 12 the same error is displayed as such:

> Trying to call getUserMedia from an insecure document.

That is because most browsers today need to be deployed on https to use [getUserMedia](https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia). 

*(The latest chrome or Firefox allows getUserMedia when using `file:///` or `http://localhost`. )*

Below are some samples for configuring an HTTPS server.

* NGINX: [Configuring HTTPS servers](https://nginx.org/en/docs/http/configuring_https_servers.html)

* IIS: [Create a Self Signed Certificate in IIS](https://aboutssl.org/how-to-create-a-self-signed-certificate-in-iis/)

* Tomcat: [Setting Up SSL on Tomcat in 5 minutes](https://dzone.com/articles/setting-ssl-tomcat-5-minutes)

* Node.js: [npm tls](https://nodejs.org/docs/v0.4.1/api/tls.html)

After deploying the site to an https server, the browser might say "the site is not secure". That is because we use self-signed certification. Please go to the certificate settings and allow this certificate. You may change the certification to a formal one in production.

<br>

If everything goes normally, there will be a pop-up from the browser asking for permission of the camera. After allowing access, you will see the video stream in the default UI of our scanner. The drop-down lists on the top left corner can be used for changing the video source and resolution. The button on the top right is for closing the scanner. After all the resources are loaded, you will see some arrays in the browser console. This array is the barcode results array that is being printed in the console once a new frame is read. Now to properly introduce the two main events used by the scanner:

* onFrameRead:

  The event that is triggered once a single frame has been scanned. The results object contains all the barcode results that the reader was able to decode.

* onUnduplicatedRead:

  This event is triggered when a new barcode (not a duplicate) is found. `txt` holds the barcode text result. `result` contains the actual barcode result, including the text result. Any new barcodes that were found (or any old barcodes that were found) are going to be stored for the duration of `duplicateForgetTime`.

<br>

## Initialization

Our library needs some time for initialization, including downloading the resources and compiling them, so you might notice that the decoding process doesn't start immediately. If the HelloWorld sample is deployed, the program will cache the wasm file in the indexedDB to speed the download up.

You can check the download status of the WebAssembly component with the `Dynamsoft.BarcodeReader._onWasmDownloaded` callback. Please note this function is only triggered during the first visit because that's the only time the wasm files are downloaded.

Every time you open the page, initialization will take place only once. You can use the `isLoaded` function to see if the initialization was successful.

`loadWasm` is the basic function for initialization. You can call it over and over again, or add it in the page initialization to speed up the whole process. The returned promise will be resolved once the initialization is done. 

`createInstance` will call `loadWasm` on the backend so no initialization is required for those functions. Therefore, it is not necessary to explicitly call `loadWasm` to initialize the library if you are directly using the constructor.

<br>

### Debug Info

In case you need to debug your sample application, use the callback `_onLog`.

```js
Dynamsoft.BarcodeReader._onLog = console.log;
```
[Try in JSFiddle](https://jsfiddle.net/Keillion/6czmrq5d/)

The log can then be seen in the browser console.

<br>

## Configuring Scanner Settings

The `BarcodeScanner` interface comes with a number of properties, some of the most useful being shown here:

```js
// Use config when new the object
let scanner = null;
Dynamsoft.BarcodeScanner.createInstance({
    onFrameRead: results => {console.log(results);},
    onUnduplicatedRead: (txt, result) => {alert(txt);}
}).then(s => {
    scanner = s;

    // Use back camera in mobile. Set width and height.
    // Refer [MediaStreamConstraints](https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia#Syntax).
    scanner.setVideoSettings({ video: { width: 1280, height: 720, facingMode: "environment" } });

    let runtimeSettings = scanner.getRuntimeSettings();
    // Only decode OneD and QR
    runtimeSettings.BarcodeFormatIds = Dynamsoft.EnumBarcodeFormat.OneD | Dynamsoft.EnumBarcodeFormat.QR_CODE;
    // The default setting is for an environment with accurate focus and good lighting. The settings below are for more complex environments.
    runtimeSettings.localizationModes = [2,16,4,8,0,0,0,0];
    // Only accept results' confidence over 30
    runtimeSettings.minResultConfidence = 30;
    scanner.updateRuntimeSettings(runtimeSettings);

    let scanSettings = scanner,getScanSettings();
    // The same code awlways alert? Set duplicateForgetTime longer.
    scanSettings.duplicateForgetTime = 20000;
    // Give cpu more time to relax
    scanSettings.intervalTime = 300;
    scanner.setScanSettings(scanSettings);
})
```

Now that you have seen how to set and change these properties, here is a full list of the properties:
* `UIElement`: The HTML element that will contain the video reader object should you choose to customize the UI. We will dig a little deeper into this in the next section.
* `videoSettings`: Defines the different settings of the video stream. These settings include the resolution and facing mode. Please visit this [link](https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia#Syntax) for more information on these video settings.
* `minResultConfidence`: This property is mainly related to 1D barcodes. If the confidence of a 1D barcode result is greater than 30, that is a reliable result which you can move forward with. Otherwise, it is recommended that the scan process is restarted so that a more confident result is produced.
* `intervalTime`: The time interval between finding a result and starting a new scan.
* `runtimeSettings`: Defines the different settings of the barcode reader itself. Find a full list of these settings and their corresponding descriptions [here](https://www.dynamsoft.com/help/Barcode-Reader/devguide/Template/TemplateSettingsList.html).
* `duplicateForgetTime`: The amount of time the reader "remembers" a barcode result once a single frame is read. Once the barcode result is obtained, the reader will not attempt to read the specific barcode again until duplicateForgetTime is up.

[Try in JSFiddle](https://jsfiddle.net/Keillion/gbwahsyp/)

<br>

## Configuring RuntimeSettings

fast
```js
let settings = scanner.getRuntimeSettings();
settings.localizationModes = [2,0,0,0,0,0,0,0];
settings.deblurLevel = 0;
scanner.updateRuntimeSettings(settings);
```

1D
```js
let settings = scanner.getRuntimeSettings();
settings.localizationModes = [2,16,4,8,0,0,0,0];
settings.deblurLevel = 0;
scanner.updateRuntimeSettings(settings);
```

2D
```js
let settings = scanner.getRuntimeSettings();
settings.localizationModes = [2,16,4,8,0,0,0,0];
settings.deblurLevel = 2;
scanner.updateRuntimeSettings(settings);
```

[Try in JSFiddle](https://jsfiddle.net/Keillion/cz0udevm/)

## Customize the UI

The Barcode Reader gives you the freedom to use your own UI for the video scanner, and in the next section, we will explore how to configure the reader to allow for custom UI.

Try running the code below.
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
    <script src="https://www.keillion.site/dbr.wasm.cdn/dbr.min.js" data-productKeys="LICENSE-KEY"></script>
    <script>
        let scanner = null;
        Dynamsoft.BarcodeScanner.createInstance({
            UIElement: document.getElementById('div-video-container'),
            onFrameRead: results => {console.log(results);},
            onUnduplicatedRead: (txt, result) => {alert(txt);}
        }).then(s => {
            scanner = s;
            scanner.show();
        });
    </script>
</body>
</html>
```
[Try in JSFiddle](https://jsfiddle.net/Keillion/0zo9ju72/)

Now that we have defined the htmlElement to be the custom div element, you need to add the video source and resolution dropdown boxes. Here is the HTML element to add a custom video source select dropdown:
```html
<select class="dbrScanner-sel-camera"></select>
```
[Try in JSFiddle](https://jsfiddle.net/Keillion/csadqny1/)

As for adding a resolution select dropdown menu:
```html
<select class="dbrScanner-sel-resolution"></select>
```

The dropdown will still show the same 8 options for the resolution if you do not manually define the resolution options.

[Try in JSFiddle](https://jsfiddle.net/Keillion/oyxugLcf/)

You can provide limited resolution options to avoid overwhelming the user. Here is the HTML code for how to do that:
```html
<select class="dbrScanner-sel-resolution">
    <!-- <option class="dbrScanner-opt-gotResolution" value="got"></option> -->
    <option data-width="1920" data-height="1080">1920 x 1080</option>
    <option data-width="1280" data-height="720">1280 x 720</option>
    <option data-width="640" data-height="480">640 x 480</option>
</select>
```

Please note that in this case, you will need to manually dictate the resolution options. If the camera does not support the selected resolution, it will find the closest supported resolution. The "dbrScanner-opt-gotResolution" class option of the dropdown menu (shown above) indicates which resolution is currently being used.

[Try in JSFiddle](https://jsfiddle.net/Keillion/odf4eLvm/)

To play the video at the selected resolution:

```js
scanner.play(null, 1920, 1080).then(r=>{
    alert(r.width+'x'+r.height);
});
```
[Try in JSFiddle](https://jsfiddle.net/Keillion/14ngeh5c/)

Now suppose you do not want to use either of the select classes listed above for the video source and resolution dropdown boxes. You can use the API methods to populate any HTML element you want to use.

For creating the resolution list, the UI element will need to be manually populated as shown a couple of code snippets ago. Here it is again for reference:
```html
<select class="dbrScanner-sel-resolution">
    <!-- <option class="dbrScanner-opt-gotResolution" value="got"></option> -->
    <option data-width="1920" data-height="1080">1920 x 1080</option>
    <option data-width="1280" data-height="720">1280 x 720</option>
    <option data-width="640" data-height="480">640 x 480</option>
</select>
```

You can get the device list via the API like this:
```js
scanner.getCurrentCamera().then(info=>{
    // The camera currently in use
    alert(JSON.stringify(info));
});
scanner.getAllCameras().then(infos=>{
    // An array of all cameras
    alert(JSON.stringify(infos, null, 2));
});
```
[Try in JSFiddle](https://jsfiddle.net/Keillion/j7p5c6fb/)

You can play any video source using the `deviceId` property:

```js
// Play the first camera.
scanner.setCurrentCamera(infos.all[0].deviceId);
```
[Try in JSFiddle](https://jsfiddle.net/Keillion/qwsbzygp/)

The video source name that shows up in the dropdown list is taken from the `label` property rather than the `deviceId`. You should almost always never use the `deviceId` for the name as it is a long string of randomized characters.
Please note that the camera may display different names in different environments or timings.

If you have more than one connected camera, and would like your application to play a certain one of them on startup, here is how:

```js
scanner.show()
.then(()=>scanner.getAllCameras())
.then(infos=>{
    for(let info of infos){
        if(info.label == 'Your camera name'){
            scanner.setCurrentCamera(info.deviceId);
            break;
        }
    }
});
```
[Try in JSFiddle](https://jsfiddle.net/Keillion/a9mhu2sv/)

## How to complete a form using the Barcode Reader

Using HTML code snippet with the custom UI elements, let's add some input tags.
```html
<input id="ipt-0">
<input id="ipt-1">
<input id="ipt-2">
```

Modify the configuration settings of the video reader to complete the form with the results of three barcodes once they are found:
```js
let iptIndex = 0;
let scanner = null;
Dynamsoft.BarcodeScanner.createInstance({
    UIElement: document.getElementById('div-video-container'),
    onFrameRead: results => {console.log(results);},
    onUnduplicatedRead: (txt)=>{
        document.getElementById('ipt-' + iptIndex).value = txt;
        if(3 == ++iptIndex){
            scanner.onUnduplicatedRead = undefined;
            scanner.stop();
            scanner.hide();
        }
    }
}).then(s => {
    scanner = s;
    scanner.show();
});
```
[Try in JSFiddle](https://jsfiddle.net/Keillion/cgLo5dsb/)

<br>

## Decode Part of Video

If you are not interested in exhausting resources to read the entire area of the video stream, you can choose to decode a specific region of the stream. Here is how:

```js
// Ignore 25% in around while decoding
let settings = scanner.getRuntimeSettings();
settings.region.left = 25;
settings.region.top = 25;
settings.region.right = 25;
settings.region.bottom = 25;
settings.region.measuredByPercentage = 1; // 1 means true
scanner.updateRuntimeSettings(settings);
```
[Try in JSFiddle](https://jsfiddle.net/Keillion/z42orbkj/)

<br>

## Self Deployment

In the HelloWorld sample, you used the min.js hosted on CDN, which can load the other required js and wasm files.

Most of the time you use this cdn is enough, it is fast and stable.

But sometimes you will want to deploy it yourself, for example, in an environment without Internet, for example, you can provide a faster and more stable CDN.

<br>

To deploy resources yourself, you will need a web server and deploy the resources under a folder named `dist` to your server.

Required files in `dist`:

```
dbr-<version>.min.js
dbr-<version>.wasm.min.js
dbr-<version>.wasm
dbr-<version>.wasm.withio.min.js
dbr-<version>.withio.wasm
dbr-<version>.esm.min.js
```

<br>

> It is recommended that you bring all these files with you when you use them. But if you want to reduce the files you need to deploy, here is a rough list of the necessary files:
>
> * web + document + UMD:
> ```
> dbr-<version>.min.js
> dbr-<version>.wasm.min.js
> dbr-<version>.wasm
> ```
>
> * web + worker + UMD:
> ```
> dbr-<version>.min.js
> dbr-<version>.wasm.withio.min.js
> dbr-<version>.withio.wasm
> ```
>
> * web + document + es6 module:
> ```
> dbr-<version>.min.esm.js
> dbr-<version>.wasm.min.js
> dbr-<version>.wasm
> ```
>
> * web + worker + es6 module:
> ```
> dbr-<version>.min.esm.js
> dbr-<version>.wasm.withio.min.js
> dbr-<version>.withio.wasm
> ```
>
> * nodejs + UMD:
> ```
> dbr-<version>.min.js
> dbr-<version>.wasm.withio.min.js
> dbr-<version>.withio.wasm
> ```

<br>

You need to set `.wasm` mimetype to `application/wasm` in the server config.

Please check the settings below for different environments.

* set mimetype in NGINX: [mime.types](https://www.nginx.com/resources/wiki/start/topics/examples/full/#mime-types)

* set mimetype in ASP.NET: [Web.config](https://github.com/dynamsoft-dbr/javascript-barcode/blob/master/documents/conf/Web.config)

* set mimetype in Java&trade; EE web app: [web.xml](https://github.com/dynamsoft-dbr/javascript-barcode/blob/master/documents/conf/web.xml)
    
* set mimetype in Node.js: [npm mime](https://github.com/broofa/node-mime)

<br>

## Changelog

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

Built Dynamsoft Barcode Reader 6.3.0 to JS(WebAssembly) version.

<br>

## Contact Us
If there are any questions, please feel free to contact <support@dynamsoft.com>.

## License Agreement
https://www.dynamsoft.com/Products/barcode-reader-license-agreement.aspx

