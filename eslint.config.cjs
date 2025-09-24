const js = require('@eslint/js');
const react = require('eslint-plugin-react');
const globals = require('globals');
const cleanGlobals = (obj) =>
  Object.fromEntries(Object.entries(obj).map(([k, v]) => [k.trim(), v]));
module.exports = [
  js.configs.recommended,
  {
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...cleanGlobals(globals.node),
        ...cleanGlobals(globals.browser),
        require: 'readonly',
        process: 'readonly',
        console: 'readonly',
        __dirname: 'readonly',
        module: 'readonly',
        View: 'readonly',
        React: 'readonly',
      },
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      react,
    },
    rules: {
      'no-unused-vars': 'warn',
      'no-console': 'off',
         'react/jsx-uses-react': 'warn',
         'react/jsx-uses-vars': 'warn',
       },
       settings: {
        react: {
          version: 'detect',
         },
       },
    },
];


