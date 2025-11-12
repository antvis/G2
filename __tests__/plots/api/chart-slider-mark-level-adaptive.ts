import { Chart } from '../../../src';

export function chartSliderMarkLevelAdaptive(context) {
  const { container, canvas } = context;

  // wrapperDiv
  const wrapperDiv = document.createElement('div');
  container.appendChild(wrapperDiv);

  const chart = new Chart({
    container: wrapperDiv,
    canvas,
  });

  const data: any[] = [
    { category: 'A', time: 0, value: 45, type: 'primary' },
    { category: 'A', time: 1, value: 52, type: 'primary' },
    { category: 'A', time: 2, value: 48, type: 'primary' },
    { category: 'A', time: 3, value: 10, type: 'primary' },
    { category: 'A', time: 4, value: 55, type: 'primary' },
    { category: 'A', time: 5, value: 67, type: 'primary' },
    { category: 'A', time: 6, value: 43, type: 'primary' },
    { category: 'A', time: 7, value: 66, type: 'primary' },
    { category: 'A', time: 8, value: 63, type: 'primary' },
    { category: 'A', time: 9, value: 71, type: 'primary' },
    { category: 'A', time: 10, value: 58, type: 'primary' },
    { category: 'A', time: 11, value: 44, type: 'primary' },
    { category: 'A', time: 12, value: 49, type: 'primary' },
    { category: 'A', time: 13, value: 66, type: 'primary' },
    { category: 'A', time: 14, value: 54, type: 'primary' },
    { category: 'B', time: 0, value: 32, type: 'secondary' },
    { category: 'B', time: 1, value: 38, type: 'secondary' },
    { category: 'B', time: 2, value: 29, type: 'secondary' },
    { category: 'B', time: 3, value: 44, type: 'secondary' },
    { category: 'B', time: 4, value: 41, type: 'secondary' },
    { category: 'B', time: 5, value: 20, type: 'secondary' },
    { category: 'B', time: 6, value: 28, type: 'secondary' },
    { category: 'B', time: 7, value: 39, type: 'secondary' },
    { category: 'B', time: 8, value: 35, type: 'secondary' },
    { category: 'B', time: 9, value: 48, type: 'secondary' },
    { category: 'B', time: 10, value: 35, type: 'secondary' },
    { category: 'B', time: 11, value: 42, type: 'secondary' },
    { category: 'B', time: 12, value: 31, type: 'secondary' },
    { category: 'B', time: 13, value: 45, type: 'secondary' },
    { category: 'B', time: 14, value: 37, type: 'secondary' },
    { category: 'C', time: 0, value: 28, type: 'tertiary' },
    { category: 'C', time: 1, value: 31, type: 'tertiary' },
    { category: 'C', time: 2, value: 25, type: 'tertiary' },
    { category: 'C', time: 3, value: 35, type: 'tertiary' },
    { category: 'C', time: 4, value: 185, type: 'tertiary' },
    { category: 'C', time: 5, value: 38, type: 'tertiary' },
    { category: 'C', time: 6, value: 22, type: 'tertiary' },
    { category: 'C', time: 7, value: 29, type: 'tertiary' },
    { category: 'C', time: 8, value: 45, type: 'tertiary' },
    { category: 'C', time: 9, value: 36, type: 'tertiary' },
    { category: 'C', time: 10, value: 31, type: 'tertiary' },
    { category: 'C', time: 11, value: 27, type: 'tertiary' },
    { category: 'C', time: 12, value: 105, type: 'tertiary' },
    { category: 'C', time: 13, value: 33, type: 'tertiary' },
    { category: 'C', time: 14, value: 29, type: 'tertiary' },
  ];

  chart.options({
    type: 'view',
    data,
    children: [
      {
        type: 'interval',
        data: {
          value: data,
          transform: [
            { type: 'filter', callback: (d) => d.type === 'primary' },
          ],
        },
        encode: { x: 'time', y: 'value' },
        style: { fill: '#1890ff', fillOpacity: 0.6 },
        slider: {
          x: {
            values: [0.2, 0.7],
            labelFormatter: (d) => `柱状图: ${Math.round(d)}`,
          },
        },
      },
      {
        type: 'line',
        data: {
          value: data,
          transform: [
            { type: 'filter', callback: (d) => d.type === 'secondary' },
          ],
        },
        encode: { x: 'time', y: 'value' },
        style: { stroke: '#52c41a', lineWidth: 2 },
      },
      {
        type: 'point',
        data: {
          value: data,
          transform: [
            { type: 'filter', callback: (d) => d.type === 'tertiary' },
          ],
        },
        encode: { x: 'time', y: 'value', size: 4 },
        style: { fill: '#ff4d4f', fillOpacity: 0.8 },
      },
    ],
    scale: {
      x: { nice: true },
      y: { nice: true },
    },
  });

  const finished = chart.render();

  const buttonFilterMark = document.createElement('button');
  buttonFilterMark.innerText = 'Filter Mark Specific';
  container.appendChild(buttonFilterMark);

  let resolveFilterMark;
  const filterMarkComplete = new Promise((r) => (resolveFilterMark = r));

  buttonFilterMark.onclick = () => {
    const xRange = [5, 12];
    chart.emit('sliderX:filter', {
      data: { selection: [xRange, undefined] },
    });
    resolveFilterMark();
  };

  return {
    chart,
    buttonFilterMark,
    finished,
    filterMarkComplete,
    data,
  };
}
