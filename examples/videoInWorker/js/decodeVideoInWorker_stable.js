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
dynamsoft.dbrEnv.licenseKey = "t0068MgAAAD2IrA1WJjiVx78RfaZ46qMyCY8DaqpvAD57z5QWkwVQkVwZEf7lE+M2QYbnPx9Fu/aFvCL1mz0Kh2YK0milUng=";

importScripts('https://demo.dynamsoft.com/dbr_wasm/js/dbr-6.3.0.stable.min.js');

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
        case "decodeBase64String": {
            var reader = new dynamsoft.BarcodeReader();
            reader.decodeBase64String(e.body).then(results=>{
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

