const expect = require('chai').expect;
const G2 = require('../../src/index');

describe('#213', () => {
  it('funnel animate bug', done => {
    const div = document.createElement('div');
    document.body.appendChild(div);
    const data = [
      { action: '浏览网站', pv: 50000 },
      { action: '放入购物车', pv: 35000 },
      { action: '生成订单', pv: 25000 },
      { action: '支付订单', pv: 15000 },
      { action: '完成交易', pv: 8000 }
    ];

    const chart = new G2.Chart({
      container: div,
      width: 500,
      height: 500,
      padding: [ 20, 120, 95 ]
    });
    chart.source(data);
    chart.axis(false);
    chart.filter('action', action => action !== '完成交易');
    chart.coord('rect').transpose().scale(1, -1);
    const interval = chart.intervalSymmetric().position('action*pv')
      .shape('pyramid')
      .color('action', [ '#0050B3', '#1890FF', '#40A9FF', '#69C0FF', '#BAE7FF' ])
      .label('action*pv', (action, pv) => {
        return action + ' ' + pv;
      }, {
        offset: 35,
        labelLine: {
          lineWidth: 1,
          stroke: 'rgba(0, 0, 0, 0.15)'
        }
      });
    chart.render();

    setTimeout(() => {
      chart.filter('action', null);
      chart.repaint();
      setTimeout(() => {
        const shapes = interval.getShapes();
        const shape = shapes[3];
        expect(shape.attr('path')[3][2]).not.eqls(NaN);
        done();
      }, 500);
    }, 500);

  });
});
