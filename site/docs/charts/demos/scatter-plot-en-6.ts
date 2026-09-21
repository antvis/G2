import { Chart } from '@antv/g2';

const chart = new Chart({ container: 'container' });

chart.options({
  type: 'point',
  autoFit: true,
  data: {
    type: 'fetch',
    value:
      'https://gw.alipayobjects.com/os/bmw-prod/2c813e2d-2276-40b9-a9af-cf0a0fb7e942.csv',
  },
  encode: {
    y: 'Horsepower',
    x: 'Cylinders',
    shape: 'hollow',
    color: 'Cylinders',
  },
  transform: [{ type: 'sortX', channel: 'x' }],
  scale: { x: { type: 'point' }, color: { type: 'ordinal' } },
});

chart.render();
