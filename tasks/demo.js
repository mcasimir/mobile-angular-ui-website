module.exports = function(grunt){

  grunt.loadNpmTasks("grunt-contrib-copy");

  grunt.registerTask('demo', function(){

    grunt.config.set('copy.demo', {
      expand: true,
      cwd: "src/demo/",
      src: ["**"],
      dest: "output/demo/"
    });

    grunt.config.set('copy.demoAssets', {
      expand: true,
      cwd: "bower_components/mobile-angular-ui/dist/",
      src: ["**"],
      dest: "output/dist"
    });

    grunt.task.run('copy:demo');
    grunt.task.run('copy:demoAssets');

  });
};
