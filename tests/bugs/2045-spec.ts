import { Chart } from '../../src';
import { createDiv } from '../util/dom';

describe('#2045', () => {
  it('area update', () => {
    const data = [
      { year: '1991', value: 15468 },
      { year: '1992', value: 16100 },
      { year: '1993', value: 15900 },
      { year: '1994', value: 17409 },
      { year: '1995', value: 17000 },
      { year: '1996', value: 31056 },
      { year: '1997', value: 31982 },
      { year: '1998', value: 32040 },
      { year: '1999', value: 33233 },
    ];
    const chart = new Chart({
      container: createDiv(),
      width: 400,
      height: 300,
    });

    chart.data(data);
    chart.scale({
      value: {
        min: 10000,
        nice: true,
      },
      year: {
        range: [0, 1],
      },
    });
    chart.tooltip({
      showCrosshairs: true,
      shared: true,
    });

    chart.axis('value', {
      label: {
        formatter: (val) => {
          return (+val / 10000).toFixed(1) + 'k';
        },
      },
    });

    const area = chart.area().position('year*value');

    chart.render();
    chart.changeSize(300, 300)

    expect(area.elements[0].getModel().mappingData[1].x).toBeCloseTo(74.55248641967773);
  });

});
