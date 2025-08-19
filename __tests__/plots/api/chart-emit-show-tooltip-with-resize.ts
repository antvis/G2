import { Chart } from '../../../src';

export function chartEmitShowTooltipWithResize(context) {
  const { container, canvas } = context;

  // button
  const button = document.createElement('button');
  button.innerText = 'Change Wrapper Container';
  container.appendChild(button);

  const button1 = document.createElement('button');
  button1.innerText = 'Show Tooltip';
  container.appendChild(button1);

  // wrapperDiv
  const wrapperDiv = document.createElement('div');
  wrapperDiv.style.width = '500px';
  wrapperDiv.style.height = '400px';
  container.appendChild(wrapperDiv);

  const chart = new Chart({
    container: wrapperDiv,
    autoFit: true,
    canvas,
  });

  chart.options({
    type: 'view',
    data: [
      { time: '10:10', call: 4, waiting: 2, people: 2, mock: 3 },
      { time: '10:15', call: 2, waiting: 6, people: 3, mock: 4 },
      { time: '10:20', call: 13, waiting: 2, people: 5, mock: 1 },
      { time: '10:25', call: 9, waiting: 9, people: 1, mock: 2 },
      { time: '10:30', call: 5, waiting: 2, people: 3, mock: 5 },
      { time: '10:35', call: 8, waiting: 2, people: 1, mock: 3 },
      { time: '10:40', call: 13, waiting: 1, people: 4, mock: 2 },
    ],
    children: [
      {
        type: 'interval',
        encode: {
          x: 'time',
          y: 'waiting',
          color: () => 'waiting',
          series: () => 'waiting',
        },
        scale: { y: { nice: true } },
        axis: { y: { title: null } },
      },
      {
        type: 'interval',
        encode: {
          x: 'time',
          y: 'people',
          color: () => 'people',
          series: () => 'people',
        },
        scale: { y: { key: '2' } },
        axis: { y: { position: 'right', grid: null, title: null } },
      },
      {
        type: 'line',
        encode: { x: 'time', y: 'call', color: () => 'call' },
        scale: { series: { independent: true } },
      },
      {
        type: 'line',
        encode: { x: 'time', y: 'mock', color: () => 'mock' },
        scale: { y: { key: '2' }, series: { independent: true } },
      },
    ],
  });

  const finished = chart.render();

  let resolve;
  const fitted = new Promise((r) => (resolve = r));

  button.onclick = () => {
    wrapperDiv.style.width = '800px';
    wrapperDiv.style.height = '400px';
    chart.forceFit().then(resolve);
  };

  button1.onclick = () => {
    chart.emit('tooltip:show', {
      data: {
        data: { time: '10:40', call: 13, waiting: 1, people: 4, mock: 2 },
      },
      offsetY: 100,
    });
  };

  finished.then((chart) => {
    chart.emit('legend:filter', {
      data: { channel: 'color', values: ['people'] },
    });
  });

  return {
    chart,
    finished,
    button,
    fitted,
  };
}
