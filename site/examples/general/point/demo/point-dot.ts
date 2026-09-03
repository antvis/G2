/**
 * A recreation of this demo: https://observablehq.com/@d3/dot-plot
 */
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  width: 800,
  height: 1200,
});

const xy = { x: 'state', y: 'population' };

chart.options({
  type: 'view',
  coordinate: { transform: [{ type: 'transpose' }] },
  data: {
    type: 'fetch',
    value:
      'https://gw.alipayobjects.com/os/bmw-prod/b6f2ff26-b232-447d-a613-0df5e30104a0.csv',
  },
  interaction: { tooltip: { shared: true } },
  children: [
    {
      type: 'link',
      scale: { y: { labelFormatter: '.0%' } },
      transform: [{ type: 'groupX', y: 'min', y1: 'max' }],
      encode: xy,
      style: { stroke: '#000' },
      tooltip: false,
    },
    {
      type: 'point',
      scale: { color: { palette: 'spectral' } },
      encode: { ...xy, shape: 'point', color: 'age' },
      tooltip: {
        title: 'state',
        items: ['population'],
      },
    },
  ],
});

chart.render();
