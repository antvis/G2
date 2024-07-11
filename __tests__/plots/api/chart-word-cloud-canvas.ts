import { Chart } from '../../../src';

export function chartWordCloudCanvas(context) {
  const { container, canvas } = context;

  const ref = { called: false };

  const chart = new Chart({
    container,
    canvas,
    createCanvas: () => {
      ref.called = true;
      return document.createElement('canvas');
    },
  });

  chart.options({
    type: 'wordCloud',
    data: {
      type: 'fetch',
      value: 'data/philosophyWord.json',
    },
  });

  const finished = chart.render();

  return { chart, ref, finished };
}
