import { Chart } from '../../../../src/index';
import SiblingFilter from '../../../../src/interaction/action/data/sibling-filter';

import Context from '../../../../src/interaction/context';
import { createDiv } from '../../../util/dom';

const data = [
  { x: 0.7, y: 0.3 },
  { x: 0.5, y: 0.5 },
  { x: 0.7, y: 0.7 },
  { x: 1, y: 1 },
];

const data2 = [
  { x: 0.3, y: 0.7 },
  { x: 0.5, y: 0.3 },
  { x: 0.7, y: 0.5 },
  { x: 1, y: 0.4 },
];

describe('action sibling-filter test', () => {
  const chart = new Chart({
    container: createDiv(),
    width: 1000,
    height: 1000,
    autoFit: false,
  });


  chart.animate(false);
  chart.tooltip(false);

  const view1 = chart.createView({
    region: {
      start: { x: 0, y: 0 },
      end: { x: 1, y: 0.5 },
    },
    padding: [20, 20, 40, 80],
  });
  view1.data(data);
  const interval = view1.interval().position('x*y');

  const view2 = chart.createView({
    region: {
      start: { x: 0, y: 0.5 },
      end: { x: 1, y: 1 },
    },
    padding: [20, 20, 40, 80],
  });
  view2.data(data2);
  view2.area().position('x*y');
  chart.render();

  const context = new Context(view2);
  const action = new SiblingFilter(context, {
    dims: ['x'],
  });
  action.init();
  it('test sibling view filter x', () => {
    context.event = {
      x: 0,
      y: 0,
    };
    action.start();

    context.event = {
      x: 700,
      y: 400,
    };
    action.filter();
    expect(interval.elements.length).toBe(3);

    context.event = {
      x: 500,
      y: 400,
    };
    action.filter();
    expect(interval.elements.length).toBe(1);

    action.end();
    action.reset();
    expect(interval.elements.length).toBe(data.length);
  });

  const actionY = new SiblingFilter(context, {
    dims: ['y'],
  });
  actionY.init();
  it('test sibling view filter y', () => {
    context.event = {
      x: 0,
      y: 0,
    };
    action.start();

    context.event = {
      x: 700,
      y: 400,
    };
    action.filter();
    expect(interval.elements.length).toBe(3);

    context.event = {
      x: 500,
      y: 400,
    };
    action.filter();
    expect(interval.elements.length).toBe(1);

    action.end();
    action.reset();
    expect(interval.elements.length).toBe(data.length);
  });
});
