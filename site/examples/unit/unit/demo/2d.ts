import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'facetRect',
  data: {
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/titanic2.json',
    transform: [
      {
        type: 'sortBy',
        fields: [['Survived', false]],
      },
    ],
  },
  encode: {
    x: 'Class',
    y: 'Sex',
  },
  children: [
    {
      type: 'point',
      transform: [{ type: 'pack' }],
      encode: {
        color: 'Survived',
        shape: 'point',
        size: 3,
      },
      tooltip: {
        title: '',
        items: ['pclass', 'survived'],
      },
    },
  ],
});

chart.render();
