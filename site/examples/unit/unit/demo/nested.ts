import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  autoFit: true,
  paddingBottom: 60,
  paddingLeft: 85,
});

chart.options({
  type: 'facetRect',
  data: {
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/titanic.json',
    transform: [
      {
        type: 'sortBy',
        fields: ['survived', 'sex'],
      },
      {
        type: 'map',
        callback: ({ survived, ...d }) => ({
          ...d,
          survived: survived + '',
        }),
      },
    ],
  },
  encode: {
    y: 'pclass',
  },
  shareSize: true,
  children: [
    {
      type: 'facetRect',
      encode: {
        x: 'survived',
      },
      axis: {
        y: false,
        x: {
          labelFormatter: (d) => (d === '1' ? 'Yes' : 'No'),
          position: 'bottom',
        },
      },
      shareSize: true,
      children: [
        {
          type: 'facetRect',
          encode: {
            y: 'sex',
          },
          shareSize: true,
          axis: {
            x: false,
            y: { position: 'left' },
          },
          children: [
            {
              type: 'point',
              transform: [{ type: 'pack' }],
              legend: {
                color: { labelFormatter: (d) => (d === '1' ? 'Yes' : 'No') },
              },
              encode: {
                color: 'survived',
                shape: 'point',
                size: 3,
              },
              tooltip: {
                title: '',
                items: ['pclass', 'survived', 'sex'],
              },
            },
          ],
        },
      ],
    },
  ],
});

chart.render();
