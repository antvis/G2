import { Chart } from '../../../../src';
import { CITY_SALE } from '../../../util/data';
import { delay } from '../../../util/delay';
import { createDiv } from '../../../util/dom';
import { getClientPoint, simulateMouseEvent } from '../../../util/simulate';

const div = createDiv();

const chart = new Chart({
  container: div,
  width: 800,
  height: 600,
  padding: 10,
});

chart.data(CITY_SALE);

chart
  // @ts-ignore
  .interval()
  .position('city*sale')
  .color('category');

chart.render();

// @ts-ignore
window.__chart = chart;

describe('Event', () => {
  it('component event', () => {
    // 等待联调
    expect(1).toBe(1);
  });

  it('geometry event', () => {
    // 等待联调
    expect(1).toBe(1);
  });

  it('plot event', async () => {
    const mouseEnter = jest.fn();
    const mouseMove = jest.fn();
    const mouseLeave = jest.fn();

    chart.on('plot:mouseenter', (e) => {
      mouseEnter(e);
    });
    chart.on('plot:mousemove', (e) => {
      mouseMove(e);
    });
    chart.on('plot:mouseleave', (e) => {
      mouseLeave(e);
    });

    // 可能是跟动画有关系？
    await delay(500);

    simulateMouseEvent(chart.canvas.get('el'), 'mousemove', getClientPoint(chart.canvas, 300, 300));
    simulateMouseEvent(chart.canvas.get('el'), 'mousemove', getClientPoint(chart.canvas, 723, 526));
    simulateMouseEvent(chart.canvas.get('el'), 'mousemove', getClientPoint(chart.canvas, 730, 530));
    simulateMouseEvent(chart.canvas.get('el'), 'mousemove', getClientPoint(chart.canvas, 1000, 700));

    expect(mouseEnter).toBeCalled();
    expect(mouseMove).toBeCalled();
    expect(mouseLeave).toBeCalled();
  });
});
