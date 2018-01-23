const DataSet = require('@antv/data-set');
const G2 = require('../../src/index');

describe('#242', () => {
  it('Tooltip throws error when shape\'s area is 0', () => {
    const div = document.createElement('div');
    document.body.appendChild(div);
    const data = [
      {
        date: '2017-12-01',
        其他: 0,
        '1.1.0': 0,
        '2.0.1': 0,
        '2.1.0': 0,
        '2.2.0': 0,
        '2.2.1': 0,
        '2.3.0': 0,
        '2.3.1': 0,
        '2.4.0': 0,
        '2.4.3': 0
      }, {
        date: '2017-12-02',
        其他: 0,
        '1.1.0': 0,
        '2.0.1': 0,
        '2.1.0': 0,
        '2.2.0': 0,
        '2.2.1': 0,
        '2.3.0': 0,
        '2.3.1': 0,
        '2.4.0': 0,
        '2.4.3': 0
      }, {
        date: '2017-12-03',
        其他: 0,
        '1.1.0': 0,
        '2.0.1': 0,
        '2.1.0': 0,
        '2.2.0': 0,
        '2.2.1': 0,
        '2.3.0': 0,
        '2.3.1': 0,
        '2.4.0': 0,
        '2.4.3': 0
      }
    ];
    const dv1 = new DataSet.View().source(data);
    dv1.transform({
      type: 'fold',
      fields: [ '其他', '1.1.0', '2.0.1', '2.1.0', '2.2.0', '2.2.1', '2.3.0', '2.3.1', '2.4.0', '2.4.3' ], // 展开字段集
      key: 'key', // key字段
      value: 'value', // value字段
      retains: [ 'date' ] // 保留字段集，默认为除 fields 以外的所有字段
    });

    const dv = new DataSet.View().source(dv1);
    dv.transform({
      type: 'percent',
      field: 'value',
      dimension: 'key',
      groupBy: [ 'date' ],
      as: 'percent'
    });

    const chart = new G2.Chart({
      container: div
    });
    chart.source(dv, {
      year: {
        type: 'linear'
      },
      percent: {
        formatter(value) {
          value = value || 0;
          value = value * 100;
          return value + '%';
        },
        alias: 'percent(%)'
      }
    });
    chart.tooltip({
      crosshairs: {
        type: 'line'
      }
    });
    chart.areaStack().position('date*percent')
      .color('key');
    chart.lineStack().position('date*percent')
      .color('key')
      .size(2);
    chart.render();
  });
});
