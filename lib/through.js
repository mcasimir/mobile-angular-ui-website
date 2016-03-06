'use strict';

var stream = require('stream');

function through(transformFn, flushFn) {
  var transformStream = new stream.Transform({objectMode: true});
  transformStream._transform = transformFn;
  if (flushFn) {
    transformStream._flush = flushFn;
  }
  return transformStream;
}

through.fn = function(transformFn) {
  return through(function(obj, enc, done) {
    transformFn(this, obj, done);
  });
};

module.exports = through;
