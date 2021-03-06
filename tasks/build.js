'use strict';

var concat            = require('gulp-concat');
var connect           = require('gulp-connect');
var del               = require('del');
var less              = require('gulp-less');
var path              = require('path');
var seq               = require('run-sequence');
var uglify            = require('gulp-uglify');
var cssmin            = require('gulp-cssmin');
var frontMatter       = require('gulp-front-matter');
var _                 = require('lodash');
var htmlmin           = require('gulp-htmlmin');
var sitemap           = require('gulp-sitemap');
var docgen            = require('../lib/gulp-docgen');
var tree              = require('../lib/gulp-tree');
var render            = require('../lib/render');
var toc               = require('../lib/toc');
var examples          = require('../lib/examples');
var yfm               = function() {
  return frontMatter({property: 'data'});
};

module.exports = function(gulp, config) {

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
    return gulp.src(config.assets.fonts)
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
    .pipe(less({paths: config.assets.less}))
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
    return gulp.src(config.assets.js)
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
          docgen('node_modules/mobile-angular-ui/src/js',
            {
              cwd: 'node_modules/mobile-angular-ui/'
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

        .pipe(require('../lib/through').fn(function(stream, obj, done) {

          obj.traverse(function(child) {
            child.children = _.sortBy(child.children, ['position','ngdoc', 'name']);
          });

          stream.push(obj);
          done();
        }))

        .pipe(render({
          cwd: path.resolve(__dirname, '../templates'),
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

  gulp.task('demo', [], function() {
    return gulp.src([
      'node_modules/mobile-angular-ui/demo/**/*',
      'node_modules/mobile-angular-ui/dist/**/*'
    ], {base: 'node_modules/mobile-angular-ui/'})
        .pipe(gulp.dest('out'));
  });

  gulp.task('examples', [], function() {
    return gulp.src(['node_modules/mobile-angular-ui/examples/**/*'], {base: 'node_modules/mobile-angular-ui/'})
        .pipe(examples())
        .pipe(gulp.dest('out'));
  });

  gulp.task('version', [], function() {
    VERSION = require('../package').dependencies['mobile-angular-ui'];
  });

  gulp.task('public', function() {
    return gulp.src(['public/**/*'], {base: 'public/'})
      .pipe(gulp.dest('out'));
  });

  /*======================================
  =            Build Sequence            =
  ======================================*/

  gulp.task('build', ['sources'], function(done) {
    seq(['clean'], ['demo', 'examples', 'version'], ['img', 'css', 'fonts',  'js', 'gen', 'public'], 'sitemap', done);
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
      del('node_modules/mobile-angular-ui', function() {
        gulp.src(['../mobile-angular-ui/src/js/**/*',
                  '../mobile-angular-ui/demo/**/*',
                  '../mobile-angular-ui/examples/**/*',
                  '../mobile-angular-ui/dist/**/*',
                  '../mobile-angular-ui/bower.json'],
                  {base: '../mobile-angular-ui'})
            .pipe(gulp.dest('node_modules/mobile-angular-ui'))
            .on('end', function() {
              console.log('Mobile Angular UI Updated');
              done();
            });
      });
    } else {
      require('child_process').exec('npm i --save --save-exact mobile-angular-ui@latest', function(err) {
        if (err) {
          throw new Error('unable to update mobile-angular-ui');
        }
        console.log('Mobile Angular UI updated');
        done();
      });
    }
  });
};
