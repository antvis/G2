import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});
const data = Array.from({ length: 50 }, (_, i) => ({
  epoch: i,
  loss: Math.sin(i / 5) * 20 + 60 + Math.random() * 5,
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
            field: 'loss',
            alpha: 0.4,
            as: 'emaLoss',
          },
        ],
      },
      encode: {
        x: 'epoch',
        y: 'emaLoss',
      },
      style: { stroke: '#52c41a' },
    },
    {
      type: 'line',
      data: {
        type: 'inline',
        value: data,
      },
      encode: {
        x: 'epoch',
        y: 'loss',
      },
      style: { stroke: '#ddd', lineDash: [4, 2] },
    },
  ],
});
chart.render();
