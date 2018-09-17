# guide

### Init DBR_WASM

Add the related files to your application

First, put `dbr-<version>.min.js` and `dbr-<version>.wasm` in the same directory as your html page. Then, add the following code to the page.

```html
<script src="dbr-<version>.min.js"></script>
```

Now, you can load `DBR_WASM` to your application.

Note:
Since the initialization is asynchronous, in order to get the information of the initiating completed accurately, it's better to add the following code

```html
<div id="divLoadInfo">loading...</div>
<script>
    dynamsoft = self.dynamsoft || {};
    dynamsoft.dbrEnv = dynamsoft.dbrEnv || {};
    dynamsoft.dbrEnv.onAutoLoadWasmSuccess = function(){
        document.getElementById('divLoadInfo').innerHTML="load dbr wasm success.";
    };
    dynamsoft.dbrEnv.onAutoLoadWasmError = function(status){
        document.getElementById('divLoadInfo').innerHTML="load wasm failed: "+status;
    };
</script>
```

You can now open the page and run it. It will take a long time to load the page for the first time. Because `dynamsoft.barcodereader.min.js` will execute to download the whole `dynamsoft.barcodereader.wasm` file and compile it. Please wait patiently for the loading to finish.

After loading successfully, if the browser supports [indexedDB](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API), we will try to store the compiled result of `dynamsoft.barcodereader.wasm` or the file itself in the browser cache locally. The workflow is as below.

First we will try to store the compiled result of the `WebAssembly.Module` type (currently only supported in FireFox and Edge, and other browsers will probably also add this feature in the future). The next time the page is loaded, it can be completed within seconds.

If the browsers don't support it, we will save the `dynamsoft.barcodereader.wasm` file itself. It will take some time to compile when initializing next time. At least there is no need to download it again.

### Process the uploaded images

Please add an `input` lable to listen to `change` event so you can decode the uploaded images like the following.

```html
<input id="uploadImage" type="file" accept="image/bmp,image/jpeg,image/png,image/gif">
    <script>
        document.getElementById('uploadImage').addEventListener('change', function(){
            var file = this.files[0];

            //blob to image
            var objUrl = URL.createObjectURL(file);
            var image = new Image();
            image.src = objUrl;

            image.onload = function(){

                //draw image to canvas
                var cvs = document.createElement('canvas');
                cvs.width = image.naturalWidth;
                cvs.height = image.naturalHeight;
                var ctx = cvs.getContext('2d');
                ctx.drawImage(image, 0, 0);
                URL.revokeObjectURL(objUrl);

                //get Uint8ClampedArray from canvas
                var data = ctx.getImageData(0,0,cvs.width,cvs.height).data;

                //decodeBuffer(source, width, height, stride, enumImagePixelFormat)
                var reader = new dynamsoft.BarcodeReader();
                reader.decodeBuffer(data, cvs.width, cvs.height, cvs.width * 4, 
                    dynamsoft.BarcodeReader.EnumImagePixelFormat.IPF_ARGB_8888
                ).then(results=>{
                    var txts = [];
                    for(let j=0;j<results.length;++j){
                        txts.push(results[j].BarcodeText);
                    }
                    alert(txts.join("\n"));
                }).catch(ex=>{
                    alert('decode fail: ' + (ex.message || ex));
                    throw ex;
                });
            };
            image.onerror = function(){
                alert("Can't convert the blob to image.");
            };

            this.value = '';
        });
    </script>
```

You will also need to set `licenseKey` in the below line. Click [the link](https://www.dynamsoft.com/CustomerPortal/Portal/TrialLicense.aspx) to get a try one.

```js
dynamsoft.dbrEnv.licenseKey = "<a license key>"
```

## Try and do it

Try to write your own page. If there are any questions, please feel free to contact support@dynamsoft.com.
