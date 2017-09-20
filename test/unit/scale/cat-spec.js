const expect = require('chai').expect;
const Scale = require('../../../src/scale/');
const fecha = require('fecha');

describe('scale cat', function() {

  const scale = Scale.cat({
    values: [ '一月', '二月', '三月', '四月', '五月' ]
  });

  it('cfg', function() {
    expect(scale.values).not.to.be.equal(undefined);
    expect(scale.type).to.be.equal('cat');
  });

  it('translate', function() {
    expect(scale.translate('二月')).to.be.equal(1);
    expect(scale.translate(1)).to.be.equal(1);
    expect(isNaN(scale.translate('test'))).eql(true);
  });

  it('scale', function() {
    const val = scale.scale('二月');
    expect(val).to.be.equal(0.25);
    expect(scale.scale(0)).to.be.equal(0);
    expect(scale.scale(4)).to.be.equal(1);
  });

  it('get text', function() {
    expect(scale.getText('二月')).to.be.equal('二月');
    expect(scale.getText(1)).to.be.equal('二月');
  });
  it('invert', function() {
    expect(scale.invert(0)).to.be.equal('一月');
    expect(scale.invert(0.5)).to.be.equal('三月');
    expect(scale.invert(1)).to.be.equal('五月');
    expect(scale.invert('二月')).to.be.equal('二月');
    expect(scale.invert(-1)).to.be.equal('一月');
    expect(scale.invert(2)).to.be.equal('五月');
  });

  it('ticks', function() {
    const ticks = scale.getTicks();
    expect(ticks.length).to.be.equal(scale.values.length);

    expect(ticks[0].value).to.be.equal(0);
    expect(ticks[ticks.length - 1].value).to.be.equal(1);
  });

  it('clone', function() {
    const n1 = scale.clone();
    expect(n1.scale(0)).to.be.equal(0);
    expect(n1.scale(2)).to.be.equal(0.5);
    expect(n1.scale(4)).to.be.equal(1);

    expect(scale.invert(0)).to.be.equal('一月');
    expect(scale.invert(0.5)).to.be.equal('三月');

    expect(scale.invert(1)).to.be.equal('五月');

    expect(n1.type).to.be.equal('cat');
  });

  it('change', function() {
    scale.change({
      values: [ '一', '二', '三', '四', '五', '六' ]
    });
    expect(scale.invert(0)).to.be.equal('一');
    expect(scale.invert(0.4)).to.be.equal('三');

    expect(scale.invert(1)).to.be.equal('六');
    expect(scale.getTicks().length).to.be.equal(6);
  });

  it('is category', function() {
    expect(Scale.isCategory('cat')).to.be.equal(true);
  });

  it('Converted into string', function() {
    scale.change({
      values: [ 1, 2, 3, 4, 5 ]
    });
    expect(typeof scale.values[0]).to.be.equal('string');
  });
});

describe('scale cat change range', function() {

  const scale = Scale.cat({
    values: [ '一月', '二月', '三月', '四月', '五月' ],
    range: [ 0.1, 0.9 ]
  });

  it('cfg', function() {
    expect(scale.range).not.to.be.equal(null);
    expect(scale.range[0]).to.be.equal(0.1);
    expect(scale.range[1]).to.be.equal(0.9);
  });

  it('scale', function() {
    const val = scale.scale('二月');
    expect(parseFloat(val.toFixed(1))).to.be.equal(0.3);
    expect(scale.scale(0)).to.be.equal(0.1);
    expect(scale.scale(4)).to.be.equal(0.9);

    expect(scale.scale('一月')).to.be.equal(0.1);
    expect(scale.scale('五月')).to.be.equal(0.9);
  });

  it('invert', function() {
    expect(scale.invert(0.1)).to.be.equal('一月');
    expect(scale.invert(0.5)).to.be.equal('三月');

    expect(scale.invert(0.9)).to.be.equal('五月');
  });

});

describe('scale cat with tick count', function() {
  const values = [];
  for (let i = 0; i < 100; i++) {
    values.push(i);
  }
  const scale = Scale.cat({
    values,
    tickCount: 10
  });

  it('cfg', function() {
    expect(scale.values.length).to.be.equal(100);
    expect(scale.ticks.length).not.to.be.equal(100);
  });

  it('ticks', function() {
    const ticks = scale.getTicks();
    expect(ticks[0].value).to.be.equal(0);
    expect(ticks[ticks.length - 1].value).to.be.equal(1);
    expect(ticks.length).to.be.equal(10);

  });

});

// 时间分类 time-category
describe('scale time cat', function() {
  const mask = 'YYYY/MM/DD';
  const scale = Scale.timeCat({
    values: [ 1442937600000, 1441296000000, 1449849600000 ],
    mask
  });

  it('is category', function() {
    expect(Scale.isCategory('timeCat')).to.be.equal(true);
  });

  it('cfg', function() {
    expect(scale.values).not.to.be.equal(undefined);
    expect(scale.type).to.be.equal('timeCat');
    expect(scale.mask).to.be.equal('YYYY/MM/DD');
  });

  it('translate', function() {
    expect(scale.translate(1441296000000)).to.be.equal(0);
    expect(scale.translate(1)).to.be.equal(1);
    expect(scale.translate('2015/10/06').toString()).to.be.equal('NaN');
    expect(scale.translate(3).toString()).to.be.equal('NaN');

  });

  it('scale', function() {
    expect(scale.scale(1441296000000)).to.be.equal(0);
    expect(scale.scale(2)).to.be.equal(1);
    expect(scale.scale('2015/10/06')).to.be.equal(0);
  });

  it('invert', function() {
    expect(scale.invert(0)).to.be.equal(1441296000000);
    expect(scale.invert(0.5)).to.be.equal(1442937600000);
    expect(scale.invert(1)).to.be.equal(1449849600000);
  });

  it('getText', function() {
    const text = scale.getText(1441296000000);
    const date = new Date(1441296000000);
    expect(text).to.be.equal(fecha.format(date, mask)); // 原始值
    expect(scale.getText(1)).to.be.equal(fecha.format(1442937600000, mask)); // 索引
  });

  it('this.ticks', function() {
    // 按照 mask 格式化后的 ticks
    expect(scale.ticks.length).to.be.equal(3);
    expect(scale.ticks).eqls([
      fecha.format(1441296000000, mask),
      fecha.format(1442937600000, mask),
      fecha.format(1449849600000, mask)
    ]);
  });

  it('getTicks()', function() {
    const ticks = scale.getTicks();
    expect(typeof ticks[0]).to.be.equal('object');
    expect(ticks[1].value).to.be.equal(0.5);
    expect(ticks[1].text).to.be.equal(fecha.format(1442937600000, mask));
  });

  it('change', function() {
    scale.change({
      range: [ 0.2, 0.8 ],
      values: [ 1442937600000, 1441296000000, 1449849600000, 1359648000000, 1362326400000, 1443024000000 ]
    });
    expect(scale.invert(scale.scale(1442937600000))).to.be.equal(1442937600000);
  });

  it('change with ticks', function() {
    scale.change({
      range: [ 0, 1 ],
      ticks: [ 1442937600000, 1443024000000 ],
      values: [ 1442937600000, 1441296000000, 1449849600000, 1359648000000, 1362326400000, 1443024000000 ]
    });
    expect(scale.getTicks().length).equal(2);
    console.log(scale.getTicks());
  });
});
/**/
