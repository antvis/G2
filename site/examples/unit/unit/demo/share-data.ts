import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

const facetRect = chart
  .facetRect()
  .data({
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/titanic.json',
    transform: [
      {
        type: 'sortBy',
        fields: ['survived'],
      },
      {
        type: 'map',
        callback: ({ survived, ...d }) => ({
          ...d,
          survived: survived + '',
        }),
      },
    ],
  })
  .encode('x', 'pclass')
  .shareData(true);

facetRect
  .point()
  .transform({ type: 'pack' })
  .legend('color', { tickFormatter: (d) => (d === '1' ? 'Yes' : 'No') })
  .encode('color', 'survived')
  .encode('shape', 'point')
  .encode('size', 3);

chart.render();
