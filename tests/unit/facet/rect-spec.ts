import { Chart, Datum } from '../../../src';
import { DIAMOND } from '../../util/data';
import { createDiv } from '../../util/dom';

describe('facet rect', () => {
  const div = createDiv();

  const chart = new Chart({
    container: div,
    width: 800,
    height: 600,
    padding: 10,
    autoFit: false,
  });

  chart.data(DIAMOND);
  // 过滤掉 vvs1
  chart.filter('clarity', (value: any, datum: Datum) => {
    return value !== 'VVS1';
  });

  // 使用分面
  chart.facet('rect', {
    fields: ['clarity', 'color'],
    eachView(view, facet) {
      view
        .interval()
        .position('cut*price')
        .color('cut');
      view.axis('cut', false);
      view.axis('price', false);
      view.legend('cut', false);
    },
    padding: 8,
  });
  chart.render();

  it('rect instance', () => {
    // facet view padding
    // @ts-ignore
    expect(chart.facetInstance.cfg.type).toBe('rect');
    // @ts-ignore
    expect(chart.facetInstance.cfg.padding).toBe(8);
  });

  it('use filter data', () => {
    // 找不到 VVS1 的数据，过滤掉了
    expect(chart.views[0].getOptions().data.find((v: any) => v.clarity === 'VVS1')).toBe(undefined);
    // facet view padding
    // @ts-ignore
    expect(chart.facetInstance.cfg.type).toBe('rect');
    // @ts-ignore
    expect(chart.facetInstance.cfg.padding).toBe(8);
  });

  it('rect facet view', () => {
    // facet views
    expect(chart.views.length).toBe(49);
    // @ts-ignore
    expect(chart.views[0].padding).toEqual(8);
    // @ts-ignore
    expect(chart.views[0].region).toEqual({
      start: { x: 0, y: 0 },
      end: { x: 1 / 7, y: 1 / 7 },
    });

    expect(chart.views[0].getOptions().axes).toEqual({
      cut: false,
      price: false,
    });

    expect(chart.views[0].getOptions().legends).toEqual({
      cut: false,
    });
  });
});
