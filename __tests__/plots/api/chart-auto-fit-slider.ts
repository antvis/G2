import { Chart } from '../../../src';

export function chartAutoFitSlider(context) {
  const { container, canvas } = context;

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

  chart.options({
    type: 'line',
    data: { type: 'fetch', value: 'data/stocks.csv' },
    legend: false,
    encode: {
      x: (d) => new Date(d.date).getFullYear(),
      y: 'price',
      color: 'symbol',
    },
    transform: [{ type: 'groupX', y: 'mean' }],
    slider: { x: true },
  });

  const finished = chart.render();

  return { chart, finished };
}
