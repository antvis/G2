import { Chart } from '../../../src';

export function chartSliderViewLevelAdaptive(context) {
  const { container, canvas } = context;

  // wrapperDiv
  const wrapperDiv = document.createElement('div');
  container.appendChild(wrapperDiv);

  const chart = new Chart({
    container: wrapperDiv,
    canvas,
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
        scale: { y: { nice: true } },
        style: { stroke: '#ff4d4f', lineWidth: 3 },
      },
      {
        type: 'area',
        encode: { x: 'date', y: 'revenue' },
        scale: { y: { nice: true } },
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

  const buttonFilter1 = document.createElement('button');
  buttonFilter1.innerText = 'Filter Early Days';
  container.appendChild(buttonFilter1);

  const buttonFilter2 = document.createElement('button');
  buttonFilter2.innerText = 'Filter Late Days';
  container.appendChild(buttonFilter2);

  let resolveFilter1, resolveFilter2;
  const filterComplete1 = new Promise((r) => (resolveFilter1 = r));
  const filterComplete2 = new Promise((r) => (resolveFilter2 = r));

  buttonFilter1.onclick = () => {
    const xRange = ['Day-1', 'Day-20'];
    chart.emit('sliderX:filter', {
      data: { selection: [xRange, undefined] },
    });
    resolveFilter1();
  };

  buttonFilter2.onclick = () => {
    const xRange = ['Day-40', 'Day-60'];
    chart.emit('sliderX:filter', {
      data: { selection: [xRange, undefined] },
    });
    resolveFilter2();
  };

  return {
    chart,
    buttonFilter1,
    buttonFilter2,
    finished,
    filterComplete1,
    filterComplete2,
    data,
  };
}
