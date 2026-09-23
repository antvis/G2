import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'link',
  data: {
    type: 'fetch',
    value: 'https://gw.alipayobjects.com/os/antfincdn/SM13%24lHuYH/metros.json',
  },
  encode: {
    x: ['POP_1980', 'POP_2015'],
    y: ['R90_10_1980', 'R90_10_2015'],
    color: (d) => d.R90_10_2015 - d.R90_10_1980,
  },
  scale: { x: { type: 'log' } },
  style: { arrow: true, arrowSize: 6 },
  axis: { x: { labelFormatter: '~s' } },
  tooltip: { title: { channel: 'color', valueFormatter: '.1f' } },
  legend: false,
});

chart.render();
