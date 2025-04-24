/*!
 * Dynamsoft JavaScript Library
 * @product Dynamsoft Capture Vision Router JS Edition
 * @website http://www.dynamsoft.com
 * @copyright Copyright 2024, Dynamsoft Corporation
 * @author Dynamsoft
 * @version "2.4.33"
 * @fileoverview Dynamsoft JavaScript Library for Capture Vision
 * More info on cvr JS: https://www.dynamsoft.com/capture-vision/docs/web/programming/javascript/api-reference/capture-vision-router/capture-vision-router-module.html
 */
import { getNextTaskID, mapTaskCallBack, worker, CoreModule, workerAutoResources, mapPackageRegister, compareVersion, innerVersions, EnumCapturedResultItemType, loadWasm, handleEngineResourcePaths, EnumImagePixelFormat, EnumColourChannelUsageType, isDSImageData, requestResource, EnumIntermediateResultUnitType } from 'dynamsoft-core';

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise, SuppressedError, Symbol, Iterator */


function __classPrivateFieldGet(receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
}

function __classPrivateFieldSet(receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
}

typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

const isPromiseLike = (value) => (value && "object" === typeof value && "function" === typeof value.then);
// get original `Promise`, avoid other js change the `Promise`
const Promise$1 = (async () => { })().constructor;
class MutablePromise extends Promise$1 {
    get status() { return this._s; }
    get isPending() { return "pending" === this._s; }
    get isFulfilled() { return "fulfilled" === this._s; }
    get isRejected() { return "rejected" === this._s; }
    get task() { return this._task; }
    set task(value) {
        //if(!this.isPending){ return; }
        this._task = value;
        let p;
        if (isPromiseLike(value)) {
            p = value;
        }
        else if ("function" === typeof value) {
            p = new Promise$1(value);
        }
        if (p) {
            (async () => {
                try {
                    const ret = await p;
                    // make sure task not change
                    if (value === this._task) {
                        this.resolve(ret);
                    }
                }
                catch (reason) {
                    // make sure task not change
                    if (value === this._task) {
                        this.reject(reason);
                    }
                }
            })();
        }
    }
    get isEmpty() { return null == this._task; }
    constructor(executor) {
        let rs;
        let rj;
        const fn = (_rs, _rj) => { rs = _rs; rj = _rj; };
        super(fn);
        // walkaround babel which can not extend builtin class
        // let _this = this;
        // let then = new Promise(fn).then;
        // this.then = function(){ then.apply(_this, arguments) } as any;
        this._s = "pending";
        this.resolve = (value) => {
            if (this.isPending) {
                if (isPromiseLike(value)) {
                    this.task = value;
                }
                else {
                    this._s = "fulfilled";
                    rs(value);
                }
            }
        };
        this.reject = (reason) => {
            if (this.isPending) {
                this._s = "rejected";
                rj(reason);
            }
        };
        this.task = executor;
    }
}

class BufferedItemsManager {
    constructor(cvr) {
        this._cvr = cvr;
    }
    /**
     * Gets the maximum number of buffered items.
     * @returns Returns the maximum number of buffered items.
     */
    async getMaxBufferedItems() {
        return await new Promise((rs, rj) => {
            let taskID = getNextTaskID();
            mapTaskCallBack[taskID] = async (body) => {
                if (body.success) {
                    return rs(body.count);
                }
                else {
                    let ex = new Error(body.message);
                    ex.stack = body.stack + '\n' + ex.stack;
                    return rj(ex);
                }
            };
            worker.postMessage({
                type: "cvr_getMaxBufferedItems",
                id: taskID,
                instanceID: this._cvr._instanceID
            });
        });
    }
    ;
    /**
     * Sets the maximum number of buffered items.
     * @param count the maximum number of buffered items
     */
    async setMaxBufferedItems(count) {
        return await new Promise((rs, rj) => {
            let taskID = getNextTaskID();
            mapTaskCallBack[taskID] = async (body) => {
                if (body.success) {
                    return rs();
                }
                else {
                    let ex = new Error(body.message);
                    ex.stack = body.stack + '\n' + ex.stack;
                    return rj(ex);
                }
            };
            worker.postMessage({
                type: "cvr_setMaxBufferedItems",
                id: taskID,
                instanceID: this._cvr._instanceID,
                body: {
                    count
                }
            });
        });
    }
    ;
    /**
     * Gets the buffered character items.
     * @return the buffered character items
     */
    async getBufferedCharacterItemSet() {
        return await new Promise((rs, rj) => {
            let taskID = getNextTaskID();
            mapTaskCallBack[taskID] = async (body) => {
                if (body.success) {
                    return rs(body.itemSet);
                }
                else {
                    let ex = new Error(body.message);
                    ex.stack = body.stack + '\n' + ex.stack;
                    return rj(ex);
                }
            };
            worker.postMessage({
                type: "cvr_getBufferedCharacterItemSet",
                id: taskID,
                instanceID: this._cvr._instanceID
            });
        });
    }
    ;
}

var irrRegistryState = {
    onTaskResultsReceived: false,
    onTaskResultsReceivedForDce: false,
    // section
    onPredetectedRegionsReceived: false,
    onLocalizedBarcodesReceived: false,
    onDecodedBarcodesReceived: false,
    onLocalizedTextLinesReceived: false,
    onRecognizedTextLinesReceived: false,
    onDetectedQuadsReceived: false,
    onNormalizedImagesReceived: false,
    // stage
    onColourImageUnitReceived: false,
    onScaledDownColourImageUnitReceived: false,
    onGrayscaleImageUnitReceived: false,
    onTransformedGrayscaleImageUnitReceived: false,
    onEnhancedGrayscaleImageUnitReceived: false,
    onBinaryImageUnitReceived: false,
    onTextureDetectionResultUnitReceived: false,
    onTextureRemovedGrayscaleImageUnitReceived: false,
    onTextureRemovedBinaryImageUnitReceived: false,
    onContoursUnitReceived: false,
    onLineSegmentsUnitReceived: false,
    onTextZonesUnitReceived: false,
    onTextRemovedBinaryImageUnitReceived: false,
    onRawTextLinesReceived: false,
    onLongLinesUnitReceived: false,
    onCornersUnitReceived: false,
    onCandidateQuadEdgesUnitReceived: false,
    onCandidateBarcodeZonesUnitReceived: false,
    onScaledUpBarcodeImageUnitReceived: false,
    onDeformationResistedBarcodeImageUnitReceived: false,
    onComplementedBarcodeImageUnitReceived: false,
    onShortLinesUnitReceived: false,
    onLogicLinesReceived: false
};

const _handleIntermediateResultReceiver = (irr) => {
    for (let irs in irr._irrRegistryState) {
        irr._irrRegistryState[irs] = false;
    }
    for (let receiver of irr._intermediateResultReceiverSet) {
        if (receiver.isDce || receiver.isFilter) {
            irr._irrRegistryState.onTaskResultsReceivedForDce = true;
            continue;
        }
        for (let r in receiver) {
            if (!irr._irrRegistryState[r]) {
                irr._irrRegistryState[r] = !!receiver[r];
            }
        }
    }
};
class IntermediateResultManager {
    constructor(cvr) {
        this._irrRegistryState = irrRegistryState;
        this._intermediateResultReceiverSet = new Set();
        this._cvr = cvr;
    }
    /**
     * Adds a `IntermediateResultReceiver` object as the receiver of intermediate results.
     * @param receiver The receiver object, of type `IntermediateResultReceiver`.
     */
    async addResultReceiver(receiver) {
        if (typeof receiver !== "object")
            throw new Error(`Invalid receiver.`);
        this._intermediateResultReceiverSet.add(receiver);
        _handleIntermediateResultReceiver(this);
        let observedResultUnitTypes = -1;
        let observedTaskMap = {};
        if (!receiver.isDce && !receiver.isFilter) {
            if (!receiver._observedResultUnitTypes || !receiver._observedTaskMap) {
                throw new Error("Invalid Intermediate Result Receiver.");
            }
            observedResultUnitTypes = receiver._observedResultUnitTypes;
            receiver._observedTaskMap.forEach((value, key) => {
                observedTaskMap[key] = value;
            });
            receiver._observedTaskMap.clear();
        }
        return await new Promise((rs, rj) => {
            let taskID = getNextTaskID();
            mapTaskCallBack[taskID] = async (body) => {
                if (body.success) {
                    return rs();
                }
                else {
                    let ex = new Error(body.message);
                    ex.stack = body.stack + '\n' + ex.stack;
                    return rj(ex);
                }
            };
            worker.postMessage({
                type: "cvr_setIrrRegistry",
                id: taskID,
                instanceID: this._cvr._instanceID,
                body: {
                    receiverObj: this._irrRegistryState,
                    observedResultUnitTypes: observedResultUnitTypes.toString(),
                    observedTaskMap
                }
            });
        });
    }
    ;
    /**
     * Removes the specified `IntermediateResultReceiver` object.
     * @param receiver The receiver object, of type `IntermediateResultReceiver`.
     */
    async removeResultReceiver(receiver) {
        this._intermediateResultReceiverSet.delete(receiver);
        _handleIntermediateResultReceiver(this);
        return await new Promise((rs, rj) => {
            let taskID = getNextTaskID();
            mapTaskCallBack[taskID] = async (body) => {
                if (body.success) {
                    return rs();
                }
                else {
                    let ex = new Error(body.message);
                    ex.stack = body.stack + '\n' + ex.stack;
                    return rj(ex);
                }
            };
            worker.postMessage({
                type: "cvr_setIrrRegistry",
                id: taskID,
                instanceID: this._cvr._instanceID,
                body: {
                    receiverObj: this._irrRegistryState
                }
            });
        });
    }
    ;
    /**
     * Retrieves the original image data.
     *
     * @returns A promise that resolves when the operation has successfully completed. It provides the original image upon resolution.
     */
    getOriginalImage() {
        return this._cvr._dsImage;
    }
    ;
}

const bSSR = "undefined" == typeof self;

const isWebWorker = "function" == typeof importScripts, curScriptDir = (() => {
    if (!isWebWorker) {
        if (!bSSR && document.currentScript) {
            let src = document.currentScript.src, idxSearch = src.indexOf("?");
            if (-1 != idxSearch) src = src.substring(0, idxSearch); else {
                let idxHash = src.indexOf("#");
                -1 != idxHash && (src = src.substring(0, idxHash));
            }
            return src.substring(0, src.lastIndexOf("/") + 1);
        }
        return "./";
    }
})(), getAbsoluteDir = value => {
    if (null == value && (value = "./"), bSSR || isWebWorker) ; else {
        let a = document.createElement("a");
        a.href = value, value = a.href;
    }
    return value.endsWith("/") || (value += "/"), value;
};

var _a;
CoreModule.engineResourcePaths.cvr = { version: "2.4.33", path: curScriptDir, isInternal: true };
workerAutoResources.cvr = { js: true, wasm: true, deps: ["license", "dip"] };
mapPackageRegister.cvr = {};
const stdVersion = "1.4.21";
if ('string' != typeof CoreModule.engineResourcePaths.std && compareVersion(CoreModule.engineResourcePaths.std.version, stdVersion) < 0) {
    CoreModule.engineResourcePaths.std = { version: stdVersion, path: getAbsoluteDir(curScriptDir + `../../dynamsoft-capture-vision-std@${stdVersion}/dist/`), isInternal: true };
}
const dipVersion = "2.4.31";
if (!CoreModule.engineResourcePaths.dip || 'string' != typeof CoreModule.engineResourcePaths.dip && compareVersion(CoreModule.engineResourcePaths.dip.version, dipVersion) < 0) {
    CoreModule.engineResourcePaths.dip = { version: dipVersion, path: getAbsoluteDir(curScriptDir + `../../dynamsoft-image-processing@${dipVersion}/dist/`), isInternal: true };
}
class CaptureVisionRouterModule {
    static getVersion() {
        return this._version;
    }
}
CaptureVisionRouterModule._version = `${"2.4.33"}(Worker: ${(_a = innerVersions.cvr) === null || _a === void 0 ? void 0 : _a.worker}, Wasm: loading...`;

const resultItemMapConfig = {
    "barcodeResultItems": {
        type: EnumCapturedResultItemType.CRIT_BARCODE,
        reveiver: "onDecodedBarcodesReceived",
        isNeedFilter: true
    },
    "textLineResultItems": {
        type: EnumCapturedResultItemType.CRIT_TEXT_LINE,
        reveiver: "onRecognizedTextLinesReceived",
        isNeedFilter: true
    },
    "detectedQuadResultItems": {
        type: EnumCapturedResultItemType.CRIT_DETECTED_QUAD,
        reveiver: "onDetectedQuadsReceived",
        isNeedFilter: false
    },
    "normalizedImageResultItems": {
        type: EnumCapturedResultItemType.CRIT_NORMALIZED_IMAGE,
        reveiver: "onNormalizedImagesReceived",
        isNeedFilter: false
    },
    "parsedResultItems": {
        type: EnumCapturedResultItemType.CRIT_PARSED_RESULT,
        reveiver: "onParsedResultsReceived",
        isNeedFilter: false
    }
};

var EnumImageSourceState;
(function (EnumImageSourceState) {
    EnumImageSourceState[EnumImageSourceState["ISS_BUFFER_EMPTY"] = 0] = "ISS_BUFFER_EMPTY";
    EnumImageSourceState[EnumImageSourceState["ISS_EXHAUSTED"] = 1] = "ISS_EXHAUSTED";
})(EnumImageSourceState || (EnumImageSourceState = {}));

function convertCoordinates(item, compressRate) {
    if (item && item.location) {
        const points = item.location.points;
        for (let point of points) {
            point.x = point.x / compressRate;
            point.y = point.y / compressRate;
        }
        convertCoordinates(item.referencedItem, compressRate);
    }
}
function checkIsDisposed(cvr) {
    if (cvr.disposed) {
        throw new Error(`"CaptureVisionRouter" instance has been disposed`);
    }
}

var _CaptureVisionRouter_isa, _CaptureVisionRouter_canvas, _CaptureVisionRouter_promiseStartScan, _CaptureVisionRouter_intermediateResultManager, _CaptureVisionRouter_bufferdItemsManager, _CaptureVisionRouter_resultReceiverSet, _CaptureVisionRouter_isaStateListenerSet, _CaptureVisionRouter_resultFilterSet, _CaptureVisionRouter_compressRate, _CaptureVisionRouter_isScanner, _CaptureVisionRouter_innerUseTag, _CaptureVisionRouter_isDestroyed;
const _intermediateResultReceiverOfFilter = {
    onTaskResultsReceived: () => { },
    isFilter: true
};
class CaptureVisionRouter {
    constructor() {
        this.maxImageSideLength = ["iPhone", "Android", "HarmonyOS"].includes(CoreModule.browserInfo.OS) ? 2048 : 4096;
        this._instanceID = undefined;
        this._dsImage = null;
        this._isPauseScan = true;
        this._isOutputOriginalImage = false;
        this._isOpenDetectVerify = false;
        this._isOpenNormalizeVerify = false;
        this._isOpenBarcodeVerify = false;
        this._isOpenLabelVerify = false;
        this._minImageCaptureInterval = 0;
        this._averageProcessintTimeArray = [];
        this._averageFetchImageTimeArray = [];
        this._currentSettings = null;
        this._averageTime = 999;
        _CaptureVisionRouter_isa.set(this, null);
        _CaptureVisionRouter_canvas.set(this, null);
        _CaptureVisionRouter_promiseStartScan.set(this, null);
        _CaptureVisionRouter_intermediateResultManager.set(this, null);
        _CaptureVisionRouter_bufferdItemsManager.set(this, null);
        _CaptureVisionRouter_resultReceiverSet.set(this, new Set());
        _CaptureVisionRouter_isaStateListenerSet.set(this, new Set());
        _CaptureVisionRouter_resultFilterSet.set(this, new Set());
        _CaptureVisionRouter_compressRate.set(this, 0);
        _CaptureVisionRouter_isScanner.set(this, false);
        _CaptureVisionRouter_innerUseTag.set(this, false);
        _CaptureVisionRouter_isDestroyed.set(this, false);
        this._singleFrameModeCallbackBind = this._singleFrameModeCallback.bind(this);
    }
    /**
     * Returns whether the `CaptureVisionRouter` instance has been disposed of.
     *
     * @returns Boolean indicating whether the `CaptureVisionRouter` instance has been disposed of.
     */
    get disposed() {
        return __classPrivateFieldGet(this, _CaptureVisionRouter_isDestroyed, "f");
    }
    /**
     * Initializes a new instance of the `CaptureVisionRouter` class.
     *
     * @returns A promise that resolves with the initialized `CaptureVisionRouter` instance.
     */
    static async createInstance() {
        if (!mapPackageRegister.license) {
            throw Error('Module `license` is not existed.');
        }
        await mapPackageRegister.license.dynamsoft();
        await loadWasm(["cvr"]);
        const captureVisionRouter = new CaptureVisionRouter();
        const p = new MutablePromise();
        let taskID = getNextTaskID();
        mapTaskCallBack[taskID] = async (body) => {
            var _a;
            if (body.success) {
                captureVisionRouter._instanceID = body.instanceID;
                captureVisionRouter._currentSettings = JSON.parse(JSON.parse(body.outputSettings).data);
                CaptureVisionRouterModule._version = `${"2.4.33"}(Worker: ${(_a = innerVersions.cvr) === null || _a === void 0 ? void 0 : _a.worker}, Wasm: ${body.version})`;
                __classPrivateFieldSet(captureVisionRouter, _CaptureVisionRouter_innerUseTag, true, "f");
                __classPrivateFieldSet(captureVisionRouter, _CaptureVisionRouter_intermediateResultManager, captureVisionRouter.getIntermediateResultManager(), "f");
                __classPrivateFieldSet(captureVisionRouter, _CaptureVisionRouter_innerUseTag, false, "f");
                p.resolve(captureVisionRouter);
            }
            else {
                const err = Error(body.message);
                if (body.stack) {
                    err.stack = body.stack;
                }
                p.reject(err);
            }
        };
        worker.postMessage({
            type: 'cvr_createInstance',
            id: taskID,
        });
        return p;
    }
    ;
    async _singleFrameModeCallback(dsImage) {
        for (let receiver of __classPrivateFieldGet(this, _CaptureVisionRouter_resultReceiverSet, "f")) {
            this._isOutputOriginalImage && receiver.onOriginalImageResultReceived && receiver.onOriginalImageResultReceived({ imageData: dsImage });
        }
        const copyDsImageData = {
            bytes: new Uint8Array(dsImage.bytes),
            width: dsImage.width,
            height: dsImage.height,
            stride: dsImage.stride,
            format: dsImage.format,
            tag: dsImage.tag
        };
        if (!this._templateName)
            this._templateName = this._currentSettings.CaptureVisionTemplates[0].Name;
        const result = await this.capture(copyDsImageData, this._templateName);
        result.originalImageTag = dsImage.tag;
        const resultCommonPart = {
            originalImageHashId: result.originalImageHashId,
            originalImageTag: result.originalImageTag,
            errorCode: result.errorCode,
            errorString: result.errorString
        };
        for (let receiver of __classPrivateFieldGet(this, _CaptureVisionRouter_resultReceiverSet, "f")) {
            if (receiver.isDce) {
                receiver.onCapturedResultReceived(result, {
                    isDetectVerifyOpen: false,
                    isNormalizeVerifyOpen: false,
                    isBarcodeVerifyOpen: false,
                    isLabelVerifyOpen: false,
                });
                continue;
            }
            for (let resultItem in resultItemMapConfig) {
                const _itemType = resultItem;
                const _itemConfig = resultItemMapConfig[_itemType];
                receiver[_itemConfig.reveiver] && result[_itemType] && receiver[_itemConfig.reveiver](Object.assign(Object.assign({}, resultCommonPart), { [_itemType]: result[_itemType] }));
            }
            receiver.onCapturedResultReceived && receiver.onCapturedResultReceived(result);
        }
    }
    /**
     * Sets up an image source to provide images for continuous processing.
     * @param imageSource The image source which is compliant with the `ImageSourceAdapter` interface.
     */
    setInput(imageSource) {
        checkIsDisposed(this);
        if (!imageSource) {
            __classPrivateFieldSet(this, _CaptureVisionRouter_isa, null, "f");
            return;
        }
        __classPrivateFieldSet(this, _CaptureVisionRouter_isa, imageSource, "f");
        if (imageSource.isCameraEnhancer) {
            if (__classPrivateFieldGet(this, _CaptureVisionRouter_intermediateResultManager, "f")) {
                __classPrivateFieldGet(this, _CaptureVisionRouter_isa, "f")._intermediateResultReceiver.isDce = true;
                __classPrivateFieldGet(this, _CaptureVisionRouter_intermediateResultManager, "f").addResultReceiver(__classPrivateFieldGet(this, _CaptureVisionRouter_isa, "f")._intermediateResultReceiver);
            }
            const cameraView = __classPrivateFieldGet(this, _CaptureVisionRouter_isa, "f").getCameraView();
            if (cameraView) {
                const dceCrr = cameraView._capturedResultReceiver;
                dceCrr.isDce = true;
                __classPrivateFieldGet(this, _CaptureVisionRouter_resultReceiverSet, "f").add(dceCrr);
            }
            // TODO: think about off.
            //(imageSource as any).on("singleFrameAcquired", this._singleFrameModeCallback);
        }
    }
    ;
    /**
     * Returns the image source object.
     */
    getInput() {
        return __classPrivateFieldGet(this, _CaptureVisionRouter_isa, "f");
    }
    ;
    /**
     * Adds or removes listeners for image source state change.
     */
    addImageSourceStateListener(listener) {
        checkIsDisposed(this);
        if (typeof listener !== "object")
            return console.warn(`Invalid ISA state listener.`);
        if (!listener || !Object.keys(listener))
            return;
        __classPrivateFieldGet(this, _CaptureVisionRouter_isaStateListenerSet, "f").add(listener);
    }
    ;
    removeImageSourceStateListener(listener) {
        checkIsDisposed(this);
        return __classPrivateFieldGet(this, _CaptureVisionRouter_isaStateListenerSet, "f").delete(listener);
    }
    /**
     * Adds a `CapturedResultReceiver` object as the receiver of captured results.
     * @param receiver The receiver object, of type `CapturedResultReceiver`.
     */
    addResultReceiver(receiver) {
        checkIsDisposed(this);
        if (typeof receiver !== "object")
            throw new Error(`Invalid receiver.`);
        if (!receiver || !Object.keys(receiver).length)
            return;
        __classPrivateFieldGet(this, _CaptureVisionRouter_resultReceiverSet, "f").add(receiver);
        this._setCrrRegistry();
    }
    ;
    /**
     * Removes the specified `CapturedResultReceiver` object.
     * @param receiver The receiver object, of type `CapturedResultReceiver`.
     */
    removeResultReceiver(receiver) {
        checkIsDisposed(this);
        __classPrivateFieldGet(this, _CaptureVisionRouter_resultReceiverSet, "f").delete(receiver);
        this._setCrrRegistry();
    }
    async _setCrrRegistry() {
        const receiver = {
            onCapturedResultReceived: false,
            onDecodedBarcodesReceived: false,
            onRecognizedTextLinesReceived: false,
            onDetectedQuadsReceived: false,
            onNormalizedImagesReceived: false,
            onParsedResultsReceived: false
        };
        for (let r of __classPrivateFieldGet(this, _CaptureVisionRouter_resultReceiverSet, "f")) {
            if (r.isDce)
                continue;
            receiver.onCapturedResultReceived = !!r["onCapturedResultReceived"];
            receiver.onDecodedBarcodesReceived = !!r["onDecodedBarcodesReceived"];
            receiver.onRecognizedTextLinesReceived = !!r["onRecognizedTextLinesReceived"];
            receiver.onDetectedQuadsReceived = !!r["onDetectedQuadsReceived"];
            receiver.onNormalizedImagesReceived = !!r["onNormalizedImagesReceived"];
            receiver.onParsedResultsReceived = !!r["onParsedResultsReceived"];
        }
        const p = new MutablePromise();
        let taskID = getNextTaskID();
        mapTaskCallBack[taskID] = async (body) => {
            if (body.success) {
                p.resolve();
            }
            else {
                let ex = new Error(body.message);
                ex.stack = body.stack + '\n' + ex.stack;
                p.reject();
            }
        };
        worker.postMessage({
            type: "cvr_setCrrRegistry",
            id: taskID,
            instanceID: this._instanceID,
            body: {
                receiver: JSON.stringify(receiver)
            }
        });
        return p;
    }
    /**
     * Adds a `MultiFrameResultCrossFilter` object to filter non-essential results.
     * @param filter The filter object, of type `MultiFrameResultCrossFilter`.
     *
     * @returns A promise that resolves when the operation has successfully completed. It does not provide any value upon resolution.
     */
    async addResultFilter(filter) {
        checkIsDisposed(this);
        if (!filter || typeof filter !== "object" || !Object.keys(filter).length) {
            return console.warn(`Invalid filter.`);
        }
        __classPrivateFieldGet(this, _CaptureVisionRouter_resultFilterSet, "f").add(filter);
        // When cvr.addResultFilter is called, this method will automatically be invoked to batch update the filter statuses that were set before calling addResultFilter.
        filter._dynamsoft();
        await this._handleFilterUpdate();
    }
    ;
    /**
     * Removes the specified `MultiFrameResultCrossFilter` object.
     * @param filter The filter object, of type `MultiFrameResultCrossFilter`.
     *
     * @returns A promise that resolves when the operation has successfully completed. It does not provide any value upon resolution.
     */
    async removeResultFilter(filter) {
        checkIsDisposed(this);
        __classPrivateFieldGet(this, _CaptureVisionRouter_resultFilterSet, "f").delete(filter);
        await this._handleFilterUpdate();
    }
    async _handleFilterUpdate() {
        /**
         * Each time a "filter" is added or removed, the "filter set" will be re-traversed,
         * and _intermediateResultReceiverOfFilter will be added when necessary.
         * This ensures that _intermediateResultReceiverOfFilter is not left in the "filter set" when the "filter set" is empty or when no filter in the "filter set" has isLatestOverlappingEnabled set to true.
         */
        __classPrivateFieldGet(this, _CaptureVisionRouter_intermediateResultManager, "f").removeResultReceiver(_intermediateResultReceiverOfFilter);
        if (__classPrivateFieldGet(this, _CaptureVisionRouter_resultFilterSet, "f").size === 0) {
            this._isOpenBarcodeVerify = false;
            this._isOpenLabelVerify = false;
            this._isOpenDetectVerify = false;
            this._isOpenNormalizeVerify = false;
            const _verificationEnabled = {
                [EnumCapturedResultItemType.CRIT_BARCODE]: false,
                [EnumCapturedResultItemType.CRIT_TEXT_LINE]: false,
                [EnumCapturedResultItemType.CRIT_DETECTED_QUAD]: false,
                [EnumCapturedResultItemType.CRIT_NORMALIZED_IMAGE]: false
            };
            const _duplicateFilterEnabled = {
                [EnumCapturedResultItemType.CRIT_BARCODE]: false,
                [EnumCapturedResultItemType.CRIT_TEXT_LINE]: false,
                [EnumCapturedResultItemType.CRIT_DETECTED_QUAD]: false,
                [EnumCapturedResultItemType.CRIT_NORMALIZED_IMAGE]: false
            };
            await _enableResultCrossVerification(this, _verificationEnabled);
            await _enableResultDeduplication(this, _duplicateFilterEnabled);
            return;
        }
        for (let filter of __classPrivateFieldGet(this, _CaptureVisionRouter_resultFilterSet, "f")) {
            this._isOpenBarcodeVerify = filter.isResultCrossVerificationEnabled(EnumCapturedResultItemType.CRIT_BARCODE);
            this._isOpenLabelVerify = filter.isResultCrossVerificationEnabled(EnumCapturedResultItemType.CRIT_TEXT_LINE);
            this._isOpenDetectVerify = filter.isResultCrossVerificationEnabled(EnumCapturedResultItemType.CRIT_DETECTED_QUAD);
            this._isOpenNormalizeVerify = filter.isResultCrossVerificationEnabled(EnumCapturedResultItemType.CRIT_NORMALIZED_IMAGE);
            if (filter.isLatestOverlappingEnabled(EnumCapturedResultItemType.CRIT_BARCODE)) {
                const _isExist = [...__classPrivateFieldGet(this, _CaptureVisionRouter_intermediateResultManager, "f")._intermediateResultReceiverSet.values()].find((receiver) => { return receiver.isFilter; });
                if (!_isExist) {
                    __classPrivateFieldGet(this, _CaptureVisionRouter_intermediateResultManager, "f").addResultReceiver(_intermediateResultReceiverOfFilter);
                }
            }
            await _enableResultCrossVerification(this, filter.verificationEnabled);
            await _enableResultDeduplication(this, filter.duplicateFilterEnabled);
            await _setDuplicateForgetTime(this, filter.duplicateForgetTime);
        }
    }
    /**
     * Initiates a capturing process based on a specified template. This process is repeated for each image fetched from the source.
     * @param templateName [Optional] Specifies a "CaptureVisionTemplate" to use.
     *
     * @returns A promise that resolves when the capturing process has successfully started. It does not provide any value upon resolution.
     */
    async startCapturing(templateName) {
        var _a, _b;
        checkIsDisposed(this);
        if (!this._isPauseScan)
            return;
        if (!__classPrivateFieldGet(this, _CaptureVisionRouter_isa, "f"))
            throw new Error(`'ImageSourceAdapter' is not set. call 'setInput' before 'startCapturing'`);
        if (!templateName)
            templateName = CaptureVisionRouter._defaultTemplate;
        const tasks = await this.containsTask(templateName);
        await loadWasm(tasks);
        /*
         * Why do we need to re-add an existing "filter" when calling "startCapturing"?
         * Because there may be a situation where the corresponding wasm module has not been loaded when adding "filter",
         * so after checking the required wasm module in "startCapturing", we will add "filter" again to ensure that "filter" takes effect in wasm.
         *
         * Why not check for the required wasm when adding the "filter"?
         * Because each result type has a default value, we cannot know which wasm modules are actually needed through the passed "filter"
         *
         * This part of the logic has room for optimization. will do.
         **/
        for (let filter of __classPrivateFieldGet(this, _CaptureVisionRouter_resultFilterSet, "f")) {
            await this.addResultFilter(filter);
        }
        if (tasks.includes("dlr") && !((_a = mapPackageRegister.dlr) === null || _a === void 0 ? void 0 : _a.bLoadConfusableCharsData)) {
            const _engineResourcePaths = handleEngineResourcePaths(CoreModule.engineResourcePaths);
            await ((_b = mapPackageRegister.dlr) === null || _b === void 0 ? void 0 : _b.loadRecognitionData("ConfusableChars", _engineResourcePaths.dlr));
        }
        if (__classPrivateFieldGet(this, _CaptureVisionRouter_isa, "f").isCameraEnhancer) {
            if (tasks.includes("ddn")) {
                __classPrivateFieldGet(this, _CaptureVisionRouter_isa, "f").setPixelFormat(EnumImagePixelFormat.IPF_ABGR_8888);
            }
            else {
                __classPrivateFieldGet(this, _CaptureVisionRouter_isa, "f").setPixelFormat(EnumImagePixelFormat.IPF_GRAYSCALED);
            }
        }
        if (__classPrivateFieldGet(this, _CaptureVisionRouter_isa, "f").singleFrameMode !== undefined && __classPrivateFieldGet(this, _CaptureVisionRouter_isa, "f").singleFrameMode !== "disabled") {
            this._templateName = templateName;
            __classPrivateFieldGet(this, _CaptureVisionRouter_isa, "f").on("singleFrameAcquired", this._singleFrameModeCallbackBind);
            return;
        }
        const colourChannelUsageType = __classPrivateFieldGet(this, _CaptureVisionRouter_isa, "f").getColourChannelUsageType();
        if (colourChannelUsageType === EnumColourChannelUsageType.CCUT_AUTO) {
            __classPrivateFieldGet(this, _CaptureVisionRouter_isa, "f").setColourChannelUsageType(tasks.includes("ddn") ?
                EnumColourChannelUsageType.CCUT_FULL_CHANNEL
                :
                    EnumColourChannelUsageType.CCUT_Y_CHANNEL_ONLY);
        }
        if (__classPrivateFieldGet(this, _CaptureVisionRouter_promiseStartScan, "f") && __classPrivateFieldGet(this, _CaptureVisionRouter_promiseStartScan, "f").isPending)
            return __classPrivateFieldGet(this, _CaptureVisionRouter_promiseStartScan, "f");
        __classPrivateFieldSet(this, _CaptureVisionRouter_promiseStartScan, new MutablePromise((rs, rj) => {
            if (this.disposed)
                return;
            let taskID = getNextTaskID();
            mapTaskCallBack[taskID] = async (body) => {
                if (!__classPrivateFieldGet(this, _CaptureVisionRouter_promiseStartScan, "f") || __classPrivateFieldGet(this, _CaptureVisionRouter_promiseStartScan, "f").isFulfilled)
                    return;
                if (body.success) {
                    this._isPauseScan = false;
                    this._isOutputOriginalImage = body.isOutputOriginalImage;
                    this._loopReadVideoTimeoutId && clearTimeout(this._loopReadVideoTimeoutId);
                    this._loopReadVideoTimeoutId = setTimeout(async () => {
                        if (this._minImageCaptureInterval !== -1) {
                            __classPrivateFieldGet(this, _CaptureVisionRouter_isa, "f").startFetching();
                        }
                        this._loopReadVideo(templateName);
                        // try {
                        //   await this._loopReadVideo(templateName);
                        // } catch (ex) {
                        //   rj(ex);
                        // }
                        rs();
                    }, 0);
                }
                else {
                    let ex = new Error(body.message);
                    ex.stack = body.stack + '\n' + ex.stack;
                    return rj(ex);
                }
            };
            worker.postMessage({
                type: "cvr_startCapturing",
                id: taskID,
                instanceID: this._instanceID,
                body: { templateName }
            });
        }), "f");
        return await __classPrivateFieldGet(this, _CaptureVisionRouter_promiseStartScan, "f");
    }
    /**
     * Stops the capturing process.
     */
    stopCapturing() {
        checkIsDisposed(this);
        if (!__classPrivateFieldGet(this, _CaptureVisionRouter_isa, "f"))
            return;
        if (__classPrivateFieldGet(this, _CaptureVisionRouter_isa, "f").isCameraEnhancer) {
            if (__classPrivateFieldGet(this, _CaptureVisionRouter_isa, "f").singleFrameMode !== undefined && __classPrivateFieldGet(this, _CaptureVisionRouter_isa, "f").singleFrameMode !== "disabled") {
                __classPrivateFieldGet(this, _CaptureVisionRouter_isa, "f").off("singleFrameAcquired", this._singleFrameModeCallbackBind);
                return;
            }
        }
        _clearVerifyList(this);
        __classPrivateFieldGet(this, _CaptureVisionRouter_isa, "f").stopFetching();
        this._averageProcessintTimeArray = [];
        this._averageTime = 999;
        this._isPauseScan = true;
        __classPrivateFieldSet(this, _CaptureVisionRouter_promiseStartScan, null, "f");
        __classPrivateFieldGet(this, _CaptureVisionRouter_isa, "f").setColourChannelUsageType(EnumColourChannelUsageType.CCUT_AUTO);
    }
    async containsTask(templateName) {
        checkIsDisposed(this);
        return await new Promise((rs, rj) => {
            let taskID = getNextTaskID();
            mapTaskCallBack[taskID] = async (body) => {
                if (body.success) {
                    return rs(JSON.parse(body.tasks));
                }
                else {
                    let ex = new Error(body.message);
                    ex.stack = body.stack + '\n' + ex.stack;
                    return rj(ex);
                }
            };
            worker.postMessage({
                type: "cvr_containsTask",
                id: taskID,
                instanceID: this._instanceID,
                body: {
                    templateName
                }
            });
        });
    }
    /**
     * Video stream capture, recursive call, loop frame capture
     */
    async _loopReadVideo(templateName) {
        if ((this.disposed || this._isPauseScan)) {
            return;
        }
        __classPrivateFieldSet(this, _CaptureVisionRouter_isScanner, true, "f");
        if (__classPrivateFieldGet(this, _CaptureVisionRouter_isa, "f").isBufferEmpty()) {
            if (__classPrivateFieldGet(this, _CaptureVisionRouter_isa, "f").hasNextImageToFetch()) {
                for (let listener of __classPrivateFieldGet(this, _CaptureVisionRouter_isaStateListenerSet, "f")) {
                    listener.onImageSourceStateReceived && listener.onImageSourceStateReceived(EnumImageSourceState.ISS_BUFFER_EMPTY);
                }
            }
            else if (!(__classPrivateFieldGet(this, _CaptureVisionRouter_isa, "f").hasNextImageToFetch())) {
                for (let listener of __classPrivateFieldGet(this, _CaptureVisionRouter_isaStateListenerSet, "f")) {
                    listener.onImageSourceStateReceived && listener.onImageSourceStateReceived(EnumImageSourceState.ISS_EXHAUSTED);
                }
            }
        }
        if (this._minImageCaptureInterval === -1 || __classPrivateFieldGet(this, _CaptureVisionRouter_isa, "f").isBufferEmpty()) {
            try {
                if (__classPrivateFieldGet(this, _CaptureVisionRouter_isa, "f").isBufferEmpty() && CaptureVisionRouter._onLog)
                    CaptureVisionRouter._onLog(`buffer is empty so fetch image`);
                if (CaptureVisionRouter._onLog) {
                    CaptureVisionRouter._onLog(`DCE: start fetching a frame: ${Date.now()}`);
                }
                this._dsImage = __classPrivateFieldGet(this, _CaptureVisionRouter_isa, "f").fetchImage();
                if (CaptureVisionRouter._onLog) {
                    CaptureVisionRouter._onLog(`DCE: finish fetching a frame: ${Date.now()}`);
                }
                __classPrivateFieldGet(this, _CaptureVisionRouter_isa, "f").setImageFetchInterval(this._averageTime);
            }
            catch (e) {
                this._reRunCurrnetFunc(templateName);
                return;
            }
        }
        else {
            __classPrivateFieldGet(this, _CaptureVisionRouter_isa, "f").setImageFetchInterval(this._averageTime - (this._dsImage && this._dsImage.tag ? this._dsImage.tag.timeSpent : 0));
            this._dsImage = __classPrivateFieldGet(this, _CaptureVisionRouter_isa, "f").getImage();
            if (this._dsImage.tag) {
                if (Date.now() - this._dsImage.tag.timeStamp > 200) {
                    this._reRunCurrnetFunc(templateName);
                    return;
                }
            }
        }
        if (!this._dsImage) {
            this._reRunCurrnetFunc(templateName);
            return;
        }
        for (let receiver of __classPrivateFieldGet(this, _CaptureVisionRouter_resultReceiverSet, "f")) {
            this._isOutputOriginalImage && receiver.onOriginalImageResultReceived && receiver.onOriginalImageResultReceived({ imageData: this._dsImage });
        }
        // capture
        // try {
        //   const captureStartTime = Date.now();
        //   const result = await this._captureDsimage(this._dsImage, templateName);
        //   if (CaptureVisionRouter._onLog) CaptureVisionRouter._onLog(`no js handle time: ${Date.now() - captureStartTime}`);
        //   if (this._isPauseScan) {
        //     this._reRunCurrnetFunc(templateName);
        //     return;
        //   }
        //   (result as any).originalImageTag = this._dsImage.tag ? this._dsImage.tag : null;
        //   const resultCommonPart = {
        //     originalImageHashId: result.originalImageHashId,
        //     originalImageTag: result.originalImageTag,
        //     errorCode: result.errorCode,
        //     errorString: result.errorString
        //   }
        //   for (let receiver of this.#resultReceiverSet) {
        //     if ((receiver as any).isDce) {
        //       const drawTime = Date.now();
        //       (receiver as any).onCapturedResultReceived(result, {
        //         isDetectVerifyOpen: this._isOpenDetectVerify,
        //         isNormalizeVerifyOpen: this._isOpenNormalizeVerify,
        //         isBarcodeVerifyOpen: this._isOpenBarcodeVerify,
        //         isLabelVerifyOpen: this._isOpenLabelVerify,
        //       });
        //       if (CaptureVisionRouter._onLog) {
        //         const time = Date.now() - drawTime;
        //         if (time > 10) CaptureVisionRouter._onLog(`draw result time: ${time}`)
        //       };
        //     }
        //     receiver.onDecodedBarcodesReceived && result.barcodeResultItems && receiver.onDecodedBarcodesReceived({
        //       ...resultCommonPart,
        //       barcodeResultItems: result.barcodeResultItems.filter((item: any) => { return !item.isFilter })
        //     } as DecodedBarcodesResult);
        //     receiver.onRecognizedTextLinesReceived && result.textLineResultItems && receiver.onRecognizedTextLinesReceived({
        //       ...resultCommonPart,
        //       textLineResultItems: result.textLineResultItems.filter((item: any) => { return !item.isFilter })
        //     } as RecognizedTextLinesResult);
        //     receiver.onDetectedQuadsReceived && result.detectedQuadResultItems && receiver.onDetectedQuadsReceived({
        //       ...resultCommonPart,
        //       detectedQuadResultItems: result.detectedQuadResultItems.filter((item: any) => { return !item.isFilter })
        //     } as DetectedQuadsResult);
        //     receiver.onNormalizedImagesReceived && result.normalizedImageResultItems && receiver.onNormalizedImagesReceived({
        //       ...resultCommonPart,
        //       normalizedImageResultItems: result.normalizedImageResultItems.filter((item: any) => { return !item.isFilter })
        //     } as NormalizedImagesResult);
        //     receiver.onParsedResultsReceived && result.parsedResultItems && receiver.onParsedResultsReceived({
        //       ...resultCommonPart,
        //       parsedResultItems: result.parsedResultItems.filter((item: any) => { return !item.isFilter })
        //     } as ParsedResult);
        //     if (receiver.onCapturedResultReceived && !(receiver as any).isDce) {
        //       (result as any).items = result.items.filter((item: any) => { return !item.isFilter });
        //       if ((result as any).barcodeResultItems) (result as any).barcodeResultItems = result.barcodeResultItems.filter((item: any) => { return !item.isFilter });
        //       if ((result as any).textLineResultItems) (result as any).textLineResultItems = result.textLineResultItems.filter((item: any) => { return !item.isFilter });
        //       if ((result as any).detectedQuadResultItems) (result as any).detectedQuadResultItems = result.detectedQuadResultItems.filter((item: any) => { return !item.isFilter });
        //       if ((result as any).normalizedImageResultItems) (result as any).normalizedImageResultItems = result.normalizedImageResultItems.filter((item: any) => { return !item.isFilter });
        //       if ((result as any).parsedResultItems) (result as any).parsedResultItems = result.parsedResultItems.filter((item: any) => { return !item.isFilter });
        //       receiver.onCapturedResultReceived(result);
        //     }
        //   }
        //   const fetchImageCalculateStartTime = Date.now();
        //   if (this._minImageCaptureInterval > -1) {
        //     if (this._averageProcessintTimeArray.length === 5) this._averageProcessintTimeArray.shift();
        //     if (this._averageFetchImageTimeArray.length === 5) this._averageFetchImageTimeArray.shift();
        //     this._averageProcessintTimeArray.push(Date.now() - captureStartTime);
        //     //this._averageTime = this._averageProcessintTimeArray.reduce((time, value) => time + value, 0) / this._averageProcessintTimeArray.length;
        //     this._averageFetchImageTimeArray.push((this._dsImage && this._dsImage.tag ? (this._dsImage.tag as any).timeSpent : 0));
        //     this._averageTime = Math.min(...this._averageProcessintTimeArray) - Math.max(...this._averageFetchImageTimeArray);
        //     this._averageTime = this._averageTime > 0 ? this._averageTime : 0;
        //     if (CaptureVisionRouter._onLog) {
        //       CaptureVisionRouter._onLog(`minImageCaptureInterval: ${this._minImageCaptureInterval}`);
        //       CaptureVisionRouter._onLog(`averageProcessintTimeArray: ${this._averageProcessintTimeArray}`);
        //       CaptureVisionRouter._onLog(`averageFetchImageTimeArray: ${this._averageFetchImageTimeArray}`);
        //       CaptureVisionRouter._onLog(`averageTime: ${this._averageTime}`);
        //     };
        //   }
        //   if (CaptureVisionRouter._onLog) {
        //     const time = Date.now() - fetchImageCalculateStartTime;
        //     if (time > 10) CaptureVisionRouter._onLog(`fetch image calculate time: ${time}`)
        //   };
        //   if (CaptureVisionRouter._onLog) CaptureVisionRouter._onLog(`time finish decode: ${Date.now()}`)
        //   if (CaptureVisionRouter._onLog) CaptureVisionRouter._onLog(`main time: ${Date.now() - captureStartTime}`);
        //   if (CaptureVisionRouter._onLog) CaptureVisionRouter._onLog("====================================================");
        //   this._loopReadVideoTimeoutId && clearTimeout(this._loopReadVideoTimeoutId);
        //   if (this._minImageCaptureInterval > 0 && this._minImageCaptureInterval >= this._averageTime) {
        //     this._loopReadVideoTimeoutId = setTimeout(() => {
        //       this._loopReadVideo(templateName);
        //     }, this._minImageCaptureInterval - this._averageTime);
        //   } else {
        //     this._loopReadVideoTimeoutId = setTimeout(() => {
        //       this._loopReadVideo(templateName);
        //     }, Math.max(this._minImageCaptureInterval, 0));
        //   }
        // } catch (ex) {
        //   this.#isa.stopFetching();
        //   this._loopReadVideoTimeoutId && clearTimeout(this._loopReadVideoTimeoutId);
        //   this._loopReadVideoTimeoutId = setTimeout(() => {
        //     this.#isa.startFetching();
        //     this._loopReadVideo(templateName);
        //   }, Math.max(this._minImageCaptureInterval, 1000));
        //   if (!(ex.message === 'platform error')) {
        //     throw ex;
        //   }
        // }
        const captureStartTime = Date.now();
        this._captureDsimage(this._dsImage, templateName).then(async (result) => {
            if (CaptureVisionRouter._onLog)
                CaptureVisionRouter._onLog(`no js handle time: ${Date.now() - captureStartTime}`);
            if (this._isPauseScan) {
                this._reRunCurrnetFunc(templateName);
                return;
            }
            result.originalImageTag = this._dsImage.tag ? this._dsImage.tag : null;
            const resultCommonPart = {
                originalImageHashId: result.originalImageHashId,
                originalImageTag: result.originalImageTag,
                errorCode: result.errorCode,
                errorString: result.errorString
            };
            for (let receiver of __classPrivateFieldGet(this, _CaptureVisionRouter_resultReceiverSet, "f")) {
                if (receiver.isDce) {
                    const drawTime = Date.now();
                    receiver.onCapturedResultReceived(result, {
                        isDetectVerifyOpen: this._isOpenDetectVerify,
                        isNormalizeVerifyOpen: this._isOpenNormalizeVerify,
                        isBarcodeVerifyOpen: this._isOpenBarcodeVerify,
                        isLabelVerifyOpen: this._isOpenLabelVerify,
                    });
                    if (CaptureVisionRouter._onLog) {
                        const time = Date.now() - drawTime;
                        if (time > 10)
                            CaptureVisionRouter._onLog(`draw result time: ${time}`);
                    }
                    continue;
                }
                for (let resultItem in resultItemMapConfig) {
                    const _itemType = resultItem;
                    const _itemConfig = resultItemMapConfig[_itemType];
                    receiver[_itemConfig.reveiver];
                    receiver[_itemConfig.reveiver] && result[_itemType] && receiver[_itemConfig.reveiver](Object.assign(Object.assign({}, resultCommonPart), { [_itemType]: result[_itemType].filter((item) => {
                            return !_itemConfig.isNeedFilter || !item.isFilter;
                        }) }));
                    if (result[_itemType])
                        result[_itemType] = result[_itemType].filter((item) => {
                            return !_itemConfig.isNeedFilter || !item.isFilter;
                        });
                }
                if (receiver.onCapturedResultReceived) {
                    result.items = result.items.filter((item) => {
                        return [EnumCapturedResultItemType.CRIT_DETECTED_QUAD, EnumCapturedResultItemType.CRIT_NORMALIZED_IMAGE].includes(item.type) || !item.isFilter;
                    });
                    receiver.onCapturedResultReceived(result);
                }
            }
            const fetchImageCalculateStartTime = Date.now();
            if (this._minImageCaptureInterval > -1) {
                if (this._averageProcessintTimeArray.length === 5)
                    this._averageProcessintTimeArray.shift();
                if (this._averageFetchImageTimeArray.length === 5)
                    this._averageFetchImageTimeArray.shift();
                this._averageProcessintTimeArray.push(Date.now() - captureStartTime);
                //this._averageTime = this._averageProcessintTimeArray.reduce((time, value) => time + value, 0) / this._averageProcessintTimeArray.length;
                this._averageFetchImageTimeArray.push((this._dsImage && this._dsImage.tag ? this._dsImage.tag.timeSpent : 0));
                this._averageTime = Math.min(...this._averageProcessintTimeArray) - Math.max(...this._averageFetchImageTimeArray);
                this._averageTime = this._averageTime > 0 ? this._averageTime : 0;
                if (CaptureVisionRouter._onLog) {
                    CaptureVisionRouter._onLog(`minImageCaptureInterval: ${this._minImageCaptureInterval}`);
                    CaptureVisionRouter._onLog(`averageProcessintTimeArray: ${this._averageProcessintTimeArray}`);
                    CaptureVisionRouter._onLog(`averageFetchImageTimeArray: ${this._averageFetchImageTimeArray}`);
                    CaptureVisionRouter._onLog(`averageTime: ${this._averageTime}`);
                }
            }
            if (CaptureVisionRouter._onLog) {
                const time = Date.now() - fetchImageCalculateStartTime;
                if (time > 10)
                    CaptureVisionRouter._onLog(`fetch image calculate time: ${time}`);
            }
            if (CaptureVisionRouter._onLog)
                CaptureVisionRouter._onLog(`time finish decode: ${Date.now()}`);
            if (CaptureVisionRouter._onLog)
                CaptureVisionRouter._onLog(`main time: ${Date.now() - captureStartTime}`);
            if (CaptureVisionRouter._onLog)
                CaptureVisionRouter._onLog("====================================================");
            this._loopReadVideoTimeoutId && clearTimeout(this._loopReadVideoTimeoutId);
            if (this._minImageCaptureInterval > 0 && this._minImageCaptureInterval >= this._averageTime) {
                this._loopReadVideoTimeoutId = setTimeout(() => {
                    this._loopReadVideo(templateName);
                }, this._minImageCaptureInterval - this._averageTime);
            }
            else {
                this._loopReadVideoTimeoutId = setTimeout(() => {
                    this._loopReadVideo(templateName);
                }, Math.max(this._minImageCaptureInterval, 0));
            }
        }).catch((ex) => {
            __classPrivateFieldGet(this, _CaptureVisionRouter_isa, "f").stopFetching();
            if (ex.errorCode && ex.errorCode === 0) {
                this._loopReadVideoTimeoutId && clearTimeout(this._loopReadVideoTimeoutId);
                this._loopReadVideoTimeoutId = setTimeout(() => {
                    __classPrivateFieldGet(this, _CaptureVisionRouter_isa, "f").startFetching();
                    this._loopReadVideo(templateName);
                }, Math.max(this._minImageCaptureInterval, 1000));
            }
            if (!(ex.message === 'platform error')) {
                setTimeout(() => { throw ex; }, 0);
            }
        });
    }
    _reRunCurrnetFunc(templateName) {
        this._loopReadVideoTimeoutId && clearTimeout(this._loopReadVideoTimeoutId);
        this._loopReadVideoTimeoutId = setTimeout(() => {
            this._loopReadVideo(templateName);
        }, 0);
    }
    /**
     * Processes a single image or a file containing a single image to derive important information.
     * @param imageOrFile Specifies the image or file to be processed. The following data types are accepted: `Blob`, `HTMLImageElement`, `HTMLCanvasElement`, `HTMLVideoElement`, `DSImageData`, `string`.
     * @param templateName [Optional] Specifies a "CaptureVisionTemplate" to use.
     *
     * @returns A promise that resolves with a `CapturedResult` object which contains the derived information from the image processed.
     */
    async capture(imageOrFile, templateName) {
        var _a, _b;
        checkIsDisposed(this);
        if (!templateName)
            templateName = CaptureVisionRouter._defaultTemplate;
        const tasks = await this.containsTask(templateName);
        await loadWasm(tasks);
        if (tasks.includes("dlr") && !((_a = mapPackageRegister.dlr) === null || _a === void 0 ? void 0 : _a.bLoadConfusableCharsData)) {
            const _engineResourcePaths = handleEngineResourcePaths(CoreModule.engineResourcePaths);
            await ((_b = mapPackageRegister.dlr) === null || _b === void 0 ? void 0 : _b.loadRecognitionData("ConfusableChars", _engineResourcePaths.dlr));
        }
        let result;
        __classPrivateFieldSet(this, _CaptureVisionRouter_isScanner, false, "f");
        if (isDSImageData(imageOrFile)) {
            result = await this._captureDsimage(imageOrFile, templateName);
        }
        else if (typeof imageOrFile === "string") {
            if (imageOrFile.substring(0, 11) == "data:image/") {
                result = await this._captureBase64(imageOrFile, templateName);
            }
            else {
                result = await this._captureUrl(imageOrFile, templateName);
            }
        }
        else if (imageOrFile instanceof Blob) {
            result = await this._captureBlob(imageOrFile, templateName);
        }
        else if (imageOrFile instanceof HTMLImageElement) {
            result = await this._captureImage(imageOrFile, templateName);
        }
        else if (imageOrFile instanceof HTMLCanvasElement) {
            result = await this._captureCanvas(imageOrFile, templateName);
        }
        else if (imageOrFile instanceof HTMLVideoElement) {
            result = await this._captureVideo(imageOrFile, templateName);
        }
        else {
            throw new TypeError("'capture(imageOrFile, templateName)': Type of 'imageOrFile' should be 'DSImageData', 'Url', 'Base64', 'Blob', 'HTMLImageElement', 'HTMLCanvasElement', 'HTMLVideoElement'.");
        }
        return result;
    }
    ;
    async _captureDsimage(imageOrFile, templateName) {
        return await this._captureInWorker(imageOrFile, templateName);
    }
    async _captureUrl(imageOrFile, templateName) {
        let blob = await requestResource(imageOrFile, "blob");
        return await this._captureBlob(blob, templateName);
    }
    async _captureBase64(base64Str, templateName) {
        base64Str = base64Str.substring(base64Str.indexOf(',') + 1);
        let binaryStr = atob(base64Str);
        let n = binaryStr.length;
        let u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = binaryStr.charCodeAt(n);
        }
        return await this._captureBlob(new Blob([u8arr]), templateName);
    }
    async _captureBlob(imageOrFile, templateName) {
        const useObjurlToDrawBlobToImg = async function (blob) {
            return await new Promise((rs, rj) => {
                let objUrl = URL.createObjectURL(blob);
                let image = new Image();
                image.src = objUrl;
                image.onload = () => {
                    URL.revokeObjectURL(image.dbrObjUrl); // relese memory
                    rs(image);
                };
                image.onerror = ev => {
                    rj(new Error("Can't convert blob to image : " + (ev instanceof Event ? ev.type : ev)));
                };
            });
        };
        let imageBitmap = null;
        let img = null;
        if (typeof createImageBitmap !== "undefined") {
            try {
                imageBitmap = await createImageBitmap(imageOrFile);
            }
            catch (ex) {
                // createImageBitmap maybe fail in a lot of sense
                // although objurl can pass
            }
        }
        if (!imageBitmap) {
            img = await useObjurlToDrawBlobToImg(imageOrFile);
        }
        let results = await this._captureImage(imageBitmap || img, templateName);
        if (imageBitmap) {
            imageBitmap.close();
        } // release memory
        return results;
    }
    async _captureImage(image, templateName) {
        let imgW = image instanceof HTMLImageElement ? image.naturalWidth : image.width;
        let imgH = image instanceof HTMLImageElement ? image.naturalHeight : image.height;
        let maxNaturalWH = Math.max(imgW, imgH);
        let acceptW, acceptH;
        if (maxNaturalWH > this.maxImageSideLength) {
            __classPrivateFieldSet(this, _CaptureVisionRouter_compressRate, this.maxImageSideLength / maxNaturalWH, "f");
            acceptW = Math.round(imgW * __classPrivateFieldGet(this, _CaptureVisionRouter_compressRate, "f"));
            acceptH = Math.round(imgH * __classPrivateFieldGet(this, _CaptureVisionRouter_compressRate, "f"));
        }
        else {
            acceptW = imgW;
            acceptH = imgH;
        }
        if (!__classPrivateFieldGet(this, _CaptureVisionRouter_canvas, "f")) {
            __classPrivateFieldSet(this, _CaptureVisionRouter_canvas, document.createElement('canvas'), "f");
        }
        const cvs = __classPrivateFieldGet(this, _CaptureVisionRouter_canvas, "f");
        if (cvs.width !== acceptW || cvs.height !== acceptH) {
            cvs.width = acceptW;
            cvs.height = acceptH;
        }
        if (!cvs.ctx2d) {
            cvs.ctx2d = cvs.getContext('2d', { willReadFrequently: true });
        }
        const ctx = cvs.ctx2d;
        ctx.drawImage(image, 0, 0, imgW, imgH, 0, 0, acceptW, acceptH);
        if (image.dbrObjUrl) {
            URL.revokeObjectURL(image.dbrObjUrl); // relese memory
        }
        return await this._captureCanvas(cvs, templateName);
    }
    async _captureCanvas(canvas, templateName) {
        if (canvas.crossOrigin && "anonymous" != canvas.crossOrigin) { // canvas has crossOrigin to detect if cors, is native api
            throw "cors";
        }
        if ([canvas.width, canvas.height].includes(0)) {
            throw Error(`The width or height of the 'canvas' is 0.`);
        }
        const ctx = canvas.ctx2d || canvas.getContext("2d", { willReadFrequently: true });
        const imgData = Uint8Array.from(ctx.getImageData(0, 0, canvas.width, canvas.height).data);
        const DsImageData = {
            bytes: imgData,
            width: canvas.width,
            height: canvas.height,
            stride: canvas.width * 4,
            format: 10,
        };
        return await this._captureInWorker(DsImageData, templateName);
    }
    async _captureVideo(video, templateName) {
        if (video.crossOrigin && "anonymous" != video.crossOrigin) {
            throw "cors";
        }
        let imgW = video.videoWidth;
        let imgH = video.videoHeight;
        let maxNaturalWH = Math.max(imgW, imgH);
        let acceptW, acceptH;
        if (maxNaturalWH > this.maxImageSideLength) {
            __classPrivateFieldSet(this, _CaptureVisionRouter_compressRate, this.maxImageSideLength / maxNaturalWH, "f");
            acceptW = Math.round(imgW * __classPrivateFieldGet(this, _CaptureVisionRouter_compressRate, "f"));
            acceptH = Math.round(imgH * __classPrivateFieldGet(this, _CaptureVisionRouter_compressRate, "f"));
        }
        else {
            acceptW = imgW;
            acceptH = imgH;
        }
        if (!__classPrivateFieldGet(this, _CaptureVisionRouter_canvas, "f")) {
            __classPrivateFieldSet(this, _CaptureVisionRouter_canvas, document.createElement('canvas'), "f");
        }
        const cvs = __classPrivateFieldGet(this, _CaptureVisionRouter_canvas, "f");
        if (cvs.width !== acceptW || cvs.height !== acceptH) {
            cvs.width = acceptW;
            cvs.height = acceptH;
        }
        if (!cvs.ctx2d) {
            cvs.ctx2d = cvs.getContext('2d', { willReadFrequently: true });
        }
        const ctx = cvs.ctx2d;
        ctx.drawImage(video, 0, 0, imgW, imgH, 0, 0, acceptW, acceptH);
        return await this._captureCanvas(cvs, templateName);
    }
    async _captureInWorker(DsImageData, templateName) {
        const { bytes, width, height, stride, format } = DsImageData;
        let taskID = getNextTaskID();
        const p = new MutablePromise();
        mapTaskCallBack[taskID] = async (body) => {
            var _a, _b;
            if (body.success) {
                const getResultFromWorkerTime = Date.now();
                if (CaptureVisionRouter._onLog) {
                    CaptureVisionRouter._onLog(`get result time from worker: ${getResultFromWorkerTime}`);
                    CaptureVisionRouter._onLog(`worker to main time consume: ${getResultFromWorkerTime - body.workerReturnMsgTime}`);
                }
                try {
                    const captureResult = body.captureResult;
                    if (captureResult.errorCode !== 0) {
                        let error = new Error(captureResult.errorString);
                        error.errorCode = captureResult.errorCode;
                        return p.reject(error);
                    }
                    DsImageData.bytes = body.bytes;
                    for (let item of captureResult.items) {
                        if (__classPrivateFieldGet(this, _CaptureVisionRouter_compressRate, "f") !== 0) {
                            convertCoordinates(item, __classPrivateFieldGet(this, _CaptureVisionRouter_compressRate, "f"));
                        }
                        if (item.type === EnumCapturedResultItemType.CRIT_ORIGINAL_IMAGE) {
                            item.imageData = DsImageData;
                        }
                        else if (item.type === EnumCapturedResultItemType.CRIT_NORMALIZED_IMAGE) {
                            (_a = mapPackageRegister.ddn) === null || _a === void 0 ? void 0 : _a.handleNormalizedImageResultItem(item);
                        }
                        else if (item.type === EnumCapturedResultItemType.CRIT_PARSED_RESULT) {
                            (_b = mapPackageRegister.dcp) === null || _b === void 0 ? void 0 : _b.handleParsedResultItem(item);
                        }
                    }
                    if (__classPrivateFieldGet(this, _CaptureVisionRouter_isScanner, "f")) {
                        for (let filter of __classPrivateFieldGet(this, _CaptureVisionRouter_resultFilterSet, "f")) {
                            filter.onDecodedBarcodesReceived(captureResult);
                            filter.onRecognizedTextLinesReceived(captureResult);
                            filter.onDetectedQuadsReceived(captureResult);
                            filter.onNormalizedImagesReceived(captureResult);
                        }
                    }
                    for (let itemName in resultItemMapConfig) {
                        const _itemName = itemName;
                        const filterItems = captureResult.items.filter((item) => {
                            return item.type === resultItemMapConfig[_itemName].type;
                        });
                        if (filterItems.length) {
                            captureResult[itemName] = filterItems;
                        }
                    }
                    if (!this._isPauseScan || !__classPrivateFieldGet(this, _CaptureVisionRouter_isScanner, "f")) {
                        const irs = captureResult.intermediateResult; // irs => intermediateResults
                        if (irs) {
                            let irrSetCount = 0;
                            for (let irr of __classPrivateFieldGet(this, _CaptureVisionRouter_intermediateResultManager, "f")._intermediateResultReceiverSet) {
                                irrSetCount++;
                                for (let cb of irs) {
                                    if (cb.info.callbackName === "onTaskResultsReceived") {
                                        for (let unit of cb.intermediateResultUnits) {
                                            unit.originalImageTag = DsImageData.tag ? DsImageData.tag : null;
                                        }
                                        if (irr[cb.info.callbackName]) {
                                            irr[cb.info.callbackName]({ intermediateResultUnits: cb.intermediateResultUnits }, cb.info);
                                        }
                                    }
                                    else {
                                        if (irr[cb.info.callbackName]) {
                                            irr[cb.info.callbackName](cb.result, cb.info);
                                        }
                                    }
                                    if (irrSetCount === __classPrivateFieldGet(this, _CaptureVisionRouter_intermediateResultManager, "f")._intermediateResultReceiverSet.size) {
                                        delete cb.info.callbackName;
                                    }
                                }
                            }
                        }
                    }
                    captureResult && captureResult.hasOwnProperty("intermediateResult") && delete captureResult.intermediateResult;
                    __classPrivateFieldSet(this, _CaptureVisionRouter_compressRate, 0, "f");
                    return p.resolve(captureResult);
                }
                catch (ex) {
                    return p.reject(ex);
                }
            }
            else {
                let ex = new Error(body.message);
                ex.stack = body.stack + '\n' + ex.stack;
                return p.reject(ex);
            }
        };
        if (CaptureVisionRouter._onLog) {
            CaptureVisionRouter._onLog(`send buffer to worker: ${Date.now()}`);
        }
        worker.postMessage({
            type: "cvr_capture",
            id: taskID,
            instanceID: this._instanceID,
            body: {
                bytes,
                width,
                height,
                stride,
                format,
                templateName: templateName ? templateName : "",
                isScanner: __classPrivateFieldGet(this, _CaptureVisionRouter_isScanner, "f")
            }
        }, [bytes.buffer]);
        return p;
    }
    ;
    /**
     * Configures runtime settings using a provided JSON string, an object, or a URL pointing to an object, which contains settings for one or more `CaptureVisionTemplates`.
     * @param settings A JSON string, an object, or a URL pointing to an object that contains settings for one or more `CaptureVisionTemplates`.
     *
     * @returns A promise that resolves when the operation has completed. It provides an object that describes the result.
     */
    async initSettings(settings) {
        checkIsDisposed(this);
        if (!settings || !["string", "object"].includes(typeof settings)) {
            return console.error("Invalid template.");
        }
        if (typeof settings === "string") {
            if (!settings.trimStart().startsWith("{")) {
                settings = await requestResource(settings, "text");
            }
        }
        else if (typeof settings === "object") {
            settings = JSON.stringify(settings);
        }
        return await new Promise((rs, rj) => {
            let taskID = getNextTaskID();
            mapTaskCallBack[taskID] = async (body) => {
                if (body.success) {
                    const response = JSON.parse(body.response);
                    if (response.errorCode !== 0) {
                        let error = new Error(response.errorString ? response.errorString : "Init Settings Failed.");
                        error.errorCode = response.errorCode;
                        return rj(error);
                    }
                    const _parsedSettings = JSON.parse(settings);
                    this._currentSettings = _parsedSettings;
                    let modules = [];
                    let templateNames = _parsedSettings.CaptureVisionTemplates;
                    for (let i = 0; i < templateNames.length; i++) {
                        let tasks = await this.containsTask(templateNames[i].Name);
                        modules = modules.concat(tasks);
                    }
                    await loadWasm([...new Set(modules)]);
                    this._isOutputOriginalImage = (this._currentSettings.CaptureVisionTemplates[0].OutputOriginalImage === 1);
                    CaptureVisionRouter._defaultTemplate = this._currentSettings.CaptureVisionTemplates[0].Name;
                    return rs(response);
                }
                else {
                    let ex = new Error(body.message);
                    ex.stack = body.stack + '\n' + ex.stack;
                    return rj(ex);
                }
            };
            worker.postMessage({
                type: "cvr_initSettings",
                id: taskID,
                instanceID: this._instanceID,
                body: { settings },
            });
        });
    }
    ;
    /**
     * Returns an object that contains settings for the specified `CaptureVisionTemplate`.
     * @param templateName Specifies a `CaptureVisionTemplate` by its name. If passed "*", the returned object will contain all templates.
     *
     * @returns A promise that resolves with the object that contains settings for the specified template or all templates.
     */
    async outputSettings(templateName) {
        checkIsDisposed(this);
        return await new Promise((rs, rj) => {
            let taskID = getNextTaskID();
            mapTaskCallBack[taskID] = async (body) => {
                if (body.success) {
                    const response = JSON.parse(body.response);
                    if (response.errorCode !== 0) {
                        let error = new Error(response.errorString);
                        error.errorCode = response.errorCode;
                        return rj(error);
                    }
                    return rs(JSON.parse(response.data));
                }
                else {
                    let ex = new Error(body.message);
                    ex.stack = body.stack + '\n' + ex.stack;
                    return rj(ex);
                }
            };
            worker.postMessage({
                type: "cvr_outputSettings",
                id: taskID,
                instanceID: this._instanceID,
                body: {
                    templateName: templateName ? templateName : "*"
                }
            });
        });
    }
    ;
    /**
     * Generates a Blob object or initiates a JSON file download containing the settings for the specified `CaptureVisionTemplate`.
     * @param templateName Specifies a `CaptureVisionTemplate` by its name. If passed "*", the returned object will contain all templates.
     * @param fileName Specifies the name of the file.
     * @param download Boolean that specifies whether to initiates a file download.
     *
     * @returns A promise that resolves with the Blob object that contains settings for the specified template or all templates.
     */
    async outputSettingsToFile(templateName, fileName, download) {
        const settings = await this.outputSettings(templateName);
        const jsonBlob = new Blob([JSON.stringify(settings, null, 2, function (_, value) {
                if (value instanceof Array) {
                    return JSON.stringify(value);
                }
                else {
                    return value;
                }
            }, 2)], { type: "application/json" });
        if (download) {
            const downloadLink = document.createElement("a");
            downloadLink.href = URL.createObjectURL(jsonBlob);
            if (fileName.endsWith(".json")) {
                fileName = fileName.replace(".json", "");
            }
            downloadLink.download = `${fileName}.json`;
            downloadLink.onclick = () => {
                setTimeout(() => {
                    URL.revokeObjectURL(downloadLink.href);
                }, 500);
            };
            downloadLink.click();
        }
        return jsonBlob;
    }
    async getTemplateNames() {
        checkIsDisposed(this);
        return await new Promise((rs, rj) => {
            let taskID = getNextTaskID();
            mapTaskCallBack[taskID] = async (body) => {
                if (body.success) {
                    const response = JSON.parse(body.response);
                    if (response.errorCode !== 0) {
                        let error = new Error(response.errorString);
                        error.errorCode = response.errorCode;
                        return rj(error);
                    }
                    return rs(JSON.parse(response.data));
                }
                else {
                    let ex = new Error(body.message);
                    ex.stack = body.stack + '\n' + ex.stack;
                    return rj(ex);
                }
            };
            worker.postMessage({
                type: "cvr_getTemplateNames",
                id: taskID,
                instanceID: this._instanceID
            });
        });
    }
    /**
     * Retrieves a JSON object that contains simplified settings for the specified `CaptureVisionTemplate`.
     * @param templateName Specifies a `CaptureVisionTemplate` by its name.
     *
     * @returns A promise that resolves with a JSON object, of type `SimplifiedCaptureVisionSettings`, which represents the simplified settings for the specified template.
     * @remarks If the settings of the specified template are too complex, we cannot create a SimplifiedCaptureVisionSettings, and as a result, it will return an error.
     */
    async getSimplifiedSettings(templateName) {
        checkIsDisposed(this);
        if (!templateName)
            templateName = this._currentSettings.CaptureVisionTemplates[0].Name;
        const tasks = await this.containsTask(templateName);
        await loadWasm(tasks);
        return await new Promise((rs, rj) => {
            let taskID = getNextTaskID();
            mapTaskCallBack[taskID] = async (body) => {
                if (body.success) {
                    const response = JSON.parse(body.response);
                    if (response.errorCode !== 0) {
                        let error = new Error(response.errorString);
                        error.errorCode = response.errorCode;
                        return rj(error);
                    }
                    const responseData = JSON.parse(response.data, (k, v) => {
                        if (k === "barcodeFormatIds") {
                            return BigInt(v);
                        }
                        return v;
                    });
                    responseData.minImageCaptureInterval = this._minImageCaptureInterval;
                    return rs(responseData);
                }
                else {
                    let ex = new Error(body.message);
                    ex.stack = body.stack + '\n' + ex.stack;
                    return rj(ex);
                }
            };
            worker.postMessage({
                type: "cvr_getSimplifiedSettings",
                id: taskID,
                instanceID: this._instanceID,
                body: { templateName }
            });
        });
    }
    ;
    /**
     * Updates the specified `CaptureVisionTemplate` with an updated `SimplifiedCaptureVisionSettings` object.
     * @param templateName Specifies a `CaptureVisionTemplate` by its name.
     * @param settings The `SimplifiedCaptureVisionSettings` object that contains updated settings.
     *
     * @returns A promise that resolves when the operation has completed. It provides an object that describes the result.
     */
    async updateSettings(templateName, settings) {
        checkIsDisposed(this);
        const tasks = await this.containsTask(templateName);
        await loadWasm(tasks);
        return await new Promise((rs, rj) => {
            let taskID = getNextTaskID();
            mapTaskCallBack[taskID] = async (body) => {
                if (body.success) {
                    const response = JSON.parse(body.response);
                    if (settings.minImageCaptureInterval && settings.minImageCaptureInterval >= -1) {
                        this._minImageCaptureInterval = settings.minImageCaptureInterval;
                    }
                    this._isOutputOriginalImage = body.isOutputOriginalImage;
                    if (response.errorCode !== 0) {
                        let error = new Error(response.errorString ? response.errorString : "Update Settings Failed.");
                        error.errorCode = response.errorCode;
                        return rj(error);
                    }
                    this._currentSettings = await this.outputSettings("*");
                    return rs(response);
                }
                else {
                    let ex = new Error(body.message);
                    ex.stack = body.stack + '\n' + ex.stack;
                    return rj(ex);
                }
            };
            worker.postMessage({
                type: "cvr_updateSettings",
                id: taskID,
                instanceID: this._instanceID,
                body: {
                    settings,
                    templateName
                }
            });
        });
    }
    /**
     * Restores all runtime settings to their original default values.
     *
     * @returns A promise that resolves when the operation has completed. It provides an object that describes the result.
     */
    async resetSettings() {
        checkIsDisposed(this);
        return await new Promise((rs, rj) => {
            let taskID = getNextTaskID();
            mapTaskCallBack[taskID] = async (body) => {
                if (body.success) {
                    const response = JSON.parse(body.response);
                    if (response.errorCode !== 0) {
                        let error = new Error(response.errorString ? response.errorString : "Reset Settings Failed.");
                        error.errorCode = response.errorCode;
                        return rj(error);
                    }
                    this._currentSettings = await this.outputSettings("*");
                    return rs(response);
                }
                else {
                    let ex = new Error(body.message);
                    ex.stack = body.stack + '\n' + ex.stack;
                    return rj(ex);
                }
            };
            worker.postMessage({
                type: "cvr_resetSettings",
                id: taskID,
                instanceID: this._instanceID
            });
        });
    }
    ;
    /**
     * Returns an object, of type `BufferedItemsManager`, that manages buffered items.
     * @returns The `BufferedItemsManager` object.
     */
    getBufferedItemsManager() {
        if (!__classPrivateFieldGet(this, _CaptureVisionRouter_bufferdItemsManager, "f")) {
            __classPrivateFieldSet(this, _CaptureVisionRouter_bufferdItemsManager, new BufferedItemsManager(this), "f");
        }
        return __classPrivateFieldGet(this, _CaptureVisionRouter_bufferdItemsManager, "f");
    }
    /**
     * Returns an object, of type `IntermediateResultManager`, that manages intermediate results.
     *
     * @returns The `IntermediateResultManager` object.
     */
    getIntermediateResultManager() {
        checkIsDisposed(this);
        if (!__classPrivateFieldGet(this, _CaptureVisionRouter_innerUseTag, "f") && CoreModule.bSupportIRTModule !== 0) {
            throw new Error("The current license does not support the use of intermediate results.");
        }
        if (!__classPrivateFieldGet(this, _CaptureVisionRouter_intermediateResultManager, "f")) {
            __classPrivateFieldSet(this, _CaptureVisionRouter_intermediateResultManager, new IntermediateResultManager(this), "f");
        }
        return __classPrivateFieldGet(this, _CaptureVisionRouter_intermediateResultManager, "f");
    }
    ;
    async parseRequiredResources(templateName) {
        checkIsDisposed(this);
        return await new Promise((rs, rj) => {
            let taskID = getNextTaskID();
            mapTaskCallBack[taskID] = async (body) => {
                if (body.success) {
                    return rs(JSON.parse(body.resources));
                }
                else {
                    let ex = new Error(body.message);
                    ex.stack = body.stack + '\n' + ex.stack;
                    return rj(ex);
                }
            };
            worker.postMessage({
                type: "cvr_parseRequiredResources",
                id: taskID,
                instanceID: this._instanceID,
                body: {
                    templateName
                }
            });
        });
    }
    /**
     * Releases all resources used by the `CaptureVisionRouter` instance.
     *
     * @returns A promise that resolves when the resources have been successfully released. It does not provide any value upon resolution.
     */
    async dispose() {
        checkIsDisposed(this);
        if (__classPrivateFieldGet(this, _CaptureVisionRouter_promiseStartScan, "f")) {
            this.stopCapturing();
        }
        __classPrivateFieldSet(this, _CaptureVisionRouter_isa, null, "f");
        __classPrivateFieldGet(this, _CaptureVisionRouter_resultReceiverSet, "f").clear();
        __classPrivateFieldGet(this, _CaptureVisionRouter_isaStateListenerSet, "f").clear();
        __classPrivateFieldGet(this, _CaptureVisionRouter_resultFilterSet, "f").clear();
        __classPrivateFieldGet(this, _CaptureVisionRouter_intermediateResultManager, "f")._intermediateResultReceiverSet.clear();
        __classPrivateFieldSet(this, _CaptureVisionRouter_isDestroyed, true, "f");
        // this._captureStateListenerSet.clear();
        let taskID = getNextTaskID();
        mapTaskCallBack[taskID] = (body) => {
            if (body.success) ;
            else {
                let ex = new Error(body.message);
                ex.stack = body.stack + '\n' + ex.stack;
                throw ex;
            }
        };
        worker.postMessage({
            type: 'cvr_dispose',
            id: taskID,
            instanceID: this._instanceID
        });
    }
    ;
    /**
     * For Debug
     */
    _getInternalData() {
        return {
            isa: __classPrivateFieldGet(this, _CaptureVisionRouter_isa, "f"),
            promiseStartScan: __classPrivateFieldGet(this, _CaptureVisionRouter_promiseStartScan, "f"),
            intermediateResultManager: __classPrivateFieldGet(this, _CaptureVisionRouter_intermediateResultManager, "f"),
            bufferdItemsManager: __classPrivateFieldGet(this, _CaptureVisionRouter_bufferdItemsManager, "f"),
            resultReceiverSet: __classPrivateFieldGet(this, _CaptureVisionRouter_resultReceiverSet, "f"),
            isaStateListenerSet: __classPrivateFieldGet(this, _CaptureVisionRouter_isaStateListenerSet, "f"),
            resultFilterSet: __classPrivateFieldGet(this, _CaptureVisionRouter_resultFilterSet, "f"),
            compressRate: __classPrivateFieldGet(this, _CaptureVisionRouter_compressRate, "f"),
            canvas: __classPrivateFieldGet(this, _CaptureVisionRouter_canvas, "f"),
            isScanner: __classPrivateFieldGet(this, _CaptureVisionRouter_isScanner, "f"),
            innerUseTag: __classPrivateFieldGet(this, _CaptureVisionRouter_innerUseTag, "f"),
            isDestroyed: __classPrivateFieldGet(this, _CaptureVisionRouter_isDestroyed, "f")
        };
    }
    async _getWasmFilterState() {
        return await new Promise((rs, rj) => {
            let taskID = getNextTaskID();
            mapTaskCallBack[taskID] = async (body) => {
                if (body.success) {
                    const response = JSON.parse(body.response);
                    return rs(response);
                }
                else {
                    let ex = new Error(body.message);
                    ex.stack = body.stack + '\n' + ex.stack;
                    return rj(ex);
                }
            };
            worker.postMessage({
                type: "cvr_getWasmFilterState",
                id: taskID,
                instanceID: this._instanceID
            });
        });
    }
}
_CaptureVisionRouter_isa = new WeakMap(), _CaptureVisionRouter_canvas = new WeakMap(), _CaptureVisionRouter_promiseStartScan = new WeakMap(), _CaptureVisionRouter_intermediateResultManager = new WeakMap(), _CaptureVisionRouter_bufferdItemsManager = new WeakMap(), _CaptureVisionRouter_resultReceiverSet = new WeakMap(), _CaptureVisionRouter_isaStateListenerSet = new WeakMap(), _CaptureVisionRouter_resultFilterSet = new WeakMap(), _CaptureVisionRouter_compressRate = new WeakMap(), _CaptureVisionRouter_isScanner = new WeakMap(), _CaptureVisionRouter_innerUseTag = new WeakMap(), _CaptureVisionRouter_isDestroyed = new WeakMap();
CaptureVisionRouter._defaultTemplate = "Default";
async function _enableResultCrossVerification(cvr, verificationEnabled) {
    checkIsDisposed(cvr);
    return await new Promise((rs, rj) => {
        let taskID = getNextTaskID();
        mapTaskCallBack[taskID] = async (body) => {
            if (body.success) {
                return rs(body.result);
            }
            else {
                let ex = new Error(body.message);
                ex.stack = body.stack + '\n' + ex.stack;
                return rj(ex);
            }
        };
        worker.postMessage({
            type: "cvr_enableResultCrossVerification",
            id: taskID,
            instanceID: cvr._instanceID,
            body: {
                verificationEnabled
            }
        });
    });
}
async function _enableResultDeduplication(cvr, duplicateFilterEnabled) {
    checkIsDisposed(cvr);
    return await new Promise((rs, rj) => {
        let taskID = getNextTaskID();
        mapTaskCallBack[taskID] = async (body) => {
            if (body.success) {
                return rs(body.result);
            }
            else {
                let ex = new Error(body.message);
                ex.stack = body.stack + '\n' + ex.stack;
                return rj(ex);
            }
        };
        worker.postMessage({
            type: "cvr_enableResultDeduplication",
            id: taskID,
            instanceID: cvr._instanceID,
            body: {
                duplicateFilterEnabled
            }
        });
    });
}
async function _setDuplicateForgetTime(cvr, duplicateForgetTime) {
    checkIsDisposed(cvr);
    return await new Promise((rs, rj) => {
        let taskID = getNextTaskID();
        mapTaskCallBack[taskID] = async (body) => {
            if (body.success) {
                return rs(body.result);
            }
            else {
                let ex = new Error(body.message);
                ex.stack = body.stack + '\n' + ex.stack;
                return rj(ex);
            }
        };
        worker.postMessage({
            type: "cvr_setDuplicateForgetTime",
            id: taskID,
            instanceID: cvr._instanceID,
            body: {
                duplicateForgetTime
            }
        });
    });
}
async function _clearVerifyList(cvr) {
    let taskID = getNextTaskID();
    const p = new MutablePromise();
    mapTaskCallBack[taskID] = async (body) => {
        if (body.success) {
            return p.resolve();
        }
        else {
            let ex = new Error(body.message);
            ex.stack = body.stack + '\n' + ex.stack;
            return p.reject(ex);
        }
    };
    worker.postMessage({
        type: "cvr_clearVerifyList",
        id: taskID,
        instanceID: cvr._instanceID
    });
    return p;
}

// TODO
class CapturedResultReceiver {
    constructor() {
        /**
         * Event triggered when a generic captured result is available, occurring each time an image finishes its processing.
         * This event can be used for any result that does not fit into the specific categories of the other callback events.
         * @param result The captured result, an instance of `CapturedResult`.
         */
        this.onCapturedResultReceived = null;
        /**
         * Event triggered when the original image result is available.
         * This event is used to handle the original image captured by an image source such as Dynamsoft Camera Enhancer.
         * @param result The original image result, an instance of `OriginalImageResultItem`.
         */
        this.onOriginalImageResultReceived = null;
    }
}

class IntermediateResultReceiver {
    constructor() {
        this._observedResultUnitTypes = EnumIntermediateResultUnitType.IRUT_ALL;
        this._observedTaskMap = new Map();
        this._parameters = {
            setObservedResultUnitTypes: (types) => {
                this._observedResultUnitTypes = types;
            },
            getObservedResultUnitTypes: () => {
                return this._observedResultUnitTypes;
            },
            isResultUnitTypeObserved: (type) => {
                return !!(type & this._observedResultUnitTypes);
            },
            addObservedTask: (taskName) => {
                this._observedTaskMap.set(taskName, true);
            },
            removeObservedTask: (taskName) => {
                this._observedTaskMap.set(taskName, false);
            },
            isTaskObserved: (taskName) => {
                if (this._observedTaskMap.size === 0)
                    return true;
                return !!(this._observedTaskMap.get(taskName));
            }
        };
        this.onTaskResultsReceived = null;
        // section
        this.onPredetectedRegionsReceived = null;
        // The remaining callback definitions will be automatically injected when imported into other modules
        // stage
        this.onColourImageUnitReceived = null;
        this.onScaledDownColourImageUnitReceived = null;
        this.onGrayscaleImageUnitReceived = null;
        this.onTransformedGrayscaleImageUnitReceived = null;
        this.onEnhancedGrayscaleImageUnitReceived = null;
        this.onBinaryImageUnitReceived = null;
        this.onTextureDetectionResultUnitReceived = null;
        this.onTextureRemovedGrayscaleImageUnitReceived = null;
        this.onTextureRemovedBinaryImageUnitReceived = null;
        this.onContoursUnitReceived = null;
        this.onLineSegmentsUnitReceived = null;
        this.onTextZonesUnitReceived = null;
        this.onTextRemovedBinaryImageUnitReceived = null;
        this.onShortLinesUnitReceived = null;
        // The remaining callback definitions will be automatically injected when imported into other modules
    }
    /**
     * Gets the observed parameters of the intermediate result receiver. Allowing for configuration of intermediate result observation.
     * @return The observed parameters, of type ObservationParameters. The default parameters are to observe all intermediate result unit types and all tasks.
     */
    getObservationParameters() {
        return this._parameters;
    }
}

var EnumPresetTemplate;
(function (EnumPresetTemplate) {
    /**
     * @brief Versatile function for barcode reading, document detection, or text recognition.
     */
    EnumPresetTemplate["PT_DEFAULT"] = "Default";
    /**
     * @brief Scans a single barcode.
     */
    EnumPresetTemplate["PT_READ_BARCODES"] = "ReadBarcodes_Default";
    /**
     * @brief Identifies and reads any text present.
     */
    EnumPresetTemplate["PT_RECOGNIZE_TEXT_LINES"] = "RecognizeTextLines_Default";
    /**
     * @brief RIdentifies the edges of a document.
     */
    EnumPresetTemplate["PT_DETECT_DOCUMENT_BOUNDARIES"] = "DetectDocumentBoundaries_Default";
    /**
     * @brief Detects document edges and standardizes its format.
     */
    EnumPresetTemplate["PT_DETECT_AND_NORMALIZE_DOCUMENT"] = "DetectAndNormalizeDocument_Default";
    /**
     * @brief Adjusts a document to a standard format using detected borders.
     */
    EnumPresetTemplate["PT_NORMALIZE_DOCUMENT"] = "NormalizeDocument_Default";
    /**
     * @brief Represents a barcode reading mode where speed is prioritized.
     *
     * In this mode, the barcode reader will optimize for faster barcode detection
     * and decoding, sacrificing some level of accuracy and read rate. It is suitable
     * for situations where a quick response time is more important than perfect
     * barcode recognition.
     */
    EnumPresetTemplate["PT_READ_BARCODES_SPEED_FIRST"] = "ReadBarcodes_SpeedFirst";
    /**
     * @brief Represents a barcode reading mode where barcode read rate is prioritized.
     *
     * In this mode, the barcode reader will optimize for higher barcode read rates,
     * even if it may sometimes result in reduced accuracy and speed. It is suitable for
     * scenarios where maximizing the number of successfully read barcodes is critical.
     */
    EnumPresetTemplate["PT_READ_BARCODES_READ_RATE_FIRST"] = "ReadBarcodes_ReadRateFirst";
    /**
     * @brief Represents a balanced barcode reading mode.
     *
     * This mode aims for a reasonable balance between speed and read rate in barcode
     * recognition. It is suitable for most common use cases where a compromise between
     * speed and read rate is acceptable.
     */
    EnumPresetTemplate["PT_READ_BARCODES_BALANCE"] = "ReadBarcodes_Balance";
    /**
    * @brief Represents a barcode reading mode for single barcode code detection.
    *
    * In this mode, the barcode reader will focus on detecting and decoding a single
    * barcode code, ignoring any additional codes in the same image. It is efficient
    * when the target image has only one barcode.
    */
    EnumPresetTemplate["PT_READ_SINGLE_BARCODE"] = "ReadBarcodes_Balanced";
    /**
     * @brief Represents a barcode reading mode optimized for dense barcode codes.
     *
     * This mode is designed to handle dense or closely packed barcode codes where
     * accuracy is paramount. It may operate slower than other modes but is suitable
     * for challenging scenarios where code density is high.
     */
    EnumPresetTemplate["PT_READ_DENSE_BARCODES"] = "ReadDenseBarcodes";
    /**
     * @brief Represents a barcode reading mode optimized for distant barcode codes.
     *
     * This mode is designed to scanning a barcode that is placed far from the device.
     */
    EnumPresetTemplate["PT_READ_DISTANT_BARCODES"] = "ReadDistantBarcodes";
    /**
    * @brief Represents a text recognition mode focused on recognizing numbers.
    */
    EnumPresetTemplate["PT_RECOGNIZE_NUMBERS"] = "RecognizeNumbers";
    /**
     * @brief Represents a text recognition mode focused on recognizing alphabetic characters (letters).
     *
     */
    EnumPresetTemplate["PT_RECOGNIZE_LETTERS"] = "RecognizeLetters";
    /**
     * @brief Represents a text recognition mode that combines numbers and alphabetic characters (letters) recognition.
     */
    EnumPresetTemplate["PT_RECOGNIZE_NUMBERS_AND_LETTERS"] = "RecognizeNumbersAndLetters";
    /**
     * @brief Represents a text recognition mode that combines numbers and uppercase letters recognition.
     */
    EnumPresetTemplate["PT_RECOGNIZE_NUMBERS_AND_UPPERCASE_LETTERS"] = "RecognizeNumbersAndUppercaseLetters";
    /**
     * @brief Represents a text recognition mode focused on recognizing uppercase letters.
     */
    EnumPresetTemplate["PT_RECOGNIZE_UPPERCASE_LETTERS"] = "RecognizeUppercaseLetters";
})(EnumPresetTemplate || (EnumPresetTemplate = {}));

export { CaptureVisionRouter, CaptureVisionRouterModule, CapturedResultReceiver, EnumImageSourceState, EnumPresetTemplate, IntermediateResultReceiver };
