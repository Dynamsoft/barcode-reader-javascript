# function .decodeVideo()

### Description

A useful function when you want to decode video. It uses built-in [drawImage](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/drawImage) before decoding.

### Syntax

```js
.decodeVideo(video)
```

### Parameter

| Parameter | Type | Description |
| --- | --- | --- |
| video | `HTMLVideoElement` | |

### Returned Value

| Type | Description |
| --- | --- |
| `Promise(resolve(array), reject(ex))` | The array element is [TextResult](objectTextResult.md). |

### Example

```js
reader.decodeVideo(video).then(results=>{
    for(var i = 0; i < results.length; ++i){
        console.log(results[i].BarcodeText);
        // If Confidence >= 30, the result is reliable.
        console.log(results[i].LocalizationResult.ExtendedResultArray[0].Confidence);
    }
})
```