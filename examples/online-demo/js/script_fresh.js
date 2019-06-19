/* global  $, dbr*/

var $video = document.getElementById('PVideo');
var $cvsContainer = document.getElementById('canvasContainer');
var $resultContainer = document.getElementById('resultContainer');

var videoReader = new dbr.Scanner({
    htmlElement: document.body,
    videoSettings: { video: { width: { ideal: 1280 } } },
    runtimeSettings: {
        mBarcodeFormatIds: 503317503,
        mAntiDamageLevel: 3,
        mDeblurLevel: 0
    },
    searchRegion: {},
    onFrameRead: function (results) {
        updateFrame();

        for (let i = 0; i < results.length; i++) {
            // console.log(result.BarcodeFormatString + '\t' + result.BarcodeText);
            let result = results[i];
            let cvs = document.createElement('canvas');
            cvs.style.position = 'absolute';
            let x1 = result.LocalizationResult.X1;
            let x2 = result.LocalizationResult.X2;
            let x3 = result.LocalizationResult.X3;
            let x4 = result.LocalizationResult.X4;
            let y1 = result.LocalizationResult.Y1;
            let y2 = result.LocalizationResult.Y2;
            let y3 = result.LocalizationResult.Y3;
            let y4 = result.LocalizationResult.Y4;

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
        $('.rc-text').each(function () {
            let txt = this.dbrResultBoxTxt;
            let format = this.dbrResultBoxFormat;
            let bExist = false;
            for (let i = 0; i < videoReader.arrDiffCodeInfo.length; ++i) {
                var info = videoReader.arrDiffCodeInfo[i];
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
    onNewCodeRead: function (txt, result) {
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
        console.log(result.BarcodeFormatString + ":" + txt); //eslint-disable-line
    }
});

videoReader.open().then(function (_videoDeviceInfo) {
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
        if (_videoDeviceInfo.all[i].deviceId === _videoDeviceInfo.current.deviceId) {
            $('#sou' + i).prop('checked', true);
        }
    }
    // video source changed
    $('.ls-option input[name="source"]').change(function () {
        videoReader.play(this.value).then(function (resolution) {
            $('.scanning-container').css({
                'width': resolution.width,
                'height': resolution.height
            });
            $('#cResolution').text(resolution.width + ' × ' + resolution.height);
            if (videoReader.searchRegion.sx) {
                SetSearchRegion();
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
    // ui update default formates all 503317503 
    // 0x1e0003ff
    if (videoReader.runtimeSettings.mBarcodeFormatIds === 503317503) {
        $('input[name="format"]').each(function () {
            $(this).prop('checked', true);
        });
    }
    // ui update defalut intervalTime 100
    $('#sI3').prop('checked', true);
    // ui update defalut mode most accurate 
    // mDeblurLevel: 0
    $('#sM0').prop('checked', true);
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
            /*eslint-disable indent*/
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
            /*eslint-enable indent*/
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
            $('.leftbar').fadeOut(300);
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
    videoReader.play(_curDevice, _curWidth, _curHeight).then(function (resolution) {
        $('#cResolution').text(resolution.width + ' × ' + resolution.height);
        if (videoReader.searchRegion.sx) {
            SetSearchRegion();
        }
    });
});

// video format changed
$('#s1D10').change(function () {
    let _flag = 0;
    $('.ls-option-2d input[name="format"]').each(function () {
        if (this.checked) _flag += parseInt(this.value);
    });
    if (this.checked) {
        videoReader.runtimeSettings.mBarcodeFormatIds = _flag + 0x3ff;
        $('.ls-option-1d input').prop('checked', true);
    } else if (!this.checked) {
        if (_flag === 0) {
            $(this).prop('checked', true);
            alert('Please select at lease one barcode format');
        } else {
            videoReader.runtimeSettings.mBarcodeFormatIds = _flag;
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
        videoReader.runtimeSettings.mBarcodeFormatIds = _flag + 0x1e000000;
        $('.ls-option-2d input').prop('checked', true);
    } else if (!this.checked) {
        if (_flag === 0) {
            $(this).prop('checked', true);
            alert('Please select at lease one barcode format');
        } else {
            videoReader.runtimeSettings.mBarcodeFormatIds = _flag;
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
    if (_flag1 < 0x3ff) $('#s1D10').prop('checked', false);
    if (_flag1 === 0x3ff) $('#s1D10').prop('checked', true);
    if (_flag2 < 0x1e000000) $('#s2D4').prop('checked', false);
    if (_flag2 === 0x1e000000) $('#s2D4').prop('checked', true);

    if (_flag1 + _flag2 === 0) {
        $(this).prop('checked', true);
        alert('Please select at lease one barcode format');
    } else {
        videoReader.runtimeSettings.mBarcodeFormatIds += parseInt(this.checked ? this.value : -this.value);
    }
});

// video reading interval chaneged
$('.ls-option input[name="settingInterval"]').change(function () {
    videoReader.intervalTime = parseInt(this.value);
});

// video reading mode changed
$('.ls-option input[name="settingMode"]').change(function () {
    if('fast' == this.value){
        videoReader.runtimeSettings.mAntiDamageLevel = 3;
        videoReader.runtimeSettings.mDeblurLevel = 0;
    }else if('accurate' == this.value){
        videoReader.runtimeSettings.mAntiDamageLevel = 9;
        videoReader.runtimeSettings.mDeblurLevel = 0;
    }
});

var updateFrame = () => {
    // tudo, resize when video too big
    let videoComputedStyle = window.getComputedStyle($video);
    let videoComputedWidth = Math.round(parseFloat(videoComputedStyle.getPropertyValue('width')));
    let videoComputedHeight = Math.round(parseFloat(videoComputedStyle.getPropertyValue('height')));
    let resizeRate = 1;
    if (videoComputedWidth < $video.videoWidth) {
        resizeRate = videoComputedWidth / $video.videoWidth;
    }
    $('.scanning-container').css({
        'width': videoComputedWidth + 'px',
        'height': videoComputedHeight + 'px'
    });
    // full
    if (!videoReader.searchRegion.sx) {
        $cvsContainer.style.width = $video.videoWidth + 'px';
        $cvsContainer.style.height = $video.videoHeight + 'px';
        $cvsContainer.style.transform = 'matrix(' + [resizeRate, 0, 0, resizeRate, 0, 0].join(',') + ')';
    } // region
    else if (videoReader.searchRegion.sx) {
        $cvsContainer.style.width = $('.sc-frame1').css('width');
        $cvsContainer.style.height = $('.sc-frame1').css('height');
        $cvsContainer.style.transform = 'matrix(' + [1, 0, 0, 1, 0, 0].join(',') + ')';
        SetSearchRegion();
    }
}

var SetSearchRegion = () => {
    // take a center part of the video and resize the part before decode
    // also see: [drawImage](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/drawImage)
    let cw = $('.sc-frame1').width(),
        ch = $('.sc-frame1').height(),
        vw = $('.scanning-container').width(),
        vh = $('.scanning-container').height();

    // tudo, resize when video too big
    let videoComputedStyle = window.getComputedStyle($video);
    let videoComputedWidth = Math.round(parseFloat(videoComputedStyle.getPropertyValue('width')));
    let resizeRate = 1;
    if (videoComputedWidth < $video.videoWidth) {
        resizeRate = videoComputedWidth / $video.videoWidth;
    }
    videoReader.searchRegion = {
        sx: (vw - cw) / resizeRate / 2,
        sy: (vh - ch) / resizeRate / 2,
        sWidth: cw / resizeRate,
        sHeight: ch / resizeRate,
        dWidth: cw,
        dHeight: ch
    };
}

$('#LRegion').change(function () {
    $('canvas').remove();
    // full
    if (this.checked) {
        $('#MRegion').prop('checked', true);
        $('.scanning-container').fadeOut(300);
        videoReader.searchRegion = {};
    } // region 
    else {
        $('#MRegion').prop('checked', false);
        $('.scanning-container').fadeIn(300);
        SetSearchRegion();
    }
});

// mobile menu btn
$('#MMenu').change(function () {
    if (this.checked) {
        $('.leftbar').fadeIn(300);
    } else {
        $('.leftbar').fadeOut(300);
    }
});

// mobile region btn
$('#MRegion').change(function () {
    $('canvas').remove();
    // full
    if (this.checked) {
        $('#LRegion').prop('checked', true);
        $('.scanning-container').fadeOut(300);
        videoReader.searchRegion = {};
    } // region 
    else {
        $('#LRegion').prop('checked', false);
        $('.scanning-container').fadeIn(300);
        SetSearchRegion();
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

var getVideoFrame = () => {
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
}

document.onreadystatechange = function () {
    if (document.readyState === 'complete') {
        setTimeout(function () {
            $('.waiting').fadeOut(300);
        }, 300);
    }
};