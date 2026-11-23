import * as G2 from '@antv/g2';

const { Chart } = G2;
const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'view',
  coordinate: { transform: [{ type: 'transpose' }] },
  data: {
    type: 'fetch',
    value:
      'https://gw.alipayobjects.com/os/bmw-prod/b6f2ff26-b232-447d-a613-0df5e30104a0.csv',
  },
  children: [
    {
      type: 'link',
      transform: [{ type: 'groupX', y: 'min', y1: 'max' }],
      encode: { x: 'state', y: 'population' },
      style: { stroke: '#000' },
      scale: { y: { formatter: '.0%' } },
    },
    {
      type: 'point',
      encode: { x: 'state', y: 'population', shape: 'point', color: 'age' },
      scale: { color: { palette: 'spectral' } },
    },
  ],
});

chart.render();
