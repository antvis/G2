import { Chart } from '@antv/g2';
import { regressionLog } from 'd3-regression';

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

const logRegression = regressionLog()
  .x((d) => d.x)
  .y((d) => d.y)
  .domain([0.81, 35]);

chart.options({
  type: 'view',
  data: {
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/logarithmic-regression.json',
  },
  children: [
    {
      type: 'point',
      encode: {
        x: 'x',
        y: 'y',
        shape: 'point',
      },
      scale: {
        x: { domain: [0, 35] },
      },
      style: {
        fillOpacity: 0.75,
      },
      axis: {
        x: { title: false },
        y: { title: false },
      },
    },
    {
      type: 'line',
      data: {
        transform: [
          {
            type: 'custom',
            callback: logRegression,
          },
        ],
      },
      encode: {
        x: (d) => d[0],
        y: (d) => d[1],
        shape: 'smooth',
      },
      style: {
        stroke: '#30BF78',
        lineWidth: 2,
      },
      labels: [
        {
          text: 'y = 0.881·ln(x) + 4.173\nThe coefficient of determination, or R^22, is 0.958',
          selector: 'last',
          textAlign: 'end',
        },
      ],
      tooltip: false,
    },
  ],
});

chart.render();
