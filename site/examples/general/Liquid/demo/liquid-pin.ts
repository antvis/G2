import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.liquid().data(0.7).style({
  // Build-in shapes: rect, circle, pin, diamond, triangle.
  shape: 'pin',
  textFill: '#fff',
  outlineBorder: 4,
  outlineDistance: 8,
  waveLength: 128,
});

chart.render();
