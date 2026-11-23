import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'area',
  data: {
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/unemployment-by-industry.json',
  },
  transform: [
    { type: 'stackY' }, // Try to remove this line.
  ],
  encode: {
    x: (d) => new Date(d.date),
    y: 'unemployed',
    color: 'industry',
    shape: 'smooth',
  },
});

chart.render();
