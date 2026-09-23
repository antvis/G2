import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'rect',
  data: {
    type: 'fetch',
    value: 'https://gw.alipayobjects.com/os/antvdemo/assets/data/scatter.json',
  },
  encode: { x: 'height', color: 'gender' },
  transform: [{ type: 'binX', y: 'count' }, { type: 'stackY' }],
  style: { insetLeft: 1 },
});

chart.render();
