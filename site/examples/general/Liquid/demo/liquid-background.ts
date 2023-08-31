import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  theme: 'classic',
  autoFit: true,
});

chart
  .liquid()
  .data({
    value: {
      percent: 0.3,
    },
  })
  .style({
    shapeStyle: {
      fill: 'pink',
    },
  });

chart.render();
