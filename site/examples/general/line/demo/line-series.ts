/**
 * A recreation of this demo: https://observablehq.com/@d3/multi-line-chart
 */
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'view',
  interaction: {
    tooltip: { filter: (d, i) => i < 10 },
  },
  children: [
    {
      type: 'line',
      data: {
        type: 'fetch',
        value:
          'https://gw.alipayobjects.com/os/bmw-prod/728a4bdc-9d0b-49e0-a92f-6320a6cddeed.csv',
      },
      encode: {
        x: 'date',
        y: 'unemployment',
        series: 'division',
      },
    },
  ],
});

chart.render();
