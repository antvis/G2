const expect = require('chai').expect;
const Scale = require('../../../src/scale/');

describe('scale log', () => {

  const scale = Scale.log({
    base: 2,
    min: 1,
    max: 100
  });

  it('cfg', () => {
    expect(scale.base).to.be.equal(2);
    expect(scale.type).to.be.equal('log');
  });

  it('scale', () => {
    let val = scale.scale(1);
    expect(val).to.be.equal(0);

    val = scale.scale(32);

    expect(val > 0.75).to.be.equal(true);
    expect(val < 0.76).to.be.equal(true);
    expect(scale.scale(100)).to.be.equal(1);
  });

  it('invert', () => {
    expect(scale.invert(0)).to.be.equal(1);
    expect(parseInt(scale.invert(0.7525749891599529))).to.be.equal(32);

    expect(parseInt(scale.invert(1))).to.be.equal(100);
  });

  it('ticks', () => {
    const ticks = scale.getTicks();

    expect(ticks[0].value).to.be.equal(0);
    expect(ticks[ticks.length - 1].value < 1).to.be.equal(true);
  });

  it('clone', () => {
    const n1 = scale.clone();
    expect(n1.invert(0)).to.be.equal(1);
    expect(parseInt(n1.invert(0.7525749891599529))).to.be.equal(32);

    expect(parseInt(n1.invert(1))).to.be.equal(100);

    expect(n1.type).to.be.equal('log');
  });
});

describe('scale log nice', () => {

  const scale = Scale.log({
    base: 2,
    min: 1,
    max: 100,
    nice: true
  });

  it('init', () => {
    expect(scale.max).to.be.equal(128);
  });

  it('scale', () => {
    let val = scale.scale(1);
    expect(val).to.be.equal(0);

    val = scale.scale(32);

    expect(val).to.be.equal(5 / 7);
    expect(scale.scale(100)).not.to.be.equal(1);

    expect(scale.scale(128)).to.be.equal(1);
  });

  it('invert', () => {
    expect(scale.invert(0)).to.be.equal(1);
    expect(parseInt(scale.invert(5 / 7))).to.be.equal(32);

    expect(parseInt(scale.invert(1))).to.be.equal(128);
  });

  it('ticks', () => {
    const ticks = scale.getTicks();

    expect(ticks[0].value).to.be.equal(0);
    expect(ticks[ticks.length - 1].value).to.be.equal(1);
  });
});

describe('scale log: min is equal to max.', () => {
  const scale = Scale.log({
    base: 2,
    min: 100,
    max: 100,
    nice: false
  });

  it('scale', () => {
    const val = scale.scale(100);
    expect(val).to.be.equal(0);
  });

  it('invert', () => {
    expect(parseInt(scale.invert(0))).to.be.equal(100);
  });
});


describe('scale log ,min is 0, no values', () => {
  function equal(v1, v2) {
    return Math.abs(v1 - v2) < 0.0001;
  }
  describe('scale， no values', () => {
    const scale = Scale.log({
      base: 10,
      min: 0,
      max: 10000
    });

    it('get ticks', () => {
      expect(scale.ticks).eql([ 0, 1, 10, 100, 1000, 10000 ]);
    });

    it('scale big then 1', () => {
      expect(equal(scale.scale(1), 0.2)).to.be.equal(true);
      expect(equal(scale.scale(1000), 0.8)).to.be.equal(true);
      expect(equal(scale.scale(10000), 1)).to.be.equal(true);
    });

    it('scale little then 1', () => {
      expect(scale.scale(0)).to.be.equal(0);
      expect(scale.scale(0.1)).to.be.equal(0.02);
    });

    it('invert big then 1', () => {
      expect(equal(scale.invert(0.2), 1)).to.be.equal(true);
      expect(equal(scale.invert(0.4), 10)).to.be.equal(true);
      expect(equal(scale.invert(0.6), 100)).to.be.equal(true);
      expect(equal(scale.invert(1), 10000)).to.be.equal(true);
    });

    it('invert little then 1', () => {
      expect(equal(scale.invert(0.02), 0.1)).to.be.equal(true);
      expect(scale.invert(0)).to.be.equal(0);
    });
  });

  describe('scale with values, all big then 1', () => {
    const scale = Scale.log({
      base: 10,
      min: 0,
      values: [ 0, 10, 300, 400 ],
      max: 10000
    });

    it('get ticks', () => {
      expect(scale.ticks).eql([ 0, 1, 10, 100, 1000, 10000 ]);
      expect(scale.getTicks()[0]).eql({
        text: '0',
        value: 0,
        tickValue: 0
      });
    });
    it('scale big then 1', () => {
      expect(equal(scale.scale(1), 0.2)).to.be.equal(true);
      expect(equal(scale.scale(1000), 0.8)).to.be.equal(true);
      expect(equal(scale.scale(10000), 1)).to.be.equal(true);
    });

    it('invert little then 1', () => {
      expect(equal(scale.invert(0.02), 0.1)).to.be.equal(true);
      expect(scale.invert(0)).to.be.equal(0);
    });
  });

  describe('scale with values, has litter then one', () => {
    const scale = Scale.log({
      base: 10,
      min: 0,
      values: [ 0, 0.1, 0.5, 0.8, 10, 300, 400 ],
      max: 1000
    });

    it('get ticks', () => {
      expect(scale.ticks).eql([ 0, 0.1, 1, 10, 100, 1000 ]);
      expect(scale.getTicks()[0]).eql({
        text: '0',
        value: 0,
        tickValue: 0
      });
    });

    it('scale big then 0.1', () => {
      expect(equal(scale.scale(0.1), 0.2)).to.be.equal(true);
      expect(equal(scale.scale(100), 0.8)).to.be.equal(true);
      expect(equal(scale.scale(1000), 1)).to.be.equal(true);
    });

    it('invert big then 0.1', () => {
      expect(equal(scale.invert(0.2), 0.1)).to.be.equal(true);
      expect(equal(scale.invert(0.4), 1)).to.be.equal(true);
      expect(equal(scale.invert(0.6), 10)).to.be.equal(true);
      expect(equal(scale.invert(1), 1000)).to.be.equal(true);
    });

    it('invert little then 0.1', () => {
      expect(equal(scale.invert(0.02), 0.01)).to.be.equal(true);
      expect(scale.invert(0)).to.be.equal(0);
    });
  });

});
