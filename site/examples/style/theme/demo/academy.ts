/**
 * A recreation of this demo: https://observablehq.com/@d3/stacked-horizontal-bar-chart
 */
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

// Apply academy theme.

chart.options({
  type: 'view',
  theme: { type: 'academy' },
  interaction: {
    tooltip: { shared: true },
    elementHighlight: { background: true },
  },
  children: [
    {
      type: 'interval',
      data: {
        type: 'fetch',
        value:
          'https://gw.alipayobjects.com/os/bmw-prod/f129b517-158d-41a9-83a3-3294d639b39e.csv',
        format: 'csv',
      },
      transform: [
        { type: 'sortX', by: 'y', reverse: true, slice: 6 },
        { type: 'dodgeX' },
      ],
      encode: {
        x: 'state',
        y: 'population',
        color: 'age',
      },
      axis: {
        y: { labelFormatter: '~s' },
        x: { zIndex: 1 },
      },
    },
  ],
});

chart.render();
