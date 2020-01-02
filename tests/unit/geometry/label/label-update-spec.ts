import { Chart } from '../.../../../../../src';
import { createDiv } from '../../../util/dom';

describe('Label update', () => {
  const data = [
    { year: '1951 年', sales: 38 },
    { year: '1952 年', sales: 52 },
    { year: '1956 年', sales: 61 },
    { year: '1957 年', sales: 145 },
    { year: '1958 年', sales: 48 },
    { year: '1959 年', sales: 38 },
    { year: '1960 年', sales: 38 },
    { year: '1962 年', sales: 38 },
  ];
  const chart = new Chart({
    container: createDiv(),
    width: 600,
    height: 250,
  });

  chart.data(data);
  chart.scale('sales', {
    tickInterval: 20,
  });

  const interval = chart
    .interval()
    .position('year*sales')
    .label('sales', {
      adjustType: 'limitInShape',
      offset: -10,
    });

  chart.render();

  it('render', () => {
    const labelContainer = interval.labelsContainer;
    expect(labelContainer.getCount()).toBe(8);
  });

  it('changeSize', (done) => {
    chart.changeSize(300, 250);

    setTimeout(() => {
      const labelContainer = interval.labelsContainer;
      expect(labelContainer.getCount()).toBe(7);

      done();
    }, 600);
  });
});
