import fs from "fs";

const generateDeclaration = (bDev) => {
  if (bDev) {
    const files = fs.readdirSync("../");
    const targetDirName = ["CORE", "CVR", "DBR", "DCE", "DCP", "LICENSE", "UTILITY"];
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
    fs.writeFileSync('public/dbr.bundle.d.ts', finalDtsTxt);
  }
  const srcFile = 'public/dbr.bundle.d.ts';
  const destFile = 'dist/dbr.bundle.d.ts';

  fs.copyFileSync(srcFile, destFile);
}

export default generateDeclaration;
