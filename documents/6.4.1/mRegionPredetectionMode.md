# mRegionPredetectionMode

Sets the region pre-detection mode for barcodes search. If you want to pre-detect barcode regions, it is better to set the [ColourImageConvertMode](ColourImageConvertMode.md) to "Auto".

### Presence

Optional

### Type

number, String

### Values

```CSharp
enum RegionPredetectionMode
{
    RPM_Disable = 1,
    RPM_Enable = 2
}
```

```JSON
"Disable", 
"Enable" 
```

### Default Value

"Disable"

### Remarks

**RPM_Disable**: Disable the feature of pre-detecting barcode regions.
**RPM_Enable**: Detects barcode region based on statistical properties of pixel colours, which is used to speed up barcode localization.

### Example
```JSON
{
    "RegionPredetectionMode": "Enable",
} 
```