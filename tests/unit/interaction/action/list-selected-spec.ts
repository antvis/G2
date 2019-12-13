import { Chart } from '../../../../src/index';
import ListSelected from '../../../../src/interaction/action/component/list-selected';
import Context from '../../../../src/interaction/context';
import { createDiv } from '../../../util/dom';

describe('list selected test', () => {
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
  const action = new ListSelected(context);
  const axisLabels = chart.backgroundGroup.findAll((el) => {
    return el.get('name') === 'axis-label';
  });

  it('selected', () => {
    const label = axisLabels[0];
    const item = label.get('delegateObject').item;
    context.event = {
      target: label,
    };
    action.selected();
    expect(item.selected).toBe(true);

    action.reset();
    expect(item.selected).toBe(false);
    action.selected();
    action.clear();
    expect(item.selected).toBe(false);
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
    action.selected();
    expect(item.selected).toBe(true);
    action.reset();
    expect(item.selected).toBe(false);
    action.selected();
    context.event = {
      target: second.shape,
    };
    action.selected();
    expect(item.selected).toBe(true);
    expect(item1.selected).toBe(true);
    action.clear();
    expect(item.selected).toBe(false);
    expect(item1.selected).toBe(false);
  });
  afterAll(() => {
    context.destroy();
    chart.destroy();
  });
});
