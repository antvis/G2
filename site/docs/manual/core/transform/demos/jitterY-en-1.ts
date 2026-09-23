import * as G2 from '@antv/g2';

const { Chart } = G2;
const chart = new Chart({
  container: 'container',
});
chart.options({
  type: 'point',
  data: {
    type: 'fetch',
    value:
      'https://gw.alipayobjects.com/os/bmw-prod/2c813e2d-2276-40b9-a9af-cf0a0fb7e942.csv',
  },
  encode: { x: 'Horsepower', y: 'Cylinders', color: 'Cylinders' },
  transform: [{ type: 'sortY' }, { type: 'jitterY' }],
  scale: { y: { type: 'point' }, color: { type: 'ordinal' } },
});

chart.render();
