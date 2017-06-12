const expect = require('chai').expect;
const isRenderer = require('is-electron-renderer');
const G2 = require('../../index');

describe('sample', () => {
  it('G2 3.0', () => {
    expect('G2 3.0').to.be.a('string');
    expect(G2).to.be.an('object');
  });
});

after(() => {
  if (isRenderer && window.__coverage__) {
    const { remote } = require('electron');
    const fs = remote.require('fs');
    const path = remote.require('path');
    fs.writeFileSync(path.resolve(process.cwd(), './test/coverage/coverage.json'), JSON.stringify(window.__coverage__));
  }
});
