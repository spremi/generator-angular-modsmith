//
// mod-smith
//


'use strict';

module.exports = function (grunt) {
  //
  // Load grunt tasks
  //
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-eslint');

  grunt.initConfig({
    //
    // Package definition
    //
    pkg: grunt.file.readJSON('package.json'),

    //
    // Common module definitions
    //
    self: {
      src: './src',
      dst: './dist',
      tmp: './.tmp'
    },

    //
    // Clean directories
    //
    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '<%%= self.tmp %>/*',
            '<%%= self.dst %>/*'
          ]
        }]
      }
    },

    //
    // Static code checker
    //
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
