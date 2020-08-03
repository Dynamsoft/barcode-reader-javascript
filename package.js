Package.describe({
  name: 'dynamsoft:javascript-barcode',
  version: '7.3.0-v4',
  summary: 'Dynamsoft Barcode Reader JS is a recognition SDK which enables you to embed barcode reading functionality in your web, desktop, and mobile applications. With a few lines of JavaScript code, you can develop a robust application to scan a linear barcode, QR Code, DaraMatrix, PDF417, and Aztec Code.',
  git: 'https://github.com/dynamsoft/javascript-barcode.git',
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.8.0.1');
  api.addAssets([
    "/dist/dbr.js",
    "/dist/dbr.mjs",
    "/dist/dbr.browser.mjs",
    "/dist/dbr-7.5.0.worker.js",
    "/dist/dbr-7.5.0.wasm.js",
    "/dist/dbr-7.5.0.wasm",
    "/dist/dbr-7.5.0.full.wasm.js",
    "/dist/dbr-7.5.0.full.wasm",
    "/dist/dbr-7.5.0.node.wasm.js",
    "/dist/dbr-7.5.0.node.wasm",
    "/dist/dbr.d.ts",
    "/dist/dbr.reference.d.ts",
    "/dist/dbr.scanner.html"
  ], 'client');
});

