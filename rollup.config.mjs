import fs from "fs";
import typescript from "@rollup/plugin-typescript";
import terser from "@rollup/plugin-terser";
// import replace from "@rollup/plugin-replace";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import { dts } from "rollup-plugin-dts";

import pkg from "./package.json" assert { type: "json" };
const version = pkg.version;

fs.rmSync("dist", { recursive: true, force: true });
// fs.cpSync("public", "dist", { recursive: true });

const strProduct = 'Dynamsoft Barcode Reader JS Edition Bundle';

const terser_format = {
  // this func is run by eval in worker, so can't use variable outside
  comments: function (node, comment) {
    const text = comment.value;
    const type = comment.type;
    if (type == "comment2") {
      // multiline comment
      const strProduct = 'Dynamsoft Barcode Reader JS Edition Bundle';
      const regDyComment = new RegExp(String.raw`@product\s${strProduct}`,'i');
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
* @version ${version}
* @fileoverview Dynamsoft JavaScript Library for Barcode Reader
* More info on dbr JS: https://www.dynamsoft.com/barcode-reader/docs/web/programming/javascript/
*/`;

const plugin_terser_es6 = terser({ ecma: 6, format: terser_format });
const plugin_terser_es5 = terser({ ecma: 5, format: terser_format });

export default [
  {
    input: "src/dbr.bundle.ts",
    plugins: [
      nodeResolve({ browser: true }),
      typescript({ 
        tsconfig: "./tsconfig.json",
        declaration: false,
        declarationDir: undefined,
      }),
      plugin_terser_es5,
    ],
    output: [
      {
        file: "dist/dbr.bundle.js",
        format: "umd",
        name: "Dynamsoft",
        banner: banner,
        exports: "named",
      },
    ],
  },
  {
    input: "src/dbr.bundle.esm.ts",
    plugins: [
      nodeResolve({ browser: true }),
      typescript({ 
        tsconfig: "./tsconfig.json",
      }),
      plugin_terser_es6,
    ],
    output: [
      {
        file: "dist/dbr.bundle.mjs",
        format: "es",
        banner: banner,
        exports: "named",
      },
    ],
  },
  {
    input: "src/dbr.bundle.esm.ts",
    plugins: [
      typescript({ 
        tsconfig: "./tsconfig.json",
      }),
      plugin_terser_es6,
    ],
    output: [
      {
        file: "dist/dbr.no-content-bundle.esm.js",
        format: "es",
        banner: banner,
        exports: "named",
      },
    ],
  },
  {
    input: 'dist/types/dbr.bundle.d.ts',
    plugins: [
      dts(),
      {
        // https://rollupjs.org/guide/en/#writebundle
        writeBundle(options, bundle){
          // change `export { type A }` to `export { A }`,
          // so project use old typescript still works.
          let txt = fs.readFileSync('dist/dbr.bundle.d.ts', {encoding:'utf8'}).replace(/([{,]) type /g,'$1 ');
          fs.writeFileSync('dist/dbr.bundle.d.ts', txt);
        }
      },
    ],
    output: [{
      file: 'dist/dbr.bundle.d.ts',
      format: 'es',
    }],
  },
  {
    input: 'dist/types/dbr.bundle.esm.d.ts',
    plugins: [
      dts(),
      {
        // https://rollupjs.org/guide/en/#writebundle
        writeBundle(options, bundle){
          fs.rmSync('dist/types', {recursive:true, force:true});
          // change `export { type A }` to `export { A }`,
          // so project use old typescript still works.
          let txt = fs.readFileSync('dist/dbr.bundle.esm.d.ts', {encoding:'utf8'}).replace(/([{,]) type /g,'$1 ');
          fs.writeFileSync('dist/dbr.bundle.esm.d.ts', txt);
        }
      },
    ],
    output: [{
      file: 'dist/dbr.bundle.esm.d.ts',
      format: 'es',
    }],
  },
];
