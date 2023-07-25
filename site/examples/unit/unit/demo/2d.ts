import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

const facetRect = chart
  .facetRect()
  .data({
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/titanic2.json',
    transform: [
      {
        type: 'sortBy',
        fields: [['Survived', false]],
      },
    ],
  })
  .encode('x', 'Class')
  .encode('y', 'Sex');

facetRect
  .point()
  .transform({ type: 'pack' })
  .encode('color', 'Survived')
  .encode('shape', 'point')
  .encode('size', 3)
  .tooltip({
    title: '',
    items: ['pclass', 'survived'],
  });

chart.render();
