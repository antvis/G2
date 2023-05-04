import { Chart } from '../../../src';

export function chartOnBrushFilter(context) {
  const { container, canvas } = context;

  const chart = new Chart({
    theme: 'classic',
    container,
    canvas,
  });

  chart.options({
    type: 'point',
    data: {
      type: 'fetch',
      value: 'data/penguins.csv',
    },
    encode: {
      color: 'species',
      x: 'culmen_length_mm',
      y: 'culmen_depth_mm',
    },
    interaction: { brushFilter: true },
  });

  chart.on('brush:filter', (event) => {
    console.log(event.data.selection);
  });

  const finished = chart.render();

  return { chart, finished };
}
