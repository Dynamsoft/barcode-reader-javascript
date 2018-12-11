# object dynamsoft.dbrEnv

*example:*
```js
// All the settings are optional, even dynamsoft and dynamsoft.dbrEnv.
dynamsoft = self.dynamsoft || {};
dynamsoft.dbrEnv = dynamsoft.dbrEnv || {};
dynamsoft.dbrEnv.licenseKey = "<a license key>",
// The default value is true. It wll load the wasm files automatically.
// If you want to load the file manually, please set it to false before loading "dbr-<version>.min.js"
// and call dynamsoft.BarcodeReader.loadWasm when needed.
dynamsoft.dbrEnv.bAutoLoadWasm = true;
// The default value is false. You can set it to true to decode in another thread so the UI won't stuck.
dynamsoft.dbrEnv.bUseWorker = false;
// By default, js will load `dbr-<version>.wasm` in the same folder as the context.
// Modify this setting when you put `dbr-<version>.wasm` somewhere else.
// e.g. Set this as 'js' when you place `dbr-<version>.wasm` at 'js/'.
dynamsoft.dbrEnv.resourcesPath = 'js';
dynamsoft.dbrEnv.onAutoLoadWasmSuccess: function(){
    console.log("success");
};
dynamsoft.dbrEnv.onAutoLoadWasmError: function(status){
    console.log("error");
};
```