const expect = require('chai').expect
const G2 = require('../build/g2')

describe('sample', () => {
  it('G2 3.0', () => {
    expect('G2 3.0').to.be.a('string')
    expect(G2).to.be.an('object')
  })
})
