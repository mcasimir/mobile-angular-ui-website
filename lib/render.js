/* global module: true, process: false */

'use strict';

var through = require('./through');
var vinylFile = require('./vinylFile');
var path = require('path');
var _ = require('lodash');
var Node = require('./Node');
var traverse = require('./traverse');
var swig = require('swig');
var swigTraverse = require('swig-traverse');
var markedSwig = require('swig-marked');
var highlightJs = require('highlight.js');
var glob = require('glob');

markedSwig.configure({
    gfm: true,
    tables: true,
    sep: '\n',
    highlight: function(code, lang) {
      if (lang) {
        return highlightJs.highlight(lang, code).value;
      } else {
        return highlightJs.highlightAuto(code).value;
      }
    }
  });

markedSwig.useFilter(swig);
markedSwig.useTag(swig);
swigTraverse(swig);

module.exports = function(config) {
  swig.invalidateCache();
  var templates = {};

  config = _.defaults(config, {
    cwd: process.cwd(),
    templates: '**/*.swig',
    defaultTemplate: 'page.swig',
    allow: function() { return true; },
    configureSwig: function() {},
    configureMarked: function() {},
    context: function(node) { return {node: node}; },
    dest: function(node) {
      return node.path + '/index.html';
    },
    getTemplate: function(node) {
      var defaultTemplate = this.defaultTemplate;
      var template = node.template;

      if (!templates[template]) {
        if (defaultTemplate) {
          template = defaultTemplate;
        } else {
          throw new Error('Template: `' + template + '` not found. For node `' + node.path + '`');
        }
      }

      return template;
    }
  });

  config.configureSwig(swig);
  config.configureSwig(markedSwig);

  glob.sync(config.templates, {cwd: config.cwd}).forEach(function(file) {
    var absfile = path.resolve(config.cwd, file);
    templates[file] = swig.compileFile(absfile);
  });

  return through(function(tree, enc, done) {
    if (!(tree instanceof Node)) { this.push(tree); return done(); }

    var self = this;

    try {
      traverse(tree, function(node) {
        if (config.allow(node)) {
          var templatePath  = config.getTemplate(node);
          var template      = templates[templatePath];
          var html;

          if (!template) {
            throw new Error('Unable to find template `' + templatePath + '` for node: `' + node.path + '`');
          }

          html = template(config.context(node));

          self.push(vinylFile(
                      config.dest(node),
                      html
                    ));
        }
      });
    } catch (e) {
      done(e);
    }

    done();
  });
};
