import { Chart } from '@antv/g2';

const data = [
  { lib: 'Chart', size: 957772, type: 'raw' },
  { lib: 'Chart', size: 288753, type: 'gzip' },
  { lib: 'Runtime', size: 855619, type: 'raw' },
  { lib: 'Runtime', size: 252045, type: 'gzip' },
];

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'interval',
  data,
  encode: {
    x: 'lib',
    y: 'size',
    color: 'type',
  },
  transform: [{ type: 'dodgeX' }],
  scale: {
    y: { nice: true },
  },
  axis: {
    y: { labelFormatter: (d) => d / 1000 + 'kb' },
    x: { title: false },
  },
  legend: {
    color: { title: false },
  },
  labels: [{ text: (d) => (d.size / 1000).toFixed(2) + 'kb' }],
});

chart.render();
