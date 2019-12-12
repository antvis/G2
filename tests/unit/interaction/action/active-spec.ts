import { Chart } from '../../../../src/index';
import ActiveAction from '../../../../src/interaction/action/element/active';
import RangeActiveAction from '../../../../src/interaction/action/element/range-active';
import SingleActiveAction from '../../../../src/interaction/action/element/single-active';

import Context from '../../../../src/interaction/context';
import { createDiv } from '../../../util/dom';

describe('test active action', () => {
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

  describe('test common active', () => {
    const context = new Context(chart);
    const action = new ActiveAction(context);
    const axisLabels = chart.backgroundGroup.findAll((el) => {
      return el.get('name') === 'axis-label';
    });
    const elements = chart.geometries[0].elements;
    const first = elements[0];
    const second = elements[1];

    it('test active', () => {
      context.event = {
        target: first.shape,
      };
      action.active();
      expect(first.hasState('active')).toBe(true);
      expect(second.hasState('active')).toBe(false);

      context.event = {
        target: second.shape,
      };
      action.active();
      expect(second.hasState('active')).toBe(true);
      action.reset();
      expect(second.hasState('active')).toBe(false);
    });

    it('test reset', () => {
      context.event = {
        target: first.shape,
      };
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

    it('active by axis', () => {
      const label = axisLabels[0];
      context.event = {
        target: label,
      };
      action.active();
      expect(first.hasState('active')).toBe(true);
    });
    afterAll(() => {
      action.destroy();
      context.destroy();
    });
  });

  describe('test single active', () => {
    const context = new Context(chart);
    const action = new SingleActiveAction(context);
    const elements = chart.geometries[0].elements;
    const first = elements[0];
    const second = elements[1];

    it('test active', () => {
      context.event = {
        target: first.shape,
      };
      action.active();
      expect(first.hasState('active')).toBe(true);
      context.event = {
        target: second.shape,
      };
      action.active();
      expect(first.hasState('active')).toBe(false);
      expect(second.hasState('active')).toBe(true);
      action.reset();
      expect(second.hasState('active')).toBe(false);
      action.active();
      action.clear();
      expect(second.hasState('active')).toBe(false);
    });
    afterAll(() => {
      action.destroy();
      context.destroy();
    });
  });

  describe('test range active', () => {
    const context = new Context(chart);
    const action = new RangeActiveAction(context);
    const elements = chart.geometries[0].elements;
    const first = elements[0];
    const second = elements[1];
    it('active', () => {
      context.event = {
        x: 36,
        y: 203,
      };
      action.start();
      context.event = {
        x: 73,
        y: 329,
      };
      action.active();
      expect(first.hasState('active')).toBe(true);
      expect(second.hasState('active')).toBe(false);

      context.event = {
        x: 151,
        y: 316,
      };
      action.active();
      expect(first.hasState('active')).toBe(true);
      expect(second.hasState('active')).toBe(true);
      action.end();

      context.event = {
        x: 36,
        y: 203,
      };
      action.active();
      expect(first.hasState('active')).toBe(true);
      expect(second.hasState('active')).toBe(true);
    });
    afterAll(() => {
      action.destroy();
      context.destroy();
    });
  });
  afterAll(() => {
    chart.destroy();
  });
});
