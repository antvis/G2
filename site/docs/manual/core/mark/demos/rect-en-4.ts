import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'rect',
  data: {
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/athletes.json',
  },
  encode: { x: 'weight', color: 'sex' },
  transform: [
    { type: 'binX', y: 'count' },
    { type: 'stackY', orderBy: 'series' },
  ],
});

chart.render();
