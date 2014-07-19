module.exports = function(stacktic) {


  stacktic
  .model("Post", function() {
    this.dataSource('fs', {
      src: 'posts/**/*'
    });

    this.parseYfm();
    this.slug('title');

    this.on('ready', function(Post){
      BlogPage = stacktic.models.BlogPage
      Post.collection = Post.sortBy('created_at', 'desc');
      pages = Post.paginate(10).merge({title: 'Blog'});
      BlogPage.collection = stacktic.createCollection(pages);
    })
  })

  .model('BlogPage', function(){});

  stacktic
  .controller('Blog', function(Post, BlogPage) {
    this.route('/blog/:{$slug}/', Post).render('md').render('hbs');
    this.route('/blog/', BlogPage.limit(1)).render('hbs', {template: 'blog'});
    this.route('/blog/page/:{$page}/', BlogPage.offset(1)).render('hbs', {template: 'blog'});
  });

};
