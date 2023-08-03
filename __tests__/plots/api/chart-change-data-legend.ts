import { Chart } from '../../../src';

export function chartChangeDataLegend(context) {
  const { container, canvas } = context;

  const chart = new Chart({
    container,
    canvas,
  });

  const data = [
    { time: '10:10', call: 4, waiting: 2, people: 2, type: 'a' },
    { time: '10:10', call: 2, waiting: 6, people: 3, type: 'b' },
    { time: '10:20', call: 13, waiting: 2, people: 5, type: 'a' },
    { time: '10:20', call: 9, waiting: 9, people: 1, type: 'b' },
    { time: '10:30', call: 5, waiting: 2, people: 3, type: 'a' },
    { time: '10:30', call: 8, waiting: 5, people: 1, type: 'b' },
    { time: '10:40', call: 13, waiting: 1, people: 2, type: 'a' },
    { time: '10:40', call: 13, waiting: 3, people: 2, type: 'b' },
  ];

  chart.options({
    type: 'interval',
    data,
    encode: {
      x: 'time',
      y: 'waiting',
      color: 'type',
    },
    transform: [{ type: 'dodgeX' }],
    labels: [{ text: 'type' }],
  });

  const finished = chart
    .render()
    .then((chart) =>
      chart.changeData(data.sort((x, y) => (x.type > y.type ? -1 : 1))),
    );

  return { chart, finished };
}
