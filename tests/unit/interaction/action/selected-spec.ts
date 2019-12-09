import { Chart } from '../../../../src/index';
import ElementMultipleSelected from '../../../../src/interaction/action/element-multiple-selected';
import ElementSelected from '../../../../src/interaction/action/element-selected';
import PieSelected from '../../../../src/interaction/action/pie-selected';
import Context from '../../../../src/interaction/context';
import { createDiv } from '../../../util/dom';

describe('test selected action', () => {
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
  const context = new Context(chart);

  describe('test single selected', () => {
    const elements = chart.geometries[0].elements;
    const first = elements[0];
    const second = elements[1];
    context.event = {
      target: first.shape,
    };
    const action = new ElementSelected(context);

    it('selected', () => {
      action.selected();
      expect(first.hasState('selected')).toBe(true);
      action.selected();
      expect(first.hasState('selected')).toBe(true);
      context.event = {
        target: second.shape,
      };
      action.selected();
      expect(first.hasState('selected')).toBe(false);
      expect(second.hasState('selected')).toBe(true);
    });

    it('toggle', () => {
      context.event = {
        target: first.shape,
      };
      action.selected();
      expect(first.hasState('selected')).toBe(true);
      action.toggle();
      expect(first.hasState('selected')).toBe(false);
      context.event = {
        target: second.shape,
      };
      action.toggle();
      expect(second.hasState('selected')).toBe(true);
      action.toggle();
      expect(second.hasState('selected')).toBe(false);
    });

    it('clear', () => {
      context.event = {
        target: first.shape,
      };
      action.selected();
      expect(first.hasState('selected')).toBe(true);
      context.event = {
        target: null,
      };
      action.clear();
      expect(first.hasState('selected')).toBe(false);
    });

    it('destroy', () => {
      action.destroy();
      expect(action.context).toBe(null);
    });
  });

  describe('test multiple selected', () => {
    const elements = chart.geometries[0].elements;
    const first = elements[0];
    const second = elements[1];

    const action = new ElementMultipleSelected(context);
    it('no target', () => {
      context.event = {
        target: null,
      };
      action.selected();
      expect(first.hasState('selected')).toBe(false);
      action.unselected();
      expect(first.hasState('selected')).toBe(false);
      action.toggle();
      expect(first.hasState('selected')).toBe(false);
    });

    it('selected', () => {
      context.event = {
        target: first.shape,
      };
      action.selected();
      expect(first.hasState('selected')).toBe(true);
      action.unselected();
      expect(first.hasState('selected')).toBe(false);
    });

    it('selected other', () => {
      context.event = {
        target: first.shape,
      };
      action.selected();
      expect(first.hasState('selected')).toBe(true);
      expect(second.hasState('selected')).toBe(false);
      context.event = {
        target: second.shape,
      };
      action.selected();
      expect(first.hasState('selected')).toBe(true);
      expect(second.hasState('selected')).toBe(true);
    });

    it('toggle', () => {
      context.event = {
        target: first.shape,
      };
      action.selected();
      expect(first.hasState('selected')).toBe(true);
      action.toggle();
      expect(first.hasState('selected')).toBe(false);
      action.toggle();
      expect(first.hasState('selected')).toBe(true);
    });

    it('clear', () => {
      context.event = {
        target: first.shape,
      };
      action.selected();
      context.event = {
        target: second.shape,
      };
      action.selected();
      action.clear();
      expect(first.hasState('selected')).toBe(false);
      expect(second.hasState('selected')).toBe(false);
    });
    afterAll(() => {
      context.destroy();
    });
  });

  afterAll(() => {
    chart.destroy();
  });
});

describe('test pie selected', () => {
  const chart = new Chart({
    container: createDiv(),
    width: 400,
    height: 400,
    autoFit: false,
    localRefresh: false,
  });
  chart.data([
    { year: '1991', value: 13 },
    { year: '1992', value: 34 },
    { year: '1993', value: 5 },
    { year: '1994', value: 34 },
  ]);
  chart.animate(false);
  chart.tooltip(false);
  chart.coordinate('theta');
  chart
    .interval()
    .position('1*value')
    .color('year')
    .adjust('stack');
  chart.render();

  const context = new Context(chart);
  const elements = chart.geometries[0].elements;
  const first = elements[0];
  const second = elements[1];

  const action = new PieSelected(context);
  it('selected', () => {
    context.event = {
      target: first.shape,
    };
    action.selected();
    expect(first.hasState('selected')).toBe(true);
    context.event = {
      target: second.shape,
    };
    action.selected();
    expect(first.hasState('selected')).toBe(false);
    expect(second.hasState('selected')).toBe(true);
  });

  it('toggle', () => {
    context.event = {
      target: first.shape,
    };
    action.selected();
    expect(first.hasState('selected')).toBe(true);
    action.toggle();
    expect(first.hasState('selected')).toBe(false);
    action.toggle();
    expect(first.hasState('selected')).toBe(true);
  });

  it('clear', () => {
    context.event = {
      target: first.shape,
    };
    action.selected();
    expect(first.hasState('selected')).toBe(true);
    action.clear();
    expect(first.hasState('selected')).toBe(false);
  });

  afterAll(() => {
    context.destroy();
    chart.destroy();
  });
});
