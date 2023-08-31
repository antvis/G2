/**
 * A recreation of this demo: https://vega.github.io/vega-lite/examples/circle_github_punchcard.html
 */
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  height: 360,
  inset: 10,
});

chart.style('mainStroke', 'black');

chart
  .point()
  .data({
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/commits.json',
  })
  .transform({ type: 'group', size: 'sum' })
  .transform({ type: 'sortY' })
  .axis('x', { title: 'time (hours)', tickCount: 24 })
  .axis('y', { title: 'time (day)', grid: true })
  .scale('y', { type: 'point' })
  .encode('x', (d) => new Date(d.time).getUTCHours())
  .encode('y', (d) => new Date(d.time).getUTCDay())
  .encode('size', 'count')
  .encode('color', 'count')
  .encode('shape', 'point');

chart.render();
