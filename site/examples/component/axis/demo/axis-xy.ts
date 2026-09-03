import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'view',
  scale: {
    x: {
      type: 'linear',
      domain: [5, 10],
      range: [0, 1],
    },
    y: {
      type: 'linear',
      domain: [5, 10],
      range: [0, 1],
    },
  },
  children: [
    {
      type: 'axisX',
      title: 'AxisX',
    },
    {
      type: 'axisY',
      title: 'AxisY',
      tickCount: 10,
      style: {
        labelFontSize: 14,
        gridLineWidth: 10,
        gridStroke: 'red',
      },
    },
  ],
});

chart.render();
