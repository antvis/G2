/**
 *  A recreation of this demo: https://observablehq.com/@d3/stacked-normalized-horizontal-bar
 */
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  width: 800,
  height: 1000,
});

chart.coordinate({ transform: [{ type: 'transpose' }] });

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
  .transform({ type: 'normalizeY' })
  .encode('x', 'state')
  .encode('y', 'population')
  .encode('color', 'age')
  .axis('y', { labelFormatter: '.0%' })
  .tooltip({ channel: 'y0', valueFormatter: '.0%' });

chart.render();
