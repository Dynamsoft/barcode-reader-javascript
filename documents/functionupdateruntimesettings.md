#function .updateRuntimeSettings()

### Description

Updates runtime settings with a given struct.


### Syntax

```js
.updateRuntimeSettings(settings)
```

### Parameter

| parameter | type | Description |
| --- | --- | --- |
| settings | a `String`*(json)*, a `PlainObject` | The struct of template settings. |

### Returned value

```js
undefined
```

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

* [function .getRuntimeSettings()](functiongetruntimesettings.md)
* [function .resetRuntimeSettings()](functionresetruntimesettings.md)
