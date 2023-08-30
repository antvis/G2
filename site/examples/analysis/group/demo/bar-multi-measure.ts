/**
 * A recreation of this demo: https://vega.github.io/vega-lite/examples/bar_grouped_repeated.html
 */
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.data({
  type: 'fetch',
  value: 'https://assets.antv.antgroup.com/g2/movies.json',
});

chart
  .interval()
  .transform({ type: 'groupX', y: 'sum' })
  .axis('y', { labelFormatter: '~s' })
  .axis('x', { labelTransform: 'rotate(90)' })
  .encode('x', 'Major Genre')
  .encode('y', 'Worldwide Gross')
  .encode('series', () => 'Worldwide Gross')
  .encode('color', () => 'Worldwide Gross')
  .tooltip({ channel: 'y', valueFormatter: '~s' });

chart
  .interval()
  .transform({ type: 'groupX', y: 'sum' })
  .encode('x', 'Major Genre')
  .encode('y', 'US Gross')
  .encode('color', () => 'US Gross')
  .encode('series', () => 'US Gross')
  .tooltip({ channel: 'y', valueFormatter: '~s' });

chart.render();
