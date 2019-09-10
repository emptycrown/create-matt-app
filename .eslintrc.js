module.exports = {
  extends: ['prettier', 'eslint:recommended', 'plugin:react/recommended'],
  plugins: ['sort-imports-es6-autofix', 'react', 'react-hooks'],
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  globals: {
    analytics: 'readonly',
  },
  parser: 'babel-eslint',
  rules: {
    'no-console': 'off',
    'no-var': 'error',
    eqeqeq: 'error',
    'no-unused-vars': [
      'error',
      {
        args: 'none',
        ignoreRestSiblings: true,
        argsIgnorePattern: '(^_)',
        varsIgnorePattern: '(^_)',
      },
    ],
    'prefer-const': [
      'warn',
      {
        destructuring: 'all',
        ignoreReadBeforeAssign: true,
      },
    ],

    'sort-imports-es6-autofix/sort-imports-es6': 'warn',

    'react/jsx-no-undef': ['error', { allowGlobals: true }],
    'react/prop-types': 'off',
    'react/no-unescaped-entities': 'off',
    'react/display-name': 'off',

    'react-hooks/rules-of-hooks': 'error',
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  parserOptions: {
    ecmaFeatures: {
      legacyDecorators: true,
      jsx: true,
    },
  },
};
