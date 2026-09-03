/**
 * A recreation of this demo: https://vega.github.io/vega-lite/examples/bar_grouped_repeated.html
 */
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  autoFit: true,
  paddingBottom: 150,
});

chart.options({
  type: 'view',
  theme: {
    defaultColor: '#ED6DC6',
  },
  children: [
    {
      type: 'point',
      data: {
        type: 'fetch',
        value: 'https://assets.antv.antgroup.com/g2/movies.json',
      },
      transform: [
        { type: 'bin', size: 'count', thresholdsX: 10, thresholdsY: 10 },
      ],
      encode: {
        x: 'IMDB Rating',
        y: 'Rotten Tomatoes Rating',
        shape: 'point',
      },
      axis: {
        x: { title: false },
        y: { title: false },
      },
    },
  ],
});

chart.render();
