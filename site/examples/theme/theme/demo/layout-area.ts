/**
 * A recreation of this demo: https://vega.github.io/vega-lite/examples/circle_github_punchcard.html
 */
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  height: 240,
  marginLeft: 40,
  marginTop: 30,
  marginRight: 20,
  marginBottom: 10,
  inset: 10,
});

chart.theme({
  viewFill: '#4e79a7',
  plotFill: '#f28e2c',
  mainFill: '#e15759',
  contentFill: '#76b7b2',
});

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
  .encode('shape', 'point')
  .legend('size', false)
  .style('shape', 'point')
  .style('fill', '#59a14f');

chart.render();
