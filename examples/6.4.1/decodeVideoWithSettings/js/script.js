/* global dynamsoft, $, Foundation*/

var bPC = !navigator.userAgent.match(/(iPad)|(iPhone)|(iPod)|(android)|(webOS)/i);
var bMobileSafari = /Safari/.test(navigator.userAgent) && /iPhone/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent);

// By default, js will load `dbr-<version>.min.js` & `dbr-<version>.wasm` in the same folder as the context.
// `dbr-<version>.min.js` & `dbr-<version>.wasm` should always put in same folder.
// Modify this setting when you put `dbr-<version>.min.js` & `dbr-<version>.wasm` somewhere else.
dynamsoft.dbrEnv.resourcesPath = 'https://demo.dynamsoft.com/dbr_wasm/js';

// https://www.dynamsoft.com/CustomerPortal/Portal/TrialLicense.aspx
dynamsoft.dbrEnv.licenseKey = "t0094YAAAAClAOfsspQ/jzvFSyc9rYW/d9tgwz1k/az7mLLeSmbdfNbEasRFPCnLK0EOYtJvNBUloXy88QHYHJYRPRvIBmSNuI6MWutBNyfpeU7lrbrLUMhAh2sAPe84ZqQ==";

dynamsoft.dbrEnv.bUseWorker = true; //uncomment it to use worker

var bDbrWasmLoadSuccess = false;
dynamsoft.dbrEnv.onAutoLoadWasmSuccess = function(){
    bDbrWasmLoadSuccess = true;
    if(preSelBarcodeFormat){
        initTestRuntimeSettings().then(()=>{
            self.isLooping = true;
            playvideo().then(loopReadVideo, ex=>{
                alert("Please make sure the camera is connected and the site is deployed in https: "+(ex.message || ex));
            });
        });
    }
    $('#div-highLightResult span').text('reading...');
    $('#frame-loadingAnimation').hide();
    $('.disableOnWasmLoading').removeClass('disableOnWasmLoading');
};
dynamsoft.dbrEnv.onAutoLoadWasmError = function(ex){
    alert("load wasm failed: "+(ex.message||ex));
};

$('#frame-supportAndSetting input').change(function(){
    /*Start: walkaround for mobile safari ui delay bug*/
    if(this.checked){
        $(this).closest('.div-format-switch').css('background','#2ba6cb');
    }else{
        $(this).closest('.div-format-switch').css('background','');
    }
    /*End: walkaround for mobile safari ui delay bug*/
    if($('#frame-supportAndSetting input:checked').length){
        $('#btn-processSupportAndSettings').removeAttr('disabled');
    }else{
        $('#btn-processSupportAndSettings').attr('disabled', 'disabled');
    }
});

var preSelBarcodeFormat = 0;
$('#btn-processSupportAndSettings').click(function(){
    $('#frame-supportAndSetting').fadeOut();
    var checkedIpts = $('#frame-supportAndSetting input:checked');
    checkedIpts.each(function(){
        preSelBarcodeFormat = preSelBarcodeFormat | this.value;
    });
    if(bDbrWasmLoadSuccess){
        initTestRuntimeSettings().then(()=>{
            self.isLooping = true;
            playvideo().then(loopReadVideo, ex=>{
                alert("Please make sure the camera is connected and the site is deployed in https: "+(ex.message || ex));
            });
        });
    }
});

var $ulVideoList = $('#ul-videoList');
var ulVideoList = $ulVideoList[0];
var updateDevice = function(){
    return new Promise(resolve=>{
        navigator.mediaDevices.enumerateDevices().then(deviceInfos=>{
            var $oldSelLi = $ulVideoList.children('.selectedLi');
            var oldVal = $oldSelLi.length ? $oldSelLi[0].dataVal : undefined ;
            ulVideoList.innerHTML = "";
            var selLi = undefined;
            for(var i = 0; i < deviceInfos.length; ++i){
                var info = deviceInfos[i];
                if(info.kind != 'videoinput'){
                    continue;
                }
                var li = document.createElement('li');
                $(li).addClass('li-videoSource');
                var a = document.createElement('a');
                li.dataVal = info.deviceId;
                a.innerText = info.label || 'camera '+ i;
                $(li).append(a);
                $ulVideoList.append(li);
                if(oldVal == info.deviceId){
                    selLi = li;
                }
            }
            if(deviceInfos.length < 8){
                // no real use but walk around for foundation bug
                for(var j = 8 - deviceInfos.length; j > 0; --j){
                    $ulVideoList.append($('<li><a>&nbsp;</a></li>'));
                }
            }
            var liArr = $ulVideoList.children();
            if(!selLi && liArr.length){
                try{
                    $('#video-back')[0].srcObject.getTracks().forEach((track)=>{
                        if('video' == track.kind){
                            liArr.each(function(){
                                if(track.label == this.innerText){
                                    selLi = this;
                                    throw 'found the using source';
                                }
                            });
                        }
                    });
                }catch(ex){
                    if(self.kConsoleLog){self.kConsoleLog(ex);}
                }
            }
            if(selLi){
                $(selLi).addClass('selectedLi');
            }
            resolve();
        });
    });
};

$ulVideoList.on('click','.li-videoSource', function(){
    $ulVideoList.children('.selectedLi').removeClass('selectedLi');
    $(this).addClass('selectedLi');
    playvideo(this.dataVal).catch(ex=>{
        alert(ex.message || ex);
    });
});
$('#ul-resolutionList').on('click','.li-resolution', function(){
    $('#ul-resolutionList .selectedLi').removeClass('selectedLi');
    $(this).addClass('selectedLi');
    playvideo().catch(ex=>{
        alert(ex.message || ex);
    });
});

var bReadFullRegion = false;
$('#cb-readFullRegion').change(function(){
    if($(this).prop('checked')){
        bReadFullRegion = true;
        $('#frame-main').removeClass('useRegion');
        $('#btn-readFullRegion').hide();
        $('#btn-readInRegion').show();
    }else{
        bReadFullRegion = false;
        $('#frame-main').addClass('useRegion');
        $('#btn-readInRegion').hide();
        $('#btn-readFullRegion').show();
    }
});
$('#btn-readFullRegion').click(function(){$('#lb-readFullRegion').click();});
$('#btn-readInRegion').click(function(){$('#lb-readFullRegion').click();});
if(bPC){ // use upper resolution & read full region on PC
    $('#ul-resolutionList .selectedLi').removeClass('selectedLi');
    $('#ul-resolutionList .li-resolution[data-width="1920"][data-height="1080"]').addClass('selectedLi');
    $('#lb-readFullRegion').click();
}

var readInterval = 10;
$('#ul-interval').on('click','.li-interval', function(){
    $('#ul-interval .selectedLi').removeClass('selectedLi');
    $(this).addClass('selectedLi');
    readInterval = $(this).attr('data-val');
});

var testRuntimeSettingsReader = null;
var initTestRuntimeSettings = function(){
    testRuntimeSettingsReader = new dynamsoft.BarcodeReader();
    var settings = testRuntimeSettingsReader.getRuntimeSettings();
    settings.mBarcodeFormatIds = preSelBarcodeFormat;
    settings.mAntiDamageLevel = 3;
    settings.mDeblurLevel = 0;
    return testRuntimeSettingsReader.updateRuntimeSettings(settings);
};
$('#a-barcodeFormat').click(function(){
    var settings = testRuntimeSettingsReader.getRuntimeSettings();
    $('#ul-barcodeFormatId>.li-barcodeFormatId').each(function(){
        var value = $(this).attr('data-val');
        if((settings.mBarcodeFormatIds & value) == value){
            $(this).addClass('selectedLi');
        }else{
            $(this).removeClass('selectedLi');
        }
    });
});
$('#a-advance').click(function(){
    var settings = testRuntimeSettingsReader.getRuntimeSettings();

    $('#ul-advance>li>a>label').each(function(){
        $(this).children('input').val(settings['m'+$(this).text()]);
    });
});
$('#ul-barcodeFormatId>.li-barcodeFormatId').click(function(){
    var li = this;
    var settings = testRuntimeSettingsReader.getRuntimeSettings();
    if($(li).hasClass('selectedLi')){
        if(1 != $('#ul-barcodeFormatId>.selectedLi').length){
            $(li).removeClass('selectedLi');
            settings.mBarcodeFormatIds = settings.mBarcodeFormatIds & (~$(li).attr('data-val'));
        }else{
            alert('Please select at least one barcode format!');
        }
    }else{
        $(li).addClass('selectedLi');
        settings.mBarcodeFormatIds = settings.mBarcodeFormatIds | $(li).attr('data-val');
    }
    testRuntimeSettingsReader.updateRuntimeSettings(settings);
});
$('#ul-advance input').change(function(){
    var ipt = this;
    var settings = testRuntimeSettingsReader.getRuntimeSettings();
    var field = 'm'+$(ipt).closest('li').text();
    var oldVal = settings[field];
    if(typeof oldVal == 'number'){
        settings[field] = parseInt(ipt.value);
    }else{
        settings[field] = ipt.value;
    }
    testRuntimeSettingsReader.updateRuntimeSettings(settings).catch(ex=>{
        ipt.value = oldVal;
        alert(ex.message || ex);
    });
});
$('#a-clearCache').click(function(){
    var oldText = this.innerText;
    this.innerText = 'clearing...';
    $(this).addClass('disableOnWasmLoading');
    try{
        var request = window.indexedDB.deleteDatabase('dynamsoft');
        request.onsuccess = request.onerror = ()=>{
            if(request.error){
                alert('Clear failed: '+(request.error.message || request.error));
            }else{
                alert('Clear success!');
            }
            this.innerText = oldText;
            $(this).removeClass('disableOnWasmLoading');
        };
    }catch(ex){
        alert(ex.message || ex);
        this.innerText = oldText;
        $(this).removeClass('disableOnWasmLoading');
    }
});

var needFixEdge = false;
(function(){
    var indexEdge = navigator.userAgent.toLowerCase().indexOf('edge/');
    if(-1 != indexEdge){
        var indexDot = navigator.userAgent.indexOf('.', indexEdge);
        var edgeVersion = navigator.userAgent.substring(indexEdge+5, indexDot);
        if(edgeVersion < 30){
            needFixEdge = true;
            // I supposed Edge fix object-fit bug on video after version 30 (>_<)
            var video = $('#video-back')[0];

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
var playvideo = (deviceId)=>{
    return new Promise((resolve,reject)=>{
        var video = $('#video-back')[0];

        if (video.srcObject) {
            if(self.kConsoleLog)self.kConsoleLog('======stop video========');
            video.srcObject.getTracks().forEach(function(track) {
                track.stop();
            });
        }

        if(self.kConsoleLog)self.kConsoleLog('======before video========');
        var selW = $('#ul-resolutionList .selectedLi').attr('data-width');
        var selH = $('#ul-resolutionList .selectedLi').attr('data-height');
        $('#li-gotRsl').attr('data-width', selW);
        $('#li-gotRsl').attr('data-height', selH);
        var constraints = { 
            video: { 
                facingMode: { ideal: 'environment' }
            } 
        };
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
            var $selectedLi = $ulVideoList.children('.selectedLi');
            if($selectedLi.length){
                deviceId = $selectedLi[0].dataVal;
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
                            $('#ul-resolutionList .selectedLi').removeClass('selectedLi');
                            var gotRslStr = 'got '+video.videoWidth+'x'+video.videoHeight;
                            $('#li-gotRsl a').text(gotRslStr);
                            $('#li-gotRsl').addClass('selectedLi');
                            if(self.kConsoleLog)self.kConsoleLog(gotRslStr);
                            if(needFixEdge){
                                var dw = $(document).width(), dh = $(document).height();
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

var isLooping = false;
var loopReadVideo = function(){
    if(!isLooping){
        return;
    }
    var video = $('#video-back')[0];
    if(video.paused){
        if(self.kConsoleLog)self.kConsoleLog('Video is paused. Ask in 1s.');
        return setTimeout(loopReadVideo, 1000);
    }

    if(self.kConsoleLog)self.kConsoleLog('======= once read =======');
    var videoRealW = video.videoWidth;
    var videoRealH = video.videoHeight;
    var sx, sy, sWidth, sHeight, dWidth, dHeight;
    if(bReadFullRegion){
        sx = sy = 0;
        sWidth = dWidth = videoRealW;
        sHeight = dHeight = videoRealH;
    }else{
        var vw = $(document).width();
        var vh = $(document).height();
        var videoInDocRealW, videoInDocRealH;
        if(vw / vh < videoRealW / videoRealH){
            videoInDocRealW = vw / vh * videoRealH;
            videoInDocRealH = videoRealH;
        }else{
            videoInDocRealW = videoRealW;
            videoInDocRealH = vh / vw * videoRealW;
        }
        var regionRealWH = Math.round(/*0.6 * */Math.min(videoInDocRealW, videoInDocRealH));//looks like 0.6, real is 1
        sx = Math.round((videoRealW - regionRealWH)/2);
        sy = Math.round((videoRealH - regionRealWH)/2);
        sWidth = sHeight = dWidth = dHeight = regionRealWH;
    }

    var timestart = null;
    var barcodeReader = new dynamsoft.BarcodeReader();
    barcodeReader.updateRuntimeSettings(testRuntimeSettingsReader.getRuntimeSettings()).then(()=>{
        timestart = (new Date()).getTime();
        return barcodeReader.decodeVideo(video,sx,sy,sWidth,sHeight,dWidth,dHeight);
    }).then((results)=>{
        if(self.kConsoleLog)self.kConsoleLog('time cost: ' + ((new Date()).getTime() - timestart) + 'ms');
        var bestConfidence = 0, bestTxt = undefined, txtArr = [];
        for(let i=0;i<results.length;++i){
            var result = results[i];
            if(self.kConsoleLog)self.kConsoleLog(result.BarcodeText);
            var confidence = result.LocalizationResult.ExtendedResultArray[0].Confidence;
            if(confidence > 30){
                txtArr.push(result.BarcodeText);
                if(confidence > bestConfidence){
                    bestConfidence = confidence;
                    bestTxt = result.BarcodeText;
                }
            }
        }

        //add to top log
        var $divTopLog = $('#div-topLog');
        for(let i = 0; i < txtArr.length; ++i){
            var pTopLog = document.createElement("p");
            pTopLog.style.display = 'none';
            pTopLog.innerText = txtArr[i];
            $divTopLog.append(pTopLog);
            $(pTopLog).slideDown();
            var pTopLogs = $divTopLog.children();
            if(pTopLogs.length > $divTopLog.height() / $(pTopLogs[0]).outerHeight(true)){
                $(pTopLogs[0]).remove();
            }
        }
        if(bestTxt){
            if(!bestTxt.startsWith('http') && (
                bestTxt.startsWith('www') ||
                -1 != bestTxt.indexOf('.com') ||
                -1 != bestTxt.indexOf('.net') ||
                -1 != bestTxt.indexOf('.org') ||
                -1 != bestTxt.indexOf('.edu')
            )){
                bestTxt = 'http://' + bestTxt;
            }
            if($('#div-highLightResult').children('a,span')[0].innerText != bestTxt){
                var a;
                if(bestTxt.startsWith('http')){
                    a = document.createElement('a');
                    a.href = bestTxt;
                }else{
                    a = document.createElement('span');
                }
                a.innerText = bestTxt;
                $('#div-highLightResult')[0].innerHTML = "";
                $('#div-highLightResult').append(a);
            }
        }
        
        barcodeReader.deleteInstance();
        setTimeout(loopReadVideo, readInterval);
    }).catch(ex=>{
        barcodeReader.deleteInstance();
        if(self.kConsoleLog)self.kConsoleLog(ex);
        setTimeout(loopReadVideo, readInterval);
        throw ex;
    });
};

$('#btn-settings').click(function(){
    isLooping = false;
    updateDevice().then(()=>{
        $('#frame-menu').animate(
            {width:"show",paddingLeft:"show",paddingRight:"show",marginLeft:"show",marginRight:"show"},
            {complete:()=>{Foundation.reInit($('#ul-menu'));}}
        );
    });
});
$('#div-menuRightMargin').click(function(){
    isLooping = true;
    $('#frame-menu').animate(
        {width:"hide",paddingLeft:"hide",paddingRight:"hide",marginLeft:"hide",marginRight:"hide"},
        {complete:()=>{loopReadVideo();}}
    );
});
$('#ipt-file').change(function(){
    if(self.kConsoleLog)self.kConsoleLog('Static image detected, pause loopReadVideo.');
    var video = $('#video-back')[0];
    video.pause();
    isLooping = false;
    var barcodeReader = new dynamsoft.BarcodeReader();
    barcodeReader.updateRuntimeSettings(testRuntimeSettingsReader.getRuntimeSettings()).then(()=>{
        var i = -1;
        var files = this.files;
        var message = [];
        var readOne = ()=>{
            if(++i == files.length){
                barcodeReader.deleteInstance();
                alert(message.join('\n'));
                if(self.kConsoleLog)self.kConsoleLog('Finish, continue loopReadVideo.');
                video.play();
                isLooping = true;
                loopReadVideo();
                this.value = '';
                return;
            }

            var file = files[i];
            if(message.length){message.push('\n');}
            message.push(file.name+':');
            barcodeReader.decodeFileInMemory(file).then(results=>{
                for(let j=0;j<results.length;++j){
                    message.push(results[j].BarcodeText);
                }
                readOne();
            }).catch(ex=>{
                message.push("Error: "+(ex.message || ex));
                readOne();
            });
        };
        readOne();
    });
});

$('#ul-supportBrowser').foundation();
$('#ul-menu').foundation();
$('#frame-white').hide();
