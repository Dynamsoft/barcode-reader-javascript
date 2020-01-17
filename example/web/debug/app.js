const express = require('express');
const fs = require('fs');
const https = require('https');
const util = require('util');
const path = require('path');
const multer = require('multer');

const app = express();
const collect = multer({ storage: multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, 'public/collect'));
    },
    filename: (req, file, cb) => {
        cb(null, Date.now()+'.png');
    }
}) });//dest: path.join(__dirname, 'public/collect')

app.post('/collect', collect.any(), async(req, res) => {
    res.send(util.inspect(req.files,{depth:null}));
});
app.use(express.static(path.join(__dirname, 'public')));

let httpsServer = https.createServer({
    key: fs.readFileSync(path.join(__dirname, 'pem/ryans-key.pem')),
    cert: fs.readFileSync(path.join(__dirname, 'pem/ryans-cert.pem'))
}, app);

let httpsPort = 4443;
httpsServer.listen(httpsPort, () => console.log('Page is available in https://localhost:'+httpsPort+'/'));
