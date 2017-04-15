//
// <%= pkg.name.slug %>
//

'use strict';

var gulp = require('gulp');

var excludeGitignore = require('gulp-exclude-gitignore');
var rename = require('gulp-rename');

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
  },
  stylus: {
    glob: [
    self.src + '/module.styl'
    ],
    config: {
      'include css': true
    }
  },
  autoprefixer: {
    glob: [
    self.tmp + '/module.css'
    ],
    config: {
      browsers: ['last 1 version']
    }
  },
  htmlmin: {
    glob: [
      self.src + '/**/*.html'
    ],
    config: {
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
  ngtemplates: {
    config: {
      module: '<%= pkg.name.camel %>'
    }
  },
  concat: {
    glob: [
      self.src + '/index.js',
      self.src + '/**/*.js',
      '!' + self.src + '/**/*.spec.js',
      self.tmp + '/module-templates.js'
    ],
    target: 'module.concat.js'
  },
  ngAnnotate: {
    glob: [
      self.tmp + '/module.concat.js'
    ],
    config: {
      singleQuotes: true
    },
    target: 'module.annotate.js'
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
// Compile Stylus to CSS
//
var stylus = require('gulp-stylus');

gulp.task('stylus', function () {
  return gulp.src(options.stylus.glob)
    .pipe(stylus(options.stylus.config))
    .pipe(rename('module.css'))
    .pipe(gulp.dest(self.tmp));
});

//
// Post-process generated CSS for vendor specific prefixes
//
var autoprefixer = require('gulp-autoprefixer');

gulp.task('autoprefixer', function () {
  return gulp.src(options.autoprefixer.glob)
    .pipe(autoprefixer(options.autoprefixer.config))
    .pipe(gulp.dest(self.tmp));
});

//
// Minify and cache HTML templates
//
var htmlmin = require('gulp-htmlmin');
var ngtemplates = require('gulp-angular-templates');

gulp.task('ngtemplates', function () {
  return gulp.src(options.htmlmin.glob)
  .pipe(htmlmin(options.htmlmin.config))
  .pipe(ngtemplates(options.ngtemplates.config))
  .pipe(rename('module-templates.js'))
  .pipe(gulp.dest(self.tmp));
});

//
// Concatenate all scripts - including template cache; but excluding test scripts
//
var concat = require('gulp-concat');

gulp.task('concat', function () {
  return gulp.src(options.concat.glob)
    .pipe(concat(options.concat.target))
    .pipe(gulp.dest(self.tmp));
});

//
// Make scripts minification safe
//
var ngAnnotate = require('gulp-ng-annotate');

gulp.task('ngAnnotate', function () {
  return gulp.src(options.ngAnnotate.glob)
    .pipe(ngAnnotate(options.ngAnnotate.config))
    .pipe(rename(options.ngAnnotate.target))
    .pipe(gulp.dest(self.tmp));
});

//
// Describe default action
//
gulp.task('default', ['eslint']);
