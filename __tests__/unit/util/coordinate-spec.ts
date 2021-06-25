import { getCoordinate } from '@antv/coord';
import { getDistanceToCenter, getXDimensionLength } from '../../../src/util/coordinate';

const Polar = getCoordinate('polar');
const Cartesian = getCoordinate('rect');

const polar = new Polar({
  start: { x: 0, y: 200 },
  end: { x: 200, y: 0 },
});

const cartesian = new Cartesian({
  start: { x: 0, y: 40 },
  end: { x: 30, y: 0 },
});

const theta = new Polar({
  start: { x: 0, y: 40 },
  end: { x: 30, y: 0 },
  isTransposed: true,
});

describe('coordinate', () => {
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
      }),
    ).toBe(0);
    expect(
      getDistanceToCenter(coord, {
        x: 100,
        y: 0,
      }),
    ).toBe(100);
  });

  it('getXDimensionLength()', () => {
    expect(getXDimensionLength(polar)).toEqual(Math.PI * 2 * 100);
    expect(getXDimensionLength(cartesian)).toEqual(30);
    expect(getXDimensionLength(theta)).toEqual(15);
  });
});
