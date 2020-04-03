import { Chart } from '../../src';
import { createDiv } from '../util/dom';

describe('#2264', () => {
  const div = createDiv();
  div.style.height = '300px';
  const data = [
    { year: '1991', value: 3 },
    { year: '1992', value: 4 },
    { year: '1993', value: 5 },
  ];
  const chart = new Chart({
    container: div,
    width: 400,
    height: 100,
    autoFit: true,
  });

  chart.data(data);
  chart.interval().position('year*value');

  chart.render();

  it('canvas height === container size', async () => {
    expect(getComputedStyle(chart.canvas.get('el')).height).toBe(getComputedStyle(div.querySelector('div')).height);
  });

  it('g2 div 层级结构', () => {
    expect(chart.canvas.get('el').parentNode).toBe(div.querySelector('div'));
    expect(chart.canvas.get('el').parentNode.parentNode).toBe(div);
  })
});
