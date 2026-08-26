/// <reference lib="webworker" />
import { d, e, EnumErrorCode, EnumIntermediateResultUnitType, ErrorInfo, isDsImageKeyValue, isOriginalDsImageData, requestResource, MapController, PostMessageBody, isSimdSupported, EnumCapturedResultItemType, EnumWasmType } from 'dynamsoft-core';
import { createDlsInstance, DlsInstance } from "@scannerproxy/dlsjs";
import { EnumBarcodeFormat } from '@dynamsoft/dynamsoft-barcode-reader';
import { browserInfo } from "@scannerproxy/browser-info";
import { CrossVerificationCriteria } from '@dynamsoft/dynamsoft-utility';
import { InitConfig } from '@dynamsoft/dynamsoft-license';
// import MutablePromise from 'mutable-promise';

declare let HEAP8: any;
declare let UTF8ToString: (point: number) => string;
declare let wasmExports: any;
declare let assert: any;
declare let intArrayFromString: any;

let mliRecord: any = {};
let exceededModuleIds: Array<string> = [];
let modulesVersion: { [key: string]: string } = {};
let simd: boolean;
let isNoOnnx = false;
let loadedWasmType: string;
let oldMliRecord: any;
let bDebug = false;
let strDomain: any = undefined;
let defaultDbrTemplate: string;
let defaultDlrTemplate: string;
let defaultDdnTemplate: string;
let cvrInstanceSet: Set<number> = new Set<number>();
let mapLoadedModelBuffer: { [key: string]: Promise<string> } = {};
let bRuntimeAuth: boolean;
let ltsInstance: DlsInstance;
let initLicenseInfo: ErrorInfo;
let currentInitCfg: InitConfig;
let _bundleEnv: "DCV" | "DBR";
let _bundleName: string;
let _resourcePath: string;
let _wasmType: EnumWasmType;
let _pthreadPoolSize: number;
let _e: boolean;

// let isUsePthreadWasm = false;
// const mapThreadProxyCallBack: { [key: string]: (body: any) => void } = (self as any).mapThreadProxyCallBack = {};
// let pThreadProxy: MutablePromise<void> | undefined;

const secretKey = "ZYJ3y#bWtC64A6RPE8h_lv1E#H^ZUe75";
const versions: { [key: string]: { wasm: string, worker: string } } = {};
const mapLoadedCharsData: { [key: string]: Promise<string> } = {}; // modelName: true || promise<true> || throw ex
const engineResourcePaths: { [key: string]: string } = {};
const mapAppendedResourceBuffer: { [key: string]: Promise<ErrorInfo> } = {};
const buffersInWasm: { ptr: number; size: number; maxSize: number; }[] = [];
const moduleIdRules: Array<{ masks: EnumBarcodeFormat[]; moduleId: string; }> = [
  {
    masks: [
      EnumBarcodeFormat.BF_ONED,
      EnumBarcodeFormat.BF_MATRIX_25,
      EnumBarcodeFormat.BF_CODE_32,
      EnumBarcodeFormat.BF_TELEPEN,
      EnumBarcodeFormat.BF_TELEPEN_NUMERIC
    ],
    moduleId: "1"
  },
  {
    masks: [
      EnumBarcodeFormat.BF_QR_CODE,
      EnumBarcodeFormat.BF_MICRO_QR
    ],
    moduleId: "2"
  },
  {
    masks: [
      EnumBarcodeFormat.BF_PDF417,
      EnumBarcodeFormat.BF_MICRO_PDF417
    ],
    moduleId: "3"
  },
  { masks: [EnumBarcodeFormat.BF_DATAMATRIX], moduleId: "4" },
  { masks: [EnumBarcodeFormat.BF_AZTEC], moduleId: "5" },
  { masks: [EnumBarcodeFormat.BF_MAXICODE], moduleId: "6" },
  { masks: [EnumBarcodeFormat.BF_PATCHCODE], moduleId: "7" },
  { masks: [EnumBarcodeFormat.BF_GS1_DATABAR], moduleId: "8" },
  { masks: [EnumBarcodeFormat.BF_GS1_COMPOSITE], moduleId: "9" },
  {
    masks: [
      EnumBarcodeFormat.BF_POSTALCODE,
      EnumBarcodeFormat.BF_KIX
    ],
    moduleId: "10"
  },
  { masks: [EnumBarcodeFormat.BF_DOTCODE], moduleId: "11" },
  { masks: [EnumBarcodeFormat.BF_NONSTANDARD_BARCODE], moduleId: "16" },
  {
    masks: [
      EnumBarcodeFormat.BF_PHARMACODE_ONE_TRACK,
      EnumBarcodeFormat.BF_PHARMACODE_TWO_TRACK,
      EnumBarcodeFormat.BF_PHARMACODE
    ],
    moduleId: "17"
  }
];

const Module: any = (self as any).Module = {
  print: (message: string) => {
    log(message);
  },
  printErr: (message: string) => {
    log(message);
  },
  locateFile: (path: string, prefix: string) => {
    return engineResourcePaths[`${_bundleEnv.toLowerCase()}Bundle`] + path;
  }
};
const ensureCache = {
  buffer: 0,  // the main buffer of temporary storage
  size: 0,   // the size of buffer
  pos: 0,    // the next free offset in buffer
  temps: [] as number[], // extra allocations
  needed: 0, // the total size we need next time

  prepare: function () {
    if (ensureCache.needed) {
      // clear the temps
      for (let i = 0; i < ensureCache.temps.length; i++) {
        Module['_free'](ensureCache.temps[i]);
      }
      ensureCache.temps.length = 0;
      // prepare to allocate a bigger buffer
      Module['_free'](ensureCache.buffer);
      ensureCache.buffer = 0;
      ensureCache.size += ensureCache.needed;
      // clean up
      ensureCache.needed = 0;
    }
    if (!ensureCache.buffer) { // happens first time, or when we need to grow
      ensureCache.size += 128; // heuristic, avoid many small grow events
      ensureCache.buffer = Module['_malloc'](ensureCache.size);
      assert(ensureCache.buffer);
    }
    ensureCache.pos = 0;
  },
  alloc: function (array: number[], view: Uint8Array) {
    assert(ensureCache.buffer);
    let bytes = view.BYTES_PER_ELEMENT;
    let len = array.length * bytes;
    len = (len + 7) & -8; // keep things aligned to 8 byte boundaries
    let ret;
    if (ensureCache.pos + len >= ensureCache.size) {
      // we failed to allocate in the buffer, ensureCache time around :(
      assert(len > 0); // null terminator, at least
      ensureCache.needed += len;
      ret = Module['_malloc'](len);
      ensureCache.temps.push(ret);
    } else {
      // we can allocate in the buffer
      ret = ensureCache.buffer + ensureCache.pos;
      ensureCache.pos += len;
    }
    return ret;
  },
  copy: function (array: number[], view: Uint8Array, offset: number) {
    offset >>>= 0;
    let bytes = view.BYTES_PER_ELEMENT;
    switch (bytes) {
      case 2: offset >>>= 1; break;
      case 4: offset >>>= 2; break;
      case 8: offset >>>= 3; break;
    }
    for (let i = 0; i < array.length; i++) {
      view[offset + i] = array[i];
    }
  },
};
const ep = ensureCache.prepare;
const es = (value: string) => {
  let intArray = intArrayFromString(value);
  let offset = ensureCache.alloc(intArray, Module.HEAP8);
  ensureCache.copy(intArray, Module.HEAP8, offset);
  return offset;
}

const handleTaskRes = (taskID: number, body?: any) => {
  postMessage({
    type: "task",
    id: taskID,
    body: {
      success: true,
      ...body
    }
  });
}
const handleTaskErr = (taskID: number, ex: any) => {
  if (!(ex instanceof Error)) {
    ex = new Error(String(ex));
  }

  postMessage({
    type: "task",
    id: taskID,
    body: {
      success: false,
      message: ex.message || "No error message available.",
      stack: bDebug && ex.stack || "No stack trace available.",
    }
  });
}

const log = (message: string) => {
  if (bDebug) {
    postMessage({
      type: "log",
      message
    });
  }
}
const warn = (message: string) => {
  postMessage({
    type: "warning",
    message
  });
}
// when you need multiple buffer into wasm at once, please use `idx`.
const setBufferIntoWasm = (data: Uint8Array, idx: number = 0, start: number = 0, end: number = 0) => {
  if (start) {
    data = end ? data.subarray(start, end) : data.subarray(start);
  }
  let bf = buffersInWasm[idx] = buffersInWasm[idx] || { ptr: 0, size: 0, maxSize: 0 };
  if (data.length > bf.maxSize) {
    if (bf.ptr) { Module._free(bf.ptr); }
    bf.ptr = Module._malloc(data.length);
    bf.maxSize = data.length;
  }
  Module.HEAPU8.set(data, bf.ptr);
  bf.size = data.length;
  return bf.ptr;
}
const getWasmLibraryName = () => {
  let wasmName = "-ml-simd";
  if (_bundleEnv === "DBR") {
    if (_wasmType === "ml-simd-pthread" && simd && crossOriginIsolated) {
      wasmName = "-ml-simd-pthread"
    } else if (_wasmType === "ml-simd-with-pdf" && simd) {
      wasmName = "-ml-simd-with-pdf";
    } else if (_wasmType === "ml-simd-pthread-with-pdf" && simd && crossOriginIsolated) {
      wasmName = "-ml-simd-pthread-with-pdf";
    } else if (_wasmType === "ml-simd" && simd) {
      wasmName = "-ml-simd";
    } else if (_wasmType === "baseline") {
      wasmName = "";
      isNoOnnx = true;
    } else if (_wasmType === "auto") {
      const isSafari = ["iPhone", "Mac"].includes(browserInfo.OS);
      if (simd && crossOriginIsolated) {
        if (isSafari) {
          wasmName = "-ml-simd";
        } else {
          wasmName = "-ml-simd-pthread";
        }
      } else if (simd && !crossOriginIsolated) {
        wasmName = "-ml-simd";
      } else if (!simd) {
        wasmName = "";
        isNoOnnx = true;
      }
    }
  } else {
    if (_wasmType === "ml-simd-pthread" && simd && crossOriginIsolated) {
      wasmName = "-ml-simd-pthread"
    } else if (_wasmType === "ml-simd" && simd) {
      wasmName = "-ml-simd";
    } else if (_wasmType === "ml") {
      wasmName = "-ml";
    } else if (_wasmType === "auto") {
      const isSafari = ["iPhone", "Mac"].includes(browserInfo.OS);
      if (simd && crossOriginIsolated) {
        if (isSafari) {
          wasmName = "-ml-simd";
        } else {
          wasmName = "-ml-simd-pthread";
        }
      } else if (simd && !crossOriginIsolated) {
        wasmName = "-ml-simd";
      } else if (!simd) {
        wasmName = "-ml";
      }
    }
  }
  return wasmName;
}
const loadCore = async () => {
  let timeStart = (log("core loading..."), Date.now()) || 0;
  await new Promise(async (resolve) => {
    Module.onRuntimeInitialized = () => {
      log("wasm initialized, cost " + (Date.now() - timeStart) + " ms");
      resolve(undefined);
    };

    simd = isSimdSupported();
    loadedWasmType = getWasmLibraryName();

    let libraryName = _bundleName + loadedWasmType;
    let url = engineResourcePaths[`${_bundleEnv.toLowerCase()}Bundle`] + libraryName + ".js";
    Module.mainScriptUrlOrBlob = url;
    Module.pthreadPoolSize = _pthreadPoolSize;
    Module.pthreadJsCache = new Map<"pthreadjs" | "pthreadWorkerjs", Blob>();
    log("import library: " + url);

    if (loadedWasmType === "-ml-simd-pthread" || loadedWasmType === "-ml-simd-pthread-with-pdf") {
      const pthreadjs = await requestResource(url, "blob");
      const pthreadWorkerjs = await requestResource(url.replace(loadedWasmType, `${loadedWasmType}.worker`), "blob");
      Module.pthreadJsCache.set("pthreadjs", pthreadjs);
      Module.pthreadJsCache.set("pthreadWorkerjs", pthreadWorkerjs);
      url = URL.createObjectURL(pthreadjs);
      //isUsePthreadWasm = true;
    }

    importScripts(url);
    URL.revokeObjectURL(url);
  });

  // TODO: how about load wasm error?
  let modulesSet: string[] = [];
  if (_bundleEnv === "DCV") {
    modulesSet = ["CVR", "LICENSE", "UTILITY", "DIP", "DBR", "DLR", "DDN", "DCP", "IdentityUtility"];
    // modulesSet = ["CVR", "LICENSE", "DIP", "DBR", "DLR", "DDN", "DCP"];
  } else if (_bundleEnv === "DBR") {
    modulesSet = ["CVR", "LICENSE", "DIP", "DBR", "DCP"];
  }
  for (let m of modulesSet) {
    ep(); wasmExports.emscripten_bind_CoreWasm_PreSetModuleExist(es(m));
    ep(); wasmExports.emscripten_bind_CvrWasm_SetModuleExist(es(m), true);
  }
  modulesVersion = JSON.parse(UTF8ToString(wasmExports.emscripten_bind_CoreWasm_GetModuleVersion()));
  for (let module in modulesVersion) {
    const lowerCaseModule = module.toLowerCase();
    const workerVersion = process.env.npm_package_version;
    versions[lowerCaseModule] = { worker: `${workerVersion ? workerVersion : "No Worker"}`, wasm: modulesVersion[module] };
  }
}
// core related controller
const mapController: MapController = {
  loadWasm: async (body: PostMessageBody, taskID) => {
    try {
      Object.assign(engineResourcePaths, body.engineResourcePaths);
      _wasmType = body.wasmLoadOptions.wasmType;
      _pthreadPoolSize = body.wasmLoadOptions.pthreadPoolSize;
      // these line only works when first loadWasm
      strDomain = body.dm;
      bDebug = body.bd;
      _bundleEnv = body._bundleEnv;
      _resourcePath = _bundleEnv === "DCV" ? engineResourcePaths.dcvData : engineResourcePaths.dbrBundle;
      _bundleName = _bundleEnv === "DCV" ? "dynamsoft-capture-vision-bundle" : "dynamsoft-barcode-reader-bundle";
      await loadCore();
      handleTaskRes(taskID, {
        versions,
        loadedWasmType: loadedWasmType ? loadedWasmType.replace("-", "") : "baseline",
        isNoOnnx
      });
    } catch (ex) {
      handleTaskErr(taskID, ex);
    }
  },
  setBDebug: (body: PostMessageBody) => {
    bDebug = body.value;
  },
  getModuleVersion: async (body, taskID) => {
    try {
      let versions = UTF8ToString(wasmExports.emscripten_bind_CoreWasm_GetModuleVersion());
      handleTaskRes(taskID, { versions: JSON.parse(versions) });
    } catch (ex) {
      handleTaskErr(taskID, ex);
    }
  },
  cfd: async (body: PostMessageBody, taskID) => {
    try {
      wasmExports.emscripten_bind_CoreWasm_static_CFD(body.count);
      handleTaskRes(taskID, {});
    } catch (ex) {
      handleTaskErr(taskID, ex);
    }
  },
  imagePtrToUint8Array: async (body: any, taskID) => {
    try {
      let u8 = new Uint8Array(new Uint8Array(HEAP8.buffer, body.data.ptr, body.data.length));
      postMessage({
        type: "task",
        id: taskID,
        body: {
          success: true,
          u8
        }
      }, [u8.buffer]);
    } catch (ex) {
      handleTaskErr(taskID, ex);
    }
  },
  resolveDsImageData: async (body, taskID, instanceID) => {
    try {
      const result = JSON.parse(UTF8ToString(wasmExports.emscripten_bind_CoreWasm_ResolveImageData(body.point)));
      result.bytes = new Uint8Array(new Uint8Array(HEAP8.buffer, result.bytes.ptr, result.bytes.length));
      postMessage({
        type: "task",
        id: taskID,
        body: {
          success: true,
          result
        }
      }, [result.bytes.buffer]);
    } catch (ex) {
      handleTaskErr(taskID, ex);
    }
  }
};
// cvr related controller
Object.assign(mapController, {
  cvr_createInstance: async (body, taskID) => {
    try {
      let instanceID = wasmExports.emscripten_bind_CvrWasm_CvrWasm();
      if (body.loadPresetTemplates) {
        if (engineResourcePaths.dbr) {
          defaultDbrTemplate ??= await requestResource(_resourcePath + "templates/DBR-PresetTemplates.json", "text");
          ep(); wasmExports.emscripten_bind_CvrWasm_AppendParameterContent(instanceID, es(defaultDbrTemplate));
        }
        if (_bundleEnv === "DCV") {
          if (engineResourcePaths.dlr) {
            defaultDlrTemplate ??= await requestResource(_resourcePath + "templates/DLR-PresetTemplates.json", "text");
            ep(); wasmExports.emscripten_bind_CvrWasm_AppendParameterContent(instanceID, es(defaultDlrTemplate));
          }
          if (engineResourcePaths.ddn) {
            defaultDdnTemplate ??= await requestResource(_resourcePath + "templates/DDN-PresetTemplates.json", "text");
            ep(); wasmExports.emscripten_bind_CvrWasm_AppendParameterContent(instanceID, es(defaultDdnTemplate));
          }
        }
        wasmExports.emscripten_bind_CvrWasm_InitParameter(instanceID);
      }
      let version = JSON.parse(UTF8ToString(wasmExports.emscripten_bind_CoreWasm_GetModuleVersion())).CVR;
      cvrInstanceSet.add(instanceID);
      
      handleTaskRes(taskID, {
        instanceID,
        version
      });
    } catch (ex) {
      handleTaskErr(taskID, ex);
    }
  },
  cvr_appendDLModelBuffer: async (body, taskID) => {
    let response: Array<string>;
    try {
      for (let modelName of body.modelNames) {
        checkAndLoadModel(modelName, body.path);
      }
      response = await Promise.all(Object.values(mapLoadedModelBuffer));
      handleTaskRes(taskID, {
        success: true,
        response: response[0]
      });
    } catch (ex) {
      handleTaskErr(taskID, ex);
    }
  },
  cvr_clearDLModelBuffers: async (body, taskID) => {
    try {
      wasmExports.emscripten_bind_CvrWasm_ClearDLModelBuffers();
      mapLoadedModelBuffer = {};
      handleTaskRes(taskID, {
        success: true
      });
    } catch (ex) {
      handleTaskErr(taskID, ex);
    }
  },
  cvr_initSettings: async (body, taskID, instanceID) => {
    let initSettingsResponse: any;
    try {
      let settings = body.settings;
      if (isNoOnnx) {
        const reg = /"ModelNameArray"\s*:\s*\[[^\]]*\]/g;
        let matchs = settings.match(reg);
        for (let match of matchs) {
          let parsedMatch = JSON.parse(`{${match}}`);
          if (parsedMatch.ModelNameArray && parsedMatch.ModelNameArray.length > 0) {
            warn("Model not supported in the current environment, skipped.");
            break;
          }
        }
      }
      ep(); initSettingsResponse = UTF8ToString(wasmExports.emscripten_bind_CvrWasm_InitSettings(instanceID, es(settings)));
      handleTaskRes(taskID, {
        success: true,
        response: initSettingsResponse
      });
    } catch (ex) {
      handleTaskErr(taskID, ex);
    }
  },
  cvr_setCrrRegistry: async (body, taskID, instanceID) => {
    try {
      if (cvrInstanceSet.has(instanceID)) {
        ep(); wasmExports.emscripten_bind_CvrWasm_SetCrrRegistry(instanceID, es(body.receiver));
      }
      handleTaskRes(taskID, {
        success: true,
      });
    } catch (ex) {
      handleTaskErr(taskID, ex);
    }
  },
  cvr_startCapturing: async (body, taskID, instanceID) => {
    let isOutputOriginalImage: boolean = false;
    let minImageCaptureInterval: number;
    try {
      /*
        for check license
        License-related errors need to be thrown explicitly, while other errors should be handled silently.  
        Since there are many types of license-related errors, to reduce the maintenance synchronization burden with C++ in the future, 
        we directly call the C++ `startCapturing` method to check license errors, 
        instead of maintaining independent license verification logic on the JS side.
      */
      ep(); const startInfo = JSON.parse(UTF8ToString(wasmExports.emscripten_bind_CvrWasm_StartCapturing(instanceID, es(body.templateName))));

      if (![0, -90003].includes(startInfo.errorCode)) {
        throw new Error(`[${startInfo.errorCode}] ${startInfo.errorString}`);
      }

      await loadCharResources(instanceID, body);
      ep(); const os = JSON.parse(UTF8ToString(wasmExports.emscripten_bind_CvrWasm_OutputSettings(instanceID, es(body.templateName), true)));
      if (os && ![0, EnumErrorCode.EC_UNSUPPORTED_JSON_KEY_WARNING].includes(os.errorCode)) {
        throw new Error(`[${os.errorCode}] ${os.errorString}`);
      }
      const data = JSON.parse(os.data);
      isOutputOriginalImage = (data.CaptureVisionTemplates[0].OutputOriginalImage === 1);
      minImageCaptureInterval = data.CaptureVisionTemplates[0].MinImageCaptureInterval;
      await loadResources(instanceID, body);
      handleTaskRes(taskID, {
        success: true,
        isOutputOriginalImage,
        minImageCaptureInterval
      });
    } catch (ex) {
      handleTaskErr(taskID, ex);
    }
  },
  cvr_stopCapturing: (body, taskID, instanceID) => {
    try {
      wasmExports.emscripten_bind_CvrWasm_StopCapturing(instanceID);
      handleTaskRes(taskID, { success: true });
    } catch (ex) {
      handleTaskErr(taskID, ex);
    }
  },
  cvr_parseRequiredResources: async (body, taskID, instanceID) => {
    let resources: any;
    try {
      ep();
      resources = UTF8ToString(wasmExports.emscripten_bind_CvrWasm_ParseRequiredResources(instanceID, es(body.templateName)));
      handleTaskRes(taskID, {
        success: true,
        resources
      });
    } catch (ex) {
      handleTaskErr(taskID, ex);
    }
  },
  cvr_setObservedResultUnitTypes: (body, taskID, instanceID) => {
    try {
      ep(); wasmExports.emscripten_bind_CvrWasm_SetObservedResultUnitTypes(instanceID, es(body.types));
      const resBody = {
        success: true
      }
      handleTaskRes(taskID, resBody);
    } catch (ex) {
      handleTaskErr(taskID, ex);
    }
  },
  cvr_getObservedResultUnitTypes: (body, taskID, instanceID) => {
    try {
      ep(); const result = UTF8ToString(wasmExports.emscripten_bind_CvrWasm_GetObservedResultUnitTypes(instanceID));
      const resBody = {
        success: true,
        result
      }
      handleTaskRes(taskID, resBody);
    } catch (ex) {
      handleTaskErr(taskID, ex);
    }
  },
  cvr_isResultUnitTypeObserved: (body, taskID, instanceID) => {
    try {
      ep(); const result = wasmExports.emscripten_bind_CvrWasm_IsResultUnitTypeObserved(instanceID, es(body.type));
      const resBody = {
        success: true,
        result
      }
      handleTaskRes(taskID, resBody);
    } catch (ex) {
      handleTaskErr(taskID, ex);
    }
  },
  cvr_capture: async (body, taskID, instanceID) => {
    try {
      log(`time worker get msg: ${Date.now()}`);
      await checkAndReauth();
      let appendResourceTime = Date.now();
      await loadResources(instanceID, body);
      await loadCharResources(instanceID, body);
      log(`appendResourceTime: ${Date.now() - appendResourceTime}`);
      let intermediateResult: any;
      let capturedResult: any;
      let transferable = [body.bytes.buffer];
      let cImageData = wasmExports.emscripten_bind_Create_CImageData(body.bytes.length, setBufferIntoWasm(body.bytes, 0), body.width, body.height, body.stride, body.format, 0);
      let beforeCapture = Date.now();
      log(`start worker capture: ${beforeCapture}`);
      ep(); capturedResult = UTF8ToString(wasmExports.emscripten_bind_CvrWasm_Capture(instanceID, cImageData, es(body.templateName), body._s, body.dynamsoft)); // _s = isScanner

      // if (!isUsePthreadWasm) {
      //   ep(); capturedResult = UTF8ToString(wasmExports.emscripten_bind_CvrWasm_Capture(instanceID, cImageData, es(body.templateName), body._s, body.dynamsoft)); // _s = isScanner
      // } else {
      //   pThreadProxy = new MutablePromise();
      //   const pTask = new Promise<any>(r => { mapThreadProxyCallBack[taskID] = r; });
      //   ep(); wasmExports.emscripten_bind_thread_proxy_CvrWasm_Capture(taskID, instanceID, cImageData, es(body.templateName), body._s, body.dynamsoft);
      //   capturedResult = await pTask;
      // }

      let afterCaptureTime = Date.now();
      log(`worker time: ${afterCaptureTime - beforeCapture}`);
      log(`end worker capture: ${afterCaptureTime}`);
      wasmExports.emscripten_bind_Destory_CImageData(cImageData);

      capturedResult = JSON.parse(capturedResult, function (k, v) {
        if (k === "format" && !isOriginalDsImageData(this)) {
          return BigInt(v);
        };
        if (isDsImageKeyValue(k, v)) {
          const u8 = new Uint8Array(new Uint8Array(HEAP8.buffer, v.ptr, v.length));
          transferable.push(u8.buffer);
          return u8;
        }
        return v;
      });
      if (capturedResult.isCheckFailed) {
        throw new Error(`[${capturedResult.errorCode}] ${capturedResult.errorString}`);
      }

      let afterParseResultTime = Date.now();
      log(`capture result parsed: ${afterParseResultTime - afterCaptureTime}`);
      let afterNewU8Time = Date.now();
      log(`result new Uint8Array: ${afterNewU8Time - afterParseResultTime}`);
      intermediateResult = JSON.parse(UTF8ToString(wasmExports.emscripten_bind_CvrWasm_GetIntermediateResult(instanceID)), (k, v) => {
        if (["format", "possibleFormats", "unitType"].includes(k)) {
          return BigInt(v);
        };
        if (isDsImageKeyValue(k, v)) {
          const u8 = new Uint8Array(new Uint8Array(HEAP8.buffer, v.ptr, v.length));
          transferable.push(u8.buffer);
          return u8;
        }
        return v;
      });
      if (intermediateResult) handleIntermediateResult(intermediateResult);
      let beforeGetIntermediateResultTime = Date.now();
      log(`get intermediate result: ${beforeGetIntermediateResultTime - afterNewU8Time}`);
      log(`after capture handle time: ${Date.now() - afterCaptureTime}`);

      const workerReturnMsgTime = Date.now();
      log(`time worker return msg: ${workerReturnMsgTime}`);

      handleMliLicenseLogic(capturedResult);
      let mergedMliRecord = await mergeMliRecord();

      postMessage({
        type: "task",
        id: taskID,
        body: {
          success: true,
          capturedResult,
          intermediateResult,
          workerReturnMsgTime,
          mliRecord: currentInitCfg.mli ? mergedMliRecord : null,
          bytes: body.bytes,
          _s: body._s
        }
      }, transferable);
    } catch (ex) {
      handleTaskErr(taskID, ex);
    } finally {
      // if (isUsePthreadWasm) {
      //   pThreadProxy?.resolve();
      //   pThreadProxy = undefined;
      // }
    }
  },
  cvr_captureMultiPages: async (body, taskID, instanceID) => {
    try {
      await checkAndReauth();
      await loadResources(instanceID, body);
      await loadCharResources(instanceID, body);
      const transferable = [body.bytes.buffer];
      ep();
      const options = es(JSON.stringify(body.defaultOptions));
      const templateName = es(body.templateName);
      let capturedResults = UTF8ToString(wasmExports.emscripten_bind_CvrWasm_CaptureMultiPages(instanceID, setBufferIntoWasm(body.bytes), body.bytes.length, templateName, options));

      capturedResults = JSON.parse(capturedResults, function (k, v) {
        if (k === "format" && !isOriginalDsImageData(this)) {
          return BigInt(v);
        };
        if (isDsImageKeyValue(k, v)) {
          const u8 = new Uint8Array(new Uint8Array(HEAP8.buffer, v.ptr, v.length));
          transferable.push(u8.buffer);
          return u8;
        }
        return v;
      });
      const intermediateResult = JSON.parse(UTF8ToString(wasmExports.emscripten_bind_CvrWasm_GetIntermediateResult(instanceID)), (k, v) => {
        if (["format", "possibleFormats", "unitType"].includes(k)) {
          return BigInt(v);
        };
        if (isDsImageKeyValue(k, v)) {
          const u8 = new Uint8Array(new Uint8Array(HEAP8.buffer, v.ptr, v.length));
          transferable.push(u8.buffer);
          return u8;
        }
        return v;
      });
      if (intermediateResult) handleIntermediateResult(intermediateResult);

      for (let capturedResult of capturedResults) {
        handleMliLicenseLogic(capturedResult);
      }
      let mergedMliRecord = await mergeMliRecord();

      postMessage({
        type: "task",
        id: taskID,
        body: {
          success: true,
          capturedResults,
          intermediateResult,
          mliRecord: currentInitCfg.mli ? mergedMliRecord : null,
        }
      }, transferable);
    } catch (ex) {
      handleTaskErr(taskID, ex);
      return;
    }
  },
  cvr_outputSettings: async (body, taskID, instanceID) => {
    let outputSettings: any;
    try {
      ep(); outputSettings = UTF8ToString(wasmExports.emscripten_bind_CvrWasm_OutputSettings(instanceID, es(body.templateName), body.includeDefaultValues));
      handleTaskRes(taskID, {
        success: true,
        response: outputSettings
      });
    } catch (ex) {
      handleTaskErr(taskID, ex);
    }
  },
  cvr_setGlobalIntraOpNumThreads: (body, taskID, instanceID) => {
    try {
      ep(); wasmExports.emscripten_bind_CvrWasm_SetGlobalIntraOpNumThreads(instanceID, body.intraOpNumThreads);
      handleTaskRes(taskID, { success: true });
    } catch (ex) {
      handleTaskErr(taskID, ex);
    }
  },
  cvr_getTemplateNames: async (body, taskID, instanceID) => {
    let response: string;
    try {
      ep(); response = UTF8ToString(wasmExports.emscripten_bind_CvrWasm_GetTemplateNames(instanceID));
      handleTaskRes(taskID, {
        success: true,
        response
      });
    } catch (ex) {
      handleTaskErr(taskID, ex);
    }
  },
  cvr_getSimplifiedSettings: async (body, taskID, instanceID) => {
    let simplifiedSettings: any;
    try {
      ep(); simplifiedSettings = UTF8ToString(wasmExports.emscripten_bind_CvrWasm_GetSimplifiedSettings(instanceID, es(body.templateName)));
      handleTaskRes(taskID, {
        success: true,
        response: simplifiedSettings
      });
    } catch (ex) {
      handleTaskErr(taskID, ex);
    }
  },
  cvr_updateSettings: async (body, taskID, instanceID) => {
    let updateSettingsResponse: any;
    try {
      let settings = body.settings;
      let templateName = body.templateName;
      if (typeof settings === "object" && settings.hasOwnProperty("barcodeSettings")) {
        settings.barcodeSettings.barcodeFormatIds = settings.barcodeSettings.barcodeFormatIds.toString();
      }
      ep(); updateSettingsResponse = UTF8ToString(wasmExports.emscripten_bind_CvrWasm_UpdateSettings(instanceID, es(templateName), es(JSON.stringify(settings))));
      await loadResources(instanceID, body);

      handleTaskRes(taskID, {
        success: true,
        response: updateSettingsResponse
      });
    } catch (ex) {
      handleTaskErr(taskID, ex);
    }
  },
  cvr_resetSettings: async (body, taskID, instanceID) => {
    let resetResponse: any;
    try {
      wasmExports.emscripten_bind_CvrWasm_ResetSettings(instanceID);
      ep(); defaultDbrTemplate && wasmExports.emscripten_bind_CvrWasm_AppendParameterContent(instanceID, es(defaultDbrTemplate));
      ep(); defaultDlrTemplate && wasmExports.emscripten_bind_CvrWasm_AppendParameterContent(instanceID, es(defaultDlrTemplate));
      ep(); defaultDdnTemplate && wasmExports.emscripten_bind_CvrWasm_AppendParameterContent(instanceID, es(defaultDdnTemplate));
      resetResponse = UTF8ToString(wasmExports.emscripten_bind_CvrWasm_InitParameter(instanceID));
      handleTaskRes(taskID, {
        success: true,
        response: resetResponse
      });
    } catch (ex) {
      handleTaskErr(taskID, ex);
    }
  },
  cvr_cc: async (body, taskID, instanceID) => {
    try {
      ep(); wasmExports.emscripten_bind_CvrWasm_CC(instanceID, es(body.text), es(body.strFormat), body.isDPM);
      handleTaskRes(taskID, {
        success: true
      });
    } catch (ex) {
      handleTaskErr(taskID, ex);
    }
  },
  cvr_getClarity: async (body, taskID, instanceID) => {
    let clarity: number;
    try {
      ep(); clarity = wasmExports.emscripten_bind_CoreWasm_GetClarity(setBufferIntoWasm(body.bytes), body.width, body.height, body.stride, body.bitcount, body.wr, body.hr, body.grayThreshold);
      handleTaskRes(taskID, {
        success: true,
        clarity
      });
    } catch (ex) {
      handleTaskErr(taskID, ex);
    }
  },
  cvr_getMaxBufferedItems: async (body, taskID, instanceID) => {
    let count: number;
    try {
      count = wasmExports.emscripten_bind_CvrWasm_GetMaxBufferedItems(instanceID);
      handleTaskRes(taskID, {
        success: true,
        count
      });
    } catch (ex) {
      handleTaskErr(taskID, ex);
    }
  },
  cvr_setMaxBufferedItems: async (body, taskID, instanceID) => {
    try {
      wasmExports.emscripten_bind_CvrWasm_SetMaxBufferedItems(instanceID, body.count);
      handleTaskRes(taskID, { success: true });
    } catch (ex) {
      handleTaskErr(taskID, ex);
    }
  },
  cvr_getBufferedCharacterItemSet: async (body, taskID, instanceID) => {
    let itemSet: any;
    try {
      itemSet = JSON.parse(UTF8ToString(wasmExports.emscripten_bind_CvrWasm_GetBufferedCharacterItemSet(instanceID)), (k, v) => {
        if (isDsImageKeyValue(k, v)) {
          return new Uint8Array(new Uint8Array(HEAP8.buffer, v.ptr, v.length));
        }
        return v;
      });
      handleTaskRes(taskID, {
        success: true,
        itemSet
      });
    } catch (ex) {
      handleTaskErr(taskID, ex);
    }
  },
  cvr_setIrrRegistry: async (body, taskID, instanceID) => {
    try {
      if (cvrInstanceSet.has(instanceID)) {
        ep(); wasmExports.emscripten_bind_CvrWasm_SetIrrRegistry(instanceID, es(JSON.stringify(body.receiverObj)));
        if (body.observedResultUnitTypes && body.observedResultUnitTypes !== "-1") {
          ep(); wasmExports.emscripten_bind_CvrWasm_SetObservedResultUnitTypes(instanceID, es(body.observedResultUnitTypes));
        }
        for (let taskName in body.observedTaskMap) {
          if (body.observedTaskMap[taskName]) {
            ep(); wasmExports.emscripten_bind_CvrWasm_AddObservedTask(instanceID, es(taskName));
          } else {
            ep(); wasmExports.emscripten_bind_CvrWasm_RemoveObservedTask(instanceID, es(taskName));
          }
        }
      }
      handleTaskRes(taskID, { success: true });
    } catch (ex) {
      handleTaskErr(taskID, ex);
    }
  },
  cvr_enableResultCrossVerification: async (body, taskID, instanceID) => {
    let ret: number;
    try {
      for (let v in body.verificationEnabled) {
        ret = wasmExports.emscripten_bind_CvrWasm_EnableResultCrossVerification(instanceID, Number(v), body.verificationEnabled[v]);
      }
      handleTaskRes(taskID, {
        success: true,
        result: ret
      });
    } catch (ex) {
      handleTaskErr(taskID, ex);
    }
  },
  cvr_enableResultDeduplication: async (body, taskID, instanceID) => {
    let ret: number;
    try {
      for (let d in body.duplicateFilterEnabled) {
        ret = wasmExports.emscripten_bind_CvrWasm_EnableResultDeduplication(instanceID, Number(d), body.duplicateFilterEnabled[d]);
      }
      handleTaskRes(taskID, {
        success: true,
        result: ret
      });
    } catch (ex) {
      handleTaskErr(taskID, ex);
    }
  },
  cvr_setDuplicateForgetTime: async (body, taskID, instanceID) => {
    let ret: number;
    try {
      for (let t in body.duplicateForgetTime) {
        ret = wasmExports.emscripten_bind_CvrWasm_SetDuplicateForgetTime(instanceID, Number(t), body.duplicateForgetTime[t]);
      }
      handleTaskRes(taskID, {
        success: true,
        result: ret
      });
    } catch (ex) {
      handleTaskErr(taskID, ex);
    }
  },
  cvr_getDuplicateForgetTime: async (body, taskID, instanceID) => {
    let time: number;
    try {
      time = wasmExports.emscripten_bind_CvrWasm_GetDuplicateForgetTime(instanceID, body.type);
      handleTaskRes(taskID, {
        success: true,
        time
      });
    } catch (ex) {
      handleTaskErr(taskID, ex);
    }
  },
  cvr_setResultCrossVerificationCriteria: async (body, taskID, instanceID) => {
    let ret: number;
    try {
      for (let c in body.criteria) {
        const _criteria = body.criteria[c] as CrossVerificationCriteria;
        ret = wasmExports.emscripten_bind_CvrWasm_SetResultCrossVerificationCriteria(instanceID, Number(c), _criteria.frameWindow, _criteria.minConsistentFrames);
      }
      handleTaskRes(taskID, {
        success: true,
        result: ret
      });
    } catch (ex) {
      handleTaskErr(taskID, ex);
    }
  },
  cvr_containsTask: async (body, taskID, instanceID) => {
    try {
      ep(); const tasks = UTF8ToString(wasmExports.emscripten_bind_CvrWasm_ContainsTask(instanceID, es(body.templateName)));
      handleTaskRes(taskID, { success: true, tasks });
    } catch (ex) {
      handleTaskErr(taskID, ex);
    }
  },
  cvr_dispose: async (body, taskID, instanceID) => {
    try {
      cvrInstanceSet.delete(instanceID);
      wasmExports.emscripten_bind_CvrWasm___destroy___(instanceID);
      handleTaskRes(taskID, { success: true });
    } catch (ex) {
      handleTaskErr(taskID, ex);
    }
  },
  cvr_getWasmFilterState: async (body, taskID, instanceID) => {
    let response;
    try {
      response = UTF8ToString(wasmExports.emscripten_bind_CvrWasm_GetFilterState(instanceID));
      handleTaskRes(taskID, {
        success: true,
        response
      });
    } catch (ex) {
      handleTaskErr(taskID, ex);
    }
  },
  cvr_checkTemplateNameValidity: async (body, taskID, instanceID) => {
    let isValid: boolean = true;
    try {
      ep(); const outputSettings = JSON.parse(UTF8ToString(wasmExports.emscripten_bind_CvrWasm_OutputSettings(instanceID, es(body.templateName))));
      if (outputSettings && outputSettings.errorCode && outputSettings.errorCode === EnumErrorCode.EC_TEMPLATE_NAME_INVALID) {
        isValid = false;
      }
      handleTaskRes(taskID, {
        success: true,
        isValid
      });
    } catch (ex) {
      handleTaskErr(taskID, ex);
    }
  }
} as MapController);
// license related controller
Object.assign(mapController, {
  l_dynamsoft: async (body: any, taskID) => {
    try {
      //let version = body.v;
      //let domain = body.dm;
      let OfflineLicense = body.l;
      bRuntimeAuth = body.brtk;
      // let bPublicTryKey = body.bptk;

      let ltsErrorCode;
      let funcProcessRuntimeAuth = async () => {
        // try {
        ltsInstance = ltsInstance || createDlsInstance({ dm: strDomain, log: log, bd: bDebug });
        // this method need to define in globalThis, so wasm can use it, send consume save db
        (self as any).scsd = ltsInstance.s;//secretAndSendToDb // todo: instead of a func in global, a function point into wasm may better
        body.pd = ''; // TODO '|cvr|dbr'
        body.v = "0." + body.v;
        body.updl = updateLicense;
        body.mnet = getMinExpireTime;
        body.mxet = getMaxExpireTime;
        await ltsInstance.i(body);//initLicense
        // } catch (ex) {
        //     // In dbr10 or dcv,
        //     // there will no longer be QR code results for stars.
        //     // If there is a problem with the license, no results will be generated.
        //     // so I comment this code.
        //     if (bPublicTryKey) {
        //         bRuntimeAuth = false;
        //         await funcProcessOfflineKey();
        //         ltsErrorCode = ex.ltsErrorCode;
        //         msgFromLtsServer = ex.message || ex;
        //     } else {
        //         throw ex;
        //     }
        // }
      };
      let funcProcessOfflineKey = async () => {
        if (OfflineLicense.startsWith('DLC2')) {
          // DLC2
          ltsInstance = ltsInstance || createDlsInstance({ dm: strDomain, log: log, bd: bDebug });
          await ltsInstance.i2({ updl: updateLicense, mxet: getMaxExpireTime, strDLC2: OfflineLicense });
        } else {
          // ProductKey
          let initCfg: InitConfig = {
            pk: OfflineLicense,
            dm: strDomain,
          };
          if (bDebug) { initCfg.bd = true; }
          updateLicense(initCfg);
        }
      };
      bRuntimeAuth ? await funcProcessRuntimeAuth() : await funcProcessOfflineKey();
      _e = body._e;
      if (currentInitCfg.mli && body.mliRecord) {
        if (_e) {
          oldMliRecord = await d(body.mliRecord, secretKey);
        } else {
          oldMliRecord = body.mliRecord;
        }
        oldMliRecord = JSON.parse(oldMliRecord);
        for (let item in oldMliRecord) {
          if (mliRecord[item]) {
            for (let mid in oldMliRecord[item]) {
              mliRecord[item][mid].used = oldMliRecord[item][mid].used;
            }
          }
        }
      }
      handleTaskRes(taskID, {
        trial: currentInitCfg.trial,
        ltsErrorCode: ltsErrorCode,
        message: currentInitCfg.msg,
        initLicenseInfo,
        bSupportDce4Module: wasmExports.emscripten_bind_CoreWasm_static_GetIsSupportDceModule(),
        bSupportIRTModule: wasmExports.emscripten_bind_CoreWasm_static_GetIsSupportIRTModule()
      });
    } catch (ex) {
      handleTaskErr(taskID, ex);
    }
  },
  l_getDeviceUUID: async (body, taskID) => {
    try {
      // TODO: now bDebug for dlsInstance only process one time, how to be dynamic?
      ltsInstance = ltsInstance || createDlsInstance({ dm: strDomain, log: log, bd: bDebug });
      let uuid = await ltsInstance.u();
      handleTaskRes(taskID, { uuid });
    } catch (ex) {
      handleTaskErr(taskID, ex);
    }
  },
  l_getAR: async (body, taskID) => {
    try {
      if (!ltsInstance) {
        handleTaskRes(taskID, null);
      } else {
        let obj: any = {
          u: await ltsInstance.u(),
          pt: ltsInstance.pt(),
        };
        let ar = ltsInstance.ar();
        if (ar) { obj.ar = ar; }
        let ae = ltsInstance.ae();
        if (ae) {
          obj.lem = ae.message;
          obj.lec = ae.ltsErrorCode;
        }
        handleTaskRes(taskID, obj);
      }
    } catch (ex) {
      handleTaskErr(taskID, ex);
    }
  },
} as MapController);
// dlr related controller
Object.assign(mapController, {
  dlr_loadData: async (body, taskID) => {
    try {
      checkAndLoadCharResources(body.type, body.dataName, body.dataPath);
      let result = await mapLoadedCharsData[body.dataName];
      handleTaskRes(taskID, {
        success: true,
        result
      });
    } catch (ex) {
      handleTaskErr(taskID, ex);
      return;
    }
  }
} as MapController);
// ddn related controller
Object.assign(mapController, {
  ddn_setThresholdValue: async (body, taskID, instanceID) => {
    try {
      const ddnWasm = wasmExports.emscripten_bind_DdnWasm(instanceID);
      wasmExports.emscripten_bind_DdnWasm_setThresholdValue(ddnWasm, body.threshold, body.leftLimit, body.rightLimit);
      handleTaskRes(taskID, {
        success: true,
      });
    } catch (ex) {
      handleTaskErr(taskID, ex);
      return;
    }
  }
} as MapController);
// dcp related controller
Object.assign(mapController, {
  dcp_appendResourceBuffer: async (body, taskID) => {
    try {
      for (let specificationName of body.specificationNames) {
        checkAndLoadParserResources(specificationName, body.specificationPath);
      }
      const results = await Promise.all(Object.values(mapAppendedResourceBuffer));
      const errorResult = results.filter(r => r.errorCode !== 0)[0];
      handleTaskRes(taskID, {
        success: true,
        result: errorResult ? errorResult : results[0]
      });
    } catch (ex) {
      handleTaskErr(taskID, ex);
      return;
    }
  },
  dcp_createInstance: async (body, taskID) => {
    try {
      let instanceID = wasmExports.emscripten_bind_DcpWasm_CreateInstance();
      handleTaskRes(taskID, { instanceID });
    } catch (ex) {
      handleTaskErr(taskID, ex);
      return;
    }
  },
  dcp_dispose: async (body, taskID, instanceID) => {
    try {
      wasmExports.emscripten_bind_DcpWasm___destroy___(instanceID);
      handleTaskRes(taskID, { success: true });
    } catch (ex) {
      handleTaskErr(taskID, ex);
    }
  },
  dcp_initSettings: async (body, taskID, instanceID) => {
    try {
      ep(); let response = UTF8ToString(wasmExports.emscripten_bind_DcpWasm_InitSettings(instanceID, es(body.settings)));
      handleTaskRes(taskID, { success: true, response });
    } catch (ex) {
      handleTaskErr(taskID, ex);
      return;
    }
  },
  dcp_resetSettings: async (body, taskID, instanceID) => {
    try {
      wasmExports.emscripten_bind_DcpWasm_ResetSettings(instanceID);
      handleTaskRes(taskID, { success: true });
    } catch (ex) {
      handleTaskErr(taskID, ex);
      return;
    }
  },
  dcp_parse: async (body, taskID, instanceID) => {
    try {
      ep(); let parseResponse = UTF8ToString(wasmExports.emscripten_bind_DcpWasm_Parse(instanceID, setBufferIntoWasm(body.source, 0), body.source.length, es(body.taskSettingName)));
      if (parseResponse === "parse failed.") {
        parseResponse = JSON.stringify({ errorCode: true, errorString: "parse failed." }); // TODO
      }
      handleTaskRes(taskID, { success: true, parseResponse });
    } catch (ex) {
      handleTaskErr(taskID, ex);
      return;
    }
  }
} as MapController);
// utility related controller
Object.assign(mapController, {
  utility_drawOnImage: async (body, taskID) => {
    try {
      let cImageData = wasmExports.emscripten_bind_Create_CImageData(body.dsImage.bytes.length, setBufferIntoWasm(body.dsImage.bytes, 0), body.dsImage.width, body.dsImage.height, body.dsImage.stride, body.dsImage.format, 0);
      const type = body.type.charAt(0).toUpperCase() + body.type.slice(1); // capitalize the first letter

      ep(); const point = wasmExports[`emscripten_bind_UtilityWasm_DrawOnImage${type}`](cImageData, es(JSON.stringify(body.drawingItem)), body.drawingItem.length, body.color, body.thickness);
      const image = JSON.parse(UTF8ToString(wasmExports.emscripten_bind_CoreWasm_ResolveImageData(point)));
      handleImageDataBytes(image);

      wasmExports.emscripten_bind_Destory_CImageData(image);
      wasmExports.emscripten_bind_Destory_CImageData(cImageData);
      postMessage({
        type: "task",
        id: taskID,
        body: {
          success: true,
          image
        }
      }, [image.bytes.buffer]);
    } catch (ex) {
      handleTaskErr(taskID, ex);
      return;
    }
  },
  utility_cropImage: async (body, taskID) => {
    try {
      const cImageData = wasmExports.emscripten_bind_Create_CImageData(body.bytes.length, setBufferIntoWasm(body.bytes, 0), body.width, body.height, body.stride, body.format, 0);
      ep(); const point = wasmExports[`emscripten_bind_UtilityWasm_CropImageFrom${body.type}`](cImageData, es(JSON.stringify(body.roi)));
      const cropImage = JSON.parse(UTF8ToString(wasmExports.emscripten_bind_CoreWasm_ResolveImageData(point)));
      handleImageDataBytes(cropImage);

      wasmExports.emscripten_bind_Destory_CImageData(point);
      wasmExports.emscripten_bind_Destory_CImageData(cImageData);
      postMessage({
        type: "task",
        id: taskID,
        body: {
          success: true,
          cropImage
        }
      }, [cropImage.bytes.buffer]);
    } catch (ex) {
      handleTaskErr(taskID, ex);
      return;
    }
  },
  utility_adjustBrightness: async (body, taskID) => {
    try {
      const cImageData = wasmExports.emscripten_bind_Create_CImageData(body.bytes.length, setBufferIntoWasm(body.bytes, 0), body.width, body.height, body.stride, body.format, 0);
      const point = wasmExports.emscripten_bind_UtilityWasm_AdjustBrightness(cImageData, body.brightness);
      const adjustBrightness = JSON.parse(UTF8ToString(wasmExports.emscripten_bind_CoreWasm_ResolveImageData(point)));
      handleImageDataBytes(adjustBrightness);

      wasmExports.emscripten_bind_Destory_CImageData(cImageData);
      wasmExports.emscripten_bind_Destory_CImageData(point);
      postMessage({
        type: "task",
        id: taskID,
        body: {
          success: true,
          adjustBrightness
        }
      }, [adjustBrightness.bytes.buffer]);
    } catch (ex) {
      handleTaskErr(taskID, ex);
      return;
    }
  },
  utility_adjustContrast: async (body, taskID) => {
    try {
      const cImageData = wasmExports.emscripten_bind_Create_CImageData(body.bytes.length, setBufferIntoWasm(body.bytes, 0), body.width, body.height, body.stride, body.format, 0);
      const point = wasmExports.emscripten_bind_UtilityWasm_AdjustContrast(cImageData, body.contrast);
      const adjustContrast = JSON.parse(UTF8ToString(wasmExports.emscripten_bind_CoreWasm_ResolveImageData(point)));
      handleImageDataBytes(adjustContrast);

      wasmExports.emscripten_bind_Destory_CImageData(point);
      wasmExports.emscripten_bind_Destory_CImageData(cImageData);
      postMessage({
        type: "task",
        id: taskID,
        body: {
          success: true,
          adjustContrast
        }
      }, [adjustContrast.bytes.buffer]);
    } catch (ex) {
      handleTaskErr(taskID, ex);
      return;
    }
  },
  utility_filterImage: async (body, taskID) => {
    try {
      const cImageData = wasmExports.emscripten_bind_Create_CImageData(body.bytes.length, setBufferIntoWasm(body.bytes, 0), body.width, body.height, body.stride, body.format, 0);
      const point = wasmExports.emscripten_bind_UtilityWasm_FilterImage(cImageData, body.filterType);
      const filterImage = JSON.parse(UTF8ToString(wasmExports.emscripten_bind_CoreWasm_ResolveImageData(point)));
      handleImageDataBytes(filterImage);

      wasmExports.emscripten_bind_Destory_CImageData(point);
      wasmExports.emscripten_bind_Destory_CImageData(cImageData);
      postMessage({
        type: "task",
        id: taskID,
        body: {
          success: true,
          filterImage
        }
      }, [filterImage.bytes.buffer]);
    } catch (ex) {
      handleTaskErr(taskID, ex);
      return;
    }
  },
  utility_convertToGray: async (body, taskID) => {
    try {
      const cImageData = wasmExports.emscripten_bind_Create_CImageData(body.bytes.length, setBufferIntoWasm(body.bytes, 0), body.width, body.height, body.stride, body.format, 0);
      const point = wasmExports.emscripten_bind_UtilityWasm_ConvertToGray(cImageData, body.R, body.G, body.B);
      const convertToGray = JSON.parse(UTF8ToString(wasmExports.emscripten_bind_CoreWasm_ResolveImageData(point)));
      handleImageDataBytes(convertToGray);

      wasmExports.emscripten_bind_Destory_CImageData(point);
      wasmExports.emscripten_bind_Destory_CImageData(cImageData);
      postMessage({
        type: "task",
        id: taskID,
        body: {
          success: true,
          convertToGray
        }
      }, [convertToGray.bytes.buffer]);
    } catch (ex) {
      handleTaskErr(taskID, ex);
      return;
    }
  },
  utility_convertToBinaryGlobal: async (body, taskID) => {
    try {
      const cImageData = wasmExports.emscripten_bind_Create_CImageData(body.bytes.length, setBufferIntoWasm(body.bytes, 0), body.width, body.height, body.stride, body.format, 0);
      const point = wasmExports.emscripten_bind_UtilityWasm_ConvertToBinaryGlobal(cImageData, body.threshold, body.invert);
      const convertToBinaryGlobal = JSON.parse(UTF8ToString(wasmExports.emscripten_bind_CoreWasm_ResolveImageData(point)));
      handleImageDataBytes(convertToBinaryGlobal);

      wasmExports.emscripten_bind_Destory_CImageData(point);
      wasmExports.emscripten_bind_Destory_CImageData(cImageData);
      postMessage({
        type: "task",
        id: taskID,
        body: {
          success: true,
          convertToBinaryGlobal
        }
      }, [convertToBinaryGlobal.bytes.buffer]);
    } catch (ex) {
      handleTaskErr(taskID, ex);
      return;
    }
  },
  utility_convertToBinaryLocal: async (body, taskID) => {
    try {
      const cImageData = wasmExports.emscripten_bind_Create_CImageData(body.bytes.length, setBufferIntoWasm(body.bytes, 0), body.width, body.height, body.stride, body.format, 0);
      const point = wasmExports.emscripten_bind_UtilityWasm_ConvertToBinaryLocal(cImageData, body.blockSize, body.compensation, body.invert);
      const convertToBinaryLocal = JSON.parse(UTF8ToString(wasmExports.emscripten_bind_CoreWasm_ResolveImageData(point)));
      handleImageDataBytes(convertToBinaryLocal);

      wasmExports.emscripten_bind_Destory_CImageData(point);
      wasmExports.emscripten_bind_Destory_CImageData(cImageData);
      postMessage({
        type: "task",
        id: taskID,
        body: {
          success: true,
          convertToBinaryLocal
        }
      }, [convertToBinaryLocal.bytes.buffer]);
    } catch (ex) {
      handleTaskErr(taskID, ex);
      return;
    }
  },
  utility_cropAndDeskewImage: async (body, taskID) => {
    try {
      const cImageData = wasmExports.emscripten_bind_Create_CImageData(body.bytes.length, setBufferIntoWasm(body.bytes, 0), body.width, body.height, body.stride, body.format, 0);
      ep(); const point = wasmExports.emscripten_bind_UtilityWasm_CropAndDeskewImage(cImageData, es(JSON.stringify(body.roi)), body.dstWidth, body.dstHeight, body.padding);
      const cropAndDeskewImage = JSON.parse(UTF8ToString(wasmExports.emscripten_bind_CoreWasm_ResolveImageData(point)));
      handleImageDataBytes(cropAndDeskewImage);

      wasmExports.emscripten_bind_Destory_CImageData(point);
      wasmExports.emscripten_bind_Destory_CImageData(cImageData);
      postMessage({
        type: "task",
        id: taskID,
        body: {
          success: true,
          cropAndDeskewImage
        }
      }, [cropAndDeskewImage.bytes.buffer]);
    } catch (ex) {
      handleTaskErr(taskID, ex);
      return;
    }
  },
  utility_analyze: async (body, taskID) => {
    try {
      ep();
      const inputQuads = es(JSON.stringify(body.inputQuads));
      const parameter = es(JSON.stringify(body.parameter));
      const analyzeResult = JSON.parse(UTF8ToString(wasmExports.emscripten_bind_UtilityWasm_Analyze(inputQuads, body.inputQuads.length, parameter)));
      handleTaskRes(taskID, {
        success: true,
        analyzeResult
      });
    } catch (ex) {
      handleTaskErr(taskID, ex);
      return;
    }
  }
} as MapController);
// identityUtility related controller
Object.assign(mapController, {
  identityUtility_findPortraitZone: async (body, taskID, instanceID) => {
    try {
      const result = UTF8ToString(wasmExports.emscripten_bind_IdentityUtilityWasm_FindPortraitZone(instanceID));
      handleTaskRes(taskID, {
        success: true,
        result
      });
    } catch (ex) {
      handleTaskErr(taskID, ex);
      return;
    }
  }
} as MapController);

addEventListener("message", async e => {
  const data = e.data ? e.data : e;
  const body = data.body;
  const taskID = data.id;
  const instanceID = data.instanceID;

  const taskFunc = mapController[data.type]; // TODO: try catch in case task not handle it
  if (taskFunc) {
    //if (pThreadProxy) { await pThreadProxy; }
    taskFunc(body, taskID, instanceID);
  } else {
    //throw new Error("Unmatched task: " + data.type);
  }
})

const checkAndLoadModel = (dataName: string, dataPath: string) => {
  if (isNoOnnx) return;
  if (!mapLoadedModelBuffer[dataName]) {
    mapLoadedModelBuffer[dataName] = (async () => {
      try {
        let total: number = 0;
        let resourcesPath = `${dataPath}${dataName}.data`;
        let lastProcessTime = Date.now();
        const dataBytes = await requestResource(resourcesPath, "arraybuffer", {
          loadstartCallback: () => {
            postMessage({
              type: "event",
              id: -2,
              body: {
                loaded: 0,
                total: total ? total : 0,
                tag: "starting",
                resourcesPath
              }
            });
          },
          progressCallback: (pe: any) => {
            if (pe.lengthComputable) {
              total = pe.total
            }
            if (total) {
              const now = Date.now();
              if (lastProcessTime + 500 < now) {
                postMessage({
                  type: "event",
                  id: -2,
                  body: {
                    total,
                    loaded: pe.loaded,
                    tag: "in progress",
                    resourcesPath
                  }
                });
                lastProcessTime = now;
              }
            }
          },
          loadendCallback: () => {
            postMessage({
              type: "event",
              id: -2,
              body: {
                loaded: total ? total : 0,
                total: total ? total : 0,
                tag: "completed",
                resourcesPath
              }
            });
          }
        });

        const u8DataBytes = new Uint8Array(dataBytes);
        ep(); const response: string = UTF8ToString(wasmExports.emscripten_bind_CvrWasm_AppendDLModelBuffer(es(dataName), setBufferIntoWasm(u8DataBytes, 0), u8DataBytes.length, 1));
        return response;
      } catch (ex) {
        delete mapLoadedModelBuffer[dataName];
        let error = new Error(ex);
        if (ex === 404) {
          error = new Error(`[${EnumErrorCode.EC_MODEL_FILE_NOT_FOUND}]: Model file not found.`)
        }
        return Promise.reject(error);
      }
    })();
  }
}
const checkAndLoadCharResources = (type: "confusable" | "overlapping", dataName: string, dataPath: string) => {
  // be very careful when modfiy this func. It uses a lot of coroutines. 
  if (!mapLoadedCharsData[dataName]) {
    const modelSizeMap: { [key: string]: number } = {
      ConfusableChars: 5577,
      OverlappingChars: 486901
    }

    let total: number = modelSizeMap[dataName];
    mapLoadedCharsData[dataName] = (async () => {
      try {
        let lastProcessTime = Date.now();
        const resourcesPath = dataPath + dataName + ".data";
        const dataBytes = await requestResource(resourcesPath, "arraybuffer", {
          loadstartCallback: () => {
            postMessage({
              type: "event",
              id: -1,
              body: {
                loaded: 0,
                total: total ? total : 0,
                tag: "starting",
                resourcesPath
              }
            });
          },
          progressCallback: (pe: any) => {
            if (pe.lengthComputable) {
              total = pe.total
            }
            if (total) {
              const now = Date.now();
              if (lastProcessTime + 500 < now) {
                postMessage({
                  type: "event",
                  id: -1,
                  body: {
                    total,
                    loaded: pe.loaded,
                    tag: "in progress",
                    resourcesPath
                  }
                });
                lastProcessTime = now;
              }
            }
          },
          loadendCallback: () => {
            postMessage({
              type: "event",
              id: -1,
              body: {
                loaded: total ? total : 0,
                total: total ? total : 0,
                tag: "completed",
                resourcesPath
              }
            });
          }
        });

        const charsDataU8 = new Uint8Array(dataBytes);
        let response;
        ep();
        if (type === "confusable") {
          response = UTF8ToString(wasmExports.emscripten_bind_DlrWasm_AppendConfusableCharactersBuffer(es(dataName), setBufferIntoWasm(charsDataU8, 0), charsDataU8.length));
        } else if (type === "overlapping") {
          response = UTF8ToString(wasmExports.emscripten_bind_DlrWasm_AppendOverLappingCharactersBuffer(es(dataName), setBufferIntoWasm(charsDataU8, 0), charsDataU8.length));
        }
        return response;
      } catch (ex) {
        delete mapLoadedCharsData[dataName];
        let error = new Error(ex);
        return Promise.reject(error);
      }
    })();
  }
}
const checkAndLoadParserResources = (specificationName: string, specificationPath: string) => {
  specificationName = specificationName.toUpperCase();
  if (!mapAppendedResourceBuffer[specificationName]) {
    mapAppendedResourceBuffer[specificationName] = (async () => {
      try {
        let resourcesPath = specificationPath + specificationName + ".data";
        let total: number = 0;
        let lastProcessTime = Date.now();
        let data = await requestResource(resourcesPath, "arraybuffer", {
          loadstartCallback: () => {
            postMessage({
              type: "event",
              id: -4,
              body: {
                loaded: 0,
                total: total ? total : 0,
                tag: "starting",
                resourcesPath
              }
            });
          },
          progressCallback: (pe: any) => {
            if (pe.lengthComputable) {
              total = pe.total
            }
            if (total) {
              const now = Date.now();
              if (lastProcessTime + 500 < now) {
                postMessage({
                  type: "event",
                  id: -4,
                  body: {
                    total,
                    loaded: pe.loaded,
                    tag: "in progress",
                    resourcesPath
                  }
                });
                lastProcessTime = now;
              }
            }
          },
          loadendCallback: () => {
            postMessage({
              type: "event",
              id: -4,
              body: {
                loaded: total ? total : 0,
                total: total ? total : 0,
                tag: "completed",
                resourcesPath
              }
            });
          }
        });
        const dataU8 = new Uint8Array(data);
        ep(); const errorInfo = UTF8ToString(wasmExports.emscripten_bind_DcpWasm_AppendResourceBuffer(es(specificationName), setBufferIntoWasm(dataU8), dataU8.length));
        return JSON.parse(errorInfo);
      } catch (ex) {
        delete mapAppendedResourceBuffer[specificationName];
        let error = new Error(ex);
        if (ex === 404) {
          error = new Error(`[${EnumErrorCode.EC_FILE_NOT_FOUND}]: The specified file could not be found.`);
        }
        return Promise.reject(error);
      }
    })();
  }
}
const loadResources = async (instanceID: number, body: any) => {
  ep(); const resources = JSON.parse(UTF8ToString(wasmExports.emscripten_bind_CvrWasm_ParseRequiredResources(instanceID, es(body.templateName))));
  for (let i = 0; i < resources.models.length; i++) {
    checkAndLoadModel(resources.models[i], _resourcePath + "models/" as string);
  }
  for (let i = 0; i < resources.specss.length; i++) {
    checkAndLoadParserResources(resources.specss[i], _resourcePath + "parser-resources/");
  }
  await Promise.all([...Object.values(mapLoadedModelBuffer), ...Object.values(mapAppendedResourceBuffer)]);
}
const loadCharResources = async (instanceID: number, body: any) => {
  ep(); const tasks = UTF8ToString(wasmExports.emscripten_bind_CvrWasm_ContainsTask(instanceID, es(body.templateName)));
  if (tasks.includes("dlr")) {
    checkAndLoadCharResources("confusable", "ConfusableChars", _resourcePath + "char-resources/");
    checkAndLoadCharResources("overlapping", "OverlappingChars", _resourcePath + "char-resources/");
    await Promise.all(Object.values(mapLoadedCharsData));
  }
}
const handleIntermediateResult = (intermediateResult: Array<any>): any => {
  for (let unit of intermediateResult) {
    if (unit.result) {
      if ([EnumIntermediateResultUnitType.IRUT_CONTOURS].includes(BigInt(unit.result.unitType))) {
        let bytes = unit.result.contours;
        let offset = unit.result.contoursOffset;
        if (bytes && offset) {
          bytes = new Uint8Array(new Uint8Array(HEAP8.buffer, bytes.ptr, bytes.length));
          offset = new Uint8Array(new Uint8Array(HEAP8.buffer, offset.ptr, offset.length));
          const dataView = new DataView(bytes.buffer);
          const conturesArr = [];
          for (let i = 0; i < bytes.length; i += 4) {
            conturesArr.push(dataView.getInt32(i, true))
          }
          const dataViewOffset = new DataView(offset.buffer);
          // Offset starts from 0 by default.
          const offsetArr = [0];
          for (let i = 0; i < offset.length; i += 4) {
            offsetArr.push(dataViewOffset.getInt32(i, true))
          }
          const formatedContours = [];
          for (let i = 0; i < offsetArr.length - 1; i++) {
            const offset = offsetArr[i];
            const pointsArr: any = { points: [] };
            for (let j = offset; j < offsetArr[i + 1] - 1; j += 2) {
              pointsArr.points.push({ x: conturesArr[j], y: conturesArr[j + 1] });
            }
            formatedContours.push(pointsArr);
          }
          unit.result.contours = formatedContours;
          delete unit.result.contoursOffset;
        }
      } else if ([EnumIntermediateResultUnitType.IRUT_LINE_SEGMENTS].includes(BigInt(unit.result.unitType))) {
        let bytes = unit.result.lineSegments;
        if (bytes) {
          bytes = new Uint8Array(new Uint8Array(HEAP8.buffer, bytes.ptr, bytes.length));
          const dataView = new DataView(bytes.buffer);
          const lineSegmentsArr = [];
          for (let i = 0; i < bytes.length; i += 4) {
            lineSegmentsArr.push(dataView.getInt32(i, true))
          }
          const formatedLineSegments = [];
          for (let i = 0; i < lineSegmentsArr.length; i += 4) {
            const lineSegment = {
              startPoint: { x: lineSegmentsArr[i], y: lineSegmentsArr[i + 1] },
              endPoint: { x: lineSegmentsArr[i + 2], y: lineSegmentsArr[i + 3] }
            };
            formatedLineSegments.push(lineSegment);
          }
          unit.result.lineSegments = formatedLineSegments;
        }
      } else if ([EnumIntermediateResultUnitType.IRUT_LOGIC_LINES].includes(BigInt(unit.result.unitType))) {
        let bytes = unit.result.logicLines;
        if (bytes) {
          bytes = new Uint8Array(new Uint8Array(HEAP8.buffer, bytes.ptr, bytes.length));
          const dataView = new DataView(bytes.buffer);
          const logicLinesArr = [];
          for (let i = 0; i < bytes.length; i += 4) {
            logicLinesArr.push(dataView.getInt32(i, true))
          }
          const formatedLogicLines = [];
          for (let i = 0; i < logicLinesArr.length; i += 4) {
            const logicLine = {
              startPoint: { x: logicLinesArr[i], y: logicLinesArr[i + 1] },
              endPoint: { x: logicLinesArr[i + 2], y: logicLinesArr[i + 3] }
            };
            formatedLogicLines.push(logicLine);
          }
          unit.result.logicLines = formatedLogicLines;
        }
      } else if ([EnumIntermediateResultUnitType.IRUT_SHORT_LINES].includes(BigInt(unit.result.unitType))) {
        let bytes = unit.result.shortLines;
        if (bytes) {
          bytes = new Uint8Array(new Uint8Array(HEAP8.buffer, bytes.ptr, bytes.length));
          const dataView = new DataView(bytes.buffer);
          const shortLinesArr = [];
          for (let i = 0; i < bytes.length; i += 4) {
            shortLinesArr.push(dataView.getInt32(i, true))
          }
          const formatedShortLines = [];
          for (let i = 0; i < shortLinesArr.length; i += 4) {
            const shortLine = {
              startPoint: { x: shortLinesArr[i], y: shortLinesArr[i + 1] },
              endPoint: { x: shortLinesArr[i + 2], y: shortLinesArr[i + 3] }
            };
            formatedShortLines.push(shortLine)
          }
          unit.result.shortLines = formatedShortLines;
        }
      } else if ([EnumIntermediateResultUnitType.IRUT_CANDIDATE_QUAD_EDGES].includes(BigInt(unit.result.unitType))) {
        let bytes = unit.result.candidateQuadEdges;
        if (bytes) {
          bytes = new Uint8Array(new Uint8Array(HEAP8.buffer, bytes.ptr, bytes.length));
          const dataView = new DataView(bytes.buffer);
          const candidateQuadEdgesArr = [];
          for (let i = 0; i < bytes.length; i += 4) {
            candidateQuadEdgesArr.push(dataView.getInt32(i, true))
          }
          const formatedcandidateQuadEdges = [];
          for (let i = 0; i < candidateQuadEdgesArr.length; i += 22) {
            const candidateQuadEdge = {
              startCorner: {
                intersection: { x: candidateQuadEdgesArr[i], y: candidateQuadEdgesArr[i + 1] },
                line1: {
                  startPoint: { x: candidateQuadEdgesArr[i + 2], y: candidateQuadEdgesArr[i + 3] },
                  endPoint: { x: candidateQuadEdgesArr[i + 4], y: candidateQuadEdgesArr[i + 5] }
                },
                line2: {
                  startPoint: { x: candidateQuadEdgesArr[i + 6], y: candidateQuadEdgesArr[i + 7] },
                  endPoint: { x: candidateQuadEdgesArr[i + 8], y: candidateQuadEdgesArr[i + 9] }
                },
                type: candidateQuadEdgesArr[i + 10]
              },
              endCorner: {
                intersection: { x: candidateQuadEdgesArr[i + 11], y: candidateQuadEdgesArr[i + 12] },
                line1: {
                  startPoint: { x: candidateQuadEdgesArr[i + 13], y: candidateQuadEdgesArr[i + 14] },
                  endPoint: { x: candidateQuadEdgesArr[i + 15], y: candidateQuadEdgesArr[i + 16] }
                },
                line2: {
                  startPoint: { x: candidateQuadEdgesArr[i + 17], y: candidateQuadEdgesArr[i + 18] },
                  endPoint: { x: candidateQuadEdgesArr[i + 19], y: candidateQuadEdgesArr[i + 20] }
                },
                type: candidateQuadEdgesArr[i + 21]
              }
            };
            formatedcandidateQuadEdges.push(candidateQuadEdge)
          }
          unit.result.candidateQuadEdges = formatedcandidateQuadEdges;
        }
      } else if ([EnumIntermediateResultUnitType.IRUT_CORNERS].includes(BigInt(unit.result.unitType))) {
        let bytes = unit.result.corners;
        if (bytes) {
          bytes = new Uint8Array(new Uint8Array(HEAP8.buffer, bytes.ptr, bytes.length));
          const dataView = new DataView(bytes.buffer);
          const cornersArr = [];
          for (let i = 0; i < bytes.length; i += 4) {
            cornersArr.push(dataView.getInt32(i, true))
          }
          const formatedcorners = [];
          for (let i = 0; i < cornersArr.length; i += 11) {
            const corner = {
              intersection: { x: cornersArr[i], y: cornersArr[i + 1] },
              line1: {
                startPoint: { x: cornersArr[i + 2], y: cornersArr[i + 3] },
                endPoint: { x: cornersArr[i + 4], y: cornersArr[i + 5] }
              },
              line2: {
                startPoint: { x: cornersArr[i + 6], y: cornersArr[i + 7] },
                endPoint: { x: cornersArr[i + 8], y: cornersArr[i + 9] }
              },
              type: cornersArr[i + 10]
            }
            formatedcorners.push(corner)
          };
          unit.result.corners = formatedcorners;
        }
      }
    }
  }
}
const addToUsage = (moduleId: string) => {
  mliRecordTag: for (let item in mliRecord) {
    for (let mid in mliRecord[item]) {
      if (mid === moduleId) {
        mliRecord[item][mid].used++;
        break mliRecordTag;
      }
    }
  }
}
const isReauthorizationRequired = () => {
  let flag = false;
  const _record: any = {};
  for (let item in mliRecord) {
    for (let mid in mliRecord[item]) {
      if (!_record[mid]) {
        _record[mid] = mliRecord[item][mid];
      } else {
        _record[mid].total += mliRecord[item][mid].total;
        _record[mid].used += mliRecord[item][mid].used;
      }
    }
  }

  for (let mid in _record) {
    if (_record[mid].used >= _record[mid].total) {
      if (!exceededModuleIds.includes(mid)) {
        exceededModuleIds.push(mid);
      }
      flag = true;
    }
  }

  for (let item in mliRecord) {
    for (let mid in mliRecord[item]) {
      if (exceededModuleIds.includes(mid)) {
        mliRecord[item][mid].total = 0;
        mliRecord[item][mid].used = 0;
      }
    }
  }
  return flag;
}
const getModuleId = (format: EnumBarcodeFormat): string => {
  return moduleIdRules.find(({ masks }) => masks.some(mask => format & mask)).moduleId;
};
const handleMliLicenseLogic = async (capturedResult: any) => {
  if (currentInitCfg.mli) {
    // After each decoding, keep a count of how many decoded results have been accumulated for each moduleId.
    for (let item of capturedResult.items) {
      if (item.type === EnumCapturedResultItemType.CRIT_BARCODE) {
        addToUsage(getModuleId(item.format));
      }
    }

    // As long as any moduleId exceeds its usage quota, reauthorization must be triggered.
    if (isReauthorizationRequired()) {
      // om => The set of restricted moduleIds.
      if (currentInitCfg.om) {
        currentInitCfg.om.push(...exceededModuleIds);
        currentInitCfg.om = [...new Set(currentInitCfg.om)];
      } else {
        currentInitCfg.om = exceededModuleIds;
      }

      await ltsInstance.glfd(true, { om: currentInitCfg.om, ic: currentInitCfg.ic });
      await ltsInstance.caul();
      exceededModuleIds = [];
    }
  }
}
const mergeMliRecord = async () => {
  let _mergedMliRecord;
  if (oldMliRecord) {
    const mergedMliRecord = JSON.parse(JSON.stringify(mliRecord));
    for (let item in oldMliRecord) {
      if (!mergedMliRecord[item]) {
        mergedMliRecord[item] = oldMliRecord[item];
      }
    }
    _mergedMliRecord = mergedMliRecord;
  } else {
    _mergedMliRecord = mliRecord;
  }
  if (_e) {
    _mergedMliRecord = await e(JSON.stringify(_mergedMliRecord), secretKey);
  } else {
    _mergedMliRecord = JSON.stringify(_mergedMliRecord);
  }
  return _mergedMliRecord;
}
const updateLicense = (initCfg: InitConfig) => {
  if (initCfg.mli) {
    // Count the number of moduleIds that can be decoded by the current authorization
    for (let itme in initCfg.mli) {
      if (!mliRecord.hasOwnProperty(itme)) {
        mliRecord[itme] = {};
      }
      const itemData = initCfg.mli[itme];
      for (let i = 2; i < itemData.length; i++) {
        if (!mliRecord[itme][itemData[i]]) {
          mliRecord[itme][itemData[i]] = {
            total: itemData[1],
            used: 0
          }
        } else {
          mliRecord[itme][itemData[i]].total += itemData[1];
        }
      }
    }
  }

  // Pass the decoded quantity data available for each graph to wasm
  if (initCfg.mlo) {
    initCfg.mlo = JSON.stringify(initCfg.mlo);
  }
  currentInitCfg = initCfg;

  ep(); initLicenseInfo = JSON.parse(UTF8ToString(wasmExports.emscripten_bind_CoreWasm_static_init(es(JSON.stringify(initCfg)))));
}
const getMinExpireTime = () => {
  let f = wasmExports.getMinExpireTime;
  return f ? f() : null;
}
const getMaxExpireTime = () => {
  let f = wasmExports.getMaxExpireTime;
  return f ? f() : null;
}
const checkAndReauth = async () => {
  if (bRuntimeAuth && ltsInstance) { await ltsInstance.c(); }
}
const handleImageDataBytes = (imageData: any) => {
  let bytes = imageData.bytes;
  if (bytes) {
    bytes = new Uint8Array(new Uint8Array(HEAP8.buffer, bytes.ptr, bytes.length));
    imageData.bytes = bytes;
  }
}