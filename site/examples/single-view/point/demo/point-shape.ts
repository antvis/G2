/**
 * A recreation of this demo: https://observablehq.com/@d3/scatterplot-with-shapes
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
      'https://gw.alipayobjects.com/os/bmw-prod/bd73a175-4417-4749-8b88-bc04d955e899.csv',
  })
  .encode('x', 'x')
  .encode('y', 'y')
  .encode('shape', 'category')
  .encode('color', 'category')
  .scale('shape', { range: ['point', 'plus', 'diamond'] })
  .style('r', 5);

chart.render();
