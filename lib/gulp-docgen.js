/* global __dirname: false, module: true, process: false */

var stream    = require('stream'),
    path      = require('path'),
    spawn     = require('child_process').spawn,
    util      = require('util'),
    slug      = require('slug'),
    _         = require('lodash'),
    traverse  = require('./traverse'),
    Node      = require('./Node');

var JSDOC_BIN  = path.resolve(__dirname, '../node_modules/jsdoc/jsdoc.js'),
    JSDOC_CONF = path.resolve(__dirname, 'jsdoc-conf.json');

function DocletsReader(sources, options) {
  stream.Readable.call( this, { objectMode: true } );

  options = options || {};
  this.cwd = options.cwd || process.cwd();
  this.srcDir = sources;
  this.done = false;
}

util.inherits(DocletsReader, stream.Readable);

DocletsReader.prototype._read = function() {
  if (this.done) { return null; }
  this.done = true;
  
  var self = this,
      sources = path.resolve(process.cwd(), this.srcDir),
      docletsBuff = '',
      args = ['-r', sources, '-c', JSDOC_CONF, '-X'],
      child = spawn(JSDOC_BIN, args);

  child.on('error', function(e) { 
    self.emit('error', e);
  });

  child.stdout.on('data', function(buff) {
    docletsBuff += buff.toString('utf8');
  });

  child.stdout.on('end', function() {
    
    var i, doclets = JSON.parse(docletsBuff);
    //
    // 1. drop undocumented and packages
    //
    doclets = doclets.filter(function(doclet) {
      return !(doclet.undocumented || doclet.kind === 'package');
    });

    

    var refs = {},
        parents = {},
        nodes = [],
        node, tree;

    for (i = 0; i < doclets.length; i++) {
      var doclet = doclets[i];

      //
      // 2. Delete unused props
      //
      delete doclet.scope;
      delete doclet.comment;

      //
      // 3. Normalize ngdoc/type props
      //
      doclet.ngdoc = doclet.ngdoc ? doclet.ngdoc : (doclet.kind === 'module' ? 'module' : undefined);
      doclet.type = doclet.kind;

      delete doclet.kind;

      //
      // 4. Parse src and get rid of meta
      //
      var filepath = doclet.meta.path;
      var filename = doclet.meta.filename;

      doclet.src = path.join(path.relative(self.cwd, filepath), filename);
      delete doclet.meta;

      //
      // 5. Create titles and get rid of names
      //
      doclet.title = doclet.name.replace(/'/g, '');
      delete doclet.name;

      // 
      // 6. use slugged names as slugs prepending
      // type except for containers (eg. module, namespace, ...)
      // 
      doclet.slug = (
          (['module', 'namespace'].indexOf(doclet.type) !== -1) ? doclet.type + ':' : ''
        ) + slug(doclet.title).toLowerCase();

      // 
      // 7. Normalize params
      //
      if(doclet.params && _.isArray(doclet.params)) {
        for (var j = 0; j < doclet.params.length; j++) {
          var param = doclet.params[j];
          if (param.type && param.type.names) {
            param.type = param.type.names.join('|');
          } else {
            delete param.type;
          }
        }
      }

      // 
      // 8. Parse and backup refs and deletes
      // longname and memberof
      //
      var ref    = doclet.longname.replace('module:', ''),
          parent = doclet.memberof && doclet.memberof.replace('module:', '');

      delete doclet.memberof;
      delete doclet.longname;
      
      //
      // 9. Transform to orphan nodes
      //
      node = new Node(doclet, _.assign({}, doclet, { 
        docid: ref,
        description: doclet.summary,
        contents: doclet.description
      }));

      delete node.summary;

      //
      // 10. Store refs in ref maps
      //
      refs[ref]         = node;
      parents[ref]      = parent;

      nodes.push(node);
    }
    
    // 
    // 11. Build subtrees from nodeset
    // and ref maps
    // 
    var trees = [];

    for (i = 0; i < nodes.length; i++) {
      node = nodes[i];  
      var parentRef = parents[node.docid],
          parentNode = refs[parentRef];

      if (parentRef && !parentNode) {
        throw(new Error('Unable to find parent doclet \'' + parentRef + '\' for \'' + node.docid + '\''));
      }

      if (parentNode) {
        parentNode.append(node);
      } else {
        trees.push(node);
      }
    }

    refs = parents = null; // allow to free mem

    for (i = 0; i < trees.length; i++) {
      tree = trees[i];

      // 
      // 11. Sort children
      //
      traverse(tree, function(node) {
        node.children = node.children.sortBy(['ngdoc', 'name']);
      });
    }

    for (i = 0; i < trees.length; i++) {
      tree = trees[i];
      // 
      // 12. Outputs trees on pipe 
      //        
      self.push(tree);
    }
    self.push(null);
  });
};

module.exports = function(sources, options) {
  return new DocletsReader(sources, options);
};