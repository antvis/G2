import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'facetRect',
  data: [
    { category: 'A', type: 'X', value: 10 },
    { category: 'A', type: 'Y', value: 20 },
    { category: 'B', type: 'X', value: 15 },
    { category: 'B', type: 'Y', value: 25 },
  ],
  encode: { x: 'category' },
  children: [
    {
      type: 'view',
      children: [
        {
          type: 'interval',
          encode: { x: 'type', y: 'value', color: 'type' },
        },
      ],
    },
  ],
});

chart.render();
