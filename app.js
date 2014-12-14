var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var ejs = require('ejs');
var portscanner = require('portscanner');
var dns = require('dns');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, './public/views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname,'/public/views/index.html'));
});

app.post('/port-check', function(req, res){
    console.log(req.body);
    try {
        portscanner.checkPortStatus(req.body.port, req.body.ip, function (error, status) {
            if (error === undefined || error === null) {
                console.log("returning status of - " + status);
                res.send(status);
            } else {
                console.log(error);
                res.status(304).end();
            }
        });
    }catch(e){
        res.status(500).end();
    }
});

app.post('/domain-to-ip', function(req, res){
    try {
        dns.resolve4(req.body.domain, function (err, addresses) {
            if (err){
                res.status(500).end();
            }else{
                res.json(addresses);
            }
        });
    }catch(e){
        res.status(500).end();
    }
});

app.set('port', process.env.PORT || 5000);

var server = app.listen(app.get('port'), function() {
    console.log('Express server listening on port ' + server.address().port);
});

module.exports = app;
