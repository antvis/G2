import { getCoordinate } from '../../../../src/dependents';
import Element from '../../../../src/geometry/element/index';
import LineShapeFactory from '../../../../src/geometry/shape/line';
import Theme from '../../../../src/theme/antv';
import { createCanvas, createDiv, removeDom } from '../../../util/dom';

const Rect = getCoordinate('rect');
const Polar = getCoordinate('polar');

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

  const element = new Element({
    shapeType: 'line',
    shapeFactory: LineShapeFactory,
    container: canvas.addGroup(),
    theme: Theme.line,
  });

  it('defaultShapeType', () => {
    expect(LineShapeFactory.defaultShapeType).toBe('line');
  });

  describe('line', () => {
    it('draw', () => {
      const shape = LineShapeFactory.drawShape(
        'line',
        {
          x: 100,
          y: 100,
          points: [{ x: 100, y: 100 }, { x: 200, y: 200 }],
          color: 'red',
          style: {
            ...Theme.line.line.default,
          },
        },
        element
      );
      // mock
      element.shape = shape;
      expect(shape.attr('stroke')).toBe('red');
      expect(shape.attr('path').length).toBe(2);
      expect(shape.attr('path')[0]).toEqual(['M', 100, 100]);
      expect(shape.attr('path')[1]).toEqual(['L', 200, 200]);
    });

    it('update', () => {
      LineShapeFactory.updateShape(
        'line',
        {
          x: 100,
          y: 100,
          points: [{ x: 300, y: 100 }, { x: 500, y: 200 }],
          color: 'red',
          size: 20,
          style: {
            ...Theme.line.line.default,
          },
        },
        element
      );

      const shape = element.shape;
      expect(shape.attr('stroke')).toBe('red');
      expect(shape.attr('lineWidth')).toBe(20);
      expect(shape.attr('path').length).toBe(2);
      expect(shape.attr('path')[0]).toEqual(['M', 300, 100]);
      expect(shape.attr('path')[1]).toEqual(['L', 500, 200]);
    });
  });

  describe('dot', () => {
    // @ts-ignore for test
    element.shapeType = 'dot';
    it('draw', () => {
      const shape = LineShapeFactory.drawShape(
        'dot',
        {
          x: 100,
          y: 100,
          points: [{ x: 100, y: [100, 200] }, { x: 200, y: [200, 300] }],
          color: 'red',
          style: {
            ...Theme.line.dot.default,
          },
        },
        element
      );
      // for test
      element.shape = shape;
      expect(shape.attr('stroke')).toBe('red');
      expect(shape.attr('lineDash')).toEqual([1, 1]);
      expect(shape.attr('path').length).toBe(4);
      expect(shape.attr('path')[0]).toEqual(['M', 100, 100]);
      expect(shape.attr('path')[1]).toEqual(['L', 200, 200]);
    });

    it('update', () => {
      LineShapeFactory.updateShape(
        'dot',
        {
          x: 100,
          y: 100,
          points: [
            { x: 100, y: 300 },
            { x: 200, y: 300 },
            { x: undefined, y: undefined },
            { x: 300, y: 200 },
            { x: 400, y: 200 },
          ],
          color: 'red',
          style: {
            ...Theme.line.dot.default,
            lineDash: [2],
          },
        },
        element
      );
      const shape = element.shape;
      expect(shape.attr('stroke')).toBe('red');
      expect(shape.attr('lineDash')).toEqual([2]);
      expect(shape.attr('path')).toEqual([['M', 100, 300], ['L', 200, 300], ['M', 300, 200], ['L', 400, 200]]);
    });
  });

  describe('dash', () => {
    // @ts-ignore
    element.shapeType = 'dash';

    it('draw', () => {
      const shape = LineShapeFactory.drawShape(
        'dash',
        {
          x: 100,
          y: 100,
          points: [{ x: [100, 50], y: [100, 200] }, { x: [200, 80], y: [200, 300] }],
          color: 'red',
          style: {
            ...Theme.line.dash.default,
          },
        },
        element
      );
      element.shape = shape;
      expect(shape.attr('stroke')).toBe('red');
      expect(shape.attr('path').length).toBe(4);
      expect(shape.attr('lineDash')).toEqual([5.5, 1]);
      expect(shape.attr('path')).toEqual([['M', 100, 100], ['L', 200, 200], ['M', 50, 200], ['L', 80, 300]]);
    });

    it('update', () => {
      LineShapeFactory.updateShape(
        'dash',
        {
          x: 100,
          y: 100,
          points: [{ x: [100, 50], y: [100, 200] }, { x: [200, 80], y: [200, 300] }],
          color: '#1890ff',
          size: 10,
          style: {
            ...Theme.line.dash.default,
          },
        },
        element
      );
      const shape = element.shape;

      expect(shape.attr('stroke')).toBe('#1890ff');
      expect(shape.attr('lineWidth')).toBe(10);
    });
  });

  describe('smooth', () => {
    // @ts-ignore
    element.shapeType = 'smooth';
    it('draw', () => {
      const shape = LineShapeFactory.drawShape(
        'smooth',
        {
          x: 100,
          y: 100,
          points: [{ x: 100, y: 100 }, { x: 200, y: 200 }, { x: 50, y: 50 }],
          color: 'red',
          style: {
            ...Theme.line.smooth.default,
          },
        },
        element
      );

      expect(shape.attr('stroke')).toBe('red');
      expect(shape.attr('path').length).toBe(3);
      expect(shape.attr('path')[0].length).toBe(3);
      expect(shape.attr('path')[1].length).toBe(7);
      expect(shape.attr('path')[2].length).toBe(7);
    });

    describe('hv', () => {
      // @ts-ignore
      element.shapeType = 'hv';
      it('draw', () => {
        const shape = LineShapeFactory.drawShape(
          'hv',
          {
            x: 100,
            y: 100,
            points: [{ x: 100, y: 100 }, { x: 200, y: 200 }],
            color: 'red',
            style: {
              ...Theme.line.hv.default,
            },
          },
          element
        );
        expect(shape.attr('stroke')).toBe('red');
        expect(shape.attr('path').length).toBe(3);
        expect(shape.attr('path')[0]).toEqual(['M', 100, 100]);
        expect(shape.attr('path')[1]).toEqual(['L', 200, 100]);
        expect(shape.attr('path')[2]).toEqual(['L', 200, 200]);
      });
    });

    describe('vh', () => {
      // @ts-ignore
      element.shapeType = 'hv';
      it('draw', () => {
        const shape = LineShapeFactory.drawShape(
          'vh',
          {
            x: 100,
            y: 100,
            points: [{ x: 100, y: 100 }, { x: 200, y: 200 }],
            color: 'red',
            style: {
              ...Theme.line.vh.default,
            },
          },
          element
        );

        expect(shape.attr('stroke')).toBe('red');
        expect(shape.attr('path').length).toBe(3);
        expect(shape.attr('path')[0]).toEqual(['M', 100, 100]);
        expect(shape.attr('path')[1]).toEqual(['L', 100, 200]);
        expect(shape.attr('path')[2]).toEqual(['L', 200, 200]);
      });
    });

    describe('hvh', () => {
      // @ts-ignore
      element.shapeType = 'hvh';
      it('draw', () => {
        const shape = LineShapeFactory.drawShape(
          'hvh',
          {
            x: 100,
            y: 100,
            points: [{ x: 100, y: 100 }, { x: 200, y: 200 }],
            color: 'red',
            style: {
              ...Theme.line.hvh.default,
            },
          },
          element
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
      // @ts-ignore
      element.shapeType = 'vhv';
      it('draw', () => {
        const shape = LineShapeFactory.drawShape(
          'vhv',
          {
            x: 100,
            y: 100,
            points: [{ x: 100, y: 100 }, { x: 200, y: 200 }],
            color: 'red',
            style: {
              ...Theme.line.vhv.default,
            },
          },
          element
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
      // @ts-ignore
      element.shapeType = 'smooth';
      LineShapeFactory.coordinate = polar;
      it('draw smooth line', () => {
        const shape = LineShapeFactory.drawShape(
          'smooth',
          {
            x: 100,
            y: 100,
            points: [{ x: 20, y: 10 }, { x: 40, y: 10 }, { x: 60, y: 10 }, { x: 80, y: 10 }],
            isInCircle: true,
            color: '#1890ff',
            style: {
              ...Theme.line.smooth.default,
            },
          },
          element
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
  });

  afterAll(() => {
    canvas.destroy();
    removeDom(div);
  });
});
