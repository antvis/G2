import { Chart } from '../../../../src/index';
import ListHighlight from '../../../../src/interaction/action/component/list-highlight';
import Context from '../../../../src/interaction/context';
import { createDiv } from '../../../util/dom';

describe('list highlight test', () => {
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
  const action = new ListHighlight(context);
  const axisLabels = chart.backgroundGroup.findAll((el) => {
    return el.get('name') === 'axis-label';
  });
  const label = axisLabels[0];
  const item = label.get('delegateObject').item;
  const label1 = axisLabels[1];
  const item1 = label1.get('delegateObject').item;

  it('highlight', () => {
    context.event = {
      target: label,
    };
    action.highlight();
    expect(item.active).toBe(true);
    expect(item1.inactive).toBe(true);

    context.event = {
      target: label1,
    };
    action.highlight();
    expect(item.active).toBe(true);
    expect(item1.active).toBe(true);

    action.reset();
    expect(item1.active).toBe(false);
    context.event = {
      target: label,
    };
    action.reset();
    expect(item.active).toBe(false);
  });

  it('toggle', () => {
    context.event = {
      target: label,
    };
    action.highlight();
    expect(item.active).toBe(true);
    expect(item1.inactive).toBe(true);

    context.event = {
      target: label1,
    };
    action.toggle();
    expect(item.active).toBe(true);
    expect(item1.active).toBe(true);

    action.toggle();
    expect(item1.active).toBe(false);
    expect(item1.inactive).toBe(true);

    context.event = {
      target: label,
    };
    action.toggle();
    expect(item.active).toBe(false);
    expect(item1.inactive).toBe(false);
  });

  it('clear', () => {
    context.event = {
      target: label,
    };
    action.highlight();
    context.event = {
      target: label1,
    };
    action.highlight();

    expect(item.active).toBe(true);
    expect(item1.active).toBe(true);
    action.clear();
    expect(item.active).toBe(false);
    expect(item1.active).toBe(false);
  });

  it('trigger by element', () => {
    const elements = chart.geometries[0].elements;
    const first = elements[0];
    const second = elements[1];
    context.event = {
      target: first.shape,
    };
    action.highlight();
    expect(item.active).toBe(true);
    expect(item1.inactive).toBe(true);

    context.event = {
      target: second.shape,
    };
    action.highlight();
    expect(item.active).toBe(true);
    expect(item1.active).toBe(true);
    action.clear();
    expect(item.active).toBe(false);
    expect(item1.active).toBe(false);
  });
  afterAll(() => {
    context.destroy();
    chart.destroy();
  });
});
