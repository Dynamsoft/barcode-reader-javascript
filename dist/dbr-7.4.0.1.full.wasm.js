var e;
e || (e = typeof Module !== 'undefined' ? Module : {});
var aa = {}, ba;
for (ba in e) {
  e.hasOwnProperty(ba) && (aa[ba] = e[ba]);
}
var ca = "./this.program", da = !1, ea = !1, fa = !1, ha = !1, ja = !1;
da = "object" === typeof window;
ea = "function" === typeof importScripts;
fa = (ha = "object" === typeof process && "object" === typeof process.versions && "string" === typeof process.versions.node) && !da && !ea;
ja = !da && !fa && !ea;
if (e.ENVIRONMENT) {
  throw Error("Module.ENVIRONMENT has been deprecated. To force the environment, use the ENVIRONMENT compile-time option (for example, -s ENVIRONMENT=web or -s ENVIRONMENT=node)");
}
var l = "", ka, la;
if (fa) {
  l = __dirname + "/";
  var ma, na;
  ka = function(a, b) {
    ma || (ma = require("fs"));
    na || (na = require("path"));
    a = na.normalize(a);
    a = ma.readFileSync(a);
    return b ? a : a.toString();
  };
  la = function(a) {
    a = ka(a, !0);
    a.buffer || (a = new Uint8Array(a));
    assert(a.buffer);
    return a;
  };
  1 < process.argv.length && (ca = process.argv[1].replace(/\\/g, "/"));
  process.argv.slice(2);
  "undefined" !== typeof module && (module.exports = e);
  process.on("uncaughtException", function(a) {
    throw a;
  });
  process.on("unhandledRejection", m);
  e.inspect = function() {
    return "[Emscripten Module object]";
  };
} else {
  if (ja) {
    "undefined" != typeof read && (ka = function(a) {
      return read(a);
    }), la = function(a) {
      if ("function" === typeof readbuffer) {
        return new Uint8Array(readbuffer(a));
      }
      a = read(a, "binary");
      assert("object" === typeof a);
      return a;
    }, "undefined" !== typeof print && ("undefined" === typeof console && (console = {}), console.log = print, console.warn = console.error = "undefined" !== typeof printErr ? printErr : print);
  } else {
    if (da || ea) {
      ea ? l = self.location.href : document.currentScript && (l = document.currentScript.src), l = 0 !== l.indexOf("blob:") ? l.substr(0, l.lastIndexOf("/") + 1) : "", ka = function(a) {
        var b = new XMLHttpRequest;
        b.open("GET", a, !1);
        b.send(null);
        return b.responseText;
      }, ea && (la = function(a) {
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
var oa = e.print || console.log.bind(console), n = e.printErr || console.warn.bind(console);
for (ba in aa) {
  aa.hasOwnProperty(ba) && (e[ba] = aa[ba]);
}
aa = null;
Object.getOwnPropertyDescriptor(e, "arguments") || Object.defineProperty(e, "arguments", {get:function() {
  m("Module.arguments has been replaced with plain arguments_");
}});
e.thisProgram && (ca = e.thisProgram);
Object.getOwnPropertyDescriptor(e, "thisProgram") || Object.defineProperty(e, "thisProgram", {get:function() {
  m("Module.thisProgram has been replaced with plain thisProgram");
}});
Object.getOwnPropertyDescriptor(e, "quit") || Object.defineProperty(e, "quit", {get:function() {
  m("Module.quit has been replaced with plain quit_");
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
  m("Module.read has been replaced with plain read_");
}});
Object.getOwnPropertyDescriptor(e, "readAsync") || Object.defineProperty(e, "readAsync", {get:function() {
  m("Module.readAsync has been replaced with plain readAsync");
}});
Object.getOwnPropertyDescriptor(e, "readBinary") || Object.defineProperty(e, "readBinary", {get:function() {
  m("Module.readBinary has been replaced with plain readBinary");
}});
function pa(a) {
  assert(qa);
  var b = p[qa >> 2];
  a = b + a + 15 & -16;
  a > ra() && m("failure to dynamicAlloc - memory growth etc. is not supported there, call malloc/sbrk directly");
  p[qa >> 2] = a;
  return b;
}
function sa(a) {
  ta || (ta = {});
  ta[a] || (ta[a] = 1, n(a));
}
var ta;
function ua(a, b, c) {
  return c ? +(a >>> 0) + 4294967296.0 * +(b >>> 0) : +(a >>> 0) + 4294967296.0 * +(b | 0);
}
var va;
e.wasmBinary && (va = e.wasmBinary);
Object.getOwnPropertyDescriptor(e, "wasmBinary") || Object.defineProperty(e, "wasmBinary", {get:function() {
  m("Module.wasmBinary has been replaced with plain wasmBinary");
}});
"object" !== typeof WebAssembly && m("No WebAssembly support found. Build with -s WASM=0 to target JavaScript instead.");
var wa, xa = !1;
function assert(a, b) {
  a || m("Assertion failed: " + b);
}
function ya(a) {
  if ("number" === typeof a) {
    var b = !0;
    var c = a;
  } else {
    b = !1, c = a.length;
  }
  var d = za(Math.max(c, 1));
  if (b) {
    a = d;
    assert(0 == (d & 3));
    for (b = d + (c & -4); a < b; a += 4) {
      p[a >> 2] = 0;
    }
    for (b = d + c; a < b;) {
      q[a++ >> 0] = 0;
    }
    return d;
  }
  a.subarray || a.slice ? w.set(a, d) : w.set(new Uint8Array(a), d);
  return d;
}
var Aa = "undefined" !== typeof TextDecoder ? new TextDecoder("utf8") : void 0;
function Ba(a, b, c) {
  var d = b + c;
  for (c = b; a[c] && !(c >= d);) {
    ++c;
  }
  if (16 < c - b && a.subarray && Aa) {
    return Aa.decode(a.subarray(b, c));
  }
  for (d = ""; b < c;) {
    var f = a[b++];
    if (f & 128) {
      var g = a[b++] & 63;
      if (192 == (f & 224)) {
        d += String.fromCharCode((f & 31) << 6 | g);
      } else {
        var h = a[b++] & 63;
        224 == (f & 240) ? f = (f & 15) << 12 | g << 6 | h : (240 != (f & 248) && sa("Invalid UTF-8 leading byte 0x" + f.toString(16) + " encountered when deserializing a UTF-8 string on the asm.js/wasm heap to a JS string!"), f = (f & 7) << 18 | g << 12 | h << 6 | a[b++] & 63);
        65536 > f ? d += String.fromCharCode(f) : (f -= 65536, d += String.fromCharCode(55296 | f >> 10, 56320 | f & 1023));
      }
    } else {
      d += String.fromCharCode(f);
    }
  }
  return d;
}
function x(a) {
  return a ? Ba(w, a, void 0) : "";
}
function Ca(a, b, c, d) {
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
          2097152 <= h && sa("Invalid Unicode code point 0x" + h.toString(16) + " encountered when serializing a JS string to an UTF-8 string on the asm.js/wasm heap! (Valid unicode code points should be in range 0-0x1FFFFF).");
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
function Da(a, b, c) {
  assert("number" == typeof c, "stringToUTF8(str, outPtr, maxBytesToWrite) is missing the third parameter that specifies the length of the output buffer!");
  Ca(a, w, b, c);
}
function Ea(a) {
  for (var b = 0, c = 0; c < a.length; ++c) {
    var d = a.charCodeAt(c);
    55296 <= d && 57343 >= d && (d = 65536 + ((d & 1023) << 10) | a.charCodeAt(++c) & 1023);
    127 >= d ? ++b : b = 2047 >= d ? b + 2 : 65535 >= d ? b + 3 : b + 4;
  }
  return b;
}
"undefined" !== typeof TextDecoder && new TextDecoder("utf-16le");
function Fa(a, b) {
  assert(0 <= a.length, "writeArrayToMemory array must have a length (should be an array or typed array)");
  q.set(a, b);
}
function Ga(a) {
  0 < a % 65536 && (a += 65536 - a % 65536);
  return a;
}
var buffer, q, w, Ha, Ia, p, y, Ja, Ka;
function La() {
  e.HEAP8 = q = new Int8Array(buffer);
  e.HEAP16 = Ha = new Int16Array(buffer);
  e.HEAP32 = p = new Int32Array(buffer);
  e.HEAPU8 = w = new Uint8Array(buffer);
  e.HEAPU16 = Ia = new Uint16Array(buffer);
  e.HEAPU32 = y = new Uint32Array(buffer);
  e.HEAPF32 = Ja = new Float32Array(buffer);
  e.HEAPF64 = Ka = new Float64Array(buffer);
}
var qa = 1745136;
assert(!0, "stack must start aligned");
assert(!0, "heap must start aligned");
e.TOTAL_STACK && assert(5242880 === e.TOTAL_STACK, "the stack size can no longer be determined at runtime");
var Ma = e.TOTAL_MEMORY || 16777216;
Object.getOwnPropertyDescriptor(e, "TOTAL_MEMORY") || Object.defineProperty(e, "TOTAL_MEMORY", {get:function() {
  m("Module.TOTAL_MEMORY has been replaced with plain INITIAL_TOTAL_MEMORY");
}});
assert(5242880 <= Ma, "TOTAL_MEMORY should be larger than TOTAL_STACK, was " + Ma + "! (TOTAL_STACK=5242880)");
assert("undefined" !== typeof Int32Array && "undefined" !== typeof Float64Array && void 0 !== Int32Array.prototype.subarray && void 0 !== Int32Array.prototype.set, "JS engine does not provide full typed array support");
e.wasmMemory ? wa = e.wasmMemory : wa = new WebAssembly.Memory({initial:Ma / 65536});
wa && (buffer = wa.buffer);
Ma = buffer.byteLength;
assert(0 === Ma % 65536);
La();
p[qa >> 2] = 6988032;
function Na() {
  var a = y[436289], b = y[436290];
  34821223 == a && 2310721022 == b || m("Stack overflow! Stack cookie has been overwritten, expected hex dwords 0x89BACDFE and 0x02135467, but received 0x" + b.toString(16) + " " + a.toString(16));
  1668509029 !== p[0] && m("Runtime error: The application has corrupted its heap memory area (address zero)!");
}
p[0] = 1668509029;
Ha[1] = 25459;
if (115 !== w[2] || 99 !== w[3]) {
  throw "Runtime error: expected the system to be little-endian!";
}
function Oa(a) {
  for (; 0 < a.length;) {
    var b = a.shift();
    if ("function" == typeof b) {
      b();
    } else {
      var c = b.ya;
      "number" === typeof c ? void 0 === b.aa ? e.dynCall_v(c) : e.dynCall_vi(c, b.aa) : c(void 0 === b.aa ? null : b.aa);
    }
  }
}
var Pa = [], Qa = [], Ra = [], Sa = [], Ta = [], E = !1;
function Ua() {
  var a = e.preRun.shift();
  Pa.unshift(a);
}
function Va(a, b) {
  return 0 <= a ? a : 32 >= b ? 2 * Math.abs(1 << b - 1) + a : Math.pow(2, b) + a;
}
function Wa(a, b) {
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
var Xa = Math.abs, Ya = Math.sqrt, Za = Math.ceil, $a = Math.floor, ab = Math.min, bb = 0, cb = null, db = null, eb = {};
function fb() {
  bb++;
  e.monitorRunDependencies && e.monitorRunDependencies(bb);
  assert(!eb["wasm-instantiate"]);
  eb["wasm-instantiate"] = 1;
  null === cb && "undefined" !== typeof setInterval && (cb = setInterval(function() {
    if (xa) {
      clearInterval(cb), cb = null;
    } else {
      var a = !1, b;
      for (b in eb) {
        a || (a = !0, n("still waiting on run dependencies:")), n("dependency: " + b);
      }
      a && n("(end of list)");
    }
  }, 10000));
}
e.preloadedImages = {};
e.preloadedAudios = {};
function gb() {
  var a = hb;
  return String.prototype.startsWith ? a.startsWith("data:application/octet-stream;base64,") : 0 === a.indexOf("data:application/octet-stream;base64,");
}
var hb = "libDynamsoftBarcodeReader.wasm";
if (!gb()) {
  var ib = hb;
  hb = e.locateFile ? e.locateFile(ib, l) : l + ib;
}
function jb() {
  try {
    if (va) {
      return new Uint8Array(va);
    }
    if (la) {
      return la(hb);
    }
    throw "both async and sync fetching of the wasm failed";
  } catch (a) {
    m(a);
  }
}
function kb() {
  return va || !da && !ea || "function" !== typeof fetch ? new Promise(function(a) {
    a(jb());
  }) : fetch(hb, {credentials:"same-origin"}).then(function(a) {
    if (!a.ok) {
      throw "failed to load wasm binary file at '" + hb + "'";
    }
    return a.arrayBuffer();
  }).catch(function() {
    return jb();
  });
}
function lb(a) {
  function b(a) {
    e.asm = a.exports;
    bb--;
    e.monitorRunDependencies && e.monitorRunDependencies(bb);
    assert(eb["wasm-instantiate"]);
    delete eb["wasm-instantiate"];
    0 == bb && (null !== cb && (clearInterval(cb), cb = null), db && (a = db, db = null, a()));
  }
  function c(a) {
    assert(e === g, "the Module object should not be replaced during async compilation - perhaps the order of HTML elements is wrong?");
    g = null;
    b(a.instance);
  }
  function d(a) {
    return kb().then(function(a) {
      return WebAssembly.instantiate(a, f);
    }).then(a, function(a) {
      n("failed to asynchronously prepare wasm: " + a);
      m(a);
    });
  }
  var f = {env:a};
  fb();
  var g = e;
  if (e.instantiateWasm) {
    try {
      return e.instantiateWasm(f, b);
    } catch (h) {
      return n("Module.instantiateWasm callback failed with error: " + h), !1;
    }
  }
  (function() {
    if (va || "function" !== typeof WebAssembly.instantiateStreaming || gb() || "function" !== typeof fetch) {
      return d(c);
    }
    fetch(hb, {credentials:"same-origin"}).then(function(a) {
      return WebAssembly.instantiateStreaming(a, f).then(c, function(a) {
        n("wasm streaming compile failed: " + a);
        n("falling back to ArrayBuffer instantiation");
        d(c);
      });
    });
  })();
  return {};
}
e.asm = function(a, b) {
  b.memory = wa;
  b.table = new WebAssembly.Table({initial:8339, maximum:8339, element:"anyfunc"});
  a = lb(b);
  assert(a, "binaryen setup failed (no wasm support?)");
  return a;
};
var F, mb;
Qa.push({ya:function() {
  nb();
}});
function ob(a) {
  sa("warning: build with  -s DEMANGLE_SUPPORT=1  to link in libcxxabi demangling");
  return a;
}
function pb(a) {
  return a.replace(/_Z[\w\d_]+/g, function(a) {
    var b = ob(a);
    return a === b ? a : b + " [" + a + "]";
  });
}
function qb() {
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
function rb() {
  var a = qb();
  e.extraStackTrace && (a += "\n" + e.extraStackTrace());
  return pb(a);
}
var G = {};
function sb(a) {
  if (sb.s) {
    var b = p[a >> 2];
    var c = p[b >> 2];
  } else {
    sb.s = !0, G.USER = G.LOGNAME = "web_user", G.PATH = "/", G.PWD = "/", G.HOME = "/home/web_user", G.LANG = "C.UTF-8", G.LANG = ("object" === typeof navigator && navigator.languages && navigator.languages[0] || "C").replace("-", "_") + ".UTF-8", G._ = ca, c = E ? za(1024) : pa(1024), b = E ? za(256) : pa(256), p[b >> 2] = c, p[a >> 2] = b;
  }
  a = [];
  var d = 0, f;
  for (f in G) {
    if ("string" === typeof G[f]) {
      var g = f + "=" + G[f];
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
      assert(d.charCodeAt(k) === d.charCodeAt(k) & 255), q[h++ >> 0] = d.charCodeAt(k);
    }
    q[h >> 0] = 0;
    p[b + 4 * f >> 2] = c;
    c += g.length + 1;
  }
  p[b + 4 * a.length >> 2] = 0;
}
function tb(a, b) {
  sa("atexit() called, but EXIT_RUNTIME is not set, so atexits() will not be called. set EXIT_RUNTIME to 1 (see the FAQ)");
  Sa.unshift({ya:a, aa:b});
}
function ub(a) {
  e.___errno_location ? p[e.___errno_location() >> 2] = a : n("failed to set errno from JS");
  return a;
}
function vb(a, b) {
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
function wb(a) {
  var b = "/" === a.charAt(0), c = "/" === a.substr(-1);
  (a = vb(a.split("/").filter(function(a) {
    return !!a;
  }), !b).join("/")) || b || (a = ".");
  a && c && (a += "/");
  return (b ? "/" : "") + a;
}
function xb(a) {
  var b = /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/.exec(a).slice(1);
  a = b[0];
  b = b[1];
  if (!a && !b) {
    return ".";
  }
  b && (b = b.substr(0, b.length - 1));
  return a + b;
}
function yb(a) {
  if ("/" === a) {
    return "/";
  }
  var b = a.lastIndexOf("/");
  return -1 === b ? a : a.substr(b + 1);
}
function zb() {
  var a = Array.prototype.slice.call(arguments, 0);
  return wb(a.join("/"));
}
function Ab(a, b) {
  return wb(a + "/" + b);
}
function Bb() {
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
  a = vb(a.split("/").filter(function(a) {
    return !!a;
  }), !b).join("/");
  return (b ? "/" : "") + a || ".";
}
var Cb = [];
function Db(a, b) {
  Cb[a] = {input:[], output:[], U:b};
  Eb(a, Fb);
}
var Fb = {open:function(a) {
  var b = Cb[a.node.rdev];
  if (!b) {
    throw new H(19);
  }
  a.tty = b;
  a.seekable = !1;
}, close:function(a) {
  a.tty.U.flush(a.tty);
}, flush:function(a) {
  a.tty.U.flush(a.tty);
}, read:function(a, b, c, d) {
  if (!a.tty || !a.tty.U.Aa) {
    throw new H(6);
  }
  for (var f = 0, g = 0; g < d; g++) {
    try {
      var h = a.tty.U.Aa(a.tty);
    } catch (k) {
      throw new H(5);
    }
    if (void 0 === h && 0 === f) {
      throw new H(11);
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
    throw new H(6);
  }
  try {
    for (var f = 0; f < d; f++) {
      a.tty.U.na(a.tty, b[c + f]);
    }
  } catch (g) {
    throw new H(5);
  }
  d && (a.node.timestamp = Date.now());
  return f;
}}, Hb = {Aa:function(a) {
  if (!a.input.length) {
    var b = null;
    if (fa) {
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
    a.input = Gb(b, !0);
  }
  return a.input.shift();
}, na:function(a, b) {
  null === b || 10 === b ? (oa(Ba(a.output, 0)), a.output = []) : 0 != b && a.output.push(b);
}, flush:function(a) {
  a.output && 0 < a.output.length && (oa(Ba(a.output, 0)), a.output = []);
}}, Ib = {na:function(a, b) {
  null === b || 10 === b ? (n(Ba(a.output, 0)), a.output = []) : 0 != b && a.output.push(b);
}, flush:function(a) {
  a.output && 0 < a.output.length && (n(Ba(a.output, 0)), a.output = []);
}}, I = {G:null, v:function() {
  return I.createNode(null, "/", 16895, 0);
}, createNode:function(a, b, c, d) {
  if (24576 === (c & 61440) || 4096 === (c & 61440)) {
    throw new H(1);
  }
  I.G || (I.G = {dir:{node:{I:I.f.I, C:I.f.C, lookup:I.f.lookup, W:I.f.W, rename:I.f.rename, unlink:I.f.unlink, rmdir:I.f.rmdir, readdir:I.f.readdir, symlink:I.f.symlink}, stream:{K:I.g.K}}, file:{node:{I:I.f.I, C:I.f.C}, stream:{K:I.g.K, read:I.g.read, write:I.g.write, qa:I.g.qa, Ba:I.g.Ba, fa:I.g.fa}}, link:{node:{I:I.f.I, C:I.f.C, readlink:I.f.readlink}, stream:{}}, sa:{node:{I:I.f.I, C:I.f.C}, stream:Jb}});
  c = Kb(a, b, c, d);
  J(c.mode) ? (c.f = I.G.dir.node, c.g = I.G.dir.stream, c.c = {}) : 32768 === (c.mode & 61440) ? (c.f = I.G.file.node, c.g = I.G.file.stream, c.l = 0, c.c = null) : 40960 === (c.mode & 61440) ? (c.f = I.G.link.node, c.g = I.G.link.stream) : 8192 === (c.mode & 61440) && (c.f = I.G.sa.node, c.g = I.G.sa.stream);
  c.timestamp = Date.now();
  a && (a.c[b] = c);
  return c;
}, td:function(a) {
  if (a.c && a.c.subarray) {
    for (var b = [], c = 0; c < a.l; ++c) {
      b.push(a.c[c]);
    }
    return b;
  }
  return a.c;
}, ud:function(a) {
  return a.c ? a.c.subarray ? a.c.subarray(0, a.l) : new Uint8Array(a.c) : new Uint8Array;
}, ua:function(a, b) {
  var c = a.c ? a.c.length : 0;
  c >= b || (b = Math.max(b, c * (1048576 > c ? 2.0 : 1.125) | 0), 0 != c && (b = Math.max(b, 256)), c = a.c, a.c = new Uint8Array(b), 0 < a.l && a.c.set(c.subarray(0, a.l), 0));
}, Sa:function(a, b) {
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
  J(a.mode) ? b.size = 4096 : 32768 === (a.mode & 61440) ? b.size = a.l : 40960 === (a.mode & 61440) ? b.size = a.link.length : b.size = 0;
  b.atime = new Date(a.timestamp);
  b.mtime = new Date(a.timestamp);
  b.ctime = new Date(a.timestamp);
  b.L = 4096;
  b.blocks = Math.ceil(b.size / b.L);
  return b;
}, C:function(a, b) {
  void 0 !== b.mode && (a.mode = b.mode);
  void 0 !== b.timestamp && (a.timestamp = b.timestamp);
  void 0 !== b.size && I.Sa(a, b.size);
}, lookup:function() {
  throw Lb[2];
}, W:function(a, b, c, d) {
  return I.createNode(a, b, c, d);
}, rename:function(a, b, c) {
  if (J(a.mode)) {
    try {
      var d = Mb(b, c);
    } catch (g) {
    }
    if (d) {
      for (var f in d.c) {
        throw new H(39);
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
  var c = Mb(a, b), d;
  for (d in c.c) {
    throw new H(39);
  }
  delete a.c[b];
}, readdir:function(a) {
  var b = [".", ".."], c;
  for (c in a.c) {
    a.c.hasOwnProperty(c) && b.push(c);
  }
  return b;
}, symlink:function(a, b, c) {
  a = I.createNode(a, b, 41471, 0);
  a.link = c;
  return a;
}, readlink:function(a) {
  if (40960 !== (a.mode & 61440)) {
    throw new H(22);
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
  g && sa("file packager has copied file data into memory, but in memory growth we are forced to copy it again (see --no-heap-copy)");
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
  I.ua(a, f + d);
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
    throw new H(22);
  }
  return b;
}, qa:function(a, b, c) {
  I.ua(a.node, b + c);
  a.node.l = Math.max(a.node.l, b + c);
}, Ba:function(a, b, c, d, f, g, h) {
  if (32768 !== (a.node.mode & 61440)) {
    throw new H(19);
  }
  c = a.node.c;
  if (h & 2 || c.buffer !== b && c.buffer !== b.buffer) {
    if (0 < f || f + d < a.node.l) {
      c.subarray ? c = c.subarray(f, f + d) : c = Array.prototype.slice.call(c, f, f + d);
    }
    a = !0;
    f = b.buffer == q.buffer;
    d = za(d);
    if (!d) {
      throw new H(12);
    }
    (f ? q : b).set(c, d);
  } else {
    a = !1, d = c.byteOffset;
  }
  return {j:d, Ea:a};
}, fa:function(a, b, c, d, f) {
  if (32768 !== (a.node.mode & 61440)) {
    throw new H(19);
  }
  if (f & 2) {
    return 0;
  }
  I.g.write(a, b, 0, d, c, !1);
  return 0;
}}}, K = {ea:!1, Va:function() {
  K.ea = !!process.platform.match(/^win/);
  var a = process.binding("constants");
  a.fs && (a = a.fs);
  K.va = {1024:a.O_APPEND, 64:a.O_CREAT, 128:a.O_EXCL, 0:a.O_RDONLY, 2:a.O_RDWR, 4096:a.O_SYNC, 512:a.O_TRUNC, 1:a.O_WRONLY};
}, ra:function(a) {
  return Buffer.s ? Buffer.from(a) : new Buffer(a);
}, v:function(a) {
  assert(ha);
  return K.createNode(null, "/", K.za(a.ma.root), 0);
}, createNode:function(a, b, c) {
  if (!J(c) && 32768 !== (c & 61440) && 40960 !== (c & 61440)) {
    throw new H(22);
  }
  a = Kb(a, b, c);
  a.f = K.f;
  a.g = K.g;
  return a;
}, za:function(a) {
  try {
    var b = fs.lstatSync(a);
    K.ea && (b.mode = b.mode | (b.mode & 292) >> 2);
  } catch (c) {
    if (!c.code) {
      throw c;
    }
    throw new H(-c.i);
  }
  return b.mode;
}, A:function(a) {
  for (var b = []; a.parent !== a;) {
    b.push(a.name), a = a.parent;
  }
  b.push(a.v.ma.root);
  b.reverse();
  return zb.apply(null, b);
}, Ia:function(a) {
  a &= -2656257;
  var b = 0, c;
  for (c in K.va) {
    a & c && (b |= K.va[c], a ^= c);
  }
  if (a) {
    throw new H(22);
  }
  return b;
}, f:{I:function(a) {
  a = K.A(a);
  try {
    var b = fs.lstatSync(a);
  } catch (c) {
    if (!c.code) {
      throw c;
    }
    throw new H(-c.i);
  }
  K.ea && !b.L && (b.L = 4096);
  K.ea && !b.blocks && (b.blocks = (b.size + b.L - 1) / b.L | 0);
  return {dev:b.dev, ino:b.ino, mode:b.mode, nlink:b.nlink, uid:b.uid, gid:b.gid, rdev:b.rdev, size:b.size, atime:b.atime, mtime:b.mtime, ctime:b.ctime, L:b.L, blocks:b.blocks};
}, C:function(a, b) {
  var c = K.A(a);
  try {
    void 0 !== b.mode && (fs.chmodSync(c, b.mode), a.mode = b.mode), void 0 !== b.size && fs.truncateSync(c, b.size);
  } catch (d) {
    if (!d.code) {
      throw d;
    }
    throw new H(-d.i);
  }
}, lookup:function(a, b) {
  var c = Ab(K.A(a), b);
  c = K.za(c);
  return K.createNode(a, b, c);
}, W:function(a, b, c, d) {
  a = K.createNode(a, b, c, d);
  b = K.A(a);
  try {
    J(a.mode) ? fs.mkdirSync(b, a.mode) : fs.writeFileSync(b, "", {mode:a.mode});
  } catch (f) {
    if (!f.code) {
      throw f;
    }
    throw new H(-f.i);
  }
  return a;
}, rename:function(a, b, c) {
  a = K.A(a);
  b = Ab(K.A(b), c);
  try {
    fs.renameSync(a, b);
  } catch (d) {
    if (!d.code) {
      throw d;
    }
    throw new H(-d.i);
  }
}, unlink:function(a, b) {
  a = Ab(K.A(a), b);
  try {
    fs.unlinkSync(a);
  } catch (c) {
    if (!c.code) {
      throw c;
    }
    throw new H(-c.i);
  }
}, rmdir:function(a, b) {
  a = Ab(K.A(a), b);
  try {
    fs.rmdirSync(a);
  } catch (c) {
    if (!c.code) {
      throw c;
    }
    throw new H(-c.i);
  }
}, readdir:function(a) {
  a = K.A(a);
  try {
    return fs.readdirSync(a);
  } catch (b) {
    if (!b.code) {
      throw b;
    }
    throw new H(-b.i);
  }
}, symlink:function(a, b, c) {
  a = Ab(K.A(a), b);
  try {
    fs.symlinkSync(c, a);
  } catch (d) {
    if (!d.code) {
      throw d;
    }
    throw new H(-d.i);
  }
}, readlink:function(a) {
  var b = K.A(a);
  try {
    return b = fs.readlinkSync(b), b = Nb.relative(Nb.resolve(a.v.ma.root), b);
  } catch (c) {
    if (!c.code) {
      throw c;
    }
    throw new H(-c.i);
  }
}}, g:{open:function(a) {
  var b = K.A(a.node);
  try {
    32768 === (a.node.mode & 61440) && (a.X = fs.openSync(b, K.Ia(a.flags)));
  } catch (c) {
    if (!c.code) {
      throw c;
    }
    throw new H(-c.i);
  }
}, close:function(a) {
  try {
    32768 === (a.node.mode & 61440) && a.X && fs.closeSync(a.X);
  } catch (b) {
    if (!b.code) {
      throw b;
    }
    throw new H(-b.i);
  }
}, read:function(a, b, c, d, f) {
  if (0 === d) {
    return 0;
  }
  try {
    return fs.readSync(a.X, K.ra(b.buffer), c, d, f);
  } catch (g) {
    throw new H(-g.i);
  }
}, write:function(a, b, c, d, f) {
  try {
    return fs.writeSync(a.X, K.ra(b.buffer), c, d, f);
  } catch (g) {
    throw new H(-g.i);
  }
}, K:function(a, b, c) {
  if (1 === c) {
    b += a.position;
  } else {
    if (2 === c && 32768 === (a.node.mode & 61440)) {
      try {
        b += fs.fstatSync(a.X).size;
      } catch (d) {
        throw new H(-d.i);
      }
    }
  }
  if (0 > b) {
    throw new H(22);
  }
  return b;
}}}, Ob = {0:"Success", 1:"Not super-user", 2:"No such file or directory", 3:"No such process", 4:"Interrupted system call", 5:"I/O error", 6:"No such device or address", 7:"Arg list too long", 8:"Exec format error", 9:"Bad file number", 10:"No children", 11:"No more processes", 12:"Not enough core", 13:"Permission denied", 14:"Bad address", 15:"Block device required", 16:"Mount device busy", 17:"File exists", 18:"Cross-device link", 19:"No such device", 20:"Not a directory", 21:"Is a directory", 
22:"Invalid argument", 23:"Too many open files in system", 24:"Too many open files", 25:"Not a typewriter", 26:"Text file busy", 27:"File too large", 28:"No space left on device", 29:"Illegal seek", 30:"Read only file system", 31:"Too many links", 32:"Broken pipe", 33:"Math arg out of domain of func", 34:"Math result not representable", 35:"File locking deadlock error", 36:"File or path name too long", 37:"No record locks available", 38:"Function not implemented", 39:"Directory not empty", 40:"Too many symbolic links", 
42:"No message of desired type", 43:"Identifier removed", 44:"Channel number out of range", 45:"Level 2 not synchronized", 46:"Level 3 halted", 47:"Level 3 reset", 48:"Link number out of range", 49:"Protocol driver not attached", 50:"No CSI structure available", 51:"Level 2 halted", 52:"Invalid exchange", 53:"Invalid request descriptor", 54:"Exchange full", 55:"No anode", 56:"Invalid request code", 57:"Invalid slot", 59:"Bad font file fmt", 60:"Device not a stream", 61:"No data (for no delay io)", 
62:"Timer expired", 63:"Out of streams resources", 64:"Machine is not on the network", 65:"Package not installed", 66:"The object is remote", 67:"The link has been severed", 68:"Advertise error", 69:"Srmount error", 70:"Communication error on send", 71:"Protocol error", 72:"Multihop attempted", 73:"Cross mount point (not really error)", 74:"Trying to read unreadable message", 75:"Value too large for defined data type", 76:"Given log. name not unique", 77:"f.d. invalid for this operation", 78:"Remote address changed", 
79:"Can   access a needed shared lib", 80:"Accessing a corrupted shared lib", 81:".lib section in a.out corrupted", 82:"Attempting to link in too many libs", 83:"Attempting to exec a shared library", 84:"Illegal byte sequence", 86:"Streams pipe error", 87:"Too many users", 88:"Socket operation on non-socket", 89:"Destination address required", 90:"Message too long", 91:"Protocol wrong type for socket", 92:"Protocol not available", 93:"Unknown protocol", 94:"Socket type not supported", 95:"Not supported", 
96:"Protocol family not supported", 97:"Address family not supported by protocol family", 98:"Address already in use", 99:"Address not available", 100:"Network interface is not configured", 101:"Network is unreachable", 102:"Connection reset by network", 103:"Connection aborted", 104:"Connection reset by peer", 105:"No buffer space available", 106:"Socket is already connected", 107:"Socket is not connected", 108:"Can't send after socket shutdown", 109:"Too many references", 110:"Connection timed out", 
111:"Connection refused", 112:"Host is down", 113:"Host is unreachable", 114:"Socket already connected", 115:"Connection already in progress", 116:"Stale file handle", 122:"Quota exceeded", 123:"No medium (in tape drive)", 125:"Operation canceled", 130:"Previous owner died", 131:"State not recoverable"}, Pb = {Sc:1, rc:2, ed:3, Nb:4, Pb:5, Oc:6, ab:7, sc:8, kb:9, tb:10, hb:11, qd:11, wc:12, bb:13, Gb:14, Fc:15, rb:16, Fb:17, rd:18, qc:19, Hc:20, Rb:21, Ob:22, lc:23, cc:24, Mc:25, nd:26, Hb:27, Bc:28, 
dd:29, ad:30, dc:31, Uc:32, Cb:33, Yc:34, xc:42, Kb:43, ub:44, Tb:45, Ub:46, Vb:47, ac:48, od:49, oc:50, Sb:51, zb:35, tc:37, jb:52, nb:53, sd:54, mc:55, ob:56, pb:57, Ab:35, qb:59, Dc:60, pc:61, kd:62, Cc:63, yc:64, zc:65, $c:66, uc:67, fb:68, gd:69, vb:70, Vc:71, fc:72, Db:73, mb:74, Nc:76, lb:77, Zc:78, Wb:79, Xb:80, $b:81, Zb:82, Yb:83, Ec:38, Ic:39, hc:36, bc:40, Pc:95, Tc:96, yb:104, nc:105, gb:97, Xc:91, Kc:88, Ac:92, bd:108, xb:111, cb:98, wb:103, kc:101, ic:100, ld:110, Ib:112, Jb:113, Mb:115, 
ib:114, Bb:89, ec:90, Wc:93, cd:94, eb:99, jc:102, Qb:106, Gc:107, md:109, pd:87, Eb:122, hd:116, Lc:95, vc:123, Lb:84, Qc:75, sb:125, Jc:131, Rc:130, jd:86}, Qb = null, Rb = {}, Sb = [], Tb = 1, Ub = null, Vb = !0, L = {}, H = null, Lb = {};
function M(a, b) {
  a = Bb("/", a);
  b = b || {};
  if (!a) {
    return {path:"", node:null};
  }
  var c = {wa:!0, oa:0}, d;
  for (d in c) {
    void 0 === b[d] && (b[d] = c[d]);
  }
  if (8 < b.oa) {
    throw new H(40);
  }
  a = vb(a.split("/").filter(function(a) {
    return !!a;
  }), !1);
  var f = Qb;
  c = "/";
  for (d = 0; d < a.length; d++) {
    var g = d === a.length - 1;
    if (g && b.parent) {
      break;
    }
    f = Mb(f, a[d]);
    c = Ab(c, a[d]);
    f.S && (!g || g && b.wa) && (f = f.S.root);
    if (!g || b.ka) {
      for (g = 0; 40960 === (f.mode & 61440);) {
        if (f = Wb(c), c = Bb(xb(c), f), f = M(c, {oa:b.oa}).node, 40 < g++) {
          throw new H(40);
        }
      }
    }
  }
  return {path:c, node:f};
}
function Xb(a) {
  for (var b;;) {
    if (a === a.parent) {
      return a = a.v.Ca, b ? "/" !== a[a.length - 1] ? a + "/" + b : a + b : a;
    }
    b = b ? a.name + "/" + b : a.name;
    a = a.parent;
  }
}
function Yb(a, b) {
  for (var c = 0, d = 0; d < b.length; d++) {
    c = (c << 5) - c + b.charCodeAt(d) | 0;
  }
  return (a + c >>> 0) % Ub.length;
}
function Zb(a) {
  var b = Yb(a.parent.id, a.name);
  a.T = Ub[b];
  Ub[b] = a;
}
function $b(a) {
  var b = Yb(a.parent.id, a.name);
  if (Ub[b] === a) {
    Ub[b] = a.T;
  } else {
    for (b = Ub[b]; b;) {
      if (b.T === a) {
        b.T = a.T;
        break;
      }
      b = b.T;
    }
  }
}
function Mb(a, b) {
  var c;
  if (c = (c = ac(a, "x")) ? c : a.f.lookup ? 0 : 13) {
    throw new H(c, a);
  }
  for (c = Ub[Yb(a.id, b)]; c; c = c.T) {
    var d = c.name;
    if (c.parent.id === a.id && d === b) {
      return c;
    }
  }
  return a.f.lookup(a, b);
}
function Kb(a, b, c, d) {
  bc || (bc = function(a, b, c, d) {
    a || (a = this);
    this.parent = a;
    this.v = a.v;
    this.S = null;
    this.id = Tb++;
    this.name = b;
    this.mode = c;
    this.f = {};
    this.g = {};
    this.rdev = d;
  }, bc.prototype = {}, Object.defineProperties(bc.prototype, {read:{get:function() {
    return 365 === (this.mode & 365);
  }, set:function(a) {
    a ? this.mode |= 365 : this.mode &= -366;
  }}, write:{get:function() {
    return 146 === (this.mode & 146);
  }, set:function(a) {
    a ? this.mode |= 146 : this.mode &= -147;
  }}}));
  a = new bc(a, b, c, d);
  Zb(a);
  return a;
}
function J(a) {
  return 16384 === (a & 61440);
}
var cc = {r:0, rs:1052672, "r+":2, w:577, wx:705, xw:705, "w+":578, "wx+":706, "xw+":706, a:1089, ax:1217, xa:1217, "a+":1090, "ax+":1218, "xa+":1218};
function dc(a) {
  var b = ["r", "w", "rw"][a & 3];
  a & 512 && (b += "w");
  return b;
}
function ac(a, b) {
  if (Vb) {
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
function ec(a, b) {
  try {
    return Mb(a, b), 17;
  } catch (c) {
  }
  return ac(a, "wx");
}
function fc(a, b, c) {
  try {
    var d = Mb(a, b);
  } catch (f) {
    return f.i;
  }
  if (a = ac(a, "wx")) {
    return a;
  }
  if (c) {
    if (!J(d.mode)) {
      return 20;
    }
    if (d === d.parent || "/" === Xb(d)) {
      return 16;
    }
  } else {
    if (J(d.mode)) {
      return 21;
    }
  }
  return 0;
}
function hc(a) {
  var b = 4096;
  for (a = a || 0; a <= b; a++) {
    if (!Sb[a]) {
      return a;
    }
  }
  throw new H(24);
}
function ic(a, b) {
  jc || (jc = function() {
  }, jc.prototype = {}, Object.defineProperties(jc.prototype, {object:{get:function() {
    return this.node;
  }, set:function(a) {
    this.node = a;
  }}}));
  var c = new jc, d;
  for (d in a) {
    c[d] = a[d];
  }
  a = c;
  b = hc(b);
  a.fd = b;
  return Sb[b] = a;
}
var Jb = {open:function(a) {
  a.g = Rb[a.node.rdev].g;
  a.g.open && a.g.open(a);
}, K:function() {
  throw new H(29);
}};
function Eb(a, b) {
  Rb[a] = {g:b};
}
function kc(a, b) {
  var c = "/" === b, d = !b;
  if (c && Qb) {
    throw new H(16);
  }
  if (!c && !d) {
    var f = M(b, {wa:!1});
    b = f.path;
    f = f.node;
    if (f.S) {
      throw new H(16);
    }
    if (!J(f.mode)) {
      throw new H(20);
    }
  }
  b = {type:a, ma:{}, Ca:b, Na:[]};
  a = a.v(b);
  a.v = b;
  b.root = a;
  c ? Qb = a : f && (f.S = b, f.v && f.v.Na.push(b));
}
function lc(a, b, c) {
  var d = M(a, {parent:!0}).node;
  a = yb(a);
  if (!a || "." === a || ".." === a) {
    throw new H(22);
  }
  var f = ec(d, a);
  if (f) {
    throw new H(f);
  }
  if (!d.f.W) {
    throw new H(1);
  }
  return d.f.W(d, a, b, c);
}
function mc(a) {
  lc(a, 16895, 0);
}
function nc(a, b, c) {
  "undefined" === typeof c && (c = b, b = 438);
  lc(a, b | 8192, c);
}
function oc(a, b) {
  if (!Bb(a)) {
    throw new H(2);
  }
  var c = M(b, {parent:!0}).node;
  if (!c) {
    throw new H(2);
  }
  b = yb(b);
  var d = ec(c, b);
  if (d) {
    throw new H(d);
  }
  if (!c.f.symlink) {
    throw new H(1);
  }
  c.f.symlink(c, b, a);
}
function Wb(a) {
  a = M(a).node;
  if (!a) {
    throw new H(2);
  }
  if (!a.f.readlink) {
    throw new H(22);
  }
  return Bb(Xb(a.parent), a.f.readlink(a));
}
function pc(a, b, c, d) {
  if ("" === a) {
    throw new H(2);
  }
  if ("string" === typeof b) {
    var f = cc[b];
    if ("undefined" === typeof f) {
      throw Error("Unknown file open mode: " + b);
    }
    b = f;
  }
  c = b & 64 ? ("undefined" === typeof c ? 438 : c) & 4095 | 32768 : 0;
  if ("object" === typeof a) {
    var g = a;
  } else {
    a = wb(a);
    try {
      g = M(a, {ka:!(b & 131072)}).node;
    } catch (k) {
    }
  }
  f = !1;
  if (b & 64) {
    if (g) {
      if (b & 128) {
        throw new H(17);
      }
    } else {
      g = lc(a, c, 0), f = !0;
    }
  }
  if (!g) {
    throw new H(2);
  }
  8192 === (g.mode & 61440) && (b &= -513);
  if (b & 65536 && !J(g.mode)) {
    throw new H(20);
  }
  if (!f && (c = g ? 40960 === (g.mode & 61440) ? 40 : J(g.mode) && ("r" !== dc(b) || b & 512) ? 21 : ac(g, dc(b)) : 2)) {
    throw new H(c);
  }
  if (b & 512) {
    c = g;
    var h;
    "string" === typeof c ? h = M(c, {ka:!0}).node : h = c;
    if (!h.f.C) {
      throw new H(1);
    }
    if (J(h.mode)) {
      throw new H(21);
    }
    if (32768 !== (h.mode & 61440)) {
      throw new H(22);
    }
    if (c = ac(h, "w")) {
      throw new H(c);
    }
    h.f.C(h, {size:0, timestamp:Date.now()});
  }
  b &= -641;
  d = ic({node:g, path:Xb(g), flags:b, seekable:!0, position:0, g:g.g, $a:[], error:!1}, d);
  d.g.open && d.g.open(d);
  !e.logReadFiles || b & 1 || (qc || (qc = {}), a in qc || (qc[a] = 1, console.log("FS.trackingDelegate error on read file: " + a)));
  try {
    L.onOpenFile && (g = 0, 1 !== (b & 2097155) && (g |= 1), 0 !== (b & 2097155) && (g |= 2), L.onOpenFile(a, g));
  } catch (k) {
    console.log("FS.trackingDelegate['onOpenFile']('" + a + "', flags) threw an exception: " + k.message);
  }
  return d;
}
function rc(a, b, c) {
  if (null === a.fd) {
    throw new H(9);
  }
  if (!a.seekable || !a.g.K) {
    throw new H(29);
  }
  if (0 != c && 1 != c && 2 != c) {
    throw new H(22);
  }
  a.position = a.g.K(a, b, c);
  a.$a = [];
  return a.position;
}
function sc() {
  H || (H = function(a, b) {
    this.node = b;
    this.Ta = function(a) {
      this.i = a;
      for (var b in Pb) {
        if (Pb[b] === a) {
          this.code = b;
          break;
        }
      }
    };
    this.Ta(a);
    this.message = Ob[a];
    this.stack && Object.defineProperty(this, "stack", {value:Error().stack, writable:!0});
    this.stack && (this.stack = pb(this.stack));
  }, H.prototype = Error(), H.prototype.constructor = H, [2].forEach(function(a) {
    Lb[a] = new H(a);
    Lb[a].stack = "<generic error, no stack>";
  }));
}
var tc;
function uc(a, b) {
  var c = 0;
  a && (c |= 365);
  b && (c |= 146);
  return c;
}
function vc(a, b, c) {
  a = Ab("/dev", a);
  var d = uc(!!b, !!c);
  wc || (wc = 64);
  var f = wc++ << 8 | 0;
  Eb(f, {open:function(a) {
    a.seekable = !1;
  }, close:function() {
    c && c.buffer && c.buffer.length && c(10);
  }, read:function(a, c, d, f) {
    for (var g = 0, h = 0; h < f; h++) {
      try {
        var k = b();
      } catch (B) {
        throw new H(5);
      }
      if (void 0 === k && 0 === g) {
        throw new H(11);
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
      } catch (u) {
        throw new H(5);
      }
    }
    f && (a.node.timestamp = Date.now());
    return g;
  }});
  nc(a, d, f);
}
var wc, N = {}, bc, jc, qc, xc = {}, O = 0;
function P() {
  O += 4;
  return p[O - 4 >> 2];
}
function yc() {
  var a = Sb[P()];
  if (!a) {
    throw new H(9);
  }
  return a;
}
function zc(a, b) {
  if (-1 === a || 0 === b) {
    return -22;
  }
  var c = xc[a];
  if (!c) {
    return 0;
  }
  if (b === c.wd) {
    var d = Sb[c.fd], f = c.flags, g = new Uint8Array(w.subarray(a, a + b));
    d && d.g.fa && d.g.fa(d, g, 0, b, f);
    xc[a] = null;
    c.Ea && Q(c.xd);
  }
  return 0;
}
function Ac(a) {
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
function Bc() {
  for (var a = Array(256), b = 0; 256 > b; ++b) {
    a[b] = String.fromCharCode(b);
  }
  Cc = a;
}
var Cc = void 0;
function R(a) {
  for (var b = ""; w[a];) {
    b += Cc[w[a++]];
  }
  return b;
}
var Dc = {}, Ec = {}, Fc = {};
function Gc(a) {
  if (void 0 === a) {
    return "_unknown";
  }
  a = a.replace(/[^a-zA-Z0-9_]/g, "$");
  var b = a.charCodeAt(0);
  return 48 <= b && 57 >= b ? "_" + a : a;
}
function Hc(a, b) {
  a = Gc(a);
  return (new Function("body", "return function " + a + '() {\n    "use strict";    return body.apply(this, arguments);\n};\n'))(b);
}
function Ic(a, b) {
  var c = Hc(b, function(a) {
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
var Jc = void 0;
function S(a) {
  throw new Jc(a);
}
var Kc = void 0;
function Lc(a) {
  throw new Kc(a);
}
function T(a, b, c) {
  function d(b) {
    b = c(b);
    b.length !== a.length && Lc("Mismatched type converter count");
    for (var d = 0; d < a.length; ++d) {
      U(a[d], b[d]);
    }
  }
  a.forEach(function(a) {
    Fc[a] = b;
  });
  var f = Array(b.length), g = [], h = 0;
  b.forEach(function(a, b) {
    Ec.hasOwnProperty(a) ? f[b] = Ec[a] : (g.push(a), Dc.hasOwnProperty(a) || (Dc[a] = []), Dc[a].push(function() {
      f[b] = Ec[a];
      ++h;
      h === g.length && d(f);
    }));
  });
  0 === g.length && d(f);
}
function U(a, b, c) {
  c = c || {};
  if (!("argPackAdvance" in b)) {
    throw new TypeError("registerType registeredInstance requires argPackAdvance");
  }
  var d = b.name;
  a || S('type "' + d + '" must have a positive integer typeid pointer');
  if (Ec.hasOwnProperty(a)) {
    if (c.La) {
      return;
    }
    S("Cannot register type '" + d + "' twice");
  }
  Ec[a] = b;
  delete Fc[a];
  Dc.hasOwnProperty(a) && (b = Dc[a], delete Dc[a], b.forEach(function(a) {
    a();
  }));
}
function Mc(a) {
  if (!(this instanceof Nc && a instanceof Nc)) {
    return !1;
  }
  var b = this.b.m.h, c = this.b.j, d = a.b.m.h;
  for (a = a.b.j; b.F;) {
    c = b.$(c), b = b.F;
  }
  for (; d.F;) {
    a = d.$(a), d = d.F;
  }
  return b === d && c === a;
}
function Oc(a) {
  return {count:a.count, R:a.R, Y:a.Y, j:a.j, m:a.m, B:a.B, D:a.D};
}
function Pc(a) {
  S(a.b.m.h.name + " instance already deleted");
}
var Qc = !1;
function Rc() {
}
function Sc(a) {
  a.B ? a.D.O(a.B) : a.m.h.O(a.j);
}
function Tc(a) {
  --a.count.value;
  0 === a.count.value && Sc(a);
}
function Uc(a) {
  if ("undefined" === typeof FinalizationGroup) {
    return Uc = function(a) {
      return a;
    }, a;
  }
  Qc = new FinalizationGroup(function(a) {
    for (var b = a.next(); !b.done; b = a.next()) {
      b = b.value, b.j ? Tc(b) : console.warn("object already deleted: " + b.j);
    }
  });
  Uc = function(a) {
    Qc.register(a, a.b, a.b);
    return a;
  };
  Rc = function(a) {
    Qc.unregister(a.b);
  };
  return Uc(a);
}
function Vc() {
  this.b.j || Pc(this);
  if (this.b.Y) {
    return this.b.count.value += 1, this;
  }
  var a = Uc(Object.create(Object.getPrototypeOf(this), {b:{value:Oc(this.b)}}));
  a.b.count.value += 1;
  a.b.R = !1;
  return a;
}
function Wc() {
  this.b.j || Pc(this);
  this.b.R && !this.b.Y && S("Object already scheduled for deletion");
  Rc(this);
  Tc(this.b);
  this.b.Y || (this.b.B = void 0, this.b.j = void 0);
}
function Xc() {
  return !this.b.j;
}
var Yc = void 0, Zc = [];
function $c() {
  for (; Zc.length;) {
    var a = Zc.pop();
    a.b.R = !1;
    a["delete"]();
  }
}
function ad() {
  this.b.j || Pc(this);
  this.b.R && !this.b.Y && S("Object already scheduled for deletion");
  Zc.push(this);
  1 === Zc.length && Yc && Yc($c);
  this.b.R = !0;
  return this;
}
function bd() {
  Nc.prototype.isAliasOf = Mc;
  Nc.prototype.clone = Vc;
  Nc.prototype["delete"] = Wc;
  Nc.prototype.isDeleted = Xc;
  Nc.prototype.deleteLater = ad;
}
function Nc() {
}
var cd = {};
function dd(a, b, c) {
  if (void 0 === a[b].o) {
    var d = a[b];
    a[b] = function() {
      a[b].o.hasOwnProperty(arguments.length) || S("Function '" + c + "' called with an invalid number of arguments (" + arguments.length + ") - expects one of (" + a[b].o + ")!");
      return a[b].o[arguments.length].apply(this, arguments);
    };
    a[b].o = [];
    a[b].o[d.P] = d;
  }
}
function ed(a, b, c) {
  e.hasOwnProperty(a) ? ((void 0 === c || void 0 !== e[a].o && void 0 !== e[a].o[c]) && S("Cannot register public name '" + a + "' twice"), dd(e, a, a), e.hasOwnProperty(c) && S("Cannot register multiple overloads of a function with the same number of arguments (" + c + ")!"), e[a].o[c] = b) : (e[a] = b, void 0 !== c && (e[a].yd = c));
}
function fd(a, b, c, d, f, g, h, k) {
  this.name = a;
  this.constructor = b;
  this.J = c;
  this.O = d;
  this.F = f;
  this.Ja = g;
  this.$ = h;
  this.Ha = k;
  this.Pa = [];
}
function gd(a, b, c) {
  for (; b !== c;) {
    b.$ || S("Expected null or instance of " + c.name + ", got an instance of " + b.name), a = b.$(a), b = b.F;
  }
  return a;
}
function hd(a, b) {
  if (null === b) {
    return this.la && S("null is not a valid " + this.name), 0;
  }
  b.b || S('Cannot pass "' + id(b) + '" as a ' + this.name);
  b.b.j || S("Cannot pass deleted object as a pointer of type " + this.name);
  return gd(b.b.j, b.b.m.h, this.h);
}
function jd(a, b) {
  if (null === b) {
    this.la && S("null is not a valid " + this.name);
    if (this.da) {
      var c = this.Qa();
      null !== a && a.push(this.O, c);
      return c;
    }
    return 0;
  }
  b.b || S('Cannot pass "' + id(b) + '" as a ' + this.name);
  b.b.j || S("Cannot pass deleted object as a pointer of type " + this.name);
  !this.ba && b.b.m.ba && S("Cannot convert argument of type " + (b.b.D ? b.b.D.name : b.b.m.name) + " to parameter type " + this.name);
  c = gd(b.b.j, b.b.m.h, this.h);
  if (this.da) {
    switch(void 0 === b.b.B && S("Passing raw pointer to smart pointer is illegal"), this.Ua) {
      case 0:
        b.b.D === this ? c = b.b.B : S("Cannot convert argument of type " + (b.b.D ? b.b.D.name : b.b.m.name) + " to parameter type " + this.name);
        break;
      case 1:
        c = b.b.B;
        break;
      case 2:
        if (b.b.D === this) {
          c = b.b.B;
        } else {
          var d = b.clone();
          c = this.Ra(c, kd(function() {
            d["delete"]();
          }));
          null !== a && a.push(this.O, c);
        }
        break;
      default:
        S("Unsupporting sharing policy");
    }
  }
  return c;
}
function ld(a, b) {
  if (null === b) {
    return this.la && S("null is not a valid " + this.name), 0;
  }
  b.b || S('Cannot pass "' + id(b) + '" as a ' + this.name);
  b.b.j || S("Cannot pass deleted object as a pointer of type " + this.name);
  b.b.m.ba && S("Cannot convert argument of type " + b.b.m.name + " to parameter type " + this.name);
  return gd(b.b.j, b.b.m.h, this.h);
}
function md(a) {
  return this.fromWireType(y[a >> 2]);
}
function nd(a) {
  this.Da && (a = this.Da(a));
  return a;
}
function od(a) {
  this.O && this.O(a);
}
function pd(a) {
  if (null !== a) {
    a["delete"]();
  }
}
function qd(a, b, c) {
  if (b === c) {
    return a;
  }
  if (void 0 === c.F) {
    return null;
  }
  a = qd(a, b, c.F);
  return null === a ? null : c.Ha(a);
}
function rd() {
  return Object.keys(sd).length;
}
function td() {
  var a = [], b;
  for (b in sd) {
    sd.hasOwnProperty(b) && a.push(sd[b]);
  }
  return a;
}
function ud(a) {
  Yc = a;
  Zc.length && Yc && Yc($c);
}
function vd() {
  e.getInheritedInstanceCount = rd;
  e.getLiveInheritedInstances = td;
  e.flushPendingDeletes = $c;
  e.setDelayFunction = ud;
}
var sd = {};
function wd(a, b) {
  for (void 0 === b && S("ptr should not be undefined"); a.F;) {
    b = a.$(b), a = a.F;
  }
  return b;
}
function xd(a, b) {
  b = wd(a, b);
  return sd[b];
}
function yd(a, b) {
  b.m && b.j || Lc("makeClassHandle requires ptr and ptrType");
  !!b.D !== !!b.B && Lc("Both smartPtrType and smartPtr must be specified");
  b.count = {value:1};
  return Uc(Object.create(a, {b:{value:b}}));
}
function zd(a) {
  function b() {
    return this.da ? yd(this.h.J, {m:this.Oa, j:c, D:this, B:a}) : yd(this.h.J, {m:this, j:a});
  }
  var c = this.Ka(a);
  if (!c) {
    return this.ta(a), null;
  }
  var d = xd(this.h, c);
  if (void 0 !== d) {
    if (0 === d.b.count.value) {
      return d.b.j = c, d.b.B = a, d.clone();
    }
    d = d.clone();
    this.ta(a);
    return d;
  }
  d = this.h.Ja(c);
  d = cd[d];
  if (!d) {
    return b.call(this);
  }
  d = this.ba ? d.Ga : d.pointerType;
  var f = qd(c, this.h, d.h);
  return null === f ? b.call(this) : this.da ? yd(d.h.J, {m:d, j:f, D:this, B:a}) : yd(d.h.J, {m:d, j:f});
}
function Ad() {
  V.prototype.Ka = nd;
  V.prototype.ta = od;
  V.prototype.argPackAdvance = 8;
  V.prototype.readValueFromPointer = md;
  V.prototype.deleteObject = pd;
  V.prototype.fromWireType = zd;
}
function V(a, b, c, d, f, g, h, k, t, r, u) {
  this.name = a;
  this.h = b;
  this.la = c;
  this.ba = d;
  this.da = f;
  this.Oa = g;
  this.Ua = h;
  this.Da = k;
  this.Qa = t;
  this.Ra = r;
  this.O = u;
  f || void 0 !== b.F ? this.toWireType = jd : (this.toWireType = d ? hd : ld, this.H = null);
}
function Bd(a, b, c) {
  e.hasOwnProperty(a) || Lc("Replacing nonexistant public symbol");
  void 0 !== e[a].o && void 0 !== c ? e[a].o[c] = b : (e[a] = b, e[a].P = c);
}
function W(a, b) {
  a = R(a);
  if (void 0 !== e["FUNCTION_TABLE_" + a]) {
    var c = e["FUNCTION_TABLE_" + a][b];
  } else {
    if ("undefined" !== typeof FUNCTION_TABLE) {
      c = FUNCTION_TABLE[b];
    } else {
      c = e["dynCall_" + a];
      void 0 === c && (c = e["dynCall_" + a.replace(/f/g, "d")], void 0 === c && S("No dynCall invoker for signature: " + a));
      for (var d = [], f = 1; f < a.length; ++f) {
        d.push("a" + f);
      }
      f = "return function " + ("dynCall_" + a + "_" + b) + "(" + d.join(", ") + ") {\n";
      f += "    return dynCall(rawFunction" + (d.length ? ", " : "") + d.join(", ") + ");\n";
      c = (new Function("dynCall", "rawFunction", f + "};\n"))(c, b);
    }
  }
  "function" !== typeof c && S("unknown function pointer with signature " + a + ": " + b);
  return c;
}
var Cd = void 0;
function Dd(a) {
  a = Ed(a);
  var b = R(a);
  Q(a);
  return b;
}
function Fd(a, b) {
  function c(a) {
    f[a] || Ec[a] || (Fc[a] ? Fc[a].forEach(c) : (d.push(a), f[a] = !0));
  }
  var d = [], f = {};
  b.forEach(c);
  throw new Cd(a + ": " + d.map(Dd).join([", "]));
}
function Gd(a, b) {
  if (!(a instanceof Function)) {
    throw new TypeError("new_ called with constructor type " + typeof a + " which is not a function");
  }
  var c = Hc(a.name || "unknownFunctionName", function() {
  });
  c.prototype = a.prototype;
  c = new c;
  a = a.apply(c, b);
  return a instanceof Object ? a : c;
}
function Hd(a) {
  for (; a.length;) {
    var b = a.pop();
    a.pop()(b);
  }
}
function Id(a, b, c, d, f) {
  var g = b.length;
  2 > g && S("argTypes array size mismatch! Must at least get return value and 'this' types!");
  var h = null !== b[1] && null !== c, k = !1;
  for (c = 1; c < b.length; ++c) {
    if (null !== b[c] && void 0 === b[c].H) {
      k = !0;
      break;
    }
  }
  var t = "void" !== b[0].name, r = "", u = "";
  for (c = 0; c < g - 2; ++c) {
    r += (0 !== c ? ", " : "") + "arg" + c, u += (0 !== c ? ", " : "") + "arg" + c + "Wired";
  }
  a = "return function " + Gc(a) + "(" + r + ") {\nif (arguments.length !== " + (g - 2) + ") {\nthrowBindingError('function " + a + " called with ' + arguments.length + ' arguments, expected " + (g - 2) + " args!');\n}\n";
  k && (a += "var destructors = [];\n");
  var z = k ? "destructors" : "null";
  r = "throwBindingError invoker fn runDestructors retType classParam".split(" ");
  d = [S, d, f, Hd, b[0], b[1]];
  h && (a += "var thisWired = classParam.toWireType(" + z + ", this);\n");
  for (c = 0; c < g - 2; ++c) {
    a += "var arg" + c + "Wired = argType" + c + ".toWireType(" + z + ", arg" + c + "); // " + b[c + 2].name + "\n", r.push("argType" + c), d.push(b[c + 2]);
  }
  h && (u = "thisWired" + (0 < u.length ? ", " : "") + u);
  a += (t ? "var rv = " : "") + "invoker(fn" + (0 < u.length ? ", " : "") + u + ");\n";
  if (k) {
    a += "runDestructors(destructors);\n";
  } else {
    for (c = h ? 1 : 2; c < b.length; ++c) {
      g = 1 === c ? "thisWired" : "arg" + (c - 2) + "Wired", null !== b[c].H && (a += g + "_dtor(" + g + "); // " + b[c].name + "\n", r.push(g + "_dtor"), d.push(b[c].H));
    }
  }
  t && (a += "var ret = retType.fromWireType(rv);\nreturn ret;\n");
  r.push(a + "}\n");
  return Gd(Function, r).apply(null, d);
}
function Jd(a, b) {
  for (var c = [], d = 0; d < a; d++) {
    c.push(p[(b >> 2) + d]);
  }
  return c;
}
function Kd(a, b, c) {
  a instanceof Object || S(c + ' with invalid "this": ' + a);
  a instanceof b.h.constructor || S(c + ' incompatible with "this" of type ' + a.constructor.name);
  a.b.j || S("cannot call emscripten binding method " + c + " on deleted object");
  return gd(a.b.j, a.b.m.h, b.h);
}
var Ld = [], X = [{}, {value:void 0}, {value:null}, {value:!0}, {value:!1}];
function Md(a) {
  4 < a && 0 === --X[a].pa && (X[a] = void 0, Ld.push(a));
}
function Nd() {
  for (var a = 0, b = 5; b < X.length; ++b) {
    void 0 !== X[b] && ++a;
  }
  return a;
}
function Od() {
  for (var a = 5; a < X.length; ++a) {
    if (void 0 !== X[a]) {
      return X[a];
    }
  }
  return null;
}
function Pd() {
  e.count_emval_handles = Nd;
  e.get_first_emval = Od;
}
function kd(a) {
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
      var b = Ld.length ? Ld.pop() : X.length;
      X[b] = {pa:1, value:a};
      return b;
  }
}
function id(a) {
  if (null === a) {
    return "null";
  }
  var b = typeof a;
  return "object" === b || "array" === b || "function" === b ? a.toString() : "" + a;
}
function Qd(a, b) {
  switch(b) {
    case 2:
      return function(a) {
        return this.fromWireType(Ja[a >> 2]);
      };
    case 3:
      return function(a) {
        return this.fromWireType(Ka[a >> 3]);
      };
    default:
      throw new TypeError("Unknown float type: " + a);
  }
}
function Rd(a, b, c) {
  switch(b) {
    case 0:
      return c ? function(a) {
        return q[a];
      } : function(a) {
        return w[a];
      };
    case 1:
      return c ? function(a) {
        return Ha[a >> 1];
      } : function(a) {
        return Ia[a >> 1];
      };
    case 2:
      return c ? function(a) {
        return p[a >> 2];
      } : function(a) {
        return y[a >> 2];
      };
    default:
      throw new TypeError("Unknown integer type: " + a);
  }
}
function Sd(a, b) {
  var c = Ec[a];
  void 0 === c && S(b + " has unknown type " + Dd(a));
  return c;
}
function Td() {
  void 0 === Td.start && (Td.start = Date.now());
  return 1E3 * (Date.now() - Td.start) | 0;
}
function ra() {
  return q.length;
}
function Ud(a) {
  return 0 > a || 0 === a && -Infinity === 1 / a;
}
function Vd(a, b) {
  function c(a) {
    var b = d;
    "double" === a || "i64" === a ? b & 7 && (assert(4 === (b & 7)), b += 4) : assert(0 === (b & 3));
    d = b;
    "double" === a ? (a = Ka[d >> 3], d += 8) : "i64" == a ? (a = [p[d >> 2], p[d + 4 >> 2]], d += 8) : (assert(0 === (d & 3)), a = p[d >> 2], d += 4);
    return a;
  }
  assert(0 === (b & 3));
  for (var d = b, f = [], g, h;;) {
    var k = a;
    g = q[a >> 0];
    if (0 === g) {
      break;
    }
    h = q[a + 1 >> 0];
    if (37 == g) {
      var t = !1, r = b = !1, u = !1, z = !1;
      a: for (;;) {
        switch(h) {
          case 43:
            t = !0;
            break;
          case 45:
            b = !0;
            break;
          case 35:
            r = !0;
            break;
          case 48:
            if (u) {
              break a;
            } else {
              u = !0;
              break;
            }
          case 32:
            z = !0;
            break;
          default:
            break a;
        }
        a++;
        h = q[a + 1 >> 0];
      }
      var B = 0;
      if (42 == h) {
        B = c("i32"), a++, h = q[a + 1 >> 0];
      } else {
        for (; 48 <= h && 57 >= h;) {
          B = 10 * B + (h - 48), a++, h = q[a + 1 >> 0];
        }
      }
      var C = !1, A = -1;
      if (46 == h) {
        A = 0;
        C = !0;
        a++;
        h = q[a + 1 >> 0];
        if (42 == h) {
          A = c("i32"), a++;
        } else {
          for (;;) {
            h = q[a + 1 >> 0];
            if (48 > h || 57 < h) {
              break;
            }
            A = 10 * A + (h - 48);
            a++;
          }
        }
        h = q[a + 1 >> 0];
      }
      0 > A && (A = 6, C = !1);
      switch(String.fromCharCode(h)) {
        case "h":
          h = q[a + 2 >> 0];
          if (104 == h) {
            a++;
            var D = 1;
          } else {
            D = 2;
          }
          break;
        case "l":
          h = q[a + 2 >> 0];
          108 == h ? (a++, D = 8) : D = 4;
          break;
        case "L":
        case "q":
        case "j":
          D = 8;
          break;
        case "z":
        case "t":
        case "I":
          D = 4;
          break;
        default:
          D = null;
      }
      D && a++;
      h = q[a + 1 >> 0];
      switch(String.fromCharCode(h)) {
        case "d":
        case "i":
        case "u":
        case "o":
        case "x":
        case "X":
        case "p":
          k = 100 == h || 105 == h;
          D = D || 4;
          g = c("i" + 8 * D);
          8 == D && (g = ua(g[0], g[1], 117 == h));
          4 >= D && (g = (k ? Wa : Va)(g & Math.pow(256, D) - 1, 8 * D));
          var ia = Math.abs(g);
          k = "";
          if (100 == h || 105 == h) {
            var v = Wa(g, 8 * D, 1).toString(10);
          } else {
            if (117 == h) {
              v = Va(g, 8 * D, 1).toString(10), g = Math.abs(g);
            } else {
              if (111 == h) {
                v = (r ? "0" : "") + ia.toString(8);
              } else {
                if (120 == h || 88 == h) {
                  k = r && 0 != g ? "0x" : "";
                  if (0 > g) {
                    g = -g;
                    v = (ia - 1).toString(16);
                    ia = [];
                    for (r = 0; r < v.length; r++) {
                      ia.push((15 - parseInt(v[r], 16)).toString(16));
                    }
                    for (v = ia.join(""); v.length < 2 * D;) {
                      v = "f" + v;
                    }
                  } else {
                    v = ia.toString(16);
                  }
                  88 == h && (k = k.toUpperCase(), v = v.toUpperCase());
                } else {
                  112 == h && (0 === ia ? v = "(nil)" : (k = "0x", v = ia.toString(16)));
                }
              }
            }
          }
          if (C) {
            for (; v.length < A;) {
              v = "0" + v;
            }
          }
          0 <= g && (t ? k = "+" + k : z && (k = " " + k));
          "-" == v.charAt(0) && (k = "-" + k, v = v.substr(1));
          for (; k.length + v.length < B;) {
            b ? v += " " : u ? v = "0" + v : k = " " + k;
          }
          v = k + v;
          v.split("").forEach(function(a) {
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
            v = "nan", u = !1;
          } else {
            if (isFinite(g)) {
              C = !1;
              D = Math.min(A, 20);
              if (103 == h || 71 == h) {
                C = !0, A = A || 1, D = parseInt(g.toExponential(D).split("e")[1], 10), A > D && -4 <= D ? (h = (103 == h ? "f" : "F").charCodeAt(0), A -= D + 1) : (h = (103 == h ? "e" : "E").charCodeAt(0), A--), D = Math.min(A, 20);
              }
              if (101 == h || 69 == h) {
                v = g.toExponential(D), /[eE][-+]\d$/.test(v) && (v = v.slice(0, -1) + "0" + v.slice(-1));
              } else {
                if (102 == h || 70 == h) {
                  v = g.toFixed(D), 0 === g && Ud(g) && (v = "-" + v);
                }
              }
              k = v.split("e");
              if (C && !r) {
                for (; 1 < k[0].length && -1 != k[0].indexOf(".") && ("0" == k[0].slice(-1) || "." == k[0].slice(-1));) {
                  k[0] = k[0].slice(0, -1);
                }
              } else {
                for (r && -1 == v.indexOf(".") && (k[0] += "."); A > D++;) {
                  k[0] += "0";
                }
              }
              v = k[0] + (1 < k.length ? "e" + k[1] : "");
              69 == h && (v = v.toUpperCase());
              0 <= g && (t ? v = "+" + v : z && (v = " " + v));
            } else {
              v = (0 > g ? "-" : "") + "inf", u = !1;
            }
          }
          for (; v.length < B;) {
            b ? v += " " : !u || "-" != v[0] && "+" != v[0] ? v = (u ? "0" : " ") + v : v = v[0] + "0" + v.slice(1);
          }
          97 > h && (v = v.toUpperCase());
          v.split("").forEach(function(a) {
            f.push(a.charCodeAt(0));
          });
          break;
        case "s":
          u = (t = c("i8*")) ? Wd(t) : 6;
          C && (u = Math.min(u, A));
          if (!b) {
            for (; u < B--;) {
              f.push(32);
            }
          }
          if (t) {
            for (r = 0; r < u; r++) {
              f.push(w[t++ >> 0]);
            }
          } else {
            f = f.concat(Gb("(null)".substr(0, u), !0));
          }
          if (b) {
            for (; u < B--;) {
              f.push(32);
            }
          }
          break;
        case "c":
          for (b && f.push(c("i8")); 0 < --B;) {
            f.push(32);
          }
          b || f.push(c("i8"));
          break;
        case "n":
          b = c("i32*");
          p[b >> 2] = f.length;
          break;
        case "%":
          f.push(g);
          break;
        default:
          for (r = k; r < a + 2; r++) {
            f.push(q[r >> 0]);
          }
      }
      a += 2;
    } else {
      f.push(g), a += 1;
    }
  }
  return f;
}
function Xd(a) {
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
function Yd(a) {
  var b = qb();
  b = b.slice(b.indexOf("\n", Math.max(b.lastIndexOf("_emscripten_log"), b.lastIndexOf("_emscripten_get_callstack"))) + 1);
  a & 8 && (sa('Source map information is not available, emscripten_log with EM_LOG_C_STACK will be ignored. Build with "--pre-js $EMSCRIPTEN/src/emscripten-source-map.min.js" linker flag to add source map loading to code.'), a = a ^ 8 | 16);
  var c = null;
  if (a & 128) {
    for (c = Xd(arguments); 0 <= c[1].indexOf("_emscripten_");) {
      c = Xd(c[0]);
    }
  }
  var d = b.split("\n");
  b = "";
  var f = /\s*(.*?)@(.*?):([0-9]+):([0-9]+)/, g = /\s*(.*?)@(.*):(.*)(:(.*))?/, h = /\s*at (.*?) \((.*):(.*):(.*)\)/, k;
  for (k in d) {
    var t = d[k], r;
    if ((r = h.exec(t)) && 5 == r.length) {
      t = r[1];
      var u = r[2];
      var z = r[3];
      r = r[4];
    } else {
      if ((r = f.exec(t)) || (r = g.exec(t)), r && 4 <= r.length) {
        t = r[1], u = r[2], z = r[3], r = r[4] | 0;
      } else {
        b += t + "\n";
        continue;
      }
    }
    var B = a & 32 ? ob(t) : t;
    B || (B = t);
    var C = !1;
    if (a & 8) {
      var A = (void 0).zd({line:z, Fa:r});
      if (C = A && A.source) {
        a & 64 && (A.source = A.source.substring(A.source.replace(/\\/g, "/").lastIndexOf("/") + 1)), b += "    at " + B + " (" + A.source + ":" + A.line + ":" + A.Fa + ")\n";
      }
    }
    if (a & 16 || !C) {
      a & 64 && (u = u.substring(u.replace(/\\/g, "/").lastIndexOf("/") + 1)), b += (C ? "     = " + t : "    at " + B) + " (" + u + ":" + z + ":" + r + ")\n";
    }
    a & 128 && c[0] && (c[1] == t && 0 < c[2].length && (b = b.replace(/\s+$/, ""), b += " with values: " + c[1] + c[2] + "\n"), c = Xd(c[0]));
  }
  return b = b.replace(/\s+$/, "");
}
function Zd(a, b) {
  a & 24 && (b = b.replace(/\s+$/, ""), b += (0 < b.length ? "\n" : "") + Yd(a));
  a & 1 ? a & 4 ? console.error(b) : a & 2 ? console.warn(b) : console.log(b) : a & 6 ? n(b) : oa(b);
}
function $d(a, b, c) {
  w.set(w.subarray(b, b + c), a);
}
function Y(a) {
  a = eval(x(a));
  if (null == a) {
    return 0;
  }
  var b = Ea(a);
  if (!Y.s || Y.s < b + 1) {
    Y.s && Q(Y.buffer), Y.s = b + 1, Y.buffer = za(Y.s);
  }
  Da(a, Y.buffer, Y.s);
  return Y.buffer;
}
function ae(a) {
  if (0 === a) {
    return 0;
  }
  a = x(a);
  if (!G.hasOwnProperty(a)) {
    return 0;
  }
  ae.ja && Q(ae.ja);
  a = G[a];
  var b = Ea(a) + 1, c = za(b);
  c && Ca(a, q, c, b);
  ae.ja = c;
  return ae.ja;
}
Da("GMT", 1745040, 4);
function be() {
  function a(a) {
    return (a = a.toTimeString().match(/\(([A-Za-z ]+)\)$/)) ? a[1] : "GMT";
  }
  if (!be.s) {
    be.s = !0;
    p[ce() >> 2] = 60 * (new Date).getTimezoneOffset();
    var b = new Date(2000, 0, 1), c = new Date(2000, 6, 1);
    p[de() >> 2] = Number(b.getTimezoneOffset() != c.getTimezoneOffset());
    var d = a(b), f = a(c);
    d = ya(Gb(d));
    f = ya(Gb(f));
    c.getTimezoneOffset() < b.getTimezoneOffset() ? (p[ee() >> 2] = d, p[ee() + 4 >> 2] = f) : (p[ee() >> 2] = f, p[ee() + 4 >> 2] = d);
  }
}
function fe(a, b) {
  be();
  a = new Date(1000 * p[a >> 2]);
  p[b >> 2] = a.getSeconds();
  p[b + 4 >> 2] = a.getMinutes();
  p[b + 8 >> 2] = a.getHours();
  p[b + 12 >> 2] = a.getDate();
  p[b + 16 >> 2] = a.getMonth();
  p[b + 20 >> 2] = a.getFullYear() - 1900;
  p[b + 24 >> 2] = a.getDay();
  var c = new Date(a.getFullYear(), 0, 1);
  p[b + 28 >> 2] = (a.getTime() - c.getTime()) / 864E5 | 0;
  p[b + 36 >> 2] = -(60 * a.getTimezoneOffset());
  var d = (new Date(2000, 6, 1)).getTimezoneOffset();
  c = c.getTimezoneOffset();
  a = (d != c && a.getTimezoneOffset() == Math.min(c, d)) | 0;
  p[b + 32 >> 2] = a;
  a = p[ee() + (a ? 4 : 0) >> 2];
  p[b + 40 >> 2] = a;
  return b;
}
function ge(a) {
  a = Ga(a);
  var b = buffer.byteLength;
  try {
    return -1 !== wa.grow((a - b) / 65536) ? (buffer = wa.buffer, !0) : !1;
  } catch (c) {
    return console.error("emscripten_realloc_buffer: Attempted to grow from " + b + " bytes to " + a + " bytes, but got error: " + c), !1;
  }
}
function he(a) {
  var b = ra();
  assert(a > b);
  if (2147418112 < a) {
    return n("Cannot enlarge memory, asked to go up to " + a + " bytes, but the limit is 2147418112 bytes!"), !1;
  }
  for (var c = Math.max(b, 16777216); c < a;) {
    536870912 >= c ? c = Ga(2 * c) : c = Math.min(Ga((3 * c + 2147483648) / 4), 2147418112), c === b && sa("Cannot ask for more memory since we reached the practical limit in browsers (which is just below 2GB), so the request would have failed. Requesting only " + q.length);
  }
  if (!ge(c)) {
    return n("Failed to grow the heap from " + b + " bytes to " + c + " bytes, not enough memory!"), !1;
  }
  La();
  return !0;
}
function ie(a) {
  return 0 === a % 4 && (0 !== a % 100 || 0 === a % 400);
}
function je(a, b) {
  for (var c = 0, d = 0; d <= b; c += a[d++]) {
  }
  return c;
}
var ke = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31], le = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
function me(a, b) {
  for (a = new Date(a.getTime()); 0 < b;) {
    var c = a.getMonth(), d = (ie(a.getFullYear()) ? ke : le)[c];
    if (b > d - a.getDate()) {
      b -= d - a.getDate() + 1, a.setDate(1), 11 > c ? a.setMonth(c + 1) : (a.setMonth(0), a.setFullYear(a.getFullYear() + 1));
    } else {
      a.setDate(a.getDate() + b);
      break;
    }
  }
  return a;
}
function ne(a, b, c, d) {
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
  function t(a) {
    a = me(new Date(a.u + 1900, 0, 1), a.ia);
    var b = k(new Date(a.getFullYear() + 1, 0, 4));
    return 0 >= h(k(new Date(a.getFullYear(), 0, 4)), a) ? 0 >= h(b, a) ? a.getFullYear() + 1 : a.getFullYear() : a.getFullYear() - 1;
  }
  var r = p[d + 40 >> 2];
  d = {Ya:p[d >> 2], Xa:p[d + 4 >> 2], ga:p[d + 8 >> 2], Z:p[d + 12 >> 2], V:p[d + 16 >> 2], u:p[d + 20 >> 2], ha:p[d + 24 >> 2], ia:p[d + 28 >> 2], Ad:p[d + 32 >> 2], Wa:p[d + 36 >> 2], Za:r ? x(r) : ""};
  c = x(c);
  r = {"%c":"%a %b %d %H:%M:%S %Y", "%D":"%m/%d/%y", "%F":"%Y-%m-%d", "%h":"%b", "%r":"%I:%M:%S %p", "%R":"%H:%M", "%T":"%H:%M:%S", "%x":"%m/%d/%y", "%X":"%H:%M:%S", "%Ec":"%c", "%EC":"%C", "%Ex":"%m/%d/%y", "%EX":"%H:%M:%S", "%Ey":"%y", "%EY":"%Y", "%Od":"%d", "%Oe":"%e", "%OH":"%H", "%OI":"%I", "%Om":"%m", "%OM":"%M", "%OS":"%S", "%Ou":"%u", "%OU":"%U", "%OV":"%V", "%Ow":"%w", "%OW":"%W", "%Oy":"%y"};
  for (var u in r) {
    c = c.replace(new RegExp(u, "g"), r[u]);
  }
  var z = "Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" "), B = "January February March April May June July August September October November December".split(" ");
  r = {"%a":function(a) {
    return z[a.ha].substring(0, 3);
  }, "%A":function(a) {
    return z[a.ha];
  }, "%b":function(a) {
    return B[a.V].substring(0, 3);
  }, "%B":function(a) {
    return B[a.V];
  }, "%C":function(a) {
    return g((a.u + 1900) / 100 | 0, 2);
  }, "%d":function(a) {
    return g(a.Z, 2);
  }, "%e":function(a) {
    return f(a.Z, 2, " ");
  }, "%g":function(a) {
    return t(a).toString().substring(2);
  }, "%G":function(a) {
    return t(a);
  }, "%H":function(a) {
    return g(a.ga, 2);
  }, "%I":function(a) {
    a = a.ga;
    0 == a ? a = 12 : 12 < a && (a -= 12);
    return g(a, 2);
  }, "%j":function(a) {
    return g(a.Z + je(ie(a.u + 1900) ? ke : le, a.V - 1), 3);
  }, "%m":function(a) {
    return g(a.V + 1, 2);
  }, "%M":function(a) {
    return g(a.Xa, 2);
  }, "%n":function() {
    return "\n";
  }, "%p":function(a) {
    return 0 <= a.ga && 12 > a.ga ? "AM" : "PM";
  }, "%S":function(a) {
    return g(a.Ya, 2);
  }, "%t":function() {
    return "\t";
  }, "%u":function(a) {
    return a.ha || 7;
  }, "%U":function(a) {
    var b = new Date(a.u + 1900, 0, 1), c = 0 === b.getDay() ? b : me(b, 7 - b.getDay());
    a = new Date(a.u + 1900, a.V, a.Z);
    return 0 > h(c, a) ? g(Math.ceil((31 - c.getDate() + (je(ie(a.getFullYear()) ? ke : le, a.getMonth() - 1) - 31) + a.getDate()) / 7), 2) : 0 === h(c, b) ? "01" : "00";
  }, "%V":function(a) {
    var b = k(new Date(a.u + 1900, 0, 4)), c = k(new Date(a.u + 1901, 0, 4)), d = me(new Date(a.u + 1900, 0, 1), a.ia);
    return 0 > h(d, b) ? "53" : 0 >= h(c, d) ? "01" : g(Math.ceil((b.getFullYear() < a.u + 1900 ? a.ia + 32 - b.getDate() : a.ia + 1 - b.getDate()) / 7), 2);
  }, "%w":function(a) {
    return a.ha;
  }, "%W":function(a) {
    var b = new Date(a.u, 0, 1), c = 1 === b.getDay() ? b : me(b, 0 === b.getDay() ? 1 : 7 - b.getDay() + 1);
    a = new Date(a.u + 1900, a.V, a.Z);
    return 0 > h(c, a) ? g(Math.ceil((31 - c.getDate() + (je(ie(a.getFullYear()) ? ke : le, a.getMonth() - 1) - 31) + a.getDate()) / 7), 2) : 0 === h(c, b) ? "01" : "00";
  }, "%y":function(a) {
    return (a.u + 1900).toString().substring(2);
  }, "%Y":function(a) {
    return a.u + 1900;
  }, "%z":function(a) {
    a = a.Wa;
    var b = 0 <= a;
    a = Math.abs(a) / 60;
    return (b ? "+" : "-") + String("0000" + (a / 60 * 100 + a % 60)).slice(-4);
  }, "%Z":function(a) {
    return a.Za;
  }, "%%":function() {
    return "%";
  }};
  for (u in r) {
    0 <= c.indexOf(u) && (c = c.replace(new RegExp(u, "g"), r[u](d)));
  }
  u = Gb(c, !1);
  if (u.length > b) {
    return 0;
  }
  Fa(u, a);
  return u.length - 1;
}
sc();
Ub = Array(4096);
kc(I, "/");
mc("/tmp");
mc("/home");
mc("/home/web_user");
(function() {
  mc("/dev");
  Eb(259, {read:function() {
    return 0;
  }, write:function(a, b, c, h) {
    return h;
  }});
  nc("/dev/null", 259);
  Db(1280, Hb);
  Db(1536, Ib);
  nc("/dev/tty", 1280);
  nc("/dev/tty1", 1536);
  if ("object" === typeof crypto && "function" === typeof crypto.getRandomValues) {
    var a = new Uint8Array(1);
    var b = function() {
      crypto.getRandomValues(a);
      return a[0];
    };
  } else {
    if (fa) {
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
    m("no cryptographic support found for random_device. consider polyfilling it if you want to use something insecure like Math.random(), e.g. put this in a --pre-js: var crypto = { getRandomValues: function(array) { for (var i = 0; i < array.length; i++) array[i] = (Math.random()*256)|0 } };");
  });
  vc("random", b);
  vc("urandom", b);
  mc("/dev/shm");
  mc("/dev/shm/tmp");
})();
mc("/proc");
mc("/proc/self");
mc("/proc/self/fd");
kc({v:function() {
  var a = Kb("/proc/self", "fd", 16895, 73);
  a.f = {lookup:function(a, c) {
    var b = Sb[+c];
    if (!b) {
      throw new H(9);
    }
    a = {parent:null, v:{Ca:"fake"}, f:{readlink:function() {
      return b.path;
    }}};
    return a.parent = a;
  }};
  return a;
}}, "/proc/self/fd");
if (ha) {
  var fs = require("fs"), Nb = require("path");
  K.Va();
}
Bc();
Jc = e.BindingError = Ic(Error, "BindingError");
Kc = e.InternalError = Ic(Error, "InternalError");
bd();
Ad();
vd();
Cd = e.UnboundTypeError = Ic(Error, "UnboundTypeError");
Pd();
function Gb(a, b) {
  var c = Array(Ea(a) + 1);
  a = Ca(a, c, 0, c.length);
  b && (c.length = a);
  return c;
}
var Z = e.asm({}, {ClassHandle:Nc, ClassHandle_clone:Vc, ClassHandle_delete:Wc, ClassHandle_deleteLater:ad, ClassHandle_isAliasOf:Mc, ClassHandle_isDeleted:Xc, DYNAMICTOP_PTR:qa, RegisteredClass:fd, RegisteredPointer:V, RegisteredPointer_deleteObject:pd, RegisteredPointer_destructor:od, RegisteredPointer_fromWireType:zd, RegisteredPointer_getPointee:nd, __assert_fail:function(a, b, c, d) {
  m("Assertion failed: " + x(a) + ", at: " + [b ? x(b) : "unknown filename", c, d ? x(d) : "unknown function"]);
}, __buildEnvironment:sb, __cxa_allocate_exception:function(a) {
  return za(a);
}, __cxa_atexit:function() {
  return tb.apply(null, arguments);
}, __cxa_pure_virtual:function() {
  xa = !0;
  throw "Pure virtual function called!";
}, __cxa_throw:function(a) {
  "uncaught_exception" in oe ? oe.s++ : oe.s = 1;
  throw a + " - Exception catching is disabled, this exception cannot be caught. Compile with -s DISABLE_EXCEPTION_CATCHING=0 or DISABLE_EXCEPTION_CATCHING=2 to catch.";
}, __cxa_uncaught_exceptions:function() {
  return oe.s;
}, __lock:function() {
}, __map_file:function() {
  ub(1);
  return -1;
}, __setErrNo:ub, __syscall10:function(a, b) {
  O = b;
  try {
    var c = x(P()), d = M(c, {parent:!0}).node, f = yb(c), g = Mb(d, f), h = fc(d, f, !1);
    if (h) {
      throw new H(h);
    }
    if (!d.f.unlink) {
      throw new H(1);
    }
    if (g.S) {
      throw new H(16);
    }
    try {
      L.willDeletePath && L.willDeletePath(c);
    } catch (k) {
      console.log("FS.trackingDelegate['willDeletePath']('" + c + "') threw an exception: " + k.message);
    }
    d.f.unlink(d, f);
    $b(g);
    try {
      if (L.onDeletePath) {
        L.onDeletePath(c);
      }
    } catch (k) {
      console.log("FS.trackingDelegate['onDeletePath']('" + c + "') threw an exception: " + k.message);
    }
    return 0;
  } catch (k) {
    return "undefined" !== typeof N && k instanceof H || m(k), -k.i;
  }
}, __syscall140:function(a, b) {
  O = b;
  try {
    var c = yc(), d = P(), f = P(), g = P(), h = P();
    a = 4294967296 * d + (f >>> 0);
    if (-9007199254740992 >= a || 9007199254740992 <= a) {
      return -75;
    }
    rc(c, a, h);
    mb = [c.position >>> 0, (F = c.position, 1.0 <= +Xa(F) ? 0.0 < F ? (ab(+$a(F / 4294967296.0), 4294967295.0) | 0) >>> 0 : ~~+Za((F - +(~~F >>> 0)) / 4294967296.0) >>> 0 : 0)];
    p[g >> 2] = mb[0];
    p[g + 4 >> 2] = mb[1];
    c.N && 0 === a && 0 === h && (c.N = null);
    return 0;
  } catch (k) {
    return "undefined" !== typeof N && k instanceof H || m(k), -k.i;
  }
}, __syscall145:function(a, b) {
  O = b;
  try {
    var c = yc(), d = P();
    a: {
      var f = P();
      for (b = a = 0; b < f; b++) {
        var g = p[d + (8 * b + 4) >> 2], h = c, k = p[d + 8 * b >> 2], t = g, r = void 0, u = q;
        if (0 > t || 0 > r) {
          throw new H(22);
        }
        if (null === h.fd) {
          throw new H(9);
        }
        if (1 === (h.flags & 2097155)) {
          throw new H(9);
        }
        if (J(h.node.mode)) {
          throw new H(21);
        }
        if (!h.g.read) {
          throw new H(22);
        }
        var z = "undefined" !== typeof r;
        if (!z) {
          r = h.position;
        } else {
          if (!h.seekable) {
            throw new H(29);
          }
        }
        var B = h.g.read(h, u, k, t, r);
        z || (h.position += B);
        var C = B;
        if (0 > C) {
          var A = -1;
          break a;
        }
        a += C;
        if (C < g) {
          break;
        }
      }
      A = a;
    }
    return A;
  } catch (D) {
    return "undefined" !== typeof N && D instanceof H || m(D), -D.i;
  }
}, __syscall146:function(a, b) {
  O = b;
  try {
    var c = yc(), d = P();
    a: {
      var f = P();
      for (b = a = 0; b < f; b++) {
        var g = c, h = p[d + 8 * b >> 2], k = p[d + (8 * b + 4) >> 2], t = void 0, r = q;
        if (0 > k || 0 > t) {
          throw new H(22);
        }
        if (null === g.fd) {
          throw new H(9);
        }
        if (0 === (g.flags & 2097155)) {
          throw new H(9);
        }
        if (J(g.node.mode)) {
          throw new H(21);
        }
        if (!g.g.write) {
          throw new H(22);
        }
        g.flags & 1024 && rc(g, 0, 2);
        var u = "undefined" !== typeof t;
        if (!u) {
          t = g.position;
        } else {
          if (!g.seekable) {
            throw new H(29);
          }
        }
        var z = g.g.write(g, r, h, k, t, void 0);
        u || (g.position += z);
        try {
          if (g.path && L.onWriteToFile) {
            L.onWriteToFile(g.path);
          }
        } catch (A) {
          console.log("FS.trackingDelegate['onWriteToFile']('" + g.path + "') threw an exception: " + A.message);
        }
        var B = z;
        if (0 > B) {
          var C = -1;
          break a;
        }
        a += B;
      }
      C = a;
    }
    return C;
  } catch (A) {
    return "undefined" !== typeof N && A instanceof H || m(A), -A.i;
  }
}, __syscall220:function(a, b) {
  O = b;
  try {
    var c = yc(), d = P(), f = P();
    if (!c.N) {
      var g = M(c.path, {ka:!0}).node;
      if (!g.f.readdir) {
        throw new H(20);
      }
      var h = g.f.readdir(g);
      c.N = h;
    }
    a = 0;
    for (var k = rc(c, 0, 1), t = Math.floor(k / 280); t < c.N.length && a + 280 <= f;) {
      var r = c.N[t];
      if ("." === r[0]) {
        var u = 1;
        var z = 4;
      } else {
        var B = Mb(c.node, r);
        u = B.id;
        z = 8192 === (B.mode & 61440) ? 2 : J(B.mode) ? 4 : 40960 === (B.mode & 61440) ? 10 : 8;
      }
      mb = [u >>> 0, (F = u, 1.0 <= +Xa(F) ? 0.0 < F ? (ab(+$a(F / 4294967296.0), 4294967295.0) | 0) >>> 0 : ~~+Za((F - +(~~F >>> 0)) / 4294967296.0) >>> 0 : 0)];
      p[d + a >> 2] = mb[0];
      p[d + a + 4 >> 2] = mb[1];
      mb = [280 * (t + 1) >>> 0, (F = 280 * (t + 1), 1.0 <= +Xa(F) ? 0.0 < F ? (ab(+$a(F / 4294967296.0), 4294967295.0) | 0) >>> 0 : ~~+Za((F - +(~~F >>> 0)) / 4294967296.0) >>> 0 : 0)];
      p[d + a + 8 >> 2] = mb[0];
      p[d + a + 12 >> 2] = mb[1];
      Ha[d + a + 16 >> 1] = 280;
      q[d + a + 18 >> 0] = z;
      Da(r, d + a + 19, 256);
      a += 280;
      t += 1;
    }
    rc(c, 280 * t, 0);
    return a;
  } catch (C) {
    return "undefined" !== typeof N && C instanceof H || m(C), -C.i;
  }
}, __syscall221:function(a, b) {
  O = b;
  try {
    var c = yc();
    switch(P()) {
      case 0:
        var d = P();
        return 0 > d ? -22 : pc(c.path, c.flags, 0, d).fd;
      case 1:
      case 2:
        return 0;
      case 3:
        return c.flags;
      case 4:
        return d = P(), c.flags |= d, 0;
      case 12:
        return d = P(), Ha[d + 0 >> 1] = 2, 0;
      case 13:
      case 14:
        return 0;
      case 16:
      case 8:
        return -22;
      case 9:
        return ub(22), -1;
      default:
        return -22;
    }
  } catch (f) {
    return "undefined" !== typeof N && f instanceof H || m(f), -f.i;
  }
}, __syscall40:function(a, b) {
  O = b;
  try {
    var c = x(P()), d = M(c, {parent:!0}).node, f = yb(c), g = Mb(d, f), h = fc(d, f, !0);
    if (h) {
      throw new H(h);
    }
    if (!d.f.rmdir) {
      throw new H(1);
    }
    if (g.S) {
      throw new H(16);
    }
    try {
      L.willDeletePath && L.willDeletePath(c);
    } catch (k) {
      console.log("FS.trackingDelegate['willDeletePath']('" + c + "') threw an exception: " + k.message);
    }
    d.f.rmdir(d, f);
    $b(g);
    try {
      if (L.onDeletePath) {
        L.onDeletePath(c);
      }
    } catch (k) {
      console.log("FS.trackingDelegate['onDeletePath']('" + c + "') threw an exception: " + k.message);
    }
    return 0;
  } catch (k) {
    return "undefined" !== typeof N && k instanceof H || m(k), -k.i;
  }
}, __syscall5:function(a, b) {
  O = b;
  try {
    var c = x(P()), d = P(), f = P();
    return pc(c, d, f).fd;
  } catch (g) {
    return "undefined" !== typeof N && g instanceof H || m(g), -g.i;
  }
}, __syscall54:function(a, b) {
  O = b;
  try {
    var c = yc(), d = P();
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
        var f = P();
        return p[f >> 2] = 0;
      case 21520:
        return c.tty ? -22 : -25;
      case 21531:
        a = f = P();
        if (!c.g.Ma) {
          throw new H(25);
        }
        return c.g.Ma(c, d, a);
      case 21523:
        return c.tty ? 0 : -25;
      case 21524:
        return c.tty ? 0 : -25;
      default:
        m("bad ioctl syscall " + d);
    }
  } catch (g) {
    return "undefined" !== typeof N && g instanceof H || m(g), -g.i;
  }
}, __syscall6:function(a, b) {
  O = b;
  try {
    var c = yc();
    if (null === c.fd) {
      throw new H(9);
    }
    c.N && (c.N = null);
    try {
      c.g.close && c.g.close(c);
    } catch (d) {
      throw d;
    } finally {
      Sb[c.fd] = null;
    }
    c.fd = null;
    return 0;
  } catch (d) {
    return "undefined" !== typeof N && d instanceof H || m(d), -d.i;
  }
}, __syscall85:function(a, b) {
  O = b;
  try {
    var c = x(P()), d = P();
    var f = P();
    if (0 >= f) {
      var g = -22;
    } else {
      var h = Wb(c), k = Math.min(f, Ea(h)), t = q[d + k];
      Da(h, d, f + 1);
      q[d + k] = t;
      g = k;
    }
    return g;
  } catch (r) {
    return "undefined" !== typeof N && r instanceof H || m(r), -r.i;
  }
}, __syscall91:function(a, b) {
  O = b;
  try {
    var c = P(), d = P();
    return zc(c, d);
  } catch (f) {
    return "undefined" !== typeof N && f instanceof H || m(f), -f.i;
  }
}, __unlock:function() {
}, _addDays:me, _arraySum:je, _embind_register_bool:function(a, b, c, d, f) {
  var g = Ac(c);
  b = R(b);
  U(a, {name:b, fromWireType:function(a) {
    return !!a;
  }, toWireType:function(a, b) {
    return b ? d : f;
  }, argPackAdvance:8, readValueFromPointer:function(a) {
    if (1 === c) {
      var d = q;
    } else {
      if (2 === c) {
        d = Ha;
      } else {
        if (4 === c) {
          d = p;
        } else {
          throw new TypeError("Unknown boolean type size: " + b);
        }
      }
    }
    return this.fromWireType(d[a >> g]);
  }, H:null});
}, _embind_register_class:function(a, b, c, d, f, g, h, k, t, r, u, z, B) {
  u = R(u);
  g = W(f, g);
  k && (k = W(h, k));
  r && (r = W(t, r));
  B = W(z, B);
  var C = Gc(u);
  ed(C, function() {
    Fd("Cannot construct " + u + " due to unbound types", [d]);
  });
  T([a, b, c], d ? [d] : [], function(b) {
    b = b[0];
    if (d) {
      var c = b.h;
      var f = c.J;
    } else {
      f = Nc.prototype;
    }
    b = Hc(C, function() {
      if (Object.getPrototypeOf(this) !== h) {
        throw new Jc("Use 'new' to construct " + u);
      }
      if (void 0 === t.M) {
        throw new Jc(u + " has no accessible constructor");
      }
      var a = t.M[arguments.length];
      if (void 0 === a) {
        throw new Jc("Tried to invoke ctor of " + u + " with invalid number of parameters (" + arguments.length + ") - expected (" + Object.keys(t.M).toString() + ") parameters instead!");
      }
      return a.apply(this, arguments);
    });
    var h = Object.create(f, {constructor:{value:b}});
    b.prototype = h;
    var t = new fd(u, b, h, B, c, g, k, r);
    c = new V(u, t, !0, !1, !1);
    f = new V(u + "*", t, !1, !1, !1);
    var z = new V(u + " const*", t, !1, !0, !1);
    cd[a] = {pointerType:f, Ga:z};
    Bd(C, b);
    return [c, f, z];
  });
}, _embind_register_class_class_function:function(a, b, c, d, f, g, h) {
  var k = Jd(c, d);
  b = R(b);
  g = W(f, g);
  T([], [a], function(a) {
    function d() {
      Fd("Cannot call " + f + " due to unbound types", k);
    }
    a = a[0];
    var f = a.name + "." + b, t = a.h.constructor;
    void 0 === t[b] ? (d.P = c - 1, t[b] = d) : (dd(t, b, f), t[b].o[c - 1] = d);
    T([], k, function(a) {
      a = [a[0], null].concat(a.slice(1));
      a = Id(f, a, null, g, h);
      void 0 === t[b].o ? (a.P = c - 1, t[b] = a) : t[b].o[c - 1] = a;
      return [];
    });
    return [];
  });
}, _embind_register_class_constructor:function(a, b, c, d, f, g) {
  var h = Jd(b, c);
  f = W(d, f);
  T([], [a], function(a) {
    a = a[0];
    var c = "constructor " + a.name;
    void 0 === a.h.M && (a.h.M = []);
    if (void 0 !== a.h.M[b - 1]) {
      throw new Jc("Cannot register multiple constructors with identical number of parameters (" + (b - 1) + ") for class '" + a.name + "'! Overload resolution is currently only performed using the parameter count, not actual type info!");
    }
    a.h.M[b - 1] = function() {
      Fd("Cannot construct " + a.name + " due to unbound types", h);
    };
    T([], h, function(d) {
      a.h.M[b - 1] = function() {
        arguments.length !== b - 1 && S(c + " called with " + arguments.length + " arguments, expected " + (b - 1));
        var a = [], h = Array(b);
        h[0] = g;
        for (var k = 1; k < b; ++k) {
          h[k] = d[k].toWireType(a, arguments[k - 1]);
        }
        h = f.apply(null, h);
        Hd(a);
        return d[0].fromWireType(h);
      };
      return [];
    });
    return [];
  });
}, _embind_register_class_function:function(a, b, c, d, f, g, h, k) {
  var t = Jd(c, d);
  b = R(b);
  g = W(f, g);
  T([], [a], function(a) {
    function d() {
      Fd("Cannot call " + f + " due to unbound types", t);
    }
    a = a[0];
    var f = a.name + "." + b;
    k && a.h.Pa.push(b);
    var r = a.h.J, C = r[b];
    void 0 === C || void 0 === C.o && C.className !== a.name && C.P === c - 2 ? (d.P = c - 2, d.className = a.name, r[b] = d) : (dd(r, b, f), r[b].o[c - 2] = d);
    T([], t, function(d) {
      d = Id(f, d, a, g, h);
      void 0 === r[b].o ? (d.P = c - 2, r[b] = d) : r[b].o[c - 2] = d;
      return [];
    });
    return [];
  });
}, _embind_register_class_property:function(a, b, c, d, f, g, h, k, t, r) {
  b = R(b);
  f = W(d, f);
  T([], [a], function(a) {
    a = a[0];
    var d = a.name + "." + b, u = {get:function() {
      Fd("Cannot access " + d + " due to unbound types", [c, h]);
    }, enumerable:!0, configurable:!0};
    t ? u.set = function() {
      Fd("Cannot access " + d + " due to unbound types", [c, h]);
    } : u.set = function() {
      S(d + " is a read-only property");
    };
    Object.defineProperty(a.h.J, b, u);
    T([], t ? [c, h] : [c], function(c) {
      var h = c[0], u = {get:function() {
        var b = Kd(this, a, d + " getter");
        return h.fromWireType(f(g, b));
      }, enumerable:!0};
      if (t) {
        t = W(k, t);
        var z = c[1];
        u.set = function(b) {
          var c = Kd(this, a, d + " setter"), f = [];
          t(r, c, z.toWireType(f, b));
          Hd(f);
        };
      }
      Object.defineProperty(a.h.J, b, u);
      return [];
    });
    return [];
  });
}, _embind_register_emval:function(a, b) {
  b = R(b);
  U(a, {name:b, fromWireType:function(a) {
    var b = X[a].value;
    Md(a);
    return b;
  }, toWireType:function(a, b) {
    return kd(b);
  }, argPackAdvance:8, readValueFromPointer:md, H:null});
}, _embind_register_float:function(a, b, c) {
  c = Ac(c);
  b = R(b);
  U(a, {name:b, fromWireType:function(a) {
    return a;
  }, toWireType:function(a, b) {
    if ("number" !== typeof b && "boolean" !== typeof b) {
      throw new TypeError('Cannot convert "' + id(b) + '" to ' + this.name);
    }
    return b;
  }, argPackAdvance:8, readValueFromPointer:Qd(b, c), H:null});
}, _embind_register_integer:function(a, b, c, d, f) {
  function g(a) {
    return a;
  }
  b = R(b);
  -1 === f && (f = 4294967295);
  var h = Ac(c);
  if (0 === d) {
    var k = 32 - 8 * c;
    g = function(a) {
      return a << k >>> k;
    };
  }
  var t = -1 != b.indexOf("unsigned");
  U(a, {name:b, fromWireType:g, toWireType:function(a, c) {
    if ("number" !== typeof c && "boolean" !== typeof c) {
      throw new TypeError('Cannot convert "' + id(c) + '" to ' + this.name);
    }
    if (c < d || c > f) {
      throw new TypeError('Passing a number "' + id(c) + '" from JS side to C/C++ side to an argument of type "' + b + '", which is outside the valid range [' + d + ", " + f + "]!");
    }
    return t ? c >>> 0 : c | 0;
  }, argPackAdvance:8, readValueFromPointer:Rd(b, h, 0 !== d), H:null});
}, _embind_register_memory_view:function(a, b, c) {
  function d(a) {
    a >>= 2;
    var b = y;
    return new f(b.buffer, b[a + 1], b[a]);
  }
  var f = [Int8Array, Uint8Array, Int16Array, Uint16Array, Int32Array, Uint32Array, Float32Array, Float64Array][b];
  c = R(c);
  U(a, {name:c, fromWireType:d, argPackAdvance:8, readValueFromPointer:d}, {La:!0});
}, _embind_register_std_string:function(a, b) {
  b = R(b);
  var c = "std::string" === b;
  U(a, {name:b, fromWireType:function(a) {
    var b = y[a >> 2];
    if (c) {
      var d = w[a + 4 + b], h = 0;
      0 != d && (h = d, w[a + 4 + b] = 0);
      var k = a + 4;
      for (d = 0; d <= b; ++d) {
        var t = a + 4 + d;
        if (0 == w[t]) {
          k = x(k);
          if (void 0 === r) {
            var r = k;
          } else {
            r += String.fromCharCode(0), r += k;
          }
          k = t + 1;
        }
      }
      0 != h && (w[a + 4 + b] = h);
    } else {
      r = Array(b);
      for (d = 0; d < b; ++d) {
        r[d] = String.fromCharCode(w[a + 4 + d]);
      }
      r = r.join("");
    }
    Q(a);
    return r;
  }, toWireType:function(a, b) {
    b instanceof ArrayBuffer && (b = new Uint8Array(b));
    var d = "string" === typeof b;
    d || b instanceof Uint8Array || b instanceof Uint8ClampedArray || b instanceof Int8Array || S("Cannot pass non-string to std::string");
    var f = (c && d ? function() {
      return Ea(b);
    } : function() {
      return b.length;
    })(), k = za(4 + f + 1);
    y[k >> 2] = f;
    if (c && d) {
      Da(b, k + 4, f + 1);
    } else {
      if (d) {
        for (d = 0; d < f; ++d) {
          var t = b.charCodeAt(d);
          255 < t && (Q(k), S("String has UTF-16 code units that do not fit in 8 bits"));
          w[k + 4 + d] = t;
        }
      } else {
        for (d = 0; d < f; ++d) {
          w[k + 4 + d] = b[d];
        }
      }
    }
    null !== a && a.push(Q, k);
    return k;
  }, argPackAdvance:8, readValueFromPointer:md, H:function(a) {
    Q(a);
  }});
}, _embind_register_std_wstring:function(a, b, c) {
  c = R(c);
  if (2 === b) {
    var d = function() {
      return Ia;
    };
    var f = 1;
  } else {
    4 === b && (d = function() {
      return y;
    }, f = 2);
  }
  U(a, {name:c, fromWireType:function(a) {
    for (var b = d(), c = y[a >> 2], g = Array(c), r = a + 4 >> f, u = 0; u < c; ++u) {
      g[u] = String.fromCharCode(b[r + u]);
    }
    Q(a);
    return g.join("");
  }, toWireType:function(a, c) {
    var g = d(), h = c.length, r = za(4 + h * b);
    y[r >> 2] = h;
    for (var u = r + 4 >> f, z = 0; z < h; ++z) {
      g[u + z] = c.charCodeAt(z);
    }
    null !== a && a.push(Q, r);
    return r;
  }, argPackAdvance:8, readValueFromPointer:md, H:function(a) {
    Q(a);
  }});
}, _embind_register_void:function(a, b) {
  b = R(b);
  U(a, {vd:!0, name:b, argPackAdvance:0, fromWireType:function() {
  }, toWireType:function() {
  }});
}, _emscripten_syscall_munmap:zc, _emscripten_traverse_stack:Xd, _emval_decref:Md, _emval_incref:function(a) {
  4 < a && (X[a].pa += 1);
}, _emval_register:kd, _emval_take_value:function(a, b) {
  a = Sd(a, "_emval_take_value");
  a = a.readValueFromPointer(b);
  return kd(a);
}, _formatString:Vd, _isLeapYear:ie, _reallyNegative:Ud, abort:function() {
  e.abort();
}, atexit:tb, attachFinalizer:Uc, clock:Td, constNoSmartPtrRawPointerToWireType:hd, count_emval_handles:Nd, craftInvokerFunction:Id, createNamedFunction:Hc, demangle:ob, demangleAll:pb, detachFinalizer:Rc, downcastPointer:qd, embind__requireFunction:W, embind_init_charCodes:Bc, embind_repr:id, emscripten_get_callstack_js:Yd, emscripten_get_heap_size:ra, emscripten_log:function(a, b) {
  var c = p[b >> 2];
  b += 4;
  var d = "";
  if (c) {
    for (b = Vd(c, b), c = 0; c < b.length; ++c) {
      d += String.fromCharCode(b[c]);
    }
  }
  Zd(a, d);
}, emscripten_log_js:Zd, emscripten_memcpy_big:$d, emscripten_realloc_buffer:ge, emscripten_resize_heap:he, emscripten_run_script:function(a) {
  eval(x(a));
}, emscripten_run_script_int:function(a) {
  return eval(x(a)) | 0;
}, emscripten_run_script_string:Y, ensureOverloadTable:dd, exposePublicSymbol:ed, extendError:Ic, fabs:Xa, fabsf:Xa, floatReadValueFromPointer:Qd, floor:$a, flushPendingDeletes:$c, genericPointerToWireType:jd, getBasestPointer:wd, getInheritedInstance:xd, getInheritedInstanceCount:rd, getLiveInheritedInstances:td, getShiftFromSize:Ac, getTypeName:Dd, get_first_emval:Od, getenv:ae, heap32VectorToArray:Jd, init_ClassHandle:bd, init_RegisteredPointer:Ad, init_embind:vd, init_emval:Pd, integerReadValueFromPointer:Rd, 
jsStackTrace:qb, localtime:function(a) {
  return fe(a, 1744992);
}, localtime_r:fe, makeClassHandle:yd, makeLegalFunctionName:Gc, memcpy:function(a, b, c) {
  a |= 0;
  b |= 0;
  c |= 0;
  var d;
  if (8192 <= (c | 0)) {
    return $d(a | 0, b | 0, c | 0) | 0, a | 0;
  }
  var f = a | 0;
  var g = a + c | 0;
  if ((a & 3) == (b & 3)) {
    for (; a & 3;) {
      if (0 == (c | 0)) {
        return f | 0;
      }
      q[a >> 0] = q[b >> 0] | 0;
      a = a + 1 | 0;
      b = b + 1 | 0;
      c = c - 1 | 0;
    }
    c = g & -4 | 0;
    for (d = c - 64 | 0; (a | 0) <= (d | 0);) {
      p[a >> 2] = p[b >> 2] | 0, p[a + 4 >> 2] = p[b + 4 >> 2] | 0, p[a + 8 >> 2] = p[b + 8 >> 2] | 0, p[a + 12 >> 2] = p[b + 12 >> 2] | 0, p[a + 16 >> 2] = p[b + 16 >> 2] | 0, p[a + 20 >> 2] = p[b + 20 >> 2] | 0, p[a + 24 >> 2] = p[b + 24 >> 2] | 0, p[a + 28 >> 2] = p[b + 28 >> 2] | 0, p[a + 32 >> 2] = p[b + 32 >> 2] | 0, p[a + 36 >> 2] = p[b + 36 >> 2] | 0, p[a + 40 >> 2] = p[b + 40 >> 2] | 0, p[a + 44 >> 2] = p[b + 44 >> 2] | 0, p[a + 48 >> 2] = p[b + 48 >> 2] | 0, p[a + 52 >> 2] = p[b + 52 >> 
      2] | 0, p[a + 56 >> 2] = p[b + 56 >> 2] | 0, p[a + 60 >> 2] = p[b + 60 >> 2] | 0, a = a + 64 | 0, b = b + 64 | 0;
    }
    for (; (a | 0) < (c | 0);) {
      p[a >> 2] = p[b >> 2] | 0, a = a + 4 | 0, b = b + 4 | 0;
    }
  } else {
    for (c = g - 4 | 0; (a | 0) < (c | 0);) {
      q[a >> 0] = q[b >> 0] | 0, q[a + 1 >> 0] = q[b + 1 >> 0] | 0, q[a + 2 >> 0] = q[b + 2 >> 0] | 0, q[a + 3 >> 0] = q[b + 3 >> 0] | 0, a = a + 4 | 0, b = b + 4 | 0;
    }
  }
  for (; (a | 0) < (g | 0);) {
    q[a >> 0] = q[b >> 0] | 0, a = a + 1 | 0, b = b + 1 | 0;
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
      q[a >> 0] = b, a = a + 1 | 0;
    }
    var g = f & -4 | 0;
    var h = b | b << 8 | b << 16 | b << 24;
    for (d = g - 64 | 0; (a | 0) <= (d | 0);) {
      p[a >> 2] = h, p[a + 4 >> 2] = h, p[a + 8 >> 2] = h, p[a + 12 >> 2] = h, p[a + 16 >> 2] = h, p[a + 20 >> 2] = h, p[a + 24 >> 2] = h, p[a + 28 >> 2] = h, p[a + 32 >> 2] = h, p[a + 36 >> 2] = h, p[a + 40 >> 2] = h, p[a + 44 >> 2] = h, p[a + 48 >> 2] = h, p[a + 52 >> 2] = h, p[a + 56 >> 2] = h, p[a + 60 >> 2] = h, a = a + 64 | 0;
    }
    for (; (a | 0) < (g | 0);) {
      p[a >> 2] = h, a = a + 4 | 0;
    }
  }
  for (; (a | 0) < (f | 0);) {
    q[a >> 0] = b, a = a + 1 | 0;
  }
  return f - c | 0;
}, mktime:function(a) {
  be();
  var b = new Date(p[a + 20 >> 2] + 1900, p[a + 16 >> 2], p[a + 12 >> 2], p[a + 8 >> 2], p[a + 4 >> 2], p[a >> 2], 0), c = p[a + 32 >> 2], d = b.getTimezoneOffset(), f = new Date(b.getFullYear(), 0, 1), g = (new Date(2000, 6, 1)).getTimezoneOffset(), h = f.getTimezoneOffset(), k = Math.min(h, g);
  0 > c ? p[a + 32 >> 2] = Number(g != h && k == d) : 0 < c != (k == d) && (g = Math.max(h, g), b.setTime(b.getTime() + 60000 * ((0 < c ? k : g) - d)));
  p[a + 24 >> 2] = b.getDay();
  p[a + 28 >> 2] = (b.getTime() - f.getTime()) / 864E5 | 0;
  return b.getTime() / 1000 | 0;
}, new_:Gd, nonConstNoSmartPtrRawPointerToWireType:ld, pthread_cond_broadcast:function() {
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
}, readLatin1String:R, registerType:U, releaseClassHandle:Tc, replacePublicSymbol:Bd, requireRegisteredType:Sd, runDestructor:Sc, runDestructors:Hd, sbrk:function(a) {
  a |= 0;
  var b = ra() | 0;
  var c = p[qa >> 2] | 0;
  var d = c + a | 0;
  if (0 < (a | 0) & (d | 0) < (c | 0) | 0 > (d | 0) || (d | 0) > (b | 0) && !(he(d | 0) | 0)) {
    return ub(12), -1;
  }
  p[qa >> 2] = d | 0;
  return c | 0;
}, setDelayFunction:ud, setTempRet0:function() {
}, shallowCopyInternalPointer:Oc, simpleReadValueFromPointer:md, sqrt:Ya, stackTrace:rb, strftime:ne, strftime_l:function(a, b, c, d) {
  return ne(a, b, c, d);
}, throwBindingError:S, throwInstanceAlreadyDeleted:Pc, throwInternalError:Lc, throwUnboundTypeError:Fd, time:function(a) {
  var b = Date.now() / 1000 | 0;
  a && (p[a >> 2] = b);
  return b;
}, tzset:be, upcastPointer:gd, validateThis:Kd, whenDependentTypesAreResolved:T}, buffer), pe = Z.__wasm_call_ctors;
Z.__wasm_call_ctors = function() {
  assert(E, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
  assert(!0, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
  return pe.apply(null, arguments);
};
var qe = Z.strlen;
Z.strlen = function() {
  assert(E, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
  assert(!0, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
  return qe.apply(null, arguments);
};
var re = Z.malloc;
Z.malloc = function() {
  assert(E, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
  assert(!0, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
  return re.apply(null, arguments);
};
var se = Z.free;
Z.free = function() {
  assert(E, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
  assert(!0, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
  return se.apply(null, arguments);
};
var te = Z.__errno_location;
Z.__errno_location = function() {
  assert(E, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
  assert(!0, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
  return te.apply(null, arguments);
};
var ue = Z.fflush;
Z.fflush = function() {
  assert(E, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
  assert(!0, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
  return ue.apply(null, arguments);
};
var ve = Z.realloc;
Z.realloc = function() {
  assert(E, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
  assert(!0, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
  return ve.apply(null, arguments);
};
var we = Z._ZSt18uncaught_exceptionv;
Z._ZSt18uncaught_exceptionv = function() {
  assert(E, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
  assert(!0, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
  return we.apply(null, arguments);
};
var xe = Z._get_tzname;
Z._get_tzname = function() {
  assert(E, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
  assert(!0, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
  return xe.apply(null, arguments);
};
var ye = Z._get_daylight;
Z._get_daylight = function() {
  assert(E, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
  assert(!0, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
  return ye.apply(null, arguments);
};
var ze = Z._get_timezone;
Z._get_timezone = function() {
  assert(E, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
  assert(!0, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
  return ze.apply(null, arguments);
};
var Ae = Z._get_environ;
Z._get_environ = function() {
  assert(E, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
  assert(!0, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
  return Ae.apply(null, arguments);
};
var Be = Z.__getTypeName;
Z.__getTypeName = function() {
  assert(E, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
  assert(!0, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
  return Be.apply(null, arguments);
};
var Ce = Z.__embind_register_native_and_builtin_types;
Z.__embind_register_native_and_builtin_types = function() {
  assert(E, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
  assert(!0, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
  return Ce.apply(null, arguments);
};
var De = Z.setThrew;
Z.setThrew = function() {
  assert(E, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
  assert(!0, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
  return De.apply(null, arguments);
};
var Ee = Z.stackSave;
Z.stackSave = function() {
  assert(E, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
  assert(!0, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
  return Ee.apply(null, arguments);
};
var Fe = Z.stackAlloc;
Z.stackAlloc = function() {
  assert(E, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
  assert(!0, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
  return Fe.apply(null, arguments);
};
var Ge = Z.stackRestore;
Z.stackRestore = function() {
  assert(E, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
  assert(!0, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
  return Ge.apply(null, arguments);
};
var He = Z.__growWasmMemory;
Z.__growWasmMemory = function() {
  assert(E, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
  assert(!0, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
  return He.apply(null, arguments);
};
var Ie = Z.dynCall_vi;
Z.dynCall_vi = function() {
  assert(E, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
  assert(!0, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
  return Ie.apply(null, arguments);
};
var Je = Z.dynCall_ii;
Z.dynCall_ii = function() {
  assert(E, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
  assert(!0, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
  return Je.apply(null, arguments);
};
var Ke = Z.dynCall_vii;
Z.dynCall_vii = function() {
  assert(E, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
  assert(!0, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
  return Ke.apply(null, arguments);
};
var Le = Z.dynCall_iiii;
Z.dynCall_iiii = function() {
  assert(E, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
  assert(!0, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
  return Le.apply(null, arguments);
};
var Me = Z.dynCall_viii;
Z.dynCall_viii = function() {
  assert(E, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
  assert(!0, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
  return Me.apply(null, arguments);
};
var Ne = Z.dynCall_iii;
Z.dynCall_iii = function() {
  assert(E, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
  assert(!0, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
  return Ne.apply(null, arguments);
};
var Oe = Z.dynCall_viiiiiii;
Z.dynCall_viiiiiii = function() {
  assert(E, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
  assert(!0, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
  return Oe.apply(null, arguments);
};
var Pe = Z.dynCall_viiiiii;
Z.dynCall_viiiiii = function() {
  assert(E, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
  assert(!0, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
  return Pe.apply(null, arguments);
};
var Qe = Z.dynCall_viiiii;
Z.dynCall_viiiii = function() {
  assert(E, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
  assert(!0, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
  return Qe.apply(null, arguments);
};
var Re = Z.dynCall_viiiiiiii;
Z.dynCall_viiiiiiii = function() {
  assert(E, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
  assert(!0, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
  return Re.apply(null, arguments);
};
var Se = Z.dynCall_iiiiiiii;
Z.dynCall_iiiiiiii = function() {
  assert(E, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
  assert(!0, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
  return Se.apply(null, arguments);
};
var Te = Z.dynCall_iiiiiii;
Z.dynCall_iiiiiii = function() {
  assert(E, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
  assert(!0, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
  return Te.apply(null, arguments);
};
var Ue = Z.dynCall_iiiiii;
Z.dynCall_iiiiii = function() {
  assert(E, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
  assert(!0, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
  return Ue.apply(null, arguments);
};
var Ve = Z.dynCall_iiiiiiiii;
Z.dynCall_iiiiiiiii = function() {
  assert(E, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
  assert(!0, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
  return Ve.apply(null, arguments);
};
var We = Z.dynCall_viijii;
Z.dynCall_viijii = function() {
  assert(E, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
  assert(!0, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
  return We.apply(null, arguments);
};
var Xe = Z.dynCall_viiii;
Z.dynCall_viiii = function() {
  assert(E, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
  assert(!0, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
  return Xe.apply(null, arguments);
};
var Ye = Z.dynCall_v;
Z.dynCall_v = function() {
  assert(E, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
  assert(!0, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
  return Ye.apply(null, arguments);
};
var Ze = Z.dynCall_iiiii;
Z.dynCall_iiiii = function() {
  assert(E, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
  assert(!0, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
  return Ze.apply(null, arguments);
};
var $e = Z.dynCall_diiid;
Z.dynCall_diiid = function() {
  assert(E, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
  assert(!0, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
  return $e.apply(null, arguments);
};
var af = Z.dynCall_viiiiiiiii;
Z.dynCall_viiiiiiiii = function() {
  assert(E, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
  assert(!0, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
  return af.apply(null, arguments);
};
var bf = Z.dynCall_iiiiiiiiiiiii;
Z.dynCall_iiiiiiiiiiiii = function() {
  assert(E, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
  assert(!0, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
  return bf.apply(null, arguments);
};
var cf = Z.dynCall_iiiiiiiiii;
Z.dynCall_iiiiiiiiii = function() {
  assert(E, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
  assert(!0, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
  return cf.apply(null, arguments);
};
var df = Z.dynCall_iiiiiiiiiiii;
Z.dynCall_iiiiiiiiiiii = function() {
  assert(E, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
  assert(!0, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
  return df.apply(null, arguments);
};
var ef = Z.dynCall_viiiiiiiiii;
Z.dynCall_viiiiiiiiii = function() {
  assert(E, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
  assert(!0, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
  return ef.apply(null, arguments);
};
var ff = Z.dynCall_viiiiiiji;
Z.dynCall_viiiiiiji = function() {
  assert(E, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
  assert(!0, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
  return ff.apply(null, arguments);
};
var gf = Z.dynCall_viiij;
Z.dynCall_viiij = function() {
  assert(E, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
  assert(!0, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
  return gf.apply(null, arguments);
};
var hf = Z.dynCall_viiiiiijii;
Z.dynCall_viiiiiijii = function() {
  assert(E, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
  assert(!0, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
  return hf.apply(null, arguments);
};
var jf = Z.dynCall_fi;
Z.dynCall_fi = function() {
  assert(E, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
  assert(!0, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
  return jf.apply(null, arguments);
};
var kf = Z.dynCall_vif;
Z.dynCall_vif = function() {
  assert(E, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
  assert(!0, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
  return kf.apply(null, arguments);
};
var lf = Z.dynCall_idd;
Z.dynCall_idd = function() {
  assert(E, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
  assert(!0, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
  return lf.apply(null, arguments);
};
var mf = Z.dynCall_viiiiiiiiiiii;
Z.dynCall_viiiiiiiiiiii = function() {
  assert(E, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
  assert(!0, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
  return mf.apply(null, arguments);
};
var nf = Z.dynCall_viffff;
Z.dynCall_viffff = function() {
  assert(E, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
  assert(!0, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
  return nf.apply(null, arguments);
};
var of = Z.dynCall_iiiiiiiiiii;
Z.dynCall_iiiiiiiiiii = function() {
  assert(E, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
  assert(!0, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
  return of.apply(null, arguments);
};
var pf = Z.dynCall_viiifii;
Z.dynCall_viiifii = function() {
  assert(E, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
  assert(!0, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
  return pf.apply(null, arguments);
};
var qf = Z.dynCall_viiifiii;
Z.dynCall_viiifiii = function() {
  assert(E, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
  assert(!0, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
  return qf.apply(null, arguments);
};
var rf = Z.dynCall_iidiiii;
Z.dynCall_iidiiii = function() {
  assert(E, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
  assert(!0, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
  return rf.apply(null, arguments);
};
var sf = Z.dynCall_jiji;
Z.dynCall_jiji = function() {
  assert(E, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
  assert(!0, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
  return sf.apply(null, arguments);
};
var tf = Z.dynCall_iiiiij;
Z.dynCall_iiiiij = function() {
  assert(E, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
  assert(!0, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
  return tf.apply(null, arguments);
};
var uf = Z.dynCall_iiiiid;
Z.dynCall_iiiiid = function() {
  assert(E, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
  assert(!0, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
  return uf.apply(null, arguments);
};
var vf = Z.dynCall_iiiiijj;
Z.dynCall_iiiiijj = function() {
  assert(E, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
  assert(!0, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
  return vf.apply(null, arguments);
};
var wf = Z.dynCall_iiiiiijj;
Z.dynCall_iiiiiijj = function() {
  assert(E, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
  assert(!0, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
  return wf.apply(null, arguments);
};
e.asm = Z;
var nb = e.___wasm_call_ctors = function() {
  assert(E, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
  assert(!0, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
  return e.asm.__wasm_call_ctors.apply(null, arguments);
}, Wd = e._strlen = function() {
  assert(E, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
  assert(!0, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
  return e.asm.strlen.apply(null, arguments);
}, za = e._malloc = function() {
  assert(E, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
  assert(!0, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
  return e.asm.malloc.apply(null, arguments);
}, Q = e._free = function() {
  assert(E, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
  assert(!0, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
  return e.asm.free.apply(null, arguments);
};
e.___errno_location = function() {
  assert(E, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
  assert(!0, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
  return e.asm.__errno_location.apply(null, arguments);
};
e._fflush = function() {
  assert(E, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
  assert(!0, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
  return e.asm.fflush.apply(null, arguments);
};
e._realloc = function() {
  assert(E, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
  assert(!0, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
  return e.asm.realloc.apply(null, arguments);
};
var oe = e.__ZSt18uncaught_exceptionv = function() {
  assert(E, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
  assert(!0, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
  return e.asm._ZSt18uncaught_exceptionv.apply(null, arguments);
}, ee = e.__get_tzname = function() {
  assert(E, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
  assert(!0, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
  return e.asm._get_tzname.apply(null, arguments);
}, de = e.__get_daylight = function() {
  assert(E, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
  assert(!0, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
  return e.asm._get_daylight.apply(null, arguments);
}, ce = e.__get_timezone = function() {
  assert(E, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
  assert(!0, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
  return e.asm._get_timezone.apply(null, arguments);
};
e.__get_environ = function() {
  assert(E, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
  assert(!0, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
  return e.asm._get_environ.apply(null, arguments);
};
var Ed = e.___getTypeName = function() {
  assert(E, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
  assert(!0, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
  return e.asm.__getTypeName.apply(null, arguments);
};
e.___embind_register_native_and_builtin_types = function() {
  assert(E, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
  assert(!0, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
  return e.asm.__embind_register_native_and_builtin_types.apply(null, arguments);
};
e._setThrew = function() {
  assert(E, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
  assert(!0, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
  return e.asm.setThrew.apply(null, arguments);
};
e.stackSave = function() {
  assert(E, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
  assert(!0, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
  return e.asm.stackSave.apply(null, arguments);
};
e.stackAlloc = function() {
  assert(E, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
  assert(!0, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
  return e.asm.stackAlloc.apply(null, arguments);
};
e.stackRestore = function() {
  assert(E, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
  assert(!0, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
  return e.asm.stackRestore.apply(null, arguments);
};
e.__growWasmMemory = function() {
  assert(E, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
  assert(!0, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
  return e.asm.__growWasmMemory.apply(null, arguments);
};
e.dynCall_vi = function() {
  assert(E, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
  assert(!0, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
  return e.asm.dynCall_vi.apply(null, arguments);
};
e.dynCall_ii = function() {
  assert(E, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
  assert(!0, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
  return e.asm.dynCall_ii.apply(null, arguments);
};
e.dynCall_vii = function() {
  assert(E, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
  assert(!0, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
  return e.asm.dynCall_vii.apply(null, arguments);
};
e.dynCall_iiii = function() {
  assert(E, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
  assert(!0, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
  return e.asm.dynCall_iiii.apply(null, arguments);
};
e.dynCall_viii = function() {
  assert(E, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
  assert(!0, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
  return e.asm.dynCall_viii.apply(null, arguments);
};
e.dynCall_iii = function() {
  assert(E, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
  assert(!0, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
  return e.asm.dynCall_iii.apply(null, arguments);
};
e.dynCall_viiiiiii = function() {
  assert(E, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
  assert(!0, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
  return e.asm.dynCall_viiiiiii.apply(null, arguments);
};
e.dynCall_viiiiii = function() {
  assert(E, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
  assert(!0, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
  return e.asm.dynCall_viiiiii.apply(null, arguments);
};
e.dynCall_viiiii = function() {
  assert(E, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
  assert(!0, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
  return e.asm.dynCall_viiiii.apply(null, arguments);
};
e.dynCall_viiiiiiii = function() {
  assert(E, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
  assert(!0, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
  return e.asm.dynCall_viiiiiiii.apply(null, arguments);
};
e.dynCall_iiiiiiii = function() {
  assert(E, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
  assert(!0, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
  return e.asm.dynCall_iiiiiiii.apply(null, arguments);
};
e.dynCall_iiiiiii = function() {
  assert(E, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
  assert(!0, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
  return e.asm.dynCall_iiiiiii.apply(null, arguments);
};
e.dynCall_iiiiii = function() {
  assert(E, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
  assert(!0, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
  return e.asm.dynCall_iiiiii.apply(null, arguments);
};
e.dynCall_iiiiiiiii = function() {
  assert(E, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
  assert(!0, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
  return e.asm.dynCall_iiiiiiiii.apply(null, arguments);
};
e.dynCall_viijii = function() {
  assert(E, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
  assert(!0, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
  return e.asm.dynCall_viijii.apply(null, arguments);
};
e.dynCall_viiii = function() {
  assert(E, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
  assert(!0, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
  return e.asm.dynCall_viiii.apply(null, arguments);
};
e.dynCall_v = function() {
  assert(E, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
  assert(!0, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
  return e.asm.dynCall_v.apply(null, arguments);
};
e.dynCall_iiiii = function() {
  assert(E, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
  assert(!0, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
  return e.asm.dynCall_iiiii.apply(null, arguments);
};
e.dynCall_diiid = function() {
  assert(E, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
  assert(!0, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
  return e.asm.dynCall_diiid.apply(null, arguments);
};
e.dynCall_viiiiiiiii = function() {
  assert(E, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
  assert(!0, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
  return e.asm.dynCall_viiiiiiiii.apply(null, arguments);
};
e.dynCall_iiiiiiiiiiiii = function() {
  assert(E, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
  assert(!0, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
  return e.asm.dynCall_iiiiiiiiiiiii.apply(null, arguments);
};
e.dynCall_iiiiiiiiii = function() {
  assert(E, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
  assert(!0, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
  return e.asm.dynCall_iiiiiiiiii.apply(null, arguments);
};
e.dynCall_iiiiiiiiiiii = function() {
  assert(E, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
  assert(!0, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
  return e.asm.dynCall_iiiiiiiiiiii.apply(null, arguments);
};
e.dynCall_viiiiiiiiii = function() {
  assert(E, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
  assert(!0, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
  return e.asm.dynCall_viiiiiiiiii.apply(null, arguments);
};
e.dynCall_viiiiiiji = function() {
  assert(E, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
  assert(!0, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
  return e.asm.dynCall_viiiiiiji.apply(null, arguments);
};
e.dynCall_viiij = function() {
  assert(E, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
  assert(!0, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
  return e.asm.dynCall_viiij.apply(null, arguments);
};
e.dynCall_viiiiiijii = function() {
  assert(E, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
  assert(!0, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
  return e.asm.dynCall_viiiiiijii.apply(null, arguments);
};
e.dynCall_fi = function() {
  assert(E, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
  assert(!0, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
  return e.asm.dynCall_fi.apply(null, arguments);
};
e.dynCall_vif = function() {
  assert(E, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
  assert(!0, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
  return e.asm.dynCall_vif.apply(null, arguments);
};
e.dynCall_idd = function() {
  assert(E, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
  assert(!0, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
  return e.asm.dynCall_idd.apply(null, arguments);
};
e.dynCall_viiiiiiiiiiii = function() {
  assert(E, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
  assert(!0, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
  return e.asm.dynCall_viiiiiiiiiiii.apply(null, arguments);
};
e.dynCall_viffff = function() {
  assert(E, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
  assert(!0, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
  return e.asm.dynCall_viffff.apply(null, arguments);
};
e.dynCall_iiiiiiiiiii = function() {
  assert(E, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
  assert(!0, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
  return e.asm.dynCall_iiiiiiiiiii.apply(null, arguments);
};
e.dynCall_viiifii = function() {
  assert(E, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
  assert(!0, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
  return e.asm.dynCall_viiifii.apply(null, arguments);
};
e.dynCall_viiifiii = function() {
  assert(E, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
  assert(!0, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
  return e.asm.dynCall_viiifiii.apply(null, arguments);
};
e.dynCall_iidiiii = function() {
  assert(E, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
  assert(!0, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
  return e.asm.dynCall_iidiiii.apply(null, arguments);
};
e.dynCall_jiji = function() {
  assert(E, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
  assert(!0, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
  return e.asm.dynCall_jiji.apply(null, arguments);
};
e.dynCall_iiiiij = function() {
  assert(E, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
  assert(!0, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
  return e.asm.dynCall_iiiiij.apply(null, arguments);
};
e.dynCall_iiiiid = function() {
  assert(E, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
  assert(!0, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
  return e.asm.dynCall_iiiiid.apply(null, arguments);
};
e.dynCall_iiiiijj = function() {
  assert(E, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
  assert(!0, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
  return e.asm.dynCall_iiiiijj.apply(null, arguments);
};
e.dynCall_iiiiiijj = function() {
  assert(E, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
  assert(!0, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
  return e.asm.dynCall_iiiiiijj.apply(null, arguments);
};
e.asm = Z;
Object.getOwnPropertyDescriptor(e, "intArrayFromString") || (e.intArrayFromString = function() {
  m("'intArrayFromString' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
});
Object.getOwnPropertyDescriptor(e, "intArrayToString") || (e.intArrayToString = function() {
  m("'intArrayToString' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
});
Object.getOwnPropertyDescriptor(e, "ccall") || (e.ccall = function() {
  m("'ccall' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
});
Object.getOwnPropertyDescriptor(e, "cwrap") || (e.cwrap = function() {
  m("'cwrap' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
});
Object.getOwnPropertyDescriptor(e, "setValue") || (e.setValue = function() {
  m("'setValue' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
});
Object.getOwnPropertyDescriptor(e, "getValue") || (e.getValue = function() {
  m("'getValue' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
});
Object.getOwnPropertyDescriptor(e, "allocate") || (e.allocate = function() {
  m("'allocate' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
});
Object.getOwnPropertyDescriptor(e, "getMemory") || (e.getMemory = function() {
  m("'getMemory' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ). Alternatively, forcing filesystem support (-s FORCE_FILESYSTEM=1) can export this for you");
});
Object.getOwnPropertyDescriptor(e, "AsciiToString") || (e.AsciiToString = function() {
  m("'AsciiToString' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
});
Object.getOwnPropertyDescriptor(e, "stringToAscii") || (e.stringToAscii = function() {
  m("'stringToAscii' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
});
Object.getOwnPropertyDescriptor(e, "UTF8ArrayToString") || (e.UTF8ArrayToString = function() {
  m("'UTF8ArrayToString' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
});
Object.getOwnPropertyDescriptor(e, "UTF8ToString") || (e.UTF8ToString = function() {
  m("'UTF8ToString' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
});
Object.getOwnPropertyDescriptor(e, "stringToUTF8Array") || (e.stringToUTF8Array = function() {
  m("'stringToUTF8Array' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
});
Object.getOwnPropertyDescriptor(e, "stringToUTF8") || (e.stringToUTF8 = function() {
  m("'stringToUTF8' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
});
Object.getOwnPropertyDescriptor(e, "lengthBytesUTF8") || (e.lengthBytesUTF8 = function() {
  m("'lengthBytesUTF8' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
});
Object.getOwnPropertyDescriptor(e, "UTF16ToString") || (e.UTF16ToString = function() {
  m("'UTF16ToString' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
});
Object.getOwnPropertyDescriptor(e, "stringToUTF16") || (e.stringToUTF16 = function() {
  m("'stringToUTF16' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
});
Object.getOwnPropertyDescriptor(e, "lengthBytesUTF16") || (e.lengthBytesUTF16 = function() {
  m("'lengthBytesUTF16' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
});
Object.getOwnPropertyDescriptor(e, "UTF32ToString") || (e.UTF32ToString = function() {
  m("'UTF32ToString' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
});
Object.getOwnPropertyDescriptor(e, "stringToUTF32") || (e.stringToUTF32 = function() {
  m("'stringToUTF32' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
});
Object.getOwnPropertyDescriptor(e, "lengthBytesUTF32") || (e.lengthBytesUTF32 = function() {
  m("'lengthBytesUTF32' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
});
Object.getOwnPropertyDescriptor(e, "allocateUTF8") || (e.allocateUTF8 = function() {
  m("'allocateUTF8' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
});
Object.getOwnPropertyDescriptor(e, "stackTrace") || (e.stackTrace = function() {
  m("'stackTrace' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
});
Object.getOwnPropertyDescriptor(e, "addOnPreRun") || (e.addOnPreRun = function() {
  m("'addOnPreRun' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
});
Object.getOwnPropertyDescriptor(e, "addOnInit") || (e.addOnInit = function() {
  m("'addOnInit' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
});
Object.getOwnPropertyDescriptor(e, "addOnPreMain") || (e.addOnPreMain = function() {
  m("'addOnPreMain' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
});
Object.getOwnPropertyDescriptor(e, "addOnExit") || (e.addOnExit = function() {
  m("'addOnExit' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
});
Object.getOwnPropertyDescriptor(e, "addOnPostRun") || (e.addOnPostRun = function() {
  m("'addOnPostRun' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
});
Object.getOwnPropertyDescriptor(e, "writeStringToMemory") || (e.writeStringToMemory = function() {
  m("'writeStringToMemory' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
});
Object.getOwnPropertyDescriptor(e, "writeArrayToMemory") || (e.writeArrayToMemory = function() {
  m("'writeArrayToMemory' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
});
Object.getOwnPropertyDescriptor(e, "writeAsciiToMemory") || (e.writeAsciiToMemory = function() {
  m("'writeAsciiToMemory' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
});
Object.getOwnPropertyDescriptor(e, "addRunDependency") || (e.addRunDependency = function() {
  m("'addRunDependency' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ). Alternatively, forcing filesystem support (-s FORCE_FILESYSTEM=1) can export this for you");
});
Object.getOwnPropertyDescriptor(e, "removeRunDependency") || (e.removeRunDependency = function() {
  m("'removeRunDependency' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ). Alternatively, forcing filesystem support (-s FORCE_FILESYSTEM=1) can export this for you");
});
Object.getOwnPropertyDescriptor(e, "ENV") || (e.ENV = function() {
  m("'ENV' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
});
Object.getOwnPropertyDescriptor(e, "FS") || (e.FS = function() {
  m("'FS' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
});
Object.getOwnPropertyDescriptor(e, "FS_createFolder") || (e.FS_createFolder = function() {
  m("'FS_createFolder' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ). Alternatively, forcing filesystem support (-s FORCE_FILESYSTEM=1) can export this for you");
});
Object.getOwnPropertyDescriptor(e, "FS_createPath") || (e.FS_createPath = function() {
  m("'FS_createPath' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ). Alternatively, forcing filesystem support (-s FORCE_FILESYSTEM=1) can export this for you");
});
Object.getOwnPropertyDescriptor(e, "FS_createDataFile") || (e.FS_createDataFile = function() {
  m("'FS_createDataFile' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ). Alternatively, forcing filesystem support (-s FORCE_FILESYSTEM=1) can export this for you");
});
Object.getOwnPropertyDescriptor(e, "FS_createPreloadedFile") || (e.FS_createPreloadedFile = function() {
  m("'FS_createPreloadedFile' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ). Alternatively, forcing filesystem support (-s FORCE_FILESYSTEM=1) can export this for you");
});
Object.getOwnPropertyDescriptor(e, "FS_createLazyFile") || (e.FS_createLazyFile = function() {
  m("'FS_createLazyFile' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ). Alternatively, forcing filesystem support (-s FORCE_FILESYSTEM=1) can export this for you");
});
Object.getOwnPropertyDescriptor(e, "FS_createLink") || (e.FS_createLink = function() {
  m("'FS_createLink' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ). Alternatively, forcing filesystem support (-s FORCE_FILESYSTEM=1) can export this for you");
});
Object.getOwnPropertyDescriptor(e, "FS_createDevice") || (e.FS_createDevice = function() {
  m("'FS_createDevice' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ). Alternatively, forcing filesystem support (-s FORCE_FILESYSTEM=1) can export this for you");
});
Object.getOwnPropertyDescriptor(e, "FS_unlink") || (e.FS_unlink = function() {
  m("'FS_unlink' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ). Alternatively, forcing filesystem support (-s FORCE_FILESYSTEM=1) can export this for you");
});
Object.getOwnPropertyDescriptor(e, "GL") || (e.GL = function() {
  m("'GL' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
});
Object.getOwnPropertyDescriptor(e, "dynamicAlloc") || (e.dynamicAlloc = function() {
  m("'dynamicAlloc' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
});
Object.getOwnPropertyDescriptor(e, "warnOnce") || (e.warnOnce = function() {
  m("'warnOnce' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
});
Object.getOwnPropertyDescriptor(e, "loadDynamicLibrary") || (e.loadDynamicLibrary = function() {
  m("'loadDynamicLibrary' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
});
Object.getOwnPropertyDescriptor(e, "loadWebAssemblyModule") || (e.loadWebAssemblyModule = function() {
  m("'loadWebAssemblyModule' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
});
Object.getOwnPropertyDescriptor(e, "getLEB") || (e.getLEB = function() {
  m("'getLEB' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
});
Object.getOwnPropertyDescriptor(e, "getFunctionTables") || (e.getFunctionTables = function() {
  m("'getFunctionTables' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
});
Object.getOwnPropertyDescriptor(e, "alignFunctionTables") || (e.alignFunctionTables = function() {
  m("'alignFunctionTables' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
});
Object.getOwnPropertyDescriptor(e, "registerFunctions") || (e.registerFunctions = function() {
  m("'registerFunctions' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
});
Object.getOwnPropertyDescriptor(e, "addFunction") || (e.addFunction = function() {
  m("'addFunction' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
});
Object.getOwnPropertyDescriptor(e, "removeFunction") || (e.removeFunction = function() {
  m("'removeFunction' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
});
Object.getOwnPropertyDescriptor(e, "getFuncWrapper") || (e.getFuncWrapper = function() {
  m("'getFuncWrapper' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
});
Object.getOwnPropertyDescriptor(e, "prettyPrint") || (e.prettyPrint = function() {
  m("'prettyPrint' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
});
Object.getOwnPropertyDescriptor(e, "makeBigInt") || (e.makeBigInt = function() {
  m("'makeBigInt' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
});
Object.getOwnPropertyDescriptor(e, "dynCall") || (e.dynCall = function() {
  m("'dynCall' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
});
Object.getOwnPropertyDescriptor(e, "getCompilerSetting") || (e.getCompilerSetting = function() {
  m("'getCompilerSetting' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
});
Object.getOwnPropertyDescriptor(e, "stackSave") || (e.stackSave = function() {
  m("'stackSave' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
});
Object.getOwnPropertyDescriptor(e, "stackRestore") || (e.stackRestore = function() {
  m("'stackRestore' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
});
Object.getOwnPropertyDescriptor(e, "stackAlloc") || (e.stackAlloc = function() {
  m("'stackAlloc' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
});
Object.getOwnPropertyDescriptor(e, "establishStackSpace") || (e.establishStackSpace = function() {
  m("'establishStackSpace' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
});
Object.getOwnPropertyDescriptor(e, "print") || (e.print = function() {
  m("'print' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
});
Object.getOwnPropertyDescriptor(e, "printErr") || (e.printErr = function() {
  m("'printErr' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
});
Object.getOwnPropertyDescriptor(e, "getTempRet0") || (e.getTempRet0 = function() {
  m("'getTempRet0' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
});
Object.getOwnPropertyDescriptor(e, "setTempRet0") || (e.setTempRet0 = function() {
  m("'setTempRet0' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
});
Object.getOwnPropertyDescriptor(e, "callMain") || (e.callMain = function() {
  m("'callMain' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
});
Object.getOwnPropertyDescriptor(e, "Pointer_stringify") || (e.Pointer_stringify = function() {
  m("'Pointer_stringify' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
});
Object.getOwnPropertyDescriptor(e, "ALLOC_NORMAL") || Object.defineProperty(e, "ALLOC_NORMAL", {get:function() {
  m("'ALLOC_NORMAL' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
}});
Object.getOwnPropertyDescriptor(e, "ALLOC_STACK") || Object.defineProperty(e, "ALLOC_STACK", {get:function() {
  m("'ALLOC_STACK' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
}});
Object.getOwnPropertyDescriptor(e, "ALLOC_DYNAMIC") || Object.defineProperty(e, "ALLOC_DYNAMIC", {get:function() {
  m("'ALLOC_DYNAMIC' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
}});
Object.getOwnPropertyDescriptor(e, "ALLOC_NONE") || Object.defineProperty(e, "ALLOC_NONE", {get:function() {
  m("'ALLOC_NONE' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
}});
db = function xf() {
  e.calledRun || yf();
  e.calledRun || (db = xf);
};
function yf() {
  function a() {
    if (!e.calledRun && (e.calledRun = !0, !xa)) {
      Na();
      assert(!E);
      E = !0;
      if (!e.noFSInit && !tc) {
        assert(!tc, "FS.init was previously called. If you want to initialize later with custom parameters, remove any earlier calls (note that one is automatically added to the generated code)");
        tc = !0;
        sc();
        e.stdin = e.stdin;
        e.stdout = e.stdout;
        e.stderr = e.stderr;
        e.stdin ? vc("stdin", e.stdin) : oc("/dev/tty", "/dev/stdin");
        e.stdout ? vc("stdout", null, e.stdout) : oc("/dev/tty", "/dev/stdout");
        e.stderr ? vc("stderr", null, e.stderr) : oc("/dev/tty1", "/dev/stderr");
        var a = pc("/dev/stdin", "r"), c = pc("/dev/stdout", "w"), d = pc("/dev/stderr", "w");
        assert(0 === a.fd, "invalid handle for stdin (" + a.fd + ")");
        assert(1 === c.fd, "invalid handle for stdout (" + c.fd + ")");
        assert(2 === d.fd, "invalid handle for stderr (" + d.fd + ")");
      }
      Oa(Qa);
      Na();
      Vb = !1;
      Oa(Ra);
      if (e.onRuntimeInitialized) {
        e.onRuntimeInitialized();
      }
      assert(!e._main, 'compiled without a main, but one is present. if you added it from JS, use Module["onRuntimeInitialized"]');
      Na();
      if (e.postRun) {
        for ("function" == typeof e.postRun && (e.postRun = [e.postRun]); e.postRun.length;) {
          a = e.postRun.shift(), Ta.unshift(a);
        }
      }
      Oa(Ta);
    }
  }
  if (!(0 < bb)) {
    assert(!0);
    y[436289] = 34821223;
    y[436290] = 2310721022;
    if (e.preRun) {
      for ("function" == typeof e.preRun && (e.preRun = [e.preRun]); e.preRun.length;) {
        Ua();
      }
    }
    Oa(Pa);
    0 < bb || e.calledRun || (e.setStatus ? (e.setStatus("Running..."), setTimeout(function() {
      setTimeout(function() {
        e.setStatus("");
      }, 1);
      a();
    }, 1)) : a(), Na());
  }
}
e.run = yf;
var zf = [];
function m(a) {
  if (e.onAbort) {
    e.onAbort(a);
  }
  oa(a);
  n(a);
  xa = !0;
  var b = "abort(" + a + ") at " + rb();
  zf && zf.forEach(function(c) {
    b = c(b, a);
  });
  throw b;
}
e.abort = m;
if (e.preInit) {
  for ("function" == typeof e.preInit && (e.preInit = [e.preInit]); 0 < e.preInit.length;) {
    e.preInit.pop()();
  }
}
e.noExitRuntime = !0;
yf();

