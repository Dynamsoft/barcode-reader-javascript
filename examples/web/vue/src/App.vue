<template>
  <div id="app">
    <button v-on:click="showScanner">show scanner</button>
  </div>
</template>

<script>
const Dynamsoft = require('dynamsoft-javascript-barcode');

Dynamsoft.BarcodeReader.productKeys = 'PRODUCT-KEYS';

export default {
  name: 'app',
  methods: {
    showScanner(){
      let scanner = null;
      Dynamsoft.BarcodeScanner.createInstance({
          onFrameRead: results => {console.log(results);},
          onUnduplicatedRead: (txt, result) => {alert(txt);}
      }).then(s => {
          scanner = s;
          scanner.show().catch(ex=>{
              console.log(ex);
              alert(ex.message || ex);
              scanner.hide();
          });
      });
    }
  }
}
</script>
