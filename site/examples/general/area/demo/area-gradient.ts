/**
 * A recreation of this demo: https://vega.github.io/vega-lite/examples/area_gradient.html
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
    value: 'https://assets.antv.antgroup.com/g2/stocks.json',
    transform: [
      {
        type: 'filter',
        callback: (d) => d.symbol === 'GOOG',
      },
    ],
  },
  children: [
    {
      type: 'area',
      encode: {
        x: (d) => new Date(d.date),
        y: 'price',
      },
      style: {
        fill: 'linear-gradient(-90deg, white 0%, darkgreen 100%)',
      },
    },
    {
      type: 'line',
      encode: {
        x: (d) => new Date(d.date),
        y: 'price',
      },
      style: {
        stroke: 'darkgreen',
        lineWidth: 2,
      },
    },
  ],
});

chart.render();
