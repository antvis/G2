import { Chart } from '../../../src';

export function chartEmitClickTooltip(context) {
  const { container, canvas } = context;

  const chart = new Chart({
    container: container,
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
    .interaction('tooltip', { disableNative: true });

  const finished = chart.render();

  chart.on('element:click', ({ data }) => {
    chart.emit('tooltip:show', { data });
  });

  chart.on('plot:click', () => {
    chart.emit('tooltip:hide');
  });

  return {
    chart,
    finished,
  };
}
