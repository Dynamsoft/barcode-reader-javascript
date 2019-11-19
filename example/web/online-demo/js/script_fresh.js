/* global  $, Dynamsoft, ringBell*/

var $video = document.getElementById('PVideo');
var $cvsContainer = document.getElementById('canvasContainer');
var $resultContainer = document.getElementById('resultContainer');
Dynamsoft.EnumBarcodeFormat.TwoD = Dynamsoft.EnumBarcodeFormat.PDF417 | Dynamsoft.EnumBarcodeFormat.QR_CODE | 
            Dynamsoft.EnumBarcodeFormat.DATAMATRIX | Dynamsoft.EnumBarcodeFormat.AZTEC;
var scanner = null;
Dynamsoft.BarcodeScanner.createInstance({
    htmlElement: document.body,
    videoSettings: { video: { width: { ideal: 1280 }, height: {ideal: 720 }, facingMode: { ideal: 'environment' } } },
    runtimeSettings: {
        barcodeFormatIds: Dynamsoft.EnumBarcodeFormat.All,
        localizationModes: [16,0,0,0,0,0,0,0],
        deblurLevel: 0
    },
    onFrameRead: function (results) {
        updateFrame();

        for (let i = 0; i < results.length; i++) {
            // console.log(result.BarcodeFormatString + '\t' + result.BarcodeText);
            let result = results[i];
            let cvs = document.createElement('canvas');
            cvs.style.position = 'absolute';
            let x1 = result.LocalizationResult.ResultPoints[0].split(',')[0];
            let y1 = result.LocalizationResult.ResultPoints[0].split(',')[1];
            let x2 = result.LocalizationResult.ResultPoints[1].split(',')[0];
            let y2 = result.LocalizationResult.ResultPoints[1].split(',')[1];
            let x3 = result.LocalizationResult.ResultPoints[2].split(',')[0];
            let y3 = result.LocalizationResult.ResultPoints[2].split(',')[1];
            let x4 = result.LocalizationResult.ResultPoints[3].split(',')[0];
            let y4 = result.LocalizationResult.ResultPoints[3].split(',')[1];

            let leftMin = Math.min(x1, x2, x3, x4);
            let rightMax = Math.max(x1, x2, x3, x4);
            let topMin = Math.min(y1, y2, y3, y4);
            let bottomMax = Math.max(y1, y2, y3, y4);
            cvs.style.left = leftMin + 'px';
            cvs.style.top = topMin + 'px';
            cvs.width = rightMax - leftMin;
            cvs.height = bottomMax - topMin;

            let _x1 = x1 - leftMin;
            let _x2 = x2 - leftMin;
            let _x3 = x3 - leftMin;
            let _x4 = x4 - leftMin;
            let _y1 = y1 - topMin;
            let _y2 = y2 - topMin;
            let _y3 = y3 - topMin;
            let _y4 = y4 - topMin;
            let ctx = cvs.getContext('2d');
            ctx.fillStyle = 'rgba(254,180,32,0.3)';
            ctx.beginPath();
            ctx.moveTo(_x1, _y1);
            ctx.lineTo(_x2, _y2);
            ctx.lineTo(_x3, _y3);
            ctx.lineTo(_x4, _y4);
            ctx.fill();
            $cvsContainer.append(cvs);

            setTimeout(function () {
                $(cvs).remove();
            }, 300);
        }
        if (results.length) {
            ringBell();
        }
        $('.rc-text').each(function () {
            let txt = this.dbrResultBoxTxt;
            let format = this.dbrResultBoxFormat;
            let bExist = false;
            for (let i = 0; i < scanner.arrDiffCodeInfo.length; ++i) {
                var info = scanner.arrDiffCodeInfo[i];
                if (info.result.BarcodeText === txt && info.result.BarcodeFormat === format) {
                    if (info.count > 1) {
                        let spCount;
                        let lastEl = this.children[this.children.length - 1];
                        if (lastEl.dbrComeUpCount) {
                            spCount = lastEl;
                        } else {
                            spCount = document.createElement('span');
                            this.appendChild(spCount);
                        }
                        spCount.className = 'rc-count';
                        spCount.dbrComeUpCount = info.count;
                        spCount.innerText = ' x' + info.count;
                    }
                    bExist = true;
                    break;
                }
            }
            if (!bExist) {
                $(this).remove();
            }
        });
    },
    onUnduplicatedRead: function (txt, result) {
        let _div = document.createElement('div');
        _div.className = 'rc-text';

        let possibleLink = txt;
        if (!txt.startsWith('http') && (txt.startsWith('www') || -1 !== txt.indexOf('.com') ||
            -1 !== txt.indexOf('.net') || -1 !== txt.indexOf('.org') || -1 !== txt.indexOf('.edu'))) {
            possibleLink = 'http://' + txt;
        }

        let a;
        if (possibleLink.startsWith('http')) {
            a = document.createElement('a');
            a.href = possibleLink;
            a.target = '_blank';
            a.style.color = '#45cbef';
            a.style.textDecoration = 'underline';
        } else {
            a = document.createElement('div');
            a.style.color = '#ffffff';
        }
        a.className = 'inRCTxt';
        a.innerText = txt;

        _div.innerText = result.BarcodeFormatString + ': ';
        _div.innerHTML += a.outerHTML;
        _div.dbrResultBoxTxt = txt;
        _div.dbrResultBoxFormat = result.BarcodeFormat;
        $resultContainer.appendChild(_div);
        // console.log("=============new===========")
        // console.log(result.BarcodeFormatString + ":" + txt); //eslint-disable-line
        // console.log("===list===");
        // for(let info of scanner.arrDiffCodeInfo){
        //     console.log(info.result.BarcodeFormatString + ":" + info.result.BarcodeText);
        // }
        //console.log(JSON.stringify(scanner.arrDiffCodeInfo));
    }
}).then((instance)=>{
    scanner = instance;
    return scanner.show();
}).then(function (_videoDeviceInfo) {
    // console.log(_videoDeviceInfo);
    // camera exist
    $('.picker').fadeIn(300);
    // ui update frame scanning
    $('.scanning-container').css({
        'width': $('#PVideo').css('width'),
        'height': $('#PVideo').css('height')
    });
    // ui update video source 
    for (var i = 0; i < _videoDeviceInfo.all.length; i++) {
        $('#SSource .ls-body').append('<div class="ls-option"><input type="radio" name="source" id="sou' +
            i + '" value="' + _videoDeviceInfo.all[i].deviceId + '"><label for="sou' + i + '" class="radio-btn"></label><label for="sou' + i + '">' + _videoDeviceInfo.all[i].label + '</label></div>');
        if (_videoDeviceInfo.current && _videoDeviceInfo.all[i].deviceId === _videoDeviceInfo.current.deviceId) {
            $('#sou' + i).prop('checked', true);
        }
    }
    // video source changed
    $('.ls-option input[name="source"]').change(function () {
        scanner.play(this.value).then(function (resolution) {
            $('.scanning-container').css({
                'width': resolution.width,
                'height': resolution.height
            });
            $('#cResolution').text(resolution.width + ' × ' + resolution.height);
            if (!$('#LRegion').prop('checked')) {
                setRegion();
            }
        });
    });
    // ui update video resolution
    $('input[name="resolution"]').each(function () {
        if (($(this).attr('data-width') == _videoDeviceInfo.width && $(this).attr('data-height') == _videoDeviceInfo.height) ||
            (($(this).attr('data-width') == _videoDeviceInfo.height && $(this).attr('data-height') == _videoDeviceInfo.width))) {
            $(this).prop('checked', true);
        }
    });
    $('#cResolution').text(_videoDeviceInfo.width + ' × ' + _videoDeviceInfo.height);
    if (scanner.getRuntimeSettings().barcodeFormatIds == Dynamsoft.EnumBarcodeFormat.All) {
        $('input[name="format"]').each(function () {
            $(this).prop('checked', true);
        });
    }
    // ui update default intervalTime 100
    $('#sI3').prop('checked', true);
    // ui update defalut mode most accurate 
    // mDeblurLevel: 0
    $('#sM0').prop('checked', true);
    // ready?
    setTimeout(function () {
        $('.waiting').fadeOut(300);
    }, 100);
}, function (ex) {
    console.error(ex); //eslint-disable-line
    // alert(ex);
    let errorTxt = ex.message || ex;
    if (/t support Webassembly/.test(errorTxt) || /not an object/.test(errorTxt)) {
        $('#notSupport').fadeIn(300);
    } else if (/Permission/.test(errorTxt) || /video/.test(errorTxt) || /device/.test(errorTxt) || /Media/.test(errorTxt) || /agent/.test(errorTxt) || /found/.test(errorTxt))
        $('#noCam').fadeIn(300);
    else {
        alert(errorTxt);
    }
    //scanner.close();
});

// which leftbar item selected
var _itemSelect = 0;

$('.leftbar input[name="lItem"]').click(function () {
    if (_itemSelect === this.value) {
        _itemSelect = 0;
        $('.l-secondary').css('display', 'none');
        this.checked = false;
    } else if (_itemSelect !== this.value) {
        $(".l-secondary").css('display', 'none');
        _itemSelect = this.value;
        switch (this.value) {
        case 'itemSource':
            $('#SSource').css('display', 'block');
            break;
        case 'itemResolution':
            $('#SResolution').css('display', 'block');
            break;
        case 'itemFormats':
            $('#SFormats').css('display', 'block');
            break;
        case 'itemSettings':
            $('#SSettings').css('display', 'block');
            break;
        case 'itemAbout':
            $('#SAbout').css('display', 'block');
            break;
        default:
            break;
        }
    }
});

// click other region to hide left bar
$('.l-item').click(function (ev) {
    ev.stopPropagation();
    $(".l-secondary").css('display', 'none');
});
$(document).click(function (ev) {
    if (!$('.leftbar').is(ev.target) && $('.leftbar').has(ev.target).length === 0 && !$('#MMenu').is(ev.target) && !$('.m-region').is(ev.target)) {
        _itemSelect = 0;
        $('.leftbar input[name="lItem"]').each(function () {
            this.checked = false;
        });
        $('.l-secondary').hide();
        if ($('.h-sign-in-mobile').css('display') === 'block') {
            document.querySelector('#leftbar').className = 'leftbar hidden';
            $('#MMenu').prop('checked', false);
        }
    }
});

// video resolution changed
$('input[name="resolution"]').change(function () {
    var _curDevice = 0,
        _curWidth = $(this).attr('data-width'),
        _curHeight = $(this).attr('data-height');
    $('input[name="source"]').each(function () {
        if (this.checked) _curDevice = this.value;
    });
    scanner.play(_curDevice, _curWidth, _curHeight).then(function (resolution) {
        $('#cResolution').text(resolution.width + ' × ' + resolution.height);
        if (!$('#LRegion').prop('checked')) {
            setRegion();
        }
    });
});

// video format changed
$('#s1D11').change(function () {
    let _flag = 0;
    $('.ls-option-2d input[name="format"]').each(function () {
        if (this.checked) _flag += parseInt(this.value);
    });
    if (this.checked) {
        var settings = scanner.getRuntimeSettings();
        settings.barcodeFormatIds = _flag + Dynamsoft.EnumBarcodeFormat.OneD;
        scanner.updateRuntimeSettings(settings);
        $('.ls-option-1d input').prop('checked', true);
    } else if (!this.checked) {
        if (_flag === 0) {
            $(this).prop('checked', true);
            alert('Please select at lease one barcode format');
        } else {
            var settings = scanner.getRuntimeSettings();//eslint-disable-line
            settings.barcodeFormatIds = _flag;
            scanner.updateRuntimeSettings(settings);
            $('.ls-option-1d input').prop('checked', false);
        }
    }
});
$('#s2D4').change(function () {
    let _flag = 0;
    $('.ls-option-1d input[name="format"]').each(function () {
        if (this.checked) _flag += parseInt(this.value);
    });
    if (this.checked) {
        var settings = scanner.getRuntimeSettings();
        settings.barcodeFormatIds = _flag + Dynamsoft.EnumBarcodeFormat.TwoD;
        scanner.updateRuntimeSettings(settings);
        $('.ls-option-2d input').prop('checked', true);
    } else if (!this.checked) {
        if (_flag === 0) {
            $(this).prop('checked', true);
            alert('Please select at lease one barcode format');
        } else {
            var settings = scanner.getRuntimeSettings(); // eslint-disable-line
            settings.barcodeFormatIds = _flag;
            scanner.updateRuntimeSettings(settings);
            $('.ls-option-2d input').prop('checked', false);
        }
    }
});
$('.ls-body input[name="format"]').change(function () {
    let _flag1 = 0,
        _flag2 = 0;
    $('.ls-option-1d input[name="format"]').each(function () {
        if (this.checked) _flag1 += parseInt(this.value);
    });
    $('.ls-option-2d input[name="format"]').each(function () {
        if (this.checked) _flag2 += parseInt(this.value);
    });
    if (_flag1 < Dynamsoft.EnumBarcodeFormat.OneD) $('#s1D11').prop('checked', false);
    if (_flag1 === Dynamsoft.EnumBarcodeFormat.OneD) $('#s1D11').prop('checked', true);
    if (_flag2 < Dynamsoft.EnumBarcodeFormat.TwoD) $('#s2D4').prop('checked', false);
    if (_flag2 === Dynamsoft.EnumBarcodeFormat.TwoD) $('#s2D4').prop('checked', true);

    if (_flag1 + _flag2 === 0) {
        $(this).prop('checked', true);
        alert('Please select at lease one barcode format');
    } else {
        var settings = scanner.getRuntimeSettings();
        settings.barcodeFormatIds += parseInt(this.checked ? this.value : -this.value);
        scanner.updateRuntimeSettings(settings);
    }
});

// video reading interval chaneged
$('.ls-option input[name="settingInterval"]').change(function () {
    scanner.intervalTime = parseInt(this.value);
});

// video reading mode changed
$('.ls-option input[name="settingMode"]').change(function () {
    var settings = scanner.getRuntimeSettings();
    if('fast' == this.value){
        settings.localizationModes = [2,0,0,0,0,0,0,0];
        settings.deblurLevel = 0;
    }else if('accurate' == this.value){
        settings.localizationModes = [2,16,4,8,0,0,0,0];
        settings.deblurLevel = 0;
    }
    scanner.updateRuntimeSettings(settings);
});

var updateFrame = () => {
    // todo, resize when video too big
    let videoComputedStyle = window.getComputedStyle($video);
    let videoComputedWidth = Math.round(parseFloat(videoComputedStyle.getPropertyValue('width')));
    let videoComputedHeight = Math.round(parseFloat(videoComputedStyle.getPropertyValue('height')));
    let resizeRate = 1;
    if (videoComputedWidth < $video.videoWidth) {
        resizeRate = videoComputedWidth / $video.videoWidth;
    }
    $cvsContainer.style.transform = 'matrix(' + [resizeRate, 0, 0, resizeRate, 0, 0].join(',') + ')';
    $('.scanning-container').css({
        'width': videoComputedWidth + 'px',
        'height': videoComputedHeight + 'px'
    });
    $cvsContainer.style.width = $video.videoWidth + 'px';
    $cvsContainer.style.height = $video.videoHeight + 'px';

    // region
    if (!$('#LRegion').prop('checked')) {
        setRegion();
    }
};

let resetRegion = () => {
    let runtimeSettings = scanner.getRuntimeSettings();
    runtimeSettings.region.left = runtimeSettings.region.top = 0;
    runtimeSettings.region.right = runtimeSettings.region.bottom = 100;
    runtimeSettings.region.measuredByPercentage = 1;
    scanner.updateRuntimeSettings(runtimeSettings);
};
var setRegion = () => {
    // take a center part of the video and resize the part before decode
    // also see: [drawImage](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/drawImage)
    let cw = $('.sc-frame1').width(),
        ch = $('.sc-frame1').height(),
        vw = $('.scanning-container').width(),
        vh = $('.scanning-container').height();
    // sometimes vw, vh got negative number, walk around it.
    if (vw <= 0) { vw = 2; }
    if (vh <= 0) { vw = 2; }

    // tudo, resize when video too big
    let videoComputedStyle = window.getComputedStyle($video);
    let videoComputedWidth = Math.round(parseFloat(videoComputedStyle.getPropertyValue('width')));
    let resizeRate = 1;
    if (videoComputedWidth < $video.videoWidth) {
        resizeRate = videoComputedWidth / $video.videoWidth;
    }
    let runtimeSettings = scanner.getRuntimeSettings();
    runtimeSettings.region.left = Math.round((vw - cw) / resizeRate / 2);
    runtimeSettings.region.right = Math.round((vw + cw) / resizeRate / 2);
    runtimeSettings.region.top = Math.round((vh - ch) / resizeRate / 2);
    runtimeSettings.region.bottom = Math.round((vh + ch) / resizeRate / 2);
    runtimeSettings.region.measuredByPercentage = 0;
    scanner.updateRuntimeSettings(runtimeSettings);
};

$('#LRegion').change(function () {
    $('canvas').remove();
    // full
    if (this.checked) {
        $('#MRegion').prop('checked', true);
        $('.scanning-container').fadeOut(300);
        resetRegion();
    } // region 
    else {
        $('#MRegion').prop('checked', false);
        $('.scanning-container').fadeIn(300);
        setRegion();
    }
});

// mobile menu btn
$('#MMenu').change(function () {
    if (this.checked) {
        document.querySelector('#leftbar').className = 'leftbar visible';
    } else {
        document.querySelector('#leftbar').className = 'leftbar hidden';
    }
});

// mobile region btn
$('#MRegion').change(function () {
    $('canvas').remove();
    // full
    if (this.checked) {
        $('#LRegion').prop('checked', true);
        $('.scanning-container').fadeOut(300);
        resetRegion();
    } // region 
    else {
        $('#LRegion').prop('checked', false);
        $('.scanning-container').fadeIn(300);
        setRegion();
    }
});

// clear cache
$('#clearCache').click(function(){
    var oldText = this.innerText;
    this.innerText = 'clearing...';
    $(this).addClass('disable-button');
    try{
        var request = window.indexedDB.deleteDatabase('dynamsoft');
        request.onsuccess = request.onerror = ()=>{
            if(request.error){
                alert('Clear failed: '+(request.error.message || request.error));
            }else{
                alert('Clear success!');
            }
            this.innerText = oldText;
            $(this).removeClass('disable-button');
        };
    }catch(ex){
        alert(ex.message || ex);
        this.innerText = oldText;
        $(this).removeClass('disable-button');
    }
});

$('#LRegion').prop('checked', true);
$('#MRegion').prop('checked', true);

var getVideoFrame = () => {//eslint-disable-line
    if($video.paused){
        let _aImg = document.createElement('a');
        let _canvas = document.createElement("canvas");

        _canvas.width = $video.videoWidth;
        _canvas.height = $video.videoHeight;
        _canvas.getContext('2d').drawImage($video, 0, 0, _canvas.width, _canvas.height);

        _aImg.href = _canvas.toDataURL("image/png");
        _aImg.download = "img.png";
        _aImg.click();

        _canvas.remove();
        _aImg.remove();
    }
};