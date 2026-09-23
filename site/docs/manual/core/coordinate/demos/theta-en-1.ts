import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'interval',
  data: [
    { category: 'A', value: 40 },
    { category: 'B', value: 25 },
    { category: 'C', value: 20 },
    { category: 'D', value: 15 },
  ],
  encode: { y: 'value', color: 'category' },
  transform: [{ type: 'stackY' }],
  coordinate: { type: 'theta' },
  style: { stroke: 'white' },
  labels: [{ text: 'category', radius: 0.8 }],
});

chart.render();
