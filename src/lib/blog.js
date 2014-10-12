module.exports = function(stacktic) {


  stacktic
  .model("Post", function() {
    this.dataSource('fs', {
      src: 'posts/**/*'
    });

    this.parseYfm();
    this.slug('title');
    this.parseDates('created_at');

    this.on('ready', function(Post){
      BlogPage = stacktic.models.BlogPage
      Post.collection = Post.where({published: true}).sortBy('created_at', 'desc');
      pages = Post.paginate(10).merge({title: 'Blog'});
      BlogPage.collection = stacktic.createCollection(pages);
    })
  })

  .model('BlogPage', function(){});

  stacktic
  .controller('Blog', function(Post, BlogPage) {
    
    this.route('/blog/:{$slug}/', Post).render('md').render('hbs').render('toc', {
      container: '.content',
      levels: ['h2', 'h3']
    });
    
    this.route('/blog/')
    .bind(BlogPage.limit(1))
    .context(function(){
      this.blogPages = BlogPage.collection.items
    })
    .render('hbs', {template: 'blog'});

    this.route('/blog/page/:{$page}/')
    .bind(BlogPage.offset(1))
    .context(function(){
      this.blogPages = BlogPage.collection.items
    })
    .render('hbs', {template: 'blog'})

  });

};
