import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});
chart.options({
  type: 'view',
  children: [
    {
      type: 'line',
      data: {
        type: 'inline',
        value: [
          { t: 0, y: 100 },
          { t: 1, y: 180 },
          { t: 2, y: 120 },
          { t: 3, y: 200 },
          { t: 4, y: 150 },
          { t: 5, y: 250 },
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
      encode: { x: 't', y: 'emaY' },
      style: { stroke: '#f90' },
    },
    {
      type: 'line',
      data: {
        type: 'inline',
        value: [
          { t: 0, y: 100 },
          { t: 1, y: 180 },
          { t: 2, y: 120 },
          { t: 3, y: 200 },
          { t: 4, y: 150 },
          { t: 5, y: 250 },
        ],
      },
      encode: { x: 't', y: 'y' },
      style: { stroke: '#ccc', lineDash: [4, 2] },
    },
  ],
});
chart.render();
