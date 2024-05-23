/*!
* Dynamsoft JavaScript Library
* @product Dynamsoft Barcode Reader JS Edition Bundle
* @website http://www.dynamsoft.com
* @copyright Copyright 2024, Dynamsoft Corporation
* @author Dynamsoft
* @version 10.2.1000
* @fileoverview Dynamsoft JavaScript Library for Barcode Reader
* More info on dbr JS: https://www.dynamsoft.com/barcode-reader/docs/web/programming/javascript/
*/
import{CoreModule as e}from"dynamsoft-core";export*from"dynamsoft-core";export*from"dynamsoft-license";export*from"dynamsoft-capture-vision-router";export*from"dynamsoft-camera-enhancer";export*from"dynamsoft-barcode-reader";export*from"dynamsoft-utility";let t="./";if(document.currentScript){let e=document.currentScript.src,r=e.indexOf("?");if(-1!=r)e=e.substring(0,r);else{let t=e.indexOf("#");-1!=t&&(e=e.substring(0,t))}t=e.substring(0,e.lastIndexOf("/")+1)}const r=e=>{null==e&&(e="./");let t=document.createElement("a");return t.href=e,(e=t.href).endsWith("/")||(e+="/"),e};e.engineResourcePaths={std:r(t+"../../dynamsoft-capture-vision-std@1.2.10/dist/"),dip:r(t+"../../dynamsoft-image-processing@2.2.30/dist/"),core:r(t+"../../dynamsoft-core@3.2.30/dist/"),license:r(t+"../../dynamsoft-license@3.2.21/dist/"),cvr:r(t+"../../dynamsoft-capture-vision-router@2.2.30/dist/"),dce:r(t+"../../dynamsoft-camera-enhancer@4.0.3/dist/"),dbr:r(t+"../../dynamsoft-barcode-reader@10.2.10/dist/")};
