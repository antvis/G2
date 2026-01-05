import { Chart } from '../../../src';

export function chartChangeSizeLegendBottomCenter(context) {
  const { container, canvas } = context;

  const button = document.createElement('button');
  button.innerText = 'Update Size';
  button.style.display = 'block';
  container.appendChild(button);

  const div = document.createElement('div');
  container.appendChild(div);

  const chart = new Chart({ container: div, canvas });

  chart.options({
    type: 'interval',
    data: [
      { genre: 'Sports', sold: 275 },
      { genre: 'Strategy', sold: 115 },
      { genre: 'Action', sold: 120 },
      { genre: 'Shooter', sold: 350 },
      { genre: 'Other', sold: 150 },
    ],
    encode: { x: 'genre', y: 'sold', color: 'genre' },
    legend: {
      color: {
        position: 'bottom',
        maxRows: 1,
        layout: {
          justifyContent: 'center',
          alignItems: 'center',
        },
      },
    },
  });

  const finished = chart.render();

  let resolve;
  const resized = new Promise((r) => (resolve = r));

  button.onclick = () => {
    chart.options({ width: 400, height: 300 }).render().then(resolve);
  };

  return { chart, button, finished, resized };
}
