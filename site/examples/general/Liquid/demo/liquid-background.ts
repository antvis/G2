import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.liquid().data(0.3).style({
  backgroundFill: 'pink',
});

chart.render();
