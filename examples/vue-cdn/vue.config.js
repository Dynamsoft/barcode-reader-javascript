module.exports = {
  configureWebpack: {
    externals: {
      dbr: 'dbr' // The three variables are the same： dbr, BarcodeReader, dynamsoft.BarcodeReader
    }
  }
}
  