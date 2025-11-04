# Dynamsoft Barcode Reader JavaScript – Package Readme

Welcome! This package contains all resource files related to **Dynamsoft Barcode Reader JavaScript SDK**, and sample projects demonstrating how to use it.

---

## How to Run the Samples

### 1. Unzip the Sample Files

After unzipping, you should see two folders: `dist`, which contains all the Barcode Reader JavaScript SDK resources, and `samples`, which includes subfolders for the individual sample projects.

### 2. Open the Samples in a Browser

To explore the full set of available samples, open the `index.html` file in your browser.

>[!IMPORTANT]
> Some browsers block local file access for security reasons. To avoid these restrictions, run the samples through a local web server.

Here are a couple of easy ways to start one:

- Using Five Server VSCode extension

    If you are using VS Code, simply install the [Five Server extension](https://marketplace.visualstudio.com/items?itemName=yandeu.five-server), open the `Samples` folder in the editor, and click "Go Live" in the bottom right corner of the editor. This will serve the sample project at http://127.0.0.1:5500/index.html.

- Using Node.js and `serve`

    If you have Node.js installed:

    ```bash
    cd path/to/samples
    npx serve . -l 8000
    ```

    Once the server is running, open your browser and navigate to:
    
    ```bash
    http://localhost:8000
    ```
    
    You’ll see the `index.html` page, which links to all sample pages.

>[!TIP]
> Don’t want to set up a local server? You can view the latest version of our samples hosted on the Dynamsoft server here:
>https://demo.dynamsoft.com/Samples/DBR/JS/index.html

---

## Sample Folders

- `barcode-scanner-api-samples/` – Samples using the Barcode Scanner API with a prebuilt interactive UI, making barcode scanning integration quick and easy.
- `foundational-api-samples/` – Samples using the foundational API with full customization capabilities.

---

## Documentation

For API reference and more advanced usage, visit:

- [Barcode Scanner API Docs](https://www.dynamsoft.com/barcode-reader/docs/web/programming/javascript/api-reference/barcode-scanner.html)
- [Foundational API Docs](https://www.dynamsoft.com/barcode-reader/docs/web/programming/javascript/api-reference/index.html)

---

## License

Dynamsoft provides a complimentary trial license for the SDK. When you download the SDK package from the Dynamsoft website, after creating a Dynamsoft account, the following license will have a 30-day free trial:

`DLS2eyJvcmdhbml6YXRpb25JRCI6IjIwMDAwMSJ9`

You can visit the Dynamsoft Customer Portal (https://www.dynamsoft.com/customer/license/trialLicense?product=dbr&utm_source=installer&package=js) to view your trial license details. Additionally, it's possible to extend the trial period via the customer portal, allowing for a total trial duration of 60 days.

## Contact

If you run into any issues, please feel free to contact us at `support@dynamsoft.com`.

Copyright © Dynamsoft Corporation.  All rights reserved.