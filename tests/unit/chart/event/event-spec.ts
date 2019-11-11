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
  // @ts-ignore
  .interval()
  .position('city*sale')
  .color('category');

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

    simulateMouseEvent(chart.canvas.get('el'), 'mousemove', getClientPoint(chart.canvas, 520, 520));
    simulateMouseEvent(chart.canvas.get('el'), 'mousemove', getClientPoint(chart.canvas, 530, 530));

    expect(cb).toBeCalledWith('interval:mousemove');
  });

  it('plot event', () => {
    const plotEvent = jest.fn();

    chart.on('plot:mouseenter', (e) => {
      plotEvent(e);
    });
    chart.on('plot:mousemove', (e) => {
      plotEvent(e);
    });
    chart.on('plot:mouseleave', (e) => {
      plotEvent(e);
    });

    simulateMouseEvent(chart.canvas.get('el'), 'mousemove', getClientPoint(chart.canvas, 200, 200));
    simulateMouseEvent(chart.canvas.get('el'), 'mousemove', getClientPoint(chart.canvas, 723, 526));
    simulateMouseEvent(chart.canvas.get('el'), 'mousemove', getClientPoint(chart.canvas, 730, 530));
    simulateMouseEvent(chart.canvas.get('el'), 'mousemove', getClientPoint(chart.canvas, 1000, 700));

    expect(plotEvent).toBeCalled();
  });
});
