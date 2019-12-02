// FIXME：Label

import { Chart } from '@antv/g2';

const data = [
  { item: '事例一', count: 40, percent: 0.4 },
  { item: '事例二', count: 21, percent: 0.21 },
  { item: '事例三', count: 17, percent: 0.17 },
  { item: '事例四', count: 13, percent: 0.13 },
  { item: '事例五', count: 9, percent: 0.09 },
];

const chart = new Chart({
  container: 'container',
  height: 300,
});

chart.data(data);
chart.scale('percent', {
  formatter: (val) => {
    val = val * 100 + '%';
    return val;
  },
});
chart.coordinate('theta', {
  radius: 0.75,
});
chart.tooltip({
  showTitle: false,
  showTooltipMarkers: false,
});
chart.axis(false); // 关闭坐标轴
chart
  .interval()
  .position('1*percent')
  .color('item')
  .label('percent', {
    formatter: (val, item) => {
      return item.point.item + ': ' + val;
    },
  })
  .style({
    lineWidth: 1,
    stroke: '#fff',
  })
  .adjust('stack');

chart.interaction('active');

chart.render();
