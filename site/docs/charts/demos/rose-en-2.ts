import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  theme: 'classic',
});

chart.options({
  type: 'interval',
  autoFit: true,
  coordinate: { type: 'polar' },
  data: [
    { gender: 'Male', count: 40 },
    { gender: 'Female', count: 30 },
  ],
  encode: {
    x: 'gender',
    y: 'count',
    color: 'gender',
  },
  scale: {
    y: { nice: true, min: 0 },
  },
});

chart.render();
