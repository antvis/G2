import { Chart } from '../../../src';

export function chartSliderAdaptiveModeControl(context) {
  const { container, canvas } = context;

  // wrapperDiv
  const wrapperDiv = document.createElement('div');
  container.appendChild(wrapperDiv);

  const chart = new Chart({
    container: wrapperDiv,
    canvas,
  });

  const data: any[] = [];
  for (let i = 0; i < 100; i++) {
    data.push({
      x: i,
      y: Math.sin(i / 10) * 50 + 100 + Math.random() * 20,
      category: i % 2 === 0 ? 'A' : 'B',
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
        labelFormatter: (d) => `X: ${Math.round(d)}`,
      },
    },
    interaction: {
      sliderFilter: {
        adaptiveMode: 'filter',
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

  const buttonAdaptive = document.createElement('button');
  buttonAdaptive.innerText = 'Adaptive';
  container.appendChild(buttonAdaptive);

  const buttonDisableAdaptive = document.createElement('button');
  buttonDisableAdaptive.innerText = 'Disable Adaptive';
  container.appendChild(buttonDisableAdaptive);

  let resolveAdaptive, resolveDisable;
  const adaptiveComplete = new Promise((r) => (resolveAdaptive = r));
  const disableComplete = new Promise((r) => (resolveDisable = r));
  const xRange = [40, 60];

  buttonAdaptive.onclick = () => {
    chart.emit('sliderX:filter', {
      data: { selection: [xRange, undefined] },
    });
    resolveAdaptive();
  };

  buttonDisableAdaptive.onclick = () => {
    chart.interaction({
      sliderFilter: {
        adaptiveMode: false,
      },
    });
    chart.render().then(() => {
      chart.emit('sliderX:filter', {
        data: { selection: [xRange, undefined] },
      });
      resolveDisable();
    });
  };

  return {
    chart,
    buttonDisableAdaptive,
    buttonAdaptive,
    finished,
    disableComplete,
    adaptiveComplete,
    data,
  };
}
