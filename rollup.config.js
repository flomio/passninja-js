import typescript from '@rollup/plugin-typescript';
import replace from '@rollup/plugin-replace';
import babel from '@rollup/plugin-babel';
import resolve from '@rollup/plugin-node-resolve';

import pkg from './package.json';

export default [
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
    external: [...Object.keys(pkg.dependencies || {})],
    plugins: [
      typescript(),
      resolve(),
      babel({babelHelpers: 'bundled'}),
      replace({
        _VERSION: JSON.stringify(pkg.version),
      }),
    ],
  },
];
