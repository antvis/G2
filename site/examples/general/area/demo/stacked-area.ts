import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'view',
  data: {
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/unemployment-by-industry.json',
  },
  children: [
    {
      type: 'area',
      transform: [{ type: 'stackY' }],
      encode: {
        x: (d) => new Date(d.date),
        y: 'unemployed',
        color: 'industry',
        shape: 'smooth',
      },
    },
  ],
});

chart.render();
