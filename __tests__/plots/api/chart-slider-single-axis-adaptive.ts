import { Chart } from '../../../src';

export function chartSliderSingleAxisAdaptive(context) {
  const { container, canvas } = context;

  // wrapperDiv
  const wrapperDiv = document.createElement('div');
  container.appendChild(wrapperDiv);

  const chart = new Chart({
    container: wrapperDiv,
    canvas,
  });

  const data: Array<{ x: number; y: number; category: string }> = [];
  for (let i = 0; i < 150; i++) {
    const x = i;
    const y = Math.sin(i / 15) * 60 + 80 + Math.random() * 25;
    data.push({
      x,
      y,
      category: i % 3 === 0 ? 'A' : i % 3 === 1 ? 'B' : 'C',
    });
  }

  chart.options({
    type: 'point',
    data,
    encode: {
      x: 'x',
      y: 'y',
      color: 'category',
    },
    slider: {
      x: {
        values: [0.1, 0.8],
        labelFormatter: (d) => `X: ${Math.round(d)}`,
      },
    },
    style: {
      fillOpacity: 0.8,
    },
    scale: {
      x: { nice: true },
      y: { nice: true },
    },
  });

  const finished = chart.render();

  const buttonFilter = document.createElement('button');
  buttonFilter.innerText = 'Apply X Filter';
  container.appendChild(buttonFilter);

  let resolveFilter;
  const filterComplete = new Promise((r) => (resolveFilter = r));

  buttonFilter.onclick = () => {
    const xRange = [50, 70];
    chart.emit('sliderX:filter', {
      data: { selection: [xRange, undefined] },
    });
    resolveFilter();
  };

  return {
    chart,
    buttonFilter,
    finished,
    filterComplete,
    data,
  };
}
