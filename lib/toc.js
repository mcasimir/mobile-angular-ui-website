'use strict';

var cheerio;
var defaults;
var slug;
var through;
var _;

cheerio = require('cheerio');

slug = require('slug');

_ = require('lodash');

through = require('./through');

defaults = {
  target: '.toc',
  container: 'body',
  levels: ['h2', 'h3', 'h4'],
  listElem: 'ul',
  itemElem: 'li',
  listClass: 'nav',
  itemClass: 'toc<%= level %> toc-<%= node.toctype || "item" %>',
  anchorFn: function(elem) {
    var id;
    id = elem.attr('id');
    if (!id) {
      id = slug(elem.attr('data-toc-title') || elem.text()).toLowerCase();
      elem.attr('id', id);
    }
    return '#' + id;
  }
};

module.exports = function(options) {
  return through(function(file, enc, done) {
    var $;
    var container;
    var content;
    var findParent;
    var headers;
    var selector;
    var target;
    var tree;
    var visitNode;
    content = file.contents.toString();
    options = _.defaults(options, defaults);
    $ = cheerio.load(content);
    target = $(options.target);
    container = $(options.container);
    if (!(target.length && container.length && options.levels.length)) {
      this.push(file);
      return done();
    }
    selector = options.levels.join(',');
    headers = $(container).find(selector);
    tree = {
      parent: null,
      children: [],
      level: 0
    };
    findParent = function(node, lvl) {
      if (node.level < lvl) {
        return node;
      } else {
        if (node.parent === null) {
          throw new Error('Something went wrong it should not get here. This is a bug.');
        }
        return findParent(node.parent, lvl);
      }
    };
    headers.each(function() {
      var e;
      var i;
      var last;
      var lvl;
      var parent;
      var _i;
      var _ref;
      var _results;
      e = $(this);
      _results = [];
      for (i = _i = 0, _ref = options.levels.length; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
        selector = options.levels[i];
        lvl = i + 1;
        last = tree.children[tree.children.length - 1];
        if (e.is(selector)) {
          if (lvl === 1 || !last) {
            _results.push(tree.children.push({
              parent: tree,
              elem: e,
              title: e.attr('data-toc-title') || e.text(),
              children: [],
              level: lvl,
              toctype: e.attr('data-toc-type')
            }));
          } else {
            parent = findParent(last, lvl);
            _results.push(parent.children.push({
              parent: parent,
              elem: e,
              title: e.attr('data-toc-title') || e.text(),
              children: [],
              level: lvl,
              toctype: e.attr('data-toc-type')
            }));
          }
        } else {
          _results.push(void 0);
        }
      }
      return _results;
    });
    visitNode = function(node) {
      var classAttr;
      var classVal;
      var res;
      var ul;
      classVal = _.template(options.itemClass, {
        level: node.level,
        title: node.title,
        node: node
      });
      if (!_.isEmpty(classVal)) {
        classAttr = ' class=\'' + classVal + '\'';
      }
      res = $('<' + options.itemElem + (classAttr || '') +
        '><a href=\'' + (options.anchorFn(node.elem)) + '\'>' +
          node.title + '</a></' + options.itemElem + '>');
      if (node.children.length) {
        classVal = _.template(options.listClass, {
          level: node.level,
          title: node.title
        });
        if (!_.isEmpty(classVal)) {
          classAttr = ' class=\'' + classVal + '\'';
        }
        ul = $('<' + options.listElem + (classAttr || '') + ' />');
        node.children.forEach(function(child) {
          return ul.append(visitNode(child));
        });
        res.append(ul);
      }
      return res;
    };
    tree.children.forEach(function(child) {
      return target.append(visitNode(child));
    });
    file.contents = new Buffer($.html());
    this.push(file);
    return done();
  });
};
