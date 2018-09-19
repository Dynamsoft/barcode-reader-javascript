# mMaxAlgorithmThreadCount

Sets how many image processing algorithm threads will be used to decode barcodes. 

### Presence

Optional

### Type

number

### Values

[1,4]

### Default Value

4

### Remarks

By default, our library concurrently runs four different threads for decoding barcodes in order to keep a balance between speed and quality. For some devices (e.g. Raspberry Pi) that is only using one core, you can set it to 1 for best speed.

### Example

```JSON
{
    "MaxAlgorithmThreadCount": 4,
} 
```