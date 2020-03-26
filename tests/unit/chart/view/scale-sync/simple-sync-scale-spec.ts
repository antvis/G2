import 'jest-extended';
import { Chart } from '../../../../../src';
import { CITY_SALE_PROFIT } from '../../../../util/data';
import { createDiv, removeDom } from '../../../../util/dom';

describe('sync scale', () => {
  const container = createDiv();
  const chart = new Chart({
    container,
    height: 500,
    width: 600,
    padding: 32,
  });
  chart.data(CITY_SALE_PROFIT);

  chart
    .interval()
    .position('city*sale')
    .color('category')
    .adjust('stack');
  chart
    .line()
    .position('city*profit')
    .color('category');

  it('no sync', () => {
    chart.render();
    const sale = chart.getScaleByField('sale');
    const profit = chart.getScaleByField('profit');

    // 未同步，不相同
    expect(sale.min).toBe(0);
    expect(sale.max).toBe(310);
    expect(profit.min).toBe(3);
    expect(profit.max).toBe(130);
    // @ts-ignore
    expect(chart.scalePool.scales.size).toBe(4);
    // @ts-ignore
    expect(chart.scalePool.syncScales.size).toBe(0);
  });

  it('sync scale, and update', () => {
    chart.scale({
      sale: {
        sync: 'value',
      },
      profit: {
        sync: 'value',
      },
    });

    chart.render();

    const sale = chart.getScaleByField('sale');
    const profit = chart.getScaleByField('profit');

    // 相等的 min max
    expect(sale.min).toBe(0);
    expect(sale.max).toBe(310);
    expect(profit.min).toBe(0);
    expect(profit.max).toBe(310);
    // @ts-ignore
    expect(chart.scalePool.syncScales.size).toBe(1);
    // @ts-ignore
    expect(chart.scalePool.syncScales.get('value').length).toBe(2);
  });

  it('sync = false', () => {
    chart.scale({
      sale: {
        sync: false,
      },
      profit: {
        sync: false,
      },
    });

    chart.render();

    const sale = chart.getScaleByField('sale');
    const profit = chart.getScaleByField('profit');

    // 未同步，不相同
    expect(sale.min).toBe(0);
    expect(sale.max).toBe(310);
    expect(profit.min).toBe(3);
    expect(profit.max).toBe(130);
    // @ts-ignore
    expect(chart.scalePool.scales.size).toBe(4);
    // @ts-ignore
    expect(chart.scalePool.syncScales.size).toBe(0);
  });

  afterAll(() => {
    chart.destroy();
    removeDom(container);
  });
});
