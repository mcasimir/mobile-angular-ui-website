'use strict';

var gutil  = require('gulp-util');
var path   = require('path');

module.exports = function vinylFile(filename, contents) {
  return new gutil.File({
    base: path.join(__dirname),
    cwd: __dirname,
    path: path.join(__dirname, filename),
    contents: new Buffer(contents)
  });
};
