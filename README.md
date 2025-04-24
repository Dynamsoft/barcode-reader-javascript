# Barcode Scanner JavaScript Edition - User Guide

- [Barcode Scanner JavaScript Edition - User Guide](#barcode-scanner-javascript-edition---user-guide)
  - [License](#license)
    - [Trial License](#trial-license)
    - [Full License](#full-license)
  - [Quick Start: Hello World Example](#quick-start-hello-world-example)
    - [Step 1: Setting up the HTML and Including the Barcode Scanner](#step-1-setting-up-the-html-and-including-the-barcode-scanner)
    - [Step 2: Initializing the Barcode Scanner](#step-2-initializing-the-barcode-scanner)
    - [Step 3: Launching the Barcode Scanner](#step-3-launching-the-barcode-scanner)
  - [Next Steps](#next-steps)

This user guide provides a step-by-step walkthrough of a "Hello World" web application using the `BarcodeScanner` JavaScript Edition.

The `BarcodeScanner` class offers the following features:

- High-level APIs that deliver core functionality with a single line of code.

- Pre-built UI components for fast and easy integration.

- Intuitive configuration objects that streamline both algorithm and UI setup.

We recommend using this guide as a reference when creating your own application. If you are looking for a fully customizable barcode decoding library, you are welcome to use the [Foundational APIs](https://www.dynamsoft.com/barcode-reader/docs/web/programming/javascript/user-guide/index.html). Before starting, ensure the **basic requirements** are met.

<!-- 
Thanks to its simplified APIs and built-in UI for video streaming, you can implement basic scanning functionality with just one line of code:

```js
new Dynamsoft.BarcodeScanner().launch().then(result=>alert(result.barcodeResults[0].text));
```

<p align="center" style="text-align:center; white-space: normal; ">
  <a target="_blank" href="https://jsfiddle.net/DynamsoftTeam/csm2f9wb/" title="Run via JSFiddle" style="text-decoration:none;">
    <img src="https://cdn.jsdelivr.net/npm/simple-icons@3.0.1/icons/jsfiddle.svg" alt="Run via JSFiddle" width="20" height="20" style="width:20px;height:20px;" >
  </a>
</p> 
-->

- Internet connection
- A supported browser
- Camera access

> [!TIP]
> Please refer to [system requirements](https://www.dynamsoft.com/barcode-reader/docs/web/programming/javascript/faq/system-requirement.html) for more details.

## License

### Trial License

<!-- When getting started with Barcode Scanner, we recommend getting your own 30-day trial license through the [customer portal](https://www.dynamsoft.com/customer/license/trialLicense/?product=dbr&utm_source=github&package=js). The trial license can be renewed via the same customer portal twice, each time for another 15 days, giving you a total of 60 days to develop your own application using the solution. Please contact the [Dynamsoft Support Team](https://www.dynamsoft.com/company/contact/) if you need more time for a full evaluation.

> [!NOTE]
> The **Barcode Scanner** license contains a license for the **Dynamsoft Barcode Reader**, and the **Dynamsoft Camera Enhancer** since the Barcode Scanner builds on top of those two products. 
-->

When getting started with Barcode Scanner, we recommend [getting your own 30-day trial license](https://www.dynamsoft.com/customer/license/trialLicense/?product=dbr&utm_source=github&package=js)

<!-- {% include trialLicense.html %} -->

> [!IMPORTANT]
> The trial license can be renewed via the [customer portal](https://www.dynamsoft.com/customer/license/trialLicense/?product=dbr&utm_source=github&package=js) twice, each time for another 15 days, giving you a total of 60 days to develop your own application using the solution. Please contact the [Dynamsoft Support Team](https://www.dynamsoft.com/company/contact/) if you need more time for a full evaluation.

### Full License

If you are fully satisfied with the solution and would like to move forward with a full license, please contact the [Dynamsoft Sales Team](https://www.dynamsoft.com/company/contact/).

## Quick Start: Hello World Example

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Dynamsoft Barcode Scanner - Hello World</title>
    <script src="https://cdn.jsdelivr.net/npm/dynamsoft-barcode-reader-bundle@10.5.3000/dist/dbr.bundle.js"></script>
  </head>

  <body>
    <h1 style="font-size: large">Dynamsoft Barcode Scanner</h1>

    <script>
      // Initialize the Dynamsoft Barcode Scanner
      const barcodeScanner = new Dynamsoft.BarcodeScanner({
        // Please don't forget to replace YOUR_LICENSE_KEY_HERE
        license: "YOUR_LICENSE_KEY_HERE",
      });
      (async () => {
        // Launch the scanner and wait for the result
        const result = await barcodeScanner.launch();
        alert(result.barcodeResults[0].text);
      })();
    </script>
  </body>
</html>
```

<p align="center" style="text-align:center; white-space: normal; ">
  <a target="_blank" href="https://github.com/Dynamsoft/barcode-reader-javascript-samples/blob/v10.5.30/scan-single-barcode/hello-world/hello-world.html" title="Code in Github" style="text-decoration:none;">
    <img src="https://cdn.jsdelivr.net/npm/simple-icons@3.0.1/icons/github.svg" alt="Code in Github" width="20" height="20" style="width:20px;height:20px;">
  </a>
  &nbsp;
  <a target="_blank" href="https://jsfiddle.net/DynamsoftTeam/gcqjf5r7/" title="Run via JSFiddle" style="text-decoration:none;">
    <img src="https://cdn.jsdelivr.net/npm/simple-icons@3.0.1/icons/jsfiddle.svg" alt="Run via JSFiddle" width="20" height="20" style="width:20px;height:20px;" >
  </a>
  &nbsp;
  <a target="_blank" href="https://demo.dynamsoft.com/Samples/DBR/JS/barcode-scanner-api-samples/scan-single-barcode/hello-world.html?ver=10.5.30&utm_source=github" title="Run in Dynamsoft" style="text-decoration:none;">
    <img src="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.0.0/svgs/solid/circle-play.svg" alt="Run in Dynamsoft" width="20" height="20" style="width:20px;height:20px;">
  </a>
</p>

### Step 1: Setting up the HTML and Including the Barcode Scanner

As outlined earlier, this guide will help you create a simple Hello World barcode scanning application using vanilla JavaScript. The full sample code is also available in the [GitHub repository](https://github.com/Dynamsoft/barcode-reader-javascript-samples/tree/v10.5.30).

The first step before writing the code is to include the SDK in your application. You can simply include the SDK by using the precompiled script.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Dynamsoft Barcode Scanner - Hello World</title>
    <script src="https://cdn.jsdelivr.net/npm/dynamsoft-barcode-reader-bundle@10.5.3000/dist/dbr.bundle.js"></script>
  </head>

  <body>
    <h1 style="font-size: large">Dynamsoft Barcode Scanner</h1>
  </body>

</html>
```

In this example, we include the precompiled Barcode Scanner SDK script via public CDN in the header.

<div class="multi-panel-switching-prefix"></div>

<div class="multi-panel-start"></div>
<div class="multi-panel-title">Use a public CDN</div>

The simplest way to include the SDK is to use either the [**jsDelivr**](https://jsdelivr.com/) or [**UNPKG**](https://unpkg.com/) CDN.

- jsDelivr

  ```html
  <script src="https://cdn.jsdelivr.net/npm/dynamsoft-barcode-reader-bundle@10.5.3000/dist/dbr.bundle.js"></script>
  ```

- UNPKG

  ```html
  <script src="https://unpkg.com/dynamsoft-barcode-reader-bundle@10.5.3000/dist/dbr.bundle.js"></script>
  ```

When using a framework such as **React**, **Vue** or **Angular**, we recommend adding the package as a dependency using a package manager such as **npm** or **yarn**:

  ```sh
  npm i dynamsoft-barcode-reader-bundle@10.5.3000
  # or
  yarn add dynamsoft-barcode-reader-bundle@10.5.3000
  ```

As for package managers like **npm** or **yarn**, you likely need to specify the location of the engine files as a link to a CDN. Please see the [BarcodeScannerConfig API](https://www.dynamsoft.com/barcode-reader/docs/web/programming/javascript/api-reference/barcode-scanner.html#barcodescannerconfig) for a code snippet on how to set the `engineResourcePaths`.
<div class="multi-panel-end"></div>

<div class="multi-panel-start"></div>
<div class="multi-panel-title">Host the SDK yourself</div>

Alternatively, you may choose to download the SDK and host the files on your own server or preferred CDN. This approach provides better control over versioning and availability.

- From the website

  [Download Dynamsoft Barcode Reader JavaScript Package](https://www.dynamsoft.com/barcode-reader/downloads/?ver=10.5.30&utm_source=github&product=dbr&package=js)

  The resources are located at path `dynamsoft/distributables/`.

- From npm

  ```sh
  npm i dynamsoft-barcode-reader-bundle@10.5.3000
  ```

  The resources are located at the path `node_modules/<pkg>`, without `@<version>`. You can copy it elsewhere and add `@<version>` tag. One more thing to do is to [specify the engineResourcePaths](https://www.dynamsoft.com/barcode-reader/docs/web/programming/javascript/api-reference/barcode-scanner.html#barcodescannerconfig) so that the SDK can correctly locate the resources.
  
  > [!IMPORTANT]
  > Since "node_modules" is reserved for Node.js dependencies, and in our case the package is used only as static resources, we recommend either renaming the "node_modules" folder or moving the "dynamsoft-" packages to a dedicated folder for static resources in your project to facilitate self-hosting.

You can typically include SDK like this:

```html
<script src="path/to/dynamsoft-barcode-reader-bundle@10.5.3000/dist/dbr.bundle.js"></script>
```
<div class="multi-panel-end"></div>

<div class="multi-panel-switching-end"></div>

Barcode Scanner comes with a **Ready-to-Use UI**. When the Barcode Scanner launches, it creates a container which it populates with the **Ready-to-Use UI**.

### Step 2: Initializing the Barcode Scanner

```js
// Initialize the Dynamsoft Barcode Scanner
const Barcodescanner = new Dynamsoft.BarcodeScanner({
  // Please don't forget to replace YOUR_LICENSE_KEY_HERE
  license: "YOUR_LICENSE_KEY_HERE", 
});
```

This is the **simplest** way to initialize the Barcode Scanner. The configuration object must include a valid **license** key. Without it, the scanner will fail to launch and display an error. For help obtaining a license, see the [licensing](#license) section.

> [!TIP]
> By default, the `BarcodeScanner` scans a single barcode at a time. However, it also supports a `MULTI_UNIQUE` scanning mode, which continuously scans and accumulates unique results in real time. You can enable this mode by modifying the [`BarcodeScannerConfig`](https://www.dynamsoft.com/barcode-reader/docs/web/programming/javascript/api-reference/barcode-scanner.html#barcodescannerconfig) as follows:

```js
// Initialize the Dynamsoft Barcode Scanner in MULTI_UNIQUE mode
const barcodescanner = new Dynamsoft.BarcodeScanner({
  license: "YOUR_LICENSE_KEY_HERE",
  scanMode: Dynamsoft.EnumScanMode.SM_MULTI_UNIQUE,
  showResultView: true,
});
```

### Step 3: Launching the Barcode Scanner

```js
(async () => {
  // Launch the scanner and wait for the result
  const result = await barcodescanner.launch();
  alert(result.barcodeResults[0].text);
})();
```

Now that the Barcode Scanner has been initialized and configured, it is ready to be launched! Upon launch, the Barcode Scanner presents the main **`BarcodeScannerView`** UI in its container on the page, and is ready to start scanning. By default, we use the `SINGLE` scanning mode, which means only one decoding result will be included in the final result. In the code above, we directly alerted the successfully decoded barcode text on the page.

> [!NOTE]
> In the Hello World sample, after a successfully decoding process, the scanner closes and the user is met with an empty page. In order to open the scanner again, the user must refresh the page. You may choose to implement a more user-friendly behavior in a production environment, such as presenting the user with an option to re-open the Barcode Scanner upon closing it.

## Next Steps

Now that you've implemented the basic functionality, here are some recommended next steps to further explore the capabilities of the Barcode Scanner

1. Learn how to [Customize the Barcode Scanner](https://www.dynamsoft.com/barcode-reader/docs/web/programming/javascript/user-guide/barcode-scanner-customization.html)
2. Check out the [Official Samples and Demo](https://www.dynamsoft.com/barcode-reader/docs/web/programming/javascript/samples-demos/index.html?ver=10.5.30)
3. Learn about the [APIs of BarcodeScanner](https://www.dynamsoft.com/barcode-reader/docs/web/programming/javascript/api-reference/barcode-scanner.html?ver=10.5.3000)
