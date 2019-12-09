import { Chart } from '../../../../src/index';
import ListActive from '../../../../src/interaction/action/list-active';
import Context from '../../../../src/interaction/context';
import { createDiv } from '../../../util/dom';

describe('active test', () => {
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
  chart
    .interval()
    .position('year*value')
    .color('year');
  chart.render();
  const context = new Context(chart);
  const action = new ListActive(context);
  const axisLabels = chart.backgroundGroup.findAll((el) => {
    return el.get('name') === 'axis-label';
  });
  const legendItems = chart.foregroundGroup.findAll((el) => {
    return el.get('name') === 'legend-item';
  });
  it('init', () => {
    expect(action.name).toBe('list-active');
  });

  xit('no target', () => {
    context.event = {
      target: null,
    };
    action.active();
    action.reset();
  });

  it('axis label acitve, reset', () => {
    const label = axisLabels[0];
    const item = label.get('delegationObject').item;
    context.event = {
      target: label,
    };
    action.active();
    expect(item.active).toBe(true);
    context.event = {
      target: null,
    };
    action.reset();
    expect(item.active).toBe(true);
    context.event = {
      target: label,
    };
    action.reset();
    expect(item.active).toBe(false);
  });

  it('legend item active', () => {
    const legendItem = legendItems[0];
    const item = legendItem.get('delegationObject').item;
    context.event = {
      target: legendItem,
    };
    action.active();
    expect(item.active).toBe(true);
    context.event = {
      target: null,
    };
    action.reset();
    expect(item.active).toBe(true);
    context.event = {
      target: legendItem,
    };
    action.reset();
    expect(item.active).toBe(false);
  });

  it('element trigger active', () => {
    const elments = chart.geometries[0].elements;
    const elment = elments[0];
    context.event = {
      target: elment.shape,
    };
    action.active();
  });
});
