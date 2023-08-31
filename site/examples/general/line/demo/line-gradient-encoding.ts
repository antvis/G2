/**
 * A recreation of this demo: https://observablehq.com/@d3/gradient-encoding
 */
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart
  .line()
  .data({
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/temperatures2.json',
  })
  .scale('x', { utc: true })
  .scale('y', { nice: true })
  .scale('color', { palette: 'turbo' })
  .encode('x', (d) => new Date(d.date))
  .encode('y', 'value')
  .encode('shape', 'hvh')
  .encode('color', 'value')
  .encode('series', () => undefined)
  .style('gradient', 'y')
  .style('lineWidth', 2)
  .style('lineJoin', 'round')
  .axis('x', { title: 'date' });

chart.render();
