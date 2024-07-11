import { Chart } from '../../../src';

export function chartWordCloudCanvas(context) {
  const { container, canvas } = context;

  const chart = new Chart({
    container,
    canvas,
  });

  const ref = { called: false };

  chart.options({
    type: 'wordCloud',
    data: {
      type: 'fetch',
      value: 'data/philosophyWord.json',
    },
    layout: {
      // random,
      canvas: () => {
        ref.called = true;
        return document.createElement('canvas');
      },
    },
  });

  const finished = chart.render();

  return { chart, ref, finished };
}
