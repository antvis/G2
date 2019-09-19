import { Group, Shapes } from '@antv/g';
import { expect } from 'chai';
import { getCoordinate } from '../../../src/dependents';
import Element from '../../../src/geometry/element';
import * as Shape from '../../../src/geometry/shape';

const Rect = getCoordinate('rect');
const Polar = getCoordinate('polar');

describe('Shape', () => {
  let coord;
  let updateCalled = false;
  let setStateCalled = false;
  let destroyCalled = false;

  before(() => {
    coord = new Rect({
      start: { x: 0, y: 0 },
      end: { x: 200, y: 200 },
    });
  });

  describe('register', () => {
    it('registerShapeFactory', () => {
      Shape.registerShapeFactory('circleFactory', {
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

      expect(Shape.getShapeFactory('circleFactory')).not.equal(undefined);
    });

    it('getShapeFactory', () => {
      const circleFactory = Shape.getShapeFactory('circleFactory');
      expect(circleFactory).not.to.equal(undefined);

      const unRegister = Shape.getShapeFactory('hello');
      expect(unRegister).to.equal(undefined);
    });

    it('registerShape', () => {
      Shape.registerShape('circleFactory', 'circle', {
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

      Shape.registerShape('circleFactory', 'hollowCircle', {
        // @ts-ignore
        // mock
        getMarker() {
          return 'marker';
        },
        draw() {
          return new Shapes.Circle({
            attrs: {
              x: 50,
              y: 50,
              r: 20,
              fill: 'red',
            },
          });
        },
      });
      const circleFactory = Shape.getShapeFactory('circleFactory');
      expect(circleFactory.getShape('circle')).not.to.equal(undefined);
      expect(circleFactory.getShape('hollowCircle')).not.to.equal(undefined);
    });
  });

  describe('ShapeFactory', () => {
    it('getShape()', () => {
      const circleFactory = Shape.getShapeFactory('circleFactory');
      circleFactory.setCoordinate(coord);

      const shape = circleFactory.getShape('circle');
      expect(shape).to.eql(circleFactory[circleFactory.defaultShapeType]);

      // shape 不存在，则返回默认的 shape
      expect(circleFactory.getShape('empty')).to.eql(circleFactory.getShape('test'));
    });

    it('getShapePoints()', () => {
      const circleFactory = Shape.getShapeFactory('circleFactory');

      expect(
        circleFactory.getShapePoints('circle', {
          x: 2,
          y: 2,
        })
      ).to.eql([
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
      ).to.eql([
        {
          x: 3,
          y: 3,
        },
      ]);
    });

    it('getShapePoints()', () => {
      const circleFactory = Shape.getShapeFactory('circleFactory');

      expect(
        circleFactory.getShapePoints('circle', {
          x: 2,
          y: 2,
        })
      ).to.eql([
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
      ).to.eql([
        {
          x: 3,
          y: 3,
        },
      ]);
    });

    it('getMarker()', () => {
      const circleFactory = Shape.getShapeFactory('circleFactory');

      expect(circleFactory.getMarker('circle', {})).to.equal(undefined);
      expect(circleFactory.getMarker('hollowCircle', {})).to.equal('marker');
    });

    it('drawShape()', () => {
      const circleFactory = Shape.getShapeFactory('circleFactory');
      // @ts-ignore
      expect(circleFactory.drawShape('circle')).to.equal('circle draw');
    });

    it('updateShape()', () => {
      const circleFactory = Shape.getShapeFactory('circleFactory');
      // @ts-ignore
      circleFactory.updateShape('circle');

      expect(updateCalled).to.equal(true);
    });

    it('setState()', () => {
      const circleFactory = Shape.getShapeFactory('circleFactory');
      // @ts-ignore
      circleFactory.setState();

      expect(setStateCalled).to.equal(true);
    });

    it('destroy()', () => {
      const circleFactory = Shape.getShapeFactory('circleFactory');
      // @ts-ignore
      circleFactory.destroy();

      expect(destroyCalled).to.equal(true);
    });
  });

  describe('Shape', () => {
    it('getCoordinate', () => {
      const circleFactory = Shape.getShapeFactory('circleFactory');
      const shape = circleFactory.getShape('circle');
      expect(shape.getCoordinate()).to.eql(coord);
    });

    it('parsePoint', () => {
      const circleFactory = Shape.getShapeFactory('circleFactory');
      const shape = circleFactory.getShape('circle');

      expect(shape.parsePoint({ x: 0, y: 0 })).eqls({ x: 0, y: 0 });
      expect(shape.parsePoint({ x: 0.5, y: 0.5 })).eqls({ x: 100, y: 100 });
      expect(shape.parsePoint({ x: 1, y: 1 })).eqls({ x: 200, y: 200 });
    });

    it('parsePoints', () => {
      const circleFactory = Shape.getShapeFactory('circleFactory');
      const shape = circleFactory.getShape('circle');

      const points = [{ x: 0, y: 0 }, { x: 0.5, y: 0.5 }, { x: 1, y: 1 }];
      expect(shape.parsePoints(points)).eqls([{ x: 0, y: 0 }, { x: 100, y: 100 }, { x: 200, y: 200 }]);
    });

    it('parsePath at cartesian coordinate.', () => {
      const circleFactory = Shape.getShapeFactory('circleFactory');
      const shape = circleFactory.getShape('circle');

      const path = [['M', 0, 0], ['L', 1, 1]];
      expect(shape.parsePath(path, false)).eqls([['M', 0, 0], ['L', 200, 200]]);
    });

    it('parsePath at polar coordinate.', () => {
      const polar = new Polar({
        start: { x: 0, y: 0 },
        end: { x: 200, y: 200 },
      });
      const circleFactory = Shape.getShapeFactory('circleFactory');
      circleFactory.setCoordinate(polar);
      const shape = circleFactory.getShape('circle');
      let path = [['M', 0, 0], ['L', 0, 1], ['L', 0.5, 1]];
      let toPath = shape.parsePath(path, true);
      expect(toPath[0]).eqls(['M', 100, 100]);
      expect(toPath[1]).eqls(['L', 100, 0]);
      expect(toPath[2]).eqls(['A', 100, 100, 0, 0, 1, 100, 200]);

      path = [['M', 0, 0], ['L', 0, 1], ['L', 0.5, 1], ['L', 1, 1]];
      toPath = shape.parsePath(path, true);
      expect(toPath[0]).eqls(['M', 100, 100]);
      expect(toPath[1]).eqls(['M', 100, 0]);
      expect(toPath[2]).eqls(['A', 100, 100, 0, 0, 1, 100, 200]);
    });

    it('setState', () => {
      const circleFactory = Shape.getShapeFactory('circleFactory');
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
        container: new Group(),
      });

      circleFactory.setState('hollowCircle', 'active', true, element);
      expect(element.shape.attr('fill')).to.equal('blue');

      element.setState('selected', true);

      circleFactory.setState('hollowCircle', 'active', false, element);
      expect(element.shape.attr('fill')).to.equal('yellow');
      expect(element.shape.attr('stroke')).to.equal('#000');
      expect(element.shape.attr('lineWidth')).to.equal(1);
    });
  });
});
