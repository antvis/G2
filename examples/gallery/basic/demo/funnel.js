import { Chart } from '@antv/g2';

const data = [
  { action: '浏览网站', pv: 50000, percent: 1 },
  { action: '放入购物车', pv: 35000, percent: 0.7 },
  { action: '生成订单', pv: 25000, percent: 0.5 },
  { action: '支付订单', pv: 15000, percent: 0.3 },
  { action: '完成交易', pv: 8000, percent: 0.16 },
];
const chart = new Chart({
  container: 'container',
  width: 400,
  height: 400,
  autoFit: false,
});
chart.data(data);
chart
  .coordinate('rect')
  .transpose()
  .scale(1, -1);
// @ts-ignore
chart
  .interval()
  .position('action*percent')
  .shape('pyramid')
  .color('action')
  .adjust('symmetric')
  .animate(false);
chart.render();
