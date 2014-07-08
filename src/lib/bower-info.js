var bower = require('bower');

module.exports = function(stacktic){
  stacktic.registerDataSourceDriver('bower-info', function(options, done) {
    bower.commands.info('mobile-angular-ui').on('end', function(data){
      done(null, [data]);
    });
  });
};
