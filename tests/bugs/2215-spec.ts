import { Chart } from '../../src';
import { createDiv } from '../util/dom';

describe('#2215', () => {
  const data = [
    { year: '1991', value: 3 },
    { year: '1992', value: 4 },
  ];
  const chart = new Chart({
    container: createDiv(),
    width: 400,
    height: 10,
  });

  chart.data(data);
  chart.point().position('year*value');

  chart.render();

  it('chart size can < 100', () => {
    expect(chart.height).toBe(10);
  });
});
