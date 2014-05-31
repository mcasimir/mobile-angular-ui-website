module.exports = function(grunt){

  grunt.loadNpmTasks("grunt-contrib-copy");

  grunt.registerTask('assets:fonts', function(){

    grunt.config.set('copy.fonts', {
      expand: true,
      cwd: "src/assets/fonts/",
      src: ["**"],
      dest: "output/assets/fonts/"
    });
    grunt.task.run('copy:fonts');

  });
};
