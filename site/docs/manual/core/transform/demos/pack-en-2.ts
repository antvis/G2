import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'facetRect',
  autoFit: true,
  shareData: true,
  data: {
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/titanic.json',
    transform: [
      { type: 'sortBy', fields: ['survived'] },
      {
        type: 'map',
        callback: ({ survived, ...d }) => ({
          ...d,
          survived: survived + '',
        }),
      },
    ],
  },
  encode: { x: 'sex' },
  children: [
    {
      type: 'point',
      encode: { color: 'survived', shape: 'point', size: 3 },
      transform: [{ type: 'pack', padding: 5, direction: 'row' }],
      legend: {
        color: { labelFormatter: (d) => (d === '1' ? 'Yes' : 'No') },
      },
      tooltip: { title: '', items: ['sex', 'survived'] },
    },
  ],
});

chart.render();
