import { each } from '@antv/util';
import { Chart } from '../../../../src/index';
import CursorActive from '../../../../src/interaction/action/cursor';
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
  const el = chart.getCanvas().get('el');
  const context = new Context(chart);
  const elements = chart.geometries[0].elements;
  const first = elements[0];
  first.shape.attr('cursor', 'pointer');
  const action = new CursorActive(context);
  const cursors = ['default', 'crosshair', 'pointer', 'move', 'wait', 'help', 'text'];
  const resizeArr = ['n', 's', 'w', 'e', 'ne', 'nw', 'se', 'sw', 'ns', 'ew'];

  it('test cursors', () => {
    action.text();
    expect(el.style.cursor).toBe('text');
    each(cursors, (cursor) => {
      action[cursor]();
      expect(el.style.cursor).toBe(cursor);
    });
  });

  it('test resize cursors', () => {
    each(resizeArr, (name) => {
      const method = name + 'Resize';
      const cursor = name + '-resize';
      action[method]();
      expect(el.style.cursor).toBe(cursor);
    });
  });

  afterAll(() => {
    chart.destroy();
  });
});
