/*
 * Blackhole - updload images and provide URL
 */

(function() {

var fs          = require('fs');

var key         = fs.readFileSync('../ssl/key.pem');
var certificate = fs.readFileSync('../ssl/cert.pem');
var credentials = { key: key, cert: certificate};

var express     = require('express');
var app         = express();
var https       = require('https');
var httpsServer = https.createServer(credentials, app);

var path        = require('path');

var multer      = require('multer');

var uploadPath  = 'uploads/';
var directory   = '../www/' + uploadPath;
var Store       = require('./store');
var store       = new Store(directory);

var storage = multer.diskStorage({
  destination: function (req, file, callback) {
    // callback(null, directory);
    store.getDirectory(function(directory) {
      callback(null, directory);
    });
  },
  filename: function (req, file, callback) {
    store.getUniqueFilename(path.parse(file.originalname).base,
                            file.mimetype,
                            function(uniqueName) {
      callback(null, uniqueName);
    });
  }
});

var upload = multer({ storage: storage });

function runServer() {

  // static content webserver
  app.use('/', express.static('../www/'));

  // logging
  app.use(function (req, res, next) {
    console.info('request:' + req.url);
    next();
  });

  app.post('/upload', upload.single('file'), function(req, res) {
    res.send({url: req.headers.referer + uploadPath + req.file.filename});
  });

  // create secure server 
  httpsServer.listen(443);
  console.info('**** Blackhole Server up and operational ****');
}

runServer();

})();