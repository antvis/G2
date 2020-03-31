import { getCoordinate } from '../../../../src/dependents';
import Element from '../../../../src/geometry/element/index';
import AreaShapeFactory from '../../../../src/geometry/shape/area';
import '../../../../src/geometry/shape/area/line';
import '../../../../src/geometry/shape/area/smooth';
import '../../../../src/geometry/shape/area/smooth-line';
import { getTheme } from '../../../../src/theme/';
import { createCanvas, createDiv, removeDom } from '../../../util/dom';

import 'jest-extended';

const Rect = getCoordinate('rect');
const Theme = getTheme('default');

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
  AreaShapeFactory.theme = Theme.geometries.area;

  const element = new Element({
    shapeFactory: AreaShapeFactory,
    container: canvas.addGroup(),
  });

  it('defaultShapeType', () => {
    expect(AreaShapeFactory.defaultShapeType).toBe('area');
  });

  it('getDefaultPoints()', () => {
    const pointInfo1 = {
      x: 1,
      y: [0, 1],
    };
    expect(AreaShapeFactory.getDefaultPoints(pointInfo1)).toEqual([
      { x: 1, y: 0 },
      { x: 1, y: 1 },
    ]);

    const pointInfo2 = {
      x: 1,
      y: 1,
      y0: 0.5,
    };
    expect(AreaShapeFactory.getDefaultPoints(pointInfo2)).toEqual([
      { x: 1, y: 0.5 },
      { x: 1, y: 1 },
    ]);
  });

  it('getMarker()', () => {
    const areaMarker = AreaShapeFactory.getMarker('area', {
      color: 'red',
      isInPolar: false,
    });
    expect(areaMarker.style.fill).toBe('red');
    expect(areaMarker.symbol).toBeFunction();

    const lineMarker = AreaShapeFactory.getMarker('line', {
      color: 'red',
      isInPolar: false,
    });
    expect(lineMarker.style.stroke).toBe('red');
    expect(lineMarker.symbol).toBeFunction();

    const smoothMarker = AreaShapeFactory.getMarker('smooth', {
      color: 'red',
      isInPolar: false,
    });
    expect(smoothMarker.style.fill).toBe('red');
    expect(smoothMarker.symbol).toBeFunction();

    const smoothLineMarker = AreaShapeFactory.getMarker('smooth-line', {
      color: 'red',
      isInPolar: false,
    });
    expect(smoothLineMarker.style.stroke).toBe('red');
    expect(smoothLineMarker.symbol).toBeFunction();
  });

  describe('area', () => {
    it('draw', () => {
      const shape = AreaShapeFactory.drawShape(
        'area',
        {
          x: 100,
          y: 100,
          defaultStyle: {
            ...Theme.geometries.area.area.default.style,
          },
          style: {
            fill: 'red',
          },
          points: [
            [
              { x: 0, y: 0.48 },
              { x: 0, y: 0.88 },
            ],
            [
              { x: 0.5, y: 0.26 },
              { x: 0.5, y: 0.62 },
            ],
            [
              { x: 1, y: 0.04 },
              { x: 1, y: 0.52 },
            ],
          ],
        },
        element.container
      );
      // canvas.draw();
      expect(shape.attr('fill')).toBe('red');
      expect(shape.attr('path').length).toBe(7);
    });
  });

  describe('line', () => {
    it('draw, points contain empty', () => {
      const shape = AreaShapeFactory.drawShape(
        'line',
        {
          x: 100,
          y: 100,
          shape: 'line',
          defaultStyle: {
            ...Theme.geometries.area.line.default.style,
          },
          points: [
            [
              { x: 0, y: 0.48 },
              { x: 0, y: 0.88 },
            ],
            [
              { x: 0.25, y: 0.26 },
              { x: 0.25, y: 0.62 },
            ],
            [
              { x: 0.5, y: 0 },
              { x: 0.5, y: null },
            ],
            [
              { x: 0.75, y: 0.08 },
              { x: 0.75, y: 0.56 },
            ],
            [
              { x: 1, y: 0.08 },
              { x: 1, y: 0.56 },
            ],
          ],
          connectNulls: false,
        },
        element.container
      );
      // canvas.draw();
      expect(shape.attr('stroke')).toBe(Theme.defaultColor);
      expect(shape.attr('path').length).toBe(10);
      expect(shape.attr('path')[5][0]).toBe('M');
    });
  });

  describe('smooth', () => {
    it('draw', () => {
      const shape = AreaShapeFactory.drawShape(
        'smooth',
        {
          x: 100,
          y: 100,
          shape: 'smooth',
          defaultStyle: {
            ...Theme.geometries.area.smooth.default.style,
          },
          points: [
            [
              { x: 0, y: 0.48 },
              { x: 0, y: 0.88 },
            ],
            [
              { x: 0.5, y: 0.26 },
              { x: 0.5, y: 0.62 },
            ],
            [
              { x: 1, y: 0.04 },
              { x: 1, y: 0.52 },
            ],
          ],
        },
        element.container
      );
      // canvas.draw();
      expect(shape.attr('fill')).toBe(Theme.defaultColor);
      expect(shape.attr('path').length).toBe(7);
      expect(shape.attr('path')[1].length).toBe(7);
      expect(shape.attr('path')[3].length).toBe(3);
    });
  });

  describe('smooth-line', () => {
    it('draw', () => {
      const shape = AreaShapeFactory.drawShape(
        'smooth-line',
        {
          x: 100,
          y: 100,
          shape: 'smooth-line',
          defaultStyle: {
            ...Theme.geometries.area['smooth-line'].default.style,
          },
          style: {
            stroke: 'red',
          },
          points: [
            [
              { x: 0, y: 0.48 },
              { x: 0, y: 0.88 },
            ],
            [
              { x: 0.5, y: 0.26 },
              { x: 0.5, y: 0.62 },
            ],
            [
              { x: 1, y: 0.04 },
              { x: 1, y: 0.52 },
            ],
          ],
          color: 'yellow',
        },
        element.container
      );
      // canvas.draw();
      expect(shape.attr('stroke')).toBe('red');
      expect(shape.attr('path').length).toBe(7);
      expect(shape.attr('path')[1].length).toBe(7);
      expect(shape.attr('path')[3].length).toBe(3);
    });
  });

  afterAll(() => {
    canvas.destroy();
    removeDom(div);
  });
});
