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
   * @ngdoc service
   * @name <%= pkg.name.camel %>.<%= svc.name.camel %>
   *
   * @description
   * <%= svc.desc %>.
   */
  angular.module('<%= pkg.name.camel %>')
    .service('<%= svc.name.camel %>', <%= svc.name.camel %>Fn);

  function <%= svc.name.camel %>Fn() {
    /**
     * @ngdoc function
     * @name <%= svc.name.camel %>.greet
     * @methodOf <%= svc.name.camel %>

     * @description Says hello
     * @param {string} name Name of person
     *
     * @returns {string} Greetings for the person.
     */
    this.greet = function (name) {
      return 'Hello ' + name + '!';
    };
  }
})();
