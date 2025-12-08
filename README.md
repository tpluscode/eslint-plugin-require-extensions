# eslint-plugin-require-js-extension

TypeScript [doesn't transform extensions](https://github.com/microsoft/TypeScript/issues/16577) and [doesn't enforce file extensions](https://github.com/microsoft/TypeScript/issues/42813).

This is a simple eslint plugin that ensures that relative imports _and_ exports have `.js` extensions.

Credit for [the original implementation](https://github.com/solana-labs/wallet-adapter/pull/547) goes to [johnrees](https://github.com/johnrees). ❤️

1. Install

```shell
npm install --save-dev eslint-plugin-require-js-extension
```

2. Create `eslint.config.js`

```javascript
import eslintPluginRequireJsExtension from 'eslint-plugin-require-js-extension'

export default [
  {
    plugins: {
      'require-js-extension': eslintPluginRequireJsExtension,
    },
    rules: {
      'require-js-extension/require-js-extension': 'error',
      'require-js-extension/require-index': 'error',
    },
  },
]
```

Alternatively, use the recommended config:

```javascript
import eslintPluginRequireJsExtension from 'eslint-plugin-require-js-extension'

export default [
  {
    plugins: {
      'require-js-extension': eslintPluginRequireJsExtension,
    },
    extends: ['eslintPluginRequireJsExtension/recommended'],
  },
]
```

3. Code

```js
// source.js

import Target from './target'
```

4. Lint

```shell
eslint .
```

```
source.js
  1:1  error  Relative imports and exports must end with .js  require-js-extension/require-js-extension
```

5. Fix

```shell
eslint --fix .
```

```js
// source.js

import Target from './target.js'
```
