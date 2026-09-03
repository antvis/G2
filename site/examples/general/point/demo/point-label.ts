/**
 * A recreation of this demo: https://observablehq.com/@d3/scatterplot
 */
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'view',
  children: [
    {
      type: 'point',
      data: {
        type: 'fetch',
        value:
          ' https://gw.alipayobjects.com/os/bmw-prod/474e51c8-b47b-4bb6-b3ed-87813a960df2.csv',
      },
      scale: {
        x: { nice: true, domainMax: 38 },
        y: { nice: true },
      },
      encode: {
        x: 'mpg',
        y: 'hp',
      },
      labels: [
        {
          text: 'name',
          stroke: '#fff',
          textAlign: 'start',
          textBaseline: 'middle',
          dx: 10,
          position: 'left',
          fontSize: 10,
          lineWidth: 2,
        },
      ],
    },
  ],
});

chart.render();
