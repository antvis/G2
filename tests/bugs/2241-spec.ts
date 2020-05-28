import { Chart } from '../../src/';
import { createDiv } from '../util/dom';

describe('#2241', () => {
  it('tooltip update', () => {
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
    chart.animate(false);
    chart.line().position('year*value').label('value');
    chart.point().position('year*value');
    chart.render();

    const point = chart.getXY({ year: '1992', value: 6 });
    chart.showTooltip(point);
    chart.changeSize(200, 300);


    const tooltip = chart.getController('tooltip');
    // @ts-ignore
    expect(tooltip.title).toBe('1995');
  });
});
