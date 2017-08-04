const commander = require('commander');
const connect = require('connect');
const getPort = require('get-port');
const http = require('http');
const open = require('open');
const serveStatic = require('serve-static');
const assign = require('lodash').assign;
const resolve = require('path').resolve;

const pkg = require('../package.json');

commander
  .version(pkg.version)
  .option('-w, --web')
  .option('-p, --port <port>', 'specify a port number to run on', parseInt)
  .parse(process.argv);

function startService(port) {
  const server = connect();
  server.use(serveStatic(process.cwd()));
  http.createServer(server).listen(port);

  const url = `http://127.0.0.1:${port}/demos/index.html`;
  console.log(`server started, demos available! ${url}`);

  if (commander.web) {
    open(url);
  } else {
    const app = require('electron').app;
    const BrowserWindow = require('electron').BrowserWindow;
    const watch = require('@lite-js/torch/lib/watch');
    const windowBoundsConfig = require('@lite-js/torch/lib/windowBoundsConfig')(
      resolve(app.getPath('userData'), './g2-config.json')
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
        'demos/**/*.*'
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
