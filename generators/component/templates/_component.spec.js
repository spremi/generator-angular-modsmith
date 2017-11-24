// <%= pkg.name.slug %>
//
// (c) 2016 <%= author.name %> (<%= author.email %>)
//
// SPDX-License-Identifier: <%= pkg.license %>
//                          (http://spdx.org/licenses/<%= pkg.license %>.html)
//


'use strict';

describe('Component: <%= cmp.name.camel %>', function () {

  // Load package containing the component
  beforeEach(module('<%= pkg.name.camel %>'));
<% if (cmp.extTpl) { -%>

  // Load external template
  beforeEach(module('src/components/<%= cmp.name.camel %>/<%= cmp.name.camel %>.html'));
<% } -%>

  var scope;
  var element;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('exists', inject(function ($compile) {
    element = angular.element('<<%= cmp.name.slug %>></<%= cmp.name.slug %>>');
    element = $compile(element)(scope);

    scope.$apply();

    expect(element.text().trim()).toBe('Component: <%= cmp.name.camel %>');
  }));
});
