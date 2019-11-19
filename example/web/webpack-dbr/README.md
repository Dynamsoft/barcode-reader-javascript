# Webpack Demo

## Usage
1. Install dependencies:

    ```
    npm install
    ```

2. Get a [trial license](https://www.dynamsoft.com/CustomerPortal/Portal/Triallicense.aspx) and set the license in `src\index.js`:

    ```js
    BarcodeReader.licenseKey = 'LICENSE-KEY';
    ```

3. Run the build:

    ```
    npx webpack --config webpack.config.js
    ```

4. Host the folder using [Web Server for Chrome](https://chrome.google.com/webstore/detail/web-server-for-chrome/ofhbbkphhbklhfoeikjpcbhemlocgigb?hl=en).

5. Open the web barcode scanning app in your web browser.

## Blog
[Bundling Dynamsoft JavaScript Barcode Library with Webpack](https://www.codepool.biz/webpack-dynamsoft-javascript-barcode.html)
