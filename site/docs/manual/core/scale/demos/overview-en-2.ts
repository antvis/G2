import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  theme: 'classic',
});

chart.options({
  type: 'point',
  data: {
    type: 'fetch',
    value: 'https://gw.alipayobjects.com/os/antvdemo/assets/data/scatter.json',
  },
  encode: { x: 'weight', y: 'height', color: 'gender' },
  scale: {
    x: {
      type: 'point',
    },
    y: {
      type: 'point',
      range: [1, 0],
    },
  },
});

chart.render();
