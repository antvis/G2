import { Chart } from '../../../src';

export function chartChangeDataEmpty(context) {
  const { container, canvas } = context;

  const chart = new Chart({
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

  const finished = chart.render().then((chart) => chart.changeData([]));

  return { chart, finished };
}
