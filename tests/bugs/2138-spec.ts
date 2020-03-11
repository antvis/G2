import { Chart } from '../../src';
import { createDiv } from '../util/dom';

describe('#2138', () => {
  it('columnWidthRatio', () => {
    const data = [
      { name: 'A', series: 'type1', measure: 100 },
      { name: 'A', series: 'type2', measure: 200 },
      { name: 'A', series: 'type3', measure: 100 },
    ];

    const chart = new Chart({
      container: createDiv(),
      height: 300,
      width: 400,
    });

    chart.data(data);
    const interval = chart
      .interval({
        theme: {
          columnWidthRatio: 0.7
        }
      })
      .position('name*measure')
      .color('series')
      .adjust([
        {
          type: 'dodge',
          marginRatio: 0.1,
        },
      ]);
    chart.render();

    const elements = interval.elements;
    expect(elements.length).toBe(3);

    const firstElement = elements[0];
    expect(firstElement.getBBox()).not.toContain(NaN);
  });
});
