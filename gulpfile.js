var gulp   = require('gulp'),
  stacktic = require('../../stackticjs/stacktic'),
  connect  = require('gulp-connect'),
  rimraf   = require('rimraf'),
  bower    = require('bower'),
  through2 = require('through2'),
  deploy   = require("gulp-gh-pages");


function runStacktic(options, done) {
  stacktic({
    src: 'src',
    dest: 'out',
    host: 'http://mobileangularui.com/',
    site_title: "Mobile Angular UI",
    site_tagline: "Angular JS Mobile UI framework with Bootstrap 3 Css",
    minify: (!! options.minify),
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
}

gulp.on('err', function(e) {
  console.log(e.err.stack);
});

gulp.task('clean', function (cb) {
  rimraf('./out', cb);
});

gulp.task('stacktic', ['clean'], function(done) {
  runStacktic({minify:false}, done);
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

gulp.task('deploy', ['clean'], function (done) {
  console.log("Updating Mobile Angular UI bower ...");
  bower.commands.update(['mobile-angular-ui']).on('end', function (installed) {
    console.log("Done updating Mobile Angular UI bower");
    console.log("Building website ...");
    runStacktic({minify:true}, function(){
      console.log("Done building website");
      console.log("Deploying ...");
      var deployer = gulp.src("./out/**/*").pipe(deploy({
        remoteUrl: 'git@github.com:mcasimir/mobile-angular-ui.git'
      }));
      deployer.on('end', function(){
        console.log("DONE.");
        done();
      });
      deployer.pipe(through2.obj(function(file, enc, callback){
        console.log('deployer', file);
        callback();
      }));
    });
  });
});

gulp.task('default', ['stacktic','connect', 'watch']);
