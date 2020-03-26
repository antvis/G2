import 'jest-extended';
import { Chart } from '../../../../../src';
import { Point } from '../../../../../src/interface';
import { CITY_SALE_PROFIT } from '../../../../util/data';
import { createDiv, removeDom } from '../../../../util/dom';

describe('sync scale with multi-view', () => {
  const container = createDiv();
  const chart = new Chart({
    container,
    height: 500,
    width: 600,
    padding: 0,
  });

  chart.animate(false);
  chart.scale('sale', {
    nice: true,
  });
  chart.scale('profit', {
    nice: true,
  });

  // 右边
  const v2 = chart.createView({
    region: { start: { x: 0.5, y: 0 }, end: { x: 1, y: 1 } },
    padding: [8, 48, 48, 48],
  });
  // 左边
  const v1 = chart.createView({
    region: { start: { x: 0, y: 0 }, end: { x: 0.5, y: 1 } },
    padding: [8, 16, 48, 48],
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
  v2.data(CITY_SALE_PROFIT.slice(0, 3)); // x 枚举缺失的情况下，scale 同步

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
    expect(chart.scalePool.scales.size).toBe(7);
    // @ts-ignore
    expect(chart.scalePool.syncScales.size).toBe(0);
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
        nice: true,
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
    const syncScales = chart.scalePool.syncScales;
    expect(syncScales.get('city')).toBeDefined();
    expect(syncScales.get('sale')).toBeDefined();
    expect(syncScales.get('value')).toBeDefined();
    expect(syncScales.size).toBe(3);
    expect(syncScales.get('value').length).toBe(2);

    // @ts-ignore
    expect(chart.scalePool.getScaleMeta('view2-sale').scaleDef.sync).toBe(true);

    // @ts-ignore
    expect(chart.scalePool.getScaleMeta('view3-sale').scaleDef.sync).toBe('value');

    // 第一个 view 的图形也应该是渲染之后的大小
    const linePoints = chart.views[0].geometries[1].elements[0].getModel().points as Point[];
    // 找不到一个 y 在上方的情况，因为 scale 同步成功，图形绘制到底部
    expect(linePoints.find((p: Point) => p.y < 340)).toBe(undefined);

    // 分类 scale 在同步之后，进行调整左右 range
    // @ts-ignore
    expect(chart.scalePool.scales.get('view3-city').scale.range).toEqual([0.125, 0.875]);
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
    expect(chart.scalePool.scales.size).toBe(7);
    // @ts-ignore
    expect(chart.scalePool.syncScales.size).toBe(0);
    // @ts-ignore
    expect(chart.scalePool.getScaleMeta('view2-sale').scaleDef.sync).toBe(false);
  });

  afterAll(() => {
    chart.destroy();
    removeDom(container);
  });
});
