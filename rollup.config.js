import typescript from '@rollup/plugin-typescript';
import replace from '@rollup/plugin-replace';
import babel from '@rollup/plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';

import builtins from 'rollup-plugin-node-builtins';
import globals from 'rollup-plugin-node-globals';
// import terser from 'rollup-plugin-terser';

import pkg from './package.json';

const extensions = ['.ts', '.js'];
const PLUGINS = [
  typescript({
    lib: ['es5', 'es6', 'dom'],
    target: 'es2015',
    exclude: ['*.spec.ts'],
  }),
  resolve({
    jsnext: true,
    extensions,
  }),
  babel({
    exclude: 'node_modules/**', // only transpile our source code
    extensions,
  }),
  replace({
    _VERSION: JSON.stringify(pkg.version),
  }),
];

const WEB_PLUGINS = [
  ...PLUGINS,
  resolve({jsnext: true, preferBuiltins: true, browser: true}), // so Rollup can find `axios`
  commonjs(), // so Rollup can convert `axios` to an ES module
  globals(),
  builtins(),
  json(), // so Rollup can find/import JSON files
];
const EXTERNALS = [...Object.keys(pkg.dependencies || {})];

export default [
  // Browser Export
  {
    input: 'src/index.ts',
    output: {
      file: pkg.browser,
      name: 'passninja',
      format: 'iife',
    },
    external: [
      ...EXTERNALS,
      'window',
      'document',
      'builtin-modules',
      'resolve',
      'browser-resolve',
      'is-module',
    ],
    plugins: WEB_PLUGINS,
  },
  // Module exports
  {
    input: 'src/index.ts',
    output: [
      {
        file: pkg.main,
        format: 'cjs',
      },
      {
        file: pkg.module,
        format: 'es',
      },
    ],
    external: EXTERNALS,
    plugins: PLUGINS,
  },
];
