import typescript from '@rollup/plugin-typescript';
import replace from '@rollup/plugin-replace';
import babel from '@rollup/plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';

import nodePolyfills from 'rollup-plugin-node-polyfills';
import builtins from 'rollup-plugin-node-builtins';
import globals from 'rollup-plugin-node-globals';
import terser from 'rollup-plugin-terser';

import pkg from './package.json';

const PLUGINS = [
  typescript({
    lib: ['es5', 'es6', 'dom'],
    target: 'es5',
    exclude: ['*.spec.ts'],
  }),
  babel({
    extensions: ['.ts', '.js', '.tsx', '.jsx'],
  }),
  replace({
    _VERSION: JSON.stringify(pkg.version),
  }),
];

const WEB_PLUGINS = [
  ...PLUGINS,
  resolve({browser: true}), // so Rollup can find `request`
  commonjs(), // so Rollup can convert `request` to an ES module
  json(), // so Rollup can find/import JSON files
  nodePolyfills(),
  terser(),
  globals(),
  builtins(),
];

export default [
  {
    input: 'src/index.ts',
    output: {
      name: 'passninja',
      file: pkg.browser,
      format: 'iife',
    },
    plugins: WEB_PLUGINS,
  },
  {
    input: 'src/index.ts',
    output: [
      {file: pkg.main, format: 'cjs'},
      {file: pkg.module, format: 'es'},
    ],
    plugins: PLUGINS,
  },
];
