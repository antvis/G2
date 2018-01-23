const expect = require('chai').expect;
const G2 = require('../../src/index');

describe('sample', () => {
  it('G2 3.0', () => {
    expect('G2 3.0').to.be.a('string');
    expect(G2).to.be.an('object');
    expect(G2.Shape).not.equal(undefined);
    expect(G2.version).not.equal(undefined);
  });
});
