var barcodereader;
var dynamsoft = self.dynamsoft || {};
dynamsoft.dbrEnv = dynamsoft.dbrEnv || {};
dynamsoft.dbrEnv.bUseWorker = true;
dynamsoft.dbrEnv.onAutoLoadWasmSuccess = function() {
	barcodereader = new dynamsoft.BarcodeReader();
	document.getElementById('anim-loading').style.display = 'none';
	buttonFile.disabled = false;
	buttonVideo.disabled = false;
};

dynamsoft.dbrEnv.onAutoLoadWasmError = function(status) {
	document.getElementById('anim-loading').style.display = 'none';
};
// https://www.dynamsoft.com/CustomerPortal/Portal/TrialLicense.aspx
dynamsoft.dbrEnv.licenseKey =
	't0068NQAAAJUlQ1oDc6zPWxOAQWn7kD9EGtgZFIqK/k3ULJC5ccG9Xe/lpVOxod82bm6nXxqQXUpC1zjRXU514mWw9XLE1JM=';

// check devices
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
var buttonFile = document.getElementById('bt-file');
buttonFile.disabled = true;
var buttonVideo = document.getElementById('bt-video');
buttonVideo.disabled = true;
var barcode_result = document.getElementById('dbr');
var canvas, ctx, myWorker, overlay, videoElement;
var isPaused = false,
	isPC = true,
	isVideoMode = false;

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
	let x = [ localization.X1, localization.X2, localization.X3, localization.X4 ];
	let y = [ localization.Y1, localization.Y2, localization.Y3, localization.Y4 ];
	x.sort(function(a, b) {
		return a - b;
	});
	y.sort(function(a, b) {
		return b - a;
	});
	let left = x[0];
	let top = y[0];

	context.fillText(text, left, top + 50);
}

// stackoverflow:
// http://stackoverflow.com/questions/4998908/convert-data-uri-to-file-then-append-to-formdata/5100158
function dataURItoBlob(dataURI) {
	// convert base64/URLEncoded data component to raw binary data held in a
	// string
	var byteString;
	if (dataURI.split(',')[0].indexOf('base64') >= 0) byteString = atob(dataURI.split(',')[1]);
	else byteString = unescape(dataURI.split(',')[1]);

	// separate out the mime component
	var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

	// write the bytes of the string to a typed array
	var ia = new Uint8Array(byteString.length);
	for (var i = 0; i < byteString.length; i++) {
		ia[i] = byteString.charCodeAt(i);
	}

	return new Blob([ ia ], { type: mimeString });
}

// add button event
buttonFile.onclick = function() {
	buttonVideo.disabled = false;
	clearOverlay();
	isVideoMode = false;
	let image = document.getElementById('uploadImage').files[0];

	if (image) {
		var reader = new FileReader();
		reader.onload = function(e) {
			// console.log(this.result); // this.result is the read file as an
			// ArrayBuffer.
			var image = new Image();
			image.src = this.result;

			image.onload = function() {
				// console.log(this.width);
				let tmpCanvas = document.createElement('canvas');
				tmpCanvas.width = this.width;
				tmpCanvas.height = this.height;
				let ctx = tmpCanvas.getContext('2d');
				ctx.drawImage(this, 0, 0);
				barcodereader
					.decodeBuffer(
						ctx.getImageData(0, 0, this.width, this.height).data,
						this.width,
						this.height,
						this.width * 4,
						dynamsoft.BarcodeReader.EnumImagePixelFormat.IPF_ARGB_8888
					)
					.then((results) => {
						showResults(results);
					});
			};
		};
		reader.onerror = function(e) {
			console.log(e);
		};
		reader.readAsDataURL(image);
	} else {
		alert('No file chosen');
	}
};

buttonVideo.onclick = function() {
	clearOverlay();
	isVideoMode = true;
	buttonVideo.disabled = true;
	if (isPC) {
		canvas.style.display = 'none';
	} else {
		mobileCanvas.style.display = 'none';
	}

	isPaused = false;
	scanBarcode();
};

// scan barcode
function scanBarcode() {
	// barcode_result.textContent = "";

	let context = ctx,
		width = videoWidth,
		height = videoHeight;

	context.drawImage(videoElement, 0, 0, width, height);
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
	// buttonVideo.disabled = false;
	if (window.stream) {
		window.stream.getTracks().forEach(function(track) {
			track.stop();
		});
	}

	var constraints = {
		video: {
			deviceId: { exact: videoSelect.value }
			// width: { min: 640},
			// height: { min: 480},
		}
	};

	navigator.mediaDevices.getUserMedia(constraints).then(gotStream).catch(handleError);
}

function gotStream(stream) {
	window.stream = stream; // make stream available to console
	videoElement.srcObject = stream;
}

function handleError(error) {
	console.log('Error: ', error);
}

function showResults(results) {
	let context = clearOverlay();

	let txts = [];
	try {
		let localization;
		for (var i = 0; i < results.length; ++i) {
			if (results[i].LocalizationResult.ExtendedResultArray[0].Confidence >= 30) {
				txts.push(results[i].BarcodeText);
				localization = results[i].LocalizationResult;
				if (isVideoMode) {
					drawResult(context, localization, results[i].BarcodeText);
				}
			}
		}
		barcode_result.textContent = txts.join(', ');

		if (isVideoMode) {
			scanBarcode();
		}
	} catch (e) {
		if (isVideoMode) {
			scanBarcode();
		} else {
			barcode_result.textContent = data.body;
		}
	}
}
