# AngularDart Barcode Reader

A web barcode reader app that uses [AngularDart](https://webdev.dartlang.org/angular) and
[Dynamsoft JavaScript Barcode SDK](https://www.dynamsoft.com/Products/barcode-recognition-javascript.aspx).

## Usage
1. Get a free [trial license](https://www.dynamsoft.com/CustomerPortal/Portal/Triallicense.aspx). 
2. Open `web/index.html` to set your license:

    ```js
    dynamsoft.dbrEnv.licenseKey =
          't0068NQAAAJUlQ1oDc6zPWxOAQWn7kD9EGtgZFIqK/k3ULJC5ccG9Xe/lpVOxod82bm6nXxqQXUpC1zjRXU514mWw9XLE1JM=';
    ```

3. Run the app:

    ```
    webdev serve
    ```

    ![AngularDart barcode reader](https://www.codepool.biz/wp-content/uploads/2018/12/angulardart-barcode-reader.PNG)
    
## Blog
[How to Use JavaScript Barcode SDK in AngularDart Project](https://www.codepool.biz/angulardart-javascript-barcode-reader.html)
