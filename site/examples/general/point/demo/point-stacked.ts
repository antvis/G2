/**
 * A recreation of this demo: https://observablehq.com/@mbostock/global-temperature-trends
 */
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  height: 360,
});

chart.options({
  type: 'view',
  children: [
    {
      type: 'point',
      data: {
        type: 'fetch',
        value:
          'https://gw.alipayobjects.com/os/bmw-prod/88c601cd-c1ff-4c9b-90d5-740d0b710b7e.json',
      },
      transform: [{ type: 'stackY', y1: 'y' }],
      encode: {
        x: (d) => 2021 - d.birth,
        y: (d) => (d.gender === 'M' ? 1 : -1),
        color: 'gender',
        shape: 'point',
      },
      scale: {
        x: { nice: true },
      },
      axis: {
        y: {
          title: '← Women · Men →',
          labelFormatter: (d) => `${Math.abs(+d)}`,
        },
        x: { title: 'Age →' },
      },
      legend: {
        color: { title: 'Gender' },
      },
      tooltip: {
        items: [{ channel: 'x', name: 'age' }],
      },
    },
    {
      type: 'lineY',
      data: [0],
      style: {
        stroke: 'black',
      },
    },
  ],
});

chart.render();
