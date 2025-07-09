import fs from "fs";
import { minify } from "terser";

const compressWasmJs = async () => {
  const bundleSimdWasmJsCode = fs.readFileSync("dist/dynamsoft-capture-vision-bundle-ml-simd.js", "utf8");
  const bundleWasmJsCode = fs.readFileSync("dist/dynamsoft-capture-vision-bundle-ml.js", "utf8");
  const bundleWasmJsCodeNoOnnx = fs.readFileSync("dist/dynamsoft-capture-vision-bundle.js", "utf8");

  let compressbundleSimdWasmJsCode = await minify(bundleSimdWasmJsCode, { mangle: { eval: true } });
  let compressbundleWasmJsCode = await minify(bundleWasmJsCode, { mangle: { eval: true } });
  let compressbundleWasmJsCodeNoOnnx = await minify(bundleWasmJsCodeNoOnnx, { mangle: { eval: true } });

  fs.writeFileSync('dist/dynamsoft-capture-vision-bundle-ml-simd.js', compressbundleSimdWasmJsCode.code);
  fs.writeFileSync('dist/dynamsoft-capture-vision-bundle-ml.js', compressbundleWasmJsCode.code);
  fs.writeFileSync('dist/dynamsoft-capture-vision-bundle.js', compressbundleWasmJsCodeNoOnnx.code);
};

export default compressWasmJs;