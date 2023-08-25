import { Chart } from '../../../src';

export function chartRenderBrushEnd(context) {
  const { container, canvas } = context;

  // button
  const button = document.createElement('button');
  button.innerText = 'Render';
  container.appendChild(button);

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
    .axis('x', { style: { labelTransform: 'rotate(90deg)' } })
    .interaction('brushXHighlight', true);

  const X = ['2001-01', '2001-03'];

  chart.on('brush:end', () => console.log('brush:end'));

  const finished = chart.render().then(() => {
    chart.emit('brush:highlight', {
      data: { selection: [X, [-Infinity, Infinity]] },
    });
  });

  let resolve;
  const rerendered = new Promise((r) => (resolve = r));

  button.onclick = () => {
    chart.render().then(resolve);
  };

  return { chart, button, finished, rerendered };
}
