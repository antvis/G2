import { Chart } from '../../../src';

export function chartAutoFit(context) {
  const { container, canvas } = context;

  // button
  const button = document.createElement('button');
  button.innerText = 'Change Wrapper Container';
  container.appendChild(button);

  // wrapperDiv
  const wrapperDiv = document.createElement('div');
  wrapperDiv.style.width = '800px';
  wrapperDiv.style.height = '500px';
  container.appendChild(wrapperDiv);

  const chart = new Chart({
    container: wrapperDiv,
    autoFit: true,
    canvas,
  });

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
    .encode('color', 'genre')
    .axis({ x: { animate: false }, y: { animate: false } });

  const finished = chart.render();

  let resolve;
  const fitted = new Promise((r) => (resolve = r));

  button.onclick = () => {
    wrapperDiv.style.width = '400px';
    wrapperDiv.style.height = '500px';
    chart.forceFit().then(resolve);
  };

  return { chart, button, finished, fitted };
}
