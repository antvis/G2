import { Chart } from '../../../src';

export function chartRenderUpdateNonAnimation(context) {
  const { container, canvas } = context;

  // button
  const button = document.createElement('button');
  button.innerText = 'Rerender';
  container.appendChild(button);

  // wrapperDiv
  const wrapperDiv = document.createElement('div');
  container.appendChild(wrapperDiv);

  const chart = new Chart({
    container: wrapperDiv,
    canvas,
  });

  const options = {
    type: 'interval',
    data: [
      { genre: 'Sports', sold: 275 },
      { genre: 'Strategy', sold: 115 },
      { genre: 'Action', sold: 120 },
      { genre: 'Shooter', sold: 350 },
      { genre: 'Other', sold: 150 },
    ],
    encode: {
      x: 'genre',
      y: 'sold',
    },
    animate: false,
  };

  chart.options(options);

  const finished = chart.render();

  let resolve;
  const refreshed = new Promise((r) => (resolve = r));

  button.onclick = () => {
    chart.options({
      ...options,
      type: 'point',
    });
    chart.render().then(resolve);
  };

  return { chart, button, finished, refreshed };
}
