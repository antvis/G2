import { getCoordinate } from '../../../../src/dependents';
import Element from '../../../../src/geometry/element/index';
import IntervalShapeFactory from '../../../../src/geometry/shape/interval';
import '../../../../src/geometry/shape/interval/funnel';
import '../../../../src/geometry/shape/interval/hollow-rect';
import '../../../../src/geometry/shape/interval/line';
import '../../../../src/geometry/shape/interval/pyramid';
import '../../../../src/geometry/shape/interval/tick';
import { getTheme } from '../../../../src/theme/';
import { createCanvas, createDiv, removeDom } from '../../../util/dom';

const Rect = getCoordinate('rect');
const Theme = getTheme('default');

describe('Interval shapes', () => {
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
  IntervalShapeFactory.theme = Theme.geometries.interval;

  describe('IntervalShapeFactory', () => {
    it('defaultShapeType', () => {
      expect(IntervalShapeFactory.defaultShapeType).toEqual('rect');
    });

    it('getDefaultPoints(), x and y are number', () => {
      const cfg = {
        x: 1,
        y: 2,
        y0: 0,
        size: 10,
      };
      const points = IntervalShapeFactory.getDefaultPoints(cfg);
      expect(points).toEqual([
        { x: -4, y: 0 },
        { x: -4, y: 2 },
        { x: 6, y: 2 },
        { x: 6, y: 0 },
      ]);
    });

    it('getDefaultPoints(), x is number, y is array', () => {
      const cfg = {
        x: 1,
        y: [2, 4],
        size: 10,
      };
      const points = IntervalShapeFactory.getDefaultPoints(cfg);
      expect(points).toEqual([
        { x: -4, y: 2 },
        { x: -4, y: 4 },
        { x: 6, y: 4 },
        { x: 6, y: 2 },
      ]);
    });

    it('getDefaultPoints(), x is array, y is number', () => {
      const cfg = {
        x: [3, 5],
        y: 2,
        y0: 0,
      };
      const points = IntervalShapeFactory.getDefaultPoints(cfg);
      expect(points).toEqual([
        { x: 3, y: 0 },
        { x: 3, y: 2 },
        { x: 5, y: 2 },
        { x: 5, y: 0 },
      ]);
    });

    it('getDefaultPoints(), x and y are array', () => {
      const cfg = {
        x: [3, 5],
        y: [2, 4],
      };
      const points = IntervalShapeFactory.getDefaultPoints(cfg);
      expect(points).toEqual([
        { x: 3, y: 2 },
        { x: 3, y: 4 },
        { x: 5, y: 4 },
        { x: 5, y: 2 },
      ]);
    });
  });

  describe('rect', () => {
    IntervalShapeFactory.coordinate = rectCoord;
    const element = new Element({
      shapeFactory: IntervalShapeFactory,
      container: canvas.addGroup(),
    });
    it('draw', () => {
      const cfg = {
        x: 0.25,
        y: 0.5,
        y0: 0,
        size: 0.2,
      };
      const points = IntervalShapeFactory.getShapePoints('rect', cfg);
      const shape = IntervalShapeFactory.drawShape(
        'rect',
        {
          x: 100,
          y: 100,
          points,
          color: 'red',
          defaultStyle: {
            ...Theme.geometries.interval.rect.default.style,
          },
        },
        element.container
      );
      canvas.draw();
      expect(shape.attr('fill')).toBe('red');
      expect(shape.attr('path').length).toBe(6);
      expect(shape.getBBox().width).toBe(100);
    });

    it('getMarker', () => {
      const markerCfg = IntervalShapeFactory.getMarker('rect', { color: 'red', isInPolar: false });
      expect(markerCfg).toEqual({
        symbol: 'square',
        style: {
          ...Theme.geometries.interval.rect.default.style,
          r: 4,
          fill: 'red',
        },
      });

      const polaeMarkerCfg = IntervalShapeFactory.getMarker('rect', { color: 'red', isInPolar: true });
      expect(polaeMarkerCfg).toEqual({
        symbol: 'circle',
        style: {
          ...Theme.geometries.interval.rect.default.style,
          r: 4.5,
          fill: 'red',
        },
      });
    });
  });

  describe('hollow-rect', () => {
    IntervalShapeFactory.coordinate = rectCoord;

    const element = new Element({
      shapeFactory: IntervalShapeFactory,
      container: canvas.addGroup(),
    });
    it('draw', () => {
      const cfg = {
        x: 0.25,
        y: 0.8,
        y0: 0.6,
        size: 0.2,
      };
      const points = IntervalShapeFactory.getShapePoints('hollow-rect', cfg);
      const shape = IntervalShapeFactory.drawShape(
        'hollow-rect',
        {
          x: 100,
          y: 100,
          points,
          color: 'yellow',
          shape: 'hollow-rect',
          defaultStyle: {
            ...Theme.geometries.interval['hollow-rect'].default.style,
          },
        },
        element.container
      );
      canvas.draw();

      expect(shape.attr('stroke')).toBe('yellow');
      expect(shape.attr('path').length).toBe(6);
      expect(shape.getBBox().width).toBe(102);
    });
    it('getMarker', () => {
      const markerCfg = IntervalShapeFactory.getMarker('hollow-rect', { color: 'red', isInPolar: false });
      expect(markerCfg).toEqual({
        symbol: 'square',
        style: {
          ...Theme.geometries.interval['hollow-rect'].default.style,
          r: 4,
          stroke: 'red',
          fill: null,
        },
      });

      const polaeMarkerCfg = IntervalShapeFactory.getMarker('hollow-rect', { color: 'red', isInPolar: true });
      expect(polaeMarkerCfg).toEqual({
        symbol: 'circle',
        style: {
          ...Theme.geometries.interval['hollow-rect'].default.style,
          r: 4.5,
          stroke: 'red',
          fill: null,
        },
      });
    });
  });

  describe('line', () => {
    IntervalShapeFactory.coordinate = rectCoord;

    const element = new Element({
      shapeFactory: IntervalShapeFactory,
      container: canvas.addGroup(),
    });

    it('get line shape points.', () => {
      const cfg = {
        x: 0.6,
        y: 0.5,
        y0: 0,
      };
      const points = IntervalShapeFactory.getShapePoints('line', cfg);
      expect(points).toEqual([
        { x: 0.6, y: 0 },
        { x: 0.6, y: 0.5 },
      ]);
    });

    it('get line shape points, y is array', () => {
      const cfg = {
        x: 0.6,
        y: [0.2, 0.5],
        y0: 0,
      };
      const points = IntervalShapeFactory.getShapePoints('line', cfg);
      expect(points).toEqual([
        { x: 0.6, y: 0.2 },
        { x: 0.6, y: 0.5 },
      ]);
    });

    it('draw', () => {
      const cfg = {
        x: 0.6,
        y: 0.25,
        y0: 0,
        size: 0.2,
      };
      const points = IntervalShapeFactory.getShapePoints('line', cfg);
      const shape = IntervalShapeFactory.drawShape(
        'line',
        {
          x: 100,
          y: 100,
          color: 'green',
          points,
          size: 5,
          defaultStyle: {
            ...Theme.geometries.interval.line.default.style,
          },
          style: {
            lineWidth: 10,
          },
        },
        element.container
      );
      canvas.draw();
      const path = shape.attr('path');
      expect(shape.attr('stroke')).toBe('green');
      expect(path.length).toBe(4);
      expect(shape.getBBox().width).toBe(10);
      expect(path[0][2] - path[1][2]).toBe(125);
    });

    it('getMarker', () => {
      const markerCfg = IntervalShapeFactory.getMarker('line', { color: 'red', isInPolar: false });
      expect(markerCfg.style.stroke).toBe('red');
      // @ts-ignore
      expect(markerCfg.symbol(10, 10, 5)).toEqual([
        ['M', 10, 5],
        ['L', 10, 15],
      ]);
    });
  });

  describe('tick', () => {
    IntervalShapeFactory.coordinate = rectCoord;

    const element = new Element({
      shapeFactory: IntervalShapeFactory,
      container: canvas.addGroup(),
    });

    it('getPoints()', () => {
      const cfg = {
        x: 0.5,
        y: 0.5,
        y0: 0,
        size: 0.2,
      };
      const points = IntervalShapeFactory.getShapePoints('tick', cfg);
      expect(points).toEqual([
        { x: 0.5, y: 0 },
        { x: 0.5, y: 0.5 },
        { x: 0.4, y: 0 },
        { x: 0.6, y: 0 },
        { x: 0.4, y: 0.5 },
        { x: 0.6, y: 0.5 },
      ]);
    });

    it('getPoints(), y is array', () => {
      const cfg = {
        x: 0.5,
        y: [0.5, 0.8],
        y0: 0,
        size: 0.2,
      };
      const points = IntervalShapeFactory.getShapePoints('tick', cfg);
      expect(points).toEqual([
        { x: 0.5, y: 0.5 },
        { x: 0.5, y: 0.8 },
        { x: 0.4, y: 0.5 },
        { x: 0.6, y: 0.5 },
        { x: 0.4, y: 0.8 },
        { x: 0.6, y: 0.8 },
      ]);
    });

    it('draw', () => {
      const cfg = {
        x: 0.5,
        y: 0.5,
        y0: 0,
        size: 0.2,
      };
      const points = IntervalShapeFactory.getShapePoints('tick', cfg);
      const shape = IntervalShapeFactory.drawShape(
        'tick',
        {
          x: 100,
          y: 100,
          points,
          color: 'pink',
          defaultStyle: {
            ...Theme.geometries.interval.tick.default.style,
          },
        },
        element.container
      );
      canvas.draw();

      const path = shape.attr('path');
      expect(shape.attr('stroke')).toBe('pink');
      expect(path.length).toBe(6);
      expect(path[3][1] - path[2][1]).toBe(100);
      expect(path[0][2] - path[1][2]).toBe(250);
    });

    it('getMarker', () => {
      const markerCfg = IntervalShapeFactory.getMarker('tick', { color: 'red', isInPolar: false });
      expect(markerCfg.style.stroke).toBe('red');
      // @ts-ignore
      expect(markerCfg.symbol(10, 10, 4)).toEqual([
        ['M', 8, 6],
        ['L', 12, 6],
        ['M', 10, 6],
        ['L', 10, 14],
        ['M', 8, 14],
        ['L', 12, 14],
      ]);
    });
  });

  describe('funnel', () => {
    IntervalShapeFactory.coordinate = rectCoord;

    const element = new Element({
      shapeFactory: IntervalShapeFactory,
      container: canvas.addGroup(),
    });

    it('getPoints()', () => {
      const cfg = {
        x: 0.3,
        y: [0.2, 0.5],
        y0: 0,
        size: 0.05,
      };
      const points = IntervalShapeFactory.getShapePoints('funnel', cfg);
      expect(points).toEqual([
        { x: 0.25, y: 0.2 },
        { x: 0.25, y: 0.5 },
        { x: 0.35, y: 0.5 },
        { x: 0.35, y: 0.2 },
      ]);
    });

    it('draw, nextPoints is null', () => {
      const cfg = {
        x: 0.3,
        y: [0.2, 0.5],
        y0: 0,
        size: 0.05,
      };
      const points = IntervalShapeFactory.getShapePoints('funnel', cfg);
      const shape = IntervalShapeFactory.drawShape(
        'funnel',
        {
          x: 100,
          y: 100,
          points,
          nextPoints: null,
          defaultStyle: {
            ...Theme.geometries.interval.funnel.default.style,
          },
        },
        element.container
      );
      canvas.draw();

      const path = shape.attr('path');
      expect(shape.attr('fill')).toBe(Theme.defaultColor);
      expect(path.length).toBe(5);
      expect(path[2][1] - path[1][1]).toBe(50);
      expect(path[0][2] - path[1][2]).toBe(150);
    });

    it('draw, nextPoints is not null', () => {
      const points = IntervalShapeFactory.getShapePoints('funnel', {
        x: 0.3,
        y: [0.2, 0.5],
        y0: 0,
        size: 0.05,
      });
      const nextPoints = IntervalShapeFactory.getShapePoints('funnel', {
        x: 0.5,
        y: [0.3, 0.4],
        size: 0.05,
      });
      const shape = IntervalShapeFactory.drawShape(
        'funnel',
        {
          x: 100,
          y: 100,
          points,
          nextPoints,
          color: 'yellow',
          style: {
            fill: '#334455',
          },
        },
        element.container
      );
      canvas.draw();

      const path = shape.attr('path');
      expect(shape.attr('fill')).toBe('#334455');
      expect(path).toEqual([['M', 125, 400], ['L', 125, 250], ['L', 225, 300], ['L', 225, 350], ['Z']]);
    });

    it('getMarker', () => {
      const markerCfg = IntervalShapeFactory.getMarker('funnel', { color: 'red', isInPolar: false });
      expect(markerCfg).toEqual({
        symbol: 'square',
        style: {
          ...Theme.geometries.interval.funnel.default.style,
          r: 4,
          fill: 'red',
        },
      });
    });
  });

  describe('pyramid', () => {
    IntervalShapeFactory.coordinate = rectCoord;

    const element = new Element({
      shapeFactory: IntervalShapeFactory,
      container: canvas.addGroup(),
    });

    it('getPoints()', () => {
      const cfg = {
        x: 0.25,
        y: [0.6, 0.8],
        y0: 0,
        size: 0.05,
      };
      const points = IntervalShapeFactory.getShapePoints('pyramid', cfg);
      expect(points).toEqual([
        { x: 0.2, y: 0.6 },
        { x: 0.2, y: 0.8 },
        { x: 0.3, y: 0.7 },
      ]);
    });

    it('draw, nextPoints is null', () => {
      const cfg = {
        x: 0.25,
        y: [0.6, 0.8],
        y0: 0,
        size: 0.05,
      };
      const points = IntervalShapeFactory.getShapePoints('pyramid', cfg);
      const shape = IntervalShapeFactory.drawShape(
        'pyramid',
        {
          x: 100,
          y: 100,
          points,
          nextPoints: null,
          defaultStyle: {
            ...Theme.geometries.interval.pyramid.default.style,
          },
        },
        element.container
      );
      canvas.draw();

      const path = shape.attr('path');
      expect(shape.attr('fill')).toEqual(Theme.defaultColor);
      expect(path).toEqual([['M', 100, 200], ['L', 100, 100], ['L', 150, 150], ['L', 150, 150], ['Z']]);
    });

    it('draw, nextPoints is not null', () => {
      const points = IntervalShapeFactory.getShapePoints('pyramid', {
        x: 0.25,
        y: [0.6, 0.8],
        y0: 0,
        size: 0.05,
      });
      const nextPoints = IntervalShapeFactory.getShapePoints('pyramid', {
        x: 0.5,
        y: [0.65, 0.75],
        size: 0.05,
      });
      const shape = IntervalShapeFactory.drawShape(
        'pyramid',
        {
          x: 100,
          y: 100,
          points,
          nextPoints,
          color: 'red',
          defaultStyle: {
            ...Theme.geometries.interval.pyramid.default.style,
          },
        },
        element.container
      );
      canvas.draw();

      const path = shape.attr('path');
      expect(shape.attr('fill')).toBe('red');
      expect(path).toEqual([['M', 100, 200], ['L', 100, 100], ['L', 225, 125], ['L', 225, 175], ['Z']]);
    });
    it('getMarker', () => {
      const markerCfg = IntervalShapeFactory.getMarker('pyramid', { color: 'red', isInPolar: false });
      expect(markerCfg).toEqual({
        symbol: 'square',
        style: {
          ...Theme.geometries.interval.pyramid.default.style,
          r: 4,
          fill: 'red',
        },
      });
    });
  });

  afterAll(() => {
    canvas.destroy();
    removeDom(div);
  });
});
