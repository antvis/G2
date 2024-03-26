/**
 * A recreation of this demo: https://observablehq.com/@d3/horizontal-bar-chart
 */
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.coordinate({ transform: [{ type: 'transpose' }] });

chart
  .interval()
  .data({
    type: 'fetch',
    value:
      'https://gw.alipayobjects.com/os/bmw-prod/fb9db6b7-23a5-4c23-bbef-c54a55fee580.csv',
    format: 'csv',
  })
  .transform({ type: 'sortX', reverse: true })
  .encode('x', 'letter')
  .encode('y', 'frequency')
  .axis('y', { labelFormatter: '.0%' })
  .label({
    text: 'frequency',
    formatter: '.1%',
    textAlign: (d) => (+d.frequency > 0.008 ? 'right' : 'start'),
    fill: (d) => (+d.frequency > 0.008 ? '#fff' : '#000'),
    dx: (d) => (+d.frequency > 0.008 ? -5 : 5),
  });

chart.render();
