//
// <%= pkg.name.slug %>
//

'use strict';

var gulp = require('gulp');

var excludeGitignore = require('gulp-exclude-gitignore');

//
// Path to common directories
//
var self = {
  src: 'src',
  dst: 'dist',
  tmp: '.tmp'
};

//
// Options to various tasks
//
var options = {
  eslint: {
    glob: [
      self.src + '/**/*.js',
      'test/main.js'
    ]
  },
  clean: {
    glob: [
      self.dst + '/*',
      self.tmp + '/*'
    ]
  },
  inject: {
    stylus: {
      glob: [
      self.src + '/**/*.styl',
      '!' + self.src + '/module.styl'
      ],
      config: {
        relative: true,
        addRootSlash: false,
        transform: function (filePath) {
          return '@import \'' + filePath + '\';';
        },
        starttag: '// injector:stylus:begin',
        endtag: '// injector:stylus:end',
      }
    }
  }
};

//
// Static 'lint' checking
//
var eslint = require('gulp-eslint');

gulp.task('eslint', function () {
  return gulp.src(options.eslint.glob)
    .pipe(excludeGitignore())
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});


//
// Clean directories
//
var clean = require('gulp-clean');

gulp.task('clean', function () {
  return gulp.src(options.clean.glob, { read: false })
    .pipe(clean());
});

//
// Inject files
//
var inject = require('gulp-inject');

gulp.task('inject-stylus', function () {
  return gulp.src(self.src + '/module.styl')
    .pipe(inject(gulp.src(options.inject.stylus.glob, { read: false }), options.inject.stylus.config))
    .pipe(gulp.dest(self.src));
});


//
// Describe default action
//
gulp.task('default', ['eslint']);
