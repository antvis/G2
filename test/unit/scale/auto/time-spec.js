const expect = require('chai').expect;
const auto = require('../../../../src/scale/auto/time');

function parseArray(arr) {
  return arr.map(function(value) {
    return new Date(value).getTime();
  });
}
function parseTime(arr) {
  return arr.map(function(value) {
    return new Date(value);
  });
}

describe('test time auto', () => {
  it('years', () => {
    const rst = auto({
      min: new Date('2010/01/01 00:00:00'),
      max: new Date('2015/12/31 00:00:00')
    });

    expect(rst.ticks).eql(parseArray([ '2010/01/01 00:00:00', '2011/01/01 00:00:00', '2012/01/01 00:00:00', '2013/01/01 00:00:00',
      '2014/01/01 00:00:00', '2015/01/01 00:00:00', '2016/01/01 00:00:00'
    ]));
  });

  it('years with hours', () => {
    const rst = auto({
      min: new Date('2010/01/01 08:00:00'),
      max: new Date('2015/12/31 08:00:00')
    });

    expect(rst.ticks).eql(parseArray([ '2010/01/01 00:00:00', '2011/01/01 00:00:00', '2012/01/01 00:00:00', '2013/01/01 00:00:00',
      '2014/01/01 00:00:00', '2015/01/01 00:00:00', '2016/01/01 00:00:00'
    ]));
  });

  it('months', () => {
    const rst = auto({
      min: new Date('2010/01/01 00:00:00'),
      max: new Date('2010/12/31 20:00:00')
    });

    expect(rst.ticks).eql(parseArray([ '2010/01/01 00:00:00', '2010/03/01 00:00:00', '2010/05/01 00:00:00', '2010/07/01 00:00:00',
      '2010/09/01 00:00:00', '2010/11/01 00:00:00', '2011/01/01 00:00:00'
    ]));
  });

  xit('months', () => {
    const rst = auto({
      min: 1490976000000,
      max: 1504195200000
    });

    console.log(parseTime(rst.ticks));
    expect(rst.ticks).eql(parseArray([ '2010/01/01 00:00:00', '2010/03/01 00:00:00', '2010/05/01 00:00:00', '2010/07/01 00:00:00',
      '2010/09/01 00:00:00', '2010/11/01 00:00:00', '2011/01/01 00:00:00'
    ]));
  });


  it('days', () => {
    let rst = auto({
      min: new Date('2010/01/01 00:00:00'),
      max: new Date('2010/01/06 10:00:00')
    });

    expect(rst.interval).to.be.equal(24 * 3600 * 1000);

    rst = auto({
      min: new Date('2010/01/01 00:00:00'),
      max: new Date('2010/01/10 10:00:00')
    });

    expect(rst.interval).to.be.equal(24 * 3600 * 1000 * 2);
  });

  it('hours', () => {
    const rst = auto({
      min: new Date('2010/01/01 00:00:00'),
      max: new Date('2010/01/01 23:00:00')
    });
    expect(rst.ticks.length).to.be.equal(7);
    expect(rst.interval).to.be.equal(3600 * 1000 * 4);

    expect(rst.ticks).eql(parseArray([ '2010/01/01 00:00:00', '2010/01/01 04:00:00', '2010/01/01 08:00:00', '2010/01/01 12:00:00',
      '2010/01/01 16:00:00', '2010/01/01 20:00:00', '2010/01/02 00:00:00'
    ]));
  });

  it('minutes', () => {
    const rst = auto({
      min: new Date('2010/01/01 00:00:00'),
      max: new Date('2010/01/01 01:00:00')
    });
    expect(rst.interval).to.be.equal(60 * 1000 * 10);
  });

  it('seconds', () => {
    const rst = auto({
      min: new Date('2010/01/01 00:00:00'),
      max: new Date('2010/01/01 00:01:00')
    });
    expect(rst.interval).to.be.equal(1000 * 10);

  });

  it('interval', () => {
    const rst = auto({
      min: new Date('2010/01/01 00:00:00'),
      interval: 20 * 1000,
      max: new Date('2010/01/01 00:01:00')
    });

    expect(rst.ticks.length).to.be.equal(4);
    expect(rst.ticks).eql(parseArray([ '2010/01/01 00:00:00', '2010/01/01 00:00:20', '2010/01/01 00:00:40', '2010/01/01 00:01:00' ]));
  });

  it('count', () => {
    const rst = auto({
      min: new Date('2010/01/01 00:00:00'),
      maxCount: 4,
      max: new Date('2010/01/01 00:01:00')
    });
    expect(rst.ticks.length).to.be.equal(5);
  });

  it('max == min', () => {
    const rst = auto({
      min: new Date('2010/01/01 00:00:00').getTime(),
      max: new Date('2010/01/01 00:00:00').getTime()
    });

    expect(rst.interval).to.be.equal(3600 * 1000 * 4);
  });

  it('minInterval', () => {
    const rst = auto({
      min: new Date('2010/01/01 00:00:00'),
      maxCount: 4,
      minInterval: 60 * 1000,
      max: new Date('2010/01/01 00:01:00')
    });
    expect(rst.interval).to.be.equal(60 * 1000);
    expect(rst.ticks).eql([ new Date('2010/01/01 00:00:00').getTime(), new Date('2010/01/01 00:01:00').getTime() ]);
  });

  it('minInterval < interval', () => {
    const rst = auto({
      min: new Date('2010/01/01 00:00:00'),
      maxCount: 4,
      minInterval: 60 * 60 * 1000,
      max: new Date('2010/01/05 00:00:00')
    });
    expect(rst.interval).to.be.equal(24 * 60 * 60 * 1000);
  });

  it('has interval width minInterval', () => {
    const rst = auto({
      min: new Date('2010/01/01 00:00:00'),
      maxCount: 4,
      interval: 2 * 24 * 60 * 60 * 1000,
      minInterval: 60 * 60 * 1000,
      max: new Date('2010/01/05 00:00:00')
    });
    expect(rst.interval).to.be.equal(2 * 24 * 60 * 60 * 1000);
  });
});
