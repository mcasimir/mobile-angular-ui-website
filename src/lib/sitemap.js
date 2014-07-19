module.exports = function(stacktic) {

  stacktic
  .controller('Sitemap', function(Page, Post, BlogPages) {
    this.route("/sitemap.xml")
    .render( 'sitemap', {
      items: Page.concat(Post).concat(BlogPages)
    });
  });

};
