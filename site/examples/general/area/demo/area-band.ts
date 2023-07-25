/**
 * A recreation of this demo: https://observablehq.com/@d3/band-chart
 */
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart
  .area()
  .data({
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/temperatures3.json',
  })
  .scale('color', { palette: 'reds' })
  .encode('x', (d) => new Date(d.date))
  .encode('y', ['low', 'high'])
  .encode('color', (d) => d.high - d.low)
  .encode('series', () => undefined)
  .style('gradient', 'x')
  .axis('x', { title: 'date' });

chart.render();
