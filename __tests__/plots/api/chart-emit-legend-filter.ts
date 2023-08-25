import { Chart } from '../../../src';

export function chartEmitLegendFilter(context) {
  const { container, canvas } = context;

  // button
  const button = document.createElement('button');
  button.innerText = 'filter';
  container.appendChild(button);

  const button1 = document.createElement('button');
  button1.innerText = 'end';
  container.appendChild(button1);

  // wrapperDiv
  const wrapperDiv = document.createElement('div');
  container.appendChild(wrapperDiv);

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
    .encode('x', 'genre')
    .encode('y', 'sold')
    .encode('color', 'genre')
    .animate(false);

  const finished = chart.render();

  chart.on('legend:filter', (e) => {
    const { nativeEvent, data } = e;
    if (!nativeEvent) return;
    console.log(data);
  });

  chart.on('legend:reset', (e) => {
    const { nativeEvent } = e;
    if (!nativeEvent) return;
    console.log('end');
  });

  button.onclick = () => {
    chart.emit('legend:filter', {
      data: { channel: 'color', values: ['Sports', 'Strategy'] },
    });
  };

  button1.onclick = () => {
    chart.emit('legend:reset', {});
  };

  return { chart, finished };
}
