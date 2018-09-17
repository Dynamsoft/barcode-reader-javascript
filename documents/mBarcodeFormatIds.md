# mBarcodeFormatIds

Sets which types of barcode to be read. Barcode types can be combined as an array. For example, if you want to choose Code_39 and Code_93, you can set it to ["CODE_39", "CODE_93"].

### Presence

Optional

### Type

Array

### Values

```Csharp
enum BarcodeFormat
{
    All = 503317503,
    OneD = 1023,
    CODE_39 = 1,
    CODE_128 = 2,
    CODE_93 = 4,
    CODABAR = 8,
    ITF = 16,
    EAN_13 = 32,
    EAN_8 = 64,
    UPC_A = 128,
    UPC_E = 256,
    INDUSTRIAL_25 = 512,
    PDF417 = 33554432,
    QR_CODE = 67108864,
    DATAMATRIX = 134217728,
    AZTEC = 268435456
}
```

```JSON
"All",
"AZTEC",
"CODABAR",
"CODE_128",
"CODE_39",
"CODE_93",
"DATAMATRIX",
"EAN_13",
"EAN_8",
"INDUSTRIAL_25",
"ITF",
"OneD",
"PDF417",
"QR_CODE",
"UPC_A",
"UPC_E"
```

### Default Value

"All"

### Example

```JSON
{
    "BarcodeFormatIds": ["OneD", "DATAMATRIX"],
}
```