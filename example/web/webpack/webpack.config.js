const path = require('path');
// const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: './src/index.js',

    //You can let dbrjs use local resource:
    //1. config copy resource to './dist/' by use `copy-webpack-plugin`
    //2. set `Dynamsoft.BarcodeReader.engineResourcePath = './dist/'` in `./src/index.js`
    // plugins: [
    //     new CopyPlugin([
    //         {
    //             from: './node_modules/keillion-dynamsoft-javascript-barcode/dist',
    //             to: path.resolve(__dirname, 'dist'),
    //             ignore: ['*.ts'],
    //         }
    //     ]),
    // ],

    // these are modules require by node, not need by web
    // externals: {
    //     os: 'os',
    //     worker_threads: 'worker_threads',
    //     https: 'https',
    //     http: 'http',
    //     fs: 'fs',
    //     path: 'path',
    // },
    // node: false, // completely turn off webpack injection
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    }
};
