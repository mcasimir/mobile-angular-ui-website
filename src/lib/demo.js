module.exports = function(stacktic) {

  stacktic
  .model("Demo", function() {
    this.dataSource('fs', {
      base: 'bower_components/mobile-angular-ui',
      src: ['demo/**/*', 'dist/**/*'],
      stream: true
    });
  })

  .controller('Demo', function(Demo){
    this.route("/:{$fs.pathFromBase}", Demo).render(false);
  });

};
