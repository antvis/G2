import { Chart } from '../../../src';

export function chartEmitShowTooltipWithNull(context) {
  const { container, canvas } = context;

  // wrapperDiv
  const wrapperDiv = document.createElement('div');
  container.appendChild(wrapperDiv);

  // text
  const p = document.createElement('p');
  p.innerText = '';
  container.appendChild(p);

  const chart = new Chart({
    container: wrapperDiv,
    canvas,
  });

  chart.options({
    type: 'interval',
    data: [
      { name: 'London', 月份: 'Jan.', 月均降雨量: null },
      { name: 'London', 月份: 'Feb.', 月均降雨量: null },
      { name: 'London', 月份: 'Mar.', 月均降雨量: 39.3 },
      { name: 'London', 月份: 'Apr.', 月均降雨量: 81.4 },
      { name: 'London', 月份: 'May', 月均降雨量: 47 },
      { name: 'London', 月份: 'Jun.', 月均降雨量: 20.3 },
      { name: 'London', 月份: 'Jul.', 月均降雨量: 24 },
      { name: 'London', 月份: 'Aug.', 月均降雨量: 35.6 },
      { name: 'Berlin', 月份: 'Jan.', 月均降雨量: null },
      { name: 'Berlin', 月份: 'Feb.', 月均降雨量: 23.2 },
      { name: 'Berlin', 月份: 'Mar.', 月均降雨量: 34.5 },
      { name: 'Berlin', 月份: 'Apr.', 月均降雨量: 99.7 },
      { name: 'Berlin', 月份: 'May', 月均降雨量: 52.6 },
      { name: 'Berlin', 月份: 'Jun.', 月均降雨量: 35.5 },
      { name: 'Berlin', 月份: 'Jul.', 月均降雨量: 37.4 },
      { name: 'Berlin', 月份: 'Aug.', 月均降雨量: 42.4 },
    ],
    encode: {
      x: '月份',
      y: '月均降雨量',
      color: 'name',
    },
    transform: [{ type: 'dodgeX' }],
    interaction: {
      tooltip: {
        shared: true,
      },
      elementHighlight: {
        background: true,
      },
    },
  });

  const finished = chart.render();

  finished.then((chart) => {
    chart.emit('tooltip:show', {
      data: {
        data: { name: 'London', 月份: 'Jan.', 月均降雨量: null },
      },
    });
  });

  chart.on('tooltip:show', ({ data }) => {
    p.innerText = JSON.stringify(data);
  });

  return { chart, finished };
}
