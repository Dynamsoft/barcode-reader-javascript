# Introduction

`DBR_WASM` uses [Webassembly](https://developer.mozilla.org/en-US/docs/WebAssembly) technology which requires a higher browser version.

In most browsers, you need to deploy page **to the site** and set `.wasm` `mimetype` to `application/wasm` on the server side to debug and run it. Please check the settings below for different environments.

* set mimetype in nginx: [mime.types](https://www.nginx.com/resources/wiki/start/topics/examples/full/#mime-types)

* set mimetype in asp.net: <a href="web.config.txt" target="_blank">web.config</a>

* set mimetype in javaee web app: <a href="WEB-INF/web.xml.txt" target="_blank">web.xml</a>
    
* set mimetype in nodejs: [npm mime](https://github.com/broofa/node-mime)

On Firefox, you can open the page and debug/run directly from the file browser

You may encounter this error when you run several other samples with video

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
> Before decoding a large image(e.g. in [our demo](https://demo.dynamsoft.com/dbr_wasm/barcode_reader_javascript.html), we have a limit of 480*480), you'd better intercept or compress the image. It will prevent your site from crash though the decode rate will decrease.
>
> We provide a special interface for processing video [decodeVideo](function-decodevideo.md) to capture and decode a small area of the video on the video.