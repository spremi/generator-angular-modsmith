'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');

describe('generator-angular-modsmith:app', () => {
  before(() => {
    return helpers.run(path.join(__dirname, '../generators/app'))
      .withPrompts({
        argName: 'test-mod',
        argDesc: 'Test Module',
        argVersion: '0.0.1',
        argRepo: '',
        argLicense: 'Apache-2.0',
        argRestrict: 'E',
        argBuild: 'gulp',
        argKeywords: ['aa', 'bb', 'cc'],
        argAuthorName: 'Some One',
        argAuthorEmail: 'some@one.two',
        argAuthorHome: '',
        argBowerJson: true
      })
      .toPromise();
  });

  it('Creates README', () => {
    assert.file([
      'README.md'
    ]);
  });

  it('Creates LICENSE', () => {
    assert.file([
      'LICENSE'
    ]);
  });

  it('Creates package.json', () => {
    assert.file([
      'package.json'
    ]);
  });

  it('Creates configuration files for GIT', () => {
    assert.file([
      '.gitattributes',
      '.gitignore'
    ]);
  });

  it('Creates configuration files for ESLINT', () => {
    assert.file([
      '.eslintignore',
      '.eslintrc.js'
    ]);
  });

  it('Creates .editorconfig', () => {
    assert.file([
      '.editorconfig'
    ]);
  });

  it('Creates .npmignore', () => {
    assert.file([
      '.npmignore'
    ]);
  });
});

describe('generator-angular-modsmith:app [grunt])', () => {
  before(() => {
    return helpers.run(path.join(__dirname, '../generators/app'))
      .withPrompts({argBuild: 'grunt'})
      .toPromise();
  });

  it('Creates Gruntfile.js', () => {
    assert.file([
      'Gruntfile.js'
    ]);
  });
});

describe('generator-angular-modsmith:app [gulp]', () => {
  before(() => {
    return helpers.run(path.join(__dirname, '../generators/app'))
      .withPrompts({argBuild: 'gulp'})
      .toPromise();
  });

  it('Creates gulpfile.js', () => {
    assert.file([
      'gulpfile.js'
    ]);
  });
});
