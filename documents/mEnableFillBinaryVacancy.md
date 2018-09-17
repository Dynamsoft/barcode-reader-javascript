# mEnableFillBinaryVacancy

For barcodes with a large module size there might be a vacant area in the position detection pattern after binarization which may result in a decoding failure. Setting this to true will fill in the vacant area with black and may help to decode it successfully.  

### Presence

Optional

### Type

bool, number (0,1)

### Values

1 for true, 0 for false.

### Default Value

true

### Example

```JSON
{
    "EnableFillBinaryVacancy": true
}
```