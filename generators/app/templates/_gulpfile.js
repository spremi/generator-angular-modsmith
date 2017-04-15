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
// Describe default action
//
gulp.task('default', ['eslint']);
