import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'rect',
  autoFit: true,
  data: {
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/unemployment2.json',
  },
  encode: { x: 'rate' },
  transform: [{ type: 'binX', y: 'count' }],
});

chart.render();
