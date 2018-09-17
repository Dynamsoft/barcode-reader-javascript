# mScaleDownThreshold

Sets the threshold value of the image shrinking. If the shorter edge size is larger than the given value, the library will calculate the required height and width of the barcode image and shrink the image to that size before localization. Otherwise, it will perform barcode localization on the original image.

### Presence

Optional

### Type

number

### Values

[512, 0x7fffffff]

### Default Value

2300

### Example

```JSON
{
    "ScaleDownThreshold": 3400,
} 
```