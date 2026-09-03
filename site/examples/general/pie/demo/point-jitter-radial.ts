/**
 * A recreation of this demo:
 */
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'view',
  coordinate: { type: 'polar' },
  children: [
    {
      type: 'point',
      data: {
        type: 'fetch',
        value:
          'https://gw.alipayobjects.com/os/antvdemo/assets/data/diamond.json',
      },
      transform: [{ type: 'jitter' }],
      encode: {
        x: 'clarity',
        color: 'clarity',
      },
      legend: false,
    },
  ],
});

chart.render();
