<template>
  <div>
    <h1>{{ title }}</h1>
    
    <div v-if="!bShowScanner">
      Choose image(s) to decode:
      <input v-on:change="onIptChange" type="file" multiple accept="image/png,image/jpeg,image/bmp,image/gif">
      <br><br>
      <button v-on:click="showScanner">show scanner</button>
    </div>

    <div v-if="bShowScanner">
      <button v-on:click="hideScanner">hide scanner</button>
      <component-barcode-scanner v-on:appendMessage="appendMessage"></component-barcode-scanner>
    </div>

    <div class="div-message" ref="divMessage">
      <p v-for="(message, index) of messages" v-bind:key="messageKeyBase + index">
        {{ message }}
      </p>
    </div>
  </div>
</template>

<script>
import "../dbr";
import { BarcodeReader } from 'dynamsoft-javascript-barcode';
import ComponentBarcodeScanner from "./BarcodeScanner";

export default {
  props: {
    title: String
  },
  data() { 
    return {
      pReader: null,
      messageKeyBase: 0,
      messages: [],
      bShowScanner: false
    };
  },
  components: {
    ComponentBarcodeScanner
  },
  updated(){
    this.$refs.divMessage.scrollTop = this.$refs.divMessage.scrollHeight;
  },
  async beforeDestroy(){
    if(this.pReader){
      (await this.pReader).destroy();
    }
  },
  methods: {
    appendMessage(str){
      this.messages.push(str);
      if(this.messages.length > 500){
        ++this.messageKeyBase;
        this.messages.splice(0, 1);
      }
    },
    async onIptChange(event) {
      try{
        this.appendMessage("======== start read... ========");
        let reader = await (this.pReader = this.pReader || BarcodeReader.createInstance());
        let input = event.target;
        let files = input.files;
        for(let i = 0; i < files.length; ++i){
          let file = files[i];
          this.appendMessage(file.name + ':');
          let results = await reader.decode(file);
          for(let result of results){
            this.appendMessage(result.barcodeText);
          }
        }
        input.value = "";
        this.appendMessage("======== finish read ========");
      }catch(ex){
        this.appendMessage(ex.message);
        console.error(ex);
      }
    },
    showScanner(){
      this.bShowScanner = true;
    },
    hideScanner(){
      this.bShowScanner = false;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.div-message{
  max-height: 200px;
  overflow-y: auto;
  resize: both;
}
</style>
