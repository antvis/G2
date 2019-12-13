import { Chart } from '../../../../src/index';
import HighlightAction from '../../../../src/interaction/action/element/highlight';
import RangeHighlightAction from '../../../../src/interaction/action/element/range-highlight';
import SingleHighlightAction from '../../../../src/interaction/action/element/single-highlight';

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
  chart.on('click', (ev) => console.log(ev));
  describe('single highlight', () => {
    const context = new Context(chart);
    const action = new SingleHighlightAction(context);
    const elements = chart.geometries[0].elements;
    const first = elements[0];
    const second = elements[1];

    it('highlight', () => {
      context.event = {
        target: first.shape,
      };
      action.highlight();
      expect(first.hasState('highlight')).toBe(false);
      expect(first.hasState('active')).toBe(true);
      expect(second.hasState('active')).toBe(false);
      expect(second.hasState('inactive')).toBe(true);
      context.event = {
        target: second.shape,
      };
      action.highlight();
      expect(first.hasState('active')).toBe(false);
      expect(first.hasState('inactive')).toBe(true);
      expect(second.hasState('active')).toBe(true);
      expect(second.hasState('inactive')).toBe(false);
    });

    it('reset', () => {
      context.event = {
        target: first.shape,
      };
      action.highlight();
      expect(first.hasState('active')).toBe(true);
      action.reset();
      expect(first.hasState('active')).toBe(false);
      expect(first.hasState('inactive')).toBe(false);
      expect(second.hasState('inactive')).toBe(false);
    });

    it('toggle', () => {
      context.event = {
        target: first.shape,
      };
      action.highlight();
      expect(first.hasState('active')).toBe(true);
      action.toggle();
      expect(first.hasState('active')).toBe(false);
      expect(second.hasState('inactive')).toBe(false);
      action.toggle();
      expect(first.hasState('active')).toBe(true);
      expect(second.hasState('inactive')).toBe(true);
      context.event = {
        target: second.shape,
      };
      action.toggle();
      expect(first.hasState('inactive')).toBe(true);
      expect(second.hasState('active')).toBe(true);
    });

    it('clear', () => {
      context.event = {
        target: first.shape,
      };
      action.highlight();
      expect(first.hasState('active')).toBe(true);
      action.clear();
      expect(first.hasState('active')).toBe(false);
      expect(second.hasState('inactive')).toBe(false);
    });
    afterAll(() => {
      context.destroy();
    });
  });

  describe('multiple highlight', () => {
    const context = new Context(chart);
    const action = new HighlightAction(context);
    const elements = chart.geometries[0].elements;
    const first = elements[0];
    const second = elements[1];
    it('highlight and reset', () => {
      context.event = {
        target: first.shape,
      };
      action.highlight();
      expect(first.hasState('active')).toBe(true);
      expect(second.hasState('inactive')).toBe(true);

      context.event = {
        target: second.shape,
      };
      action.highlight();
      expect(first.hasState('active')).toBe(true);
      expect(second.hasState('active')).toBe(true);
      action.reset();
      expect(first.hasState('active')).toBe(true);
      expect(second.hasState('active')).toBe(false);
      context.event = {
        target: first.shape,
      };
      action.reset();
      expect(first.hasState('active')).toBe(false);
      expect(second.hasState('active')).toBe(false);
    });

    it('toggle', () => {
      context.event = {
        target: first.shape,
      };
      action.highlight();
      expect(first.hasState('active')).toBe(true);
      context.event = {
        target: second.shape,
      };
      action.toggle();
      expect(first.hasState('active')).toBe(true);
      expect(second.hasState('active')).toBe(true);
      action.toggle();
      expect(first.hasState('active')).toBe(true);
      expect(second.hasState('active')).toBe(false);
      context.event = {
        target: first.shape,
      };
      action.toggle();
      expect(first.hasState('active')).toBe(false);
      expect(second.hasState('active')).toBe(false);
    });

    it('clear', () => {
      context.event = {
        target: first.shape,
      };
      action.highlight();
      context.event = {
        target: second.shape,
      };
      action.toggle();
      action.clear();
      expect(first.hasState('active')).toBe(false);
      expect(second.hasState('active')).toBe(false);
    });
    it('trigger by axis', () => {
      const axisLabels = chart.backgroundGroup.findAll((el) => {
        return el.get('name') === 'axis-label';
      });
      const label = axisLabels[0];
      context.event = {
        target: label,
      };
      action.highlight();
      expect(first.hasState('active')).toBe(true);
      expect(second.hasState('active')).toBe(false);
      action.reset();
      expect(first.hasState('active')).toBe(false);
      expect(second.hasState('active')).toBe(false);
      action.clear();
    });
    afterAll(() => {
      context.destroy();
    });
  });

  describe('range highlight', () => {
    const context = new Context(chart);
    const action = new RangeHighlightAction(context);
    const elements = chart.geometries[0].elements;
    const first = elements[0];
    const second = elements[1];
    const bbox1 = first.getBBox();
    const bbox2 = second.getBBox();
    it('highlight', () => {
      context.event = {
        x: bbox1.x - 5,
        y: bbox1.y - 5,
      };
      action.start();
      context.event = {
        x: bbox1.maxX + 5,
        y: bbox1.y + 5,
      };
      action.highlight();
      expect(first.hasState('active')).toBe(true);
      expect(second.hasState('inactive')).toBe(true);

      context.event = {
        x: bbox2.x + 5,
        y: bbox1.y + 10,
      };
      action.highlight();
      expect(first.hasState('active')).toBe(true);
      expect(second.hasState('active')).toBe(true);
      context.event = {
        x: bbox1.x - 5,
        y: bbox1.y - 5,
      };
      action.highlight();
      expect(first.hasState('active')).toBe(false);
      expect(second.hasState('active')).toBe(false);

      context.event = {
        x: bbox1.maxX + 5,
        y: bbox1.y + 15,
      };
      action.highlight();
      expect(first.hasState('active')).toBe(true);
      context.event = {
        x: bbox2.x + 5,
        y: bbox2.y + 5,
      };
      action.highlight();
      expect(first.hasState('active')).toBe(false);
      expect(second.hasState('active')).toBe(true);
      action.end();

      context.event = {
        x: bbox1.x - 5,
        y: bbox1.y - 5,
      };
      action.highlight();
      expect(first.hasState('active')).toBe(false);
      expect(second.hasState('active')).toBe(true);
    });

    it('highlight again', () => {
      context.event = {
        x: bbox1.x - 5,
        y: bbox1.y - 5,
      };
      action.start();
      action.highlight();
      expect(first.hasState('active')).toBe(false);
      expect(second.hasState('active')).toBe(false);

      context.event = {
        x: bbox2.x + 5,
        y: bbox2.y + 5,
      };
      action.highlight();
      expect(first.hasState('active')).toBe(false);
      expect(second.hasState('active')).toBe(true);
      action.clear();
      expect(second.hasState('active')).toBe(false);
      expect(first.hasState('active')).toBe(false);
      action.highlight();
      expect(second.hasState('active')).toBe(true);
      action.end();
      action.clear();
      action.highlight();
      expect(second.hasState('active')).toBe(true);
      action.clear();
      expect(second.hasState('active')).toBe(false);
    });

    afterAll(() => {
      context.destroy();
    });
  });
  afterAll(() => {
    chart.destroy();
  });
});
