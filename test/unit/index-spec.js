const expect = require('chai').expect;
const G2 = require('../../index');

describe('sample', () => {
  it('G2 3.0', () => {
    expect('G2 3.0').to.be.a('string');
    expect(G2).to.be.an('object');
    expect(G2.Shape).not.equal(undefined);
  });
});
