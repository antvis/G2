import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'interval',
  autoFit: true,
  data: {
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/penguins.json',
    transform: [
      { type: 'filter', callback: (d) => d.culmen_depth_mm !== null },
    ],
  },
  encode: { x: 'island', color: 'species' },
  transform: [
    {
      type: 'groupX',
      y: 'count',
    },
    {
      type: 'stackY',
    },
  ],
});

chart.render();
