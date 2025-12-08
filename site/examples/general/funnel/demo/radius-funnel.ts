import { Chart } from '@antv/g2';

const data = [
  { action: '浏览网站', pv: 50000 },
  { action: '访问人数', pv: 30000 },
  { action: '放入购物车', pv: 35000 },
  { action: '生成订单', pv: 25000 },
  { action: '支付订单', pv: 15000 },
  { action: '完成交易', pv: 8000 },
];

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.coordinate({
  transform: [{ type: 'transpose' }],
});

chart.data(data);

chart
  .interval()
  .encode('x', 'action')
  .encode('y', 'pv')
  .encode('color', 'action')
  .encode('shape', 'funnel')
  .transform({ type: 'symmetryY' })
  .scale('x', { padding: 0 })
  .animate('enter', { type: 'fadeIn' })
  .style('innerRadiusTopLeft', 0)
  .style('innerRadiusTopRight', 5)
  .style('innerRadiusBottomRight', 10)
  .style('innerRadiusBottomLeft', 15)
  .style('radiusBottomRight', 0)
  .style('radiusBottomLeft', 0)
  .label({
    text: (d) => `${d.action}\n${d.pv}`,
    position: 'inside',
    transform: [{ type: 'contrastReverse' }],
  })
  .axis(false);

chart.render();
