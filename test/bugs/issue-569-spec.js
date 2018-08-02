const G2 = require('../../src/index');
const expect = require('chai').expect;

describe('#569', () => {
  it('pyramid diagram display error when the last data value was 0.', () => {
    const div = document.createElement('div');
    document.body.appendChild(div);
    const data = [
    { action: '浏览网站', pv: 50000 },
    { action: '放入购物车', pv: 35000 },
    { action: '生成订单', pv: 25000 },
    { action: '支付订单', pv: 15000 },
    { action: '完成交易', pv: 0 }
    ];

    const chart = new G2.Chart({
      container: div,
      forceFit: true,
      height: window.innerHeight,
      padding: [ 20, 120, 95 ]
    });
    chart.source(data);
    chart.axis(false);
    chart.coord('rect').transpose().scale(1, -1);
    const pyramid = chart.intervalSymmetric().position('action*pv')
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
    const shapes = pyramid.getShapes();
    const path = shapes[0].attr('path');
    expect(path.length).to.equal(5);
    expect(path[0].length).eql(3);
    expect(path[1].length).eql(3);
    expect(path[2].length).eql(3);
    expect(path[3].length).eql(3);
    expect(path[4].length).eql(1);

  });
});
