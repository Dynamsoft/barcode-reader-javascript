#object PublicRuntimeSettings

###Syntax

```js
typedef struct PublicRuntimeSettings
{
        number mTimeout;
        number mPDFRasterDPI; //readonly
        [TextFilterMode](enumTextFilterMode.md) mTextFilterMode;
        [RegionPredetectionMode](enumRegionPredetectionMode.md) mRegionPredetectionMode;
        char mLocalizationAlgorithmPriority[64];
        number mBarcodeFormatIds;
        number mMaxAlgorithmThreadCount;
        number mTextureDetectionSensitivity;
        number mDeblurLevel;
        number mAntiDamageLevel;
        number mMaxImageDimensionToLocalizeBarcodesOnFullImage;
        number mMaxBarcodesCount;
        [BarcodeInvertMode](enumBarcodeInvertMode.md) mBarcodeInvertMode;
        number mScaleDownThreshold;
        number mGrayEqualizationSensitivity;
        number mEnableFillBinaryVacancy;
        string mReserved[256];
        [ColourImageConvertMode](enumColourImageConvertMode.md) mColourImageConvertMode;
        number mExpectedBarcodesCount;
        number mBinarizationBlockSize;
};
```

### Example

```js
mAntiDamageLevel: 9
​mBarcodeFormatIds: 503317503
​mBarcodeInvertMode: 0
​mBinarizationBlockSize: 0
​mColourImageConvertMode: 0
​mDeblurLevel: 9
​mEnableFillBinaryVacancy: 1
​mExpectedBarcodesCount: 0
​mGrayEqualizationSensitivity: 0
​mLocalizationAlgorithmPriority: ""
​mMaxAlgorithmThreadCount: 4
​mMaxBarcodesCount: 2147483647
​mMaxImageDimensionToLocalizeBarcodesOnFullImage: 262144
​mPDFRasterDPI: 300
​mRegionPredetectionMode: 1
​mReserved: ""
​mScaleDownThreshold: 2300
​mTextFilterMode: 2
​mTextureDetectionSensitivity: 5
​mTimeout: 10000
```