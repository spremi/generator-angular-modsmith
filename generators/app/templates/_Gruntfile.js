//
// mod-smith
//


'use strict';

module.exports = function (grunt) {
  //
  // Load grunt tasks
  //
  grunt.loadNpmTasks('grunt-eslint');

  grunt.initConfig({
    eslint: {
      target: [
        'src/**/*.js'
      ]
    }
  });


  //
  // Default task
  //
  grunt.registerTask('default', ['eslint']);
};
