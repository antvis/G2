const expect = require('chai').expect;
const Scale = require('../../../src/scale/');

describe('scale linear', () => {

  const scale = new Scale.Linear({
    min: 0,
    max: 100,
    formatter(val) {
      return val + '元';
    }
  });

  it('cfg', () => {
    expect(scale.min).to.be.equal(0);
    expect(scale.max).to.be.equal(100);
    expect(scale.type).to.be.equal('linear');
  });

  it('translate', () => {
    expect(scale.translate(50)).to.be.equal(50);
  });
  it('scale', () => {
    const val = scale.scale(50);
    expect(val).to.be.equal(0.5);
    expect(scale.scale(0)).to.be.equal(0);
    expect(scale.scale(100)).to.be.equal(1);
  });

  it('invert', () => {
    expect(scale.invert(0)).to.be.equal(0);
    expect(scale.invert(0.5)).to.be.equal(50);

    expect(scale.invert(1)).to.be.equal(100);
  });

  it('formatter', () => {
    expect(scale.getText(5)).to.be.equal('5元');
  });

  it('ticks', () => {
    const ticks = scale.getTicks();
    expect(ticks.length).not.to.be.equal(0);

    expect(ticks[0].value).to.be.equal(0);
    expect(ticks[ticks.length - 1].value).to.be.equal(1);
  });

  it('clone', () => {
    const n1 = scale.clone();
    expect(n1.scale(0)).to.be.equal(0);
    expect(n1.scale(0)).to.be.equal(0);
    expect(n1.scale(100)).to.be.equal(1);

    expect(n1.type).to.be.equal('linear');
  });

  it('scale null', () => {
    expect(isNaN(scale.scale(null))).to.be.equal(true);
  });

  it('change', () => {
    scale.change({
      min: 10,
      max: 110
    });
    expect(scale.scale(60)).to.be.equal(0.5);
  });

});

describe('scale linear change range', () => {

  const scale = Scale.linear({
    min: 0,
    max: 100,
    range: [ 0, 1000 ]
  });

  it('cfg', () => {
    expect(scale.range).not.to.be.equal(null);
    expect(scale.range[0]).to.be.equal(0);
    expect(scale.range[1]).to.be.equal(1000);
  });

  it('scale', () => {
    const val = scale.scale(50);
    expect(val).to.be.equal(500);
    expect(scale.scale(0)).to.be.equal(0);
    expect(scale.scale(100)).to.be.equal(1000);
  });

  it('invert', () => {
    expect(scale.invert(0)).to.be.equal(0);
    expect(scale.invert(500)).to.be.equal(50);
    expect(scale.invert(1000)).to.be.equal(100);
  });

});

describe('scale not nice', () => {

  const scale = Scale.linear({
    min: 3,
    max: 97
  });

  it('cfg', () => {
    expect(scale.min).to.be.equal(3);
    expect(scale.max).to.be.equal(97);
  });

  it('scale', () => {
    const val = scale.scale(50);
    expect(val).to.be.equal((50 - 3) / (97 - 3));

  });

  it('invert', () => {
    expect(scale.invert(0)).to.be.equal(3);
    expect(scale.invert(1)).to.be.equal(97);
  });

  it('ticks', () => {
    const ticks = scale.getTicks();
    expect(+ticks[0].text > 3).to.be.equal(true);
    expect(+ticks[ticks.length - 1].text < 97).to.be.equal(true);
  });

});


describe('scale nice', () => {

  const scale = Scale.linear({
    min: 3,
    max: 97,
    nice: true
  });

  it('cfg', () => {
    expect(scale.min).not.to.be.equal(3);
    expect(scale.max).not.to.be.equal(97);
  });

  it('scale', () => {
    const val = scale.scale(50);
    expect(val).to.be.equal(0.5);

  });

  it('invert', () => {
    expect(scale.invert(0)).to.be.equal(0);
    expect(scale.invert(1)).to.be.equal(100);
  });

  it('ticks', () => {
    const ticks = scale.getTicks();
    expect(+ticks[0].text < 3).to.be.equal(true);

    expect(+ticks[ticks.length - 1].text > 97).to.be.equal(true);
  });

  it('clone', () => {
    const s1 = scale.clone();
    expect(s1.invert(0)).to.be.equal(0);
  });

});

describe('scale ticks', () => {
  const scale = Scale.linear({
    ticks: [ 1, 2, 3, 4, 5 ]
  });

  it('min,max', () => {
    expect(scale.min).to.be.equal(1);
    expect(scale.max).to.be.equal(5);
  });

});

describe('scale linear: min is equal to max', () => {
  const scale = Scale.linear({
    min: 0,
    max: 0,
    nice: false
  });

  it('scale', () => {
    const val = scale.scale(0);
    expect(val).to.be.equal(0);
  });

  it('invert', () => {
    expect(scale.invert(1)).to.be.equal(0);
    expect(scale.invert(0)).to.be.equal(0);
  });
});

describe('scale linear: min is equal to max,nice true', () => {
  const scale = Scale.linear({
    min: 0,
    max: 0,
    nice: true
  });

  it('scale', () => {
    const val = scale.scale(0);
    expect(val).to.be.equal(0);
  });

  it('invert', () => {
    expect(scale.invert(1)).to.be.equal(1);
    expect(scale.invert(0)).to.be.equal(0);
  });
});

describe('scale linear: declare tickInterval.', () => {
  const scale = Scale.linear({
    min: 20,
    max: 85,
    tickInterval: 15,
    nice: true
  });

  it('ticks', () => {
    const ticks = scale.ticks;
    expect(ticks.length).to.be.equal(6);
    expect(ticks).eql([ 15, 30, 45, 60, 75, 90 ]);
  });
});
