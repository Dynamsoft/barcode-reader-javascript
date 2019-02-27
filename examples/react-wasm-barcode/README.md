This project shows how to create a web barcode app by using React and Dynamsoft [JavaScript barcode SDK](https://www.dynamsoft.com/Products/barcode-recognition-javascript.aspx).

## Usage

1. Get a [valid license](https://www.dynamsoft.com/CustomerPortal/Portal/Triallicense.aspx).

2. Open `public/index.html` to set your license:

    ```js
    dynamsoft.dbrEnv.licenseKey = "<Your Barcode License>";
    ```
3. Install dependencies:

    ```
    npm install
    ```

4. Run the app:

    ```
    npm start
    ```
    
    <kbd>![react web barcode reader](https://www.codepool.biz/wp-content/uploads/2019/01/react-web-barcode-reader.PNG)
    
    <kbd>![react webcam barcode scanner](https://www.codepool.biz/wp-content/uploads/2019/02/react-web-barcode-scanner-webcam.PNG)

## Blog
- [How to Build Web Barcode Apps with React and WebAssembly](https://www.codepool.biz/build-web-barcode-apps-react-wasm.html)
- [How to Build Web Barcode Scanner Using React and Webcam](https://www.codepool.biz/web-barcode-scanner-react-webcam.html)

## Reference
- [react-webcam](https://github.com/mozmorris/react-webcam)
