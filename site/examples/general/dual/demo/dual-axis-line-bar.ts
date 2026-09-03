import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

const data = [
  { time: '10:10', call: 4, waiting: 2, people: 2 },
  { time: '10:15', call: 2, waiting: 6, people: 3 },
  { time: '10:20', call: 13, waiting: 2, people: 5 },
  { time: '10:25', call: 9, waiting: 9, people: 1 },
  { time: '10:30', call: 5, waiting: 2, people: 3 },
  { time: '10:35', call: 8, waiting: 2, people: 1 },
  { time: '10:40', call: 13, waiting: 1, people: 2 },
];

chart.options({
  type: 'view',
  data: data,
  children: [
    {
      type: 'interval',
      encode: {
        x: 'time',
        y: 'waiting',
        color: () => 'waiting',
        series: () => 'waiting',
      },
      axis: {
        y: { title: 'Waiting' },
      },
      scale: {
        y: { nice: true },
      },
    },
    {
      type: 'interval',
      encode: {
        x: 'time',
        y: 'people',
        color: () => 'people',
        series: () => 'people',
      },
      scale: {
        y: { independent: true },
      },
      axis: {
        y: { position: 'right', grid: null, title: 'People' },
      },
    },
    {
      type: 'line',
      encode: {
        x: 'time',
        y: 'call',
        color: () => 'call',
      },
      scale: {
        series: { independent: true },
      },
    },
  ],
});

chart.render();
