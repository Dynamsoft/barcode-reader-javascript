Package.describe({
  name: 'dynamsoft:javascript-barcode',
  version: '7.1.3',
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
    'dist/dbr-7.1.3.d.ts',
    'dist/dbr-7.1.3.esm.d.ts',
    'dist/dbr-7.1.3.esm.min.js',
    'dist/dbr-7.1.3.min.js',
    'dist/dbr-7.1.3.wasm',
    'dist/dbr-7.1.3.wasm.min.js',
    'dist/dbr-7.1.3.wasm.withio.min.js',
    'dist/dbr-7.1.3.withio.wasm'
  ], 'client');
});

