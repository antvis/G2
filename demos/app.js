const commander = require('commander');
const connect = require('connect');
const getPort = require('get-port');
const http = require('http');
const open = require('open');
const serveStatic = require('serve-static');
const {
  assign
} = require('lodash');
const {
  resolve
} = require('path');
const pkg = require('../package.json');

commander
  .version(pkg.version)
  .option('-w, --web')
  .parse(process.argv);

getPort().then(port => {
  const server = connect();
  server.use(serveStatic(process.cwd()));
  http.createServer(server).listen(port);

  const url = `http://localhost:${port}/demos/index.html`;
  console.log(`server started, demos available! ${url}`);

  if (commander.web) {
    open(url);
  } else {
    const {
      app,
      BrowserWindow
    } = require('electron');
    const watcher = require('@lite-js/torch/lib/watcher');
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

      watcher([
        'demos/**/*.*'
      ], () => {
        win.webContents.reloadIgnoringCache();
      });
    });

    app.on('window-all-closed', () => {
      server.stop();
      if (process.platform !== 'darwin') {
        app.quit();
      }
      app.exit();
    });
  }
});
