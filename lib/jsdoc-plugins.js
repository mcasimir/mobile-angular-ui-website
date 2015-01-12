var _ = require('lodash');

var RESTRICT_EXPAND_MAP = {
  'C': 'class',
  'E': 'element',
  'A': 'attribute'
};

// Adds support for:
// 
// @as TYPE
// @ngdoc TYPE
// @service NAME
// @directive NAME
// @restrict EAC
// @scoped
// @requires
// @transclude
// 
module.exports = {
  defineTags: function(dictionary) {

    dictionary.defineTag('as', {
      mustHaveValue: true,
      onTagged : function(doclet, tag) {
        doclet.addTag('kind', tag.value);
      }
    });

    dictionary.defineTag('ngdoc', {
      mustHaveValue: true,
      onTagged : function(doclet, tag) {
        doclet.addTag('kind', tag.value === 'method' ? 'function' : 'class');
        doclet.ngdoc = tag.value;
        if (tag.value === 'directive') {
          doclet.directive = _.extend({
            priority: 0,
            transclude: false,
            scope: false,
            require: [],
            restrict: ['attribute']
          }, doclet.directive || {});
        }
      }
    });

    dictionary.defineTag('service', {
      mustHaveValue: true,
      onTagged : function(doclet, tag) {
        doclet.addTag('kind', tag.value === 'method' ? 'function' : 'class');
        doclet.addTag('name', tag.value);
        doclet.ngdoc = 'service';
      }
    });

    dictionary.defineTag('directive', {
      mustHaveValue: true,
      onTagged : function(doclet, tag) {
        doclet.addTag('name', tag.value);
        doclet.addTag('kind', tag.value === 'method' ? 'function' : 'class');
        doclet.ngdoc = 'directive';
        doclet.directive = _.extend({
          priority: 0,
          transclude: false,
          scope: false,
          require: [],
          restrict: ['attribute']
        }, doclet.directive || {});
      }
    });

    dictionary.defineTag('restrict', {
      mustHaveValue: true,
      onTagged : function(doclet, tag) {  
        if (!doclet.directive) { return; } 

        var value = tag.value.split('').map(function(letter) {
          return RESTRICT_EXPAND_MAP[letter];
        }).filter(function(v) {
          return v;
        });

        if (value.length) {
          doclet.directive.restrict = value;
        }
      }
    });

    dictionary.defineTag('priority', {
      mustHaveValue: true,
      onTagged : function(doclet, tag) {
        if (!doclet.directive) { return; }
        doclet.directive.priority = parseInt(value);
      }
    });

    dictionary.defineTag('transclude', {
      onTagged : function(doclet, tag) {
        if (!doclet.directive) { return; }
        doclet.directive.transclude = true;
      }
    });

    dictionary.defineTag('scoped', {
      onTagged : function(doclet, tag) {
        if (!doclet.directive) { return; }
        doclet.directive.scope = true;
      }
    });

    dictionary.defineTag('requires', {
      mustHaveValue: true,
      onTagged : function(doclet, tag) {
        if (!doclet.directive) { return; }
        doclet.directive.require = doclet.directive.require.concat(tag.value.split(/ *, */));
      }
    });
  }
};