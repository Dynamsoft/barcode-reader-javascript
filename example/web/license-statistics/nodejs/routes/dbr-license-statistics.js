let express = require('express');
let fs = require('fs');
let router = express.Router();

let timeOut = 15000; // Min interval client send the record
let sessionTimeOut = 300000; // 300,000ms 300s, 5min
let deviceTimeOut = 30 * 24 * 3600 * 1000; // 1 month, monthly active users
let recordAndGCTimeOut = 10000; // 10s

let barcodeUsed = 0;
let barcodeLimit = 10000;

let sessionPool = new Map();
let sessionLimit = 1000;

let devicePool = new Map();
let deviceLimit = 1000;

/*
 * Static Init:
 *   Make dir if not exist
 *   Read info if exist
 *   Read device record if exist
 */
fs.mkdir('./dbr-license-statistics', () => {});
fs.readFile('./dbr-license-statistics/info.txt', (ex, txt) => {
  if(!ex){
    let info = JSON.parse(txt);
    timeOut = info.timeOut;
    sessionTimeOut = info.sessionTimeOut;
    deviceTimeOut = info.deviceTimeOut;
    recordAndGCTimeOut = info.recordAndGCTimeOut;
    barcodeUsed = info.barcodeUsed;
    barcodeLimit = info.barcodeLimit;
    sessionLimit = info.sessionLimit;
    deviceLimit = info.deviceLimit;
  }
});
fs.readFile('./dbr-license-statistics/device-record.txt', (ex, txt) => {
  if(!ex){
    let records = JSON.parse(txt);
    devicePool = new Map(records);
  }
});

/*
 * Get info of the the class
 */
let getInfo = () => {
  return {
    timeOut: timeOut,
    sessionTimeOut: sessionTimeOut,
    deviceTimeOut: deviceTimeOut,
    recordAndGCTimeOut: recordAndGCTimeOut,
    barcodeUsed: barcodeUsed,
    barcodeLimit: barcodeLimit,
    sessionCount: sessionPool.size,
    sessionLimit: sessionLimit,
    deviceCount: devicePool.size,
    deviceLimit: deviceLimit
  };
};

/*
 * Start the timed task:
 *   GC session pool
 *   GC device pool
 *   Info record
 *   Session log
 *   Device record
 */
setInterval(() => {
  let now = new Date();
  let msNow = now.getTime();

  // GC session pool
  for(let k in sessionPool){
    if(sessionPool[k] + sessionTimeOut < msNow){
      sessionPool.delete(k);
    }
  }

  // GC device pool
  for(let k in devicePool){
    if(devicePool[k] + deviceTimeOut < msNow){
      sessionPool.delete(k);
    }
  }

  // Info record
  fs.writeFile("./dbr-license-statistics/info.txt", JSON.stringify(getInfo()), ()=>{});

  // Session log
  let yyyy = now.getUTCFullYear().toString();
  let MM = '0'+ (now.getUTCMonth()+1).toString();
  MM = MM.substring(MM.length - 2);
  let dd = '0' + now.getUTCDate().toString();
  dd = dd.substring(dd.length - 2);
  let hh = '0' + now.getUTCHours().toString();
  hh = hh.substring(hh.length - 2);
  let mm = '0' + now.getUTCMinutes().toString();
  mm = mm.substring(mm.length - 2);
  let ss = '0' + now.getUTCSeconds().toString();
  ss = ss.substring(ss.length - 2);
  fs.appendFile(["./dbr-license-statistics/session-", yyyy, MM, dd, ".log"].join(''),
    ['[',yyyy,'-',MM,'-',ss,' ',hh,':',mm,':',ss,']: ',sessionPool.size.toString()].join(''),
    ()=>{});
  
  // Device record
  fs.writeFile("./dbr-license-statistics/device-record.txt", JSON.stringify(Array.from(devicePool)), ()=>{});
}, recordAndGCTimeOut);

//Page Server
router.get('/get-info', (req,res) => {
  res.send(getInfo());     //send for each session
});

//Statistical Server
router.post('/post-record', (req,res) => {
  // Get json
  let info = req.body;

  // Get record info
  let uuid = info.uuid;
  let counts = info.counts;
  let time = Date.now();

  // consume barcodes
  barcodeUsed += counts;
  // session
  sessionPool.set(uuid, time);
  // device
  devicePool.set(uuid, time);
  
  res.send();
});

module.exports = router;
