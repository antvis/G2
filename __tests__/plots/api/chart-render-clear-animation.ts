import { Chart } from '../../../src';

export function chartRenderClearAnimation(context) {
  const { container, canvas } = context;

  const button = document.createElement('button');
  button.innerText = 'render';
  button.style.display = 'block';
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

  chart
    .interval()
    .encode('x', 'genre')
    .encode('y', 'sold')
    .encode('color', 'genre');

  const finished = chart.render();

  let resolve;
  const refreshed = new Promise((r) => (resolve = r));

  button.onclick = () => {
    chart.render()?.then(resolve);
  };

  return { chart, button, finished, refreshed };
}
