import { Chart } from '../../../src';

export function chartEmitBrushHighlightAxisHorizontal(context) {
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

  const position = [
    'economy (mpg)',
    'cylinders',
    'displacement (cc)',
    'power (hp)',
    'weight (lb)',
    '0-60 mph (s)',
    'year',
  ];

  chart.options({
    type: 'line',
    height: 800,
    data: {
      type: 'fetch',
      value: 'data/cars3.csv',
    },
    interaction: {
      tooltip: { series: false },
      brushAxisHighlight: {
        maskFill: 'red',
        maskOpacity: 0.8,
      },
    },
    coordinate: { type: 'parallel', transform: [{ type: 'transpose' }] },
    encode: {
      position,
      color: 'cylinders',
    },
    style: {
      lineWidth: 1.5,
      strokeOpacity: 0.4,
    },
    layout: { padding: 5 },
    scale: {
      color: {
        palette: 'brBG',
        offset: (t) => 1 - t,
      },
    },
    legend: {
      color: {
        position: 'top',
        layout: { justifyContent: 'center' },
        size: 50,
        length: 300,
        labelSpacing: 0,
      },
    },
    state: {
      active: { lineWidth: 5 },
      inactive: { stroke: 'grey', opacity: 0.5 },
    },
    axis: Object.fromEntries(
      Array.from({ length: position.length }, (_, i) => [
        `position${i === 0 ? '' : i}`,
        {
          zIndex: 1,
          line: true,
          tick: true,
          labelFontSize: 10,
          labelStroke: '#fff',
          labelStrokeLineJoin: 'round',
          labelLineWidth: 5,
          lineStroke: 'black',
          lineStrokeOpacity: 1,
          lineLineWidth: 1,
          tickStroke: 'black',
          titleFontSize: 10,
          titleStroke: '#fff',
          titleStrokeLineJoin: 'round',
          titleLineWidth: 5,
        },
      ]),
    ),
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
      data: { selection: [[20, 30], undefined, [100, 300]] },
    });
  };

  button2.onclick = () => {
    chart.emit('brushAxis:remove', {});
  };

  return { chart, finished };
}
