import { Chart } from '../../../../src/index';
import RectMask from '../../../../src/interaction/action/mask/rect';
import ElementFilter from '../../../../src/interaction/action/element/filter';
import Context from '../../../../src/interaction/context';
import { createDiv } from '../../../util/dom';

describe('test mask filter', () => {
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
          opacity: 0.9
        }
      },
      inactive: {
        style: {
          opacity: 0.4
        }
      }
    });
  chart.render();

  const context = new Context(chart);
  const mask = new RectMask(context);
  const filter = new ElementFilter(context);
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
    filter.filter();
    // 不发生过滤
    expect(elements[0].visible).toBe(true);
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
    filter.filter();
    expect(elements[0].visible).toBe(false);
    expect(elements[1].visible).toBe(true);
    expect(elements[2].visible).toBe(false);
    context.event = {
      x: 300,
      y: 400,
      target: shape
    };
    mask.resize();
    filter.filter();
    expect(elements[0].visible).toBe(false);
    expect(elements[1].visible).toBe(true);
    expect(elements[2].visible).toBe(true);
    filter.clear();
    mask.end();
    mask.hide();
    expect(elements[0].visible).toBe(true);
  });

  afterAll(() => {
    context.destroy();
    chart.destroy();
  });
});