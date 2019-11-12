const expect = require('chai').expect;
const PathUtil = require('../../../../src/geom/util/path');
const Coord = require('@antv/coord/lib/');

describe('shape path test', () => {
  it('line path', () => {
    const points = [{ x: 0, y: 0 }, { x: 100, y: 100 }];
    const path = PathUtil.getLinePath(points);
    expect(path).eqls([[ 'M', 0, 0 ], [ 'L', 100, 100 ]]);
  });
  it('line path circle', () => {
    const points = [{ x: 0, y: 0 }, { x: 100, y: 100 }];
    const path = PathUtil.getLinePath(points, true);
    expect(path).eqls([[ 'M', 0, 0 ], [ 'L', 100, 100 ], [ 'Z' ]]);
  });

  it('line path smooth two points', () => {
    const points = [{ x: 0, y: 0 }, { x: 0.1, y: 0.1 }];
    const path = PathUtil.getSplinePath(points);
    expect(path).eqls([[ 'M', 0, 0 ], [ 'L', 0.1, 0.1 ]]);
  });

  it('line path smooth more points', () => {
    const points = [{ x: 0, y: 0 }, { x: 0.1, y: 0.5 }, { x: 0.2, y: 0.1 }];
    const path = PathUtil.getSplinePath(points);
    expect(path.length).equal(3);

  });

  it('line path smooth width constrain', () => {
    const points = [{ x: 0, y: 0 }, { x: 0.1, y: 1.5 }, { x: 0.2, y: 0 }, { x: 0.3, y: 0 }];
    const path = PathUtil.getSplinePath(points);
    expect(path.length).equal(4);
  });

  it('get coord radius', () => {
    const coord = new Coord.Polar({
      start: {
        x: 0,
        y: 0
      },
      end: {
        x: 200,
        y: 200
      }
    });
    expect(coord.radius).equal(100);
    expect(PathUtil.getPointRadius(coord, { x: 100, y: 100 })).equal(0);
    expect(PathUtil.getPointRadius(coord, { x: 100, y: 0 })).equal(100);
  });

  it('get Point Angle', () => {
    const coord = new Coord.Polar({
      start: {
        x: 0,
        y: 0
      },
      end: {
        x: 200,
        y: 200
      }
    });
    expect(PathUtil.getPointAngle(coord, { x: 100, y: 100 })).equal(0);
    expect(PathUtil.getPointAngle(coord, { x: 0, y: 100 })).equal(Math.PI);
  });

  it('convertNormalPath', () => {
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

    const path = [[ 'M', 0, 0 ], [ 'L', 1, 1 ]];
    expect(PathUtil.convertNormalPath(coord, path)).eqls([[ 'M', 0, 0 ], [ 'L', 200, 200 ]]);
  });

  it('convertPolarPath', () => {
    const coord = new Coord.Polar({
      start: {
        x: 0,
        y: 0
      },
      end: {
        x: 200,
        y: 200
      }
    });
    const path = [[ 'M', 0, 0 ], [ 'L', 0, 1 ], [ 'L', 0.25, 1 ]];
    const toPath = PathUtil.convertPolarPath(coord, path);
    expect(toPath).eqls([[ 'M', 100, 100 ], [ 'L', 100, 0 ], [ 'A', 100, 100, 0, 0, 1, 200, 100 ]]);
  });

});
