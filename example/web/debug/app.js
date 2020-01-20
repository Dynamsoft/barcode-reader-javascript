const express = require('express');
const fs = require('fs');
const https = require('https');
const cors = require('cors');
const util = require('util');
const path = require('path');
const multer = require('multer');

const app = express();
// Access-Control-Allow-Origin: **any**
app.use(cors({
    origin: (origin, callback) => {
        return callback(null, true);
    }
}));

// collect images
const dirCollect = path.join(__dirname, 'public/collect');
if(!fs.existsSync(dirCollect)){
    fs.mkdirSync(dirCollect);
}
const collect = multer({ storage: multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, dirCollect);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now()+'.png');
    }
}) });//dest: path.join(__dirname, 'public/collect')
app.post('/collect', collect.any(), async(req, res) => {
    res.send(util.inspect(req.files,{depth:null}));
});

// static files
app.use(express.static(path.join(__dirname, 'public')));

let httpsServer = https.createServer({
    key: fs.readFileSync(path.join(__dirname, 'pem/ryans-key.pem')),
    cert: fs.readFileSync(path.join(__dirname, 'pem/ryans-cert.pem'))
}, app);

let httpsPort = 4443;
httpsServer.listen(httpsPort, () => console.log('Page is available in https://localhost:'+httpsPort+'/'));
