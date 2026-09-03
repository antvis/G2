/**
 * A recreation of this demo: https://vega.github.io/vega-lite/examples/point_offset_random.html
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
      type: 'point',
      data: {
        type: 'fetch',
        value:
          'https://gw.alipayobjects.com/os/bmw-prod/2c813e2d-2276-40b9-a9af-cf0a0fb7e942.csv',
      },
      transform: [{ type: 'sortX', channel: 'x' }, { type: 'jitterX' }],
      encode: {
        y: 'Horsepower',
        x: 'Cylinders',
        shape: 'hollow',
        color: 'Cylinders',
      },
      scale: {
        x: { type: 'point' },
        color: { type: 'ordinal' },
      },
    },
  ],
});

chart.render();
