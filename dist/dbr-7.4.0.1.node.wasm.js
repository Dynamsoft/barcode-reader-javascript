var e;
e || (e = typeof Module !== 'undefined' ? Module : {});
var aa = {}, ba;
for (ba in e) {
  e.hasOwnProperty(ba) && (aa[ba] = e[ba]);
}
var ca = "./this.program";
function da(a, b) {
  throw b;
}
var ea = !1, fa = !1, ha = !1, ia = !1, ja = !1;
ea = "object" === typeof window;
fa = "function" === typeof importScripts;
ha = (ia = "object" === typeof process && "object" === typeof process.versions && "string" === typeof process.versions.node) && !ea && !fa;
ja = !ea && !ha && !fa;
if (e.ENVIRONMENT) {
  throw Error("Module.ENVIRONMENT has been deprecated. To force the environment, use the ENVIRONMENT compile-time option (for example, -s ENVIRONMENT=web or -s ENVIRONMENT=node)");
}
var ka = "", la, ma;
if (ha) {
  ka = __dirname + "/";
  var oa, pa;
  la = function(a, b) {
    oa || (oa = require("fs"));
    pa || (pa = require("path"));
    a = pa.normalize(a);
    a = oa.readFileSync(a);
    return b ? a : a.toString();
  };
  ma = function(a) {
    a = la(a, !0);
    a.buffer || (a = new Uint8Array(a));
    assert(a.buffer);
    return a;
  };
  1 < process.argv.length && (ca = process.argv[1].replace(/\\/g, "/"));
  process.argv.slice(2);
  "undefined" !== typeof module && (module.exports = e);
  process.on("uncaughtException", function(a) {
    if (!(a instanceof qa)) {
      throw a;
    }
  });
  process.on("unhandledRejection", l);
  da = function(a) {
    process.exit(a);
  };
  e.inspect = function() {
    return "[Emscripten Module object]";
  };
} else {
  if (ja) {
    "undefined" != typeof read && (la = function(a) {
      return read(a);
    }), ma = function(a) {
      if ("function" === typeof readbuffer) {
        return new Uint8Array(readbuffer(a));
      }
      a = read(a, "binary");
      assert("object" === typeof a);
      return a;
    }, "function" === typeof quit && (da = function(a) {
      quit(a);
    }), "undefined" !== typeof print && ("undefined" === typeof console && (console = {}), console.log = print, console.warn = console.error = "undefined" !== typeof printErr ? printErr : print);
  } else {
    if (ea || fa) {
      fa ? ka = self.location.href : document.currentScript && (ka = document.currentScript.src), ka = 0 !== ka.indexOf("blob:") ? ka.substr(0, ka.lastIndexOf("/") + 1) : "", la = function(a) {
        var b = new XMLHttpRequest;
        b.open("GET", a, !1);
        b.send(null);
        return b.responseText;
      }, fa && (ma = function(a) {
        var b = new XMLHttpRequest;
        b.open("GET", a, !1);
        b.responseType = "arraybuffer";
        b.send(null);
        return new Uint8Array(b.response);
      });
    } else {
      throw Error("environment detection error");
    }
  }
}
var ra = e.print || console.log.bind(console), m = e.printErr || console.warn.bind(console);
for (ba in aa) {
  aa.hasOwnProperty(ba) && (e[ba] = aa[ba]);
}
aa = null;
Object.getOwnPropertyDescriptor(e, "arguments") || Object.defineProperty(e, "arguments", {get:function() {
  l("Module.arguments has been replaced with plain arguments_");
}});
e.thisProgram && (ca = e.thisProgram);
Object.getOwnPropertyDescriptor(e, "thisProgram") || Object.defineProperty(e, "thisProgram", {get:function() {
  l("Module.thisProgram has been replaced with plain thisProgram");
}});
e.quit && (da = e.quit);
Object.getOwnPropertyDescriptor(e, "quit") || Object.defineProperty(e, "quit", {get:function() {
  l("Module.quit has been replaced with plain quit_");
}});
assert("undefined" === typeof e.memoryInitializerPrefixURL, "Module.memoryInitializerPrefixURL option was removed, use Module.locateFile instead");
assert("undefined" === typeof e.pthreadMainPrefixURL, "Module.pthreadMainPrefixURL option was removed, use Module.locateFile instead");
assert("undefined" === typeof e.cdInitializerPrefixURL, "Module.cdInitializerPrefixURL option was removed, use Module.locateFile instead");
assert("undefined" === typeof e.filePackagePrefixURL, "Module.filePackagePrefixURL option was removed, use Module.locateFile instead");
assert("undefined" === typeof e.read, "Module.read option was removed (modify read_ in JS)");
assert("undefined" === typeof e.readAsync, "Module.readAsync option was removed (modify readAsync in JS)");
assert("undefined" === typeof e.readBinary, "Module.readBinary option was removed (modify readBinary in JS)");
assert("undefined" === typeof e.setWindowTitle, "Module.setWindowTitle option was removed (modify setWindowTitle in JS)");
Object.getOwnPropertyDescriptor(e, "read") || Object.defineProperty(e, "read", {get:function() {
  l("Module.read has been replaced with plain read_");
}});
Object.getOwnPropertyDescriptor(e, "readAsync") || Object.defineProperty(e, "readAsync", {get:function() {
  l("Module.readAsync has been replaced with plain readAsync");
}});
Object.getOwnPropertyDescriptor(e, "readBinary") || Object.defineProperty(e, "readBinary", {get:function() {
  l("Module.readBinary has been replaced with plain readBinary");
}});
n = p = function() {
  l("cannot use the stack before compiled code is ready to run, and has provided stack access");
};
function sa(a) {
  assert(ta);
  var b = r[ta >> 2];
  a = b + a + 15 & -16;
  a > ua() && l("failure to dynamicAlloc - memory growth etc. is not supported there, call malloc/sbrk directly");
  r[ta >> 2] = a;
  return b;
}
function va(a) {
  wa || (wa = {});
  wa[a] || (wa[a] = 1, m(a));
}
var wa;
function xa(a, b, c) {
  return c ? +(a >>> 0) + 4294967296.0 * +(b >>> 0) : +(a >>> 0) + 4294967296.0 * +(b | 0);
}
var ya = 0, za;
e.wasmBinary && (za = e.wasmBinary);
Object.getOwnPropertyDescriptor(e, "wasmBinary") || Object.defineProperty(e, "wasmBinary", {get:function() {
  l("Module.wasmBinary has been replaced with plain wasmBinary");
}});
"object" !== typeof WebAssembly && l("No WebAssembly support found. Build with -s WASM=0 to target JavaScript instead.");
var Aa, Ba = !1;
function assert(a, b) {
  a || l("Assertion failed: " + b);
}
function Ca(a) {
  if ("number" === typeof a) {
    var b = !0;
    var c = a;
  } else {
    b = !1, c = a.length;
  }
  var d = Da(Math.max(c, 1));
  if (b) {
    a = d;
    assert(0 == (d & 3));
    for (b = d + (c & -4); a < b; a += 4) {
      r[a >> 2] = 0;
    }
    for (b = d + c; a < b;) {
      t[a++ >> 0] = 0;
    }
    return d;
  }
  a.subarray || a.slice ? y.set(a, d) : y.set(new Uint8Array(a), d);
  return d;
}
var Ea = "undefined" !== typeof TextDecoder ? new TextDecoder("utf8") : void 0;
function Fa(a, b, c) {
  var d = b + c;
  for (c = b; a[c] && !(c >= d);) {
    ++c;
  }
  if (16 < c - b && a.subarray && Ea) {
    return Ea.decode(a.subarray(b, c));
  }
  for (d = ""; b < c;) {
    var f = a[b++];
    if (f & 128) {
      var g = a[b++] & 63;
      if (192 == (f & 224)) {
        d += String.fromCharCode((f & 31) << 6 | g);
      } else {
        var h = a[b++] & 63;
        224 == (f & 240) ? f = (f & 15) << 12 | g << 6 | h : (240 != (f & 248) && va("Invalid UTF-8 leading byte 0x" + f.toString(16) + " encountered when deserializing a UTF-8 string on the asm.js/wasm heap to a JS string!"), f = (f & 7) << 18 | g << 12 | h << 6 | a[b++] & 63);
        65536 > f ? d += String.fromCharCode(f) : (f -= 65536, d += String.fromCharCode(55296 | f >> 10, 56320 | f & 1023));
      }
    } else {
      d += String.fromCharCode(f);
    }
  }
  return d;
}
function z(a) {
  return a ? Fa(y, a, void 0) : "";
}
function Ga(a, b, c, d) {
  if (!(0 < d)) {
    return 0;
  }
  var f = c;
  d = c + d - 1;
  for (var g = 0; g < a.length; ++g) {
    var h = a.charCodeAt(g);
    if (55296 <= h && 57343 >= h) {
      var k = a.charCodeAt(++g);
      h = 65536 + ((h & 1023) << 10) | k & 1023;
    }
    if (127 >= h) {
      if (c >= d) {
        break;
      }
      b[c++] = h;
    } else {
      if (2047 >= h) {
        if (c + 1 >= d) {
          break;
        }
        b[c++] = 192 | h >> 6;
      } else {
        if (65535 >= h) {
          if (c + 2 >= d) {
            break;
          }
          b[c++] = 224 | h >> 12;
        } else {
          if (c + 3 >= d) {
            break;
          }
          2097152 <= h && va("Invalid Unicode code point 0x" + h.toString(16) + " encountered when serializing a JS string to an UTF-8 string on the asm.js/wasm heap! (Valid unicode code points should be in range 0-0x1FFFFF).");
          b[c++] = 240 | h >> 18;
          b[c++] = 128 | h >> 12 & 63;
        }
        b[c++] = 128 | h >> 6 & 63;
      }
      b[c++] = 128 | h & 63;
    }
  }
  b[c] = 0;
  return c - f;
}
function Ha(a, b, c) {
  assert("number" == typeof c, "stringToUTF8(str, outPtr, maxBytesToWrite) is missing the third parameter that specifies the length of the output buffer!");
  Ga(a, y, b, c);
}
function Ia(a) {
  for (var b = 0, c = 0; c < a.length; ++c) {
    var d = a.charCodeAt(c);
    55296 <= d && 57343 >= d && (d = 65536 + ((d & 1023) << 10) | a.charCodeAt(++c) & 1023);
    127 >= d ? ++b : b = 2047 >= d ? b + 2 : 65535 >= d ? b + 3 : b + 4;
  }
  return b;
}
"undefined" !== typeof TextDecoder && new TextDecoder("utf-16le");
function Ja(a, b) {
  assert(0 <= a.length, "writeArrayToMemory array must have a length (should be an array or typed array)");
  t.set(a, b);
}
function Ka(a) {
  0 < a % 65536 && (a += 65536 - a % 65536);
  return a;
}
var buffer, t, y, La, Ma, r, A, Na, Oa;
function Pa() {
  e.HEAP8 = t = new Int8Array(buffer);
  e.HEAP16 = La = new Int16Array(buffer);
  e.HEAP32 = r = new Int32Array(buffer);
  e.HEAPU8 = y = new Uint8Array(buffer);
  e.HEAPU16 = Ma = new Uint16Array(buffer);
  e.HEAPU32 = A = new Uint32Array(buffer);
  e.HEAPF32 = Na = new Float32Array(buffer);
  e.HEAPF64 = Oa = new Float64Array(buffer);
}
var ta = 1908368;
assert(!0, "stack must start aligned");
assert(!0, "heap must start aligned");
e.TOTAL_STACK && assert(5242880 === e.TOTAL_STACK, "the stack size can no longer be determined at runtime");
var Qa = e.TOTAL_MEMORY || 16777216;
Object.getOwnPropertyDescriptor(e, "TOTAL_MEMORY") || Object.defineProperty(e, "TOTAL_MEMORY", {get:function() {
  l("Module.TOTAL_MEMORY has been replaced with plain INITIAL_TOTAL_MEMORY");
}});
assert(5242880 <= Qa, "TOTAL_MEMORY should be larger than TOTAL_STACK, was " + Qa + "! (TOTAL_STACK=5242880)");
assert("undefined" !== typeof Int32Array && "undefined" !== typeof Float64Array && void 0 !== Int32Array.prototype.subarray && void 0 !== Int32Array.prototype.set, "JS engine does not provide full typed array support");
e.wasmMemory ? Aa = e.wasmMemory : Aa = new WebAssembly.Memory({initial:Qa / 65536});
Aa && (buffer = Aa.buffer);
Qa = buffer.byteLength;
assert(0 === Qa % 65536);
Pa();
r[ta >> 2] = 7151264;
function Ra() {
  var a = A[477097], b = A[477098];
  34821223 == a && 2310721022 == b || l("Stack overflow! Stack cookie has been overwritten, expected hex dwords 0x89BACDFE and 0x02135467, but received 0x" + b.toString(16) + " " + a.toString(16));
  1668509029 !== r[0] && l("Runtime error: The application has corrupted its heap memory area (address zero)!");
}
r[0] = 1668509029;
La[1] = 25459;
if (115 !== y[2] || 99 !== y[3]) {
  throw "Runtime error: expected the system to be little-endian!";
}
function Sa(a) {
  for (; 0 < a.length;) {
    var b = a.shift();
    if ("function" == typeof b) {
      b();
    } else {
      var c = b.ya;
      "number" === typeof c ? void 0 === b.ba ? e.dynCall_v(c) : e.dynCall_vi(c, b.ba) : c(void 0 === b.ba ? null : b.ba);
    }
  }
}
var Ta = [], Ua = [], Va = [], Wa = [], Xa = [], F = !1, G = !1;
function Ya() {
  var a = e.preRun.shift();
  Ta.unshift(a);
}
function Za(a, b) {
  return 0 <= a ? a : 32 >= b ? 2 * Math.abs(1 << b - 1) + a : Math.pow(2, b) + a;
}
function $a(a, b) {
  if (0 >= a) {
    return a;
  }
  var c = 32 >= b ? Math.abs(1 << b - 1) : Math.pow(2, b - 1);
  a >= c && (32 >= b || a > c) && (a = -2 * c + a);
  return a;
}
assert(Math.imul, "This browser does not support Math.imul(), build with LEGACY_VM_SUPPORT or POLYFILL_OLD_MATH_FUNCTIONS to add in a polyfill");
assert(Math.fround, "This browser does not support Math.fround(), build with LEGACY_VM_SUPPORT or POLYFILL_OLD_MATH_FUNCTIONS to add in a polyfill");
assert(Math.clz32, "This browser does not support Math.clz32(), build with LEGACY_VM_SUPPORT or POLYFILL_OLD_MATH_FUNCTIONS to add in a polyfill");
assert(Math.trunc, "This browser does not support Math.trunc(), build with LEGACY_VM_SUPPORT or POLYFILL_OLD_MATH_FUNCTIONS to add in a polyfill");
var ab = Math.abs, bb = Math.sqrt, cb = Math.ceil, db = Math.floor, eb = Math.min, fb = 0, gb = null, hb = null, ib = {};
function jb() {
  fb++;
  e.monitorRunDependencies && e.monitorRunDependencies(fb);
  assert(!ib["wasm-instantiate"]);
  ib["wasm-instantiate"] = 1;
  null === gb && "undefined" !== typeof setInterval && (gb = setInterval(function() {
    if (Ba) {
      clearInterval(gb), gb = null;
    } else {
      var a = !1, b;
      for (b in ib) {
        a || (a = !0, m("still waiting on run dependencies:")), m("dependency: " + b);
      }
      a && m("(end of list)");
    }
  }, 10000));
}
e.preloadedImages = {};
e.preloadedAudios = {};
function kb() {
  var a = lb;
  return String.prototype.startsWith ? a.startsWith("data:application/octet-stream;base64,") : 0 === a.indexOf("data:application/octet-stream;base64,");
}
var lb = "dbr-7.4.0.1.node.wasm";
if (!kb()) {
  var mb = lb;
  lb = e.locateFile ? e.locateFile(mb, ka) : ka + mb;
}
function nb() {
  try {
    if (za) {
      return new Uint8Array(za);
    }
    if (ma) {
      return ma(lb);
    }
    throw "both async and sync fetching of the wasm failed";
  } catch (a) {
    l(a);
  }
}
function ob() {
  return za || !ea && !fa || "function" !== typeof fetch ? new Promise(function(a) {
    a(nb());
  }) : fetch(lb, {credentials:"same-origin"}).then(function(a) {
    if (!a.ok) {
      throw "failed to load wasm binary file at '" + lb + "'";
    }
    return a.arrayBuffer();
  }).catch(function() {
    return nb();
  });
}
function pb(a) {
  function b(a) {
    e.asm = a.exports;
    fb--;
    e.monitorRunDependencies && e.monitorRunDependencies(fb);
    assert(ib["wasm-instantiate"]);
    delete ib["wasm-instantiate"];
    0 == fb && (null !== gb && (clearInterval(gb), gb = null), hb && (a = hb, hb = null, a()));
  }
  function c(a) {
    assert(e === g, "the Module object should not be replaced during async compilation - perhaps the order of HTML elements is wrong?");
    g = null;
    b(a.instance);
  }
  function d(a) {
    return ob().then(function(a) {
      return WebAssembly.instantiate(a, f);
    }).then(a, function(a) {
      m("failed to asynchronously prepare wasm: " + a);
      l(a);
    });
  }
  var f = {env:a};
  jb();
  var g = e;
  if (e.instantiateWasm) {
    try {
      return e.instantiateWasm(f, b);
    } catch (h) {
      return m("Module.instantiateWasm callback failed with error: " + h), !1;
    }
  }
  (function() {
    if (za || "function" !== typeof WebAssembly.instantiateStreaming || kb() || "function" !== typeof fetch) {
      return d(c);
    }
    fetch(lb, {credentials:"same-origin"}).then(function(a) {
      return WebAssembly.instantiateStreaming(a, f).then(c, function(a) {
        m("wasm streaming compile failed: " + a);
        m("falling back to ArrayBuffer instantiation");
        d(c);
      });
    });
  })();
  return {};
}
e.asm = function(a, b) {
  b.memory = Aa;
  b.table = new WebAssembly.Table({initial:8973, maximum:8973, element:"anyfunc"});
  a = pb(b);
  assert(a, "binaryen setup failed (no wasm support?)");
  return a;
};
var H, qb;
Ua.push({ya:function() {
  rb();
}});
function sb(a) {
  va("warning: build with  -s DEMANGLE_SUPPORT=1  to link in libcxxabi demangling");
  return a;
}
function tb(a) {
  return a.replace(/_Z[\w\d_]+/g, function(a) {
    var b = sb(a);
    return a === b ? a : b + " [" + a + "]";
  });
}
function ub() {
  var a = Error();
  if (!a.stack) {
    try {
      throw Error(0);
    } catch (b) {
      a = b;
    }
    if (!a.stack) {
      return "(no stack trace available)";
    }
  }
  return a.stack.toString();
}
function vb() {
  var a = ub();
  e.extraStackTrace && (a += "\n" + e.extraStackTrace());
  return tb(a);
}
var I = {};
function wb(a) {
  if (wb.s) {
    var b = r[a >> 2];
    var c = r[b >> 2];
  } else {
    wb.s = !0, I.USER = I.LOGNAME = "web_user", I.PATH = "/", I.PWD = "/", I.HOME = "/home/web_user", I.LANG = "C.UTF-8", I.LANG = ("object" === typeof navigator && navigator.languages && navigator.languages[0] || "C").replace("-", "_") + ".UTF-8", I._ = ca, c = F ? Da(1024) : sa(1024), b = F ? Da(256) : sa(256), r[b >> 2] = c, r[a >> 2] = b;
  }
  a = [];
  var d = 0, f;
  for (f in I) {
    if ("string" === typeof I[f]) {
      var g = f + "=" + I[f];
      a.push(g);
      d += g.length;
    }
  }
  if (1024 < d) {
    throw Error("Environment size exceeded TOTAL_ENV_SIZE!");
  }
  for (f = 0; f < a.length; f++) {
    d = g = a[f];
    for (var h = c, k = 0; k < d.length; ++k) {
      assert(d.charCodeAt(k) === d.charCodeAt(k) & 255), t[h++ >> 0] = d.charCodeAt(k);
    }
    t[h >> 0] = 0;
    r[b + 4 * f >> 2] = c;
    c += g.length + 1;
  }
  r[b + 4 * a.length >> 2] = 0;
}
function xb(a, b) {
  va("atexit() called, but EXIT_RUNTIME is not set, so atexits() will not be called. set EXIT_RUNTIME to 1 (see the FAQ)");
  Wa.unshift({ya:a, ba:b});
}
function yb(a) {
  e.___errno_location ? r[e.___errno_location() >> 2] = a : m("failed to set errno from JS");
  return a;
}
function zb(a, b) {
  for (var c = 0, d = a.length - 1; 0 <= d; d--) {
    var f = a[d];
    "." === f ? a.splice(d, 1) : ".." === f ? (a.splice(d, 1), c++) : c && (a.splice(d, 1), c--);
  }
  if (b) {
    for (; c; c--) {
      a.unshift("..");
    }
  }
  return a;
}
function Ab(a) {
  var b = "/" === a.charAt(0), c = "/" === a.substr(-1);
  (a = zb(a.split("/").filter(function(a) {
    return !!a;
  }), !b).join("/")) || b || (a = ".");
  a && c && (a += "/");
  return (b ? "/" : "") + a;
}
function Bb(a) {
  var b = /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/.exec(a).slice(1);
  a = b[0];
  b = b[1];
  if (!a && !b) {
    return ".";
  }
  b && (b = b.substr(0, b.length - 1));
  return a + b;
}
function Cb(a) {
  if ("/" === a) {
    return "/";
  }
  var b = a.lastIndexOf("/");
  return -1 === b ? a : a.substr(b + 1);
}
function Db() {
  var a = Array.prototype.slice.call(arguments, 0);
  return Ab(a.join("/"));
}
function Eb(a, b) {
  return Ab(a + "/" + b);
}
function Fb() {
  for (var a = "", b = !1, c = arguments.length - 1; -1 <= c && !b; c--) {
    b = 0 <= c ? arguments[c] : "/";
    if ("string" !== typeof b) {
      throw new TypeError("Arguments to path.resolve must be strings");
    }
    if (!b) {
      return "";
    }
    a = b + "/" + a;
    b = "/" === b.charAt(0);
  }
  a = zb(a.split("/").filter(function(a) {
    return !!a;
  }), !b).join("/");
  return (b ? "/" : "") + a || ".";
}
var Gb = [];
function Hb(a, b) {
  Gb[a] = {input:[], output:[], U:b};
  Ib(a, Jb);
}
var Jb = {open:function(a) {
  var b = Gb[a.node.rdev];
  if (!b) {
    throw new J(19);
  }
  a.tty = b;
  a.seekable = !1;
}, close:function(a) {
  a.tty.U.flush(a.tty);
}, flush:function(a) {
  a.tty.U.flush(a.tty);
}, read:function(a, b, c, d) {
  if (!a.tty || !a.tty.U.Aa) {
    throw new J(6);
  }
  for (var f = 0, g = 0; g < d; g++) {
    try {
      var h = a.tty.U.Aa(a.tty);
    } catch (k) {
      throw new J(5);
    }
    if (void 0 === h && 0 === f) {
      throw new J(11);
    }
    if (null === h || void 0 === h) {
      break;
    }
    f++;
    b[c + g] = h;
  }
  f && (a.node.timestamp = Date.now());
  return f;
}, write:function(a, b, c, d) {
  if (!a.tty || !a.tty.U.na) {
    throw new J(6);
  }
  try {
    for (var f = 0; f < d; f++) {
      a.tty.U.na(a.tty, b[c + f]);
    }
  } catch (g) {
    throw new J(5);
  }
  d && (a.node.timestamp = Date.now());
  return f;
}}, Lb = {Aa:function(a) {
  if (!a.input.length) {
    var b = null;
    if (ha) {
      var c = Buffer.s ? Buffer.s(256) : new Buffer(256), d = 0, f = process.stdin.fd;
      if ("win32" != process.platform) {
        var g = !1;
        try {
          f = fs.openSync("/dev/stdin", "r"), g = !0;
        } catch (h) {
        }
      }
      try {
        d = fs.readSync(f, c, 0, 256, null);
      } catch (h) {
        if (-1 != h.toString().indexOf("EOF")) {
          d = 0;
        } else {
          throw h;
        }
      }
      g && fs.closeSync(f);
      0 < d ? b = c.slice(0, d).toString("utf-8") : b = null;
    } else {
      "undefined" != typeof window && "function" == typeof window.prompt ? (b = window.prompt("Input: "), null !== b && (b += "\n")) : "function" == typeof readline && (b = readline(), null !== b && (b += "\n"));
    }
    if (!b) {
      return null;
    }
    a.input = Kb(b, !0);
  }
  return a.input.shift();
}, na:function(a, b) {
  null === b || 10 === b ? (ra(Fa(a.output, 0)), a.output = []) : 0 != b && a.output.push(b);
}, flush:function(a) {
  a.output && 0 < a.output.length && (ra(Fa(a.output, 0)), a.output = []);
}}, Mb = {na:function(a, b) {
  null === b || 10 === b ? (m(Fa(a.output, 0)), a.output = []) : 0 != b && a.output.push(b);
}, flush:function(a) {
  a.output && 0 < a.output.length && (m(Fa(a.output, 0)), a.output = []);
}}, K = {G:null, v:function() {
  return K.createNode(null, "/", 16895, 0);
}, createNode:function(a, b, c, d) {
  if (24576 === (c & 61440) || 4096 === (c & 61440)) {
    throw new J(1);
  }
  K.G || (K.G = {dir:{node:{I:K.f.I, C:K.f.C, lookup:K.f.lookup, X:K.f.X, rename:K.f.rename, unlink:K.f.unlink, rmdir:K.f.rmdir, readdir:K.f.readdir, symlink:K.f.symlink}, stream:{K:K.g.K}}, file:{node:{I:K.f.I, C:K.f.C}, stream:{K:K.g.K, read:K.g.read, write:K.g.write, qa:K.g.qa, Ba:K.g.Ba, ga:K.g.ga}}, link:{node:{I:K.f.I, C:K.f.C, readlink:K.f.readlink}, stream:{}}, sa:{node:{I:K.f.I, C:K.f.C}, stream:Nb}});
  c = Ob(a, b, c, d);
  L(c.mode) ? (c.f = K.G.dir.node, c.g = K.G.dir.stream, c.c = {}) : 32768 === (c.mode & 61440) ? (c.f = K.G.file.node, c.g = K.G.file.stream, c.l = 0, c.c = null) : 40960 === (c.mode & 61440) ? (c.f = K.G.link.node, c.g = K.G.link.stream) : 8192 === (c.mode & 61440) && (c.f = K.G.sa.node, c.g = K.G.sa.stream);
  c.timestamp = Date.now();
  a && (a.c[b] = c);
  return c;
}, xd:function(a) {
  if (a.c && a.c.subarray) {
    for (var b = [], c = 0; c < a.l; ++c) {
      b.push(a.c[c]);
    }
    return b;
  }
  return a.c;
}, yd:function(a) {
  return a.c ? a.c.subarray ? a.c.subarray(0, a.l) : new Uint8Array(a.c) : new Uint8Array;
}, ua:function(a, b) {
  var c = a.c ? a.c.length : 0;
  c >= b || (b = Math.max(b, c * (1048576 > c ? 2.0 : 1.125) | 0), 0 != c && (b = Math.max(b, 256)), c = a.c, a.c = new Uint8Array(b), 0 < a.l && a.c.set(c.subarray(0, a.l), 0));
}, Wa:function(a, b) {
  if (a.l != b) {
    if (0 == b) {
      a.c = null, a.l = 0;
    } else {
      if (!a.c || a.c.subarray) {
        var c = a.c;
        a.c = new Uint8Array(new ArrayBuffer(b));
        c && a.c.set(c.subarray(0, Math.min(b, a.l)));
      } else {
        if (a.c || (a.c = []), a.c.length > b) {
          a.c.length = b;
        } else {
          for (; a.c.length < b;) {
            a.c.push(0);
          }
        }
      }
      a.l = b;
    }
  }
}, f:{I:function(a) {
  var b = {};
  b.dev = 8192 === (a.mode & 61440) ? a.id : 1;
  b.ino = a.id;
  b.mode = a.mode;
  b.nlink = 1;
  b.uid = 0;
  b.gid = 0;
  b.rdev = a.rdev;
  L(a.mode) ? b.size = 4096 : 32768 === (a.mode & 61440) ? b.size = a.l : 40960 === (a.mode & 61440) ? b.size = a.link.length : b.size = 0;
  b.atime = new Date(a.timestamp);
  b.mtime = new Date(a.timestamp);
  b.ctime = new Date(a.timestamp);
  b.L = 4096;
  b.blocks = Math.ceil(b.size / b.L);
  return b;
}, C:function(a, b) {
  void 0 !== b.mode && (a.mode = b.mode);
  void 0 !== b.timestamp && (a.timestamp = b.timestamp);
  void 0 !== b.size && K.Wa(a, b.size);
}, lookup:function() {
  throw Pb[2];
}, X:function(a, b, c, d) {
  return K.createNode(a, b, c, d);
}, rename:function(a, b, c) {
  if (L(a.mode)) {
    try {
      var d = Qb(b, c);
    } catch (g) {
    }
    if (d) {
      for (var f in d.c) {
        throw new J(39);
      }
    }
  }
  delete a.parent.c[a.name];
  a.name = c;
  b.c[c] = a;
  a.parent = b;
}, unlink:function(a, b) {
  delete a.c[b];
}, rmdir:function(a, b) {
  var c = Qb(a, b), d;
  for (d in c.c) {
    throw new J(39);
  }
  delete a.c[b];
}, readdir:function(a) {
  var b = [".", ".."], c;
  for (c in a.c) {
    a.c.hasOwnProperty(c) && b.push(c);
  }
  return b;
}, symlink:function(a, b, c) {
  a = K.createNode(a, b, 41471, 0);
  a.link = c;
  return a;
}, readlink:function(a) {
  if (40960 !== (a.mode & 61440)) {
    throw new J(22);
  }
  return a.link;
}}, g:{read:function(a, b, c, d, f) {
  var g = a.node.c;
  if (f >= a.node.l) {
    return 0;
  }
  a = Math.min(a.node.l - f, d);
  assert(0 <= a);
  if (8 < a && g.subarray) {
    b.set(g.subarray(f, f + a), c);
  } else {
    for (d = 0; d < a; d++) {
      b[c + d] = g[f + d];
    }
  }
  return a;
}, write:function(a, b, c, d, f, g) {
  g && va("file packager has copied file data into memory, but in memory growth we are forced to copy it again (see --no-heap-copy)");
  g = !1;
  if (!d) {
    return 0;
  }
  a = a.node;
  a.timestamp = Date.now();
  if (b.subarray && (!a.c || a.c.subarray)) {
    if (g) {
      return assert(0 === f, "canOwn must imply no weird position inside the file"), a.c = b.subarray(c, c + d), a.l = d;
    }
    if (0 === a.l && 0 === f) {
      return a.c = new Uint8Array(b.subarray(c, c + d)), a.l = d;
    }
    if (f + d <= a.l) {
      return a.c.set(b.subarray(c, c + d), f), d;
    }
  }
  K.ua(a, f + d);
  if (a.c.subarray && b.subarray) {
    a.c.set(b.subarray(c, c + d), f);
  } else {
    for (g = 0; g < d; g++) {
      a.c[f + g] = b[c + g];
    }
  }
  a.l = Math.max(a.l, f + d);
  return d;
}, K:function(a, b, c) {
  1 === c ? b += a.position : 2 === c && 32768 === (a.node.mode & 61440) && (b += a.node.l);
  if (0 > b) {
    throw new J(22);
  }
  return b;
}, qa:function(a, b, c) {
  K.ua(a.node, b + c);
  a.node.l = Math.max(a.node.l, b + c);
}, Ba:function(a, b, c, d, f, g, h) {
  if (32768 !== (a.node.mode & 61440)) {
    throw new J(19);
  }
  c = a.node.c;
  if (h & 2 || c.buffer !== b && c.buffer !== b.buffer) {
    if (0 < f || f + d < a.node.l) {
      c.subarray ? c = c.subarray(f, f + d) : c = Array.prototype.slice.call(c, f, f + d);
    }
    a = !0;
    f = b.buffer == t.buffer;
    d = Da(d);
    if (!d) {
      throw new J(12);
    }
    (f ? t : b).set(c, d);
  } else {
    a = !1, d = c.byteOffset;
  }
  return {j:d, Ea:a};
}, ga:function(a, b, c, d, f) {
  if (32768 !== (a.node.mode & 61440)) {
    throw new J(19);
  }
  if (f & 2) {
    return 0;
  }
  K.g.write(a, b, 0, d, c, !1);
  return 0;
}}}, M = {fa:!1, Za:function() {
  M.fa = !!process.platform.match(/^win/);
  var a = process.binding("constants");
  a.fs && (a = a.fs);
  M.va = {1024:a.O_APPEND, 64:a.O_CREAT, 128:a.O_EXCL, 0:a.O_RDONLY, 2:a.O_RDWR, 4096:a.O_SYNC, 512:a.O_TRUNC, 1:a.O_WRONLY};
}, ra:function(a) {
  return Buffer.s ? Buffer.from(a) : new Buffer(a);
}, v:function(a) {
  assert(ia);
  return M.createNode(null, "/", M.za(a.ma.root), 0);
}, createNode:function(a, b, c) {
  if (!L(c) && 32768 !== (c & 61440) && 40960 !== (c & 61440)) {
    throw new J(22);
  }
  a = Ob(a, b, c);
  a.f = M.f;
  a.g = M.g;
  return a;
}, za:function(a) {
  try {
    var b = fs.lstatSync(a);
    M.fa && (b.mode = b.mode | (b.mode & 292) >> 2);
  } catch (c) {
    if (!c.code) {
      throw c;
    }
    throw new J(-c.i);
  }
  return b.mode;
}, A:function(a) {
  for (var b = []; a.parent !== a;) {
    b.push(a.name), a = a.parent;
  }
  b.push(a.v.ma.root);
  b.reverse();
  return Db.apply(null, b);
}, Ia:function(a) {
  a &= -2656257;
  var b = 0, c;
  for (c in M.va) {
    a & c && (b |= M.va[c], a ^= c);
  }
  if (a) {
    throw new J(22);
  }
  return b;
}, f:{I:function(a) {
  a = M.A(a);
  try {
    var b = fs.lstatSync(a);
  } catch (c) {
    if (!c.code) {
      throw c;
    }
    throw new J(-c.i);
  }
  M.fa && !b.L && (b.L = 4096);
  M.fa && !b.blocks && (b.blocks = (b.size + b.L - 1) / b.L | 0);
  return {dev:b.dev, ino:b.ino, mode:b.mode, nlink:b.nlink, uid:b.uid, gid:b.gid, rdev:b.rdev, size:b.size, atime:b.atime, mtime:b.mtime, ctime:b.ctime, L:b.L, blocks:b.blocks};
}, C:function(a, b) {
  var c = M.A(a);
  try {
    void 0 !== b.mode && (fs.chmodSync(c, b.mode), a.mode = b.mode), void 0 !== b.size && fs.truncateSync(c, b.size);
  } catch (d) {
    if (!d.code) {
      throw d;
    }
    throw new J(-d.i);
  }
}, lookup:function(a, b) {
  var c = Eb(M.A(a), b);
  c = M.za(c);
  return M.createNode(a, b, c);
}, X:function(a, b, c, d) {
  a = M.createNode(a, b, c, d);
  b = M.A(a);
  try {
    L(a.mode) ? fs.mkdirSync(b, a.mode) : fs.writeFileSync(b, "", {mode:a.mode});
  } catch (f) {
    if (!f.code) {
      throw f;
    }
    throw new J(-f.i);
  }
  return a;
}, rename:function(a, b, c) {
  a = M.A(a);
  b = Eb(M.A(b), c);
  try {
    fs.renameSync(a, b);
  } catch (d) {
    if (!d.code) {
      throw d;
    }
    throw new J(-d.i);
  }
}, unlink:function(a, b) {
  a = Eb(M.A(a), b);
  try {
    fs.unlinkSync(a);
  } catch (c) {
    if (!c.code) {
      throw c;
    }
    throw new J(-c.i);
  }
}, rmdir:function(a, b) {
  a = Eb(M.A(a), b);
  try {
    fs.rmdirSync(a);
  } catch (c) {
    if (!c.code) {
      throw c;
    }
    throw new J(-c.i);
  }
}, readdir:function(a) {
  a = M.A(a);
  try {
    return fs.readdirSync(a);
  } catch (b) {
    if (!b.code) {
      throw b;
    }
    throw new J(-b.i);
  }
}, symlink:function(a, b, c) {
  a = Eb(M.A(a), b);
  try {
    fs.symlinkSync(c, a);
  } catch (d) {
    if (!d.code) {
      throw d;
    }
    throw new J(-d.i);
  }
}, readlink:function(a) {
  var b = M.A(a);
  try {
    return b = fs.readlinkSync(b), b = Rb.relative(Rb.resolve(a.v.ma.root), b);
  } catch (c) {
    if (!c.code) {
      throw c;
    }
    throw new J(-c.i);
  }
}}, g:{open:function(a) {
  var b = M.A(a.node);
  try {
    32768 === (a.node.mode & 61440) && (a.Y = fs.openSync(b, M.Ia(a.flags)));
  } catch (c) {
    if (!c.code) {
      throw c;
    }
    throw new J(-c.i);
  }
}, close:function(a) {
  try {
    32768 === (a.node.mode & 61440) && a.Y && fs.closeSync(a.Y);
  } catch (b) {
    if (!b.code) {
      throw b;
    }
    throw new J(-b.i);
  }
}, read:function(a, b, c, d, f) {
  if (0 === d) {
    return 0;
  }
  try {
    return fs.readSync(a.Y, M.ra(b.buffer), c, d, f);
  } catch (g) {
    throw new J(-g.i);
  }
}, write:function(a, b, c, d, f) {
  try {
    return fs.writeSync(a.Y, M.ra(b.buffer), c, d, f);
  } catch (g) {
    throw new J(-g.i);
  }
}, K:function(a, b, c) {
  if (1 === c) {
    b += a.position;
  } else {
    if (2 === c && 32768 === (a.node.mode & 61440)) {
      try {
        b += fs.fstatSync(a.Y).size;
      } catch (d) {
        throw new J(-d.i);
      }
    }
  }
  if (0 > b) {
    throw new J(22);
  }
  return b;
}}}, Sb = {0:"Success", 1:"Not super-user", 2:"No such file or directory", 3:"No such process", 4:"Interrupted system call", 5:"I/O error", 6:"No such device or address", 7:"Arg list too long", 8:"Exec format error", 9:"Bad file number", 10:"No children", 11:"No more processes", 12:"Not enough core", 13:"Permission denied", 14:"Bad address", 15:"Block device required", 16:"Mount device busy", 17:"File exists", 18:"Cross-device link", 19:"No such device", 20:"Not a directory", 21:"Is a directory", 
22:"Invalid argument", 23:"Too many open files in system", 24:"Too many open files", 25:"Not a typewriter", 26:"Text file busy", 27:"File too large", 28:"No space left on device", 29:"Illegal seek", 30:"Read only file system", 31:"Too many links", 32:"Broken pipe", 33:"Math arg out of domain of func", 34:"Math result not representable", 35:"File locking deadlock error", 36:"File or path name too long", 37:"No record locks available", 38:"Function not implemented", 39:"Directory not empty", 40:"Too many symbolic links", 
42:"No message of desired type", 43:"Identifier removed", 44:"Channel number out of range", 45:"Level 2 not synchronized", 46:"Level 3 halted", 47:"Level 3 reset", 48:"Link number out of range", 49:"Protocol driver not attached", 50:"No CSI structure available", 51:"Level 2 halted", 52:"Invalid exchange", 53:"Invalid request descriptor", 54:"Exchange full", 55:"No anode", 56:"Invalid request code", 57:"Invalid slot", 59:"Bad font file fmt", 60:"Device not a stream", 61:"No data (for no delay io)", 
62:"Timer expired", 63:"Out of streams resources", 64:"Machine is not on the network", 65:"Package not installed", 66:"The object is remote", 67:"The link has been severed", 68:"Advertise error", 69:"Srmount error", 70:"Communication error on send", 71:"Protocol error", 72:"Multihop attempted", 73:"Cross mount point (not really error)", 74:"Trying to read unreadable message", 75:"Value too large for defined data type", 76:"Given log. name not unique", 77:"f.d. invalid for this operation", 78:"Remote address changed", 
79:"Can   access a needed shared lib", 80:"Accessing a corrupted shared lib", 81:".lib section in a.out corrupted", 82:"Attempting to link in too many libs", 83:"Attempting to exec a shared library", 84:"Illegal byte sequence", 86:"Streams pipe error", 87:"Too many users", 88:"Socket operation on non-socket", 89:"Destination address required", 90:"Message too long", 91:"Protocol wrong type for socket", 92:"Protocol not available", 93:"Unknown protocol", 94:"Socket type not supported", 95:"Not supported", 
96:"Protocol family not supported", 97:"Address family not supported by protocol family", 98:"Address already in use", 99:"Address not available", 100:"Network interface is not configured", 101:"Network is unreachable", 102:"Connection reset by network", 103:"Connection aborted", 104:"Connection reset by peer", 105:"No buffer space available", 106:"Socket is already connected", 107:"Socket is not connected", 108:"Can't send after socket shutdown", 109:"Too many references", 110:"Connection timed out", 
111:"Connection refused", 112:"Host is down", 113:"Host is unreachable", 114:"Socket already connected", 115:"Connection already in progress", 116:"Stale file handle", 122:"Quota exceeded", 123:"No medium (in tape drive)", 125:"Operation canceled", 130:"Previous owner died", 131:"State not recoverable"}, Tb = {Wc:1, vc:2, kd:3, Rb:4, Tb:5, Sc:6, fb:7, wc:8, ob:9, xb:10, lb:11, ud:11, Ac:12, gb:13, Kb:14, Jc:15, vb:16, Jb:17, vd:18, uc:19, Lc:20, Vb:21, Sb:22, pc:23, hc:24, Qc:25, rd:26, Lb:27, Fc:28, 
jd:29, ed:30, ic:31, Yc:32, Gb:33, bd:34, Bc:42, Ob:43, yb:44, Xb:45, Yb:46, Zb:47, ec:48, sd:49, sc:50, Wb:51, Db:35, xc:37, nb:52, rb:53, wd:54, qc:55, sb:56, tb:57, Eb:35, ub:59, Hc:60, tc:61, od:62, Gc:63, Cc:64, Dc:65, dd:66, yc:67, jb:68, ld:69, zb:70, Zc:71, kc:72, Hb:73, qb:74, Rc:76, pb:77, cd:78, $b:79, ac:80, dc:81, cc:82, bc:83, Ic:38, Mc:39, lc:36, fc:40, Tc:95, Xc:96, Cb:104, rc:105, kb:97, ad:91, Oc:88, Ec:92, gd:108, Bb:111, hb:98, Ab:103, oc:101, mc:100, pd:110, Mb:112, Nb:113, Qb:115, 
mb:114, Fb:89, jc:90, $c:93, hd:94, ib:99, nc:102, Ub:106, Kc:107, qd:109, td:87, Ib:122, md:116, Pc:95, zc:123, Pb:84, Uc:75, wb:125, Nc:131, Vc:130, nd:86}, Ub = null, Vb = {}, Wb = [], Xb = 1, Yb = null, Zb = !0, N = {}, J = null, Pb = {};
function O(a, b) {
  a = Fb("/", a);
  b = b || {};
  if (!a) {
    return {path:"", node:null};
  }
  var c = {wa:!0, oa:0}, d;
  for (d in c) {
    void 0 === b[d] && (b[d] = c[d]);
  }
  if (8 < b.oa) {
    throw new J(40);
  }
  a = zb(a.split("/").filter(function(a) {
    return !!a;
  }), !1);
  var f = Ub;
  c = "/";
  for (d = 0; d < a.length; d++) {
    var g = d === a.length - 1;
    if (g && b.parent) {
      break;
    }
    f = Qb(f, a[d]);
    c = Eb(c, a[d]);
    f.S && (!g || g && b.wa) && (f = f.S.root);
    if (!g || b.W) {
      for (g = 0; 40960 === (f.mode & 61440);) {
        if (f = $b(c), c = Fb(Bb(c), f), f = O(c, {oa:b.oa}).node, 40 < g++) {
          throw new J(40);
        }
      }
    }
  }
  return {path:c, node:f};
}
function ac(a) {
  for (var b;;) {
    if (a === a.parent) {
      return a = a.v.Ca, b ? "/" !== a[a.length - 1] ? a + "/" + b : a + b : a;
    }
    b = b ? a.name + "/" + b : a.name;
    a = a.parent;
  }
}
function bc(a, b) {
  for (var c = 0, d = 0; d < b.length; d++) {
    c = (c << 5) - c + b.charCodeAt(d) | 0;
  }
  return (a + c >>> 0) % Yb.length;
}
function cc(a) {
  var b = bc(a.parent.id, a.name);
  a.T = Yb[b];
  Yb[b] = a;
}
function dc(a) {
  var b = bc(a.parent.id, a.name);
  if (Yb[b] === a) {
    Yb[b] = a.T;
  } else {
    for (b = Yb[b]; b;) {
      if (b.T === a) {
        b.T = a.T;
        break;
      }
      b = b.T;
    }
  }
}
function Qb(a, b) {
  var c;
  if (c = (c = ec(a, "x")) ? c : a.f.lookup ? 0 : 13) {
    throw new J(c, a);
  }
  for (c = Yb[bc(a.id, b)]; c; c = c.T) {
    var d = c.name;
    if (c.parent.id === a.id && d === b) {
      return c;
    }
  }
  return a.f.lookup(a, b);
}
function Ob(a, b, c, d) {
  fc || (fc = function(a, b, c, d) {
    a || (a = this);
    this.parent = a;
    this.v = a.v;
    this.S = null;
    this.id = Xb++;
    this.name = b;
    this.mode = c;
    this.f = {};
    this.g = {};
    this.rdev = d;
  }, fc.prototype = {}, Object.defineProperties(fc.prototype, {read:{get:function() {
    return 365 === (this.mode & 365);
  }, set:function(a) {
    a ? this.mode |= 365 : this.mode &= -366;
  }}, write:{get:function() {
    return 146 === (this.mode & 146);
  }, set:function(a) {
    a ? this.mode |= 146 : this.mode &= -147;
  }}}));
  a = new fc(a, b, c, d);
  cc(a);
  return a;
}
function L(a) {
  return 16384 === (a & 61440);
}
var hc = {r:0, rs:1052672, "r+":2, w:577, wx:705, xw:705, "w+":578, "wx+":706, "xw+":706, a:1089, ax:1217, xa:1217, "a+":1090, "ax+":1218, "xa+":1218};
function ic(a) {
  var b = ["r", "w", "rw"][a & 3];
  a & 512 && (b += "w");
  return b;
}
function ec(a, b) {
  if (Zb) {
    return 0;
  }
  if (-1 === b.indexOf("r") || a.mode & 292) {
    if (-1 !== b.indexOf("w") && !(a.mode & 146) || -1 !== b.indexOf("x") && !(a.mode & 73)) {
      return 13;
    }
  } else {
    return 13;
  }
  return 0;
}
function jc(a, b) {
  try {
    return Qb(a, b), 17;
  } catch (c) {
  }
  return ec(a, "wx");
}
function kc(a, b, c) {
  try {
    var d = Qb(a, b);
  } catch (f) {
    return f.i;
  }
  if (a = ec(a, "wx")) {
    return a;
  }
  if (c) {
    if (!L(d.mode)) {
      return 20;
    }
    if (d === d.parent || "/" === ac(d)) {
      return 16;
    }
  } else {
    if (L(d.mode)) {
      return 21;
    }
  }
  return 0;
}
function lc(a) {
  var b = 4096;
  for (a = a || 0; a <= b; a++) {
    if (!Wb[a]) {
      return a;
    }
  }
  throw new J(24);
}
function mc(a, b) {
  nc || (nc = function() {
  }, nc.prototype = {}, Object.defineProperties(nc.prototype, {object:{get:function() {
    return this.node;
  }, set:function(a) {
    this.node = a;
  }}}));
  var c = new nc, d;
  for (d in a) {
    c[d] = a[d];
  }
  a = c;
  b = lc(b);
  a.fd = b;
  return Wb[b] = a;
}
var Nb = {open:function(a) {
  a.g = Vb[a.node.rdev].g;
  a.g.open && a.g.open(a);
}, K:function() {
  throw new J(29);
}};
function Ib(a, b) {
  Vb[a] = {g:b};
}
function oc(a, b) {
  var c = "/" === b, d = !b;
  if (c && Ub) {
    throw new J(16);
  }
  if (!c && !d) {
    var f = O(b, {wa:!1});
    b = f.path;
    f = f.node;
    if (f.S) {
      throw new J(16);
    }
    if (!L(f.mode)) {
      throw new J(20);
    }
  }
  b = {type:a, ma:{}, Ca:b, Oa:[]};
  a = a.v(b);
  a.v = b;
  b.root = a;
  c ? Ub = a : f && (f.S = b, f.v && f.v.Oa.push(b));
}
function pc(a, b, c) {
  var d = O(a, {parent:!0}).node;
  a = Cb(a);
  if (!a || "." === a || ".." === a) {
    throw new J(22);
  }
  var f = jc(d, a);
  if (f) {
    throw new J(f);
  }
  if (!d.f.X) {
    throw new J(1);
  }
  return d.f.X(d, a, b, c);
}
function qc(a) {
  pc(a, 16895, 0);
}
function rc(a, b, c) {
  "undefined" === typeof c && (c = b, b = 438);
  pc(a, b | 8192, c);
}
function sc(a, b) {
  if (!Fb(a)) {
    throw new J(2);
  }
  var c = O(b, {parent:!0}).node;
  if (!c) {
    throw new J(2);
  }
  b = Cb(b);
  var d = jc(c, b);
  if (d) {
    throw new J(d);
  }
  if (!c.f.symlink) {
    throw new J(1);
  }
  c.f.symlink(c, b, a);
}
function $b(a) {
  a = O(a).node;
  if (!a) {
    throw new J(2);
  }
  if (!a.f.readlink) {
    throw new J(22);
  }
  return Fb(ac(a.parent), a.f.readlink(a));
}
function tc(a, b, c, d) {
  if ("" === a) {
    throw new J(2);
  }
  if ("string" === typeof b) {
    var f = hc[b];
    if ("undefined" === typeof f) {
      throw Error("Unknown file open mode: " + b);
    }
    b = f;
  }
  c = b & 64 ? ("undefined" === typeof c ? 438 : c) & 4095 | 32768 : 0;
  if ("object" === typeof a) {
    var g = a;
  } else {
    a = Ab(a);
    try {
      g = O(a, {W:!(b & 131072)}).node;
    } catch (k) {
    }
  }
  f = !1;
  if (b & 64) {
    if (g) {
      if (b & 128) {
        throw new J(17);
      }
    } else {
      g = pc(a, c, 0), f = !0;
    }
  }
  if (!g) {
    throw new J(2);
  }
  8192 === (g.mode & 61440) && (b &= -513);
  if (b & 65536 && !L(g.mode)) {
    throw new J(20);
  }
  if (!f && (c = g ? 40960 === (g.mode & 61440) ? 40 : L(g.mode) && ("r" !== ic(b) || b & 512) ? 21 : ec(g, ic(b)) : 2)) {
    throw new J(c);
  }
  if (b & 512) {
    c = g;
    var h;
    "string" === typeof c ? h = O(c, {W:!0}).node : h = c;
    if (!h.f.C) {
      throw new J(1);
    }
    if (L(h.mode)) {
      throw new J(21);
    }
    if (32768 !== (h.mode & 61440)) {
      throw new J(22);
    }
    if (c = ec(h, "w")) {
      throw new J(c);
    }
    h.f.C(h, {size:0, timestamp:Date.now()});
  }
  b &= -641;
  d = mc({node:g, path:ac(g), flags:b, seekable:!0, position:0, g:g.g, eb:[], error:!1}, d);
  d.g.open && d.g.open(d);
  !e.logReadFiles || b & 1 || (uc || (uc = {}), a in uc || (uc[a] = 1, console.log("FS.trackingDelegate error on read file: " + a)));
  try {
    N.onOpenFile && (g = 0, 1 !== (b & 2097155) && (g |= 1), 0 !== (b & 2097155) && (g |= 2), N.onOpenFile(a, g));
  } catch (k) {
    console.log("FS.trackingDelegate['onOpenFile']('" + a + "', flags) threw an exception: " + k.message);
  }
  return d;
}
function vc(a, b, c) {
  if (null === a.fd) {
    throw new J(9);
  }
  if (!a.seekable || !a.g.K) {
    throw new J(29);
  }
  if (0 != c && 1 != c && 2 != c) {
    throw new J(22);
  }
  a.position = a.g.K(a, b, c);
  a.eb = [];
  return a.position;
}
function wc() {
  J || (J = function(a, b) {
    this.node = b;
    this.Xa = function(a) {
      this.i = a;
      for (var b in Tb) {
        if (Tb[b] === a) {
          this.code = b;
          break;
        }
      }
    };
    this.Xa(a);
    this.message = Sb[a];
    this.stack && Object.defineProperty(this, "stack", {value:Error().stack, writable:!0});
    this.stack && (this.stack = tb(this.stack));
  }, J.prototype = Error(), J.prototype.constructor = J, [2].forEach(function(a) {
    Pb[a] = new J(a);
    Pb[a].stack = "<generic error, no stack>";
  }));
}
var xc;
function yc(a, b) {
  var c = 0;
  a && (c |= 365);
  b && (c |= 146);
  return c;
}
function zc(a, b, c) {
  a = Eb("/dev", a);
  var d = yc(!!b, !!c);
  Ac || (Ac = 64);
  var f = Ac++ << 8 | 0;
  Ib(f, {open:function(a) {
    a.seekable = !1;
  }, close:function() {
    c && c.buffer && c.buffer.length && c(10);
  }, read:function(a, c, d, f) {
    for (var g = 0, h = 0; h < f; h++) {
      try {
        var k = b();
      } catch (C) {
        throw new J(5);
      }
      if (void 0 === k && 0 === g) {
        throw new J(11);
      }
      if (null === k || void 0 === k) {
        break;
      }
      g++;
      c[d + h] = k;
    }
    g && (a.node.timestamp = Date.now());
    return g;
  }, write:function(a, b, d, f) {
    for (var g = 0; g < f; g++) {
      try {
        c(b[d + g]);
      } catch (v) {
        throw new J(5);
      }
    }
    f && (a.node.timestamp = Date.now());
    return g;
  }});
  rc(a, d, f);
}
var Ac, P = {}, fc, nc, uc, Bc = {}, Q = 0;
function R() {
  Q += 4;
  return r[Q - 4 >> 2];
}
function Cc() {
  var a = Wb[R()];
  if (!a) {
    throw new J(9);
  }
  return a;
}
function Dc(a, b) {
  if (-1 === a || 0 === b) {
    return -22;
  }
  var c = Bc[a];
  if (!c) {
    return 0;
  }
  if (b === c.Ad) {
    var d = Wb[c.fd], f = c.flags, g = new Uint8Array(y.subarray(a, a + b));
    d && d.g.ga && d.g.ga(d, g, 0, b, f);
    Bc[a] = null;
    c.Ea && S(c.Bd);
  }
  return 0;
}
function Ec(a) {
  switch(a) {
    case 1:
      return 0;
    case 2:
      return 1;
    case 4:
      return 2;
    case 8:
      return 3;
    default:
      throw new TypeError("Unknown type size: " + a);
  }
}
function Fc() {
  for (var a = Array(256), b = 0; 256 > b; ++b) {
    a[b] = String.fromCharCode(b);
  }
  Gc = a;
}
var Gc = void 0;
function T(a) {
  for (var b = ""; y[a];) {
    b += Gc[y[a++]];
  }
  return b;
}
var Hc = {}, Ic = {}, Jc = {};
function Kc(a) {
  if (void 0 === a) {
    return "_unknown";
  }
  a = a.replace(/[^a-zA-Z0-9_]/g, "$");
  var b = a.charCodeAt(0);
  return 48 <= b && 57 >= b ? "_" + a : a;
}
function Lc(a, b) {
  a = Kc(a);
  return (new Function("body", "return function " + a + '() {\n    "use strict";    return body.apply(this, arguments);\n};\n'))(b);
}
function Mc(a, b) {
  var c = Lc(b, function(a) {
    this.name = b;
    this.message = a;
    a = Error(a).stack;
    void 0 !== a && (this.stack = this.toString() + "\n" + a.replace(/^Error(:[^\n]*)?\n/, ""));
  });
  c.prototype = Object.create(a.prototype);
  c.prototype.constructor = c;
  c.prototype.toString = function() {
    return void 0 === this.message ? this.name : this.name + ": " + this.message;
  };
  return c;
}
var Nc = void 0;
function U(a) {
  throw new Nc(a);
}
var Oc = void 0;
function Pc(a) {
  throw new Oc(a);
}
function V(a, b, c) {
  function d(b) {
    b = c(b);
    b.length !== a.length && Pc("Mismatched type converter count");
    for (var d = 0; d < a.length; ++d) {
      Qc(a[d], b[d]);
    }
  }
  a.forEach(function(a) {
    Jc[a] = b;
  });
  var f = Array(b.length), g = [], h = 0;
  b.forEach(function(a, b) {
    Ic.hasOwnProperty(a) ? f[b] = Ic[a] : (g.push(a), Hc.hasOwnProperty(a) || (Hc[a] = []), Hc[a].push(function() {
      f[b] = Ic[a];
      ++h;
      h === g.length && d(f);
    }));
  });
  0 === g.length && d(f);
}
function Qc(a, b, c) {
  c = c || {};
  if (!("argPackAdvance" in b)) {
    throw new TypeError("registerType registeredInstance requires argPackAdvance");
  }
  var d = b.name;
  a || U('type "' + d + '" must have a positive integer typeid pointer');
  if (Ic.hasOwnProperty(a)) {
    if (c.La) {
      return;
    }
    U("Cannot register type '" + d + "' twice");
  }
  Ic[a] = b;
  delete Jc[a];
  Hc.hasOwnProperty(a) && (b = Hc[a], delete Hc[a], b.forEach(function(a) {
    a();
  }));
}
function Rc(a) {
  if (!(this instanceof Sc && a instanceof Sc)) {
    return !1;
  }
  var b = this.b.m.h, c = this.b.j, d = a.b.m.h;
  for (a = a.b.j; b.F;) {
    c = b.aa(c), b = b.F;
  }
  for (; d.F;) {
    a = d.aa(a), d = d.F;
  }
  return b === d && c === a;
}
function Tc(a) {
  return {count:a.count, R:a.R, Z:a.Z, j:a.j, m:a.m, B:a.B, D:a.D};
}
function Uc(a) {
  U(a.b.m.h.name + " instance already deleted");
}
var Vc = !1;
function Wc() {
}
function Xc(a) {
  a.B ? a.D.O(a.B) : a.m.h.O(a.j);
}
function Yc(a) {
  --a.count.value;
  0 === a.count.value && Xc(a);
}
function Zc(a) {
  if ("undefined" === typeof FinalizationGroup) {
    return Zc = function(a) {
      return a;
    }, a;
  }
  Vc = new FinalizationGroup(function(a) {
    for (var b = a.next(); !b.done; b = a.next()) {
      b = b.value, b.j ? Yc(b) : console.warn("object already deleted: " + b.j);
    }
  });
  Zc = function(a) {
    Vc.register(a, a.b, a.b);
    return a;
  };
  Wc = function(a) {
    Vc.unregister(a.b);
  };
  return Zc(a);
}
function $c() {
  this.b.j || Uc(this);
  if (this.b.Z) {
    return this.b.count.value += 1, this;
  }
  var a = Zc(Object.create(Object.getPrototypeOf(this), {b:{value:Tc(this.b)}}));
  a.b.count.value += 1;
  a.b.R = !1;
  return a;
}
function ad() {
  this.b.j || Uc(this);
  this.b.R && !this.b.Z && U("Object already scheduled for deletion");
  Wc(this);
  Yc(this.b);
  this.b.Z || (this.b.B = void 0, this.b.j = void 0);
}
function bd() {
  return !this.b.j;
}
var cd = void 0, dd = [];
function ed() {
  for (; dd.length;) {
    var a = dd.pop();
    a.b.R = !1;
    a["delete"]();
  }
}
function fd() {
  this.b.j || Uc(this);
  this.b.R && !this.b.Z && U("Object already scheduled for deletion");
  dd.push(this);
  1 === dd.length && cd && cd(ed);
  this.b.R = !0;
  return this;
}
function gd() {
  Sc.prototype.isAliasOf = Rc;
  Sc.prototype.clone = $c;
  Sc.prototype["delete"] = ad;
  Sc.prototype.isDeleted = bd;
  Sc.prototype.deleteLater = fd;
}
function Sc() {
}
var hd = {};
function id(a, b, c) {
  if (void 0 === a[b].o) {
    var d = a[b];
    a[b] = function() {
      a[b].o.hasOwnProperty(arguments.length) || U("Function '" + c + "' called with an invalid number of arguments (" + arguments.length + ") - expects one of (" + a[b].o + ")!");
      return a[b].o[arguments.length].apply(this, arguments);
    };
    a[b].o = [];
    a[b].o[d.P] = d;
  }
}
function jd(a, b, c) {
  e.hasOwnProperty(a) ? ((void 0 === c || void 0 !== e[a].o && void 0 !== e[a].o[c]) && U("Cannot register public name '" + a + "' twice"), id(e, a, a), e.hasOwnProperty(c) && U("Cannot register multiple overloads of a function with the same number of arguments (" + c + ")!"), e[a].o[c] = b) : (e[a] = b, void 0 !== c && (e[a].Cd = c));
}
function kd(a, b, c, d, f, g, h, k) {
  this.name = a;
  this.constructor = b;
  this.J = c;
  this.O = d;
  this.F = f;
  this.Ja = g;
  this.aa = h;
  this.Ha = k;
  this.Ta = [];
}
function ld(a, b, c) {
  for (; b !== c;) {
    b.aa || U("Expected null or instance of " + c.name + ", got an instance of " + b.name), a = b.aa(a), b = b.F;
  }
  return a;
}
function md(a, b) {
  if (null === b) {
    return this.la && U("null is not a valid " + this.name), 0;
  }
  b.b || U('Cannot pass "' + nd(b) + '" as a ' + this.name);
  b.b.j || U("Cannot pass deleted object as a pointer of type " + this.name);
  return ld(b.b.j, b.b.m.h, this.h);
}
function od(a, b) {
  if (null === b) {
    this.la && U("null is not a valid " + this.name);
    if (this.ea) {
      var c = this.Ua();
      null !== a && a.push(this.O, c);
      return c;
    }
    return 0;
  }
  b.b || U('Cannot pass "' + nd(b) + '" as a ' + this.name);
  b.b.j || U("Cannot pass deleted object as a pointer of type " + this.name);
  !this.da && b.b.m.da && U("Cannot convert argument of type " + (b.b.D ? b.b.D.name : b.b.m.name) + " to parameter type " + this.name);
  c = ld(b.b.j, b.b.m.h, this.h);
  if (this.ea) {
    switch(void 0 === b.b.B && U("Passing raw pointer to smart pointer is illegal"), this.Ya) {
      case 0:
        b.b.D === this ? c = b.b.B : U("Cannot convert argument of type " + (b.b.D ? b.b.D.name : b.b.m.name) + " to parameter type " + this.name);
        break;
      case 1:
        c = b.b.B;
        break;
      case 2:
        if (b.b.D === this) {
          c = b.b.B;
        } else {
          var d = b.clone();
          c = this.Va(c, pd(function() {
            d["delete"]();
          }));
          null !== a && a.push(this.O, c);
        }
        break;
      default:
        U("Unsupporting sharing policy");
    }
  }
  return c;
}
function qd(a, b) {
  if (null === b) {
    return this.la && U("null is not a valid " + this.name), 0;
  }
  b.b || U('Cannot pass "' + nd(b) + '" as a ' + this.name);
  b.b.j || U("Cannot pass deleted object as a pointer of type " + this.name);
  b.b.m.da && U("Cannot convert argument of type " + b.b.m.name + " to parameter type " + this.name);
  return ld(b.b.j, b.b.m.h, this.h);
}
function rd(a) {
  return this.fromWireType(A[a >> 2]);
}
function sd(a) {
  this.Da && (a = this.Da(a));
  return a;
}
function td(a) {
  this.O && this.O(a);
}
function ud(a) {
  if (null !== a) {
    a["delete"]();
  }
}
function vd(a, b, c) {
  if (b === c) {
    return a;
  }
  if (void 0 === c.F) {
    return null;
  }
  a = vd(a, b, c.F);
  return null === a ? null : c.Ha(a);
}
function wd() {
  return Object.keys(xd).length;
}
function yd() {
  var a = [], b;
  for (b in xd) {
    xd.hasOwnProperty(b) && a.push(xd[b]);
  }
  return a;
}
function zd(a) {
  cd = a;
  dd.length && cd && cd(ed);
}
function Ad() {
  e.getInheritedInstanceCount = wd;
  e.getLiveInheritedInstances = yd;
  e.flushPendingDeletes = ed;
  e.setDelayFunction = zd;
}
var xd = {};
function Bd(a, b) {
  for (void 0 === b && U("ptr should not be undefined"); a.F;) {
    b = a.aa(b), a = a.F;
  }
  return b;
}
function Cd(a, b) {
  b = Bd(a, b);
  return xd[b];
}
function Dd(a, b) {
  b.m && b.j || Pc("makeClassHandle requires ptr and ptrType");
  !!b.D !== !!b.B && Pc("Both smartPtrType and smartPtr must be specified");
  b.count = {value:1};
  return Zc(Object.create(a, {b:{value:b}}));
}
function Ed(a) {
  function b() {
    return this.ea ? Dd(this.h.J, {m:this.Sa, j:c, D:this, B:a}) : Dd(this.h.J, {m:this, j:a});
  }
  var c = this.Ka(a);
  if (!c) {
    return this.ta(a), null;
  }
  var d = Cd(this.h, c);
  if (void 0 !== d) {
    if (0 === d.b.count.value) {
      return d.b.j = c, d.b.B = a, d.clone();
    }
    d = d.clone();
    this.ta(a);
    return d;
  }
  d = this.h.Ja(c);
  d = hd[d];
  if (!d) {
    return b.call(this);
  }
  d = this.da ? d.Ga : d.pointerType;
  var f = vd(c, this.h, d.h);
  return null === f ? b.call(this) : this.ea ? Dd(d.h.J, {m:d, j:f, D:this, B:a}) : Dd(d.h.J, {m:d, j:f});
}
function Fd() {
  Gd.prototype.Ka = sd;
  Gd.prototype.ta = td;
  Gd.prototype.argPackAdvance = 8;
  Gd.prototype.readValueFromPointer = rd;
  Gd.prototype.deleteObject = ud;
  Gd.prototype.fromWireType = Ed;
}
function Gd(a, b, c, d, f, g, h, k, u, q, v) {
  this.name = a;
  this.h = b;
  this.la = c;
  this.da = d;
  this.ea = f;
  this.Sa = g;
  this.Ya = h;
  this.Da = k;
  this.Ua = u;
  this.Va = q;
  this.O = v;
  f || void 0 !== b.F ? this.toWireType = od : (this.toWireType = d ? md : qd, this.H = null);
}
function Hd(a, b, c) {
  e.hasOwnProperty(a) || Pc("Replacing nonexistant public symbol");
  void 0 !== e[a].o && void 0 !== c ? e[a].o[c] = b : (e[a] = b, e[a].P = c);
}
function Id(a, b) {
  a = T(a);
  if (void 0 !== e["FUNCTION_TABLE_" + a]) {
    var c = e["FUNCTION_TABLE_" + a][b];
  } else {
    if ("undefined" !== typeof FUNCTION_TABLE) {
      c = FUNCTION_TABLE[b];
    } else {
      c = e["dynCall_" + a];
      void 0 === c && (c = e["dynCall_" + a.replace(/f/g, "d")], void 0 === c && U("No dynCall invoker for signature: " + a));
      for (var d = [], f = 1; f < a.length; ++f) {
        d.push("a" + f);
      }
      f = "return function " + ("dynCall_" + a + "_" + b) + "(" + d.join(", ") + ") {\n";
      f += "    return dynCall(rawFunction" + (d.length ? ", " : "") + d.join(", ") + ");\n";
      c = (new Function("dynCall", "rawFunction", f + "};\n"))(c, b);
    }
  }
  "function" !== typeof c && U("unknown function pointer with signature " + a + ": " + b);
  return c;
}
var Jd = void 0;
function Kd(a) {
  a = Ld(a);
  var b = T(a);
  S(a);
  return b;
}
function Md(a, b) {
  function c(a) {
    f[a] || Ic[a] || (Jc[a] ? Jc[a].forEach(c) : (d.push(a), f[a] = !0));
  }
  var d = [], f = {};
  b.forEach(c);
  throw new Jd(a + ": " + d.map(Kd).join([", "]));
}
function Nd(a, b) {
  if (!(a instanceof Function)) {
    throw new TypeError("new_ called with constructor type " + typeof a + " which is not a function");
  }
  var c = Lc(a.name || "unknownFunctionName", function() {
  });
  c.prototype = a.prototype;
  c = new c;
  a = a.apply(c, b);
  return a instanceof Object ? a : c;
}
function Od(a) {
  for (; a.length;) {
    var b = a.pop();
    a.pop()(b);
  }
}
function Pd(a, b, c, d, f) {
  var g = b.length;
  2 > g && U("argTypes array size mismatch! Must at least get return value and 'this' types!");
  var h = null !== b[1] && null !== c, k = !1;
  for (c = 1; c < b.length; ++c) {
    if (null !== b[c] && void 0 === b[c].H) {
      k = !0;
      break;
    }
  }
  var u = "void" !== b[0].name, q = "", v = "";
  for (c = 0; c < g - 2; ++c) {
    q += (0 !== c ? ", " : "") + "arg" + c, v += (0 !== c ? ", " : "") + "arg" + c + "Wired";
  }
  a = "return function " + Kc(a) + "(" + q + ") {\nif (arguments.length !== " + (g - 2) + ") {\nthrowBindingError('function " + a + " called with ' + arguments.length + ' arguments, expected " + (g - 2) + " args!');\n}\n";
  k && (a += "var destructors = [];\n");
  var x = k ? "destructors" : "null";
  q = "throwBindingError invoker fn runDestructors retType classParam".split(" ");
  d = [U, d, f, Od, b[0], b[1]];
  h && (a += "var thisWired = classParam.toWireType(" + x + ", this);\n");
  for (c = 0; c < g - 2; ++c) {
    a += "var arg" + c + "Wired = argType" + c + ".toWireType(" + x + ", arg" + c + "); // " + b[c + 2].name + "\n", q.push("argType" + c), d.push(b[c + 2]);
  }
  h && (v = "thisWired" + (0 < v.length ? ", " : "") + v);
  a += (u ? "var rv = " : "") + "invoker(fn" + (0 < v.length ? ", " : "") + v + ");\n";
  if (k) {
    a += "runDestructors(destructors);\n";
  } else {
    for (c = h ? 1 : 2; c < b.length; ++c) {
      g = 1 === c ? "thisWired" : "arg" + (c - 2) + "Wired", null !== b[c].H && (a += g + "_dtor(" + g + "); // " + b[c].name + "\n", q.push(g + "_dtor"), d.push(b[c].H));
    }
  }
  u && (a += "var ret = retType.fromWireType(rv);\nreturn ret;\n");
  q.push(a + "}\n");
  return Nd(Function, q).apply(null, d);
}
function Qd(a, b) {
  for (var c = [], d = 0; d < a; d++) {
    c.push(r[(b >> 2) + d]);
  }
  return c;
}
function Rd(a, b, c) {
  a instanceof Object || U(c + ' with invalid "this": ' + a);
  a instanceof b.h.constructor || U(c + ' incompatible with "this" of type ' + a.constructor.name);
  a.b.j || U("cannot call emscripten binding method " + c + " on deleted object");
  return ld(a.b.j, a.b.m.h, b.h);
}
var Sd = [], W = [{}, {value:void 0}, {value:null}, {value:!0}, {value:!1}];
function Td(a) {
  4 < a && 0 === --W[a].pa && (W[a] = void 0, Sd.push(a));
}
function Ud() {
  for (var a = 0, b = 5; b < W.length; ++b) {
    void 0 !== W[b] && ++a;
  }
  return a;
}
function Vd() {
  for (var a = 5; a < W.length; ++a) {
    if (void 0 !== W[a]) {
      return W[a];
    }
  }
  return null;
}
function Wd() {
  e.count_emval_handles = Ud;
  e.get_first_emval = Vd;
}
function pd(a) {
  switch(a) {
    case void 0:
      return 1;
    case null:
      return 2;
    case !0:
      return 3;
    case !1:
      return 4;
    default:
      var b = Sd.length ? Sd.pop() : W.length;
      W[b] = {pa:1, value:a};
      return b;
  }
}
function nd(a) {
  if (null === a) {
    return "null";
  }
  var b = typeof a;
  return "object" === b || "array" === b || "function" === b ? a.toString() : "" + a;
}
function Xd(a, b) {
  switch(b) {
    case 2:
      return function(a) {
        return this.fromWireType(Na[a >> 2]);
      };
    case 3:
      return function(a) {
        return this.fromWireType(Oa[a >> 3]);
      };
    default:
      throw new TypeError("Unknown float type: " + a);
  }
}
function Yd(a, b, c) {
  switch(b) {
    case 0:
      return c ? function(a) {
        return t[a];
      } : function(a) {
        return y[a];
      };
    case 1:
      return c ? function(a) {
        return La[a >> 1];
      } : function(a) {
        return Ma[a >> 1];
      };
    case 2:
      return c ? function(a) {
        return r[a >> 2];
      } : function(a) {
        return A[a >> 2];
      };
    default:
      throw new TypeError("Unknown integer type: " + a);
  }
}
function Zd(a, b) {
  var c = Ic[a];
  void 0 === c && U(b + " has unknown type " + Kd(a));
  return c;
}
function $d() {
  void 0 === $d.start && ($d.start = Date.now());
  return 1E3 * (Date.now() - $d.start) | 0;
}
function ua() {
  return t.length;
}
function ae(a) {
  return 0 > a || 0 === a && -Infinity === 1 / a;
}
function be(a, b) {
  function c(a) {
    var b = d;
    "double" === a || "i64" === a ? b & 7 && (assert(4 === (b & 7)), b += 4) : assert(0 === (b & 3));
    d = b;
    "double" === a ? (a = Oa[d >> 3], d += 8) : "i64" == a ? (a = [r[d >> 2], r[d + 4 >> 2]], d += 8) : (assert(0 === (d & 3)), a = r[d >> 2], d += 4);
    return a;
  }
  assert(0 === (b & 3));
  for (var d = b, f = [], g, h;;) {
    var k = a;
    g = t[a >> 0];
    if (0 === g) {
      break;
    }
    h = t[a + 1 >> 0];
    if (37 == g) {
      var u = !1, q = b = !1, v = !1, x = !1;
      a: for (;;) {
        switch(h) {
          case 43:
            u = !0;
            break;
          case 45:
            b = !0;
            break;
          case 35:
            q = !0;
            break;
          case 48:
            if (v) {
              break a;
            } else {
              v = !0;
              break;
            }
          case 32:
            x = !0;
            break;
          default:
            break a;
        }
        a++;
        h = t[a + 1 >> 0];
      }
      var C = 0;
      if (42 == h) {
        C = c("i32"), a++, h = t[a + 1 >> 0];
      } else {
        for (; 48 <= h && 57 >= h;) {
          C = 10 * C + (h - 48), a++, h = t[a + 1 >> 0];
        }
      }
      var D = !1, B = -1;
      if (46 == h) {
        B = 0;
        D = !0;
        a++;
        h = t[a + 1 >> 0];
        if (42 == h) {
          B = c("i32"), a++;
        } else {
          for (;;) {
            h = t[a + 1 >> 0];
            if (48 > h || 57 < h) {
              break;
            }
            B = 10 * B + (h - 48);
            a++;
          }
        }
        h = t[a + 1 >> 0];
      }
      0 > B && (B = 6, D = !1);
      switch(String.fromCharCode(h)) {
        case "h":
          h = t[a + 2 >> 0];
          if (104 == h) {
            a++;
            var E = 1;
          } else {
            E = 2;
          }
          break;
        case "l":
          h = t[a + 2 >> 0];
          108 == h ? (a++, E = 8) : E = 4;
          break;
        case "L":
        case "q":
        case "j":
          E = 8;
          break;
        case "z":
        case "t":
        case "I":
          E = 4;
          break;
        default:
          E = null;
      }
      E && a++;
      h = t[a + 1 >> 0];
      switch(String.fromCharCode(h)) {
        case "d":
        case "i":
        case "u":
        case "o":
        case "x":
        case "X":
        case "p":
          k = 100 == h || 105 == h;
          E = E || 4;
          g = c("i" + 8 * E);
          8 == E && (g = xa(g[0], g[1], 117 == h));
          4 >= E && (g = (k ? $a : Za)(g & Math.pow(256, E) - 1, 8 * E));
          var na = Math.abs(g);
          k = "";
          if (100 == h || 105 == h) {
            var w = $a(g, 8 * E, 1).toString(10);
          } else {
            if (117 == h) {
              w = Za(g, 8 * E, 1).toString(10), g = Math.abs(g);
            } else {
              if (111 == h) {
                w = (q ? "0" : "") + na.toString(8);
              } else {
                if (120 == h || 88 == h) {
                  k = q && 0 != g ? "0x" : "";
                  if (0 > g) {
                    g = -g;
                    w = (na - 1).toString(16);
                    na = [];
                    for (q = 0; q < w.length; q++) {
                      na.push((15 - parseInt(w[q], 16)).toString(16));
                    }
                    for (w = na.join(""); w.length < 2 * E;) {
                      w = "f" + w;
                    }
                  } else {
                    w = na.toString(16);
                  }
                  88 == h && (k = k.toUpperCase(), w = w.toUpperCase());
                } else {
                  112 == h && (0 === na ? w = "(nil)" : (k = "0x", w = na.toString(16)));
                }
              }
            }
          }
          if (D) {
            for (; w.length < B;) {
              w = "0" + w;
            }
          }
          0 <= g && (u ? k = "+" + k : x && (k = " " + k));
          "-" == w.charAt(0) && (k = "-" + k, w = w.substr(1));
          for (; k.length + w.length < C;) {
            b ? w += " " : v ? w = "0" + w : k = " " + k;
          }
          w = k + w;
          w.split("").forEach(function(a) {
            f.push(a.charCodeAt(0));
          });
          break;
        case "f":
        case "F":
        case "e":
        case "E":
        case "g":
        case "G":
          g = c("double");
          if (isNaN(g)) {
            w = "nan", v = !1;
          } else {
            if (isFinite(g)) {
              D = !1;
              E = Math.min(B, 20);
              if (103 == h || 71 == h) {
                D = !0, B = B || 1, E = parseInt(g.toExponential(E).split("e")[1], 10), B > E && -4 <= E ? (h = (103 == h ? "f" : "F").charCodeAt(0), B -= E + 1) : (h = (103 == h ? "e" : "E").charCodeAt(0), B--), E = Math.min(B, 20);
              }
              if (101 == h || 69 == h) {
                w = g.toExponential(E), /[eE][-+]\d$/.test(w) && (w = w.slice(0, -1) + "0" + w.slice(-1));
              } else {
                if (102 == h || 70 == h) {
                  w = g.toFixed(E), 0 === g && ae(g) && (w = "-" + w);
                }
              }
              k = w.split("e");
              if (D && !q) {
                for (; 1 < k[0].length && -1 != k[0].indexOf(".") && ("0" == k[0].slice(-1) || "." == k[0].slice(-1));) {
                  k[0] = k[0].slice(0, -1);
                }
              } else {
                for (q && -1 == w.indexOf(".") && (k[0] += "."); B > E++;) {
                  k[0] += "0";
                }
              }
              w = k[0] + (1 < k.length ? "e" + k[1] : "");
              69 == h && (w = w.toUpperCase());
              0 <= g && (u ? w = "+" + w : x && (w = " " + w));
            } else {
              w = (0 > g ? "-" : "") + "inf", v = !1;
            }
          }
          for (; w.length < C;) {
            b ? w += " " : !v || "-" != w[0] && "+" != w[0] ? w = (v ? "0" : " ") + w : w = w[0] + "0" + w.slice(1);
          }
          97 > h && (w = w.toUpperCase());
          w.split("").forEach(function(a) {
            f.push(a.charCodeAt(0));
          });
          break;
        case "s":
          v = (u = c("i8*")) ? ce(u) : 6;
          D && (v = Math.min(v, B));
          if (!b) {
            for (; v < C--;) {
              f.push(32);
            }
          }
          if (u) {
            for (q = 0; q < v; q++) {
              f.push(y[u++ >> 0]);
            }
          } else {
            f = f.concat(Kb("(null)".substr(0, v), !0));
          }
          if (b) {
            for (; v < C--;) {
              f.push(32);
            }
          }
          break;
        case "c":
          for (b && f.push(c("i8")); 0 < --C;) {
            f.push(32);
          }
          b || f.push(c("i8"));
          break;
        case "n":
          b = c("i32*");
          r[b >> 2] = f.length;
          break;
        case "%":
          f.push(g);
          break;
        default:
          for (q = k; q < a + 2; q++) {
            f.push(t[q >> 0]);
          }
      }
      a += 2;
    } else {
      f.push(g), a += 1;
    }
  }
  return f;
}
function de(a) {
  if (!a || !a.callee || !a.callee.name) {
    return [null, "", ""];
  }
  var b = a.callee.name, c = "(", d = !0, f;
  for (f in a) {
    var g = a[f];
    d || (c += ", ");
    d = !1;
    c = "number" === typeof g || "string" === typeof g ? c + g : c + ("(" + typeof g + ")");
  }
  c += ")";
  a = (a = a.callee.caller) ? a.arguments : [];
  d && (c = "");
  return [a, b, c];
}
function ee(a) {
  var b = ub();
  b = b.slice(b.indexOf("\n", Math.max(b.lastIndexOf("_emscripten_log"), b.lastIndexOf("_emscripten_get_callstack"))) + 1);
  a & 8 && (va('Source map information is not available, emscripten_log with EM_LOG_C_STACK will be ignored. Build with "--pre-js $EMSCRIPTEN/src/emscripten-source-map.min.js" linker flag to add source map loading to code.'), a = a ^ 8 | 16);
  var c = null;
  if (a & 128) {
    for (c = de(arguments); 0 <= c[1].indexOf("_emscripten_");) {
      c = de(c[0]);
    }
  }
  var d = b.split("\n");
  b = "";
  var f = /\s*(.*?)@(.*?):([0-9]+):([0-9]+)/, g = /\s*(.*?)@(.*):(.*)(:(.*))?/, h = /\s*at (.*?) \((.*):(.*):(.*)\)/, k;
  for (k in d) {
    var u = d[k], q;
    if ((q = h.exec(u)) && 5 == q.length) {
      u = q[1];
      var v = q[2];
      var x = q[3];
      q = q[4];
    } else {
      if ((q = f.exec(u)) || (q = g.exec(u)), q && 4 <= q.length) {
        u = q[1], v = q[2], x = q[3], q = q[4] | 0;
      } else {
        b += u + "\n";
        continue;
      }
    }
    var C = a & 32 ? sb(u) : u;
    C || (C = u);
    var D = !1;
    if (a & 8) {
      var B = (void 0).Dd({line:x, Fa:q});
      if (D = B && B.source) {
        a & 64 && (B.source = B.source.substring(B.source.replace(/\\/g, "/").lastIndexOf("/") + 1)), b += "    at " + C + " (" + B.source + ":" + B.line + ":" + B.Fa + ")\n";
      }
    }
    if (a & 16 || !D) {
      a & 64 && (v = v.substring(v.replace(/\\/g, "/").lastIndexOf("/") + 1)), b += (D ? "     = " + u : "    at " + C) + " (" + v + ":" + x + ":" + q + ")\n";
    }
    a & 128 && c[0] && (c[1] == u && 0 < c[2].length && (b = b.replace(/\s+$/, ""), b += " with values: " + c[1] + c[2] + "\n"), c = de(c[0]));
  }
  return b = b.replace(/\s+$/, "");
}
function fe(a, b) {
  a & 24 && (b = b.replace(/\s+$/, ""), b += (0 < b.length ? "\n" : "") + ee(a));
  a & 1 ? a & 4 ? console.error(b) : a & 2 ? console.warn(b) : console.log(b) : a & 6 ? m(b) : ra(b);
}
var ge = 0;
function he(a, b, c, d) {
  a |= 0;
  b |= 0;
  c |= 0;
  d |= 0;
  var f = 0;
  ge = ge + 1 | 0;
  for (r[a >> 2] = ge; (f | 0) < (d | 0);) {
    if (0 == (r[c + (f << 3) >> 2] | 0)) {
      return r[c + (f << 3) >> 2] = ge, r[c + ((f << 3) + 4) >> 2] = b, r[c + ((f << 3) + 8) >> 2] = 0, ya = d | 0, c | 0;
    }
    f = f + 1 | 0;
  }
  d = 2 * d | 0;
  c = ie(c | 0, 8 * (d + 1 | 0) | 0) | 0;
  c = he(a | 0, b | 0, c | 0, d | 0) | 0;
  ya = d | 0;
  return c | 0;
}
function je(a, b) {
  X(a, b || 1);
  throw "longjmp";
}
function ke(a, b, c) {
  y.set(y.subarray(b, b + c), a);
}
function Y(a) {
  a = eval(z(a));
  if (null == a) {
    return 0;
  }
  var b = Ia(a);
  if (!Y.s || Y.s < b + 1) {
    Y.s && S(Y.buffer), Y.s = b + 1, Y.buffer = Da(Y.s);
  }
  Ha(a, Y.buffer, Y.s);
  return Y.buffer;
}
function le(a) {
  if (0 === a) {
    return 0;
  }
  a = z(a);
  if (!I.hasOwnProperty(a)) {
    return 0;
  }
  le.ka && S(le.ka);
  a = I[a];
  var b = Ia(a) + 1, c = Da(b);
  c && Ga(a, t, c, b);
  le.ka = c;
  return le.ka;
}
Ha("GMT", 1908272, 4);
function me() {
  function a(a) {
    return (a = a.toTimeString().match(/\(([A-Za-z ]+)\)$/)) ? a[1] : "GMT";
  }
  if (!me.s) {
    me.s = !0;
    r[ne() >> 2] = 60 * (new Date).getTimezoneOffset();
    var b = new Date(2000, 0, 1), c = new Date(2000, 6, 1);
    r[oe() >> 2] = Number(b.getTimezoneOffset() != c.getTimezoneOffset());
    var d = a(b), f = a(c);
    d = Ca(Kb(d));
    f = Ca(Kb(f));
    c.getTimezoneOffset() < b.getTimezoneOffset() ? (r[pe() >> 2] = d, r[pe() + 4 >> 2] = f) : (r[pe() >> 2] = f, r[pe() + 4 >> 2] = d);
  }
}
function qe(a, b) {
  me();
  a = new Date(1000 * r[a >> 2]);
  r[b >> 2] = a.getSeconds();
  r[b + 4 >> 2] = a.getMinutes();
  r[b + 8 >> 2] = a.getHours();
  r[b + 12 >> 2] = a.getDate();
  r[b + 16 >> 2] = a.getMonth();
  r[b + 20 >> 2] = a.getFullYear() - 1900;
  r[b + 24 >> 2] = a.getDay();
  var c = new Date(a.getFullYear(), 0, 1);
  r[b + 28 >> 2] = (a.getTime() - c.getTime()) / 864E5 | 0;
  r[b + 36 >> 2] = -(60 * a.getTimezoneOffset());
  var d = (new Date(2000, 6, 1)).getTimezoneOffset();
  c = c.getTimezoneOffset();
  a = (d != c && a.getTimezoneOffset() == Math.min(c, d)) | 0;
  r[b + 32 >> 2] = a;
  a = r[pe() + (a ? 4 : 0) >> 2];
  r[b + 40 >> 2] = a;
  return b;
}
function re(a) {
  a = Ka(a);
  var b = buffer.byteLength;
  try {
    return -1 !== Aa.grow((a - b) / 65536) ? (buffer = Aa.buffer, !0) : !1;
  } catch (c) {
    return console.error("emscripten_realloc_buffer: Attempted to grow from " + b + " bytes to " + a + " bytes, but got error: " + c), !1;
  }
}
function se(a) {
  var b = ua();
  assert(a > b);
  if (2147418112 < a) {
    return m("Cannot enlarge memory, asked to go up to " + a + " bytes, but the limit is 2147418112 bytes!"), !1;
  }
  for (var c = Math.max(b, 16777216); c < a;) {
    536870912 >= c ? c = Ka(2 * c) : c = Math.min(Ka((3 * c + 2147483648) / 4), 2147418112), c === b && va("Cannot ask for more memory since we reached the practical limit in browsers (which is just below 2GB), so the request would have failed. Requesting only " + t.length);
  }
  if (!re(c)) {
    return m("Failed to grow the heap from " + b + " bytes to " + c + " bytes, not enough memory!"), !1;
  }
  Pa();
  return !0;
}
function te(a) {
  return 0 === a % 4 && (0 !== a % 100 || 0 === a % 400);
}
function ue(a, b) {
  for (var c = 0, d = 0; d <= b; c += a[d++]) {
  }
  return c;
}
var ve = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31], we = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
function xe(a, b) {
  for (a = new Date(a.getTime()); 0 < b;) {
    var c = a.getMonth(), d = (te(a.getFullYear()) ? ve : we)[c];
    if (b > d - a.getDate()) {
      b -= d - a.getDate() + 1, a.setDate(1), 11 > c ? a.setMonth(c + 1) : (a.setMonth(0), a.setFullYear(a.getFullYear() + 1));
    } else {
      a.setDate(a.getDate() + b);
      break;
    }
  }
  return a;
}
function ye(a, b, c, d) {
  function f(a, b, c) {
    for (a = "number" === typeof a ? a.toString() : a || ""; a.length < b;) {
      a = c[0] + a;
    }
    return a;
  }
  function g(a, b) {
    return f(a, b, "0");
  }
  function h(a, b) {
    function c(a) {
      return 0 > a ? -1 : 0 < a ? 1 : 0;
    }
    var d;
    0 === (d = c(a.getFullYear() - b.getFullYear())) && 0 === (d = c(a.getMonth() - b.getMonth())) && (d = c(a.getDate() - b.getDate()));
    return d;
  }
  function k(a) {
    switch(a.getDay()) {
      case 0:
        return new Date(a.getFullYear() - 1, 11, 29);
      case 1:
        return a;
      case 2:
        return new Date(a.getFullYear(), 0, 3);
      case 3:
        return new Date(a.getFullYear(), 0, 2);
      case 4:
        return new Date(a.getFullYear(), 0, 1);
      case 5:
        return new Date(a.getFullYear() - 1, 11, 31);
      case 6:
        return new Date(a.getFullYear() - 1, 11, 30);
    }
  }
  function u(a) {
    a = xe(new Date(a.u + 1900, 0, 1), a.ja);
    var b = k(new Date(a.getFullYear() + 1, 0, 4));
    return 0 >= h(k(new Date(a.getFullYear(), 0, 4)), a) ? 0 >= h(b, a) ? a.getFullYear() + 1 : a.getFullYear() : a.getFullYear() - 1;
  }
  var q = r[d + 40 >> 2];
  d = {bb:r[d >> 2], ab:r[d + 4 >> 2], ha:r[d + 8 >> 2], $:r[d + 12 >> 2], V:r[d + 16 >> 2], u:r[d + 20 >> 2], ia:r[d + 24 >> 2], ja:r[d + 28 >> 2], Ed:r[d + 32 >> 2], $a:r[d + 36 >> 2], cb:q ? z(q) : ""};
  c = z(c);
  q = {"%c":"%a %b %d %H:%M:%S %Y", "%D":"%m/%d/%y", "%F":"%Y-%m-%d", "%h":"%b", "%r":"%I:%M:%S %p", "%R":"%H:%M", "%T":"%H:%M:%S", "%x":"%m/%d/%y", "%X":"%H:%M:%S", "%Ec":"%c", "%EC":"%C", "%Ex":"%m/%d/%y", "%EX":"%H:%M:%S", "%Ey":"%y", "%EY":"%Y", "%Od":"%d", "%Oe":"%e", "%OH":"%H", "%OI":"%I", "%Om":"%m", "%OM":"%M", "%OS":"%S", "%Ou":"%u", "%OU":"%U", "%OV":"%V", "%Ow":"%w", "%OW":"%W", "%Oy":"%y"};
  for (var v in q) {
    c = c.replace(new RegExp(v, "g"), q[v]);
  }
  var x = "Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" "), C = "January February March April May June July August September October November December".split(" ");
  q = {"%a":function(a) {
    return x[a.ia].substring(0, 3);
  }, "%A":function(a) {
    return x[a.ia];
  }, "%b":function(a) {
    return C[a.V].substring(0, 3);
  }, "%B":function(a) {
    return C[a.V];
  }, "%C":function(a) {
    return g((a.u + 1900) / 100 | 0, 2);
  }, "%d":function(a) {
    return g(a.$, 2);
  }, "%e":function(a) {
    return f(a.$, 2, " ");
  }, "%g":function(a) {
    return u(a).toString().substring(2);
  }, "%G":function(a) {
    return u(a);
  }, "%H":function(a) {
    return g(a.ha, 2);
  }, "%I":function(a) {
    a = a.ha;
    0 == a ? a = 12 : 12 < a && (a -= 12);
    return g(a, 2);
  }, "%j":function(a) {
    return g(a.$ + ue(te(a.u + 1900) ? ve : we, a.V - 1), 3);
  }, "%m":function(a) {
    return g(a.V + 1, 2);
  }, "%M":function(a) {
    return g(a.ab, 2);
  }, "%n":function() {
    return "\n";
  }, "%p":function(a) {
    return 0 <= a.ha && 12 > a.ha ? "AM" : "PM";
  }, "%S":function(a) {
    return g(a.bb, 2);
  }, "%t":function() {
    return "\t";
  }, "%u":function(a) {
    return a.ia || 7;
  }, "%U":function(a) {
    var b = new Date(a.u + 1900, 0, 1), c = 0 === b.getDay() ? b : xe(b, 7 - b.getDay());
    a = new Date(a.u + 1900, a.V, a.$);
    return 0 > h(c, a) ? g(Math.ceil((31 - c.getDate() + (ue(te(a.getFullYear()) ? ve : we, a.getMonth() - 1) - 31) + a.getDate()) / 7), 2) : 0 === h(c, b) ? "01" : "00";
  }, "%V":function(a) {
    var b = k(new Date(a.u + 1900, 0, 4)), c = k(new Date(a.u + 1901, 0, 4)), d = xe(new Date(a.u + 1900, 0, 1), a.ja);
    return 0 > h(d, b) ? "53" : 0 >= h(c, d) ? "01" : g(Math.ceil((b.getFullYear() < a.u + 1900 ? a.ja + 32 - b.getDate() : a.ja + 1 - b.getDate()) / 7), 2);
  }, "%w":function(a) {
    return a.ia;
  }, "%W":function(a) {
    var b = new Date(a.u, 0, 1), c = 1 === b.getDay() ? b : xe(b, 0 === b.getDay() ? 1 : 7 - b.getDay() + 1);
    a = new Date(a.u + 1900, a.V, a.$);
    return 0 > h(c, a) ? g(Math.ceil((31 - c.getDate() + (ue(te(a.getFullYear()) ? ve : we, a.getMonth() - 1) - 31) + a.getDate()) / 7), 2) : 0 === h(c, b) ? "01" : "00";
  }, "%y":function(a) {
    return (a.u + 1900).toString().substring(2);
  }, "%Y":function(a) {
    return a.u + 1900;
  }, "%z":function(a) {
    a = a.$a;
    var b = 0 <= a;
    a = Math.abs(a) / 60;
    return (b ? "+" : "-") + String("0000" + (a / 60 * 100 + a % 60)).slice(-4);
  }, "%Z":function(a) {
    return a.cb;
  }, "%%":function() {
    return "%";
  }};
  for (v in q) {
    0 <= c.indexOf(v) && (c = c.replace(new RegExp(v, "g"), q[v](d)));
  }
  v = Kb(c, !1);
  if (v.length > b) {
    return 0;
  }
  Ja(v, a);
  return v.length - 1;
}
wc();
Yb = Array(4096);
oc(K, "/");
qc("/tmp");
qc("/home");
qc("/home/web_user");
(function() {
  qc("/dev");
  Ib(259, {read:function() {
    return 0;
  }, write:function(a, b, c, h) {
    return h;
  }});
  rc("/dev/null", 259);
  Hb(1280, Lb);
  Hb(1536, Mb);
  rc("/dev/tty", 1280);
  rc("/dev/tty1", 1536);
  if ("object" === typeof crypto && "function" === typeof crypto.getRandomValues) {
    var a = new Uint8Array(1);
    var b = function() {
      crypto.getRandomValues(a);
      return a[0];
    };
  } else {
    if (ha) {
      try {
        var c = require("crypto");
        b = function() {
          return c.randomBytes(1)[0];
        };
      } catch (d) {
      }
    }
  }
  b || (b = function() {
    l("no cryptographic support found for random_device. consider polyfilling it if you want to use something insecure like Math.random(), e.g. put this in a --pre-js: var crypto = { getRandomValues: function(array) { for (var i = 0; i < array.length; i++) array[i] = (Math.random()*256)|0 } };");
  });
  zc("random", b);
  zc("urandom", b);
  qc("/dev/shm");
  qc("/dev/shm/tmp");
})();
qc("/proc");
qc("/proc/self");
qc("/proc/self/fd");
oc({v:function() {
  var a = Ob("/proc/self", "fd", 16895, 73);
  a.f = {lookup:function(a, c) {
    var b = Wb[+c];
    if (!b) {
      throw new J(9);
    }
    a = {parent:null, v:{Ca:"fake"}, f:{readlink:function() {
      return b.path;
    }}};
    return a.parent = a;
  }};
  return a;
}}, "/proc/self/fd");
if (ia) {
  var fs = require("fs"), Rb = require("path");
  M.Za();
}
Fc();
Nc = e.BindingError = Mc(Error, "BindingError");
Oc = e.InternalError = Mc(Error, "InternalError");
gd();
Fd();
Ad();
Jd = e.UnboundTypeError = Mc(Error, "UnboundTypeError");
Wd();
function Kb(a, b) {
  var c = Array(Ia(a) + 1);
  a = Ga(a, c, 0, c.length);
  b && (c.length = a);
  return c;
}
var Z = e.asm({}, {ClassHandle:Sc, ClassHandle_clone:$c, ClassHandle_delete:ad, ClassHandle_deleteLater:fd, ClassHandle_isAliasOf:Rc, ClassHandle_isDeleted:bd, DYNAMICTOP_PTR:ta, RegisteredClass:kd, RegisteredPointer:Gd, RegisteredPointer_deleteObject:ud, RegisteredPointer_destructor:td, RegisteredPointer_fromWireType:Ed, RegisteredPointer_getPointee:sd, __assert_fail:function(a, b, c, d) {
  l("Assertion failed: " + z(a) + ", at: " + [b ? z(b) : "unknown filename", c, d ? z(d) : "unknown function"]);
}, __buildEnvironment:wb, __cxa_allocate_exception:function(a) {
  return Da(a);
}, __cxa_atexit:function() {
  return xb.apply(null, arguments);
}, __cxa_pure_virtual:function() {
  Ba = !0;
  throw "Pure virtual function called!";
}, __cxa_throw:function(a) {
  "uncaught_exception" in ze ? ze.s++ : ze.s = 1;
  throw a + " - Exception catching is disabled, this exception cannot be caught. Compile with -s DISABLE_EXCEPTION_CATCHING=0 or DISABLE_EXCEPTION_CATCHING=2 to catch.";
}, __cxa_uncaught_exceptions:function() {
  return ze.s;
}, __lock:function() {
}, __map_file:function() {
  yb(1);
  return -1;
}, __setErrNo:yb, __syscall10:function(a, b) {
  Q = b;
  try {
    var c = z(R()), d = O(c, {parent:!0}).node, f = Cb(c), g = Qb(d, f), h = kc(d, f, !1);
    if (h) {
      throw new J(h);
    }
    if (!d.f.unlink) {
      throw new J(1);
    }
    if (g.S) {
      throw new J(16);
    }
    try {
      N.willDeletePath && N.willDeletePath(c);
    } catch (k) {
      console.log("FS.trackingDelegate['willDeletePath']('" + c + "') threw an exception: " + k.message);
    }
    d.f.unlink(d, f);
    dc(g);
    try {
      if (N.onDeletePath) {
        N.onDeletePath(c);
      }
    } catch (k) {
      console.log("FS.trackingDelegate['onDeletePath']('" + c + "') threw an exception: " + k.message);
    }
    return 0;
  } catch (k) {
    return "undefined" !== typeof P && k instanceof J || l(k), -k.i;
  }
}, __syscall140:function(a, b) {
  Q = b;
  try {
    var c = Cc(), d = R(), f = R(), g = R(), h = R();
    a = 4294967296 * d + (f >>> 0);
    if (-9007199254740992 >= a || 9007199254740992 <= a) {
      return -75;
    }
    vc(c, a, h);
    qb = [c.position >>> 0, (H = c.position, 1.0 <= +ab(H) ? 0.0 < H ? (eb(+db(H / 4294967296.0), 4294967295.0) | 0) >>> 0 : ~~+cb((H - +(~~H >>> 0)) / 4294967296.0) >>> 0 : 0)];
    r[g >> 2] = qb[0];
    r[g + 4 >> 2] = qb[1];
    c.N && 0 === a && 0 === h && (c.N = null);
    return 0;
  } catch (k) {
    return "undefined" !== typeof P && k instanceof J || l(k), -k.i;
  }
}, __syscall145:function(a, b) {
  Q = b;
  try {
    var c = Cc(), d = R();
    a: {
      var f = R();
      for (b = a = 0; b < f; b++) {
        var g = r[d + (8 * b + 4) >> 2], h = c, k = r[d + 8 * b >> 2], u = g, q = void 0, v = t;
        if (0 > u || 0 > q) {
          throw new J(22);
        }
        if (null === h.fd) {
          throw new J(9);
        }
        if (1 === (h.flags & 2097155)) {
          throw new J(9);
        }
        if (L(h.node.mode)) {
          throw new J(21);
        }
        if (!h.g.read) {
          throw new J(22);
        }
        var x = "undefined" !== typeof q;
        if (!x) {
          q = h.position;
        } else {
          if (!h.seekable) {
            throw new J(29);
          }
        }
        var C = h.g.read(h, v, k, u, q);
        x || (h.position += C);
        var D = C;
        if (0 > D) {
          var B = -1;
          break a;
        }
        a += D;
        if (D < g) {
          break;
        }
      }
      B = a;
    }
    return B;
  } catch (E) {
    return "undefined" !== typeof P && E instanceof J || l(E), -E.i;
  }
}, __syscall146:function(a, b) {
  Q = b;
  try {
    var c = Cc(), d = R();
    a: {
      var f = R();
      for (b = a = 0; b < f; b++) {
        var g = c, h = r[d + 8 * b >> 2], k = r[d + (8 * b + 4) >> 2], u = void 0, q = t;
        if (0 > k || 0 > u) {
          throw new J(22);
        }
        if (null === g.fd) {
          throw new J(9);
        }
        if (0 === (g.flags & 2097155)) {
          throw new J(9);
        }
        if (L(g.node.mode)) {
          throw new J(21);
        }
        if (!g.g.write) {
          throw new J(22);
        }
        g.flags & 1024 && vc(g, 0, 2);
        var v = "undefined" !== typeof u;
        if (!v) {
          u = g.position;
        } else {
          if (!g.seekable) {
            throw new J(29);
          }
        }
        var x = g.g.write(g, q, h, k, u, void 0);
        v || (g.position += x);
        try {
          if (g.path && N.onWriteToFile) {
            N.onWriteToFile(g.path);
          }
        } catch (B) {
          console.log("FS.trackingDelegate['onWriteToFile']('" + g.path + "') threw an exception: " + B.message);
        }
        var C = x;
        if (0 > C) {
          var D = -1;
          break a;
        }
        a += C;
      }
      D = a;
    }
    return D;
  } catch (B) {
    return "undefined" !== typeof P && B instanceof J || l(B), -B.i;
  }
}, __syscall220:function(a, b) {
  Q = b;
  try {
    var c = Cc(), d = R(), f = R();
    if (!c.N) {
      var g = O(c.path, {W:!0}).node;
      if (!g.f.readdir) {
        throw new J(20);
      }
      var h = g.f.readdir(g);
      c.N = h;
    }
    a = 0;
    for (var k = vc(c, 0, 1), u = Math.floor(k / 280); u < c.N.length && a + 280 <= f;) {
      var q = c.N[u];
      if ("." === q[0]) {
        var v = 1;
        var x = 4;
      } else {
        var C = Qb(c.node, q);
        v = C.id;
        x = 8192 === (C.mode & 61440) ? 2 : L(C.mode) ? 4 : 40960 === (C.mode & 61440) ? 10 : 8;
      }
      qb = [v >>> 0, (H = v, 1.0 <= +ab(H) ? 0.0 < H ? (eb(+db(H / 4294967296.0), 4294967295.0) | 0) >>> 0 : ~~+cb((H - +(~~H >>> 0)) / 4294967296.0) >>> 0 : 0)];
      r[d + a >> 2] = qb[0];
      r[d + a + 4 >> 2] = qb[1];
      qb = [280 * (u + 1) >>> 0, (H = 280 * (u + 1), 1.0 <= +ab(H) ? 0.0 < H ? (eb(+db(H / 4294967296.0), 4294967295.0) | 0) >>> 0 : ~~+cb((H - +(~~H >>> 0)) / 4294967296.0) >>> 0 : 0)];
      r[d + a + 8 >> 2] = qb[0];
      r[d + a + 12 >> 2] = qb[1];
      La[d + a + 16 >> 1] = 280;
      t[d + a + 18 >> 0] = x;
      Ha(q, d + a + 19, 256);
      a += 280;
      u += 1;
    }
    vc(c, 280 * u, 0);
    return a;
  } catch (D) {
    return "undefined" !== typeof P && D instanceof J || l(D), -D.i;
  }
}, __syscall221:function(a, b) {
  Q = b;
  try {
    var c = Cc();
    switch(R()) {
      case 0:
        var d = R();
        return 0 > d ? -22 : tc(c.path, c.flags, 0, d).fd;
      case 1:
      case 2:
        return 0;
      case 3:
        return c.flags;
      case 4:
        return d = R(), c.flags |= d, 0;
      case 12:
        return d = R(), La[d + 0 >> 1] = 2, 0;
      case 13:
      case 14:
        return 0;
      case 16:
      case 8:
        return -22;
      case 9:
        return yb(22), -1;
      default:
        return -22;
    }
  } catch (f) {
    return "undefined" !== typeof P && f instanceof J || l(f), -f.i;
  }
}, __syscall40:function(a, b) {
  Q = b;
  try {
    var c = z(R()), d = O(c, {parent:!0}).node, f = Cb(c), g = Qb(d, f), h = kc(d, f, !0);
    if (h) {
      throw new J(h);
    }
    if (!d.f.rmdir) {
      throw new J(1);
    }
    if (g.S) {
      throw new J(16);
    }
    try {
      N.willDeletePath && N.willDeletePath(c);
    } catch (k) {
      console.log("FS.trackingDelegate['willDeletePath']('" + c + "') threw an exception: " + k.message);
    }
    d.f.rmdir(d, f);
    dc(g);
    try {
      if (N.onDeletePath) {
        N.onDeletePath(c);
      }
    } catch (k) {
      console.log("FS.trackingDelegate['onDeletePath']('" + c + "') threw an exception: " + k.message);
    }
    return 0;
  } catch (k) {
    return "undefined" !== typeof P && k instanceof J || l(k), -k.i;
  }
}, __syscall5:function(a, b) {
  Q = b;
  try {
    var c = z(R()), d = R(), f = R();
    return tc(c, d, f).fd;
  } catch (g) {
    return "undefined" !== typeof P && g instanceof J || l(g), -g.i;
  }
}, __syscall54:function(a, b) {
  Q = b;
  try {
    var c = Cc(), d = R();
    switch(d) {
      case 21509:
      case 21505:
        return c.tty ? 0 : -25;
      case 21510:
      case 21511:
      case 21512:
      case 21506:
      case 21507:
      case 21508:
        return c.tty ? 0 : -25;
      case 21519:
        if (!c.tty) {
          return -25;
        }
        var f = R();
        return r[f >> 2] = 0;
      case 21520:
        return c.tty ? -22 : -25;
      case 21531:
        a = f = R();
        if (!c.g.Ma) {
          throw new J(25);
        }
        return c.g.Ma(c, d, a);
      case 21523:
        return c.tty ? 0 : -25;
      case 21524:
        return c.tty ? 0 : -25;
      default:
        l("bad ioctl syscall " + d);
    }
  } catch (g) {
    return "undefined" !== typeof P && g instanceof J || l(g), -g.i;
  }
}, __syscall6:function(a, b) {
  Q = b;
  try {
    var c = Cc();
    if (null === c.fd) {
      throw new J(9);
    }
    c.N && (c.N = null);
    try {
      c.g.close && c.g.close(c);
    } catch (d) {
      throw d;
    } finally {
      Wb[c.fd] = null;
    }
    c.fd = null;
    return 0;
  } catch (d) {
    return "undefined" !== typeof P && d instanceof J || l(d), -d.i;
  }
}, __syscall85:function(a, b) {
  Q = b;
  try {
    var c = z(R()), d = R();
    var f = R();
    if (0 >= f) {
      var g = -22;
    } else {
      var h = $b(c), k = Math.min(f, Ia(h)), u = t[d + k];
      Ha(h, d, f + 1);
      t[d + k] = u;
      g = k;
    }
    return g;
  } catch (q) {
    return "undefined" !== typeof P && q instanceof J || l(q), -q.i;
  }
}, __syscall91:function(a, b) {
  Q = b;
  try {
    var c = R(), d = R();
    return Dc(c, d);
  } catch (f) {
    return "undefined" !== typeof P && f instanceof J || l(f), -f.i;
  }
}, __unlock:function() {
}, _addDays:xe, _arraySum:ue, _embind_register_bool:function(a, b, c, d, f) {
  var g = Ec(c);
  b = T(b);
  Qc(a, {name:b, fromWireType:function(a) {
    return !!a;
  }, toWireType:function(a, b) {
    return b ? d : f;
  }, argPackAdvance:8, readValueFromPointer:function(a) {
    if (1 === c) {
      var d = t;
    } else {
      if (2 === c) {
        d = La;
      } else {
        if (4 === c) {
          d = r;
        } else {
          throw new TypeError("Unknown boolean type size: " + b);
        }
      }
    }
    return this.fromWireType(d[a >> g]);
  }, H:null});
}, _embind_register_class:function(a, b, c, d, f, g, h, k, u, q, v, x, C) {
  v = T(v);
  g = Id(f, g);
  k && (k = Id(h, k));
  q && (q = Id(u, q));
  C = Id(x, C);
  var D = Kc(v);
  jd(D, function() {
    Md("Cannot construct " + v + " due to unbound types", [d]);
  });
  V([a, b, c], d ? [d] : [], function(b) {
    b = b[0];
    if (d) {
      var c = b.h;
      var f = c.J;
    } else {
      f = Sc.prototype;
    }
    b = Lc(D, function() {
      if (Object.getPrototypeOf(this) !== h) {
        throw new Nc("Use 'new' to construct " + v);
      }
      if (void 0 === u.M) {
        throw new Nc(v + " has no accessible constructor");
      }
      var a = u.M[arguments.length];
      if (void 0 === a) {
        throw new Nc("Tried to invoke ctor of " + v + " with invalid number of parameters (" + arguments.length + ") - expected (" + Object.keys(u.M).toString() + ") parameters instead!");
      }
      return a.apply(this, arguments);
    });
    var h = Object.create(f, {constructor:{value:b}});
    b.prototype = h;
    var u = new kd(v, b, h, C, c, g, k, q);
    c = new Gd(v, u, !0, !1, !1);
    f = new Gd(v + "*", u, !1, !1, !1);
    var x = new Gd(v + " const*", u, !1, !0, !1);
    hd[a] = {pointerType:f, Ga:x};
    Hd(D, b);
    return [c, f, x];
  });
}, _embind_register_class_class_function:function(a, b, c, d, f, g, h) {
  var k = Qd(c, d);
  b = T(b);
  g = Id(f, g);
  V([], [a], function(a) {
    function d() {
      Md("Cannot call " + f + " due to unbound types", k);
    }
    a = a[0];
    var f = a.name + "." + b, u = a.h.constructor;
    void 0 === u[b] ? (d.P = c - 1, u[b] = d) : (id(u, b, f), u[b].o[c - 1] = d);
    V([], k, function(a) {
      a = [a[0], null].concat(a.slice(1));
      a = Pd(f, a, null, g, h);
      void 0 === u[b].o ? (a.P = c - 1, u[b] = a) : u[b].o[c - 1] = a;
      return [];
    });
    return [];
  });
}, _embind_register_class_constructor:function(a, b, c, d, f, g) {
  var h = Qd(b, c);
  f = Id(d, f);
  V([], [a], function(a) {
    a = a[0];
    var c = "constructor " + a.name;
    void 0 === a.h.M && (a.h.M = []);
    if (void 0 !== a.h.M[b - 1]) {
      throw new Nc("Cannot register multiple constructors with identical number of parameters (" + (b - 1) + ") for class '" + a.name + "'! Overload resolution is currently only performed using the parameter count, not actual type info!");
    }
    a.h.M[b - 1] = function() {
      Md("Cannot construct " + a.name + " due to unbound types", h);
    };
    V([], h, function(d) {
      a.h.M[b - 1] = function() {
        arguments.length !== b - 1 && U(c + " called with " + arguments.length + " arguments, expected " + (b - 1));
        var a = [], h = Array(b);
        h[0] = g;
        for (var k = 1; k < b; ++k) {
          h[k] = d[k].toWireType(a, arguments[k - 1]);
        }
        h = f.apply(null, h);
        Od(a);
        return d[0].fromWireType(h);
      };
      return [];
    });
    return [];
  });
}, _embind_register_class_function:function(a, b, c, d, f, g, h, k) {
  var u = Qd(c, d);
  b = T(b);
  g = Id(f, g);
  V([], [a], function(a) {
    function d() {
      Md("Cannot call " + f + " due to unbound types", u);
    }
    a = a[0];
    var f = a.name + "." + b;
    k && a.h.Ta.push(b);
    var q = a.h.J, D = q[b];
    void 0 === D || void 0 === D.o && D.className !== a.name && D.P === c - 2 ? (d.P = c - 2, d.className = a.name, q[b] = d) : (id(q, b, f), q[b].o[c - 2] = d);
    V([], u, function(d) {
      d = Pd(f, d, a, g, h);
      void 0 === q[b].o ? (d.P = c - 2, q[b] = d) : q[b].o[c - 2] = d;
      return [];
    });
    return [];
  });
}, _embind_register_class_property:function(a, b, c, d, f, g, h, k, u, q) {
  b = T(b);
  f = Id(d, f);
  V([], [a], function(a) {
    a = a[0];
    var d = a.name + "." + b, v = {get:function() {
      Md("Cannot access " + d + " due to unbound types", [c, h]);
    }, enumerable:!0, configurable:!0};
    u ? v.set = function() {
      Md("Cannot access " + d + " due to unbound types", [c, h]);
    } : v.set = function() {
      U(d + " is a read-only property");
    };
    Object.defineProperty(a.h.J, b, v);
    V([], u ? [c, h] : [c], function(c) {
      var h = c[0], v = {get:function() {
        var b = Rd(this, a, d + " getter");
        return h.fromWireType(f(g, b));
      }, enumerable:!0};
      if (u) {
        u = Id(k, u);
        var x = c[1];
        v.set = function(b) {
          var c = Rd(this, a, d + " setter"), f = [];
          u(q, c, x.toWireType(f, b));
          Od(f);
        };
      }
      Object.defineProperty(a.h.J, b, v);
      return [];
    });
    return [];
  });
}, _embind_register_emval:function(a, b) {
  b = T(b);
  Qc(a, {name:b, fromWireType:function(a) {
    var b = W[a].value;
    Td(a);
    return b;
  }, toWireType:function(a, b) {
    return pd(b);
  }, argPackAdvance:8, readValueFromPointer:rd, H:null});
}, _embind_register_float:function(a, b, c) {
  c = Ec(c);
  b = T(b);
  Qc(a, {name:b, fromWireType:function(a) {
    return a;
  }, toWireType:function(a, b) {
    if ("number" !== typeof b && "boolean" !== typeof b) {
      throw new TypeError('Cannot convert "' + nd(b) + '" to ' + this.name);
    }
    return b;
  }, argPackAdvance:8, readValueFromPointer:Xd(b, c), H:null});
}, _embind_register_integer:function(a, b, c, d, f) {
  function g(a) {
    return a;
  }
  b = T(b);
  -1 === f && (f = 4294967295);
  var h = Ec(c);
  if (0 === d) {
    var k = 32 - 8 * c;
    g = function(a) {
      return a << k >>> k;
    };
  }
  var u = -1 != b.indexOf("unsigned");
  Qc(a, {name:b, fromWireType:g, toWireType:function(a, c) {
    if ("number" !== typeof c && "boolean" !== typeof c) {
      throw new TypeError('Cannot convert "' + nd(c) + '" to ' + this.name);
    }
    if (c < d || c > f) {
      throw new TypeError('Passing a number "' + nd(c) + '" from JS side to C/C++ side to an argument of type "' + b + '", which is outside the valid range [' + d + ", " + f + "]!");
    }
    return u ? c >>> 0 : c | 0;
  }, argPackAdvance:8, readValueFromPointer:Yd(b, h, 0 !== d), H:null});
}, _embind_register_memory_view:function(a, b, c) {
  function d(a) {
    a >>= 2;
    var b = A;
    return new f(b.buffer, b[a + 1], b[a]);
  }
  var f = [Int8Array, Uint8Array, Int16Array, Uint16Array, Int32Array, Uint32Array, Float32Array, Float64Array][b];
  c = T(c);
  Qc(a, {name:c, fromWireType:d, argPackAdvance:8, readValueFromPointer:d}, {La:!0});
}, _embind_register_std_string:function(a, b) {
  b = T(b);
  var c = "std::string" === b;
  Qc(a, {name:b, fromWireType:function(a) {
    var b = A[a >> 2];
    if (c) {
      var d = y[a + 4 + b], h = 0;
      0 != d && (h = d, y[a + 4 + b] = 0);
      var k = a + 4;
      for (d = 0; d <= b; ++d) {
        var u = a + 4 + d;
        if (0 == y[u]) {
          k = z(k);
          if (void 0 === q) {
            var q = k;
          } else {
            q += String.fromCharCode(0), q += k;
          }
          k = u + 1;
        }
      }
      0 != h && (y[a + 4 + b] = h);
    } else {
      q = Array(b);
      for (d = 0; d < b; ++d) {
        q[d] = String.fromCharCode(y[a + 4 + d]);
      }
      q = q.join("");
    }
    S(a);
    return q;
  }, toWireType:function(a, b) {
    b instanceof ArrayBuffer && (b = new Uint8Array(b));
    var d = "string" === typeof b;
    d || b instanceof Uint8Array || b instanceof Uint8ClampedArray || b instanceof Int8Array || U("Cannot pass non-string to std::string");
    var f = (c && d ? function() {
      return Ia(b);
    } : function() {
      return b.length;
    })(), k = Da(4 + f + 1);
    A[k >> 2] = f;
    if (c && d) {
      Ha(b, k + 4, f + 1);
    } else {
      if (d) {
        for (d = 0; d < f; ++d) {
          var u = b.charCodeAt(d);
          255 < u && (S(k), U("String has UTF-16 code units that do not fit in 8 bits"));
          y[k + 4 + d] = u;
        }
      } else {
        for (d = 0; d < f; ++d) {
          y[k + 4 + d] = b[d];
        }
      }
    }
    null !== a && a.push(S, k);
    return k;
  }, argPackAdvance:8, readValueFromPointer:rd, H:function(a) {
    S(a);
  }});
}, _embind_register_std_wstring:function(a, b, c) {
  c = T(c);
  if (2 === b) {
    var d = function() {
      return Ma;
    };
    var f = 1;
  } else {
    4 === b && (d = function() {
      return A;
    }, f = 2);
  }
  Qc(a, {name:c, fromWireType:function(a) {
    for (var b = d(), c = A[a >> 2], g = Array(c), q = a + 4 >> f, v = 0; v < c; ++v) {
      g[v] = String.fromCharCode(b[q + v]);
    }
    S(a);
    return g.join("");
  }, toWireType:function(a, c) {
    var g = d(), h = c.length, q = Da(4 + h * b);
    A[q >> 2] = h;
    for (var v = q + 4 >> f, x = 0; x < h; ++x) {
      g[v + x] = c.charCodeAt(x);
    }
    null !== a && a.push(S, q);
    return q;
  }, argPackAdvance:8, readValueFromPointer:rd, H:function(a) {
    S(a);
  }});
}, _embind_register_void:function(a, b) {
  b = T(b);
  Qc(a, {zd:!0, name:b, argPackAdvance:0, fromWireType:function() {
  }, toWireType:function() {
  }});
}, _emscripten_syscall_munmap:Dc, _emscripten_traverse_stack:de, _emval_decref:Td, _emval_incref:function(a) {
  4 < a && (W[a].pa += 1);
}, _emval_register:pd, _emval_take_value:function(a, b) {
  a = Zd(a, "_emval_take_value");
  a = a.readValueFromPointer(b);
  return pd(a);
}, _formatString:be, _isLeapYear:te, _reallyNegative:ae, abort:function() {
  e.abort();
}, atexit:xb, attachFinalizer:Zc, clock:$d, constNoSmartPtrRawPointerToWireType:md, count_emval_handles:Ud, craftInvokerFunction:Pd, createNamedFunction:Lc, demangle:sb, demangleAll:tb, detachFinalizer:Wc, downcastPointer:vd, embind__requireFunction:Id, embind_init_charCodes:Fc, embind_repr:nd, emscripten_get_callstack_js:ee, emscripten_get_heap_size:ua, emscripten_log:function(a, b) {
  var c = r[b >> 2];
  b += 4;
  var d = "";
  if (c) {
    for (b = be(c, b), c = 0; c < b.length; ++c) {
      d += String.fromCharCode(b[c]);
    }
  }
  fe(a, d);
}, emscripten_log_js:fe, emscripten_longjmp:function(a, b) {
  je(a, b);
}, emscripten_memcpy_big:ke, emscripten_realloc_buffer:re, emscripten_resize_heap:se, emscripten_run_script:function(a) {
  eval(z(a));
}, emscripten_run_script_int:function(a) {
  return eval(z(a)) | 0;
}, emscripten_run_script_string:Y, ensureOverloadTable:id, exit:function(a) {
  Ae();
  if (e.noExitRuntime) {
    m("exit(" + a + ") called, but EXIT_RUNTIME is not set, so halting execution but not exiting the runtime or preventing further async execution (build with EXIT_RUNTIME=1, if you want a true shutdown)");
  } else {
    if (Ba = !0, Ra(), G = !0, e.onExit) {
      e.onExit(a);
    }
  }
  da(a, new qa(a));
}, exposePublicSymbol:jd, extendError:Mc, fabs:ab, fabsf:ab, floatReadValueFromPointer:Xd, floor:db, flushPendingDeletes:ed, genericPointerToWireType:od, getBasestPointer:Bd, getInheritedInstance:Cd, getInheritedInstanceCount:wd, getLiveInheritedInstances:yd, getShiftFromSize:Ec, getTempRet0:function() {
  return ya | 0;
}, getTypeName:Kd, get_first_emval:Vd, getenv:le, heap32VectorToArray:Qd, init_ClassHandle:gd, init_RegisteredPointer:Fd, init_embind:Ad, init_emval:Wd, integerReadValueFromPointer:Yd, invoke_ii:Be, invoke_iii:Ce, invoke_iiii:De, invoke_iiiii:Ee, invoke_iiiiii:Fe, invoke_iiiiiii:Ge, invoke_iiiiiiii:He, invoke_iiiiiiiiii:Ie, invoke_vi:Je, invoke_vii:Ke, invoke_viii:Le, invoke_viiii:Me, invoke_viiiii:Ne, invoke_viiiiii:Oe, invoke_viiiiiiiii:Pe, jsStackTrace:ub, localtime:function(a) {
  return qe(a, 1908224);
}, localtime_r:qe, longjmp:je, makeClassHandle:Dd, makeLegalFunctionName:Kc, memcpy:function(a, b, c) {
  a |= 0;
  b |= 0;
  c |= 0;
  var d;
  if (8192 <= (c | 0)) {
    return ke(a | 0, b | 0, c | 0) | 0, a | 0;
  }
  var f = a | 0;
  var g = a + c | 0;
  if ((a & 3) == (b & 3)) {
    for (; a & 3;) {
      if (0 == (c | 0)) {
        return f | 0;
      }
      t[a >> 0] = t[b >> 0] | 0;
      a = a + 1 | 0;
      b = b + 1 | 0;
      c = c - 1 | 0;
    }
    c = g & -4 | 0;
    for (d = c - 64 | 0; (a | 0) <= (d | 0);) {
      r[a >> 2] = r[b >> 2] | 0, r[a + 4 >> 2] = r[b + 4 >> 2] | 0, r[a + 8 >> 2] = r[b + 8 >> 2] | 0, r[a + 12 >> 2] = r[b + 12 >> 2] | 0, r[a + 16 >> 2] = r[b + 16 >> 2] | 0, r[a + 20 >> 2] = r[b + 20 >> 2] | 0, r[a + 24 >> 2] = r[b + 24 >> 2] | 0, r[a + 28 >> 2] = r[b + 28 >> 2] | 0, r[a + 32 >> 2] = r[b + 32 >> 2] | 0, r[a + 36 >> 2] = r[b + 36 >> 2] | 0, r[a + 40 >> 2] = r[b + 40 >> 2] | 0, r[a + 44 >> 2] = r[b + 44 >> 2] | 0, r[a + 48 >> 2] = r[b + 48 >> 2] | 0, r[a + 52 >> 2] = r[b + 52 >> 
      2] | 0, r[a + 56 >> 2] = r[b + 56 >> 2] | 0, r[a + 60 >> 2] = r[b + 60 >> 2] | 0, a = a + 64 | 0, b = b + 64 | 0;
    }
    for (; (a | 0) < (c | 0);) {
      r[a >> 2] = r[b >> 2] | 0, a = a + 4 | 0, b = b + 4 | 0;
    }
  } else {
    for (c = g - 4 | 0; (a | 0) < (c | 0);) {
      t[a >> 0] = t[b >> 0] | 0, t[a + 1 >> 0] = t[b + 1 >> 0] | 0, t[a + 2 >> 0] = t[b + 2 >> 0] | 0, t[a + 3 >> 0] = t[b + 3 >> 0] | 0, a = a + 4 | 0, b = b + 4 | 0;
    }
  }
  for (; (a | 0) < (g | 0);) {
    t[a >> 0] = t[b >> 0] | 0, a = a + 1 | 0, b = b + 1 | 0;
  }
  return f | 0;
}, memset:function(a, b, c) {
  a |= 0;
  c |= 0;
  var d;
  var f = a + c | 0;
  b = (b | 0) & 255;
  if (67 <= (c | 0)) {
    for (; 0 != (a & 3);) {
      t[a >> 0] = b, a = a + 1 | 0;
    }
    var g = f & -4 | 0;
    var h = b | b << 8 | b << 16 | b << 24;
    for (d = g - 64 | 0; (a | 0) <= (d | 0);) {
      r[a >> 2] = h, r[a + 4 >> 2] = h, r[a + 8 >> 2] = h, r[a + 12 >> 2] = h, r[a + 16 >> 2] = h, r[a + 20 >> 2] = h, r[a + 24 >> 2] = h, r[a + 28 >> 2] = h, r[a + 32 >> 2] = h, r[a + 36 >> 2] = h, r[a + 40 >> 2] = h, r[a + 44 >> 2] = h, r[a + 48 >> 2] = h, r[a + 52 >> 2] = h, r[a + 56 >> 2] = h, r[a + 60 >> 2] = h, a = a + 64 | 0;
    }
    for (; (a | 0) < (g | 0);) {
      r[a >> 2] = h, a = a + 4 | 0;
    }
  }
  for (; (a | 0) < (f | 0);) {
    t[a >> 0] = b, a = a + 1 | 0;
  }
  return f - c | 0;
}, mktime:function(a) {
  me();
  var b = new Date(r[a + 20 >> 2] + 1900, r[a + 16 >> 2], r[a + 12 >> 2], r[a + 8 >> 2], r[a + 4 >> 2], r[a >> 2], 0), c = r[a + 32 >> 2], d = b.getTimezoneOffset(), f = new Date(b.getFullYear(), 0, 1), g = (new Date(2000, 6, 1)).getTimezoneOffset(), h = f.getTimezoneOffset(), k = Math.min(h, g);
  0 > c ? r[a + 32 >> 2] = Number(g != h && k == d) : 0 < c != (k == d) && (g = Math.max(h, g), b.setTime(b.getTime() + 60000 * ((0 < c ? k : g) - d)));
  r[a + 24 >> 2] = b.getDay();
  r[a + 28 >> 2] = (b.getTime() - f.getTime()) / 864E5 | 0;
  return b.getTime() / 1000 | 0;
}, new_:Nd, nonConstNoSmartPtrRawPointerToWireType:qd, pthread_cond_broadcast:function() {
  return 0;
}, pthread_cond_destroy:function() {
  return 0;
}, pthread_cond_signal:function() {
  return 0;
}, pthread_cond_wait:function() {
  return 0;
}, pthread_create:function() {
  return 11;
}, pthread_join:function() {
}, pthread_mutexattr_destroy:function() {
}, pthread_mutexattr_init:function() {
}, pthread_mutexattr_settype:function() {
}, pthread_spin_destroy:function() {
  return 0;
}, pthread_spin_init:function() {
  return 0;
}, pthread_spin_lock:function() {
  return 0;
}, pthread_spin_unlock:function() {
  return 0;
}, readLatin1String:T, registerType:Qc, releaseClassHandle:Yc, replacePublicSymbol:Hd, requireRegisteredType:Zd, runDestructor:Xc, runDestructors:Od, saveSetjmp:he, sbrk:function(a) {
  a |= 0;
  var b = ua() | 0;
  var c = r[ta >> 2] | 0;
  var d = c + a | 0;
  if (0 < (a | 0) & (d | 0) < (c | 0) | 0 > (d | 0) || (d | 0) > (b | 0) && !(se(d | 0) | 0)) {
    return yb(12), -1;
  }
  r[ta >> 2] = d | 0;
  return c | 0;
}, setDelayFunction:zd, setTempRet0:function(a) {
  ya = a | 0;
}, shallowCopyInternalPointer:Tc, simpleReadValueFromPointer:rd, sqrt:bb, stackTrace:vb, strftime:ye, strftime_l:function(a, b, c, d) {
  return ye(a, b, c, d);
}, testSetjmp:function(a, b, c) {
  a |= 0;
  b |= 0;
  c |= 0;
  for (var d = 0, f; (d | 0) < (c | 0);) {
    f = r[b + (d << 3) >> 2] | 0;
    if (0 == (f | 0)) {
      break;
    }
    if ((f | 0) == (a | 0)) {
      return r[b + ((d << 3) + 4) >> 2] | 0;
    }
    d = d + 1 | 0;
  }
  return 0;
}, throwBindingError:U, throwInstanceAlreadyDeleted:Uc, throwInternalError:Pc, throwUnboundTypeError:Md, time:function(a) {
  var b = Date.now() / 1000 | 0;
  a && (r[a >> 2] = b);
  return b;
}, tzset:me, upcastPointer:ld, validateThis:Rd, whenDependentTypesAreResolved:V}, buffer), Qe = Z.__wasm_call_ctors;
Z.__wasm_call_ctors = function() {
  assert(F, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
  assert(!G, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
  return Qe.apply(null, arguments);
};
var Re = Z.strlen;
Z.strlen = function() {
  assert(F, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
  assert(!G, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
  return Re.apply(null, arguments);
};
var Se = Z.malloc;
Z.malloc = function() {
  assert(F, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
  assert(!G, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
  return Se.apply(null, arguments);
};
var Te = Z.free;
Z.free = function() {
  assert(F, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
  assert(!G, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
  return Te.apply(null, arguments);
};
var Ue = Z.__errno_location;
Z.__errno_location = function() {
  assert(F, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
  assert(!G, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
  return Ue.apply(null, arguments);
};
var Ve = Z.fflush;
Z.fflush = function() {
  assert(F, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
  assert(!G, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
  return Ve.apply(null, arguments);
};
var We = Z.realloc;
Z.realloc = function() {
  assert(F, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
  assert(!G, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
  return We.apply(null, arguments);
};
var Xe = Z._ZSt18uncaught_exceptionv;
Z._ZSt18uncaught_exceptionv = function() {
  assert(F, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
  assert(!G, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
  return Xe.apply(null, arguments);
};
var Ye = Z._get_tzname;
Z._get_tzname = function() {
  assert(F, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
  assert(!G, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
  return Ye.apply(null, arguments);
};
var Ze = Z._get_daylight;
Z._get_daylight = function() {
  assert(F, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
  assert(!G, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
  return Ze.apply(null, arguments);
};
var $e = Z._get_timezone;
Z._get_timezone = function() {
  assert(F, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
  assert(!G, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
  return $e.apply(null, arguments);
};
var af = Z._get_environ;
Z._get_environ = function() {
  assert(F, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
  assert(!G, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
  return af.apply(null, arguments);
};
var bf = Z.__getTypeName;
Z.__getTypeName = function() {
  assert(F, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
  assert(!G, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
  return bf.apply(null, arguments);
};
var cf = Z.__embind_register_native_and_builtin_types;
Z.__embind_register_native_and_builtin_types = function() {
  assert(F, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
  assert(!G, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
  return cf.apply(null, arguments);
};
var df = Z.setThrew;
Z.setThrew = function() {
  assert(F, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
  assert(!G, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
  return df.apply(null, arguments);
};
var ef = Z.dynCall_ii;
Z.dynCall_ii = function() {
  assert(F, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
  assert(!G, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
  return ef.apply(null, arguments);
};
var ff = Z.dynCall_iii;
Z.dynCall_iii = function() {
  assert(F, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
  assert(!G, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
  return ff.apply(null, arguments);
};
var gf = Z.dynCall_iiii;
Z.dynCall_iiii = function() {
  assert(F, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
  assert(!G, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
  return gf.apply(null, arguments);
};
var hf = Z.dynCall_iiiii;
Z.dynCall_iiiii = function() {
  assert(F, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
  assert(!G, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
  return hf.apply(null, arguments);
};
var jf = Z.dynCall_iiiiii;
Z.dynCall_iiiiii = function() {
  assert(F, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
  assert(!G, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
  return jf.apply(null, arguments);
};
var kf = Z.dynCall_iiiiiii;
Z.dynCall_iiiiiii = function() {
  assert(F, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
  assert(!G, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
  return kf.apply(null, arguments);
};
var lf = Z.dynCall_iiiiiiii;
Z.dynCall_iiiiiiii = function() {
  assert(F, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
  assert(!G, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
  return lf.apply(null, arguments);
};
var mf = Z.dynCall_iiiiiiiiii;
Z.dynCall_iiiiiiiiii = function() {
  assert(F, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
  assert(!G, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
  return mf.apply(null, arguments);
};
var nf = Z.dynCall_vi;
Z.dynCall_vi = function() {
  assert(F, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
  assert(!G, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
  return nf.apply(null, arguments);
};
var of = Z.dynCall_vii;
Z.dynCall_vii = function() {
  assert(F, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
  assert(!G, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
  return of.apply(null, arguments);
};
var pf = Z.dynCall_viii;
Z.dynCall_viii = function() {
  assert(F, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
  assert(!G, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
  return pf.apply(null, arguments);
};
var qf = Z.dynCall_viiii;
Z.dynCall_viiii = function() {
  assert(F, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
  assert(!G, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
  return qf.apply(null, arguments);
};
var rf = Z.dynCall_viiiii;
Z.dynCall_viiiii = function() {
  assert(F, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
  assert(!G, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
  return rf.apply(null, arguments);
};
var sf = Z.dynCall_viiiiii;
Z.dynCall_viiiiii = function() {
  assert(F, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
  assert(!G, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
  return sf.apply(null, arguments);
};
var tf = Z.dynCall_viiiiiiiii;
Z.dynCall_viiiiiiiii = function() {
  assert(F, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
  assert(!G, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
  return tf.apply(null, arguments);
};
var uf = Z.stackSave;
Z.stackSave = function() {
  assert(F, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
  assert(!G, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
  return uf.apply(null, arguments);
};
var vf = Z.stackAlloc;
Z.stackAlloc = function() {
  assert(F, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
  assert(!G, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
  return vf.apply(null, arguments);
};
var wf = Z.stackRestore;
Z.stackRestore = function() {
  assert(F, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
  assert(!G, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
  return wf.apply(null, arguments);
};
var xf = Z.__growWasmMemory;
Z.__growWasmMemory = function() {
  assert(F, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
  assert(!G, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
  return xf.apply(null, arguments);
};
var yf = Z.dynCall_viiiiiii;
Z.dynCall_viiiiiii = function() {
  assert(F, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
  assert(!G, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
  return yf.apply(null, arguments);
};
var zf = Z.dynCall_viiiiiiii;
Z.dynCall_viiiiiiii = function() {
  assert(F, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
  assert(!G, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
  return zf.apply(null, arguments);
};
var Af = Z.dynCall_iiiiiiiii;
Z.dynCall_iiiiiiiii = function() {
  assert(F, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
  assert(!G, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
  return Af.apply(null, arguments);
};
var Bf = Z.dynCall_viijii;
Z.dynCall_viijii = function() {
  assert(F, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
  assert(!G, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
  return Bf.apply(null, arguments);
};
var Cf = Z.dynCall_v;
Z.dynCall_v = function() {
  assert(F, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
  assert(!G, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
  return Cf.apply(null, arguments);
};
var Df = Z.dynCall_diiid;
Z.dynCall_diiid = function() {
  assert(F, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
  assert(!G, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
  return Df.apply(null, arguments);
};
var Ef = Z.dynCall_viij;
Z.dynCall_viij = function() {
  assert(F, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
  assert(!G, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
  return Ef.apply(null, arguments);
};
var Ff = Z.dynCall_viiiiiiiiiiii;
Z.dynCall_viiiiiiiiiiii = function() {
  assert(F, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
  assert(!G, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
  return Ff.apply(null, arguments);
};
var Gf = Z.dynCall_jiji;
Z.dynCall_jiji = function() {
  assert(F, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
  assert(!G, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
  return Gf.apply(null, arguments);
};
var Hf = Z.dynCall_ji;
Z.dynCall_ji = function() {
  assert(F, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
  assert(!G, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
  return Hf.apply(null, arguments);
};
var If = Z.dynCall_iiiiiiiiiiiii;
Z.dynCall_iiiiiiiiiiiii = function() {
  assert(F, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
  assert(!G, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
  return If.apply(null, arguments);
};
var Jf = Z.dynCall_iiiiiiiiiiii;
Z.dynCall_iiiiiiiiiiii = function() {
  assert(F, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
  assert(!G, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
  return Jf.apply(null, arguments);
};
var Kf = Z.dynCall_viiiiiiiiii;
Z.dynCall_viiiiiiiiii = function() {
  assert(F, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
  assert(!G, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
  return Kf.apply(null, arguments);
};
var Lf = Z.dynCall_viiiiiiji;
Z.dynCall_viiiiiiji = function() {
  assert(F, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
  assert(!G, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
  return Lf.apply(null, arguments);
};
var Mf = Z.dynCall_viiij;
Z.dynCall_viiij = function() {
  assert(F, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
  assert(!G, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
  return Mf.apply(null, arguments);
};
var Nf = Z.dynCall_viiiiiijii;
Z.dynCall_viiiiiijii = function() {
  assert(F, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
  assert(!G, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
  return Nf.apply(null, arguments);
};
var Of = Z.dynCall_fi;
Z.dynCall_fi = function() {
  assert(F, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
  assert(!G, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
  return Of.apply(null, arguments);
};
var Pf = Z.dynCall_vif;
Z.dynCall_vif = function() {
  assert(F, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
  assert(!G, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
  return Pf.apply(null, arguments);
};
var Qf = Z.dynCall_idd;
Z.dynCall_idd = function() {
  assert(F, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
  assert(!G, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
  return Qf.apply(null, arguments);
};
var Rf = Z.dynCall_viffff;
Z.dynCall_viffff = function() {
  assert(F, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
  assert(!G, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
  return Rf.apply(null, arguments);
};
var Sf = Z.dynCall_iiiiiiiiiii;
Z.dynCall_iiiiiiiiiii = function() {
  assert(F, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
  assert(!G, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
  return Sf.apply(null, arguments);
};
var Tf = Z.dynCall_viiifii;
Z.dynCall_viiifii = function() {
  assert(F, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
  assert(!G, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
  return Tf.apply(null, arguments);
};
var Uf = Z.dynCall_viiifiii;
Z.dynCall_viiifiii = function() {
  assert(F, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
  assert(!G, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
  return Uf.apply(null, arguments);
};
var Vf = Z.dynCall_iidiiii;
Z.dynCall_iidiiii = function() {
  assert(F, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
  assert(!G, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
  return Vf.apply(null, arguments);
};
var Wf = Z.dynCall_iiiiij;
Z.dynCall_iiiiij = function() {
  assert(F, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
  assert(!G, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
  return Wf.apply(null, arguments);
};
var Xf = Z.dynCall_iiiiid;
Z.dynCall_iiiiid = function() {
  assert(F, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
  assert(!G, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
  return Xf.apply(null, arguments);
};
var Yf = Z.dynCall_iiiiijj;
Z.dynCall_iiiiijj = function() {
  assert(F, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
  assert(!G, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
  return Yf.apply(null, arguments);
};
var Zf = Z.dynCall_iiiiiijj;
Z.dynCall_iiiiiijj = function() {
  assert(F, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
  assert(!G, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
  return Zf.apply(null, arguments);
};
e.asm = Z;
var rb = e.___wasm_call_ctors = function() {
  assert(F, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
  assert(!G, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
  return e.asm.__wasm_call_ctors.apply(null, arguments);
}, ce = e._strlen = function() {
  assert(F, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
  assert(!G, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
  return e.asm.strlen.apply(null, arguments);
}, Da = e._malloc = function() {
  assert(F, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
  assert(!G, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
  return e.asm.malloc.apply(null, arguments);
}, S = e._free = function() {
  assert(F, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
  assert(!G, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
  return e.asm.free.apply(null, arguments);
};
e.___errno_location = function() {
  assert(F, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
  assert(!G, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
  return e.asm.__errno_location.apply(null, arguments);
};
e._fflush = function() {
  assert(F, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
  assert(!G, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
  return e.asm.fflush.apply(null, arguments);
};
var ie = e._realloc = function() {
  assert(F, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
  assert(!G, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
  return e.asm.realloc.apply(null, arguments);
}, ze = e.__ZSt18uncaught_exceptionv = function() {
  assert(F, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
  assert(!G, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
  return e.asm._ZSt18uncaught_exceptionv.apply(null, arguments);
}, pe = e.__get_tzname = function() {
  assert(F, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
  assert(!G, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
  return e.asm._get_tzname.apply(null, arguments);
}, oe = e.__get_daylight = function() {
  assert(F, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
  assert(!G, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
  return e.asm._get_daylight.apply(null, arguments);
}, ne = e.__get_timezone = function() {
  assert(F, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
  assert(!G, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
  return e.asm._get_timezone.apply(null, arguments);
};
e.__get_environ = function() {
  assert(F, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
  assert(!G, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
  return e.asm._get_environ.apply(null, arguments);
};
var Ld = e.___getTypeName = function() {
  assert(F, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
  assert(!G, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
  return e.asm.__getTypeName.apply(null, arguments);
};
e.___embind_register_native_and_builtin_types = function() {
  assert(F, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
  assert(!G, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
  return e.asm.__embind_register_native_and_builtin_types.apply(null, arguments);
};
var X = e._setThrew = function() {
  assert(F, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
  assert(!G, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
  return e.asm.setThrew.apply(null, arguments);
}, $f = e.dynCall_ii = function() {
  assert(F, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
  assert(!G, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
  return e.asm.dynCall_ii.apply(null, arguments);
}, ag = e.dynCall_iii = function() {
  assert(F, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
  assert(!G, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
  return e.asm.dynCall_iii.apply(null, arguments);
}, bg = e.dynCall_iiii = function() {
  assert(F, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
  assert(!G, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
  return e.asm.dynCall_iiii.apply(null, arguments);
}, cg = e.dynCall_iiiii = function() {
  assert(F, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
  assert(!G, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
  return e.asm.dynCall_iiiii.apply(null, arguments);
}, dg = e.dynCall_iiiiii = function() {
  assert(F, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
  assert(!G, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
  return e.asm.dynCall_iiiiii.apply(null, arguments);
}, eg = e.dynCall_iiiiiii = function() {
  assert(F, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
  assert(!G, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
  return e.asm.dynCall_iiiiiii.apply(null, arguments);
}, fg = e.dynCall_iiiiiiii = function() {
  assert(F, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
  assert(!G, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
  return e.asm.dynCall_iiiiiiii.apply(null, arguments);
}, gg = e.dynCall_iiiiiiiiii = function() {
  assert(F, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
  assert(!G, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
  return e.asm.dynCall_iiiiiiiiii.apply(null, arguments);
}, hg = e.dynCall_vi = function() {
  assert(F, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
  assert(!G, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
  return e.asm.dynCall_vi.apply(null, arguments);
}, ig = e.dynCall_vii = function() {
  assert(F, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
  assert(!G, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
  return e.asm.dynCall_vii.apply(null, arguments);
}, jg = e.dynCall_viii = function() {
  assert(F, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
  assert(!G, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
  return e.asm.dynCall_viii.apply(null, arguments);
}, kg = e.dynCall_viiii = function() {
  assert(F, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
  assert(!G, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
  return e.asm.dynCall_viiii.apply(null, arguments);
}, lg = e.dynCall_viiiii = function() {
  assert(F, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
  assert(!G, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
  return e.asm.dynCall_viiiii.apply(null, arguments);
}, mg = e.dynCall_viiiiii = function() {
  assert(F, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
  assert(!G, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
  return e.asm.dynCall_viiiiii.apply(null, arguments);
}, ng = e.dynCall_viiiiiiiii = function() {
  assert(F, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
  assert(!G, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
  return e.asm.dynCall_viiiiiiiii.apply(null, arguments);
}, n = e.stackSave = function() {
  assert(F, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
  assert(!G, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
  return e.asm.stackSave.apply(null, arguments);
};
e.stackAlloc = function() {
  assert(F, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
  assert(!G, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
  return e.asm.stackAlloc.apply(null, arguments);
};
var p = e.stackRestore = function() {
  assert(F, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
  assert(!G, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
  return e.asm.stackRestore.apply(null, arguments);
};
e.__growWasmMemory = function() {
  assert(F, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
  assert(!G, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
  return e.asm.__growWasmMemory.apply(null, arguments);
};
e.dynCall_viiiiiii = function() {
  assert(F, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
  assert(!G, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
  return e.asm.dynCall_viiiiiii.apply(null, arguments);
};
e.dynCall_viiiiiiii = function() {
  assert(F, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
  assert(!G, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
  return e.asm.dynCall_viiiiiiii.apply(null, arguments);
};
e.dynCall_iiiiiiiii = function() {
  assert(F, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
  assert(!G, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
  return e.asm.dynCall_iiiiiiiii.apply(null, arguments);
};
e.dynCall_viijii = function() {
  assert(F, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
  assert(!G, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
  return e.asm.dynCall_viijii.apply(null, arguments);
};
e.dynCall_v = function() {
  assert(F, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
  assert(!G, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
  return e.asm.dynCall_v.apply(null, arguments);
};
e.dynCall_diiid = function() {
  assert(F, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
  assert(!G, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
  return e.asm.dynCall_diiid.apply(null, arguments);
};
e.dynCall_viij = function() {
  assert(F, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
  assert(!G, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
  return e.asm.dynCall_viij.apply(null, arguments);
};
e.dynCall_viiiiiiiiiiii = function() {
  assert(F, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
  assert(!G, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
  return e.asm.dynCall_viiiiiiiiiiii.apply(null, arguments);
};
e.dynCall_jiji = function() {
  assert(F, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
  assert(!G, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
  return e.asm.dynCall_jiji.apply(null, arguments);
};
e.dynCall_ji = function() {
  assert(F, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
  assert(!G, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
  return e.asm.dynCall_ji.apply(null, arguments);
};
e.dynCall_iiiiiiiiiiiii = function() {
  assert(F, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
  assert(!G, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
  return e.asm.dynCall_iiiiiiiiiiiii.apply(null, arguments);
};
e.dynCall_iiiiiiiiiiii = function() {
  assert(F, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
  assert(!G, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
  return e.asm.dynCall_iiiiiiiiiiii.apply(null, arguments);
};
e.dynCall_viiiiiiiiii = function() {
  assert(F, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
  assert(!G, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
  return e.asm.dynCall_viiiiiiiiii.apply(null, arguments);
};
e.dynCall_viiiiiiji = function() {
  assert(F, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
  assert(!G, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
  return e.asm.dynCall_viiiiiiji.apply(null, arguments);
};
e.dynCall_viiij = function() {
  assert(F, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
  assert(!G, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
  return e.asm.dynCall_viiij.apply(null, arguments);
};
e.dynCall_viiiiiijii = function() {
  assert(F, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
  assert(!G, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
  return e.asm.dynCall_viiiiiijii.apply(null, arguments);
};
e.dynCall_fi = function() {
  assert(F, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
  assert(!G, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
  return e.asm.dynCall_fi.apply(null, arguments);
};
e.dynCall_vif = function() {
  assert(F, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
  assert(!G, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
  return e.asm.dynCall_vif.apply(null, arguments);
};
e.dynCall_idd = function() {
  assert(F, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
  assert(!G, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
  return e.asm.dynCall_idd.apply(null, arguments);
};
e.dynCall_viffff = function() {
  assert(F, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
  assert(!G, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
  return e.asm.dynCall_viffff.apply(null, arguments);
};
e.dynCall_iiiiiiiiiii = function() {
  assert(F, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
  assert(!G, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
  return e.asm.dynCall_iiiiiiiiiii.apply(null, arguments);
};
e.dynCall_viiifii = function() {
  assert(F, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
  assert(!G, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
  return e.asm.dynCall_viiifii.apply(null, arguments);
};
e.dynCall_viiifiii = function() {
  assert(F, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
  assert(!G, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
  return e.asm.dynCall_viiifiii.apply(null, arguments);
};
e.dynCall_iidiiii = function() {
  assert(F, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
  assert(!G, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
  return e.asm.dynCall_iidiiii.apply(null, arguments);
};
e.dynCall_iiiiij = function() {
  assert(F, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
  assert(!G, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
  return e.asm.dynCall_iiiiij.apply(null, arguments);
};
e.dynCall_iiiiid = function() {
  assert(F, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
  assert(!G, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
  return e.asm.dynCall_iiiiid.apply(null, arguments);
};
e.dynCall_iiiiijj = function() {
  assert(F, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
  assert(!G, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
  return e.asm.dynCall_iiiiijj.apply(null, arguments);
};
e.dynCall_iiiiiijj = function() {
  assert(F, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
  assert(!G, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
  return e.asm.dynCall_iiiiiijj.apply(null, arguments);
};
function Be(a, b) {
  var c = n();
  try {
    return $f(a, b);
  } catch (d) {
    p(c);
    if (d !== d + 0 && "longjmp" !== d) {
      throw d;
    }
    X(1, 0);
  }
}
function De(a, b, c, d) {
  var f = n();
  try {
    return bg(a, b, c, d);
  } catch (g) {
    p(f);
    if (g !== g + 0 && "longjmp" !== g) {
      throw g;
    }
    X(1, 0);
  }
}
function Je(a, b) {
  var c = n();
  try {
    hg(a, b);
  } catch (d) {
    p(c);
    if (d !== d + 0 && "longjmp" !== d) {
      throw d;
    }
    X(1, 0);
  }
}
function Le(a, b, c, d) {
  var f = n();
  try {
    jg(a, b, c, d);
  } catch (g) {
    p(f);
    if (g !== g + 0 && "longjmp" !== g) {
      throw g;
    }
    X(1, 0);
  }
}
function Ke(a, b, c) {
  var d = n();
  try {
    ig(a, b, c);
  } catch (f) {
    p(d);
    if (f !== f + 0 && "longjmp" !== f) {
      throw f;
    }
    X(1, 0);
  }
}
function Ce(a, b, c) {
  var d = n();
  try {
    return ag(a, b, c);
  } catch (f) {
    p(d);
    if (f !== f + 0 && "longjmp" !== f) {
      throw f;
    }
    X(1, 0);
  }
}
function He(a, b, c, d, f, g, h, k) {
  var u = n();
  try {
    return fg(a, b, c, d, f, g, h, k);
  } catch (q) {
    p(u);
    if (q !== q + 0 && "longjmp" !== q) {
      throw q;
    }
    X(1, 0);
  }
}
function Ee(a, b, c, d, f) {
  var g = n();
  try {
    return cg(a, b, c, d, f);
  } catch (h) {
    p(g);
    if (h !== h + 0 && "longjmp" !== h) {
      throw h;
    }
    X(1, 0);
  }
}
function Me(a, b, c, d, f) {
  var g = n();
  try {
    kg(a, b, c, d, f);
  } catch (h) {
    p(g);
    if (h !== h + 0 && "longjmp" !== h) {
      throw h;
    }
    X(1, 0);
  }
}
function Ie(a, b, c, d, f, g, h, k, u, q) {
  var v = n();
  try {
    return gg(a, b, c, d, f, g, h, k, u, q);
  } catch (x) {
    p(v);
    if (x !== x + 0 && "longjmp" !== x) {
      throw x;
    }
    X(1, 0);
  }
}
function Fe(a, b, c, d, f, g) {
  var h = n();
  try {
    return dg(a, b, c, d, f, g);
  } catch (k) {
    p(h);
    if (k !== k + 0 && "longjmp" !== k) {
      throw k;
    }
    X(1, 0);
  }
}
function Ge(a, b, c, d, f, g, h) {
  var k = n();
  try {
    return eg(a, b, c, d, f, g, h);
  } catch (u) {
    p(k);
    if (u !== u + 0 && "longjmp" !== u) {
      throw u;
    }
    X(1, 0);
  }
}
function Ne(a, b, c, d, f, g) {
  var h = n();
  try {
    lg(a, b, c, d, f, g);
  } catch (k) {
    p(h);
    if (k !== k + 0 && "longjmp" !== k) {
      throw k;
    }
    X(1, 0);
  }
}
function Pe(a, b, c, d, f, g, h, k, u, q) {
  var v = n();
  try {
    ng(a, b, c, d, f, g, h, k, u, q);
  } catch (x) {
    p(v);
    if (x !== x + 0 && "longjmp" !== x) {
      throw x;
    }
    X(1, 0);
  }
}
function Oe(a, b, c, d, f, g, h) {
  var k = n();
  try {
    mg(a, b, c, d, f, g, h);
  } catch (u) {
    p(k);
    if (u !== u + 0 && "longjmp" !== u) {
      throw u;
    }
    X(1, 0);
  }
}
e.asm = Z;
Object.getOwnPropertyDescriptor(e, "intArrayFromString") || (e.intArrayFromString = function() {
  l("'intArrayFromString' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
});
Object.getOwnPropertyDescriptor(e, "intArrayToString") || (e.intArrayToString = function() {
  l("'intArrayToString' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
});
Object.getOwnPropertyDescriptor(e, "ccall") || (e.ccall = function() {
  l("'ccall' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
});
Object.getOwnPropertyDescriptor(e, "cwrap") || (e.cwrap = function() {
  l("'cwrap' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
});
Object.getOwnPropertyDescriptor(e, "setValue") || (e.setValue = function() {
  l("'setValue' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
});
Object.getOwnPropertyDescriptor(e, "getValue") || (e.getValue = function() {
  l("'getValue' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
});
Object.getOwnPropertyDescriptor(e, "allocate") || (e.allocate = function() {
  l("'allocate' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
});
Object.getOwnPropertyDescriptor(e, "getMemory") || (e.getMemory = function() {
  l("'getMemory' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ). Alternatively, forcing filesystem support (-s FORCE_FILESYSTEM=1) can export this for you");
});
Object.getOwnPropertyDescriptor(e, "AsciiToString") || (e.AsciiToString = function() {
  l("'AsciiToString' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
});
Object.getOwnPropertyDescriptor(e, "stringToAscii") || (e.stringToAscii = function() {
  l("'stringToAscii' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
});
Object.getOwnPropertyDescriptor(e, "UTF8ArrayToString") || (e.UTF8ArrayToString = function() {
  l("'UTF8ArrayToString' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
});
Object.getOwnPropertyDescriptor(e, "UTF8ToString") || (e.UTF8ToString = function() {
  l("'UTF8ToString' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
});
Object.getOwnPropertyDescriptor(e, "stringToUTF8Array") || (e.stringToUTF8Array = function() {
  l("'stringToUTF8Array' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
});
Object.getOwnPropertyDescriptor(e, "stringToUTF8") || (e.stringToUTF8 = function() {
  l("'stringToUTF8' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
});
Object.getOwnPropertyDescriptor(e, "lengthBytesUTF8") || (e.lengthBytesUTF8 = function() {
  l("'lengthBytesUTF8' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
});
Object.getOwnPropertyDescriptor(e, "UTF16ToString") || (e.UTF16ToString = function() {
  l("'UTF16ToString' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
});
Object.getOwnPropertyDescriptor(e, "stringToUTF16") || (e.stringToUTF16 = function() {
  l("'stringToUTF16' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
});
Object.getOwnPropertyDescriptor(e, "lengthBytesUTF16") || (e.lengthBytesUTF16 = function() {
  l("'lengthBytesUTF16' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
});
Object.getOwnPropertyDescriptor(e, "UTF32ToString") || (e.UTF32ToString = function() {
  l("'UTF32ToString' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
});
Object.getOwnPropertyDescriptor(e, "stringToUTF32") || (e.stringToUTF32 = function() {
  l("'stringToUTF32' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
});
Object.getOwnPropertyDescriptor(e, "lengthBytesUTF32") || (e.lengthBytesUTF32 = function() {
  l("'lengthBytesUTF32' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
});
Object.getOwnPropertyDescriptor(e, "allocateUTF8") || (e.allocateUTF8 = function() {
  l("'allocateUTF8' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
});
Object.getOwnPropertyDescriptor(e, "stackTrace") || (e.stackTrace = function() {
  l("'stackTrace' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
});
Object.getOwnPropertyDescriptor(e, "addOnPreRun") || (e.addOnPreRun = function() {
  l("'addOnPreRun' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
});
Object.getOwnPropertyDescriptor(e, "addOnInit") || (e.addOnInit = function() {
  l("'addOnInit' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
});
Object.getOwnPropertyDescriptor(e, "addOnPreMain") || (e.addOnPreMain = function() {
  l("'addOnPreMain' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
});
Object.getOwnPropertyDescriptor(e, "addOnExit") || (e.addOnExit = function() {
  l("'addOnExit' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
});
Object.getOwnPropertyDescriptor(e, "addOnPostRun") || (e.addOnPostRun = function() {
  l("'addOnPostRun' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
});
Object.getOwnPropertyDescriptor(e, "writeStringToMemory") || (e.writeStringToMemory = function() {
  l("'writeStringToMemory' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
});
Object.getOwnPropertyDescriptor(e, "writeArrayToMemory") || (e.writeArrayToMemory = function() {
  l("'writeArrayToMemory' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
});
Object.getOwnPropertyDescriptor(e, "writeAsciiToMemory") || (e.writeAsciiToMemory = function() {
  l("'writeAsciiToMemory' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
});
Object.getOwnPropertyDescriptor(e, "addRunDependency") || (e.addRunDependency = function() {
  l("'addRunDependency' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ). Alternatively, forcing filesystem support (-s FORCE_FILESYSTEM=1) can export this for you");
});
Object.getOwnPropertyDescriptor(e, "removeRunDependency") || (e.removeRunDependency = function() {
  l("'removeRunDependency' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ). Alternatively, forcing filesystem support (-s FORCE_FILESYSTEM=1) can export this for you");
});
Object.getOwnPropertyDescriptor(e, "ENV") || (e.ENV = function() {
  l("'ENV' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
});
Object.getOwnPropertyDescriptor(e, "FS") || (e.FS = function() {
  l("'FS' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
});
Object.getOwnPropertyDescriptor(e, "FS_createFolder") || (e.FS_createFolder = function() {
  l("'FS_createFolder' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ). Alternatively, forcing filesystem support (-s FORCE_FILESYSTEM=1) can export this for you");
});
Object.getOwnPropertyDescriptor(e, "FS_createPath") || (e.FS_createPath = function() {
  l("'FS_createPath' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ). Alternatively, forcing filesystem support (-s FORCE_FILESYSTEM=1) can export this for you");
});
Object.getOwnPropertyDescriptor(e, "FS_createDataFile") || (e.FS_createDataFile = function() {
  l("'FS_createDataFile' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ). Alternatively, forcing filesystem support (-s FORCE_FILESYSTEM=1) can export this for you");
});
Object.getOwnPropertyDescriptor(e, "FS_createPreloadedFile") || (e.FS_createPreloadedFile = function() {
  l("'FS_createPreloadedFile' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ). Alternatively, forcing filesystem support (-s FORCE_FILESYSTEM=1) can export this for you");
});
Object.getOwnPropertyDescriptor(e, "FS_createLazyFile") || (e.FS_createLazyFile = function() {
  l("'FS_createLazyFile' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ). Alternatively, forcing filesystem support (-s FORCE_FILESYSTEM=1) can export this for you");
});
Object.getOwnPropertyDescriptor(e, "FS_createLink") || (e.FS_createLink = function() {
  l("'FS_createLink' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ). Alternatively, forcing filesystem support (-s FORCE_FILESYSTEM=1) can export this for you");
});
Object.getOwnPropertyDescriptor(e, "FS_createDevice") || (e.FS_createDevice = function() {
  l("'FS_createDevice' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ). Alternatively, forcing filesystem support (-s FORCE_FILESYSTEM=1) can export this for you");
});
Object.getOwnPropertyDescriptor(e, "FS_unlink") || (e.FS_unlink = function() {
  l("'FS_unlink' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ). Alternatively, forcing filesystem support (-s FORCE_FILESYSTEM=1) can export this for you");
});
Object.getOwnPropertyDescriptor(e, "GL") || (e.GL = function() {
  l("'GL' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
});
Object.getOwnPropertyDescriptor(e, "dynamicAlloc") || (e.dynamicAlloc = function() {
  l("'dynamicAlloc' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
});
Object.getOwnPropertyDescriptor(e, "warnOnce") || (e.warnOnce = function() {
  l("'warnOnce' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
});
Object.getOwnPropertyDescriptor(e, "loadDynamicLibrary") || (e.loadDynamicLibrary = function() {
  l("'loadDynamicLibrary' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
});
Object.getOwnPropertyDescriptor(e, "loadWebAssemblyModule") || (e.loadWebAssemblyModule = function() {
  l("'loadWebAssemblyModule' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
});
Object.getOwnPropertyDescriptor(e, "getLEB") || (e.getLEB = function() {
  l("'getLEB' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
});
Object.getOwnPropertyDescriptor(e, "getFunctionTables") || (e.getFunctionTables = function() {
  l("'getFunctionTables' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
});
Object.getOwnPropertyDescriptor(e, "alignFunctionTables") || (e.alignFunctionTables = function() {
  l("'alignFunctionTables' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
});
Object.getOwnPropertyDescriptor(e, "registerFunctions") || (e.registerFunctions = function() {
  l("'registerFunctions' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
});
Object.getOwnPropertyDescriptor(e, "addFunction") || (e.addFunction = function() {
  l("'addFunction' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
});
Object.getOwnPropertyDescriptor(e, "removeFunction") || (e.removeFunction = function() {
  l("'removeFunction' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
});
Object.getOwnPropertyDescriptor(e, "getFuncWrapper") || (e.getFuncWrapper = function() {
  l("'getFuncWrapper' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
});
Object.getOwnPropertyDescriptor(e, "prettyPrint") || (e.prettyPrint = function() {
  l("'prettyPrint' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
});
Object.getOwnPropertyDescriptor(e, "makeBigInt") || (e.makeBigInt = function() {
  l("'makeBigInt' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
});
Object.getOwnPropertyDescriptor(e, "dynCall") || (e.dynCall = function() {
  l("'dynCall' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
});
Object.getOwnPropertyDescriptor(e, "getCompilerSetting") || (e.getCompilerSetting = function() {
  l("'getCompilerSetting' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
});
Object.getOwnPropertyDescriptor(e, "stackSave") || (e.stackSave = function() {
  l("'stackSave' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
});
Object.getOwnPropertyDescriptor(e, "stackRestore") || (e.stackRestore = function() {
  l("'stackRestore' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
});
Object.getOwnPropertyDescriptor(e, "stackAlloc") || (e.stackAlloc = function() {
  l("'stackAlloc' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
});
Object.getOwnPropertyDescriptor(e, "establishStackSpace") || (e.establishStackSpace = function() {
  l("'establishStackSpace' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
});
Object.getOwnPropertyDescriptor(e, "print") || (e.print = function() {
  l("'print' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
});
Object.getOwnPropertyDescriptor(e, "printErr") || (e.printErr = function() {
  l("'printErr' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
});
Object.getOwnPropertyDescriptor(e, "getTempRet0") || (e.getTempRet0 = function() {
  l("'getTempRet0' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
});
Object.getOwnPropertyDescriptor(e, "setTempRet0") || (e.setTempRet0 = function() {
  l("'setTempRet0' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
});
Object.getOwnPropertyDescriptor(e, "callMain") || (e.callMain = function() {
  l("'callMain' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
});
Object.getOwnPropertyDescriptor(e, "Pointer_stringify") || (e.Pointer_stringify = function() {
  l("'Pointer_stringify' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
});
Object.getOwnPropertyDescriptor(e, "ALLOC_NORMAL") || Object.defineProperty(e, "ALLOC_NORMAL", {get:function() {
  l("'ALLOC_NORMAL' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
}});
Object.getOwnPropertyDescriptor(e, "ALLOC_STACK") || Object.defineProperty(e, "ALLOC_STACK", {get:function() {
  l("'ALLOC_STACK' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
}});
Object.getOwnPropertyDescriptor(e, "ALLOC_DYNAMIC") || Object.defineProperty(e, "ALLOC_DYNAMIC", {get:function() {
  l("'ALLOC_DYNAMIC' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
}});
Object.getOwnPropertyDescriptor(e, "ALLOC_NONE") || Object.defineProperty(e, "ALLOC_NONE", {get:function() {
  l("'ALLOC_NONE' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
}});
function qa(a) {
  this.name = "ExitStatus";
  this.message = "Program terminated with exit(" + a + ")";
  this.status = a;
}
hb = function og() {
  e.calledRun || pg();
  e.calledRun || (hb = og);
};
function pg() {
  function a() {
    if (!e.calledRun && (e.calledRun = !0, !Ba)) {
      Ra();
      assert(!F);
      F = !0;
      if (!e.noFSInit && !xc) {
        assert(!xc, "FS.init was previously called. If you want to initialize later with custom parameters, remove any earlier calls (note that one is automatically added to the generated code)");
        xc = !0;
        wc();
        e.stdin = e.stdin;
        e.stdout = e.stdout;
        e.stderr = e.stderr;
        e.stdin ? zc("stdin", e.stdin) : sc("/dev/tty", "/dev/stdin");
        e.stdout ? zc("stdout", null, e.stdout) : sc("/dev/tty", "/dev/stdout");
        e.stderr ? zc("stderr", null, e.stderr) : sc("/dev/tty1", "/dev/stderr");
        var a = tc("/dev/stdin", "r"), c = tc("/dev/stdout", "w"), d = tc("/dev/stderr", "w");
        assert(0 === a.fd, "invalid handle for stdin (" + a.fd + ")");
        assert(1 === c.fd, "invalid handle for stdout (" + c.fd + ")");
        assert(2 === d.fd, "invalid handle for stderr (" + d.fd + ")");
      }
      Sa(Ua);
      Ra();
      Zb = !1;
      Sa(Va);
      if (e.onRuntimeInitialized) {
        e.onRuntimeInitialized();
      }
      assert(!e._main, 'compiled without a main, but one is present. if you added it from JS, use Module["onRuntimeInitialized"]');
      Ra();
      if (e.postRun) {
        for ("function" == typeof e.postRun && (e.postRun = [e.postRun]); e.postRun.length;) {
          a = e.postRun.shift(), Xa.unshift(a);
        }
      }
      Sa(Xa);
    }
  }
  if (!(0 < fb)) {
    assert(!0);
    A[477097] = 34821223;
    A[477098] = 2310721022;
    if (e.preRun) {
      for ("function" == typeof e.preRun && (e.preRun = [e.preRun]); e.preRun.length;) {
        Ya();
      }
    }
    Sa(Ta);
    0 < fb || e.calledRun || (e.setStatus ? (e.setStatus("Running..."), setTimeout(function() {
      setTimeout(function() {
        e.setStatus("");
      }, 1);
      a();
    }, 1)) : a(), Ra());
  }
}
e.run = pg;
function Ae() {
  var a = ra, b = m, c = !1;
  ra = m = function() {
    c = !0;
  };
  try {
    var d = e._fflush;
    d && d(0);
    ["stdout", "stderr"].forEach(function(a) {
      a = "/dev/" + a;
      try {
        var b = O(a, {W:!0});
        a = b.path;
      } catch (k) {
      }
      var d = {Na:!1, exists:!1, error:0, name:null, path:null, object:null, Pa:!1, Ra:null, Qa:null};
      try {
        b = O(a, {parent:!0}), d.Pa = !0, d.Ra = b.path, d.Qa = b.node, d.name = Cb(a), b = O(a, {W:!0}), d.exists = !0, d.path = b.path, d.object = b.node, d.name = b.node.name, d.Na = "/" === b.path;
      } catch (k) {
        d.error = k.i;
      }
      d && (b = Gb[d.object.rdev]) && b.output && b.output.length && (c = !0);
    });
  } catch (f) {
  }
  ra = a;
  m = b;
  c && va("stdio streams had content in them that was not flushed. you should set EXIT_RUNTIME to 1 (see the FAQ), or make sure to emit a newline when you printf etc.");
}
var qg = [];
function l(a) {
  if (e.onAbort) {
    e.onAbort(a);
  }
  ra(a);
  m(a);
  Ba = !0;
  var b = "abort(" + a + ") at " + vb();
  qg && qg.forEach(function(c) {
    b = c(b, a);
  });
  throw b;
}
e.abort = l;
if (e.preInit) {
  for ("function" == typeof e.preInit && (e.preInit = [e.preInit]); 0 < e.preInit.length;) {
    e.preInit.pop()();
  }
}
e.noExitRuntime = !0;
pg();

