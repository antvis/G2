import { getCoordinate } from '../../../../src/dependents';
import Element from '../../../../src/geometry/element/index';
import SchemaShapeFactory from '../../../../src/geometry/shape/schema';
import Theme from '../../../../src/theme/antv';
import { createCanvas, createDiv, removeDom } from '../../../util/dom';

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
    shapeType: 'polygon',
    shapeFactory: SchemaShapeFactory,
    container: canvas.addGroup(),
    theme: Theme.geometries.schema,
  });

  it('defaultShapeType', () => {
    expect(SchemaShapeFactory.defaultShapeType).toBe('');
  });

  describe('box', () => {
    it('only x, getShapePoints && drawShape & updateShape', () => {
      const type = 'box';
      const points = SchemaShapeFactory.getShapePoints(type, {
        x: 0.88,
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
          style: {
            ...Theme.geometries.schema.box.default,
          },
        },
        element
      );
      expect(shape.attr('stroke')).toBe('red');
      expect(shape.attr('path').length).toBe(16);

      // mock
      element.shape = shape;
      SchemaShapeFactory.updateShape(
        type,
        {
          x: 100,
          y: 100,
          points,
          color: 'blue',
          style: {
            ...Theme.geometries.schema.box.default,
          },
        },
        element
      );
      expect(element.shape.attr('stroke')).toBe('blue');
    });

    it('only x && x = [], getShapePoints && drawShape', () => {
      const type = 'box';
      const points = SchemaShapeFactory.getShapePoints(type, {
        x: [0.2, 0.5, 0.12, 0.88],
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
          style: {
            ...Theme.geometries.schema.box.default,
          },
        },
        element
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
          style: {
            ...Theme.geometries.schema.box.default,
          },
        },
        element
      );
      expect(shape.attr('stroke')).toBe('red');
      expect(shape.attr('path').length).toBe(16);
    });
    it('getMarker', () => {
      const marker = SchemaShapeFactory.getMarker('box', 'red', false);
      expect(marker.symbol).toBeInstanceOf(Function);
      expect(marker.stroke).toBe('red');
    });
  });

  describe('candle', () => {
    // @ts-ignore
    element.shapeType = 'candle';
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
          style: {
            ...Theme.geometries.schema.candle.default,
          },
        },
        element
      );
      expect(shape.attr('fill')).toBe('red');
      expect(shape.attr('path').length).toBe(9);

      // mock
      element.shape = shape;
      SchemaShapeFactory.updateShape(
        type,
        {
          x: 100,
          y: 100,
          points,
          color: 'blue',
          style: {
            ...Theme.geometries.schema.candle.default,
          },
        },
        element
      );
      expect(element.shape.attr('fill')).toBe('blue');
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
          style: {
            ...Theme.geometries.schema.candle.default,
          },
        },
        element
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
          style: {
            ...Theme.geometries.schema.candle.default,
          },
        },
        element
      );
      expect(shape.attr('fill')).toBe('blue');
      expect(shape.attr('path').length).toBe(9);
    });

    it('getMarker', () => {
      const marker = SchemaShapeFactory.getMarker('candle', 'red', false);
      expect(marker.symbol).toBeInstanceOf(Function);
      expect(marker.fill).toBe('red');
    });
  });

  afterAll(() => {
    canvas.destroy();
    removeDom(div);
  });
});
