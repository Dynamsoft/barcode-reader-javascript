# mAntiDamageLevel

The degree of anti-damage of the barcode. This value decides how many localization algorithms will be used. To ensure the best results, the value of AntiDamageLevel is suggested to be set to 9 if the ExpectedBarcodesCount is set to 0 or 1; otherwise, the value of AntiDamageLevel is suggested to be set to 7.

### Presence

Optional

### Type

number

### Values

[0,9]

### Default Value

9

### Example

```JSON
{
    "AntiDamageLevel": 9
}
```
