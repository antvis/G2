const data = [
  { action: '浏览网站', pv: 50000 },
  { action: '放入购物车', pv: 35000 },
  { action: '生成订单', pv: 25000 },
  { action: '支付订单', pv: 15000 },
  { action: '完成交易', pv: 8000 }
];

const chart = new G2.Chart({
  container: 'container',
  forceFit: true,
  height: 500,
  padding: [ 20, 120, 95 ]
});
chart.source(data);
chart.axis(false);
chart.coord('rect').transpose().scale(1, -1);
chart.intervalSymmetric().position('action*pv')
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
