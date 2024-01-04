import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.data({
  type: 'fetch',
  value: 'https://assets.antv.antgroup.com/g2/species.json',
});

chart
  .density()
  .data({
    transform: [
      {
        type: 'kde',
        field: 'y',
        groupBy: ['x', 'species'],
      },
    ],
  })
  .encode('x', 'x')
  .encode('y', 'y')
  .encode('series', 'species')
  .encode('color', 'species')
  .encode('size', 'size')
  .tooltip(false);

chart
  .boxplot()
  .encode('x', 'x')
  .encode('y', 'y')
  .encode('series', 'species')
  .encode('color', 'species')
  .encode('shape', 'violin')
  .style('opacity', 0.5)
  .style('strokeOpacity', 0.5)
  .style('point', false);

chart.render();
