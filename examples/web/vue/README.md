# dbr-cdn-vue-default

## Install Vue CLI

```
npm install -g @vue/cli
```

## How to Use

Cd to the project Directory.

install modules
```
npm install
```

Run the app.
```
npm run serve
```

## How to Create

Create a Vue Project, select default config:
```
vue create dbr-cdn-vue-default
```

Cd to the project Directory:
```
cd dbr-cdn-vue-default
```

Add a `<script>` in `./public/index.html`:
```html
<!--
    Warning: Use a specific version in production. (e.g. https://cdn.jsdelivr.net/npm/dynamsoft-javascript-barcode@x.x.x/dist/dbr.min.js)
    Please visit https://www.dynamsoft.com/CustomerPortal/Portal/TrialLicense.aspx to get trial license.
-->
<script src="https://cdn.jsdelivr.net/npm/dynamsoft-javascript-barcode@7/dist/dbr.min.js" data-productKeys="LICENSE-KEY"></script>
```

Configure externals lib for dbr in `./vue.config.js`:
```js
module.exports = {
  configureWebpack: {
    externals: {
      Dynamsoft: 'Dynamsoft'
    }
  }
}
```

Modify `./src/App.vue`:
```html
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
```

Run the app.
```
npm run serve
```

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
