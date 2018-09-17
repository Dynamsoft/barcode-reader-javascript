# function .decodeBuffer()

### Description

Decodes barcodes from the memory buffer containing image pixels in defined format.

### Syntax

```js
.decodeBuffer(source, width, height, stride, enumImagePixelFormat)
```

### Parameter

| Parameter | Type | Description |
| --- | --- | --- |
| source | `Blob` `ArrayBuffer` `Uint8Array` | The image raw buffer. |
| width | `number` | The width of the image buffer. |
| height | `number` | The height of the image buffer. |
| stride | `number` | The stride width (also called scan width) of the image buffer. |
| enumImagePixelFormat | `number`*([dynamsoft.BarcodeReader.EnumImagePixelFormat](enum-dynamsoftbarcodereaderenumimagepixelformat.md))* | The pixel format of the image buffer. |

### Returned Value

| Type | Description |
| --- | --- |
| `Promise(resolve(array), reject(ex))` | The array element is [TextResult](objectTextResult.md). |

### Example

```js
var rawImgData = new Blob(['xxxxxxx']);
var width = 100;
var height = 200;
reader.decodeBuffer(rawImgData, width, height, width * 4, dynamsoft.BarcodeReader.EnumImagePixelFormat.IPF_ARGB_8888).then(results=>{
    for(var i = 0; i < results.length; ++i){
        console.log(results[i].BarcodeText);
    }
})
```
