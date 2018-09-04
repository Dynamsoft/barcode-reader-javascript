# guide

- [Guide](guide.md)
- [API](api.md)

<br>

## Introduction

`DBR_WASM` uses [Webassembly](https://developer.mozilla.org/en-US/docs/WebAssembly) technology which requires a higher browser version.

In most browsers, you need to deploy page **to the site** and set `.wasm` `mimetype` to `application/wasm` on the server side to debug and run it.

> Since 6.3.0.1, we include `dbr-<version>.min.js` and `dbr-<version>.wasm` in samples by linking the resources to [online demo](https://demo.dynamsoft.com/dbr_wasm/barcode_reader_javascript.html).
>
> Thus you could open most samples(exception: decodeVideoInWorker) directly from the file browser now.
>
> The cdn is for evaluation purposes and it is not recommended for use in production environments.
>
> You can get the resources in `Dist` folder.

Please check the settings below for different environments.

* set mimetype in nginx: [mime.types](https://www.nginx.com/resources/wiki/start/topics/examples/full/#mime-types)

* set mimetype in asp.net: [web.config](conf/web.config)

* set mimetype in javaee web app: [web.xml](conf/web.xml)
    
* set mimetype in nodejs: [npm mime](https://github.com/broofa/node-mime)

On Firefox, you can open [decodeFileInMemory.html](../Samples/decodeFileInMemory/decodeFileInMemory.html) and debug/run directly from the file browser.

You may encounter this error when you run several other samples with video:

> [Deprecation] getUserMedia() no longer works on insecure origins. To use this feature, you should consider switching your application to a secure origin, such as HTTPS. See https://goo.gl/rStTGz for more details.

That's because most browsers today need to be deployed on https to use [getUserMedia](https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia). Below are some samples for configuring an HTTPS server.

* nginx: [Configuring HTTPS servers](https://nginx.org/en/docs/http/configuring_https_servers.html)

* iis: [Create a Self Signed Certificate in IIS](https://aboutssl.org/how-to-create-a-self-signed-certificate-in-iis/)

* tomcat: [Setting Up SSL on Tomcat in 5 minutes](https://dzone.com/articles/setting-ssl-tomcat-5-minutes)

* nodejs: [npm tls](https://nodejs.org/docs/v0.4.1/api/tls.html)

If you really need to access video on an http site, you can use our [DCS](https://www.dynamsoft.com/Products/webcam-sdk-features.aspx) product.

> ### For mobile browser 
>
> If you want to use DBR_WASM on your mobile browser (most developers is under this usage scenario), you need to be aware that the mobile devices' memory is very limited.
>
> Before decoding a large image, you'd better intercept or compress the image. It will prevent your site from crash though the decode rate will decrease.
>
> We provide a special interface for processing video [decodeVideo](api.md?#function-decodevideo) to capture and decode a small area of the video on the video.
>
> e.g. In [our demo](../Samples/decodeVideoWithSettings/barcode_reader_javascript.html), we crop a region of the video by default.

<br>

## Load

Put `dbr-<version>.min.js` and `dbr-<version>.wasm` in the same directory as your html page. Then, add the following code to the page.

```html
<script src="dbr-<version>.min.js"></script>
```

Now, you can load `DBR_WASM` to your application.

Note: 
Since the initialization is asynchronous, in order to get the information of the initiating completed accurately, it's better to add the following code:

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

You can now open the page and run it. It will take a long time to load the page for the first time. Because `dbr-<version>.min.js` will execute to download the whole `dbr-<version>.wasm` file and compile it. Please wait patiently for the loading to finish.

After loading successfully, if the browser supports [IndexedDB](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API), we will try to store the compiled result of `dbr-<version>.wasm` or the file itself in the browser cache locally. The workflow is as below.

First we will try to store the compiled result of the `WebAssembly.Module` type (currently only supported in FireFox and Edge, and other browsers will probably also add this feature in the future). The next time the page is loaded, it can be completed within seconds.

If the browsers don't support it, we will save the `dbr-<version>.wasm` file itself. It will take some time to compile when initializing next time. At least there is no need to download it again.

<br>

## Process the uploaded images

Please add an `input` lable to listen to `change` event so you can decode the uploaded images like the following.

```html
<input id="uploadImage" type="file" accept="image/bmp,image/jpeg,image/png,image/gif">
<script>
    document.getElementById('uploadImage').addEventListener('change', function(){
        var files = this.files;
        var reader = new dynamsoft.BarcodeReader();
        reader.decodeFileInMemory(files[0]).then(function(results){
            var txts = [];
            for(var i=0;i<results.length;++i){
                txts.push(results[i].BarcodeText);
            }
            alert(txts.join("\n"));
        })
        this.value = '';
    });
</script>
```

You will also need to set `licenseKey` in the below line. Click [the link](https://www.dynamsoft.com/CustomerPortal/Portal/TrialLicense.aspx) to get a try one.

```js
dynamsoft.dbrEnv.licenseKey = "<a license key>"
```

<br>

## Try and do it

Try to write your own page or visit [helloworld.html](../Samples/decodeFileInMemory/decodeFileInMemory.html) directly.

We insert a debug tool in our samples, you could click the button `console` in top right of the screen.

If there is any questions, please feel free to contact <a href="mailto:support@dynamsoft.com?subject=DBR%20webassembly">support@dynamsoft.com</a>.

<br>

## dbr-6.3.0.1 comparison between two builds

In version 6.3.0.1, our team compiled the C++ module of Dynamsoft Barcode Reader to WebAssembly, so that users can scan barcode with JavaScript at client-side. The new JavaScript edition is not matured, in that we are still juggling between speed and stability. Currently we are releasing it as a preview, with two builds.

Here is a comparison chart between the two:

|                                            |dbr-6.3.0.1                |dbr-6.3.0.1.mobile         |
|-                                           |-                          |-                          |
|arguments for compiling to .wasm            |allowed C++ try-catch      |disable C++ try-catch      |
|size of .wasm                               |5.47M                      |4.02M                      |
|download at initial visit<sup>1</sup>       |depends on network         |depends on network         |
|browser compile speed<sup>2</sup>           |slow                       |quick                      |
|memory needed during compiling              |large                      |medium                     |
|exceptions during reading                   |really few                 |medium                     |
|memory leak<sup>3</sup>                     |almost no memory leak      |possible                   |
|decode success rate                         |high                       |medium                     |
|decode upload image                         |suitable                   |not suitable               |
|one-off decoding in a video stream          |suitable                   |suitable                   |
|continuous scan in a video stream           |suitable                   |not suitable               |

Note:

1. Users only need to download the `.wasm` files at their first visit.
2. With Firefox and Edge, the browser supports caching compiled WebAssembly modules to `IndexedDB`, which allows users to store structured data on the client-side. So, from the second visit forward, the browser can finish page loading in a split second by retrieving the module file.<br>
   Chrome and Safari do not support the aforementioned caching mechanism. We can store the `.wasm` file to `IndexedDB`, but not the compiled module file. So compilation is required at every visit.
3. The mobile version skipped compilation of `try...catch` in C++ code, so some exceptions failed to be caught, resulting in possible memory leaks. When the memory leaks to a certain extent, the barcode scanning module will stop working due to insufficient memory. The leaked memory can be released when leaving or refreshing the web page. Therefore, the mobile version is not suitable for continuous decoding, but it can be used for one-off decoding.

In the next step, we will reduce the dependency on try...catch in C++ so as to combine the two versions into one, and work out a version that is fast to load and has a stable decoding capability.
