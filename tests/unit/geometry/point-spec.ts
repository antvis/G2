import { getCoordinate } from '@antv/coord';
import Point from '../../../src/geometry/point';
import Theme from '../../../src/theme/antv';
import { createCanvas, createDiv, removeDom } from '../../util/dom';

import 'jest-extended';

const CartesianCoordinate = getCoordinate('rect');

describe('Point', () => {
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

  it('draw point', () => {
    const point = new Point({
      data: [{ x: 1996, y: 30 }, { x: 1990, y: 210 }, { x: 1993, y: 29 }],
      container: canvas.addGroup(),
      theme: Theme,
      coordinate: rectCoord,
    });

    point.position('x*y');
    point.initial();
    point.paint();
    canvas.draw();

    expect(point.shapeType).toBe('point');
    // @ts-ignore
    expect(point.generatePoints).toBe(true);

    const element = point.elements[0];
    expect(element.data).toEqual({ x: 1996, y: 30 });
    expect(element.model.isStack).toBe(false);
  });

  afterAll(() => {
    canvas.destroy();
    removeDom(div);
  });
});
