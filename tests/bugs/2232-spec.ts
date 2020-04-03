import { Chart } from '../../src';
import { createDiv } from '../util/dom';
import DIAMOND from '../../examples/data/diamond.json';

describe('#2232', () => {
  const div = createDiv();
  div.style.height = '300px';

  const chart = new Chart({
    container: div,
    width: 800,
    height: 600,
    padding: [48, 48, 48, 72],
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

  chart.legend('price', false);

  // 使用分面
  chart.facet('rect', {
    fields: [ 'clarity', 'cut' ],
    columnTitle: {
      style: {
        fontSize: 12,
      }
    },
    eachView(view, f) {
      view.point()
        .position('carat*price')
        .color('cut')
        .shape('circle')
        .style({
          opacity: 0.8
        })
        .size('price');
    },
    padding: 12,
  });

  chart.render();

  const [v0] = chart.views;

  it('facet update, not re-create views', () => {
    // update
    chart.render(true);
    expect(v0).toBe(chart.views[0]);

    // create
    chart.render();
    expect(v0).not.toBe(chart.views[0]);
  });
});
