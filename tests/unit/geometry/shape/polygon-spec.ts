import { getCoordinate } from '../../../../src/dependents';
import Element from '../../../../src/geometry/element/index';
import PolygonShapeFactory from '../../../../src/geometry/shape/polygon';
import { getTheme } from '../../../../src/theme/';
import { createCanvas, createDiv, removeDom } from '../../../util/dom';

const Rect = getCoordinate('rect');
const Theme = getTheme('default');

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
  PolygonShapeFactory.theme = Theme.geometries.polygon;

  const element = new Element({
    shapeFactory: PolygonShapeFactory,
    container: canvas.addGroup(),
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
          defaultStyle: {
            ...Theme.geometries.polygon.polygon.default.style,
          },
        },
        element.container
      );

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

    it('getMarker', () => {
      const markerCfg = PolygonShapeFactory.getMarker('polygon', { color: 'red', isInPolar: false });
      expect(markerCfg).toEqual({
        symbol: 'square',
        style: {
          r: 4,
          fill: 'red',
          fillOpacity: 0.95,
          // lineWidth: 0,
        },
      });
    });
  });
});
