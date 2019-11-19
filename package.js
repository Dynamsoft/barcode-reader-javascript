Package.describe({
  name: 'dynamsoft:javascript-barcode',
  version: '7.2.2',
  summary: 'A JavaScript barcode library that enables you to build web barcode reader app',
  git: 'https://github.com/dynamsoft-dbr/javascript-barcode.git',
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.8.0.1');
  api.addAssets([
    'dist/dbr.d.ts',
    'dist/dbr-7.2.2.d.ts',
    'dist/dbr.js',
    'dist/dbr.min.js',
    'dist/dbr-7.2.2.js',
    'dist/dbr-7.2.2.wasm',
    'dist/dbr-7.2.2.wasm.js',
    'dist/dbr-7.2.2.full.js',
    'dist/dbr-7.2.2.full.wasm',
    'dist/dbr-7.2.2.full.wasm.js'
  ], 'client');
});

