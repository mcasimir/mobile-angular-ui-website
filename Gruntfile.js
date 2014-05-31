module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),
    clean: {
      output: [ 'output' ]
    },

    connect: {
      server: {
        options: {
          hostname: '0.0.0.0',
          port: 8000,
          base: [ 'output' ],
          keepalive: true
        }
      }
    },
    
    watch: {

      assemble: {
        files: ["src/**/*",
                '!*src/assets/**/*'],
        tasks: ['newer:assemble']
      },

      js: {
        files: ["src/assets/js/**/*"],
        tasks: ['assets:js']
      },

      css: {
        files: ["src/assets/less/**/*"],
        tasks: ['assets:css']
      },

      img: {
        files: ["src/assets/img/**/*"],
        tasks: ['assets:img']
      },

      fonts: {
        files: ["src/assets/fonts/**/*"],
        tasks: ['assets:fonts']
      }

    },

    assets: {
      src: 'src/assets',
      dest: 'output/assets'
    },

    assemble: {
      options: {
        layout:   "src/layouts/default.hbs",
        partials: "src/partials/**/*.hbs",
        helpers:  "src/helpers/**/*.js",
        data:     "src/config.json",
        collections: [{
          name: 'posts',
          inflection: 'post'
        }]
      },
      pages: {
        files: [{
          cwd: 'src/pages/',
          dest: 'output/',
          expand: true,
          src: '**/*.hbs'
        }]
      },
      posts: {
        files: [{
          cwd: 'src/posts/',
          dest: 'output/blog/',
          expand: true,
          src: '**/*.hbs'
        }]
      }
    },

    concurrent: {
      all: {
        tasks: ['connect', 'watch' ],
        options: {
          limit: 2,
          logConcurrentOutput: true
        }
      }
    },

    'gh-pages': {
      options: {
        base: 'output'
      },
      src: ['**']
    }
  });

  
  grunt.loadNpmTasks('assemble');
  grunt.loadNpmTasks('grunt-newer');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks("grunt-contrib-clean");
  grunt.loadNpmTasks("grunt-concurrent");
  
  grunt.loadTasks("tasks");
   
  grunt.registerTask("default", [ 'build', "concurrent" ]);
  grunt.registerTask('build', [ 'clean:output',
                                'demo',
                                'version',
                                'newer:assemble',
                                'assets:vendor',
                                'assets:js',
                                'assets:css',
                                "assets:img",
                                "assets:fonts"
                              ]);

  grunt.registerTask("deploy", ['build', 'gh-pages']);
};