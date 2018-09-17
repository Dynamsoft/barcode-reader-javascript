# Deployment

## Before Starting
All files which can be redistributed are located in: [INSTALLATION FOLDER]/Components/.

## Redistributing required files
According to your requirements, please choose the correct core file for distribution.

### For 32-bit Windows OS distribution:
| | File for distribution | How to distribute |
| ------------- | ------------- | ------------- |
| C/C++	| DynamsoftBarcodeReaderx86.dll, DynamicPdf.dll and vcomp110.dll | Copy the DLLs into the same folder as the application that references it. |
| .Net 2.0/4.0	| Dynamsoft.BarcodeReader.dll | Copy the dll into the same folder as the application that references it. |

### For 64-bit Windows OS distribution:

| | File for distribution | How to distribute |
| ------------- | ------------- | ------------- |
| C/C++	| DynamsoftBarcodeReaderx64.dll, DynamicPdfx64.dll and vcomp110.dll | Copy the files into the same folder as the application that references it. |
| .Net 2.0/4.0 | Dynamsoft.BarcodeReader.dll | Copy the dll into the same folder as the application that references it. |


**Note**

If you want to read barcodes from PDF files through C/C++ API, *DynamicPdf.dll* and *DynamicPdfx64.dll* should be put in the same folder as *DynamsoftBarcodeReaderx86.dll* and *DynamsoftBarcodeReaderx64.dll*. 