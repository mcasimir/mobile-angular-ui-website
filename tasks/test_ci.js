'use strict';

module.exports = function(gulp) {
  gulp.task('test:ci', ['depcheck', 'lint']);
};
