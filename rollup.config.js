/** @prettier */

import babel from 'rollup-plugin-babel';
import { terser } from 'rollup-plugin-terser';
import license from 'rollup-plugin-license';

const pkg = require('./package.json');

const plugins = [
  babel({
    exclude: 'node_modules/**',
    runtimeHelpers: true,
    babelrc: true,
  }),
  terser({
    ecma: 5,
  }),
  license({
    banner: `${pkg.name} v${pkg.version} ${pkg.author} | ${pkg.license}`,
  }),
];

export default {
  input: './src/index.js',
  output: [
    {
      file: './dist/index.js',
      format: 'cjs',
    },
    {
      file: './dist/expand-controller.min.js',
      format: 'iife',
      name: 'ExpandController',
    },
  ],
  external: [
    'core-js/modules/es.array.slice',
    'core-js/modules/es.regexp.exec',
    'core-js/modules/es.string.split',
    'core-js/modules/web.dom-collections.for-each',
  ],
  plugins,
};
