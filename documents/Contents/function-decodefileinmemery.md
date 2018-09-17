# function .decodeFileInMemery()

### Description

Decodes barcodes from an image file in memory.

### Syntax

```js
.decodeFileInMemery(source)
```

### Parameter

| parameter | type | Description |
| --- | --- | --- |
| source | `Blob` `ArrayBuffer` `Uint8Array` `HTMLImageElement` `HTMLCanvasElement` `HTMLVideoElement` `String`*(base64 with mime)* `String`*(url)* | The image to be decode, supporting png, jpeg, bmp and gif. |

### Returned Value

| Parameter | Type | Description |
| *(Return value)* | `Promise(resolve(array), reject(ex))` | The array element is like [TextResult](objectTextResult.md).  |

### Example

```js
reader.decodeFileInMemery('./imgs/example.png').then(results=>{
    for(var i = 0; i < results.length; ++i){
        console.log(results[i].BarcodeText);
        // Confidence >= 30 is reliable
        console.log(results[i].LocalizationResult.ExtendedResultArray[0].Confidence);
    }
})
```