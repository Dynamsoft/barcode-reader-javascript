<template>
  <div id="app">
    <button v-on:click="showScanner">show scanner</button>
  </div>
</template>

<script>
import Dynamsoft from 'Dynamsoft'

export default {
  name: 'app',
  methods: {
    showScanner(){
      let scanner = null;
      Dynamsoft.BarcodeScanner.createInstance({
          onFrameRead: results => {window.console.log(results);},
          onUnduplicatedRead: (txt) => {alert(txt);}
      }).then(s => {
          scanner = s;
          scanner.show().catch(ex=>{
              window.console.log(ex);
              window.alert(ex.message || ex);
              scanner.hide();
          });
      });
    }
  }
}
</script>
