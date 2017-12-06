#!/usr/bin/env node
const path = require('path');
const shelljs = require('shelljs');

const pathname = path.join(process.cwd(), './dist');
shelljs.rm('-rf', pathname);
shelljs.mkdir('-p', pathname);

