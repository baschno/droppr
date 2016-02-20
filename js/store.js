(function() {

'use strict';

var fs   = require('fs');
var path = require('path');
var moment = require('moment');

function Store(directory) {
  this.directory = directory;
}

Store.prototype.getUniqueFilename = function(name, mimetype, callback, i) {
  var ext = path.extname(name);
  var basename = path.basename(name, ext);
  var appendix = '';
  var fullTarget;
  var self = this;

  if (i !== undefined) {
    appendix = '-' + i.toString();
  }
  else {
    i = 0;
  }

  if (basename === 'blob') {
    basename = moment().format('YYYY-MM-DD_HH-mm-ss');
  }
  if (ext === '') {
    switch (mimetype) {
      case 'text/plain':
        ext = '.txt';
        break;
      case 'image/jpeg':
        ext = '.jpg';
        break;
      case 'image/png':
        ext = '.png';
        break;
      case 'application/x-zip-compressed':
        ext = '.zip';
        break;
    }
  }

  fullTarget = self.directory + basename + appendix + ext;

  fs.stat(fullTarget, function(err, stats) {
    if (err) {
      callback(basename + appendix + ext);
    }
    else {
      self.getUniqueFilename(name, mimetype, callback, ++i);
    }
  });
};

Store.prototype.getDirectory = function(callback) {
  var dir = this.directory + moment().format('YYYY-MM');
  fs.stat(dir, function(err, stats) {
    if (err) {
      fs.mkdir(dir, function() {
        callback(dir);
      });
    }
    else {
      callback(dir);
    }
  });
};

module.exports = Store;


})();