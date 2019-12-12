import { Chart } from '../../../../src/index';
import ListUnchecked from '../../../../src/interaction/action/component/list-unchecked';
import Context from '../../../../src/interaction/context';
import { createDiv } from '../../../util/dom';

describe('unchecked test', () => {
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
  const action = new ListUnchecked(context);
  const axisLabels = chart.backgroundGroup.findAll((el) => {
    return el.get('name') === 'axis-label';
  });

  it('unchecked', () => {
    const label = axisLabels[0];
    const item = label.get('delegationObject').item;
    context.event = {
      target: label,
    };
    action.unchecked();
    expect(item.unchecked).toBe(true);

    action.reset();
    expect(item.unchecked).toBe(false);
    action.unchecked();
    action.clear();
    expect(item.unchecked).toBe(false);
  });

  it('trigger by element', () => {
    const elements = chart.geometries[0].elements;
    const label = axisLabels[0];
    const item = label.get('delegationObject').item;
    const item1 = axisLabels[1].get('delegationObject').item;
    const first = elements[0];
    const second = elements[1];
    context.event = {
      target: first.shape,
    };
    action.unchecked();
    expect(item.unchecked).toBe(true);
    action.reset();
    expect(item.unchecked).toBe(false);
    action.unchecked();
    context.event = {
      target: second.shape,
    };
    action.unchecked();
    expect(item.unchecked).toBe(true);
    expect(item1.unchecked).toBe(true);
  });
  afterAll(() => {
    context.destroy();
    chart.destroy();
  });
});
