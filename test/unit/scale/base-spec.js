
const expect = require('chai').expect;
const Scale = require('../../../build/g2').Scale;

describe('scale base test', () => {
  it('cfg', function() {
    const scale = new Scale({
      ticks: [ 1, 2, 3, 4 ]
    });
    expect(scale.ticks.length).to.be.equal(4);
  });
  it('init', function() {

  });
  it('translate', function() {

  });
  it('invert', function() {

  });
  it('scale', function() {

  });
  it('getTicks', function() {

  });
  it('clone', function() {

  });
  it('change', function() {

  });
});
