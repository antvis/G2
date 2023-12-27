import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.liquid().data(0.581).style({
  shape: 'pin', // Build-in shapes: rect, circle, pin, diamond, triangle.
  contentFill: '#fff',
  outlineBorder: 4,
  outlineDistance: 8,
  waveLength: 128,
});

chart.render();
