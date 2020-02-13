import { Chart } from '../../../../src/index';
import SiblingFilter from '../../../../src/interaction/action/element/sibling-filter';
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
  let action = new SiblingFilter(context);
  const mask = new Mask(context);
  function getVisibleElements(elements) {
    return elements.filter(el =>  el.visible);
  }
  it('show mask', () => {
    context.event = {
      x: 200,
      y: 200
    };
    mask.start();
    // @ts-ignore
    const maskShape = mask.maskShape;

    // 过滤非常小时
    context.event = {
      x: 209,
      y: 209
    };
    mask.resize();
    context.event = {
      target: maskShape
    };
    action.filter();
    expect(getVisibleElements(interval.elements).length).toBe(data.length);

    context.event = {
      x: 300,
      y: 400
    };
    mask.resize();

    context.event = {
      target: maskShape
    };
    action.filter();
    expect(getVisibleElements(interval.elements).length).toBe(4);
    expect(interval.elements[0].visible).toBe(false);

    // 未框选中元素
    context.event = {
      x: 300,
      y: 300
    };
    mask.resize();

    context.event = {
      target: maskShape
    };
    action.filter();
    expect(getVisibleElements(interval.elements).length).toBe(0);

    mask.end();
    action.reset();
    mask.hide();
    expect(getVisibleElements(interval.elements).length).toBe(data.length);
  });

  it('mask move', () => {
    context.event = {
      x: 200,
      y: 200
    };
    mask.start();
    mask.show();
    // 未框选中元素
    context.event = {
      x: 300,
      y: 300
    };
    mask.resize();
    // @ts-ignore
    const maskShape = mask.maskShape;
    context.event = {
      target: maskShape
    };
    action.filter();
    expect(getVisibleElements(interval.elements).length).toBe(0);

    context.event = {
      x: 250,
      y: 250
    };
    mask.moveStart();
    context.event = {
      x: 250,
      y: 350
    };
    mask.move();
    context.event = {
      target: maskShape
    };    
    action.filter();
    expect(getVisibleElements(interval.elements).length).toBe(4);

    context.event = {
      x: 250,
      y: 250
    };
    mask.move();
    context.event = {
      target: maskShape
    };    
    action.filter();
    expect(getVisibleElements(interval.elements).length).toBe(0);
    action.reset();
    expect(getVisibleElements(interval.elements).length).toBe(data.length);
    mask.end();
    mask.hide();
  });

  it('filter by record', () => {
    action = new SiblingFilter(context, {
      byRecord: true
    });
    action.init();
    // 调整 view 的 x 轴的范围，用于测试过滤
    view1.scale('year', {
      range: [0.2, 0.8]
    });
    view1.render(true);

    context.event = {
      x: 200,
      y: 200
    };
    mask.start();
    mask.show();
    // @ts-ignore
    const maskShape = mask.maskShape;

    // 过滤非常小时
    context.event = {
      x: 209,
      y: 209
    };
    mask.resize();
    context.event = {
      target: maskShape
    };
    action.filter();
    expect(getVisibleElements(interval.elements).length).toBe(data.length);

    context.event = {
      x: 300,
      y: 400
    };
    mask.resize();
    context.event = {
      target: maskShape
    };
    action.filter();
    expect(getVisibleElements(interval.elements).length).toBe(4);
    expect(interval.elements[0].visible).toBe(false);
    // 未框选中元素
    context.event = {
      x: 300,
      y: 300
    };
    mask.resize();

    context.event = {
      target: maskShape
    };
    action.filter();
    expect(getVisibleElements(interval.elements).length).toBe(0);

    mask.end();
    action.reset();
    mask.hide();
    expect(getVisibleElements(interval.elements).length).toBe(data.length);
  });
  afterAll(() => {
    chart.destroy();
    action.destroy();
    context.destroy();
  });
});