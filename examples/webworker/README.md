## Blog
- [Using Web Worker to Load WebAssembly Barcode SDK](https://www.codepool.biz/web-worker-load-webassembly-barcode.html)

## Update

Since version 6.3.0.2, we have added built-in worker support.

```js
// The default value is false. Set it true to decode in another thread. By this way, UI would not stuck.
dynamsoft.dbrEnv.bUseWorker = true;
```
