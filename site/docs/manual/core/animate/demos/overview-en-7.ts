import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'view',
  autoFit: true,
  data: {
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/doughnut-purchases.json',
  },
  children: [
    {
      type: 'line',
      encode: { x: 'year', y: 'count', color: 'year', shape: 'smooth' },
      scale: { y: { zero: true, nice: true } },
      style: { gradient: 'x', gradientColor: 'start' },
      animate: { enter: { type: 'pathIn', duration: 3000 } },
      axis: { y: { labelFormatter: '~s' } },
    },
    {
      type: 'point',
      encode: { x: 'year', y: 'count', color: 'year', shape: 'point' },
      transform: [{ type: 'stackEnter' }],
      animate: { enter: { duration: 300 } },
    },
    {
      type: 'text',
      encode: { x: 'year', y: 'count', text: 'year' },
      transform: [{ type: 'stackEnter' }],
      style: { lineWidth: 5, stroke: '#fff', textAlign: 'center', dy: -8 },
      animate: { enter: { duration: 300 } },
    },
  ],
});

chart.render();
