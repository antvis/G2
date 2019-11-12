const expect = require('chai').expect;
const Shape = require('../../../../src/geom/shape/shape');
const Coord = require('@antv/coord/lib/');

describe('shape register', () => {
  const coord = new Coord.Rect({
    start: {
      x: 0,
      y: 0
    },
    end: {
      x: 200,
      y: 200
    }
  });
  it('get factory null', () => {
    const factory = Shape.getShapeFactory('test');
    expect(factory).equal(undefined);
  });

  it('register factory && register shape', () => {
    let called = false;
    Shape.registerFactory('test', {
      defaultShapeType: 'test',
      getShapePoints(type, cfg) {
        const x = cfg.x * 2;
        return [
          { x, y: 2 }
        ];
      }
    });

    Shape.registerShape('test', 'test', {
      draw() {
        called = true;
      }
    });

    const testFactory = Shape.getShapeFactory('test');
    expect(testFactory).not.equal(undefined);
    const points = testFactory.getShapePoints('test', { x: 2, y: 4 });
    expect(points).eqls([{ x: 4, y: 2 }]);
    testFactory.drawShape('test', {});
    expect(called).equal(true);
  });

  it('parse point', () => {

    const testFactory = Shape.getShapeFactory('test');
    testFactory.setCoord(coord);
    const shape = testFactory.getShape('test');
    expect(shape.parsePoint({ x: 0, y: 0 })).eqls({ x: 0, y: 0 });
    expect(shape.parsePoint({ x: 0.5, y: 0.5 })).eqls({ x: 100, y: 100 });
    expect(shape.parsePoint({ x: 1, y: 1 })).eqls({ x: 200, y: 200 });
  });

  it('parse points', () => {
    const testFactory = Shape.getShapeFactory('test');
    testFactory.setCoord(coord);
    const shape = testFactory.getShape('test');
    const points = [{ x: 0, y: 0 }, { x: 0.5, y: 0.5 }, { x: 1, y: 1 }];
    expect(shape.parsePoints(points)).eqls([{ x: 0, y: 0 }, { x: 100, y: 100 }, { x: 200, y: 200 }]);
  });

  it('parse path in rect', () => {
    const testFactory = Shape.getShapeFactory('test');
    testFactory.setCoord(coord);
    const shape = testFactory.getShape('test');
    const path = [[ 'M', 0, 0 ], [ 'L', 1, 1 ]];
    expect(shape.parsePath(path)).eqls([[ 'M', 0, 0 ], [ 'L', 200, 200 ]]);

  });

  it('parse path in circle', () => {
    const newCoord = new Coord.Polar({
      start: {
        x: 0,
        y: 0
      },
      end: {
        x: 200,
        y: 200
      }
    });
    const testFactory = Shape.getShapeFactory('test');
    testFactory.setCoord(newCoord);
    const shape = testFactory.getShape('test');
    let path = [[ 'M', 0, 0 ], [ 'L', 0, 1 ], [ 'L', 0.5, 1 ]];
    let toPath = shape.parsePath(path);
    expect(toPath[0]).eqls([ 'M', 100, 100 ]);
    expect(toPath[1]).eqls([ 'L', 100, 0 ]);
    expect(toPath[2]).eqls([ 'A', 100, 100, 0, 0, 1, 100, 200 ]);

    path = [[ 'M', 0, 0 ], [ 'L', 0, 1 ], [ 'L', 0.5, 1 ], [ 'L', 1, 1 ]];
    toPath = shape.parsePath(path);
    expect(toPath[0]).eqls([ 'M', 100, 100 ]);
    expect(toPath[1]).eqls([ 'M', 100, 0 ]);
    expect(toPath[2]).eqls([ 'A', 100, 100, 0, 0, 1, 100, 200 ]);
  });

  it('compatibility 2.x', () => {
    let called = false;
    Shape.registerFactory('test1', {
      defaultShapeType: 'test1'
    });
    Shape.registerShape('test1', 'test1', {
      getShapePoints() { return [ 1, 2 ]; },
      drawShape() {
        called = true;
      }
    });
    const testFactory = Shape.getShapeFactory('test1');
    const points = testFactory.getShapePoints('test1', { x: 2, y: 4 });
    expect(points).eqls([ 1, 2 ]);
    testFactory.drawShape('test1', {});
    expect(called).equal(true);
  });
});
