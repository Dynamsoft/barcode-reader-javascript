# mLocalizationAlgorithmPriority

Sets the priority of localization algorithms.

### Presence

Optional

### Type

Array

### Values

```CSharp
enum EnumLocalizationAlgorithmPriority
{
    ELAP_ConnectedBlock =1,
    ELAP_Statistics=2,
    ELAP_Lines= 3,
    ELAP_FullImageAsBarcodeZone=4,
}
```

```JSON
"ConnectedBlock",
"Statistics",
"Lines",
"FullImageAsBarcodeZone"
```

### Default Value

""

### Remarks

**Default value** "": The library will automatically select optimized localization algorithm for your barcode image. The order for each image might be different.

**ConnectedBlock**: Localizes barcodes by searching connected blocks. This algorithm usually gives best result and it is recommended to set ConnectedBlock to the highest priority.

**Lines**: Localizes barcodes by searching for groups of lines. This is optimized for 1D and PDF417 barcodes.

**Statistics**: Localizes barcodes by groups of contiguous black-white regions. This is optimized for QRCode and DataMatrix.

**FullImageAsBarcodeZone**: Disables localization. In this mode, it will directly localize barcodes on the full image without localization. If there is nothing other than the barcode in the image, it is recommended to use this mode. If there are regions defined or detected, those regions will be used to decode directly rather than the whole image.

- If [TextFilterMode](TextFilterMode.md) is set to disable, localization by Lines must be set after localization by Connected Block to ensure some corresponding functions working correctly.
- If only Lines is chosen to be used for localization, [TextFilterMode](TextFilterMode.md) must be activated (i.e. be set to enable).  

### Example

```JSON
{
    "LocalizationAlgorithmPriority": ["ConnectedBlock", "Lines", "Statistics", "FullImageAsBarcodeZone"],
} 
```