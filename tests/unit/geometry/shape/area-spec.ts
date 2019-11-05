import { getCoordinate } from '../../../../src/dependents';
import Element from '../../../../src/geometry/element/index';
import AreaShapeFactory from '../../../../src/geometry/shape/area';
import Theme from '../../../../src/theme/antv';
import { createCanvas, createDiv, removeDom } from '../../../util/dom';

import 'jest-extended';

const Rect = getCoordinate('rect');

describe('Area shapes', () => {
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
  AreaShapeFactory.coordinate = rectCoord;
  AreaShapeFactory.theme = Theme.area;

  const element = new Element({
    shapeType: 'area',
    shapeFactory: AreaShapeFactory,
    container: canvas.addGroup(),
    theme: Theme.area,
  });

  it('defaultShapeType', () => {
    expect(AreaShapeFactory.defaultShapeType).toBe('area');
  });

  it('getDefaultPoints()', () => {
    const pointInfo1 = {
      x: 1,
      y: [0, 1],
    };
    expect(AreaShapeFactory.getDefaultPoints(pointInfo1)).toEqual([{ x: 1, y: 0 }, { x: 1, y: 1 }]);

    const pointInfo2 = {
      x: 1,
      y: 1,
      y0: 0.5,
    };
    expect(AreaShapeFactory.getDefaultPoints(pointInfo2)).toEqual([{ x: 1, y: 0.5 }, { x: 1, y: 1 }]);
  });

  it('getMarker()', () => {
    const areaMarker = AreaShapeFactory.getMarker('area', 'red', false);
    expect(areaMarker.fill).toBe('red');
    expect(areaMarker.symbol).toBeFunction();

    const lineMarker = AreaShapeFactory.getMarker('line', 'red', false);
    expect(lineMarker.stroke).toBe('red');
    expect(lineMarker.symbol).toBeFunction();

    const smoothMarker = AreaShapeFactory.getMarker('smooth', 'red', false);
    expect(smoothMarker.fill).toBe('red');
    expect(smoothMarker.symbol).toBeFunction();

    const smoothLineMarker = AreaShapeFactory.getMarker('smoothLine', 'red', false);
    expect(smoothLineMarker.stroke).toBe('red');
    expect(smoothLineMarker.symbol).toBeFunction();
  });

  describe('area', () => {
    // @ts-ignore
    element.shapeType = 'area';
    it('draw', () => {
      const shape = AreaShapeFactory.drawShape(
        'area',
        {
          x: 100,
          y: 100,
          style: {
            ...Theme.area.area.default,
          },
          points: [
            [{ x: 0, y: 0.48 }, { x: 0, y: 0.88 }],
            [{ x: 0.5, y: 0.26 }, { x: 0.5, y: 0.62 }],
            [{ x: 1, y: 0.04 }, { x: 1, y: 0.52 }],
          ],
        },
        element
      );
      // mock
      element.shape = shape;
      // canvas.draw();
      expect(shape.attr('fill')).toBe(Theme.defaultColor);
      expect(shape.attr('path').length).toBe(7);
    });

    it('update', () => {
      AreaShapeFactory.updateShape(
        'area',
        {
          x: 100,
          y: 100,
          style: {
            ...Theme.area.area.default,
            fillOpacity: 1,
          },
          color: 'red',
          points: [
            [{ x: 0, y: 0.48 }, { x: 0, y: 0.88 }],
            [{ x: 0.5, y: 0.26 }, { x: 0.5, y: 0.62 }],
            [{ x: 1, y: 0.04 }, { x: 1, y: 0.52 }],
          ],
        },
        element
      );
      canvas.draw();
      const shape = element.shape;
      expect(shape.attr('fill')).toBe('red');
      expect(shape.attr('fillOpacity')).toBe(1);
    });

    it('destroy', () => {
      AreaShapeFactory.destroyShape(
        'area',
        {
          x: 100,
          y: 100,
        },
        element
      );

      expect(element.container.getChildren().length).toBe(0);
    });
  });

  describe('line', () => {
    // @ts-ignore
    element.shapeType = 'line';
    it('draw, points contain empty', () => {
      const shape = AreaShapeFactory.drawShape(
        'line',
        {
          x: 100,
          y: 100,
          style: {
            ...Theme.area.line.default,
          },
          points: [
            [{ x: 0, y: 0.48 }, { x: 0, y: 0.88 }],
            [{ x: 0.25, y: 0.26 }, { x: 0.25, y: 0.62 }],
            [{ x: 0.5, y: 0 }, { x: 0.5, y: null }],
            [{ x: 0.75, y: 0.08 }, { x: 0.75, y: 0.56 }],
            [{ x: 1, y: 0.08 }, { x: 1, y: 0.56 }],
          ],
          connectNulls: false,
        },
        element
      );
      // mock
      element.shape = shape;
      // canvas.draw();
      expect(shape.attr('stroke')).toBe(Theme.defaultColor);
      expect(shape.attr('path').length).toBe(10);
      expect(shape.attr('path')[5][0]).toBe('M');
    });

    it('update', () => {
      AreaShapeFactory.updateShape(
        'line',
        {
          x: 100,
          y: 100,
          style: {
            ...Theme.area.line.default,
          },
          points: [
            [{ x: 0, y: 0.48 }, { x: 0, y: 0.88 }],
            [{ x: 0.25, y: 0.26 }, { x: 0.25, y: 0.62 }],
            [{ x: 0.5, y: 0 }, { x: 0.5, y: null }],
            [{ x: 0.75, y: 0.08 }, { x: 0.75, y: 0.56 }],
            [{ x: 1, y: 0.08 }, { x: 1, y: 0.56 }],
          ],
          connectNulls: true,
        },
        element
      );
      // canvas.draw();
      const shape = element.shape;
      expect(shape.attr('path').length).toBe(9);
    });

    it('destroy', () => {
      AreaShapeFactory.destroyShape(
        'line',
        {
          x: 100,
          y: 100,
        },
        element
      );

      expect(element.container.getChildren().length).toBe(0);
    });
  });

  describe('smooth', () => {
    // @ts-ignore
    element.shapeType = 'smooth';
    it('draw', () => {
      const shape = AreaShapeFactory.drawShape(
        'smooth',
        {
          x: 100,
          y: 100,
          style: {
            ...Theme.area.smooth.default,
          },
          points: [
            [{ x: 0, y: 0.48 }, { x: 0, y: 0.88 }],
            [{ x: 0.5, y: 0.26 }, { x: 0.5, y: 0.62 }],
            [{ x: 1, y: 0.04 }, { x: 1, y: 0.52 }],
          ],
        },
        element
      );
      // mock
      element.shape = shape;
      // canvas.draw();
      expect(shape.attr('fill')).toBe(Theme.defaultColor);
      expect(shape.attr('path').length).toBe(7);
      expect(shape.attr('path')[1].length).toBe(7);
      expect(shape.attr('path')[3].length).toBe(3);
    });

    it('update', () => {
      AreaShapeFactory.updateShape(
        'smooth',
        {
          x: 100,
          y: 100,
          style: {
            ...Theme.area.area.default,
            fillOpacity: 1,
          },
          color: 'red',
          points: [
            [{ x: 0, y: 0.48 }, { x: 0, y: 0.88 }],
            [{ x: 0.5, y: 0.26 }, { x: 0.5, y: 0.62 }],
            [{ x: 1, y: 0.04 }, { x: 1, y: 0.52 }],
          ],
        },
        element
      );
      canvas.draw();
      const shape = element.shape;
      expect(shape.attr('fill')).toBe('red');
      expect(shape.attr('fillOpacity')).toBe(1);
    });

    it('destroy', () => {
      AreaShapeFactory.destroyShape(
        'smooth',
        {
          x: 100,
          y: 100,
        },
        element
      );

      expect(element.container.getChildren().length).toBe(0);
    });
  });

  describe('smoothLine', () => {
    // @ts-ignore
    element.shapeType = 'smoothLine';
    it('draw', () => {
      const shape = AreaShapeFactory.drawShape(
        'smoothLine',
        {
          x: 100,
          y: 100,
          style: {
            ...Theme.area.smoothLine.default,
          },
          points: [
            [{ x: 0, y: 0.48 }, { x: 0, y: 0.88 }],
            [{ x: 0.5, y: 0.26 }, { x: 0.5, y: 0.62 }],
            [{ x: 1, y: 0.04 }, { x: 1, y: 0.52 }],
          ],
          color: 'yellow',
        },
        element
      );
      // mock
      element.shape = shape;
      // canvas.draw();
      expect(shape.attr('stroke')).toBe('yellow');
      expect(shape.attr('path').length).toBe(7);
      expect(shape.attr('path')[1].length).toBe(7);
      expect(shape.attr('path')[3].length).toBe(3);
    });

    it('update', () => {
      AreaShapeFactory.updateShape(
        'smoothLine',
        {
          x: 100,
          y: 100,
          style: {
            ...Theme.area.area.default,
          },
          color: 'red',
          points: [
            [{ x: 0, y: 0.48 }, { x: 0, y: 0.88 }],
            [{ x: 0.5, y: 0.26 }, { x: 0.5, y: 0.62 }],
            [{ x: 1, y: 0.04 }, { x: 1, y: 0.52 }],
          ],
        },
        element
      );
      canvas.draw();
      const shape = element.shape;
      expect(shape.attr('stroke')).toBe('red');
    });

    it('destroy', () => {
      AreaShapeFactory.destroyShape(
        'smoothLine',
        {
          x: 100,
          y: 100,
        },
        element
      );

      expect(element.container.getChildren().length).toBe(0);
    });
  });

  afterAll(() => {
    canvas.destroy();
    removeDom(div);
  });
});
