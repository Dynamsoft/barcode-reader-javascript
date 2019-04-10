var barcodereader = null;
var dynamsoft = self.dynamsoft || {};
dynamsoft.dbrEnv = dynamsoft.dbrEnv || {};
// dynamsoft.dbrEnv.resourcesPath = '/node_modules/dynamsoft-barcode-reader-web-sdk/dist';
dynamsoft.dbrEnv.bUseWorker = true;
dynamsoft.dbrEnv.onAutoLoadWasmSuccess = function () {
    barcodereader = new dynamsoft.BarcodeReader();
    document.getElementById('anim-loading').style.display = 'none';
    scanBarcode();
};

dynamsoft.dbrEnv.onAutoLoadWasmError = function (status) {
    document.getElementById('anim-loading').style.display = 'none';
};
// https://www.dynamsoft.com/CustomerPortal/Portal/TrialLicense.aspx
dynamsoft.dbrEnv.licenseKey = 't0126lQMAAFu0xQ4pn8iaZNP681k1xjPzGp2AiV9/w8oV1Tz37Ap7x22090Hz5b/ehS6ieLrjJrI9ZYM7zqg9/h3gtbB3IV3eWbprPsQwh2EOwxyGOQwzDTMNMw0zDTMNswyzDLMMswxzvmv+RG42GuVNQdbwrf5No3odLCcVObF6';
function browserRedirect() {
	var deviceType;
	var sUserAgent = navigator.userAgent.toLowerCase();
	var bIsIpad = sUserAgent.match(/ipad/i) == 'ipad';
	var bIsIphoneOs = sUserAgent.match(/iphone os/i) == 'iphone os';
	var bIsMidp = sUserAgent.match(/midp/i) == 'midp';
	var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == 'rv:1.2.3.4';
	var bIsUc = sUserAgent.match(/ucweb/i) == 'ucweb';
	var bIsAndroid = sUserAgent.match(/android/i) == 'android';
	var bIsCE = sUserAgent.match(/windows ce/i) == 'windows ce';
	var bIsWM = sUserAgent.match(/windows mobile/i) == 'windows mobile';
	if (bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) {
		deviceType = 'phone';
	} else {
		deviceType = 'pc';
	}
	return deviceType;
}

var videoSelect = document.querySelector('select#videoSource');
var videoOption = document.getElementById('videoOption');
var canvas, ctx, myWorker, overlay, videoElement;
var isPC = true;

if (browserRedirect() === 'pc') {
	isPC = true;
	videoElement = document.getElementById('videoContainer');
	document.getElementById('videoview').style.display = 'block';
	overlay = document.getElementById('overlay');
	canvas = document.getElementById('pcCanvas');
	ctx = canvas.getContext('2d');
} else {
	isPC = false;
	videoElement = document.getElementById('videoContainer-mobile');
	document.getElementById('videoview-mobile').style.display = 'block';
	overlay = document.getElementById('overlay-mobile');
	canvas = document.getElementById('mobileCanvas');
	ctx = mobileCanvas.getContext('2d');
}

var videoWidth = canvas.width,
    videoHeight = canvas.height;

function clearOverlay() {
    let context = overlay.getContext('2d');
    context.clearRect(0, 0, videoWidth, videoHeight);
    context.strokeStyle = '#ff0000';
    context.lineWidth = 5;
    return context;
}

function drawResult(context, localization, text) {
    context.beginPath();
    context.moveTo(localization.X1, localization.Y1);
    context.lineTo(localization.X2, localization.Y2);
    context.lineTo(localization.X3, localization.Y3);
    context.lineTo(localization.X4, localization.Y4);
    context.lineTo(localization.X1, localization.Y1);
    context.stroke();

    context.font = '18px Verdana';
    context.fillStyle = '#ff0000';
    let x = [localization.X1, localization.X2, localization.X3, localization.X4];
    let y = [localization.Y1, localization.Y2, localization.Y3, localization.Y4];
    x.sort(function (a, b) {
        return a - b;
    });
    y.sort(function (a, b) {
        return b - a;
    });
    let left = x[0];
    let top = y[0];

    context.fillText(text, left, top + 50);
}

// scan barcode
function scanBarcode() {
    // barcode_result.textContent = "";

    let width = videoWidth,
        height = videoHeight;

    var barcodeCanvas = document.createElement('canvas');
    barcodeCanvas.width = width;
    barcodeCanvas.height = height;
    var barcodeContext = barcodeCanvas.getContext('2d');
    barcodeContext.drawImage(videoElement, 0, 0, width, height);
    // read barcode
    barcodereader
        .decodeBuffer(
            barcodeContext.getImageData(0, 0, width, height).data,
            width,
            height,
            width * 4,
            dynamsoft.BarcodeReader.EnumImagePixelFormat.IPF_ARGB_8888
        )
        .then((results) => {
            showResults(results);
        });
}

navigator.mediaDevices.enumerateDevices().then(gotDevices).then(getStream).catch(handleError);

videoSelect.onchange = getStream;

function gotDevices(deviceInfos) {
    for (var i = deviceInfos.length - 1; i >= 0; --i) {
        var deviceInfo = deviceInfos[i];
        var option = document.createElement('option');
        option.value = deviceInfo.deviceId;
        if (deviceInfo.kind === 'videoinput') {
            option.text = deviceInfo.label || 'camera ' + (videoSelect.length + 1);
            videoSelect.appendChild(option);
        } else {
            console.log('Found one other kind of source/device: ', deviceInfo);
        }
    }
}

function getStream() {
    if (window.stream) {
        window.stream.getTracks().forEach(function (track) {
            track.stop();
        });
    }

    var constraints = {
        video: {
            deviceId: {
                exact: videoSelect.value
            }
            // width: { min: 640},
            // height: { min: 480},
        }
    };

    navigator.mediaDevices.getUserMedia(constraints).then(gotStream).catch(handleError);
}

function gotStream(stream) {
    window.stream = stream; // make stream available to console
    videoElement.srcObject = stream;

    if (barcodereader) {
        scanBarcode();
    }
}

function handleError(error) {
    console.log('Error: ', error);
}

function showResults(results) {
    let context = clearOverlay();

    try {
        let localization;
        for (var i = 0; i < results.length; ++i) {
            if (results[i].LocalizationResult.ExtendedResultArray[0].Confidence >= 30) {
                localization = results[i].LocalizationResult;
                drawResult(context, localization, results[i].BarcodeText);
            }
        }
        scanBarcode();
    } catch (e) {
        scanBarcode();
    }
}

if ('serviceWorker' in navigator) {
    navigator.serviceWorker
        .register('/javascript-barcode/examples/pwa/service-worker.js')
        .then(function () {
            console.log('Service Worker Registered');
        });
}