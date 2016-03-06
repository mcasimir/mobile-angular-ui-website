'use strict';

var jshint        = require('gulp-jshint');
var jscs          = require('gulp-jscs');
var seq           = require('gulp-sequence');

module.exports = function(gulp) {

  gulp.task('jscs', function() {
    return gulp.src(['./client/**/*.js', './server/**/*.js', './test/**/*.js', './*.js'])
      .pipe(jscs())
      .pipe(jscs.reporter())
      .pipe(jscs.reporter('fail'));
  });

  gulp.task('jshint', function() {
    return gulp.src(['./client/**/*.js', './server/**/*.js', './test/**/*.js', './*.js'])
      .pipe(jshint())
      .pipe(jshint.reporter())
      .pipe(jshint.reporter('fail'));
  });

  gulp.task('lint', seq('jshint', 'jscs'));

};
