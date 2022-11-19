import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart
  .rect()
  .data({
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/movies.json',
  })
  .encode('x', 'IMDB Rating')
  .encode('y', 'Rotten Tomatoes Rating')
  .transform({ type: 'bin', color: 'count', thresholdsX: 30, thresholdsY: 20 })
  .scale('color', { type: 'sequential', palette: 'ylGnBu' });

chart.render();
