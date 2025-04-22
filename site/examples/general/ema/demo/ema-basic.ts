import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  autoFit: true,
  height: 300,
});

chart.options({
  type: 'view',
  children: [
    {
      type: 'line',
      data: {
        type: 'inline',
        value: [
          { x: 0, y: 30 },
          { x: 1, y: 80 },
          { x: 2, y: 45 },
          { x: 3, y: 90 },
          { x: 4, y: 20 },
          { x: 5, y: 60 },
          { x: 6, y: 30 },
          { x: 7, y: 85 },
          { x: 8, y: 40 },
          { x: 9, y: 70 },
        ],
        transform: [
          {
            type: 'ema',
            field: 'y',
            alpha: 0.6,
            as: 'emaY',
          },
        ],
      },
      encode: {
        x: 'x',
        y: 'emaY',
      },
      style: {
        stroke: '#f90',
        lineWidth: 2,
      },
    },
    {
      type: 'line',
      data: {
        type: 'inline',
        value: [
          { x: 0, y: 30 },
          { x: 1, y: 80 },
          { x: 2, y: 45 },
          { x: 3, y: 90 },
          { x: 4, y: 20 },
          { x: 5, y: 60 },
          { x: 6, y: 30 },
          { x: 7, y: 85 },
          { x: 8, y: 40 },
          { x: 9, y: 70 },
        ],
      },
      encode: {
        x: 'x',
        y: 'y',
      },
      style: {
        stroke: '#ccc',
        lineDash: [4, 2],
      },
    },
  ],
});

chart.render();
