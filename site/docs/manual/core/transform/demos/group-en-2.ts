import * as G2 from '@antv/g2';

const { Chart } = G2;
const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'cell',
  height: 300,
  data: {
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/seattle-weather.json',
  },
  encode: {
    x: (d) => new Date(d.date).getUTCDate(),
    y: (d) => new Date(d.date).getUTCMonth(),
    color: 'temp_max',
  },
  transform: [{ type: 'group', color: 'max' }],
  scale: { color: { type: 'sequential', palette: 'gnBu' } },
  style: { inset: 0.5 },
});

chart.render();
