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
  .adjust('stack')
  .position('percent')
  .color('item')
  .label('percent', {
    offset: '-30%',
    style: {
      textAlign: 'center',
      fontSize: 16,
      shadowBlur: 2,
      shadowColor: 'rgba(0, 0, 0, .45)',
    },
  })
  .tooltip('item*percent', (item, percent) => {
    percent = percent * 100 + '%';
    return {
      name: item,
      value: percent,
    };
  });

chart.interaction('element-active');
chart.render();
