//
// <%= pkg.name.slug %>
//
// (c) <%= (new Date).getFullYear() %> <%= author.name %> (<%= author.email %>)
//
// SPDX-License-Identifier: <%= pkg.license %>
//                          (http://spdx.org/licenses/<%= pkg.license %>.html)
//


'use strict';

describe('Module: <%= pkg.name.camel %>', function () {

  // Load application module
  beforeEach(module('<%= pkg.name.camel %>'));

  var scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('exists', inject(function ($compile) {
    expect(scope).toBeDefined();
  }));
});
