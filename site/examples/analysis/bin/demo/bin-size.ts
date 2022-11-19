import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart
  .point()
  .data({
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/movies.json',
  })
  .encode('x', 'IMDB Rating')
  .encode('y', 'Rotten Tomatoes Rating')
  .encode('shape', 'point')
  .transform({ type: 'bin', size: 'count', thresholdsX: 10, thresholdsY: 10 });

chart.render();
