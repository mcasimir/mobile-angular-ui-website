module.exports = function(stacktic) {

  stacktic
  .model("Javascripts", function() {
    this.dataSource('fs', {
      base: 'bower_components',
      src: [ 'jquery/jquery.js',
             'bootstrap/js/affix.js',
             'bootstrap/js/carousel.js',
             'bootstrap/js/transition.js',
             'bootstrap/js/collapse.js',
             'bootstrap/js/modal.js' ]
    });

    this.dataSource('fs', {
      src: [ 'assets/js/expo.js',
             'assets/js/forum.js',
             'assets/js/main.js' ]
    });
  });

  stacktic
  .model("Stylesheets", function() {
      this.dataSource('fs', {
        src: 'assets/less/main.less'
      });
  });

  stacktic
  .model("Streams", function() {
    this.dataSource('fs', {
      base: 'bower_components/roboto-fontface/',
      src: 'fonts/*',
      stream: true
    });

    this.dataSource('fs', {
      base: 'bower_components/fontawesome/',
      src: 'fonts/*',
      stream: true
    });

    this.dataSource('fs', {
      base: 'src/assets/',
      src: 'img/**/*',
      stream: true
    });
  });

  stacktic
  .controller('Assets', function(Stylesheets, Javascripts, Streams) {

    var minify = !! stacktic.config.get('minify');

    this.route("/assets/css/main.css", Stylesheets).render('less', { compress: minify });
    this.route("/assets/js/main.js",

      // concatenate scripts
      Javascripts.reduce(function(acc, item){
        acc.$content = acc.$content + item.$content; return acc;
      }, {$content: ''})

    ).render(minify && 'uglify');

    this.route("/assets/:{$fs.pathFromBase}", Streams).render(false);
  });

};
