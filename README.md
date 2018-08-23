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
Configure the MIME Type for your web server:

```xml
<mimeMap fileExtension=".wasm" mimeType="application/wasm" />
```

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