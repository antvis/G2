import { Chart } from '../../../src';

export function markChangeDataTooltip(context) {
  const { container, canvas } = context;

  const button = document.createElement('button');
  button.innerText = 'Update Data';
  container.appendChild(button);

  const div = document.createElement('div');
  container.appendChild(div);

  const chart = new Chart({ container: div, canvas });

  const line = chart
    .line()
    .data([
      { letter: 'test1', frequency: 10 },
      { letter: 'test2', frequency: 11 },
      { letter: 'test3', frequency: 12 },
      { letter: 'test4', frequency: 13 },
      { letter: 'test5', frequency: 14 },
      { letter: 'test6', frequency: 16 },
    ])
    .encode('x', 'letter')
    .encode('y', 'frequency')
    .axis('y', { labelFormatter: '.0%' })
    .interaction('tooltip');

  const finished = chart.render();

  button.onclick = () => {
    line.changeData([
      { letter: 'test1', frequency: 20 },
      { letter: 'test2', frequency: 11 },
      { letter: 'test3', frequency: 12 },
      { letter: 'test4', frequency: 13 },
      { letter: 'test5', frequency: 14 },
      { letter: 'test6', frequency: 16 },
    ]);
  };

  return { chart, finished, button, canvas: chart.getContext().canvas };
}
