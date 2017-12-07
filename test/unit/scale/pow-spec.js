
const expect = require('chai').expect;
const Scale = require('../../../src/scale/');

describe('scale pow', () => {

  const scale = Scale.pow({
    exponent: 2,
    min: 0,
    max: 100
  });

  it('cfg', () => {
    expect(scale.exponent).to.be.equal(2);
    expect(scale.type).to.be.equal('pow');
  });

  it('scale', () => {
    const val = scale.scale(0);
    expect(val).to.be.equal(0);

    expect(Math.round(scale.scale(25) * 10) / 10).to.be.equal(0.5);
    expect(scale.scale(100)).to.be.equal(1);
  });

  it('invert', () => {
    expect(scale.invert(0)).to.be.equal(0);
    expect(parseInt(scale.invert(0.5))).to.be.equal(25);

    expect(parseInt(scale.invert(1))).to.be.equal(100);
  });

  it('ticks', () => {
    const ticks = scale.getTicks();
    // expect(ticks.length).to.be.equal(6); // TODO FIXME not working in windows
    expect(ticks[ticks.length - 1].value).to.be.equal(1);
  });

  it('clone', () => {
    const n1 = scale.clone();
    expect(n1.invert(0)).to.be.equal(0);
    expect(parseInt(scale.invert(0.5))).to.be.equal(25);

    expect(parseInt(scale.invert(1))).to.be.equal(100);

    expect(n1.type).to.be.equal('pow');
  });
});
describe('scale pow nice', () => {

  const scale = Scale.pow({
    min: 0,
    max: 90,
    nice: true
  });

  it('init', () => {
    expect(scale.max).to.be.equal(100);
  });

  it('scale', () => {
    const val = scale.scale(0);
    expect(val).to.be.equal(0);
    // expect(scale.scale(25)).to.be.equal(0.5)
    expect(Math.round(scale.scale(25) * 10) / 10).to.be.equal(0.5);
    expect(scale.scale(100)).to.be.equal(1);
  });

  it('invert', () => {
    expect(scale.invert(0)).to.be.equal(0);
    expect(parseInt(scale.invert(0.5))).to.be.equal(25);

    expect(parseInt(scale.invert(1))).to.be.equal(100);
  });

});

describe('scale pow: min is equal to max.', () => {
  const scale = Scale.pow({
    min: 90,
    max: 90,
    nice: false
  });

  it('scale', () => {
    expect(scale.scale(90)).to.be.equal(0);
  });

  it('invert', () => {
    expect(Math.ceil(scale.invert(scale.scale(90)))).to.be.equal(90);
  });
});


describe('scale pow: random values', function() {
  const scale = Scale.pow({
    min: 199579,
    max: 1318683096,
    nice: true
  });
  it('nice = true', function() {
    expect(scale.min <= 199579).equal(true);
  });
});
