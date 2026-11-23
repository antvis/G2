import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'interval',
  autoFit: true,
  data: {
    type: 'fetch',
    value:
      'https://gw.alipayobjects.com/os/bmw-prod/87b2ff47-2a33-4509-869c-dae4cdd81163.csv',
    transform: [{ type: 'filter', callback: (d) => d.year === 2000 }],
  },
  encode: { x: 'age', y: 'people', color: 'sex' },
  transform: [
    { type: 'groupX', y: 'sum' },
    { type: 'stackY' },
    { type: 'normalizeY' },
  ],
  scale: { color: { type: 'ordinal', range: ['#ca8861', '#675193'] } },
  coordinate: { transform: [{ type: 'transpose' }] },
  axis: { y: { labelFormatter: '.0%' } },
  labels: [{ text: 'people', position: 'inside', fill: 'white' }],
  tooltip: { items: [{ channel: 'y', valueFormatter: '.0%' }] },
});

chart.render();
