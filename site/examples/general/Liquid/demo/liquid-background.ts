import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'view',
  children: [
    {
      type: 'liquid',
      data: 0.3,
      style: {
        backgroundFill: 'pink',
      },
    },
  ],
});

chart.render();
