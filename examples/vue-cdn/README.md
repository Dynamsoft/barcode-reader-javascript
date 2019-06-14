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
<!--Warning: Use a specific version in production. (e.g. https://cdn.jsdelivr.net/npm/dynamsoft-javascript-barcode@6/dist/dbr.min.js)-->
<script src="https://cdn.jsdelivr.net/npm/dynamsoft-javascript-barcode/dist/dbr.min.js"></script>
```

Configure externals lib for dbr in `./vue.config.js`:
```js
module.exports = {
  configureWebpack: {
    externals: {
      dbr: 'dbr' // The three variables are the same： dbr, BarcodeReader, dynamsoft.BarcodeReader
    }
  }
}
```

Modify `./src/App.vue`:
```html
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
