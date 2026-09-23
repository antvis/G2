import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'interval',
  autoFit: true,
  height: 300,
  data: {
    type: 'fetch',
    value:
      'https://gw.alipayobjects.com/os/bmw-prod/fb9db6b7-23a5-4c23-bbef-c54a55fee580.csv',
  },
  encode: { x: 'letter', y: 'frequency', y1: 0.000001 },
  scale: { y: { type: 'log' } },
  scrollbar: {
    x: {
      ratio: 0.2,
      trackSize: 14,
      trackFill: '#000',
      trackFillOpacity: 1,
    },
    y: {
      ratio: 0.5,
      trackSize: 12,
      value: 0.1,
      trackFill: '#000',
      trackFillOpacity: 1,
    },
  },
});

chart.render();
