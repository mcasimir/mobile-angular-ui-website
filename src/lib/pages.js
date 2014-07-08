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


  .controller('Pages', function() {
    this.context.version = this.models.BowerInfo.first().latest.version;
    this.context.nav = this.models.Page.where({
      nav: true
    });

    this.route("/", this.models.Page.where({
      slug: "home"
    })).render('hbs').context({
      isHome: true
    });

    this.route("/:{$slug}/", this.models.Page.reject({
      slug: "home"
    })).render('hbs').render('toc', {
      container: '.content',
      levels: ['h2', 'h3']
    });

  });

};
