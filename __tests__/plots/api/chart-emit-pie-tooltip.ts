import { Chart } from '../../../src';

export function chartEmitPieTooltip(context) {
  const { container, canvas } = context;

  // wrapperDiv
  const wrapperDiv = document.createElement('div');
  container.appendChild(wrapperDiv);

  // button
  const button = document.createElement('button');
  button.innerText = 'Hide tooltip';
  container.appendChild(button);

  // p
  const p = document.createElement('p');
  p.innerText = '';
  container.appendChild(p);

  const chart = new Chart({
    container: wrapperDiv,
    canvas,
  });

  chart
    .interval()
    .data([
      { genre: 'Sports', sold: 275 },
      { genre: 'Strategy', sold: 115 },
      { genre: 'Action', sold: 120 },
      { genre: 'Shooter', sold: 350 },
      { genre: 'Other', sold: 150 },
    ])
    .encode('y', 'sold')
    .encode('color', 'genre')
    .transform({ type: 'stackY' })
    .coordinate({ type: 'theta' });

  const finished = chart.render();

  finished.then((chart) =>
    chart.emit('tooltip:show', {
      data: { data: { genre: 'Sports' } },
    }),
  );

  chart.on('tooltip:show', ({ data }) => {
    p.innerText = JSON.stringify(data);
  });

  const hide = () => {
    console.log('hide');
  };
  chart.on('tooltip:hide', hide);

  button.onclick = () => {
    chart.emit('tooltip:hide');
  };

  return {
    chart,
    button,
    finished,
    clear: () => {
      chart.off('tooltip:hide', hide);
    },
  };
}
