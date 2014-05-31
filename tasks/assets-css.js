module.exports = function(grunt){

  grunt.loadNpmTasks("grunt-contrib-clean");
  grunt.loadNpmTasks("grunt-contrib-less");
  grunt.loadNpmTasks("grunt-contrib-cssmin");

  grunt.registerTask('assets:css', function(){

    grunt.config.set('less.css', {
      options: {
        paths: ["src/assets/less", "bower_components"]
      },
      files: {
        "output/assets/css/main.css": "src/assets/less/main.less",
      }
    });

    grunt.config.set('cssmin.css', {
      options: {
        report: 'min'
      },
      expand: true,
      cwd: 'output/assets/css/',
      src: ['*.css', '!*.min.css'],
      dest: 'output/assets/css/',
      ext: '.min.css'
    });

    grunt.task.run('less:css');
    grunt.task.run('cssmin:css');

  });
};
