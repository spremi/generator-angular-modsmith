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
// Describe default action
//
gulp.task('default', ['eslint']);
