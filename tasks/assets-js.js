module.exports = function(grunt){

  grunt.loadNpmTasks("grunt-contrib-clean");
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks("grunt-contrib-uglify");

  // 
  grunt.registerTask('assets:vendor', function(){
    grunt.config.set('uglify.vendor', {
      files: {
        "tmp/vendor.min.js" : [ 
          'bower_components/jquery/dist/jquery.min.js',
          'bower_components/bootstrap/dist/js/bootstrap.min.js',
          'bower_components/toc/dist/toc.min.js',
          'bower_components/jquery-cookie/jquery.cookie.js'
         ]
      }
    });

    grunt.task.run('uglify:vendor');
  });

  // 
  grunt.registerTask('assets:js', function(){

    grunt.config.set('uglify.js', {
      files: {
        "tmp/main.min.js" : [ 
          'src/assets/js/lib/*.js',
          "src/assets/js/main.js"
        ]
      }
    });

    grunt.config.set('concat.js', {
      dest: "output/assets/js/main.min.js",
      src: [
        'tmp/vendor.min.js',
        'tmp/main.min.js'
      ]
    });

    grunt.task.run('uglify:js');
    grunt.task.run('concat:js');

  });
  
};