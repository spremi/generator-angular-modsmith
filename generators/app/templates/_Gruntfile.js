//
// mod-smith
//


'use strict';

module.exports = function (grunt) {
  //
  // Load grunt tasks
  //
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-stylus');
  grunt.loadNpmTasks('grunt-eslint');
  grunt.loadNpmTasks('grunt-injector');

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
    // Inject files
    //
    injector: {
      options: {
        relative: true,
        addRootSlash: false
      },

      stylus: {
        options: {
          transform: function (filePath) {
            return '@import \'' + filePath + '\';';
          },
          starttag: '// injector:stylus:begin',
          endtag: '// injector:stylus:end'
        },
        files: {
          'src/module.styl': [
            '<%%= self.src %>/**/*.styl',
            '!<%%= self.src %>/module.styl'
          ]
        }
      }
    },

    //
    // Compiles Stylus to CSS
    //
    stylus: {
      compile: {
        options: {
          paths: [ '<%%= self.src %>' ],
          'include css': true
        },
        files: {
          '<%%= self.tmp %>/module.css' : '<%%= self.src %>/module.styl'
        }
      }
    },

    //
    // Post-process generated CSS for vendor specific prefixes
    //
    autoprefixer: {
      options: {
        browsers: ['last 1 version']
      },
      dist: {
        files: [{
          expand: true,
          cwd: '<%%= self.tmp %>',
          src: '{,*/}*.css',
          dest: '<%%= self.tmp %>'
        }]
      }
    },

    //
    // Static code checker
    //
    eslint: {
      target: [
        '<%%= self.src %>/**/*.js'
      ]
    }
  });


  //
  // Default task
  //
  grunt.registerTask('default', ['eslint']);
};
