// rollup.config.js
const resolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');
const babel = require('rollup-plugin-babel');

module.exports = {
  entry: 'index.js',
  dest: 'build/g2.js',
  moduleName: 'G2',
  format: 'umd',
  plugins: [
    commonjs(),
    resolve(),
    babel({
      exclude: 'node_modules/**' // only transpile our source code
    })
  ]
};
