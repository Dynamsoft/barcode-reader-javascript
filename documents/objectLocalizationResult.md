# LocalizationResult

Stores the localization result including the boundary, the angle, the page number, the region name, etc. 

### Syntax

```C
typedef struct tagSLocalizationResult
{
	TerminateStage emTerminateStage;

	BarcodeFormat emBarcodeFormat;

	const char* pszBarcodeFormatString;

	int iX1;
	
	int iY1;
	
	int iX2;
	
	int iY2;

	int iX3;

	int iY3;

	int iX4;

	int iY4;

	int iAngle;  

	int iModuleSize;

	int iPageNumber;

	const char* pszRegionName;

	const char* pszDocumentName;

	int nResultsCount;

	PSExtendedResult* ppResults;
}SLocalizationResult, *PSLocalizationResult;


```

### Members

| Members | Description |
| ------------- | ------------- |
| [ResultType](enum-dynamsoftbarcodereaderenumresulttype.md) emResultType| The barcode format. |
| [BarcodeFormat](enum-dynamsoftbarcodereaderenumbarcodeformat.md) emBarcodeFormat| Barcode format. |
| pszBarcodeFormatString | Barcode type in string. |
| iX1 | The X coordinate of the left-most point.  ![BarcodeCoordinates](/img/DWT_BarcodeSample.png) |
| iY1 | The Y coordinate of the left-most point. |
| iX2 | The X coordinate of the second point in a clockwise direction. |
| iY2 | The Y coordinate of the second point in a clockwise direction. |
| iX3 | The X coordinate of the third point in a clockwise direction. |
| iY3 | The Y coordinate of the third point in a clockwise direction. |
| iX4 | The X coordinate of the fourth point in a clockwise direction. |
| iY4 | The Y coordinate of the fourth point in a clockwise direction. |
| iAngle | The angle of a barcode. Values range from 0 to 360. |
| iModuleSize | The barcode module size (the minimum bar width in pixel). |
| iPageNumber | The page number the barcode located in. The index is 0-based. |
| pszRegionName | The region name the barcode located in. |
| pszDocumentName | The document name the barcode located in. |
| nResultsCount | Total extended result count. |
| [PSExtendedResult](structSExtendedResult.md)* ppResults | The extended result array . |