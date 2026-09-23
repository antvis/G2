import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'interval',
  coordinate: { transform: [{ type: 'transpose' }] },
  data: {
    type: 'fetch',
    value:
      'https://gw.alipayobjects.com/os/bmw-prod/87b2ff47-2a33-4509-869c-dae4cdd81163.csv',
    transform: [
      {
        type: 'filter',
        callback: (d) => d.year === 2000,
      },
    ],
  },
  transform: [{ type: 'stackY' }, { type: 'normalizeY' }],
  encode: {
    x: 'age',
    y: 'people',
    color: 'sex',
  },
  scale: {
    color: { type: 'ordinal', range: ['#ca8861', '#675193'] },
  },
  axis: {
    y: { labelFormatter: '.0%' },
  },
  labels: [
    {
      text: 'people',
      position: 'inside',
      style: { fill: 'white' },
    },
  ],
});

chart.render();
