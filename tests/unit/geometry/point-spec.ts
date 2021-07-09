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

  it('test the function: getShapesByHitPoint', () => {
    const data = [
      {
        "gender": "female",
        "height": 161.2,
        "weight": 51.6
      },
      {
        "gender": "female",
        "height": 167.5,
        "weight": 59
      },
      {
        "gender": "male",
        "height": 161.2,
        "weight": 51.6
      },
    ]
    const scales = {
      height: createScale('height', data),
      weight: createScale('weight', data),
      gender: createScale('gender', data),
    };

    const point = new Point({
      data,
      scales,
      coordinate: rectCoord,
      container: canvas.addGroup(),
    });
    point.position('height*weight').color('gender');
    point.init({
      theme: Theme,
    });
    point.paint();

    let shapes = point.getShapesByHitPoint(0, 300, null);
    console.log('shapes', shapes)
    expect(shapes.length).toBe(2);
    // @ts-ignore
    expect(shapes[0].get('origin').data).toEqual(data[2]);
    // @ts-ignore
    expect(shapes[1].get('origin').data).toEqual(data[0]);

    shapes = point.getShapesByHitPoint(300, 0, null);
    expect(shapes.length).toBe(1);
    // @ts-ignore
    expect(shapes[0].get('origin').data).toEqual(data[1]);

    shapes = point.getShapesByHitPoint(0, 0, null);
    expect(shapes.length).toBe(0);
  })

  afterAll(() => {
    canvas.destroy();
    removeDom(div);
  });
});
