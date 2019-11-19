var express = require('express');
var app = express();

app.use(express.static(__dirname));
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "X-Requested-With, content-type");
    res.header("Access-Control-Allow-Credentials", true);
    next();
});

var server = app.listen(2018, function () {
    var host = server
        .address()
        .address;
    var port = server
        .address()
        .port;
    console.log('listening at http://%s:%s', host, port);
});