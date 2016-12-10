//
// <%= pkg.name.slug %>
//

module.exports = {
  env: {
    node: true,
    jasmine: true
  },

  extends: 'eslint:recommended',

  rules: {
    //
    // Possible errors
    //
    'no-console': 'off',
    'no-debugger': 'off',

    'no-inner-declarations': ['error', 'both'],
    'no-unexpected-multiline': 'error',

    //
    // Best practices
    //
    curly: 'error',
    'dot-notation': 'error',
    eqeqeq: ['error', 'smart'],
    'guard-for-in': 'error',
    'no-caller': 'error',
    'no-eval': 'error',
    'no-extend-native': 'error',
    'no-invalid-this': 'error',
    'no-labels': 'error',
    'no-lone-blocks': 'error',
    'no-loop-func': 'error',
    'no-multi-str': 'error',
    'no-native-reassign': 'error',
    'no-new-func': 'error',
    'no-redeclare': 'error',
    'no-with': 'error',
    'wrap-iife': ['error', 'inside'],

    //
    // Strict mode
    //
    strict: 'error',

    //
    // Variables
    //
    'no-shadow': 'error',
    'no-shadow-restricted-names': 'error',
    'no-use-before-define': 'error',

    //
    // NodeJS & CommonJS
    //
    'global-require': 'off',

    //
    // Stylistic issues
    //
    'array-bracket-spacing': ['error', 'never'],
    'block-spacing': ['error', 'always'],
    'brace-style': ['error',
      '1tbs',
      {
        allowSingleLine: true
      }
    ],
    camelcase: ['error',
      {
        properties: 'always'
      }
    ],
    'comma-spacing': ['error',
      {
        before: false,
        after: true
      }
    ],
    'comma-style': ['error', 'last'],
    'computed-property-spacing': ['error', 'never'],
    'eol-last': 'error',
    indent: ['error',
      2,
      {
        SwitchCase: 1
      }
    ],
    'key-spacing': 'error',
    'keyword-spacing': 'error',
    'new-cap': 'error',
    'new-parens': 'error',
    'newline-after-var': ['error', 'always'],
    'no-array-constructor': 'error',
    'no-multiple-empty-lines': 'off',
    'no-spaced-func': 'error',
    'no-trailing-spaces': 'error',
    'object-curly-spacing': ['error', 'always'],
    quotes: ['error', 'single'],
    semi: ['error', 'always'],
    'semi-spacing': ['error',
      {
        before: false,
        after: true
      }
    ],
    'space-before-blocks': 'error',
    'space-before-function-paren': ['error',
      {
        anonymous: 'always',
        named: 'never'
      }
    ],
    'space-in-parens': ['error', 'never'],
    'space-infix-ops': 'error',
    'space-unary-ops': ['warn',
      {
        words: true,
        nonwords: false
      }
    ],
    'spaced-comment': ['error', 'always'],

    //
    // ECMAScript 6
    //
    'arrow-spacing': 'error'
  },
  globals: {
    angular: true,
    define: true,
    expect: true,
    inject: true,
    jasmine: true
  }
};
