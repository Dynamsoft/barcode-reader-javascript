/* global dynamsoft, $ */

// By default, js will load `dbr-<version>.min.js` & `dbr-<version>.wasm` in the same folder as the context.
// `dbr-<version>.min.js` & `dbr-<version>.wasm` should always put in same folder.
// Modify this setting when you put `dbr-<version>.min.js` & `dbr-<version>.wasm` somewhere else.
dynamsoft.dbrEnv.resourcesPath = 'https://demo.dynamsoft.com/dbr_wasm/js';

// https://www.dynamsoft.com/CustomerPortal/Portal/TrialLicense.aspx
dynamsoft.dbrEnv.licenseKey = "t0094YAAAAAf3ODHwjvzXJkTbCTukvG79oxd1HqrRD4HGqfP0sxh2ZzRd5Ci+jSXYSE5kNoFzHSddVcT142Dh0lPs2OA/qFkD545Ykj1H83uN561ro6Jn32UfQ5APcX0ZgA==";

// The default value is true. It will load the wasm files automatically.
// If you want to load the file manually, please set it to false
// and call dynamsoft.BarcodeReader.loadWasm when needed.
dynamsoft.dbrEnv.bAutoLoadWasm = false;

// The default value is false. Set it true to decode in another thread. By this way, UI would not stuck.
dynamsoft.dbrEnv.bUseWorker = true;

/**
 * function showDbrVideoSmallTool
 * 
 * Please feel free to modfiy `dbrVideoSmallTool.js` and `dbrVideoSmallTool.css` to match your scenario.
 * 
 * | parameter        | type           | description
 * | ---------------- | -------------- | -----------
 * | *(return value)* | HTMLDivElement | 
 *     The element of the tool. You can put it somewhere else. By default it will be appended in body.
 * | ---------------- | -------------- | -----------
 * | callback         | function(txt)  | 
 *     It is called each time a reliable result is obtained.
 *     The same neighbour results would be regarded as one result.
 * | ---------------- | -------------- | -----------
 * | count            | number         | 
 *     if `count` is 0, the window would not automatically close. Default 0.
 *     if `count` == 1, the application will close the window after getting a reliable result.
 *     if the `count` > 1, the application will close the window after `count` reliable results are obtained.
 *     The same neighbour results would be regarded as one result.
 * | ---------------- | -------------- | -----------
 * | confidence       | number         | 
 *     A raw result, whose confidence equals or larger than the confidence, will be regarded as a reliable result. Dafault 30.
 * | ---------------- | -------------- | -----------
 * | styleObj         | object         | 
 *     A key-value style object to modify the style of `.dbrVideoSmallTool-outer`. 
 *     It is useful when you need to set the position or the size of the tool.
 * 
 *     e.g. `{postion: 'absolute', margin: '0', left: '200px', top: '100px', width: '200px', height: '160px'}`
 * 
 *     You may need some more custom styles to match your scenario.
 *     Please feel free to modfiy `dbrVideoSmallTool.js`(especially in `var html = ...`) and `dbrVideoSmallTool.css`.
 */
self.showDbrVideoSmallTool = function(callback, count, confidence, styleObj){
    confidence = confidence || 30;

    /*eslint-disable indent*/
    var html = [ // You may want to modify this to match your scenario.
        '<div class="dbrVideoSmallTool-outer">',
            '<p class="dbrVideoSmallTool-loading">loading</p>',
            '<video class="dbrVideoSmallTool-video" playsinline="true"></video>',
            '<select class="dbrVideoSmallTool-sel-camera">',
            '</select>',
            '<select class="dbrVideoSmallTool-sel-resolution">',
                '<option class="dbrVideoSmallTool-opt-gotResolution" value="got"></option>',
                '<option data-width="3840" data-height="2160">ask 3840 x 2160</option>',
                '<option data-width="1920" data-height="1080">ask 1920 x 1080</option>',
                '<option data-width="1600" data-height="1200">ask 1600 x 1200</option>',
                '<option data-width="1280" data-height="720" selected>ask 1280 x 720</option>',
                '<option data-width="800" data-height="600">ask 800 x 600</option>',
                '<option data-width="640" data-height="480">ask 640 x 480</option>',
                '<option data-width="640" data-height="360">ask 640 x 360</option>',
            '</select>',
            '<button class="dbrVideoSmallTool-btn-close">',
                '<svg width="16" height="16" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg"><path d="M1490 1322q0 40-28 68l-136 136q-28 28-68 28t-68-28l-294-294-294 294q-28 28-68 28t-68-28l-136-136q-28-28-28-68t28-68l294-294-294-294q-28-28-28-68t28-68l136-136q28-28 68-28t68 28l294 294 294-294q28-28 68-28t68 28l136 136q28 28 28 68t-28 68l-294 294 294 294q28 28 28 68z"/></svg>',
            '</button>',
        '</div>'
    ].join('');
    /*eslint-enable indent*/
    var toolDom = $(html)[0];
    var video = $(toolDom).find('.dbrVideoSmallTool-video')[0];
    var cameraSel = $(toolDom).find('.dbrVideoSmallTool-sel-camera')[0];
    var resolutionSel = $(toolDom).find('.dbrVideoSmallTool-sel-resolution')[0];
    var optGotRsl = $(toolDom).find('.dbrVideoSmallTool-opt-gotResolution')[0];
    var btnClose = $(toolDom).find('.dbrVideoSmallTool-btn-close')[0];
    if(styleObj){
        for(var field in styleObj){
            $(toolDom).css(field, styleObj[field]);
        }
    }
    
    var updateDevice = function(){
        return navigator.mediaDevices.enumerateDevices().then(deviceInfos=>{
            var oldVal = cameraSel.value;
            cameraSel.innerHTML = "";
            var selOpt = undefined;
            for(var i = 0; i < deviceInfos.length; ++i){
                var info = deviceInfos[i];
                if(info.kind != 'videoinput'){
                    continue;
                }
                var opt = document.createElement('option');
                opt.value = info.deviceId;
                opt.innerText = info.label || 'camera '+ i;
                cameraSel.appendChild(opt);
                if(oldVal == info.deviceId){
                    selOpt = opt;
                }
            }
            var optArr = cameraSel.childNodes;
            if(!selOpt && optArr.length){
                try{
                    video.srcObject.getTracks().forEach((track)=>{
                        if('video' == track.kind){
                            for(var i = 0; i < optArr.length; ++i){
                                var opt = optArr[i];
                                if(track.label == opt.innerText){
                                    selOpt = opt;
                                    throw 'found the using source';
                                }
                            }
                        }
                    });
                }catch(ex){
                    if(self.kConsoleLog){self.kConsoleLog(ex);}
                }
            }
            if(selOpt){
                cameraSel.value = selOpt.value;
            }
        });
    };

    var needFixEdge = false;
    (function(){
        var indexEdge = navigator.userAgent.toLowerCase().indexOf('edge/');
        if(-1 != indexEdge){
            var indexDot = navigator.userAgent.indexOf('.', indexEdge);
            var edgeVersion = navigator.userAgent.substring(indexEdge+5, indexDot);
            if(edgeVersion < 30){
                needFixEdge = true;
                // I supposed Edge fix object-fit bug on video after version 30 (>_<)
                video.parentNode.style.overflow = 'hidden';
                video.style.objectFit = 'none';
                video.style.left = '-10000px';
                video.style.top = '-10000px';
                video.style.right = '-10000px';
                video.style.bottom = '-10000px';
                video.style.margin = 'auto';
                video.style.position = 'absolute';
            }
        }
    })();

    var stopVideo = function(){
        if(video.srcObject){
            if(self.kConsoleLog)self.kConsoleLog('======stop video========');
            video.srcObject.getTracks().forEach(function(track) {
                track.stop();
            });
        }
    };

    var playvideo = (deviceId)=>{
        return new Promise((resolve,reject)=>{

            stopVideo();
    
            if(self.kConsoleLog)self.kConsoleLog('======before video========');
            var selRslOpt = $(resolutionSel).children(':selected')[0];
            var selW = selRslOpt.getAttribute('data-width');
            var selH = selRslOpt.getAttribute('data-height');
            optGotRsl.setAttribute('data-width', selW);
            optGotRsl.setAttribute('data-height', selH);
            var constraints = { 
                video: { 
                    facingMode: { ideal: 'environment' }
                } 
            };
            var bMobileSafari = /Safari/.test(navigator.userAgent) && /iPhone/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent);
            if(bMobileSafari){
                if(selW >= 1280){
                    constraints.video.width = 1280;
                }else if(selW >= 640){
                    constraints.video.width = 640;
                }else if(selW >= 320){
                    constraints.video.width = 320;
                }
            }else{
                constraints.video.width = { ideal: selW };
                constraints.video.height = { ideal: selH };
            }
            if(!deviceId){
                var selCamOpt = $(cameraSel).children(':selected')[0];
                if(selCamOpt){
                    deviceId = selCamOpt.value;
                }
            }
            if(deviceId){
                constraints.video.facingMode = undefined;
                constraints.video.deviceId = {exact: deviceId};
            }
            
            var hasTryedNoWidthHeight = false;
            var getAndPlayVideo = ()=>{
                if(self.kConsoleLog)self.kConsoleLog('======try getUserMedia========');
                if(self.kConsoleLog)self.kConsoleLog('ask '+JSON.stringify(constraints.video.width)+'x'+JSON.stringify(constraints.video.height));
                navigator.mediaDevices.getUserMedia(constraints).then((stream)=>{
                    if(self.kConsoleLog)self.kConsoleLog('======get video========');
                    return new Promise((resolve2, reject2)=>{
                        video.srcObject = stream;
                        video.onloadedmetadata = ()=>{
                            if(self.kConsoleLog)self.kConsoleLog('======play video========');
                            video.play().then(()=>{
                                if(self.kConsoleLog)self.kConsoleLog('======played video========');
                                var gotRsl = 'got '+video.videoWidth+'x'+video.videoHeight;
                                optGotRsl.innerText = gotRsl;
                                resolutionSel.value = 'got';
                                if(self.kConsoleLog)self.kConsoleLog(gotRsl);
                                if(needFixEdge){
                                    var dw = window.innerWidth, dh = window.innerHeight;
                                    if(video.videoWidth / video.videoHeight > dw / dh){
                                        video.style.width = Math.round(video.videoWidth / video.videoHeight * dh) + 'px';
                                        video.style.height = dh + 'px';
                                    }else{
                                        video.style.width = dw + 'px';
                                        video.style.height = Math.round(video.videoHeight / video.videoWidth * dw) + 'px';
                                    }
                                }
                                resolve2();
                            },(ex)=>{
                                reject2(ex);
                            });
                        };
                        video.onerror = ()=>{reject2();};
                    });
                }).then(()=>{
                    resolve();
                }).catch((ex)=>{
                    if(self.kConsoleLog)self.kConsoleLog(ex);
                    if(!hasTryedNoWidthHeight){
                        hasTryedNoWidthHeight = true;
                        constraints.video.width = undefined;
                        constraints.video.height = undefined;
                        getAndPlayVideo();
                    }else{
                        reject(ex);
                    }
                });
            };
            getAndPlayVideo();
        });
    };

    var lastBestTxt = null;
    var loopReadVideo = function(){
        if(windowHasClosed){
            return;
        }
        if(video.paused){
            if(self.kConsoleLog)self.kConsoleLog('Video is paused. Ask in 1s.');
            return setTimeout(loopReadVideo, 1000);
        }
    
        if(self.kConsoleLog)self.kConsoleLog('======= once read =======');
    
        var timestart = (new Date()).getTime();
        var barcodeReader = new dynamsoft.BarcodeReader();
        barcodeReader.decodeVideo(video).then((results)=>{
            if(self.kConsoleLog)self.kConsoleLog('time cost: ' + ((new Date()).getTime() - timestart) + 'ms');
            var bestConfidence = 0, bestTxt = undefined;
            for(let i=0;i<results.length;++i){
                var result = results[i];
                if(self.kConsoleLog)self.kConsoleLog(result.BarcodeText);
                var curConfidence = result.LocalizationResult.ExtendedResultArray[0].Confidence;
                if(curConfidence >= confidence){
                    if(curConfidence > bestConfidence){
                        bestConfidence = curConfidence;
                        bestTxt = result.BarcodeText;
                    }
                }
            }

            if(bestTxt && bestTxt != lastBestTxt){
                lastBestTxt = bestTxt;
                callback(bestTxt);
                if(count && 0 == --count){
                    closeWindow();
                    return;
                }
            }
    
            barcodeReader.deleteInstance();
            setTimeout(loopReadVideo, 100);
        }).catch(ex=>{
            barcodeReader.deleteInstance();
            if(self.kConsoleLog)self.kConsoleLog(ex);
            setTimeout(loopReadVideo, 100);
            throw ex;
        });
    };

    cameraSel.addEventListener('change', function(){
        playvideo(cameraSel.value).then(function(){
            if(windowHasClosed){
                stopVideo();
            }
        }).catch(function(ex){
            alert('Play video failed: ' + (ex.message || ex));
        });
    });

    resolutionSel.addEventListener('change', function(){
        playvideo().then(function(){
            if(windowHasClosed){
                stopVideo();
            }
        }).catch(function(ex){
            alert('Play video failed: ' + (ex.message || ex));
        });
    });

    var windowHasClosed = false;
    var closeWindow = function(){
        stopVideo();
        windowHasClosed = true;
        var parent = toolDom.parentNode;
        if(parent){
            parent.removeChild(toolDom);
        }
    };
    btnClose.addEventListener('click', closeWindow);

    document.body.appendChild(toolDom);

    dynamsoft.BarcodeReader.loadWasm().then(function(){
        return playvideo();
    },function(ex){
        alert('Load dbr wasm failed: ' + (ex.message || ex));
    }).then(function(){
        if(windowHasClosed){
            stopVideo();
            return Promise.resolve();
        }
        loopReadVideo();
        return updateDevice();
    }, function(ex){
        alert('Play video failed: ' + (ex.message || ex));
    }).catch(function(ex){
        alert('Update device failed: ' + (ex.message || ex));
    });

    return toolDom;
};
