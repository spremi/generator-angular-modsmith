//
// <%= pkg.name.slug %>
//
// (c) <%= (new Date).getFullYear() %> <%= author.name %> (<%= author.email %>)
//
// SPDX-License-Identifier: <%= pkg.license %>
//                          (http://spdx.org/licenses/<%= pkg.license %>.html)
//


'use strict';

/**
 * @ngdoc directive
 * @name <%= pkg.name.camel %>.<%= dtv.name.camel %>
 * @restrict E
 *
 * @description
 * <%= dtv.desc %>.
 */
angular.module('<%= pkg.name.camel %>')
  .directive('<%= dtv.name.camel %>', function () {
    return {
      scope: {
      },
<%
if (dtv.extTpl) {
-%>
      templateUrl: 'src/directives/<%= dtv.name.camel %>/<%= dtv.name.camel %>.html',
<%
} else {
-%>
      template: '<div>Directive: <%= dtv.name.camel %></div>',
<%
}
-%>
<%
if (dtv.linkFn) {
-%>
      link: function (/* scope, element, attrs */) {
      },
<%
}
-%>
      restrict: '<%= dtv.restrict %>'
    };
  });
