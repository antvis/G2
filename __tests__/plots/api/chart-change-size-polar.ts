import { Chart } from '../../../src';
import { scoreByItem } from '../../data/score-by-item';

export function chartChangeSizePolar(context) {
  const { container, canvas } = context;

  const button = document.createElement('button');
  button.innerText = 'Update Size';
  button.style.display = 'block';
  container.appendChild(button);

  const div = document.createElement('div');
  container.appendChild(div);

  const chart = new Chart({ container: div, canvas });

  chart.options({
    type: 'view',
    data: scoreByItem,
    coordinate: { type: 'polar' },
    encode: { x: 'item', y: 'score', color: 'type' },
    scale: {
      x: { padding: 0.5, align: 0 },
      y: { tickCount: 5, domainMax: 80 },
    },
    // axis: {
    //   x: { grid: true },
    //   y: { zIndex: 1, title: false, direction: 'center' },
    // },
    axis: false,
    legend: { color: { layout: { justifyContent: 'flex-start' } } },
    children: [
      {
        type: 'area',
        style: { fillOpacity: 0.5 },
      },
      {
        type: 'line',
        style: { lineWidth: 2 },
      },
    ],
  });

  const finished = chart.render();

  let resolve;
  const resized = new Promise((r) => (resolve = r));

  button.onclick = () => {
    chart.options({ width: 400, height: 300 }).render().then(resolve);
  };

  return { chart, button, finished, resized };
}
