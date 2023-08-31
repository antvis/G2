/**
 * A recreation of this demo: https://vega.github.io/vega-lite/examples/line_overlay.html
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
    value:
      'https://gw.alipayobjects.com/os/bmw-prod/cb99c4ab-e0a3-4c76-9586-fe7fa2ff1a8c.csv',
  })
  .transform({ type: 'groupX', y: 'mean' })
  .encode('x', (d) => new Date(d.date).getFullYear())
  .encode('y', 'price')
  .encode('color', 'symbol')
  .label({
    text: 'price',
    transform: [{ type: 'overlapDodgeY' }],
    fontSize: 10,
  })
  .tooltip({ channel: 'y', valueFormatter: '.1f' });

chart.render();
