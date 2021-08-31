<template>
  <div>
    <h1>{{ title }}</h1>

    <div v-if="!bShowScanner">
      Choose image(s) to decode:
      <input
        v-on:change="onIptChange"
        type="file"
        multiple
        accept="image/png,image/jpeg,image/bmp,image/gif"
      />
      <br /><br />
      <button v-on:click="showScanner">show scanner</button>
    </div>

    <div v-if="bShowScanner">
      <button v-on:click="hideScanner">hide scanner</button>
      <component-barcode-scanner v-on:appendMessage="appendMessage"></component-barcode-scanner>
    </div>

    <div class="div-message" ref="divMessage">
      <p
        v-for="(message, index) of messages"
        v-bind:key="messageKeyBase + index"
      >
        {{ message }}
      </p>
    </div>
  </div>
</template>

<script>
import "../dbr";
import { BarcodeReader } from 'dynamsoft-javascript-barcode';
import ComponentBarcodeScanner from "./BarcodeScanner";
import { onUpdated, onBeforeUnmount, ref } from "vue";

export default {
  props: {
    title: String,
  },
  setup(props) {
    const pReader = ref(null);
    const divMessage = ref(null);
    const messages = ref([]);
    const messageKeyBase = ref(0);
    const bShowScanner = ref(false);

    onUpdated(() => {
      divMessage.value.scrollTop = divMessage.value.scrollHeight;
    });
    onBeforeUnmount(async() => {
      if (pReader.value) {
        await(pReader.value).destroy();
      }
    });

    const appendMessage = (str) => {
      messages.value.push(str);
      if (messages.value.length > 500) {
        ++messageKeyBase.value;
        messages.value.splice(0, 1);
      }
    };

    const onIptChange = async (event) => {
      try {
        appendMessage("======== start read... ========");
        let reader = await (pReader.value = pReader.value || BarcodeReader.createInstance());
        let input = event.target;
        let files = input.files;
        for (let i = 0; i < files.length; ++i) {
          let file = files[i];
          appendMessage(file.name + ":");
          let results = await reader.decode(file);
          for (let result of results) {
            appendMessage(result.barcodeText);
          }
        }
        input.value = "";
        appendMessage("======== finish read ========");
      } catch (ex) {
        appendMessage(ex.message);
        console.error(ex);
      }
    };
    const showScanner = ()=>{
      bShowScanner.value = true;

    }
    const hideScanner = ()=>{
      bShowScanner.value = false;
    }
    return {
      divMessage,
      messages,
      pReader,
      messageKeyBase,
      bShowScanner,
      onIptChange,
      appendMessage,
      showScanner,
      hideScanner
    };
  },
  components: {
    ComponentBarcodeScanner,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.div-message {
  max-height: 200px;
  overflow-y: auto;
  resize: both;
}
</style>
