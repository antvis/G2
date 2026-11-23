import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'view',
  autoFit: true,
  data: {
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/movies.json',
    transform: [{ type: 'filter', callback: (d) => d['IMDB Rating'] > 0 }],
  },
  children: [
    {
      type: 'rect',
      encode: { x: 'IMDB Rating' },
      transform: [{ type: 'binX', y: 'count', thresholds: 9 }],
      scale: { y: { domainMax: 1000 } },
      style: { inset: 1 },
    },
    {
      type: 'lineX',
      encode: { x: 'IMDB Rating' },
      transform: [{ type: 'groupY', x: 'median' }],
      style: {
        stroke: '#F4664A',
        strokeOpacity: 1,
        lineWidth: 2,
        lineDash: [4, 4],
      },
    },
  ],
});

chart.render();
