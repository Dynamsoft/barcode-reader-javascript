postMessage({type:"log",body:"start load worker"});

// optional, define the log function
kConsoleLog = function(message){
    try{
        postMessage({type:"log",body:message});
    }catch(ex){//some message can't send by worker
        console.error(message);
    }
};

dynamsoft = self.dynamsoft || {};
dynamsoft.dbrEnv = dynamsoft.dbrEnv || {};

// by default, js would load `dbr-<version>.wasm` in the same folder of the context
// set it when you put `dbr-<version>.wasm` other place
// case you put `dbr-<version>.wasm` in 'js/dbr-<version>.wasm', set this 'js'
dynamsoft.dbrEnv.resourcesPath = 'https://demo.dynamsoft.com/dbr_wasm/js';

dynamsoft.dbrEnv.onAutoLoadWasmSuccess = function(){
    postMessage({type:"log",body:"load dbr wasm success."});
    postMessage({type:"load",success:true});
};
dynamsoft.dbrEnv.onAutoLoadWasmError = function(status){
    console.log(status);
    postMessage({type:"log",body:"load wasm failed" + status});
};

//https://www.dynamsoft.com/CustomerPortal/Portal/TrialLicense.aspx
dynamsoft.dbrEnv.licenseKey = "t0068NQAAAHMUCDhfZ0YuSKK+VDYxxaZRP22b9t6lHkzWLzPffEUmUBJvoF5tRw5mSWm/jhVxJ424aWxMyyqhrDrflfajmGE=";

(function(bMobileSafari){
    if(!bMobileSafari){
        importScripts("https://demo.dynamsoft.com/dbr_wasm/js/dbr-6.3.0.1.min.js");
    }else{// bMobileSafari
        // js for mobile(safari especially): smaller, compile quicker, need less memory, but not that stable
        importScripts("https://demo.dynamsoft.com/dbr_wasm/js/dbr-6.3.0.1.mobile.min.js");
    }
})(/Safari/.test(navigator.userAgent) && /iPhone/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent));

onmessage = function(e){
    e = e.data;
    switch(e.type){
        case "decodeBuffer": {
            var reader = new dynamsoft.BarcodeReader();
            reader.decodeBuffer(e.body, e.width, e.height, e.width * 4, dynamsoft.BarcodeReader.EnumImagePixelFormat.IPF_ARGB_8888).then(results=>{
                postMessage({type:"task", id: e.id, body: {success: true, results: results}});
            }).catch(ex=>{
                postMessage({type:"task", id: e.id, body: {success: false, message:ex.message||ex}});
            });
            break;
        }
        default: {
            postMessage({type:"task", id: e.id, body: {success: false, message:"No such task."}});
        }
    }
};

