// <%= pkg.name.slug %>
//
// (c) <%= (new Date).getFullYear() %> <%= author.name %> (<%= author.email %>)
//
// SPDX-License-Identifier: <%= pkg.license %>
//                          (http://spdx.org/licenses/<%= pkg.license %>.html)
//


'use strict';

describe('Service: <%= svc.name.camel %>', function () {

  // Load package containing the service
  beforeEach(module('<%= pkg.name.camel %>'));

  var <%= svc.name.camel %>;

  beforeEach(inject(function (_<%= svc.name.camel %>_) {
    <%= svc.name.camel %> = _<%= svc.name.camel %>_;
  }));

  it('is defined', function () {
    expect(<%= svc.name.camel %>).toBeDefined();
  });

  it('says hello', function () {
    var str = <%= svc.name.camel %>.greet('zeta');

    expect(str).toBe('Hello zeta!');
  });
});
