module.exports = function(grunt){

  grunt.loadNpmTasks("grunt-contrib-copy");

  grunt.registerTask('assets:img', function(){

    grunt.config.set('copy.img', {
      expand: true,
      cwd: "src/assets/img/",
      src: ["**"],
      dest: "output/assets/img/"
    });
    grunt.task.run('copy:img');

  });
};
