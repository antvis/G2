import { Chart } from '../../../src';

export function chartEmitSliderFilter(context) {
  const { container, canvas } = context;

  // button
  const buttonX = document.createElement('button');
  buttonX.innerText = 'FilterX';
  container.appendChild(buttonX);

  const buttonY = document.createElement('button');
  buttonY.innerText = 'FilterY';
  container.appendChild(buttonY);

  // wrapperDiv
  const wrapperDiv = document.createElement('div');
  container.appendChild(wrapperDiv);

  const chart = new Chart({
    container: wrapperDiv,
    canvas,
  });

  chart.options({
    type: 'interval',
    data: [
      { date: '2001-01', value: 100 },
      { date: '2001-02', value: 400 },
      { date: '2001-03', value: 500 },
      { date: '2001-04', value: 600 },
      { date: '2001-05', value: 300 },
      { date: '2001-06', value: 600 },
      { date: '2001-07', value: 300 },
      { date: '2001-08', value: 600 },
      { date: '2001-09', value: 109 },
      { date: '2001-10', value: 100 },
      { date: '2001-11', value: 102 },
      { date: '2001-12', value: 103 },
      { date: '2002-01', value: 102 },
      { date: '2002-02', value: 101 },
      { date: '2002-03', value: 200 },
      { date: '2002-04', value: 500 },
      { date: '2002-05', value: 100 },
      { date: '2002-06', value: 100 },
      { date: '2002-07', value: 102 },
      { date: '2002-08', value: 109 },
    ],
    encode: { x: 'date', y: 'value' },
    axis: { x: { size: 100, labelTransform: 'rotate(90)' } },
    slider: { x: {}, y: { labelFormatter: (d) => +d.toFixed(1) + '' } },
  });

  const finished = chart.render();

  chart.on('sliderX:filter', (event) => {
    const { data, nativeEvent } = event;
    if (nativeEvent) console.log('sliderX:filter', data);
  });

  chart.on('sliderY:filter', (event) => {
    const { data, nativeEvent } = event;
    if (nativeEvent) console.log('sliderY:filter', data);
  });

  let resolveX;
  const filterX = new Promise((r) => (resolveX = r));

  buttonX.onclick = () => {
    const X = ['2001-01', '2001-03'];
    chart.emit('sliderX:filter', {
      data: { selection: [X, undefined] },
    });
    resolveX();
  };

  let resolveY;
  const filterY = new Promise((r) => (resolveY = r));

  buttonY.onclick = () => {
    const Y = [50, 550];
    chart.emit('sliderY:filter', {
      data: { selection: [undefined, Y] },
    });
    resolveY();
  };

  return { chart, buttonX, buttonY, finished, filterX, filterY };
}
