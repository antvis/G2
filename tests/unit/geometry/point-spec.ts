import { getCoordinate } from '@antv/coord';
import Point from '../../../src/geometry/point';
import { getTheme } from '../../../src/theme/';
import { createCanvas, createDiv, removeDom } from '../../util/dom';

import 'jest-extended';
import { createScale } from '../../util/scale';

const CartesianCoordinate = getCoordinate('rect');
const Theme = getTheme('default');

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
    const data = [
      { x: 1996, y: 30 },
      { x: 1990, y: 210 },
      { x: 1993, y: 29 },
    ];
    const scales = {
      x: createScale('x', data),
      y: createScale('y', data),
    };
    const point = new Point({
      data,
      scales,
      container: canvas.addGroup(),
      coordinate: rectCoord,
    });

    point.position('x*y');
    point.init({
      theme: Theme,
    });
    point.paint();
    canvas.draw();

    expect(point.shapeType).toBe('point');
    // @ts-ignore
    expect(point.generatePoints).toBe(true);

    const element = point.elements[0];
    expect(element.getData()).toEqual({ x: 1996, y: 30 });
    expect(element.getModel().isStack).toBe(false);
  });

  afterAll(() => {
    canvas.destroy();
    removeDom(div);
  });
});
