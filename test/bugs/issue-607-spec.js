const G2 = require('../../src/index');
const expect = require('chai').expect;

describe('#607', () => {
  it('crashed when data is empty and time scale is set', () => {
    const div = document.createElement('div');
    document.body.appendChild(div);
    const data = [
    ];
    const chart = new G2.Chart({
      container: div,
      width: 500,
      height: 540,
      animate: true
    });

    chart.source(data, {
      time: {
        alias: '时间',
        type: 'time',
        mask: 'MM:ss',
        tickCount: 10,
        nice: false
      },
      temperature: {
        alias: '平均温度(°C)',
        min: 10,
        max: 35
      },
      type: {
        type: 'cat'
      }
    });
    chart.line()
      .position('time*temperature')
      .color('type', [ '#ff7f0e', '#2ca02c' ])
      .shape('smooth')
      .size(2);

    expect(() => {
      chart.render();
    }).to.not.throw();
  });
});
