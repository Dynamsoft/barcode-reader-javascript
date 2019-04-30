# TextResult

Stores the text result including the format, the text, the bytes, the localization result etc.

### Syntax

```C
typedef struct tagSTextResult
{
	BarcodeFormat emBarcodeFormat;

	const char* pszBarcodeFormatString;

	const char* pszBarcodeText;

	unsigned char* pBarcodeBytes;

	int nBarcodeBytesLength;

	SLocalizationResult* pLocalizationResult;
} STextResult, *PSTextResult;

```

### Members

| Members | Description |
| ------------- | ------------- |
| [ResultType](enum-dynamsoftbarcodereaderenumresulttype.md) emResultType| The barcode format. |
| pszBarcodeFormatString | Barcode type in string. |
| pszBarcodeText | The barcode text, ends by '\0'. |
| pBarcodeBytes | The barcode content in a byte array. |
| nBarcodeBytesLength | The length of the byte array. |
| [SLocalizationResult](objectLocalizationResult.md) pLocalizationResult| The corresponding localization result. |