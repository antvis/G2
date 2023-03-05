import { Chart } from '../../../src';

export function chartOptions(context) {
  const { container, canvas } = context;

  const div = document.createElement('div');
  container.appendChild(div);

  const chart = new Chart({
    container: div,
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
