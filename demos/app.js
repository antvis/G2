process.env.DEBUG = 'app:*';
const debug = require('debug')('app:demos');
const commander = require('commander');
const connect = require('connect');
const getPort = require('get-port');
const http = require('http');
const open = require('open');
const serveStatic = require('serve-static');
const parseurl = require('parseurl');
const assign = require('lodash').assign;
const path = require('path');
const resolve = path.resolve;
const extname = path.extname;
const basename = path.basename;
const join = path.join;
const fs = require('fs');
const statSync = fs.statSync;
const lstatSync = fs.lstatSync;
const readdirSync = fs.readdirSync;
const readFileSync = fs.readFileSync;
const mkdirSync = fs.mkdirSync;
const nunjucks = require('nunjucks');
const renderString = nunjucks.renderString;
const pkg = require('../package.json');

function isFile(source) {
  return lstatSync(source).isFile();
}

function getFiles(source) {
  return readdirSync(source).map(name => join(source, name)).filter(isFile);
}

const screenshotsPath = join(process.cwd(), './demos/assets/screenshots');
try {
  statSync(screenshotsPath);
} catch (e) {
  mkdirSync(screenshotsPath);
}

commander
  .version(pkg.version)
  .option('-w, --web')
  .option('-p, --port <port>', 'specify a port number to run on', parseInt)
  .parse(process.argv);

function startService(port) {
  const server = connect();
  server.use((req, res, next) => {
    if (req.method === 'GET') {
      const pathname = parseurl(req).pathname;
      if (pathname === '/demos/index.html') {
        const demoFiles = getFiles(__dirname)
          .filter(filename => {
            return extname(filename) === '.html';
          })
          .map(filename => {
            const bn = basename(filename, '.html');
            const file = {
              screenshot: `/demos/assets/screenshots/${bn}.png`,
              basename: bn,
              content: readFileSync(filename),
              filename
            };
            return file;
          });
        const template = readFileSync(join(__dirname, './index.njk'), 'utf8');
        res.end(renderString(template, {
          demoFiles
        }));
      } else {
        next();
      }
    } else {
      next();
    }
  });
  server.use(serveStatic(process.cwd()));
  http.createServer(server).listen(port);

  const url = `http://127.0.0.1:${port}/demos/index.html`;
  debug(`server started, demos available! ${url}`);

  if (commander.web) {
    debug('running on web!');
    open(url);
  } else {
    debug('running on electron!');
    const app = require('electron').app;
    const BrowserWindow = require('electron').BrowserWindow;
    const watch = require('torchjs/lib/watch');
    const windowBoundsConfig = require('torchjs/lib/windowBoundsConfig')(
      resolve(app.getPath('userData'), './g2-demos-config.json')
    );

    let win;
    app.once('ready', () => {
      win = new BrowserWindow(assign({
        // transparent: true
        webPreferences: {
          nodeIntegration: false
        }
      }, windowBoundsConfig.get('demos')));
      win.loadURL(url);
      win.openDevTools();

      win.on('close', () => {
        windowBoundsConfig.set('demos', win.getBounds());
      });
      win.on('closed', () => {
        win = null;
      });
      watch([
        'demos/**/*.*',
        'src/**/*.*'
      ], () => {
        win.webContents.reloadIgnoringCache();
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
