import { Chart } from '../../../src';
import { DIAMOND } from '../../util/data';
import { createDiv } from '../../util/dom';

describe('facet rect', () => {
  const div = createDiv();

  const chart = new Chart({
    container: div,
    width: 800,
    height: 600,
    padding: 10,
  });

  chart.data(DIAMOND);

  // 使用分面
  chart.facet('rect', {
    fields: ['clarity', 'color'],
    eachView(view, facet) {
      view
        // @ts-ignore
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

  // @ts-ignore
  window.__chart = chart;

  it('rect instance', () => {
    // facet view padding
    // @ts-ignore
    expect(chart.facetInstance.cfg.type).toBe('rect');
    // @ts-ignore
    expect(chart.facetInstance.cfg.padding).toBe(8);
  });

  it('rect facet view', () => {
    // facet views
    expect(chart.views.length).toBe(56);
    // @ts-ignore
    expect(chart.views[0].padding).toBe(8);
    // @ts-ignore
    expect(chart.views[0].region).toEqual({
      start: { x: 0, y: 0 },
      end: { x: 1 / 8, y: 1 / 7 },
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
