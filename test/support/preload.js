const {
  remote
} = require('electron');
const path = remote.require('path');
const fs = remote.require('fs');

// add stylesheet for mocha HTML reporter
if (!document.getElementById('mocha-style')) {
  const style = document.createElement('style');
  style.id = 'mocha-style';
  style.innerHTML = fs.readFileSync(path.resolve(process.cwd(), './test/support/mocha.css'), 'utf8');
  document.head.appendChild(style);
}

