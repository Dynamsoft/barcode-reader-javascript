# Changelog

### 7.2.2

Updated algorithm to 7.2.2. Include more barcode formats.

Frame filtering can be used to ignore blurred pictures during focusing.

Rewrite the code with typescript. Async and await are recommended now.

Remove nodejs to focus on web.

### [7.1.3](https://github.com/dynamsoft-dbr/javascript-barcode/tree/dac614f8033661901d85381dfaff8d612115862a) (latest nodejs version)

Add a more advanced react example.

### 7.1.1

Fix bug about torch. Torch (flashlight) is supported in chrome with the supported cameras.

### 7.1.0

Updated algorithm to 7.1. 

Improved the speed to download, build and initialize the library.

Improved the readability of barcode result text by using UTF-8 encoding.

Improved developer’s guide to be clearer and more precise.

Renamed setScanSettings for updateScanSettings for naming consistence.

### 7.0.0

Built Dynamsoft Barcode Reader 7.0 to JS(WebAssembly) version.

Added the capability to enable/disable the torch/flashlight of a mobile device (when available, only Chrome on Android).

Added APIs for finer video control. These APIs are getAllCameras, getCurrentCamera, setCurrentCamera, getResolution, setResolution.

### 6.5.2.1

Improve video decoding capabilities.

### 6.5.2

Built Dynamsoft Barcode Reader 6.5.2 to JS(WebAssembly) version.

Walkaround for certain scenarios of [Content Security Policy (CSP)](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP).

Add a setting can turn off the feature of using IndexedDB.

### 6.5.1
Added video view for barcode scan. Compatible with Node.js.

### 6.4.1.3

The `dbr-6.4.1.3.wasm` size is now reduced to 3.41M.

### 6.4.1.1

Fixed a memory leak related to `mTimeout` in `RuntimeSettings`.

### 6.4.1.0

Built Dynamsoft Barcode Reader 6.4.1 to JS(WebAssembly) version.

Combined the normal and the mobile version into one.

### 6.3.0.2

Added built-in Worker support.

### 6.3.0.1

Set `dbr-<version>.js`(stable) as the main branch.

Added `dbr-<version>.mobile.js`(smaller, compiles quicker, requires less memory, but not as stable) for mobile Safari.

### 6.3.0

Dynamsoft Barcode Reader JS/WebAssembly version released.