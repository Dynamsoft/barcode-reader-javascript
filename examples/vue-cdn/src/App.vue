<template>
  <div id="app">
    <button v-on:click="openScanner">open scanner</button>
  </div>
</template>

<script>
import dbr from 'dbr'

dbr.licenseKey = 'LICENSE-KEY';
let scanner = new dbr.Scanner({
    onFrameRead: results => {console.log(results);}, // eslint-disable-line
    onNewCodeRead: (txt, result) => {alert(txt);} // eslint-disable-line
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

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
