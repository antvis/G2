import { uglify } from 'rollup-plugin-uglify';
import resolve from 'rollup-plugin-node-resolve';
import typescript from 'rollup-plugin-typescript';
import commonjs from '@rollup/plugin-commonjs';

module.exports = [
  {
    input: 'src/index.ts',
    output: {
      file: 'dist/template.min.js',
      name: 'tplv',
      format: 'umd',
      sourcemap: false,
    },
    plugins: [resolve(), commonjs(), typescript(), uglify()],
  },
];
