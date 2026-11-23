import * as G2 from '@antv/g2';

const { Chart } = G2;
const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'interval',
  height: 120,
  data: {
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/penguins.json',
  },
  encode: { color: 'sex' },
  transform: [
    { type: 'groupColor', y: 'count' },
    { type: 'stackY' },
    { type: 'normalizeY' },
  ],
  coordinate: { transform: [{ type: 'transpose' }] },
  axis: { y: { labelFormatter: '.0%' } },
  labels: [{ text: 'sex', position: 'inside' }],
});

chart.render();
