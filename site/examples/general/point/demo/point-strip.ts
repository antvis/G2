/**
 * A recreation of this demo: https://vega.github.io/vega-lite/examples/tick_strip.html
 */
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  height: 300,
});

chart.coordinate({ transform: [{ type: 'transpose' }] });

chart
  .point()
  .data({
    type: 'fetch',
    value:
      'https://gw.alipayobjects.com/os/bmw-prod/2c813e2d-2276-40b9-a9af-cf0a0fb7e942.csv',
  })
  .transform({ type: 'sortX', channel: 'x' })
  .encode('y', 'Horsepower')
  .encode('x', 'Cylinders')
  .encode('shape', 'line')
  .encode('size', 20)
  //.encode('color', 'Cylinders')
  .scale('x', { type: 'point' })
  .scale('y', { zero: true })
  .scale('color', { type: 'ordinal' });

chart.render();
