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
 * @ngdoc overview
 * @name <%= pkg.name.camel %>
 *
 * @description
 * <%= pkg.desc %>
 *
 * Module definition.
 */
angular.module('<%= pkg.name.camel %>', []);
