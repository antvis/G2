#!/usr/bin/env node
process.env.DEBUG = 'app:*';
const debug = require('debug')('app:pixel-test');
const MAX_POOL_SIZE = require('os').cpus().length;
const Nightmare = require('nightmare');
const _ = require('lodash');
const commander = require('commander');
const connect = require('connect');
const getPort = require('get-port');
const fs = require('fs');
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
const BlinkDiff = require('blink-diff');

commander
  .version(pkg.version)
  .option('-p, --port <port>', 'specify a port number to run on', parseInt)
  .option('-n, --name <name>', 'specify the name for demos')
  .option('-o, --override', 'override the screenshots for demos')
  .parse(process.argv);

// file directory
const src = join(process.cwd(), './demos');
const old = join(src, './assets/screenshots');
const dest = join(process.cwd(), './demos/assets/screenshots-new');
mkdir('-p', dest);

const app = connect();
app.use('/', serveStatic(process.cwd()));

const DELAY = 6000;

getPort().then(port => {
  http.createServer(app).listen(port);
  const url = 'http://127.0.0.1:' + port;
  debug('server is ready on port ' + port + '! url: ' + url);

  // 如果screenshots目录不存在，提示：npm run screenshot
  if (!fs.existsSync(old)) {
    new Promise(() => {
      throw new Error('screenshots didn\'t exist, please npm run screenshot');
    })
    .catch(error => {
      console.error(error);
      process.exit();
    });
  }

  const q = queue(MAX_POOL_SIZE > 2 ? MAX_POOL_SIZE - 1 : MAX_POOL_SIZE);
  const files = ls(src).filter(filename => (extname(filename) === '.html'));
  files.forEach(filename => {
    const name = basename(filename, '.html');
    if (_.isString(commander.name) && !filename.includes(commander.name)) {
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
          // pixel diff
          const diff = new BlinkDiff({
            imageAPath: join(old, `./${name}.png`),
            imageBPath: target,

            thresholdType: BlinkDiff.THRESHOLD_PERCENT,
            threshold: 0.05 // 5% threshold
          });

          diff.run((error, result) => {
            if (error) {
              throw error;
            } else {
              if (result.code && diff.hasPassed(result.code)) {
                debug(`${name}.png pixel-diff has passed`);
              } else {
                throw new Error(`${name}.png pixel-diff failed, found ${result.differences} differences.`);
              }
            }
          });
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
    debug('screenshots check completely!');
    if (commander.override) {
      debug(`override:${commander.override}, override screenshots!`);
      overrideScreenshots();
    } else {
      debug(`override:${commander.override}, delete screenshots-new!`);
      deleteScreenshots(dest);
    }
    process.exit();
  });
});

// override test/pixel/screenshots
function overrideScreenshots() {
  const screenshots = fs.readdirSync(dest);
  screenshots.forEach(screenshot => {
    const name = basename(screenshot, '.png');
    const sour = join(dest, `./${name}.png`);
    const dst = join(old, `./${name}.png`);
    fs.copyFileSync(sour, dst);
  });
  deleteScreenshots(dest);
}

// delete test/pixel/screenshots-news
function deleteScreenshots(path) {
  let files = [];
  if (fs.existsSync(path)) {
    files = fs.readdirSync(path);
    files.forEach(file => {
      const curPath = path + '/' + file;
      if (fs.statSync(curPath).isDirectory()) {
        deleteScreenshots(curPath);
      } else {
        fs.unlinkSync(curPath);
      }
    });
  }
  fs.rmdirSync(path);
}
