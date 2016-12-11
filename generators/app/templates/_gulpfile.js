//
// <%= pkg.name.slug %>
//

'use strict';

var gulp = require('gulp');

var excludeGitignore = require('gulp-exclude-gitignore');


//
// Static 'lint' checking
//
var eslint = require('gulp-eslint');

gulp.task('eslint', function () {
  return gulp
    .src([
      '**/*.js'
    ])
    .pipe(excludeGitignore())
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});


//
// Describe default action
//
gulp.task('default', ['eslint']);
