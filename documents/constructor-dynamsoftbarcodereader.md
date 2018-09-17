# constructor dynamsoft.BarcodeReader()

### Description

Defines a class that provides functions for working with extracting barcode data.

### Syntax

```js
new dynamsoft.BarcodeReader( [licenceKeys] )
```

### Parameter

| parameter | type | Description |
| --- | --- | --- | 
| licenceKeys *(optional)* | `String` | If not set, the default value is `dynamsoft.dbrEnv.licenseKey`. |

### Returned Value
`dynamsoft.BarcodeReader` 

### Example
```js
var reader = new dynamsoft.BarcodeReader();
```

### Remarks

New an instance of BarcodeReader.
Don't forget to delete the instance using `DeleteInstance()` when you will not use the reader again.