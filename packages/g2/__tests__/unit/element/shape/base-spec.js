import { expect } from 'chai';
import { getCoordinate } from '@antv/coord';
import * as Shape from '../../../../src/element/shape/base';

const Rect = getCoordinate('rect');
const Polar = getCoordinate('polar');

describe('Register shape', () => {
  const coord = new Rect({
    start: {
      x: 0,
      y: 0,
    },
    end: {
      x: 200,
      y: 200,
    },
  });

  it('get factory which is undefined', () => {
    const factory = Shape.getShapeFactory('test');
    expect(factory).equal(undefined);
  });

  it('register factory && register shape', () => {
    let drawCalled = false;
    let getMarkerStyleCalled = false;
    let getSelectedStyleCalled = false;
    let getActiveStyleCalled = false;
    let getInactiveStyleCalled = false;

    Shape.registerShapeFactory('test', {
      defaultShapeType: 'test',
    });

    Shape.registerShape('test', 'test', {
      draw() {
        drawCalled = true;
      },
      getMarkerStyle() {
        getMarkerStyleCalled = true;
      },
      getSelectedStyle() {
        getSelectedStyleCalled = true;
      },
      getActiveStyle() {
        getActiveStyleCalled = true;
      },
      getInactiveStyle() {
        getInactiveStyleCalled = true;
      },
      getPoints(cfg) {
        const x = cfg.x * 10;
        const y = cfg.y * 10;
        return [{ x, y }];
      },
    });

    Shape.registerShape('test', 'test1', {});

    const testFactory = Shape.getShapeFactory('test');
    expect(testFactory).not.equal(undefined);

    const points1 = testFactory.getShapePoints('test', { x: 2, y: 4 });
    expect(points1).eqls([{ x: 20, y: 40 }]);
    const points2 = testFactory.getShapePoints('test1', { x: 2, y: 4 });
    expect(points2).eqls([]);

    testFactory.drawShape('test', {});
    expect(drawCalled).equal(true);

    testFactory.getActiveStyle('test', {});
    expect(getActiveStyleCalled).to.be.true;

    testFactory.getMarkerStyle('test', {});
    expect(getMarkerStyleCalled).to.be.true;

    testFactory.getSelectedStyle('test', {});
    expect(getSelectedStyleCalled).to.be.true;

    testFactory.getInactiveStyle('test', {});
    expect(getInactiveStyleCalled).to.be.true;

    // shape do not define getXXStyle() methods
    expect(testFactory.getInactiveStyle('test1', {})).to.be.undefined;
    expect(testFactory.getActiveStyle('test1', {})).to.be.undefined;
    expect(testFactory.getActiveStyle('test1', {})).to.be.undefined;
    expect(testFactory.getMarkerStyle('test1', {})).to.be.undefined;
    expect(testFactory.getSelectedStyle('test1', {})).to.be.undefined;
  });

  it('factory.setTheme(cfg)', () => {
    const theme = {
      test: {
        point: {
          default: {
            lineWidth: 1,
            r: 5,
            fill: '#1890ff',
            stroke: '#000',
          },
        },
      },
    };
    let pointStyle;

    const factory = Shape.getShapeFactory('test');
    factory.setTheme(theme);
    Shape.registerShape('test', 'point', {
      draw(cfg) {
        pointStyle = cfg.style;
      },
    });
    factory.drawShape('point', {});
    expect(pointStyle).to.eql(theme.test.point.default);
  });

  it('getShape', () => {
    // shape 不存在，则返回默认的 shape
    const testFactory = Shape.getShapeFactory('test');
    expect(testFactory.getShape('empty')).to.eql(testFactory.getShape('test'));

    const testShape = testFactory.getShape('test');
    // shapeName 为数组
    const test1 = testFactory.getShape(['test', { stroke: '#000' }]);
    expect(test1).to.equal(testShape);
  });

  it('shape.getCoord()', () => {
    const testFactory = Shape.getShapeFactory('test');
    testFactory.setCoord(coord);
    const shape = testFactory.getShape('test');
    expect(shape.getCoord()).to.eql(coord);
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
    const path = [['M', 0, 0], ['L', 1, 1]];
    expect(shape.parsePath(path)).eqls([['M', 0, 0], ['L', 200, 200]]);
  });

  it('parse path in circle', () => {
    const newCoord = new Polar({
      start: {
        x: 0,
        y: 0,
      },
      end: {
        x: 200,
        y: 200,
      },
    });
    const testFactory = Shape.getShapeFactory('test');
    testFactory.setCoord(newCoord);
    const shape = testFactory.getShape('test');
    let path = [['M', 0, 0], ['L', 0, 1], ['L', 0.5, 1]];
    let toPath = shape.parsePath(path);
    expect(toPath[0]).eqls(['M', 100, 100]);
    expect(toPath[1]).eqls(['L', 100, 0]);
    expect(toPath[2]).eqls(['A', 100, 100, 0, 0, 1, 100, 200]);

    path = [['M', 0, 0], ['L', 0, 1], ['L', 0.5, 1], ['L', 1, 1]];
    toPath = shape.parsePath(path);
    expect(toPath[0]).eqls(['M', 100, 100]);
    expect(toPath[1]).eqls(['M', 100, 0]);
    expect(toPath[2]).eqls(['A', 100, 100, 0, 0, 1, 100, 200]);
  });
});
