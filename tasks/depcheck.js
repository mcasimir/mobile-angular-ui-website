'use strict';

module.exports = function(gulp) {

  gulp.task('depcheck:require-strict', function() {
    let pkg = require('../package');

    let nonStrictDeps = getNonStrictDeps(pkg.dependencies)
      .concat(getNonStrictDeps(pkg.devDependencies));

    if (nonStrictDeps.length) {
      return Promise.reject(new Error(`The following dependencies are not strict:\n${nonStrictDeps.join('\n')}`));
    } else {
      return Promise.resolve();
    }
  });

  gulp.task('depcheck', ['depcheck:require-strict'], require('gulp-depcheck')({
    ignoreDirs: ['client', 'public'],
    ignoreMatches: assetsModules().concat([])
  }));

  function assetsModules() {
    return [];
  }
};

function getNonStrictDeps(deps) {
  let errors = [];

  Object.keys(deps)
    .forEach(function(depName) {
      let depVersion = deps[depName];
      let url = require('url').parse(depVersion);
      if (url.protocol) {
        depVersion = url.hash && url.hash.replace(/^#v?/, '') || '';
      }
      if (!depVersion[0].match(/[0-9]/)) {
        errors.push(depName);
      }
    });

  return errors;
}
