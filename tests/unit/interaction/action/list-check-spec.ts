import { Chart } from '../../../../src/index';
import ListChecked from '../../../../src/interaction/action/component/list-checked';
import Context from '../../../../src/interaction/context';
import { createDiv } from '../../../util/dom';

describe('checked test', () => {
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
  chart.interval().position('year*value').color('year');
  chart.render();
  const context = new Context(chart);
  const action = new ListChecked(context);
  const axisLabels = chart.backgroundGroup.findAll((el) => {
    return el.get('name') === 'axis-label';
  });

  it('checked', () => {
    const label = axisLabels[0];
    const item = label.get('delegateObject').item;
    context.event = {
      target: label,
    };
    action.checked();
    expect(item.checked).toBe(true);

    action.reset();
    expect(item.checked).toBe(false);
    action.checked();
    action.clear();
    expect(item.checked).toBe(false);
  });

  it('trigger by element', () => {
    const elements = chart.geometries[0].elements;
    const label = axisLabels[0];
    const item = label.get('delegateObject').item;
    const item1 = axisLabels[1].get('delegateObject').item;
    const first = elements[0];
    const second = elements[1];
    context.event = {
      target: first.shape,
    };
    action.checked();
    expect(item.checked).toBe(true);
    action.reset();
    expect(item.checked).toBe(false);
    action.checked();
    context.event = {
      target: second.shape,
    };
    action.checked();
    expect(item.checked).toBe(true);
    expect(item1.checked).toBe(true);
  });
  afterAll(() => {
    context.destroy();
    chart.destroy();
  });
});
