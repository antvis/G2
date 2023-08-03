import { Chart } from '../../../src';

export function markChangeData(context) {
  const { container, canvas } = context;

  const button = document.createElement('button');
  button.innerText = 'Update Data';
  container.appendChild(button);

  const div = document.createElement('div');
  container.appendChild(div);

  const chart = new Chart({ container: div, canvas });

  chart.data([
    { genre: 'Sports', sold: 275 },
    { genre: 'Strategy', sold: 115 },
    { genre: 'Action', sold: 120 },
    { genre: 'Shooter', sold: 350 },
    { genre: 'Other', sold: 150 },
  ]);
  const interval = chart
    .interval()
    .encode('x', 'genre')
    .encode('y', 'sold')
    .encode('color', 'genre');

  const finished = chart.render();

  button.onclick = () => {
    interval.changeData([
      { genre: 'Action', sold: 120 },
      { genre: 'Shooter', sold: 350 },
      { genre: 'Other', sold: 150 },
      { genre: 'Sports', sold: 275 },
      { genre: 'Strategy', sold: 115 },
    ]);
  };

  return { chart, finished, button, canvas: chart.getContext().canvas };
}
