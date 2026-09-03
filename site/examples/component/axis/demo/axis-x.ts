import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  height: 80,
});

chart.options({
  type: 'view',
  children: [
    {
      type: 'axisX',
      scale: {
        x: {
          type: 'linear',
          domain: [5, 10],
          range: [0, 1],
        },
      },
      tickCount: 10,
      title: 'AxisX',
    },
  ],
});

chart.render();
