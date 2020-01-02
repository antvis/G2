import 'jest-extended';
import { Chart } from '../../../../../src';
import { CITY_SALE_PROFIT } from '../../../../util/data';
import { createDiv } from '../../../../util/dom';

describe('sync scale with multi-view', () => {
  const container = createDiv();
  const chart = new Chart({
    container,
    height: 500,
    width: 600,
    padding: 32,
  });

  const v1 = chart.createView({
    region: { start: { x: 0, y: 0 }, end: { x: 0.5, y: 1 } },
  });
  const v2 = chart.createView({
    region: { start: { x: 0.5, y: 0 }, end: { x: 1, y: 1 } },
  });

  v1.interval()
    .position('city*sale')
    .color('category')
    .adjust('stack');

  v2.point()
    .position('city*sale')
    .color('category');

  v2.line()
    .position('city*profit')
    .color('category');

  v1.data(CITY_SALE_PROFIT);
  v2.data(CITY_SALE_PROFIT.slice(0, 4));

  it('no sync', () => {
    chart.render();

    const v1Sale = v1.getScaleByField('sale');
    const v2Sale = v2.getScaleByField('sale');
    const v2Profit = v2.getScaleByField('profit');

    // 未同步，不相同
    // stack
    expect(v1Sale.min).toBe(0);
    expect(v1Sale.max).toBe(320);
    // no stack
    expect(v2Sale.min).toBe(30);
    expect(v2Sale.max).toBe(110);
    // no stack profit
    expect(v2Profit.min).toBe(0);
    expect(v2Profit.max).toBe(80);
    // @ts-ignore
    expect(Object.keys(chart.scalePool.scales).length).toBe(7);
    // @ts-ignore
    expect(Object.keys(chart.scalePool.syncScales).length).toBe(0);
  });

  it('sync scale, and update', () => {
    v1.scale({
      sale: {
        sync: 'value',
      },
    });
    v2.scale({
      profit: {
        sync: 'value',
      },
    });

    chart.scale({
      city: {
        sync: true,
      },
      sale: {
        sync: true,
      },
    });

    chart.render();

    // v1sale 和 v2profit 同步
    // v1city, v2city 同步
    // v2sale 和自己同步
    const v1Sale = v1.getScaleByField('sale');
    const v1City = v1.getScaleByField('city');
    const v2Sale = v2.getScaleByField('sale');
    const v2Profit = v2.getScaleByField('profit');
    const v2City = v2.getScaleByField('city');

    // v1sale 和 v2profit 同步
    expect(v1Sale.min).toBe(v2Profit.min);
    expect(v1Sale.max).toBe(v2Profit.max);

    // v1city, v2city 同步
    expect(v1City.values).toEqual(v2City.values);

    // v1sale 和 v2sale 不同步
    expect(v1Sale.max).not.toBe(v2Sale.max);
    // @ts-ignore
    expect(Object.keys(chart.scalePool.syncScales)).toStrictEqual(['city', 'value', 'sale']);
    // @ts-ignore
    expect(chart.scalePool.syncScales.value.length).toBe(2);

    // @ts-ignore
    expect(chart.scalePool.getScaleMeta('view2-sale').scaleDef.sync).toBe('value');
    // @ts-ignore
    expect(chart.scalePool.getScaleMeta('view3-sale').scaleDef.sync).toBe(true);
  });

  it('sync = false', () => {
    v1.scale({
      sale: {
        sync: null,
      },
      city: {
        sync: false,
      },
    });
    v2.scale({
      profit: {
        sync: false,
      },
      sale: {
        sync: false,
      },
      city: {
        sync: undefined,
      },
    });

    chart.render();

    const v1Sale = v1.getScaleByField('sale');
    const v2Sale = v2.getScaleByField('sale');
    const v2Profit = v2.getScaleByField('profit');

    expect(v1Sale.max).not.toBe(v2Sale.max);
    expect(v1Sale.max).not.toBe(v2Profit.max);
    expect(v2Sale.max).not.toBe(v2Profit.max);
    // @ts-ignore
    expect(Object.keys(chart.scalePool.scales).length).toBe(7);
    // @ts-ignore
    expect(Object.keys(chart.scalePool.syncScales).length).toBe(0);
    // @ts-ignore
    expect(chart.scalePool.getScaleMeta('view3-sale').scaleDef.sync).toBe(false);
  });
});
