import { Chart } from '../../../../src';
import { createDiv, removeDom } from '../../../util/dom';
import { salesBySubCategory } from '../../../data/sales';

describe('Scrollbar', () => {
  const container = createDiv();

  it('scrollbar /w interval', () => {
    const chart = new Chart({
      container,
      height: 400,
      width: 500,
    });
    chart.data(salesBySubCategory);
    chart.option('scrollbar', true);
    chart.scale('sales', {
      nice: true,
      formatter: (v) => `${Math.floor(v / 10000)}万`,
    });
    chart.interval().position('subCategory*sales').label('sales');

    chart.render();
    // @ts-ignore
    window.__chart__ = chart;
  });

  afterAll(() => {
    // removeDom(container);
  });
});
