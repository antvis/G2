process.env.DEBUG = 'app:*';
const debug = require('debug')('app:demos');
const commander = require('commander');
const connect = require('connect');
const getPort = require('get-port');
const http = require('http');
const open = require('open');
const serveStatic = require('serve-static');
const bodyParser = require('body-parser');
const parseurl = require('parseurl');
const url = require('url');
const assign = require('lodash').assign;
const path = require('path');
const resolve = path.resolve;
const join = path.join;
const fs = require('fs');
const JSZip = require('jszip');
const readFileSync = fs.readFileSync;
const writeFileSync = fs.writeFileSync;
const nunjucks = require('nunjucks');
const renderString = nunjucks.renderString;
const shelljs = require('shelljs');
const webpack = require('webpack');
const webpackConfig = require('../webpack.config');
const pkg = require('../package.json');
const blocks = require('./data/blocks.json');
const template = require('./data/template');

shelljs.config.execPath = shelljs.which('node');

commander
  .version(pkg.version)
  .option('-w, --web')
  .option('-p, --port <port>', 'specify a port number to run on', parseInt)
  .parse(process.argv);

function startService(port) {
  const server = connect();
  server
    .use(bodyParser.urlencoded({
      extended: true
    }))
    .use((req, res, next) => { // pre-handlers
      const urlInfo = url.parse(req.url, true);
      const query = urlInfo.query || {};
      const body = req.body || {};

      req._urlInfo = urlInfo;
      req._pathname = urlInfo.pathname;

      // add req._params (combination of query and body)
      const params = Object.assign({}, query, body);
      req._params = params;
      req._query = query;
      req._body = body;

      res._sendRes = (str, contentType) => {
        const buf = new Buffer(str);
        contentType = contentType || 'text/html;charset=utf-8';
        res.setHeader('Content-Type', contentType);
        res.setHeader('Content-Length', buf.length);
        res.end(buf);
      };
      // res._JSONRes(data) (generate JSON response)
      res._JSONRes = data => {
        res._sendRes(JSON.stringify(data), 'application/json;charset=utf-8');
      };
      // TODO res._JSONError()
      // res._HTMLRes(data) (generate HTML response)
      res._HTMLRes = res._sendRes;

      return next();
    })
    .use((req, res, next) => {
      const pathname = parseurl(req).pathname;
      if (req.method === 'GET') {
        if (pathname === '/bundler/index.html') {
          res.end(renderString(readFileSync(join(__dirname, './index.njk'), 'utf8'), {
            blocks
          }));
        } else {
          next();
        }
      } else if (req.method === 'POST') {
        if (pathname === '/bundle') {
          // step1: prepare entry __index.js
          const entryPath = resolve(process.cwd(), './src/__index.js');
          const ids = req.body.ids.map(id => parseInt(id, 10));
          const codeBlocks = blocks
            .filter((item, index) => ids.indexOf(index) !== -1)
            .map(item => item.code)
            .join('\n');
          const entryFileContent = template(codeBlocks);
          writeFileSync(entryPath, template(codeBlocks), 'utf8');
          // step2: build it
          const distPath = resolve(process.cwd(), './__dist');
          shelljs.rm('-rf', distPath);
          shelljs.mkdir('-p', distPath);
          const config = Object.assign({}, webpackConfig);
          config.entry = {
            g2: './src/__index.js'
          };
          config.output.path = distPath;
          webpack(config, (err, stats) => {
            // shelljs.rm(entryPath);
            if (err || stats.hasErrors()) {
              // Handle errors here
              // shelljs.rm('-rf', distPath);
              shelljs.rm(entryPath);
              shelljs.rm('-rf', distPath);
            }
            // step3: uglify
            shelljs.exec('uglifyjs -c -m -o __dist/g2.min.js -- __dist/g2.js');
            // step4: zipping it
            const zip = new JSZip();
            zip.folder('g2-dist').file('entry.js', entryFileContent);
            zip.folder('g2-dist').file('g2.js', readFileSync(join(distPath, './g2.js'), 'utf8'));
            zip.folder('g2-dist').file('g2.js.map', readFileSync(join(distPath, './g2.js.map'), 'utf8'));
            zip.folder('g2-dist').file('g2.min.js', readFileSync(join(distPath, './g2.min.js'), 'utf8'));
            res.writeHead(200, {
              'Content-Type': 'application/zip'
            });
            zip
              .generateNodeStream({ type: 'nodebuffer', streamFiles: true })
              .pipe(res)
              .on('finish', function() {
                // step5: clear up
                shelljs.rm(entryPath);
                shelljs.rm('-rf', distPath);
                res.end();
              });
          });
        }
      } else {
        next();
      }
    });
  server.use(serveStatic(process.cwd()));
  http.createServer(server).listen(port);

  const urlPath = `http://127.0.0.1:${port}/bundler/index.html`;
  debug(`server started, bundler available! ${urlPath}`);

  if (commander.web) {
    debug('running on web!');
    open(urlPath);
  } else {
    debug('running on electron!');
    const app = require('electron').app;
    const BrowserWindow = require('electron').BrowserWindow;
    const windowBoundsConfig = require('torchjs/lib/windowBoundsConfig')(
      resolve(app.getPath('userData'), './g2-bundler-config.json')
    );

    let win;
    app.once('ready', () => {
      win = new BrowserWindow(assign({
        // transparent: true
        webPreferences: {
          nodeIntegration: false
        }
      }, windowBoundsConfig.get('bundler')));
      win.loadURL(urlPath);

      win.on('close', () => {
        windowBoundsConfig.set('bundler', win.getBounds());
      });
      win.on('closed', () => {
        win = null;
      });
    });
    app.on('window-all-closed', () => {
      app.quit();
    });
  }
}

if (commander.port) {
  startService(commander.port);
} else {
  getPort().then(port => {
    startService(port);
  });
}
