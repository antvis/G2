import { getCoordinate, Group, Shape } from '../../../../src/dependents';
import Element from '../../../../src/geometry/element';
import * as GeometryShape from '../../../../src/geometry/shape/base';

const Rect = getCoordinate('rect');
const Polar = getCoordinate('polar');

describe('Shape', () => {
  let coordinate;
  let updateCalled = false;
  let setStateCalled = false;
  let destroyCalled = false;

  beforeAll(() => {
    coordinate = new Rect({
      start: { x: 0, y: 0 },
      end: { x: 200, y: 200 },
    });
  });

  describe('register', () => {
    it('registerShapeFactory', () => {
      GeometryShape.registerShapeFactory('circleFactory', {
        defaultShapeType: 'circle',
        getDefaultPoints(point) {
          const { x, y } = point;
          return [
            {
              x: (x as number) + 1,
              y: (y as number) + 1,
            },
          ];
        },
      });

      expect(GeometryShape.getShapeFactory('circleFactory')).not.toBe(undefined);
    });

    it('getShapeFactory', () => {
      const circleFactory = GeometryShape.getShapeFactory('circleFactory');
      expect(circleFactory).not.toBe(undefined);

      const unRegister = GeometryShape.getShapeFactory('hello');
      expect(unRegister).toBe(undefined);
    });

    it('registerShape', () => {
      GeometryShape.registerShape('circleFactory', 'circle', {
        getPoints(point) {
          const { x, y } = point;
          return [
            {
              x: (x as number) * 10,
              y: (y as number) * 10,
            },
          ];
        },
        destroy() {
          destroyCalled = true;
        },
        // @ts-ignore
        // mock
        draw() {
          return 'circle draw';
        },
        update() {
          updateCalled = true;
        },
        setState() {
          setStateCalled = true;
        },
      });

      GeometryShape.registerShape('circleFactory', 'hollowCircle', {
        // @ts-ignore
        // mock
        getMarker() {
          return 'marker';
        },
        draw() {
          // @ts-ignore
          // FIXME: 带 g-canvas 发新版本
          return new Shape.Circle({
            attrs: {
              x: 50,
              y: 50,
              r: 20,
              fill: 'red',
            },
          });
        },
      });
      const circleFactory = GeometryShape.getShapeFactory('circleFactory');
      expect(circleFactory.getShape('circle')).not.toBe(undefined);
      expect(circleFactory.getShape('hollowCircle')).not.toBe(undefined);
    });
  });

  describe('ShapeFactory', () => {
    it('getShape()', () => {
      const circleFactory = GeometryShape.getShapeFactory('circleFactory');
      circleFactory.setCoordinate(coordinate);

      const shape = circleFactory.getShape('circle');
      expect(shape).toEqual(circleFactory[circleFactory.defaultShapeType]);

      // shape 不存在，则返回默认的 shape
      expect(circleFactory.getShape('empty')).toEqual(circleFactory.getShape('test'));
    });

    it('getShapePoints()', () => {
      const circleFactory = GeometryShape.getShapeFactory('circleFactory');

      expect(
        circleFactory.getShapePoints('circle', {
          x: 2,
          y: 2,
        })
      ).toEqual([
        {
          x: 20,
          y: 20,
        },
      ]);
      expect(
        circleFactory.getShapePoints('hollowCircle', {
          x: 2,
          y: 2,
        })
      ).toEqual([
        {
          x: 3,
          y: 3,
        },
      ]);
    });

    it('getShapePoints()', () => {
      const circleFactory = GeometryShape.getShapeFactory('circleFactory');

      expect(
        circleFactory.getShapePoints('circle', {
          x: 2,
          y: 2,
        })
      ).toEqual([
        {
          x: 20,
          y: 20,
        },
      ]);
      expect(
        circleFactory.getShapePoints('hollowCircle', {
          x: 2,
          y: 2,
        })
      ).toEqual([
        {
          x: 3,
          y: 3,
        },
      ]);
    });

    it('getMarker()', () => {
      const circleFactory = GeometryShape.getShapeFactory('circleFactory');

      expect(circleFactory.getMarker('circle', {})).toBe(undefined);
      expect(circleFactory.getMarker('hollowCircle', {})).toBe('marker');
    });

    it('drawShape()', () => {
      const circleFactory = GeometryShape.getShapeFactory('circleFactory');
      // @ts-ignore
      expect(circleFactory.drawShape('circle')).toBe('circle draw');
    });

    it('updateShape()', () => {
      const circleFactory = GeometryShape.getShapeFactory('circleFactory');
      // @ts-ignore
      circleFactory.updateShape('circle');

      expect(updateCalled).toBe(true);
    });

    it('setState()', () => {
      const circleFactory = GeometryShape.getShapeFactory('circleFactory');
      // @ts-ignore
      circleFactory.setState();

      expect(setStateCalled).toBe(true);
    });

    it('destroy()', () => {
      const circleFactory = GeometryShape.getShapeFactory('circleFactory');
      // @ts-ignore
      circleFactory.destroy();

      expect(destroyCalled).toBe(true);
    });
  });

  describe('Shape', () => {
    it('getCoordinate', () => {
      const circleFactory = GeometryShape.getShapeFactory('circleFactory');
      const shape = circleFactory.getShape('circle');
      expect(shape.getCoordinate()).toEqual(coordinate);
    });

    it('parsePoint', () => {
      const circleFactory = GeometryShape.getShapeFactory('circleFactory');
      const shape = circleFactory.getShape('circle');

      expect(shape.parsePoint({ x: 0, y: 0 })).toEqual({ x: 0, y: 0 });
      expect(shape.parsePoint({ x: 0.5, y: 0.5 })).toEqual({ x: 100, y: 100 });
      expect(shape.parsePoint({ x: 1, y: 1 })).toEqual({ x: 200, y: 200 });
    });

    it('parsePoints', () => {
      const circleFactory = GeometryShape.getShapeFactory('circleFactory');
      const shape = circleFactory.getShape('circle');

      const points = [{ x: 0, y: 0 }, { x: 0.5, y: 0.5 }, { x: 1, y: 1 }];
      expect(shape.parsePoints(points)).toEqual([{ x: 0, y: 0 }, { x: 100, y: 100 }, { x: 200, y: 200 }]);
    });

    it('parsePath at cartesian coordinate.', () => {
      const circleFactory = GeometryShape.getShapeFactory('circleFactory');
      const shape = circleFactory.getShape('circle');

      const path = [['M', 0, 0], ['L', 1, 1]];
      expect(shape.parsePath(path, false)).toEqual([['M', 0, 0], ['L', 200, 200]]);
    });

    it('parsePath at polar coordinate.', () => {
      const polar = new Polar({
        start: { x: 0, y: 0 },
        end: { x: 200, y: 200 },
      });
      const circleFactory = GeometryShape.getShapeFactory('circleFactory');
      circleFactory.setCoordinate(polar);
      const shape = circleFactory.getShape('circle');
      let path = [['M', 0, 0], ['L', 0, 1], ['L', 0.5, 1]];
      let toPath = shape.parsePath(path, true);
      expect(toPath[0]).toEqual(['M', 100, 100]);
      expect(toPath[1]).toEqual(['L', 100, 0]);
      expect(toPath[2]).toEqual(['A', 100, 100, 0, 0, 1, 100, 200]);

      path = [['M', 0, 0], ['L', 0, 1], ['L', 0.5, 1], ['L', 1, 1]];
      toPath = shape.parsePath(path, true);
      expect(toPath[0]).toEqual(['M', 100, 100]);
      expect(toPath[1]).toEqual(['M', 100, 0]);
      expect(toPath[2]).toEqual(['A', 100, 100, 0, 0, 1, 100, 200]);
    });

    it('setState', () => {
      const circleFactory = GeometryShape.getShapeFactory('circleFactory');
      const element = new Element({
        shapeType: 'hollowCircle',
        shapeFactory: circleFactory,
        data: { x: 10, y: 10 },
        model: { x: 1, y: 1 },
        theme: {
          hollowCircle: {
            default: {
              fill: 'red',
            },
            active: {
              fill: 'blue',
            },
            selected: {
              fill: 'yellow',
              stroke: '#000',
              lineWidth: 1,
            },
          },
        },
        container: new Group({}),
      });

      circleFactory.setState('hollowCircle', 'active', true, element);
      expect(element.shape.attr('fill')).toBe('blue');

      element.setState('selected', true);

      circleFactory.setState('hollowCircle', 'active', false, element);
      expect(element.shape.attr('fill')).toBe('yellow');
      expect(element.shape.attr('stroke')).toBe('#000');
      expect(element.shape.attr('lineWidth')).toBe(1);
    });
  });
});
