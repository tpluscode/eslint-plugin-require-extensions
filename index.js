import { existsSync, lstatSync } from 'fs'
import { dirname, resolve } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const plugin = {
  meta: {
    name: 'eslint-plugin-require-js-extension',
    version: '0.1.3',
  },
  rules: {
    'require-extensions': rule((context, node, path) => {
      if (!existsSync(path)) {
        let fix
        if (!node.source.value.includes('?')) {
          fix = (fixer) => {
            return fixer.replaceText(node.source, `'${node.source.value}.js'`)
          }
        }

        context.report({
          node,
          message: 'Relative imports and exports must end with .js',
          fix,
        })
      }
    }),
    'require-index': rule((context, node, path) => {
      if (existsSync(path) && lstatSync(path).isDirectory()) {
        context.report({
          node,
          message: 'Directory paths must end with index.js',
          fix(fixer) {
            return fixer.replaceText(node.source, `'${node.source.value}/index.js'`)
          },
        })
      }
    }),
  },
  configs: {},
}

// assign configs here so we can reference `plugin`
Object.assign(plugin.configs, {
  recommended: {
    plugins: {
      'require-extensions': plugin,
    },
    rules: {
      'require-extensions/require-extensions': 'error',
      'require-extensions/require-index': 'error',
    },
  },
})

export default plugin

function rule(check) {
  return {
    meta: {
      fixable: true,
    },
    create(context) {
      function rule(node) {
        const source = node.source
        if (!source) return
        const value = source.value.replace(/\?.*$/, '')
        if (!value || !value.startsWith('.') || value.endsWith('.js')) return

        check(context, node, resolve(dirname(context.getFilename()), value))
      }

      return {
        DeclareExportDeclaration: rule,
        DeclareExportAllDeclaration: rule,
        ExportAllDeclaration: rule,
        ExportNamedDeclaration: rule,
        ImportDeclaration: rule,
      }
    },
  }
}
