
import fs from "fs";

const adjustCompiled = () => {
  const wasmTypes = ["", "-ml-simd", "-ml-simd-pthread", "-ml-simd-with-pdf", "-ml-simd-pthread-with-pdf"];

  for (let type of wasmTypes) {
    let code = fs.readFileSync(`dist/dynamsoft-barcode-reader-bundle${type}.js`, { encoding: 'utf-8' });

    code = code.replaceAll(`console.error(str)`, 'err(str)');
    code = code.replaceAll(`console.warn(str)`, 'err(str)');
    code = code.replaceAll(`console.info(str)`, 'out(str)');
    code = code.replaceAll(`console.debug(str)`, 'out(str)');
    code = code.replaceAll(`console.log(str)`, 'out(str)');
    code = code.replaceAll(`var pthreadPoolSize = 5`, "var pthreadPoolSize = Module['pthreadPoolSize'] || 5");
    code = code.replaceAll(`"urlOrBlob": Module["mainScriptUrlOrBlob"] || _scriptDir,`, '"urlOrBlob": Module.pthreadJsCache.get("pthreadjs") || Module["mainScriptUrlOrBlob"] || _scriptDir,');
    code = code.replace(/function\s+instantiateAsync\s*\([^)]*\)\s*\{[\s\S]*?\n\}/, `function instantiateAsync(binary, binaryFile, imports, callback) {
      return instantiateArrayBuffer(binaryFile, imports, callback);
    }\n`);

    code = code.replace(/allocateUnusedWorker\(\)\s*\{([\s\S]*?)\}/, `
 allocateUnusedWorker() {
   var worker;
   var pthreadMainJs =  Module.pthreadJsCache.get("pthreadWorkerjs");
   let workerJs = URL.createObjectURL(pthreadMainJs);
   worker = new Worker(workerJs);
   PThread.unusedWorkers.push(worker);
 }`);

    code = code.replace(/function\s+getBinaryPromise\s*\([^)]*\)\s*\{[\s\S]*?\n\}/, `function getBinaryPromise(binaryFile) {
      if (!wasmBinary && (ENVIRONMENT_IS_WEB || ENVIRONMENT_IS_WORKER)) {
        if (typeof fetch == "function") {
        return fetch(binaryFile, {
          credentials: "same-origin"
        }).then(async response => {
          if (!response["ok"]) {
            throw "failed to load wasm binary file at '" + binaryFile + "'";
          }
            postMessage({
                type: "event",
                id: -3,
                body: {
                  total: 0,
                  loaded: 0,
                  tag: "starting",
                  resourcesPath: binaryFile
                }
              });
          const contentLength = +response.headers.get('Content-Length');
          const reader = response.body.getReader();

          let received = 0;
          let lastProcessTime = Date.now();
          const chunks = [];
  
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            chunks.push(value);
            received += value.length;

            if (contentLength) {
             const now = Date.now();
             if (lastProcessTime + 500 < now) {
              postMessage({
                type: "event",
                id: -3,
                body: {
                  total: contentLength,
                  loaded: received,
                  tag: "in progress",
                  resourcesPath: binaryFile
                }
              });
              lastProcessTime = now;
              }
            } else { }
          }

        const binary = new Uint8Array(received);
        let pos = 0;
        for (const chunk of chunks) {
          binary.set(chunk, pos);
          pos += chunk.length;
        }
          postMessage({
                type: "event",
                id: -3,
                body: {
                  total: contentLength,
                  loaded: contentLength,
                  tag: "completed",
                  resourcesPath: binaryFile
                }
              });
          return binary;
        }).catch(() => getBinarySync(binaryFile));
        }
      }
      return Promise.resolve().then(() => getBinarySync(binaryFile));
    }`);

    code = code.replace(/readBinary\s*=\s*url\s*=>\s*\{[\s\S]*?\}\s*;/, `
      readBinary = url => {
        var xhr = new XMLHttpRequest;
        xhr.open("GET", url, false);
        xhr.responseType = "arraybuffer";
        let lastProcessTime = Date.now();
        let pe = {};
        xhr.onloadstart = () => {
            postMessage({
              type: "event",
              id: -3,
              body: {
                loaded: 0,
                total: pe.lengthComputable ? pe.total : 0,
                tag: "starting",
                resourcesPath: url
              }
            });
          }
        xhr.onprogress = (progressEvent) => {
          pe = progressEvent;
          const now = Date.now();
          if (lastProcessTime + 500 < now) {
            postMessage({
              type: "event",
              id: -3,
              body: {
                total: pe.lengthComputable ? pe.total : 0,
                loaded: pe.loaded,
                tag: "in progress",
                resourcesPath: url
              }
            });
            lastProcessTime = now;
            }
          };
          xhr.onloadend = () => {
            if (xhr.status >= 400 && xhr.status < 500) {
              throw new Error("failed to load wasm binary file at " + url);
            }
            postMessage({
              type: "event",
              id: -3,
              body: {
                loaded: pe.lengthComputable ? pe.total : 0,
                total: pe.lengthComputable ? pe.total : 0,
                tag: "completed",
                resourcesPath: url
              }
            });
          }
        xhr.send(null);
        return new Uint8Array(/** @type{!ArrayBuffer} */ (xhr.response));
      };  
    `);

        code = code.replace(`} else if (cmd) {`, `
} else if (cmd === "thread-proxy-callback") {
 mapThreadProxyCallBack[d.taskID](d.ret);
} else if (cmd === "s") { // scsd
 scsd(d.a,d.b,d.c,d.d)
} else if (cmd) {`);
 
    fs.writeFileSync(`dist/dynamsoft-barcode-reader-bundle${type}.js`, code);
  }
}

export default adjustCompiled;