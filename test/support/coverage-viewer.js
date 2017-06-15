const {
  app,
  BrowserWindow
} = require('electron');
const path = require('path');
const url = require('url');

let win;

function createWindow() {
  win = new BrowserWindow({
    width: 1024,
    height: 800
  });

  win.loadURL(url.format({
    pathname: path.resolve(__dirname, '../../coverage/lcov-report/index.html'),
    protocol: 'file:',
    slashes: true
  }));

  // win.webContents.openDevTools();

  win.on('closed', () => {
    win = null;
  });
}

app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
  app.exit(1);
});

app.on('activate', () => {
  if (win === null) {
    createWindow();
  }
});
