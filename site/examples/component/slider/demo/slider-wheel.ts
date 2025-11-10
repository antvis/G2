import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'line',
  autoFit: true,
  data: {
    type: 'fetch',
    value:
      'https://gw.alipayobjects.com/os/bmw-prod/551d80c6-a6be-4f3c-a82a-abd739e12977.csv',
  },
  encode: { x: 'date', y: 'close' },
  slider: {
    x: {
      labelFormatter: (d) => {
        return new Date(d).toLocaleDateString();
      },
    },
  },
  interaction: {
    sliderWheel: {
      wheelSensitivity: 0.08,
      minRange: 0.02,
    },
  },
});

chart.render();
