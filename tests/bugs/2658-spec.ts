import { Chart } from '../../src';
import { createDiv } from '../util/dom';

describe('#2658', () => {
  it('2658', () => {
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
      autoFit: true,
      height: 500,
      padding: 'auto',
    });

    chart.data(data);

    chart.line().position('year*value').label('value');
    chart.point().position('year*value');

    chart.render();
    // re-render
    chart.changeData(data.slice(0, 5));

    const [top, right, bottom, left] = chart.autoPadding.getPadding();

    expect(chart.padding).toBe('auto');
    expect(left > 10).toBe(true);
  });
});
