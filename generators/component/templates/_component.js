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
   * @ngdoc component
   * @name <%= pkg.name.camel %>.<%= cmp.name.camel %>
   *
   * @description
   * <%= cmp.desc %>.
   */
  angular.module('<%= pkg.name.camel %>')
    .component('<%= cmp.name.camel %>', {
<%
if (cmp.transclude) {
-%>
      transclude: true,
<%
}
-%>
<%
if (cmp.extTpl) {
-%>
      templateUrl: 'src/components/<%= cmp.name.camel %>/<%= cmp.name.camel %>.html',
<%
} else {
-%>
      template: '<div>Component: <%= cmp.name.camel %></div>',
<%
}
-%>
      controller: <%= cmp.name.camel %>Ctrl,
      bindings: {
      }
    });

  function <%= cmp.name.camel %>Ctrl() {
    var ctrl = this;
<%
if (cmp.initFn) {
-%>

    /**
     * Lifecycle function called after controller is constructed.
     */
    ctrl.$onInit = function() {
      // TODO: Add initialization code for the controller
    };
<%
}

-%>
<%
if (cmp.destroyFn) {
-%>

    /**
     * Lifecycle function called before controller scope is destroyed.
     */
    ctrl.$onDestroy = function() {
      // TODO: Release external resources, watches and event handlers
    };
<%
}
-%>
<%
if (cmp.changesFn) {
-%>

    /**
     * Lifecycle function called when one-way bindings are updated.
     */
    ctrl.$onChanges = function(changesObj) {
      // TODO: Trigger updates within a component
    };
<%
}
-%>
  }
})();
