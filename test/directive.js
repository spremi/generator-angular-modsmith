'use strict';

const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

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
