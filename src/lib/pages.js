module.exports = function(stacktic) {

  stacktic

  .model('BowerInfo', function(){
    this.dataSource('bower-info', {
      pkg: "mobile-angular-ui"
    });
  })

  .model("Doc", function() {
    this.dataSource('fs', {
      src: 'docs/**/*'
    });
  })

  .model("Page", function() {
    this.dataSource('fs', {
      src: 'pages/**/*'
    });
    this.parseYfm();
    this.slug('title');
  })

  .controller('Pages', function(context, BowerInfo, Page) {

    this.route("/")
        .bind(Page.where({ $fs: { basename: 'home.hbs' } }))
        .context({
          isHome: true,
          version: BowerInfo.first().latest.version
        });

    this.route("/:{$slug}/")
        .bind(Page.reject({ $fs: { basename: 'home.hbs' } }))
        .render('hbs')
        .render('toc', {
          container: '.content',
          levels: ['h2', 'h3']
        });
  });

};
