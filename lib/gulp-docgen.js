'use strict';

var stream    = require('stream');
var path      = require('path');
var exec     = require('child_process').execSync;
var util      = require('util');
var slug      = require('slug');
var _         = require('lodash');
var Node      = require('./Node');

var JSDOC_BIN  = path.resolve(__dirname, '../node_modules/jsdoc/jsdoc.js');
var JSDOC_CONF = path.resolve(__dirname, 'jsdoc-conf.json');

slug.defaults.modes.pretty = {
  replacement: '-',
  symbols: true,
  remove: null,
  charmap: slug.charmap,
  multicharmap: slug.multicharmap
};

slug.defaults.mode = 'pretty';

function DocletsReader(sources, options) {
  stream.Readable.call(this, {objectMode: true});

  options = options || {};
  this.cwd = options.cwd || process.cwd();
  this.srcDir = sources;
  this.done = false;
}

util.inherits(DocletsReader, stream.Readable);

DocletsReader.prototype._read = function() {
  if (this.done) { return null; }
  this.done = true;

  var self = this;
  var sources = path.resolve(process.cwd(), this.srcDir);
  var command = [JSDOC_BIN, '-r', sources, '-c', JSDOC_CONF, '-X'].join(' ');
  exec(`${command} > jsdoc.out.tmp.json`);
  var i;
  var doclets = require('../jsdoc.out.tmp');

  //
  // 1. drop undocumented and packages
  //
  doclets = doclets.filter(function(doclet) {
    return !(doclet.undocumented || doclet.kind === 'package');
  });

  var refs = {};
  var parents = {};
  var nodes = [];
  var node;
  var tree;

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
    doclet.type = doclet.kind === 'function' && doclet.ngdoc !== 'directive' ? 'method' : doclet.kind;

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
    doclet.shortTitle = doclet.shortname || doclet.title;
    delete doclet.name;
    delete doclet.shortname;

    //
    // 6. use slugged names as slugs prepending
    // type except for containers (eg. module, namespace, ...)
    //
    doclet.slug = (
        (['module', 'namespace'].indexOf(doclet.type) !== -1) ? doclet.type + ':' : ''
      ) + slug(doclet.title).toLowerCase();

    var j;
    //
    // 7. Normalize params properties and returns
    //
    if (doclet.params && _.isArray(doclet.params)) {
      for (j = 0; j < doclet.params.length; j++) {
        var param = doclet.params[j];
        if (param.type && param.type.names) {
          param.type = param.type.names.join(' | ');
        } else {
          delete param.type;
        }
      }
    }

    if (doclet.properties && _.isArray(doclet.properties)) {
      for (j = 0; j < doclet.properties.length; j++) {
        var property = doclet.properties[j];
        if (property.type && property.type.names) {
          property.type = property.type.names.join(' | ');
        } else {
          delete property.type;
        }
      }
    }

    if (doclet.returns) {
      doclet.returns = doclet.returns[0];
      if (doclet.returns.type) {
        doclet.returns.type = (doclet.returns.type.names || []).join(' | ');
      }
    }

    //
    // 8. Parse and backup refs and deletes
    // longname and memberof
    //
    var ref    = doclet.longname.replace('module:', '');
    var parent = doclet.memberof && doclet.memberof.replace('module:', '');

    delete doclet.memberof;
    delete doclet.forceMemberof;
    delete doclet.longname;

    //
    // 9. Transform to orphan nodes
    //
    node = new Node(doclet, _.assign({}, doclet, {docid: ref}));
    node.description = doclet.summary;
    node.contents = doclet.description || '';
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
    var parentRef = parents[node.docid];
    var parentNode = refs[parentRef];

    if (parentRef && !parentNode) {
      throw(new Error('[gulp-docgen] Unable to find parent doclet \'' + parentRef + '\' for \'' + node.docid + '\''));
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
    // 11. Outputs trees on pipe
    //
    self.push(tree);
  }
  self.push(null);
};

module.exports = function(sources, options) {
  return new DocletsReader(sources, options);
};
