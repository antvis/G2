import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  theme: 'classic',
  autoFit: true,
});

chart.options({
  type: 'area',
  data: {
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/stocks.json',
    transform: [
      {
        type: 'filter',
        callback: (d) => d.symbol === 'GOOG',
      },
    ],
  },
  encode: {
    x: (d) => new Date(d.date),
    y: 'price',
  },
  style: {
    fill: 'linear-gradient(-90deg, white 0%, darkgreen 100%)',
  },
  axis: { x: { title: false }, y: { title: false } },
});

chart.render();
