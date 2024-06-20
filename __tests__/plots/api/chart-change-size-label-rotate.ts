import { Chart } from '../../../src';

export function chartChangeSizeLabelRotate(context) {
  const { container, canvas } = context;

  const button = document.createElement('button');
  button.innerText = 'Update Size';
  button.style.display = 'block';
  container.appendChild(button);

  const div = document.createElement('div');
  container.appendChild(div);

  const chart = new Chart({
    container: div,
    canvas,
  });

  chart.data([
    { genre: 'Sports', sold: 275 },
    { genre: 'Strategy', sold: 115 },
    { genre: 'Action', sold: 120 },
    { genre: 'Shooter', sold: 350 },
    { genre: 'Infantry', sold: 220 },
    { genre: 'Logistics', sold: 330 },
    { genre: 'OtherOtherOther', sold: 150 },
  ]);

  chart
    .interval()
    .encode('x', 'genre')
    .encode('y', 'sold')
    .encode('color', 'genre')
    .axis({ x: { animate: false }, y: { animate: false } })
    .legend('color', [{}, { position: 'right' }]);

  const finished = chart.render();

  button.onclick = () => {
    chart.changeSize(900, 300);
  };

  return { chart, button, finished };
}
