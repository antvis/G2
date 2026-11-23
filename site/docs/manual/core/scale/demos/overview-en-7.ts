import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  theme: 'classic',
});
chart.options({
  type: 'cell',
  data: {
    type: 'fetch',
    value:
      'https://gw.alipayobjects.com/os/bmw-prod/89c20fe8-0c6f-46c8-b36b-4cb653dba8ed.json',
    transform: [
      {
        type: 'map',
        callback: (d) => ({
          salary: d,
        }),
      },
    ],
  },
  encode: {
    y: (_, i) => (i % 5) + 1,
    x: (_, i) => ((i / 5) | 0) + 1,
    color: 'salary',
  },
  scale: { color: { type: 'quantize', range: ['#eee', 'pink', 'red'] } },
  style: { stroke: '#000', inset: 2 },
  animate: { enter: { type: 'fadeIn' } },
  legend: { color: { length: 400, labelFormatter: '.0s' } },
});

chart.render();
