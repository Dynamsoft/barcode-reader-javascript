const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  configureWebpack: {
    plugins: [
        new CopyPlugin([
            {
                from: './node_modules/dynamsoft-javascript-barcode/dist',
                to: path.resolve(__dirname, 'dist'),
                ignore: ['*.ts'],
            }
        ]),
    ],
    node: {
      fs: 'empty'
    }
  }
}
  