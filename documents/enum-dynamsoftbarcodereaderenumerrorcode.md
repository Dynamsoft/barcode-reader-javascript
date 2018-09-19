# enum dynamsoft.BarcodeReader.EnumErrorCode

### Description

Defines the error code of dynamsoft.BarcodeReader.

### Allowed Values

| Error Code | Constant | Error Message |
| ------------- | ------------- | ------------- |
| 0 | DBR_SUCCESS | Successful. |
| 1 | DBR_SYSTEM_EXCEPTION | System exception is thrown. |
| -10000 | DBRERR_UNKNOWN | Unknown error. |
| -10001 | DBRERR_NO_MEMORY | Not enough memory to perform the operation. |
| -10002 | DBR_NULL_REFERENCE | Null reference. |
| -10003 | DBRERR_LICENSE_INVALID | The license is invalid. |
| -10004 | DBRERR_LICENSE_EXPIRED | The license has expired. |
| -10005 | DBRERR_FILE_NOT_FOUND | The file to decode is not found. |
| -10006 | DBRERR_FILETYPE_NOT_SUPPORTED | The file type is not supported. |
| -10007 | DBRERR_BPP_NOT_SUPPORTED | The BPP(Bits per pixel) is not supported. |
| -10008 | DBRERR_INDEX_INVALID | The index is invalid. |
| -10009 | DBRERR_BARCODE_FORMAT_INVALID | The barcode format is invalid. |
| -10010 | DBRERR_CUSTOM_REGION_INVALID | The input region value parameter is invalid. |
| -10011 | DBRERR_MAX_BARCODE_NUMBER_INVALID | The maximum barcode number is invalid. |
| -10012 | DBRERR_IMAGE_READ_FAILED | Failed to read the image. |
| -10013 | DBRERR_TIFF_READ_FAILED | Failed to read the TIFF image. |
| -10016 | DBRERR_QR_LICENSE_INVALID  | The QR Code license is invalid. |
| -10017 | DBRERR_1D_LICENSE_INVALID  | The 1D Barcode license is invalid. |
| -10018 | DBRERR_DIB_BUFFER_INVALID | The DIB(device-independent bitmaps) buffer is invalid. |
| -10019 | DBRERR_PDF417_LICENSE_INVALID | The PDF417 barcode license is invalid. |
| -10020 | DBRERR_DATAMATRIX_LICENSE_INVALID | The DATAMATRIX barcode license is invalid. |
| -10021 | DBRERR_PDF_READ_FAILED | Failed to read the PDF file. |
| -10022 | DBRERR_PDF_DLL_MISSING | The PDF DLL is missing. |
| -10023 | DBRERR_PAGE_NUMBER_INVALID | The page number is invalid. |
| -10024 | DBRERR_CUSTOM_SIZE_INVALID | The custom size is invalid. |
| -10025 | DBRERR_CUSTOM_MODULESIZE_INVALID | The custom module size is invalid. |
| -10026 | DBRERR_RECOGNITION_TIMEOUT | Recognition timeout. |
| -10030 | DBRERR_JSON_PARSE_FAILED | Failed to parse the JSON string. |
| -10031 | DBRERR_JSON_TYPE_INVALID | The value type is invalid. |
| -10032 | DBRERR_JSON_KEY_INVALID | The key is invalid. |
| -10033 | DBRERR_JSON_VALUE_INVALID | The value is invalid or out of range. |
| -10034 | DBRERR_JSON_NAME_KEY_MISSING | The mandatory key "Name" is missing. |
| -10035 | DBRERR_JSON_NAME_VALUE_DUPLICATED | The value of the key "Name" is duplicated. |
| -10036 | DBRERR_TEMPLATE_NAME_INVALID | The template name is invalid. |
| -10037 | DBRERR_JSON_NAME_REFRENCE_INVALID | The name reference is invalid. |
| -10038 | DBR_PARAMETER_VALUE_INVALID | The parameter value is invalid. |
| -10039 | DBRERR_DOMAIN_NOT_MATCHED | The domain of your current site does not match the domain bound in the current product key. |
| -10040 | DBRERR_RESERVEDINFO_NOT_MATCHED | The reserved info does not match the reserved info bound in the current product key. |
| -10041 | DBRERR_AZTEC_LICENSE_INVALID | The AZTEC license is invalid. |

### Example

```js
try{
    reader.appendParameterTemplate({
        "ImageParameters": {
            "Name": "not exist",
            "BarcodeFormatIds": ["not exist"]
        }
    });
}catch(ex){
    if(ex instanceof dynamsoft.BarcodeReader.BarcodeReaderException){
        if(ex.code == dynamsoft.BarcodeReader.EnumErrorCode.DBR_JSON_VALUE_INVALID)){
            console.log("DBR_JSON_VALUE_INVALID: " + ex.message);
        }else{
            throw ex;
        }
    }else{
        throw ex;
    }
}
```