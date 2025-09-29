import { Chart } from '../../../src';

export function chartSliderMultiAxisAdaptive(context) {
  const { container, canvas } = context;

  // wrapperDiv
  const wrapperDiv = document.createElement('div');
  container.appendChild(wrapperDiv);

  const chart = new Chart({
    container: wrapperDiv,
    canvas,
    inset: 3,
  });

  const data: any[] = [];
  for (let i = 0; i < 60; i++) {
    data.push({
      date: `Day-${i + 1}`,
      sales: Math.sin(i / 10) * 300 + 800 + Math.random() * 200,
      profit: Math.cos(i / 8) * 50 + 75 + Math.random() * 25,
      revenue: Math.sin(i / 12) * 800 + 1500 + Math.random() * 300,
    });
  }

  chart.options({
    type: 'view',
    data,
    children: [
      {
        type: 'interval',
        encode: { x: 'date', y: 'sales' },
        scale: { y: { nice: true } },
        style: { fill: '#1890ff', fillOpacity: 0.6 },
      },
      {
        type: 'line',
        encode: { x: 'date', y: 'profit' },
        scale: {
          y: {
            key: 'y1',
            independent: true,
            nice: true,
          },
        },
        style: { stroke: '#ff4d4f', lineWidth: 3 },
      },
      {
        type: 'area',
        encode: { x: 'date', y: 'revenue' },
        scale: {
          y: {
            key: 'y2',
            independent: true,
            nice: true,
          },
        },
        style: { fill: '#52c41a', fillOpacity: 0.4 },
      },
    ],
    slider: {
      x: {
        values: [0.2, 0.8],
        labelFormatter: (d) => d,
      },
    },
  });

  const finished = chart.render();

  const buttonFilterEarly = document.createElement('button');
  buttonFilterEarly.innerText = 'Filter Early Period';
  container.appendChild(buttonFilterEarly);

  const buttonFilterMiddle = document.createElement('button');
  buttonFilterMiddle.innerText = 'Filter Middle Period';
  container.appendChild(buttonFilterMiddle);

  const buttonFilterLate = document.createElement('button');
  buttonFilterLate.innerText = 'Filter Late Period';
  container.appendChild(buttonFilterLate);

  let resolveEarly, resolveMiddle, resolveLate;
  const filterEarlyComplete = new Promise((r) => (resolveEarly = r));
  const filterMiddleComplete = new Promise((r) => (resolveMiddle = r));
  const filterLateComplete = new Promise((r) => (resolveLate = r));

  buttonFilterEarly.onclick = () => {
    const xRange = ['Day-1', 'Day-20'];
    chart.emit('sliderX:filter', {
      data: { selection: [xRange, undefined] },
    });
    resolveEarly();
  };

  buttonFilterMiddle.onclick = () => {
    const xRange = ['Day-20', 'Day-40'];
    chart.emit('sliderX:filter', {
      data: { selection: [xRange, undefined] },
    });
    resolveMiddle();
  };

  buttonFilterLate.onclick = () => {
    const xRange = ['Day-40', 'Day-60'];
    chart.emit('sliderX:filter', {
      data: { selection: [xRange, undefined] },
    });
    resolveLate();
  };

  return {
    chart,
    buttonFilterEarly,
    buttonFilterMiddle,
    buttonFilterLate,
    finished,
    filterEarlyComplete,
    filterMiddleComplete,
    filterLateComplete,
    data,
  };
}
