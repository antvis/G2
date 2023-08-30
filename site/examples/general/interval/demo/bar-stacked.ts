/**
 * A recreation of this demo: https://observablehq.com/@d3/stacked-bar-chart
 */
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart
  .interval()
  .data({
    type: 'fetch',
    value:
      'https://gw.alipayobjects.com/os/bmw-prod/f129b517-158d-41a9-83a3-3294d639b39e.csv',
    format: 'csv',
  })
  .transform({ type: 'stackY' })
  .transform({ type: 'sortX', by: 'y', reverse: true })
  .encode('x', 'state')
  .encode('y', 'population')
  .encode('color', 'age')
  .axis('x', {
    labelSpacing: 4,
    labelTransform: 'rotate(90)',
  })
  .axis('y', { labelFormatter: '~s' });

chart.render();
