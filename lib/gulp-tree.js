'use strict';

var path = require('path');
var inspect = require('util').inspect;
var _ = require('lodash');
var Node = require('./Node');
var through = require('./through');

function objectToNode(obj, config) {
  var base = {
        slug: path.relative(obj.cwd, obj.path).replace(/\.[^\/]+$/, ''),
        contents: obj.contents && obj.contents.toString()
      };
  var data = _.extend({}, config, obj.data);

  return new Node(_.extend(base, data), data);
}

module.exports = {
  root: function(config) {

    return through(function(obj, enc, done) {
      this.push(objectToNode(obj, config));
      done();
    });

  },

  append: function(stream, config) {
    return through(function(obj, enc, done) {

      if (!(obj instanceof Node)) { done(new Error('object must be a Node')); }

      config = config || {};

      var self  = this;
      var nodes = [];
      var where = typeof config.parent === 'string' ? {path: config.parent} : config.parent;
      var data = config.data;

      stream.on('end', function() {
        for (var i = 0; i < nodes.length; i++) {
          var node = nodes[i];
          var parent = obj;
          if (where) {
            var matchingDescendants = obj.descendants(where);
            if (matchingDescendants.length) {
              parent = matchingDescendants[0];
            } else {
              throw new Error('[gulp-tree.append] Unable to find a parent for `' + node.path + '` matching `' + inspect(where) + '`');
            }
          }
          parent.append(node);
        }
        self.push(obj);
        done();
      });

      stream.pipe(through(function(child, enc, streamDone) {
        if (child instanceof Node) {
          child.traverse(function(node) {
            _.assign(node, data);
          });
          nodes.push(child);
        } else if (!(child.stat && child.stat.isDirectory())) {
          try {
            nodes.push(objectToNode(child, data));
          } catch (e) {
            console.warn('[gulp-tree.append] File "' + path.relative(process.cwd(), child.path) + '" skipped due to error:', e.message);
          }
        }

        this.push(child);
        streamDone();
      }));
    });
  }
};
