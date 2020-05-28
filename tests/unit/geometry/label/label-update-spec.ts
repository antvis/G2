import { Chart } from '../.../../../../../src';
// import { delay } from '../../../util/delay';
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
  chart.animate(false);
  chart.data(data);
  chart.scale('sales', {
    tickInterval: 20,
  });

  const interval = chart
    .interval()
    .position('year*sales')
    .color('year')
    .label('sales', {
      layout: [ {
        type: 'limit-in-shape',
      }],
      offset: -10,
    });

  chart.render();

  it('render', () => {
    const labelContainer = interval.labelsContainer;
    expect(labelContainer.getCount()).toBe(8);
  });

  it('changeSize', async () => {
    chart.changeSize(300, 250);

    //await delay(600);

    const labelContainer = interval.labelsContainer;
    expect(labelContainer.getCount()).toBe(7);
  });
});
