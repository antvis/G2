import { Chart } from '../../../src';

export function issue6699(context) {
  const { container, canvas, callback } = context;
  const chart = new Chart({
    container,
    canvas,
    autoFit: true,
  });

  const data = [
    { time: '10:10', call: 4, waiting: 2, people: 2 },
    { time: '10:15', call: 2, waiting: 6, people: 3 },
    { time: '10:20', call: 13, waiting: 2, people: 5 },
    { time: '10:25', call: 9, waiting: 9, people: 1 },
    { time: '10:30', call: 5, waiting: 6, people: 3 },
    { time: '10:35', call: 8, waiting: null, people: null },
    { time: '10:40', call: 13, waiting: 3, people: 2 },
  ];

  chart.data(data);

  chart
    .interval()
    .encode('x', 'time')
    .encode('y', 'waiting')
    .encode('color', () => 'waiting');

  chart
    .interval()
    .encode('x', 'time')
    .encode('y', 'people')
    .encode('color', () => 'people');

  chart
    .line()
    .encode('x', 'time')
    .encode('y', 'call')
    .encode('color', () => 'call');

  const finished = chart.render();

  return { chart, finished };
}
