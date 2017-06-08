const path = require('path');
const fs = require('fs');

function resolve(pathname) {
  return path.resolve(process.cwd(), pathname);
}
const rendererPath = resolve('./node_modules/electron-mocha/renderer/index.html');
const rendererContent = fs.readFileSync(resolve('./test/support/renderer.html'), 'utf8');
fs.writeFileSync(rendererPath, rendererContent, 'utf8');
