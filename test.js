import { RuleTester } from 'eslint'
import plugin from './index.js'
import path from 'path'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const ruleTester = new RuleTester({
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
  },
})

console.log('Testing require-js-extension rule...\n')

ruleTester.run('require-js-extension', plugin.rules['require-js-extension'], {
  valid: [
    // Imports with .js extension (files exist in example dir)
    {
      code: "import './foo.js';",
      filename: path.join(__dirname, 'example/index.js'),
    },
    {
      code: "import json from './foo.json?raw';",
      filename: path.join(__dirname, 'example/index.js'),
    },
    {
      code: "import foo from 'package-name';",
      filename: path.join(__dirname, 'example/index.js'),
    },
    {
      code: "import foo from '@scope/package';",
      filename: path.join(__dirname, 'example/index.js'),
    },
  ],
  invalid: [
    {
      code: "import './foo';",
      filename: path.join(__dirname, 'example/index.js'),
      errors: [
        {
          message: 'Relative imports and exports must end with .js',
        },
      ],
      output: "import './foo.js';",
    },
    {
      code: "export { foo } from './foo';",
      filename: path.join(__dirname, 'example/index.js'),
      errors: [
        {
          message: 'Relative imports and exports must end with .js',
        },
      ],
      output: "export { foo } from './foo.js';",
    },
    {
      code: "import * as all from './foo';",
      filename: path.join(__dirname, 'example/index.js'),
      errors: [
        {
          message: 'Relative imports and exports must end with .js',
        },
      ],
      output: "import * as all from './foo.js';",
    },
  ],
})

console.log('✓ require-js-extension tests passed\n')

console.log('Testing require-index rule...\n')

ruleTester.run('require-index', plugin.rules['require-index'], {
  valid: [
    {
      code: "import './foo.js';",
      filename: path.join(__dirname, 'example/index.js'),
    },
    {
      code: "import foo from 'package-name';",
      filename: path.join(__dirname, 'example/index.js'),
    },
  ],
  invalid: [
    {
      code: "import './dir';",
      filename: path.join(__dirname, 'example/index.js'),
      errors: [
        {
          message: 'Directory paths must end with index.js',
        },
      ],
      output: "import './dir/index.js';",
    },
  ],
})

console.log('✓ require-index tests passed\n')

console.log('All tests passed! ✓')
