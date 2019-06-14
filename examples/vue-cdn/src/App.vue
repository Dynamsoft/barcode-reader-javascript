<template>
  <div id="app">
    <button v-on:click="openScanner">open scanner</button>
  </div>
</template>

<script>
import dbr from 'dbr'

dbr.licenseKey = 'LICENSE-KEY';
const scanner = new dbr.Scanner({
    onFrameRead: results => { console.log(results); }, // eslint-disable-line
    onNewCodeRead: (txt, result) => { alert(txt); } // eslint-disable-line
});

export default {
  name: 'app',
  methods: {
    openScanner(){
      scanner.open();
    }
  }
}
</script>
