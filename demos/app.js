const {
  app,
  BrowserWindow
} = require('electron');
const {
  resolve
} = require('path');
const {
  format: urlFormat
} = require('url');
const windowBoundsConfig = require('@lite-js/torch/lib/windowBoundsConfig')(
  resolve(app.getPath('userData'), './g2-config.json')
);

let win;

function createWindow() {
  win = new BrowserWindow(windowBoundsConfig.get('demos'));

  win.loadURL(urlFormat({
    pathname: resolve(process.cwd(), './demos/index.html'),
    protocol: 'file:',
    slashes: true
  }));

  win.webContents.openDevTools();

  win.on('close', () => {
    windowBoundsConfig.set('demos', win.getBounds());
  });
  win.on('closed', () => {
    win = null;
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
  app.exit();
});
