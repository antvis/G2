/**
 * A recreation of this demo: https://echarts.apache.org/examples/zh/editor.html?c=scatter-exponential-regression
 */
import { Chart } from '@antv/g2';
import { regressionExp } from 'd3-regression';

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'view',
  data: {
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/exponential-regression.json',
  },
  children: [
    {
      type: 'point',
      encode: {
        x: (d) => d[0],
        y: (d) => d[1],
        shape: 'point',
      },
      scale: {
        x: { domain: [0, 18] },
        y: { domain: [0, 100000] },
      },
      style: {
        fillOpacity: 0.75,
      },
      axis: {
        y: { labelFormatter: '~s' },
      },
    },
    {
      type: 'line',
      data: {
        transform: [
          {
            type: 'custom',
            callback: regressionExp(),
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
          text: 'y = 3477.32e^(0.18x)\nThe coefficient of determination, or R^2, is 0.998',
          selector: 'last',
          textAlign: 'end',
        },
      ],
      tooltip: false,
    },
  ],
});

chart.render();
