import plugin from './index.js'

export default [
  {
    files: ['**/*.js'],
    languageOptions: {
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
      },
    },
    plugins: {
      'require-js-extension': plugin,
    },
    rules: {
      'require-js-extension/require-js-extension': 'error',
      'require-js-extension/require-index': 'error',
    },
  },
  {
    ignores: ['node_modules/**', 'test.js'],
  },
]
