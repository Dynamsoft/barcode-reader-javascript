
import fs from "fs";

const adjustCompiled = () => {
  let withOnnx = fs.readFileSync('dist/dynamsoft-capture-vision-bundle-ml-simd.js', { encoding: 'utf-8' });
  let widthOnnxNoSimd = fs.readFileSync('dist/dynamsoft-capture-vision-bundle-ml.js', { encoding: 'utf-8' });
  let withoutOnnx = fs.readFileSync('dist/dynamsoft-capture-vision-bundle.js', { encoding: 'utf-8' });

  const addText = `
  wasmExports.emscripten_bind_funcs(addFunction((a, b, c) => {
    return stringToUTF8OnStack(self[UTF8ToString(a)][UTF8ToString(b)]()[UTF8ToString(c)]())
  }, 'iiii'));
  wasmExports.emscripten_bind_funcs(addFunction((a, b, c) => {
    return stringToUTF8OnStack((new self[UTF8ToString(a)])[UTF8ToString(b)](UTF8ToString(c)))
  }, 'iiii'));
  wasmExports.emscripten_bind_funcs(addFunction((a, b, c, d) => {
    self[UTF8ToString(a)](null, UTF8ToString(b).trim(), UTF8ToString(c), d)
  }, 'viiii'));
  wasmExports.emscripten_bind_funcs(addFunction((a, b, c, d) => {
    return stringToUTF8OnStack(self[UTF8ToString(a)][UTF8ToString(b)][UTF8ToString(c)](UTF8ToString(d)) ? '' : self[UTF8ToString(a)][UTF8ToString(b)])
  }, 'iiiii'));

  if (Module["onRuntimeInitialized"]) Module["onRuntimeInitialized"]();
  `

  withOnnx = withOnnx.replaceAll(`console.error(str)`, 'err(str)');
  withOnnx = withOnnx.replaceAll(`console.warn(str)`, 'err(str)');
  withOnnx = withOnnx.replaceAll(`console.info(str)`, 'out(str)');
  withOnnx = withOnnx.replaceAll(`console.debug(str)`, 'out(str)');
  withOnnx = withOnnx.replaceAll(`console.log(str)`, 'out(str)');
  withOnnx = withOnnx.replace(`if (Module["onRuntimeInitialized"]) Module["onRuntimeInitialized"]();`, addText)

  withoutOnnx = withoutOnnx.replaceAll(`console.error(str)`, 'err(str)');
  withoutOnnx = withoutOnnx.replaceAll(`console.warn(str)`, 'err(str)');
  withoutOnnx = withoutOnnx.replaceAll(`console.info(str)`, 'out(str)');
  withoutOnnx = withoutOnnx.replaceAll(`console.debug(str)`, 'out(str)');
  withoutOnnx = withoutOnnx.replaceAll(`console.log(str)`, 'out(str)');
  withoutOnnx = withoutOnnx.replace(`if (Module["onRuntimeInitialized"]) Module["onRuntimeInitialized"]();`, addText)

  widthOnnxNoSimd = widthOnnxNoSimd.replaceAll(`console.error(str)`, 'err(str)');
  widthOnnxNoSimd = widthOnnxNoSimd.replaceAll(`console.warn(str)`, 'err(str)');
  widthOnnxNoSimd = widthOnnxNoSimd.replaceAll(`console.info(str)`, 'out(str)');
  widthOnnxNoSimd = widthOnnxNoSimd.replaceAll(`console.debug(str)`, 'out(str)');
  widthOnnxNoSimd = widthOnnxNoSimd.replaceAll(`console.log(str)`, 'out(str)');
  widthOnnxNoSimd = widthOnnxNoSimd.replace(`if (Module["onRuntimeInitialized"]) Module["onRuntimeInitialized"]();`, addText)

  fs.writeFileSync('dist/dynamsoft-capture-vision-bundle-ml-simd.js', withOnnx);
  fs.writeFileSync('dist/dynamsoft-capture-vision-bundle-ml.js', widthOnnxNoSimd);
  fs.writeFileSync('dist/dynamsoft-capture-vision-bundle.js', withoutOnnx);
}

export default adjustCompiled;