import { Chart } from '../../src';
import { createDiv } from '../util/dom';

describe('#2195', () => {
  it('autoFit should eql container', () => {
    const div = createDiv();
    div.style.height = '400px';

    const data = [
      { year: '1991', value: 3 },
      { year: '1992', value: 4 },
    ];
    const chart = new Chart({
      container: div,
      autoFit: true,
      height: 200,
    });

    chart.data(data);
    chart.point().position('year*value');

    chart.render();
    expect(chart.height).toBe(400);
  });

  it('chart size should ignore padding', () => {
    const div = createDiv();
    div.style.height = '400px';
    div.style.padding = '50px';

    const data = [
      { year: '1991', value: 3 },
      { year: '1992', value: 4 },
    ];
    const chart = new Chart({
      container: div,
      autoFit: true,
      height: 100,
    });

    chart.data(data);
    chart.point().position('year*value');

    chart.render();
    expect(chart.height).toBe(400);
  });
});
