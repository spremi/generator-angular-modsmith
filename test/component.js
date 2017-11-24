'use strict';
const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

const proxyquire = require('proxyquire').noCallThru();
const simpleGitMock = require('./simple-git-mock');

const moduleBeingTested = '../generators/component';

//
// Use 'simple-git' mock
//
proxyquire(moduleBeingTested, {'simple-git': simpleGitMock});

describe('generator-angular-modsmith:component', () => {
  before(() => {
    return helpers.run(path.join(__dirname, '../generators/component'))
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
        argName: 'fox-trot',
        argExtTpl: true,
        argStyle: true,
        argTransclude: true
      })
      .toPromise();
  });

  it('Creates component file', () => {
    assert.file([
      'src/components/foxTrot/foxTrot.component.js'
    ]);
  });

  it('Creates external template', () => {
    assert.file([
      'src/components/foxTrot/foxTrot.html'
    ]);
  });

  it('Creates stylus file', () => {
    assert.file([
      'src/components/foxTrot/foxTrot.styl'
    ]);
  });

  it('Creates spec file', () => {
    assert.file([
      'src/components/foxTrot/foxTrot.component.spec.js'
    ]);
  });
});

describe('generator-angular-modsmith:component [2]', () => {
  before(() => {
    return helpers.run(path.join(__dirname, '../generators/component'))
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
        argName: 'golf-psi',
        argExtTpl: false,
        argStyle: false,
        argTransclude: false
      })
      .toPromise();
  });

  it('Creates component file', () => {
    assert.file([
      'src/components/golfPsi/golfPsi.component.js'
    ]);
  });

  it('Creates inline template', () => {
    assert.fileContent(
      'src/components/golfPsi/golfPsi.component.js',
      'template: \'<div>Component: golfPsi</div>\''
    );
  });

  it('Doesn\'t create external template', () => {
    assert.noFile([
      'src/components/golfPsi/golfPsi.html'
    ]);
  });

  it('Doesn\'t create stylus file', () => {
    assert.noFile([
      'src/components/golfPsi/golfPsi.styl'
    ]);
  });

  it('Doesn\'t set transclude', () => {
    assert.noFileContent(
      'src/components/golfPsi/golfPsi.component.js',
      'transclude: true'
    );
  });
});
