//
// mod-smith
//


'use strict';

module.exports = function (grunt) {
  //
  // Load grunt plugins - just-in-time
  //
  require('jit-grunt')(grunt, {
    'ngtemplates': 'grunt-angular-templates'
  });

  //
  // Display execution time of the tasks
  //
  require('time-grunt')(grunt);

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
    // Banner to be used in minified files
    //
    banner: '/* <%= pkg.name.slug %> v<%%= pkg.version %> | ' +
            '<%%= grunt.template.today("yyyy-mm-dd") %> | ' +
            '<%= author.name %> (<%= author.email %>) | ' +
            '<%= pkg.license %> */\n',

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
    // Minify and cache HTML templates
    //
    ngtemplates: {
      options: {
        module: '<%= pkg.name.camel %>',
        htmlmin: {
          collapseBooleanAttributes:      true,
          collapseWhitespace:             true,
          keepClosingSlash:               true,
          removeAttributeQuotes:          true,
          removeComments:                 true,
          removeEmptyAttributes:          true,
          removeRedundantAttributes:      true,
          removeScriptTypeAttributes:     true,
          removeStyleLinkTypeAttributes:  true
        }
      },
      main: {
        src:  '<%%= self.src %>/**/*.html',
        dest: '<%%= self.tmp %>/module-templates.js'
      }
    },

    //
    // Concatenate all scripts - including template cache; but excluding test scripts
    //
    concat: {
      main: {
        src: [
          '<%%= self.src %>/index.js',
          '<%%= self.src %>/**/*.js',
          '!<%%= self.src %>/**/*.spec.js' ,
          '<%%= self.tmp %>/module-templates.js'
        ],
        dest: '<%%= self.tmp %>/module.concat.js'
      }
    },

    //
    // Make scripts minification safe
    //
    ngAnnotate: {
      options: {
        singleQuotes: true
      },
      dist: {
        files:  {
          '<%%= self.tmp %>/module.annotate.js' : '<%%= self.tmp %>/module.concat.js'
        }
      }
    },

    //
    // Uglify the script
    //
    uglify: {
      options: {
        preserveComments: 'some',
        banner: '<%%= banner %>'
      },
      main: {
        files: [
          {
            src:'<%%= self.tmp %>/module.annotate.js',
            dest:'<%%= self.tmp %>/module.min.js'
          }
        ]
      }
    },

    //
    // Minify styleshets
    //
    cssmin: {
      main: {
        files: {
          '<%%= self.tmp %>/module.min.css': '<%%= self.tmp %>/module.css'
        }
      }
    },

    //
    // Copy files to distribution directory
    //
    copy: {
      main: {
        files: [
          {
            src:'<%%= self.tmp %>/module.css',
            dest:'<%%= self.dst %>/<%= pkg.name.slug %>.css'
          },
          {
            src:'<%%= self.tmp %>/module.min.css',
            dest:'<%%= self.dst %>/<%= pkg.name.slug %>.min.css'
          },
          {
            src:'<%%= self.tmp %>/module.annotate.js',
            dest:'<%%= self.dst %>/<%= pkg.name.slug %>.js'
          },
          {
            src:'<%%= self.tmp %>/module.min.js',
            dest:'<%%= self.dst %>/<%= pkg.name.slug %>.min.js'
          }
        ]
      }
    },

    //
    // Static code checker
    //
    eslint: {
      target: [
        '<%%= self.src %>/**/*.js'
      ]
    },

    //
    // Unit testing
    //
    karma: {
      unit: {
        configFile: 'test/karma.conf.js'
      }
    }
  });


  //
  // Build the module
  //
  grunt.registerTask('build', [
    'clean',
    'injector',
    'stylus',
    'autoprefixer',
    'ngtemplates',
    'concat',
    'ngAnnotate',
    'uglify',
    'cssmin',
    'copy'
  ]);

  //
  // Default task
  //
  grunt.registerTask('default', ['eslint']);
};
