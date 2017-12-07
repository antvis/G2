#!/usr/bin/env node
const shelljs = require('shelljs');
const exec = shelljs.exec;

const childWatch = exec('npm run watch', {
  async: true
});
childWatch.stdout.on('data', data => {
  if (data.indexOf('Hash') === 0) {
    exec('npm run demos-web', {
      async: true
    });
  }
});
