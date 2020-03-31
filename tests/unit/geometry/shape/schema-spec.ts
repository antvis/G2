import { getCoordinate } from '../../../../src/dependents';
import Element from '../../../../src/geometry/element/index';
import SchemaShapeFactory from '../../../../src/geometry/shape/schema';
import '../../../../src/geometry/shape/schema/box';
import '../../../../src/geometry/shape/schema/candle';
import { getTheme } from '../../../../src/theme/';
import { createCanvas, createDiv, removeDom } from '../../../util/dom';

const Theme = getTheme('default');
const Rect = getCoordinate('rect');

describe('Schema shapes', () => {
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
  SchemaShapeFactory.coordinate = rectCoord;
  SchemaShapeFactory.theme = Theme.geometries.schema;

  const element = new Element({
    shapeFactory: SchemaShapeFactory,
    container: canvas.addGroup(),
  });

  it('defaultShapeType', () => {
    expect(SchemaShapeFactory.defaultShapeType).toBe('');
  });

  describe('box', () => {
    it('only x, getShapePoints && drawShape & updateShape', () => {
      const type = 'box';
      const points1 = SchemaShapeFactory.getShapePoints(type, {
        x: 0.88,
        y0: 0,
        size: 0.5,
      });
      expect(points1.length).toBe(14);
      expect(points1[0].y).toBe(0.25);
      expect(points1[1].y).toBe(0.75);
      expect(points1[2].y).toBe(0.5);
      expect(points1[3].y).toBe(0.5);

      const points = SchemaShapeFactory.getShapePoints(type, {
        x: 0.88,
        y: null,
        size: 0.5,
      });
      expect(points.length).toBe(14);
      expect(points[0].y).toBe(0.25);
      expect(points[1].y).toBe(0.75);
      expect(points[2].y).toBe(0.5);
      expect(points[3].y).toBe(0.5);

      const shape = SchemaShapeFactory.drawShape(
        type,
        {
          x: 100,
          y: 100,
          points,
          color: 'red',
          defaultStyle: {
            ...Theme.geometries.schema.box.default.style,
          },
        },
        element.container
      );
      expect(shape.attr('stroke')).toBe('red');
      expect(shape.attr('path').length).toBe(16);
    });

    it('only x && x = [], getShapePoints && drawShape', () => {
      const type = 'box';
      const points = SchemaShapeFactory.getShapePoints(type, {
        x: [0.2, 0.5, 0.12, 0.88],
        y: 0,
        size: 0.5,
      });
      expect(points.length).toBe(14);
      expect(points[0].y).toBe(-0.25);
      expect(points[1].y).toBe(0.25);
      expect(points[2].y).toBe(0);
      expect(points[3].y).toBe(0);
      const shape = SchemaShapeFactory.drawShape(
        type,
        {
          x: 100,
          y: 100,
          points,
          color: 'red',
          defaultStyle: {
            ...Theme.geometries.schema.box.default.style,
          },
        },
        element.container
      );
      expect(shape.attr('stroke')).toBe('red');
      expect(shape.attr('path').length).toBe(16);
    });

    it('xy, getShapePoints && drawShape', () => {
      const type = 'box';
      const points = SchemaShapeFactory.getShapePoints(type, {
        x: 0.1,
        y: [0.2, 0.5, 0.12, 0.88],
        y0: 0,
        size: 0.5,
      });
      expect(points.length).toBe(14);

      const shape = SchemaShapeFactory.drawShape(
        type,
        {
          x: 100,
          y: 100,
          points,
          color: 'red',
          defaultStyle: {
            ...Theme.geometries.schema.box.default.style,
          },
        },
        element.container
      );
      expect(shape.attr('stroke')).toBe('red');
      expect(shape.attr('path').length).toBe(16);
    });
    it('getMarker', () => {
      const marker = SchemaShapeFactory.getMarker('box', { color: 'red', isInPolar: false });
      expect(marker.symbol).toBeInstanceOf(Function);
      expect(marker.style.stroke).toBe('red');
    });
  });

  describe('candle', () => {
    it('getShapePoints && drawShape & updateShape', () => {
      const type = 'candle';
      const points = SchemaShapeFactory.getShapePoints(type, {
        x: 0.1,
        y: 0.88,
        y0: 0,
        size: 0.5,
      });
      expect(points.length).toBe(8);

      const shape = SchemaShapeFactory.drawShape(
        type,
        {
          x: 100,
          y: 100,
          points,
          color: 'red',
          defaultStyle: {
            ...Theme.geometries.schema.candle.default.style,
          },
        },
        element.container
      );
      expect(shape.attr('fill')).toBe('red');
      expect(shape.attr('path').length).toBe(9);
    });

    it(' value = [], getShapePoints && drawShape', () => {
      const type = 'candle';
      const points = SchemaShapeFactory.getShapePoints(type, {
        x: 0.1,
        y: [0.2, 0.5, 0.12, 0.88],
        y0: 0,
        size: 0.5,
      });
      expect(points.length).toBe(8);

      const shape = SchemaShapeFactory.drawShape(
        type,
        {
          x: 100,
          y: 100,
          points,
          color: 'blue',
          defaultStyle: {
            ...Theme.geometries.schema.candle.default.style,
          },
        },
        element.container
      );
      expect(shape.attr('fill')).toBe('blue');
      expect(shape.attr('path').length).toBe(9);
    });

    it('value.length < 4, getShapePoints && drawShape', () => {
      const type = 'candle';
      const points = SchemaShapeFactory.getShapePoints(type, {
        x: 0.1,
        y: [0.2, 0.5, 0.12],
        y0: 0,
        size: 0.5,
      });
      expect(points.length).toBe(8);

      const shape = SchemaShapeFactory.drawShape(
        type,
        {
          x: 100,
          y: 100,
          points,
          color: 'blue',
          defaultStyle: {
            ...Theme.geometries.schema.candle.default.style,
          },
        },
        element.container
      );
      expect(shape.attr('fill')).toBe('blue');
      expect(shape.attr('path').length).toBe(9);
    });

    it('getMarker', () => {
      const marker = SchemaShapeFactory.getMarker('candle', { color: 'red', isInPolar: false });
      expect(marker.symbol).toBeInstanceOf(Function);
      expect(marker.style.fill).toBe('red');
    });
  });

  afterAll(() => {
    canvas.destroy();
    removeDom(div);
  });
});
