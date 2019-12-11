import { getCoordinate } from '@antv/coord';
import { BBox } from '../../../src/util/bbox';
import { createCoordinate, getDistanceToCenter, getPointAngle, getXDimensionLength, hasAction, isFullCircle, isTheta } from '../../../src/util/coordinate';

const Polar = getCoordinate('polar');
const Cartesian = getCoordinate('rect');

describe('CoordinateUtil', () => {
  let polar;
  let cartesian;
  let theta;

  beforeAll(() => {
    polar = new Polar({
      start: { x: 0, y: 200 },
      end: { x: 200, y: 0 },
    });

    cartesian = new Cartesian({
      start: { x: 0, y: 40 },
      end: { x: 30, y: 0 },
    });

    theta = new Polar({
      start: { x: 0, y: 40 },
      end: { x: 30, y: 0 },
      isTransposed: true,
    });
  });

  it('getXDimensionLength()', () => {
    expect(getXDimensionLength(polar)).toEqual(Math.PI * 2 * 100);
    expect(getXDimensionLength(cartesian)).toEqual(30);
    expect(getXDimensionLength(theta)).toEqual(15);
  });

  it('isFullCircle()', () => {
    const anotherPolar = new Polar({
      start: { x: 0, y: 200 },
      end: { x: 200, y: 0 },
      startAngle: Math.PI / 6,
      endAngle: Math.PI * 1.5,
    });
    expect(isFullCircle(polar)).toEqual(true);
    expect(isFullCircle(anotherPolar)).toEqual(false);
    expect(isFullCircle(cartesian)).toEqual(false);
  });

  it('getDistanceToCenter()', () => {
    const coord = new Polar({
      start: {
        x: 0,
        y: 0,
      },
      end: {
        x: 200,
        y: 200,
      },
    });
    expect(
      getDistanceToCenter(coord, {
        x: 100,
        y: 100,
      })
    ).toBe(0);
    expect(
      getDistanceToCenter(coord, {
        x: 100,
        y: 0,
      })
    ).toBe(100);
  });

  it('getPointAngle()', () => {
    const coord = new Polar({
      start: {
        x: 0,
        y: 0,
      },
      end: {
        x: 200,
        y: 200,
      },
    });
    expect(
      getPointAngle(coord, {
        x: 100,
        y: 100,
      })
    ).toBe(0);
    expect(
      getPointAngle(coord, {
        x: 0,
        y: 100,
      })
    ).toBe(Math.PI);
  });

  it('hasAction', () => {
    expect(hasAction(['a', 'b'], 'a')).toBe(true);
    expect(hasAction(['a', 'b'], 'b')).toBe(true);
    expect(hasAction(['a', 'b'], 'c')).toBe(false);
  });

  it('isTheta', () => {
    expect(isTheta('theta')).toBe(true);
    expect(isTheta('rect')).toBe(false);
  });

  it('createCoordinate', () => {

    let coordinate = createCoordinate({
      type: 'rect',
    });
    expect(coordinate.type).toBe('rect');

    coordinate = createCoordinate({
      type: 'theta',
    });
    expect(coordinate.type).toBe('theta');
    expect(coordinate.isTransposed).toBe(true);

    coordinate = createCoordinate({
      type: 'polar',
      cfg: {
        startAngle: Math.PI,
      },
    }, new BBox(0, 0, 100, 100));
    expect(coordinate.type).toBe('polar');
    expect(coordinate.start).toEqual({ x: 0, y: 100 });
    expect(coordinate.end).toEqual({ x: 100, y: 0 });
  });
});
