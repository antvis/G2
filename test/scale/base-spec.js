
const expect = require('chai').expect
import Scale from '../build/g2';

describe('scale base test', () => {
  it('cfg', function (argument) {
    var scale = new Scale({
      ticks: [1,2,3,4]
    });
    expect(scale.ticks.length).to.be(4);
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