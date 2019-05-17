<!--main branch is tfs $/DBR/DBR_WASM/documents/guide.md-->

# Dynamsoft JavaScript Barcode SDK

Version 6.5.1

The repository aims to help developers get familiar with [Dynamsoft JavaScript Barcode SDK](https://www.dynamsoft.com/Products/barcode-recognition-javascript.aspx).

This SDK supports decoding **1D**, **PDF417**, **QR**, **DataMatrix**, and **Aztec** barcodes.

The supported data sources include `Blob`, `HTMLImageElement`, `HTMLVideoElement`, URL and more.

You can create a web application or a Node.js application to decode the static images and the video stream within 3 minutes.

<br>

<!-- ## TODO

Some places need to link to the api and need to make up.

<br> -->

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

[class BarcodeReader](https://www.dynamsoft.com/help/Barcode-Reader-wasm/classes/_dbr_wasm_d_.dynamsoft.barcodereader.html)

[class Scanner](https://www.dynamsoft.com/help/Barcode-Reader-wasm/classes/_dbr_wasm_d_.dynamsoft.barcodereader.scanner.html)

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
    <script src="https://cdn.jsdelivr.net/npm/dynamsoft-javascript-barcode/dist/dbr.min.js"></script>
    <script>
        //https://www.dynamsoft.com/CustomerPortal/Portal/TrialLicense.aspx
        BarcodeReader.licenseKey = 'LICENSE-KEY';
        let scanner = new BarcodeReader.Scanner({
            onFrameRead: results => {console.log(results);},
            onNewCodeRead: (txt, result) => {alert(txt);}
        });
        scanner.open();
    </script>
</body>
</html>
```
[Try in JSFiddle](https://jsfiddle.net/Keillion/16gqLoe3/)

<br>

You may see the following error after opening the browser console:

> [Deprecation] getUserMedia() no longer works on insecure origins. To use this feature, you should consider switching your application to a secure origin, such as HTTPS. See https://goo.gl/rStTGz for more details.

In Safari 12 the same error is displayed as such:

> Trying to call getUserMedia from an insecure document.

If you encounter this issue, the simplest way to resolve it is to open the file in a newer version of Firefox or Chrome. We will tackle this issue in detail in the coming sections.

<br>

If everything goes normally, there will be a pop-up from the browser asking for permission of the camera. After allowing access, you will see the video stream in the default UI of our scanner. The drop-down lists on the top left corner can be used for changing the video source and resolution. The button on the top right is for closing the scanner. After all the resources are loaded, you will see some arrays in the browser console. This array is the barcode results array that is being printed in the console once a new frame is read. Now to properly introduce the two main events used by the scanner:

* onFrameRead:

  The event that is triggered once a single frame has been scanned. The results object contains all the barcode results that the reader was able to decode.

* onNewCodeRead:

  This event is triggered when a new barcode (not a duplicate) is found. `txt` holds the barcode text result. `result` contains the actual barcode result, including the text result. Any new barcodes that were found (or any old barcodes that were found) are going to be stored for the duration of `duplicateForgetTime`.

<br>

## Implementation

In the HelloWorld sample, you used the min.js hosted on our site, which can load the other required js and wasm files.

<br>

To deploy your own application, you will need a web server and deploy the resources under a folder named `dist` to your server.

Required files in `dist`:

`dbr-<version>.min.js`

`dbr-<version>.wasm.min.js`

`dbr-<version>.wasm`

`dbr-<version>.wasm.withio.min.js`

`dbr-<version>.withio.wasm`

`dbr-<version>.esm.min.js`

<br>

You need to set `.wasm` mimetype to `application/wasm` in the server config.

Please check the settings below for different environments.

* set mimetype in nginx: [mime.types](https://www.nginx.com/resources/wiki/start/topics/examples/full/#mime-types)

* set mimetype in asp.net: [Web.config](https://github.com/dynamsoft-dbr/javascript-barcode/blob/master/documents/conf/Web.config)

* set mimetype in javaee web app: [web.xml](https://github.com/dynamsoft-dbr/javascript-barcode/blob/master/documents/conf/web.xml)
    
* set mimetype in Node.js: [npm mime](https://github.com/broofa/node-mime)

<br>

Now you can deploy the HelloWorld sample in your own web server and access it from there. You may encounter this issue when doing so:

> [Deprecation] getUserMedia() no longer works on insecure origins. To use this feature, you should consider switching your application to a secure origin, such as HTTPS. See https://goo.gl/rStTGz for more details.

That is because most browsers today need to be deployed on https to use [getUserMedia](https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia). Below are some samples for configuring an HTTPS server.

* nginx: [Configuring HTTPS servers](https://nginx.org/en/docs/http/configuring_https_servers.html)

* iis: [Create a Self Signed Certificate in IIS](https://aboutssl.org/how-to-create-a-self-signed-certificate-in-iis/)

* tomcat: [Setting Up SSL on Tomcat in 5 minutes](https://dzone.com/articles/setting-ssl-tomcat-5-minutes)

* Node.js: [npm tls](https://nodejs.org/docs/v0.4.1/api/tls.html)

<br>

After deploying the site to an https server, the browser might say "the site is not secure". That is because we use self-signed certification. Please go to the certificate settings and allow this certificate. The issue should all be gone even in Safari. You may change the certification to a formal one in production.

<br>

## Initialization

Our library needs some time for  initialization, including downloading the resources and compiling them, so you might notice that the decoding process doesn't start immediately. If the HelloWorld sample is deployed, the program will cache the wasm file in the indexedDB to speed the download up.

You can check the download status of the WebAssembly component with the `_onWasmDownloaded` callback. Please note this function is only triggered during the first visit because that's the only time the wasm files are downloaded.

Every time you open the page, initialization will take place only once. You can use the `isLoaded` function to see if the initialization was successful.

`loadWasm` is the basic function for initialization. You can call it over and over again, or add it in the page initialization to speed up the whole process. The returned promise will be resolved once the initialization is done. 

`createInstance` (or using the `Scanner` constructor) and `scanner.open` will call `loadWasm` on the backend so no initialization is required for those functions. Therefore, it is not necessary to explicitly call `loadWasm` to initialize the library if you are directly using the constructor.

<br>

### Debug Tool

In case you need to debug your sample application, you could insert the following debug tool:

```html
<!--any version jq is ok-->
<script src="https://code.jquery.com/jquery-3.4.1.slim.min.js"></script>
<script src="https://demo.dynamsoft.com/dbr_wasm/js/kConsole.js"></script>
```
[Try in JSFiddle](https://jsfiddle.net/Keillion/6czmrq5d/)

Please click the `console` button in top right of the screen.

The console will show the dbr wasm version, initialization process, and other useful info.

<br>

## Configuring Scanner Settings

The scanner interface comes with a number of properties, some of the most useful being shown here:

```js
// Use config when new the object
let scanner = new BarcodeReader.Scanner({
    // Use back camera in mobile. Set width and height.
    // Refer [MediaStreamConstraints](https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia#Syntax).
    videoSettings: { video: { width: 1280, height: 720, facingMode: "environment" } },
    //The default setting is for an environment with accurate focus and good lighting. The settings below are for more complex environments.
    runtimeSettings: { mAntiDamageLevel: 9, mDeblurLevel: 9 },
    // The same code awlways alert? Set duplicateForgetTime longer.
    duplicateForgetTime: 10000,
    onFrameRead: results => {console.log(results);},
    onNewCodeRead: (txt, result) => {alert(txt);}
});
// change initial configuration settings
scanner.duplicateForgetTime = 20000;
scanner.onFrameRead = undefined;
scanner.runtimeSettings.mBarcodeFormatIds = BarcodeReader.EnumBarcodeFormat.All;
```

Now that you have seen how to set and change these properties, here is a full list of the properties:
* `htmlElement`: The HTML element that will contain the video reader object should you choose to customize the UI. We will dig a little deeper into this in the next section.
* `videoSettings`: Defines the different settings of the video stream. These settings include the resolution and facing mode. Please visit this [link](https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia#Syntax) for more information on these video settings.
* `confidence`: This property is mainly related to 1D barcodes. If the confidence of a 1D barcode result is greater than 30, that is a reliable result which you can move forward with. Otherwise, it is recommended that the scan process is restarted so that a more confident result is produced.
* `intervalTime`: The time interval between finding a result and starting a new scan.
* `runtimeSettings`: Defines the different settings of the barcode reader itself. Find a full list of these settings and their corresponding descriptions [here](https://www.dynamsoft.com/help/Barcode-Reader/devguide/Template/TemplateSettingsList.html).
* `duplicateForgetTime`: The amount of time the reader "remembers" a barcode result once a single frame is read. Once the barcode result is obtained, the reader will not attempt to read the specific barcode again until duplicateForgetTime is up.

[Try in JSFiddle](https://jsfiddle.net/Keillion/gbwahsyp/)

<br>

## Customize the UI

The Barcode Reader gives you the freedom to use your own UI for the video scanner, and in this next section, we will explore how to configure the reader to allow for custom UI.

Try running the code below.
```html
<!DOCTYPE html>
<html>
<body>
    <div id="div-video-container">
        <video class="dbrScanner-video" playsinline="true"></video>
    </div>
    <script src="https://cdn.jsdelivr.net/npm/dynamsoft-javascript-barcode/dist/dbr.min.js"></script>
    <script>
        //https://www.dynamsoft.com/CustomerPortal/Portal/TrialLicense.aspx
        BarcodeReader.licenseKey = 'LICENSE-KEY';
        let scanner = new BarcodeReader.Scanner({
            htmlElement: document.getElementById('div-video-container'),
            onFrameRead: results => {console.log(results);},
            onNewCodeRead: (txt, result) => {alert(txt);}
        });
        scanner.open();
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
scanner.updateDevice().then(infos=>{
    // The camera currently in use
    alert(JSON.stringify(infos.current, null, 2));
    // An array of all cameras
    alert(JSON.stringify(infos.all, null, 2));
});
```
[Try in JSFiddle](https://jsfiddle.net/Keillion/j7p5c6fb/)

You can also get the device list when opening the scanner:
```js
scanner.open().then(infos=>{
    // The resolution of the video currently playing
    alert(JSON.stringify(infos.width+'x'+infos.height, null, 2));
    // The camera currently in use
    alert(JSON.stringify(infos.current, null, 2));
    // An array of all cameras
    alert(JSON.stringify(infos.all, null, 2));
});
```
[Try in JSFiddle](https://jsfiddle.net/Keillion/qpa5eyd9/)

You can play any video source using the `deviceId` property:

```js
// Play the first camera.
scanner.play(infos.all[0].deviceId);
```
[Try in JSFiddle](https://jsfiddle.net/Keillion/qwsbzygp/)

The video source name that shows up in the dropdown list is taken from the `label` property rather than the `deviceId`. You should almost always never use the `deviceId` for the name as it is a long string of randomized characters.
Please note that the camera may display different names in different environments or timings.

If you have more than one connected camera, and would like your application to play a certain one of them on startup, here is how:

```js
scanner.open().then(infos=>{
    for(let info of infos.all){
        if(info.label == 'Your camera name'){
            scanner.play(info.deviceId);
            break;
        }
    }
});
```
[Try in JSFiddle](https://jsfiddle.net/Keillion/a9mhu2sv/)

In conclusion: 
The device list is returned in the Promise result of `open` or `updateDevice`.
You can then play the selected device using `open` or `play`(when open has already been called).

## How to complete a form using the Barcode Reader

Using HTML code snippet with the custom UI elements, let's add some input tags.
```html
<input id="ipt-0">
<input id="ipt-1">
<input id="ipt-2">
```

Modify the configurarion settings of the video reader to complete the form with the results of three barcodes once they are found:
```js
let iptIndex = 0;
let scanner = new BarcodeReader.Scanner({
    onNewCodeRead:(txt)=>{
        document.getElementById('ipt-' + iptIndex).value = txt;
        if(3 == ++iptIndex){
            scanner.onNewCodeRead = undefined;
            scanner.close();
        }
    }
});
```
[Try in JSFiddle](https://jsfiddle.net/Keillion/cgLo5dsb/)

<br>

## Decode Part of Video

If you are not interested in exhausting resources to read the entire area of the video stream, you can choose to decode a specific region of the stream. Here is how:

```js
// take a center 50% * 50% part of the video and resize the part to 1280 * 720 before decode
scanner.searchRegion = {sx: 0.25, sy: 0.25, sWidth: 0.5, sHeight: 0.5, dWidth: 1280, dHeight: 720};
```
[Try in JSFiddle](https://jsfiddle.net/Keillion/z42orbkj/)

<br>

## Change log

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
If there is any questions, please feel free to contact <support@dynamsoft.com>.

## License Agreement
https://www.dynamsoft.com/Products/barcode-reader-license-agreement.aspx

