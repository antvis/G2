import { Chart } from '../../../src';

export function chartEmitBrushHighlightAxisVertical(context) {
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
    type: 'view',
    coordinate: { type: 'parallel' },
    children: [
      {
        type: 'line',
        data: {
          type: 'fetch',
          value: 'data/cars3.csv',
        },
        encode: {
          position,
          color: 'cylinders',
        },
        style: {
          lineWidth: 1.5,
          strokeOpacity: 0.4,
        },
        scale: {
          color: { palette: 'brBG', offset: (t) => 1 - t },
        },
        state: {
          active: { lineWidth: 5 },
          inactive: { stroke: 'grey', opacity: 0.5 },
        },
        legend: false,
        axis: Object.fromEntries(
          Array.from({ length: position.length }, (_, i) => [
            `position${i === 0 ? '' : i}`,
            {
              zIndex: 1,
              line: true,
              tick: true,
              titlePosition: 'r',
              labelStroke: '#fff',
              labelLineWidth: 5,
              labelFontSize: 10,
              labelStrokeLineJoin: 'round',
              titleStroke: '#fff',
              titleFontSize: 10,
              titleLineWidth: 5,
              titleStrokeLineJoin: 'round',
              titleTransform: 'translate(-10, 0) rotate(-90)',
              lineStroke: 'black',
              tickStroke: 'black',
              lineLineWidth: 1,
            },
          ]),
        ),
      },
    ],
    interaction: {
      brushAxisHighlight: {
        maskFill: 'red',
        maskOpacity: 0.8,
      },
      tooltip: { series: false },
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
      data: { selection: [[20, 30], undefined, [100, 300]] },
    });
  };

  button2.onclick = () => {
    chart.emit('brushAxis:remove', {});
  };

  return { chart, finished };
}
