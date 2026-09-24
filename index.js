import { existsSync, lstatSync, readFileSync } from 'fs';
import { dirname, resolve } from 'path';

const { name, version } = JSON.parse(readFileSync(new URL('./package.json', import.meta.url), 'utf8'));

const plugin = {
    meta: {
        name,
        version,
    },
    rules: {
        'require-extensions': rule((context, node, path) => {
            if (!existsSync(path)) {
                let fix;
                if (!node.source.value.includes('?')) {
                    fix = (fixer) => {
                        return fixer.replaceText(node.source, `'${node.source.value}.js'`);
                    };
                }

                context.report({
                    node,
                    message: 'Relative imports and exports must end with .js',
                    fix,
                });
            }
        }),
        'require-index': rule((context, node, path) => {
            if (existsSync(path) && lstatSync(path).isDirectory()) {
                context.report({
                    node,
                    message: 'Directory paths must end with index.js',
                    fix(fixer) {
                        return fixer.replaceText(node.source, `'${node.source.value}/index.js'`);
                    },
                });
            }
        }),
    },
};

plugin.configs = {
    recommended: {
        plugins: {
            'require-extensions': plugin,
        },
        rules: {
            'require-extensions/require-extensions': 'error',
            'require-extensions/require-index': 'error',
        },
    },
};

export const { meta, rules, configs } = plugin;
export default plugin;

function rule(check) {
    return {
        meta: {
            fixable: true,
        },
        create(context) {
            function rule(node) {
                const source = node.source;
                if (!source) return;
                const value = source.value.replace(/\?.*$/, '');
                if (!value || !value.startsWith('.') || value.endsWith('.js')) return;

                check(context, node, resolve(dirname(context.filename), value));
            }

            return {
                DeclareExportDeclaration: rule,
                DeclareExportAllDeclaration: rule,
                ExportAllDeclaration: rule,
                ExportNamedDeclaration: rule,
                ImportDeclaration: rule,
            };
        },
    };
}
