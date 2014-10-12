module.exports = function(stacktic) {

  stacktic
  .controller('Sitemap', function(Page, Post, App, BlogPage, AppsPage) {
    
    this.route("/sitemap.xml")
    .render( 'sitemap', {
      items: Page.collection
              .concat(BlogPage.collection)
              .concat(Post.collection)
              .concat(AppsPage.collection)
              .concat(App.collection)
    });
  });

};
