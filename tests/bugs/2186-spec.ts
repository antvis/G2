import { Chart } from '../../src';
import { createDiv } from '../util/dom';

describe('#2186', () => {
  const data = [
    { year: '1991', value: 3 },
    { year: '1992', value: 4 },
    { year: '1993', value: 3.5 },
    { year: '1994', value: 5 },
    { year: '1995', value: 4.9 },
    { year: '1996', value: 6 },
    { year: '1997', value: 7 },
    { year: '1998', value: 9 },
    { year: '1999', value: 13 },
  ];
  const chart = new Chart({
    container: createDiv(),
    width: 400,
    height: 300,
  });

  chart.data(data);
  chart.scale('value', {
    nice: true,
  });
  const line = chart.point().position('year*value');

  chart.render();

  it('changeData', () => {
    data.push({ year: '2000', value: 13 });
    chart.changeData(data);

    expect(line.elements.length).toBe(10);
  });

  it('chart.render(true)', () => {
    data.push({ year: '2001', value: 13 });

    chart.data(data);
    chart.render(true);
    expect(line.elements.length).toBe(11);
  });
});
