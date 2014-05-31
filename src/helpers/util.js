module.exports.register = function (Handlebars, options, params)  {
  var path = require('path');

  Handlebars.registerHelper('page_url', function (page)  {
    var base = path.resolve(this.config.base_dir),
        dest = path.resolve(page.dest);
    return (path.join(this.config.base_url, dest.slice(base.length))).replace(/\/index.html$/, "/");
  });

  Handlebars.registerHelper('site_url', function (str_path)  {
    return path.join(this.config.base_url, str_path);
  });


};