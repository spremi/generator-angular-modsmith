'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');

describe('generator-angular-modsmith:app', function () {
  before(function () {
    return helpers.run(path.join(__dirname, '../generators/app'))
      .withPrompts({someAnswer: true})
      .toPromise();
  });

  it('Creates README', function () {
    assert.file([
      'README.md'
    ]);
  });

  it('Creates LICENSE', function () {
    assert.file([
      'LICENSE'
    ]);
  });

  it('Creates package.json', function () {
    assert.file([
      'package.json'
    ]);
  });

  it('Creates configuration files for GIT', function () {
    assert.file([
      '.gitattributes',
      '.gitignore'
    ]);
  });

  it('Creates configuration files for ESLINT', function () {
    assert.file([
      '.eslintignore',
      '.eslintrc.js'
    ]);
  });

  it('Creates .editorconfig', function () {
    assert.file([
      '.editorconfig'
    ]);
  });

  it('Creates .npmignore', function () {
    assert.file([
      '.npmignore'
    ]);
  });

  it('Creates gulpfile.js', function () {
    assert.file([
      'gulpfile.js'
    ]);
  });
});
