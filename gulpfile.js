var gulp   = require('gulp'),
  stacktic = require('../../stackticjs/stacktic'),
  connect  = require('gulp-connect'),
  rimraf   = require('rimraf'),
  bower    = require('bower'),
  deploy   = require("gulp-gh-pages");

gulp.on('err', function(e) {
  console.log(e.err.stack);
});

gulp.task('clean', function (cb) {
  rimraf('./out', cb);
});

gulp.task('stacktic', ['clean'], function(done) {
  stacktic({
    src: 'src',
    dest: 'out',
    host: 'http://mobileangularui.com/',
    site_title: "Mobile Angular UI",
    site_tagline: "Angular JS Mobile UI framework with Bootstrap 3 Css",
    minify: true,
    less: {
      paths: ['bower_components', 'src/assets/less']
    }
  })
  .use('./src/lib/bower-info')
  .use('./src/lib/helpers')
  .use('./src/lib/pages')
  .use('./src/lib/blog')
  .use('./src/lib/demo')
  .use('./src/lib/assets')
  .use('./src/lib/sitemap')
  .use('./src/lib/cname')
  .build(done);
});

gulp.task('connect', function() {
  connect.server({
    root: 'out',
    livereload: true
  });
});

gulp.task('livereload', function () {
  gulp.src('./out/*.html')
    .pipe(connect.reload());
});

gulp.task('watch', function () {
  gulp.watch(['./out/*.html'], ['livereload']);
  gulp.watch(['./src/**/*'], ['stacktic']);
});

gulp.task('bower-update', function (done) {
  bower.commands
  .update(['mobile-angular-ui'])
  .on('end', function (installed) {
    done();
  });
});

gulp.task('deploy', [ 'bower-update', 'stacktic'], function () {
    gulp.src("./out/**/*")
        .pipe(deploy({
          remoteUrl: 'git@github.com:mcasimir/mobileangularui.git'
        }));
});

gulp.task('default', ['stacktic','connect', 'watch']);
