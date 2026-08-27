import fs from "fs";
import babel from "@rollup/plugin-babel";
import typescript from "@rollup/plugin-typescript";
import terser from "@rollup/plugin-terser";
import replace from "@rollup/plugin-replace";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import generateDeclaration from "./generate-declaration.js";
import adjustCompiled from "./adjust-compiled.js";
import compressWasmJs from "./compress-wasm-js.js";
import copyResources from "./copyResources.js";
import { dts } from "rollup-plugin-dts";
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const packageJson = JSON.parse(fs.readFileSync('./package.json', 'utf-8'));

const pkgVersion = packageJson.version;
const bDev = process.env.BUILD === "development";

// Copy the resource files required by DBR_BUNDLE and the worker code files over, so that only one copy of the resources needs to be maintained.
if (bDev) {
  copyResources();
}

fs.rmSync("dist", { recursive: true, force: true });
fs.cpSync("public", "dist", { recursive: true });

// Update LICENSE
const licenseText = fs.readFileSync("LICENSE", { encoding: "utf8" });
const updatedText = licenseText.replace(
  /(Copyright © \d{4}-)\d{4}/,
  `$1${new Date().getFullYear()}`
);
fs.writeFileSync("./LICENSE", updatedText, "utf8");

adjustCompiled();
if (!bDev) {
  compressWasmJs();
}
const strProduct = 'Dynamsoft Barcode Reader JS Edition Bundle';

const terser_format = {
  // this func is run by eval in worker, so can't use variable outside
  comments: function (node, comment) {
    const text = comment.value;
    const type = comment.type;
    if (type == "comment2") {
      // multiline comment
      const strProduct = 'Dynamsoft Barcode Reader JS Edition Bundle';
      const regDyComment = new RegExp(String.raw`@product\s${strProduct}`, 'i');
      return regDyComment.test(text);
    }
  },
};

const banner = `/*!
* Dynamsoft JavaScript Library
* @product ${strProduct}
* @website http://www.dynamsoft.com
* @copyright Copyright ${new Date().getUTCFullYear()}, Dynamsoft Corporation
* @author Dynamsoft
* @version ${pkgVersion}
* @fileoverview Dynamsoft JavaScript Library for Barcode Reader
* More info on dbr JS: https://www.dynamsoft.com/barcode-reader/docs/web/programming/javascript/
*/`;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const plugin_terser_es6 = terser({ ecma: 6, format: terser_format });
const plugin_terser_es5 = terser({ ecma: 5, format: terser_format });
const dependencyInclude = [
  "src/**/*",
  "node_modules/dynamsoft-core/**/*",
  "node_modules/@dynamsoft/**/*",
  "node_modules/@scannerproxy/**/*",
  "node_modules/mutable-promise/**/*",
];
const createBabelPlugin = (targets) => babel({
  babelHelpers: "bundled",
  extensions: [".js", ".mjs", ".ts"],
  include: dependencyInclude,
  presets: [["@babel/preset-env", {
    targets,
    bugfixes: true,
    modules: false,
  }]],
});
const plugin_babel_es6 = createBabelPlugin({ esmodules: true });
const plugin_babel_es5 = createBabelPlugin({ chrome: "78", firefox: "68", edge: "79", safari: "14.5" });
const replace_values = {
  "process.env.npm_package_version": JSON.stringify(pkgVersion)
};

export default [
  {
    input: "src/dbr.bundle.ts",
    plugins: [
      nodeResolve({ browser: true }),
      typescript({
        tsconfig: "./tsconfig.json",
        declaration: false,
        declarationDir: undefined,
        sourceMap: bDev,
      }),
      replace({
        preventAssignment: true,
        values: {
          ...replace_values
        },
      }),
      plugin_babel_es5,
      plugin_terser_es5,
      {
        // https://rollupjs.org/guide/en/#writebundle
        writeBundle(options, bundle) {
          let txt = fs.readFileSync('dist/dbr.bundle.js', { encoding: 'utf8' }).replace(/Dynamsoft=\{\}/, 'Dynamsoft=t.Dynamsoft||{}');
          fs.writeFileSync('dist/dbr.bundle.js', txt);
        }
      }
    ],
    output: [
      {
        file: "dist/dbr.bundle.js",
        format: "umd",
        name: "Dynamsoft",
        banner: banner,
        exports: "named",
        sourcemap: bDev,
      },
    ],
  },
  {
    input: "src/dbr.bundle.esm.ts",
    plugins: [
      nodeResolve({ browser: true }),
      typescript({
        tsconfig: "./tsconfig.json",
        sourceMap: bDev,
      }),
      replace({
        preventAssignment: true,
        values: {
          ...replace_values
        },
      }),
      plugin_babel_es6,
      plugin_terser_es6,
    ],
    output: [
      {
        file: "dist/dbr.bundle.mjs",
        format: "es",
        banner: banner,
        exports: "named",
        sourcemap: bDev,
        plugins: [
          {
            // https://rollupjs.org/guide/en/#writebundle
            writeBundle(options, bundle) {
              fs.cpSync('dist/dbr.bundle.mjs', 'dist/dbr.bundle.esm.js');
            }
          },
        ]
      },
    ],
  },
  {
    input: "src/dbr.bundle.worker.ts",
    plugins: [
      nodeResolve({ browser: true }),
      typescript({
        tsconfig: "./tsconfig.json",
        sourceMap: bDev,
      }),
      replace({
        preventAssignment: true,
        values: {
          ...replace_values
        },
      }),
      plugin_babel_es5,
    ],
    output: [
      {
        file: `dist/dbr.bundle.worker.js`,
        format: "iife",
        banner,
        sourcemap: bDev,
        plugins: [plugin_terser_es5],
      },
    ],
  },
  {
    input: 'dist/types/dbr.bundle.d.ts',
    plugins: [
      dts(),
      {
        // https://rollupjs.org/guide/en/#writebundle
        writeBundle(options, bundle) {
          fs.rmSync('dist/types', { recursive: true, force: true });
          generateDeclaration(bDev);
        }
      },
    ],
    output: [{
      file: 'dist/dbr.bundle.d.ts',
      format: 'es',
    }]
  }
];