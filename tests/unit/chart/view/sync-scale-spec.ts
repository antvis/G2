import 'jest-extended';
import { Chart } from '../../../../src/index';
import { CITY_SALE_PROFIT } from '../../../util/data';
import { createDiv } from '../../../util/dom';

describe('sync scale', () => {
  const container = createDiv();
  const chart = new Chart({
    container,
    height: 500,
    width: 600,
    padding: 32,
  });
  chart.data(CITY_SALE_PROFIT);

  chart.interval().position('city*sale');
  chart.line().position('city*profit');

  it('no sync', () => {
    chart.render();
    // @ts-ignore
    const { sale, profit } = chart.scales;

    // 未同步，不相同
    expect(sale.min).toBe(0);
    expect(sale.max).toBe(200);
    expect(profit.min).toBe(0);
    expect(profit.max).toBe(120);
  });

  it('sync scale, and update', () => {
    chart.scale({
      sale: {
        sync: true,
      },
      profit: {
        sync: true,
      },
      // 分类的 sync 不会处理
      city: {
        sync: true,
      },
    });

    chart.render();

    // @ts-ignore
    const { sale, profit } = chart.scales;

    // 相等的 min max
    expect(sale.min).toBe(0);
    expect(sale.max).toBe(200);
    expect(profit.min).toBe(0);
    expect(profit.max).toBe(200);
  });
});
