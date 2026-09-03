/**
 * A recreation of this demo: https://vega.github.io/vega-lite/examples/tick_strip.html
 */
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  height: 300,
});

//.encode('color', 'Cylinders')
chart.options({
  type: 'view',
  coordinate: { transform: [{ type: 'transpose' }] },
  children: [
    {
      type: 'point',
      data: {
        type: 'fetch',
        value:
          'https://gw.alipayobjects.com/os/bmw-prod/2c813e2d-2276-40b9-a9af-cf0a0fb7e942.csv',
      },
      transform: [{ type: 'sortX', channel: 'x' }],
      encode: {
        y: 'Horsepower',
        x: 'Cylinders',
        shape: 'line',
        size: 20,
      },
      scale: {
        x: { type: 'point' },
        y: { zero: true },
        color: { type: 'ordinal' },
      },
    },
  ],
});

chart.render();
