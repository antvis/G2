/**
 * A recreation of this demo: https://vega.github.io/vega-lite/examples/trail_color.html
 */
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'view',
  children: [
    {
      type: 'line',
      data: {
        type: 'fetch',
        value:
          'https://gw.alipayobjects.com/os/bmw-prod/cb99c4ab-e0a3-4c76-9586-fe7fa2ff1a8c.csv',
      },
      encode: {
        x: (d) => new Date(d.date),
        y: 'price',
        color: 'symbol',
        size: 'price',
      },
      legend: {
        size: false,
      },
      style: {
        shape: 'trail',
      },
    },
  ],
});

chart.render();
