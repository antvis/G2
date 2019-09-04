const expect = require('chai').expect;
const G2 = require('../../src/index');

const div = document.createElement('div');
document.body.appendChild(div);

describe('#1249', function() {
  const data = [{
    year: '1991',
    value: 3
  }, {
    year: '1992',
    value: 4
  }, {
    year: '1993',
    value: 3
  }, {
    year: '1994',
    value: 5
  }, {
    year: '1995',
    value: 4
  }, {
    year: '1996',
    value: 6
  }, {
    year: '1997',
    value: 7
  }, {
    year: '1998',
    value: 9
  }, {
    year: '1999',
    value: 1
  }];
  const chart = new G2.Chart({
    container: div,
    forceFit: true,
    padding: 'auto'
  });
  chart.source(data);
  chart.scale('value', {
    min: 0,
    alias: 'id'
  });
  chart.axis('value', {
    title: true
  });
  chart.scale('year', {
    range: [ 0, 1 ]
  });

  chart.line().position('year*value');

  chart.render();

  it('when y axis alias length <= 2', function() {
    // 左侧 padding > 50（目前测试是 title + tick ~= 59 的左侧 padding）
    expect(chart.get('plot').get('padding')[3] > 50).equal(true);
  });

  it('destroy', function() {
    chart.destroy();
    document.body.removeChild(div);
  });
});
