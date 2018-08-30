# Dynamsoft JavaScript Barcode SDK

Version 6.3

The repository aims to help developers get familiar with [Dynamsoft JavaScript Barcode SDK](https://www.dynamsoft.com/Products/barcode-recognition-javascript.aspx).

## License
Get the [trial license](https://www.dynamsoft.com/CustomerPortal/Portal/Triallicense.aspx).

## Contact Us
<support@dynamsoft.com>

## Online Demo
https://demo.dynamsoft.com/dbr_wasm/barcode_reader_javascript.html

## API Documentation
https://www.dynamsoft.com/help/Barcode-Reader-wasm/index.html

## HowTo
Load and initialize the barcode reader in HTML pages:

```html
<!-- light build -->
<script src="https://demo.dynamsoft.com/dbr_wasm/js/dbr-6.3.0.min.js"></script>
<!-- stable build -->
<!--<script src="https://demo.dynamsoft.com/dbr_wasm/js/dbr-6.3.0.stable.min.js"></script>-->
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
        dynamsoft.dbrEnv.licenseKey = "t0068MgAAAD2IrA1WJjiVx78RfaZ46qMyCY8DaqpvAD57z5QWkwVQkVwZEf7lE+M2QYbnPx9Fu/aFvCL1mz0Kh2YK0milUng=";
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
})

```

## Deployment
If you want to deploy the SDK by yourself, download the [dist package](https://www.dynamsoft.com/Downloads/Dynamic-Barcode-Reader-Download.aspx?edition=js).

Configure the MIME Type in your web server. In addition, you may need to enable [Cross-Origin Resource Sharing](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) (CORS). Here is an example for IIS configuration:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<configuration>
    <system.webServer>
        <httpProtocol>
            <customHeaders>
                <add name="Access-Control-Allow-Origin" value="*" />
            </customHeaders>
        </httpProtocol>
        <staticContent>
            <mimeMap fileExtension=".wasm" mimeType="application/wasm" />
        </staticContent>
    </system.webServer>
</configuration>
```

If you have [Node.js](https://nodejs.org/en/download/), create a web server with **express**.

```
cd examples
npm i express
node server.js
```

Open samples. For example

```
http://localhost:2018/barcode-scanner/barcode_reader_javascript_stable.html
http://localhost:2018/helloworld/helloworld.html

```

**Note: getUserMedia only works on secure origins. You have to run your camera apps with HTTPS. For the testing environment, you can use localhost.**

### Configuring HTTPS Web Servers
- [Nginx](https://nginx.org/en/docs/http/configuring_https_servers.html)
- [IIS](https://aboutssl.org/how-to-create-a-self-signed-certificate-in-iis/)
- [Tomcat](https://dzone.com/articles/setting-ssl-tomcat-5-minutes)
- [Node.js](https://nodejs.org/docs/v0.4.1/api/tls.html)