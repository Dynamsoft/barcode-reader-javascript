# enum dynamsoft.BarcodeReader.EnumResultType

### Description
Describes the extended result type.

### Allowed Values

| Member  | Description | Number |
| ------------- | ------------- |  ------------- |
| EDT_StandardText | Specifies the standard text. This means the barcode value. | 0 |
| EDT_RawText | Specifies the raw text. This means the text that includes start/stop characters, check digits, etc. | 1 |
| EDT_CandidateText | Specifies all the candidate text. This means all the standard text results decoded from the barcode. | 2 |
| EDT_PartialText (Not yet supported in version 6.0) | Specifies the partial Text. This means part of the text result decoded from the barcode. | 3 |