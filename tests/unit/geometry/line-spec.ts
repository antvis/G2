import { getCoordinate } from '@antv/coord';
import Line from '../../../src/geometry/line';
import { getTheme } from '../../../src/theme/';
import { createCanvas, createDiv, removeDom } from '../../util/dom';

import 'jest-extended';
import { createScale } from '../../util/scale';

const CartesianCoordinate = getCoordinate('rect');
const Theme = getTheme('default');

describe('Line', () => {
  const div = createDiv();
  const canvas = createCanvas({
    container: div,
    width: 300,
    height: 300,
  });
  const rectCoord = new CartesianCoordinate({
    start: { x: 0, y: 300 },
    end: { x: 300, y: 0 },
  });

  it('Data should be sorted.', () => {
    const data = [
      { x: 1996, y: 30 },
      { x: 1990, y: 210 },
      { x: 1993, y: 29 },
    ];
    const scales = {
      x: createScale('x', data, { x: { nice: true } }),
      y: createScale('y', data, { y: { nice: true } }),
    };
    const line = new Line({
      data,
      scales,
      container: canvas.addGroup(),
      coordinate: rectCoord,
    });

    line.position('x*y');
    line.init({
      theme: Theme,
    });
    line.paint();
    canvas.draw();

    expect(line.shapeType).toBe('line');
    expect(line.sortable).toBe(true);

    const element = line.elements[0];
    expect(element.getData()).toEqual([
      { x: 1990, y: 210 },
      { x: 1993, y: 29 },
      { x: 1996, y: 30 },
    ]);
  });

  it('stack line', () => {
    const data = [
      { x: 1990, y: 20, type: 'a' },
      { x: 1993, y: 30, type: 'a' },
      { x: 1996, y: 30, type: 'a' },
      { x: 1990, y: 34, type: 'b' },
      { x: 1993, y: 56, type: 'b' },
      { x: 1996, y: 15, type: 'b' },
    ];
    const scales = {
      x: createScale('x', data, { x: { nice: true } }),
      y: createScale('y', data, { y: { nice: true } }),
      type: createScale('type', data),
    };

    const line = new Line({
      data,
      scales,
      container: canvas.addGroup(),
      coordinate: rectCoord,
      sortable: false,
    });

    line
      .position('x*y')
      .color('type')
      .adjust('stack');
    line.init({
      theme: Theme,
    });
    line.paint();
    canvas.draw();

    expect(line.sortable).toBe(false);
    const element = line.elements[0];
    const model = element.getModel();
    expect(model.isStack).toBe(true);
    expect(element.shape.attr('path')).toEqual([
      ['M', 0, 138],
      ['L', 150, 42],
      ['L', 300, 165],
    ]);
    // @ts-ignore
    expect(Object.keys(line.elementsMap)).toEqual(['line-a', 'line-b']);
  });

  afterAll(() => {
    canvas.destroy();
    removeDom(div);
  });
});
