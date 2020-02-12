import { Chart } from '../../../../src/index';
import SiblingFilter from '../../../../src/interaction/action/data/sibling-filter';
import Mask from '../../../../src/interaction/action/mask/dim-rect';

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
    .area()
    .position('year*value');
  chart.render();

  // const arr = ['1994', '1995', '1996', '1997'];
  // view1.filter('year', (value) => {
  //   return arr.includes(value);
  // });
  // view1.render(true);
  view2.on('plot:click', ev=> console.log(ev));
  const context = new Context(view2);
  const action = new SiblingFilter(context, {
    dims: ['x']
  });
  action.init();
  it('test sibling view filter x', () => {
    context.event = {
      x: 200,
      y: 300
    };
    action.start();

    context.event = {
      x: 300,
      y: 300
    };
    action.filter();
    expect(interval.elements.length).toBe(4);
    action.end();
    action.reset();
    expect(interval.elements.length).toBe(data.length);
  });

  it('mask and filter', () => {
    const mask = new Mask(context, {dim: 'x'});
    
    context.event = {
      x: 200,
      y: 300
    };
    mask.start();
    // @ts-ignore
    const maskShape = mask.maskShape;
    context.event = {
      x: 300,
      y: 350
    };
    mask.resize();
    mask.end();
    context.event = {
      target: maskShape
    };
    action.filter();
    expect(interval.elements.length).toBe(4);

    context.event = {
      x: 250,
      y: 320
    };
    mask.moveStart(); // 开始移动

    context.event = {
      x: 300,
      y: 320
    };
    mask.move(); // 开始移动
    context.event = {
      target: maskShape
    };
    action.filter();
    expect(interval.elements.length).toBe(4);
    expect(interval.elements[0].getModel().data).toEqual({ year: '1996', value: 7 });
    mask.moveEnd();
    action.reset();
    expect(interval.elements.length).toBe(data.length);
  });
});