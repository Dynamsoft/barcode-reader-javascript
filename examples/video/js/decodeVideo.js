var $selectVideo = $('#selectVideo');
var selectVideo = $selectVideo[0];
var updateDevice = function(){
    navigator.mediaDevices.enumerateDevices().then(deviceInfos=>{
        var oldVal = selectVideo.value;
        selectVideo.innerHTML = "";
        var defaultVideoDeviceId = undefined;
        for(var i = 0; i < deviceInfos.length; ++i){
            var info = deviceInfos[i];
            if(info.kind != 'videoinput'){
                continue;
            }
            if(!defaultVideoDeviceId){defaultVideoDeviceId = info.deviceId;}
            var option = document.createElement('option');
            option.value = info.deviceId;
            option.text = info.label || 'camera '+ (selectVideo.length + 1);
            $selectVideo.append(option);
        }
        selectVideo.value = oldVal || defaultVideoDeviceId;
    });
};

var playvideo = ()=>{
    var video = $('#theVideo')[0];

    if (video.srcObject) {
        kConsoleLog('======stop video========');
        video.srcObject.getTracks().forEach(function(track) {
          track.stop();
        });
    }

    kConsoleLog('======before video========');
    var constraints = { 
        video: { 
            width: { ideal: 1280 }, 
            height: { ideal: 720 }, 
            facingMode: { ideal: 'environment' }
        } 
    };
    if(selectVideo.value){
        constraints.video.facingMode = undefined;
        constraints.video.deviceId = {exact: selectVideo.value};

        // if width & height doesn't exist, safair would not play the selected video, so we remove width & height in desktop safari
        var isDeskTopSafari = /Safari/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent) && !((/iPhone/i.test(navigator.platform) || /iPod/i.test(navigator.platform) || /iPad/i.test(navigator.userAgent)) && !!navigator.appVersion.match(/(?:Version\/)([\w\._]+)/));
        if(isDeskTopSafari){
            constraints.video.width = undefined;
            constraints.video.height = undefined;
        }
    }
    
    navigator.mediaDevices.getUserMedia(constraints).then((stream)=>{
        kConsoleLog('======get video========');
        video.srcObject = stream;
        video.onloadedmetadata = ()=>{
            kConsoleLog('======play video========');
            video.play();
            kConsoleLog('======played video========');

            $('#btn-startReadVideo').removeAttr('disabled');

            updateDevice();
        };
    }).catch((ex)=>{
        kConsoleLog(ex);
    });
};
$selectVideo.change(playvideo);

$('#btn-startReadVideo').click(()=>{
    $('#divReading').show();
    $('#btn-startReadVideo').hide();
    $('#btn-stopReadVideo').show();
    isLooping = true;
    $('#kConsoleShowHideBtn').click();
    loopReadVideo();
});
$('#btn-stopReadVideo').click(()=>{
    $('#btn-stopReadVideo').hide();
    $('#btn-startReadVideo').show();
    isLooping = false;
    $('#divReading').hide();
});
var isLooping = false;
var loopReadVideo = function(){
    if(!isLooping){
        return;
    }
    kConsoleLog('======= once read =======')
    var timestart = (new Date()).getTime();
    var video = $('#theVideo')[0];
    barcodeReader.decodeVideo(video).then((results)=>{
        kConsoleLog('time cost: ' + ((new Date()).getTime() - timestart) + 'ms');
        for(var i=0;i<results.length;++i){
            var result = results[i];
            kConsoleLog(result.BarcodeText);
        }
        // video in safair would stuck, so leave 2s for adjusting video 
        setTimeout(loopReadVideo, 2000);
    }).catch(ex=>{
        kConsoleLog(ex);
        setTimeout(loopReadVideo, 2000);
        throw ex;
    });
};