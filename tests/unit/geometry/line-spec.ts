import { getCoordinate } from '@antv/coord';
import Line from '../../../src/geometry/line';
import Theme from '../../../src/theme/antv';
import { createCanvas, createDiv, removeDom } from '../../util/dom';

import 'jest-extended';

const CartesianCoordinate = getCoordinate('rect');

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
    const line = new Line({
      data: [{ x: 1996, y: 30 }, { x: 1990, y: 210 }, { x: 1993, y: 29 }],
      container: canvas.addGroup(),
      theme: Theme,
      coordinate: rectCoord,
    });

    line.position('x*y');
    line.initial();
    line.paint();
    canvas.draw();

    expect(line.shapeType).toBe('line');
    expect(line.sortable).toBe(true);

    const element = line.elements[0];
    expect(element.data).toEqual([{ x: 1990, y: 210 }, { x: 1993, y: 29 }, { x: 1996, y: 30 }]);
  });

  afterAll(() => {
    canvas.destroy();
    removeDom(div);
  });
});
