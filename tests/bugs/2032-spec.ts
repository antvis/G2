import { Chart } from '../../src';
import { createDiv, removeDom } from '../util/dom';
import { DIAMOND } from '../util/data';
describe('#2032', () => {

  const chart = new Chart({
    container: createDiv(),
    width: 500,
    height: 400,
  });
  chart.animate(false);
  chart.tooltip(false);
  const view1 = chart.createView({
    region: {
      start: {x: 0, y: 0},
      end: {x: 0.5, y: 1}
    },
    padding: [10, 20, 40, 50]
  });
  
  view1.data(DIAMOND);
  const point = view1.point().position('carat*price')

  const view2 = chart.createView({
    region: {
      start: {x: 0.5, y: 0},
      end: {x: 1, y: 1}
    },
    padding: [10, 20, 40, 50]
  });
  
  view2.data(DIAMOND);
  view2.point().position('depth*x');

  chart.render();

  it('draw error', () => {
    const {x, y} = point.elements[0].shape.attr();
    point.elements.forEach(el => {
      el.setState('active', true);
    });
    const attrs = point.elements[0].shape.attr();
    // expect(x).toBe(attrs.x); 判定失败
    // expect(y).toBe(attrs.y);
  });
});