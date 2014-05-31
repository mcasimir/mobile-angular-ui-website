var bower = require('bower');

module.exports = function(grunt){
  grunt.registerTask('version', function(){

    var jsonDataPath = 'src/config.json',
        data     = grunt.file.readJSON(jsonDataPath),
        oldVersion = data.version,
        taskDone = this.async();


    bower.commands.info("mobile-angular-ui", "version", {}).on('end', function(currentVersion){
      data.version = currentVersion;
      if (currentVersion == oldVersion) {
        grunt.log.ok('Stored version is already ' + currentVersion + ', nothing to do.');
      } else {
        grunt.file.write(jsonDataPath, JSON.stringify(data, null, 2));
        grunt.log.ok('Stored version updated to ' + currentVersion);
      }
      taskDone();
    });
  });
};