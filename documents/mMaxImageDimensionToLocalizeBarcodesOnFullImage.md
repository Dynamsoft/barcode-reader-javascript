# mMaxImageDimensionToLocalizeBarcodesOnFullImage

The maximum dimension of full image as barcode zone.

Sets the maximum image dimension (in pixels) to localize barcode on the full image. If the image dimension is smaller than the given value, the library will localize barcode on the full image. Otherwise, "FullImageAsBarcodeZone" mode will not be enabled. 

### Presence

Optional

### Type

number

### Values

[261244,0x7fffffff]

### Default Value

261244

### Example

```JSON
{
    "MaxImageDimensionToLocalizeBarcodesOnFullImage": 261244
} 
```
