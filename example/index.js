import 'foo'
import './foo.js'
import './foo.json'
import json from './foo.json?raw'
// eslint-disable-next-line require-js-extension/require-js-extension
import queryNoExt from './foo?raw'
// eslint-disable-next-line require-js-extension/require-js-extension
import './foo'
// eslint-disable-next-line require-js-extension/require-js-extension
import './bar.json'
// eslint-disable-next-line require-js-extension/require-index
import './dir'
