# mExpectedBarcodesCount

The expected number of barcodes to read for each image (or each region of the image if you specified barcode regions).

### Presence

Optional

### Type

number

### Values

[0,0x7fffffff]

### Default Value

0

### Remarks

0: means Unknown and it will find at least one barcode.
1: try to find one barcode. If one barcode is found, the library will stop localization process and perform barcode decoding.
n: try to find n barcodes. If the library only finds m (m < n) barcode, it will try different algorithms till n barcodes are found or all algorithms are used.

### Example

```JSON
{
    "ExpectedBarcodesCount": 5
}
```