# mTextFilterMode

Sets the text filter mode for barcodes search.

### Presence

Optional

### Type

number, String

### Values

```CSharp
enum TextFilterMode
{
    TFM_Disable = 1,
    TFM_Enable = 2
}
```

```JSON
"Disable",
"Enable",
```

### Default Value

"Enable"

### Remarks

If the barcode image contains lots of texts, filtering texts can speed up the recognition process.

### Example

```JSON
{
    "TextFilterMode": "Enable",
} 
```