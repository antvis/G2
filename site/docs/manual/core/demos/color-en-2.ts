import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'interval',
  data: {
    type: 'fetch',
    value:
      'https://gw.alipayobjects.com/os/bmw-prod/fb9db6b7-23a5-4c23-bbef-c54a55fee580.csv',
  },
  encode: { x: 'letter', y: 'frequency', color: 'letter' },
  axis: { y: { labelFormatter: '.0%' } },
  scale: {
    color: {
      type: 'ordinal',
      range: ['#7593ed', '#95e3b0', '#6c7893', '#e7c450', '#7460eb'],
    },
  },
});

chart.render();
