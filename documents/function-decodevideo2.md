# function .decodeVideo()

### Description

A useful function when you want to decode video. It uses built-in [drawImage](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/drawImage) before decoding.

### Syntax

```js
.decodeVideo(video, dWidth, dHeight)
```

### Parameter

| parameter | type | Description |
| --- | --- | --- |
| video | `HTMLVideoElement` |  |
| dWidth | `number` |  |
| dHeight | `number` |  |

### Returned Value

| Type | Description |
| --- | --- |
| `Promise(resolve(array), reject(ex))` | The array element is [TextResult](objectTextResult.md). |

### Example

```js
// decode a region in video to speed up decoding
var vw = video.videoWidth;
var vh = video.videoHeight;
var vw_2 = Math.round(vw * 0.2);
var vh_2 = Math.round(vh * 0.2);
var vw_6 = Math.round(vw * 0.6);
var vh_6 = Math.round(vh * 0.6);
reader.decodeVideo(video, vw_2, vh_2, vw_6, vh_6, vw_6, vh_6).then(results=>{
    for(var i = 0; i < results.length; ++i){
        console.log(results[i].BarcodeText);
    }
})
```

### See Also

[drawImage](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/drawImage))*