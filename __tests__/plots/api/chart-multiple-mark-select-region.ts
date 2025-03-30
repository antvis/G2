import { Chart } from '../../../src';

export function chartMultipleMarkSelectRegion(context) {
  const { container, canvas } = context;

  const wrapperDiv = document.createElement('div');
  container.appendChild(wrapperDiv);

  const chart = new Chart({
    container: wrapperDiv,
    canvas,
  });

  chart.options({
    type: 'view',
    autoFit: true,
    interaction: {
      elementSelect: {
        region: true,
        multipleSelectHotkey: 'ShiftLeft',
      },
    },
    data: [
      { time: '10:10', call: 4, waiting: 2, people: 2 },
      { time: '10:15', call: 2, waiting: 6, people: 3 },
      { time: '10:20', call: 13, waiting: 2, people: 5 },
      { time: '10:25', call: 9, waiting: 9, people: 1 },
      { time: '10:30', call: 5, waiting: 2, people: 3 },
      { time: '10:35', call: 8, waiting: 2, people: 1 },
      { time: '10:40', call: 13, waiting: 1, people: 2 },
    ],
    children: [
      {
        type: 'interval',
        encode: { x: 'time', y: 'waiting', series: () => '0' },
        axis: { y: { title: 'Waiting', titleFill: '#5B8FF9' } },
        state: {
          selected: {
            fill: 'red',
          },
        },
      },
      {
        type: 'interval',
        encode: { x: 'time', y: 'people', series: () => '1' },
        scale: { y: { independent: true } },
        state: {
          selected: {
            fill: 'red',
          },
        },
      },
      {
        type: 'line',
        encode: { x: 'time', y: 'people', shape: 'smooth' },
        scale: { y: { independent: true } },
        style: { stroke: '#fdae6b', lineWidth: 2 },
      },
    ],
  });

  const finished = chart.render();

  return { chart, finished };
}
