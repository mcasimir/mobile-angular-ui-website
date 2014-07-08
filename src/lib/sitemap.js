module.exports = function(stacktic) {

  stacktic
  .controller('Sitemap', function() {
    this.route("/sitemap.xml")
    .context(function(){
      this.$sitemapItems = stacktic.models.Page.collection.concat(stacktic.models.Post.collection).concat(stacktic.context.blogPages);
    })
    .render( 'sitemap' );
  });

};
