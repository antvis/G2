import { Chart } from '../../../src';

const state = {
  selected: {
    fill: 'red',
  },
  active: {
    stroke: '#000000',
    lineWidth: 2,
  },
};

export function chartElementHighlightRegion(context) {
  const { container, canvas } = context;

  const wrapperDiv = document.createElement('div');
  container.appendChild(wrapperDiv);

  const chart = new Chart({
    container: wrapperDiv,
    canvas,
  });

  chart.options({
    type: 'view',
    autoFit: true,
    interaction: {
      elementSelect: {
        state,
        region: true,
        multipleSelectHotkey: 'ShiftLeft',
      },
      elementHighlight: {
        state,
        background: true,
        region: true,
      },
    },
    data: [
      { name: 'London', 月份: 'Jan.', 月均降雨量: 18.9 },
      { name: 'London', 月份: 'Feb.', 月均降雨量: 28.8 },
      { name: 'Berlin', 月份: 'Jan.', 月均降雨量: 12.4 },
      { name: 'Berlin', 月份: 'Feb.', 月均降雨量: 23.2 },
    ],
    children: [
      {
        encode: { x: '月份', y: '月均降雨量', series: 'name' },
        type: 'interval',
        axis: { y: { title: 'Waiting', titleFill: '#5B8FF9' } },
      },
    ],
  });

  const finished = chart.render();

  return { chart, finished };
}
