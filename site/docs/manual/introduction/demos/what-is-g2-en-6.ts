import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  paddingLeft: 60,
});

chart.options({
  type: 'facetRect',
  data: {
    type: 'fetch',
    value: 'https://gw.alipayobjects.com/os/antvdemo/assets/data/scatter.json',
  },
  encode: { y: 'gender' },
  children: [
    {
      type: 'rect',
      encode: { x: 'height', color: 'gender' },
      transform: [{ type: 'binX', y: 'count' }, { type: 'stackY' }],
      scale: { y: { nice: true } },
      frame: false,
      style: { insetLeft: 1 },
    },
  ],
});

chart.render();
