import { Chart } from '../../../../src/index';
import ActiveAction from '../../../../src/new_interaction/action/element-active';
import Context from '../../../../src/new_interaction/context';
import { createDiv } from '../../../util/dom';

describe('test active action', () => {
  const context = new Context(null);
  const action = new ActiveAction(context);
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
    { year: '1995', value: 20 },
    { year: '1996', value: 7 },
    { year: '1997', value: 23 },
    { year: '1998', value: 90 },
    { year: '1999', value: 3 },
  ]);
  chart.animate(false);
  chart.tooltip(false);
  chart.interval().position('year*value');
  chart.render();
  const elements = chart.geometries[0].elements;
  const first = elements[0];
  context.event = {
    target: first.shape,
  };

  it('test active', () => {
    action.active();
    expect(first.hasState('active')).toBe(true);
  });

  it('test reset', () => {
    action.reset();
    expect(first.hasState('active')).toBe(false);
  });

  it('no target', () => {
    context.event = {
      target: null,
    };
    action.active();
    expect(first.hasState('active')).toBe(false);
    context.event = {
      target: {
        get() {
          return null;
        },
      },
    };
    expect(first.hasState('active')).toBe(false);
  });
  afterAll(() => {
    chart.destroy();
  });
});
