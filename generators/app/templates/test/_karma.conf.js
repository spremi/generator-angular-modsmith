//
// <%= pkg.name.slug %>
//
// Karma Configuration
//

module.exports = function (config) {
  config.set({

    //
    // Base path for all patterns in this configuration
    //
    basePath: '..',

    //
    // Frameworks to use
    // (See: https://npmjs.org/browse/keyword/karma-adapter)
    //
    frameworks: ['jasmine'],

    //
    // Browsers to be used for testing
    // (See: https://npmjs.org/browse/keyword/karma-launcher)
    //
    browsers: ['PhantomJS'],

    //
    // Files to be served in the browser
    //
    files: [
      'node_modules/angular/angular.js',
      'node_modules/angular-mocks/angular-mocks.js',
      'node_modules/angular-cookies/angular-cookies.js',
      'node_modules/angular-resource/angular-resource.js',
      'node_modules/angular-route/angular-route.js',
      'node_modules/angular-sanitize/angular-sanitize.js',
      'src/index.js',
      'src/**/*.js',
      'src/**/*.html',
      'src/**/*.spec.js',
      'test/main.js'
    ],

    //
    // Files to be excluded
    //
    exclude: [
    ],

    //
    // Files to pre-process before serving to the browser and the preprocessor
    // (See: https://npmjs.org/browse/keyword/karma-preprocessor)
    //
    preprocessors: {
      'src/**/*.html': ['ng-html2js']
    },

    //
    // Reporter for test results
    // (See: https://npmjs.org/browse/keyword/karma-reporter)
    //
    reporters: ['progress'],

    //
    // Port used by the web server
    //
    port: 9876,

    //
    // Enable colors in the logs and reporter output
    //
    colors: true,

    //
    // Log level
    // (Options: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG)
    //
    logLevel: config.LOG_INFO,

    //
    // Don't execute tests automatically after any change to the file
    //
    autoWatch: false,

    //
    // Capture browser, execute tests and exit
    //
    singleRun: true,

    //
    // Number of browsers that may be launched concurrently
    //
    concurrency: Infinity
  });
};
