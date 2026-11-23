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
  encode: { x: 'letter', y: 'frequency' },
  style: {
    fill: (datum, index, data) => {
      const { frequency } = datum;
      if (frequency > 0.1) return '#3376cd';
      if (frequency > 0.05) return '#f4bb51';
      return '#b43a29';
    },
  },
});

chart.render();
