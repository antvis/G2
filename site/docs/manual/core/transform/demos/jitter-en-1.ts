import * as G2 from '@antv/g2';

const { Chart } = G2;
const chart = new Chart({
  container: 'container',
});
chart.options({
  type: 'point',
  autoFit: true,
  data: [
    { x: 1, y: 2 },
    { x: 1, y: 2 },
    { x: 2, y: 3 },
    { x: 2, y: 3 },
    { x: 3, y: 4 },
  ],
  encode: { x: 'clarity', color: 'clarity' },
  transform: [{ type: 'jitter' }],
  legend: false,
});

chart.render();
