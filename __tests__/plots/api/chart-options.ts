import { Chart } from '../../../src';

export function chartOptions(context) {
  const { container, canvas } = context;

  const chart = new Chart({
    theme: 'classic',
    container,
    canvas,
  });

  chart.options({
    type: 'line',
    clip: true,
    data: {
      type: 'fetch',
      value: 'data/aapl.csv',
    },
    encode: {
      x: 'date',
      y: 'close',
    },
  });

  const finished = chart.render();

  return { chart, finished };
}
