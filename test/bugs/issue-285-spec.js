const DataSet = require('@antv/data-set');
const expect = require('chai').expect;
const G2 = require('../../src/index');

describe('#285', () => {
  it('Throws to break endless loop in scale calculating when field values are not regular', () => {
    const div = document.createElement('div');
    document.body.appendChild(div);
    const data = [{
      name: 'London',
      '2017-12-07': 18.9,
      'Feb.': 28.8,
      'Mar.': 39.3,
      'Apr.': 81.4,
      'May.': 47,
      'Jun.': 20.3,
      'Jul.': 24,
      'Aug.': 35.6
    }, {
      name: 'Berlin',
      '2017-12-07': 12.4,
      'Feb.': 23.2,
      'Mar.': 34.5,
      'Apr.': 99.7,
      'May.': 52.6,
      'Jun.': 35.5,
      'Jul.': 37.4,
      'Aug.': 42.4
    }];
    const ds = new DataSet();
    const dv = ds.createView().source(data);
    dv.transform({
      type: 'fold',
      fields: [ '2017-12-07', 'Feb.', 'Mar.', 'Apr.', 'May.', 'Jun.', 'Jul.', 'Aug.' ], // 展开字段集
      key: '月份', // key字段
      value: '月均降雨量' // value字段
    });
    const chart = new G2.Chart({
      container: div,
      forceFit: true,
      height: window.innerHeight
    });
    chart.source(dv);
    chart.interval()
      .position('月份*月均降雨量');

    expect(() => {
      chart.render();
    }).to.throw();
  });
});
