'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');

describe('generator-angular-modsmith:service', function () {
  before(function () {
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

  it('Creates source file', function () {
    assert.file([
      'src/services/deltaPhi/deltaPhi.service.js'
    ]);
  });

  it('Creates spec file', function () {
    assert.file([
      'src/services/deltaPhi/deltaPhi.service.spec.js'
    ]);
  });
});
