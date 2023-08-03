import { Chart } from '../../../src';

export function chartOnTextClick(context) {
  const { container, canvas } = context;

  const chart = new Chart({ container, canvas });

  chart.text().style({
    x: 290, // 像素坐标
    y: 200, // 像素坐标
    text: 'hello',
    textAlign: 'center',
    fontSize: 60,
    textBaseline: 'middle',
  });

  chart.on('element:click', () => console.log('click element'));

  chart.on('text:click', () => console.log('click text'));

  const finished = chart.render();

  return { chart, finished };
}
