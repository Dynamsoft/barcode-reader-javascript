#function .getRuntimeSettings()

### Description

Gets current settings and saves it into a struct.

### Syntax

```js
.getRuntimeSettings()`
```

### Returned value

| parameter | type | Description |
| --- | --- | --- |
|Returned value| `PlainObject` | an object of [PublicRuntimeSettings](PublicRuntimeSettings.md)* |

### Example

```js
//get the settings
var settings = reader.getRuntimeSettings();
//modify it
settings.mExpectedBarcodesCount = 3;
//update the settings
reader.updateRuntimeSettings(settings);
//read using the new settings
reader.decodeFileInMemory('img/example.png').then(result=>{
    for(var i = 0; i < results.length; ++i){
        console.log(results[i].BarcodeText);
    }
    //reset settings
    reader.resetRuntimeSettings();
});
```

### See Also

* [function .updateRuntimeSettings()](functionupdateruntimesettings.md)
* [function .resetRuntimeSettings()](function-resetruntimesettings.md)
