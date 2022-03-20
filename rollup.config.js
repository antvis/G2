import { uglify } from 'rollup-plugin-uglify';
import resolve from 'rollup-plugin-node-resolve';
import typescript from 'rollup-plugin-typescript';
import commonjs from '@rollup/plugin-commonjs';
import nodePolyfills from 'rollup-plugin-polyfill-node';

module.exports = [
  {
    input: 'src/index.ts',
    output: {
      file: 'dist/g2.min.js',
      name: 'G2',
      format: 'umd',
      sourcemap: false,
    },
    plugins: [nodePolyfills(), resolve(), commonjs(), typescript(), uglify()],
  },
];
