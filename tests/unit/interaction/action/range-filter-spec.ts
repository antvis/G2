import { Chart } from '../../../../src/index';
import RangeFilter from '../../../../src/interaction/action/data/range-filter';
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
  ];
  chart.data(data);
  chart.scale('value', { nice: true });
  chart.animate(false);
  chart.tooltip(false);
  const interval = chart
    .interval()
    .position('year*value')
    .color('year');
  chart.render();
  const context = new Context(chart);
  const action = new RangeFilter(context);
  chart.render(true);
  it('test x,y filter', () => {
    context.event = {
      x: 113,
      y: 33,
    };
    action.start();
    context.event = {
      x: 204,
      y: 180,
    };
    action.filter();
    expect(interval.elements.length).toBe(1);
  });

  it('test reset', () => {
    action.reset();
    expect(interval.elements.length).toBe(data.length);
  });

  it('test x filter', () => {
    // @ts-ignore
    action.dims = ['x'];
    context.event = {
      x: 200,
      y: 33,
    };
    action.start();
    context.event = {
      x: 404,
      y: 300,
    };
    action.filter();
    expect(interval.elements.length).toBe(3);
    action.reset();
    expect(interval.elements.length).toBe(data.length);
    action.filter(); // 结束或者回滚后，不再生效
    expect(interval.elements.length).toBe(data.length);
  });

  it('text y filter', () => {
    // @ts-ignore
    action.dims = ['y'];
    context.event = {
      x: 200,
      y: 33,
    };
    action.start();
    context.event = {
      x: 404,
      y: 168,
    };
    action.filter();
    expect(interval.elements.length).toBe(2);
    action.end();
  });

  it('all range', () => {
    // @ts-ignore
    action.dims = ['x', 'y'];
    context.event = {
      x: 14,
      y: 367,
    };
    action.start();
    context.event = {
      x: 404,
      y: 0,
    };
    action.filter();
    expect(interval.elements.length).toBe(data.length);
    action.reset();
    expect(interval.elements.length).toBe(data.length);
  });
  it('dx, dy', () => {
    // @ts-ignore
    action.dims = ['x', 'y'];
    context.event = {
      x: 14,
      y: 367,
    };
    action.start();
    context.event = {
      x: 12,
      y: 367,
    };
    action.filter();
    expect(interval.elements.length).toBe(data.length);
  });

  afterAll(() => {
    action.destroy();
    chart.destroy();
    context.destroy();
  });
});
