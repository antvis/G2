import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'area',
  autoFit: true,
  data: {
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/unemployment-by-industry.json',
  },
  encode: { x: (d) => new Date(d.date), y: 'unemployed', color: 'industry' },
  transform: [{ type: 'stackY' }, { type: 'normalizeY' }],
  tooltip: { items: [{ channel: 'y0', valueFormatter: '.3f' }] },
});

chart.render();
