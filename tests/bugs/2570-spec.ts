import { Chart } from '../../src';
import { createDiv } from '../util/dom';

describe('2570', () => {
  it('2570', () => {
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
      width: 500,
      height: 300,
      appendPadding: [20],
    });

    chart.data(data);
    chart.axis(false);
    chart.line().position('year*value');
    chart.render();

    chart.changeSize(400, 300);
    expect(chart.autoPadding).toEqual([20, 20, 20, 20]);
  });
});
