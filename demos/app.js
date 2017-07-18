const connect = require('connect');
const http = require('http');
const serveStatic = require('serve-static');
const {
  app,
  BrowserWindow
} = require('electron');
const {
  resolve
} = require('path');
const windowBoundsConfig = require('@lite-js/torch/lib/windowBoundsConfig')(
  resolve(app.getPath('userData'), './g2-config.json')
);

const port = 1337;
const server = connect();
server.use(serveStatic(process.cwd()));
http.createServer(server).listen(port);

let win;

function serveAndCreateWindow() {
  win = new BrowserWindow(windowBoundsConfig.get('demos'));

  win.loadURL(`http://localhost:${port}/demos`);

  win.webContents.openDevTools();

  win.on('close', () => {
    windowBoundsConfig.set('demos', win.getBounds());
  });
  win.on('closed', () => {
    win = null;
  });
}

app.once('ready', serveAndCreateWindow);

app.on('window-all-closed', () => {
  server.stop();
  if (process.platform !== 'darwin') {
    app.quit();
  }
  app.exit();
});
