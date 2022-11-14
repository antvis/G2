/**
 * A recreation of this demo: https://vega.github.io/vega-lite/examples/bar_layered_transparent.html
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
      'https://gw.alipayobjects.com/os/bmw-prod/87b2ff47-2a33-4509-869c-dae4cdd81163.csv',
    format: 'csv',
    transform: [
      {
        type: 'filterBy',
        fields: [['year', (d) => d === 2000]],
      },
    ],
  })
  .transform({ type: 'groupX', y: 'sum' })
  .encode('x', 'age')
  .encode('y', 'people')
  .encode('color', 'sex')
  .scale('color', { type: 'ordinal', range: ['#ca8861', '#675193'] })
  .axis('y', { tickFormatter: '~s' })
  .style('fillOpacity', 0.7);

chart.render();
