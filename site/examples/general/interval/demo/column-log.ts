import { Chart } from '@antv/g2';

const EPSILON = 1e-6;

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

// Log scale cant' map zero, set a value close to zero.
chart.options({
  type: 'view',
  children: [
    {
      type: 'interval',
      data: {
        type: 'fetch',
        value:
          'https://gw.alipayobjects.com/os/bmw-prod/fb9db6b7-23a5-4c23-bbef-c54a55fee580.csv',
      },
      encode: {
        x: 'letter',
        y: 'frequency',
        y1: EPSILON,
      },
      scale: {
        y: { type: 'log' },
      },
      axis: {
        y: { labelFormatter: (d) => (d === EPSILON ? 0 : d) },
      },
    },
  ],
});

chart.render();
