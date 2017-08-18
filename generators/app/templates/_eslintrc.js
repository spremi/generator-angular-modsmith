//
// <%= pkg.name.slug %>
//

module.exports = {
  env: {
    node: true,
    jasmine: true
  },

  extends: 'plugin:angular/johnpapa',

  rules: {
    'angular/file-name': 'off',
    'angular/no-service-method': 'off',
    'angular/function-type': 'off'
  },

  globals: {
    angular: true,
    define: true,
    expect: true,
    inject: true,
    jasmine: true
  }
};
