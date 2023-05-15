import { Chart } from '../../../src';

export function chartRenderUpdateAttributes(context) {
  const { container, canvas } = context;

  // button
  const button = document.createElement('button');
  button.innerText = 'Rerender';
  container.appendChild(button);

  // wrapperDiv
  const wrapperDiv = document.createElement('div');
  container.appendChild(wrapperDiv);

  const chart = new Chart({
    theme: 'classic',
    container: wrapperDiv,
    canvas,
  });

  const options = {
    type: 'line',
    data: {
      type: 'fetch',
      value: 'data/aapl.csv',
      transform: [{ type: 'slice', start: 0, end: 10 }],
    },
    encode: {
      x: 'date',
      y: 'close',
    },
  };

  chart.options(options);

  const finished = chart.render();

  let resolve;
  let resolve1;
  const refreshed = new Promise((r) => (resolve = r));
  const refreshed1 = new Promise((r) => (resolve1 = r));

  let lineDash = false;
  button.onclick = () => {
    if (lineDash) {
      chart.options({
        ...options,
        style: {
          lineDash: null,
        },
      });
      lineDash = false;
      chart.render().then(resolve1);
    } else {
      chart.options({
        ...options,
        style: {
          lineDash: [5, 4],
        },
      });
      lineDash = true;
      chart.render().then(resolve);
    }
  };

  return { chart, button, finished, refreshed, refreshed1 };
}
