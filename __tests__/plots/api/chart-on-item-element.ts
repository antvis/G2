import { Chart } from '../../../src';

export function chartOnItemElement(context) {
  const { container, canvas } = context;

  const chart = new Chart({
    container,
    canvas,
  });

  chart.data([
    { genre: 'Sports', sold: 275 },
    { genre: 'Strategy', sold: 115 },
    { genre: 'Action', sold: 120 },
    { genre: 'Shooter', sold: 350 },
    { genre: 'Other', sold: 150 },
  ]);

  chart
    .interval()
    .encode('x', 'genre')
    .encode('y', 'sold')
    .encode('color', 'genre')
    .axis({ x: { animate: false }, y: { animate: false } })
    .style('draggable', true);

  chart.on('interval:click', log('interval:click'));
  chart.on('element:click', log('element:click'));
  chart.on('interval:dblclick', log('interval:dblclick'));
  chart.on('interval:pointerdown', log('interval:pointerdown'));
  chart.on('interval:pointerup', log('interval:pointerup'));
  chart.on('interval:pointerover', log('interval:pointerover'));
  chart.on('interval:pointerout', log('interval:pointerout'));
  chart.on('interval:rightdown', log('interval:rightdown'));
  chart.on('interval:rightup', log('interval:rightup'));
  chart.on('interval:dragstart', log('interval:dragstart'));
  chart.on('interval:drag', log('interval:drag'));
  chart.on('interval:dragend', log('interval:dragend'));

  const finished = chart.render();

  const { canvas: gCanvas } = chart.getContext();

  gCanvas
    ?.getContextService()!
    .getDomElement()!
    .addEventListener('contextmenu', (e) => {
      e.preventDefault();
    });

  function log(msg) {
    return (e) => {
      console.log(msg, e.data.data);
    };
  }

  return { chart, finished };
}
