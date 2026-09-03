import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'view',
  data: {
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/aapl.json',
  },
  children: [
    {
      type: 'area',
      encode: {
        x: (d) => new Date(d.date),
        y: 'close',
      },
    },
  ],
});

chart.render();
