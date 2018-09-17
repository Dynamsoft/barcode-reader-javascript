# function dynamsoft.BarcodeReader.loadWasm()

### Description

Load the DBR-WASM manually.

### Syntax

```js
dynamsoft.BarcodeReader.loadWasm()
```

### Returned Value

| parameter | type | Description |
| --- | --- | --- |
| *(Return value)* | `Promise(resolve(null), reject(ex))` |

### Remarks

Only need to call manually when you set `dynamsoft.dbrEnv.bAutoLoadWasm` as `false`.