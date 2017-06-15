#!/usr/bin/env node
const path = require('path');
const shelljs = require('shelljs');

function resolve(pathname) {
  return path.resolve(process.cwd(), pathname);
}

function prepare() {
  // ./test/coverage
  shelljs.rm('-rf', resolve('./test/coverage'));
  shelljs.mkdir(resolve('./test/coverage'));
  // ./src
  shelljs.mv(resolve('./src'), resolve('./_src'));
}

function cleanup() {
  // restore ./src
  shelljs.rm('-rf', resolve('./src'));
  shelljs.mv(resolve('./_src'), resolve('./src'));
}

function instrument() {
  shelljs.exec('$(npm bin)/istanbul instrument --output ./src ./_src');
}

function test() {
  shelljs.exec('$(npm bin)/electron-mocha --opts ./test/support/mocha.opts --renderer --recursive ./test/unit');
}

function generateReport() {
  shelljs.exec('$(npm bin)/istanbul report --root ./test/coverage');
}

function viewReport() {
  shelljs.exec('$(npm bin)/electron ./test/support/coverage-viewer.js');
}

function main() {
  prepare();
  try {
    instrument();
    test();
    generateReport();
  } catch (e) {
    console.error(e);
  }
  cleanup();
  viewReport();
}

main();
/*
  ## the origin idea comes from:
  npm run coverage:
    "pre-coverage": "rm -rf test/coverage && mkdir test/coverage",
    "instrument": "mv build _build && istanbul instrument --output ./build ./_build",
    "test-coverage": "electron-mocha --opts ./test/support/mocha.opts --renderer --recursive ./test/unit",
    "coverage": "npm run pre-coverage && npm run instrument && npm run test-coverage && npm run post-coverage",
    "post-coverage": "istanbul report --root ./test/coverage text && rm -rf _build",
 */
