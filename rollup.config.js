// rollup.config.js
const resolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');

module.exports = {
  entry: 'index.js',
  dest: 'build/g2.js',
  moduleName: 'G2',
  format: 'umd',
  plugins: [
    resolve({
      jsnext: true,
      main: true
    }),
    commonjs()
  ]
}
