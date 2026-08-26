//Please run `updateAllDevDeps.js` in `DCV_BUNDLE` first, and then execute this script.

import fs from "fs";
import { execSync } from "child_process";

const modulesSet = ["CORE", "CVR", "LICENSE", "UTILITY", "DBR", "DCP", "DIP"];

for (let module of modulesSet) {
  const pkg = JSON.parse(fs.readFileSync(`../${module}/package.json`, "utf-8"));
  if(module === "CORE") {
    execSync(`npm pkg set devDependencies.dynamsoft-core=npm:${pkg.name}@${pkg.version}`);
  } else {
    execSync(`npm pkg set devDependencies.${pkg.name}=${pkg.version}`);
  }
}
 
execSync("npm install", { stdio: "inherit" });