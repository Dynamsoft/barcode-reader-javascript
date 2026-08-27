# Dynamsoft Barcode Reader JavaScript - ZIP Package Guide

Welcome! This package contains all resource files related to **Dynamsoft Barcode Reader JavaScript SDK**, and sample projects demonstrating how to use it.

---

## System Requirements

### Secure Context (HTTPS Deployment)

When deploying your application / website for production, make sure to serve it via a secure HTTPS connection. This is required for two reasons:

- Access to the camera video stream is only granted in a security context. Most browsers impose this restriction.
- Dynamsoft License requires a secure context to work.

> Some browsers like Chrome may grant access for `http://127.0.0.1` and `http://localhost` or even for pages opened directly from the local disk (`file:///...`). This can be helpful for temporary development and testing.

### Browser Compatibility

The following table is a list of supported browsers based on the above requirements:

| Browser Name |     Version      |
| :----------: | :--------------: |
|    Chrome    | v78+             |
|   Firefox    | v68+             |
|     Edge     | v79+             |
|    Safari    | v14.5+           |

Apart from the browsers, the operating systems may impose some limitations of their own that could restrict the use of the SDK.

---

## License

Dynamsoft provides a complimentary trial license for the SDK. When you download the SDK package from the Dynamsoft website, after creating a Dynamsoft account, the following license will have a 30-day free trial:

`DLS2eyJvcmdhbml6YXRpb25JRCI6IjIwMDAwMSJ9`

>[!IMPORTANT]
> Once your trial license expires, the SDK will throw an error and cease to function. You can visit the Dynamsoft Customer Portal (https://www.dynamsoft.com/customer/license/trialLicense?product=dbr&utm_source=installer&package=js) to view your trial license details. Additionally, it's possible to extend the trial period via the customer portal, allowing for a total trial duration of 60 days.

---

## Quick Start

Double-click `samples/basics/hello-world.html` to instantly see a fully functional web application that scans barcodes using your device's camera! You can also try `samples/basics/read-an-image.html` to decode barcodes from an image file.

>[!NOTE]
> These samples load the SDK from a CDN so they can be opened directly as local files without a web server. An internet connection is required. To serve everything from the local `dist/` folder, see [Deploying to Your Server](#deploying-to-your-server).

---

## How to Run the Samples

### 1. Unzip the Package

After unzipping, you should see the following structure:

- `dist/` — All Barcode Reader JavaScript SDK resources (`.js`, `.wasm`, worker files, etc.)
- `samples/` — Sample projects, including basic examples, framework integrations, and scenario demos
- `LICENSE` — Dynamsoft license terms
- `LEGAL.txt` — Third-party license notices

### 2. Open the Samples in a Browser

To explore the full set of available samples, open the `samples/index.html` file in your browser.

>[!NOTE]
> The included samples load from a CDN by default. To use the local `dist/` folder instead, a web server is required (the browser blocks local file fetches over `file:///`):
> - **Standalone & scenario samples**: Switch to the commented-out `<script>` tag that points to the local `dist/` folder. No other changes are needed — the SDK infers resource paths from the script tag location.
> - **Framework samples**: These use npm imports and explicitly set `engineResourcePaths` to a CDN URL. Update `engineResourcePaths.rootDirectory` to point to the local `dist/` folder.

Here are a couple of easy ways to start a local web server:

- Using Five Server VSCode extension

    If you are using VS Code, simply install the [Five Server extension](https://marketplace.visualstudio.com/items?itemName=yandeu.five-server), open the `samples` folder in the editor, and click "Go Live" in the bottom right corner of the editor. This will serve the sample project at http://127.0.0.1:5500/index.html.

- Using Node.js and `serve`

    If you have Node.js installed:

    ```bash
    cd path/to/samples
    npx serve . -l 8000
    ```

    Once the server is running, open your browser and navigate to `http://localhost:8000`. You'll see the `index.html` page, which links to all sample pages.

>[!TIP]
> Don't want to set up a local server? You can view the latest version of our samples hosted on the Dynamsoft server here:
>https://demo.dynamsoft.com/Samples/DBR/JS/index.html

---

## Sample Folders

The package includes three main sample directories:

- **`basics/`** - Simple standalone examples to get started quickly, including `hello-world.html` (scan multiple barcodes from a live camera), `scan-a-single-barcode.html`, and `read-an-image.html` (decode barcodes from an image file).

- **`frameworks/`** - Framework-specific examples showing how to integrate the Dynamsoft Barcode Reader into common web and hybrid frameworks. Included frameworks: Angular, Blazor, Capacitor, Electron, ES6, Native TypeScript, Next.js, Nuxt, PWA, React, RequireJS, Svelte, Vue, and WebView.

- **`scenarios/`** - Focused scenario samples covering common real-world uses of the Dynamsoft Barcode Reader, including workflow patterns (Cart Builder, Scan and Search, Batch Inventory, etc.), barcode-type-specific scanning (QR Code, DataMatrix, 1D Retail/Industrial, etc.), and data parsing (Driver's License, VIN, GS1-AI).

---

## Deploying to Your Server

When you're ready to deploy your application to production, copy the `dist` folder to your server and reference it in your project:

1. Copy the `dist` folder to your server
2. Include the script and configure the SDK to load all resources locally:

```html
<!DOCTYPE html>
<html>
<head>
    <title>Barcode Scanner</title>
    <!-- Adjust the path based on where you host the dist folder -->
    <script src="assets/dynamsoft-barcode-reader/dist/dbr.bundle.js"></script>
</head>
<body>
    <script>
        //...
    </script>
</body>
</html>
```

> When loading the SDK via a `<script>` tag, `engineResourcePaths` is optional — the SDK infers resource paths from the script tag location. It is required when using npm imports (e.g., in framework projects).

---

## Vibe Coding with AI Agents

This zip package ships an **AI coding skill** that gives GitHub Copilot, Claude, and Codex deep knowledge of the Dynamsoft Barcode Reader JavaScript SDK — so you can describe what you want and get working code instantly.

### How It Works

The skill lives in:

```
.github/skills/dbr-js-sample-creator/   ← GitHub Copilot (auto-discovered)
.claude/skills/dbr-js-sample-creator/   ← Claude Code (auto-discovered)
.codex/skills/dbr-js-sample-creator/    ← OpenAI Codex (auto-discovered)
```

No installation or configuration needed — just open this working directory in your AI-enabled editor.

---

## Documentation

For API reference and more advanced usage, visit:

- [Foundational API Docs](https://www.dynamsoft.com/barcode-reader/docs/web/programming/javascript/api-reference/index.html)

For more information about the resource files in the `dist/` directory, please refer to:

- [What’s in the dist folder of dynamsoft-barcode-reader-bundle](https://www.dynamsoft.com/faq/barcode-reader/web/capabilities/what-is-in-the-dist-folder-of-dbr.html)

---

## Support

If you run into any issues, please feel free to contact us at support@dynamsoft.com.

Copyright © 2026 Dynamsoft Corporation. All rights reserved.
