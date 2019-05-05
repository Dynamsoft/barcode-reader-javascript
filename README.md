<!--main branch is tfs $/DBR/DBR_WASM/documents/guide.md-->

# Dynamsoft JavaScript Barcode SDK

Version 6.5.1

The repository aims to help developers get familiar with [Dynamsoft JavaScript Barcode SDK](https://www.dynamsoft.com/Products/barcode-recognition-javascript.aspx).

This SDK supports decoding **1D**, **PDF417**, **QR**, **DataMatrix**, and **Aztec**.

The supported data sources include `Blob`, `HTMLImageElement`, `HTMLVideoElement`, URL and more.

You can create a web application or a nodejs application to decode the static images and the video steam within 3 minutes.

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
|-|-|
| Chrome | v57+ |
| Firefox | v52+ |
| Edge | v16+ |
| Safari* | v11+ |
| Internet Explorer | not supported |

> Safari 11.2.2 ~ 11.2.6 are not supported.

<br>

## API Documentation

<!-- [class BarcodeReader](./classes/_dbr_wasm_d_.dynamsoft.barcodereader.html)

[class Scanner](./classes/_dbr_wasm_d_.dynamsoft.barcodereader.scanner.html) -->

<!-- github -->

## API Documentation

[class BarcodeReader](https://www.dynamsoft.com/help/Barcode-Reader-wasm/classes/_dbr_wasm_d_.dynamsoft.barcodereader.html)

[class Scanner](https://www.dynamsoft.com/help/Barcode-Reader-wasm/classes/_dbr_wasm_d_.dynamsoft.barcodereader.scanner.html)

<br>

## Preface

In the followng section, I will introduce the basic functions of our SDK in your web application to decode barcode in the video stream. 

For those who are interested in the nodejs or the static images decoding, please refer to the samples and api documents. We will make up for these usages soon.

<br>

## Helloworld

* Require a camera that's not occupied by other application connected in the computer with the internet access

Then just copy the following code into an html file and run it from file browser.
<!--Deploy the file to [Web Server for Chrome](https://chrome.google.com/webstore/detail/web-server-for-chrome/ofhbbkphhbklhfoeikjpcbhemlocgigb).-->

```html
<!DOCTYPE html>
<html>
<body>
    <script src="https://demo.dynamsoft.com/dbr_wasm/js/dbr-6.5.1.min.js"></script>
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

You may see the following error after opening browser console.

> [Deprecation] getUserMedia() no longer works on insecure origins. To use this feature, you should consider switching your application to a secure origin, such as HTTPS. See https://goo.gl/rStTGz for more details.

In Safari 12 the error is like this.

> Trying to call getUserMedia from an insecure document.

If you encounter into this issue, the simplest way is to open this file in a newer version of Firefox or Chrome. We will come to this issue in detail in the following sections.

<br>

If everything goes on normally, there will be a pop-up from the browser asking for the permission of the camera. Please allow it and then you will see the video stream in the default UI of our scanner. The drop-down list on the left-top corner can be used for changing the video source and the resolution. The button on the right-top are for closing the scanner. After a while with all the resources loaded, you can see some arrays in the browser console.

* onFrameRead:

  The event that is triggered once a single frame has been scanned. The results object contains all the barcode results that the reader was able to decode.

* onNewCodeRead:

  This event is triggered when a not duplicated new barcode is found. `txt` holds the barcode text result. `result` contains the actual barcode result, including the text result. Old barcode will remember for `duplicateForgetTime`.

<br>

## Implementation

You used the js in our site in the helloword which can load other js and wasm files.

<br>

When you are deploying your own application, you will need a web server and deploy the resourced under `dist` to your server.

Required files:

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
    
* set mimetype in nodejs: [npm mime](https://github.com/broofa/node-mime)

<br>

Now you can deploy the helloword in the web server and acess it from your own server. The similar issue occurs again.

> [Deprecation] getUserMedia() no longer works on insecure origins. To use this feature, you should consider switching your application to a secure origin, such as HTTPS. See https://goo.gl/rStTGz for more details.

That's because most browsers today need to be deployed on https to use [getUserMedia](https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia). Below are some samples for configuring an HTTPS server.

* nginx: [Configuring HTTPS servers](https://nginx.org/en/docs/http/configuring_https_servers.html)

* iis: [Create a Self Signed Certificate in IIS](https://aboutssl.org/how-to-create-a-self-signed-certificate-in-iis/)

* tomcat: [Setting Up SSL on Tomcat in 5 minutes](https://dzone.com/articles/setting-ssl-tomcat-5-minutes)

* nodejs: [npm tls](https://nodejs.org/docs/v0.4.1/api/tls.html)

<br>

After deploying the site to https server, the browser might say "the site is not secure". It's because we are using a self-certificated certification. Please go to advanced and keep visiting. The issue should all be gone even in Safari. You may change the certification to a formal one in production.

<br>

## Initialization

You might notice that the decoding process doesn't start immediately. It's because our library needs some time for the initialization including downloading the resources and compile them. If the helloworld is deployed, the program will cache the wasm file in the indexDB to speed the download up. You can check the download status with the `_onWasmDownloaded`callback. Please note this functions is only triggered in the first visit because that's the only time the download of the wasm files is require.


Every time you open the page, the initialization will start only once. You can check with the `isLoaded` function to see if it's successful.

`loadWasm` is the most basic function for initialization, you can call it over and over again or add it in your page initialization to speed up. The promise will be resolved if the initialization is done. 

`createInstance` and `Scanner.open` will call `loadWasm` on the backend so no initialization is required for those functions.

<br>

### Debug Tool

You could insert a debug tool in our samples.

```html
<!--any version jq is ok-->
<script src="https://code.jquery.com/jquery-3.4.1.slim.min.js"></script>
<script src="https://demo.dynamsoft.com/dbr_wasm/js/kConsole.js"></script>
```
[Try in JSFiddle](https://jsfiddle.net/Keillion/6czmrq5d/)

Please click the button `console` in top right of the screen.

You could find dbr wasm version, initialization process and other useful info.

<br>

## Configuring Scanner Settings

The scanner interface comes with a number of properties, displayed some of the most useful properties here for example:
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
// change config
scanner.duplicateForgetTime = 20000;
scanner.onFrameRead = undefined;
scanner.runtimeSettings.mBarcodeFormatIds = BarcodeReader.EnumBarcodeFormat.All;
```
[Try in JSFiddle](https://jsfiddle.net/Keillion/gbwahsyp/)
<br>

## Customize the UI

Try running the code below.
```html
<!DOCTYPE html>
<html>
<body>
    <div id="div-video-container">
        <video class="dbrScanner-video" playsinline="true"></video>
    </div>
    <script src="https://demo.dynamsoft.com/dbr_wasm/js/dbr-6.5.1.min.js"></script>
    <script>
        //https://www.dynamsoft.com/CustomerPortal/Portal/TrialLicense.aspx
        BarcodeReader.licenseKey = 't0068MgAAAAxT9peWqAbLNI2gDlg9yk8dqzhp5Me5BNCgFIg2p5X+8TPYghCr9cz6TNFlkmkpzOJelNHJaQMWGe7Bszoxoo4=';
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

Now that we have defined the htmlElement to be the document body, you can customize the video source and resolution dropdown boxes. Here is how to add a source select dropdown when you have more than one video source:
```html
<select class="dbrScanner-sel-camera"></select>
```
[Try in JSFiddle](https://jsfiddle.net/Keillion/csadqny1/)

And here is how to add a resolution select dropdown menu:
```html
<select class="dbrScanner-sel-resolution"></select>
```
The dropdown will still show the same 8 options for the resolution. If the camera does not support the selected resolution, it will find the closest supported resolution.
[Try in JSFiddle](https://jsfiddle.net/Keillion/oyxugLcf/)

You can provide limited resolution options to avoid overwhelming the user. Here is how to do that, as well as hide the currently selected resolution:
```html
<select class="dbrScanner-sel-resolution">
    <!-- <option class="dbrScanner-opt-gotResolution" value="got"></option> -->
    <option data-width="1920" data-height="1080">1920 x 1080</option>
    <option data-width="1280" data-height="720">1280 x 720</option>
    <option data-width="640" data-height="480">640 x 480</option>
</select>
```
[Try in JSFiddle](https://jsfiddle.net/Keillion/odf4eLvm/)

Here is how to play the video at a special resolution in js:
```js
scanner.play(null, 1920, 1080).then(r=>{
    alert(r.width+'x'+r.height);
});
```
[Try in JSFiddle](https://jsfiddle.net/Keillion/14ngeh5c/)

Now suppose you do not want to use either of the select classes listed above. With the video reader object, you can use the API methods to populate any UI element you want to use.

For creating the resolution list, the UI element will need to be manually populated as shown in the a couple of code snippets ago.

For the device list, you can get source lists like this:
```js
scanner.updateDevice().then(infos=>{
    // The camera currently in use
    alert(JSON.stringify(infos.current, null, 2));
    // An array of all cameras
    alert(JSON.stringify(infos.all, null, 2));
});
```
[Try in JSFiddle](https://jsfiddle.net/Keillion/j7p5c6fb/)

Get source lists during opening:
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

Select a camera by deviceId:
```js
// Play the first camera.
scanner.play(infos.all[0].deviceId);
```
[Try in JSFiddle](https://jsfiddle.net/Keillion/qwsbzygp/)

Select a friendly named camera.
Note that the camera may display different names on the browser in different environments or timings.
So this is not a very safe practice.
You need to test this code on your target browser.
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
You can then play the selected device using `open` or `play`(when already open).

## How to complete a form using the Barcode Reader

Based on the HTML code snippet with the custom UI elements, let's add some input tags.

Adding three `<input>` elements:
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

If you are not interested in exhausting resources to read the entire video stream, you can choose to decode a specific region of the stream. Here is how:

```js
// take a center 50% * 50% part of the video and resize the part to 1280 * 720 before decode
scanner.searchRegion = {sx: 0.25, sy: 0.25, sWidth: 0.5, sHeight: 0.5, dWidth: 1280, dHeight: 720};
```
[Try in JSFiddle](https://jsfiddle.net/Keillion/z42orbkj/)

<br>

## Change log

### 6.5.1
Added video view for barcode scan. Compatible with nodejs.

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
