import { Chart } from '../../../src';

export function chartOptionsChangeData(context) {
  const { container, canvas } = context;

  const button = document.createElement('button');
  button.innerText = 'Update Data';
  button.style.display = 'block';
  container.appendChild(button);

  const div = document.createElement('div');
  container.appendChild(div);

  const chart = new Chart({
    container,
    canvas,
  });

  chart.options({
    type: 'interval',
    coordinate: { type: 'theta' },
    transform: [{ type: 'stackY' }],
    data: [
      { genre: 'Sports', sold: 275 },
      { genre: 'Strategy', sold: 115 },
      { genre: 'Action', sold: 120 },
      { genre: 'Shooter', sold: 350 },
      { genre: 'Other', sold: 150 },
    ],
    encode: {
      y: 'sold',
      color: 'genre',
    },
    animate: {
      enter: {
        type: 'waveIn',
      },
    },
  });

  const finished = chart.render();

  button.onclick = () => {
    chart.changeData([
      { genre: 'Sports', sold: 275 },
      { genre: 'Strategy', sold: 115 },
    ]);
  };

  return { chart, finished, button };
}
