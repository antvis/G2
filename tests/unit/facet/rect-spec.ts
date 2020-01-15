import { Chart, Datum } from '../../../src';
import DIAMOND from '../../../examples/data/diamond.json';

import { createDiv } from '../../util/dom';

describe('facet rect', () => {
  const div = createDiv();

  const chart = new Chart({
    container: div,
    width: 800,
    height: 600,
    padding: [0, 0, 16, 72],
  });

  chart.data(DIAMOND);

  chart.scale({
    carat: {
      sync: true
    },
    price: {
      sync: true,
      tickCount: 3
    },
    cut: {
      sync: true
    }
  });

  // 使用分面
  chart.facet('rect', {
    fields: [ 'clarity', 'cut' ],
    eachView(view, facet) {
      view.point()
        .position('carat*price')
        .color('cut')
        .shape('circle')
        .style({
          opacity: 0.8
        })
        .size(3);

      view.legend('cut', false);
    },
    padding: 12,
  });
  chart.render();

  it('rect instance', () => {
    // facet view padding
    // @ts-ignore
    expect(chart.facetInstance.cfg.type).toBe('rect');
    // @ts-ignore
    expect(chart.facetInstance.cfg.padding).toBe(12);
  });

  it('use filter data', () => {
    // facet view padding
    // @ts-ignore
    expect(chart.facetInstance.cfg.type).toBe('rect');
    // @ts-ignore
    expect(chart.facetInstance.cfg.padding).toBe(12);
  });

  it('rect facet view', () => {
    // facet views
    expect(chart.views.length).toBe(40);
    // @ts-ignore
    expect(chart.views[0].padding).toEqual(12);
    // @ts-ignore
    expect(chart.views[0].region).toEqual({
      start: { x: 0, y: 0 },
      end: { x: 1 / 8, y: 1 / 5 },
    });

    expect(chart.views[0].getOptions().axes).toEqual({
      carat: {
        label: null,
        title: null,
      },
      price: {
        title: null,
      }
    });

    expect(chart.views[0].getOptions().legends).toEqual({
      cut: false,
    });
  });
});
