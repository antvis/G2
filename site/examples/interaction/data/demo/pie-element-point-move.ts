import { Chart } from '@antv/g2';

const data = [
  { item: '事例一', count: 40, percent: 0.4 },
  { item: '事例二', count: 21, percent: 0.21 },
  { item: '事例三', count: 17, percent: 0.17 },
  { item: '事例四', count: 13, percent: 0.13 },
  { item: '事例五', count: 9, percent: 0.09 },
];

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'view',
  coordinate: { type: 'theta', outerRadius: 0.8 },
  children: [
    {
      type: 'interval',
      data: data,
      transform: [{ type: 'stackY' }],
      interaction: {
        legendFilter: false,
        elementPointMove: {
          pathLineDash: [2, 4],
          pathStroke: '#fff',
          pathLineWidth: 2,
        },
      },
      encode: {
        y: 'count',
        color: 'item',
        key: 'item',
      },
      tooltip: {
        items: [
          (data) => ({
            name: data.item,
            value: `${data.percent * 100}%`,
          }),
        ],
      },
    },
  ],
});

chart.render();
