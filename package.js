Package.describe({
  name: 'dynamsoft:javascript-barcode',
  version: '7.1.2',
  summary: 'A JavaScript barcode library that enables you to build web barcode reader app',
  git: 'https://github.com/dynamsoft-dbr/javascript-barcode.git',
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.8.0.1');
  api.addAssets([
    'dist/dbr.d.ts',
    'dist/dbr.esm.d.ts',
    'dist/dbr.esm.min.js',
    'dist/dbr.min.js',
    'dist/dbr-7.1.2.d.ts',
    'dist/dbr-7.1.2.esm.d.ts',
    'dist/dbr-7.1.2.esm.min.js',
    'dist/dbr-7.1.2.min.js',
    'dist/dbr-7.1.2.wasm',
    'dist/dbr-7.1.2.wasm.min.js',
    'dist/dbr-7.1.2.wasm.withio.min.js',
    'dist/dbr-7.1.2.withio.wasm'
  ], 'client');
});

