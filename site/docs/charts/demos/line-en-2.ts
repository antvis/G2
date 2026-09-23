import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  theme: 'classic',
});

chart.options({
  type: 'line',
  autoFit: true,
  data: {
    type: 'fetch',
    value:
      'https://gw.alipayobjects.com/os/bmw-prod/728a4bdc-9d0b-49e0-a92f-6320a6cddeed.csv',
  },
  encode: {
    x: 'date',
    y: 'unemployment',
    color: 'division',
  },
  axis: {
    x: {
      title: null,
    },
    y: {
      title: null,
    },
  },
});

chart.render();
