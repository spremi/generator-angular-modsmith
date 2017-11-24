'use strict';

const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

const proxyquire = require('proxyquire').noCallThru();
const simpleGitMock = require('./simple-git-mock');

const moduleBeingTested = '../generators/directive';

//
// Use 'simple-git' mock
//
proxyquire(moduleBeingTested, {'simple-git': simpleGitMock});

describe('generator-angular-modsmith:directive', () => {
  before(() => {
    return helpers.run(path.join(__dirname, '../generators/directive'))
      .withLocalConfig({
        pkg: {
          name: {
            orig: 'test-mod',
            slug: 'test-mod',
            camel: 'testMod'
          },
          desc: 'Test Module',
          version: '0.0.1',
          repo: '',
          license: 'Apache-2.0',
          keywords: [
            'key', 'word'
          ]
        },
        author: {
          name: 'Some One',
          email: 'some@one.two',
          url: ''
        }
      })
      .withPrompts({
        argName: 'alpha-beta',
        argExtTpl: true,
        argStyle: true,
        argLinkFn: true,
        argRestrict: 'E'
      })
      .toPromise();
  });

  it('Creates source file', () => {
    assert.file([
      'src/directives/alphaBeta/alphaBeta.directive.js'
    ]);
  });

  it('Creates external template', () => {
    assert.file([
      'src/directives/alphaBeta/alphaBeta.html'
    ]);
  });

  it('Creates stylus file', () => {
    assert.file([
      'src/directives/alphaBeta/alphaBeta.styl'
    ]);
  });

  it('Creates spec file', () => {
    assert.file([
      'src/directives/alphaBeta/alphaBeta.directive.spec.js'
    ]);
  });
});

describe('generator-angular-modsmith:directive [2]', () => {
  before(() => {
    return helpers.run(path.join(__dirname, '../generators/directive'))
      .withLocalConfig({
        pkg: {
          name: {
            orig: 'test-mod',
            slug: 'test-mod',
            camel: 'testMod'
          },
          desc: 'Test Module',
          version: '0.0.1',
          repo: '',
          license: 'Apache-2.0',
          keywords: [
            'key', 'word'
          ]
        },
        author: {
          name: 'Some One',
          email: 'some@one.two',
          url: ''
        }
      })
      .withPrompts({
        argName: 'mu-pi',
        argExtTpl: false,
        argStyle: false,
        argLinkFn: false
      })
      .toPromise();
  });

  it('Creates directive file', () => {
    assert.file([
      'src/directives/muPi/muPi.directive.js'
    ]);
  });

  it('Creates inline template', () => {
    assert.fileContent(
      'src/directives/muPi/muPi.directive.js',
      'template: \'<div>Directive: muPi</div>\''
    );
  });

  it('Doesn\'t create external template', () => {
    assert.noFile([
      'src/directives/muPi/muPi.html'
    ]);
  });

  it('Doesn\'t create stylus file', () => {
    assert.noFile([
      'src/directives/muPi/muPi.styl'
    ]);
  });

  it('Doesn\'t set transclude', () => {
    assert.noFileContent(
      'src/directives/muPi/muPi.directive.js',
      'transclude: true'
    );
  });
});
