import { Chart } from '../../../../src/index';
import RangeHighlight from '../../../../src/interaction/action/element/range-highlight';
import Mask from '../../../../src/interaction/action/mask/rect';

import Context from '../../../../src/interaction/context';
import { createDiv } from '../../../util/dom';


describe('active test', () => {
  const chart = new Chart({
    container: createDiv(),
    width: 400,
    height: 400,
    autoFit: false,
  });
  const data = [
    { year: '1991', value: 13 },
    { year: '1992', value: 34 },
    { year: '1993', value: 5 },
    { year: '1994', value: 34 },
    { year: '1995', value: 20 },
    { year: '1996', value: 7 },
    { year: '1997', value: 23 },
    { year: '1998', value: 90 },
    { year: '1999', value: 3 },
  ];

  chart.animate(false);
  chart.tooltip(false);

  const view1 = chart.createView({
    region: {
      start: {x: 0, y: 0},
      end: {x: 1, y: 0.5},
    },
    padding: [20, 20, 40, 80]
  });
  view1.data(data);
  view1.scale('year', {
    range: [0.2,0.8]
  });
  const interval = view1
    .interval()
    .position('year*value');

  const view2 = chart.createView({
    region: {
      start: {x: 0, y: 0.5},
      end: {x: 1, y: 1},
    },
    padding: [20, 20, 40, 80]
  });
  view2.data(data);
  view2
    .point()
    .position('year*value');
  chart.render();
  
  const context = new Context(view2);
  let action = new RangeHighlight(context, {
    effectSiblings: true
  });
  action.init();
  const mask = new Mask(context);
  let maskShape;
  it('effect by mask', () => {
    context.event = {
      x: 200,
      y: 200
    };
    mask.start();
    // @ts-ignore
    maskShape = mask.maskShape;

    context.event = {
      x: 205,
      y: 205
    };
    mask.resize();
    context.event = {
      target: maskShape
    };
    action.highlight();
    expect(interval.getElementsBy(el => {
      return el.hasState('active');
    }).length).toBe(0);

    context.event = {
      x: 250,
      y: 250
    };
    mask.resize();
    context.event = {
      target: maskShape
    };
    action.highlight();
    expect(interval.getElementsBy(el => {
      return el.hasState('active');
    }).length).toBe(0);

    context.event = {
      x: 300,
      y: 400
    };
    mask.resize();
    context.event = {
      target: maskShape
    };
    action.highlight();
    expect(interval.getElementsBy(el => {
      return el.hasState('active');
    }).length).toBe(5);
    mask.end();
    mask.hide();
    action.clear();
    expect(interval.getElementsBy(el => {
      return el.hasState('active');
    }).length).toBe(0);

  });

  it('effect by record', () => {
    action = new RangeHighlight(context, {
      effectSiblings: true,
      effectByRecord: true
    });
    action.init();

    context.event = {
      x: 200,
      y: 200
    };
    mask.start();
    mask.show();

    context.event = {
      x: 300,
      y: 400
    };
    mask.resize();
    context.event = {
      target: maskShape
    };
    action.highlight();
    expect(interval.getElementsBy(el => {
      return el.hasState('active');
    }).length).toBe(4);
    mask.end();
    mask.hide();
    action.clear();
    expect(interval.getElementsBy(el => {
      return el.hasState('active');
    }).length).toBe(0);
  });
});