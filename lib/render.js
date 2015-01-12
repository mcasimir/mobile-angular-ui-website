/* global module: true, process: false */

var through = require('./through'),
    vinylFile = require('./vinylFile'),
    path = require('path'),
    _ = require('lodash'),
    Node = require('./Node'),
    traverse = require('./traverse'),
    swig = require('swig'),
    swigTraverse = require('swig-traverse'),
    markedSwig = require('swig-marked'),
    highlightJs = require('highlight.js'),
    glob = require('glob');

swig.setDefaults({ cache: false });

markedSwig.configure({
    gfm: true,
    tables: true,
    sep: "\n",
    highlight: function(code) {
      return highlightJs.highlightAuto(code).value;
    }
  });

markedSwig.useFilter( swig );
markedSwig.useTag( swig );
swigTraverse( swig );


swig.setTag(
  'pathfor',

  function(str, line, parser, types) { // parse
    parser.on(types.VAR, function (token) { 
      this.out.push(token.match); 
    });
    return true;
  },

  function (compiler, args) { // compile
    return ';(function(){ return "/" + _ctx.' + args[0] + '.path' + ' + "/index.html"; })();';
  },

  false
);


module.exports = function(config) {
  var templates = {};

  config = _.defaults(config, {
    cwd: process.cwd(),
    templates: '**/*.swig',
    defaultTemplate: 'page.swig',
    allow: function() { return true; },
    configureSwig: function() {},
    configureMarked: function() {},
    context: function(node) { return {node: node} },
    dest: function(node) {
      return node.path + '/index.html';
    },
    getTemplate: function(node) {
      var defaultTemplate = this.defaultTemplate,
          typeTemplate = node.type + '.swig';

      if (!templates[typeTemplate]) {
        if(defaultTemplate){
          typeTemplate = defaultTemplate;
        } else {
          typeTemplate = undefined;
        }
      }

      return typeTemplate;
    }
  });

  config.configureSwig(swig);
  config.configureSwig(markedSwig);

  glob.sync(config.templates, {cwd: config.cwd}).forEach(function(file) {
    templates[file] = swig.compileFile(path.resolve(config.cwd, file));
  });

  return through(function(tree, enc, done) {
    if (! tree instanceof Node) { this.push(tree); return done(); }
    
    var self = this;

    try {
      traverse(tree, function(node) {
        if (config.allow(node)) {
          var templatePath  = config.getTemplate(node),
              template      = templates[templatePath],
              html;

          if (!template) {
            throw new Error('Unable to find template `'+ templatePath +'` for node: `' + node.path + '`');
          }

          html = template(config.context(node));

          self.push( vinylFile(
                      config.dest(node), 
                      html            
                    ));
        }
      });

    } catch(e) {
      done(e);
    }

    done();
  });
};
