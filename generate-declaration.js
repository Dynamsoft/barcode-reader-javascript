import fs from "fs";
import path from "path";
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const generateDeclaration = (bDev) => {
  if (bDev) {
    const files = fs.readdirSync("../");
    const targetDirName = ["CORE", "CVR", "DBR", "DCP", "LICENSE", "UTILITY", "DLR", "DDN", "DIP"];
    let dbrBundleDtsTxt = fs.readFileSync("./dist/dbr.bundle.d.ts", "utf-8");
    dbrBundleDtsTxt = dbrBundleDtsTxt.replace(/([{,])\s*type\s+/g, '$1 ');
    dbrBundleDtsTxt = dbrBundleDtsTxt.replace(/^\s*(import\s+.*?from\s+['"][^'"]+[']|export\s+.*?from\s+['"][^'"]+[']|export\s+{[^}]*\bas\b[^}]*});?\s*$/gm, '');
    let finalDtsTxt = "";
    for (let i = 0; i < files.length; i++) {
      if (targetDirName.includes(files[i])) {
        let dtsTxt = fs.readFileSync(`../${files[i]}/dist/${files[i].toLowerCase()}.d.ts`, "utf-8");
        dtsTxt = dtsTxt.replace(/([{,])\s*type\s+/g, '$1 ');
        dtsTxt = dtsTxt.replace(/^\s*(import|export)\s+.*?from\s+['"][^'"]+['"];?\s*$/gm, '');
        finalDtsTxt += dtsTxt + "\n";
      }
    }
    finalDtsTxt += dbrBundleDtsTxt;

    let dmCameraDtsTxt = fs.readFileSync(`./node_modules/@dynamsoft/dm-camera/dist/dce.d.ts`, "utf-8");
    finalDtsTxt += dmCameraDtsTxt + "\n";

    fs.writeFileSync('public/dbr.bundle.d.ts', finalDtsTxt);
  }

  const srcFile = 'public/dbr.bundle.d.ts';
  const destFile = 'dist/dbr.bundle.d.ts';

  let text = fs.readFileSync(srcFile, "utf8");

  const result = text.replace(
    /( +)\/\*\*\s*\n\1 \* Specifies the basic settings for the document normalizer module[^\n]*\n\1 \*\/\n\1documentSettings: SimplifiedDocumentNormalizerSettings;\n\1\/\*\*\s*\n\1 \* Specifies the basic settings for the label recognizer module[^\n]*\n\1 \*\/\n\1labelSettings: SimplifiedLabelRecognizerSettings;\n?/g,
    ""
  );

  fs.writeFileSync(srcFile, result, "utf8");
  console.log("Done.");

  fs.copyFileSync(srcFile, destFile);
}

export default generateDeclaration;
