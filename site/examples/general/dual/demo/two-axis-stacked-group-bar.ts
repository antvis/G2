import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

const data = [
  { time: '10:10', call: 4, waiting: 2, people: 2, mock: 3 },
  { time: '10:15', call: 2, waiting: 6, people: 3, mock: 4 },
  { time: '10:20', call: 13, waiting: 2, people: 5, mock: 1 },
  { time: '10:25', call: 9, waiting: 9, people: 1, mock: 2 },
  { time: '10:30', call: 5, waiting: 2, people: 3, mock: 5 },
  { time: '10:35', call: 8, waiting: 2, people: 1, mock: 3 },
  { time: '10:40', call: 13, waiting: 1, people: 2, mock: 2 },
];

chart.data(data);

chart
  .interval()
  .data({
    transform: [{ type: 'fold', fields: ['call', 'waiting'] }],
  })
  .encode('x', 'time')
  .encode('y', 'value')
  .encode('color', 'key')
  .encode('series', () => 'a')
  .transform({ type: 'stackY' })
  .scale('y', { nice: true })
  .axis('y', { title: null });

chart
  .interval()
  .encode('x', 'time')
  .encode('y', 'people')
  .encode('color', () => 'people')
  .encode('series', () => 'b');

chart
  .interval()
  .encode('x', 'time')
  .encode('y', 'mock')
  .encode('color', () => 'mock')
  .encode('series', () => 'c')
  .scale('y', { independent: true })
  .axis('y', { position: 'right' });

chart.render();
