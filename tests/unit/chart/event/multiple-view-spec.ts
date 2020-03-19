import { Chart } from '../../../../src';
import { CITY_SALE } from '../../../util/data';
import { createDiv } from '../../../util/dom';
import {getClientPoint, simulateMouseEvent} from '../../../util/simulate';
describe('multiple view test', () => {
  const div = createDiv();

  const chart = new Chart({
    container: div,
    width: 800,
    height: 600,
    padding: 'auto',
    autoFit: false,
  });

  chart.data(CITY_SALE);
  chart.animate(false);

  chart
    .interval()
    .position('city*sale')
    .color('category')
    .adjust('stack');

  const view = chart.createView();
  view.data(CITY_SALE);
  view.line()
    .position('city*sale')
    .color('category')
    .adjust('stack');

  chart.render();
  const canvas = chart.canvas;
  const el = canvas.get('el');
  it('chart element events', () => {
    let called = false; // 不要 simulate click, 依赖包有段逻辑会报错
    chart.on('interval:mousedown', () => {
      called = true;
    });
    let viewCalled = false;
    view.on('interval:mousedown', () => {
      viewCalled = true;
    });
    // 点击空白处
    simulateMouseEvent(el, 'mousedown', getClientPoint(canvas, 253, 69));
    expect(called).toBe(false);
    expect(viewCalled).toBe(false);

    // 点击柱子
    simulateMouseEvent(el, 'mousedown', getClientPoint(canvas, 532, 152));
    expect(called).toBe(true);
    expect(viewCalled).toBe(false);
  });

  it('view element events', () => {
    let called = false;
    chart.on('line:mousedown', () => {
      called = true;
    });
    let viewCalled = false;
    view.on('line:mousedown', () => {
      viewCalled = true;
    });

    // 点击空白处
    simulateMouseEvent(el, 'mousedown', getClientPoint(canvas, 253, 69));
    expect(called).toBe(false);
    expect(viewCalled).toBe(false);

    simulateMouseEvent(el, 'mousedown', getClientPoint(canvas, 391, 222));
    expect(called).toBe(true);
    expect(viewCalled).toBe(true);
    simulateMouseEvent(el, 'mouseup', getClientPoint(canvas, 391, 222));
  });

  it('plot mouseenter, mouseleave', () => {
    let called = false;
    chart.on('plot:mouseenter', () => {
      called = true;
    });
    let leaveCalled = false;
    chart.on('plot:mouseleave', () => {
      leaveCalled = true;
    });
    // 不在 plot 区域内移动
    simulateMouseEvent(el, 'mousemove', getClientPoint(canvas, 9, 142));
    expect(called).toBe(false);
    expect(leaveCalled).toBe(false);
    simulateMouseEvent(el, 'mousemove', getClientPoint(canvas, 86, 142));
    expect(called).toBe(true);
    expect(leaveCalled).toBe(false);

    simulateMouseEvent(el, 'mousemove', getClientPoint(canvas, 9, 142));
    expect(leaveCalled).toBe(true);
  });

  // 直接从画布边框进入和离开 plot
  it('direct in canvas or leave canvas', () => {
    let called = false;
    chart.on('plot:mouseenter', () => {
      called = true;
    });
    let leaveCalled = false;
    chart.on('plot:mouseleave', () => {
      leaveCalled = true;
    });
    simulateMouseEvent(el, 'mouseenter', getClientPoint(canvas, 800, 142));
    simulateMouseEvent(el, 'mousemove', getClientPoint(canvas, 799, 142));
    expect(called).toBe(true);
    expect(leaveCalled).toBe(false);
    simulateMouseEvent(el, 'mouseleave', getClientPoint(canvas, 800, 142));
    expect(leaveCalled).toBe(true);
    leaveCalled = false;
    simulateMouseEvent(el, 'mouseleave', getClientPoint(canvas, 700, 142));
    expect(leaveCalled).toBe(true);
  });

  it('plot other events', () => {
    let called = false;
    chart.on('plot:mousedown', () => {
      called = true;
    });
    simulateMouseEvent(el, 'mousedown', getClientPoint(canvas, 9, 142));
    expect(called).toBe(false);
    simulateMouseEvent(el, 'mousedown', getClientPoint(canvas, 100, 142));
    expect(called).toBe(true);
  });

  it('general events', () => {
    let called = false;
    chart.on('mousedown', () => {
      called = true;
    });
    let viewCalled = false;
    view.on('mousedown', () => {
      viewCalled = true;
    });
    simulateMouseEvent(el, 'mousedown', getClientPoint(canvas, 9, 142));
    expect(called).toBe(true);
    expect(viewCalled).toBe(true);
  });
  afterAll(() => {
    chart.destroy();
  });
});
