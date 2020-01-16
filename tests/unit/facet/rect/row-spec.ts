import { Chart } from '../../../../src';
import DIAMOND from '../../../../examples/data/diamond.json';

import { createDiv } from '../../../util/dom';

describe('facet rect', () => {
  const div = createDiv();

  const chart = new Chart({
    container: div,
    width: 800,
    height: 600,
    padding: [16, 48, 16, 72],
  });

  chart.data(DIAMOND);

  chart.scale({
    carat: {
      sync: true,
    },
    price: {
      sync: true,
      tickCount: 3,
    },
    cut: {
      sync: true,
    }
  });

  // 使用分面
  chart.facet('rect', {
    fields: [ '', 'clarity' ],
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

  it('rect row', () => {
    // facet views
    expect(chart.views.length).toBe(8);
    // @ts-ignore
    expect(chart.views[0].padding).toEqual(12);
    // @ts-ignore
    expect(chart.views[3].region).toEqual({
      start: { x: 0, y: 3 / 8 },
      end: { x: 1, y: 4 / 8 },
    });
  });
});
