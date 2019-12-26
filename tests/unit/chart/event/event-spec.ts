import { Chart } from '../../../../src';
import { CITY_SALE } from '../../../util/data';
import { createDiv } from '../../../util/dom';
import { getClientPoint, simulateMouseEvent } from '../../../util/simulate';

const div = createDiv();

const chart = new Chart({
  container: div,
  width: 800,
  height: 600,
  padding: 10,
  autoFit: false,
});

chart.data(CITY_SALE);

chart
  .interval()
  .position('city*sale')
  .color('category')
  .adjust('stack');

chart.animate(false);

chart.render();

// @ts-ignore
window.__chart = chart;

describe('Event', () => {
  it('component event', () => {
    // 等待联调
    expect(1).toBe(1);
  });

  it('geometry event', () => {
    const cb = jest.fn();
    chart.on('interval:mousemove', (e) => {
      cb(e.type);
    });

    simulateMouseEvent(chart.canvas.get('el'), 'mousemove', getClientPoint(chart.canvas, 520, 350));
    simulateMouseEvent(chart.canvas.get('el'), 'mousemove', getClientPoint(chart.canvas, 530, 360));

    expect(cb).toBeCalledWith('interval:mousemove');
  });

  it('plot event', () => {
    const mouseenter = jest.fn();
    const mouseleave = jest.fn();
    const mousedown = jest.fn();
    const mousemove = jest.fn();
    const mouseup = jest.fn();

    const touchstart = jest.fn();
    const touchmove = jest.fn();
    const touchend = jest.fn();
    const touchcancel = jest.fn();

    const click = jest.fn();

    chart.on('plot:mouseenter', mouseenter);
    chart.on('plot:mouseleave', mouseleave);
    chart.on('plot:mousedown', mousedown);
    chart.on('plot:mousemove', mousemove);
    chart.on('plot:mouseup', mouseup);

    chart.on('plot:touchstart', touchstart);
    chart.on('plot:touchmove', touchmove);
    chart.on('plot:touchend', touchend);
    chart.on('plot:touchcancel', touchcancel);

    chart.on('plot:click', click);

    const el = chart.canvas.get('el');

    simulateMouseEvent(el, 'mousemove', getClientPoint(chart.canvas, 16, 16));
    simulateMouseEvent(el, 'mousemove', getClientPoint(chart.canvas, 130, 400)); // mouseenter

    const X = 130;
    const Y = 410;

    simulateMouseEvent(el, 'mousemove', getClientPoint(chart.canvas, X, Y));

    simulateMouseEvent(el, 'mousedown', getClientPoint(chart.canvas, X, Y)); // mousedown
    simulateMouseEvent(el, 'mouseup', getClientPoint(chart.canvas, X, Y)); // mouseup
    simulateMouseEvent(el, 'click', getClientPoint(chart.canvas, X, Y)); // click

    simulateMouseEvent(el, 'touchstart', getClientPoint(chart.canvas, X, Y)); // touchstart
    simulateMouseEvent(el, 'touchmove', getClientPoint(chart.canvas, X, Y)); // touchmove
    simulateMouseEvent(el, 'touchend', getClientPoint(chart.canvas, X, Y)); // touchend
    simulateMouseEvent(el, 'touchcancel', getClientPoint(chart.canvas, X, Y)); // touchcancel

    simulateMouseEvent(el, 'mousemove', getClientPoint(chart.canvas, 20, 20)); // mouseout

    expect(mouseenter).toBeCalled();
    expect(mouseleave).toBeCalled();
    expect(mousedown).toBeCalled();
    expect(mousemove).toBeCalled();
    expect(mouseup).toBeCalled();

    expect(touchstart).toBeCalled();
    expect(touchmove).toBeCalled();
    expect(touchend).toBeCalled();
    // FIXME G 4.0 不支持 touchcancel 事件
    // expect(touchcancel).toBeCalled();

    expect(click).toBeCalled();
  });

  it('view basic event', () => {
    const mousemoveEvent = jest.fn();
    chart.on('mousemove', () => {
      mousemoveEvent();
    });

    const mousedownEvent = jest.fn();
    chart.on('mousedown', (e) => {
      mousedownEvent();
    });

    simulateMouseEvent(chart.canvas.get('el'), 'mousemove', getClientPoint(chart.canvas, 300, 150));
    simulateMouseEvent(chart.canvas.get('el'), 'mousemove', getClientPoint(chart.canvas, 300, 160));
    simulateMouseEvent(chart.canvas.get('el'), 'mousedown', getClientPoint(chart.canvas, 300, 150));

    expect(mousemoveEvent).toBeCalled();
    expect(mousedownEvent).toBeCalled();
  });
});
