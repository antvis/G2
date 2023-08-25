import { Chart } from '../../../src';

export function chartEmitBrushHighlightAxisCross(context) {
  const { container, canvas } = context;

  // button
  const button1 = document.createElement('button');
  button1.innerText = 'Highlight';
  container.appendChild(button1);

  const button2 = document.createElement('button');
  button2.innerText = 'Reset';
  container.appendChild(button2);

  // wrapperDiv
  const wrapperDiv = document.createElement('div');
  container.appendChild(wrapperDiv);

  const chart = new Chart({
    container: wrapperDiv,
    canvas,
  });

  chart.options({
    type: 'point',
    data: {
      type: 'fetch',
      value: 'data/penguins.csv',
    },
    encode: {
      color: 'species',
      x: 'culmen_length_mm',
      y: 'culmen_depth_mm',
    },
    state: { inactive: { stroke: 'gray', opacity: 0.5 } },
    interaction: {
      brushAxisHighlight: true,
    },
  });

  const finished = chart.render();

  chart.on('brushAxis:highlight', (event) => {
    const { data, nativeEvent } = event;
    if (nativeEvent) console.log('brushAxis:highlight', data);
  });

  chart.on('brushAxis:remove', (event) => {
    const { data, nativeEvent } = event;
    if (nativeEvent) console.log('brushAxis:remove', data);
  });

  button1.onclick = () => {
    chart.emit('brushAxis:highlight', {
      data: {
        selection: [
          [40, 50],
          [14, 18],
        ],
      },
    });
  };

  button2.onclick = () => {
    chart.emit('brushAxis:remove', {});
  };

  return { chart, finished };
}
