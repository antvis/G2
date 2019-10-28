import { getCoordinate } from '../../../../src/dependents';
import Element from '../../../../src/geometry/element/index';
import PointShapeFactory from '../../../../src/geometry/shape/point';
import Theme from '../../../../src/theme/antv';
import { createCanvas, createDiv, removeDom } from '../../../util/dom';

const Rect = getCoordinate('rect');
const Polar = getCoordinate('polar');

const SHAPES = ['circle', 'square', 'bowtie', 'diamond', 'hexagon', 'triangle', 'triangleDown'];
const HOLLOW_SHAPES = ['cross', 'tick', 'plus', 'hyphen', 'line'];

describe('Point shapes', () => {
  const div = createDiv();
  const canvas = createCanvas({
    container: div,
    width: 500,
    height: 500,
  });
  const rectCoord = new Rect({
    start: { x: 0, y: 500 },
    end: { x: 500, y: 0 },
  });
  PointShapeFactory.setCoordinate(rectCoord);

  const element = new Element({
    shapeType: 'point',
    shapeFactory: PointShapeFactory,
    container: canvas.addGroup(),
    theme: Theme.point,
  });

  it('defaultShapeType', () => {
    expect(PointShapeFactory.defaultShapeType).toBe('circle');
  });

  it('getShapes', () => {
    SHAPES.forEach((shape) => {
      expect(PointShapeFactory.getShape(shape)).not.toBe(undefined);
    });

    HOLLOW_SHAPES.forEach((shape) => {
      expect(PointShapeFactory.getShape(shape)).not.toBe(undefined);
    });
  });

  it('getShapePoints', () => {
    const point = PointShapeFactory.getShapePoints('tick', {
      x: 0.4,
      y: 0.8,
    });
    expect(point[0].x).toBe(0.4);
    expect(point[0].y).toBe(0.8);
  });

  it('draw shapes', () => {
    const shape = PointShapeFactory.drawShape(
      'circle',
      {
        x: 100,
        y: 100,
        points: [{ x: 100, y: 100 }],
        color: 'red',
        style: {
          ...Theme.point.circle.default,
        },
      },
      element
    );
    expect(shape.attr('symbol')).toBe('circle');
    expect(shape.attr('fill')).toBe('red');
  });

  it('draw hollow shapes', () => {
    const shape = PointShapeFactory.drawShape(
      'hyphen',
      {
        x: 100,
        y: 100,
        points: [{ x: 100, y: 100 }],
        color: 'red',
        style: {
          ...Theme.point.hyphen.default,
        },
      },
      element
    );
    // for test
    element.shape = shape;
    expect(shape.attr('symbol')).toBe('hyphen');
    expect(shape.attr('stroke')).toBe('red');
  });

  it('update shape', () => {
    PointShapeFactory.updateShape(
      'hyphen',
      {
        x: 100,
        y: 100,
        color: 'blue',
        style: {
          ...Theme.point.hyphen.default,
        },
      },
      element
    );

    const shape = element.shape;
    expect(shape.attr('stroke')).toBe('blue');
  });

  afterAll(() => {
    canvas.destroy();
    removeDom(div);
  });
});
