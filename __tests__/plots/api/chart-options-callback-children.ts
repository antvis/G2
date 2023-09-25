import { Chart } from '../../../src';

export function chartOptionsCallbackChildren(context) {
  const { container, canvas } = context;

  const chart = new Chart({
    container,
    canvas,
  });

  chart.options({
    type: 'repeatMatrix',
    width: 480,
    height: 480,
    paddingLeft: 50,
    paddingBottom: 50,
    data: {
      type: 'fetch',
      value: 'data/penguins.csv',
    },
    encode: {
      position: ['culmen_length_mm', 'culmen_depth_mm'],
      color: 'species',
    },
    children: () => ({
      type: 'point',
      encode: { color: 'species' },
    }),
  });

  const finished = chart.render();

  return { chart, finished };
}
