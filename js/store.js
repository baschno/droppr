(function() {
/*
 * store.js
 *
 * Handles directories and filenames. If no directory is given, files will
 * be located in "./". A subdirectory is created for each month as YYYY-MM,
 * e. g. 2016-02.
 *
 */
'use strict';

var fs   = require('fs');
var path = require('path');
var moment = require('moment');

function Store(directory) {
  this.directory = directory || './';
  this.currentDirectory = '';
}

/*
 * get a unique filename wihtin the directory. When a filename exists, a
 * number is appended, e. g. text-1.txt, test-2.txt, etc. If filename is
 * "blob" a filename YYYY-MM-DD_HH-mm-ss will be created for it.
 *
 */
Store.prototype.getUniqueFilename = function(name, mimetype, callback, i) {
  var ext = path.extname(name);
  var basename = path.basename(name, ext);
  var appendix = '';
  var fullname;
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
      default:
        callback({msg: 'Unsupported media type'}, null);
    }
  }

  fullname = self.directory +
             self.currentDirectory +
             '/' +
             basename +
             appendix +
             ext;

  fs.stat(fullname, function(err, stats) {
    if (err) {
      callback(null, basename + appendix + ext);
    }
    else {
      self.getUniqueFilename(name, mimetype, callback, ++i);
    }
  });
};

/*
 * get the full directory where data is currently located
 *
 *
 */
Store.prototype.getDirectory = function(callback) {
  this.currentDirectory = moment().format('YYYY-MM');
  var dir = this.directory + this.currentDirectory;
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

/*
 * get the current sub-directory, e. g. 2016-02
 *
 *
 */
Store.prototype.getCurrentDirectory = function() {
  return this.currentDirectory;
};

module.exports = Store;


})();