# function .decodeBase64String()

### Description

Decodes barcode from an image file encoded as a base64 string.

### Syntax

```js
.decodeBase64String(base64Str)
```

### Parameter

| Parameter | Type | Description |
| --- | --- | --- |
| base64Str | `String`*(base64 with or without mime)* |  |

### Returned Value

| Parameter | Type | Description |
| --- | --- | --- |
| *(Return value)* | `Promise(resolve(array), reject(ex))` | The array element is [TextResult](objectTextResult.md).  |

### Example

```js
var base64str = 'data:image/png;base64,xxxxxxx';
//with mime
reader.decodeBase64String(base64str).then(results=>{
    for(var i = 0; i < results.length; ++i){
        console.log(results[i].BarcodeText);
    }
});
//without mime
reader.decodeBase64String(base64str.substring(base64str.indexOf(',') + 1)).then(results=>{
    for(var i = 0; i < results.length; ++i){
        console.log(results[i].BarcodeText);
    }
});
```