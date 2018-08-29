// check devices
function browserRedirect() {
  var deviceType;
  var sUserAgent = navigator.userAgent.toLowerCase();
  var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
  var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
  var bIsMidp = sUserAgent.match(/midp/i) == "midp";
  var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
  var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
  var bIsAndroid = sUserAgent.match(/android/i) == "android";
  var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
  var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";
  if (bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) {
    deviceType = 'phone';
  } else {
    deviceType = 'pc';
  }
  return deviceType;
}

var videoElement = document.querySelector('video');
var canvas = document.getElementById('pcCanvas');
var mobileCanvas = document.getElementById('mobileCanvas');
var ctx = canvas.getContext('2d');
var mobileCtx = mobileCanvas.getContext('2d');
var videoSelect = document.querySelector('select#videoSource');
var videoOption = document.getElementById('videoOption');
var buttonFile = document.getElementById('bt-file');
buttonFile.disabled = true;
var buttonVideo = document.getElementById('bt-video');
buttonVideo.disabled = true;
var barcode_result = document.getElementById('dbr');
var myWorker;
var overlay;

var isPaused = false;
var videoWidth = canvas.width,
  videoHeight = canvas.height;
var mobileVideoWidth = 240,
  mobileVideoHeight = 320;
var isPC = true;
var isVideoMode = false;

if (browserRedirect() == 'pc') {
  isPC = true;
  document.getElementById("videoview").style.display = 'block'
  overlay = document.getElementById("overlay");
} else {
  isPC = false;
  overlay = document.getElementById("overlay-mobile");
}

function clearOverlay() {
  let context = overlay.getContext("2d");
  context.clearRect(0, 0, videoWidth, videoHeight);
  context.strokeStyle = '#ff0000';
  context.lineWidth=5;
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

  context.font = "18px Verdana";
  context.fillStyle = '#ff0000';
  let x = [localization.X1, localization.X2, localization.X3, localization.X4];
  let y = [localization.Y1, localization.Y2, localization.Y3, localization.Y4];
  x.sort(function(a, b){return a - b});
  y.sort(function(a, b){return b - a});
  let left = x[0];
  let top = y[0];

  context.fillText(text, left, top + 50);  
}

// stackoverflow: http://stackoverflow.com/questions/4998908/convert-data-uri-to-file-then-append-to-formdata/5100158
function dataURItoBlob(dataURI) {
  // convert base64/URLEncoded data component to raw binary data held in a string
  var byteString;
  if (dataURI.split(',')[0].indexOf('base64') >= 0)
    byteString = atob(dataURI.split(',')[1]);
  else
    byteString = unescape(dataURI.split(',')[1]);

  // separate out the mime component
  var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

  // write the bytes of the string to a typed array
  var ia = new Uint8Array(byteString.length);
  for (var i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }

  return new Blob([ia], {
    type: mimeString
  });
}

// add button event
buttonFile.onclick = function () {
  buttonVideo.disabled = false;
  clearOverlay();
  isVideoMode = false;
  let image = document.getElementById('uploadImage').files[0];

  if (image) {
    var reader = new FileReader();
    reader.onload = function (e) {
      // console.log(this.result); // this.result is the read file as an ArrayBuffer.
      var image = new Image();
      image.src = this.result;

      image.onload = function () {
        // console.log(this.width);
        let tmpCanvas = document.createElement("canvas");
        tmpCanvas.width = this.width;
        tmpCanvas.height = this.height;
        let ctx = tmpCanvas.getContext("2d");
        ctx.drawImage(this, 0, 0);

        if (myWorker) {
          myWorker.postMessage({
            type: 'decodeBuffer',
            body: ctx.getImageData(0, 0, this.width, this.height).data,
            width: this.width,
            height: this.height
          });
        }
      };


    };
    reader.onerror = function (e) {
      console.log(e);
    };
    reader.readAsDataURL(image);
  } else {
    alert('No file chosen');
  }

};

buttonVideo.onclick = function () {
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

  let context = null,
    width = 0,
    height = 0;

  if (isPC) {
    context = ctx;
    width = videoWidth;
    height = videoHeight;
  } else {
    context = mobileCtx;
    width = mobileVideoWidth;
    height = mobileVideoHeight;
  }
  context.drawImage(videoElement, 0, 0, width, height);
  var barcodeCanvas = document.createElement("canvas");
  barcodeCanvas.width = width;
  barcodeCanvas.height = height;
  var barcodeContext = barcodeCanvas.getContext('2d');
  barcodeContext.drawImage(videoElement, 0, 0, width, height);
  // read barcode
  if (myWorker) {
    myWorker.postMessage({
      type: 'decodeBuffer',
      body: barcodeContext.getImageData(0, 0, width, height).data,
      width: width,
      height: height
    });
  }
}

navigator.mediaDevices.enumerateDevices()
  .then(gotDevices).then(getStream).catch(handleError);

videoSelect.onchange = getStream;

function gotDevices(deviceInfos) {
  for (var i = deviceInfos.length - 1; i >= 0; --i) {
    var deviceInfo = deviceInfos[i];
    var option = document.createElement('option');
    option.value = deviceInfo.deviceId;
    if (deviceInfo.kind === 'videoinput') {
      option.text = deviceInfo.label || 'camera ' +
        (videoSelect.length + 1);
      videoSelect.appendChild(option);
    } else {
      console.log('Found one other kind of source/device: ', deviceInfo);
    }
  }
}

function getStream() {
  // buttonVideo.disabled = false;
  if (window.stream) {
    window.stream.getTracks().forEach(function (track) {
      track.stop();
    });
  }

  var constraints = {
    video: {
      deviceId: {
        exact: videoSelect.value
      },
      // width: { min: 640},
      // height: { min: 480},
    }
  };

  navigator.mediaDevices.getUserMedia(constraints).
  then(gotStream).catch(handleError);
}

function gotStream(stream) {
  window.stream = stream; // make stream available to console
  videoElement.srcObject = stream;
}

function handleError(error) {
  console.log('Error: ', error);
}

if (window.Worker) {
  myWorker = new Worker('worker.js');
  myWorker.onmessage = function (e) {
    let data = e.data;
    if (data.event) {
      switch (data.event) {
        case 'onload':
          {
            document.getElementById('anim-loading').style.display = 'none';
            buttonFile.disabled = false;
            buttonVideo.disabled = false;
            break;
          }
        case 'onerror':
          {
            document.getElementById('anim-loading').style.display = 'none';
            break
          }
        case 'onresult':
          {
            let context = clearOverlay();

            let txts = [];
            try {
              let results = data.body;
              let localization;
              for (var i = 0; i < results.length; ++i) {
                if (results[i].LocalizationResult.ExtendedResultArray[0].Confidence >= 30) {
                  txts.push(results[i].BarcodeText);
                  localization = results[i].LocalizationResult
                  if (isVideoMode) {
                    drawResult(context, localization, results[i].BarcodeText);
                  }
                }
              }
              barcode_result.textContent = txts.join(', ');

              if (isVideoMode) {
                scanBarcode();
                // if (txts.length == 0) {
                //   scanBarcode();
                //   console.log("No confident results");
                // } else {
                //   // barcode_result.textContent = txts.join(", ");
                //   // barcode_result.innerHTML = txts.join("</br>");
                //   buttonVideo.disabled = false;
                //   if (isPC) {
                //     canvas.style.display = 'block';
                //   } else {
                //     mobileCanvas.style.display = 'block';
                //   }
                // }
              }
            } catch (e) {
              if (isVideoMode) {
                scanBarcode();
              } else {
                barcode_result.textContent = data.body;
              }
            }

            break;
          }
      }
    }
  };
}