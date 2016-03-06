'use strict';

// JSHint stuffs:
/* global console, __dirname, JSON */

/*========================================
=            Requiring stuffs            =
========================================*/

var gulp              = require('gulp');
var concat            = require('gulp-concat');
var connect           = require('gulp-connect');
var del               = require('del');
var less              = require('gulp-less');
var path              = require('path');
var fs                = require('fs');
var seq               = require('run-sequence');
var uglify            = require('gulp-uglify');
var cssmin            = require('gulp-cssmin');
var frontMatter       = require('gulp-front-matter');
var _                 = require('lodash');
var bower             = require('bower');
var htmlmin           = require('gulp-htmlmin');
var deploy            = require('gulp-gh-pages');
var sitemap           = require('gulp-sitemap');
var docgen            = require('./lib/gulp-docgen');
var tree              = require('./lib/gulp-tree');
var render            = require('./lib/render');
var toc               = require('./lib/toc');
var examples          = require('./lib/examples');
var yfm               = function() {
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
            'bootstrap/js/tab.js',
            'bootstrap/js/transition.js',
            'bootstrap/js/collapse.js',
            'bootstrap/js/modal.js'].map(function(lib) {
              return 'bower_components/' + lib;
            }).concat([
              'assets/js/expo.js',
              'assets/js/forum.js',
              'assets/js/main.js'
            ]);

var VERSION;

/*================================================
=            Report Errors to Console            =
================================================*/

gulp.on('error', function(e) {
  throw(e);
});

/*=========================================
=            Clean dest folder            =
=========================================*/

gulp.task('clean', function(cb) {
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

gulp.task('livereload', function() {
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

gulp.task('img', function() {
  return gulp.src('assets/img/**/*')
  .pipe(gulp.dest('out/assets/img'));
});

/*===============================================================
=            Compile and minify less                            =
===============================================================*/

gulp.task('css', function() {

  return gulp.src('assets/less/main.less')
  .pipe(less({paths: GLOBS.vendorLess}))
  .pipe(cssmin())
  .pipe(gulp.dest('out/assets/css'))
  .pipe(connect.reload())
  .on('error', function(e) {
    throw e;
  });

});

/*=============================================
=            Compile and minify js            =
==============================================*/

gulp.task('js', function() {
  return gulp.src(GLOBS.js)
  .pipe(concat('main.js'))
  .pipe(uglify())
  .pipe(gulp.dest('out/assets/js'))
  .pipe(connect.reload());
});

/*============================
=            Docs            =
============================*/

gulp.task('gen', ['demo', 'examples', 'version'], function() {

  return gulp.src('home.md', {cwd: 'contents/pages'})
      .pipe(yfm())
      .pipe(tree.root({type: 'home', slug: ''})) // creates a tree for each file

      .pipe(tree.append(
          gulp.src(['**', '!home.md'], {cwd: 'contents/pages'})
              .pipe(yfm()),
          {data: {type: 'page'}}
        )
      )

      .pipe(tree.append(
        docgen('bower_components/mobile-angular-ui/src/js',
          {
            cwd: 'bower_components/mobile-angular-ui/'
          }
        ),
        {
          parent: '/docs',
          data: {
            template: 'docs/doc.swig'
          }
        }
      ))

      .pipe(tree.append(
          gulp.src('**', {cwd: 'contents/posts'})
              .pipe(yfm()),
          {parent: '/blog', data: {
            type: 'post',
            template: 'blog/post.swig'
          }}
        )
      )

      .pipe(tree.append(
          gulp.src('**', {cwd: 'contents/apps'})
              .pipe(yfm()),
          {parent: '/apps', data: {type: 'app'}}
        )
      )

      .pipe(tree.append(
          gulp.src('**', {cwd: 'contents/guides'})
              .pipe(yfm()),
          {parent: '/docs', data: {type: 'guide', template: 'docs/doc.swig'}}
        )
      )

      .pipe(tree.append(
          gulp.src('**', {cwd: 'contents/components'})
              .pipe(yfm()),
          {parent: '/docs', data: {type: 'component', template: 'docs/doc.swig'}}
        )
      )

      .pipe(tree.append(
          gulp.src('**', {cwd: 'contents/tutorials'})
              .pipe(yfm()),
          {parent: '/docs', data: {type: 'tutorial', template: 'docs/doc.swig'}}
        )
      )

      .pipe(require('./lib/through').fn(function(stream, obj, done) {

        obj.traverse(function(child) {
          child.children = _.sortBy(child.children, ['position','ngdoc', 'name']);
        });

        stream.push(obj);
        done();
      }))

      .pipe(render({
        cwd: path.resolve(__dirname, 'templates'),
        allow: function(node) {
          return node.published !== false && [
                  'module',
                  'guide',
                  'tutorial',
                  'page',
                  'home',
                  'post',
                  'component',
                  'app'].indexOf(node.type) !== -1;
        },
        context: function(node) {
          return {
                  node: node,
                  config: config,
                  version: VERSION,
                  slug: require('slug'),
                  _: require('lodash'),
                  stripOptionParams: function(params) {
                    return !params.filter ? params : params.filter(function(p) {
                      return p.name.indexOf('.') === -1;
                    });
                  },
                  inspect: require('util').inspect,
                  path: path
                };
        }
      }))
      .pipe(toc({
          container: '.content',
          levels: ['h2', 'h3', 'h4']
        }))
      .pipe(htmlmin({
        collapseWhitespace: true
      }))
      .pipe(gulp.dest('out'))
      .pipe(connect.reload());
});

/*===============================
=            Sitemap            =
===============================*/

gulp.task('sitemap', function() {
  return gulp.src('out/**/*.html')
        .pipe(sitemap({
          siteUrl: config.host,
          lastmod: false
        }))
        .pipe(gulp.dest('./out'));
});

/*===================================================================
=            Watch for source changes and rebuild/reload            =
===================================================================*/

gulp.task('watch', function() {
  if (process.env.ENV === 'dev') {
    gulp.watch(['../mobile-angular-ui/src/**/*', '../mobile-angular-ui/demo/**/*', '../mobile-angular-ui/examples/**/*'], ['sources', 'gen']);
  }
  gulp.watch(['templates/**/*', 'contents/**/*'], ['gen']);
  gulp.watch(['assets/img/**/*'], ['img']);
  gulp.watch(['assets/less/**/*'], ['css']);
  gulp.watch(['assets/js/**/*'], ['js']);
});

/*============================
=            Demo            =
============================*/

gulp.task('demo', ['sources'], function() {
  return gulp.src([
    'bower_components/mobile-angular-ui/demo/**/*',
    'bower_components/mobile-angular-ui/dist/**/*'
  ], {base: 'bower_components/mobile-angular-ui/'})
      .pipe(gulp.dest('out'));
});

gulp.task('examples', ['sources'], function() {
  return gulp.src(['bower_components/mobile-angular-ui/examples/**/*'], {base: 'bower_components/mobile-angular-ui/'})
      .pipe(examples())
      .pipe(gulp.dest('out'));
});

gulp.task('version', ['sources'], function() {
  var bowerJson = JSON.parse(fs.readFileSync('bower_components/mobile-angular-ui/bower.json', {encoding: 'utf8'}));
  VERSION = bowerJson.version;
});

gulp.task('public', function() {
  return gulp.src(['public/**/*'], {base: 'public/'})
    .pipe(gulp.dest('out'));
});

/*======================================
=            Build Sequence            =
======================================*/

gulp.task('build', function(done) {
  seq(['clean', 'sources'], ['demo', 'examples', 'version'], ['img', 'css', 'fonts',  'js', 'gen', 'public'], 'sitemap', done);
});

/*====================================
=            Default Task            =
====================================*/

gulp.task('default', ['build', 'watch', 'connect']);

/*================================
=            Sources             =
================================*/

gulp.task('sources', function(done) {
  if (process.env.ENV === 'dev') {
    del('bower_components/mobile-angular-ui', function() {
      gulp.src(['../mobile-angular-ui/src/js/**/*',
                '../mobile-angular-ui/demo/**/*',
                '../mobile-angular-ui/examples/**/*',
                '../mobile-angular-ui/dist/**/*',
                '../mobile-angular-ui/bower.json'],
                {base: '../mobile-angular-ui'})
          .pipe(gulp.dest('bower_components/mobile-angular-ui'))
          .on('end', function() {
            console.log('Mobile Angular UI bower Updated');
            done();
          });
    });
  } else {
    bower.commands.update(['mobile-angular-ui']).on('end', function() {
      console.log('Mobile Angular UI bower Updated');
      done();
    });
  }
});

/*==============================
=            Deploy            =
==============================*/

gulp.task('_do_deploy', function() {
  return gulp.src('out/**/*')
    .pipe(deploy({remoteUrl: 'git@github.com:mcasimir/mobile-angular-ui.git'}));
});

gulp.task('deploy', function(done) {
  seq('build', '_do_deploy', done);
});
