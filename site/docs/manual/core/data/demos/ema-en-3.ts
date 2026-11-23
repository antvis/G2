import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

const data = Array.from({ length: 30 }, (_, i) => ({
  date: `2024-01-${String(i + 1).padStart(2, '0')}`,
  close:
    100 + Math.sin(i / 3) * 20 + (i % 5 === 0 ? 20 : 0) + Math.random() * 10,
}));

chart.options({
  type: 'view',
  children: [
    {
      type: 'line',
      data: {
        type: 'inline',
        value: data,
        transform: [
          {
            type: 'ema',
            field: 'close',
            alpha: 0.7,
            as: 'emaClose',
          },
        ],
      },
      encode: {
        x: 'date',
        y: 'emaClose',
      },
      style: {
        stroke: '#007aff',
        lineWidth: 2,
      },
    },
    {
      type: 'line',
      data: {
        type: 'inline',
        value: data,
      },
      encode: {
        x: 'date',
        y: 'close',
      },
      style: {
        stroke: '#bbb',
        lineDash: [4, 2],
      },
    },
  ],
});

chart.render();
