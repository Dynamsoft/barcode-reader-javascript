# enum dynamsoft.BarcodeReader.EnumBarcodeFormat

### Description

Describes the type of the barcode.

### Allowed Values

| Allowed Values  | Hex Value | Barcode Type |
| ------------- | ------------- | ------------- |
| BF_All | 0x1E0003FF | All following barcodes types |
| BF_OneD | 0x3FF | One-D barcode |
| BF_CODE_39 | 0x1 | Code 39 |
| BF_CODE_128 | 0x2 | Code 128 |
| BF_CODE_93 | 0x4 | Code 93 |
| BF_CODABAR | 0x8 | Codabar |
| BF_ITF | 0x10 | Interleaved 2 of 5 |
| BF_EAN_13 | 0x20 | EAN-13 |
| BF_EAN_8 | 0x40 | EAN-8 |
| BF_UPC_A | 0x80 | UPC-A |
| BF_UPC_E | 0x100 | UPC-E |
| BF_INDUSTRIAL_25 | 0x200 | Industrial 2 of 5 |
| BF_PDF417 | 0x2000000 | PDF417 |
| BF_QR_CODE | 0x4000000 | QR Code |
| BF_DATAMATRIX | 0x8000000 | DATAMATRIX |
| BF_AZTEC  | 0x10000000  | AZTEC |

### Example

```js
if(results[0].BarcodeFormat == dynamsoft.BarcodeReader.EnumBarcodeFormat.QR_CODE){
    // The format is QR code.
}
```