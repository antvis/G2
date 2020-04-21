import { Chart } from '../../src';
import { createDiv } from '../util/dom';

describe('#2197', () => {
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
  });

  chart.data(data);
  chart.interval().position('year*value');

  chart.render();

  it('forceFit api', async () => {
    expect(chart.height).toBe(100);

    div.style.height = '400px';

    chart.forceFit();

    expect(chart.height).toBe(400);
  });
});
