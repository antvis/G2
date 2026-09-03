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

// Relative position
chart.options({
  type: 'view',
  coordinate: { type: 'theta', outerRadius: 0.8, innerRadius: 0.5 },
  children: [
    {
      type: 'interval',
      data: data,
      transform: [{ type: 'stackY' }],
      encode: {
        y: 'percent',
        color: 'item',
      },
      legend: {
        color: { position: 'bottom', layout: { justifyContent: 'center' } },
      },
      labels: [
        {
          position: 'outside',
          text: (data) => `${data.item}: ${data.percent * 100}%`,
        },
      ],
      tooltip: {
        items: [
          (data) => ({
            name: data.item,
            value: `${data.percent * 100}%`,
          }),
        ],
      },
    },
    {
      type: 'text',
      style: {
        text: '主机',
        x: '50%',
        y: '50%',
        dy: -25,
        fontSize: 34,
        fill: '#8c8c8c',
        textAlign: 'center',
      },
    },
    {
      type: 'text',
      style: {
        text: '200',
        x: '50%',
        y: '50%',
        dx: -25,
        dy: 25,
        fontSize: 44,
        fill: '#8c8c8c',
        textAlign: 'center',
      },
    },
    {
      type: 'text',
      style: {
        text: '台',
        x: '50%',
        y: '50%',
        dx: 35,
        dy: 25,
        fontSize: 34,
        fill: '#8c8c8c',
        textAlign: 'center',
      },
    },
  ],
});

chart.render();
