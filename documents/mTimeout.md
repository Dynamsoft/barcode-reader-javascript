# mTimeout

Sets the maximum amount of time (in milliseconds) it should spend searching for a barcode per page. It does not include the time taken to load/decode an image (Tiff, PNG, etc) from disk into memory.

### Presence

Optional

### Type

number

### Values

[0,7fffffff]

### Default Value

10000

### Example

```JSON
{
    "Timeout": 10000,
}
```