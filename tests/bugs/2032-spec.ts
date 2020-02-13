import { Chart } from '../../src';
import { createDiv, removeDom } from '../util/dom';
describe('#2032', () => {
  const data = [
    {
      name: 14513,
      carat: 1.35,
      cut: 'Ideal',
      color: 'J',
      clarity: 'VS2',
      depth: 61.4,
      table: 57,
      price: 5862,
      x: 7.1,
      y: 7.13,
      z: 4.37,
    },
    {
      name: 28685,
      carat: 0.3,
      cut: 'Good',
      color: 'G',
      clarity: 'VVS1',
      depth: 64,
      table: 57,
      price: 678,
      x: 4.23,
      y: 4.27,
      z: 2.72,
    },
    {
      name: 50368,
      carat: 0.75,
      cut: 'Ideal',
      color: 'F',
      clarity: 'SI2',
      depth: 59.2,
      table: 60,
      price: 2248,
      x: 5.87,
      y: 5.92,
      z: 3.49,
    },
  ];
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

  view1.data(data);
  const point = view1.point().position('carat*price');

  const view2 = chart.createView({
    region: {
      start: {x: 0.5, y: 0},
      end: {x: 1, y: 1}
    },
    padding: [10, 20, 40, 50]
  });

  view2.data(data);
  view2.point().position('depth*x');

  chart.render();

  it('draw error', () => {
    point.elements.forEach(el => {
      el.setState('active', true);
    });
    expect(point.elements[0].shape.attr('x')).toBe(230);
  });

  afterAll(() => {
    chart.destroy();
  });
});
