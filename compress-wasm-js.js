import fs from "fs";
import { minify } from "terser";

const compressWasmJs = async () => {
  const jsFiles = fs.readdirSync("./public").filter(f => f.endsWith(".js"));

  for (let file of jsFiles) {
    const code = fs.readFileSync(`dist/${file}`, "utf8");
    const compressCode = await minify(code, { mangle: { eval: true } });
    fs.writeFileSync(`dist/${file}`, compressCode.code);
  }
};

export default compressWasmJs;