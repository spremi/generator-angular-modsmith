//
// <%= pkg.name.slug %>
//
// (c) <%= (new Date).getFullYear() %> <%= author.name %> (<%= author.email %>)
//
// SPDX-License-Identifier: <%= pkg.license %>
//                          (http://spdx.org/licenses/<%= pkg.license %>.html)
//


(function () {
  'use strict';

  /**
   * @ngdoc directive
   * @name <%= pkg.name.camel %>.<%= dtv.name.camel %>
   * @restrict <%= dtv.restrict %>
   *
   * @description
   * <%= dtv.desc %>.
   */
  angular.module('<%= pkg.name.camel %>')
    .directive('<%= dtv.name.camel %>', <%= dtv.name.camel %>);

  function <%= dtv.name.camel %>() {
    var directive = {
      restrict: '<%= dtv.restrict %>',
<%
if (dtv.transclude) {
-%>
      transclude: true,
<%
}
-%>
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
      link: <%= dtv.name.camel %>Link,
<%
}
-%>
      scope: {
      }
    };

    return directive;
<%
if (dtv.linkFn) {
-%>

<%
if (dtv.destroyFn) {
-%>
    function <%= dtv.name.camel %>Link(scope, element /*, attrs */) {
      /**
       * Clean-up on '$destroy' event
       */
      element.on('$destroy', function () {
        // TODO: Implement
      });
    }
<%
} else {
-%>
    function <%= dtv.name.camel %>Link(/* scope, element, attrs */) {
    }
<%
}
-%>
<%
}
-%>
  }
})();
