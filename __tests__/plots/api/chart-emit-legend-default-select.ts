import { Chart } from '../../../src';

export function chartEmitLegendDefaultSelect(context) {
  const { container, canvas } = context;

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
    .legend({
      color: {
        defaultSelect: ['Sports', 'Strategy', 'Action'],
      },
    })
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

  return { chart, finished };
}
