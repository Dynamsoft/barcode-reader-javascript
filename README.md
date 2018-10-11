# Dynamsoft JavaScript Barcode SDK

Version 6.3.0.2

The repository aims to help developers get familiar with [Dynamsoft JavaScript Barcode SDK](https://www.dynamsoft.com/Products/barcode-recognition-javascript.aspx).

## Update Notes

### 6.3.0.2

Add built-in worker support.

```js
// The default value is false. Set it true to decode in another thread. By this way, UI would not stuck.
dynamsoft.dbrEnv.bUseWorker = true;
```

### 6.3.0.1

Set `dbr-<version>.js(stable)` as the main branch.

Add `dbr-<version>.mobile.js`(smaller, compile quicker, need less memory, but not that stable) for the mobile safari.

### 6.3.0

Build Dynamsoft Barcode Reader 6.3.0 to JS(webassembly) version.

## License

Get the [trial license](https://www.dynamsoft.com/CustomerPortal/Portal/Triallicense.aspx).

## Online Demo

(version 6.3.0)
https://demo.dynamsoft.com/dbr_wasm/barcode_reader_javascript.html

(version 6.3.0.2)
https://htmlpreview.github.io/?https://github.com/dynamsoft-dbr/javascript-barcode/blob/master/examples/decodeVideoWithSettings/barcode_reader_javascript.html

## API Documentation

[guide](https://github.com/dynamsoft-dbr/javascript-barcode/blob/master/documents/guide-original.md)

[api](https://github.com/dynamsoft-dbr/javascript-barcode/blob/master/documents/api-original.md)

https://www.dynamsoft.com/help/Barcode-Reader-wasm/index.html

## HowTo
Load and initialize the barcode reader in HTML pages:

```html
<script src="https://demo.dynamsoft.com/dbr_wasm/js/dbr-6.3.0.2.min.js"></script>
<script>
        var reader;
        var dynamsoft = self.dynamsoft || {};
        dynamsoft.dbrEnv = dynamsoft.dbrEnv || {};
        dynamsoft.dbrEnv.resourcesPath = 'https://demo.dynamsoft.com/dbr_wasm/js/';

        dynamsoft.dbrEnv.onAutoLoadWasmSuccess = function(){
            reader = new dynamsoft.BarcodeReader();
        };
        dynamsoft.dbrEnv.onAutoLoadWasmError = function(status){
        };
        // https://www.dynamsoft.com/CustomerPortal/Portal/TrialLicense.aspx
        dynamsoft.dbrEnv.licenseKey = "t0068MgAAAITeFdSNvIYpkFMgjUw9+ssQhJwCsd78AhMIVO6NOdYfu1TQcDLwJvtO7y5bgYrZZXrq11jkf5UVL5Y5CVpb9nU=";
</script>
```

Decode barcodes from an input file:

```javascript
reader.decodeFileInMemory(files[0]).then(results=>{
                var txts = [];
                for(var i=0; i < results.length; ++i){
                    txts.push(results[i].BarcodeText);
                }
                alert(txts.join("\n"));
            }).catch(ex=>{
                console.log(ex);
            });
```

Decode barcodes from the memory buffer:

```javascript
var rawImgData = new Blob(['xxxxxxx']);
var width = 100;
var height = 200;
reader.decodeBuffer(rawImgData, width, height, width * 4, dynamsoft.BarcodeReader.EnumImagePixelFormat.IPF_ARGB_8888).then(results=>{
    for(var i = 0; i < results.length; ++i){
        console.log(results[i].BarcodeText);
    }
});
```

## Deployment

If you want to deploy the SDK by yourself, download the [dist package](https://www.dynamsoft.com/Downloads/Dynamic-Barcode-Reader-Download.aspx?edition=js)(version 6.3.0.1).

### Configure the MIME Type in your web server

* set mimetype in nginx: [mime.types](https://www.nginx.com/resources/wiki/start/topics/examples/full/#mime-types)

* set mimetype in asp.net: [Web.config](https://github.com/dynamsoft-dbr/javascript-barcode/blob/master/documents/conf/Web.config)

* set mimetype in javaee web app: [web.xml](https://github.com/dynamsoft-dbr/javascript-barcode/blob/master/documents/conf/web.xml)
    
* set mimetype in nodejs: [npm mime](https://github.com/broofa/node-mime)

### Configuring HTTPS Web Servers

**Note: getUserMedia only works on secure origins. You have to run your camera apps with HTTPS. For the testing environment, you can use localhost.**

* nginx: [Configuring HTTPS servers](https://nginx.org/en/docs/http/configuring_https_servers.html)

* iis: [Create a Self Signed Certificate in IIS](https://aboutssl.org/how-to-create-a-self-signed-certificate-in-iis/)

* tomcat: [Setting Up SSL on Tomcat in 5 minutes](https://dzone.com/articles/setting-ssl-tomcat-5-minutes)

* nodejs: [npm tls](https://nodejs.org/docs/v0.4.1/api/tls.html)

### Edit the Path

Load `dbr-<version>.min.js` from your's server instead. Make sure `dbr-<version>.min.js` and `dbr-<version>.wasm` are in the same folder.

Modify `dynamsoft.dbrEnv.resourcesPath` to match the `dbr-<version>.min.js` path. Relative path is ok.

### Visit Your Page from Https

We insert a debug tool in our samples, you could click the button `console` in top right of the screen.

## Contact Us

If there is any questions, please feel free to contact <a href="mailto:support@dynamsoft.com?subject=DBR%20webassembly">support@dynamsoft.com</a>.
