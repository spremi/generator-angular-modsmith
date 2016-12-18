// <%= pkg.name.slug %>
//
// (c) 2016 <%= author.name %> (<%= author.email %>)
//
// SPDX-License-Identifier: <%= pkg.license %>
//                          (http://spdx.org/licenses/<%= pkg.license %>.html)
//


'use strict';

describe('Directive: <%= dtv.name.camel %>', function () {

  // Load package containing the directive
  beforeEach(module('<%= pkg.name.camel %>'));
<% if (dtv.extTpl) { -%>

  // Load external template
  beforeEach(module('src/directives/<%= dtv.name.camel %>/<%= dtv.name.camel %>.html'));
<% } -%>

  var scope;
  var element;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('exists', inject(function ($compile) {
    element = angular.element('<<%= dtv.name.slug %>></<%= dtv.name.slug %>>');
    element = $compile(element)(scope);

    scope.$apply();

    expect(element.text().trim()).toBe('Directive: <%= dtv.name.camel %>');
  }));
});
