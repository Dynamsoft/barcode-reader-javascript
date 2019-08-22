var express = require('express');
var HashMap = require('hashmap');
var log4js = require('log4js');
var uuid = require('uuid');
var router = express.Router();

/* GET home page. */
var clientPool = new HashMap();
var barcodeCount = new HashMap();
var defaultTimeOut = 300000;   //session timeout:300s
var interval = 30000;   //log into file:30s
var logger = log4js.getLogger();

router.get('/', function(req, res, next) {
  console.log("success");
  res.render('decode');
});

//Page Server
router.get('/ps',function(req,res){
  var sessionUuid = uuid.v1();
  var freshID = {sessionUuid:sessionUuid,timeOut:defaultTimeOut};
  res.send(freshID);     //send for each session
});

//Statistical Server
router.post('/ss',function (req,res) {
  var info = req.body;
  var sessionUuid = info.sessionUuid;
  var deviceUuid = info.uuid;
  var time = info.time;
  var counts = info.counts;

  clientPool.set(sessionUuid,time);     //client pool:Statistics are taken per session
  barcodeCount.set(deviceUuid,counts);  //Statistics are taken per barcode
  console.log(clientPool,barcodeCount);

  var sign = {sign:"get it"};
  res.send(sign);
});

setInterval(function () {
  var sessionNum = clientPool.size;
  var curTime = (new Date()).valueOf();
  clientPool.forEach(function (value,key) {
    if(curTime-value > interval){
      clientPool.delete(key);
    }
  });
  logger.info("session number:",clientPool.size);   //log into file, the client pool size
  logger.info("consumed counts:",barcodeCount.values());  //log into file, consumed counts per barcode
  console.log("session number:",sessionNum);
},interval);


log4js.configure({
  replaceConsole: true,
  appenders: {
    cheese: {
      type: 'dateFile',
      filename: 'statistic.log',
      encoding: 'utf-8',
      layout: {
        type: "pattern",
        pattern: '{\'%m\',"date":"%d"}'
      },
      pattern: "-yyyy-MM-dd-hh",
      keepFileExt: true,
      alwaysIncludePattern: true,
    },
  },
  categories: {
    // 设置默认的 categories
    default: {appenders: ['cheese'], level: 'debug'},
  }
});

module.exports = router;
