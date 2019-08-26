(function (root, factory) {
    if(typeof self != 'undefined' && self.document){
        self.__dbrWasmCurrentScript__ = document.currentScript.src.substring(0, document.currentScript.src.lastIndexOf('/'));
        self.__dbrLicenseKey__ = document.currentScript.getAttribute('data-licenseKey');
        self.__dbrProductKeys__ = document.currentScript.getAttribute('data-productKeys');
        self.__dbrRuntimeLicenseKeys__ = document.currentScript.getAttribute('data-runtimeLicenseKeys');
    }
    if (typeof define === 'function' && (define.amd || define.cmd)) {
        // AMD || CMD. Register as an anonymous module.
        //_bDom store document.currentScript
        define(factory);
    } else if (typeof module === 'object' && module.exports) {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like environments that support module.exports,
        // like Node.
        let dbr = factory();
        module.exports = dbr;
    } else {
        // Browser globals (root is window)
        let dbr = factory();
        root.dynamsoft = root.dynamsoft || {};
        root.dynamsoft.BarcodeReader = dbr;
        root.dynamsoft.BarcodeScanner = dbr.Scanner;
        root.dynamsoft.EnumBarcodeFormat = dbr.EnumBarcodeFormat;
        root.dynamsoft.EnumErrorCode = dbr.EnumErrorCode;
        root.dynamsoft.EnumImagePixelFormat = dbr.EnumImagePixelFormat;
        root.dynamsoft.EnumResultType = dbr.EnumResultType;
        root.dynamsoft.EnumTerminateStage = dbr.EnumTerminateStage;
        root.dynamsoft.EnumConflictMode = dbr.EnumConflictMode;
        root.Dynamsoft = root.Dynamsoft || {};
        root.Dynamsoft.BarcodeReader = dbr;
        root.Dynamsoft.BarcodeScanner = dbr.Scanner;
        root.Dynamsoft.EnumBarcodeFormat = dbr.EnumBarcodeFormat;
        root.Dynamsoft.EnumErrorCode = dbr.EnumErrorCode;
        root.Dynamsoft.EnumImagePixelFormat = dbr.EnumImagePixelFormat;
        root.Dynamsoft.EnumResultType = dbr.EnumResultType;
        root.Dynamsoft.EnumTerminateStage = dbr.EnumTerminateStage;
        root.Dynamsoft.EnumConflictMode = dbr.EnumConflictMode;
        root.BarcodeReader = root.BarcodeReader || dbr;
        root.BarcodeScanner = root.BarcodeScanner || dbr.Scanner;
        root.dbr = root.dbr || dbr;
    }
}(this, function () {

var TaskQueue = (function(){ // eslint-disable-line
    var TaskQueue = function(){
        /// <summary>
        /// @class TaskQueue
        /// </summary>

        this._queue = [];
        this.isWorking = false;

        /// <param name="timeout" type="int">
        /// Timeout between task.
        /// Between the interval, other work can be done, such as UI-response work.
        /// </param>
        this.timeout = 100;
    };

    TaskQueue.prototype.push = function(task, context, args){
        /// <summary>
        /// Push task. If <span>!isWorking</span>, start the task queue automatically.
        /// </summary>

        this._queue.push({
            "task": task,
            "context": context,
            "args": args
        });
        if(!this.isWorking){
            this.next();
        }
    };

    TaskQueue.prototype.unshift = function(task, context, args){
        /// <summary>
        /// Push task. If <span>!isWorking</span>, start the task queue automatically.
        /// </summary>

        this._queue.unshift({
            "task": task,
            "context": context,
            "args": args
        });
        if(!this.isWorking){
            this.next();
        }
    };

    TaskQueue.prototype.next = function(){
        /// <summary>
        /// Do the next task.
        /// You need to call it manually in the end of your task.
        /// To assure <function>next</function> will be called,
        /// in some case you can put the function in <span>finally</span>,
        /// in other case you should carefully handle <span>setTimeout</span>.
        /// </summary>

        if(this._queue.length == 0){
            this.isWorking = false;
            return;
        }
        this.isWorking = true;
        var item = this._queue.shift();
        var task = item.task;
        var taskContext = item.context ? item.context : null;
        var taskArguments = item.args ? item.args : [];
        setTimeout(function(){
            task.apply(taskContext, taskArguments);
        }, this.timeout);
    };

    /*
    TaskQueue.test = function(){
        var taskQueue = new TaskQueue();
        var task = function(mess){
            console.log(mess);
            taskQueue.next();
        };
        for(var i = 0; i < 100; ++i){
            taskQueue.push(task, null, [i]);
        }
    };*/

    return TaskQueue;
})();
/* global __dbrWasmCurrentScript__ */
const dbrEnv = {};
if(typeof self != 'undefined'){
    dbrEnv._self = self;
    if(self.document){
        // in dom
        dbrEnv._bDom = true;
    }else{
        // in worker
        dbrEnv._bWorker = true;
    }
}else{
    // in nodejs
    dbrEnv._self = global;
    dbrEnv._bNodejs = true;
}
/**
 * author: meizz; modify: Keillion
 * https://blog.csdn.net/meizz/article/details/405708
 * */
const kUtilDateFormat = function(date, fmt){
    var o = {
        "M+" : date.getUTCMonth()+1,
        "d+" : date.getUTCDate(),
        "h+" : date.getUTCHours(),
        "m+" : date.getUTCMinutes(),
        "s+" : date.getUTCSeconds(),
        "q+" : Math.floor((date.getUTCMonth()+3)/3),
        "S"  : date.getUTCMilliseconds()
    };
    if(/(y+)/.test(fmt))
        fmt=fmt.replace(RegExp.$1, (date.getFullYear()+"").substr(4 - RegExp.$1.length));
    for(var k in o)
        if(new RegExp("("+ k +")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
    return fmt;
};
const BarcodeReader = (function(){ // eslint-disable-line
    const env = dbrEnv;
    const self = env._self;
    const BR = function(productKeys){
        productKeys = productKeys || BR.productKeys || BR.licenseKey || "";
        if(!(typeof productKeys == 'string' || typeof productKeys == 'object' && productKeys instanceof String)){
            throw TypeError("'Constructor BarcodeReader(productKeys)': Type of 'productKeys' should be 'String'.");
        }
        this._productKeys = productKeys;
        if(!BR.isLoaded()){
            throw Error("'Constructor BarcodeReader(productKeys)': Autoload haven't start or you want to call `loadWasm` manually.");
        }else if(env._bDom){
            // wait other to init
        }else{
            this._instance = new BR._BarcodeReaderWasm(productKeys);
            if(!this._instance){
                throw BR.BarcodeReaderException(BR.EnumErrorCode.DBR_NULL_REFERENCE, "Can't create BarcodeReader instance.");
            }else if(!productKeys && BR._runtimeLicenseResponse){
                //runtimeLicenseKeys
                this._runtimeLicenseKeys = BR.runtimeLicenseKeys;
                this._instance.InitSettingsFromServer(JSON.stringify({
                    key: BR.runtimeLicenseKeys,
                    licenseinfo: BR._runtimeLicenseResponse.licenseinfo,
                    bDebug: !!BR._bWasmRuntimeLicenseDebug,
                    initTime: kUtilDateFormat(new Date(), 'yyyyMMddhhmmss'),
                    //bNewDevice: BR._newuuid
                }));
                //delete BR._newuuid;
            }
        }
    };

    BR._jsVersion = "7.0.d5";
    BR._jsEditVersion = '20190729';
    BR.version = "loading...(JS " + BR._jsVersion + '.' + BR._jsEditVersion + ")";
    BR.isLoaded = function(){
        return this._loadWasmStatus == 'loaded';
    };
    BR._dbName = 'dynamsoft-dbr-wasm-' + BR._jsVersion;
    BR._DB = undefined;
    BR._licenseUrl = 'https://72.15.155.125/api/DbrLicense/WasmGetLicense';
    
    // start from dbr7.0
    BR.licenseKey = self.__dbrLicenseKey__;
    BR.productKeys = self.__dbrProductKeys__;
    BR.runtimeLicenseKeys = self.__dbrRuntimeLicenseKeys__;
    BR._runtimeLicenseResponse = undefined;
    //BR._runtimeLicenseInfo = undefined;
    BR._resourcesPath = (()=>{
        if(env._bDom){
            // __dbrWasmCurrentScript__ is defined in dbr-wasm-umd-head.txt
            // dbrESMCurrentScript will be replace in fixEsm.py
            return self.__dbrWasmCurrentScript__ ? __dbrWasmCurrentScript__ : __dbrESMCurrentScript__;//eslint-disable-line
        }else{
            //worker or node
            return undefined;
        }
    })();
    BR._workerName = undefined;
    BR._wasmjsName = undefined;
    BR._wasmName = undefined;
    BR._workerResourcePath = undefined;
    BR._wasmjsResourcePath = undefined;
    BR._wasmResourcePath = undefined;
    BR._isShowRelDecodeTimeInResults = false;
    BR._bCustomWorker = undefined;
    BR._bWithio = undefined;
    BR._onWasmDownloaded = undefined;
    BR._bLoadWorkerDirectlyFromUrl = undefined;
    BR._onLog = undefined;
    BR._canvasMaxWH = 4096;
    BR._bUseIndexDB = true;
    BR._bDebuggerInWorker = false;
    //BR._bWasmRuntimeLicenseDebug = false;
    BR._indexPostUrl = 0;
    //BR._newuuid = false;

    BR.createInstance = function(productKeys){
        return BR.loadWasm().then(() => {
            let barcodeReader = new BR(productKeys);
            if(env._bDom){
                return barcodeReader._createWorkerInstance();
            }else{
                return Promise.resolve(barcodeReader);
            }
        });
    };

    const workerCallbackDic = BR._workerCallbackDic = {};

    BR._loadWorker = function(){
        return new Promise((resolve,reject)=>{
            let jsName = BR._workerName || "dbr-"+BR._jsVersion+".min.js";
            if(BR._workerResourcePath || BR._resourcesPath){
                let path = BR._workerResourcePath || BR._resourcesPath;
                if(path.charAt(path.length - 1) != '/'){
                    path += '/';
                }
                if(BR._bLoadWorkerDirectlyFromUrl === undefined && location && location.origin && BR._resourcesPath.indexOf(location.origin) == 0){
                    BR._bLoadWorkerDirectlyFromUrl = true;
                }
                jsName = path + jsName;
            }
            Promise.resolve().then(()=>{
                if(!BR._bLoadWorkerDirectlyFromUrl){ // can load from cdn
                    return fetch(jsName).then(responese=>responese.blob()).then(blob=>URL.createObjectURL(blob));
                }else{ // CSP so need load directly, can't from cdn
                    return jsName;
                }
            }).then(workerUrl=>{
                let dbrWorker = BR._dbrWorker = new Worker(workerUrl);
                dbrWorker.onerror = ex => {
                    let errMsg = 'worker error, you should host the page in web service: '+ex.message;
                    if(BR._onLog)BR._onLog(errMsg);
                    reject(errMsg);
                };

                /*eslint-disable indent*/
                dbrWorker.onmessage = e => {
                    e = e.data;
                    switch(e.type){
                        case "log": {
                            if(BR._onLog)BR._onLog(e.message);
                            break;
                        }
                        case "load":{
                            if(e.success){
                                BR.version = e.version;
                                BR._defaultRuntimeSettings = e._defaultRuntimeSettings;
                                if(BR._onLog)BR._onLog('load dbr worker success');
                                resolve();
                            }else{
                                reject(e.exception);
                            }
                            if(!BR._bLoadWorkerDirectlyFromUrl){
                                // release objectUrl
                                URL.revokeObjectURL(workerUrl);
                            }
                            break;
                        }
                        case "task": {
                            try{
                                workerCallbackDic[e.id](e.body);
                                workerCallbackDic[e.id] = undefined;
                            }catch(ex){
                                workerCallbackDic[e.id] = undefined;
                                throw ex;
                            }
                            break;
                        }
                        default: {
                            if(BR._onLog)BR._onLog(e);
                        }
                    }
                };
                /*eslint-enable indent*/
                let reourcePathA = document.createElement('a');
                reourcePathA.href = BR._resourcesPath || './';
                let _wasmjsResourcePath = undefined;
                if(BR._wasmjsResourcePath){
                    let wasmjsPathA = document.createElement('a');
                    wasmjsPathA.href = BR._wasmjsResourcePath || './';
                    _wasmjsResourcePath = wasmjsPathA.href;
                }
                let _wasmResourcePath = undefined;
                if(BR._wasmResourcePath){
                    let wasmPathA = document.createElement('a');
                    wasmPathA.href = BR._wasmResourcePath || './';
                    _wasmResourcePath = wasmPathA.href;
                }
                dbrWorker.postMessage({type:"loadWorker",
                    _licenseUrl: BR._licenseUrl,
                    runtimeLicenseKeys: BR.runtimeLicenseKeys,
                    _resourcesPath: reourcePathA.href,
                    _wasmjsResourcePath: _wasmjsResourcePath,
                    _wasmResourcePath: _wasmResourcePath,
                    _bUseIndexDB: BR._bUseIndexDB,
                    _bDebuggerInWorker: BR._bDebuggerInWorker,
                    _bWasmRuntimeLicenseDebug: BR._bWasmRuntimeLicenseDebug,
                    origin: location.origin
                });
            }).catch(ex => {
                reject(ex);
            });
        });
    };

    BR.prototype._createWorkerInstance = function(){
        return new Promise((resolve, reject) => {
            let taskID = Math.random();
            workerCallbackDic[taskID] = response => {
                if(response.success){
                    if(response.instanceID){
                        this._instanceID = response.instanceID;
                        return resolve(this);
                    }else{
                        return reject(BR.BarcodeReaderException(BR.EnumErrorCode.DBR_NULL_REFERENCE, "Can't create BarcodeReader instance."));
                    }
                }else{
                    return reject(response.exception);
                }
            };
            BR._dbrWorker.postMessage({type:"createInstance","id":taskID,"productKeys":this._productKeys});
        });
    };

    BR.prototype.destroy = BR.prototype.deleteInstance = function(){
        if(this._instance){
            this._instance.delete();
        }else if(this._instanceID){
            return new Promise((resolve, reject) => {
                let taskID = Math.random();
                workerCallbackDic[taskID] = response => {
                    if(response.success){
                        return resolve();
                    }else{
                        return reject(response.exception);
                    }
                };
                BR._dbrWorker.postMessage({type:"deleteInstance","id":taskID,"instanceID":this._instanceID});
            });
        }
    };

    // Blob 
    BR.prototype._decodeBlob = function(blob, config){
        if(!(self.Blob && blob instanceof Blob)){
            return Promise.reject("'_decodeBlob(blob, config)': Type of 'blob' should be 'Blob'.");
        }
        if(env._bDom){
            let useObjurlToDrawBlobToImg = blob=>{
                return new Promise((resolve, reject)=>{
                    let objUrl = URL.createObjectURL(blob);
                    let image = new Image();
                    image.dbrObjUrl = objUrl;
                    image.src = objUrl;
                    image.onload = () => {
                        resolve(image);
                    };
                    image.onerror = () => {
                        reject(TypeError("'_decodeBlob(blob, config)': Can't convert the blob to image."));
                    };
                });
            };
            let imageBitmap;
            return (() => {
                //TODO createImageBitmap
                if(self.createImageBitmap){
                    return createImageBitmap(blob).then(img => {
                        imageBitmap = img;
                        return img;
                    }, useObjurlToDrawBlobToImg);
                }else{
                    return useObjurlToDrawBlobToImg(blob);
                }
            })().then(image => {
                return this._decodeImage(image, config);
            }).then(r => {
                if(imageBitmap){
                    imageBitmap.close();
                }
                return r;
            });
        }else{
            return new Promise(resolve => {
                let fr = new FileReader();
                fr.onload = () => {
                    resolve(fr.result);
                };
                fr.readAsArrayBuffer(blob);
            }).then(arrayBuffer => {
                return this._decodeArrayBuffer(arrayBuffer, config);
            });
        }
    };

    // ArrayBuffer
    BR.prototype._decodeArrayBuffer = function(arrayBuffer, config){
        if(!(self.arrayBuffer && arrayBuffer instanceof ArrayBuffer || self.Buffer && arrayBuffer instanceof Buffer)){
            return Promise.reject("'_decodeArrayBuffer(arrayBuffer, config)': Type of 'arrayBuffer' should be 'ArrayBuffer' or 'Buffer'.");
        }
        if(env._bDom){
            return this._decodeBlob(new Blob(arrayBuffer), config);
        }else{
            return this._decodeUint8Array(new Uint8Array(arrayBuffer), config);
        }
    };

    // Uint8Array
    BR.prototype._decodeUint8Array = function(uint8Array, config){
        if(!(self.Uint8Array && uint8Array instanceof Uint8Array) && !(self.Uint8ClampedArray && uint8Array instanceof Uint8ClampedArray)){
            return Promise.reject("'_decodeBlob(uint8Array, config)': Type of 'uint8Array' should be 'Uint8Array'.");
        }
        if(env._bDom){
            return this._decodeBlob(new Blob(uint8Array), config);
        }else{
            const templateName = config ? (config.templateName || "") : "";
            return new Promise((resolve)=>{
                if(BR._isShowRelDecodeTimeInResults){
                    let startTime = new Date().getTime();
                    let wasmRet = this._instance.DecodeFileInMemory(uint8Array, templateName);
                    let during = new Date().getTime() - startTime;
                    wasmRet = handleRetJsonString(wasmRet);
                    wasmRet._decodeTime = during;
                    return resolve(wasmRet);
                }else{
                    return resolve(handleRetJsonString(this._instance.DecodeFileInMemory(uint8Array, templateName)));
                }
            });
        }
    };

    // Image
    BR.prototype._decodeImage = function(image, config){
        config = config || {};
        return new Promise(resolve => {
            if(!(self.HTMLImageElement && image instanceof HTMLImageElement) && !(self.ImageBitmap && image instanceof ImageBitmap)){
                throw TypeError("'_decodeImage(image, config)': Type of 'image' should be 'HTMLImageElement or ImageBitmap'.");
            }
            if(image.crossOrigin && "anonymous" != image.crossOrigin){
                throw "cors";
            }
            resolve();
        }).then(() => {
            let imgW = image.naturalWidth || image.width;
            let imgH = image.naturalHeight || image.height;
            let cvs = document.createElement('canvas');
            let searchRegionCanvas = undefined;
            let maxNaturalWH = Math.max(imgW, imgH);
            let acceptW, acceptH; // for browser compability, more than BR._canvasMaxWH(default 4096) can not draw in canvas
            if(maxNaturalWH > BR._canvasMaxWH){
                let rate = BR._canvasMaxWH / maxNaturalWH;
                acceptW = Math.round(imgW * rate);
                acceptH = Math.round(imgH * rate);
            }else{
                acceptW = imgW;
                acceptH = imgH;
            }
            let ctx = cvs.getContext('2d');

            // the jpg has exif, may not in good position
            switch(config._videoOrientation){
            case 3:
                cvs.width = acceptW;
                cvs.height = acceptH;
                ctx.setTransform(-1,0,0,-1,acceptW,acceptH);
                break;
            case 6:
                cvs.width = acceptH;
                cvs.height = acceptW;
                ctx.setTransform(0,1,-1,0,acceptH,0);
                break;
            case 8:
                cvs.width = acceptH;
                cvs.height = acceptW;
                ctx.setTransform(0,-1,1,0,0,acceptW);
                break;
            default: // default 0 or undefined, No ratate
                cvs.width = acceptW;
                cvs.height = acceptH;
                break;
            }
            ctx.drawImage(image, 0, 0, acceptW, acceptH);
            
            if(config.sx || config.sy || config.sWidth || config.sHeight || config.dWidth || config.dHeight){
                // default
                let sx = 0, sy = 0, 
                    sWidth = cvs.width, sHeight = cvs.height, 
                    dWidth = cvs.width, dHeight = cvs.height;
                
                // get settings from config
                if(config.sx != undefined){
                    sx = config.sx;
                }
                if(config.sy != undefined){
                    sy = config.sy;
                }
                if(config.sWidth != undefined){
                    sWidth = config.sWidth;
                }
                if(config.sHeight != undefined){
                    sHeight = config.sHeight;
                }
                if(config.dWidth != undefined){
                    dWidth = config.dWidth;
                }
                if(config.dHeight != undefined){
                    dHeight = config.dHeight;
                }
                
                // change percentage to real
                if(sx > 0 && sx <= 1){
                    sx = Math.round(sx * cvs.width);
                }
                if(sy > 0 && sy <= 1){
                    sy = Math.round(sy * cvs.height);
                }
                if(sWidth <= 1){
                    sWidth = Math.round(sWidth * cvs.width);
                }
                if(sHeight <= 1){
                    sHeight = Math.round(sHeight * cvs.height);
                }
                if(dWidth <= 1){
                    dWidth = Math.round(dWidth * cvs.width);
                }
                if(dHeight <= 1){
                    dHeight = Math.round(dHeight * cvs.height);
                }

                searchRegionCanvas = document.createElement('canvas');
                let ctx = searchRegionCanvas.getContext('2d');
                ctx.drawImage(cvs,sx,sy,sWidth,sHeight,0,0,dWidth,dHeight);
            }

            if(image.dbrObjUrl){
                URL.revokeObjectURL(image.dbrObjUrl);
            }
            return this._decodeCanvas(searchRegionCanvas || cvs, config).then(results=>{
                if(config.bAddOriVideoCanvasToResult){
                    for(let result of results){
                        result.oriVideoCanvas = cvs;
                    }
                }
                if(config.bAddSearchRegionCanvasToResult){
                    for(let result of results){
                        result.searchRegionCanvas = searchRegionCanvas;
                    }
                }
                return results;
            });
        });
    };

    // HTMLCanvasElement
    BR.prototype._decodeCanvas = function(canvas, config){
        return new Promise(resolve => {
            if(!(self.HTMLCanvasElement && canvas instanceof HTMLCanvasElement)){
                throw TypeError("'_decodeCanvas(canvas, config)': Type of 'canvas' should be 'HTMLCanvasElement'.");
            }
            if(canvas.crossOrigin && "anonymous" != canvas.crossOrigin){
                throw "cors";
            }

            let ctx = canvas.getContext('2d');
            let data = ctx.getImageData(0,0,canvas.width,canvas.height).data;
            resolve(data);
        }).then(data => {
            return this._decodeRawImageUint8Array(data, canvas.width, canvas.height, canvas.width * 4, BR.EnumImagePixelFormat.IPF_ARGB_8888, config);
        });
    };

    // HTMLVideoElement
    BR.prototype._decodeVideo = BR.prototype.decodeVideo = function(video, config){
        let oriVideoCanvas;
        let searchRegionCanvas;
        config = config || {};
        return new Promise(resolve => {
            if(!(self.HTMLVideoElement && video instanceof HTMLVideoElement)){
                throw TypeError("'_decodeVideo(video [, config] )': Type of 'video' should be 'HTMLVideoElement'.");
            }
            if(video.crossOrigin && "anonymous" != video.crossOrigin){
                throw "cors";
            }

            // default
            let sx = 0, sy = 0, 
                sWidth = video.videoWidth, sHeight = video.videoHeight, 
                dWidth = video.videoWidth, dHeight = video.videoHeight;
            
            // get settings from config
            if(config.sx != undefined){
                sx = config.sx;
            }
            if(config.sy != undefined){
                sy = config.sy;
            }
            if(config.sWidth != undefined){
                sWidth = config.sWidth;
            }
            if(config.sHeight != undefined){
                sHeight = config.sHeight;
            }
            if(config.dWidth != undefined){
                dWidth = config.dWidth;
            }
            if(config.dHeight != undefined){
                dHeight = config.dHeight;
            }
            
            // change percentage to real
            if(sx > 0 && sx <= 1){
                sx = Math.round(sx * video.videoWidth);
            }
            if(sy > 0 && sy <= 1){
                sy = Math.round(sy * video.videoHeight);
            }
            if(sWidth <= 1){
                sWidth = Math.round(sWidth * video.videoWidth);
            }
            if(sHeight <= 1){
                sHeight = Math.round(sHeight * video.videoHeight);
            }
            if(dWidth <= 1){
                dWidth = Math.round(dWidth * video.videoWidth);
            }
            if(dHeight <= 1){
                dHeight = Math.round(dHeight * video.videoHeight);
            }

            // let imageBitmap = null;
            // if(self.ImageCapture){
            //     let imageCapture = new ImageCapture(video.srcObject.getVideoTracks()[0]);
            //     imageCapture.grabFrame
            // }

            if(config.bAddOriVideoCanvasToResult){
                oriVideoCanvas = document.createElement('canvas');
                oriVideoCanvas.width = video.videoWidth;
                oriVideoCanvas.height = video.videoHeight;
                oriVideoCanvas.getContext('2d').drawImage(video,0,0);
            }

            searchRegionCanvas = document.createElement('canvas');
            searchRegionCanvas.width = dWidth;
            searchRegionCanvas.height = dHeight;
            let ctx = searchRegionCanvas.getContext('2d');
            if(0 == sx && 0 == sy && video.videoWidth == sWidth && video.videoHeight == sHeight && video.videoWidth == dWidth && video.videoHeight == dHeight){
                ctx.drawImage(oriVideoCanvas||video,0,0);
            }else{
                ctx.drawImage(oriVideoCanvas||video,sx,sy,sWidth,sHeight,0,0,dWidth,dHeight);
            }

            resolve();
        }).then(()=>{
            const _config = JSON.parse(JSON.stringify(config));
            _config.sx = undefined;
            _config.sy = undefined;
            _config.sWidth = undefined;
            _config.sHeight = undefined;
            _config.dWidth = undefined;
            _config.dHeight = undefined;
            return this._decodeCanvas(searchRegionCanvas, config);
        }).then(results=>{
            if(config.bAddOriVideoCanvasToResult){
                for(let result of results){
                    result.oriVideoCanvas = oriVideoCanvas;
                }
            }
            if(config.bAddSearchRegionCanvasToResult){
                for(let result of results){
                    result.searchRegionCanvas = searchRegionCanvas;
                }
            }
            return results;
        });
    };

    // String // api match C#
    BR.prototype._decodeBase64 = BR.prototype.decodeBase64String = function(base64Str, config){
        if(!(typeof base64Str == 'string' || typeof base64Str == 'object' && base64Str instanceof String)){
            return Promise.reject("'decodeBase64(base64Str, config)': Type of 'base64Str' should be 'String'.");
        }
        if(base64Str.substring(0, 11) == "data:image/"){
            base64Str = base64Str.substring(base64Str.indexOf(',')+1);
        }
        return new Promise(resolve => {
            if(env._bNodejs){
                resolve(this._decodeArrayBuffer(Buffer.from(base64Str, 'base64'), config));
            }else{
                let binaryStr = atob(base64Str);
                let n = binaryStr.length;
                let u8arr = new Uint8Array(n);
                while(n--){
                    u8arr[n] = binaryStr.charCodeAt(n);
                }
                if(env._bDom){
                    resolve(this._decodeBlob(new Blob([u8arr]), config));
                }else{//worker
                    resolve(this._decodeUint8Array(u8arr, config));
                }
            }
        });
    };

    // String
    BR.prototype._decodeUrl = function(url, config){
        return new Promise((resolve, reject) => {
            if(!(typeof url == 'string' || typeof url == 'object' && url instanceof String)){
                throw TypeError("'_decodeUrl(url, config)': Type of 'url' should be 'String'.");
            }
            if(env._bNodejs){
                const http = url.startsWith('https') ? require('https') : require('http');
                http.get(url, res => {
                    if(200 == res.statusCode){
                        let data = [];
                        res.on('data', chunk => {
                            data.push(chunk);
                        }).on('end', () => {
                            //at this point data is an array of Buffers
                            //so Buffer.concat() can make us a new Buffer
                            //of all of them together
                            resolve(this._decodeArrayBuffer(Buffer.concat(data), config));
                        });
                    }else{
                        reject('http get fail, statusCode: '+res.statusCode);
                    }
                });
            }else{
                let http = new XMLHttpRequest();
                http.open("GET", url, true);
                http.responseType = env._bDom ? "blob" : 'arraybuffer';
                http.send();
                http.onloadend = () => {
                    env._bDom ? 
                        resolve(this._decodeBlob(http.response, config)) :
                        resolve(this._decodeArrayBuffer(http.response, config));
                };
                http.onerror = () => {
                    reject(http.error);
                };
            }
        });
    };

    // String
    BR.prototype._decodeFilePath = function(path, config){
        return new Promise((resolve, reject) => {
            if(!(typeof path == 'string' || typeof path == 'object' && path instanceof String)){
                throw TypeError("'_decodeFilePath(path, config)': Type of 'path' should be 'String'.");
            }
            const fs = require('fs');
            fs.readFile(path, (err, data) => {
                if(err){
                    reject(err);
                }else{
                    resolve(this._decodeArrayBuffer(data, config));
                }
            });
        });
    };

    // Blob
    BR.prototype._decodeRawImageBlob = function(buffer, width, height, stride, enumImagePixelFormat, config){
        return new Promise((resolve, reject) => {
            if(!(self.Blob && buffer instanceof Blob)){
                throw TypeError("'_decodeRawImageBlob(buffer, width, height, stride, enumImagePixelFormat, config)': Type of 'buffer' should be 'Blob'.");
            }
            let freader = new FileReader();
            freader.readAsArrayBuffer(buffer);
            freader.onload = () => {
                resolve(freader.result);
            };
            freader.onerror = () => {
                reject(freader.error);
            };
        }).then(arrayBuffer => {
            return this._decodeRawImageUint8Array(new Uint8Array(arrayBuffer), width, height, stride, enumImagePixelFormat, config);
        });
    };

    // ArrayBuffer
    BR.prototype._decodeRawImageArrayBuffer = function(buffer, width, height, stride, enumImagePixelFormat, config){
        return new Promise(resolve => {
            if(!(self.ArrayBuffer && buffer instanceof ArrayBuffer)){
                throw TypeError("'_decodeRawImageArrayBuffer(buffer, width, height, stride, enumImagePixelFormat, config)': Type of 'buffer' should be 'ArrayBuffer'.");
            }
            resolve();
        }).then(() => {
            return this._decodeRawImageUint8Array(new Uint8Array(buffer), width, height, stride, enumImagePixelFormat, config);
        });
    };

    // Uint8Array
    BR.prototype._decodeRawImageUint8Array = function(buffer, width, height, stride, enumImagePixelFormat, config){
        return new Promise(resolve => {
            if(!(self.Uint8Array && buffer instanceof Uint8Array) && !(self.Uint8ClampedArray && buffer instanceof Uint8ClampedArray)){
                throw TypeError("'_decodeRawImageUint8Array(buffer, width, height, stride, enumImagePixelFormat, config)': Type of 'buffer' should be 'Uint8Array'.");
            }
            resolve();
        }).then(() => {
            const templateName = config ? (config.templateName || "") : "";
            if(this._instance){
                let rawResults;

                let startTime = BR._isShowRelDecodeTimeInResults ? new Date().getTime() : undefined;
                try{
                    rawResults =  this._instance.DecodeBuffer(buffer, width, height, stride, enumImagePixelFormat, templateName);
                }catch(ex){
                    //self._errorbuffer = buffer;
                    setTimeout(() => {console.error('wasm error!');throw ex;},0);//eslint-disable-line
                    return Promise.reject(ex);
                }
                let during = BR._isShowRelDecodeTimeInResults ? (new Date().getTime() - startTime) : undefined;
                let results = handleRetJsonString(rawResults);
                if(BR._isShowRelDecodeTimeInResults){  results._decodeTime = during; }

                if(config.videoWidth && config.videoHeight){
                    // width & height from photo is not same as video
                    // need resize LocalizationResult
                    // think photo view size is bigger than video
                    let rate = 1, xMove = 0, yMove = 0;
                    if(width / height >= config.videoWidth / config.videoHeight){
                        rate = config.videoHeight / height;
                    }else{
                        rate = config.videoWidth / width;
                    }
                    xMove = (width * rate - config.videoWidth) / 2;
                    yMove = (height * rate - config.videoHeight) / 2;
                    for(let i = 0; i < results.length; ++i){
                        let loc = results[i].LocalizationResult;
                        loc.X1 = loc.X1 * rate - xMove;
                        loc.X2 = loc.X2 * rate - xMove;
                        loc.X3 = loc.X3 * rate - xMove;
                        loc.X4 = loc.X4 * rate - xMove;
                        loc.Y1 = loc.Y1 * rate - yMove;
                        loc.Y2 = loc.Y2 * rate - yMove;
                        loc.Y3 = loc.Y3 * rate - yMove;
                        loc.Y4 = loc.Y4 * rate - yMove;
                    }
                }

                return Promise.resolve(results);
            }else{
                // instance is in another worker
                return (() => {
                    if(this._instanceID){
                        return Promise.resolve();
                    }else{
                        return this._createWorkerInstance();
                    }
                })().then(() => {
                    if(null === this._runtimeSettings){
                        return new Promise((resolve, reject) => {
                            let taskID = Math.random();
                            workerCallbackDic[taskID] = response => {
                                if(response.success){
                                    this._runtimeSettings = undefined;
                                    return resolve();
                                }else{
                                    return reject(response.exception);
                                }
                            };
                            BR._dbrWorker.postMessage({type:"resetRuntimeSettings","id":taskID,"instanceID":this._instanceID});
                        });
                    }else{
                        return Promise.resolve();
                    }
                }).then(() => {
                    return new Promise((resolve, reject) => {
                        let taskID = Math.random();
                        workerCallbackDic[taskID] = response => {
                            if(response.success){
                                return resolve(response.results);
                            }else{
                                return reject(response.exception);
                            }
                        };
                        BR._dbrWorker.postMessage({type:"decodeRawImageUint8Array","id":taskID,"instanceID":this._instanceID,
                            body:{buffer:buffer,width:width,height:height,stride:stride,enumImagePixelFormat:enumImagePixelFormat,config:config},
                            "_isShowRelDecodeTimeInResults":BR._isShowRelDecodeTimeInResults});
                    });
                });
            }
        });
    };

    // Blob ArrayBuffer Uint8Array HTMLImageElement HTMLCanvasElement HTMLVideoElement base64 url
    BR.prototype.decode = BR.prototype.decodeFileInMemory = function(source, config){
        // let barcodeReader = this;
        if(self.Blob && source instanceof Blob){
            return this._decodeBlob(source, config);
        }else if(self.ArrayBuffer && source instanceof ArrayBuffer || self.Buffer && source instanceof Buffer){
            return this._decodeArrayBuffer(source, config);
        }else if((self.Uint8Array && source instanceof Uint8Array)||(self.Uint8ClampedArray && source instanceof Uint8ClampedArray)){
            return this._decodeUint8Array(source, config);
        }else if(self.HTMLImageElement && source instanceof HTMLImageElement || self.ImageBitmap && source instanceof ImageBitmap){
            return this._decodeImage(source, config);
        }else if(self.HTMLCanvasElement && source instanceof HTMLCanvasElement){
            return this._decodeCanvas(source, config);
        }else if(self.HTMLVideoElement && source instanceof HTMLVideoElement){
            return this._decodeVideo(source, config);
        }else if(typeof source == 'string' || source instanceof String){
            if(source.substring(0, 11) == "data:image/"){
                return this._decodeBase64(source, config);
            }else{
                if(env._bNodejs){
                    if(source.substring(0, 4) == 'http'){
                        return this._decodeUrl(source, config);
                    }else{
                        return this._decodeFilePath(source, config);
                    }
                }else{
                    return this._decodeUrl(source, config);
                }
            }
        }else{
            return Promise.reject(TypeError("'_decode(source, config)': Type of 'source' should be 'Blob', 'ArrayBuffer', 'Uint8Array', 'HTMLImageElement', 'HTMLCanvasElement', 'HTMLVideoElement', 'String(base64 with image mime)' or 'String(url)'."));
        }
    };

    // Blob ArrayBuffer Uint8Array
    BR.prototype._decodeRawImage = BR.prototype.decodeBuffer = function(source, width, height, stride, enumImagePixelFormat, config){
        if(self.Blob && source instanceof Blob){
            return this._decodeRawImageBlob(source, width, height, stride, enumImagePixelFormat, config);
        }else if(self.ArrayBuffer && source instanceof ArrayBuffer){
            return this._decodeRawImageArrayBuffer(source, width, height, stride, enumImagePixelFormat, config);
        }else if((self.Uint8Array && source instanceof Uint8Array)||(self.Uint8ClampedArray && source instanceof Uint8ClampedArray)){
            return this._decodeRawImageUint8Array(source, width, height, stride, enumImagePixelFormat, config);
        }else{
            return Promise.reject(TypeError("'_decodeRawImage(source, width, height, stride, enumImagePixelFormat, config)': Type of 'source' should be 'Blob', 'ArrayBuffer' or 'Uint8Array'."));
        }
    };

    let handleRetJsonString = BR._handleRetJsonString = function(wasmRet){
        let objRet = null;
        if(typeof wasmRet == 'string' || typeof wasmRet == 'object' && wasmRet instanceof String){
            objRet = JSON.parse(wasmRet);
        }else{
            objRet = wasmRet;
        }

        let e = BR.EnumErrorCode;
        /*eslint-disable indent*/
        switch(objRet.exception){
            case e.DBR_SUCCESS:
            case e.DBR_LICENSE_INVALID:
            case e.DBR_LICENSE_EXPIRED:
            case e.DBR_1D_LICENSE_INVALID:
            case e.DBR_QR_LICENSE_INVALID:
            case e.DBR_PDF417_LICENSE_INVALID:
            case e.DBR_DATAMATRIX_LICENSE_INVALID:
            case e.DBR_DBRERR_AZTEC_LICENSE_INVALID:
            case e.DBR_RECOGNITION_TIMEOUT:
                if(objRet.textResult){
                    for(let i = 0; i < objRet.textResult.length; ++i){
                        let aResult = objRet.textResult[i];
                        try{
                            if(env._bNodejs){
                                aResult.BarcodeText = Buffer.from(aResult.BarcodeText, 'base64').toString();
                            }else{
                                aResult.BarcodeText = atob(aResult.BarcodeText);
                            }
                        }catch(ex){
                            aResult.BarcodeText = "";
                        }
                    }
                }
                return objRet.textResult/* || objRet.Result || objRet.templateSettings*/ || objRet.settings || objRet.outputSettings || objRet;
            default: 
                throw BR.BarcodeReaderException(objRet.exception, objRet.description);
        }
        /*eslint-enable indent*/
    };

    BR.prototype.getAllParameterTemplateNames = function(){
        return handleRetJsonString(this._instance.GetAllParameterTemplateNames());
    };

    BR.prototype.getRuntimeSettings = function(){
        if(this._instance){
            return handleRetJsonString(this._instance.GetRuntimeSettings());
        }else if(this._runtimeSettings){
            return JSON.parse(this._runtimeSettings);
        }else{
            return JSON.parse(BR._defaultRuntimeSettings);
        }
    };

    BR.prototype.updateRuntimeSettings = function(settings){
        let //settingsObj, 
            settingsStr;
        if(typeof settings == 'string' || typeof settings == 'object' && settings instanceof String){ // string
            //settingsObj = JSON.parse(settings);
            settingsStr = settings;
        }else if(typeof settings == 'object'){// object
            //settingsObj = settings;
            settingsStr = JSON.stringify(settings);
        }else{ // other
            throw TypeError("'UpdateRuntimeSettings(settings)': Type of 'settings' should be 'String' or 'PlainObject'.");
        }
        if(this._instance){
            //update dbr in main thread
            try{
                handleRetJsonString(this._instance.UpdateRuntimeSettings(settingsStr));
                return Promise.resolve();
            }catch(ex){
                return Promise.reject(ex);
            }
        }else{
            // update dbr in worker
            return Promise.resolve().then(() => {
                if(this._instanceID){
                    return Promise.resolve();
                }else{
                    return this._createWorkerInstance();
                }
            }).then(() => {
                return new Promise((resolve, reject) => {
                    let taskID = Math.random();
                    workerCallbackDic[taskID] = response => {
                        if(response.success){
                            this._runtimeSettings = settingsStr;
                            return resolve();
                        }else{
                            return reject(response.exception);
                        }
                    };
                    BR._dbrWorker.postMessage({type:"updateRuntimeSettings","id":taskID,"instanceID":this._instanceID,body:{settings:settingsStr}});
                });
            }).catch(ex=>{
                return Promise.reject(ex);
            });
        }
    };

    BR.prototype.resetRuntimeSettings = function(){
        this._instance ? handleRetJsonString(this._instance.ResetRuntimeSettings()) : this._runtimeSettings = null;
    };

    BR.prototype.outputSettingsToString = function(templateName){
        templateName = templateName || "";
        return handleRetJsonString(this._instance.OutputSettingsToString(templateName));
    };

    // String / plain object
    BR.prototype.initRuntimeSettingsWithString = function(template, enumComflictMode){
        if(typeof template == 'string' || typeof template == 'object' && template instanceof String){ // string
        }else if(typeof template == 'object'){// object
            template = JSON.stringify(template);
        }else{ // other
            throw TypeError("'initRuntimeSettingstWithString(template, enumComflictMode)': Type of 'template' should be 'String' or 'PlainObject'.");
        }
        handleRetJsonString(this._instance.InitRuntimeSettingstWithString(template, enumComflictMode?enumComflictMode:2));
    };

    // Barcode Format
    BR.EnumBarcodeFormat = (function(){
        let f = {};

        f.All = 0x1e0007ff;
        f.OneD = 0x7FF;
        f.CODE_39 = 0x1;
        f.CODE_128 = 0x2;
        f.CODE_93 = 0x4;
        f.CODABAR = 0x8;
        f.ITF = 0x10;
        f.EAN_13 = 0x20;
        f.EAN_8 = 0x40;
        f.UPC_A = 0x80;
        f.UPC_E = 0x100;
        f.INDUSTRIAL_25 = 0x200;
        f.CODE_39_EXTENDED = 0x400;
        f.PDF417 = 0x2000000;
        f.QR_CODE = 0x4000000;
        f.DATAMATRIX = 0x8000000;
        f.AZTEC = 0x10000000;

        return f;
    })();

    // Error Code
    BR.EnumErrorCode = (function(){
        let e = {};
        
        e.DBR_SYSTEM_EXCEPTION = 1;
        e.DBR_SUCCESS = 0;
        e.DBR_UNKNOWN = -10000;
        e.DBR_NO_MEMORY = -10001;
        e.DBR_NULL_REFERENCE = -10002;
        e.DBR_LICENSE_INVALID = -10003;
        e.DBR_LICENSE_EXPIRED = -10004;
        e.DBR_FILE_NOT_FOUND = -10005;
        e.DBR_FILETYPE_NOT_SUPPORTED = -10006;
        e.DBR_BPP_NOT_SUPPORTED = -10007;
        e.DBR_INDEX_INVALID = -10008;
        e.DBR_BARCODE_FORMAT_INVALID = -10009;
        e.DBR_CUSTOM_REGION_INVALID = -10010;
        e.DBR_MAX_BARCODE_NUMBER_INVALID = -10011;
        e.DBR_IMAGE_READ_FAILED = -10012;
        e.DBR_TIFF_READ_FAILED = -10013;
        e.DBR_QR_LICENSE_INVALID = -10016;
        e.DBR_1D_LICENSE_INVALID = -10017;
        e.DBR_DIB_BUFFER_INVALID = -10018;
        e.DBR_PDF417_LICENSE_INVALID = -10019;
        e.DBR_DATAMATRIX_LICENSE_INVALID = -10020;
        e.DBR_PDF_READ_FAILED = -10021;
        e.DBR_PDF_DLL_MISSING = -10022;
        e.DBR_PAGE_NUMBER_INVALID = -10023;
        e.DBR_CUSTOM_SIZE_INVALID = -10024;
        e.DBR_CUSTOM_MODULESIZE_INVALID = -10025;
        e.DBR_RECOGNITION_TIMEOUT = -10026;
        e.DBR_JSON_PARSE_FAILED = -10030;
        e.DBR_JSON_TYPE_INVALID = -10031;
        e.DBR_JSON_KEY_INVALID = -10032;
        e.DBR_JSON_VALUE_INVALID = -10033;
        e.DBR_JSON_NAME_KEY_MISSING = -10034;
        e.DBR_JSON_NAME_VALUE_DUPLICATED = -10035;
        e.DBR_TEMPLATE_NAME_INVALID = -10036;
        e.DBR_JSON_NAME_REFERENCE_INVALID = -10037;
        e.DBR_PARAMETER_VALUE_INVALID = -10038;
        e.DBR_DOMAIN_NOT_MATCHED = -10039;
        e.DBR_RESERVEDINFO_NOT_MATCHED = -10040;
        e.DBR_DBRERR_AZTEC_LICENSE_INVALID = -10041;

        return e;
    })();

    // Image Pixel Format
    BR.EnumImagePixelFormat = (function(){
        let f = {};

        f.IPF_Binary = 0;
        f.IPF_BinaryInverted = 1;
        f.IPF_GrayScaled = 2;
        f.IPF_NV21 = 3;
        f.IPF_RGB_565 = 4;
        f.IPF_RGB_555 = 5;
        f.IPF_RGB_888 = 6;
        f.IPF_ARGB_8888 = 7;
        f.IPF_RGB_161616 = 8;
        f.IPF_ARGB_16161616 = 9;

        return f;
    })();

    // Result Type
    BR.EnumResultType = (function(){
        let t = {};

        t.EDT_StandardText = 0;
        t.EDT_RawText = 1;
        t.EDT_CandidateText = 2;
        t.EDT_PartialText = 3;

        return t;
    })();

    // Terminate Stage
    BR.EnumTerminateStage = (function(){
        let t = {};

        t.ETS_Prelocalized = 0;
        t.ETS_Localized = 1;
        t.ETS_Recognized = 2;

        return t;
    })();

    // ConflictMode
    BR.EnumConflictMode = (function(){
        let c = {};

        c.ECM_Ignore = 1;
        c.ECM_Overwrite = 2;

        return c;
    })();

    // BarcodeReaderException
    BR.BarcodeReaderException = (function(){
        let BarcodeReaderException = function(){
            let ex;
            let ag0 = arguments[0],
                ag1 = arguments[1],
                code = BR.EnumErrorCode.DBR_UNKNOWN;
            if(typeof ag0 == "number"){
                code = ag0;
                ex = new Error(ag1);
            }else{
                ex = new Error(ag0);
            }
            ex.code = code;
            return ex;
        };
    
        return BarcodeReaderException;
    })();

    return BR;
})();
const Dynamsoft = BarcodeReader;
Dynamsoft.BarcodeReader = BarcodeReader; // when export BarcodeReader, have the struct { BarcodeReader: {BarcodeReader, BarcodeScanner} }

/*============================================== worker ===============================================*/
if(dbrEnv._bWorker && 
    !BarcodeReader._bCustomWorker && !dbrEnv._self.onmessage){(function(){
    
    const env = dbrEnv;
    const self = env._self;
    const BR = BarcodeReader;
    // it is true that dbr-<version>.js load self as worker

    BR._onLog = BR._onLog || function(anything){
        if(self.onmessage != BR._onWorkerMessage){
            // it must be custom `onmessage`, don't run _onLog anymore
            BR._onLog = undefined;
            return;
        }
        let str = undefined;
        if(undefined === anything){
            str = 'undefined';
        }else{
            try{
                str = JSON.stringify(anything, (function(){  
                    let cache = [];
                    let keyCache = [];
                    return function(key, value) {
                        if (typeof value === 'object' && value !== null) {
                            let index = cache.indexOf(value);
                            if (index !== -1) {
                                return '[Circular ' + keyCache[index] + ']';
                            }
                            cache.push(value);
                            keyCache.push(key || 'root');
                        }
                        return value;
                    };
                })());
            }catch(ex){/**/}
            if(undefined === str || '{}' === str){
                str = anything.toString();
            }
        }
        try{
            postMessage({
                type: "log",
                message: str
            });
        }catch(ex){//some message can't send by worker
            if(self.console)console.error(message);//eslint-disable-line
        }
    };

    BR._onLog("have detected in worker: "+BR.version);

    const instanceDic = {};

    self.onmessage = BR._onWorkerMessage = function(e){
        e = e.data;
        /*eslint-disable indent*/
        switch(e.type){
            case "loadWorker": {(function(){
                BR._licenseUrl = e._licenseUrl;
                BR.runtimeLicenseKeys = e.runtimeLicenseKeys;
                BR._resourcesPath = e._resourcesPath;
                BR._wasmjsResourcePath = e._wasmjsResourcePath;
                BR._wasmResourcePath = e._wasmResourcePath;
                BR._bUseIndexDB = e._bUseIndexDB;
                if(e._bDebuggerInWorker){debugger;}//eslint-disable-line
                BR._bWasmRuntimeLicenseDebug = e._bWasmRuntimeLicenseDebug;
                self.__dbrOrigin = e.origin;
                BR.loadWasm().then(function(){
                    postMessage({type:"load",success:true,version:BR.version,_defaultRuntimeSettings:BR._defaultRuntimeSettings});
                },function(ex){
                    postMessage({type:"load",success:false,exception:ex.message||ex});
                });
            })();break;}
            // case "loadModuleInWorker": {(function(){
            //     BR.loadModule(e.moduleName).then(()=>{
            //         postMessage({type:"task", id: e.id, body: {success: true}});
            //     },(ex)=>{
            //         postMessage({type:"task", id: e.id, body: {success: false, exception: ex.message||ex}});
            //     });
            // })();break;}
            case "createInstance": {(function(){
                try{
                    let instanceID = Math.random();
                    instanceDic[instanceID] = new BR(e.productKeys);
                    postMessage({type:"task", id: e.id, body: {success: true, instanceID: instanceID}});
                }catch(ex){
                    postMessage({type:"task", id: e.id, body: {success: false, exception: ex.message||ex}});
                }
            })();break;}
            case "deleteInstance": {(function(){
                try{
                    instanceDic[e.instanceID].deleteInstance();
                    instanceDic[e.instanceID] = undefined;
                    postMessage({type:"task", id: e.id, body: {success: true}});
                }catch(ex){
                    postMessage({type:"task", id: e.id, body: {success: false, exception: ex.message||ex}});
                }
            })();break;}
            case "decodeRawImageUint8Array": {(function(){
                try{
                    BR._isShowRelDecodeTimeInResults = e._isShowRelDecodeTimeInResults;
                    let bd = e.body;
                    instanceDic[e.instanceID]._decodeRawImageUint8Array(bd.buffer, bd.width, bd.height, bd.stride, bd.enumImagePixelFormat, bd.config).then(results=>{
                        postMessage({type:"task", id: e.id, body: {success: true, results: results}});
                    }).catch(ex=>{
                        postMessage({type:"task", id: e.id, body: {success: false, exception: ex.message||ex}});
                    });
                }catch(ex){
                    postMessage({type:"task", id: e.id, body: {success: false, exception: ex.message||ex}});
                }
            })();break;}
            case "getRuntimeSettings": {(function(){
                try{
                    let settings = instanceDic[e.instanceID].getRuntimeSettings();
                    postMessage({type:"task", id: e.id, body: {success: true, settings: settings}});
                }catch(ex){
                    postMessage({type:"task", id: e.id, body: {success: false, exception: ex.message||ex}});
                }
            })();break;}
            case "updateRuntimeSettings": {(function(){
                try{
                    instanceDic[e.instanceID].updateRuntimeSettings(e.body.settings);
                    postMessage({type:"task", id: e.id, body: {success: true}});
                }catch(ex){
                    postMessage({type:"task", id: e.id, body: {success: false, exception: ex.message||ex}});
                }
            })();break;}
            case "resetRuntimeSettings": {(function(){
                try{
                    instanceDic[e.instanceID].resetRuntimeSettings();
                    postMessage({type:"task", id: e.id, body: {success: true}});
                }catch(ex){
                    postMessage({type:"task", id: e.id, body: {success: false, exception: ex.message||ex}});
                }
            })();break;}
            case "clearCache": {(function(){
                try{
                    BR.clearCache();
                    postMessage({type:"task", id: e.id, body: {success: true}});
                }catch(ex){
                    postMessage({type:"task", id: e.id, body: {success: false, exception: ex.message||ex}});
                }
            })();break;}
            default: {
                postMessage({type:"task", id: e.id, body: {success: false, exception: "No such task."}});
            }
        }
        /*eslint-enable indent*/
    };
})();}

/* global BarcodeReader, dbrEnv, TaskQueue, importScripts, _dbrLoadWasm*/
(function(){
    const env = dbrEnv;
    const self = env._self;
    const BR = BarcodeReader;
    BR.loadWasm = function(){return new Promise(function(resolveOuter, rejectOuter){

        // have loaded, good!
        if('loaded' == BR._loadWasmStatus){
            return resolveOuter();
        }
        // queue to load wasm
        BR._loadWasmTaskQueue.push(function(bWasmLoadingWhenPush){
            if('loaded' == BR._loadWasmStatus){
                BR._loadWasmTaskQueue.next();
                return resolveOuter();
            }else if(bWasmLoadingWhenPush){
                BR._loadWasmTaskQueue.next();
                return rejectOuter(BR._loadWasmStatus);
            }else{ // need load in this task
                BR._loadWasmStatus = 'loading';
                // inner load promise
                return new Promise(function(resolve, reject){

                    //pre define constructor
                    BR._BarcodeReaderWasm = function(){
                        throw Error("'Constructor BarcodeReader(productKeys)': The wasm hasn't finish loading.");
                    };

                    let bWasmValid = !!self.WebAssembly && 
                        (typeof navigator == 'undefined' ||
                        !(/Safari/.test(navigator.userAgent) && 
                        !/Chrome/.test(navigator.userAgent) && 
                        /\(.+\s11_2_([2-6]).*\)/.test(navigator.userAgent)));
                    if(!bWasmValid){
                        throw Error("'Constructor BarcodeReader(productKeys)': The browser doesn't support Webassembly.");
                    }

                    if(env._bDom){
                        return BR._loadWorker().then(function(){
                            return resolve();
                        },function(ex){
                            BR._BarcodeReaderWasm = function(){
                                throw Error("'Constructor BarcodeReader(productKeys)': The wasm load failed. ex: " + (ex.message || ex));
                            };
                            return reject(ex);
                        });
                    }

                    let Module = {};
                    Module.locateFile = function(){
                        let wasmName = BR._wasmName;
                        if(BR._wasmResourcePath || BR._resourcesPath){
                            let path = BR._wasmResourcePath || BR._resourcesPath;
                            if(path.charAt(path.length - 1) != '/'){
                                path += '/';
                            }
                            wasmName = path + wasmName;
                        }else if(env._bNodejs){
                            const path = require('path');
                            wasmName = path.join(__dirname, wasmName);
                        }
                        return wasmName;
                    };
                    Module.onRuntimeInitialized = function(){
                        BR._BarcodeReaderWasm = Module.BarcodeReaderWasm;
                        let instance = new Module.BarcodeReaderWasm("");
                        BR.version = instance.GetVersion() + "(JS " + BR._jsVersion + '.' + BR._jsEditVersion + ")";
                        BR._defaultRuntimeSettings = JSON.stringify(BR._handleRetJsonString(instance.GetRuntimeSettings()));
                        instance.delete();
                        if(BR._onLog)BR._onLog('load dbr wasm success, version: '+BR.version);
                        
                        if(env._bNodejs){
                            resolve();
                        }else{
                            //todo: restruct
                            promiseTryGetLicenseinfoFromKey.then(()=>{
                                resolve();
                            },ex=>{
                                reject(ex);
                            });
                        }
                    };
                    Module.onExit = Module.onAbort = function(ex){
                        if(BR._onLog){
                            BR._onLog(ex);
                        }
                        BR._BarcodeReaderWasm = function(){
                            throw Error("'Constructor BarcodeReader(productKeys)': The wasm load failed. Error: " + (ex.message || ex));
                        };
                        reject(ex);
                    };
                    Module.print = function(str){
                        if(BR._onLog){
                            BR._onLog(str);
                        }
                    };
                    if(typeof _dbrLoadWasm == 'undefined'){
                        // init settings about with or without io
                        if(BR._bWithio == undefined){
                            BR._bWithio = env._bNodejs || env._bWorker && (BR._bCustomWorker || self.onmessage != BR._onWorkerMessage);
                        }
                        BR._wasmjsName = BR._wasmjsName || "dbr-"+BR._jsVersion+".wasm"+(BR._bWithio?".withio":"")+".min.js";
                        BR._wasmName = BR._wasmName || "dbr-"+BR._jsVersion+(BR._bWithio?".withio":"")+".wasm";

                        // load wasm.js
                        let wasmjsName = BR._wasmjsName;
                        if(BR._wasmjsResourcePath || BR._resourcesPath){
                            let path = BR._wasmjsResourcePath || BR._resourcesPath;
                            if(path.charAt(path.length - 1) != '/'){
                                path += '/';
                            }
                            wasmjsName = path + wasmjsName;
                        }else if(env._bNodejs){
                            const path = require('path');
                            wasmjsName = path.join(__dirname, wasmjsName);
                        }
                        if(env._bWorker){
                            importScripts(wasmjsName);
                        }else{//nodejs
                            _dbrLoadWasm = require(wasmjsName);//eslint-disable-line
                        }
                    }
                    _dbrLoadWasm(Module, _kInstantiateCachedURL, BR);
                }).then(function(){
                    BR._loadWasmStatus = 'loaded';
                    BR._loadWasmTaskQueue.next();
                    resolveOuter();
                }).catch(function(ex){
                    BR._loadWasmStatus = ex;
                    BR._loadWasmTaskQueue.next();
                    rejectOuter(ex);
                });
            }
        }, null, ['loading' == BR._loadWasmStatus]);
    });};

    // a task queue for multiple load task
    BR._loadWasmTaskQueue = (function(){
        let t = new TaskQueue();
        t.timeout = 0;
        return t;
    })();

    BR._openDb = function(){
        let BR = this;
        return new Promise((resolveDB, rejectDB)=>{
            let buildDBStruct = () => { 
                request.result.createObjectStore('info');
                request.result.createObjectStore('wasm');
                request.result.createObjectStore('license');
                request.result.createObjectStore('consume');
            };
            let openErrStr = 'open db [' + BR._dbName + '] fail';
            let request = indexedDB.open(BR._dbName,1);
            request.onupgradeneeded = buildDBStruct;
            request.onsuccess = () => { BR._DB = request.result;resolveDB(request.result); };
            request.onerror = () => {
                let errDetailStr = request.error.message || request.error;
                if(errDetailStr.indexOf("version") != -1){
                    // ERR_VER only happened when we change db struct in different dbr-wasm version
                    request = indexedDB.deleteDatabase(BR._dbName);
                    request.onsuccess = () => {
                        let request = indexedDB.open(BR._dbName,1);
                        request.onupgradeneeded = buildDBStruct;
                        request.onsuccess = () => { BR._DB = request.result;resolveDB(request.result); };
                        request.onerror = () => { rejectDB(openErrStr); };
                    };
                    request.onerror = () => { rejectDB(openErrStr); };
                }else{
                    rejectDB(openErrStr + ': '+errDetailStr);
                }
            };
        });
    };

    BR._lookupInDatabase = ((db, storeName, key)=> {
        return new Promise((resolveDB, rejectDB) => {
            let store = db.transaction([storeName]).objectStore(storeName);
            let request = key ? store.get(key) : store.getAll();
            request.onsuccess = () => {
                if (request.result)
                    resolveDB(request.result);
                else
                    rejectDB(key+' was not found in '+storeName);
            };
        });
    });

    BR._storeInDatabase = ((db, storeName, key, data) => {
        return new Promise((resolveDB, rejectDB)=>{
            let store = db.transaction([storeName], 'readwrite').objectStore(storeName);
            let request = store.put(data, key);
            request.onerror = () => { 
                rejectDB('Failed to store '+key+' in indexDB: '+(request.error.message||request.error));
            };
            request.onsuccess = () => { 
                resolveDB('Successfully stored '+key+' in '+storeName);
            };
        });
    });

    BR._deleteInDatabase = ((db, storeName, key) => {
        return new Promise((resolveDB, rejectDB)=>{
            let store = db.transaction([storeName], 'readwrite').objectStore(storeName);
            let request = key ? store.delete(key) : store.clear();
            request.onerror = () => { 
                rejectDB('Failed to delete '+key+' in indexDB: '+(request.error.message||request.error));
            };
            request.onsuccess = () => { 
                resolveDB('Successfully delete '+key+' in '+storeName);
            };
        });
    });

    const _kInstantiateCachedURL = function(version, url, importObject) {

        if(BR._onLog){BR._onLog('start handle dbr wasm, version: ' + version);}
        let startHandleDbrWasmTime = new Date().getTime();

        if(env._bNodejs){
            return new Promise((resolve, reject)=>{
                const fs = require('fs');
                fs.readFile(url, function(err, data){
                    if(err){return reject(err);}
                    let startBuildTime = new Date().getTime();
                    resolve(WebAssembly.instantiate(data, importObject).then(result=>{
                        if(BR._onLog){BR._onLog('build instance from binary timecost: '+(new Date().getTime() - startBuildTime));}
                        if(BR._onLog){BR._onLog('finish handle dbr wasm, total timecost: '+(new Date().getTime() - startHandleDbrWasmTime));}
                        return Promise.resolve(result);
                    }));
                });
            });
        }

        // normal web env

        let testIfSupportStoreModuleInDb = function(db){
            let bSupportStoreModuleInDb_Key = 'bSupportStoreModuleInDb';
            return new Promise((resolveTest, rejectTest)=>{
                let storeReadonly = db.transaction(['info']).objectStore('info');//, 'readwrite'
                let request = storeReadonly.get(bSupportStoreModuleInDb_Key);

                let tryStoreModule = ()=>{
                    let store = db.transaction(['info'], 'readwrite').objectStore('info');
                    let bytes = new Uint8Array([
                        0x00,0x61,0x73,0x6d, 0x01,0x00,0x00,0x00, 0x01,0x05,0x01,0x60, 0x00,0x01,0x7f,0x03,
                        0x02,0x01,0x00,0x07, 0x06,0x01,0x02,0x5f, 0x61,0x00,0x00,0x0a, 0x06,0x01,0x04,0x00,
                        0x41,0x01,0x0b
                    ]);
                    try{
                        let request = store.put(new WebAssembly.Module(bytes.buffer), 'testStoreModule');
                        request.onsuccess = () => { 
                            let request = store.put(true, bSupportStoreModuleInDb_Key);
                            request.onsuccess = function(){     
                                resolveTest('set bSupportStoreModuleInDb = true success');
                            };
                        };
                        request.onerror = () => { 
                            rejectTest('Failed to store [testStoreModule] in wasm cache, bSupportStoreModuleInDb == false: '+(request.error.message || request.error));
                        };
                    }catch(ex){
                        rejectTest('Failed to store [testStoreModule] in wasm cache, bSupportStoreModuleInDb == false: '+(ex.message || ex));
                    }
                };

                request.onsuccess = ()=>{
                    if(request.result){
                        resolveTest('bSupportStoreModuleInDb == true');
                    }else{
                        tryStoreModule();
                    }
                };
            });
        };

        return (()=>BR._bUseIndexDB?BR._openDb():Promise.reject('bUseIndexDB false'))().then(db=>{
            //test If SupportStoreModuleInDb
            if(BR._onLog){BR._onLog('open db success');}
            promiseTryGetLicenseinfoFromKey = _tryGetLicenseinfoFromKey();//todo: restruct
            return testIfSupportStoreModuleInDb(db).then(info=>{
                if(BR._onLog){BR._onLog(info);}
                return Promise.resolve(true);
            }, ex=>{
                if(BR._onLog){BR._onLog(ex.message || ex);}
                return Promise.resolve(false);
            }).then((bSupportStoreModuleInDb)=>{
                let startOpenDbTime = new Date().getTime();
                return BR._lookupInDatabase(db, 'wasm', BR._wasmName).then(wasm=>{
                    // get stored
                    if(wasm instanceof WebAssembly.Module){
                        // get a module
                        if(BR._onLog){BR._onLog('get a wasm module from db, timecost:'+(new Date().getTime() - startOpenDbTime));}
                        let startBuildTime = new Date().getTime();
                        return WebAssembly.instantiate(wasm, importObject).then(instance=>{
                            if(BR._onLog){BR._onLog('build instance from module timecost: '+(new Date().getTime() - startBuildTime));}
                            if(BR._onLog){BR._onLog('finish handle dbr wasm, total timecost: '+(new Date().getTime() - startHandleDbrWasmTime));}
                            return Promise.resolve({module:wasm, instance:instance});
                        });
                    }else{
                        // get a binary
                        if(BR._onLog){BR._onLog('get a wasm binary from db, timecost:'+(new Date().getTime() - startOpenDbTime));}
                        let startBuildTime = new Date().getTime();
                        return WebAssembly.instantiate(wasm, importObject).then(result=>{
                            if(BR._onLog){BR._onLog('build instance from binary timecost: '+(new Date().getTime() - startBuildTime));}
                            if(bSupportStoreModuleInDb){
                                // store module
                                let startStoreTime = new Date().getTime();
                                return BR._storeInDatabase(db, 'wasm', BR._wasmName, result.module).then(info=>{
                                    if(BR._onLog){BR._onLog(info+', timecost: '+(new Date().getTime() - startStoreTime));}
                                    if(BR._onLog){BR._onLog('finish handle dbr wasm, total timecost: '+(new Date().getTime() - startHandleDbrWasmTime));}
                                    return Promise.resolve(result);
                                });
                            }else{
                                if(BR._onLog){BR._onLog('finish handle dbr wasm, total timecost: '+(new Date().getTime() - startHandleDbrWasmTime));}
                                return Promise.resolve(result);
                            }
                        });
                    }
                }, ex=>{
                    // can't find in store, get from url
                    if(BR._onLog){BR._onLog(ex.message || ex);}
                    if(BR._onLog){BR._onLog('downloading...');}
                    let startDownloadTime = new Date().getTime();
                    if(bSupportStoreModuleInDb){
                        return WebAssembly.instantiateStreaming(fetch(url), importObject).then(results => {
                            if(BR._onWasmDownloaded){BR._onWasmDownloaded();}
                            if(BR._onLog){BR._onLog('download with build timecost: '+(new Date().getTime() - startDownloadTime));}
                            // store module
                            let startStoreTime = new Date().getTime();
                            return BR._storeInDatabase(db, 'wasm', BR._wasmName, results.module).then(info=>{
                                if(BR._onLog){BR._onLog(info+', timecost: '+(new Date().getTime() - startStoreTime));}
                                if(BR._onLog){BR._onLog('finish handle dbr wasm, total timecost: '+(new Date().getTime() - startHandleDbrWasmTime));}
                                return Promise.resolve(results);
                            }, ex => {
                                if(BR._onLog){BR._onLog(ex.message || ex);}
                                return Promise.reject("Can't store wasm in db.");
                            });
                        });
                    }else{
                        return fetch(url).then(response=>{
                            if(response.ok){
                                return response.arrayBuffer();
                            }else{
                                throw Error('Network error during fetch wasm.');
                            }
                        }).then(arrayBuffer=>{
                            if(BR._onLog){BR._onLog('download timecost: '+(new Date().getTime() - startDownloadTime));}
                            if(BR._onWasmDownloaded){BR._onWasmDownloaded();}
                            //store binary
                            let startStoreTime = new Date().getTime();
                            return BR._storeInDatabase(db, 'wasm', BR._wasmName, arrayBuffer).then(info=>{
                                if(BR._onLog){BR._onLog(info+', timecost: '+(new Date().getTime() - startStoreTime));}
                                return Promise.resolve(arrayBuffer);
                            }, ex => {
                                if(BR._onLog){BR._onLog(ex.message || ex);}
                                return Promise.reject("Can't store wasm in db.");
                            });
                        }).then(arrayBuffer=>{
                            let startBuildTime = new Date().getTime();
                            return WebAssembly.instantiate(arrayBuffer, importObject).then(result=>{
                                if(BR._onLog){BR._onLog('build instance from binary timecost: '+(new Date().getTime() - startBuildTime));}
                                if(BR._onLog){BR._onLog('finish handle dbr wasm, total timecost: '+(new Date().getTime() - startHandleDbrWasmTime));}
                                return Promise.resolve(result);
                            });
                        });
                    }
                });
            });
        }, ex=>{
            if(BR._onLog){BR._onLog(ex.message || ex);}
            promiseTryGetLicenseinfoFromKey = _tryGetLicenseinfoFromKey();//todo: restruct
            //open db failed, not use indexedDB
            if(WebAssembly.instantiateStreaming){
                return WebAssembly.instantiateStreaming(fetch(url), importObject).then(results => {
                    if(BR._onWasmDownloaded){BR._onWasmDownloaded();}
                    if(BR._onLog){BR._onLog('finish handle dbr wasm, total timecost: '+(new Date().getTime() - startHandleDbrWasmTime));}
                    return Promise.resolve(results);
                });
            }else{
                return fetch(url).then(response=>{
                    if(response.ok){
                        return response.arrayBuffer();
                    }else{
                        throw Error('Network error during fetch wasm.');
                    }
                }).then(arrayBuffer=>{
                    if(BR._onWasmDownloaded){BR._onWasmDownloaded();}
                    return WebAssembly.instantiate(arrayBuffer, importObject).then(result=>{
                        if(BR._onLog){BR._onLog('finish handle dbr wasm, total timecost: '+(new Date().getTime() - startHandleDbrWasmTime));}
                        return Promise.resolve(result);
                    });
                });
            }
        });
    };

    let promiseTryGetLicenseinfoFromKey;
    const _tryGetLicenseinfoFromKey = function(){

        let key = BR.runtimeLicenseKeys;
        let curTime = new Date().getTime();

        if(!key || !/^[0-9a-z]{7,20}$/.test(key)){//todo
            return Promise.resolve(false);
        }

        let licenseResponseFromDB = null;
        let bNeedGetFromServer = false;
        return BR._lookupInDatabase(BR._DB, 'license', key).then(response => {
            // exist in DB
            licenseResponseFromDB = response;
            bNeedGetFromServer = licenseResponseFromDB['next-expire-time'] < curTime;
        }, ()=>{ 
            // not exist in DB
            bNeedGetFromServer = true;
            //BR._newuuid = true;
        }).then(()=>{
            // LOG
            if(BR._onLog){BR._onLog('licenseResponseFromDB:');}
            if(BR._onLog){BR._onLog(licenseResponseFromDB);}
            if(BR._onLog){BR._onLog('bNeedGetFromServer: ' + bNeedGetFromServer);}

            if(!bNeedGetFromServer){ 
                // not need update
                BR._runtimeLicenseResponse = licenseResponseFromDB;
                return licenseResponseFromDB;
            }else{ 
                // need update, fetch from server
                return fetch(BR._licenseUrl+(licenseResponseFromDB?'Cache':'')+'?key='+key+'&version=1'+(licenseResponseFromDB?('&uuid='+licenseResponseFromDB['uuid']):'')).then(response => {
                    if(response.ok){
                        return response.text();
                    }else{
                        throw Error('Network Error: fetch licenseinfo.');
                    }
                }).then(txt => { 
                    let json = JSON.parse(atob(txt));
                    //get json from server success
                    if(BR._onLog){BR._onLog('licenseResponseFromServer:');}
                    if(BR._onLog){BR._onLog(json);}
                    if('ok' == json.status){
                        BR._runtimeLicenseResponse = json;
                        json['next-expire-time'] = curTime + json['min-expire-during'] * 1000;
                        json['max-expire-time'] = curTime + json['max-expire-during'] * 1000;
                        return BR._storeInDatabase(BR._DB, 'license', key, json).catch(ex => {
                            if(BR._onLog){BR._onLog('store update to db fail:'+(ex.message||ex));}
                        });
                    }else if('error' == json.status){
                        throw Error(json.message);
                    }else if('exceeded' == json.status){
                        throw Error('Authorized Scan Count Reached.');
                    }else{
                        throw Error('Unknow Response: fetch licenseinfo.');
                    }
                }).catch(ex => { 
                    // info from server not good, try use old one
                    if(BR._onLog){BR._onLog(ex.message || ex);}
                    if(licenseResponseFromDB && licenseResponseFromDB['max-expire-time'] > curTime){
                        licenseResponseFromDB['next-expire-time'] = curTime + licenseResponseFromDB['check-interval-after-expire'] * 1000;
                        BR._runtimeLicenseResponse = licenseResponseFromDB;
                        return BR._storeInDatabase(BR._DB, 'license', key, licenseResponseFromDB).catch(ex => {
                            if(BR._onLog){BR._onLog('store update to db fail:'+(ex.message||ex));}
                        });
                    }else{
                        // info from DB not exist or not good
                        throw Error("Can't get valid licenseinfo from runtimekey. Message: "+ex.message);
                    }
                });
            }
        }).then(()=>{
            // todo: add lock to avoid miss
            return BR._lookupInDatabase(BR._DB, 'consume').then(rs => {
                if(rs.length){
                    BR._deleteInDatabase(BR._DB, 'consume');
                    return self._dbrConsume(rs);
                }
            }, ()/*ex*/ => {/* not exist is ok */});
        });
    };

    BR.clearCache = function(){
        return new Promise(function(resolve, reject){
            if(env._bDom){
                let taskID = Math.random();
                BR._workerCallbackDic[taskID] = response => {
                    if(response.success){
                        return resolve();
                    }else{
                        return reject(response.exception);
                    }
                };
                BR._dbrWorker.postMessage({type:"clearCache","id":taskID});
            }else if(env._bWorker){
                BR._deleteInDatabase(BR._DB, 'wasm').then(()=>{
                    return BR._deleteInDatabase(BR._DB, 'license');
                }).then(()=>{
                    return BR._deleteInDatabase(BR._DB, 'info');
                }).then(()=>{
                    resolve();
                },ex=>{
                    reject(ex);
                });
                // try{
                //     BR._DB.close();
                //     let request = window.indexedDB.deleteDatabase(BR._dbName);
                //     request.onsuccess = request.onerror = ()=>{
                //         if(request.error){
                //             reject('Clear failed: '+(request.error.message || request.error));
                //         }else{
                //             //alert('Clear success!');
                //             resolve();
                //         }
                //     };
                // }catch(ex){
                //     reject(ex);
                // }
            }else{
                //node
            }
        });
    };

    /** Payback-api */
    let bFirstConsume = true;
    self._dbrConsume = (ciphertext) => {
        if(BR._onLog){BR._onLog(ciphertext);}
        let cipherArr = ciphertext instanceof Array ? ciphertext : [ciphertext];
        let addToDB = ()=>{
            for(let i = 0; i < cipherArr.length; ++i){
                BR._storeInDatabase(BR._DB, 'consume', Math.random().toString(), cipherArr[i]).catch(ex=>{
                    if(BR._onLog){BR._onLog(ex);}
                });
            }
        };
        if(bFirstConsume){
            bFirstConsume = false;
            let postUrls = BR._runtimeLicenseResponse['post-urls'];
            var escapeArr = [];
            for(let i = 0; i < cipherArr.length; ++i){
                escapeArr.push(encodeURIComponent(cipherArr[i]));
            }
            let postConsume = function(){
                return fetch(postUrls[BR._indexPostUrl], {
                    method: 'POST',
                    mode: 'cors',
                    cache: 'no-cache',
                    credentials: 'omit',
                    body: 'data='+JSON.stringify(escapeArr),
                    headers:{
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                }).then(response => {
                    if(response.ok){
                        //
                    }else{
                        throw Error('consume status: '+response.status);
                    }
                }).catch(ex=>{
                    if(BR._onLog){BR._onLog(''+(ex.message||ex));}
                    if(++BR._indexPostUrl < postUrls.length){
                        return postConsume();
                    }else{
                        BR._indexPostUrl = 0;
                        addToDB();
                    }
                });
            };
            return postConsume();
        }else{
            addToDB();
        }
    };

})();/*global dbrEnv, BarcodeReader, EXIF, Dynamsoft*/
if(dbrEnv._bDom){
    const BR = BarcodeReader;
    const self = dbrEnv._self;
    BR.Scanner = function(config){
        config = config || {};
        this.UIElement = config.UIElement || config.htmlElement || (function(){ // htmlElement is only for compatible
            const div = document.createElement('div');
            //div.style.position = 'fixed';
            div.style.width = '100%';
            div.style.minWidth = '100px';
            div.style.height = '100%';
            div.style.minHeight = '100px';
            div.style.left = '0';
            div.style.top = '0';
            div.style.background = '#eee';
            div.style.display = 'none';
            /*eslint-disable indent*/
            div.innerHTML = [
                '<p style="width:100%;height:32px;line-height:32px;position:absolute;margin:auto 0;top:0;bottom:0;text-align:center;">loading</p>',
                '<video class="dbrScanner-video" playsinline="true" style="width:100%;height:100%;position:absolute;left:0;top:0;"></video>',
                '<canvas class="dbrScanner-cvs-draw-area" style="width:100%;height:100%;position:absolute;left:0;top:0;"></canvas>',
                '<select class="dbrScanner-sel-camera" style="position:absolute;left:0;top:0;">',
                '</select>',
                '<select class="dbrScanner-sel-resolution" style="position:absolute;left:0;top:20px;">',
                '</select>',
                '<button class="dbrScanner-btn-close" style="position:absolute;right:0;top:0;">',
                    '<svg width="16" height="16" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg"><path d="M1490 1322q0 40-28 68l-136 136q-28 28-68 28t-68-28l-294-294-294 294q-28 28-68 28t-68-28l-136-136q-28-28-28-68t28-68l294-294-294-294q-28-28-28-68t28-68l136-136q28-28 68-28t68 28l294 294 294-294q28-28 68-28t68 28l136 136q28 28 28 68t-28 68l-294 294 294 294q28 28 28 68z"/></svg>',
                '</button>',
            ].join('');
            /*eslint-enable indent*/
            return div;
        })();

        this.videoSettings = config.videoSettings || { video: {} };
        {
            const video = this.videoSettings.video;
            if(!video.width && !video.height){
                video.width = { ideal: 1280 };
                video.height = { ideal: 720 };
            }
            if(!video.deviceId && !video.facingMode){
                video.facingMode = { ideal: 'environment' };
            }
        }

        this.intervalTime = config.intervalTime;
        if(this.intervalTime == undefined){
            this.intervalTime = 100;
        }

        this.runtimeSettings = config.runtimeSettings;

        this.searchRegion = config.searchRegion || {sx: undefined, sy: undefined, sWidth: undefined, sHeight: undefined, dWidth: undefined, dHeight: undefined};
        this.bAddOriVideoCanvasToResult = config.bAddOriVideoCanvasToResult;
        this.bAddSearchRegionCanvasToResult = config.bAddSearchRegionCanvasToResult;
        this.onFrameRead = config.onFrameRead;
        this.duplicateForgetTime = config.duplicateForgetTime;
        if(this.duplicateForgetTime == undefined){
            this.duplicateForgetTime = 3000;
        }
        this.onUnduplicatedRead = config.onUnduplicatedRead || config.onNewCodeRead; // onNewCodeRead is only for compatible

        //private api
        this.barcodeReader = null;//reader instance
        this._isOpen = false;
        this._lastDeviceId = undefined;
        this.arrDiffCodeInfo = [];
        this._intervalDetectVideoPause = 1000; // when video paused, try after how many ms

        // image capture
        this._bTryTakePhoto = config._bTryTakePhoto;
        // if(this._bTryTakePhoto == undefined){
        //     this._bTryTakePhoto = true;
        // }
        this._photoSettings = config._photoSettings || {}; // imageWidth imageHeight
        this._advancedVideoSettings = null;
        this._imageCapture = null;
        this._videoOrientation = undefined;
        this._videoCapabilities = null;

        //about ui element
        this._video = null;
        this._cvsDrawArea = null;
        this._selCam = null;
        this._selRsl = null;
        this._optGotRsl = null;
        this._btnClose = null;
        this._videoTrack = null;
        this._frameCount = 0;
        this._1DRememberFrameCount = 5;
        this._1DTrustFrameCount = 2;
    };

    BR.Scanner.loadWasm = BR.loadWasm;
    BR.Scanner.isLoaded = function(){
        return BR.isLoaded();
    };
    BR.Scanner.createInstance = function(config){
        return BR.createInstance().then(barcodeReader => {
            // can send in a scanner instance for create reader instance
            let scanner = config instanceof BR.Scanner ? config : new BR.Scanner(config);
            scanner.barcodeReader = barcodeReader;

            var settings = barcodeReader.getRuntimeSettings();
            settings.localizationModes = [2,0,0,0,0,0,0,0];//[2,16,4,8,0,0,0,0]
            settings.deblurLevel = 2;
            if(scanner.runtimeSettings){
                for(let index in scanner.runtimeSettings){
                    if(settings[index] != undefined){
                        settings[index] = scanner.runtimeSettings[index];
                    }
                }
            }
            delete scanner.runtimeSettings;
            barcodeReader.updateRuntimeSettings(settings);

            return scanner;
        });
    };

    BR.Scanner.prototype.getUIElement = function(){
        return this.UIElement;
    };
    BR.Scanner.prototype.setUIElement = function(element){
        this.UIElement = element;
    };

    BR.Scanner.prototype.destroy = BR.Scanner.prototype.deleteInstance = function(){
        if(this.barcodeReader){
            this.barcodeReader.deleteInstance();
        }
    };

    BR.Scanner.prototype.getScanSettings = function(){
        return {
            duplicateForgetTime: this.duplicateForgetTime,
            intervalTime: this.intervalTime
        };
    };
    BR.Scanner.prototype.setScanSettings = function(settings){
        this.duplicateForgetTime = settings.duplicateForgetTime;
        this.intervalTime = settings.intervalTime;
    };

    BR.Scanner.prototype.getRuntimeSettings = function(){
        return this.barcodeReader.getRuntimeSettings();
    };
    BR.Scanner.prototype.updateRuntimeSettings = function(settings){
        return this.barcodeReader.updateRuntimeSettings(settings);
    };
    BR.Scanner.prototype.resetRuntimeSettings = function(){
        this.barcodeReader.resetRuntimeSettings();
    };

    BR.Scanner.prototype._bindUI = function(){
        let htmlProgenys = [this.UIElement];
        for(let node of this.UIElement.children){
            htmlProgenys.push(node);
        }
        for(let i = 0; i < htmlProgenys.length; ++i){
            for(let node of htmlProgenys[i].children){
                htmlProgenys.push(node);
            }
        }
        for(let el of htmlProgenys){
            if(!this._video && el.classList.contains('dbrScanner-video')){
                this._video = el;
            }else if(!this._cvsDrawArea && el.classList.contains('dbrScanner-cvs-drawArea')){
                this._cvsDrawArea = el;//todo
            }else if(!this._selCam && el.classList.contains('dbrScanner-sel-camera')){
                this._selCam = el;
            }else if(!this._selRsl && el.classList.contains('dbrScanner-sel-resolution')){
                this._selRsl = el;
                if(!this._selRsl.options.length){
                    this._selRsl.innerHTML = [
                        this._optGotRsl ? '' : '<option class="dbrScanner-opt-gotResolution" value="got"></option>',
                        '<option data-width="3840" data-height="2160">ask 3840 x 2160</option>',
                        '<option data-width="2560" data-height="1440">ask 2560 x 1440</option>',
                        '<option data-width="1920" data-height="1080">ask 1920 x 1080</option>',
                        '<option data-width="1600" data-height="1200">ask 1600 x 1200</option>',
                        '<option data-width="1280" data-height="720">ask 1280 x 720</option>',
                        '<option data-width="800" data-height="600">ask 800 x 600</option>',
                        '<option data-width="640" data-height="480">ask 640 x 480</option>',
                        '<option data-width="640" data-height="360">ask 640 x 360</option>'
                    ].join('');
                    this._optGotRsl = this._optGotRsl || this._selRsl.options[0];
                }
            }else if(!this._optGotRsl && el.classList.contains('dbrScanner-opt-gotResolution')){
                this._optGotRsl = el;
            }else if(!this._btnClose && el.classList.contains('dbrScanner-btn-close')){
                this._btnClose = el;
            }
        }
        if(!this._video){
            this._unBindUI();
            throw Error('Can not find HTMLVideoElement with class `dbrScanner-video`.');
        }
    };
    BR.Scanner.prototype._unBindUI = function(){
        this._video = null;
        this._cvsDrawArea = null;
        this._selCam = null;
        this._selRsl = null;
        this._optGotRsl = null;
        this._btnClose = null;
    };

    BR.Scanner.prototype.getVideoSettings = function(){
        return JSON.parse(JSON.stringify(this.videoSettings));
    };
    BR.Scanner.prototype.updateVideoSettings = function(settings){
        this.videoSettings = JSON.parse(JSON.stringify(settings));
        if(this._isOpen){
            return this.play();
        }else{
            return Promise.resolve();
        }
    };

    BR.Scanner.prototype.isOpen = function(){
        return this._isOpen;
    };
    BR.Scanner.prototype.show = BR.Scanner.prototype.open = function(){

        if(!navigator.mediaDevices){
            return Promise.reject('`navigator.mediaDevices` is not available. Please ensure that you host the site in https.');
        }
        if(this._isOpen){
            return Promise.reject('The scanner is already open.');
        }else{
            this._isOpen = true;
        }

        // reset
        this.arrDiffCodeInfo = [];
        this._frameCount = 0;
        this._lastDeviceId = undefined;

        try{
            this._bindUI();
        }catch(ex){
            return Promise.reject(ex);
        }

        let onCameraSelChange = () => {
            this.play(this._selCam.value).then(() => {
                if(!this._isOpen){
                    this.stop();
                }
            }).catch(function(ex){
                alert('Play video failed: ' + (ex.message || ex));
            });
        };
        if(this._selCam){
            this._selCam.addEventListener('change', onCameraSelChange);
        }

        let onResolutionSelChange = () => {
            let width, height;
            if(this._selRsl && -1 != this._selRsl.selectedIndex){
                let selRslOpt = this._selRsl.options[this._selRsl.selectedIndex];
                width = selRslOpt.getAttribute('data-width');
                height = selRslOpt.getAttribute('data-height');
            }
            this.play(undefined, width, height).then(() => {
                if(!this._isOpen){
                    this.stop();
                }
            }).catch(function(ex){
                alert('Play video failed: ' + (ex.message || ex));
            });
        };
        if(this._selRsl){
            this._selRsl.addEventListener('change', onResolutionSelChange);
        }

        let closeWindow = this._closeWindow = () => {
            this.stop();
            this._isOpen = false;
            if(this._selCam){
                this._selCam.removeEventListener('change', onCameraSelChange);
            }
            if(this._selRsl){
                this._selRsl.removeEventListener('change', onResolutionSelChange);
            }
            this._closeWindow = undefined;
            if(this._btnClose){
                this._btnClose.removeEventListener('click', closeWindow);
            }
            this.UIElement.style.display = 'none';
        };
        if(this._btnClose){this._btnClose.addEventListener('click', closeWindow);}

        if(!this.UIElement.parentNode){
            if(!this.UIElement.style.position){this.UIElement.style.position = 'fixed';}
            document.body.appendChild(this.UIElement);
        }
        if(this.UIElement.style.display == 'none'){ this.UIElement.style.display = ''; }

        //init video
        let videoResolution;
        let videoDeviceInfos;
        let videoPromise = this.play().then(value => {
            videoResolution = value;
            return this.updateDevice();
        }).then(value => {
            videoDeviceInfos = value;
            return Promise.resolve();
        });


        // init dbr reader
        let dbrPromise = (()=>{
            if(!this.barcodeReader){
                return BR.Scanner.createInstance(this);
            }else{
                return Promise.resolve();
            }
        })();

        //resolve all and return the current device && all devices
        return Promise.all([videoPromise,dbrPromise]).then(()=>{
            if(!this._isOpen){
                return this.stop();
            }
            this._loopReadVideo();
            return Promise.resolve({
                width: videoResolution.width,
                height: videoResolution.height,
                current: videoDeviceInfos.current,
                all: videoDeviceInfos.all
            });
        });

    };
    BR.Scanner.prototype.play = function(deviceId, width, height){
        if(this._isOpen){
            return new Promise((resolve,reject)=>{

                this.stop();
        
                if(BR._onLog)BR._onLog('======before video========');
                const constraints = this.videoSettings;
                const bMobileSafari = /Safari/.test(navigator.userAgent) && /iPhone/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent);

                // width & height
                if(bMobileSafari){
                    if(width >= 1280){
                        constraints.video.width = 1280;
                    }else if(width >= 640){
                        constraints.video.width = 640;
                    }else if(width >= 320){
                        constraints.video.width = 320;
                    }
                }else{
                    if(width || height){
                        if(width) constraints.video.width = { ideal: width };
                        if(height) constraints.video.height = { ideal: height };
                    }
                }
                //deviceId
                if(deviceId){
                    delete constraints.video.facingMode;
                    constraints.video.deviceId = {exact: deviceId};
                    this._lastDeviceId = deviceId;
                }else{
                    if(!constraints.video.deviceId){
                        // undefined
                        if(this._lastDeviceId){
                            //use old device if exist
                            delete constraints.video.facingMode;
                            constraints.video.deviceId = {ideal: this._lastDeviceId};
                        }
                    }
                }
                
                let hasTryedNoWidthHeight = false;
                const getAndPlayVideo = ()=>{
                    if(BR._onLog)BR._onLog('======try getUserMedia========');
                    if(BR._onLog)BR._onLog('ask '+JSON.stringify(constraints.video.width)+'x'+JSON.stringify(constraints.video.height));
                    navigator.mediaDevices.getUserMedia(constraints).then((stream)=>{
                        if(BR._onLog)BR._onLog('======get video========');
                        return new Promise((resolve2, reject2)=>{

                            const videoTracks = stream.getVideoTracks();
                            if(videoTracks.length){
                                this._videoTrack = videoTracks[0];
                                if(self.ImageCapture){
                                    this._imageCapture = new ImageCapture(this._videoTrack);
                                    // this._imageCapture.getPhotoCapabilities().then(settings => {
                                    //     alert("available photo settings: " + JSON.stringify(settings)
                                    //         + '\n imageWidth: ' + settings.imageWidth.min + '~' + settings.imageWidth.max
                                    //         + '\n imageHeight: ' + settings.imageHeight.min + '~' + settings.imageHeight.max
                                    //         + '\n fillLightMode: ' + JSON.stringify(settings.FillLightMode));
                                    // });
                                }
                            }
                            
                            this._video.srcObject = stream;

                            this._video.onloadedmetadata = ()=>{
                                if(BR._onLog)BR._onLog('======play video========');
                                this._video.play().then(()=>{
                                    if(BR._onLog)BR._onLog('======played video========');
                                    
                                    if(this._videoTrack.applyConstraints && this._videoTrack.getCapabilities){
                                        this._videoCapabilities = this._videoTrack.getCapabilities();
                                        this._advancedVideoSettings = {};
                                        // if(this._videoTrack.getSettings){
                                        //     const oriSettings = this._videoTrack.getSettings();
                                        //     this._advancedVideoSettings.width = oriSettings.width;
                                        //     this._advancedVideoSettings.height = oriSettings.height;
                                        // }
                                        // if(this._videoCapabilities.focusMode){ this._advancedVideoSettings.focusMode = "continuous"; }
                                    }

                                    const gotRsl = 'got '+this._video.videoWidth+'x'+this._video.videoHeight;
                                    if(this._optGotRsl){
                                        this._optGotRsl.setAttribute('data-width', this._video.videoWidth);
                                        this._optGotRsl.setAttribute('data-height', this._video.videoHeight);
                                        this._optGotRsl.innerText = gotRsl;
                                        if(this._selRsl && this._optGotRsl.parentNode == this._selRsl){
                                            this._selRsl.value = 'got';
                                        }
                                    }
                                    if(BR._onLog)BR._onLog(gotRsl);
                                    resolve2();
                                    resolve({width: this._video.videoWidth, height: this._video.videoHeight});
                                },(ex)=>{
                                    reject2(ex);
                                });
                            };
                            this._video.onerror = ()=>{reject2();};
                        });
                    }).catch((ex)=>{
                        if(BR._onLog)BR._onLog(ex);
                        if(!hasTryedNoWidthHeight && constraints.video){
                            hasTryedNoWidthHeight = true;
                            constraints.video.width = undefined;
                            constraints.video.height = undefined;
                            getAndPlayVideo();
                        }else{
                            reject(ex);
                        }
                    });
                };
                getAndPlayVideo();
            });
            // .then(()=>{
            //     if(this._selCam && deviceId){
            //         // update device in dbrScanner-sel-camera
            //         return this.updateDevice();
            //     }else{
            //         return Promise.resolve();
            //     }
            // }).then(deviceInfos=>{
            //     let ret = {width: this._video.videoWidth, height: this._video.videoHeight};
            //     if(deviceInfos){
            //         ret.current = deviceInfos.current;
            //         ret.all = deviceInfos.all;
            //     }
            //     return Promise.resolve(ret);
            // });
        }else{
            return Promise.reject('The scanner is not open.');
        }
    };
    BR.Scanner.prototype.pause = function(){
        if(this._video){
            this._video.pause();
        }
    };
    BR.Scanner.prototype.stop = function(){
        if(this._video && this._video.srcObject){
            if(BR._onLog)BR._onLog('======stop video========');
            this._video.srcObject.getTracks().forEach(function(track) {
                track.stop();
            });
            this._video.srcObject = null;//edge only support set to null
            this._videoTrack = null;
            this._videoOrientation = null;
        }
    };
    BR.Scanner.prototype.hide = BR.Scanner.prototype.close = function(){
        if(this._isOpen){
            this._closeWindow();
        }
    };

    BR.Scanner.prototype.getCurrentCamera = function(){
        return this.updateDevice().then(obj => {
            return obj.current;
        });
    };
    BR.Scanner.prototype.getAllCameras = function(){
        return this.updateDevice().then(obj => {
            return obj.all;
        });
    };
    BR.Scanner.prototype.setCurrentCamera = function(cameraInfoOrDeviceId){
        return this.play(cameraInfoOrDeviceId.deviceId || cameraInfoOrDeviceId);
    };
    BR.Scanner.prototype.updateDevice = function(){
        return navigator.mediaDevices.enumerateDevices().then(deviceInfos=>{
            const arrVideoDeviceInfo = [];
            let oldVal, selOpt;
            if(this._selCam){
                oldVal = this._selCam.value;
                this._selCam.innerHTML = "";
            }
            for(let i = 0; i < deviceInfos.length; ++i){
                let info = deviceInfos[i];
                if(info.kind != 'videoinput'){
                    continue;
                }
                let reOrgInfo = {};
                reOrgInfo.deviceId = info.deviceId;
                reOrgInfo.label = info.label || 'camera '+ i;
                arrVideoDeviceInfo.push(reOrgInfo);
            }
            let selInfo = undefined;
            if(this._video){
                for(let track of this._video.srcObject.getVideoTracks()){
                    if(selInfo){
                        break;
                    }
                    for(let info of arrVideoDeviceInfo){
                        if(track.label == info.label){
                            selInfo = info;
                            this._lastDeviceId = info.deviceId;
                            break;
                        }
                    }
                }
            }
            if(this._selCam){
                for(let info of arrVideoDeviceInfo){
                    let opt = document.createElement('option');
                    opt.value = info.deviceId;
                    opt.innerText = info.label;
                    this._selCam.appendChild(opt);
                    if(oldVal == info.deviceId){
                        selOpt = opt;
                    }
                }
                let optArr = this._selCam.childNodes;
                if(!selOpt && selInfo && optArr.length){
                    for(let opt of optArr){
                        if(selInfo.label == opt.innerText){
                            selOpt = opt;
                            break;
                        }
                    }
                }
                if(selOpt){
                    this._selCam.value = selOpt.value;
                }
            }
            return Promise.resolve({current: selInfo, all: arrVideoDeviceInfo});
        });
    };

    BR.Scanner.prototype.getResolution = function(){
        if(this._isOpen){
            return [this._video.videoWidth, this._video.videoHeight];
        }else{
            return null;
        }
    };
    BR.Scanner.prototype.setResolution = function(resolution){
        if(this._isOpen){
            return this.play(null, resolution[0], resolution[1]);
        }else{
            return Promise.reject();
        }
    };

    BR.Scanner.prototype.getCompatibility = function(){
        return {
            torch: this._videoCapabilities? (this._videoCapabilities.torch || false) : false,
            focus: false
        };
    };
    BR.Scanner.prototype.turnOnTorch = function(){
        if(this.isSupportTorch()){
            this._advancedVideoSettings.torch = true;
            return this._videoTrack.applyConstraints({ advanced : [this._advancedVideoSettings] });
        }else{
            return Promise.reject("not support");
        }
    };
    BR.Scanner.prototype.turnOffTorch = function(){
        if(this.isSupportTorch){
            this._advancedVideoSettings.torch = false;
            return this._videoTrack.applyConstraints({ advanced : [this._advancedVideoSettings] });
        }else{
            return Promise.reject("not support");
        }
    };

    BR.Scanner.prototype._cloneDecodeResults = function(results, bRmCanvas){
        if(results instanceof Array){
            let newResults = [];
            for(let result of results){
                newResults.push(this._cloneDecodeResults(result, bRmCanvas));
            }
            return newResults;
        }else{ // not array
            let result = results;
            let newResult = JSON.parse(JSON.stringify(result, (k,v) => {
                if(k == 'oriVideoCanvas' || k == 'searchRegionCanvas'){
                    return undefined;
                }else{
                    return v;
                }
            }));
            if(!bRmCanvas){
                newResult.oriVideoCanvas = result.oriVideoCanvas;
                newResult.searchRegionCanvas = result.searchRegionCanvas;
            }
            return newResult;
        }
    };
    BR.Scanner.prototype._loopReadVideo = function(){
        if(!this._isOpen){
            return;
        }
        if(this._video.paused){
            if(BR._onLog)BR._onLog('Video is paused. Ask in 1s.');
            setTimeout(()=>{this._loopReadVideo();}, this._intervalDetectVideoPause);
            return;
        }
    
        if(BR._onLog)BR._onLog('======= once read =======');
    
        const timestart = (new Date()).getTime();
        (()=>{
            const config = JSON.parse(JSON.stringify(this.searchRegion));
            config.bAddOriVideoCanvasToResult = this.bAddOriVideoCanvasToResult;
            config.bAddSearchRegionCanvasToResult = this.bAddSearchRegionCanvasToResult;
            if(this._bTryTakePhoto && this._imageCapture 
                && !(this._advancedVideoSettings && this._advancedVideoSettings.torch) 
                && this._videoTrack.readyState == 'live' && this._videoTrack.enabled && !this._videoTrack.muted){
                return this._imageCapture.takePhoto(this._photoSettings)
                    .then(blob => {
                        config.videoWidth = this._video.videoWidth;
                        config.videoHeight = this._video.videoHeight;
                        if(this._videoOrientation || "image/jpeg" != blob.type){
                            // only first and jpg need detect
                            return blob;
                        }else{
                            // detect Orientation first time grabPhoto each play
                            //config._takePhotoExpectedWHRateForJPG = this._video.videoWidth / this._video.videoHeight || 1;
                            let scanner = this;
                            return new Promise(resolve => {
                                EXIF.getData(blob, function(){
                                    scanner._videoOrientation = EXIF.getTag(this, 'Orientation');
                                    resolve(blob);
                                });
                            });
                        }
                    })
                    .then(blob => {
                        config._videoOrientation = this._videoOrientation;
                        return this.barcodeReader._decodeBlob(blob, config);
                    });
            }else{
                return this.barcodeReader.decodeVideo.apply(this.barcodeReader, [this._video, config]);
            }
        })().then(results=>{
            const timeGetResult = new Date().getTime();
            if(BR._onLog)BR._onLog('time cost: ' + (timeGetResult - timestart) + 'ms');
            ++this._frameCount;//oh, a new frame is decoded

            if(BR._onLog)BR._onLog(results);

            const arrLeaveResults = [];
            for(let result of results){
                let bExist = false;
                for(let i = 0; i < this.arrDiffCodeInfo.length; ++i){
                    const info = this.arrDiffCodeInfo[i];
                    if(info.result.BarcodeText == result.BarcodeText && info.result.BarcodeFormat == result.BarcodeFormat){
                        //update time
                        info.time = timeGetResult;
                        info.result = this._cloneDecodeResults(result, true);
                        ++info.count;
                        bExist = true;
                        // 1D add to arrLeaveResults after match some count
                        if((result.BarcodeFormat & BR.EnumBarcodeFormat.OneD) != 0){
                            let frameCounts = info.frameCounts;
                            frameCounts.push(this._frameCount);
                            if(frameCounts.length == this._1DTrustFrameCount){
                                arrLeaveResults.push(result);
                            }else if(frameCounts.length > this._1DTrustFrameCount){
                                frameCounts.shift();
                            }
                        }
                        break;
                    }
                }
                if(!bExist){
                    //add new
                    this.arrDiffCodeInfo.push({
                        result: this._cloneDecodeResults(result, true),
                        time: timeGetResult,
                        count: 1
                    });
                    if((result.BarcodeFormat & BR.EnumBarcodeFormat.OneD) == 0){
                        // 2D add to arrLeaveResults directly
                        arrLeaveResults.push(result);
                    }else{
                        // 1D record frameCounts
                        this.arrDiffCodeInfo[this.arrDiffCodeInfo.length - 1].frameCounts = [this._frameCount];
                    }
                }
            }
            //remove expire
            for(let i = 0; i < this.arrDiffCodeInfo.length; ++i){
                const info = this.arrDiffCodeInfo[i];
                if(info.time + this.duplicateForgetTime < timeGetResult){
                    if((info.result.BarcodeFormat & BR.EnumBarcodeFormat.OneD) == 0){
                        // 2D
                        this.arrDiffCodeInfo.splice(i, 1);
                    }else{
                        // 1D
                        let frameCounts = info.frameCounts;
                        if(this._frameCount - frameCounts[frameCounts.length - 1] >= this._1DRememberFrameCount){
                            this.arrDiffCodeInfo.splice(i, 1);
                        }
                    }

                }
            }

            //onFrameRead
            if(this.onFrameRead){
                this.onFrameRead(this._cloneDecodeResults(results));
            }
            //onUnduplicatedRead
            for(let result of arrLeaveResults){
                if(this.onUnduplicatedRead){
                    this.onUnduplicatedRead(result.BarcodeText, this._cloneDecodeResults(result));
                }
            }
    
            setTimeout(()=>{ this._loopReadVideo(); }, this.intervalTime);
        }).catch(ex=>{
            if(BR._onLog)BR._onLog(ex.message || ex);
            setTimeout(()=>{ this._loopReadVideo(); }, this.intervalTime);
            if(ex.message == 'platform error'){
                //play with new settings during take photo, ignore
            }else{
                console.error(ex.message);//eslint-disable-line
                throw ex;
            }
        });
    };
}
// when export BarcodeReader, have the struct { BarcodeReader: {BarcodeReader, BarcodeScanner} }
let BarcodeScanner = Dynamsoft.BarcodeScanner = BarcodeReader.Scanner; //eslint-disable-line
/*
Keillion get from https://github.com/exif-js/exif-js and fix some bug.

The MIT License (MIT)
Copyright (c) 2008 Jacob Seidelin
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/
/* global dbrEnv */
const EXIF = dbrEnv._bDom ? (()=>{

    var EXIF = function(obj) {
        if (obj instanceof EXIF) return obj;
        if (!(this instanceof EXIF)) return new EXIF(obj);
        this.EXIFwrapped = obj;
    };

    var ExifTags = EXIF.Tags = {

        // version tags
        0x9000 : "ExifVersion",             // EXIF version
        0xA000 : "FlashpixVersion",         // Flashpix format version

        // colorspace tags
        0xA001 : "ColorSpace",              // Color space information tag

        // image configuration
        0xA002 : "PixelXDimension",         // Valid width of meaningful image
        0xA003 : "PixelYDimension",         // Valid height of meaningful image
        0x9101 : "ComponentsConfiguration", // Information about channels
        0x9102 : "CompressedBitsPerPixel",  // Compressed bits per pixel

        // user information
        0x927C : "MakerNote",               // Any desired information written by the manufacturer
        0x9286 : "UserComment",             // Comments by user

        // related file
        0xA004 : "RelatedSoundFile",        // Name of related sound file

        // date and time
        0x9003 : "DateTimeOriginal",        // Date and time when the original image was generated
        0x9004 : "DateTimeDigitized",       // Date and time when the image was stored digitally
        0x9290 : "SubsecTime",              // Fractions of seconds for DateTime
        0x9291 : "SubsecTimeOriginal",      // Fractions of seconds for DateTimeOriginal
        0x9292 : "SubsecTimeDigitized",     // Fractions of seconds for DateTimeDigitized

        // picture-taking conditions
        0x829A : "ExposureTime",            // Exposure time (in seconds)
        0x829D : "FNumber",                 // F number
        0x8822 : "ExposureProgram",         // Exposure program
        0x8824 : "SpectralSensitivity",     // Spectral sensitivity
        0x8827 : "ISOSpeedRatings",         // ISO speed rating
        0x8828 : "OECF",                    // Optoelectric conversion factor
        0x9201 : "ShutterSpeedValue",       // Shutter speed
        0x9202 : "ApertureValue",           // Lens aperture
        0x9203 : "BrightnessValue",         // Value of brightness
        0x9204 : "ExposureBias",            // Exposure bias
        0x9205 : "MaxApertureValue",        // Smallest F number of lens
        0x9206 : "SubjectDistance",         // Distance to subject in meters
        0x9207 : "MeteringMode",            // Metering mode
        0x9208 : "LightSource",             // Kind of light source
        0x9209 : "Flash",                   // Flash status
        0x9214 : "SubjectArea",             // Location and area of main subject
        0x920A : "FocalLength",             // Focal length of the lens in mm
        0xA20B : "FlashEnergy",             // Strobe energy in BCPS
        0xA20C : "SpatialFrequencyResponse",    //
        0xA20E : "FocalPlaneXResolution",   // Number of pixels in width direction per FocalPlaneResolutionUnit
        0xA20F : "FocalPlaneYResolution",   // Number of pixels in height direction per FocalPlaneResolutionUnit
        0xA210 : "FocalPlaneResolutionUnit",    // Unit for measuring FocalPlaneXResolution and FocalPlaneYResolution
        0xA214 : "SubjectLocation",         // Location of subject in image
        0xA215 : "ExposureIndex",           // Exposure index selected on camera
        0xA217 : "SensingMethod",           // Image sensor type
        0xA300 : "FileSource",              // Image source (3 == DSC)
        0xA301 : "SceneType",               // Scene type (1 == directly photographed)
        0xA302 : "CFAPattern",              // Color filter array geometric pattern
        0xA401 : "CustomRendered",          // Special processing
        0xA402 : "ExposureMode",            // Exposure mode
        0xA403 : "WhiteBalance",            // 1 = auto white balance, 2 = manual
        0xA404 : "DigitalZoomRation",       // Digital zoom ratio
        0xA405 : "FocalLengthIn35mmFilm",   // Equivalent foacl length assuming 35mm film camera (in mm)
        0xA406 : "SceneCaptureType",        // Type of scene
        0xA407 : "GainControl",             // Degree of overall image gain adjustment
        0xA408 : "Contrast",                // Direction of contrast processing applied by camera
        0xA409 : "Saturation",              // Direction of saturation processing applied by camera
        0xA40A : "Sharpness",               // Direction of sharpness processing applied by camera
        0xA40B : "DeviceSettingDescription",    //
        0xA40C : "SubjectDistanceRange",    // Distance to subject

        // other tags
        0xA005 : "InteroperabilityIFDPointer",
        0xA420 : "ImageUniqueID"            // Identifier assigned uniquely to each image
    };

    var TiffTags = EXIF.TiffTags = {
        0x0100 : "ImageWidth",
        0x0101 : "ImageHeight",
        0x8769 : "ExifIFDPointer",
        0x8825 : "GPSInfoIFDPointer",
        0xA005 : "InteroperabilityIFDPointer",
        0x0102 : "BitsPerSample",
        0x0103 : "Compression",
        0x0106 : "PhotometricInterpretation",
        0x0112 : "Orientation",
        0x0115 : "SamplesPerPixel",
        0x011C : "PlanarConfiguration",
        0x0212 : "YCbCrSubSampling",
        0x0213 : "YCbCrPositioning",
        0x011A : "XResolution",
        0x011B : "YResolution",
        0x0128 : "ResolutionUnit",
        0x0111 : "StripOffsets",
        0x0116 : "RowsPerStrip",
        0x0117 : "StripByteCounts",
        0x0201 : "JPEGInterchangeFormat",
        0x0202 : "JPEGInterchangeFormatLength",
        0x012D : "TransferFunction",
        0x013E : "WhitePoint",
        0x013F : "PrimaryChromaticities",
        0x0211 : "YCbCrCoefficients",
        0x0214 : "ReferenceBlackWhite",
        0x0132 : "DateTime",
        0x010E : "ImageDescription",
        0x010F : "Make",
        0x0110 : "Model",
        0x0131 : "Software",
        0x013B : "Artist",
        0x8298 : "Copyright"
    };

    var GPSTags = EXIF.GPSTags = {
        0x0000 : "GPSVersionID",
        0x0001 : "GPSLatitudeRef",
        0x0002 : "GPSLatitude",
        0x0003 : "GPSLongitudeRef",
        0x0004 : "GPSLongitude",
        0x0005 : "GPSAltitudeRef",
        0x0006 : "GPSAltitude",
        0x0007 : "GPSTimeStamp",
        0x0008 : "GPSSatellites",
        0x0009 : "GPSStatus",
        0x000A : "GPSMeasureMode",
        0x000B : "GPSDOP",
        0x000C : "GPSSpeedRef",
        0x000D : "GPSSpeed",
        0x000E : "GPSTrackRef",
        0x000F : "GPSTrack",
        0x0010 : "GPSImgDirectionRef",
        0x0011 : "GPSImgDirection",
        0x0012 : "GPSMapDatum",
        0x0013 : "GPSDestLatitudeRef",
        0x0014 : "GPSDestLatitude",
        0x0015 : "GPSDestLongitudeRef",
        0x0016 : "GPSDestLongitude",
        0x0017 : "GPSDestBearingRef",
        0x0018 : "GPSDestBearing",
        0x0019 : "GPSDestDistanceRef",
        0x001A : "GPSDestDistance",
        0x001B : "GPSProcessingMethod",
        0x001C : "GPSAreaInformation",
        0x001D : "GPSDateStamp",
        0x001E : "GPSDifferential"
    };

     // EXIF 2.3 Spec
    var IFD1Tags = EXIF.IFD1Tags = {
        0x0100: "ImageWidth",
        0x0101: "ImageHeight",
        0x0102: "BitsPerSample",
        0x0103: "Compression",
        0x0106: "PhotometricInterpretation",
        0x0111: "StripOffsets",
        0x0112: "Orientation",
        0x0115: "SamplesPerPixel",
        0x0116: "RowsPerStrip",
        0x0117: "StripByteCounts",
        0x011A: "XResolution",
        0x011B: "YResolution",
        0x011C: "PlanarConfiguration",
        0x0128: "ResolutionUnit",
        0x0201: "JpegIFOffset",    // When image format is JPEG, this value show offset to JPEG data stored.(aka "ThumbnailOffset" or "JPEGInterchangeFormat")
        0x0202: "JpegIFByteCount", // When image format is JPEG, this value shows data size of JPEG image (aka "ThumbnailLength" or "JPEGInterchangeFormatLength")
        0x0211: "YCbCrCoefficients",
        0x0212: "YCbCrSubSampling",
        0x0213: "YCbCrPositioning",
        0x0214: "ReferenceBlackWhite"
    };

    var StringValues = EXIF.StringValues = {
        ExposureProgram : {
            0 : "Not defined",
            1 : "Manual",
            2 : "Normal program",
            3 : "Aperture priority",
            4 : "Shutter priority",
            5 : "Creative program",
            6 : "Action program",
            7 : "Portrait mode",
            8 : "Landscape mode"
        },
        MeteringMode : {
            0 : "Unknown",
            1 : "Average",
            2 : "CenterWeightedAverage",
            3 : "Spot",
            4 : "MultiSpot",
            5 : "Pattern",
            6 : "Partial",
            255 : "Other"
        },
        LightSource : {
            0 : "Unknown",
            1 : "Daylight",
            2 : "Fluorescent",
            3 : "Tungsten (incandescent light)",
            4 : "Flash",
            9 : "Fine weather",
            10 : "Cloudy weather",
            11 : "Shade",
            12 : "Daylight fluorescent (D 5700 - 7100K)",
            13 : "Day white fluorescent (N 4600 - 5400K)",
            14 : "Cool white fluorescent (W 3900 - 4500K)",
            15 : "White fluorescent (WW 3200 - 3700K)",
            17 : "Standard light A",
            18 : "Standard light B",
            19 : "Standard light C",
            20 : "D55",
            21 : "D65",
            22 : "D75",
            23 : "D50",
            24 : "ISO studio tungsten",
            255 : "Other"
        },
        Flash : {
            0x0000 : "Flash did not fire",
            0x0001 : "Flash fired",
            0x0005 : "Strobe return light not detected",
            0x0007 : "Strobe return light detected",
            0x0009 : "Flash fired, compulsory flash mode",
            0x000D : "Flash fired, compulsory flash mode, return light not detected",
            0x000F : "Flash fired, compulsory flash mode, return light detected",
            0x0010 : "Flash did not fire, compulsory flash mode",
            0x0018 : "Flash did not fire, auto mode",
            0x0019 : "Flash fired, auto mode",
            0x001D : "Flash fired, auto mode, return light not detected",
            0x001F : "Flash fired, auto mode, return light detected",
            0x0020 : "No flash function",
            0x0041 : "Flash fired, red-eye reduction mode",
            0x0045 : "Flash fired, red-eye reduction mode, return light not detected",
            0x0047 : "Flash fired, red-eye reduction mode, return light detected",
            0x0049 : "Flash fired, compulsory flash mode, red-eye reduction mode",
            0x004D : "Flash fired, compulsory flash mode, red-eye reduction mode, return light not detected",
            0x004F : "Flash fired, compulsory flash mode, red-eye reduction mode, return light detected",
            0x0059 : "Flash fired, auto mode, red-eye reduction mode",
            0x005D : "Flash fired, auto mode, return light not detected, red-eye reduction mode",
            0x005F : "Flash fired, auto mode, return light detected, red-eye reduction mode"
        },
        SensingMethod : {
            1 : "Not defined",
            2 : "One-chip color area sensor",
            3 : "Two-chip color area sensor",
            4 : "Three-chip color area sensor",
            5 : "Color sequential area sensor",
            7 : "Trilinear sensor",
            8 : "Color sequential linear sensor"
        },
        SceneCaptureType : {
            0 : "Standard",
            1 : "Landscape",
            2 : "Portrait",
            3 : "Night scene"
        },
        SceneType : {
            1 : "Directly photographed"
        },
        CustomRendered : {
            0 : "Normal process",
            1 : "Custom process"
        },
        WhiteBalance : {
            0 : "Auto white balance",
            1 : "Manual white balance"
        },
        GainControl : {
            0 : "None",
            1 : "Low gain up",
            2 : "High gain up",
            3 : "Low gain down",
            4 : "High gain down"
        },
        Contrast : {
            0 : "Normal",
            1 : "Soft",
            2 : "Hard"
        },
        Saturation : {
            0 : "Normal",
            1 : "Low saturation",
            2 : "High saturation"
        },
        Sharpness : {
            0 : "Normal",
            1 : "Soft",
            2 : "Hard"
        },
        SubjectDistanceRange : {
            0 : "Unknown",
            1 : "Macro",
            2 : "Close view",
            3 : "Distant view"
        },
        FileSource : {
            3 : "DSC"
        },

        Components : {
            0 : "",
            1 : "Y",
            2 : "Cb",
            3 : "Cr",
            4 : "R",
            5 : "G",
            6 : "B"
        }
    };

    function addEvent(element, event, handler) {
        if (element.addEventListener) {
            element.addEventListener(event, handler, false);
        } else if (element.attachEvent) {
            element.attachEvent("on" + event, handler);
        }
    }

    function imageHasData(img) {
        return !!(img.exifdata);
    }


    function base64ToArrayBuffer(base64, contentType) {
        contentType = contentType || base64.match(/^data\:([^\;]+)\;base64,/mi)[1] || ''; // e.g. 'data:image/jpeg;base64,...' => 'image/jpeg'
        base64 = base64.replace(/^data\:([^\;]+)\;base64,/gmi, '');
        var binary = atob(base64);
        var len = binary.length;
        var buffer = new ArrayBuffer(len);
        var view = new Uint8Array(buffer);
        for (var i = 0; i < len; i++) {
            view[i] = binary.charCodeAt(i);
        }
        return buffer;
    }

    function objectURLToBlob(url, callback) {
        var http = new XMLHttpRequest();
        http.open("GET", url, true);
        http.responseType = "blob";
        http.onload = function(e) {
            if (this.status == 200 || this.status === 0) {
                callback(this.response);
            }
        };
        http.send();
    }

    function getImageData(img, callback) {
        function handleBinaryFile(binFile) {
            var data = findEXIFinJPEG(binFile);
            var iptcdata = findIPTCinJPEG(binFile);
            var xmpdata= findXMPinJPEG(binFile);
            img.exifdata = data || {};
            img.iptcdata = iptcdata || {};
            img.xmpdata = xmpdata || {};
            if (callback) {
                callback.call(img);
            }
        }

        if (img.src) {
            if (/^data\:/i.test(img.src)) { // Data URI
                var arrayBuffer = base64ToArrayBuffer(img.src);
                handleBinaryFile(arrayBuffer);

            } else if (/^blob\:/i.test(img.src)) { // Object URL
                var fileReader = new FileReader();
                fileReader.onload = function(e) {
                    handleBinaryFile(e.target.result);
                };
                objectURLToBlob(img.src, function (blob) {
                    fileReader.readAsArrayBuffer(blob);
                });
            } else {
                var http = new XMLHttpRequest();
                http.onload = function() {
                    if (this.status == 200 || this.status === 0) {
                        handleBinaryFile(http.response);
                    } else {
                        throw "Could not load image";
                    }
                    http = null;
                };
                http.open("GET", img.src, true);
                http.responseType = "arraybuffer";
                http.send(null);
            }
        } else if (self.FileReader && (img instanceof self.Blob || img instanceof self.File)) {
            var fileReader = new FileReader();
            fileReader.onload = function(e) {
                handleBinaryFile(e.target.result);
            };

            fileReader.readAsArrayBuffer(img);
        }
    }

    function findEXIFinJPEG(file) {
        var dataView = new DataView(file);

        if ((dataView.getUint8(0) != 0xFF) || (dataView.getUint8(1) != 0xD8)) {
            return false; // not a valid jpeg
        }

        var offset = 2,
            length = file.byteLength,
            marker;

        while (offset < length) {
            if (dataView.getUint8(offset) != 0xFF) {
                return false; // not a valid marker, something is wrong
            }

            marker = dataView.getUint8(offset + 1);

            // we could implement handling for other markers here,
            // but we're only looking for 0xFFE1 for EXIF data

            if (marker == 225) {

                return readEXIFData(dataView, offset + 4, dataView.getUint16(offset + 2) - 2);

                // offset += 2 + file.getShortAt(offset+2, true);

            } else {
                offset += 2 + dataView.getUint16(offset+2);
            }

        }

    }

    function findIPTCinJPEG(file) {
        var dataView = new DataView(file);

        if ((dataView.getUint8(0) != 0xFF) || (dataView.getUint8(1) != 0xD8)) {
            return false; // not a valid jpeg
        }

        var offset = 2,
            length = file.byteLength;


        var isFieldSegmentStart = function(dataView, offset){
            return (
                dataView.getUint8(offset) === 0x38 &&
                dataView.getUint8(offset+1) === 0x42 &&
                dataView.getUint8(offset+2) === 0x49 &&
                dataView.getUint8(offset+3) === 0x4D &&
                dataView.getUint8(offset+4) === 0x04 &&
                dataView.getUint8(offset+5) === 0x04
            );
        };

        while (offset < length) {

            if ( isFieldSegmentStart(dataView, offset )){

                // Get the length of the name header (which is padded to an even number of bytes)
                var nameHeaderLength = dataView.getUint8(offset+7);
                if(nameHeaderLength % 2 !== 0) nameHeaderLength += 1;
                // Check for pre photoshop 6 format
                if(nameHeaderLength === 0) {
                    // Always 4
                    nameHeaderLength = 4;
                }

                var startOffset = offset + 8 + nameHeaderLength;
                var sectionLength = dataView.getUint16(offset + 6 + nameHeaderLength);

                return readIPTCData(file, startOffset, sectionLength);

                break;

            }


            // Not the marker, continue searching
            offset++;

        }

    }
    var IptcFieldMap = {
        0x78 : 'caption',
        0x6E : 'credit',
        0x19 : 'keywords',
        0x37 : 'dateCreated',
        0x50 : 'byline',
        0x55 : 'bylineTitle',
        0x7A : 'captionWriter',
        0x69 : 'headline',
        0x74 : 'copyright',
        0x0F : 'category'
    };
    function readIPTCData(file, startOffset, sectionLength){
        var dataView = new DataView(file);
        var data = {};
        var fieldValue, fieldName, dataSize, segmentType, segmentSize;
        var segmentStartPos = startOffset;
        while(segmentStartPos < startOffset+sectionLength) {
            if(dataView.getUint8(segmentStartPos) === 0x1C && dataView.getUint8(segmentStartPos+1) === 0x02){
                segmentType = dataView.getUint8(segmentStartPos+2);
                if(segmentType in IptcFieldMap) {
                    dataSize = dataView.getInt16(segmentStartPos+3);
                    segmentSize = dataSize + 5;
                    fieldName = IptcFieldMap[segmentType];
                    fieldValue = getStringFromDB(dataView, segmentStartPos+5, dataSize);
                    // Check if we already stored a value with this name
                    if(data.hasOwnProperty(fieldName)) {
                        // Value already stored with this name, create multivalue field
                        if(data[fieldName] instanceof Array) {
                            data[fieldName].push(fieldValue);
                        }
                        else {
                            data[fieldName] = [data[fieldName], fieldValue];
                        }
                    }
                    else {
                        data[fieldName] = fieldValue;
                    }
                }

            }
            segmentStartPos++;
        }
        return data;
    }



    function readTags(file, tiffStart, dirStart, strings, bigEnd) {
        var entries = file.getUint16(dirStart, !bigEnd),
            tags = {},
            entryOffset, tag,
            i;

        for (i=0;i<entries;i++) {
            entryOffset = dirStart + i*12 + 2;
            tag = strings[file.getUint16(entryOffset, !bigEnd)];
            tags[tag] = readTagValue(file, entryOffset, tiffStart, dirStart, bigEnd);
        }
        return tags;
    }


    function readTagValue(file, entryOffset, tiffStart, dirStart, bigEnd) {
        var type = file.getUint16(entryOffset+2, !bigEnd),
            numValues = file.getUint32(entryOffset+4, !bigEnd),
            valueOffset = file.getUint32(entryOffset+8, !bigEnd) + tiffStart,
            offset,
            vals, val, n,
            numerator, denominator;

        switch (type) {
            case 1: // byte, 8-bit unsigned int
            case 7: // undefined, 8-bit byte, value depending on field
                if (numValues == 1) {
                    return file.getUint8(entryOffset + 8, !bigEnd);
                } else {
                    offset = numValues > 4 ? valueOffset : (entryOffset + 8);
                    vals = [];
                    for (n=0;n<numValues;n++) {
                        vals[n] = file.getUint8(offset + n);
                    }
                    return vals;
                }

            case 2: // ascii, 8-bit byte
                offset = numValues > 4 ? valueOffset : (entryOffset + 8);
                return getStringFromDB(file, offset, numValues-1);

            case 3: // short, 16 bit int
                if (numValues == 1) {
                    return file.getUint16(entryOffset + 8, !bigEnd);
                } else {
                    offset = numValues > 2 ? valueOffset : (entryOffset + 8);
                    vals = [];
                    for (n=0;n<numValues;n++) {
                        vals[n] = file.getUint16(offset + 2*n, !bigEnd);
                    }
                    return vals;
                }

            case 4: // long, 32 bit int
                if (numValues == 1) {
                    return file.getUint32(entryOffset + 8, !bigEnd);
                } else {
                    vals = [];
                    for (n=0;n<numValues;n++) {
                        vals[n] = file.getUint32(valueOffset + 4*n, !bigEnd);
                    }
                    return vals;
                }

            case 5:    // rational = two long values, first is numerator, second is denominator
                if (numValues == 1) {
                    numerator = file.getUint32(valueOffset, !bigEnd);
                    denominator = file.getUint32(valueOffset+4, !bigEnd);
                    val = new Number(numerator / denominator);
                    val.numerator = numerator;
                    val.denominator = denominator;
                    return val;
                } else {
                    vals = [];
                    for (n=0;n<numValues;n++) {
                        numerator = file.getUint32(valueOffset + 8*n, !bigEnd);
                        denominator = file.getUint32(valueOffset+4 + 8*n, !bigEnd);
                        vals[n] = new Number(numerator / denominator);
                        vals[n].numerator = numerator;
                        vals[n].denominator = denominator;
                    }
                    return vals;
                }

            case 9: // slong, 32 bit signed int
                if (numValues == 1) {
                    return file.getInt32(entryOffset + 8, !bigEnd);
                } else {
                    vals = [];
                    for (n=0;n<numValues;n++) {
                        vals[n] = file.getInt32(valueOffset + 4*n, !bigEnd);
                    }
                    return vals;
                }

            case 10: // signed rational, two slongs, first is numerator, second is denominator
                if (numValues == 1) {
                    return file.getInt32(valueOffset, !bigEnd) / file.getInt32(valueOffset+4, !bigEnd);
                } else {
                    vals = [];
                    for (n=0;n<numValues;n++) {
                        vals[n] = file.getInt32(valueOffset + 8*n, !bigEnd) / file.getInt32(valueOffset+4 + 8*n, !bigEnd);
                    }
                    return vals;
                }
        }
    }

    /**
    * Given an IFD (Image File Directory) start offset
    * returns an offset to next IFD or 0 if it's the last IFD.
    */
    function getNextIFDOffset(dataView, dirStart, bigEnd){
        //the first 2bytes means the number of directory entries contains in this IFD
        var entries = dataView.getUint16(dirStart, !bigEnd);

        // After last directory entry, there is a 4bytes of data,
        // it means an offset to next IFD.
        // If its value is '0x00000000', it means this is the last IFD and there is no linked IFD.

        return dataView.getUint32(dirStart + 2 + entries * 12, !bigEnd); // each entry is 12 bytes long
    }

    function readThumbnailImage(dataView, tiffStart, firstIFDOffset, bigEnd){
        // get the IFD1 offset
        var IFD1OffsetPointer = getNextIFDOffset(dataView, tiffStart+firstIFDOffset, bigEnd);

        if (!IFD1OffsetPointer) {
            // console.log('******** IFD1Offset is empty, image thumb not found ********');
            return {};
        }
        else if (IFD1OffsetPointer > dataView.byteLength) { // this should not happen
            // console.log('******** IFD1Offset is outside the bounds of the DataView ********');
            return {};
        }
        // console.log('*******  thumbnail IFD offset (IFD1) is: %s', IFD1OffsetPointer);

        var thumbTags = readTags(dataView, tiffStart, tiffStart + IFD1OffsetPointer, IFD1Tags, bigEnd)

        // EXIF 2.3 specification for JPEG format thumbnail

        // If the value of Compression(0x0103) Tag in IFD1 is '6', thumbnail image format is JPEG.
        // Most of Exif image uses JPEG format for thumbnail. In that case, you can get offset of thumbnail
        // by JpegIFOffset(0x0201) Tag in IFD1, size of thumbnail by JpegIFByteCount(0x0202) Tag.
        // Data format is ordinary JPEG format, starts from 0xFFD8 and ends by 0xFFD9. It seems that
        // JPEG format and 160x120pixels of size are recommended thumbnail format for Exif2.1 or later.

        if (thumbTags['Compression']) {
            // console.log('Thumbnail image found!');

            switch (thumbTags['Compression']) {
                case 6:
                    // console.log('Thumbnail image format is JPEG');
                    if (thumbTags.JpegIFOffset && thumbTags.JpegIFByteCount) {
                    // extract the thumbnail
                        var tOffset = tiffStart + thumbTags.JpegIFOffset;
                        var tLength = thumbTags.JpegIFByteCount;
                        thumbTags['blob'] = new Blob([new Uint8Array(dataView.buffer, tOffset, tLength)], {
                            type: 'image/jpeg'
                        });
                    }
                break;

            case 1:
                console.log("Thumbnail image format is TIFF, which is not implemented.");
                break;
            default:
                console.log("Unknown thumbnail image format '%s'", thumbTags['Compression']);
            }
        }
        else if (thumbTags['PhotometricInterpretation'] == 2) {
            console.log("Thumbnail image format is RGB, which is not implemented.");
        }
        return thumbTags;
    }

    function getStringFromDB(buffer, start, length) {
        var outstr = "";
        for (var n = start; n < start+length; n++) {
            outstr += String.fromCharCode(buffer.getUint8(n));
        }
        return outstr;
    }

    function readEXIFData(file, start) {
        if (getStringFromDB(file, start, 4) != "Exif") {
            return false;
        }

        var bigEnd,
            tags, tag,
            exifData, gpsData,
            tiffOffset = start + 6;

        // test for TIFF validity and endianness
        if (file.getUint16(tiffOffset) == 0x4949) {
            bigEnd = false;
        } else if (file.getUint16(tiffOffset) == 0x4D4D) {
            bigEnd = true;
        } else {
            return false;
        }

        if (file.getUint16(tiffOffset+2, !bigEnd) != 0x002A) {
            return false;
        }

        var firstIFDOffset = file.getUint32(tiffOffset+4, !bigEnd);

        if (firstIFDOffset < 0x00000008) {
            return false;
        }

        tags = readTags(file, tiffOffset, tiffOffset + firstIFDOffset, TiffTags, bigEnd);

        if (tags.ExifIFDPointer) {
            exifData = readTags(file, tiffOffset, tiffOffset + tags.ExifIFDPointer, ExifTags, bigEnd);
            for (tag in exifData) {
                switch (tag) {
                    case "LightSource" :
                    case "Flash" :
                    case "MeteringMode" :
                    case "ExposureProgram" :
                    case "SensingMethod" :
                    case "SceneCaptureType" :
                    case "SceneType" :
                    case "CustomRendered" :
                    case "WhiteBalance" :
                    case "GainControl" :
                    case "Contrast" :
                    case "Saturation" :
                    case "Sharpness" :
                    case "SubjectDistanceRange" :
                    case "FileSource" :
                        exifData[tag] = StringValues[tag][exifData[tag]];
                        break;

                    case "ExifVersion" :
                    case "FlashpixVersion" :
                        exifData[tag] = String.fromCharCode(exifData[tag][0], exifData[tag][1], exifData[tag][2], exifData[tag][3]);
                        break;

                    case "ComponentsConfiguration" :
                        exifData[tag] =
                            StringValues.Components[exifData[tag][0]] +
                            StringValues.Components[exifData[tag][1]] +
                            StringValues.Components[exifData[tag][2]] +
                            StringValues.Components[exifData[tag][3]];
                        break;
                }
                tags[tag] = exifData[tag];
            }
        }

        if (tags.GPSInfoIFDPointer) {
            gpsData = readTags(file, tiffOffset, tiffOffset + tags.GPSInfoIFDPointer, GPSTags, bigEnd);
            for (tag in gpsData) {
                switch (tag) {
                    case "GPSVersionID" :
                        gpsData[tag] = gpsData[tag][0] +
                            "." + gpsData[tag][1] +
                            "." + gpsData[tag][2] +
                            "." + gpsData[tag][3];
                        break;
                }
                tags[tag] = gpsData[tag];
            }
        }

        // extract thumbnail
        tags['thumbnail'] = readThumbnailImage(file, tiffOffset, firstIFDOffset, bigEnd);

        return tags;
    }

   function findXMPinJPEG(file) {

        if (!('DOMParser' in self)) {
            // console.warn('XML parsing not supported without DOMParser');
            return;
        }
        var dataView = new DataView(file);

        if ((dataView.getUint8(0) != 0xFF) || (dataView.getUint8(1) != 0xD8)) {
           return false; // not a valid jpeg
        }

        var offset = 2,
            length = file.byteLength,
            dom = new DOMParser();

        while (offset < (length-4)) {
            if (getStringFromDB(dataView, offset, 4) == "http") {
                var startOffset = offset - 1;
                var sectionLength = dataView.getUint16(offset - 2) - 1;
                var xmpString = getStringFromDB(dataView, startOffset, sectionLength)
                var xmpEndIndex = xmpString.indexOf('xmpmeta>') + 8;
                xmpString = xmpString.substring( xmpString.indexOf( '<x:xmpmeta' ), xmpEndIndex );

                var indexOfXmp = xmpString.indexOf('x:xmpmeta') + 10
                //Many custom written programs embed xmp/xml without any namespace. Following are some of them.
                //Without these namespaces, XML is thought to be invalid by parsers
                xmpString = xmpString.slice(0, indexOfXmp)
                            + 'xmlns:Iptc4xmpCore="http://iptc.org/std/Iptc4xmpCore/1.0/xmlns/" '
                            + 'xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" '
                            + 'xmlns:tiff="http://ns.adobe.com/tiff/1.0/" '
                            + 'xmlns:plus="http://schemas.android.com/apk/lib/com.google.android.gms.plus" '
                            + 'xmlns:ext="http://www.gettyimages.com/xsltExtension/1.0" '
                            + 'xmlns:exif="http://ns.adobe.com/exif/1.0/" '
                            + 'xmlns:stEvt="http://ns.adobe.com/xap/1.0/sType/ResourceEvent#" '
                            + 'xmlns:stRef="http://ns.adobe.com/xap/1.0/sType/ResourceRef#" '
                            + 'xmlns:crs="http://ns.adobe.com/camera-raw-settings/1.0/" '
                            + 'xmlns:xapGImg="http://ns.adobe.com/xap/1.0/g/img/" '
                            + 'xmlns:Iptc4xmpExt="http://iptc.org/std/Iptc4xmpExt/2008-02-29/" '
                            + xmpString.slice(indexOfXmp)

                var domDocument = dom.parseFromString( xmpString, 'text/xml' );
                return xml2Object(domDocument);
            } else{
             offset++;
            }
        }
    }

    function xml2Object(xml) {
        try {
            var obj = {};
            if (xml.children.length > 0) {
              for (var i = 0; i < xml.children.length; i++) {
                var item = xml.children.item(i);
                var attributes = item.attributes;
                for(var idx in attributes) {
                    var itemAtt = attributes[idx];
                    var dataKey = itemAtt.nodeName;
                    var dataValue = itemAtt.nodeValue;

                    if(dataKey !== undefined) {
                        obj[dataKey] = dataValue;
                    }
                }
                var nodeName = item.nodeName;

                if (typeof (obj[nodeName]) == "undefined") {
                  obj[nodeName] = xml2json(item);
                } else {
                  if (typeof (obj[nodeName].push) == "undefined") {
                    var old = obj[nodeName];

                    obj[nodeName] = [];
                    obj[nodeName].push(old);
                  }
                  obj[nodeName].push(xml2json(item));
                }
              }
            } else {
              obj = xml.textContent;
            }
            return obj;
          } catch (e) {
              console.log(e.message);
          }
    }

    EXIF.getData = function(img, callback) {
        if (((self.Image && img instanceof self.Image)
            || (self.HTMLImageElement && img instanceof self.HTMLImageElement))
            && !img.complete)
            return false;

        if (!imageHasData(img)) {
            getImageData(img, callback);
        } else {
            if (callback) {
                callback.call(img);
            }
        }
        return true;
    }

    EXIF.getTag = function(img, tag) {
        if (!imageHasData(img)) return;
        return img.exifdata[tag];
    }
    
    EXIF.getIptcTag = function(img, tag) {
        if (!imageHasData(img)) return;
        return img.iptcdata[tag];
    }

    EXIF.getAllTags = function(img) {
        if (!imageHasData(img)) return {};
        var a,
            data = img.exifdata,
            tags = {};
        for (a in data) {
            if (data.hasOwnProperty(a)) {
                tags[a] = data[a];
            }
        }
        return tags;
    }
    
    EXIF.getAllIptcTags = function(img) {
        if (!imageHasData(img)) return {};
        var a,
            data = img.iptcdata,
            tags = {};
        for (a in data) {
            if (data.hasOwnProperty(a)) {
                tags[a] = data[a];
            }
        }
        return tags;
    }

    EXIF.pretty = function(img) {
        if (!imageHasData(img)) return "";
        var a,
            data = img.exifdata,
            strPretty = "";
        for (a in data) {
            if (data.hasOwnProperty(a)) {
                if (typeof data[a] == "object") {
                    if (data[a] instanceof Number) {
                        strPretty += a + " : " + data[a] + " [" + data[a].numerator + "/" + data[a].denominator + "]\r\n";
                    } else {
                        strPretty += a + " : [" + data[a].length + " values]\r\n";
                    }
                } else {
                    strPretty += a + " : " + data[a] + "\r\n";
                }
            }
        }
        return strPretty;
    }

    EXIF.readFromBinaryFile = function(file) {
        return findEXIFinJPEG(file);
    }

    return EXIF;
})() : undefined;


    return BarcodeReader;
}));
