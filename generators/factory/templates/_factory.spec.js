// <%= pkg.name.slug %>
//
// (c) <%= (new Date).getFullYear() %> <%= author.name %> (<%= author.email %>)
//
// SPDX-License-Identifier: <%= pkg.license %>
//                          (http://spdx.org/licenses/<%= pkg.license %>.html)
//


'use strict';

describe('Factory: <%= fct.name.camel %>', function () {

  // Load package containing the factory
  beforeEach(module('<%= pkg.name.camel %>'));

  var <%= fct.name.camel %>;

  beforeEach(inject(function (_<%= fct.name.camel %>_) {
    <%= fct.name.camel %> = _<%= fct.name.camel %>_;
  }));

  it('is defined', function () {
    expect(<%= fct.name.camel %>).toBeDefined();
  });

  it('says hello', function () {
    <%= fct.name.camel %>.setName('Tau');

    var str = <%= fct.name.camel %>.greet();

    expect(str).toBe('Hello Tau!');
  });
});
