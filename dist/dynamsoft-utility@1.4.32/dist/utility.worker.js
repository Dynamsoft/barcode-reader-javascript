/*!
 * Dynamsoft JavaScript Library
 * @product Dynamsoft Utility JS Edition
 * @website https://www.dynamsoft.com
 * @copyright Copyright 2024, Dynamsoft Corporation
 * @author Dynamsoft
 * @version 1.4.32
 * @fileoverview Dynamsoft JavaScript Library for Utility
 * More info DU JS: https://www.dynamsoft.com/capture-vision/docs/web/programming/javascript/api-reference/utility/utility-module.html
 */
!function(){"use strict";self.utilityWorkerVersion="1.4.32",Object.assign(mapController,{utility_drawOnImage:async(e,t)=>{let s;try{let a=wasmImports.emscripten_bind_Create_CImageData(e.dsImage.bytes.length,setBufferIntoWasm(e.dsImage.bytes,0),e.dsImage.width,e.dsImage.height,e.dsImage.stride,e.dsImage.format,0);const r=e.type.charAt(0).toUpperCase()+e.type.slice(1);ep(),s=JSON.parse(UTF8ToString(wasmImports[`emscripten_bind_UtilityWasm_DrawOnImage${r}_5`](a,es(JSON.stringify(e.drawingItem)),e.drawingItem.length,e.color,e.thickness)));let n=s.bytes;n&&(n=new Uint8Array(new Uint8Array(HEAP8.buffer,n.ptr,n.length)),s.bytes=n),wasmImports.emscripten_bind_Destory_CImageData(a),handleTaskRes(t,{success:!0,image:s})}catch(e){return console.log(e),void handleTaskErr(t,e)}}})}();
