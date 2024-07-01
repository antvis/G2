import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.liquid().data({ value: 0.3 }).style({
  backgroundFill: 'pink',
});

chart.render();
