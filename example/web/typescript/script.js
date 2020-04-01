/// <reference path="./node_modules/dynamsoft-javascript-barcode/dist/dbr.reference.d.ts" />
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
Dynamsoft.BarcodeReader.engineResourcePath = "https://cdn.jsdelivr.net/npm/dynamsoft-javascript-barcode@7.3.0-v3/dist/";
// Please visit https://www.dynamsoft.com/CustomerPortal/Portal/TrialLicense.aspx to get a trial license
Dynamsoft.BarcodeReader.productKeys = "PRODUCT-KEYS";
// Dynamsoft.BarcodeReader._bUseFullFeature = true; // Control of loading min wasm or full wasm.
// reader for decoding picture
var reader = null;
// scanner for decoding video
var scanner = null;
// decode input picture
document.getElementById('ipt-file').addEventListener('change', function () {
    return __awaiter(this, void 0, void 0, function () {
        var _a, resultsToAlert, i, file, results, _i, results_1, result, ex_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 7, , 8]);
                    _a = reader;
                    if (_a) return [3 /*break*/, 2];
                    return [4 /*yield*/, Dynamsoft.BarcodeReader.createInstance()];
                case 1:
                    _a = (_b.sent());
                    _b.label = 2;
                case 2:
                    reader = _a;
                    resultsToAlert = [];
                    i = 0;
                    _b.label = 3;
                case 3:
                    if (!(i < this.files.length)) return [3 /*break*/, 6];
                    file = this.files[i];
                    resultsToAlert.push(i + '. ' + file.name + ":");
                    return [4 /*yield*/, reader.decode(file)];
                case 4:
                    results = _b.sent();
                    console.log(results);
                    for (_i = 0, results_1 = results; _i < results_1.length; _i++) {
                        result = results_1[_i];
                        resultsToAlert.push(result.barcodeText);
                    }
                    _b.label = 5;
                case 5:
                    ++i;
                    return [3 /*break*/, 3];
                case 6:
                    alert(resultsToAlert.join('\n'));
                    return [3 /*break*/, 8];
                case 7:
                    ex_1 = _b.sent();
                    alert(ex_1.message);
                    throw ex_1;
                case 8:
                    this.value = '';
                    return [2 /*return*/];
            }
        });
    });
});
// decode video from camera
document.getElementById('btn-show-scanner').addEventListener('click', function () { return __awaiter(_this, void 0, void 0, function () {
    var _a, ex_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 4, , 5]);
                _a = scanner;
                if (_a) return [3 /*break*/, 2];
                return [4 /*yield*/, Dynamsoft.BarcodeScanner.createInstance()];
            case 1:
                _a = (_b.sent());
                _b.label = 2;
            case 2:
                scanner = _a;
                scanner.onFrameRead = function (results) {
                    if (results.length) {
                        console.log(results);
                    }
                };
                scanner.onUnduplicatedRead = function (txt, result) {
                    alert(result.barcodeFormatString + ': ' + txt);
                };
                return [4 /*yield*/, scanner.show()];
            case 3:
                _b.sent();
                return [3 /*break*/, 5];
            case 4:
                ex_2 = _b.sent();
                alert(ex_2.message);
                throw ex_2;
            case 5: return [2 /*return*/];
        }
    });
}); });
