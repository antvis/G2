const expect = require('chai').expect;
const Scale = require('../../../src/scale/');
const fecha = require('fecha');

describe('scale time', function() {

  const scale = new Scale.Time({
    min: '2011-01-01',
    max: '2011-01-02',
    mask: 'YYYY-MM-DD HH:mm:ss'
  });

  it('min,max', function() {
    expect(scale.min).to.be.equal(new Date('2011/01/01').getTime());
    expect(scale.max).to.be.equal(new Date('2011/01/02').getTime());
  });

  it('ticks', function() {
    const ticks = scale.getTicks();
    expect(ticks.length).not.to.be.equal(0);
  });

  it('scale', function() {
    const text = '2011-01-01 06:00:00';
    const val = scale.scale(text);
    expect(val).to.be.equal(0.25);
    expect(scale.getText(scale.invert(val))).to.be.equal(text);
  });

  it('get text', function() {
    const text = scale.getText('2011-01-02');
    expect(text).to.be.equal('2011-01-02 00:00:00');
  });

  it('get text has T', function() {
    const text = scale.getText('2011-01-02T00:00:00');
    expect(text).to.be.equal('2011-01-02 00:00:00');
  });

  it('get text has T && Z', function() {
    const text = scale.getText('2016-05-04T00:00:00.000Z');
    expect(text).to.be.equal(fecha.format(new Date('2016-05-04T00:00:00.000Z'), 'YYYY-MM-DD HH:mm:ss'));
  });
});


describe('scale time, declare tickInterval.', function() {

  const scale = new Scale.Time({
    min: '2011-01-01',
    max: '2011-02-02',
    tickInterval: 86400000 * 10, // 10 天
    mask: 'YYYY-MM-DD'
  });

  it('ticks', function() {
    const ticks = scale.getTicks();
    expect(ticks.length).to.be.equal(4);
  });
});

describe('scale time, calc min and max.', function() {

  const scaleA = new Scale.Time({
    values: [ '2009/6/12 2:31', '2009/6/12 2:04', '2009/9/9 12:20', '2009/9/9 02:00' ],
    mask: 'YYYY-MM-DD'
  });

  it('min,max', function() {
    expect(scaleA.min).to.be.equal(new Date('2009/6/12 2:04').getTime());
    expect(scaleA.max).to.be.equal(new Date('2009/9/9 12:20').getTime());
  });
  const scaleB = new Scale.Time({
    values: [ '2009/6/12 2:31', '2009/6/12 2:04', '2009/9/9 12:20', '2009/9/9 2:00' ],
    mask: 'YYYY-MM-DD',
    min: '2009/6/11 2:31',
    max: '2009/9/10 2:00'
  });

  it('min,max', function() {
    expect(scaleB.min).to.be.equal(new Date('2009/6/11 2:31').getTime());
    expect(scaleB.max).to.be.equal(new Date('2009/9/10 2:00').getTime());
  });
});


describe('min tickInterval', function() {
  it('only one', function() {
    const scale = Scale.time({
      values: [ '2009/6/12 2:31' ]
    });
    expect(scale.minTickInterval).to.be.equal(undefined);
  });
  it('two and no sort', function() {
    const scale = Scale.time({
      values: [ '2009/6/12 02:30', '2009/6/12 02:00' ]
    });
    expect(scale.minTickInterval).to.be.equal(30 * 60 * 1000);
  });
  it('multiple values', function() {
    const scale = Scale.time({
      values: [ '2009/6/12 02:31', '2009/6/12 02:04', '2009/6/12 02:14' ]
    });
    expect(scale.minTickInterval).to.be.equal(10 * 60 * 1000);
  });
});
