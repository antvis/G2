/**
 * A recreation of this demo: https://vega.github.io/vega-lite/examples/bar_diverging_stack_population_pyramid.html
 */
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.coordinate({ type: 'transpose' });

chart
  .interval()
  .data({
    type: 'fetch',
    value:
      'https://gw.alipayobjects.com/os/bmw-prod/87b2ff47-2a33-4509-869c-dae4cdd81163.csv',
    transform: [
      {
        type: 'filter',
        fields: [['year', (d) => d === 2000]],
      },
    ],
  })
  .encode('x', 'age')
  .encode('y', (d) => (d.sex === 1 ? -d.people : d.people))
  .encode('color', 'sex')
  .scale('color', { type: 'ordinal', range: ['#ca8861', '#675193'] })
  .axis('y', { tickFormatter: '~s' })
  .scale('x', { range: [1, 0] });

chart.render();
