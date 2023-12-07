import { Chart } from '../../../src';

export function chartOptions(context) {
  const { container, canvas } = context;

  const chart = new Chart({
    container,
    canvas,
  });

  chart.options({
    type: 'line',
    clip: true,
    title: '标题',
    data: {
      type: 'fetch',
      value: 'data/aapl.csv',
    },
    encode: {
      x: 'date',
      y: 'close',
    },
    axis: false,
  });

  const finished = chart.render();

  return { chart, finished };
}
