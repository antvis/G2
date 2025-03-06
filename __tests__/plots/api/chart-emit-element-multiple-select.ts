import { Chart } from '../../../src';

export function chartElementMultipleSelect(context) {
  const { container, canvas } = context;

  const wrapperDiv = document.createElement('div');
  container.appendChild(wrapperDiv);

  const chart = new Chart({
    container: wrapperDiv,
    canvas,
  });

  chart.options({
    type: 'interval',
    autoFit: true,
    data: [
      { letter: 'A', frequency: 0.08167 },
      { letter: 'B', frequency: 0.01492 },
      { letter: 'C', frequency: 0.02782 },
      { letter: 'D', frequency: 0.04253 },
    ],
    state: {
      selected: {
        fill: 'red',
      },
    },
    encode: { x: 'letter', y: 'frequency' },
    interaction: {
      elementSelect: { multipleSelectHotkey: 'ShiftLeft' },
    },
  });

  const finished = chart.render();

  return { chart, finished };
}
