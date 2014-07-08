module.exports = function(stacktic) {

  stacktic
  .model("Post", function() {
    this.dataSource('fs', {
      src: 'posts/**/*'
    });
    this.parseYfm();
    this.slug('title');
  });

  stacktic
  .controller('Blog', function() {
    var posts = this.models.Post.sortBy('created_at', 'desc');
    var blogPages = this.context.blogPages = posts.paginate(10).merge({title: 'Blog'});

    this.route('/blog/:{$slug}/', posts).render('md').render('hbs');
    this.route('/blog/', blogPages.limit(1)).render('hbs', {template: 'blog'});
    this.route('/blog/page/:{$page}/', blogPages.offset(1)).render('hbs', {template: 'blog'});
  });

};
