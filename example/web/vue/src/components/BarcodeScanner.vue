<template>
  <div v-once>
    <select class="dbrScanner-sel-camera"></select>
    <select class="dbrScanner-sel-resolution"></select>
    <br>
    <video class="dbrScanner-video"></video>
  </div>
</template>

<script>
import Dynamsoft from "../Dynamsoft";

export default {
    data(){
        return {
            bDestroyed: false,
            scanner: null
        }
    },
    async mounted(){
        try{
            let scanner = this.scanner = this.scanner || await Dynamsoft.BarcodeScanner.createInstance();

            if(this.bDestroyed){
                this.destroy();
                return;
            }

            scanner.setUIElement(this.$el);
            scanner.onFrameRead = results => {
                if(results.length){
                    console.log(results);
                }
            };
            scanner.onUnduplicatedRead = (txt, result) => {
                this.$emit("appendMessage", result.barcodeFormatString + ': ' + txt);
            };
            await scanner.open();

            if(this.bDestroyed){
                this.destroy();
                return;
            }

        }catch(ex){
            this.$emit("appendMessage", ex.message);
            console.error(ex);
        }
    },
    beforeDestroy() {
        this.destroy();
    },
    methods: {
        async destroy(){
            this.bDestroyed = true;
            if(this.scanner){
                this.scanner.close();
                this.scanner.destroy();
                this.scanner = null;
            }
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
video {
  width: 640px;
  height: 480px;
  border: 1px solid black;
}
</style>
