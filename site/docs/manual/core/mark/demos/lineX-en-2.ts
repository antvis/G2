/**
 * A recreation of this demo: https://vega.github.io/vega-lite/examples/layer_histogram_global_mean.html
 */
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'view',
  data: {
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/movies.json',
    transform: [
      {
        type: 'filter',
        callback: (d) => d['IMDB Rating'] > 0,
      },
    ],
  },
  children: [
    {
      type: 'rect',
      transform: [{ type: 'binX', y: 'count', thresholds: 9 }],
      encode: { x: 'IMDB Rating' },
      scale: { y: { domainMax: 1000 } },
      style: { inset: 1 },
    },
    {
      type: 'lineX',
      transform: [{ type: 'groupColor', x: 'mean' }],
      encode: { x: 'IMDB Rating' },
      style: {
        stroke: '#F4664A',
        strokeOpacity: 1,
        lineWidth: 2,
        lineDash: [4, 4],
      },
    },
  ],
});

chart.render();
