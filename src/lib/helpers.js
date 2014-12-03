module.exports = function(stacktic){
  var Handlebars = stacktic.renderers.engines['hbs'].Handlebars;

  Handlebars.registerHelper('config', function(propname){
    return stacktic.config.get(propname);
  });

  Handlebars.registerHelper('url', function(path){
    return require('url').resolve(stacktic.config.get('host'), (path || '/'));
  });

  Handlebars.registerHelper('feature', function(src, options){
    var res = '<section class="feature row">';

    if (options.hash.inverted) {
      res += '<div class="col-sm-4 col-sm-push-8 feature-figure"><img src="' + src + '"></img></div>';
      res += '<div class="col-sm-8 col-sm-pull-4 feature-text">' + Handlebars.helpers.md.call(this, options) + '</div>';
    } else {
      res += '<div class="col-sm-4 feature-figure"><img src="' + src + '"></img></div>';
      res += '<div class="col-sm-8 feature-text">' + Handlebars.helpers.md.call(this, options) + '</div>';
    }

    res += "</section>";
    return new Handlebars.SafeString(res);
  });

  Handlebars.registerHelper('doc', function(src){
    sec = stacktic.models.Doc.where({$fs:{ pathFromBase: 'docs/' + src + ".md" }}).first();
    if (sec) {
      return new Handlebars.SafeString(sec.$content + '\n');
    } else {
      throw new Error('Can\'t find doc: ' + src);
    }
  });

};
