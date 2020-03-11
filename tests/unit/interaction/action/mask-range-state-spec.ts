import { Chart } from '../../../../src/index';
import RectMask from '../../../../src/interaction/action/mask/rect';
import PathMask from '../../../../src/interaction/action/mask/path';
import ElementActive from '../../../../src/interaction/action/element/range-active';
import Context from '../../../../src/interaction/context';
import { createDiv } from '../../../util/dom';

describe('test mask and active', () => {
  const chart = new Chart({
    container: createDiv(),
    width: 400,
    height: 400,
    autoFit: false,
  });
  chart.data([
    { year: '1991', value: 13 },
    { year: '1992', value: 34 },
    { year: '1993', value: 5 },
    { year: '1994', value: 34 },
  ]);
  chart.animate(false);
  chart.interaction('brush-visible');
  chart.tooltip(false);
 const interval = chart
    .interval()
    .position('year*value')
    .color('year')
    .state({
      active: {
        style: {
          fillOpacity: 0.4
        }
      }
    });
  chart.render();

  const context = new Context(chart);
  const mask = new RectMask(context);
  const action = new ElementActive(context);
  const elements = interval.elements;
  it('mask and filter', () => {
    context.event = {
      x: 110,
      y: 30,
    };
    mask.start();
    // @ts-ignore
    const shape = mask.maskShape;
    // 短距离移动
    context.event = {
      x: 115,
      y: 35,
    };
    mask.resize();
    context.event = {
      x: 300,
      y: 300,
      target: shape
    };
    action.active();
    // 不发生 active
    expect(elements[0].hasState('active')).toBe(false);
    expect(elements[1].hasState('active')).toBe(false);
    context.event = {
      x: 300,
      y: 300,
    };

    mask.resize();
    context.event = {
      x: 300,
      y: 300,
      target: shape
    };
    action.active();
    expect(elements[0].hasState('active')).toBe(false);
    expect(elements[1].hasState('active')).toBe(true);
    expect(elements[2].hasState('active')).toBe(false);
    context.event = {
      x: 300,
      y: 400,
      target: shape
    };
    mask.resize();
    action.active();
    expect(elements[0].hasState('active')).toBe(false);
    expect(elements[1].hasState('active')).toBe(true);
    expect(elements[2].hasState('active')).toBe(true);
    action.clear();
    mask.end();
    mask.hide();
    expect(elements[0].hasState('active')).toBe(false);
    expect(elements[1].hasState('active')).toBe(false);
  });
  it('mask move', () => {
    context.event = {
      x: 100,
      y: 100,
    };
    mask.start();
    mask.show();
    context.event = {
      x: 200,
      y: 200,
    };
    mask.resize();
    // @ts-ignore
    const shape = mask.maskShape;
    context.event = {
      target: shape
    };
    action.active();
    expect(elements[0].hasState('active')).toBe(false);
    expect(elements[1].hasState('active')).toBe(true);
    expect(elements[2].hasState('active')).toBe(false);
    mask.end();
    context.event = {
      x: 150,
      y: 150,
    };
    mask.moveStart();
    context.event = {
      x: 250,
      y: 150,
    };
    mask.move();
    context.event = {
      target: shape
    };
    action.active();
    expect(elements[0].hasState('active')).toBe(false);
    expect(elements[1].hasState('active')).toBe(false);
    expect(elements[2].hasState('active')).toBe(false);

    context.event = {
      x: 350,
      y: 150,
    };
    mask.move();
    context.event = {
      target: shape
    };
    action.active();
    expect(elements[3].hasState('active')).toBe(true);
    context.event = {
      x: 150,
      y: 150,
    };
    mask.move();
    context.event = {
      target: shape
    };
    action.active();
    expect(elements[3].hasState('active')).toBe(false);
    expect(elements[1].hasState('active')).toBe(true);
    action.clear();
    expect(elements[1].hasState('active')).toBe(false);
    mask.end();
    mask.hide();
  });

  afterAll(() => {
    context.destroy();
    chart.destroy();
  });
});

describe('test path mask', () => {
  const chart = new Chart({
    container: createDiv(),
    width: 400,
    height: 400,
    autoFit: false,
  });
  chart.data([
    { year: '1991', value: 13 },
    { year: '1992', value: 34 },
    { year: '1993', value: 5 },
    { year: '1994', value: 34 },
  ]);
  chart.animate(false);
  chart.tooltip(false);
  const interval = chart
    .interval()
    .position('year*value')
    .color('year')
    .state({
      active: {
        style: {
          fillOpacity: 0.4
        }
      }
    });
  chart.render();
  const context = new Context(chart);
  const mask = new PathMask(context);
  const action = new ElementActive(context, {
    maskByPath: true
  });
  action.init();
  let maskShape;
  it('path very little', () => {
    context.event = {
      x: 100,
      y: 100
    };
    mask.start();
    mask.show();
    // @ts-ignore
    maskShape = mask.maskShape;
    context.event = {
      x: 102,
      y: 100
    };
    mask.resize();

    context.event = {
      x: 102,
      y: 102
    };
    mask.resize();
    context.event = {
      target: maskShape
    };
    action.active();
    expect(interval.getElementsBy(el => el.hasState('active')).length).toBe(0);
    mask.end();
  });

  it('path mask interval', () => {
    context.event = {
      x: 65,
      y: 177
    };
    mask.start();
    mask.show();

    context.event = {
      x: 108,
      y: 178
    };
    mask.resize();

    context.event = {
      x: 121,
      y: 225
    };
    mask.resize();
    context.event = {
      target: maskShape
    };

    action.active();
    expect(interval.getElementsBy(el => el.hasState('active')).length).toBe(0);
    context.event = {
      x: 28,
      y: 225
    };
    mask.resize();

    context.event = {
      target: maskShape
    };
    //debugger;
    action.active();
    expect(interval.getElementsBy(el => el.hasState('active')).length).toBe(1);

    action.clear();
    expect(interval.getElementsBy(el => el.hasState('active')).length).toBe(0);
  });
  it('path mask point', () => {
    chart.clear();
    const point = chart
      .point()
      .position('year*value')
      .color('year');
    chart.scale('value', {
      nice: true,
      min: 0
    });
    chart.render();

    context.event = {
      x: 65,
      y: 177
    };
    mask.start();
    mask.show();

    context.event = {
      x: 108,
      y: 178
    };
    mask.resize();

    context.event = {
      x: 121,
      y: 225
    };
    mask.resize();
    context.event = {
      target: maskShape
    };

    action.active();
    expect(point.getElementsBy(el => el.hasState('active')).length).toBe(0);

    context.event = {
      x: 57,
      y: 260
    };
    mask.resize();

    context.event = {
      target: maskShape
    };

    action.active();

    expect(point.getElementsBy(el => el.hasState('active')).length).toBe(1);
  });
});