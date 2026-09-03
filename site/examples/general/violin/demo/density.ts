import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'view',
  data: {
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/species.json',
    transform: [
      {
        type: 'kde',
        field: 'y',
        groupBy: ['x'],
        size: 20,
      },
    ],
  },
  children: [
    {
      type: 'density',
      encode: {
        x: 'x',
        y: 'y',
        color: 'x',
        size: 'size',
      },
      tooltip: false,
    },
  ],
});

chart.render();
