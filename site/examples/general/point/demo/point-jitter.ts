/**
 * A recreation of this demo: https://vega.github.io/vega-lite/examples/point_offset_random.html
 */
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart
  .point()
  .data({
    type: 'fetch',
    value:
      'https://gw.alipayobjects.com/os/bmw-prod/2c813e2d-2276-40b9-a9af-cf0a0fb7e942.csv',
  })
  .transform({ type: 'sortX', channel: 'x' })
  .transform({ type: 'jitterX' })
  .encode('y', 'Horsepower')
  .encode('x', 'Cylinders')
  .encode('shape', 'hollow')
  .encode('color', 'Cylinders')
  .scale('x', { type: 'point' })
  .scale('color', { type: 'ordinal' });

chart.render();
