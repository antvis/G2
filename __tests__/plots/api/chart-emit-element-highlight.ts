import { Chart } from '../../../src';

export function chartEmitElementHighlight(context) {
  const { container, canvas } = context;

  // button
  const button = document.createElement('button');
  button.innerText = 'Highlight';
  container.appendChild(button);

  const button1 = document.createElement('button');
  button1.innerText = 'reset';
  container.appendChild(button1);

  // wrapperDiv
  const wrapperDiv = document.createElement('div');
  container.appendChild(wrapperDiv);

  const chart = new Chart({
    container: wrapperDiv,
    canvas,
  });

  chart.options({
    type: 'interval',
    transform: [
      { type: 'sortX', by: 'y', reverse: true, reducer: 'sum', slice: 6 },
      { type: 'dodgeX' },
    ],
    data: {
      type: 'fetch',
      value: 'data/stateages.csv',
    },
    encode: {
      x: 'state',
      y: 'population',
      color: 'age',
    },
    state: {
      active: { fill: 'red' },
      inactive: { opacity: 0.6 },
    },
    interaction: {
      elementHighlightByX: { delay: 0 },
      tooltip: false,
    },
  });

  const finished = chart.render();

  chart.on('element:highlight', (event) => {
    const { data, nativeEvent } = event;
    if (nativeEvent) console.log('element:highlight', data);
  });

  chart.on('element:unhighlight', (event) => {
    const { nativeEvent } = event;
    if (nativeEvent) console.log('reset');
  });

  button.onclick = () => {
    chart.emit('element:highlight', {
      data: { data: { population: 5038433 } },
    });
  };

  button1.onclick = () => {
    chart.emit('element:unhighlight', {});
  };

  return { chart, finished };
}
