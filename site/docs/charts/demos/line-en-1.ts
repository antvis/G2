import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  theme: 'classic',
});

chart.options({
  type: 'line',
  autoFit: true,
  data: {
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/aapl.json',
    transform: [
      {
        type: 'map',
        callback: (d) => ({
          ...d,
          date: new Date(d.date),
        }),
      },
    ],
  },
  encode: { x: 'date', y: 'close' },
  axis: {
    x: {
      title: null,
    },
    y: {
      title: null,
    },
  },
  style: {
    lineWidth: 2,
    stroke: '#1890ff',
  },
});

chart.render();
