
const expect = require('chai').expect;
const Scale = require('../../../src/scale/');

describe('scale base test', () => {
  it('cfg', function() {
    const scale = new Scale({
      ticks: [ 1, 2, 3, 4 ]
    });
    expect(scale.ticks.length).to.be.equal(4);
  });
  it('translate', function() {
    const scale = new Scale({});
    expect(scale.translate(5)).to.be.equal(5);
  });
  it('invert', function() {
    const scale = new Scale({});
    expect(scale.invert(5)).to.be.equal(5);
  });
  it('scale', function() {
    const scale = new Scale({});
    expect(scale.scale(5)).to.be.equal(5);
  });
  it('getTicks', function() {
    const scale = new Scale({
      ticks: [ 1, 2, 3, 4 ]
    });
    expect(scale.getTicks()[0]).eqls({ text: '1', tickValue: 1, value: 1 });
  });
  it('clone', function() {
    const scale = new Scale({
      ticks: [ 1, 2, 3, 4, 5 ]
    });
    const newScale = scale.clone();
    expect(newScale.ticks).eqls([ 1, 2, 3, 4, 5 ]);
  });
  it('change', function() {
    const scale = new Scale({
      ticks: [ 1, 2, 3, 4, 5 ]
    });
    expect(scale.getTicks().length).to.be.equal(5);
    scale.change({
      ticks: [ 1, 2 ]
    });
    expect(scale.getTicks().length).to.be.equal(2);
  });
});

describe('scale identity', function() {

  const scale = new Scale.identity({
    value: 'test'
  });

  it('create', function() {
    expect(scale.value).to.be.equal('test');
  });

  it('scale', function() {
    expect(scale.scale('test')).to.be.equal(0);
  });

  it('invert', function() {
    expect(scale.invert(1)).to.be.equal('test');
    expect(scale.invert(0)).to.be.equal('test');
  });

  it('get text', function() {
    expect(scale.getText()).to.be.equal('test');
  });
});
