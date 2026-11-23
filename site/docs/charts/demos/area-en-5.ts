import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  theme: 'classic',
});

chart.options({
  type: 'area',
  autoFit: true,
  data: {
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/temperature-compare.json',
    transform: [
      {
        type: 'fold',
        fields: ['New York', 'San Francisco'],
        key: 'city',
        value: 'temperature',
      },
    ],
  },
  transform: [{ type: 'diffY' }],
  encode: {
    x: (d) => new Date(d.date),
    y: 'temperature',
    color: 'city',
  },
  scale: {
    color: {
      range: ['#67a9cf', '#ef8a62'],
    },
  },
  axis: {
    y: { title: null },
    x: { title: null },
  },
});

chart.render();
