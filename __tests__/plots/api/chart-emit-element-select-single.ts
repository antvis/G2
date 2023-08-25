import { Chart } from '../../../src';

export function chartEmitElementSelectSingle(context) {
  const { container, canvas } = context;

  // button
  const button = document.createElement('button');
  button.innerText = 'Select';
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
      selected: { fill: 'red' },
      unselected: { opacity: 0.6 },
    },
    interaction: {
      elementSelectByX: { delay: 0, single: true },
      tooltip: false,
    },
  });

  const finished = chart.render();

  chart.on('element:select', (event) => {
    const { data, nativeEvent } = event;
    if (nativeEvent) console.log('element:select', data);
  });

  chart.on('element:unselect', (event) => {
    const { nativeEvent } = event;
    if (nativeEvent) console.log('reset');
  });

  button.onclick = () => {
    chart.emit('element:select', {
      data: { data: [{ population: 5038433 }, { population: 3983091 }] },
    });
  };

  button1.onclick = () => {
    chart.emit('element:unselect', {});
  };

  return { chart, finished };
}
