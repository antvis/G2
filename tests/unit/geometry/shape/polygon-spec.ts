import { getCoordinate } from '../../../../src/dependents';
import Element from '../../../../src/geometry/element/index';
import PolygonShapeFactory from '../../../../src/geometry/shape/polygon';
import Theme from '../../../../src/theme/antv';
import { createCanvas, createDiv, removeDom } from '../../../util/dom';

const Rect = getCoordinate('rect');

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
  PolygonShapeFactory.coordinate = rectCoord;
  PolygonShapeFactory.theme = Theme.polygon;

  const element = new Element({
    shapeType: 'polygon',
    shapeFactory: PolygonShapeFactory,
    container: canvas.addGroup(),
    theme: Theme.point,
  });

  it('defaultShapeType', () => {
    expect(PolygonShapeFactory.defaultShapeType).toBe('polygon');
  });

  it('getShapePoints', () => {
    const points = PolygonShapeFactory.getShapePoints('polygon', {
      x: [0.1, 0.3, 0.3, 0.4],
      y: [0.2, 0.5, 0.12, 0.88],
    });
    expect(points).toEqual([
      { x: 0.1, y: 0.2 },
      { x: 0.3, y: 0.5 },
      { x: 0.3, y: 0.12 },
      { x: 0.4, y: 0.88 },
    ]);
  });

  describe('polygon', () => {
    it('draw', () => {
      const points = PolygonShapeFactory.getShapePoints('polygon', {
        x: [0.1, 0.3, 0.3, 0.4],
        y: [0.2, 0.5, 0.12, 0.88],
      });
      const shape = PolygonShapeFactory.drawShape(
        'polygon',
        {
          x: 100,
          y: 100,
          points,
          color: 'red',
          style: {
            ...Theme.polygon.polygon.default,
          },
        },
        element
      );
      element.shape = shape;

      expect(shape.attr('fill')).toBe('red');
      expect(shape.attr('path')).toEqual([
        ['M', 50, 400],
        ['L', 150, 250],
        ['L', 150, 440],
        ['L', 200, 60],
        ['L', 50, 400],
        ['Z'],
      ]);
    });

    it('update', () => {
      const points = PolygonShapeFactory.getShapePoints('polygon', {
        x: [0.1, 0.3, 0.3, 0.4],
        y: [0.2, 0.5, 0.12, 0.88],
      });
      PolygonShapeFactory.updateShape(
        'polygon',
        {
          x: 100,
          y: 100,
          points,
          color: 'red',
          style: {
            ...Theme.polygon.polygon.default,
            stroke: '#000',
          },
        },
        element
      );
      const shape = element.shape;

      expect(shape.attr('stroke')).toBe('#000');
    });

    it('getMarker', () => {
      const markerCfg = PolygonShapeFactory.getMarker('polygon', 'red', false);
      expect(markerCfg).toEqual({
        symbol: 'square',
        r: 4,
        fill: 'red',
        fillOpacity: 1,
        lineWidth: 0,
      });
    });
  });

  describe('hollow', () => {
    // @ts-ignore
    element.shapeType = 'hollow';
    it('draw', () => {
      const points = PolygonShapeFactory.getShapePoints('hollow', {
        x: [0.1, 0.3, 0.3, 0.4],
        y: [0.2, 0.5, 0.12, 0.88],
      });
      const shape = PolygonShapeFactory.drawShape(
        'hollow',
        {
          x: 100,
          y: 100,
          points,
          color: 'red',
          style: {
            ...Theme.polygon.polygon.default,
          },
        },
        element
      );
      element.shape = shape;

      expect(shape.attr('stroke')).toBe('red');
      expect(shape.attr('path')).toEqual([
        ['M', 50, 400],
        ['L', 150, 250],
        ['L', 150, 440],
        ['L', 200, 60],
        ['L', 50, 400],
        ['Z'],
      ]);
    });

    it('update', () => {
      const points = PolygonShapeFactory.getShapePoints('hollow', {
        x: [0.1, 0.3, 0.3, 0.4],
        y: [0.2, 0.5, 0.12, 0.88],
      });
      PolygonShapeFactory.updateShape(
        'hollow',
        {
          x: 100,
          y: 100,
          points,
          color: 'red',
          style: {
            ...Theme.polygon.polygon.default,
            lineWidth: 2,
          },
        },
        element
      );
      const shape = element.shape;

      expect(shape.attr('lineWidth')).toBe(2);
    });

    it('getMarker', () => {
      const markerCfg = PolygonShapeFactory.getMarker('hollow', 'red', false);
      expect(markerCfg).toEqual({
        symbol: 'square',
        r: 4,
        stroke: 'red',
        fill: '#fff',
        fillOpacity: 0,
        lineWidth: 2,
      });
    });
  });
});
