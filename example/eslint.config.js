import plugin from '../index.js'

export default [
  {
    files: ['**/*.js'],
    plugins: {
      'require-js-extension': plugin,
    },
    rules: {
      'require-js-extension/require-js-extension': 'error',
      'require-js-extension/require-index': 'error',
    },
  },
]
