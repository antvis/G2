import { getCoordinate } from '@antv/coord';
import { getAngleByPoint, getDistanceToCenter, getXDimensionLength, isFullCircle } from '../../../src/util/coordinate';

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

  it('getAngleByPoint()', () => {
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
      getAngleByPoint(coord, {
        x: 100,
        y: 100,
      })
    ).toBe(0);
    expect(
      getAngleByPoint(coord, {
        x: 0,
        y: 100,
      })
    ).toBe(Math.PI);
  });
});
