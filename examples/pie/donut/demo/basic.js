import { Chart } from '@antv/g2';

const data = [
  { type: '分类一', value: 20 },
  { type: '分类二', value: 18 },
  { type: '分类三', value: 32 },
  { type: '分类四', value: 15 },
  { type: 'Other', value: 15 },
];

const chart = new Chart({
  container: 'container',
  forceFit: true,
  height: 500,
});

chart.data(data);
chart.coordinate('theta', {
  innerRadius: 0.75,
});

chart
  .interval()
  .position('1*value')
  .color('type')
  .adjust('stack');

chart.render();
