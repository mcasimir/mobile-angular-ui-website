/* global module: true */

var through = require('./through'),
    vinylFile = require('./vinylFile'),
    cheerio = require('cheerio'),
    path = require('path'),
    _ = require('lodash'),
    highlightJs = require('highlight.js'),
    entities = new (require('html-entities').Html5Entities)();

var highlight = function(lang, code) {
  return highlightJs.highlight(lang, code).value;
};

var trimEmptyLines = function(string) {
  return string.replace(/^( *\n)+/g, '').replace(/( *\n *)+$/g, '');
};

var normalizeIndent = function(string) {
  var i, line, m;
  var lines = string.split('\n');
  var normalizedLines = [];
  var overIndent = Infinity;
  for (i = 0; i < lines.length; i++) {
    line = lines[i];
    m = line.match(/^ +/);
    if(m && !line.match(/^ +\n$/)) {
      if (m[0].length < overIndent) {
        overIndent = m[0].length;
      }
    } else {
      overIndent = 0;
      break;
    }
  }
  if (overIndent === Infinity || overIndent === 0) {
    return string;
  }

  for (i = 0; i < lines.length; i++) {
    line = lines[i];
    normalizedLines.push(line.substr(overIndent));
  }

  return normalizedLines.join('\n');
}

var stripCdata = function(string) {
  return string.replace(/^\/\/ *\<\!\[CDATA\[/, '').replace(/\/\/ *\]\]\>\s*$/, '');
};

var decodeEntities = function(string) {
  return entities.decode(string);
};

var renderCode = function(lang, string) {
  return highlight(lang, normalizeIndent(trimEmptyLines(stripCdata(decodeEntities(string)))));
};

module.exports = function() {
  return through(function(file, enc, done) {
    var manifest = {};
    $ = cheerio.load(file.contents.toString());

    manifest.title = $('title').text();
    var $js   = $('#example-js'),
        $css  = $('#example-css'),
        $html = $('#example-html');

    manifest.tabs = [];

    if ($html.length) {
      manifest.tabs.push({
        type: 'html', 
        code: renderCode('html', $html.html())
      });
    }

    if ($js.length) {
      manifest.tabs.push({
        type: 'js', 
        code: renderCode('js', $js.html())
      });
    }

    if ($css.length) {
      manifest.tabs.push({
        type: 'css', 
        code: renderCode('css', $css.html())
      });
    }

    var dest = path.relative(file.base, file.path) + '.json';
    this.push(vinylFile(dest, JSON.stringify(manifest, null, 4)));
    this.push(file);
    done();
  });
};