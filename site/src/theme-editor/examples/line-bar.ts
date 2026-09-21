import { Chart } from '@antv/g2';

export const lineBar = ({ container, theme, width, height, tokens }) => {
  const data = [
    { time: '10:10', call: 4, waiting: 2, people: 2 },
    { time: '10:15', call: 2, waiting: 6, people: 3 },
    { time: '10:20', call: 13, waiting: 2, people: 5 },
    { time: '10:25', call: 9, waiting: 9, people: 1 },
    { time: '10:30', call: 5, waiting: 2, people: 3 },
    { time: '10:35', call: 8, waiting: 2, people: 1 },
    { time: '10:40', call: 13, waiting: 1, people: 2 },
  ];

  const chart = new Chart({
    container,
    width,
    height,
  });

  chart.theme({ type: theme, ...tokens });

  chart.data(data);

  chart
    .interval()
    .encode('x', 'time')
    .encode('y', 'waiting')
    .encode('color', () => 'waiting')
    .axis('y', { title: 'Waiting' })
    .scale('y', { nice: true });

  chart
    .line()
    .encode('x', 'time')
    .encode('y', 'people')
    .encode('shape', 'smooth')
    .encode('color', () => 'people')
    .style('lineWidth', 2)
    .scale('y', { independent: true, nice: true })
    .axis('y', {
      position: 'right',
      grid: null,
      title: 'People',
    });

  chart.render();

  return chart;
};
