import { Chart } from '../../../src';

export function chartOnLabelClick(context) {
  const { container, canvas } = context;
  const data = [
    { text: 'A', value: 12000, c: 's' },
    { text: 'B', value: 9800 },
    { text: 'C', value: 6789 },
    { text: 'D', value: 4569 },
  ];
  const chart = new Chart({ container, canvas });
  chart
    .interval()
    .data(data)
    .encode('x', 'text')
    .encode('y', 'value')
    .legend(false)
    .label({
      text: 'label',
      cursor: 'pointer',
    });

  chart.on('label:click', (e) => console.log('click label', e, e.data));

  const finished = chart.render();

  return { chart, finished };
}
