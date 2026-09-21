import * as G2 from '@antv/g2';

const { Chart } = G2;
const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'interval',
  autoFit: true,
  data: [
    { category: 'A', value: 10, type: 'X' },
    { category: 'A', value: 20, type: 'Y' },
    { category: 'B', value: 15, type: 'X' },
    { category: 'B', value: 25, type: 'Y' },
  ],
  encode: { x: 'category', y: 'value', color: 'type' },
  transform: [{ type: 'stackY' }],
});

chart.render();
