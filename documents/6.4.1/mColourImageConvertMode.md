# mColourImageConvertMode

Sets whether to convert colour images. Recommend setting it to "Auto" if you want to pre-detect the barcode regions.

### Presence

Optional

### Type

string, number

### Values

```CSharp
enum ColourImageConvertMode
{
    CICM_Auto = 0,
    CICM_Grayscale = 1
}
```

```JSON
"Auto",
"Grayscale"
```

### Default Value

"Auto"

### Example

```JSON
{
    "ColourImageConvertMode": "Auto"
}
```