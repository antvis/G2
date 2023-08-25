import { Chart } from '../../../src';

export function chartEmitScrollbarFilter(context) {
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
    width: 400,
    canvas,
    clip: true,
  });

  chart
    .interval()
    .data([
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
    ])
    .encode('x', 'date')
    .encode('y', 'value')
    .axis('x', { size: 80, labelTransform: 'rotate(90deg)' })
    .scrollbar('x', { ratio: 0.25 })
    .scrollbar('y', { ratio: 0.75 });

  const finished = chart.render();

  chart.on('scrollbarX:filter', (event) => {
    const { data, nativeEvent } = event;
    if (nativeEvent) console.log('scrollbarX:filter', data);
  });

  chart.on('scrollbarY:filter', (event) => {
    const { data, nativeEvent } = event;
    if (nativeEvent) console.log('scrollbarY:filter', data);
  });

  buttonX.onclick = () => {
    chart.emit('scrollbarX:filter', {
      data: { selection: [['2001-03'], undefined] },
    });
  };

  buttonY.onclick = () => {
    chart.emit('scrollbarY:filter', {
      data: { selection: [undefined, [50]] },
    });
  };

  return { chart, finished };
}
