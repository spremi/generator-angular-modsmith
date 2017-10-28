'use strict';

const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

describe('generator-angular-modsmith:factory', function () {
  before(function () {
    return helpers.run(path.join(__dirname, '../generators/factory'))
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
      .withPrompts({argName: 'echo-tau'})
      .toPromise();
  });

  it('Creates source file', () => {
    assert.file([
      'src/factories/echoTau/echoTau.factory.js'
    ]);
  });

  it('Creates spec file', () => {
    assert.file([
      'src/factories/echoTau/echoTau.factory.spec.js'
    ]);
  });
});
