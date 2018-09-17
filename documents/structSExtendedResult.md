# PSExtendedResult

Stores the extended result including the format, the bytes, etc.

### Syntax

```C
typedef struct tagSExtendedResult
{
	ResultType emResultType;

	BarcodeFormat emBarcodeFormat;

	const char* pszBarcodeFormatString;

	int iConfidence;

	unsigned char* pBytes;

	int nBytesLength;
}SExtendedResult, *PSExtendedResult;

```

### Members

| Members | Description |
| ------------- | ------------- |
| [ResultType](enumResultType.md) emResultType| Extended result type. |
| [BarcodeFormat](enumBarcodeFormat.md) emBarcodeFormat| Barcode format. |
| pszBarcodeFormatString | Barcode type in string. |
| iConfidence | The confidence of the result. |
| pBytes | The content as in byte array. |
| nBytesLength | The length of the byte array. |

