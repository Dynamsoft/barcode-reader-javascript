const express = require('express');
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

app.listen(3000, () => console.log('Example app listening on port 3000!'));
