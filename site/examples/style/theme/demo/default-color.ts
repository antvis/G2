/**
 * A recreation of this demo: https://vega.github.io/vega-lite/examples/bar_grouped_repeated.html
 */
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  autoFit: true,
  paddingBottom: 150,
});

chart.theme({
  defaultColor: '#ED6DC6',
});

chart
  .point()
  .data({
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/movies.json',
  })
  .transform({ type: 'bin', size: 'count', thresholdsX: 10, thresholdsY: 10 })
  .encode('x', 'IMDB Rating')
  .encode('y', 'Rotten Tomatoes Rating')
  .encode('shape', 'point')
  .axis('x', { title: false })
  .axis('y', { title: false });

chart.render();
