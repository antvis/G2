import { Chart } from '../../../src';

export function chartRenderClearInteraction(context) {
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

  const finished = chart.render().then(() => {
    chart.options({ interaction: { tooltip: false } });
    return chart.render();
  });

  return { chart, finished };
}
