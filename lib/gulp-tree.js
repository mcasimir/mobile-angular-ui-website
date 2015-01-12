var path = require('path'),
    inspect = require('util').inspect,
    _ = require('lodash'),
    slug = require('slug'),

    swig = require('swig'),
    swigTraverse = require('swig-traverse'),
    markedSwig = require('swig-marked'),
    highlightJs = require('highlight.js'),
    
    Node = require('./Node'),
    traverse = require('./traverse'),
    through = require('./through');

function objectToNode(obj, defaults) {
  var base = { 
    slug: path.relative(obj.cwd, obj.path).replace(/\.[^\/]+$/, ''),
    contents: obj.contents && obj.contents.toString()
  };
  var node = new Node(_.extend(base, obj.data, defaults));
  return node;

}

module.exports = {
  root: function(defaults) {

    return through(function(obj, enc, done) { 
      this.push(objectToNode(obj, defaults));
      done();
    });

  },

  append: function(stream, defaults) {
    return through(function(obj, enc, done) {

      if (!obj instanceof Node) { done(new Error('object must be a Node')); }


      defaults = defaults || {};

      var self  = this, 
          nodes = [],
          where = typeof defaults.parent === 'string' ? {path: defaults.parent} : defaults.parent,
          options = _.omit(defaults, 'where');

      delete defaults.where; 
      
      stream.on('end', function() {
        for (var i = 0; i < nodes.length; i++) {
          var node = nodes[i];
          var parent = obj;
          if (where) {
            var matchingDescendants = obj.descendants(where);
            if (matchingDescendants.length) {
              parent = matchingDescendants[0];
            } else {
              throw new Error('Unable to find a parent for `' + node.path + '` matching `' + inspect(where) + '`');
            }
          }
          parent.append(node); 
        }
        self.push(obj);
        done();
      });

      stream.pipe(through(function(child, enc, streamDone) {
        if (child instanceof Node) {
          nodes.push( child );
        } else if ( !( child.stat && child.stat.isDirectory() ) ) {
          try {
            nodes.push( objectToNode( child, options ) );
          } catch(e) {
            console.warn('[gulp-tree.append] File "' + path.relative(process.cwd(), child.path) + '" skipped due to error:', e.message);
          }
        }
        this.push(child);
        streamDone();
      }))
    });
  }
}