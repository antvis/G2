import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.liquid().data(0.581).style({
  contentFill: '#000',
  contentText: 'center text',
  contentStroke: '#fff',
  contentLineWidth: 2,
  outlineBorder: 4,
  outlineDistance: 8,
  waveLength: 128,
});

chart.render();
