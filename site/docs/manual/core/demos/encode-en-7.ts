import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'area',
  autoFit: true,
  data: {
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/temperatures3.json',
  },
  encode: {
    x: (d) => new Date(d.date),
    y: ['low', 'high'],
    color: (d) => d.high - d.low,
    series: () => undefined,
  },
  scale: { color: { palette: 'reds' } },
  style: { gradient: 'x' },
  axis: { x: { title: 'date' } },
});

chart.render();
