// JSHint stuffs:
/* global console: false, __dirname: false */

/*========================================
=            Requiring stuffs            =
========================================*/

var gulp              = require('gulp'),
    concat            = require('gulp-concat'),
    connect           = require('gulp-connect'),
    del               = require('del'),
    less              = require('gulp-less'),
    path              = require('path'),
    rename            = require('gulp-rename'),
    seq               = require('run-sequence'),
    uglify            = require('gulp-uglify'),
    csso              = require('gulp-csso'),
    frontMatter       = require('gulp-front-matter'),
    bower             = require('bower'),
    deploy            = require('gulp-gh-pages'),
    docgen            = require('./lib/gulp-docgen'),
    tree              = require('./lib/gulp-tree'),
    render            = require('./lib/render'),
    yfm               = function() {
      return frontMatter({property: 'data'});
    };


/*==============================
=            Config            =
==============================*/

var config = require('./config');

/*=============================
=            Globs            =
=============================*/

var GLOBS = {};
GLOBS.fonts                 = ['bower_components/font-awesome/fonts/fontawesome-webfont.*', 
                               'bower_components/roboto-fontface/fonts/*'];
GLOBS.vendorLess            = [ 
  path.resolve(__dirname, 'src/less'), 
  path.resolve(__dirname, 'bower_components') 
];

GLOBS.js = ['jquery/jquery.js',
            'bootstrap/js/affix.js',
            'bootstrap/js/carousel.js',
            'bootstrap/js/transition.js',
            'bootstrap/js/collapse.js',
            'bootstrap/js/modal.js' ].map(function(lib) {
              return 'bower_components/' + lib;
            }).concat([ 
            'assets/js/expo.js',
            'assets/js/forum.js',
            'assets/js/main.js' 
            ]);

/*================================================
=            Report Errors to Console            =
================================================*/

gulp.on('error', function(e) {
  throw(e);
});

/*=========================================
=            Clean dest folder            =
=========================================*/

gulp.task('clean', function (cb) {
  del(['out/**'], cb);
});

/*==========================================
=            Web servers                   =
==========================================*/

gulp.task('connect', function() {
  connect.server({
    root: 'out',
    host: '0.0.0.0',
    port: 3002,
    livereload: true
  });
});

/*==============================================================
=            Setup live reloading on source changes            =
==============================================================*/

gulp.task('livereload', function () {
  return gulp.src('out/**')
    .pipe(connect.reload());
});


/*===================================
=            Copy assets            =
===================================*/

gulp.task('fonts', function() {
  return gulp.src(GLOBS.fonts)
  .pipe(gulp.dest('out/assets/fonts'));
});

gulp.task('img', function(done) {
  return gulp.src('assets/img/**/*')
  .pipe(gulp.dest('out/assets/img'));
});

/*===============================================================
=            Compile and minify less                            =
===============================================================*/

gulp.task('css', function(done) {

  return gulp.src('assets/less/main.less')
  .pipe(less({paths: GLOBS.vendorLess}))
  .pipe(csso())
  .pipe(gulp.dest('out/assets/css'))
  .on('error', function(e) {
    throw e;
  });

});

/*=============================================
=            Compile and minify js            =
==============================================*/

gulp.task('js', function(done) {
  return gulp.src(GLOBS.js)
  .pipe(concat('main.js'))
  .pipe(uglify())
  .pipe(gulp.dest('out/assets/js'));
});

/*============================
=            Docs            =
============================*/

gulp.task('gen', ['sources'], function() {

  return gulp.src('home.md', {cwd: 'contents/pages'})
      .pipe(yfm())
      .pipe(tree.root({ type: 'home', slug: '' })) // creates a tree for each file
      
      .pipe(tree.append(
        docgen('bower_components/mobile-angular-ui/src/js', 
          {
            cwd: 'bower_components/mobile-angular-ui/'
          }
        ), 
        { 
          title: config.title + ' Docs', 
          slug: 'docs' 
        }
      ))

      .pipe(tree.append(
          gulp.src(['**', '!home.md'], {cwd: 'contents/pages'})
              .pipe(yfm()),
          { type: 'page' }
        )
      )

      .pipe(tree.append(
          gulp.src('**', {cwd: 'contents/guides'})
              .pipe(yfm()),
          { type: 'guide', parent: '/docs' }
        )
      )

      .pipe(tree.append(
          gulp.src('**', {cwd: 'contents/tutorials'})
              .pipe(yfm()),
          { type: 'tutorial', parent: '/docs' }
        )
      )

      .pipe(render({
        cwd: path.resolve(__dirname, 'templates'),
        allow: function(node) {
          return ['module',
                  'guide',
                  'tutorial',
                  'page',
                  'home',
                  'post'].indexOf(node.type) !== -1;
        }
      }))

      .pipe(gulp.dest('out'));
});

/*===================================================================
=            Watch for source changes and rebuild/reload            =
===================================================================*/

gulp.task('watch', function() {
  gulp.watch(
    ['templates/**/*', 'assets/**/*', 'contents/**/*'], 
    ['build']
  );
});

/*======================================
=            Build Sequence            =
======================================*/

gulp.task('build', function(done){
  seq('clean', ['img', 'css', 'fonts',  'js', 'gen'], 'livereload', done);
});

/*====================================
=            Default Task            =
====================================*/

gulp.task('default', ['build','watch', 'connect']);

/*==============================
=            Bower             =
==============================*/

gulp.task('sources', function(done) {
  if (process.env['ENV'] === 'development') {
    del('bower_components/mobile-angular-ui', function() {
      gulp.src('src/js/**/*', {cwd: '../master'})
          .pipe(gulp.dest('bower_components/mobile-angular-ui/src/js'))
          .on('end', function() {
            console.log("Mobile Angular UI bower Updated");
            done();
          });      
    })
  } else {
    bower.commands.update(['mobile-angular-ui']).on('end', function () {
      console.log("Mobile Angular UI bower Updated");
      done();
    });
  }
})

/*==============================
=            Deploy            =
==============================*/

gulp.task('deploy', ['clean', 'bower'], function () {
    return gulp.src('out/**/*')
      .pipe(deploy({ remoteUrl: 'git@github.com:mcasimir/mobile-angular-ui.git' }));
});