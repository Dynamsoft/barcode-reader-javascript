<template>
  <div v-once class="component-barcode-scanner">
    <svg class="dbrScanner-bg-loading" viewBox="0 0 1792 1792"><path d="M1760 896q0 176-68.5 336t-184 275.5-275.5 184-336 68.5-336-68.5-275.5-184-184-275.5-68.5-336q0-213 97-398.5t265-305.5 374-151v228q-221 45-366.5 221t-145.5 406q0 130 51 248.5t136.5 204 204 136.5 248.5 51 248.5-51 204-136.5 136.5-204 51-248.5q0-230-145.5-406t-366.5-221v-228q206 31 374 151t265 305.5 97 398.5z"/></svg>
    <svg class="dbrScanner-bg-camera" style="display:none;" viewBox="0 0 2048 1792"><path d="M1024 672q119 0 203.5 84.5t84.5 203.5-84.5 203.5-203.5 84.5-203.5-84.5-84.5-203.5 84.5-203.5 203.5-84.5zm704-416q106 0 181 75t75 181v896q0 106-75 181t-181 75h-1408q-106 0-181-75t-75-181v-896q0-106 75-181t181-75h224l51-136q19-49 69.5-84.5t103.5-35.5h512q53 0 103.5 35.5t69.5 84.5l51 136h224zm-704 1152q185 0 316.5-131.5t131.5-316.5-131.5-316.5-316.5-131.5-316.5 131.5-131.5 316.5 131.5 316.5 316.5 131.5z"/></svg>
    <video class="dbrScanner-video" playsinline="true"></video>
    <canvas class="dbrScanner-cvs-drawarea"></canvas>
    <div class="dbrScanner-cvs-scanarea">
        <div class="dbrScanner-scanlight" style="display:none;"></div>
    </div>
    <select class="dbrScanner-sel-camera"></select>
    <select class="dbrScanner-sel-resolution"></select>
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
            this.scanner = await Dynamsoft.BarcodeScanner.createInstance();

            if(this.bDestroyed){
                this.scanner.destroy();
                return;
            }

            await this.scanner.setUIElement(this.$el);
            this.scanner.onFrameRead = results => {
                if(results.length){
                    console.log(results);
                }
            };
            this.scanner.onUnduplicatedRead = (txt, result) => {
                this.$emit("appendMessage", result.barcodeFormatString + ': ' + txt);
            };
            await this.scanner.open();

        }catch(ex){
            this.$emit("appendMessage", ex.message);
            console.error(ex);
        }
    },
    beforeDestroy() {
        this.bDestroyed = true;
        if(this.scanner){
            this.scanner.destroy();
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.component-barcode-scanner{width:100%;height:100%;min-width:640px;min-height:480px;background:#eee;position:relative;resize:both;}
.dbrScanner-bg-loading{animation:1s linear infinite dbrScanner-rotate;width:40%;height:40%;position:absolute;margin:auto;left:0;top:0;right:0;bottom:0;fill:#aaa;}
.dbrScanner-bg-camera{width:40%;height:40%;position:absolute;margin:auto;left:0;top:0;right:0;bottom:0;fill:#aaa;}
.dbrScanner-video{width:100%;height:100%;position:absolute;left:0;top:0;}
.dbrScanner-cvs-drawarea{width:100%;height:100%;position:absolute;left:0;top:0;}
.dbrScanner-cvs-scanarea{width:100%;height:100%;position:absolute;left:0;top:0;}
.dbrScanner-scanlight{width:100%;height:3%;position:absolute;animation:3s infinite dbrScanner-scanlight;border-radius:50%;box-shadow:0px 0px 2vw 1px #00e5ff;background:#fff;}
.dbrScanner-sel-camera{margin:0 auto;position:absolute;left:0;top:0;}
.dbrScanner-sel-resolution{position:absolute;left:0;top:20px;}
@keyframes dbrScanner-rotate{from{transform:rotate(0turn);}to{transform:rotate(1turn);}}
@keyframes dbrScanner-scanlight{from{top:0;}to{top:97%;}}
</style>
