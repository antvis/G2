#!/usr/bin/env node
process.env.DEBUG = 'app:*';
const debug = require('debug')('app:screenshot');
const MAX_POOL_SIZE = require('os').cpus().length;
const Nightmare = require('nightmare');
const _ = require('lodash');
const commander = require('commander');
const connect = require('connect');
const getPort = require('get-port');
const http = require('http');
const path = require('path');
const basename = path.basename;
const extname = path.extname;
const join = path.join;
const queue = require('d3-queue').queue;
const serveStatic = require('serve-static');
const shelljs = require('shelljs');
const ls = shelljs.ls;
const mkdir = shelljs.mkdir;
const pkg = require('../package.json');

commander
  .version(pkg.version)
  .option('-p, --port <port>', 'specify a port number to run on', parseInt)
  .option('-n, --name <name>', 'specify the name for demos')
  .parse(process.argv);

// assets
const src = join(process.cwd(), './demos');
const dest = join(process.cwd(), './demos/assets/screenshots');
mkdir('-p', dest);

const app = connect();
app.use('/', serveStatic(process.cwd()));

const DELAY = 6000;

getPort().then(port => {
  http.createServer(app).listen(port);
  const url = 'http://127.0.0.1:' + port;
  debug('server is ready on port ' + port + '! url: ' + url);

  const q = queue(MAX_POOL_SIZE > 2 ? MAX_POOL_SIZE - 1 : MAX_POOL_SIZE);
  const files = ls(src).filter(filename => (extname(filename) === '.html'));
  files.forEach(filename => {
    const name = basename(filename, '.html');
    if (_.isString(commander.name) && filename.indexOf(commander.name) === -1) {
      debug(`>>>>>>>>> skipping because filename not matched: ${name}`);
      return;
    }
    q.defer(callback => {
      const t0 = Date.now();
      const nightmare = Nightmare({
        gotoTimeout: 600000,
        show: false
      });
      const url = `http://127.0.0.1:${port}/demos/${name}.html`;
      const target = join(dest, `./${name}.png`);
      nightmare.viewport(800, 450) // 16 x 9
        .goto(url)
        .wait(DELAY)
        .screenshot(target, () => {
          debug(name + ' took ' + (Date.now() - t0) + ' to take a screenshot.');
          callback(null);
        })
        .end()
        .catch(e => {
          debug(url);
          debug(target);
          debug(name + ' failed to take a screenshot: ' + e);
        });
    });
  });
  q.awaitAll(error => {
    if (error) {
      debug(error);
      process.exit(1);
    }
    debug('screenshots are all captured!');
    process.exit();
  });
});
