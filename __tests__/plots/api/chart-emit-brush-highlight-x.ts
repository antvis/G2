import { Chart } from '../../../src';

export function chartEmitBrushHighlightX(context) {
  const { container, canvas } = context;

  // button
  const button = document.createElement('button');
  button.innerText = 'Highlight';
  container.appendChild(button);

  const button1 = document.createElement('button');
  button1.innerText = 'Remove';
  container.appendChild(button1);

  // wrapperDiv
  const wrapperDiv = document.createElement('div');
  container.appendChild(wrapperDiv);

  const chart = new Chart({
    container: wrapperDiv,
    width: 1000,
    canvas,
  });

  chart.data([
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
  ]);

  chart
    .interval()
    .encode('x', 'date')
    .encode('y', 'value')
    .axis('x', { labelTransform: 'rotate(90deg)' })
    .interaction('brushXHighlight', true);

  const finished = chart.render();

  let resolve;
  const highlighted = new Promise((r) => (resolve = r));

  chart.on('brush:remove', ({ nativeEvent } = {}) => {
    if (!nativeEvent) return;
    console.log('remove');
  });

  button.onclick = () => {
    const X = ['2001-01', '2001-03'];
    chart.emit('brush:highlight', {
      data: { selection: [X, [-Infinity, Infinity]] },
    });
    resolve();
  };

  let resolve1;
  const removed = new Promise((r) => (resolve1 = r));
  button1.onclick = () => {
    chart.emit('brush:remove');
    resolve1();
  };

  return { chart, button, finished, highlighted, button1, removed };
}
