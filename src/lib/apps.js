module.exports = function(stacktic) {


  stacktic
  .model("App", function() {
    this.dataSource('fs', {
      src: 'apps/**/*'
    });

    this.parseYfm();
    this.slug('title');
    this.parseDates('created_at');

    this.on('ready', function(App){
      AppsPage = stacktic.models.AppsPage
      App.collection = App.where({published: true}).sortBy('created_at', 'desc');
      pages = App.paginate(10).merge(
        {
          title: 'Apps made with Mobile Angular UI',
          description: 'A showcase of applications made with Mobile Angular Ui'
        });
      AppsPage.collection = stacktic.createCollection(pages);
    })
  })

  .model('AppsPage', function(){});

  stacktic
  .controller('Apps', function(App, AppsPage) {
    
    this.route('/app-showcase/:{$slug}/', App).render('md').render('hbs').render('toc', {
      container: '.content',
      levels: ['h2', 'h3']
    });
    
    this.route('/app-showcase/')
    .bind(AppsPage.limit(1))
    .context(function(){
      this.appsPages = AppsPage.collection.items
    })
    .render('hbs', {template: 'apps'});

    this.route('/app-showcase/page/:{$page}/')
    .bind(AppsPage.offset(1))
    .context(function(){
      this.appsPages = AppsPage.collection.items
    })
    .render('hbs', {template: 'apps'})

  });

};
