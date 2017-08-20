// <%= pkg.name.slug %>
//
// (c) <%= (new Date).getFullYear() %> <%= author.name %> (<%= author.email %>)
//
// SPDX-License-Identifier: <%= pkg.license %>
//                          (http://spdx.org/licenses/<%= pkg.license %>.html)
//


'use strict';

/**
 * @ngdoc factory
 * @name <%= pkg.name.camel %>.<%= fct.name.camel %>
 *
 * @description
 * <%= fct.desc %>.
 */
angular.module('<%= pkg.name.camel %>')
  .factory('<%= fct.name.camel %>', function () {
    var name = 'zeta';

    /**
     * @ngdoc function
     * @name <%= fct.name.camel %>.setName
     * @methodOf <%= fct.name.camel %>

     * @description Set name of the person
     * @param {string} arg Name of person
     */
    function setName(arg) {
      name = arg;
    }

    /**
     * @ngdoc function
     * @name <%= fct.name.camel %>.greet
     * @methodOf <%= fct.name.camel %>

     * @description Returns greetings for the person
     *
     * @returns {string} Greetings for the person
     */
    function greet() {
      return 'Hello ' + name + '!';
    }

    return {
      setName: setName,
      greet: greet
    };
  });
