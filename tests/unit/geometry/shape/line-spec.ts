import { getCoordinate } from '../../../../src/dependents';
import Element from '../../../../src/geometry/element/index';
import LineShapeFactory from '../../../../src/geometry/shape/line';
import '../../../../src/geometry/shape/line/step';
import { getTheme } from '../../../../src/theme/';
import { createCanvas, createDiv, removeDom } from '../../../util/dom';

const Rect = getCoordinate('rect');
const Polar = getCoordinate('polar');
const Theme = getTheme('default');

describe('Line shapes', () => {
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
  LineShapeFactory.coordinate = rectCoord;
  LineShapeFactory.theme = Theme.geometries.line;

  const element = new Element({
    shapeFactory: LineShapeFactory,
    container: canvas.addGroup(),
  });

  it('defaultShapeType', () => {
    expect(LineShapeFactory.defaultShapeType).toBe('line');
  });

  it('getMarker', () => {
    const dotMarker = LineShapeFactory.getMarker('dot', { color: 'red', isInPolar: false });
    expect(dotMarker.style.lineDash).toEqual(Theme.geometries.line.dot.default.style.lineDash);
    expect(dotMarker.style.stroke).toBe('red');
    // @ts-ignore
    expect(dotMarker.symbol(10, 10, 5)).toEqual([
      ['M', 5, 10],
      ['L', 15, 10],
    ]);

    const vhMarker = LineShapeFactory.getMarker('vh', { color: 'red', isInPolar: false });
    expect(vhMarker.style.stroke).toBe('red');
    // @ts-ignore
    expect(vhMarker.symbol(10, 10, 5)).toEqual([
      ['M', 4, 12.5],
      ['L', 10, 12.5],
      ['L', 10, 7.5],
      ['L', 16, 7.5],
    ]);
  });

  describe('line', () => {
    it('draw', () => {
      const shape = LineShapeFactory.drawShape(
        'line',
        {
          x: 100,
          y: 100,
          points: [
            { x: 100, y: 100 },
            { x: 200, y: 200 },
          ],
          color: 'red',
          defaultStyle: {
            ...Theme.geometries.line.line.default.style,
          },
        },
        element.container
      );

      expect(shape.attr('stroke')).toBe('red');
      expect(shape.attr('path').length).toBe(2);
      expect(shape.attr('path')[0]).toEqual(['M', 100, 100]);
      expect(shape.attr('path')[1]).toEqual(['L', 200, 200]);
    });
  });

  describe('dot', () => {
    it('draw', () => {
      const shape = LineShapeFactory.drawShape(
        'dot',
        {
          x: 100,
          y: 100,
          points: [
            { x: 100, y: [100, 200] },
            { x: 200, y: [200, 300] },
          ],
          color: 'red',
          defaultStyle: {
            ...Theme.geometries.line.dot.default.style,
          },
        },
        element.container
      );

      expect(shape.attr('stroke')).toBe('red');
      expect(shape.attr('lineDash')).toEqual([1, 1]);
      expect(shape.attr('path').length).toBe(4);
      expect(shape.attr('path')[0]).toEqual(['M', 100, 200]);
      expect(shape.attr('path')[1]).toEqual(['L', 200, 300]);
    });
  });

  describe('dash', () => {
    it('draw', () => {
      const shape = LineShapeFactory.drawShape(
        'dash',
        {
          x: 100,
          y: 100,
          points: [
            { x: [100, 50], y: [100, 200] },
            { x: [200, 80], y: [200, 300] },
          ],
          color: 'red',
          defaultStyle: {
            ...Theme.geometries.line.dash.default.style,
          },
        },
        element.container
      );

      expect(shape.attr('stroke')).toBe('red');
      expect(shape.attr('path').length).toBe(4);
      expect(shape.attr('lineDash')).toEqual([5.5, 1]);
      expect(shape.attr('path')).toEqual([
        ['M', 50, 200],
        ['L', 80, 300],
        ['M', 100, 100],
        ['L', 200, 200],
      ]);
    });
  });

  describe('smooth', () => {
    it('draw', () => {
      const shape = LineShapeFactory.drawShape(
        'smooth',
        {
          x: 100,
          y: 100,
          points: [
            { x: 100, y: 100 },
            { x: 200, y: 200 },
            { x: 50, y: 50 },
          ],
          color: 'red',
          defaultStyle: {
            ...Theme.geometries.line.smooth.default.style,
          },
        },
        element.container
      );

      expect(shape.attr('stroke')).toBe('red');
      expect(shape.attr('path').length).toBe(3);
      expect(shape.attr('path')[0].length).toBe(3);
      expect(shape.attr('path')[1].length).toBe(7);
      expect(shape.attr('path')[2].length).toBe(7);
    });
  });

  describe('hv', () => {
    it('draw', () => {
      const shape = LineShapeFactory.drawShape(
        'hv',
        {
          x: 100,
          y: 100,
          points: [
            { x: 100, y: 100 },
            { x: 200, y: 200 },
          ],
          color: 'red',
          defaultStyle: {
            ...Theme.geometries.line.hv.default.style,
          },
        },
        element.container
      );
      expect(shape.attr('stroke')).toBe('red');
      expect(shape.attr('path').length).toBe(3);
      expect(shape.attr('path')[0]).toEqual(['M', 100, 100]);
      expect(shape.attr('path')[1]).toEqual(['L', 200, 100]);
      expect(shape.attr('path')[2]).toEqual(['L', 200, 200]);
    });
  });

  describe('vh', () => {
    it('draw', () => {
      const shape = LineShapeFactory.drawShape(
        'vh',
        {
          x: 100,
          y: 100,
          points: [
            { x: 100, y: 100 },
            { x: 200, y: 200 },
          ],
          color: 'red',
          defaultStyle: {
            ...Theme.geometries.line.vh.default.style,
          },
        },
        element.container
      );

      expect(shape.attr('stroke')).toBe('red');
      expect(shape.attr('path').length).toBe(3);
      expect(shape.attr('path')[0]).toEqual(['M', 100, 100]);
      expect(shape.attr('path')[1]).toEqual(['L', 100, 200]);
      expect(shape.attr('path')[2]).toEqual(['L', 200, 200]);
    });
  });

  describe('hvh', () => {
    it('draw', () => {
      const shape = LineShapeFactory.drawShape(
        'hvh',
        {
          x: 100,
          y: 100,
          points: [
            { x: 100, y: 100 },
            { x: 200, y: 200 },
          ],
          color: 'red',
          defaultStyle: {
            ...Theme.geometries.line.hvh.default.style,
          },
        },
        element.container
      );

      expect(shape.attr('stroke')).toBe('red');
      expect(shape.attr('path').length).toBe(4);
      expect(shape.attr('path')[0]).toEqual(['M', 100, 100]);
      expect(shape.attr('path')[1]).toEqual(['L', 150, 100]);
      expect(shape.attr('path')[2]).toEqual(['L', 150, 200]);
      expect(shape.attr('path')[3]).toEqual(['L', 200, 200]);
    });
  });

  describe('vhv', () => {
    it('draw', () => {
      const shape = LineShapeFactory.drawShape(
        'vhv',
        {
          x: 100,
          y: 100,
          points: [
            { x: 100, y: 100 },
            { x: 200, y: 200 },
          ],
          color: 'red',
          defaultStyle: {
            ...Theme.geometries.line.vhv.default.style,
          },
        },
        element.container
      );
      expect(shape.attr('stroke')).toBe('red');
      expect(shape.attr('path').length).toBe(4);
      expect(shape.attr('path')[0].length).toBe(3);
      expect(shape.attr('path')[1].length).toBe(3);
      expect(shape.attr('path')[2].length).toBe(3);
      expect(shape.attr('path')[3].length).toBe(3);
    });
  });

  describe('polar coordinate', () => {
    const polar = new Polar({
      start: { x: 0, y: 500 },
      end: { x: 500, y: 0 },
    });
    LineShapeFactory.coordinate = polar;
    it('draw smooth line', () => {
      const shape = LineShapeFactory.drawShape(
        'smooth',
        {
          x: 100,
          y: 100,
          points: [
            { x: 20, y: 10 },
            { x: 40, y: 10 },
            { x: 60, y: 10 },
            { x: 80, y: 10 },
          ],
          isInCircle: true,
          color: '#1890ff',
          defaultStyle: {
            ...Theme.geometries.line.smooth.default.style,
          },
        },
        element.container
      );

      expect(shape.attr('stroke')).toBe('#1890ff');
      expect(shape.attr('path')).toEqual([
        ['M', 20, 10],
        ['C', 20, 10, 32, 10, 40, 10],
        ['C', 48, 10, 52, 10, 60, 10],
        ['C', 68, 10, 84, 10, 80, 10],
        ['C', 68, 10, 20, 10, 20, 10],
      ]);
    });
  });

  afterAll(() => {
    canvas.destroy();
    removeDom(div);
  });
});
