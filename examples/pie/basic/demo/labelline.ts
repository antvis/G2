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
  autoFit: true,
  height: 500,
});

chart.coordinate('theta', {
  radius: 0.75,
});

chart.data(data);

chart.scale('percent', {
  formatter: (val) => {
    val = val * 100 + '%';
    return val;
  },
});

chart.tooltip({
  showTitle: false,
  showMarkers: false,
});

chart
  .interval()
  .position('percent')
  .color('item')
  .label('percent', {
    content: (data) => {
      return `${data.item}: ${data.percent * 100}%`;
    },
  })
  .adjust('stack');

chart.interaction('element-active');

chart.render();
