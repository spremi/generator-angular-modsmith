'use strict';

const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

const proxyquire = require('proxyquire').noCallThru();
const simpleGitMock = require('./simple-git-mock');

const moduleBeingTested = '../generators/service';

//
// Use 'simple-git' mock
//
proxyquire(moduleBeingTested, {'simple-git': simpleGitMock});

describe('generator-angular-modsmith:service', ()  => {
  before(() => {
    return helpers.run(path.join(__dirname, '../generators/service'))
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
      .withPrompts({argName: 'delta-phi'})
      .toPromise();
  });

  it('Creates source file', () => {
    assert.file([
      'src/services/deltaPhi/deltaPhi.service.js'
    ]);
  });

  it('Creates spec file', () => {
    assert.file([
      'src/services/deltaPhi/deltaPhi.service.spec.js'
    ]);
  });
});
