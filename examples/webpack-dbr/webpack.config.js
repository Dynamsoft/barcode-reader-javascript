const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    plugins: [
        new CopyPlugin([
            {
                from: './node_modules/dynamsoft-javascript-barcode/dist',
                to: path.resolve(__dirname, 'dist'),
                ignore: ['*.ts'],
            }
        ]),
    ],

    entry: './src/index.js',
    node: {
        fs: 'empty'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    }
};